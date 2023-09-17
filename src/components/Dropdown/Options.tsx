import { useEffect, useState } from "react";
import "./styles/Options.css";

type OptionsProps = {
  options: string[];
  selected: string | undefined;
  setSelected: (arg: string | undefined) => void;
  setOpen: (arg: boolean) => void;
};

const Options = ({
  options,
  selected,
  setSelected,
  setOpen,
}: OptionsProps): JSX.Element => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    clicked && setOpen(false);
    setClicked(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [clicked]);

  return (
    <div className="dropdown-options-wrapper">
      <ul style={{ padding: "4px 0" }}>
        {options.map((option: any) => (
          <li
            className={
              selected === option
                ? "dropdown-option-selected"
                : "dropdown-option"
            }
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
          >
            <div
              style={{
                width: "3px",
                backgroundColor:
                  selected === option ? "var(--main-element)" : "inherit",
                padding: "unset",
              }}
            />
            <label
              style={{
                padding: "6px",
                fontWeight: selected === option ? 800 : "inherit",
              }}
            >
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Options;
