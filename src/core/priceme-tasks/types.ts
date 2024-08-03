import { BaseFileInfo } from '../files';

export type PricemeTaskItem = {
  id: number;
  name: string;
  description: string | null;
  link: string | null;
  solution: string | null;
  rewardFc: number;
  rewardMc: number;
  position: number;
  file: BaseFileInfo;
};
export type SavePricemeTask = {
  fileId: number;
  name: string;
  description: string | null;
  link: string | null;
  solution: string | null;
  rewardFc: number;
  rewardMc: number;
  position: number;
};
