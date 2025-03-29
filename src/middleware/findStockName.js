import axios from "axios";
import "dotenv/config";

// Update the function to accept a parameter
export const findStockName = async (stockSymbol) => {
  try {
    // Update the URL in the options object with the stockSymbol parameter
    const options = {
      method: "GET",
      url: process.env.STOCKNAMEURL + stockSymbol,
      headers: {
        "X-RapidAPI-Key": process.env.APIKEY,
        "X-RapidAPI-Host": process.env.APIHOST,
      },
    };

    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
