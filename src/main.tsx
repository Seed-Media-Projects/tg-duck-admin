import { signout } from '@core/login/signout';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createAchievementAiection } from '@routes/achievements/create/action';
import { CreateAchievementPage } from '@routes/achievements/create/page';
import { updateAchievementAiection } from '@routes/achievements/edit/action';
import { achievementLoader } from '@routes/achievements/edit/loader';
import { EditAchievementPage } from '@routes/achievements/edit/page';
import { achievementsLoader } from '@routes/achievements/loader';
import { AchievementsPage } from '@routes/achievements/page';
import { protectedLoader } from '@routes/admin/loader';
import { ConfigCreatePage } from '@routes/config/create/ConfigCreatePage';
import { createConfigAction } from '@routes/config/create/action';
import { ConfigEditPage } from '@routes/config/edit/ConfigEditPage';
import { updateConfigAction } from '@routes/config/edit/action';
import { configLoader } from '@routes/config/loader';
import { ConfigPage } from '@routes/config/page';
import { loginAction } from '@routes/login/action';
import { loginLoader } from '@routes/login/loader';
import { LoginPage } from '@routes/login/page';
import { Root } from '@routes/root';
import { UsersPage } from '@routes/users/UsersPage';
import { EditUserPage } from '@routes/users/edit/UserEditPage';
import { UserPage } from '@routes/users/edit/UserPage';
import { updateUserAction } from '@routes/users/edit/action';
import { userLoader } from '@routes/users/edit/loader';
import { usersLoader } from '@routes/users/loader';
import { ErrorBoundary } from '@ui/error-bound';
import { theme } from '@ui/theme';
import { StrictMode } from 'react';
import 'react-base-table/styles.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { ErrorPage } from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: protectedLoader,
    children: [
      {
        path: 'users',
        loader: usersLoader,
        element: <UsersPage />,
      },
      {
        path: 'users/:userId',
        loader: userLoader,
        element: <UserPage />,
      },
      {
        path: 'users/:userId/edit',
        loader: userLoader,
        action: updateUserAction,
        element: <EditUserPage />,
      },
      {
        path: 'config',
        loader: configLoader,
        element: <ConfigPage />,
      },
      {
        path: 'config/create',
        action: createConfigAction,
        element: <ConfigCreatePage />,
      },
      {
        path: 'config/edit',
        loader: configLoader,
        action: updateConfigAction,
        element: <ConfigEditPage />,
      },
      {
        path: 'achievements',
        loader: achievementsLoader,
        element: <AchievementsPage />,
      },
      {
        path: 'achievements/:aId/edit',
        loader: achievementLoader,
        action: updateAchievementAiection,
        element: <EditAchievementPage />,
      },
      {
        path: 'achievements/create',
        loader: achievementsLoader,
        action: createAchievementAiection,
        element: <CreateAchievementPage />,
      },
    ],
  },
  {
    path: '/login',
    action: loginAction,
    loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: '/logout',
    async action() {
      signout();
      return redirect('/login');
    },
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
