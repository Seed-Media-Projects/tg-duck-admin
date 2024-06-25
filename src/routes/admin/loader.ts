import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { LS, LSKeys } from '../../core/local-store';

export const protectedLoader = ({ request }: LoaderFunctionArgs) => {
  if (!LS.getItem(LSKeys.AuthToken, '')) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
};
