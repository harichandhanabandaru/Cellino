import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { List } from "@mui/material";
import { FixedSizeList } from "react-window";
import memoize from "memoize-one";
import CardBox from "../../organisms/plateCard";
import React from "react";
import { Plate } from "../../../constants/types";

const THRESHOLD = 15;

const Item = ({
  data,
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
  data: { phaseData: Plate[]; phase: string | undefined };
}) => {
  const requiredData = data.phaseData;
  const currentItem = requiredData[index];
  const phase = data.phase;
  return (
    currentItem && (
      <div style={style}>
        <CardBox cardDetails={currentItem} key={index} phaseName={phase} />
      </div>
    )
  );
};

const createRequiredItemData = memoize((items) => items);

interface PlateCardInfiniteListProps {
  data: Array<any>;
  loadNextPage: (startIndex: number, stopIndex: number) => void;
  totalElements: number;
  last: boolean;
  itemSize: number;
  phaseName?: string;
}

function PlateCardInfiniteList({
  data,
  loadNextPage,
  totalElements,
  last,
  itemSize,
  phaseName,
}: PlateCardInfiniteListProps) {
  const isItemLoaded = (index: number) => last || index < data.length;

  const requiredItemData = createRequiredItemData(data);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={totalElements}
          loadMoreItems={loadNextPage}
          threshold={THRESHOLD}
        >
          {({ onItemsRendered, ref }) => (
            <List disablePadding>
              <FixedSizeList
                height={height}
                width={width}
                itemCount={requiredItemData.length}
                itemSize={itemSize}
                itemData={{
                  phaseData: requiredItemData,
                  phase: phaseName,
                }}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {Item}
              </FixedSizeList>
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}

export default PlateCardInfiniteList;
