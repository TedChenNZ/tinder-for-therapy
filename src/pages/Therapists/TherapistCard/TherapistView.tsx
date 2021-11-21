import React, { useState } from "react";
import { IPaymentOption, ITherapist, ITherapistReaction, Reaction } from "src/services/therapist/TherapistAPI";
import locationSVG from "./location.svg";
import crossSVG from "./cross.svg";
import heartSVG from "./heart-white.svg";

export interface ITherapistViewProps {
	therapist: ITherapist;
	onTherapistReaction: (therapistReaction: ITherapistReaction) => Promise<void>;
}

export function TherapistView({ therapist, onTherapistReaction }: ITherapistViewProps) {
	const [isShowingMore, setIsShowingMore] = useState(false);
	return (
		<div className={`border border-gray-400 bg-white rounded-2xl p-8 shadow-lg prose w-full`}>
			{/** Header */}
			<div className="flex flex-col items-center">
				<img className="mb-8 rounded-full w-24 h-24 object-cover" src={therapist.primaryImageUrl} />

				<h1 className="font-serif m-0" style={{ margin: 0 }}>
					{therapist.firstName} {therapist.lastName}
				</h1>
				<h3 className="font-sans m-0" style={{ margin: 0 }}>
					{therapist.profession}
				</h3>
			</div>

			<div className="h-px w-full bg-gray-200 my-4" />

			{/** Quick Info */}

			<div className="text-sm h-28">
				<ul style={{ margin: 0 }}>
					<div className="flex">
						<img className="flex align-middle h-5 w-6 pb-0.5 pt-1 pr-2 m-0" style={{ margin: 0 }} src={locationSVG} />
						<span>{therapist.location}</span>
					</div>
					<li>{therapist.languages.join(", ")}</li>
					<li>Specialises in {therapist.specialisations.join(", ")}</li>
				</ul>
			</div>

			{/** Bio */}
			<div>
				<H2>Bio</H2>
				<p className="text-sm h-28 w-full ">{therapist.biography}</p>
			</div>

			{isShowingMore && (
				<>
					{/** Specialisations */}
					<div>
						<H2>Specialisations</H2>
						<div className="text-sm">
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
				</>
			)}

			<div className="text-xs text-center mb-2">
				<a
					target="_blank"
					onClick={() => {
						setIsShowingMore(!isShowingMore);
					}}
				>
					{isShowingMore ? "Show less ▲" : "Show more ▼"}
				</a>
			</div>
			{/** Reactions */}
			<div className="w-full flex justify-center	">
				<button
					className="btn btn-outline btn-circle btn-neutral w-16 h-16 m-2"
					onClick={() => onTherapistReaction({ therapistID: therapist.id, reaction: Reaction.DISLIKE })}
				>
					<img style={{ margin: 0 }} className="h-6 w-6" src={crossSVG} />
				</button>
				<button
					className="btn btn-primary btn-circle w-16 h-16 m-2"
					onClick={() => onTherapistReaction({ therapistID: therapist.id, reaction: Reaction.LIKE })}
				>
					<img style={{ margin: 0 }} className="h-6 w-6" src={heartSVG} />
				</button>
			</div>
		</div>
	);
}

const H2: React.FC = ({ children }) => {
	return (
		<div className="flex items-center" style={{ margin: 0 }}>
			<span className="h-px w-full bg-gray-200" />
			<span className="prose">
				<h2 className=" font-serif font-bold m-4">{children}</h2>
			</span>
			<span className="h-px w-full bg-gray-200" />
		</div>
	);
};

const PaymentOption = ({ paymentOption }: { paymentOption: IPaymentOption }) => {
	return (
		<div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 m-4 border border-gray-400">
			<div className="text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">{paymentOption.name}</div>
			<div className="text-gray-900 dark:text-white text-3xl font-bold">
				${paymentOption.cost}
				<span className="text-gray-400 text-sm font-medium mx-1">for {paymentOption.bookingLength} minutes</span>
			</div>
		</div>
	);
};
