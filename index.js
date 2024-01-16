import "dotenv/config";
import express from "express";
// may want to use express session to save session data
// find out how to import tailwind and postcss
import bodyParser from "body-parser";
import ejs from "ejs";

import { getStockData } from "./src/middleware/getStockData.js";
import { calculateIntrinsicValue } from "./src/services/calculateIntrinsicValue.js";
import { getStockName } from "./src/middleware/getStockName.js";
const app = express();

app.use(express.static("views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/getIntrinsicValue", (req, res) => {
  const promisedData = Promise.resolve(getStockData());

  promisedData.then((value) => {
    const earningsGrowth = value.earningsGrowth.raw;
    const cashPerShare = value.totalCashPerShare.raw;
    const stockPrice = value.currentPrice.raw;

    console.log(value.earningsGrowth.raw);
    console.log(value.totalCashPerShare.raw);
    console.log(value.currentPrice.raw);
    try {
      const intrinsicValue =
        cashPerShare * (1 + earningsGrowth) * (stockPrice / cashPerShare);

      res.render("intrinsicValue", { calculatedValue: intrinsicValue });
    } catch (error) {
      console.error(error);
    }
  });
});

app.get("/getStockName", (req, res) => {
  const stockName = req.body.stockName;
 

  let searchedStock = {
    longName: "",
    quoteType: "",
    symbol: "",
    exchange: "",
  };

  try {
    searchedStock = getStockName();
    console.log(searchedStock.longName)
    res.render("stockName", {stock: searchedStock})
    
  } catch (error) {
    console.error(error);
  }
  

  
});

let port = process.env.PORT || 3000;
if (port == null || port == "") {
  port = `0.0.0.0:$PORT`;
}

app.listen(port, "0.0.0.0", function () {
  console.log("Server has started successfully ");
});
