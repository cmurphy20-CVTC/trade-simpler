export const calculateIntrinsicValue = async (value) => {
  const earningsGrowth = value.earningsGrowth;
  const cashPerShare = value.totalCashPerShare.raw;
  const stockPrice = value.currentPrice.raw;
  try {
    const intrinsicValue =
      cashPerShare * (1 + earningsGrowth) * (stockPrice / cashPerShare);

    return intrinsicValue;
  } catch (error) {
    console.error(error);
  }
};
