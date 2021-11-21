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
export const TherapistAPI = {
	getTherapists: async () => {
		return therapistData as IGetTherapistsResponse;
	},
};
