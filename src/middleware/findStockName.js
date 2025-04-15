import axios from "axios";
import "dotenv/config";

export const findStockName = async (stockSymbol) => {
  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/search",
    params: { search: stockSymbol },
    headers: {
      "x-rapidapi-key": process.env.APIKEY,
      "x-rapidapi-host": process.env.APIHOST,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("response.data");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
