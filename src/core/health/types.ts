export type HealthInfo = {
  details: {
    'external-network': HealthItem;
    database: HealthItem;
    memory_heap: HealthItem;
    memory_rss: HealthItem;
  };
};

export type HealthItem = {
  status: HealthItemStatus;
  message?: string;
};
export type HealthItemStatus = 'up' | 'down';
