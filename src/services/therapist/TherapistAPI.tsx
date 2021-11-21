import therapistData from "./therapistData.json";

export interface IPaymentOption {
	name: string;
	cost: string;
	bookingLength: string;
}

export interface ITherapist {
	id: string;
	primaryImageUrl: string;
	firstName: string;
	lastName: string;
	location: string;
	biography: string;
	profession: string;
	qualifications: string[];
	languages: string[];
	specialisations: string[];
	paymentOptions: IPaymentOption[];
	fundingOptions: string[];
	nextAppointmentTime: string; // Date
}

interface IGetTherapistsResponse {
	therapists: ITherapist[];
}

export enum Reaction {
	LIKE = "LIKE",
	DISLIKE = "DISLIKE",
}
export interface ITherapistReaction {
	therapistID: string;
	reaction: Reaction;
}

const THERAPIST_REACTS_CACHE_KEY = "therapist_reacts";

export const TherapistAPI = {
	getTherapists: async () => {
		return therapistData as IGetTherapistsResponse;
	},
	getTherapistReactions: async (): Promise<ITherapistReaction[]> => {
		const cached = localStorage.getItem(THERAPIST_REACTS_CACHE_KEY);
		if (cached) {
			return JSON.parse(cached);
		}
		return [];
	},
	updateTherapistReactions: async (therapistReaction: ITherapistReaction): Promise<ITherapistReaction[]> => {
		const reactions = await TherapistAPI.getTherapistReactions();
		const previousReact = reactions.find((react) => react.therapistID === therapistReaction.therapistID);
		if (previousReact) {
			previousReact.reaction = therapistReaction.reaction;
		} else {
			reactions.push(therapistReaction);
		}
		localStorage.setItem(THERAPIST_REACTS_CACHE_KEY, JSON.stringify(reactions));
		return reactions;
	},
};
