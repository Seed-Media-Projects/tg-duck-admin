export type UserListItem = BaseUserInfo & {
  maxReferrals: number;
  allowsWriteToPm: boolean;
  isPremium: boolean;
  language: 'ru' | 'en';
  userInfo: {
    id: number;
    experience: number;
    incomePerHour: number;
    maxEnergy: number;
    energy: number;
    coins: number;
    coinsPerTap: number;
    betCoins: number;
  };
};

export type BaseUserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  tgUserId: number;
  photoUrl: string;
};
