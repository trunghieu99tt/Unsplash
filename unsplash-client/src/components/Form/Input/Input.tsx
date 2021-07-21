import React from "react";

interface Props {
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
}

const Input = (props: Props) => {
    const { type, placeholder, onChange, value, name } = props;
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
        />
    );
};

export default Input;
