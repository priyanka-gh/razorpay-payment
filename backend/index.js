const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import the body-parser package

const razorPayInstance = new Razorpay({
  key_id: "rzp_test_dH5WLS0e5gOSS0",
  key_secret: "ccVBfR4mw2AaPy0rKEtsvyzv",
});

const app = express();
const PORT = process.env.PORT || "5000";

// Enable CORS for all routes
app.use(cors());

// Add the body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});

app.post("/createOrder", (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  razorPayInstance.orders.create(
    { amount, currency, receipt, notes },
    (err, order) => {
      if (!err) {
        res.json(order);
      } else {
        res.send(err);
      }
    }
  );
});
