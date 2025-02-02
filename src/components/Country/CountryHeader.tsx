import { useContext } from "react";
import { Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { CountryHeaderT } from "./types";
import { AppContext } from "../AppContextProvider";
import { CLOUDFRONT_DOMAIN } from "../../utils/config";
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
        src={CLOUDFRONT_DOMAIN + `static/flags/${slugify(countryName)}.png`}
        style={{ height: "25px", marginRight: "5px" }}
      />
      <Box
        sx={{
          color: BASE_STYLE.COLOR_PALLETE.TEXT,
          "&:hover": { color: BASE_STYLE.COLOR_PALLETE.ELEMENTS },
          display: "flex",
          transition: "400ms all ease",
          alignItems: "center",
        }}
      >
        <Box sx={{ color: "inherit", fontSize: "30px" }}>{countryName}</Box>
        {!isHovered && (
          <OpenInNewIcon
            sx={{ marginLeft: "5px", fontSize: "20px", color: "inherit" }}
          />
        )}
      </Box>
    </div>
  );
};

export default CountryHeader;
