import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/config";
import TrackList from "../TrackList/TrackList";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import AddTrackModal from "../AddTrackButton/AddTrackButton";
import Header from "../Header/Header";
import {
  PageContainer,
  AddTrackButton,
  ContentContainer,
  PlaylistContainer,
  PlayerContainer
} from "./TrackManager.styled";

function TrackManager() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddTrackModalOpen, setIsAddTrackModalOpen] = useState(false);

  const { data: tracks, isLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: async () => {
      const response = await api.get("/tracks");
      return response.data;
    },
  });

  // Get unique cover images from tracks
  const coverImages = tracks?.data
    ?.map((track) => track.coverImage)
    .filter((image, index, self) => self.indexOf(image) === index && image)
    .slice(0, 5) || [];

  // Rotate header images every 2 seconds
  useEffect(() => {
    if (coverImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === coverImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [coverImages.length]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Header 
        coverImages={coverImages}
        currentImageIndex={currentImageIndex}
        onAddTrack={() => setIsAddTrackModalOpen(true)}
      />
      <AddTrackButton onClick={() => setIsAddTrackModalOpen(true)}>
        +
      </AddTrackButton>

      <ContentContainer>
        <PlaylistContainer>
          <TrackList />
        </PlaylistContainer>
        <PlayerContainer>
          <AudioPlayer />
        </PlayerContainer>
      </ContentContainer>

      <AddTrackModal
        isOpen={isAddTrackModalOpen}
        onClose={() => setIsAddTrackModalOpen(false)}
      />
    </PageContainer>
  );
}

export default TrackManager; 