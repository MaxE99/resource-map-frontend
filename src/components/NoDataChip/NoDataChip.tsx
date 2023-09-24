import "./styles.css";
import { NoDataChipProps } from "./types";

const NoDataChip = ({ label }: NoDataChipProps): JSX.Element => {
  return <div className="no-data-chip">no {label} data found</div>;
};

export default NoDataChip;
