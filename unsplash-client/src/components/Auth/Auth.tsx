import React, { ChangeEvent, useState } from "react";
import { useAppContext } from "../../context/app.context";

// utils
import mergeClasses from "../../utils/mergeClasses";
import client from "../../api/client";

// components
import FormGroup from "../Form/FormGroup";
import SubmitButton from "../SubmitButton";

// styles
import defaultClasses from "./auth.module.css";
import { toast } from "react-toastify";

interface Props {
	classes?: object;
}

const Auth = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const { dispatch } = useAppContext();

	const [formValue, setFormValue] = React.useState({
		username: "",
		password: "",
	});
	const [isSignIn, setIsSignIn] = useState<boolean>(true);

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
		const endpoint = isSignIn ? "/signIn" : "signUp";
		try {
			const response = await client.post(endpoint, formValue);
			if ([200, 201].includes(response.status)) {
				const token = response?.data?.token;
				if (token) {
					window.localStorage.setItem("token", JSON.stringify(token));
					dispatch({ type: "SET_USER", payload: response.data.user });
				}
				onCloseForm();
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	const toggleSignIn = () => setIsSignIn((value) => !value);

	return (
		<div className={classes.form}>
			<h3 className={classes.title}>Sign in or create a new account!</h3>
			<FormGroup
				name="username"
				label="Username"
				onChange={onChange}
				type="text"
				value={formValue.username}
			/>
			<FormGroup
				name="password"
				label="Password"
				onChange={onChange}
				type="password"
				value={formValue.password}
			/>
			<div className={classes.buttons}>
				<div className={classes.left}>
					<button className={classes.signUpBtn} onClick={toggleSignIn}>
						{isSignIn ? "Sign Up" : "Sign In"}
					</button>
				</div>
				<div className={classes.right}>
					<SubmitButton onClick={onSubmit}>
						{isSignIn ? "Sign In" : "Sign Up"}
					</SubmitButton>
				</div>
			</div>
		</div>
	);
};

export default Auth;
