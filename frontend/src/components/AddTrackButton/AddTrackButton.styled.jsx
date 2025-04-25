import styled from "styled-components";

export const ModalContent = styled.div`
  padding: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &.error {
    border-color: #f44336;
  }
`;

export const ErrorMessage = styled.span`
  color: #f44336;
  font-size: 0.8rem;
`;

export const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

export const GenreTag = styled.span`
  background-color: #e0e0e0;
  padding: 4px 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
`;

export const AddGenreButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.8rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &.submit {
    background-color: #4caf50;
    color: white;
    border: none;

    &:hover {
      background-color: #45a049;
    }
  }

  &.cancel {
    background-color: #f5f5f5;
    border: 1px solid #ddd;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;


