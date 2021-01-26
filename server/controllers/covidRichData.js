const axios= require('axios')

module.exports={
    getCasesOverTime:async(req,res)=>{
        console.log('getting state daily')
        //if this endpoint is hit again, provide last session data
        if(req.session.data){
            console.log('session already exists')
            return res.status(200).send(req.session.statesDaily)

        }
        //CASES OVER TIME IN THE US 
        else{
            console.log('Fetching data...')
            await axios.get(`https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=US)&format=amcharts&limit=5000`)
             .then(res=>{
                 req.session.statesDaily=res.data
                })
                .catch(e=>console.log(e))                
                return res.status(200).send(req.session.statesDaily)
        }
    }
}