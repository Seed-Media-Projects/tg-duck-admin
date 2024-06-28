import { HealthInfo } from '@core/health';
import { useInterval } from '@core/utils/userInterval';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { homeLoader } from './loader';
const HomePage = () => {
  const { details } = useLoaderData() as { details: HealthInfo['details'] };

  const navigate = useNavigate();

  useInterval(() => navigate('.', { replace: true }), 15000);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Database:</Typography>
        {details.database.status === 'up' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
      </Box>
      {details.database.message && (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Database message:</Typography>
          <Typography>{details.database.message} </Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>External-network:</Typography>
        {details['external-network'].status === 'up' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
      </Box>
      {details['external-network'].message && (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>External-network message:</Typography>
          <Typography>{details['external-network'].message} </Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Memory heap:</Typography>
        {details.memory_heap.status === 'up' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
      </Box>
      {details.memory_heap.message && (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Memory heap message:</Typography>
          <Typography>{details.memory_heap.message} </Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Memory rss:</Typography>
        {details.memory_rss.status === 'up' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
      </Box>
      {details.memory_rss.message && (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Memory rss message:</Typography>
          <Typography>{details.memory_rss.message} </Typography>
        </Box>
      )}
    </Box>
  );
};

export const Component = HomePage;
export const loader = homeLoader;
