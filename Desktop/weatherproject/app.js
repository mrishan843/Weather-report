const express = require("express");
const bodyParser = require("body-parser")
const https =require("https");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

})
app.post("/", function(req,res){
    var city1 = req.body.city;
    
    const appid = "79a44405b5dbb2fc928075bada8042ce";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city1+"&appid="+appid+"&units=metric";
    https.get(url,function(response){
        console.log(response);
       
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png';
            res.write("<h1>The temperature is "+ temp + " degrees celcius<br/> The weather description is "+ description + ".</h1><br/>");
            res.write("<img src = "+iconURL+">");
            res.send();
            
        })
       
    }) 
   
});
app.listen(3000, function(){
    console.log("Server is running...");
})
