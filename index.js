import "dotenv/config";
import express from "express";
// find out how to import tailwind and postcss
import bodyParser from "body-parser";
import ejs from "ejs";

import { findStockData } from "./src/middleware/findStockData.js";
import { calculateIntrinsicValue } from "./src/services/calculateIntrinsicValue.js";
import { sanitizeInput } from "./src/utils/sanitizeInput.js";
const app = express();

app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/findStockData", (req, res) => {
  const stockSymbol = sanitizeInput(req.body.stockname);
  console.log(req.body);
  console.log(`get data ${  stockSymbol}`);

  findStockData(stockSymbol)
    .then((value) => {
      const earningsGrowth = value.body["earningsGrowth"].raw;
      const cashPerShare = value.body["totalCashPerShare"].raw;
      const stockPrice = value.body["currentPrice"].raw;

      console.log(earningsGrowth);
      console.log(cashPerShare);
      console.log(stockPrice);

      try {
        const intrinsicValue =
          cashPerShare * (1 + earningsGrowth) * (stockPrice / cashPerShare);

        res.render("intrinsicValue", { calculatedValue: intrinsicValue });
      } catch (error) {
        console.error(error);
        // Handle the error appropriately (e.g., render an error page or send an error response)
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle the error appropriately (e.g., render an error page or send an error response)
    });
});

let port = process.env.PORT || 3000;
if (port == null || port == "") {
  port = `0.0.0.0:$PORT`;
}

app.listen(port, "0.0.0.0", function () {
  console.log("Server has started successfully ");
});

// const app = require('./app')
// const config = require('./config')
// const logger = require('./logger')
//app.listen(port, "0.0.0.0", function () {
//   console.log("Server has started successfully ");
// });
