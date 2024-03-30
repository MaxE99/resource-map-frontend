import { Tooltip } from "@mui/material";

import "./styles.css";
import { BASE_STYLE } from "../../utils/styles/base";

type FormButtonT = {
  label: string;
  icon: JSX.Element;
  isSelected: boolean;
  clickHandler: () => void;
};

const FormButton = ({
  label,
  icon,
  isSelected,
  clickHandler,
}: FormButtonT): JSX.Element => {
  return (
    <Tooltip title={!isSelected && label}>
      <button
        className="formButton"
        style={{
          backgroundColor: isSelected
            ? BASE_STYLE.COLOR_PALLETE.ELEMENTS
            : BASE_STYLE.COLOR_PALLETE.BACKGROUND,
          color: isSelected
            ? BASE_STYLE.COLOR_PALLETE.TEXT
            : BASE_STYLE.COLOR_PALLETE.LIGHT_GREY,
        }}
        onClick={() => {
          clickHandler();
        }}
      >
        <div className="outerDiv">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={`dropdown-inner ${isSelected ? "button-inner" : ""}`}
          >
            {icon}
          </div>
        </div>
      </button>
    </Tooltip>
  );
};

export default FormButton;
