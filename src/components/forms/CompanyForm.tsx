import { Dispatch, SetStateAction } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { COMPANY } from "../../models/company";
import { COUNTRY, JURISDICTION, PAYER } from "../../utils/consts";
import { PatternFormat } from "react-number-format";

type Props = {
  formData: COMPANY;
  setFormData: Dispatch<SetStateAction<COMPANY>>;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const CompanyForm = (props: Props) => {
  return (
    <>
      <div className="xl:w-1/2  w-full">
        <CustomInputs
          name="postal_address"
          onChange={props.onChange}
          value={props.formData.postal_address}
          class="w-full mx-auto  inline-block "
          label="* Dirección postal"
          placeholder="Dirección"
          type="text"
        />
        <CustomSelect
          name="country_postal_address"
          onChange={props.onChange}
          options={COUNTRY}
          value={props.formData.country_postal_address}
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          placeholder="San Juan"
          type="text"
        />
        <CustomInputs
          name="state_postal_addess"
          onChange={props.onChange}
          value={props.formData.state_postal_addess}
          class="w-1/3 mx-auto ps-1 pe-1  inline-block "
          label=""
          placeholder="Puerto Rico"
          type="text"
        />
        <CustomInputs
          name="zipcode_postal_address"
          onChange={props.onChange}
          value={props.formData.zipcode_postal_address}
          class="w-1/3 mx-auto ps-1  inline-block "
          label=""
          placeholder="00820"
          type="text"
        />
        <CustomInputs
          name="physical_address"
          onChange={props.onChange}
          value={props.formData.physical_address}
          class="w-full mx-auto  inline-block "
          label="Dirección física"
          placeholder="404 Calle Ensada"
          type="text"
        />
        <CustomSelect
          name="country_physical_address"
          options={COUNTRY}
          onChange={props.onChange}
          value={props.formData.country_physical_address}
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          placeholder="San Juan"
          type="text"
        />
        <CustomInputs
          name="state_physical_address"
          onChange={props.onChange}
          value={props.formData.state_physical_address}
          class="w-1/3 mx-auto ps-1 pe-1  inline-block "
          label=""
          placeholder="Puerto Rico"
          type="text"
        />
        <CustomInputs
          name="zipcode_physical_address"
          onChange={props.onChange}
          value={props.formData.zipcode_physical_address}
          class="w-1/3 mx-auto ps-1  inline-block "
          label=""
          placeholder="00820"
          type="text"
        />

        <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block">
          <span>Numero de teléfono</span>
          <PatternFormat
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            value={props.formData.phone_number}
            name="phone_number"
            format="###-###-####"
          />
        </label>

        <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
          <span>Fax</span>
          <PatternFormat
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            value={props.formData.fax_number}
            name="fax_number"
            format="###-###-####"
          />
        </label>
        <CustomInputs
          name="desem"
          onChange={props.onChange}
          value={props.formData.desem}
          class="w-1/2 mx-auto pe-1 inline-block "
          label="NUM DE DESEMPLEO/INCAPACIDAD"
          placeholder="Puerto Rico"
          type="text"
        />

        <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
          <span>* Número patronal</span>
          <PatternFormat
            name="number_patronal"
            value={props.formData.number_patronal}
            onChange={props.onChange}
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            format="##-#######"
          />
        </label>

        <label className=" mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
          <span>% DE Desempleo</span>
          <PatternFormat
            name="driver"
            onChange={props.onChange}
            value={props.formData.driver}
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            format="##%"
          />
        </label>
        <label className=" mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
          <span>% DE Incapacitados</span>
          <PatternFormat
            name="disabled_percent"
            onChange={props.onChange}
            value={props.formData.disabled_percent}
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            format="##%"
          />
        </label>

        <label className="block mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
          <span>Registro Comerciante</span>
          <PatternFormat
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            onChange={props.onChange}
            value={props.formData.commercial_register}
            name="commercial_register"
            format="#######-####"
          />
        </label>
      </div>
      <div className="xl:w-1/2  w-full">
        <CustomInputs
          name="contact"
          onChange={props.onChange}
          value={props.formData.contact}
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Persona de Contacto"
          placeholder=""
          type="text"
        />
        <CustomInputs
          name="contact"
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Teléfono Contacto"
          placeholder=""
          type="text"
        />
        <CustomInputs
          name="website"
          onChange={props.onChange}
          value={props.formData.website}
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Sitio web"
          placeholder="www.web.com"
          type="text"
        />
        <CustomInputs
          name="email"
          onChange={props.onChange}
          value={props.formData.email}
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Correo electrónico"
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto pe-1  inline-block "
          label="COML (mm/dd/yyyy)"
          onChange={props.onChange}
          value={props.formData.coml}
          name="coml"
          type="date"
        />

        <CustomSelect
          name="jurisdiction"
          onChange={props.onChange}
          value={props.formData.jurisdiction}
          class="w-1/2 mx-auto ps-1  inline-block "
          options={JURISDICTION}
          label="Jurisdicción"
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto ps-1 pe-1  inline-block "
          name="driver_code"
          onChange={props.onChange}
          value={props.formData.driver_code}
          label="Aportación Patronal"
          placeholder=""
          type="text"
        />

        <CustomInputs
          name="driver_code"
          onChange={props.onChange}
          value={props.formData.driver_rate}
          class="w-1/3 mx-auto ps-1  inline-block "
          label="Rate Choferil"
          placeholder="00820"
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto ps-1 pe-1  inline-block "
          name="driver_code"
          label="Aportación Empleado"
          placeholder=""
          type="text"
        />
        <CustomSelect
          name="payer"
          options={PAYER}
          onChange={props.onChange}
          value={props.formData.payer}
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Pagador"
          placeholder=""
          type="text"
        />

        <CustomInputs
          name="industrial_code"
          onChange={props.onChange}
          value={props.formData.industrial_code}
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Código Industrial"
          placeholder=""
          type="text"
        />
        <CustomInputs
          name="polize_number"
          onChange={props.onChange}
          value={props.formData.polize_number}
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Numero de póliza de fondo"
          placeholder="00820"
          type="text"
        />
      </div>
    </>
  );
};

export default CompanyForm;
