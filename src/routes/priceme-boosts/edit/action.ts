import { SavePricemeBoost, updatePricemeBoostFX } from '@core/priceme-boosts';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export const updateBoostAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as SavePricemeBoost;

  try {
    await updatePricemeBoostFX({
      boostDuration: Number(payload.boostDuration),
      incomeMc: Number(payload.incomeMc),
      incomePeriod: Number(payload.incomePeriod),
      lvl: Number(payload.lvl),
      primaryFcPrice: Number(payload.primaryFcPrice),
      primaryMcPrice: Number(payload.primaryMcPrice),
      secondaryFcPrice: Number(payload.secondaryFcPrice),
      secondaryMcPrice: Number(payload.secondaryMcPrice),
      id: Number(params.boostId),
    });
  } catch (error) {
    return {
      error: 'Cannot update boost',
    };
  }

  return redirect('/priceme/boosts');
};
