const express = require("express")
// require("express-async-errors");
require("dotenv").config();
const mongoose = require("mongoose")
const jws = require("jsonwebtoken")
const app = express()
const passport = require("passport")
const localStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const methodOverride = require("method-override")
const User = require("./app/user/model")
const db = process.env.DB_URL
main().catch(err=> console.log(err))

async function main(){
  await mongoose.connect(db)
}
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSession({
    secret:"what's this whole life about",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())






let userRoutes = require("./app/user/routes")
app.use(userRoutes)

let forgottenpassRoutes = require("./app/forgottenpass/routes")
app.use(forgottenpassRoutes)

app.listen(3000, (err)=>{
  console.log("server started")
})