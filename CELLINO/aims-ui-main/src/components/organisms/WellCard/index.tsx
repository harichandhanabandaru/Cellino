import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
} from "@mui/material";

import DataAccordion, {
  IDataAccordionProps,
} from "../../molecules/DataAccordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "../../../theme/Colors";

export interface IWellCardProps extends IDataAccordionProps {
  img?: string;
  wellName?: string;
  plateId?: string | number;
  noOfColonies?: number;
  open?: any;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const WellCard: React.FC<IWellCardProps> = ({
  runValue,
  status,
  confluenceValue,
  img,
  wellName,
  plateId,
  open,
  setOpen,
  ...props
}) => {
  return (
    <Card
      sx={{
        width: "23vw",
        position: "absolute",
        right: "0px",
        top: "8%",
      }}
      data-testid="wellcard"
    >
      <CardHeader
        sx={{
          bgcolor: "#979598",
          "& .MuiCardHeader-subheader": {
            color: "white",
          },
        }}
        action={
          <IconButton aria-label="settings" onClick={open}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        }
        subheader={`Well ${wellName} - Cellino Au ${plateId}`}
      />
      <CardActionArea>
        <CardMedia
          sx={{
            p: "15px",
            width: "100%",
            height: "32vh",
            borderRadius: "13%",
          }}
          component="img"
          height="100%"
          image={img}
          alt="well"
        />
        <Chip
          label="03/20/22 16:30"
          sx={{
            width: "120px",
            height: "26px",
            color: "white",
            bgcolor: "#656267",
            zIndex: "100",
            position: "absolute",
            bottom: "40px",
            left: "40px",
          }}
        />
      </CardActionArea>
      <CardContent
        sx={{
          pt: 0,
          overflowY: "scroll",
        }}
      >
        <Grid container direction="column" height="50vh">
          <Grid
            item
            container
            justifyContent="space-between"
            md={2}
            xs={2}
            sx={{ marginTop: "1%" }}
          >
            <Typography
              sx={{ ml: "20px", color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
              variant="body5"
            >
              {props.noOfColonies} colonies
            </Typography>
            <Chip
              label="Scanning"
              clickable
              sx={{
                width: "128px",
                height: "26px",
                color: "#38CB89",
                bgcolor: "#E5F6EF",
                fontWeight: 600,
                fontSize: "15px",
              }}
            />
          </Grid>
          <Grid item container direction="column" md={6} xs={6}>
            <DataAccordion
              runValue={runValue}
              status={status}
              confluenceValue={confluenceValue}
            />
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                "&:before": {
                  display: "none",
                },
                mt: "7%",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ flexDirection: "row-reverse" }}
              >
                <Typography
                  sx={{ ml: "5px", color: COLORS.BETA_TEXT_HIGH_EMPHASIS }}
                  variant="body4"
                >
                  Comments(0)
                </Typography>
              </AccordionSummary>
            </Accordion>
          </Grid>
          <Grid item xs={2} md={2}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              sx={{
                height: "48px",
                borderRadius: "12px",
                textTransform: "none",
              }}
            >
              View well
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WellCard;
