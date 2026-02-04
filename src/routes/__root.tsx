import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";
import ClickSpark from "@/components/ClickSpark";
import RetroCursor from "@/components/RetroCursor";
import Footer from "../components/Footer";
import TanStackQueryDevtools from "../providers/tanstack-query-devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

// Routes without navbar and footer
const baseRoutesWithoutChrome = [
	"/login",
	"/signup",
	"/forgot-password",
	"/reset-password",
	"/otp",
	"/reset-otp",
	"/coming-soon",
	"/maintenance",
	"/404",
	"/signup/verify",
	"/signup/verify/",
	"/reset-password/verify",
	"/reset-password/verify/",
];

const routesWithoutFooter = new Set([...baseRoutesWithoutChrome]);

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const showFooter = !routesWithoutFooter.has(pathname);

	return (
		<>
			<Outlet />
			{showFooter && <Footer />}
			<Toaster position="top-right" />
			<ClickSpark />
			<RetroCursor />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</>
	);
}
