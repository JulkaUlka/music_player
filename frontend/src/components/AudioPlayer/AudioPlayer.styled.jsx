import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 60%;
  right: 5%;
  transform: translate(0,-60%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color:rgb(255, 255, 255);
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

export const AudioElement = styled.audio`
  display: none;
`;

export const MusicCover = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  // margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
`;

export const SubTitle = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #666;
  text-align: center;
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  // margin: 10px 0;
  color: #666;
  font-size: 0.9rem;
`;

export const Timeline = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 2px;
  outline: none;
  margin: 10px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #27AE60;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #27AE60;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
