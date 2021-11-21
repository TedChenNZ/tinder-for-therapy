import { useMutation, useQuery, useQueryClient } from "react-query";
import { TherapistAPI } from "./TherapistAPI";

const THERAPIST_CACHE_KEY = "therapists";

const THERAPIST_REACTS_CACHE_KEY = "therapist_reactions";

export const TherapistService = {
	useGetTherapists: () => {
		return useQuery(THERAPIST_CACHE_KEY, TherapistAPI.getTherapists);
	},
	useGetTherapistReactions: () => {
		return useQuery(THERAPIST_REACTS_CACHE_KEY, TherapistAPI.getTherapistReactions);
	},
	useUpdateTherapistReactions: () => {
		const queryClient = useQueryClient();

		return useMutation(TherapistAPI.updateTherapistReactions, {
			onSuccess: (data) => {
				queryClient.setQueryData(THERAPIST_REACTS_CACHE_KEY, data);
			},
		});
	},
};
