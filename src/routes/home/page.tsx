import { HealthInfo } from '@core/health';
import { useInterval } from '@core/utils/userInterval';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { homeLoader } from './loader';
const HomePage = () => {
  const { detailsDuck, detailsPriceme } = useLoaderData() as {
    detailsPriceme: HealthInfo['details'];
    detailsDuck: HealthInfo['details'];
  };

  const navigate = useNavigate();

  useInterval(() => navigate('.', { replace: true }), 15000);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5">Duckytap</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Database:</Typography>
          {detailsDuck.database.status === 'up' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
        </Box>
        {detailsDuck.database.message && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>Database message:</Typography>
            <Typography>{detailsDuck.database.message} </Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>External-network:</Typography>
          {detailsDuck['external-network'].status === 'up' ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </Box>
        {detailsDuck['external-network'].message && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>External-network message:</Typography>
            <Typography>{detailsDuck['external-network'].message} </Typography>
          </Box>
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <Typography variant="h5">Priceme</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Database:</Typography>
          {detailsPriceme.database.status === 'up' ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
        </Box>
        {detailsPriceme.database.message && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>Database message:</Typography>
            <Typography>{detailsPriceme.database.message} </Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>External-network:</Typography>
          {detailsPriceme['external-network'].status === 'up' ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </Box>
        {detailsPriceme['external-network'].message && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>External-network message:</Typography>
            <Typography>{detailsPriceme['external-network'].message} </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export const Component = HomePage;
export const loader = homeLoader;
