import { BaseFileInfo } from '../files';

export type AchievementItem = {
  id: number;
  name: string;
  type: DuckyAchievementType;
  description: string | null;
  rewardExperience: number | null;
  rewardCoins: number | null;
  position: number;
  file: BaseFileInfo;
};
export type SaveAchievement = {
  fileId: number;
  name: string;
  type: DuckyAchievementType;
  description: string | null;
  rewardExperience: number | null;
  rewardCoins: number | null;
  position: number;
};

export enum DuckyAchievementType {
  Clicks1k = 'clicks_1k',
  Clicks10k = 'clicks_10k',
  Coins1k = 'coins_1k',
  Coins10k = 'coins_10k',
  Coins100k = 'coins_100k',
  Coins1kk = 'coins_1kk',
  Upgrades100k = 'upgrades_100k',
  Upgrade10lvl = 'upgrade_10lvl',
  // Upgrade5x5lvl = 'upgrades_5x5lvl',
  Friends2 = 'friends_2',
  Time1h = 'time_1h',
  Achievements14 = 'achievements_14',
  Lvl5 = 'lvl_5',
  Lvl10 = 'lvl_10',
  Tasks3 = 'tasks_3',
}
