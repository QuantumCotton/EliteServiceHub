import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BusinessProvider } from './contexts/BusinessContext';
import { servicesRoutes } from './routes/services.routes';
import { Layout } from './components/layout/Layout';
import { Home } from './components/home/Home';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { TestShadcn } from './components/TestShadcn';
import { AutoDetailing } from './components/services/AutoDetailing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...servicesRoutes,
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'test-shadcn',
        element: <TestShadcn />,
      },
      {
        path: 'auto-detailing',
        element: <AutoDetailing />,
      },
    ]
  }
]);

export function App() {
  return (
    <BusinessProvider>
      <RouterProvider router={router} />
    </BusinessProvider>
  );
}

export default App;
