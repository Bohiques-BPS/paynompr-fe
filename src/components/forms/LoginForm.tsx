import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomInputs from "./CustomInputs";
import { showSuccess } from "../../utils/consts";

type Props = {};

const LoginForm = (props: Props) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    showSuccess("Bienvenido José Ortiz.");
    navigate("/escritorio/dash");
  };
  return (
    <form className="space-y-4 md:space-y-3" action="#">
      <CustomInputs
        label="Correo electrónico"
        disabled={false}
        placeholder="name@company.com"
        type="email"
      />
      <CustomInputs
        label="Contraseña"
        disabled={false}
        placeholder="********"
        type="password"
      />

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
        onClick={handleLogin}
        type="button"
        className="w-full bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Entrar
      </button>

      <div className="flex items-center justify-between">
        <Link
          to="/recuperar"
          className="text-sm font-medium text-primary-600 hover:underline "
        >
          ¿Olvidaste tu contraseña?
        </Link>
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
