import React, { useEffect, useState } from "react";
import { API } from "../../config";
import PricePlot from "./PricePlot";
import AccordionWrapper from "./AccordionWrapper";

const Sidebar = ({ commodity, govInfo }: any): JSX.Element => {
  const [prices, setPrices] = useState();

  useEffect(() => {
    if (commodity) {
      fetch(`${API.PRICES}?commodity=${commodity.name}`, {
        method: "GET", // Specify the GET method
      })
        .then((response) => response.json())
        .then((data) => setPrices(data));
    }
  }, [commodity]);

  return (
    <div
      style={{
        width: "32.5%",
        height: "calc(100vh - 60px)",
        border: "1px solid var(--main-text)",
        borderRadius: "20px",
        color: "var(--main-text)",
        overflowY: "auto",
      }}
    >
      {commodity && (
        <div style={{ padding: "20px", lineHeight: 1.8, textAlign: "justify" }}>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 600,
              display: "flex",
              marginBottom: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={"http://localhost:8000/static/" + commodity.img_path}
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
            details={commodity.companies.map((commodity: any) => (
              <div key={commodity} style={{ margin: "5px 0 0 10px" }}>
                {commodity}
              </div>
            ))}
          />
          {govInfo?.length > 0 && govInfo[0]?.prod_and_use && (
            <React.Fragment>
              <AccordionWrapper
                index={3}
                summary="Production and Use"
                details={govInfo[0].prod_and_use}
              />
              <AccordionWrapper
                index={4}
                summary="Recycling"
                details={govInfo[0].recycling}
              />
              <AccordionWrapper
                index={5}
                summary="Events & Trends"
                details={govInfo[0].events}
              />
              <AccordionWrapper
                index={6}
                summary="World Resources"
                details={govInfo[0].world_resources}
              />
              <AccordionWrapper
                index={7}
                summary="Substitutes"
                details={govInfo[0].substitutes}
              />
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
