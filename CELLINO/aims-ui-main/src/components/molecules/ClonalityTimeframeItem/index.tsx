import { SvgIcon, Typography } from "@mui/material";
import { ReactComponent as SelectedIcon } from "../../../assets/selected.svg";
import ImageWrapper from "../../organisms/ImageWrapper";
import { COLORS } from "../../../theme/Colors";
export interface ClonalityTimeframeItemProps {
  img: string;
  time: string;
  date?: string;
  selected?: boolean;
  selectImage: Function;
  imageid: string;
  index: number;
}

const ClonalityTimeframeItem: React.FC<ClonalityTimeframeItemProps> = ({
  img,
  time,
  date,
  selected,
  selectImage,
  imageid,
  index,
}) => {
  const selectImageFunction = () => {
    selectImage(imageid, index);
  };

  return (
    <div style={{ position: "relative" }}>
      <Typography
        variant="caption3"
        sx={{
          fontFamily: "Space Grotesk",
          backgroundColor: "#EAE4F0",
          fontWeight: "normal",
          borderRadius: "2px",
        }}
      >
        {date}
      </Typography>
      {selected && date === "" && (
        <SvgIcon
          sx={{
            marginLeft: "50px",
            position: "absolute",
          }}
          component={SelectedIcon}
        />
      )}
      {selected && date !== "" && (
        <SvgIcon
          sx={{
            marginLeft: "10px",
            position: "absolute",
          }}
          component={SelectedIcon}
        />
      )}
      <ImageWrapper
        src={img}
        onClick={selectImageFunction}
        cssStyles={
          date !== ""
            ? {
                display: "block",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: " center center",
                objectFit: "cover",
                height: "80px",
                width: "113px",
                marginTop: "4px",
                border: selected ? "3px solid #FFC800" : "none",
              }
            : {
                display: "block",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: " center center",
                objectFit: "cover",
                height: "80px",
                width: "113px",
                marginTop: "35px",
                border: selected ? "3px solid #FFC800" : "none",
              }
        }
        alt={""}
      />
      <Typography
        variant="caption3"
        sx={{
          position: "absolute",
          color: "#BCB7C0",
          bottom: 8,
          left: 8,
          backgroundColor: COLORS.GAMMA_BACKGROUND_03,
          padding: "0px  4px 0px  4px",
          borderRadius: "4px",
        }}
      >
        {time}
      </Typography>
    </div>
  );
};

export default ClonalityTimeframeItem;
