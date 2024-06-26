import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import 'react-base-table/styles.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { signout } from './core/login/signout';
import { ErrorPage } from './error-page';
import { achievementsLoader } from './routes/achievements/loader';
import { AchievementsPage } from './routes/achievements/page';
import { protectedLoader } from './routes/admin/loader';
import { createConfigAction } from './routes/config/create/action';
import { ConfigCreatePage } from './routes/config/create/ConfigCreatePage';
import { updateConfigAction } from './routes/config/edit/action';
import { ConfigEditPage } from './routes/config/edit/ConfigEditPage';
import { configLoader } from './routes/config/loader';
import { ConfigPage } from './routes/config/page';
import { loginAction } from './routes/login/action';
import { loginLoader } from './routes/login/loader';
import { LoginPage } from './routes/login/page';
import { Root } from './routes/root';
import { updateUserAction } from './routes/users/edit/action';
import { userLoader } from './routes/users/edit/loader';
import { EditUserPage } from './routes/users/edit/UserEditPage';
import { UserPage } from './routes/users/edit/UserPage';
import { usersLoader } from './routes/users/loader';
import { UsersPage } from './routes/users/UsersPage';
import { theme } from './ui/theme';

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

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  );
}
