const axios= require('axios')
const moment=require('moment')

module.exports={
    getStatesDaily:async(req,res)=>{
        console.log('getting state daily')
        //if this endpoint is hit again, provide last session data
        if(req.session.statesDaily){
            console.log('session already exists')
            return res.status(200).send(req.session.statesDaily)

        }
        //if no session get new data
        else{
            console.log('Fetching data...')
            await axios.get('https://covidtracking.com/api/states/daily')
             .then(res=>{
                 req.session.statesDaily=res.data.map(e=>({...e,"date":moment(e["date"],['YYYYMMDD']).format("yyyy-MM-DD")}))
                })
                .catch(e=>console.log(e))                
                return res.status(200).send(req.session.statesDaily)
        }
    }
}