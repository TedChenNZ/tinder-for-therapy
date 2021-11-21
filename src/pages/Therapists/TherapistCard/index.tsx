import { ITherapistViewProps, TherapistView } from "./TherapistView";
import { useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Swipeable } from "./Swipeable";
import { Reaction } from "src/services/therapist/TherapistAPI";

export function TherapistCard({ therapist, onTherapistReaction, ...rest }: ITherapistViewProps) {
	const onLeftSwipe = () => {
		onTherapistReaction({ therapistID: therapist.id, reaction: Reaction.DISLIKE });
	};

	const onRightSwipe = () => {
		onTherapistReaction({ therapistID: therapist.id, reaction: Reaction.LIKE });
	};

	return (
		<Swipeable onLeftSwipe={onLeftSwipe} onRightSwipe={onRightSwipe}>
			<TherapistView therapist={therapist} onTherapistReaction={onTherapistReaction} {...rest} />
		</Swipeable>
	);
}
