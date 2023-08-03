const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  centre: {
    type: String,
    required: true,
  },
  postcode: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  profilePhoto:{
    type: String,
  },
});

const user = mongoose.model("userdata", UserSchema);

module.exports = user;
