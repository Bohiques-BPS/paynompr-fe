import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomInputs from "./CustomInputs";

type Props = {};

const RegisterForm = (props: Props) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/activacion");
  };
  return (
    <form className="space-y-4 md:space-y-3">
      <CustomInputs
        class="w-1/2 inline-block pe-2"
        label="Nombre"
        disabled={false}
        placeholder="Nombre"
        type="text"
      />

      <CustomInputs
        class="w-1/2 inline-block ps-2"
        label="Apellido"
        disabled={false}
        placeholder="Apellido"
        type="text"
      />

      <CustomInputs
        class="w-1/2 inline-block pe-2"
        label="Correo electrónico"
        disabled={false}
        placeholder="name@company.com"
        type="email"
      />
      <CustomInputs
        class="w-1/2 inline-block ps-2"
        label="Teléfono"
        disabled={false}
        placeholder="+54 656546456"
        type="tel"
      />

      <CustomInputs
        class="w-1/2 inline-block pe-2"
        label="Teléfono"
        disabled={false}
        placeholder="+54 656546456"
        type="tel"
      />

      <CustomInputs
        class="w-1/2 inline-block ps-2"
        label="Confirmar Contraseña"
        disabled={false}
        placeholder="*********"
        type="*********"
      />

      <button
        type="button"
        onClick={handleRegister}
        className="w-full bg-[#333160]   py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Siguiente paso
      </button>
      <div className="flex items-center justify-between">
        <p className="text-sm text-end font-light text-gray-500 ">
          ¿Eres miembro?{" "}
          <Link
            to="/"
            className="font-medium text-primary-600 hover:underline "
          >
            Ingresa
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
