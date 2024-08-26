import { PricemeDashboardLoader } from '@core/pricemie-dashboard';
import { Card, CardHeader, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLoaderData } from 'react-router-dom';
import { tasksLoader } from './loader';

const pieParams = { height: 200, margin: { right: 150 } };

const DashboarPage = () => {
  const { users24h, usersBoost, usersCount } = useLoaderData() as PricemeDashboardLoader;

  return (
    <Grid container spacing={4}>
      <Grid item sm={4} xs={12}>
        <Card>
          <CardHeader title="Priceme users" />
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: users24h?.total ?? 0, label: 'Last 24h active' },
                  { id: 1, value: usersCount?.total ?? 0, label: 'Total users' },
                  { id: 2, value: usersCount?.friends ?? 0, label: 'Friends' },
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            {...pieParams}
            sx={{
              margin: '1rem',
            }}
          />
        </Card>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Card>
          <CardHeader title="Priceme boost" />
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: usersBoost?.total ?? 0, label: 'Total boosts' },
                  { id: 1, value: usersBoost?.active ?? 0, label: 'Active boosts' },
                  { id: 2, value: usersBoost?.claims ?? 0, label: 'Users` claims' },
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            {...pieParams}
            colors={['red', 'blue', 'green']}
            sx={{
              margin: '1rem',
            }}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export const Component = DashboarPage;
export const loader = tasksLoader;
