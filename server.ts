// const express = require("express");
import express from "express";
import { type Request, type Response } from "express";
import { isNumberObject } from "util/types";

const app = express();
const port = 3000;

app.get("/greetings/:user", (req: Request<{ user: string }>, res: Response) => {
  // Accessing the parameter
  const user = req.params.user;
  res.send(`What a delight it is to see you once more, ${user}`);
  console.log(req.params.user);
});

app.get(
  "/roll/:dieNumber",
  (req: Request<{ dieNumber: string }>, res: Response) => {
    // Accessing the parameter
    const dieNumberStr = req.params.dieNumber;
    const dieNumber = parseInt(dieNumberStr);
    console.log(req.params.dieNumber);

    if (isNaN(dieNumber)) {
      res.send("You must specify a number.");
    } else {
      const rolledNumber = Math.floor(Math.random() * (dieNumber + 1));
      res.send(`Given a ${dieNumber}, Your rolled a ${rolledNumber}`);
    }
  }
);

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get(
  "/collectibles/:index",
  (req: Request<{ index: string }>, res: Response) => {
    // Accessing the parameter
    const indexStr = req.params.index;
    const index = parseInt(indexStr);

    if (!collectibles[index]) {
      res.send("This item is not yet in stock. Check back soon!");
    } else {
      const { name, price } = collectibles[index];
      res.send(`So, you want the ${name}? For $${price}, it can be yours!`);
    }
  }
);

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  const minPriceRaw = req.query["min-price"];
  const minPrice =
    typeof minPriceRaw === "string" ? parseFloat(minPriceRaw) : NaN;

  const maxPriceRaw = req.query["max-price"];
  const maxPrice =
    typeof maxPriceRaw === "string" ? parseFloat(maxPriceRaw) : NaN;

  const shoeType = req.query["type"];

  let result = shoes;

  if (minPrice) {
    const resultFilteredWithMinPrice = result.filter(
      ({ price }) => price >= minPrice
    );
    result = resultFilteredWithMinPrice;
  }

  if (maxPrice) {
    const resultFilteredWithMaxPrice = result.filter(
      ({ price }) => price <= maxPrice
    );
    result = resultFilteredWithMaxPrice;
  }

  if (shoeType) {
    const resultFilteredByType = result.filter(({ type }) => type === shoeType);
    result = resultFilteredByType;
  }

  res.send(`I found this shoe for you, ${JSON.stringify(result)}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
