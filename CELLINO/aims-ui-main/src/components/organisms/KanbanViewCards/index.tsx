// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import PlateCardInfiniteList from "../../molecules/PlateCardInfiniteList";
import { COLORS } from "../../../theme/Colors";
import { usePlatesLazyQuery } from "../../../generated/graphql";
import { Plate } from "../../../constants/types";
import { PlateAndPhaseData, PlateQueryVariables } from "../PlatesView";
import { loaderCountVar } from "../../../apollo/cache";

interface KanbanViewCardsProps {
  phase: PlateAndPhaseData;
  setData: React.Dispatch<React.SetStateAction<PlateAndPhaseData[]>>;
  plateQueryVariables: PlateQueryVariables;
}

const typographyStyles = {
  marginLeft: "2px",
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "29px",
  letterSpacing: "1px",
  textAlign: "left",
  color: "#656267",
};

const ITEM_SIZE = 211;
const emptyPlateArray: Plate[] = [];

export const KanbanViewCards = ({
  phase,
  setData,
  plateQueryVariables,
}: KanbanViewCardsProps) => {
  const [page, setPage] = useState<number>(1);
  const plates = phase?.plateData.content ?? emptyPlateArray;
  const totalElements = phase?.plateData?.pageInfo.totalElements ?? 0;

  const [getPlatesData, { data: platesData, loading }] = usePlatesLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!loading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (loading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [loading]);

  const handleLoadNextPage = () => {
    if (!loading) {
      setPage(page + 1);
      if (plates.length < totalElements) {
        getPlatesData({
          variables: {
            ...plateQueryVariables,
            currentPhaseId: phase?.id,
            page: page + 1,
          },
        });
      }
    }
  };

  //useffect to append the data to the state maintained
  //append the newly fetched plate data to the phase which is being scrolled
  useEffect(() => {
    if (platesData) {
      setData((prevData: any) => {
        return prevData?.map((record: PlateAndPhaseData) =>
          record.id === phase?.id
            ? {
                ...record,
                plateData: {
                  ...record.plateData,
                  content: [
                    ...record.plateData.content,
                    ...platesData.plates.content,
                  ],
                },
              }
            : record
        );
      });
    }
  }, [phase?.id, platesData, setData]);

  //render infinite list
  return plates.length > 0 ? (
    <div
      css={{
        padding: 20,
        width: 340,
        backgroundColor: COLORS.GAMMA_BACKGROUND_03,
        borderRadius: 20,
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100%",
        gap: 20,
      }}
    >
      <Typography sx={typographyStyles}>
        {`${phase.phaseName} (${totalElements})`}
      </Typography>
      <div
        style={{
          height: "100%",
        }}
      >
        <PlateCardInfiniteList
          data={plates}
          loadNextPage={handleLoadNextPage}
          totalElements={totalElements}
          last={totalElements === plates.length}
          itemSize={ITEM_SIZE}
          phaseName={phase?.phaseName}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};
