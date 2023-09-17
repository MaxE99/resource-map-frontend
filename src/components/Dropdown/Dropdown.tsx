import { useState } from "react";
import OpenButton from "./OpenButton";
import RemoveButton from "./RemoveButton";
import Options from "./Options";
import "./styles/Dropdown.css";

type DropdownProps = {
  label: string;
  setSelected: (arg: string | undefined) => void;
  selected: string | undefined;
  options: any;
};

const Dropdown = ({
  label,
  setSelected,
  selected,
  options,
}: DropdownProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="dropdown" onClick={() => setOpen(!open)}>
      <div
        style={{
          display: "flex",
          height: "100%",
          padding: "1px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={`dropdown-inner${open ? " dropdown-inner-open" : ""}`}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 0 0 20px",
              color: selected ? "inherit" : "var(--light-grey)",
            }}
          >
            {selected || label}
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
              gap: "10px",
            }}
          >
            <RemoveButton
              setOpen={setOpen}
              selected={selected}
              setSelected={setSelected}
            />
            <OpenButton open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
      {open && (
        <Options
          options={options}
          selected={selected}
          setSelected={setSelected}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default Dropdown;
