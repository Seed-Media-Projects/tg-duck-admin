import { createPricemeBoostFX, SavePricemeBoost } from '@core/priceme-boosts';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const createBoostAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SavePricemeBoost;

  try {
    await createPricemeBoostFX({
      boostDuration: Number(payload.boostDuration),
      incomeMc: Number(payload.incomeMc),
      incomePeriod: Number(payload.incomePeriod),
      lvl: Number(payload.lvl),
      primaryFcPrice: Number(payload.primaryFcPrice),
      primaryMcPrice: Number(payload.primaryMcPrice),
      secondaryFcPrice: Number(payload.secondaryFcPrice),
      secondaryMcPrice: Number(payload.secondaryMcPrice),
    });
  } catch (error) {
    return {
      error: 'Cannot create boost',
    };
  }

  return redirect('/priceme/boosts');
};
