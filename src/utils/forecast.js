const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aabfea22674b20674f9781e43313eab0&query='+latitude+','+longitude+'&units=f'

    request({url, json:true},(error,{body})=>{
        if(error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast