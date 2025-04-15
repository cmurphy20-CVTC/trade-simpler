export const calculateIntrinsicValue = async (
  earningsGrowth,
  cashPerShare,
  stockPrice,
) => {
  try {
    return cashPerShare * (1 + earningsGrowth) * (stockPrice / cashPerShare);
  } catch (error) {
    console.error(error);
  }
};
