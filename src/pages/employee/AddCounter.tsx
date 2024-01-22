import React from "react";
import CustomSelect from "../../components/forms/CustomSelect";
import CustomInputs from "../../components/forms/CustomInputs";

type Props = {};

const AddCounter = (props: Props) => {
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-3xl">Crear Contador</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-full w-full ">
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Nombre"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto ps-1 pe-1  inline-block "
              label="Inicial segundo nombre"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto ps-1 pe-1 inline-block "
              label="Apellido paterno"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto ps-1 pe-1 inline-block "
              label="Apellido materno"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Compañía"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Numero de seguro patronal"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Numero telefónico"
              disabled={false}
              placeholder="Dirección"
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
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              disabled={false}
              placeholder="San Juan"
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
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Correo electrónico"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Identidad de usuario SSA PTN"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Marbete"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Fecha de pago MARB"
              disabled={false}
              placeholder="Dirección"
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

export default AddCounter;
