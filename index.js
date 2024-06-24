import "dotenv/config";
import express from "express";
// may want to use express session to save session data
// find out how to import tailwind and postcss
import bodyParser from "body-parser";
import ejs from "ejs";

import { findStockData } from "./src/middleware/findStockData.js";
import { calculateIntrinsicValue } from "./src/services/calculateIntrinsicValue.js";
import { findStockName } from "./src/middleware/findStockName.js";
const app = express();

app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/intrinsicValue", (req, res) => {
  
  const earningsGrowth = req.body.earningsGrowth.trim();
  const cashPerShare = req.body.cashPerShare.trim();
  const stockPrice = req.body.stockPrice.trim();

  try {
    const intrinsicValue =
      cashPerShare * (1 + earningsGrowth) * (stockPrice / cashPerShare);

      
    res.render("intrinsicValue", { calculatedValue: intrinsicValue });
  } catch (error) {
    console.error(error);
  }
});

app.post("/findStockData", (req, res) => {
  let stockSymbol = req.body.selectedStock.trim();
  console.log("get data " + stockSymbol);
  const promisedData = Promise.resolve(findStockData(stockSymbol));

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

app.post("/findStockName", (req, res) => {
  let stockName = req.body.stockname.trim();

  try {
    const stockNameData = Promise.resolve(findStockName(stockName));

    stockNameData
      .then((value) => {
        console.log("found " + value);
        res.render("stockName", { stockNames: value.quotes });
      })
      .catch((error) => {
        // Handle errors if the promise rejects
        console.error(error);
      });
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
