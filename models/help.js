//___________________
//Import dependencies
//___________________
const mongoose = require("./connection")

//__________________
// Model
//____________________
const { Schema, model } = mongoose

const helpSchema = new Schema({
    name: String,
    last: String,
    blood: String,
    birth: String,
    allergies: String,
    otherAllergies: String,
    conditions: String,
    dnr: Boolean,
    emergencyName: String,
    emergencyNumber: Number
})

const Help = model("Help", helpSchema)
//___________________
//Export Model
//___________________
module.exports = Help