import React from "react";
import { IPaymentOption, ITherapist, ITherapistReaction, Reaction } from "src/services/therapist/TherapistAPI";

interface ITherapistViewProps {
	therapist: ITherapist;
	onTherapistReaction: (therapistReaction: ITherapistReaction) => Promise<void>;
}

export default function TherapistView({ therapist, onTherapistReaction }: ITherapistViewProps) {
	return (
		<div className="border border-gray-400 bg-white rounded-lg p-8 shadow-lg">
			{/** Header */}
			<div className="flex flex-col items-center">
				<img className="rounded-full w-20 h-20 object-cover m-4" src={therapist.primaryImageUrl} />
				<h1 className="font-serif text-blue-700">
					{therapist.firstName} {therapist.lastName}
				</h1>
				<h3 className="font-sans text-gray-500">{therapist.profession}</h3>
			</div>

			<hr className="my-4" />

			{/** Quick Info */}

			<div className="prose">
				<ul>
					<li>{therapist.location}</li>
					<li>{therapist.languages.join(", ")}</li>
					<li>Specialises in {therapist.specialisations.join(", ")}</li>
				</ul>
			</div>

			{/** Bio */}
			<div>
				<H2>Bio</H2>
				<p className="prose">{therapist.biography}</p>
			</div>

			{/** Specialisations */}
			<div>
				<H2>Specialisations</H2>
				<div className="prose">
					<ul>
						{therapist.specialisations.map((spec) => (
							<li key={spec}>{spec}</li>
						))}
					</ul>
				</div>
			</div>

			{/** Fees */}
			<div>
				<H2>Fees</H2>
				{therapist.paymentOptions.map((paymentOption) => (
					<PaymentOption key={paymentOption.name} paymentOption={paymentOption} />
				))}
				{/**
				 * TODO parse this correctly for display
				 */}
				<div className="flex flex-col items-center">
					{therapist.fundingOptions.map((fundingOption) => (
						<p key={fundingOption} className="text-green-500">
							{fundingOption}
						</p>
					))}
				</div>
			</div>

			{/** Actions */}
			<div className="w-full flex justify-center	">
				<button
					className="btn btn-outline btn-neutral w-16 h-16 m-2"
					onClick={() => onTherapistReaction({ therapistID: therapist.id, reaction: Reaction.DISLIKE })}
				>
					X
				</button>
				<button
					className="btn btn-primary w-16 h-16 m-2"
					onClick={() => onTherapistReaction({ therapistID: therapist.id, reaction: Reaction.LIKE })}
				>
					❤️
				</button>
			</div>
		</div>
	);
}

const H2: React.FC = ({ children }) => {
	return (
		<div className="flex items-center">
			<span className="h-0.5 w-full bg-gray-100" />
			<h2 className="text-blue-700 font-serif font-bold m-4">{children}</h2>
			<span className="h-0.5 w-full bg-gray-100" />
		</div>
	);
};

const PaymentOption = ({ paymentOption }: { paymentOption: IPaymentOption }) => {
	return (
		<div className="border border-blue-400 bg-white rounded-md p-2 my-2">
			<div className="flex font-bold justify-between text-blue-700">
				<p>{paymentOption.name}</p>
				<p>${paymentOption.cost}</p>
			</div>
			<p className="text-gray-500">{paymentOption.bookingLength} minutes</p>
		</div>
	);
};
