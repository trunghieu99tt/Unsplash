import React, { ChangeEvent } from "react";
import { toast } from "react-toastify";

// talons
import { useAppContext } from "../../context/app.context";
import { useImage } from "../../talons/userImage";

// utils
import mergeClasses from "../../utils/mergeClasses";

// components
import FormGroup from "../Form/FormGroup";
import SubmitButton from "../SubmitButton";

// styles
import defaultClasses from "./createImageForm.module.css";

interface Props {
	classes?: object;
}

const CreateImageForm = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const { dispatch } = useAppContext();

	const { createImage, imageExists } = useImage();

	const [formValue, setFormValue] = React.useState({
		name: "",
		url: "",
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setFormValue({
			...formValue,
			[name]: value,
		});
	};

	const onCloseForm = () => dispatch({ type: "SET_POP_UP", payload: null });

	const onSubmit = async () => {
		if (formValue.name === "" || formValue.url === "") {
			toast.error("Please fill in all fields.");
			return;
		}

		const isOk = await imageExists(formValue.url);
		console.log("isOk", isOk);

		if (!isOk) {
			toast.error("Image is invalid");
			return;
		}

		try {
			await createImage(formValue);
			onCloseForm();
			toast.success("Image created");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className={classes.form}>
			<h3 className={classes.title}>Create New Image</h3>
			<FormGroup
				name="name"
				label="Name"
				onChange={onChange}
				type="text"
				value={formValue.name}
				required={true}
			/>
			<FormGroup
				name="url"
				label="URL"
				onChange={onChange}
				type="text"
				value={formValue.url}
				required={true}
			/>
			<div className={classes.buttons}>
				<SubmitButton onClick={onSubmit}>Create</SubmitButton>
			</div>
		</div>
	);
};

export default CreateImageForm;
