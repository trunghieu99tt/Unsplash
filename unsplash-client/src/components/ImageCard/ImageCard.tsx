import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// icons
import { BsFillTrash2Fill } from "react-icons/bs";

// styles
import defaultClasses from "./imageCard.module.css";
import { useAppContext } from "../../context/app.context";

interface Props {
	classes?: object;
	src: string;
	alt?: string;
}

const ImageCard = ({ classes: propsClasses, src, alt }: Props) => {
	const { dispatch } = useAppContext();

	const classes = mergeClasses(defaultClasses, propsClasses);

	const onDelete = () =>
		dispatch({ type: "SET_POP_UP", payload: "DELETE_IMAGE" });

	return (
		<article className={classes.root}>
			<img src={src} alt={alt || ""} className={classes.image} />
			<div className={classes.actions}>
				<button className={classes.deleteBtn} onClick={onDelete}>
					<BsFillTrash2Fill />
				</button>
			</div>
		</article>
	);
};

export default ImageCard;
