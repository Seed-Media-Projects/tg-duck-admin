import { UpgradeLvlItem } from '@core/upgrade-lvls';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData, useParams } from 'react-router-dom';
import { tableUpgradeLvlsConfig } from './TableConfig';
import { upgradeLvlsLoader } from './loader';

const UpgradeLvlsPage = () => {
  const { upgradeLvls } = useLoaderData() as { upgradeLvls: UpgradeLvlItem[] };
  const { upgradeId } = useParams();

  return (
    <Grid item xs={12}>
      <BaseList
        data={upgradeLvls}
        config={tableUpgradeLvlsConfig}
        listHeader={
          <CardHeader
            title="Upgrade Lvls"
            action={
              <Link href={`/upgrades/${upgradeId}/lvls/create`}>
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = UpgradeLvlsPage;
export const loader = upgradeLvlsLoader;
