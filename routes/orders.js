const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(process.cwd(), "data","orders.json");


router.get("/", (req, res) => {

  fs.readFile(filePath, "utf-8", (err, file) => {

    if (err) {
      return res
        .status(500)
        .send("Error reading orders data");
    }

    let orders = [];

    try {
      orders = JSON.parse(file);
    } catch (error) {
      orders = [];
    }

    const newOrder = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    fs.writeFile(
      filePath,
      JSON.stringify(orders, null, 2),
      (err) => {

        if (err) {
          return res
            .status(500)
            .send("Error saving order");
        }

        res.status(201).json({
          message: "Order placed successfully",
          order: newOrder
        });

      }
    );

  });

});


router.get("/", (req, res) => {

  fs.readFile(filePath, "utf-8", (err, file) => {

    if (err) {
      return res
        .status(500)
        .send("Error reading orders data");
    }

    const orders = JSON.parse(file);

    res.json(orders);

  });

});


module.exports = router;