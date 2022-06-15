const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Abhi'
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title: 'About Me',
        name: 'Abhiyankar'
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        helpText: 'Providing the help',
        title: 'Help',
        name: 'Abhi'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'Abhi',
        errorMessage: 'Help Article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'Abhi',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})