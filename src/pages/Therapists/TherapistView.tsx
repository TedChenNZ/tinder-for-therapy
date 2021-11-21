import React from "react";
import { ITherapist } from "src/services/therapist/TherapistAPI";

interface ITherapistViewProps {
	therapist: ITherapist;
}

export default function TherapistView({ therapist }: ITherapistViewProps) {
	return (
		<div>
			{therapist.firstName} {therapist.lastName}
		</div>
	);
}
