import { CSSProperties, useEffect, useState } from "react";

import PricePlot from "./PricePlot";
import AccordionWrapper from "./AccordionWrapper";
import { AccordionWrapperT, SidebarT } from "../../types/sidebar";
import { fetchPriceData } from "../../functions/api";
import { CommodityPriceT } from "../../types/api";
import { SIDEBAR_STYLE } from "../../styles/sidebar";
import { BASE_STYLE } from "../../styles/base";
import { DOMAIN } from "../../config";

const Sidebar = ({ commodity, govInfo }: SidebarT): JSX.Element => {
  console.log(govInfo);
  const [prices, setPrices] = useState<CommodityPriceT[]>();

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

  useEffect(() => {
    if (commodity) {
      fetchPriceData(commodity.name)
        .then((data: CommodityPriceT[]) => setPrices(data))
        .catch((error) => console.error("Error fetching price data:", error));
    }
  }, [commodity]);

  return (
    <div
      style={{
        ...(SIDEBAR_STYLE.WRAPPER as CSSProperties),
        color: BASE_STYLE.COLOR_PALLETE.TEXT,
      }}
    >
      {commodity && (
        <div style={{ padding: "20px", lineHeight: 1.8, textAlign: "justify" }}>
          <div style={SIDEBAR_STYLE.NAME_CONTAINER}>
            <img
              src={DOMAIN + "/static/" + commodity.img_path}
              alt={commodity.name + " Image"}
              style={{
                marginRight: "10px",
                width: "40px",
                borderRadius: "4px",
              }}
            />
            {commodity.name}
          </div>
          {prices && <PricePlot data={prices} />}
          <AccordionWrapper
            index={1}
            summary="Overview"
            details={
              <div
                style={{ margin: "20px 0 0" }}
                dangerouslySetInnerHTML={{
                  __html: commodity.info
                    .replace(/\n/g, "<br>")
                    .replace(/(\s*<br\s*\/?>)+\s*$/, ""),
                }}
              ></div>
            }
          />
          <AccordionWrapper
            index={2}
            summary="Largest Producers"
            details={commodity.companies.map((commodity: string) => (
              <div key={commodity} style={{ margin: "5px 0 0 10px" }}>
                {commodity}
              </div>
            ))}
          />
          {govInfo?.events &&
            govInfoData.map((item: AccordionWrapperT) => (
              <AccordionWrapper
                key={item.index}
                index={item.index}
                summary={item.summary}
                details={item.details}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
