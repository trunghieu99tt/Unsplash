import React, { ChangeEvent, useState } from "react";
import mergeClasses from "../../utils/mergeClasses";

import client from "../../api/client";
import { useAppContext } from "../../context/app.context";
import { useImage } from "../../talons/userImage";
import FormGroup from "../Form/FormGroup";
import SubmitButton from "../SubmitButton";

// utils

// styles
import defaultClasses from "./deleteImageForm.module.css";
import { toast } from "react-toastify";

interface Props {
	classes?: object;
}

const DeleteImageForm = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const {
		dispatch,
		state: { activeImage },
	} = useAppContext();

	const { getImagesByName, deleteImage } = useImage();

	const [password, setPassword] = useState<string>("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onCloseForm = () => dispatch({ type: "SET_POP_UP", payload: null });

	const onSubmit = async () => {
		if (activeImage?._id && password) {
			try {
				const response = await deleteImage(activeImage._id, { password });
				if (response.status === 200) {
					dispatch({ type: "SET_ACTIVE_IMAGE", payload: null });
					dispatch({ type: "SET_PAGE", payload: 1 });
					await getImagesByName();
					onCloseForm();
					toast.success("Image deleted successfully");
				}
			} catch (error) {
				toast.error(error.response.data.message);
			}
		}
	};

	return (
		<div className={classes.form}>
			<h3 className={classes.title}>Are you sure ?</h3>
			<FormGroup
				name="password"
				label="Your password"
				onChange={onChange}
				type="password"
				value={password}
				required={true}
			/>
			<div className={classes.buttons}>
				<SubmitButton onClick={onSubmit} buttonType="danger">
					Delete
				</SubmitButton>
			</div>
		</div>
	);
};

export default DeleteImageForm;
