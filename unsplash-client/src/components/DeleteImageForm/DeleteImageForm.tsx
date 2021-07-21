import React from "react";
import mergeClasses from "../../utils/mergeClasses";

// utils

// styles
import defaultClasses from "./deleteimageform.module.css";

interface Props {
    classes?: object;
}

const DeleteImageForm = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return <div></div>;
};

export default DeleteImageForm;
