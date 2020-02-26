const axios = require("axios");

const api ={
    getStarts(username){
        axios.get("https://api.github.com/users/" +username +"/starred")
        .then(function(res){
            //console.log(res)
            //var starCount = res.data[0].stargazers_count;
            var starCount = 0;
            return starCount;
        })
        .catch(err =>{
            console.log("err in getting stars info : "+err)
        })
    },
    getUser(username){
        return axios.get("https://api.github.com/users/" +username )
        .catch(err =>{
            console.log(err)
        })
    }
}

module.exports = api;