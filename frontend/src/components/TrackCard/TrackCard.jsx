import React, { useState } from "react";
import {
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { PiMusicNotesPlusFill, PiMusicNotesFill } from "react-icons/pi";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  TrackContainer,
  CoverImage,
  TrackInfo,
  Title,
  Artist,
  Album,
  Genres,
  GenreTag,
  Controls,
  Button,
} from "./TrackCard.styled";
import UploaderModal from "../UploaderModal/UploaderModal";
import AddTrackButton from "../AddTrackButton/AddTrackButton";
import PlayButton from "../PlayButton/PlayButton";
import { useAudio } from "../../context/AudioContext";

function TrackCard({ track }) {
  const { currentTrack, isPlaying } = useAudio();
  const isCurrentTrack = currentTrack?.id === track.id;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      try {
        await axios.delete(`/api/tracks/${track.id}`);
        queryClient.invalidateQueries("tracks");
        toast.success("Track deleted successfully");
      } catch (error) {
        toast.error("Error deleting track");
      }
    }
  };

  return (
    <TrackContainer $isPlaying={isCurrentTrack && isPlaying}>
      <CoverImage
        src={track.coverImage || "/default-cover.png"}
        alt={track.title}
        onError={(e) => {
          e.target.src = "/default-cover.png";
        }}
      />
      <TrackInfo>
        <Title>{track.title}</Title>
        <Artist>{track.artist}</Artist>
        <Album>{track.album}</Album>
        <Genres>
          {track.genres?.map((genre) => (
            <GenreTag key={genre}>{genre}</GenreTag>
          ))}
        </Genres>
      </TrackInfo>
      <Controls>
        <Button 
          className="upload" 
          onClick={() => setIsUploadModalOpen(true)}
          title={track.audioFile ? "Audio uploaded" : "Upload audio"}
        >
          {track.audioFile ? <PiMusicNotesFill /> : <PiMusicNotesPlusFill />}
        </Button>
        <PlayButton
          track={track}
          disabled={!track.audioFile}
        />
        <Button 
          className="edit" 
          onClick={() => setIsEditModalOpen(true)}
          title="Edit track"
        >
          <FaRegEdit />
        </Button>
        <Button 
          className="delete" 
          onClick={handleDelete}
          title="Delete track"
        >
          <FaRegTrashAlt />
        </Button>
      </Controls>

      <UploaderModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        trackSlug={track.slug}
        trackId={track.id}
      />

      <AddTrackButton
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        track={track}
      />
    </TrackContainer>
  );
}

export default TrackCard;
