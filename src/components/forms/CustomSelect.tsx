type Props = {
  label: string;
  placeholder?: string;
  type: string;
  inputCss?: string;
  name?: string;
  disabled?: boolean;
  class?: string;
  value?: any;
  onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
} & typeof defaultProps;

const defaultProps = {
  inputCss: "text-sm",
  class: "",
  disabled: false,
};

const CustomSelect = (props: Props) => {
  return (
    <label
      className={` block mb-2 text-sm font-medium text-gray-700 ${props.class} `}
    >
      <span> {props.label}</span>

      <select
        className={` bg-gray-50 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 ${props.inputCss} `}
        tabIndex={0}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      >
        <option value={1}>Select option</option>
        <option value={2}>Option 1</option>
        <option value={3}>Option 2</option>
      </select>
    </label>
  );
};
CustomSelect.defaultProps = defaultProps;

export default CustomSelect;
