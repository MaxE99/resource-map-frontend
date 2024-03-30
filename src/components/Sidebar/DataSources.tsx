import { Fragment } from "react";

import Accordion from "../Accordion/Accordion";
import "./styles.css";
import { IMAGE_SOURCES } from "../../utils/config";

const DataSources = (): JSX.Element => {
  return (
    <div className="data-sources-container">
      <Accordion
        index={-1}
        label="Commodity Data"
        body={
          <Fragment>
            <div>U.S. Gov Geological Survey Data:</div>
            <a
              href="https://pubs.usgs.gov/periodicals/"
              className="sidebar-datasource-link"
            >
              https://pubs.usgs.gov/periodicals/
            </a>
          </Fragment>
        }
      />
      <Accordion
        index={-1}
        label="Import Export Data"
        body={
          <Fragment>
            <div>UN Comtrade Database:</div>
            <a
              href="https://comtradeplus.un.org/"
              className="sidebar-datasource-link"
            >
              https://comtradeplus.un.org/
            </a>
            <div>IMF Macroeconomic Data:</div>
            <a href="https://data.imf.org/" className="sidebar-datasource-link">
              https://data.imf.org/
            </a>
          </Fragment>
        }
      />
      <Accordion
        index={-1}
        label="Price Data"
        body={
          <Fragment>
            <div>St. Louis FRED Economic Data:</div>
            <a
              href="https://fred.stlouisfed.org/categories/32217"
              className="sidebar-datasource-link"
            >
              https://fred.stlouisfed.org/categories/32217
            </a>
          </Fragment>
        }
      />
      <Accordion
        index={-1}
        label="Other Information"
        body={
          <Fragment>
            <div>Map Data:</div>
            <a
              href="https://datahub.io/core/geo-countries"
              className="sidebar-datasource-link"
            >
              https://datahub.io/core/geo-countries
            </a>
          </Fragment>
        }
      />
      <Accordion
        index={-1}
        label="Images"
        body={
          <Fragment>
            {IMAGE_SOURCES.map((source) => (
              <Fragment key={source.name}>
                <div>{source.name}</div>
                <a href={source.link} className="sidebar-datasource-link"></a>
              </Fragment>
            ))}
          </Fragment>
        }
      />
    </div>
  );
};

export default DataSources;
