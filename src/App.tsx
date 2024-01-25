import { Routes, Route, BrowserRouter } from "react-router-dom";

import OutLayout from "./layouts/OutLayout";
import InLayout from "./layouts/InLayout";

import Login from "./pages/Login";
import Activation from "./pages/Activation";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Empresas from "./pages/company/Company";
import Empleados from "./pages/employee/Employee";
import AddCompany from "./pages/company/AddCompany";
import AddEmployee from "./pages/employee/AddEmployee";
import Process from "./pages/Process";
import Cargar from "./pages/process/Cargar";
import ForgotPassword from "./pages/out/ForgotPassword";
import AddCounter from "./pages/employee/AddCounter";
import Codes from "./pages/code/Codes";
import AddCode from "./pages/code/AddCodes";
import PrivateRoutes from "./services/PrivateRoutes";
import PublicRoutes from "./services/PublicRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<OutLayout />}>
            <Route index element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="recuperar" element={<ForgotPassword />} />
            <Route path="activacion" element={<Activation />} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/escritorio" element={<InLayout />}>
            <Route index path="dash" element={<Dashboard />} />

            <Route path="empresas" element={<Empresas />} />
            <Route path="empresas/agregar" element={<AddCompany />} />

            <Route path="contador" element={<AddCounter />} />

            <Route path="procesos" element={<Process />} />
            <Route path="procesos/:id/cargar" element={<Cargar />} />

            <Route path="empresas/:id/empleados" element={<Empleados />} />
            <Route
              path="empresas/:id/empleados/agregar"
              element={<AddEmployee />}
            />

            <Route path="codigos" element={<Codes />} />
            <Route path="codigos/agregar" element={<AddCode />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
