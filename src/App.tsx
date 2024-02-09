import { Routes, Route, BrowserRouter } from "react-router-dom";

import OutLayout from "./layouts/OutLayout";
import InLayout from "./layouts/InLayout";

import Login from "./pages/out/Login";

import Register from "./pages/out/Register";
import Dashboard from "./pages/Dashboard";
import Empresas from "./pages/company/Company";
import Empleados from "./pages/employee/Employee";
import AddCompany from "./pages/company/AddCompany";
import AddEmployee from "./pages/employee/AddEmployee";
import Process from "./pages/Process";
import Cargar from "./pages/process/Cargar";
import ForgotPassword from "./pages/out/ForgotPassword";
import AddCounter from "./pages/accountants/AddAccountants";
import Codes from "./pages/code/Codes";
import AddCode from "./pages/code/AddCodes";
import PrivateRoutes from "./services/PrivateRoutes";
import PublicRoutes from "./services/PublicRoutes";
import Accountants from "./pages/accountants/Accountants";
import EditCodes from "./pages/code/EditCodes";
import EditAccountants from "./pages/accountants/EditAccountants";
import EditCompany from "./pages/company/EditCompany";
import EditEmployee from "./pages/employee/EditEmployee";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<OutLayout />}>
            <Route index element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="recuperar" element={<ForgotPassword />} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/escritorio" element={<InLayout />}>
            <Route index path="dash" element={<Dashboard />} />

            <Route path="empresas" element={<Empresas />} />
            <Route path="empresas/agregar" element={<AddCompany />} />
            <Route path="empresas/editar/:id" element={<EditCompany />} />

            <Route path="contadores" element={<Accountants />} />
            <Route path="contadores/agregar" element={<AddCounter />} />
            <Route path="contadores/editar/:id" element={<EditAccountants />} />

            <Route path="procesos" element={<Process />} />
            <Route
              path="procesos/:id_company/:id_employer/cargar"
              element={<Cargar />}
            />

            <Route path="empresas/:id/empleados" element={<Empleados />} />
            <Route
              path="empresas/:id/empleados/agregar"
              element={<AddEmployee />}
            />
            <Route
              path="empresas/:id/empleados/:id_employer/editar"
              element={<EditEmployee />}
            />

            <Route path="codigos" element={<Codes />} />
            <Route path="codigos/agregar" element={<AddCode />} />
            <Route path="codigos/editar/:id" element={<EditCodes />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
