import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { SIDEBAR_STYLE } from "../../styles/sidebar";
import { BASE_STYLE } from "../../styles/base";
import { AccordionWrapperT } from "../../types/sidebar";

const AccordionWrapper = ({
  index,
  summary,
  details,
}: AccordionWrapperT): JSX.Element => {
  return (
    <Accordion sx={SIDEBAR_STYLE.ACCORDION}>
      <AccordionSummary
        expandIcon={
          <KeyboardArrowDownIcon
            sx={{ color: BASE_STYLE.COLOR_PALLETE.TEXT }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={SIDEBAR_STYLE.INDEX}>{index}</div>
          <span>{summary}</span>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: "0 40px 20px",
          "& div": {
            marginTop: "0 !important",
          },
        }}
      >
        {details}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionWrapper;
