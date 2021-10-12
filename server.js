//___________________
//Dependencies
//___________________
require(`dotenv`).config()
const express = require('express');
const morgan = require("morgan")
const methodOverride = require('method-override');
const HelpRouter = require("./controllers/help")
const UserRouter = require("./controllers/user")
//___________________
//create App objet
//___________________
const app = express();

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Middleware
//___________________
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'))
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use("/helps", HelpRouter)
app.use("/user", UserRouter)

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));