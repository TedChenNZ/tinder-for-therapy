import React, { useMemo } from "react";
import { ITherapist, ITherapistReaction, Reaction } from "src/services/therapist/TherapistAPI";
import logoImg from "./logo-super-high@4x.png";
import heartSVG from "./heart.svg";

interface IHeaderProps {
	therapistReactions: ITherapistReaction[];
}

export default function Header({ therapistReactions }: IHeaderProps) {
	const totalLikes = useMemo(() => {
		return therapistReactions.filter((reaction) => reaction.reaction === Reaction.LIKE).length;
	}, [therapistReactions]);
	return (
		<div className="flex w-full justify-between h-16 p-4">
			<img src={logoImg} />
			<div className="flex items-center" style={{ color: "rgb(74, 135, 207)" }}>
				<span>{totalLikes}</span> <img className="h-full" src={heartSVG} />
			</div>
		</div>
	);
}
