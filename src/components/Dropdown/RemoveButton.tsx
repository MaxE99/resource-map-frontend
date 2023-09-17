import { IoMdClose } from "react-icons/io";
import "./styles/RemoveButton.css";

type RemoveButtonProps = {
  setOpen: (arg: boolean) => void;
  selected: string | undefined;
  setSelected: (arg: string | undefined) => void;
};

const RemoveButton = ({
  setOpen,
  selected,
  setSelected,
}: RemoveButtonProps): JSX.Element => {
  return (
    <div style={{ display: "flex" }}>
      {selected ? (
        <button
          className="dropdown-remove-button"
          onClick={() => {
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
