import { Fragment, useState } from "react";
import { IoBookmarkOutline, IoInformationCircleOutline } from "react-icons/io5";

import "./styles.css";
import { SidebarProps, SidebarSelected } from "./types";
import { CLOUDFRONT_DOMAIN } from "../../utils/config";
import SidebarHead from "./SidebarHead";
import SidebarMenu from "./SidebarMenu";
import DataSources from "./DataSources";
import ResourceBody from "./ResourceBody";
import AboutUs from "./AboutUs";
import BackdropWrapper from "../Backdrop/BackdropWrapper";
import { slugify } from "../../utils/functions/utils";

const Sidebar = ({
  commodity,
  govInfo,
  prices,
  isLoading,
  windowWidth,
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
            src={
              CLOUDFRONT_DOMAIN +
              "static/commodity_imgs/" +
              slugify(commodity.name.toLowerCase()) +
              ".jpg"
            }
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
    if (selected === "about") return <AboutUs windowWidth={windowWidth} />;
    return (
      <ResourceBody commodity={commodity} govInfo={govInfo} prices={prices} />
    );
  };

  return (
    <div
      style={{
        width: windowWidth > 1000 ? "32.5%" : "100%",
        height: windowWidth > 1000 ? "calc(100vh - 60px)" : "800px",
        position: "relative",
        borderRadius: "8px",
        border: "2px solid var(--light-grey)",
      }}
    >
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
      {isLoading && <BackdropWrapper />}
    </div>
  );
};

export default Sidebar;
