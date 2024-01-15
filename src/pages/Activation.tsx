import React from "react";
import ValidationForm from "../components/forms/ValidationForm";

const Activation = () => {
  return (
    <div className="flex flex-col items-center justify-center  mx-auto  ">
      <div className="w-full  rounded-lg   md:mt-0 max-w-xl			 xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
          <h1 className="text-center font-bold leading-tight text-3xl   tracking-tight text-[#333160] ">
            Código de activación
          </h1>
          <ValidationForm />
        </div>
      </div>
    </div>
  );
};

export default Activation;
