import { useEffect, useState } from "react";

import Dropdown from "./Dropdown";

const Sidebar = (): JSX.Element => {
  return (
    <div
      style={{
        width: "25%",
        margin: "100px 0 100px 2.5%",
        height: "50rem",
        border: "1px solid var(--main-text)",
        borderRadius: "20px",
        color: "var(--main-text)",
      }}
    >
      Resource Map
      <Dropdown />
    </div>
  );
};

export default Sidebar;
