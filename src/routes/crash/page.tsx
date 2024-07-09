import { $games, getCrashGamesListFX, startCrashGamesFX, stopCrashGamesFX } from '@core/crash';
import { useInterval } from '@core/utils/userInterval';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Card, CardHeader, CircularProgress, Grid, Typography } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { combine } from 'effector';
import { useUnit } from 'effector-react';
import { useCallback } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { tableCrashGamesConfig } from './TableConfig';
import { crashGamesLoader } from './loader';

const loadingCombine = combine([startCrashGamesFX.pending, stopCrashGamesFX.pending], items => items.some(Boolean));

const CrashGamesPage = () => {
  const navigate = useNavigate();
  const { queueStatus } = useLoaderData() as { queueStatus: boolean };
  const { offset, games } = useUnit($games);
  const isLoading = useUnit(loadingCombine);

  useInterval(() => navigate('.', { replace: true }), 15000);

  const toggleGames = useCallback(() => {
    if (queueStatus) {
      stopCrashGamesFX().then(() => {
        navigate('.', { replace: true });
      });
    } else {
      startCrashGamesFX().then(() => {
        navigate('.', { replace: true });
      });
    }
  }, [navigate, queueStatus]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Crash games queue status" />
          <Box margin={2} display="flex" alignItems="center" gap={2}>
            <Typography>Status is</Typography>
            {queueStatus ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
          </Box>
          <Box margin={2}>
            <Button variant="contained" disabled={isLoading} onClick={toggleGames}>
              {isLoading ? <CircularProgress size={24} color="primary" /> : queueStatus ? 'stop' : 'start'}
            </Button>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <BaseList
          data={games}
          config={tableCrashGamesConfig}
          listHeader={<CardHeader title="Crash games" />}
          loadMore={() => {
            if (games.length >= offset) {
              getCrashGamesListFX(offset);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export const Component = CrashGamesPage;
export const loader = crashGamesLoader;
