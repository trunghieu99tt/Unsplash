import React from "react";
import mergeClasses from "../../../utils/mergeClasses";
import Input from "../Input";

import defaultClasses from "./formGroup.module.css";

interface Props {
	classes?: object;
	type: string;
	label?: string;
	name: string;
	value: any;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup = ({
	classes: propsClasses,
	type,
	label,
	name,
	value,
	placeholder,
	onChange,
}: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	return (
		<div className={classes.root}>
			<label htmlFor={name} className={classes.label}>
				{label}
			</label>
			<div className={classes.input}>
				<Input
					value={value}
					onChange={onChange}
					type={type}
					name={name}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default FormGroup;
