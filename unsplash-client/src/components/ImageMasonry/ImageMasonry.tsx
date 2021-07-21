import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./imageMasonry.module.css";

interface Props {
    classes?: object;
}

const ImageMasonry = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return <main className={classes.root}></main>;
};

export default ImageMasonry;
