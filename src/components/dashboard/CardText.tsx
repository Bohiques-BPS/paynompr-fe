import { COMPANY } from "../../models/company";
import companie from "../../assets/imgs/Out/icon.png";

type Props = {
  items: COMPANY[];
};

const CardText = (props: Props) => {
  return (
    <div className="bg-white rounded-lg shadow  p-4 ">
      <p className="text-xl text-[#333160] font-medium">
        Compañías visitadas desde la ultima sesión
      </p>
      {props.items.slice(0, 3).map((item, i) => (
        <div
          key={i}
          className="mt-4 flex  flex-row content-center items-center"
        >
          <img
            className="rounded-lg w-24 h-24 border border-gray-300 p-4"
            src={companie}
            alt=""
          />
          <p className="ms-4">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CardText;
