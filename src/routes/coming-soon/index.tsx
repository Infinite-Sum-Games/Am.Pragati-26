import { createFileRoute } from "@tanstack/react-router";
import ComingSoonCard from "../../components/ComingSoonCard";

export const Route = createFileRoute("/coming-soon/")({
	component: ComingSoonPage,
});

function ComingSoonPage() {
	return <ComingSoonCard eventTitle="PRAGATI '26" subtitle="COMING SOON" />;
}
