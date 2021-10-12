//___________________
//Import dependencies
//___________________
const mongoose = require("./connection")
const Help = require("./help")

//___________________
//seed code
//___________________

mongoose.connection.on("open", () => {
    // Run database queries in this function

    //create array of starter
    const startHelp = [
        { name: "Juan", last: "Moreno", blood: "O+", birth: "12/12/21", allergies: " penicillin", otherAllergies: "pollen", conditions: "diabetes", dnr: "true", emergencyName: "Mama", emergencyNumber: "808" },
        { name: "Pancho", last: "Soplas", blood: "A+", birth: "12/12/21", allergies: " penicillin", otherAllergies: "pollen", conditions: "diabetes", dnr: "true", emergencyName: "Mama", emergencyNumber: "808" },
        { name: "Panfilo", last: "Gutierrez", blood: "B+", birth: "12/12/21", allergies: " penicillin", otherAllergies: "pollen", conditions: "diabetes", dnr: "true", emergencyName: "Mama", emergencyNumber: "808" }
    ]
    //Delete all helps
    Help.deleteMany({}, (err, data) => {
        //seed starter help
        Help.create(startHelp, (err, data) => {
            console.log("----------Helps Created---------")
            console.log(data)
            console.log("----------Helps Created---------")
        })
    })
})
