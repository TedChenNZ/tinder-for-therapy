import React, { useMemo } from "react";
import { useQueryClient } from "react-query";
import { ITherapist, ITherapistReaction } from "src/services/therapist/TherapistAPI";
import { TherapistService } from "src/services/therapist/TherapistService";
import { TherapistCard } from "./TherapistCard";

interface ITherapistsViewProps {
	therapists: ITherapist[];
	therapistReactions: ITherapistReaction[];
}

const MAX_CARDS_TO_STACK = 3;

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
		<div className="p-8 w-full flex flex-col items-center relative">
			{therapistsToShow?.length ? (
				therapistsToShow.slice(0, MAX_CARDS_TO_STACK).map((therapist, i) => {
					return (
						<div
							key={therapist.id}
							className="absolute"
							style={{ zIndex: therapistsToShow?.length - i }}
							data-id={`therapist-card-wrapper-${i}`}
						>
							<TherapistCard key={therapist.id} therapist={therapist} onTherapistReaction={onTherapistReaction} />
						</div>
					);
				})
			) : (
				<NoMoreTherapists />
			)}
		</div>
	);
}

function NoMoreTherapists() {
	const queryClient = useQueryClient();
	return (
		<div data-id="no-more-therapists" className="text-center">
			<p>No more therapists</p>
			<button
				onClick={() => {
					localStorage.clear();
					queryClient.refetchQueries();
				}}
				className="btn btn-sm btn-outline font-normal m-4"
			>
				Reset Data
			</button>
		</div>
	);
}
