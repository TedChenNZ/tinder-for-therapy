import styled from "styled-components";

export const Button = styled.button`
  background: transparent;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  outline: none;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  transition: all 0.3s;
  padding: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.background};
  }
`;
