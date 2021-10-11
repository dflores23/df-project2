const { config } = require("dotenv")

require(`dotenv`).config()

// console.log(process.env.MONGODB_URI)

//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const db = mongoose.connection;
const morgan = require("morgan")
const app = express();

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Connect to Mongo 

mongoose.connect(MONGODB_URI , CONFIG);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongodb not running?'));
db.on('connected', () => console.log('mongodb connected: '));
db.on('disconnected', () => console.log('mongodb disconnected'));

//__________________
// Model
//____________________
const {Schema, model}= mongoose

 const helpSchema = new Schema({
  name:String, 
  last:String,
  blood:String,
  birth: String,
  allergies:String,
  otherAllergies: String,
  conditions: String,
  dnr: Boolean ,
  emergencyName: String, 
  emergencyNumber: Number
})

const Help = model("Help", helpSchema)

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(morgan('tiny'))
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//____________________


app.get("/helps/seed", (req, res) => {
  const startHelp = [
    {name: "David", last: "Flores", blood: "O+", birth: "12/12/87",allergies: " penicillin", otherAllergies: "pollen", conditions: "diabetes", dnr: "true", econtact:45},
    {name: "Pancho", last: "Soplas", blood: "o+", birth: "12/12/21",allergies:" penicillin", conditions: "diabetes", dnr: "true", econtact:45},
    {name: "Panfilo", last: "Gutierrez", blood: "o+", birth: "12/12/21",allergies:" penicillin", conditions: "diabetes", dnr: "true", econtact:45}
  ]
  Help.deleteMany({}, (err, data) => {
    Help.create(startHelp, (err, data) => {
      res.json(data)
    })
  })
})


app.get("/helps", (req, res)=> {
  Help.find({}, (err, helps)=> {
  res.render("helps/index.ejs", {helps})
  })
})

//new route
app.get("/helps/new", (req, res) => {
  res.render("helps/new.ejs");
});

// create route
app.post("/helps", (req, res) => {
  req.body.dnr = req.body.dnr === "on" ? true : false;
  Help.create(req.body, (err, help) => {
    res.redirect("/helps");
  });
});


// edit route
app.get("/helps/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the help from the database
  Help.findById(id, (err, help) => {
    // render template and send it help
    res.render("helps/edit.ejs", {help});
  });
});

//update route
app.put("/helps/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.dnr = req.body.dnr === "on" ? true : false;
  // update the fruit
  Help.findByIdAndUpdate(id, req.body, { new: true }, (err, help) => {
    // redirect user back to main page when fruit
    res.redirect("/helps");
  });
});

app.delete("/helps/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Help.findByIdAndRemove(id, (err, help) => {
    // redirect user back to index page
    res.redirect("/helps");
  });
});

// The show route only shows one thing (get => /helps/:id)
app.get("/helps/:id", (req, res)=> {
  // grabs the id from params
  const id = req.params.id
  Help.findById(id, (err, help)=> {
      //render the template
      res.render("helps/show.ejs", {help})
  })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));

