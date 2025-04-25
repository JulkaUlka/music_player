import styled from "styled-components";

export const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  margin: 0 0 20px;
  color: #333;
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const FileInfo = styled.div`
  margin: 10px 0;
  color: #666;
  font-size: 0.9rem;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

export const FileActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const RemoveButton = styled.button`
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f57c00;
  }
`;
