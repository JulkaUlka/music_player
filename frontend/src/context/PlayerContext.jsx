import React, { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlay = (track) => {
    if (currentTrack?.id === track?.id) {
      setIsPlaying(!isPlaying);
    } else {
      playTrack(track);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        playTrack,
        pauseTrack,
        togglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}; 