export type PricemeUsersCount = {
  total: number;
  friends: number;
};
export type PricemeLast24hUsersCount = {
  total: number;
};
export type PricemeUsersBoostCount = {
  total: number;
  active: number;
  claims: number;
};

export type PricemeDashboardLoader = {
  users24h: PricemeLast24hUsersCount | null;
  usersBoost: PricemeUsersBoostCount | null;
  usersCount: PricemeUsersCount | null;
};
