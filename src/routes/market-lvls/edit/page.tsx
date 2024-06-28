import { MarketLvlItem } from '@core/market-lvls';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { updateMarketLvlAction } from './action';
import { marketLvlLoader } from './loader';

const EditMarketLvlPage = () => {
  const { marketLvl } = useLoaderData() as { marketLvl: MarketLvlItem | null };

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('lvl') != null;

  const actionData = useActionData() as { error: string } | undefined;

  if (!marketLvl) {
    return <Typography>Market lvl not found</Typography>;
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
          defaultValue={marketLvl.lvl}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Price"
          name="price"
          type="number"
          defaultValue={marketLvl.price}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Income per hour"
          name="incomePerHour"
          type="number"
          defaultValue={marketLvl.incomePerHour}
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = EditMarketLvlPage;
export const action = updateMarketLvlAction;
export const loader = marketLvlLoader;
