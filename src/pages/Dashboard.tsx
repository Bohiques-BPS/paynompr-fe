import QuickActions from "../components/dashboard/QuickActions";
import companie from "../assets/imgs/Out/icon.png";
import CardText from "../components/dashboard/CardText";
import { useEffect } from "react";
import { getCurrentUser } from "../utils/requestOptions";

const item = [
  { img: companie, text: "Bohiques Business and Personal" },
  { img: companie, text: "Ubiquo Tecnologías" },
  { img: companie, text: "Agregar Empresa" },
];

const Dashboard = () => {
  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        // Data retrieval and processing
        console.log(response);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  }, []);
  //getTodo();
  return (
    <div className="flex md:flex-row flex-col    gap-4  ">
      <div className="md:w-1/2  w-full flex flex-col   gap-2  ">
        <div className="w-full bg-white rounded-lg shadow p-4		  ">
          <h3 className="text-2xl text-[#333160]">
            ¡Hola de nuevo, <strong> José Ortiz!</strong>
          </h3>
        </div>
        <div className="w-full 		 ">
          <QuickActions />
        </div>
      </div>
      <div className="md:w-1/2 w-full   ">
        <CardText items={item} />
      </div>
    </div>
  );
};

export default Dashboard;
