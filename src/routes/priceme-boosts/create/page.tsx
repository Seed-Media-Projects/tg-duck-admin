import { PricemeBoostItem } from '@core/priceme-boosts';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { boostsLoader } from '../loader';
import { createBoostAction } from './action';

const CreateBoostPage = () => {
  const { boosts } = useLoaderData() as { boosts: PricemeBoostItem[] };

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
          label="Level"
          name="lvl"
          type="number"
          autoFocus
          defaultValue={(boosts[boosts.length - 1]?.lvl ?? 0) + 1}
        />
        <TextField margin="normal" required fullWidth label="First buy MC" name="primaryMcPrice" type="number" />
        <TextField margin="normal" required fullWidth label="First buy FC" name="primaryFcPrice" type="number" />
        <TextField margin="normal" required fullWidth label="Second buy MC" name="secondaryMcPrice" type="number" />
        <TextField margin="normal" required fullWidth label="Second buy FC" name="secondaryFcPrice" type="number" />

        <TextField margin="normal" required fullWidth label="Income" name="incomeMc" type="number" />

        <TextField margin="normal" fullWidth required label="Income period (in seconds)" name="incomePeriod" type="number" />
        <TextField
          margin="normal"
          fullWidth
          required
          label="Boost duration (in seconds)"
          name="boostDuration"
          type="number"
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>
        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = CreateBoostPage;
export const action = createBoostAction;
export const loader = boostsLoader;
