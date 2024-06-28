import { UpgradeLvlItem } from '@core/upgrade-lvls';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { updateUpgradeLvlAction } from './action';
import { upgradeLvlLoader } from './loader';

const EditUpgradeLvlPage = () => {
  const { upgradeLvl } = useLoaderData() as { upgradeLvl: UpgradeLvlItem | null };

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('lvl') != null;

  const actionData = useActionData() as { error: string } | undefined;

  if (!upgradeLvl) {
    return <Typography>Upgrade lvl not found</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <Form method="post">
        <TextField
          margin="normal"
          required
          fullWidth
          label="Lvl"
          name="lvl"
          type="number"
          autoFocus
          defaultValue={upgradeLvl.lvl}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Price"
          name="price"
          type="number"
          defaultValue={upgradeLvl.price}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Increase amount"
          name="increaseAmount"
          type="number"
          defaultValue={upgradeLvl.increaseAmount}
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = EditUpgradeLvlPage;
export const action = updateUpgradeLvlAction;
export const loader = upgradeLvlLoader;
