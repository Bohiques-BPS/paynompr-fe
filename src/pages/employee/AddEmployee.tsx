import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";

const AddEmployee = () => {
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-3xl">Crear Empleado</h3>

        <p className="text-white mt-4">Tipo de empleado</p>
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
          <div className="xl:w-1/2 w-full ">
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Apellido paterno"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Apellido materno"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Nombre"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Inicial de segundo nombre"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto pe-1  inline-block "
              label="Dirección"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Numero de teléfono fijo"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Numero de teléfono celular"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Num. de Seguro social"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Estatus Civil"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Tipo"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Marbete"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de pago MARB"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Tablilla"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
          </div>
          <div className="xl:w-1/2 w-full">
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Licencia"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Categoría CFSE"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Género"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de nacimiento"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de ingreso"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Fecha de egreso"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
              label="Choferil"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
              label="Hora regular"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
              label="Sobretiempo"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/2  mx-auto pe-1  inline-block "
              label="Hora de comida"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="xl:w-1/5 w-1/2 mx-auto pe-1  inline-block "
              label="% de pago"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  "
              class="xl:w-2/5 w-1/2 mx-auto pe-1  inline-block xl:inline-flex justify-between items-center  "
              label="El empleado tiene"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-3/5 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center "
              label="Horas vacaciones acumuladas"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />

            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  mt-0"
              class="xl:w-2/5 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center "
              label="El empleado tiene"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-3/5 w-1/2 mx-auto   ps-2 inline-block xl:inline-flex  justify-between items-center "
              label="Horas vacaciones acumuladas"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />

            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  mt-0"
              class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center "
              label="Numero de dependientes"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-1/2 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center"
              label="Custodia compartida"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />

            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3  mt-0"
              class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex   justify-between items-center "
              label="Numero de Concesiones"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              inputCss="xl:inline-block xl:w-1/3 mt-0"
              class="xl:w-1/2 w-1/2 mx-auto  ps-2 inline-block xl:inline-flex  justify-between items-center"
              label="Veterano"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />

            <CustomSelect
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Tipo de nómina"
              disabled={false}
              placeholder="Dirección"
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
          <button className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center ">
            Guardar datos
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
