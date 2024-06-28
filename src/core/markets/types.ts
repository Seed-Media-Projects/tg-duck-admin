import { BaseFileInfo } from '../files';

export type MarketItem = {
  id: number;
  name: string;
  description: string | null;
  position: number;
  file: BaseFileInfo;
};
export type SaveMarket = {
  fileId: number;
  name: string;
  description: string | null;
  position: number;
};
