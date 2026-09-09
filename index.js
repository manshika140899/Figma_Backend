// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(express.json());
// app.use(express.static("public"));
// app.use(cors());

// const browseSec = require("./routes/browseSec");

// const gridCard = require("./routes/gridCard");

// app.use("/browseSec", browseSec);

// app.use("/gridCard", gridCard);

// const asgaardSofa = require("./routes/asgaardSofa");
// app.use("/asgaardSofa", asgaardSofa);

// const shop = require("./routes/shop");

// app.use("/shop", shop);
// const orders = require("./routes/orders");

// app.use("/orders",orders)

// app.use(express.static("public"));

// const relatedProducts = require("./routes/relatedProducts");

// app.use("/relatedProducts", relatedProducts);

// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });



// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// const browseSec = require("./routes/browseSec");
// const gridCard = require("./routes/gridCard");
// const asgaardSofa = require("./routes/asgaardSofa");
// const shop = require("./routes/shop");
// const orders = require("./routes/orders");
// const relatedProducts = require("./routes/relatedProducts");

// app.use("/browseSec", browseSec);
// app.use("/gridCard", gridCard);
// app.use("/asgaardSofa", asgaardSofa);
// app.use("/shop", shop);
// app.use("/orders", orders);
// app.use("/relatedProducts", relatedProducts);

// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// const browseSec = require("./routes/browseSec");
// const gridCard = require("./routes/gridCard");
// const asgaardSofa = require("./routes/asgaardSofa");
// const shop = require("./routes/shop");
// const orders = require("./routes/orders");
// const relatedProducts = require("./routes/relatedProducts");

// app.use("/browseSec", browseSec);
// app.use("/gridCard", gridCard);
// app.use("/asgaardSofa", asgaardSofa);
// app.use("/shop", shop);
// app.use("/orders", orders);
// app.use("/relatedProducts", relatedProducts);

// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// if (require.main === module) {
//   app.listen(5000, () => {
//     console.log("Server running on port 5000");
//   });
// }

// module.exports = app;



const express = require("express");

const fs = require("fs");

const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));





app.get("/debug-files", (req, res) => {
  const publicPath = path.join(__dirname, "public");
  const imagesPath = path.join(__dirname, "public", "images");

  res.json({
    dirname: __dirname,
    publicExists: fs.existsSync(publicPath),
    imagesExists: fs.existsSync(imagesPath),
    browserSec1Exists: fs.existsSync(
      path.join(imagesPath, "BrowserSec1.png")
    ),
    files: fs.existsSync(imagesPath)
      ? fs.readdirSync(imagesPath).slice(0, 20)
      : [],
  });
});





// ===============================
// ROUTES
// ===============================

const browseSec = require("./routes/browseSec");
const gridCard = require("./routes/gridCard");
const asgaardSofa = require("./routes/asgaardSofa");
const shop = require("./routes/shop");
const orders = require("./routes/orders");
const relatedProducts = require("./routes/relatedProducts");

app.use("/browseSec", browseSec);
app.use("/gridCard", gridCard);
app.use("/asgaardSofa", asgaardSofa);
app.use("/shop", shop);
app.use("/relatedProducts", relatedProducts);

// ===============================
// ORDERS
// ===============================

// Explicit live POST route
app.post("/orders", (req, res) => {
  try {
    const newOrder = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    console.log("New Order:", newOrder);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order error:", error);

    return res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
});

// Orders GET test
app.get("/orders", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Orders GET is working",
  });
});

// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ===============================
// LOCAL SERVER
// ===============================

if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}

// ===============================
// VERCEL
// ===============================

module.exports = app;