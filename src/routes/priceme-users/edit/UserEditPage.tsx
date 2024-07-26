import { getPricemeUserDataFX, updatePricemeUserDataFX, UpdateUserData, UserInfo } from '@core/priceme-users';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Form, LoaderFunctionArgs, redirect, useActionData, useLoaderData, useNavigation } from 'react-router-dom';

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
          label="Main coins"
          name="mainCoin"
          type="number"
          defaultValue={user.userInfo.mainCoin}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Friends coins"
          name="friendsCoin"
          type="number"
          defaultValue={user.userInfo.friendsCoin}
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

  const user = await getPricemeUserDataFX(Number(params.userId));
  return { user };
};

export const action = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as unknown as UpdateUserData;

  try {
    await updatePricemeUserDataFX({
      ...updates,
      id: Number(params.userId),
      friendsCoin: Number(updates.friendsCoin),
      mainCoin: Number(updates.mainCoin),
    });
  } catch (error) {
    return {
      error: 'Cannot save user',
    };
  }

  return redirect(`/priceme/users/${params.userId}`);
};
