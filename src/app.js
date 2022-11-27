const exp = require('constants');
const express=require('express');
const hbs=require('hbs');
const path=require('path');
const app=express();
const port=process.env.PORT || 3000;

const weatherData=require('../utils/weatherData');
const weatherDataDaily=require('../utils/weatherDataDaily');
const publicStaticDirPath=path.join(__dirname,'../public');

var viewsPath=path.join(__dirname,'../template/views');

var partialPath=path.join(__dirname,'../template/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicStaticDirPath));

app.get('',(req,res)=>{
   res.render('index',{
       title:"Weather-app"
   })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address;
  //  console.log(address)
    if(!address)
    {
        res.send({
            error:"You must enter address in search text box"
        })
    }
    weatherData(address,(error,{temperature,description,location,icon,realtime,week}={})=>{
       // console.log(error+"error");
        if(error)
        {
            return res.send({
                error
            })
        }
        //console.log(temperature,description,cityName);
        else{
        res.send({
            temperature,
            description,
            location,
            icon,
            realtime,
            week
        })
    }
    
    })

  
})


app.get('*',(req,res)=>{
    res.render('404',{
       title:"Page not found"
    })
})
app.listen(port,()=>{
    console.log("Server is running at port ",port);
})