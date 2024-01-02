import axios from "axios";
import "dotenv/config";

const options = {
  method: "GET",
  url: process.env.URL,
  headers: {
    "X-RapidAPI-Key": process.env.APIKEY,
    "X-RapidAPI-Host": process.env.APIHOST,
  },
};

export const getStockData = async () => {
  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
