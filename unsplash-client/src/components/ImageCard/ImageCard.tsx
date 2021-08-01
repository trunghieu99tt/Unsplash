import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// icons
import { BsFillTrash2Fill } from "react-icons/bs";

// styles
import defaultClasses from "./imageCard.module.css";
import { useAppContext } from "../../context/app.context";
import { useEffect } from "react";
import { TImage } from "../../types/app.types";

interface Props {
	classes?: object;
	data: TImage;
}

const ImageCard = React.memo(
	({ classes: propsClasses, data }: Props) => {
		const {
			dispatch,
			state: { user },
		} = useAppContext();

		const { url, name, user: author } = data;

		const classes = mergeClasses(defaultClasses, propsClasses);

		const onDelete = () => {
			dispatch({ type: "SET_ACTIVE_IMAGE", payload: data });
			dispatch({ type: "SET_POP_UP", payload: "DELETE_IMAGE" });
		};

		return (
			<article className={classes.root}>
				{(url.includes("mp4") && (
					<video autoPlay loop muted className={classes.image}>
						<source src={url} type="video/mp4" />
					</video>
				)) || <img src={url} alt={name || ""} className={classes.image} />}
				{user && user._id === author._id && (
					<div className={classes.actions}>
						<button className={classes.deleteBtn} onClick={onDelete}>
							<BsFillTrash2Fill />
						</button>
					</div>
				)}

				<div className={classes.info}>
					<div className={classes.name}>{name}</div>
					<div className={classes.author}>{author.username}</div>
				</div>
			</article>
		);
	},
	(prevProps, nextProps) => {
		if (
			JSON.stringify(prevProps.classes) !== JSON.stringify(nextProps.classes)
		) {
			return true;
		}
		return false;
	}
);

export default ImageCard;
