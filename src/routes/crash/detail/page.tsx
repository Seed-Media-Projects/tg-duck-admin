import { CrashGameInfo } from '@core/crash';
import { round } from '@core/utils/round';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useLoaderData } from 'react-router-dom';
import { crashGameLoader } from './loader';

const GameDetailPage = () => {
  const { game } = useLoaderData() as { game: CrashGameInfo | null };
  if (!game) {
    return <Typography>Game not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Game info
      </Typography>

      <Typography gutterBottom>ID: {game.id}</Typography>
      <Typography gutterBottom>Result ratio: {game.resultRatio}</Typography>
      <Typography gutterBottom>Created: {dayjs(game.created).format('DD MMM YYYY HH:mm:ss')}</Typography>
      <Typography gutterBottom>Started: {dayjs(game.started).format('DD MMM YYYY HH:mm:ss')}</Typography>
      <Typography gutterBottom>Finished: {dayjs(game.finished).format('DD MMM YYYY HH:mm:ss')}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" gutterBottom>
        Game players
      </Typography>
      <Typography gutterBottom>Total: {game.players.length}</Typography>
      {game.players.map(p => (
        <Box my={2} key={p.id}>
          <Typography gutterBottom>ID: {p.id}</Typography>
          <Box margin={2} display="flex" alignItems="center" gap={2}>
            <Typography>Is winner</Typography>
            {p.winner ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
          </Box>
          <Typography gutterBottom>Bet: {p.bet}</Typography>
          <Typography gutterBottom>Ratio: {p.ratio}</Typography>
          <Typography gutterBottom>Bet result: {round(p.bet * p.ratio)}</Typography>
          <Typography gutterBottom>Joined: {dayjs(p.joined).format('DD MMM YYYY HH:mm:ss')}</Typography>
          <Typography gutterBottom>Stopped: {dayjs(p.stopped).format('DD MMM YYYY HH:mm:ss')}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export const Component = GameDetailPage;
export const loader = crashGameLoader;
