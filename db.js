const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/User")
  .then(() => console.log("Connect SuccessFully!!!"))
  .catch((err) => console.log(err));