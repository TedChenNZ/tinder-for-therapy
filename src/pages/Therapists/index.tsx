import React from "react";
import { TherapistService } from "src/services/therapist/TherapistService";
import LoadingScreen from "./LoadingScreen";
import TherapistsView from "./TherapistsView";

interface ITherapistsProps {}

export default function Therapists({}: ITherapistsProps) {
	const therapistsQuery = TherapistService.useGetTherapists();
	const therapistReactionsQuery = TherapistService.useGetTherapistReactions();
	if (!therapistsQuery.isFetched || !therapistReactionsQuery.isFetched) {
		return <LoadingScreen />;
	}
	return (
		<TherapistsView
			therapists={therapistsQuery.data?.therapists || []}
			therapistReactions={therapistReactionsQuery.data || []}
		/>
	);
}
