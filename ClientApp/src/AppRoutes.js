import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Launch } from './components/smartonfhir/Launch';
import { Index } from './components/smartonfhir/Index';
import { PatientForm } from './components/smartonfhir/PatientForm';

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
      element: <PatientForm />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
