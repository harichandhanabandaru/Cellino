import { FC } from "react";
import memoize from "memoize-one";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import AttributeField from "../AttributeField";
import { ImageEvent } from "../../../generated/graphql";
interface ImageEventAccordionDataProps {
  imageEventData: ImageEvent | undefined;
}
const ImageEventStaticFieldsMemoized = memoize(
  (imageEventData: ImageEvent | undefined, text) => {
    const dateType = (timestamp: string | null | undefined) => {
      if (timestamp !== null && timestamp !== undefined) {
        const date = new Date(timestamp);
        return date.toLocaleString();
      } else {
        return "-";
      }
    };
    return [
      {
        label: text("brightFieldAccordion:captureStartTime"),
        value: dateType(imageEventData?.startedAt),
      },
      {
        label: text("brightFieldAccordion:captureEndTime"),
        value: dateType(imageEventData?.completedAt),
      },
      {
        label: text("brightFieldAccordion:protocalID"),
        value: imageEventData?.protocol?.id ?? "-",
      },
    ];
  }
);
export const ImageEventAccordionData: FC<ImageEventAccordionDataProps> = ({
  imageEventData,
}) => {
  const { t: text } = useTranslation(["brightFieldAccordion"]);
  const imageEventLabels = ImageEventStaticFieldsMemoized(imageEventData, text);

  return (
    <>
      <div
        css={{
          display: "grid",
          gridAutoFlow: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        style={{ paddingTop: "8px", paddingBottom: "8px" }}
      >
        <Typography
          variant={"overline"}
          sx={{ textTransform: "none", fontSize: "14px" }}
        >
          Image Event
        </Typography>
      </div>
      <div
        css={{
          display: "grid",
          gridAutoFlow: "row",
          padding: "0",
        }}
      >
        {imageEventLabels.map(
          (imageEventLabel: { label?: string; value: string | number }) => (
            <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
              <AttributeField
                key={imageEventLabel.label}
                label={imageEventLabel.label}
                value={imageEventLabel.value}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};
