import { useContext } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { CountryHeaderT } from "./types";
import { AppContext } from "../AppContextProvider";
import { DOMAIN } from "../../utils/config";
import { BASE_STYLE } from "../../utils/styles/base";
import { slugify } from "../../utils/functions/utils";

const CountryHeader = ({
  countryName,
  isHovered,
}: CountryHeaderT): JSX.Element => {
  const { setIsDialogOpen } = useContext<any>(AppContext);

  return (
    <div className="countryNameBox" onClick={() => setIsDialogOpen(true)}>
      <img
        src={DOMAIN + `/static/flags/${slugify(countryName)}.png`}
        style={{ height: "25px", marginRight: "5px" }}
      />
      <div style={{ fontSize: "30px" }}>{countryName}</div>
      {!isHovered && (
        <OpenInNewIcon
          sx={{
            marginLeft: "5px",
            fontSize: "20px",
            "&:hover": { color: BASE_STYLE.COLOR_PALLETE.ELEMENTS },
          }}
        />
      )}
    </div>
  );
};

export default CountryHeader;
