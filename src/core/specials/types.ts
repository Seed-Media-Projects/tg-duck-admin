import { BaseFileInfo } from '../files';

export type SpecialItem = {
  id: number;
  name: string;
  type: DuckySpecialType;
  description: string | null;
  effect: string | null;
  cooldown: number;
  duration: number;
  requiredLvl: number;
  position: number;
  file: BaseFileInfo;
};
export type SaveSpecial = {
  fileId: number;
  name: string;
  type: DuckySpecialType;
  description: string | null;
  effect: string | null;
  cooldown: number;
  duration: number;
  requiredLvl: number;
  position: number;
};

export enum DuckySpecialType {
  AddHalfEnergy = 'add_half_energy',
  AddHalfCoinsPerTap = 'add_half_coins_per_tap',
  AddNFTCard = 'add_nft_card',
  AddBitcoin = 'add_bitcoin',
}
