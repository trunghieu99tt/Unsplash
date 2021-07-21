import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./footer.module.css";

interface Props {
    classes?: object;
}

const Footer = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return <footer className={classes.footer}>This is a footer</footer>;
};

export default Footer;
