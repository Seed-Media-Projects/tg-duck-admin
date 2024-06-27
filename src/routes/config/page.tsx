import { ConfigData, deleteConfigFX, getConfigDataFX } from '@core/config';
import { Box, Button, Link, Switch, Typography } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const Component = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { config } = useLoaderData() as { config: ConfigData | null };
  const loading = useUnit(deleteConfigFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!config) {
    return (
      <Box>
        <Typography gutterBottom>Active config not found</Typography>

        <Link href={`/config/create`}>
          <Button variant="contained">Create</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Config info
      </Typography>
      <Box my={2} display="flex" gap={2}>
        <Link href="/config/edit">
          <Button variant="contained">Edit</Button>
        </Link>
        <Button onClick={handleOpen} variant="contained" color="error">
          Delete
        </Button>
      </Box>
      <Typography gutterBottom>Notification: {config.notificationText}</Typography>
      <Typography gutterBottom>
        Is notification <Switch disabled checked={config.notification} />
      </Typography>
      <Typography gutterBottom>
        Is tech problem: <Switch disabled checked={config.techProblem} />
      </Typography>
      {config.file?.fileUrl ? (
        <Box
          component="img"
          src={import.meta.env.VITE_SERVER_URL + config.file.fileUrl}
          width={250}
          height={250}
          sx={{ objectFit: 'contain', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px', overflow: 'hidden' }}
        />
      ) : null}

      <ActionModal
        loading={loading}
        onClose={handleClose}
        onConfirm={() => {
          deleteConfigFX().then(() => {
            handleClose();
            navigate('.', { replace: true });
          });
        }}
        open={open}
        title="Delete config."
        subtitle="Are you sure?"
      />
    </Box>
  );
};

Component.displayName = 'ConfigPage';

export const loader = async () => {
  const config = await getConfigDataFX();
  return { config };
};
