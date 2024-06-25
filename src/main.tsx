import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import 'react-base-table/styles.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { signout } from './core/login/signout';
import { ErrorPage } from './error-page';
import { protectedLoader } from './routes/admin/loader';
import { loginAction } from './routes/login/action';
import { loginLoader } from './routes/login/loader';
import { LoginPage } from './routes/login/page';
import { Root } from './routes/root';
import { UsersPage } from './routes/users/UsersPage';
import { usersLoader } from './routes/users/loader';
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
        Component: UsersPage,
      },
    ],
  },
  {
    path: '/login',
    action: loginAction,
    loader: loginLoader,
    Component: LoginPage,
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
