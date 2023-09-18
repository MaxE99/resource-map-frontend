import "./styles.css";
import { OptionProps } from "./types";

const Option = ({
  identifier,
  handleClick,
  selected,
  children,
}: OptionProps): JSX.Element => {
  return (
    <li
      className={
        selected === identifier ? "dropdown-option-selected" : "dropdown-option"
      }
      onClick={handleClick}
    >
      <div
        style={{
          width: "3px",
          backgroundColor:
            selected === identifier ? "var(--main-element)" : "inherit",
          padding: "unset",
        }}
      />
      {children ? children.map((child) => child) : ""}
      <label
        style={{
          padding: "6px",
          fontWeight: selected === identifier ? 800 : "inherit",
        }}
      >
        {identifier}
      </label>
    </li>
  );
};

export default Option;
