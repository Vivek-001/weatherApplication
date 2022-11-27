const request=require('request');
const constants=require('../config');

const weatherData=(address,callback)=>{
     const url=constants.openWeatherMap.BASE_URL_D + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    // console.log(url);
   // const url2=constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
     request({url,json:true},(error,{body})=>{
       //  console.log(body);
         if(error)
         {
             callback("Can't fetched data from open weather api ",undefined);
         }
        else if(!body.list || !body.city) {
           // console.log("LL");
            callback("Unable to find required data, try another location", undefined);
        }
         else{
            
            var arr=new Array();
            var des=new Array();
            var weekly=new Array();
            let u=0;
            const changeDegreeCel=(temperature)=>{
                return (temperature- 273.5);
            }
           // console.log(body.list.length)
            for(let i=0;i<4;i++)
            {
                let g=0;
                for(let j=0;j<8;j++)
                {
                    
                     g+=changeDegreeCel(body.list[i*8+j].main.temp);
                }
                //console.log("  "+g+"  ");
                g/=8;
                weekly[i]=g.toFixed(2);
            }
            for(let i=0;i<8;i++)
            {
                arr[i]=body.list[i].main.temp;
            }
            for(let i=0;i<8;i++)
            {
                des[i]=body.list[i].weather[0].description;
              //  console.log(des[i]);
            }
            var pod=new Array();
            for(let i=0;i<8;i++)
            {
                pod[i]=body.list[i].weather[0].icon;
              //  console.log(des[i]);
            }
            var timeextend=new Array();

            for(let i=0;i<8;i++)
            {

                timeextend[i]=(body.list[i].dt_txt).substring(11);
                //console.log(timeextend);
            }
             callback(undefined,{
                 temperature:{
                    arr
                 },
                 description:{
                    des
                 },
                 location:body.city.name,
                 icon:{
                     pod
                 },
                 realtime:{
                   timeextend
                 },
                 week:{
                     weekly
                 }

             })
         }
        // console.log(body);
     });
    
}
module.exports=weatherData;