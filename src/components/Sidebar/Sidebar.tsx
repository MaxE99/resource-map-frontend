import { useEffect, useState } from "react";

const Sidebar = ({ commodity }: any): JSX.Element => {
  console.log(commodity);
  console.log(commodity?.name);
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
            <img src={commodity.img_path} alt={commodity.name + " Image"}></img>
          </div>
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
        </div>
      )}
    </div>
  );
};

export default Sidebar;
