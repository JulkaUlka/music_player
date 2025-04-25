import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const HeaderContainer = styled.div`
  position: relative;
`;

export const Header = styled.div`
  height: 30vh;
  width: 100%;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
`;

export const HeaderImage = styled.img`
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
  bottom: 0px;
  right: 40px;
  padding: 10px;
  border-radius: 4px;
  background-color: #4CAF50;
  border: none;
  color: white;
  font-size: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 20px;
  gap: 20px;
  background-color: #f5f5f5;
`;

export const PlaylistContainer = styled.div`
  flex: 0 0 70%;
  overflow-y: auto;
  padding-right: 20px;
`;

export const PlayerContainer = styled.div`
  flex: 0 0 30%;
  display: flex;
  justify-content: center;
`;