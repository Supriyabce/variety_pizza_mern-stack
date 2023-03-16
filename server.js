const express = require('express');
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/config");
require('colors')
const morgan = require('morgan')
const path = require('path');
import { fileURLToPath } from 'url';


//config dotenv
dotenv.config();

//connection mongodb
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const app =express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use("/api/pizzas",require("./routes/pizzaRoute"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/orders",require("./routes/orderRoute"));
app.use(express.static(path.join(__dirname,'/client/build')));

//
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("<h1>Hello From Node Server vai nodemon</h1>");
//   });
// }
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,"/client/build/index.html"));
});

//run listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`
      .bgMagenta.white
  );
});
