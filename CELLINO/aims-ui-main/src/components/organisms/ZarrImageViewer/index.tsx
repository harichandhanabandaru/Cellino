// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useCallback, useEffect, useRef, useState } from "react";
import DeckGL from "@deck.gl/react/typed";
import type { DeckGLRef } from "@deck.gl/react/typed";
import { Layer, OrthographicView, PickingInfo } from "@deck.gl/core/typed";
import fitBounds from "./utils/fitBounds";
import { MultiscaleImageLayer } from "@hms-dbmi/viv";
import loadZarrFile from "./utils/loadZarrFile";
import getLayerSize from "./utils/getLayerSize";
import usePolygonLayer from "../../../hooks/usePolygonLayer";
import usePolygonCreationLayer from "../../../hooks/usePolygonCreationLayer";
import { useReactiveVar } from "@apollo/client";
import {
  canDrawInternalPolygonVar,
  imageEventDataVar,
  inferenceDataVar,
  scaleBarDataVar,
  selectedScanObjectIndexVar,
  showInferenceLayerVar,
} from "../../../apollo/cache";
import ScaleBarWrapper from "../ScaleBarWrapper";
import RecenterButton from "../../atoms/RecenterButton";
import { Matrix4 } from "math.gl";
import useScanObjectLayer from "../../../hooks/useScanObjectLayer";

// todo: need this to remove, just for reference for now

export interface ViewState {
  zoom: number;
  target: number[];
  default?: boolean;
}

const initialViewState = { zoom: 0, target: [0, 0, 0], default: true };

interface ExtendedPickingInfo extends PickingInfo {
  featureType?: string;
}

