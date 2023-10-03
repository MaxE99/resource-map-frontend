import "./styles.css";
import { Tooltip } from "@mui/material";
import { BASE_STYLE } from "../../utils/styles/base";
import { Dispatch, SetStateAction } from "react";

type FormButtonT = {
  label: string;
  icon: JSX.Element;
  isSelected: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  setOtherButtonState: Dispatch<SetStateAction<boolean>>;
};

const FormButton = ({
  label,
  icon,
  isSelected,
  setState,
  setOtherButtonState,
}: FormButtonT): JSX.Element => {
  return (
    <Tooltip title={isSelected ? "Going back to commodity selection" : label}>
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
          setState(!isSelected);
          setOtherButtonState(false);
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
