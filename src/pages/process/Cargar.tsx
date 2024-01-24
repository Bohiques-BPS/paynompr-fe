import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";

const Cargar = () => {
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
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="EHoras de sobre tiempo (overtime)"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Horas de almuerzo (meal time)"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Horas de enfermedad"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Horas de vacaciones"
              disabled={false}
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
