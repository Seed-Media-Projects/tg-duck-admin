import { UpgradeLvlItem } from '@core/upgrade-lvls';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { upgradeLvlsLoader } from '../loader';
import { createUpgradeLvlAction } from './action';

const CreateUpgradeLvlPage = () => {
  const { upgradeLvls } = useLoaderData() as { upgradeLvls: UpgradeLvlItem[] };

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('lvl') != null;

  const actionData = useActionData() as { error: string } | undefined;

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
          defaultValue={(upgradeLvls[upgradeLvls.length - 1]?.lvl ?? 0) + 1}
        />
        <TextField margin="normal" required fullWidth label="Price" name="price" type="number" />
        <TextField margin="normal" required fullWidth label="Increase amount" name="increaseAmount" type="number" />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = CreateUpgradeLvlPage;
export const action = createUpgradeLvlAction;
export const loader = upgradeLvlsLoader;
