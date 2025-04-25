import React from "react";
import { HeaderContainer, HeaderImage, AddTrackButton } from "./Header.styled";

function Header({ coverImages, currentImageIndex, onAddTrack }) {
  return (
    <HeaderContainer>
      {coverImages.map((image, index) => (
        <HeaderImage
          key={image}
          src={image}
          alt="Track cover"
          className={index === currentImageIndex ? "active" : ""}
        />
      ))}
      <AddTrackButton onClick={onAddTrack}>
        + Add Track
      </AddTrackButton>
    </HeaderContainer>
  );
}

export default Header;