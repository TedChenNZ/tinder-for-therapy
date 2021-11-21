import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { StyleProviders } from "./StyleProviders";

export const SetupProviders: React.FC = ({ children }) => {
	const [queryClient] = useState(new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<StyleProviders>{children}</StyleProviders>
		</QueryClientProvider>
	);
};