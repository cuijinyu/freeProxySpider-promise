/**
 * Created by 崔晋瑜 on 2017/8/23.
 */
var cheerio=require('cheerio'),
    request=require("request"),
    fs=require("fs"),
    proxy=require("proxy");

var proxyspider=function(url){
    this.url=url;
    this.IPS=[];
    this.valuableIPS=[];
};
//获取网页
proxyspider.prototype.getPage=function(url){
    var that=this;
    if(url)
    {
        that.url=url;
    }
    return new Promise((resolve,reject)=>{
        request.get({
            url:that.url,
            headers:{
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
            }
        },(err,res,body)=> {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log("进行下一步");
                resolve(body)
            }
        })
    })
};
proxyspider.prototype.getIPS=function(body){
    var that=this;
    return new Promise((resolve,reject)=>{
        //console.log(body);
        $=cheerio.load(body);
        let IPlists=$("#ip_list .odd");
        let speed=[];
        IPlists.each((index,element)=>{
            var ip={
                ip:$(element).children("td").eq(1).text(),
                port:$(element).children("td").eq(2).text()
            };
            if($(element).children("td").eq(6).children("div").attr("title").replace("秒","")<4){
                that.IPS.push(ip);
            }
        });
        console.log(that.IPS);
        resolve();
    })
};
proxyspider.prototype.check=function(){
    var that=this;
    var flag=this.IPS.length;
    var url="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
    return new Promise((resolve,reject)=>{
        for(let i=0;i<that.IPS.length;i++){
            var IP=that.IPS[i];
            console.log(IP)
            request({
                url:that.url,
                proxy:"http://" + IP.ip + ":" + IP.port,
                method:"GET",
                timeout:10000
            },(error,response,body)=>{
                if(!error) {
                    if (response.statusCode == 200) {
                        //这里因为nodejs的异步特性，不能push(proxy),那样会存的都是最后一个
                        that.valuableIPS.push(response.request['proxy']['href']);
                        console.log(response.request['proxy']['href'], "useful!");
                    } else {
                        console.log(response.request['proxy']['href'], "failed!");
                    }
                } else {
                    console.log("One proxy failed!");
                }
                flag--;
                if (flag == 0) {
                    resolve();
                }
            })
        }
    })
};

proxyspider.prototype.write=function(){
    return new Promise((resolve,reject)=>{
            var that=this;
            fs.writeFileSync("proxys.json",JSON.stringify(that.valuableIPS));
            console.log("成功存储");
            resolve();
    })
};

proxyspider.prototype.getValuableProxy=function(){
    return this.valuableIPS;
};

proxyspider.prototype.clearValuableIPS=function () {
    this.valuableIPS=[];
    console.log(`now the IPS are ${this.valuableIPS}`);
};
module.exports=proxyspider;