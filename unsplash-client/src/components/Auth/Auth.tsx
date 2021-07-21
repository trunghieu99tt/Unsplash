import React from "react";
import { FormEvent } from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";
import FormGroup from "../Form/FormGroup";

// styles
import defaultClasses from "./auth.module.css";

interface Props {
    classes?: object;
}

const Auth = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const [formValue, setFormValue] = React.useState({
        username: "",
        password: "",
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

    // return a form with 2 inputs, a submit button and a div for error messages
    return (
        <form className={classes.form}>
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
            <button className={classes.button} type="submit">
                Sign in
            </button>
        </form>
    );
};

export default Auth;
