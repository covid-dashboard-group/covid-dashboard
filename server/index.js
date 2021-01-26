require('dotenv').config()
const express = require('express')
const session = require('express-session')
const covidCtrl = require('./controllers/covidTrackingProject')
const app = express()
const {SERVER_PORT,SESSION_SECRET}=process.env
app.use(express.json())

app.use(
    session({
        resave:false,
        saveUninitialized:true,
        secret:SESSION_SECRET,
        cookie:{maxAge:1000*60*60}
    })
)



//Main controller using the Covid Tracking Project API 
app.get(`/api/statesDaily`, covidCtrl.getStatesDaily)

app.listen(SERVER_PORT, ()=>{
    console.log(`Serving on port ${SERVER_PORT}`)
})