import { useState } from "react";
import OpenButton from "./OpenButton";
import RemoveButton from "./RemoveButton";
import OptionList from "./OptionList";
import "./styles.css";
import { DropdownProps } from "./types";

const Dropdown = ({
  renderRemove,
  isModeActivated,
  label,
  setSelected,
  selected,
  options,
}: DropdownProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className="dropdown"
      onClick={() => setOpen(isModeActivated ? false : !open)}
    >
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
              color: selected ? "var(--main-text)" : "var(--light-grey)",
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
              renderRemove={renderRemove}
              setOpen={setOpen}
              selected={selected}
              setSelected={setSelected}
            />
            <OpenButton open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
      {open && (
        <OptionList
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
