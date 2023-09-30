import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Backdrop, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CSSProperties, Fragment, useContext, useState } from "react";
import { Path } from "leaflet";

import CountryResourcePopup from "../Country/CountryResourcePopup";
import { AppContext } from "../AppContextProvider";
import { MapT } from "../../types/map";
import { BASE_STYLE } from "../../styles/base";
import { MAP_STYLE } from "../../styles/map";
import "../../styles/map.css";
import CountryBalancePopup from "../Country/CountryBalancePopup";
import NoDataChip from "../NoDataChip/NoDataChip";

const Map = ({
  countries,
  selectedCommodity,
  otherCountries,
  worldTotal,
  noDataFound,
  isBalanceModeSelected,
}: MapT): JSX.Element => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [isFeatureBeingHoveredOver, setIsFeatureBeingHoveredOver] =
    useState<boolean>(true);
  const [hoveredFeature, setHoveredFeature] = useState<
    GeoJSON.Feature | undefined
  >(undefined);
  const {
    isShowingProduction,
    setIsShowingProduction,
    selectedCountry,
    setSelectedCountry,
  } = useContext<any>(AppContext);

  const bounds: [[number, number], [number, number]] = [
    [-90, -180],
    [90, 180],
  ];

  const getFeatureStyle = (feature: any) => {
    return {
      fillColor: feature?.properties?.style?.fillColor || "white",
      weight: hoveredFeature === feature ? 2 : 1,
      color:
        hoveredFeature === feature
          ? BASE_STYLE.COLOR_PALLETE.ELEMENTS
          : "black",
      fillOpacity: 0.5,
    };
  };

  const onEachCountryFeature = (feature: GeoJSON.Feature, layer: Path) => {
    let featureIsBeingClickedOn = false;

    layer.on({
      click: () => {
        if (selectedCommodity) {
          setIsFeatureBeingHoveredOver(false);
          setSelectedCountry(feature);
          setPopupOpen(true);
          featureIsBeingClickedOn = true;
        }
      },
      mouseover: () => {
        setIsFeatureBeingHoveredOver(true);
        setPopupOpen(true);
        setSelectedCountry(feature);
        setHoveredFeature(feature);
        layer.setStyle({
          weight: 2,
          color: BASE_STYLE.COLOR_PALLETE.ELEMENTS,
        });
      },
      mouseout: () => {
        if (!featureIsBeingClickedOn) {
          setIsFeatureBeingHoveredOver(false);
          setPopupOpen(false);
          setHoveredFeature(undefined);
          layer.setStyle({
            weight: 1,
            color: "black",
          });
        }
      },
    });
  };

  console.log(noDataFound);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        style={{
          height: "75vh",
          borderRadius: "8px",
          boxShadow: BASE_STYLE.BOX_SHADOW,
          border: `2px solid ${BASE_STYLE.COLOR_PALLETE.LIGHT_GREY}`,
        }}
        minZoom={2}
        maxZoom={5}
        bounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer maxZoom={10} maxNativeZoom={19} noWrap={true} url="" />
        {countries && (
          <GeoJSON
            onEachFeature={onEachCountryFeature}
            data={countries}
            style={getFeatureStyle}
          />
        )}
        {!isBalanceModeSelected && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "80px",
              borderTop: `1px solid ${BASE_STYLE.COLOR_PALLETE.LIGHT_GREY}`,
              display: "flex",
              alignItems: "center",
              zIndex: 400,
            }}
          >
            {otherCountries &&
              worldTotal &&
              (!otherCountries.includes("undefined") ||
                !worldTotal.includes("undefined")) && (
                <div
                  style={{
                    ...(MAP_STYLE.BOX as CSSProperties),
                    color: BASE_STYLE.COLOR_PALLETE.TEXT,
                  }}
                >
                  {!otherCountries.includes("undefined") && (
                    <Fragment>
                      <span style={{ marginRight: "5px" }}>
                        Other Countries:
                      </span>
                      <span
                        style={{
                          color: BASE_STYLE.COLOR_PALLETE.ELEMENTS,
                          marginRight: "20px",
                        }}
                      >
                        {otherCountries}
                      </span>
                    </Fragment>
                  )}
                  {!worldTotal.includes("undefined") && (
                    <Fragment>
                      <span style={{ marginRight: "5px" }}>World Total:</span>
                      <span
                        style={{ color: BASE_STYLE.COLOR_PALLETE.ELEMENTS }}
                      >
                        {worldTotal}
                      </span>
                    </Fragment>
                  )}
                </div>
              )}
            <ToggleButtonGroup
              color="secondary"
              className="mapToggle"
              value={isShowingProduction ? "Production" : "Reserves"}
              exclusive
              onChange={() => setIsShowingProduction(!isShowingProduction)}
              sx={{
                padding: "20px",
                marginLeft: "auto",
                "& .Mui-selected": {
                  backgroundColor: `${BASE_STYLE.COLOR_PALLETE.ELEMENTS} !important`,
                },
              }}
            >
              <ToggleButton
                sx={{
                  fontSize: "12px",
                  padding: "8px 12px",
                  fontWeight: 600,
                  border: `1px solid ${BASE_STYLE.COLOR_PALLETE.TEXT}`,
                }}
                value="Production"
              >
                Production
              </ToggleButton>
              <ToggleButton
                sx={{
                  fontSize: "12px",
                  padding: "8px 12px",
                  fontWeight: 600,
                  border: `1px solid ${BASE_STYLE.COLOR_PALLETE.TEXT}`,
                }}
                value="Reserves"
              >
                Reserves
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        )}
      </MapContainer>
      {noDataFound && (
        <div className="map-chip-container">
          <NoDataChip label="" />
        </div>
      )}
      {popupOpen && selectedCommodity && (
        <Fragment>
          {isBalanceModeSelected ? (
            <CountryBalancePopup
              key={JSON.stringify(selectedCountry)}
              feature={selectedCountry}
              setPopupOpen={setPopupOpen}
              isFeatureBeingHoveredOver={isFeatureBeingHoveredOver}
            />
          ) : (
            <CountryResourcePopup
              key={JSON.stringify(selectedCountry)}
              feature={selectedCountry}
              commodity={selectedCommodity}
              setPopupOpen={setPopupOpen}
              isFeatureBeingHoveredOver={isFeatureBeingHoveredOver}
            />
          )}
          <Backdrop
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 401,
            }}
            open={popupOpen && !isFeatureBeingHoveredOver}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Map;
