const express = require("express")
const app = express()
const PORT = 8000
const cors = require('cors')
const DB = "pirates"
//install express, mongoose, and cors


// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config")(DB)
app.use(cors())
app.use(express.json(), express.urlencoded({ extended: true }))

// This is where we import the users routes function from our user.routes.js file
const AllMyUserRoutes = require("./routes/user.routes")
AllMyUserRoutes(app)

app.listen(PORT, () => console.log("The server is all fired up on port " + PORT))
