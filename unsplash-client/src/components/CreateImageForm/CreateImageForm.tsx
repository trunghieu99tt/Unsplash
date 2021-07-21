import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./createimageform.module.css";

interface Props {
    classes?: object;
}

const CreateImageForm = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return <div></div>;
};

export default CreateImageForm;
