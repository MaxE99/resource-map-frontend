import { IoMdClose } from "react-icons/io";

import "./styles.css";
import { RemoveButtonProps } from "./types";

const RemoveButton = ({
  renderRemove,
  setOpen,
  selected,
  setSelected,
}: RemoveButtonProps): JSX.Element => {
  return (
    <div style={{ display: "flex" }}>
      {renderRemove && selected ? (
        <button
          className="dropdown-remove-button"
          onClick={(event) => {
            event.stopPropagation();
            setSelected(undefined);
            setOpen(false);
          }}
        >
          <IoMdClose style={{ fontSize: "25px" }} />
        </button>
      ) : (
        <div style={{ width: "25px", aspectRatio: "1/1" }} />
      )}
    </div>
  );
};

export default RemoveButton;
