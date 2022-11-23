const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      // unique: false,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);
