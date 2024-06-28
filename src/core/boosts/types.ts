import { BaseFileInfo } from '../files';

export type BoostItem = {
  id: number;
  name: string;
  type: DuckyBoostType;
  description: string | null;
  effect: string | null;
  maxQuantity: number;
  activeTime: number;
  position: number;
  file: BaseFileInfo;
};
export type SaveBoost = {
  fileId: number;
  name: string;
  type: DuckyBoostType;
  description: string | null;
  effect: string | null;
  maxQuantity: number;
  activeTime: number;
  position: number;
};

export enum DuckyBoostType {
  MaxEnergy = 'max_energy',
  TurboClick = 'turbo_click',
}
