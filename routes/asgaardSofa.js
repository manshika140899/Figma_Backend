const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(
  process.cwd(),
  "data",
  "asgaardSofa.json"
);

router.get("/", (req, res) => {

  fs.readFile(filePath, "utf-8", (err, file) => {

    if (err) {
      return res.status(500).send("Error reading Asgaard Sofa data");
    }

    const data = JSON.parse(file);

    res.json(data);

  });

});


router.get("/:id", (req, res) => {

  fs.readFile(filePath, "utf-8", (err, file) => {

    if (err) {
      return res.status(500).send("Error reading Asgaard Sofa data");
    }

    const data = JSON.parse(file);

 const product = data.find(
  (item) => String(item.id) === String(req.params.id)
);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.json(product);

  });

});



router.post("/", (req, res) => {
  const orderData = req.body;

  const orderFilePath = path.join(process.cwd(),"data","order.json");

  fs.readFile(orderFilePath, "utf-8", (err, file) => {

    if (err) {
      return res.status(500).send("Error reading order data");
    }

    let orders = JSON.parse(file);

    orders.push(orderData);

    fs.writeFile(
      orderFilePath,
      JSON.stringify(orders, null, 2),
      (err) => {

        if (err) {
          return res.status(500).send("Error saving order");
        }

        res.json({
          message: "Order added successfully",
          order: orderData
        });

      }
    );
  });
});

module.exports = router;