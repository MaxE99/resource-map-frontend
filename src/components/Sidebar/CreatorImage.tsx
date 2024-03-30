import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Tooltip } from "@mui/material";

import { S3_FOLDER } from "../../utils/config";
import { CreatorImageProps } from "./types";

const CreatorImage = ({
  name,
  linkedinLink,
}: CreatorImageProps): JSX.Element => {
  return (
    <div
      style={{
        position: "relative",
        border: "var(--light-grey) 2px solid",
        height: "204px",
        width: "204px",
        borderRadius: "8px",
      }}
    >
      <img
        height={200}
        width={200}
        style={{ borderRadius: "8px" }}
        src={
          S3_FOLDER + (name === "Max" ? "static/max.jpg" : "static/kilian.jpeg")
        }
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "40px",
          height: "40px",
        }}
      >
        <Tooltip title={name + "'s LinkedIn Profile"}>
          <a href={linkedinLink} target="_blank">
            <LinkedInIcon sx={{ fontSize: "40px", color: "#0e76a8" }} />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default CreatorImage;
