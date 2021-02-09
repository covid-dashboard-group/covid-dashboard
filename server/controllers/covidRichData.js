const axios= require('axios')

module.exports={
    getTimes:async(req,res)=>{
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=covid-19 united states&api-key=${REACT_APP_TIMES_NEWS}`)
    .then(res=>{
      console.log(res.data)
      let results = res.data.response.docs.map(e=>({
        source:{name:'https://www.nytimes.com/'},
        title:e.abstract,
        url:e.web_url,
        urlToImage:'https://www.nytimes.com/'+e.multimedia[0].url,
        publishedAt:e.pub_date
      })
      )
      return res.status(200).send(results)
    })
}
    
}