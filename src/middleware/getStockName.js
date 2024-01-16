import axios from "axios";
import "dotenv/config";
let stockName;

const options = {
  method: 'GET',
  url: process.env.STOCKNAMEURL,
  headers: {
    'X-RapidAPI-Key': process.env.APIKEY,
    'X-RapidAPI-Host': process.env.APIHOST
  }
};
export const getStockName = async (stockName) => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
