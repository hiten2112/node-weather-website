const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Hiten Patel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Hiten Patel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'you can get help from here',
        title:'Help',
        name: 'Hiten Patel'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}= {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:  req.query.address

            })
        })

    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})




app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Hiten Patel',
        errorMessage:'Help artical not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Hiten Patel',
        errorMessage: 'Page not found'
    })
})







app.listen(3000, () => {
    console.log('server is up on the port 3000')
}) 