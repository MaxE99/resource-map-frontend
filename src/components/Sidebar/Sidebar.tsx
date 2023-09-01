import React, { useEffect, useState } from "react";
import { API } from "../../config";
import PricePlot from "./PricePlot";

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
        width: "25%",
        margin: "100px 0 100px 2.5%",
        height: "50rem",
        border: "1px solid var(--main-text)",
        borderRadius: "20px",
        color: "var(--main-text)",
        overflowY: "auto",
      }}
    >
      {commodity && (
        <div style={{ padding: "20px", lineHeight: 1.8, textAlign: "justify" }}>
          <div
            style={{ fontSize: "25px", fontWeight: 600, textAlign: "center" }}
          >
            {commodity.name}
          </div>
          <div
            style={{
              width: "50%",
              border: "1px solid",
              aspectRatio: 1,
              margin: "20px auto",
              borderRadius: "20px",
            }}
          >
            <img
              src={"http://localhost:8000/static/" + commodity.img_path}
              alt={commodity.name + " Image"}
              style={{ width: "100%" }}
            />
          </div>
          {prices && <PricePlot data={prices} />}
          <div
            style={{ margin: "20px 0 0" }}
            dangerouslySetInnerHTML={{
              __html: commodity.info
                .replace(/\n/g, "<br>")
                .replace(/(\s*<br\s*\/?>)+\s*$/, ""),
            }}
          ></div>
          <br></br>
          <div>Largest Producers:</div>
          {commodity.companies.map((commodity: any) => (
            <div key={commodity} style={{ margin: "5px 0 0 10px" }}>
              {commodity}
            </div>
          ))}
          {govInfo?.length && govInfo[0]?.prod_and_use && (
            <React.Fragment>
              <div style={{ marginTop: "20px" }}>Production and Use:</div>
              <div style={{ margin: "5px 0 20px 0" }}>
                {govInfo[0].prod_and_use}
              </div>
              <div>Recycling:</div>
              <div style={{ margin: "5px 0 20px 0" }}>
                {govInfo[0].recycling}
              </div>
              <div>Events & Trends:</div>
              <div style={{ margin: "5px 0 20px 0" }}>{govInfo[0].events}</div>
              <div>World Resources:</div>
              <div style={{ margin: "5px 0 20px 0" }}>
                {govInfo[0].world_resources}
              </div>
              <div>Substitutes:</div>
              <div style={{ margin: "5px 0 20px 0" }}>
                {govInfo[0].substitutes}
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
