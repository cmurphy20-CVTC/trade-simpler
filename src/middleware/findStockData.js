import axios from "axios";
import "dotenv/config";


export const findStockData = async (stockSymbol) => {
  try {
    const options = {
      method: "GET",
      url: process.env.URL + stockSymbol,
      headers: {
        "X-RapidAPI-Key": process.env.APIKEY,
        "X-RapidAPI-Host": process.env.APIHOST,
      },
    };
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
