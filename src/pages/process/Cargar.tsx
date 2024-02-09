import { useEffect } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { getTime } from "../../utils/requestOptions";
import { useParams } from "react-router-dom";

const Cargar = () => {
  const params = useParams();

  useEffect(() => {
    getTime(Number(params.id_employer))
      .then((response) => {
        // Data retrieval and processing
        console.log(response);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  }, []);
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-3xl">Cargar Tiempo</h3>

        <p className="text-white mt-4">Seleccionar período de trabajo</p>
        <CustomSelect
          class="w-2/6 mx-auto mt-4 inline-block "
          label=""
          disabled={false}
          placeholder="Nombre de la compañía"
          type="text"
        />
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-full w-full ">
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label=""
              disabled={true}
              value="Bohiques"
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label=""
              value="Samiel Barreto"
              disabled={true}
              placeholder="San Juan"
              type="text"
            />

            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Horas regulares"
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Horas de sobre tiempo (overtime)"
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Horas de almuerzo (meal time)"
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Horas de enfermedad"
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Horas de vacaciones"
              placeholder="Dirección"
              type="text"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center ">
            Cargar tiempo de empleado
          </button>
        </div>
      </div>
    </>
  );
};

export default Cargar;
