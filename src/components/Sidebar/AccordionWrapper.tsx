import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AccordionWrapper = ({ index, summary, details }: any): JSX.Element => {
  return (
    <Accordion
      sx={{
        background: "transparent",
        color: "white",
        border: "1px solid",
        marginTop: "20px",
      }}
    >
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              marginRight: "10px",
              borderRadius: "50%",
              background: "white",
              width: "24px",
              height: "24px",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {index}
          </div>
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
