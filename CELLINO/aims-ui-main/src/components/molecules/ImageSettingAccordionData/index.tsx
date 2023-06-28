import { Typography } from "@mui/material";
import { FC } from "react";
import DynamicTreeView from "../DynamicTreeView";
import { ImageSetting } from "../../../generated/graphql";

interface IImageSettingAccordionFieldProps {
  imageSettingData: ImageSetting | undefined | null;
  title: string;
}

export const ImageSettingAccordionField: FC<
  IImageSettingAccordionFieldProps
> = (props) => {
  const imageSettingData = props.imageSettingData;
  const imageSettingWithoutTypename = Object.assign({}, imageSettingData);
  delete imageSettingWithoutTypename.__typename;
  return (
    <>
      <Typography
        variant={"overline"}
        sx={{ textTransform: "none", fontSize: "14px" }}
      >
        {props.title}
      </Typography>
      <DynamicTreeView
        treeViewRenderData={imageSettingWithoutTypename}
        key={props.imageSettingData?.id}
      />
    </>
  );
};
