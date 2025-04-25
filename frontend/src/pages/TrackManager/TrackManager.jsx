import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/config";
import Playlist from "../../components/Playlist/Playlist";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import AddTrackModal from "../../components/AddTrackButton/AddTrackButton";
import {
  PageContainer,
  Header,
  HeaderImage,
  AddTrackButton,
  ContentContainer,
  PlaylistContainer,
  PlayerContainer,
  HeaderContainer
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
  const coverImages =
    tracks?.data
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
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [coverImages.length]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>
          {coverImages.map((image, index) => (
            <HeaderImage
              key={image}
              src={image}
              alt="Track cover"
              className={index === currentImageIndex ? "active" : ""}
            />
          ))}
        </Header>
        <AddTrackButton onClick={() => setIsAddTrackModalOpen(true)}>
          Create Track
        </AddTrackButton>
      </HeaderContainer>

      <ContentContainer>
        <PlaylistContainer>
          <Playlist />
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
