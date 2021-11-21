import React from "react";
import { TherapistService } from "src/services/therapist/TherapistService";
import LoadingScreen from "./LoadingScreen";
import TherapistsView from "./TherapistsView";

interface ITherapistsProps {}

export default function Therapists({}: ITherapistsProps) {
	const therapistsQuery = TherapistService.useGetTherapists();
	if (!therapistsQuery.isFetched) {
		return <LoadingScreen />;
	}
	return <TherapistsView therapists={therapistsQuery.data?.therapists || []} />;
}
