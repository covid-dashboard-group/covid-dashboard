const axios= require('axios')
const moment=require('moment')

module.exports={
    getStatesDaily:async(req,res)=>{
        console.log('getting state daily')        
        console.log('Fetching data...')
       let results=await axios.get('https://covidtracking.com/api/states')
        .then(res=>res.data)
        .catch(e=>console.log(e))      

       return res.status(200).send(results)
    },
    getNatBackup:async(req,res)=>{
        let results=await axios.get('http://covidtracking.com/api/us')
        .then(res=>res.data)
        .catch(e=>console.log(e))
        return res.status(200).send(results)
    }
    
}