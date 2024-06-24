import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import { useUnit } from 'effector-react';
import { Outlet, useFetcher } from 'react-router-dom';
import { $token } from '../core/login/store';
export const Root = () => {
  const hasToken = !!useUnit($token);
  const fetcher = useFetcher();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            {hasToken && (
              <fetcher.Form method="post" action="/logout" style={{ marginLeft: 'auto' }}>
                <Button type="submit" variant="contained" color="secondary">
                  Logout
                </Button>
              </fetcher.Form>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};
