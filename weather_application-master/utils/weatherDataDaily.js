const request=require('request');
const constants=require('../config');

const weatherDataDaily=(address,callback)=>{
    const url=constants.openWeatherMap.BASE_URL_D + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    console.log(url);
    callback(true);
       // console.log(body);
}
module.exports=weatherDataDaily;