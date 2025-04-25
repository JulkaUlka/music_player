import { useEffect, useState, useRef, useCallback } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import {
  Wrapper,
  MusicCover,
  Title,
  SubTitle,
  TimeContainer,
  Timeline,
  Controls,
  ControlButton,
  AudioElement
} from "./AudioPlayer.styled";
import PlayButton from "../PlayButton/PlayButton";
import { useAudio } from "../../context/AudioContext";

function AudioPlayer({ tracks = [], currentTrackIndex = 0, onTrackChange }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const { currentTrack, isPlaying, setAudioRef } = useAudio();

  // Filter tracks with audio files
  const availableTracks = tracks.filter(track => track.audioFile);
  const track = tracks[currentTrackIndex];

  // Формуємо правильний URL для аудіофайлу
  const getAudioUrl = (track) => {
    if (!track?.audioFile) return null;
    return `http://localhost:3001/api/files/${track.audioFile}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleTimelineChange = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const findNextAvailableTrack = useCallback((currentIndex, direction) => {
    if (availableTracks.length === 0) return currentIndex;

    const currentTrackIndex = availableTracks.findIndex(track => track.id === tracks[currentIndex]?.id);
    let nextIndex = currentTrackIndex + direction;

    if (nextIndex < 0) nextIndex = availableTracks.length - 1;
    if (nextIndex >= availableTracks.length) nextIndex = 0;

    return tracks.findIndex(track => track.id === availableTracks[nextIndex].id);
  }, [availableTracks, tracks]);

  const handleNext = useCallback(() => {
    if (availableTracks.length > 0) {
      const nextIndex = findNextAvailableTrack(currentTrackIndex, 1);
      if (onTrackChange) {
        onTrackChange(nextIndex);
      }
    }
  }, [availableTracks.length, currentTrackIndex, findNextAvailableTrack, onTrackChange]);

  const handlePrevious = useCallback(() => {
    if (availableTracks.length > 0) {
      const prevIndex = findNextAvailableTrack(currentTrackIndex, -1);
      if (onTrackChange) {
        onTrackChange(prevIndex);
      }
    }
  }, [availableTracks.length, currentTrackIndex, findNextAvailableTrack, onTrackChange]);

  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current);
    }
  }, [setAudioRef]);

  if (!track) {
    return null;
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Wrapper>
      <AudioElement
        ref={audioRef}
        src={getAudioUrl(track)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <Title>{track.title}</Title>
      <MusicCover 
        src={track.coverImage || "/default-cover.png"} 
        alt={track.title}
      />
      <div>
        <SubTitle>{track.artist}</SubTitle>
      </div>
      <div>
        <TimeContainer>
          <p>{formatTime(currentTime)}</p>
          <p>{formatTime(duration)}</p>
        </TimeContainer>
        <Timeline
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimelineChange}
        />
      </div>
      <Controls>
        <ControlButton onClick={handlePrevious} disabled={availableTracks.length === 0}>
          <IconContext.Provider value={{ size: "3em", color: availableTracks.length > 0 ? "#27AE60" : "#ccc" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </ControlButton>
        <PlayButton
          track={track}
          disabled={!track.audioFile}
        />
        <ControlButton onClick={handleNext} disabled={availableTracks.length === 0}>
          <IconContext.Provider value={{ size: "3em", color: availableTracks.length > 0 ? "#27AE60" : "#ccc" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </ControlButton>
      </Controls>
    </Wrapper>
  );
}

export default AudioPlayer;