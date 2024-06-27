import { SaveConfigPayload, createConfigFX } from '@core/config';
import { FileInfo, useUploader } from '@core/files';
import { Box, Button, CircularProgress, FormControlLabel, Switch, TextField } from '@mui/material';
import { CircularProgressWithLabel } from '@ui/ProgressWithLabel';
import { useState } from 'react';
import { Form, LoaderFunctionArgs, redirect, useActionData, useNavigation } from 'react-router-dom';

export const Component = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('techProblem') != null;
  const uploader = useUploader({ onFinishUpload: setFileInfo });
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
        <input type="hidden" name="fileId" value={fileInfo?.id} />
        <input {...uploader.getInputProps()} />
        <Box display="flex" gap={2} flexDirection="column">
          <Button
            sx={{ width: 'max-content' }}
            variant="contained"
            disabled={!!uploader.progress || isLoading}
            onClick={uploader.open}
          >
            {uploader.progress ? (
              <CircularProgressWithLabel size={24} color="primary" value={uploader.progress} />
            ) : (
              'add file'
            )}
          </Button>
          {fileInfo?.url ? (
            <Box
              component="img"
              src={import.meta.env.VITE_SERVER_URL + fileInfo.url}
              width={250}
              height={250}
              sx={{ objectFit: 'contain', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px', overflow: 'hidden' }}
            />
          ) : null}
        </Box>

        <FormControlLabel control={<Switch defaultChecked />} label="Is tech problem" name="techProblem" />
        <FormControlLabel control={<Switch defaultChecked />} label="Is notification" name="notification" />
        <TextField margin="normal" required fullWidth label="Notification" name="notificationText" />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

Component.displayName = 'ConfigCreatePage';

export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SaveConfigPayload;

  if (!payload.fileId) {
    return {
      error: 'You must add file',
    };
  }

  try {
    await createConfigFX({
      ...payload,
      notification: !!payload.notification,
      techProblem: !!payload.techProblem,
      fileId: Number(payload.fileId),
    });
  } catch (error) {
    return {
      error: 'Cannot create config',
    };
  }

  return redirect('/config');
};
