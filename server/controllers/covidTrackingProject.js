const axios= require('axios')
const moment=require('moment')

module.exports={
    getStatesDaily:async(req,res)=>{
        console.log('getting state daily')
        const {q}=req.query   
        //if this endpoint is hit again, provide last session data
        if(req.session.statesDaily&&!q){
            console.log('session already exists')
            return res.status(200).send(req.session.statesDaily)

        }
        if(req.session.stateData&&q){
            console.log('session query',q)
            
            return res.status(200).send(req.session.stateData[0])
        }
        //if no session get new data. Getting state totals
        else{
            console.log('Fetching data...')
            await axios.get('https://covidtracking.com/api/states')
             .then(res=>{
                 console.log('q in axios request',q)
                 if(q){
                     console.log('query',q)                     
                     req.session.stateData=res.data.filter(e=>e.state===q)
                     console.log(req.session.stateData)
                    }
                    else{
                        req.session.statesDaily=res.data.map(e=>({...e,"date":moment(e["date"],['YYYYMMDD']).format("yyyy-MM-DD")}))
                    }   
                })
                .catch(e=>console.log(e))
                if(q){
                    return res.status(200).send(req.session.stateData[0])
                }
                else{
                    return res.status(200).send(req.session.statesDaily)
                }                
        }
    },
    getNationalDaily:async(req,res)=>{
             
        console.log('getting national data')        
        let results=await axios.get('https://covid-19.dataflowkit.com/v1/usa')
        .then(res=>res.data)
        .catch(e=>console.log(e))
        return res.status(200).send(results)
    }
}