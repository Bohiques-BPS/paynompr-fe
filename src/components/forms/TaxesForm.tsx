import { Dispatch, SetStateAction } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import { TAXES } from "../../models/taxes";

type Props = {
  formData: TAXES;
  setFormData: Dispatch<SetStateAction<TAXES>>;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const TaxesForm = (props: Props) => {
  return (
    <>
      <div className="xl:w-1/3 m-auto w-full">
        <CustomInputs
          class="w-full mx-auto  inline-block "
          label="Titulo"
          name="name"
          onChange={props.onChange}
          value={props.formData.name}
          type="text"
        />
        <CustomInputs
          class="w-full mx-auto  inline-block "
          label="Monto"
          name="amount"
          onChange={props.onChange}
          value={props.formData.amount}
          type="number"
        />
      </div>
    </>
  );
};

export default TaxesForm;
