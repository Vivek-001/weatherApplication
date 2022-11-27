

var fetchWeather = "/weather";
var featchDaily="/forecast"
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const maintemp=document.querySelector('h2.main-temp');
const weatherIcon = document.querySelectorAll('img.iconimage');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelectorAll('h4.display-3');

const weatherCondi=document.querySelectorAll('p.condition');
const realtim=document.querySelectorAll('p.realt');
const locationElement = document.querySelector('.weather-location');

const dateElement = document.querySelector('.weather-date');

const daytemp=document.querySelectorAll('p.mb-1');
const date2=document.querySelectorAll('p.mb-0');
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const d = new Date();
const main_date=document.querySelector('h3.main-date');

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);
console.log(dateElement.innerHTML);

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(search.value=="")
    {
        alert("must enter");
        return;
    }
    var url2="https://api.openweathermap.org/data/2.5/weather?q="+search.value+"&appid=8566691febb13e799419fedf122d5f43";
    function UrlExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        
        http.send();
        //console.log(http.status)
        if (http.status != 404)
            return true;
        else
            return false;
    }
    if(UrlExists(url2)==false)
    {
        return;
    }
  
    fetch(url2)
    .then(response => response.json())
    .then(data =>{
        if(!data.main)
        {
            
           maintemp.innerHTML="";
            return;
        }
        setTimeout(function(){
            maintemp.innerHTML="Feels like "+"<br></br>"+changeDegreeCel(data.main.feels_like);
        },1000);
      
  });
    locationElement.innerHTML = "Loading...";
  // tempElement.textContent = "";
  //  weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    const dailyApi=featchDaily+ "?address=" + search.value;
  //  console.log(dailyApi);
    fetch(locationApi).then(response => {
       // console.log(response)
        response.json().then(data => {
            if(data.error) {
                console.log("Error found");
                locationElement.textContent =data.error;
            } 
           else {
               // console.log(data)
               
                
                locationElement.textContent =data.location;
                search.value="";
                for(let i=0;i<8;i++)
                {
                   var v=data.description.des[i];
                   tempElement[i].textContent = changeDegreeCel(data.temperature.arr[i]);
                   weatherCondi[i].textContent=data.description.des[i];
                  // console.log(data.realtime.timeextend[i]);
                   var urls="https://openweathermap.org/img/wn/"+data.icon.pod[i]+"@2x.png";
                   weatherIcon[i].setAttribute("src",urls);
                   realtim[i].textContent=data.realtime.timeextend[i];
              /*  if(v=="clear sky")
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/01d@2x.png");
                }
                if(v=="few clouds")
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/02d@2x.png");
                }
                if(v=="scattered clouds")
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/03d@2x.png");
                }
                if(v=="broken clouds" || v=="overcast clouds")
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/04d@2x.png");
                }
                if(v.includes("drizzle"))
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/09d@2x.png");
                }
                if(v.includes("rain"))
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/10d@2x.png");
                }
                if(v.includes("thunderstorm"))
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/11d@2x.png");
                }
                if(v.includes("snow"))
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/13d@2x.png");
                }
               else if(v=="mist" || v=="smoke" || v=="Haze")
                {
                   // console.log(weatherIcon.src);
                  weatherIcon[i].setAttribute("src","https://openweathermap.org/img/wn/50d@2x.png");
                }*/
                }
             /*   day[0].innerHTML=changeDegreeCel(data.temperature.day2);
                day[1].innerHTML=changeDegreeCel(data.temperature.day3);
                day[2].innerHTML=changeDegreeCel(data.temperature.day4);
                day[3].innerHTML=changeDegreeCel(data.temperature.day5);
                day[4].innerHTML=changeDegreeCel(data.temperature.day6);
                day[5].innerHTML=changeDegreeCel(data.temperature.day7);
                day[6].innerHTML=changeDegreeCel(data.temperature.day8);
                */
               for(let i=0;i<4;i++)
               {
                  // console.log(data.week.weekly[i]);
                   daytemp[i].innerHTML="Ave temp "+data.week.weekly[i]+'C';
               }
                let da= d.getDay();
                main_date.innerHTML=weekday[da];
                date2[0].innerHTML=weekday[(da+1)%7].substring(0,3);
                date2[1].innerHTML=weekday[(da+2)%7].substring(0,3);
                date2[2].innerHTML=weekday[(da+3)%7].substring(0,3);
                date2[3].innerHTML=weekday[(da+4)%7].substring(0,3);
                
              
              //  weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
    
   
})
const changeDegreeCel=(temperature)=>{
    return (temperature- 273.5).toFixed(2) + String.fromCharCode(176);
}