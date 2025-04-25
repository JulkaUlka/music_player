import React from "react";
import { IconContext } from "react-icons";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { Button } from "./PlayButton.styled";
import { useAudio } from "../../context/AudioContext";

const PlayButton = ({ track, disabled }) => {
  const { isPlaying, currentTrack, togglePlay } = useAudio();
  const isCurrentTrack = currentTrack?.id === track?.id;

  const handleClick = () => {
    if (!disabled) {
      togglePlay(track);
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={disabled}
      $hasAudio={!!track?.audioFile}
    >
      <IconContext.Provider value={{ size: "3em", color: track?.audioFile ? "#27AE60" : "#ccc" }}>
        {isCurrentTrack && isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
      </IconContext.Provider>
    </Button>
  );
};

export default PlayButton; 