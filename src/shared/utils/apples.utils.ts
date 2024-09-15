export const getTimeFromAppleCount = (appleCount: number) => {
  if (appleCount >= 60) return 100;
  if (appleCount >= 50) return 150;
  if (appleCount >= 40) return 200;
  if (appleCount >= 30) return 250;
  if (appleCount >= 20) return 300;
  if (appleCount >= 10) return 350;
  return 400;
};
