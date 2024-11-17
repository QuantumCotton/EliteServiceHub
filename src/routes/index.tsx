import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingSpinner from '../components/ui/loading-spinner';

// Lazy load route components
const Home = React.lazy(() => import('../pages/Home'));
const Services = React.lazy(() => import('../pages/Services'));
const ServiceDetails = React.lazy(() => import('../pages/ServiceDetails'));
const Contact = React.lazy(() => import('../pages/Contact'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Route configuration with Suspense
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/services',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Services />
      </Suspense>
    ),
  },
  {
    path: '/services/:type',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ServiceDetails />
      </Suspense>
    ),
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
