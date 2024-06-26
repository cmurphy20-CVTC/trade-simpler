export const calculateValuation = async (intrinsicValue, stockPrice) => {
  try {
    let average = 0;
    let absoluteDifference = 0;
    absoluteDifference = intrinsicValue - stockPrice;
    console.log(`difference ${absoluteDifference} stock ${stockPrice} value ${intrinsicValue}`);

  

    average = (stockPrice + intrinsicValue ) / 2;
    
    console.log(`average ${average}`);

    console.log(((absoluteDifference / average) * 100).toFixed(2));
    return parseFloat(((absoluteDifference / average) * 100).toFixed(2));
  } catch (e) {
    console.log(e);
  }
};
