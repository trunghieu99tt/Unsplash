import React, { FormEvent } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/app.context";

// utils
import mergeClasses from "../../utils/mergeClasses";

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

    const onSearchImage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (imageName.length > 0) {
            dispatch({ type: "SET_PAGE", payload: 1 });
            dispatch({ type: "SET_NAME_QUERY", payload: imageName });
        }
    };

    const onClickBtn = () => {
        if (user) {
            dispatch({ type: "SET_POP_UP", payload: "CREATE_IMAGE" });
        } else {
            dispatch({ type: "SET_POP_UP", payload: "AUTH" });
        }
    };

    return (
        <header>
            <section className={classes.left}>
                <figure className={classes.logoWrapper}>
                    <img
                        src={
                            require("../../assets/images/my_unsplash_logo.svg")
                                .default
                        }
                        alt="logo"
                    />
                </figure>

                <div className={classes.search}>
                    <form onSubmit={onSearchImage}>
                        <input
                            type="text"
                            name="imageName"
                            value={imageName}
                            onChange={handleImageNameChange}
                            placeholder="Search by name of image"
                        />
                    </form>
                </div>
            </section>
            <section className={classes.right}>
                <button className={classes.btn} onClick={onClickBtn}>
                    {user ? `Create new image` : "Login"}
                </button>
            </section>
        </header>
    );
};

export default Header;
