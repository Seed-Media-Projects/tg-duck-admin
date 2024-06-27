import { signout } from '@core/login/signout';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
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
    async lazy() {
      const { Root } = await import('@routes/root');
      const { protectedLoader } = await import('@routes/loader');
      return {
        loader: protectedLoader,
        Component: Root,
      };
    },
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        async lazy() {
          const { UsersPage, usersLoader } = await import('@routes/users');
          return {
            loader: usersLoader,
            Component: UsersPage,
          };
        },
      },
      {
        path: 'users/:userId',
        async lazy() {
          const { UserPage, userLoader } = await import('@routes/users/edit');
          return {
            loader: userLoader,
            Component: UserPage,
          };
        },
      },
      {
        path: 'users/:userId/edit',
        async lazy() {
          const { EditUserPage, userLoader, updateUserAction } = await import('@routes/users/edit');
          return {
            action: updateUserAction,
            loader: userLoader,
            Component: EditUserPage,
          };
        },
      },
      {
        path: 'config',
        async lazy() {
          const { ConfigPage, configLoader } = await import('@routes/config');
          return {
            loader: configLoader,
            Component: ConfigPage,
          };
        },
      },
      {
        path: 'config/create',
        async lazy() {
          const { ConfigCreatePage, createConfigAction } = await import('@routes/config/create');
          return {
            action: createConfigAction,
            Component: ConfigCreatePage,
          };
        },
      },
      {
        path: 'config/edit',
        async lazy() {
          const { configLoader } = await import('@routes/config/loader');
          const { ConfigEditPage, updateConfigAction } = await import('@routes/config/edit');
          return {
            loader: configLoader,
            action: updateConfigAction,
            Component: ConfigEditPage,
          };
        },
      },
      {
        path: 'achievements',
        async lazy() {
          const { AchievementsPage, achievementsLoader } = await import('@routes/achievements');
          return {
            loader: achievementsLoader,
            Component: AchievementsPage,
          };
        },
      },
      {
        path: 'achievements/:aId/edit',
        async lazy() {
          const { EditAchievementPage, achievementLoader, updateAchievementAiection } = await import(
            '@routes/achievements/edit'
          );
          return {
            loader: achievementLoader,
            action: updateAchievementAiection,
            Component: EditAchievementPage,
          };
        },
      },
      {
        path: 'achievements/create',
        async lazy() {
          const { achievementsLoader } = await import('@routes/achievements/loader');
          const { CreateAchievementPage, createAchievementAiection } = await import('@routes/achievements/create');
          return {
            loader: achievementsLoader,
            action: createAchievementAiection,
            Component: CreateAchievementPage,
          };
        },
      },
    ],
  },
  {
    path: '/login',
    async lazy() {
      const { LoginPage, loginAction, loginLoader } = await import('@routes/login');
      return {
        loader: loginLoader,
        action: loginAction,
        Component: LoginPage,
      };
    },
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
