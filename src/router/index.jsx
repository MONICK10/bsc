import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';

// Lazy load all pages for better performance
const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const AboutPage = lazy(() => import('../pages/AboutPage.jsx'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage.jsx'));
const MatchesPage = lazy(() => import('../pages/MatchesPage.jsx'));
const UpcomingMatchesPage = lazy(() => import('../pages/UpcomingMatchesPage.jsx'));
const LivePage = lazy(() => import('../pages/LivePage.jsx'));
const AdminLoginPage = lazy(() => import('../pages/AdminLoginPage.jsx'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard.jsx'));
const ManageMatches = lazy(() => import('../pages/admin/ManageMatches.jsx'));
const ManageAchievements = lazy(() => import('../pages/admin/ManageAchievements.jsx'));
const LiveControl = lazy(() => import('../pages/admin/LiveControl.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));

// Protected route component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

// Suspense wrapper for lazy loaded pages
const LazyPageWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSkeleton />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LazyPageWrapper><HomePage /></LazyPageWrapper>,
      },
      {
        path: 'about',
        element: <LazyPageWrapper><AboutPage /></LazyPageWrapper>,
      },
      {
        path: 'achievements',
        element: <LazyPageWrapper><AchievementsPage /></LazyPageWrapper>,
      },
      {
        path: 'matches',
        element: <LazyPageWrapper><MatchesPage /></LazyPageWrapper>,
      },
      {
        path: 'upcoming-matches',
        element: <LazyPageWrapper><UpcomingMatchesPage /></LazyPageWrapper>,
      },
      {
        path: 'live',
        element: <LazyPageWrapper><LivePage /></LazyPageWrapper>,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <LazyPageWrapper><AdminLoginPage /></LazyPageWrapper>,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <LazyPageWrapper><AdminDashboard /></LazyPageWrapper>,
      },
      {
        path: 'matches',
        element: <LazyPageWrapper><ManageMatches /></LazyPageWrapper>,
      },
      {
        path: 'achievements',
        element: <LazyPageWrapper><ManageAchievements /></LazyPageWrapper>,
      },
      {
        path: 'live',
        element: <LazyPageWrapper><LiveControl /></LazyPageWrapper>,
      },
    ],
  },
  {
    path: '*',
    element: <LazyPageWrapper><NotFoundPage /></LazyPageWrapper>,
  },
]);
