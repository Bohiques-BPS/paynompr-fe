import CustomInputs from "../../components/forms/CustomInputs";

const AddCompany = () => {
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-3xl">Crear Compañía</h3>

        <p className="text-white mt-4">
          Ingresa los datos de la compañía que deseas crear. ¡Empecemos por el
          nombre y su calificación!
        </p>
        <CustomInputs
          class="w-4/5 mx-auto mt-4 inline-block "
          label=""
          disabled={false}
          placeholder="Nombre de la compañía"
          type="text"
        />
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-1/2  w-full">
            <CustomInputs
              class="w-full mx-auto  inline-block "
              label="Dirección postal"
              disabled={false}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto  inline-block "
              label="Dirección física"
              disabled={false}
              placeholder="404 Calle Ensada"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Numero de teléfono"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto  ps-1 inline-block "
              label="Fax"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1 inline-block "
              label="# Desem"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Número patronal"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Chófer"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Registro Comerciante"
              disabled={false}
              placeholder="00820"
              type="text"
            />
          </div>
          <div className="xl:w-1/2  w-full">
            <CustomInputs
              class="w-full mx-auto  inline-block "
              label="Persona de Contacto"
              disabled={false}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Sitio web"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Correo electrónico"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="COML (DD/MM/AAAA)"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label=""
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Jurisdicción"
              disabled={false}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label="Choferil"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label="Rate Choferil"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Pagador"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Porcentaje de incapacitados"
              disabled={false}
              placeholder="00820"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Código Industrial"
              disabled={false}
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Numero de póliza de fondo"
              disabled={false}
              placeholder="00820"
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

export default AddCompany;
