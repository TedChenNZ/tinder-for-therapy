import { useQuery } from "react-query";
import { TherapistAPI } from "./TherapistAPI";

const THERAPIST_CACHE_KEY = "therapists";

export const TherapistService = {
	useGetTherapists: () => {
		return useQuery(THERAPIST_CACHE_KEY, TherapistAPI.getTherapists);
	},
};
