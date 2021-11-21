import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { StyleProviders } from "./StyleProviders";
import { ReactQueryDevtools } from "react-query/devtools";

const SHOW_DEV_TOOLS = false;

export const SetupProviders: React.FC = ({ children }) => {
	const [queryClient] = useState(new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<StyleProviders>{children}</StyleProviders>
			{SHOW_DEV_TOOLS && <ReactQueryDevtools />}
		</QueryClientProvider>
	);
};
