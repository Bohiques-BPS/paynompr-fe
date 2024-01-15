import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Props = {};

const RegisterForm = (props: Props) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/activacion");
  };
  return (
    <form className="space-y-4 md:space-y-3">
      <label className="block  text-sm font-medium text-gray-700 w-1/2 inline-block pe-2  ">
        Nombre
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  p-2.5 "
          placeholder="Nombre"
        />
      </label>

      <label className="block  text-sm font-medium text-gray-700 w-1/2 inline-block  ps-2">
        Apellido
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Apellido"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        />
      </label>
      <label className="block  text-sm font-medium text-gray-700 w-1/2 inline-block pe-2  ">
        Correo
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  p-2.5 "
          placeholder="name@company.com"
        />
      </label>

      <label className="block  text-sm font-medium text-gray-700 w-1/2 inline-block  ps-2">
        Teléfono
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="+54 656546456"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        />
      </label>
      <label className="block  text-sm font-medium text-gray-700 w-1/2 inline-block pe-2  ">
        Contraseña
        <input
          type="password"
          name="password"
          id="password"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  p-2.5 "
          placeholder="*********"
        />
      </label>

      <label className="block  text-sm font-medium text-gray-700 w-1/2 inline-block  ps-2">
        Confirmar Contraseña
        <input
          type="password"
          name="repeatpassword"
          id="repeatpassword"
          placeholder="*********"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        />
      </label>

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
