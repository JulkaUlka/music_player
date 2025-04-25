import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/config";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import {
  ModalContent,
  Title,
  Input,
  Label,
  FileInfo,
  DeleteButton,
  FileActions
} from "./UploaderModal.styled";

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

function UploaderModal({ isOpen, onClose, trackSlug, trackId }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const queryClient = useQueryClient();

  // Fetch track data when modal opens
  const { data: track, isLoading } = useQuery({
    queryKey: ["track", trackSlug],
    queryFn: async () => {
      const response = await api.get(`/tracks/${trackSlug}`);
      return response.data;
    },
    enabled: isOpen && !!trackSlug,
  });

  // Update uploaded file state when track data changes
  useEffect(() => {
    if (track?.audioFile) {
      const fileName = track.audioFile.split('/').pop();
      setUploadedFile({
        name: fileName,
        url: track.audioUrl
      });
    } else {
      setUploadedFile(null);
    }
  },[track]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid audio file (MP3 or WAV)");
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size should be less than 50MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await api.post(
        `/tracks/${trackId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadedFile({
        name: file.name,
        url: response.data.url
      });
      queryClient.invalidateQueries("tracks");
      queryClient.invalidateQueries(["track", trackId]);
      toast.success("File uploaded successfully");
      onClose();
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async () => {
    if (!window.confirm("Are you sure you want to delete this file? This action cannot be undone.")) return;

    setIsUploading(true);
    try {
      await api.delete(`/tracks/${trackId}/file`);
      setUploadedFile(null);
      queryClient.invalidateQueries("tracks");
      queryClient.invalidateQueries(["track", trackId]);
      toast.success("File deleted successfully");
      onClose();
    } catch (error) {
      toast.error("Error deleting file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Upload Audio File"
    >
      <ModalContent>
        <Title>Upload Audio File</Title>
        {isLoading ? (
          <ClipLoader color="#4CAF50" size={30} />
        ) : isUploading ? (
          <ClipLoader color="#4CAF50" size={30} />
        ) : uploadedFile ? (
          <>
            <FileInfo>
              <div>Current file: {uploadedFile.name}</div>
            </FileInfo>
            <FileActions>
              <DeleteButton onClick={handleDeleteFile}>Delete File</DeleteButton>
            </FileActions>
          </>
        ) : (
          <>
            <Input
              type="file"
              id="file-upload"
              accept=".mp3,.wav"
              onChange={handleFileChange}
            />
            <Label htmlFor="file-upload">Choose File</Label>
            <FileInfo>Supported formats: MP3, WAV (max 50MB)</FileInfo>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UploaderModal;
