const request = require("request")

const forecast = (latitude,longitude,callback) => {
    const apiKey = "b44491ecbfa46f59abf60c20c37e22c8"
    const url = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=10&units=metric&appid=${apiKey}`
    request ({uri: url, json: true}, (error,response) => {
        if  (error) {
            callback(" Unable to connect to Service! ",undefined)
        } else if (response.body.cod >= 400) {
            callback("Unable to find data. Try another search.",undefined)
        }else{
            
            const body = response.body
            const data1 = body.list[0]
            const data = `It's currently ${data1.main.temp} degree Celsius out. There is a chance ${data1.weather[0].description} .`

            callback(undefined,data)
            }
    })
}

module.exports = forecast