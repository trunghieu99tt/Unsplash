import React, { useCallback } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/app.context";

// utils
import mergeClasses from "../../utils/mergeClasses";

// components
import Input from "../Form/Input";
import SubmitButton from "../SubmitButton";

// icons
import { BiSearch, BiImageAdd } from "react-icons/bi";
import { FaUserAstronaut } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

// styles
import defaultClasses from "./header.module.css";

interface Props {
	classes?: object;
}

const Header = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const [imageName, setImageName] = useState<string>("");

	const {
		state: { user },
		dispatch,
	} = useAppContext();

	const handleImageNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setImageName(event.target.value);
	};

	const onSearchImage = async () => {
		dispatch({ type: "SET_PAGE", payload: 1 });
		dispatch({ type: "SET_NAME_QUERY", payload: imageName });
	};

	const onClickBtn = useCallback(() => {
		if (user) {
			dispatch({ type: "SET_POP_UP", payload: "CREATE_IMAGE" });
		} else {
			dispatch({ type: "SET_POP_UP", payload: "AUTH" });
		}
	}, [user]);

	const onLogout = () => {
		dispatch({ type: "SET_USER", payload: null });
		localStorage.removeItem("token");
	};

	return (
		<header className={classes.root}>
			<section className={classes.left}>
				<figure className={classes.logoWrapper}>
					<img
						src={require("../../assets/images/my_unsplash_logo.svg").default}
						alt="logo"
					/>
				</figure>

				<div className={classes.search}>
					<button className={classes.searchBtn} onClick={onSearchImage}>
						<BiSearch />
					</button>
					<Input
						type="text"
						name="imageName"
						value={imageName}
						onChange={handleImageNameChange}
						placeholder="Search by name of image"
						classes={{
							root: classes.imageQueryInput,
						}}
					/>
				</div>
			</section>
			<section className={classes.right}>
				<SubmitButton onClick={onClickBtn}>
					<div className={classes.buttonInner}>
						{user ? (
							<React.Fragment>
								<BiImageAdd />
								<span>Create Image</span>
							</React.Fragment>
						) : (
							<React.Fragment>
								<FaUserAstronaut />
								<span>Login</span>
							</React.Fragment>
						)}
					</div>
				</SubmitButton>

				{user && (
					<SubmitButton onClick={onLogout}>
						<div className={classes.buttonInner}>
							<FiLogOut /> Logout
						</div>
					</SubmitButton>
				)}
			</section>
		</header>
	);
};

export default Header;
