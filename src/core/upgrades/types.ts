import { BaseFileInfo } from '../files';

export type UpgradeItem = {
  id: number;
  name: string;
  type: DuckyUpgradeType;
  description: string | null;
  file: BaseFileInfo;
};
export type SaveUpgrade = {
  fileId: number;
  name: string;
  type: DuckyUpgradeType;
  description: string | null;
};

export enum DuckyUpgradeType {
  Taps = 'taps',
  Energy = 'energy',
}
