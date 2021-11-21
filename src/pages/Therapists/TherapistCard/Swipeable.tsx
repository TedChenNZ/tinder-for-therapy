import { useMotionValue, useTransform, motion, useAnimation } from "framer-motion";

interface ISwipeable {
	children?: React.ReactNode;
	minEdge?: number;
	maxEdge?: number;
	onLeftSwipe: () => void;
	onRightSwipe: () => void;
	onLeftSwiping?: () => void;
	onRightSwiping?: () => void;
}

export const Swipeable = ({
	minEdge = 50,
	maxEdge = 400,
	onLeftSwipe,
	onRightSwipe,
	onLeftSwiping,
	onRightSwiping,
	children,
}: ISwipeable) => {
	// To move the card as the user drags the cursor
	const motionValue = useMotionValue(0);

	// To rotate the card as the card moves on drag
	const rotateValue = useTransform(motionValue, [-maxEdge, maxEdge], [-minEdge, minEdge]);

	// To decrease opacity of the card when swiped
	// on dragging card to left(-MAX_EDGE) or right(MAX_EDGE)
	// opacity gradually changes to 0
	// and when the card is in center opacity = 1
	const opacityValue = useTransform(motionValue, [-maxEdge, -minEdge, 0, minEdge, maxEdge], [0, 1, 1, 1, 0]);
	const controls = useAnimation();

	return (
		<motion.div>
			<motion.div
				drag
				animate={controls}
				dragConstraints={{ left: -maxEdge, right: maxEdge, top: 0, bottom: 0 }}
				style={{ x: motionValue, rotate: rotateValue, opacity: opacityValue }}
				onDrag={(event, info) => {
					if (Math.abs(info.offset.x) > minEdge) {
						if (info.offset.x > 0) {
							onRightSwiping && onRightSwiping();
						} else {
							onLeftSwiping && onLeftSwiping();
						}
					}
				}}
				onDragEnd={(event, info) => {
					if (Math.abs(info.offset.x) > maxEdge) {
						console.log("swiped");
						if (info.offset.x > 0) {
							onRightSwipe();
						} else {
							onLeftSwipe();
						}
						controls.start({ x: info.point.x < 0 ? -maxEdge : maxEdge });
					} else {
						controls.start({ x: 0 });
					}
				}}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};
