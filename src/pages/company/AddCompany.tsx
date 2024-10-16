import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import {
  getAccountants,
  getCompanies,
  setCompanies,
} from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

import { COMPANY_DATA } from "../../models/company";
import CompanyForm from "../../components/forms/CompanyForm";
import ModalAlert from "../../components/dashboard/ModalAlert";

const AddCompany = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loanding, setLoanding] = useState(false);
  const [accountants, setAccountants] = useState([]);

  const [formData, setFormData] = useState(COMPANY_DATA);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [e.currentTarget.name]: value,
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoanding(true);
        const companiesResponse = await getCompanies(); // Assuming getCompanies returns a Promise
        const companies = companiesResponse.data;
        const companyCount = companies.length + 1;

        // Calcular el primer número de control basado en la cantidad de empresas
        const baseNumber =
          new Date().getFullYear().toString().padStart(4, "0") + "00001";
        const firstControlNumber =
          parseInt(baseNumber) + (companyCount - 1) * 50;
        const lastControlNumber = firstControlNumber + 50;

        setFormData((prevFormData) => ({
          ...prevFormData,
          w2_first_control: firstControlNumber.toString().padStart(9, "0"),
          w2_last_control: lastControlNumber.toString().padStart(9, "0"),
          sp_first_control: firstControlNumber.toString().padStart(9, "0"),
          sp_last_control: lastControlNumber.toString().padStart(9, "0"),
        }));
      } catch (error) {
        console.error("Error fetching companies:", error); // Log the error for debugging
      } finally {
        setLoanding(false);
      }
    };

    getData(); // Call getData on component mount

    // Cleanup function (optional, prevents unnecessary re-fetches on unmount)
    return () => {
      // Add code to cancel any ongoing requests or subscriptions here (if applicable)
    };
  }, []);

  useEffect(() => {
    getAccountants()
      .then((data) => {
        setAccountants(data.data.result);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  }, []);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCreate = () => {
    setLoanding(true);
    setCompanies(formData)
      .then(() => {
        setLoanding(false);
        showSuccess("Creado exitosamente.");
        navigate("../empresas");
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
        showError(
          "Ha ocurrido un error al procesar tus datos. Por favor, verifica la información ingresada y vuelve a intentarlo."
        );
        setLoanding(false);
      });
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Crear Compañía</h3>

        <p className="text-white mt-4">
          Ingresa los datos de la compañía que deseas crear. ¡Empecemos por el
          nombre y su calificación!
        </p>
        <div className="w-1/5 mx-auto mt-4  inline-block "></div>
        <CustomInputs
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          class="w-1/4 mx-auto mt-4 inline-block "
          label=""
          placeholder="* Nombre de la compañía"
          type="text"
        />
        <select
          name="accountant_id"
          onChange={handleInputChange}
          value={formData.accountant_id}
          className={`w-1/4 bg-gray-50 border ms-1 inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em]`}
        >
          <option value={-1}>Seleccione un/a Contador/a</option>
          {accountants
            .filter((item: any) => !item.is_deleted) // Filter out deleted accountants
            .map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name + " " + item.first_last_name}
              </option>
            ))}
        </select>
        <div className="w-1/4 mx-auto mt-4 inline-block "></div>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <CompanyForm
          setFormData={setFormData}
          formData={formData}
          onChange={handleInputChange}
        />

        <div className="w-full text-center">
          <button
            onClick={handleModal}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen}
        show={loanding}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Editar Usuario`}
        description={`¿Esta seguro que desea crear esta empresa ${formData.name}?`}
      />
    </>
  );
};

export default AddCompany;
