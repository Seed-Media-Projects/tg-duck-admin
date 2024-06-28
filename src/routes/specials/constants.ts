import { DuckySpecialType } from '@core/specials';

export const specialOptions = [
  {
    title: 'Bitcoin',
    value: DuckySpecialType.AddBitcoin,
  },
  {
    title: '50% coins per tap',
    value: DuckySpecialType.AddHalfCoinsPerTap,
  },
  {
    title: '50% bonus energy',
    value: DuckySpecialType.AddHalfEnergy,
  },
  {
    title: 'NFT',
    value: DuckySpecialType.AddNFTCard,
  },
];
