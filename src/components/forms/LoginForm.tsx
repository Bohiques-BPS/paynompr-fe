import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const LoginForm = (props: Props) => {
  return (
    <form className="space-y-4 md:space-y-3" action="#">
      <label className="block mb-2 text-sm font-medium text-gray-700 ">
        Correo electrónico
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="name@company.com"
        />
      </label>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Contraseña
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        />
      </label>

      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="text-gray-500 ">Mantener sesión iniciada</label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Entrar
      </button>
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline "
        >
          ¿Olvidaste tu contraseña?
        </a>
        <p className="text-sm text-end font-light text-gray-500 ">
          ¿No eres miembro todavía{" "}
          <Link
            to="/registro"
            className="font-medium text-primary-600 hover:underline "
          >
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
