import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  type: string;
  inputCss?: string;
  name?: string;
  patters?: string;

  disabled?: boolean;
  class?: string;
  value?: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & typeof defaultProps;

const defaultProps = {
  inputCss: "",
  class: "",
  disabled: false,
};

const CustomCheckBox = (props: Props) => {
  return (
    <label className={` block mb-2  font-medium text-gray-700 ${props.class} `}>
      <span> {props.label}</span>

      <input
        className={` bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 ${props.inputCss} `}
        tabIndex={0}
        pattern={props.patters}
        type={props.type}
        name={props.name}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        placeholder={props.placeholder}
        checked={props.value}
        disabled={props.disabled}
      />
    </label>
  );
};
CustomCheckBox.defaultProps = defaultProps;

export default CustomCheckBox;
