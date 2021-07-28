import React, { ChangeEvent } from "react";
import { useAppContext } from "../../context/app.context";
import mergeClasses from "../../utils/mergeClasses";
import FormGroup from "../Form/FormGroup";
import SubmitButton from "../SubmitButton";

// utils

// styles
import defaultClasses from "./deleteImageForm.module.css";

interface Props {
	classes?: object;
}

const DeleteImageForm = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const { dispatch } = useAppContext();

	const [password, setPassword] = React.useState<string | null>(null);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onCloseForm = () => dispatch({ type: "SET_POP_UP", payload: null });

	return (
		<div className={classes.form}>
			<h3 className={classes.title}>Are you sure ?</h3>
			<FormGroup
				name="password"
				label="Your password"
				onChange={onChange}
				type="password"
				value={password}
			/>
			<div className={classes.buttons}>
				<SubmitButton onClick={() => {}}>Delete</SubmitButton>
				<button onClick={onCloseForm} className={classes.closeBtn}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default DeleteImageForm;
