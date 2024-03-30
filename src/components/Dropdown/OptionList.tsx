import { useEffect, useState } from "react";

import "./styles.css";
import Option from "./Option";
import { OptionListProps } from "./types";

const OptionList = ({
  options,
  selected,
  setSelected,
  setOpen,
}: OptionListProps): JSX.Element => {
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
          <Option
            key={option.identifier}
            identifier={option.identifier}
            children={option.children}
            selected={selected}
            handleClick={() => {
              setOpen(false);
              setSelected(option.identifier);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default OptionList;
