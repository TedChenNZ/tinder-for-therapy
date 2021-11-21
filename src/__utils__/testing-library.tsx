import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { StyleProviders } from "src/pages/App/setup/StyleProviders";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<StyleProviders>{children}</StyleProviders>
		</QueryClientProvider>
	);
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
	render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
