const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { Z_ASCII } = require("zlib")
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlers engine and views location
app.set('view engine','hbs')
app.set("views", viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPathDirectory))


app.get("",(req,res) => {
    res.render("index",{
        title: "Weather App",
        name: "Pradeep Parajuli"
    })
})

app.get("/about", (req,res) => {
    res.render("about",{
        name: "Pradeep Parajuli",
    title: "About"})
})

app.get("/help",(req,res) => {
    res.render("help", {
        title: "Help",
        message: "If you need any help feel free to contact, I am 24/7 with you.",
        name: 'Pradeep Parajuli'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide location'
        })
    }
    console.log(req.query)

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: "It is raining",
    //     location: 'Delhi',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
     res.render('404', {
         title: 'Error 404',
         message: 'Help article not found',
         name: 'Pradeep Parajuli'
     })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: "Page not found",
        name: 'Pradeep Parajuli'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Pradeep Parajuli"
//     },{
//         courseCordinator: "Andrew"
//     }])
// })

// app.get("/about", (req,res) => {
//     res.send("<h1>About</h1>")
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("server started on port: ",PORT))