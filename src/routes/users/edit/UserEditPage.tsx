import { UserInfo, getUserDataFX } from '@core/users';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, LoaderFunctionArgs, useActionData, useLoaderData, useNavigation } from 'react-router-dom';

export const Component = () => {
  const { user } = useLoaderData() as { user: UserInfo | null };

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('firstName') != null;

  const actionData = useActionData() as { error: string } | undefined;

  if (!user) {
    return <Typography>User not found</Typography>;
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
          label="First name"
          name="firstName"
          autoFocus
          defaultValue={user.firstName}
        />
        <TextField margin="normal" fullWidth label="Last name" name="lastName" defaultValue={user.lastName ?? ''} />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Max referrals"
          name="maxReferrals"
          type="number"
          defaultValue={user.maxReferrals}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Experience"
          name="experience"
          type="number"
          defaultValue={user.userInfo.experience}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Income per hour"
          name="incomePerHour"
          type="number"
          defaultValue={user.userInfo.incomePerHour}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Max energy"
          name="maxEnergy"
          type="number"
          defaultValue={user.userInfo.maxEnergy}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Energy"
          name="energy"
          type="number"
          defaultValue={user.userInfo.energy}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Coins"
          name="coins"
          type="number"
          defaultValue={user.userInfo.coins}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Coins per tap"
          name="coinsPerTap"
          type="number"
          defaultValue={user.userInfo.coinsPerTap}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Bet coins"
          name="betCoins"
          type="number"
          defaultValue={user.userInfo.betCoins}
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

Component.displayName = 'EditUserPage';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    return { user: null };
  }

  const user = await getUserDataFX(Number(params.userId));
  return { user };
};
