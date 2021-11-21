import React, { useMemo } from "react";
import { ITherapist, ITherapistReaction } from "src/services/therapist/TherapistAPI";
import { TherapistService } from "src/services/therapist/TherapistService";
import { TherapistView } from "./TherapistCard/TherapistView";

interface ITherapistsViewProps {
	therapists: ITherapist[];
	therapistReactions: ITherapistReaction[];
}

export function TherapistsView({ therapists, therapistReactions }: ITherapistsViewProps) {
	const updateTherapistReaction = TherapistService.useUpdateTherapistReactions();
	const onTherapistReaction = async (therapistReaction: ITherapistReaction) => {
		await updateTherapistReaction.mutate(therapistReaction);
		window.scrollTo(0, 0);
	};

	const therapistsToShow = useMemo(
		() =>
			therapists.filter((therapist) => {
				const nextAppointment = new Date(therapist.nextAppointmentTime);
				if (new Date().getTime() - nextAppointment.getTime() > 0) {
					// is in past
					return false;
				}
				if (therapistReactions.some((reaction) => reaction.therapistID === therapist.id)) {
					return false;
				}
				return true;
			}),
		[therapists, therapistReactions],
	);

	return (
		<div className="p-8 w-full flex flex-col items-center">
			{therapistsToShow?.length ? (
				<TherapistView therapist={therapistsToShow[0]} onTherapistReaction={onTherapistReaction} />
			) : (
				<div>
					<p>No more therapists</p>
				</div>
			)}
		</div>
	);
}
