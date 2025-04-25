import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import api from "../../api/config";

import {
  ModalContent,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  GenreTags,
  GenreTag,
  RemoveButton,
  AddGenreButton,
  Buttons,
  Button
} from "./AddTrackButton.styled";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    maxWidth: "90%",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

function AddTrackButton({ isOpen, onClose, track }) {
  const [genres, setGenres] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (track) {
      setValue("title", track.title);
      setValue("artist", track.artist);
      setValue("album", track.album);
      setValue("coverImage", track.coverImage);
      setGenres(track.genres);
    } else {
      reset();
      setGenres([]);
    }
  }, [track, setValue, reset]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
       
        const response = await api.get(`/genres`);
        setAvailableGenres(response.data);
      } catch (error) {
        toast.error("Error loading genres");
      }
    };
    fetchGenres();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const trackData = {
        ...data,
        genres,
      };

      if (track) {
        await api.put(`/tracks/${track.id}`, trackData);
        toast.success("Track updated successfully");
      } else {
        await api.post(`/tracks`, trackData);
        toast.success("Track created successfully");
      }

      queryClient.invalidateQueries("tracks");
      onClose();
    } catch (error) {
      toast.error(track ? "Error updating track" : "Error creating track");
    } finally {
      setIsLoading(false);
    }
  };

  const addGenre = (genre) => {
    if (!genres.includes(genre)) {
      setGenres([...genres, genre]);
    }
  };

  const removeGenre = (genreToRemove) => {
    setGenres(genres.filter((genre) => genre !== genreToRemove));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={track ? "Edit Track" : "Create Track"}
    >
      <ModalContent>
        <Title>{track ? "Edit Track" : "Create Track"}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Title *</Label>
            <Input
              {...register("title", { required: "Title is required" })}
              className={errors.title ? "error" : ""}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Artist *</Label>
            <Input
              {...register("artist", { required: "Artist is required" })}
              className={errors.artist ? "error" : ""}
            />
            {errors.artist && (
              <ErrorMessage>{errors.artist.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Album</Label>
            <Input {...register("album")} />
          </FormGroup>

          <FormGroup>
            <Label>Cover Image URL</Label>
            <Input
              {...register("coverImage", {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL",
                },
              })}
              className={errors.coverImage ? "error" : ""}
            />
            {errors.coverImage && (
              <ErrorMessage>{errors.coverImage.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Genres</Label>
            <GenreTags>
              {genres.map((genre) => (
                <GenreTag key={genre}>
                  {genre}
                  <RemoveButton onClick={() => removeGenre(genre)}>
                    ×
                  </RemoveButton>
                </GenreTag>
              ))}
              {availableGenres
                .filter((genre) => !genres.includes(genre))
                .map((genre) => (
                  <AddGenreButton
                    key={genre}
                    type="button"
                    onClick={() => addGenre(genre)}
                  >
                    + {genre}
                  </AddGenreButton>
                ))}
            </GenreTags>
          </FormGroup>

          <Buttons>
            <Button type="button" className="cancel" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="submit" disabled={isLoading}>
              {isLoading ? (
                <ClipLoader color="#fff" size={20} />
              ) : track ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </Buttons>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default AddTrackButton;
