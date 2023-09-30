import { Fragment, useState } from "react";
import { SidebarProps, SidebarSelected } from "./types";
import { IoBookmarkOutline, IoInformationCircleOutline } from "react-icons/io5";
import { DOMAIN } from "../../config";
import SidebarHead from "./SidebarHead";
import SidebarMenu from "./SidebarMenu";
import DataSources from "./DataSources";
import ResourceBody from "./ResourceBody";
import AboutUs from "./AboutUs";
import Backdrop from "../Backdrop/Backdrop";
import LoadingProgress from "../LoadingProgress/LoadingProgress";

const Sidebar = ({
  commodity,
  govInfo,
  prices,
  isLoading,
}: SidebarProps): JSX.Element => {
  const [selected, setSelected] = useState<SidebarSelected>("resource");

  const getSidebarHead = (): JSX.Element => {
    if (selected === "datasource")
      return (
        <SidebarHead
          key="datasource"
          icon={
            <IoBookmarkOutline
              style={{ fontSize: "40px", color: "var(--light-grey)" }}
            />
          }
          label={"Data Sources"}
        />
      );
    if (selected === "about")
      return (
        <SidebarHead
          key="about"
          icon={
            <IoInformationCircleOutline
              style={{ fontSize: "40px", color: "var(--light-grey)" }}
            />
          }
          label={"About Us"}
        />
      );
    return (
      <SidebarHead
        key="default"
        icon={
          <img
            src={DOMAIN + "/static/" + commodity.img_path + ".jpg"}
            alt={commodity.name + " Image"}
            width={45}
            height={45}
            style={{
              borderRadius: "4px",
              border: "2px solid var(--light-grey)",
            }}
          />
        }
        label={commodity.name}
      />
    );
  };

  const getSidebarBody = (): JSX.Element => {
    if (selected === "datasource") return <DataSources />;
    if (selected === "about") return <AboutUs />;
    return (
      <ResourceBody commodity={commodity} govInfo={govInfo} prices={prices} />
    );
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div
          style={{
            padding: "20px",
            textAlign: "justify",
            color: "#c2c4d8",
          }}
        >
          <Fragment>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              {getSidebarHead()}
              <SidebarMenu selected={selected} setSelected={setSelected} />
            </div>
            {getSidebarBody()}
          </Fragment>
        </div>
      </div>
      {isLoading && (
        <Backdrop
          children={[
            <div
              key="loading"
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingProgress />
            </div>,
          ]}
        />
      )}
    </div>
  );
};

export default Sidebar;
