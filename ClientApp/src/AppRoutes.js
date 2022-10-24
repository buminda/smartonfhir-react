import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Launch } from './components/smartonfhir/Launch';
import { Index } from './components/smartonfhir/Index';
import {  PatientForm } from './components/smartonfhir/PatientForm';
import { Form } from './components/smartonfhir/Form';

//const FormDef = "bac0f511fe2640458740d4fa16319465";
//const FormDef = "59bb332b56a34d0db4b33e4a332f42f5";
const FormDef = "d4be91cbd0f84c7cac1d3d7a13415593";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  {
      path: '/index',
      element: <Index />
  },
  {
      path: '/launch',
      element: <Launch />
  },
  {
      path: '/patient',
      element: <PatientForm value={FormDef} />
  },
  {
      path: '/form',
      element: <Form value={FormDef} />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
