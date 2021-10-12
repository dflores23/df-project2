//___________________
//Import dependencies
//___________________
const mongoose = require("./connection")

//__________________
// Model
//____________________
const { Schema, model } = mongoose

const userSchema = new Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true}
})

const User = model("User", userSchema)
//___________________
//Export Model
//___________________
module.exports = User