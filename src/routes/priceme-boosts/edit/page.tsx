import { PricemeBoostItem } from '@core/priceme-boosts';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { updateBoostAction } from './action';
import { boostLoader } from './loader';

const EditBoostPage = () => {
  const { boost } = useLoaderData() as { boost: PricemeBoostItem | null };

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('lvl') != null;

  const actionData = useActionData() as { error: string } | undefined;

  if (!boost) {
    return <Typography>Boost not found</Typography>;
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
          label="Level"
          name="lvl"
          type="number"
          autoFocus
          defaultValue={boost.lvl}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="First buy MC"
          name="primaryMcPrice"
          type="number"
          defaultValue={boost.primaryMcPrice}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="First buy FC"
          name="primaryFcPrice"
          type="number"
          defaultValue={boost.primaryFcPrice}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Second buy MC"
          name="secondaryMcPrice"
          type="number"
          defaultValue={boost.secondaryMcPrice}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Second buy FC"
          name="secondaryFcPrice"
          type="number"
          defaultValue={boost.secondaryFcPrice}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Income"
          name="incomeMc"
          type="number"
          defaultValue={boost.incomeMc}
        />

        <TextField
          margin="normal"
          fullWidth
          required
          label="Income period (in seconds)"
          name="incomePeriod"
          type="number"
          defaultValue={boost.incomePeriod}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          label="Boost duration (in seconds)"
          name="boostDuration"
          type="number"
          defaultValue={boost.boostDuration}
        />
        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = EditBoostPage;
export const action = updateBoostAction;
export const loader = boostLoader;
