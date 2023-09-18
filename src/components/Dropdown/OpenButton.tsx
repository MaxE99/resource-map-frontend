import { IoIosArrowDown } from "react-icons/io";
import "./styles.css";
import { OpenButtonProps } from "./types";

const OpenButton = ({ open, setOpen }: OpenButtonProps): JSX.Element => {
  return (
    <button className="dropdown-open-button" onClick={() => setOpen(!open)}>
      <IoIosArrowDown
        style={{
          fontSize: "25px",
          transform: open ? "rotate(180deg)" : "",
          transition: "400ms all ease",
        }}
      />
    </button>
  );
};

export default OpenButton;
