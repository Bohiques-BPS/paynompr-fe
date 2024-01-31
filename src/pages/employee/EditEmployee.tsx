import { useNavigate, useParams } from "react-router-dom";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "../../utils/functions";
import { editEmployers, getEmployer } from "../../utils/requestOptions";

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    last_name: "Rodríguez",
    mother_last_name: "Santos",
    first_name: "Luis",
    middle_name: "Enrique",
    employee_type: "1",
    social_security_number: "123-45-6789",
    marital_status: "1",
    address: "Calle San Juan",
    address_state: "San Juan",
    address_country: "2",
    address_number: "25",
    phone_number: "787-555-1234",
    smartphone_number: "787-555-4321",
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

  useEffect(() => {
    getEmployer(Number(params.id), Number(params.id_employer))
      .then((response) => {
        setFormData(response.data.result);

        // Data retrieval and processing
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  }, []);

  const handleCreate = () => {
    editEmployers(formData, Number(params.id_employer))
      .then(() => {
        showSuccess("Editado exitosamente.");
        navigate(-1);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-3xl">Editar Empleado</h3>

        <p className="text-white mt-4">Tipo de empleado</p>
        <CustomSelect
          class="w-2/6 mx-auto mt-4 inline-block "
          label=""
          name="employee_type"
          onChange={handleSelectChange}
          value={formData.employee_type}
          disabled={false}
          placeholder="Nombre de la compañía"
          type="text"
        />
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-1/2 w-full ">
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Apellido paterno"
              disabled={false}
              name="last_name"
              onChange={handleInputChange}
              value={formData.last_name}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Apellido materno"
              disabled={false}
              name="mother_last_name"
              onChange={handleInputChange}
              value={formData.mother_last_name}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Nombre"
              name="first_name"
              onChange={handleInputChange}
              value={formData.first_name}
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Inicial de segundo nombre"
              disabled={false}
              name="middle_name"
              onChange={handleInputChange}
              value={formData.middle_name}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto pe-1  inline-block "
              label="Dirección"
              disabled={false}
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              placeholder=""
              type="text"
            />
            <CustomSelect
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              name="address_country"
              onChange={handleSelectChange}
              value={formData.address_country}
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              name="address_state"
              onChange={handleInputChange}
              value={formData.address_state}
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              name="address_number"
              onChange={handleInputChange}
              value={formData.address_number}
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Numero de teléfono fijo"
              disabled={false}
              name="phone_number"
              onChange={handleInputChange}
              value={formData.phone_number}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Numero de teléfono celular"
              disabled={false}
              name="smartphone_number"
              onChange={handleInputChange}
              value={formData.smartphone_number}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Num. de Seguro social"
              disabled={false}
              name="social_security_number"
              onChange={handleInputChange}
              value={formData.social_security_number}
              placeholder=""
              type="text"
            />
            <CustomSelect
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Estatus Civil"
              name="marital_status"
              onChange={handleSelectChange}
              value={formData.marital_status}
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto   inline-block "
              label="Tipo"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Marbete"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de pago MARB"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto   inline-block "
              label="Tablilla"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomSelect
              inputCss="xl:inline-block xl:w-1/2 mt-0"
              class="xl:w-1/2 w-1/2 mx-auto pe-1  inline-block xl:inline-flex  justify-between items-center"
              label="Exec. personal"
              disabled={false}
              placeholder=""
              type="number"
            />
            <CustomSelect
              inputCss="xl:inline-block xl:w-1/2 mt-0"
              class="xl:w-1/2 w-1/2 mx-auto ps-1  inline-block xl:inline-flex  justify-between items-center"
              label="Período de norma"
              disabled={false}
              placeholder=""
              type="number"
            />
          </div>
          <div className="xl:w-1/2 w-full">
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Licencia"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Categoría CFSE"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomSelect
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Género"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de nacimiento"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de ingreso"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de egreso"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
              label="Choferil"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
              label="Hora regular"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
              label="Sobretiempo"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/2  mx-auto pe-1  inline-block "
              label="Hora de comida"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/2 mx-auto pe-1  inline-block "
              label="% de pago"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  "
              class="xl:w-2/5 w-1/2 mx-auto pe-1  inline-block xl:inline-flex justify-between items-center  "
              label="El empleado tiene"
              disabled={false}
              placeholder=""
              type="number"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-3/5 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center "
              label="Horas vacaciones acumuladas"
              disabled={false}
              placeholder="San Juan"
              type="date"
            />

            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  mt-0"
              class="xl:w-2/5 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center "
              label="El empleado tiene"
              disabled={false}
              placeholder=""
              type="number"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-3/5 w-1/2 mx-auto   ps-2 inline-block xl:inline-flex  justify-between items-center "
              label="Horas vacaciones acumuladas"
              disabled={false}
              placeholder=""
              type="date"
            />

            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  mt-0"
              class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center "
              label="Numero de dependientes"
              disabled={false}
              placeholder=""
              type="number"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-1/2 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center"
              label="Custodia compartida"
              disabled={false}
              placeholder=""
              type="number"
            />

            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  mt-0"
              class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex   justify-between items-center "
              label="Numero de Concesiones"
              disabled={false}
              placeholder=""
              type="number"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-1/2 w-1/2 mx-auto  ps-2 inline-block xl:inline-flex  justify-between items-center"
              label="Veterano"
              disabled={false}
              placeholder="San Juan"
              type="number"
            />

            <CustomSelect
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Tipo de nómina"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomSelect
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Tipo de horario"
              disabled={false}
              placeholder="San Juan"
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

export default EditEmployee;
