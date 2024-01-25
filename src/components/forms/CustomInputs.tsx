import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  type: string;
  inputCss?: string;
  name?: string;
  disabled?: boolean;
  class?: string;
  value?: any;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
} & typeof defaultProps;

const defaultProps = {
  inputCss: "text-sm",
  class: "",
  disabled: false,
};

const CustomInputs = (props: Props) => {
  return (
    <label className={` block mb-2  font-medium text-gray-700 ${props.class} `}>
      <span> {props.label}</span>

      <input
        className={` bg-gray-50 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 ${props.inputCss} `}
        tabIndex={0}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
      />
    </label>
  );
};
CustomInputs.defaultProps = defaultProps;

export default CustomInputs;
