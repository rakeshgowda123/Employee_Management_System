const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

//importing the components
const EmployeeModel = require("./Models/EmployeeModel");
const EmployeeRouter = require("./Routes/EmployeeRoutes");
const bodyaparser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

///actual code starts here
require("./Models/db");
app.use(cors()); // Allows all origins
app.use(bodyaparser.json());

app.get("/", (req, res) => {
  res.send("Employee management server is running");
});

app.use("/api/employees", EmployeeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
