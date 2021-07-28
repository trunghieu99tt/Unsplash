import React from "react";
import { useAppContext } from "../../context/app.context";

// utils
import mergeClasses from "../../utils/mergeClasses";
import Auth from "../Auth";
import CreateImageForm from "../CreateImageForm";
import DeleteImageForm from "../DeleteImageForm";

// components

// styles
import defaultClasses from "./popupWrapper.module.css";

interface Props {
	classes?: object;
}

const PopupWrapper = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const {
		state: { popup },
		dispatch,
	} = useAppContext();

	const onClosePopup = () => {
		dispatch({ type: "SET_POP_UP", payload: null });
	};

	if (!popup) return null;

	let content = null;
	switch (popup) {
		case "AUTH":
			content = <Auth />;
			break;
		case "CREATE_IMAGE":
			content = <CreateImageForm />;
			break;
		case "DELETE_IMAGE":
			content = <DeleteImageForm />;
			break;
	}

	return (
		<React.Fragment>
			<div className={classes.mask} onClick={onClosePopup}></div>
			<div className={classes.root}>{content}</div>
		</React.Fragment>
	);
};

export default PopupWrapper;
