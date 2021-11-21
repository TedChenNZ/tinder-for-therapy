import React from "react";
import Therapists from "src/pages/Therapists";
import { IGetTherapistsResponse, ITherapist, TherapistAPI } from "src/services/therapist/TherapistAPI";
import { render, screen } from "src/__utils__/testing-library";
import { clickOnDislikeButton, clickOnLikeButton, expectCurrentLikes } from "./__utils__/TherapistsPOM";
const therapistData = require("src/services/therapist/therapistData.json"); // import .json does not work with this setup
import { TherapistsView } from "src/pages/Therapists/TherapistsView";

describe("App", () => {
	beforeAll(() => {
		jest.spyOn(TherapistAPI, "getTherapists").mockResolvedValue(therapistData);
		window.scrollTo = jest.fn();
	});
	afterAll(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		localStorage.clear();
	});
	it("updates count on like", async () => {
		render(<Therapists />);
		await expectCurrentLikes(0);
		await clickOnLikeButton();
		await expectCurrentLikes(1);
		await clickOnLikeButton();
		await expectCurrentLikes(2);
	});
	it("does not update count on dislike", async () => {
		render(<Therapists />);
		await expectCurrentLikes(0);
		await clickOnDislikeButton();
		await expectCurrentLikes(0);
	});
	it("does not show therapists without future next appointment date", async () => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		const therapists: ITherapist[] = [
			{
				id: "6184b9135ac227d766ff85ce",
				primaryImageUrl:
					"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
				firstName: "Nita",
				lastName: "Fowler",
				location: "60 Chestnut Avenue, Castleton, Minnesota, 8290",
				biography:
					"Non ad minim dolore commodo exercitation ullamco labore ut amet enim irure labore aliqua voluptate. Amet sit officia irure ut consequat deserunt nostrud velit voluptate. Enim cillum in laborum ullamco est. Quis et in sit enim nostrud qui.",
				profession: "Counseller",
				qualifications: ["BHSc in Applied Mental Health"],
				languages: ["Te Reo Maori"],
				specialisations: [
					"Depression",
					"Sleep issues",
					"Self harm",
					"Couples",
					"Abuse",
					"Identity",
					"Cognitive Behavioural Therapy (CBT)",
					"Addiction",
				],
				paymentOptions: [
					{
						name: "Standard",
						cost: "100",
						bookingLength: "60",
					},
					{
						name: "Family",
						cost: "250",
						bookingLength: "120",
					},
					{
						name: "Student",
						cost: "50",
						bookingLength: "45",
					},
				],
				fundingOptions: ["ACC Claims", "EPA", "Clearhead Employer Subsidy"],
				nextAppointmentTime: yesterday.toDateString(),
			},
		];
		render(<TherapistsView therapists={therapists} therapistReactions={[]} />);
		expect(screen.queryByTestId("no-more-therapists")).toBeInTheDocument();
	});

	it("does show therapists with future next appointment date", async () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		const therapists: ITherapist[] = [
			{
				id: "6184b9135ac227d766ff85ce",
				primaryImageUrl:
					"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
				firstName: "Nita",
				lastName: "Fowler",
				location: "60 Chestnut Avenue, Castleton, Minnesota, 8290",
				biography:
					"Non ad minim dolore commodo exercitation ullamco labore ut amet enim irure labore aliqua voluptate. Amet sit officia irure ut consequat deserunt nostrud velit voluptate. Enim cillum in laborum ullamco est. Quis et in sit enim nostrud qui.",
				profession: "Counseller",
				qualifications: ["BHSc in Applied Mental Health"],
				languages: ["Te Reo Maori"],
				specialisations: [
					"Depression",
					"Sleep issues",
					"Self harm",
					"Couples",
					"Abuse",
					"Identity",
					"Cognitive Behavioural Therapy (CBT)",
					"Addiction",
				],
				paymentOptions: [
					{
						name: "Standard",
						cost: "100",
						bookingLength: "60",
					},
					{
						name: "Family",
						cost: "250",
						bookingLength: "120",
					},
					{
						name: "Student",
						cost: "50",
						bookingLength: "45",
					},
				],
				fundingOptions: ["ACC Claims", "EPA", "Clearhead Employer Subsidy"],
				nextAppointmentTime: tomorrow.toDateString(),
			},
		];
		render(<TherapistsView therapists={therapists} therapistReactions={[]} />);
		expect(screen.queryByTestId("no-more-therapists")).not.toBeInTheDocument();
		expect(screen.queryByText("Nita Fowler")).toBeInTheDocument();
	});
});
