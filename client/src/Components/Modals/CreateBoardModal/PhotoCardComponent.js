import React from "react";
import * as style from "./Styled";
import { DoneRounded } from "@mui/icons-material";

const PhotoCardComponent = (props) => {
  const { link, selectedLink, callback } = props;
  return (
    <style.PhotoWrapper link={link} onClick={() => callback(link)}>
      <style.Photo show={selectedLink === link}>
        <style.DoneIconWrapper show={selectedLink === link}>
          <DoneRounded fontSize="0.1rem" />
        </style.DoneIconWrapper>
      </style.Photo>
    </style.PhotoWrapper>
  );
};

export default PhotoCardComponent;
