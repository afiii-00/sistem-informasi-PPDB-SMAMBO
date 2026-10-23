import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { ApplicantLayout } from '../components/layout/ApplicantLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { NotFound } from '../components/layout/NotFound';

// Public Pages
import { LandingPage } from '../features/public-ppdb/LandingPage';
import { InfoPage } from '../features/public-ppdb/InfoPage';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';

// Applicant Pages
import { ApplicantDashboard } from '../features/applicant/ApplicantDashboard';
import { ApplicantRegistration } from '../features/applicant/ApplicantRegistration';
import { ApplicantDocuments } from '../features/applicant/ApplicantDocuments';
import { ApplicantStatus } from '../features/applicant/ApplicantStatus';
import { ApplicantAnnouncements } from '../features/applicant/ApplicantAnnouncements';

// Admin Pages
import { AdminDashboard } from '../features/admin-dashboard/AdminDashboard';
import { AdminApplicants } from '../features/applicants/AdminApplicants';
import { AdminVerification } from '../features/verification/AdminVerification';
import { AdminResults } from '../features/results/AdminResults';
import { AdminReports } from '../features/reports/AdminReports';
import { AdminWhatsApp } from '../features/whatsapp/AdminWhatsApp';
import { AdminSettings } from '../features/settings/AdminSettings';

export const router = createBrowserRouter([
  // Public area
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'informasi', element: <InfoPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },

  // Applicant Portal (Protected: role = applicant)
  {
    path: '/applicant',
    element: (
      <ProtectedRoute allowedRoles={['applicant']}>
        <ApplicantLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/applicant/dashboard" replace /> },
      { path: 'dashboard', element: <ApplicantDashboard /> },
      { path: 'registration', element: <ApplicantRegistration /> },
      { path: 'documents', element: <ApplicantDocuments /> },
      { path: 'status', element: <ApplicantStatus /> },
      { path: 'announcements', element: <ApplicantAnnouncements /> },
    ],
  },

  // Admin Portal (Protected: role = admin)
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'applicants', element: <AdminApplicants /> },
      { path: 'verification', element: <AdminVerification /> },
      { path: 'results', element: <AdminResults /> },
      { path: 'reports', element: <AdminReports /> },
      { path: 'whatsapp', element: <AdminWhatsApp /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },

  // 404 Fallback
  {
    path: '*',
    element: <NotFound />,
  },
]);
