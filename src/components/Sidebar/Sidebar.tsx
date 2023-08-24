import Dropdown from "./Dropdown";

const Sidebar = (): JSX.Element => {
  return (
    <div style={{ width: "30%", color: "var(--main-text)" }}>
      Resource Map
      <Dropdown />
    </div>
  );
}

export default Sidebar;
