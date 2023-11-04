import React, { useState } from "react";
import OpenButton from "./OpenButton";
import RemoveButton from "./RemoveButton";
import OptionList from "./OptionList";
import "./styles.css";
import { DropdownProps, OptionProps } from "./types";

const Dropdown = ({
  renderRemove,
  isModeActivated,
  label,
  setSelected,
  selected,
  options,
}: DropdownProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const getSelectedImage = (): JSX.Element => {
    if (!selected) return <React.Fragment />;
    const selectedOption: OptionProps | undefined = options.find(
      (option) => option.identifier === selected,
    );

    return (
      <div
        style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
      >
        {selectedOption && selectedOption.children}
      </div>
    );
  };

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
          <div style={{ display: "flex" }}>
            {getSelectedImage()}
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
          </div>
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
