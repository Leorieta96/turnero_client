import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import XrayView from './views/x-ray/XrayView';
import MisTurnos from './views/misTurnos';
import Instructions from './views/instructions';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      /*       { path: 'triage', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'nursing', element: <NursingView /> },
      { path: 'nutrition', element: <NutritionView /> },
      { path: 'internment', element: <CustomerListView /> },
      { path: 'kinesiology', element: <KinesiologyView /> },
      { path: 'statitics', element: <StatiticsView /> }, */
      { path: 'instructions', element: <Instructions /> },
      { path: 'my_turns', element: <MisTurnos /> },
      { path: 'mental_health', element: <XrayView /> },
      { path: 'laboratory', element: <XrayView /> },
      { path: 'xray', element: <XrayView /> },
      { path: 'tomography', element: <XrayView /> },
      { path: 'odontology', element: <XrayView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
/*   {
    path: 'print',
    element: <PrintLayout />,
    children: [
      { path: 'epicrisis', element: <Epicrisis /> },
      { path: 'clinic_history', element: <ClinicHistory /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }, */
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/instructions" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
