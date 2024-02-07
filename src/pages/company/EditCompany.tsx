import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { editCompanies, getCompanie } from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { useNavigate, useParams } from "react-router-dom";
import { COUNTRY, JURISDICTION, PAYER } from "../../utils/consts";
import { COMPANY_DATA } from "../../models/company";
import CompanyForm from "../../components/forms/CompanyForm";

const EditCompany = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState(COMPANY_DATA);

  useEffect(() => {
    getCompanie(Number(params.id))
      .then((response) => {
        setFormData(response.data.result);

        // Data retrieval and processing
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [e.currentTarget.name]: value,
    });
  };

  const handleEdit = () => {
    editCompanies(formData, Number(params.id))
      .then((response) => {
        // Data retrieval and processing
        console.log(response);
        showSuccess("Editado exitosamente.");
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
        <h3 className="text-3xl">Editar Compañía</h3>

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
          <CompanyForm
            setFormData={setFormData}
            formData={formData}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleEdit}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCompany;
