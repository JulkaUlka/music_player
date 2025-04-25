import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    font-size: 12px;
  }
`;

export const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 5px;
  }

  .page-item {
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #333;
      text-decoration: none;
      transition: all 0.3s;

      &:hover {
        background: #f5f5f5;
      }
    }

    &.active a {
      background: #4caf50;
      color: white;
      border-color: #4caf50;
    }

    &.disabled a {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const ErrorMessage = styled.div`
  color: #f44336;
  text-align: center;
  padding: 20px;
  background: #ffebee;
  border-radius: 4px;
  margin: 20px;
`;
