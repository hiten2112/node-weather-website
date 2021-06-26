const request  = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/a51a87cec154eb5721cd83621439c325/'+latitude + ',' + longitude
    request({url,json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather sevice',undefined)
        }else if(body.error){
            callback('unable to find the location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast