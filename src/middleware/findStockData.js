import axios from "axios";
import "dotenv/config";

export const findStockData = async (stockSymbol) => {
  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules",
    params: {
      ticker: stockSymbol,
      module: "financial-data",
    },
    headers: {
      "x-rapidapi-key": process.env.APIKEY,
      "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
