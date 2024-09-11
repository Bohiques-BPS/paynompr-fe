import { useNavigate, useParams } from "react-router-dom";

import CustomSelect from "../../components/forms/CustomSelect";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "../../utils/functions";
import { editEmployers, getEmployer } from "../../utils/requestOptions";
import { EMPLOYER_DATA } from "../../models/employeer";
import EmployeerForm from "../../components/forms/EmployeerForm";
import { TYPE_EMPLOYER } from "../../utils/consts";
import ModalAlert from "../../components/dashboard/ModalAlert";

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loanding, setLoanding] = useState(false);
  const [formData, setFormData] = useState(EMPLOYER_DATA);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.FormEvent<any>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: getValue(e),
    });
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const getValue = (e: React.FormEvent<any>) => {
    if (e.currentTarget.type === "number")
      return parseInt(e.currentTarget.value);
    if (e.currentTarget.type === "checkbox") return e.currentTarget.checked;

    return e.currentTarget.value;
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
    setLoanding(true);
    editEmployers(formData, Number(params.id_employer))
      .then(() => {
        setLoanding(false);
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
        <h3 className="text-2xl">Editar Empleado</h3>

        <p className="text-white mt-4">Tipo de empleado</p>
        <CustomSelect
          class="w-2/6 mx-auto mt-4 inline-block "
          label=""
          options={TYPE_EMPLOYER}
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
          <EmployeerForm
            setFormData={setFormData}
            formData={formData}
            onChange={handleInputChange}
          />
        </div>
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
        description={`¿Esta seguro que desea editar este usuario ${formData.first_name} ${formData.last_name}?`}
      />
    </>
  );
};

export default EditEmployee;
