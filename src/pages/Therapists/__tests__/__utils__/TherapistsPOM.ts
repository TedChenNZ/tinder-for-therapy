import { fireEvent, screen, waitFor } from "@testing-library/react";

export const clickOnLikeButton = async () => {
	await waitFor(() => expect(screen.getByTestId("therapist-card-wrapper-0")).toBeInTheDocument());
	const card = screen.getByTestId("therapist-card-wrapper-0");
	const likeButton = card.querySelector(`[data-id*="btn-like"]`) as Element;
	expect(likeButton).toBeInTheDocument();
	fireEvent.click(likeButton);
};

export const clickOnDislikeButton = async () => {
	await waitFor(() => expect(screen.getByTestId("therapist-card-wrapper-0")).toBeInTheDocument());
	const card = screen.getByTestId("therapist-card-wrapper-0");
	const dislikeButton = card.querySelector(`[data-id*="btn-dislike"]`) as Element;
	expect(dislikeButton).toBeInTheDocument();
	fireEvent.click(dislikeButton);
};

export const expectCurrentLikes = async (likes: number) => {
	await waitFor(() => expect(screen.getByTestId("total-likes")).toHaveTextContent(likes.toString()));
};
