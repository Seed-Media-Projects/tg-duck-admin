export type UserListItem = BaseUserInfo & {
  allowsWriteToPm: boolean;
  isPremium: boolean;
  language: 'ru' | 'en';
  userInfo: PricemeUserInfo;
};

export type BaseUserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  tgUserId: number;
  photoUrl: string;
};
export type PricemeUserInfo = {
  id: number;
  accountPrice: number;
  friendsCoin: number;
  mainCoin: number;
};

export type UserReferral = {
  id: number;
  created: string;
  deleted: string | null;
  user_id: number;
  user_id_referral: number;
};

export enum UserTransactionType {
  AccountPrice = 'account_price',
  FriendReward = 'friend_reward',
  FriendOfFriendReward = 'friend_of_friend_reward',
  Conversion = 'conversion',
}

export type PricemeUserTransaction = {
  id: string;
  type: UserTransactionType;
  amount: number;
  created: string;
  deleted: string | null;
  friend_id: number | null;
};

export type UserInfo = BaseUserInfo & {
  allowsWriteToPm: boolean;
  isPremium: boolean;
  language: 'ru' | 'en';
  userInfo: PricemeUserInfo;
  referrals: UserReferral[];
  userRef: UserReferral | null;
  transactions: PricemeUserTransaction[];
  transaction: PricemeUserTransaction | null;
};

export type UpdateUserData = {
  id: number;
  firstName: string;
  lastName: string;
  mainCoin: number;
  friendsCoin: number;
};
