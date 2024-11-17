import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ServicesPage } from '../components/services/ServicesPage';
import { ServiceDetailPage } from '../components/services/ServiceDetailPage';

export const servicesRoutes: RouteObject[] = [
  {
    path: 'services',
    children: [
      {
        index: true,
        element: <ServicesPage />
      },
      {
        path: ':id',
        element: <ServiceDetailPage />
      }
    ]
  }
];
