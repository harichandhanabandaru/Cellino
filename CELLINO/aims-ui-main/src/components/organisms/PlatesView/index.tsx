// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { KanbanViewCards } from "../KanbanViewCards";
import {
  usePhasesAndPlatesLazyQuery,
  useRunsQuery,
  usePassagesQuery,
} from "../../../generated/graphql";
import { loaderCountVar } from "../../../apollo/cache";
import TopBarKanbanView from "../TopBarKanbanView";
import MultiselectList from "../MultiselectList";
import {
  RunAndPassageFilterData,
  renderRunAndPassageName,
} from "./renderers/renderRunAndPassageName";
import MultiSelectSearch from "../MultiSelectSearch";
import { Plate } from "../../../constants/types";

const RUN_DATA_SIZE = 50;
const PLATE_DATA_SIZE = 30;

export interface PlateQueryVariables {
  runIds: string[];
  reviewerIds: string[];
  size: number;
  page: number;
  plateNameList: string[];
  passageList: string[];
}
export interface PlateAndPhaseData {
  __typename: "Phase";
  id: string;
  phaseName: string;
  plateData: {
    content: Plate[];
    pageInfo: {
      __typename: "PageInformation";
      page: number;
      size: number;
      totalElements: number;
    };
  };
}

const initialPlateQueryVariables = {
  runIds: [],
  reviewerIds: [],
  size: PLATE_DATA_SIZE,
  page: 1,
  plateNameList: [],
  passageList: [],
};

const emptyDataArray: PlateAndPhaseData[] = [];

export default function PlatesView() {
  //states for the component
  const [runFilterData, setRunFilterData] = React.useState<
    RunAndPassageFilterData[]
  >([]);
  const [passageFilterData, setPassageFilterData] = React.useState<
    RunAndPassageFilterData[]
  >([]);
  const [passageNameFilter, setPassageNameFilter] = React.useState<
    RunAndPassageFilterData[]
  >([]);
  const [runNameFilter, setRunNameFilter] = React.useState<
    RunAndPassageFilterData[]
  >([]);
  const [plateNameList, setPlateNameList] = React.useState<string[]>([]);
  const [plateQueryVariables, setPlateQueryVariables] =
    useState<PlateQueryVariables>(initialPlateQueryVariables);
  const [data, setData] = React.useState<PlateAndPhaseData[]>(emptyDataArray);

  //Queries for fetching the data
  //TODO: Should implement pagination for runs , currently hardcoding size
  const { data: runsData, loading: runLoading } = useRunsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      page: 1,
      size: RUN_DATA_SIZE,
    },
  });
  const [
    getPlateAndPhaseData,
    { data: phaseAndPlateData, loading: phaseDataLoading },
  ] = usePhasesAndPlatesLazyQuery({
    fetchPolicy: "cache-and-network",
  });
  const { data: passageData } = usePassagesQuery();

  useEffect(() => {
    setPlateQueryVariables((prevState) => ({
      ...prevState,
      runIds: runNameFilter.map((ele) => ele.id),
      reviewerIds: [],
      plateNameList,
      passageList: passageNameFilter.map((ele) => ele.id),
    }));
  }, [runNameFilter, passageNameFilter, plateNameList]);

  useEffect(() => {
    if (plateQueryVariables) {
      getPlateAndPhaseData({
        variables: plateQueryVariables,
        fetchPolicy: "cache-and-network",
      });
    }
  }, [getPlateAndPhaseData, plateQueryVariables]);

  useEffect(() => {
    if (phaseAndPlateData?.phases) {
      setData(phaseAndPlateData.phases as PlateAndPhaseData[]);
    }
  }, [phaseAndPlateData]);

  useEffect(() => {
    if (runsData?.runs?.content) {
      setRunFilterData(
        runsData.runs.content.map((ele) => {
          return {
            id: ele.id,
            name: ele.name,
          };
        })
      );
    }
  }, [runsData]);

  useEffect(() => {
    if (passageData?.passages?.passagenumber) {
      setPassageFilterData(
        passageData?.passages?.passagenumber.map((ele: any) => {
          return {
            id: ele,
            name: ele,
          };
        })
      );
    }
  }, [passageData]);

  useEffect(() => {
    return () => {
      loaderCountVar({ count: 0 });
    };
  }, []);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!runLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (runLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [runLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!phaseDataLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (phaseDataLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [phaseDataLoading]);

  useEffect(() => {
    if (localStorage.hasOwnProperty("Plate Name") === false) {
      localStorage.setItem("Plate Name", "");
    } else {
      const plateNameFilterText = localStorage.getItem("Plate Name");
      if (plateNameFilterText !== null) {
        setPlateNameList(
          plateNameFilterText?.split(",").filter((element) => element)
        );
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.hasOwnProperty("Passage Number") === false) {
      localStorage.setItem("Passage Number", "");
    } else {
      setPassageNameFilter(
        localStorage.getItem("Passage Number")
          ? JSON.parse(localStorage.getItem("Passage Number") ?? "")
          : []
      );
    }

    if (localStorage.hasOwnProperty("Run Name") === false) {
      localStorage.setItem("Run Name", "");
    } else {
      setRunNameFilter(
        localStorage.getItem("Run Name")
          ? JSON.parse(localStorage.getItem("Run Name") ?? "")
          : []
      );
    }
  }, []);

  return (
    <div
      css={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridAutoFlow: "row",
      }}
    >
      <TopBarKanbanView label="Plates" />
      <div
        css={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gridAutoFlow: "row",
        }}
      >
        <div
          css={{
            padding: 28,
            display: "grid",
            gridAutoFlow: "column",
            justifyContent: "start",
            gap: "12px",
          }}
        >
          {runFilterData && (
            <MultiselectList
              label={"Run Name"}
              data={runFilterData}
              selectedData={runNameFilter}
              setSelectedData={setRunNameFilter}
              renderOption={renderRunAndPassageName}
              getOptionLabel={(option) => option.name}
            />
          )}
          {
            <MultiSelectSearch
              label={"Plate Name"}
              setSearchTextList={setPlateNameList}
            />
          }
          {passageFilterData && (
            <MultiselectList
              label={"Passage Number"}
              data={passageFilterData}
              selectedData={passageNameFilter}
              setSelectedData={setPassageNameFilter}
              renderOption={renderRunAndPassageName}
              getOptionLabel={(option) => option.name}
            />
          )}
        </div>
        <div
          css={{
            display: "grid",
            gridAutoFlow: "column",
            overflowX: "auto",
            gap: 24,
            justifyContent: "start",
            padding: "0 28px 28px 28px",
          }}
        >
          {data &&
            data?.map((phase) => {
              return (
                <KanbanViewCards
                  phase={phase}
                  key={phase?.id}
                  setData={setData}
                  plateQueryVariables={plateQueryVariables}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
