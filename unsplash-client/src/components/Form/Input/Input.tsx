import React from "react";
import mergeClasses from "../../../utils/mergeClasses";

import defaultClasses from "./input.module.css";

interface Props {
	type: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	name: string;
	required?: boolean;
	classes?: object;
}

const Input = (props: Props) => {
	const {
		type,
		placeholder,
		onChange,
		value,
		name,
		required,
		classes: propsClasses,
	} = props;

	const classes = mergeClasses(defaultClasses, propsClasses);

	return (
		<input
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			name={name}
			className={classes.root}
			required={required}
		/>
	);
};

export default Input;
