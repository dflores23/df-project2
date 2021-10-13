//___________________________
//import dependencies
//___________________________
const express = require("express");
const Help = require("../models/help")

//___________________________
//create Route
//___________________________
const router = express.Router()

// ___________________________
// router middleware
// ___________________________ 
router.use((req, res, next)=> {
    if(req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login")
    }
})


//___________________________
//Routes
//___________________________

router.get("/seed", (req, res) => {
    const startHelp = [
        { name: "Juan", last: "Moreno", blood: "O+", birth: "12/12/21", allergies: " penicillin", otherAllergies: "pollen", conditions: "diabetes", dnr: "true", emergencyName: "Mama", emergencyNumber: "808" },
        { name: "Pancho", last: "Soplas", blood: "A+", birth: "12/12/21", allergies: " penicillin", otherAllergies: "pollen", conditions: "diabetes", dnr: "true", emergencyName: "Mama", emergencyNumber: "808" },
        { name: "Panfilo", last: "Gutierrez", blood: "B+", birth: "12/12/21", allergies: " penicillin", otherAllergies: "pollen", conditions: "diabetes", dnr: "true", emergencyName: "Mama", emergencyNumber: "808" }
    ]
    Help.deleteMany({}, (err, data) => {
        Help.create(startHelps, (err, data) => {
            res.json(data)
        })
    })
})

router.get("/", (req, res) => {
    Help.find({username: req.session.username}, (err, helps) => {
        res.render("helps/index.ejs", { helps })
    })
})

//new route
router.get("/new", (req, res) => {
    res.render("helps/new.ejs");
});

// create route
router.post("/", (req, res) => {
    req.body.dnr = req.body.dnr === "on" ? true : false;
    req.body.username = req.session.username
    Help.create(req.body, (err, help) => {
        res.redirect("/helps");
    });
});


// edit route
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the help from the database
    Help.findById(id, (err, help) => {
        // render template and send it help
        res.render("helps/edit.ejs", { help });
    });
});

//update route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // check if the dnr property should be true or false
    req.body.dnr = req.body.dnr === "on" ? true : false;
    // update the dnr
    Help.findByIdAndUpdate(id, req.body, { new: true }, (err, help) => {
        // redirect user back to main page 
        res.redirect("/helps");
    });
});

router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the help
    Help.findByIdAndRemove(id, (err, help) => {
        // redirect user back to index page
        res.redirect("/helps");
    });
});

// The show route only shows one thing (get => /helps/:id)
router.get("/:id", (req, res) => {
    // grabs the id from params
    const id = req.params.id
    Help.findById(id, (err, help) => {
        //render the template
        res.render("helps/show.ejs", { help })
    })
})


//___________________________
//export the router
//___________________________
module.exports = router