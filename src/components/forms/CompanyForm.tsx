import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { COMPANY } from "../../models/company";
import { COUNTRY, JURISDICTION, PAYER } from "../../utils/consts";
import { NumericFormat, PatternFormat } from "react-number-format";

type Props = {
  formData: COMPANY;
  setFormData: Dispatch<SetStateAction<COMPANY>>;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const CompanyForm = (props: Props) => {
  const [sameAddress, setSameAddress] = useState(false);
  useEffect(() => {
    if (sameAddress)
      props.setFormData({
        ...props.formData,
        physical_address: sameAddress ? props.formData.postal_address : "",
        country_physical_address: sameAddress
          ? props.formData.country_postal_address
          : "",
        state_physical_address: sameAddress
          ? props.formData.state_postal_addess
          : "",
        zipcode_physical_address: sameAddress
          ? props.formData.zipcode_postal_address
          : "",
      });
  }, [sameAddress]);
  return (
    <>
      <div className="flex w-full xl:flex-col flex-col gap-4 ">
        <div className="flex w-full xl:flex-row flex-col gap-4 block">
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
            <label>
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={() => setSameAddress(!sameAddress)}
              />{" "}
              Usar misma dirección Postal para la Física
            </label>

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
                onChange={props.onChange}
                name="phone_number"
                format="###-###-####"
              />
            </label>

            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
              <span>Fax</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.fax_number}
                onChange={props.onChange}
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
              <NumericFormat
                name="unemployment_percentage"
                allowNegative={false}
                max={100}
                maxLength={6}
                onChange={props.onChange}
                value={props.formData.unemployment_percentage}
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                suffix={"%"}
              />
            </label>
            <label className=" mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
              <span>% DE Incapacitados</span>
              <NumericFormat
                name="disabled_percent"
                allowNegative={false}
                max={100}
                maxLength={6}
                onChange={props.onChange}
                value={props.formData.disabled_percent}
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                suffix={"%"}
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

            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
              <span>Numero de teléfono</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.contact_number}
                onChange={props.onChange}
                name="contact_number"
                format="###-###-####"
              />
            </label>
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
              name="choferil_number"
              onChange={props.onChange}
              value={props.formData.choferil_number}
              class="w-1/3 mx-auto ps-1  inline-block "
              label="# Choferil"
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="driver_rate"
              onChange={props.onChange}
              value={props.formData.driver_rate}
              class="w-1/3 mx-auto ps-1  inline-block "
              label="Rate Choferil"
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              name="employed_contribution"
              onChange={props.onChange}
              value={props.formData.employed_contribution}
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
        </div>
        <div className="xl:w-full block  w-full">
          <CustomInputs
            class="xl:w-2/3 w-1/2 mx-auto pe-1  inline-block xl:inline-flex  justify-between items-center   "
            label="Las vacaciones se acumularan razon de"
            name="vacation_hours"
            inputCss="xl:inline-block xl:w-1/3  mt-0 "
            onChange={props.onChange}
            value={props.formData.vacation_hours}
            placeholder=""
            type="number"
          />

          <CustomInputs
            class="xl:w-1/3 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center  "
            label="Horas X Mes X"
            inputCss="xl:inline-block xl:w-1/3  mt-0"
            name="vacation_date"
            onChange={props.onChange}
            value={props.formData.vacation_date}
            placeholder=""
            type="number"
          />

          <CustomInputs
            class="xl:w-2/3 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center   "
            label="Las enfermedades se acumularan razon de"
            placeholder=""
            inputCss="xl:inline-block xl:w-1/3  mt-0"
            onChange={props.onChange}
            value={props.formData.sicks_hours}
            name="sicks_hours"
            type="number"
          />
          <CustomInputs
            class="xl:w-1/3 w-1/2 mx-auto   ps-2 inline-block xl:inline-flex  justify-between items-center  "
            label="Horas X Mes X"
            value={props.formData.sicks_date}
            name="sicks_date"
            inputCss="xl:inline-block xl:w-1/3  mt-0"
            onChange={props.onChange}
            placeholder=""
            type="number"
          />
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
