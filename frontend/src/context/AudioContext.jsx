import React, { createContext, useContext, useState, useCallback } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  const playTrack = useCallback((track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioElement) {
      audioElement.play();
    }
  }, [audioElement]);

  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
    if (audioElement) {
      audioElement.pause();
    }
  }, [audioElement]);

  const togglePlay = useCallback((track) => {
    if (currentTrack?.id === track?.id) {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack(track);
      }
    } else {
      playTrack(track);
    }
  }, [currentTrack, isPlaying, playTrack, pauseTrack]);

  const setAudioRef = useCallback((ref) => {
    setAudioElement(ref);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        togglePlay,
        setAudioRef
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}; 