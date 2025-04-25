import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  height: 40vh;
  width: 100%;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
`;

export const HeaderImage = styled.img`
  filter: brightness(0) saturate(100%) invert(36%) sepia(93%) saturate(5557%) hue-rotate(292deg) brightness(85%) contrast(94%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &.active {
    opacity: 1;
  }
`;

export const AddTrackButton = styled.button`
  position: absolute;
  bottom: -25px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4CAF50;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
`;
