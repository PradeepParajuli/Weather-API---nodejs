const request = require("request")


const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibGF0aXR1ZGUtbG9uZ2l0dWRlIiwiYSI6ImNrYWt3aXpzbDA0aGQycXF3Nm9kaXdiMXIifQ.bv-mB_WPEkLDQMM1Uk1FwA`
    request ({uri: url, json: true}, (error,response) => {
        if  (error) {
            callback(" Unable to connect to Service! ",undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try another search.",undefined)
        }else{
            const features = response.body.features[0]
            const data = {
                latitude:features.center[1],
                longitude: features.center[0],
                location: features.place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode
