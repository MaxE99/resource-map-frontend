import { AccordionHeadProps } from "./types";
import { IoIosArrowDown } from "react-icons/io";
import "./styles.css";

const AccordionHead = ({
  index,
  label,
  open,
  setOpen,
}: AccordionHeadProps): JSX.Element => {
  return (
    <div className="accordion-head" onClick={() => setOpen(!open)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "16px",
        }}
      >
        {index >= 0 && <div className="accordion-head-chip">{index}</div>}
        <label style={{ color: "var(--main-text)" }}>{label}</label>
      </div>
      <IoIosArrowDown
        style={{
          fontSize: "25px",
          transform: open ? "rotate(180deg)" : "",
          transition: "400ms all ease",
        }}
      />
    </div>
  );
};

export default AccordionHead;
