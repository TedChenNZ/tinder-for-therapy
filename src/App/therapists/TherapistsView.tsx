import React from "react";
import { ITherapist } from "src/services/therapist/TherapistAPI";
import TherapistView from "./TherapistView";

interface ITherapistsViewProps {
	therapists: ITherapist[];
}

export default function TherapistsView({ therapists }: ITherapistsViewProps) {
	return (
		<div>
			{therapists.map((therapist) => (
				<TherapistView key={therapist.id} therapist={therapist} />
			))}
		</div>
	);
}
