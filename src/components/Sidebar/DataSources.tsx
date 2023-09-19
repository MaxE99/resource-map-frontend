import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CSSProperties, Fragment } from "react";

import { SIDEBAR_STYLE } from "../../styles/sidebar";
import { BASE_STYLE } from "../../styles/base";

const DataSources = () => {
  return (
    <Fragment>
      <div style={SIDEBAR_STYLE.NAME_CONTAINER as CSSProperties}>
        Data Sources
      </div>
      <Accordion sx={SIDEBAR_STYLE.ACCORDION}>
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDownIcon
              sx={{ color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Commodity Data</span>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0 40px 20px",
            "& div": {
              marginTop: "0 !important",
            },
          }}
        >
          <a
            href="https://pubs.usgs.gov/periodicals/"
            className="dataSourceLink"
          >
            https://pubs.usgs.gov/periodicals/
          </a>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={SIDEBAR_STYLE.ACCORDION}>
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDownIcon
              sx={{ color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Import Export Data</span>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0 40px 20px",
            "& div": {
              marginTop: "0 !important",
            },
          }}
        >
          <div>
            <a href="https://comtradeplus.un.org/" className="dataSourceLink">
              https://comtradeplus.un.org/
            </a>
            <a href="https://data.imf.org/" className="dataSourceLink">
              https://data.imf.org/
            </a>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={SIDEBAR_STYLE.ACCORDION}>
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDownIcon
              sx={{ color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Price Data</span>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0 40px 20px",
            "& div": {
              marginTop: "0 !important",
            },
          }}
        >
          <a
            href="https://fred.stlouisfed.org/categories/32217"
            className="dataSourceLink"
          >
            https://fred.stlouisfed.org/categories/32217
          </a>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={SIDEBAR_STYLE.ACCORDION}>
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDownIcon
              sx={{ color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Other Information</span>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0 40px 20px",
            "& div": {
              marginTop: "0 !important",
            },
          }}
        >
          <a
            href="https://datahub.io/core/geo-countries"
            className="dataSourceLink"
          >
            https://datahub.io/core/geo-countries
          </a>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={SIDEBAR_STYLE.ACCORDION}>
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDownIcon
              sx={{ color: BASE_STYLE.COLOR_PALLETE.TEXT }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Images</span>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0 40px 20px",
            "& div": {
              marginTop: "0 !important",
            },
          }}
        >
          <div>
            <div>Barite:</div>
            <a
              href="https://en.wikipedia.org/wiki/Baryte#/media/File:Barite_-_Cerro_Warihuyn,_Miraflores,_Huamalies,_Huanuco,_Peru.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Baryte#/media/File:Barite_-_Cerro_Warihuyn,_Miraflores,_Huamalies,_Huanuco,_Peru.jpg
            </a>
            <div>Bauxite Alumina:</div>
            <a
              href="https://en.wikipedia.org/wiki/Bauxite#/media/File:Bauxite_with_unweathered_rock_core._C_021.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Bauxite#/media/File:Bauxite_with_unweathered_rock_core._C_021.jpg
            </a>
            <div>Cesium:</div>
            <a
              href="https://en.wikipedia.org/wiki/Caesium#/media/File:Cesium.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Caesium#/media/File:Cesium.jpg
            </a>
            <div>Clays:</div>
            <a
              href="https://en.wikipedia.org/wiki/Clay#/media/File:Clay-ss-2005.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Clay#/media/File:Clay-ss-2005.jpg
            </a>
            <div>Diamond Industrials:</div>
            <a
              href="https://en.wikipedia.org/wiki/Diamond#/media/File:Diamond_blade_very_macro.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Diamond#/media/File:Diamond_blade_very_macro.jpg
            </a>
            <div>Feldspar:</div>
            <a
              href="https://en.wikipedia.org/wiki/Feldspar#/media/File:Feldspar-Group-291254.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Feldspar#/media/File:Feldspar-Group-291254.jpg
            </a>
            <div>Fluorspar:</div>
            <a
              href="https://en.wikipedia.org/wiki/Fluorite#/media/File:Closeup_of_Fluorite.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Fluorite#/media/File:Closeup_of_Fluorite.jpg
            </a>
            <div>Garnet:</div>
            <a
              href="https://en.wikipedia.org/wiki/Garnet#/media/File:Garnet_Andradite20.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Garnet#/media/File:Garnet_Andradite20.jpg
            </a>
            <div>Graphite:</div>
            <a
              href="https://en.wikipedia.org/wiki/Graphite#/media/File:Graphite-233436.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Graphite#/media/File:Graphite-233436.jpg
            </a>
            <div>Gypsum:</div>
            <a
              href="https://en.wikipedia.org/wiki/Gypsum#/media/File:Gypse_Caresse.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Gypsum#/media/File:Gypse_Caresse.jpg
            </a>
            <div>Iron Oxide Pigments:</div>
            <a
              href="https://en.wikipedia.org/wiki/Iron_oxide#/media/File:Almindeligt_rust_-_jernoxid.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Iron_oxide#/media/File:Almindeligt_rust_-_jernoxid.jpg
            </a>
            <div>Iron Steel:</div>
            <a
              href="https://en.wikipedia.org/wiki/Steel#/media/File:%D0%A0%D0%B0%D0%B7%D0%BB%D0%B8%D0%B2%D0%BA%D0%B0_%D0%B6%D0%B8%D0%B4%D0%BA%D0%BE%D0%B3%D0%BE_%D1%87%D1%83%D0%B3%D1%83%D0%BD%D0%B0.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Steel#/media/File:%D0%A0%D0%B0%D0%B7%D0%BB%D0%B8%D0%B2%D0%BA%D0%B0_%D0%B6%D0%B8%D0%B4%D0%BA%D0%BE%D0%B3%D0%BE_%D1%87%D1%83%D0%B3%D1%83%D0%BD%D0%B0.jpg
            </a>
            <div>Iron Steel Slag:</div>
            <a
              href="https://en.wikipedia.org/wiki/Slag#/media/File:Slag_from_iron_ore_melting.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Slag#/media/File:Slag_from_iron_ore_melting.jpg
            </a>
            <div>Kyanite:</div>
            <a
              href="https://en.wikipedia.org/wiki/Kyanite#/media/File:Kyanite_crystals.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Kyanite#/media/File:Kyanite_crystals.jpg
            </a>
            <div>Lime:</div>
            <a
              href="https://en.wikipedia.org/wiki/Lime_(material)#/media/File:Limestone_quarry.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Lime_(material)#/media/File:Limestone_quarry.jpg
            </a>
            <div>Magnesium Compounds:</div>
            <a
              href="https://en.wikipedia.org/wiki/Magnesium_compounds#/media/File:Magnija_perhlor%C4%81ts_02.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Magnesium_compounds#/media/File:Magnija_perhlor%C4%81ts_02.jpg
            </a>
            <div>Mica:</div>
            <a
              href="https://en.wikipedia.org/wiki/Mica#/media/File:Mica_(6911818878).jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Mica#/media/File:Mica_(6911818878).jpg
            </a>
            <div>Peat:</div>
            <a
              href="https://en.wikipedia.org/wiki/Peat#/media/File:Peat_(49302157252).jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Peat#/media/File:Peat_(49302157252).jpg
            </a>
            <div>Platinum:</div>
            <a
              href="https://en.wikipedia.org/wiki/Platinum#/media/File:Platinum_crystals.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Platinum#/media/File:Platinum_crystals.jpg
            </a>
            <div>Pumice:</div>
            <a
              href="https://en.wikipedia.org/wiki/Pumice#/media/File:Teidepumice.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Pumice#/media/File:Teidepumice.jpg
            </a>
            <div>Quartz:</div>
            <a
              href="https://en.wikipedia.org/wiki/Quartz#/media/File:Quartz_Br%C3%A9sil.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Quartz#/media/File:Quartz_Br%C3%A9sil.jpg
            </a>
            <div>Salt:</div>
            <a
              href="https://en.wikipedia.org/wiki/Salt#/media/File:DeadSeaIsrael5.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Salt#/media/File:DeadSeaIsrael5.jpg
            </a>
            <div>Sand Gravel:</div>
            <a
              href="https://en.wikipedia.org/wiki/Gravel#/media/File:Gravel_on_a_beach_in_Thirasia,_Santorini,_Greece.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Gravel#/media/File:Gravel_on_a_beach_in_Thirasia,_Santorini,_Greece.jpg
            </a>
            <div>Stone Crushed:</div>
            <a
              href="https://en.wikipedia.org/wiki/Crushed_stone#/media/File:20mm-aggregate.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Crushed_stone#/media/File:20mm-aggregate.jpg
            </a>
            <div>Stone Dimensions:</div>
            <a
              href="https://en.wikipedia.org/wiki/Dimension_stone#/media/File:Slabs_of_granite_(Berlin_2008).jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Dimension_stone#/media/File:Slabs_of_granite_(Berlin_2008).jpg
            </a>
            <div>Talc:</div>
            <a
              href="https://en.wikipedia.org/wiki/Talc#/media/File:Talc-177589.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Talc#/media/File:Talc-177589.jpg
            </a>
            <div>Zeolites:</div>
            <a
              href="https://en.wikipedia.org/wiki/Zeolite#/media/File:Stilbite-Ca-Natrolite-Laumontite-247898.jpg"
              className="dataSourceLink"
            >
              https://en.wikipedia.org/wiki/Zeolite#/media/File:Stilbite-Ca-Natrolite-Laumontite-247898.jpg
            </a>
            <div>Other Commodity Images:</div>
            <a
              href="https://images-of-elements.com/"
              className="dataSourceLink"
            >
              https://images-of-elements.com/
            </a>
          </div>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

export default DataSources;
