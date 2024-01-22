import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  type: string;
  inputCss?: string;
  disabled?: boolean;
  class?: string;
  value?: string;
  onChange?: () => void;
} & typeof defaultProps;

const defaultProps = {
  inputCss: "",
  class: "",
};

const CustomSelect = (props: Props) => {
  return (
    <label
      className={` block mb-2 text-sm font-medium text-gray-700 ${props.class} `}
    >
      <span> {props.label}</span>

      <select
        className={` bg-gray-50 border mt-2 w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 ${props.inputCss} `}
        tabIndex={0}
        name={props.label}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      >
        <option selected>Select option</option>
        <option selected>Option 1</option>
        <option selected>Option 2</option>
      </select>
    </label>
  );
};
CustomSelect.defaultProps = defaultProps;

export default CustomSelect;
