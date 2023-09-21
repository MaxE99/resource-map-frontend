import { LiaBarsSolid } from "react-icons/lia";
import {
  IoDiamondOutline,
  IoBookmarkOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import "./styles.css";
import { useState } from "react";
import { SidebarMenuProps } from "./types";

const SidebarMenu = ({
  selected,
  setSelected,
}: SidebarMenuProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`sidebar-menu${open ? " sidebar-menu-open" : ""}`}>
      <div
        className={`sidebar-menu-inner${
          open ? " sidebar-menu-inner-open" : ""
        }`}
      >
        <button className="sidebar-menu-button" onClick={() => setOpen(!open)}>
          <LiaBarsSolid style={{ fontSize: "40px" }} />
        </button>
        <button
          className={`sidebar-menu-button${
            selected === "resource" ? " sidebar-menu-button-selected" : ""
          }`}
          onClick={() => setSelected("resource")}
        >
          <IoDiamondOutline style={{ fontSize: "28px" }} />
        </button>
        <button
          className={`sidebar-menu-button${
            selected === "datasource" ? " sidebar-menu-button-selected" : ""
          }`}
          onClick={() => setSelected("datasource")}
        >
          <IoBookmarkOutline style={{ fontSize: "28px" }} />
        </button>
        <button
          className={`sidebar-menu-button${
            selected === "about" ? " sidebar-menu-button-selected" : ""
          }`}
          onClick={() => setSelected("about")}
        >
          <IoInformationCircleOutline style={{ fontSize: "31px" }} />
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
