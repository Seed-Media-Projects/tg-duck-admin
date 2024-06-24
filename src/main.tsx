import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { signout } from './core/login/signout';
import { ErrorPage } from './error-page';
import { protectedLoader } from './routes/ducky-admin/loader';
import { loginAction } from './routes/login/action';
import { loginLoader } from './routes/login/loader';
import { LoginPage } from './routes/login/page';
import { Root } from './routes/root';
import { theme } from './ui/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: 'ducky/admin',
        loader: protectedLoader,
      },
    ],
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
