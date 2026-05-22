import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

// Pages
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import AchievementsPage from '../pages/AchievementsPage.jsx';
import MatchesPage from '../pages/MatchesPage.jsx';
import LivePage from '../pages/LivePage.jsx';
import AdminLoginPage from '../pages/AdminLoginPage.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import ManageMatches from '../pages/admin/ManageMatches.jsx';
import ManageAchievements from '../pages/admin/ManageAchievements.jsx';
import LiveControl from '../pages/admin/LiveControl.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

// Protected route component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'achievements',
        element: <AchievementsPage />,
      },
      {
        path: 'matches',
        element: <MatchesPage />,
      },
      {
        path: 'live',
        element: <LivePage />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'matches',
        element: <ManageMatches />,
      },
      {
        path: 'achievements',
        element: <ManageAchievements />,
      },
      {
        path: 'live',
        element: <LiveControl />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
