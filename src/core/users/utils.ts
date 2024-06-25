export const getUserLvlFromExp = (exp: number) => {
  switch (true) {
    case exp >= 4000:
      return 10;
    case exp >= 3400:
      return 9;
    case exp >= 2850:
      return 8;
    case exp >= 2350:
      return 7;
    case exp >= 1900:
      return 6;
    case exp >= 1500:
      return 5;
    case exp >= 1150:
      return 4;
    case exp >= 750:
      return 3;
    case exp >= 500:
      return 2;

    default:
      return 1;
  }
};
