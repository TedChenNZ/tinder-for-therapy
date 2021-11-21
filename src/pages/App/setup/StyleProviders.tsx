import React from "react";
import "normalize.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "src/styles/GlobalStyles";
import { theme } from "src/styles/theme";
import "src/styles/tailwind.css";

export const StyleProviders: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	);
};
