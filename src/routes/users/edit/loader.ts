import { LoaderFunctionArgs } from 'react-router-dom';
import { getUserDataFX } from '../../../core/users';

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    return { user: null };
  }

  const user = await getUserDataFX(Number(params.userId));
  return { user };
};