function ZarrImageViewer({
  dataUrl,
  baseLayerData,
  setBaseLayerData,
  selectedTimeIndex,
  handleRightClick,
  handleLeftClick,
  creationMode,
  handleAttributesPanel,
  updateNewPolygonPoints,
  setIsWellAttributesChanged,
}: {
  dataUrl: string;
  baseLayerData: any;
  setBaseLayerData: Function;
  selectedTimeIndex?: number | null;
  handleRightClick: Function;
  handleLeftClick: Function;
  handleBrightFieldClick: Function;
  creationMode: boolean;
  handleAttributesPanel: Function;
  updateNewPolygonPoints: Function;
  setIsWellAttributesChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [baseLayer, setBaseLayer] = useState<Layer | null>(null);
  const [viewState, setViewState] =
    useState<Record<string, any>>(initialViewState);

  const deckRef = useRef<DeckGLRef>(null);
  const defaultView = useRef<{ zoom?: number; target?: number[] } | null>(null);

  const canDrawInternalPolygon = useReactiveVar(canDrawInternalPolygonVar);
  const inferenceLayerData = useReactiveVar(inferenceDataVar);
  const imageEventData = useReactiveVar(imageEventDataVar);
  const showInferenceLayer = useReactiveVar(showInferenceLayerVar);

  const isValidInternalPolygon: React.MutableRefObject<boolean> =
    useRef<boolean>(true);

  const previousDataUrl = useRef("");

  const imageSize = useRef({
    height: 0,
    width: 0,
  });

  const { layer: polygonLayer }: { layer: any } = usePolygonLayer(
    setViewState,
    deckRef,
    setIsWellAttributesChanged
  );

  const { layer: creationLayer }: { layer: any } = usePolygonCreationLayer(
    creationMode,
    handleAttributesPanel,
    updateNewPolygonPoints,
    isValidInternalPolygon
  );

  const { layer: scanObjectLayer }: { layer: any } = useScanObjectLayer(
    deckRef,
    setViewState
  );

  useEffect(() => {
    if (dataUrl && selectedTimeIndex! > -1) {
      loadZarrFile(dataUrl, true, 1, selectedTimeIndex!).then((r) => {
        setBaseLayerData(r);
        if (previousDataUrl.current !== dataUrl) {
          setViewState(initialViewState);
        }
        previousDataUrl.current = dataUrl;
      });
    }
  }, [dataUrl, setBaseLayerData, selectedTimeIndex]);

  useEffect(() => {
    if (baseLayerData) {
      const layer = !baseLayerData.on
        ? null
        : new MultiscaleImageLayer(baseLayerData.layerProps);
      setBaseLayer(layer);
    }
  }, [baseLayerData]);

  if (
    deckRef.current &&
    viewState?.default &&
    baseLayer &&
    baseLayerData.layerProps.loader
  ) {
    const { deck } = deckRef.current;
    if (deck) {
      const { width, height, maxZoom } = getLayerSize(
        baseLayerData.layerProps.loader
      );
      const padding =
        (deck?.width ?? 0) < 400 ? 10 : (deck?.width ?? 0) < 600 ? 30 : 50; // Adjust depending on viewport width.
      const { zoom, target } = fitBounds(
        [width, height],
        [deck.width, deck.height],
        maxZoom,
        padding
      );
      imageSize.current = {
        width,
        height,
      };
      defaultView.current = { zoom, target };
      setViewState({ zoom, target });
    }
  }

  const layers: Array<Layer> = [];
  if (baseLayer) {
    layers.push(baseLayer);
  }

  if (polygonLayer) {
    layers.push(polygonLayer);
  }

  if (creationLayer) {
    layers.push(creationLayer);
  }

  if (scanObjectLayer) {
    layers.push(scanObjectLayer);
  }

  if (showInferenceLayer && baseLayer) {
    inferenceLayerData.forEach((x) => {
      if (x.on) {
        let props = x.layerProps;
        const { loader } = props;
        const { height } = getLayerSize(loader);
        const { height: imageHeight } = imageSize.current;
        if (height === imageHeight) {
          layers.push(new MultiscaleImageLayer(x.layerProps));
        } else {
          props = {
            ...props,
            modelMatrix: new Matrix4(Matrix4.IDENTITY).scale(
              imageHeight / height
            ),
          };
          layers.push(new MultiscaleImageLayer(props));
        }
      }
    });
  }

  if (baseLayer) {
    imageEventData?.forEach((x) => {
      if (x?.on) {
        let props = x.layerProps;
        const { loader } = props;
        const { height } = getLayerSize(loader);
        const { height: imageHeight } = imageSize.current;
        if (height === imageHeight) {
          layers.push(new MultiscaleImageLayer(x.layerProps));
        } else {
          props = {
            ...props,
            modelMatrix: new Matrix4(Matrix4.IDENTITY).scale(
              imageHeight / height
            ),
          };
          layers.push(new MultiscaleImageLayer(props));
        }
      }
    });
  }

  const handleDrag = useCallback(
    (info: any) => {
      if (canDrawInternalPolygon && isValidInternalPolygon.current) {
        const temp: ExtendedPickingInfo | null | undefined =
          deckRef.current?.pickObject({ x: info.x, y: info.y });
        if (temp?.featureType !== "polygons") {
          const allObjects = deckRef.current?.pickMultipleObjects({
            x: info.x,
            y: info.y,
          });
          const index =
            allObjects?.findIndex(
              (x: any) =>
                x.featureType === "polygons" &&
                x.index === 0 &&
                x.layer.id === "polygon-creation-layer"
            ) ?? -1;
          if (index < 0) {
            isValidInternalPolygon.current = false;
          }
        }
      }
    },
    [canDrawInternalPolygon]
  );

  const handleHover = (info: any) => {
    const { coordinate, layer } = info;
    const { height: imageHeight, width: imageWidth } = imageSize.current;
    let tile = info.tile;
    let value;
    if (
      layer &&
      layer instanceof MultiscaleImageLayer &&
      tile &&
      coordinate?.[0] &&
      coordinate?.[1] &&
      coordinate[0] < imageWidth &&
      coordinate[1] < imageHeight &&
      coordinate[0] >= 0 &&
      coordinate[1] >= 0
    ) {
      const tileSize: number = layer?.props?.loader?.[0]?.tileSize ?? 1;
      const bbox = tile.bbox;
      const { left, top, right } = bbox;
      const scale = (right - left) / tileSize;
      const expansionScale = layer?.props?.modelMatrix?.[0] ?? 1;
      const tileX = (coordinate?.[0] / expansionScale - left) / scale;
      const tileY = (coordinate?.[1] / expansionScale - top) / scale;
      const { data, height, width } = tile.data;
      if (tileX < width && tileY < height) {
        const index = Math.round(tileY) * width + Math.round(tileX);
        value = data?.[0]?.[index];
      }
    }
    scaleBarDataVar({
      x: coordinate?.[0] ?? 0,
      y: coordinate?.[1] ?? 0,
      height: imageHeight,
      width: imageWidth,
      value: Number.isFinite(value) ? `${value}` : "",
    });
  };

  const px_mm =
    (baseLayerData?.attrs?.multiscales?.[0]?.datasets?.[0]?.[
      "voxel_in_mm"
    ]?.[1] ||
      baseLayerData?.attrs?.multiscales?.[0]?.["voxel_in_mm"]?.[1]) ??
    1;
  const zoom = viewState?.zoom ?? 0;

  const recenterImage = () => {
    if (defaultView.current) {
      const zoom = defaultView.current?.zoom as number;
      const target = defaultView.current?.target as number[];
      setViewState({
        zoom,
        target,
      });
    }
  };

  return (
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <DeckGL
        ref={deckRef}
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={{
          doubleClickZoom: false,
        }}
        layers={layers}
        views={[new OrthographicView({ id: "ortho" })]}
        onClick={(info: any, e: any) => {
          if (info?.featureType === undefined) {
            selectedScanObjectIndexVar(-1);
          }
          if (info?.featureType === "polygons" && e?.rightButton) {
            handleRightClick(info, e);
          }
          if (info?.featureType === "polygons" && e?.leftButton) {
            handleLeftClick(info, e);
          }
        }}
        onDragStart={(info: any) => handleDrag(info)}
        onDrag={(info: any) => handleDrag(info)}
        onDragEnd={(info: any) => handleDrag(info)}
        onHover={(info: any) => handleHover(info)}
      />
      <div
        css={{
          display: "grid",
          justifyContent: "end",
          gridAutoFlow: "row",
          justifyItems: "end",
          position: "absolute",
          bottom: 16,
          right: 12,
          gap: 24,
        }}
      >
        <div
          css={{
            paddingRight: 16,
          }}
        >
          <RecenterButton onClick={() => recenterImage()} />
        </div>
        <ScaleBarWrapper px_mm={px_mm} zoom={zoom} />
      </div>
    </div>
  );
}

export default ZarrImageViewer;
