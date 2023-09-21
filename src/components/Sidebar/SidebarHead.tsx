import { SidebarHeadProps } from "./types";
import "./styles.css";

const SidebarHead = ({ icon, label }: SidebarHeadProps): JSX.Element => {
  return (
    <div className="sidebar-head">
      {icon}
      <label>{label}</label>
    </div>
  );
};

export default SidebarHead;
