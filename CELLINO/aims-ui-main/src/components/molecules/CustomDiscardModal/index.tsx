import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  Divider,
  Typography,
} from "@mui/material";
import {
  button,
  contentDiv,
  dialogActions,
  image,
  paper,
  rootDiv,
} from "./constants";
import warning from "../../../assets/warning.jpg";
import { COLORS } from "../../../theme/Colors";

export interface DiscardModalProps {
  heading: string;
  subText: string;
  open: boolean;
  handleCancel: Function;
  handleContinue: Function;
  cancelButtonText?: string;
  continueButtonText?: string;
  loading?: boolean;
}

const CustomDiscardModal = (props: DiscardModalProps) => {
  const {
    heading,
    subText,
    open,
    handleCancel,
    handleContinue,
    cancelButtonText,
    continueButtonText,
    loading,
  } = props;

  return (
    <Dialog
      open={open}
      PaperProps={{ sx: paper }}
      onClose={() => handleCancel()}
    >
      <Box sx={rootDiv}>
        <CardMedia sx={image} src={warning} component={"img"} />
        <Box sx={contentDiv}>
          <Typography variant={"subtitle5"}>{heading}</Typography>
          <Typography
            variant={"body3"}
            color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
          >
            {subText}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <DialogActions sx={dialogActions}>
        <Button sx={button} variant={"outlined"} onClick={() => handleCancel()}>
          {cancelButtonText ?? "Cancel"}
        </Button>
        <Button
          sx={button}
          variant={"contained"}
          onClick={() => handleContinue()}
          disabled={loading}
        >
          {continueButtonText ?? "Continue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDiscardModal;
