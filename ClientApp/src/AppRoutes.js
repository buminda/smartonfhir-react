import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Launch } from './components/smartonfhir/Launch';
import { Index } from './components/smartonfhir/Index';
import {  PatientForm } from './components/smartonfhir/PatientForm';
import { Form } from './components/smartonfhir/Form';

const FormDef = {
    status: "draft",
    title: "Demo Form",
    resourceType: "Questionnaire",
    item: [
        {
            type: "string",
            linkId: "X-001",
            text: "First Name"
        },
        {
            type: "string",
            linkId: "X-002",
            text: "Last Name"
        },
        {
            type: "date",
            linkId: "X-003",
            text: "DOB"
        },
        {
            type: "integer",
            linkId: "X-004",
            text: "Age"
        },
        {
            type: "decimal",
            linkId: "X-005",
            text: "Height"
        },
        {
            type: "group",
            linkId: "X-006",
            text: "Height",
            item: [
                {
                    type: "string",
                    linkId: "X-006-1",
                    text: "First Name"
                },
                {
                    type: "string",
                    linkId: "X-006-2",
                    text: "Last Name"
                },
                {
                    type: "group",
                    linkId: "X-006-3",
                    text: "Last Name",
                    item: [
                        {
                            type: "string",
                            linkId: "X-006-3-1",
                            text: "First Name"
                        },
                        {
                            type: "string",
                            linkId: "X-006-3-2",
                            text: "Last Name"
                        }
                    ]
                }
            ]
        },
        {
            type: "date",
            linkId: "X-007",
            text: "DOB"
        },
        {
            type: "integer",
            linkId: "X-008",
            text: "Age"
        },
        {
            type: "decimal",
            linkId: "X-009",
            text: "Height"
        },
        {
            type: "choice",
            linkId: "X-010",
            text: "Chioce",
            answerOption: [
                {
                    valueCoding: {
                        system: "http://hl7.org/fhir/administrative-gender",
                        code: "female",
                        display: "Female"
                    },
                    initialSelected: true
                },
                {
                    valueCoding: {
                        system: "http://hl7.org/fhir/administrative-gender",
                        code: "male",
                        display: "Male"
                    }
                },
                {
                    valueCoding: {
                        system: "http://hl7.org/fhir/administrative-gender",
                        code: "other",
                        display: "Other"
                    }
                },
                {
                    valueCoding: {
                        system: "http://hl7.org/fhir/administrative-gender",
                        code: "unknown",
                        display: "Unknown"
                    }
                }
            ]
        }
    ]
};

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
