import styled from "styled-components";

export const TrackContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: ${props => props.$isPlaying ? '#f0f0f0' : 'transparent'};
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
`;

export const CoverImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 15px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #666;
`;

export const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Artist = styled.p`
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Album = styled.p`
  margin: 5px 0 0;
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
`;

export const GenreTag = styled.span`
  background-color: #e0e0e0;
  color: #666;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
`;

export const Controls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.play {
    color: ${props => props.$hasAudio ? '#4caf50' : '#ccc'};
    cursor: ${props => props.$hasAudio ? 'pointer' : 'not-allowed'};
  }

  &.upload {
    color: #2196f3;
  }

  &.edit {
    color: #ff9800;
  }

  &.delete {
    color: #f44336;
  }
`;

export const AudioPlayer = styled.audio`
  display: none;
`;
