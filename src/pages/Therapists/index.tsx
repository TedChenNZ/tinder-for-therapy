import React from "react";
import { TherapistService } from "src/services/therapist/TherapistService";
import Header from "./Header";
import LoadingScreen from "./LoadingScreen";
import TherapistsView from "./TherapistsView";

interface ITherapistsProps {}

export default function Therapists({}: ITherapistsProps) {
	const therapistsQuery = TherapistService.useGetTherapists();
	const therapistReactionsQuery = TherapistService.useGetTherapistReactions();
	if (!therapistsQuery.isFetched || !therapistReactionsQuery.isFetched) {
		return <LoadingScreen />;
	}
	const therapists = therapistsQuery.data?.therapists || [];
	const therapistReactions = therapistReactionsQuery.data || [];
	return (
		<div>
			<Header therapistReactions={therapistReactions} />
			<TherapistsView therapists={therapists} therapistReactions={therapistReactions} />
		</div>
	);
}
