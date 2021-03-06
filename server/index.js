require('dotenv').config()
const { default: axios } = require('axios')
const express = require('express')
const session = require('express-session')
const covidCtrl = require('./controllers/covidTrackingProject')
const tweetCtrl = require('./controllers/twitterControl')
const app = express()
const {SERVER_PORT,SESSION_SECRET}=process.env

app.use(express.json())

app.use(express.static(`${__dirname}/../build`))

// app.use(
//     session({
//         resave:false,
//         saveUninitialized:true,
//         secret:SESSION_SECRET,
//         cookie:{maxAge:1000*60}
//     })
// )



//Main controller using the Covid Tracking Project API
// app.get(`/api/daily/national`, covidCtrl.getNationalDaily) 

app.get(`/api/daily/states`, covidCtrl.getStatesDaily)
app.get('/api/natBackup', covidCtrl.getNatBackup)

app.get('/api/tweets', tweetCtrl.getCovidTweets)



app.listen(SERVER_PORT, ()=>{
    console.log(`Serving on port ${SERVER_PORT}`)
})