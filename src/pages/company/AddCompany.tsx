import { useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { setCompanies } from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

const AddCompany = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Empresa S.A.",
    commercial_register: "45678901",
    jurisdiction: "España",
    accountant_id: 1,
    email: "empresa@empresa.com",
    contact: "Juan Pérez",
    contact_number: "912345678",
    website: "www.empresa.com",
    postal_address: "Calle Falsa, 123",
    zipcode_postal_address: "28001",
    country_postal_address: "España",
    state_postal_addess: "Madrid",
    physical_address: "Calle Real, 456",
    zipcode_physical_address: "28002",
    country_physical_address: "España",
    state_physical_address: "Madrid",
    phone_number: "912345679",
    fax_number: "912345670",
    industrial_code: "CNAE 6201",
    payer: "Empresa S.A.",
    desem: "0.5",
    disabled_percent: "0",
    driver: "Pedro García",
    polize_number: "12345678",
    driver_code: "A1",
    driver_rate: "0.8",
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [e.currentTarget.name]: value,
    });
  };
  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [e.currentTarget.name]: value,
    });
  };

  const handleCreate = () => {
    setCompanies(formData)
      .then((response) => {
        // Data retrieval and processing
        console.log(response);
        showSuccess("Creado exitosamente.");
        navigate("../empresas");
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-3xl">Crear Compañía</h3>

        <p className="text-white mt-4">
          Ingresa los datos de la compañía que deseas crear. ¡Empecemos por el
          nombre y su calificación!
        </p>
        <CustomInputs
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          class="w-4/5 mx-auto mt-4 inline-block "
          label=""
          disabled={false}
          placeholder="* Nombre de la compañía"
          type="text"
        />
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-1/2  w-full">
            <CustomInputs
              name="postal_address"
              onChange={handleInputChange}
              value={formData.postal_address}
              class="w-full mx-auto  inline-block "
              label="* Dirección postal"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomSelect
              name="country_postal_address"
              onChange={handleSelectChange}
              value={formData.country_postal_address}
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="state_postal_addess"
              onChange={handleInputChange}
              value={formData.state_postal_addess}
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              name="zipcode_postal_address"
              onChange={handleInputChange}
              value={formData.zipcode_postal_address}
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              name="physical_address"
              onChange={handleInputChange}
              value={formData.physical_address}
              class="w-full mx-auto  inline-block "
              label="Dirección física"
              disabled={false}
              placeholder="404 Calle Ensada"
              type="text"
            />
            <CustomSelect
              name="country_physical_address"
              onChange={handleSelectChange}
              value={formData.country_physical_address}
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="state_physical_address"
              onChange={handleInputChange}
              value={formData.state_physical_address}
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              name="zipcode_physical_address"
              onChange={handleInputChange}
              value={formData.zipcode_physical_address}
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              name="phone_number"
              onChange={handleInputChange}
              value={formData.phone_number}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Numero de teléfono"
              disabled={false}
              placeholder="+00000000"
              type="text"
            />
            <CustomInputs
              name="fax_number"
              onChange={handleInputChange}
              value={formData.fax_number}
              class="w-1/2 mx-auto  ps-1 inline-block "
              label="Fax"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              name="desem"
              onChange={handleInputChange}
              value={formData.desem}
              class="w-1/2 mx-auto pe-1 inline-block "
              label="# Desem"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="* Número patronal"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              name="driver"
              onChange={handleInputChange}
              value={formData.driver}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Chófer"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              name="commercial_register"
              onChange={handleInputChange}
              value={formData.commercial_register}
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Registro Comerciante"
              disabled={false}
              placeholder="00820"
              type="text"
            />
          </div>
          <div className="xl:w-1/2  w-full">
            <CustomInputs
              name="commercial_register"
              onChange={handleInputChange}
              value={formData.commercial_register}
              class="w-full mx-auto  inline-block "
              label="Persona de Contacto"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="website"
              onChange={handleInputChange}
              value={formData.website}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Sitio web"
              disabled={false}
              placeholder="www.web.com"
              type="text"
            />
            <CustomInputs
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Correo electrónico"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto pe-1  inline-block "
              label="COML (DD/MM/AAAA)"
              disabled={false}
              placeholder="San Juan"
              type="date"
            />

            <CustomSelect
              name="jurisdiction"
              onChange={handleSelectChange}
              value={formData.jurisdiction}
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Jurisdicción"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              name="driver_code"
              onChange={handleInputChange}
              value={formData.driver_code}
              label="Choferil"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="driver_code"
              onChange={handleInputChange}
              value={formData.driver_rate}
              class="w-1/3 mx-auto ps-1  inline-block "
              label="Rate Choferil"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomSelect
              name="payer"
              onChange={handleSelectChange}
              value={formData.payer}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Pagador"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="disabled_percent"
              onChange={handleInputChange}
              value={formData.disabled_percent}
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Porcentaje de incapacitados"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              name="industrial_code"
              onChange={handleInputChange}
              value={formData.industrial_code}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Código Industrial"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="polize_number"
              onChange={handleInputChange}
              value={formData.polize_number}
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Numero de póliza de fondo"
              disabled={false}
              placeholder="00820"
              type="text"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleCreate}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCompany;
