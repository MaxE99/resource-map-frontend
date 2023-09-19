import { CSSProperties } from "react";

import PricePlot from "./PricePlot";
import { AccordionWrapperT, SidebarT } from "../../types/sidebar";
import { SIDEBAR_STYLE } from "../../styles/sidebar";
import { BASE_STYLE } from "../../styles/base";
import { DOMAIN } from "../../config";
import Accordion from "../Accordion/Accordion";

const Sidebar = ({ commodity, govInfo, prices }: SidebarT): JSX.Element => {
  const govInfoData: AccordionWrapperT[] = [
    {
      index: 3,
      summary: "Production and Use",
      details: govInfo?.prod_and_use,
    },
    { index: 4, summary: "Recycling", details: govInfo?.recycling },
    { index: 5, summary: "Events & Trends", details: govInfo?.events },
    {
      index: 6,
      summary: "World Resources",
      details: govInfo?.world_resources,
    },
    { index: 7, summary: "Substitutes", details: govInfo?.substitutes },
  ];

  return (
    <div
      style={{
        ...(SIDEBAR_STYLE.WRAPPER as CSSProperties),
        color: BASE_STYLE.COLOR_PALLETE.TEXT,
        boxShadow: BASE_STYLE.BOX_SHADOW,
      }}
    >
      <div style={{ padding: "20px", lineHeight: 1.8, textAlign: "justify" }}>
        <div style={SIDEBAR_STYLE.NAME_CONTAINER as CSSProperties}>
          <img
            src={DOMAIN + "/static/" + commodity.img_path + ".jpg"}
            alt={commodity.name + " Image"}
            style={{
              marginRight: "10px",
              width: "40px",
              borderRadius: "4px",
            }}
          />
          {commodity.name}
        </div>
        {prices && prices.length > 0 && <PricePlot data={prices} />}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Accordion
            index={1}
            label="Overview"
            body={
              <div
                dangerouslySetInnerHTML={{
                  __html: commodity.info
                    .replace(/\n/g, "<br>")
                    .replace(/(\s*<br\s*\/?>)+\s*$/, ""),
                }}
              />
            }
          ></Accordion>
          <Accordion
            index={2}
            label="Largest Producers"
            body={
              <div>
                {commodity.companies.map((commodity: string) => (
                  <div key={commodity} style={{ margin: "5px 0 0 10px" }}>
                    {commodity}
                  </div>
                ))}
              </div>
            }
          />
          {govInfo?.events &&
            govInfoData.map((item: AccordionWrapperT) => (
              <Accordion
                key={item.index}
                index={item.index}
                label={item.summary}
                body={item.details}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
