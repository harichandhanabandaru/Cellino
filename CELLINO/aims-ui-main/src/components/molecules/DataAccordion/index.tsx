import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Box } from "@mui/material";
import { COLORS } from "../../../theme/Colors";

interface IDataProps {
  name: string;
  value: number | string;
}

const Data = ({ name, value }: IDataProps) => {
  return (
    <Grid item container direction="row" width="246px">
      <Grid item flexGrow={1}>
        <Typography
          sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS }}
          variant="body4"
        >
          {name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          sx={{ color: COLORS.BETA_TEXT_HIGH_EMPHASIS }}
          variant="body4"
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export interface IDataAccordionProps {
  runValue: number | string;
  status: string;
  confluenceValue: string | number;
}

const DataAccordion = ({
  runValue,
  status,
  confluenceValue,
}: IDataAccordionProps) => {
  return (
    <Box data-testid="data">
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize="large" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ flexDirection: "row-reverse" }}
        >
          <Typography
            sx={{ ml: "4px", color: COLORS.BETA_TEXT_HIGH_EMPHASIS }}
            variant="body4"
          >
            Data
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ ml: "2.5rem" }}>
          <Grid container direction="column" rowSpacing={2}>
            <Data name="Day in the run" value={runValue} />
            <Data name="Review status" value={status} />
            <Data name="Confluence" value={confluenceValue} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DataAccordion;
