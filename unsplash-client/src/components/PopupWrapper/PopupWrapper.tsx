import React from 'react';

// utils
import mergeClasses from "../../utils/mergeClasses";


// styles
import defaultClasses from './popupwrapper.module.css';

interface Props {
classes?:object
}

const PopupWrapper = ({classes: propsClasses}: Props) => {

const classes = mergeClasses(defaultClasses, propsClasses);

return (
<div>
</div>
);
}

export default PopupWrapper;