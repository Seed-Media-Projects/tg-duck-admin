import { BaseFileInfo } from '../files';

export type TaskItem = {
  id: number;
  name: string;
  description: string | null;
  rewardExperience: number;
  rewardCoins: number;
  position: number;
  file: BaseFileInfo;
};
export type SaveTask = {
  fileId: number;
  name: string;
  description: string | null;
  rewardExperience: number;
  rewardCoins: number;
  position: number;
};
