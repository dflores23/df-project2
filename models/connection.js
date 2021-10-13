//_________________
// Import dependencies
//__________________
require("dotenv").config()
const mongoose = require("mongoose")
//_____________________________________________________________
// How to connect to the database either via heroku or locally
//_____________________________________________________________
const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
//_________________
// Connect to Mongo
//_________________ 

mongoose.connect(MONGODB_URI, CONFIG);

const db = mongoose.connection;
// Error / success
db.on('connected', () => console.log('mongodb connected: '));
db.on('disconnected', () => console.log('mongodb disconnected'));
db.on('error', (err) => console.log(err.message + ' is mongodb not running?'));

//_________________
// Export mongoose
//_________________

module.exports = mongoose