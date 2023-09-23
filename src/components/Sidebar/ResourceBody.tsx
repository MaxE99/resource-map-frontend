import PricePlot from "../PricePlot/PricePlot";
import Accordion from "../Accordion/Accordion";
import { AccordionWrapperProps, ResourceBodyProps } from "./types";

const ResourceBody = ({
  prices,
  govInfo,
  commodity,
}: ResourceBodyProps): JSX.Element => {
  const govInfoData: AccordionWrapperProps[] = [
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
        lineHeight: 2,
        letterSpacing: "0.5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PricePlot data={prices} />
      </div>
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
          govInfoData.map((item: AccordionWrapperProps) => (
            <Accordion
              key={item.index}
              index={item.index}
              label={item.summary}
              body={item.details}
            />
          ))}
      </div>
    </div>
  );
};

export default ResourceBody;
