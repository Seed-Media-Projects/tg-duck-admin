export type UserListItem = BaseUserInfo & {
  maxReferrals: number;
  allowsWriteToPm: boolean;
  isPremium: boolean;
  language: 'ru' | 'en';
  userInfo: DuckyUserInfo;
};

export type BaseUserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  tgUserId: number;
  photoUrl: string;
};
export type DuckyUserInfo = {
  id: number;
  experience: number;
  incomePerHour: number;
  maxEnergy: number;
  energy: number;
  coins: number;
  coinsPerTap: number;
  betCoins: number;
};

export type UserReferral = {
  id: number;
  created: string;
  deleted: string | null;
  user_id: number;
  user_id_referral: number;
};

export type UserBoost = {
  id: number;
  user_id: number;
  ducky_boost_id: number;
  created: string;
  deleted: string | null;
};
export type UserUpgrade = {
  id: number;
  user_id: number;
  ducky_upgrade_lvl_id: number;
  created: string;
  deleted: string | null;
};
export type UserMarket = {
  id: number;
  user_id: number;
  ducky_market_lvl_id: number;
  created: string;
  deleted: string | null;
};
export type UserSpecial = {
  id: number;
  user_id: number;
  ducky_special_id: number;
  created: string;
  deleted: string | null;
};
export type UserTask = {
  id: number;
  user_id: number;
  ducky_task_id: number;
  created: string;
  deleted: string | null;
};
export type UserAchievement = {
  id: number;
  user_id: number;
  ducky_achievement_id: number;
  created: string;
  deleted: string | null;
};
export type UserGame = {
  id: number;
  user_id: number;
  crash_game_id: number;
  winner: boolean;
  bet: number;
  ratio: number;
  joined: string;
  stopped: string | null;
};

export type UserInfo = BaseUserInfo & {
  maxReferrals: number;
  allowsWriteToPm: boolean;
  isPremium: boolean;
  language: 'ru' | 'en';
  userInfo: DuckyUserInfo;
  referrals: UserReferral[];
  userRef: UserReferral | null;
  userBoosts: UserBoost[];
  userUpgrades: UserUpgrade[];
  userMarkets: UserMarket[];
  userSpecials: UserSpecial[];
  userTasks: UserTask[];
  userAchievements: UserAchievement[];
  userGames: UserGame[];
};

export type UpdateUserData = {
  id: number;
  firstName: string;
  lastName: string;
  maxReferrals: number;
  experience: number;
  incomePerHour: number;
  maxEnergy: number;
  energy: number;
  coins: number;
  coinsPerTap: number;
  betCoins: number;
};
