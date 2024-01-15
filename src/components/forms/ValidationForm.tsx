import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

type Props = {};

const ValidationForm = (props: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");

  const notify = () => toast.success("Código valido");

  const handleRegister = () => {
    if (code.toUpperCase() === "14NV8") {
      notify();
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <form>
      <input
        type="text"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        id="code"
        className="bg-gray-50 text-3xl uppercase border p-6 text-center  border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="14NV8"
      />

      <button
        onClick={handleRegister}
        type="button"
        className="w-full mt-4 bg-[#333160]  py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Siguiente paso
      </button>

      {error && (
        <div className="p-4 bg-[#E43131] text-white w-1/3 mx-auto mt-4 rounded-lg text-center">
          Código invalido
        </div>
      )}
    </form>
  );
};

export default ValidationForm;
