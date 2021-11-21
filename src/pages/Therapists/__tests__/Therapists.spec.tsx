import React from "react";
import Therapists from "src/pages/Therapists";
import { TherapistAPI } from "src/services/therapist/TherapistAPI";
import { render } from "src/__utils__/testing-library";
import { clickOnDislikeButton, clickOnLikeButton, expectCurrentLikes } from "./__utils__/TherapistsPOM";
const therapistData = require("src/services/therapist/therapistData.json"); // import .json does not work with this setup

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
});
