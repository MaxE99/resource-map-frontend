import "leaflet/dist/leaflet.css";
import "./styles.css";

import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import { Backdrop, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { LatLngBounds, Path } from "leaflet";
import L from "leaflet";

import CountryResourcePopup from "../Country/CountryResourcePopup";
import { AppContext } from "../AppContextProvider";
import { MapT } from "./types";
import { BASE_STYLE } from "../../utils/styles/base";
import CountryBalancePopup from "../Country/CountryBalancePopup";
import NoDataChip from "../NoDataChip/NoDataChip";
import CountryStrongholdPopup from "../Country/CountryStrongholdPopup";
import { StrongholdT } from "../../utils/types/api";
import { calculateStrongholdCoords } from "./functions";

const Map = ({
  countries,
  selectedCommodity,
  otherCountries,
  worldTotal,
  noDataFound,
  isBalanceModeSelected,
  isStrongholdModeSelected,
  windowWidth,
}: MapT): JSX.Element => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isFeatureHovered, setIsFeatureHovered] = useState<boolean>(true);
  const [hoveredFeature, setHoveredFeature] = useState<
    GeoJSON.Feature | undefined
  >(undefined);
  const [selectedStrongholds, setSelectedStrongholds] = useState<StrongholdT[]>(
    []
  );
  const {
    isShowingProduction,
    setIsShowingProduction,
    selectedCountry,
    setSelectedCountry,
  } = useContext<any>(AppContext);

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
        if (selectedCommodity && !isStrongholdModeSelected) {
          setIsFeatureHovered(false);
          setSelectedCountry(feature);
          setIsPopupOpen(true);
          featureIsBeingClickedOn = true;
        }
      },
      mouseover: () => {
        if (!isStrongholdModeSelected) {
          setIsFeatureHovered(true);
          setIsPopupOpen(true);
          setSelectedCountry(feature);
          setHoveredFeature(feature);
          layer.setStyle({
            weight: 2,
            color: BASE_STYLE.COLOR_PALLETE.ELEMENTS,
          });
        }
      },
      mouseout: () => {
        if (!featureIsBeingClickedOn) {
          setIsFeatureHovered(false);
          setIsPopupOpen(false);
          setHoveredFeature(undefined);
          layer.setStyle({
            weight: 1,
            color: "black",
          });
        }
      },
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        style={{
          height: "75vh",
          borderRadius: "8px",
        }}
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={5}
        maxBounds={new LatLngBounds([-90, -180], [90, 180])}
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
        {isStrongholdModeSelected &&
          //@ts-ignore
          countries?.features.map((feature: any) => {
            const strongholdCount = feature.properties?.strongholds?.length;
            if (strongholdCount) {
              return (
                <Marker
                  key={JSON.stringify(feature)}
                  position={calculateStrongholdCoords(feature)}
                  icon={L.divIcon({
                    className: "custom-marker",
                    html: `<div class="circle">${strongholdCount}</div>`,
                    iconSize: [30, 30],
                  })}
                  eventHandlers={{
                    click: () => {
                      setSelectedStrongholds(feature.properties.strongholds),
                        setIsPopupOpen(true);
                    },
                  }}
                />
              );
            }
          })}
        {!isBalanceModeSelected && !isStrongholdModeSelected && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              bottom: windowWidth > 1600 ? 0 : 50,
              height: "80px",
              borderTop: "1px solid var(--light-grey)",
              display: "flex",
              alignItems: "center",
              zIndex: 401,
            }}
          >
            {otherCountries &&
              worldTotal &&
              (!otherCountries.includes("undefined") ||
                !worldTotal.includes("undefined")) && (
                <div
                  style={{
                    zIndex: 998,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--main-text)",
                    maxWidth: "600px",
                    overflowX: "scroll",
                    whiteSpace: "nowrap",
                    padding: windowWidth > 600 ? "20px" : "unset",
                    margin: windowWidth > 600 ? "unset" : "4px",
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
            {windowWidth > 650 && (
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
                  style={{
                    fontSize: "12px",
                    padding: "8px 12px",
                    fontWeight: 600,
                    border: "1px solid var(--main-text)",
                  }}
                  value="Production"
                >
                  Production
                </ToggleButton>
                <ToggleButton
                  style={{
                    fontSize: "12px",
                    padding: "8px 12px",
                    fontWeight: 600,
                    border: "1px solid var(--main-text)",
                  }}
                  value="Reserves"
                >
                  Reserves
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          </div>
        )}
      </MapContainer>
      {windowWidth <= 650 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ToggleButtonGroup
            color="secondary"
            className="mapToggle"
            value={isShowingProduction ? "Production" : "Reserves"}
            exclusive
            onChange={() => setIsShowingProduction(!isShowingProduction)}
            sx={{
              padding: "20px",
              "& .Mui-selected": {
                backgroundColor: `${BASE_STYLE.COLOR_PALLETE.ELEMENTS} !important`,
              },
            }}
          >
            <ToggleButton
              style={{
                fontSize: "12px",
                padding: "8px 12px",
                fontWeight: 600,
                border: "1px solid var(--main-text)",
              }}
              value="Production"
            >
              Production
            </ToggleButton>
            <ToggleButton
              style={{
                fontSize: "12px",
                padding: "8px 12px",
                fontWeight: 600,
                border: "1px solid var(--main-text)",
              }}
              value="Reserves"
            >
              Reserves
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      )}

      {noDataFound && (
        <div className="map-chip-container">
          <NoDataChip label="" />
        </div>
      )}
      {isPopupOpen && selectedCommodity && (
        <Fragment>
          {isBalanceModeSelected ? (
            <CountryBalancePopup
              key={JSON.stringify(selectedCountry)}
              feature={selectedCountry}
              setIsPopupOpen={setIsPopupOpen}
              isFeatureHovered={isFeatureHovered}
            />
          ) : isStrongholdModeSelected && selectedStrongholds.length ? (
            <CountryStrongholdPopup
              key={JSON.stringify(selectedStrongholds)}
              isFeatureHovered={isFeatureHovered}
              strongholds={selectedStrongholds}
              setSelectedStrongholds={setSelectedStrongholds}
              setIsPopupOpen={setIsPopupOpen}
            />
          ) : (
            <CountryResourcePopup
              key={JSON.stringify(selectedCountry)}
              feature={selectedCountry}
              commodity={selectedCommodity}
              setIsPopupOpen={setIsPopupOpen}
              isFeatureHovered={isFeatureHovered}
            />
          )}
          <Backdrop
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 401,
            }}
            open={isPopupOpen && !isFeatureHovered}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Map;
