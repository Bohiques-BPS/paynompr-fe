import { useState } from "react";
import { Link } from "react-router-dom";
import { showSuccess } from "../../utils/consts";

const ValidationForm = () => {
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    setError(true);
    showSuccess("Verifique su correo");
  };

  return (
    <form>
      <div className="flex content-center align-middle items-center justify-center gap-2 ">
        <Link
          to="../registro"
          type="button"
          className="w-1/2 mt-4  bg-transparent border border-gray-500 text-[#333160]  py-4 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Volver
        </Link>

        <button
          onClick={handleSubmit}
          type="button"
          className="w-1/2 mt-4  bg-[#333160]  py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Siguiente paso
        </button>
      </div>

      {error && (
        <div className="p-4 bg-[#E43131] text-white w-6/12 mx-auto mt-4 rounded-lg text-center">
          Código invalido
        </div>
      )}
    </form>
  );
};

export default ValidationForm;
