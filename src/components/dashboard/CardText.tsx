import React from "react";

interface Card {
  img: string;
  text: string;
}
type Props = {
  items: Card[];
};

const CardText = (props: Props) => {
  return (
    <div className="bg-white rounded-lg shadow  p-4 ">
      <p className="text-xl text-[#333160] font-medium">
        Compañías visitadas desde la ultima sesión
      </p>
      {props.items.map((item) => (
        <>
          <div className="mt-4 flex  flex-row content-center items-center">
            <img
              className="rounded-lg w-24 h-24 border border-gray-300 p-4"
              src={item.img}
              alt=""
            />
            <p className="ms-4">{item.text}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default CardText;
