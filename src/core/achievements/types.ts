import { BaseFileInfo } from '../files';

export type AchievementItem = {
  id: number;
  name: string;
  type: string;
  description: string | null;
  rewardExperience: number | null;
  rewardCoins: number | null;
  position: number;
  file: BaseFileInfo;
};
export type SaveAchievement = {
  fileId: number;
  name: string;
  type: string;
  description: string | null;
  rewardExperience: number | null;
  rewardCoins: number | null;
  position: number;
};
