import BackdropProps from "./types";
import "./styles.css";

const Backdrop = ({ children }: BackdropProps): JSX.Element => {
  return <div className="backdrop">{children.map((child) => child)}</div>;
};

export default Backdrop;
