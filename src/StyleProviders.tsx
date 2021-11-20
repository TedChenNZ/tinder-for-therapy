import React from "react";
import "normalize.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

export const StyleProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
