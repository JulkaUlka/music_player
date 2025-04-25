import styled from "styled-components";

export const Button = styled.button`
  background: none;
  border: none;
  cursor: ${props => props.$hasAudio ? 'pointer' : 'not-allowed'};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`; 