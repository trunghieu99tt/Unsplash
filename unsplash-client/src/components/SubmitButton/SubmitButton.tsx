import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./submitButton.module.css";

interface Props {
	classes?: object;
	type?: "button" | "submit" | "reset" | undefined;
	children?: any;
	onClick?: () => void;
}

const SubmitButton = ({
	classes: propsClasses,
	type = undefined,
	children,
	onClick,
}: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	return (
		<button className={classes.root} onClick={onClick} type={type}>
			{children}
		</button>
	);
};

export default SubmitButton;
