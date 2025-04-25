import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/config";
import ReactPaginate from "react-paginate";
import { FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
// import TrackModal from "./TrackModal";
import TrackCard from "../TrackCard/TrackCard";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import {
  Container,
  Header,
  SearchBar,
  SearchInput,
  SearchIcon,
  SortContainer,
  SortButton,
  TrackList,
  PaginationContainer,
  LoadingContainer,
  ErrorMessage,
} from "./Playlist.styled";

const Playlist = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTrack, setSelectedTrack] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tracks", page, search, sortField, sortDirection],
    queryFn: () =>
      api.get("/tracks", {
        params: {
          page: page + 1,
          limit: 10,
          search,
          sortBy: sortField,
          sortOrder: sortDirection,
        },
      }),
  });

  // Set initial track with audio file
  useEffect(() => {
    if (data?.data?.data) {
      const tracksWithAudio = data.data.data.filter(track => track.audioFile);
      if (tracksWithAudio.length > 0) {
        const firstTrackWithAudio = tracksWithAudio[0];
        const index = data.data.data.findIndex(track => track.id === firstTrackWithAudio.id);
        if (index !== -1) {
          setCurrentTrackIndex(index);
        }
      }
    }
  }, [data]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (field !== sortField) return <FaSort />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

//   const openCreateModal = () => {
//     setSelectedTrack(null);
//     setIsModalOpen(true);
//   };

  const openEditModal = (track) => {
    // setSelectedTrack(track);
    // setIsModalOpen(true);
  };

  const handlePlayTrack = (track) => {
    const trackIndex = tracks.findIndex(t => t.id === track.id);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
      setIsPlaying(true);
    }
  };

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#4caf50" size={50} />
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>Error loading tracks: {error.message}</ErrorMessage>;
  }

  const tracks = data?.data.data || [];
  const currentTrack = tracks[currentTrackIndex];

  return (
    <Container>
      <Header>
        <SearchBar>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search tracks..."
            value={search}
            onChange={handleSearch}
          />
        </SearchBar>
        <SortContainer>
          <SortButton onClick={() => handleSort("title")}>
            Title {getSortIcon("title")}
          </SortButton>
          <SortButton onClick={() => handleSort("artist")}>
            Artist {getSortIcon("artist")}
          </SortButton>
          <SortButton onClick={() => handleSort("album")}>
            Album {getSortIcon("album")}
          </SortButton>
        </SortContainer>
      </Header>

      <TrackList>
        {Array.isArray(tracks) && tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            onEdit={() => openEditModal(track)}
            onPlay={handlePlayTrack}
            isCurrentlyPlaying={isPlaying}
            currentTrackId={currentTrack?.id}
          />
        ))}
      </TrackList>

      <PaginationContainer>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={data?.meta?.totalPages || 0}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </PaginationContainer>

      {currentTrack && (
        <AudioPlayer
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          onTrackChange={handleTrackChange}
        />
      )}
      {/* <TrackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        track={selectedTrack}
      /> */}
    </Container>
  );
};

export default Playlist;
