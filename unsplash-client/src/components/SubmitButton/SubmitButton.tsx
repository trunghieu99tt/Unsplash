import React from "react";
import cn from "classnames";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./submitButton.module.css";

interface Props {
	classes?: object;
	type?: "button" | "submit" | "reset" | undefined;
	buttonType?: "primary" | "danger";
	children?: any;
	onClick?: () => void;
}

const SubmitButton = ({
	classes: propsClasses,
	type = undefined,
	children,
	onClick,
	buttonType = "primary",
}: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	return (
		<button
			className={cn(classes.root, {
				[classes.danger]: buttonType === "danger",
			})}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};

export default SubmitButton;
