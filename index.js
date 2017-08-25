var fs=require("fs");
var proxyspider=require("./proxyspider");
var url="http://www.xicidaili.com/nn",
    url2="http://www.xicidaili.com/nn/2",
    url3="http://www.xicidaili.com/nn/3";
var express = require('express');
var app = express();
var proxy=new proxyspider(url);
    Promise.all([url,url2,url3].map(
        url=>proxy.getPage(url).then(
            data=>proxy.getIPS(data)
        )
    )).then(values=>
        proxy.check([].concat(...values))
    ).then(()=>{
            return proxy.write();
    }).then(value=>{
        proxy.clearValuableIPS();
    })
setInterval(()=>{
    proxy.clearValuableIPS();
    Promise.all([url,url2,url3].map(
        url=>proxy.getPage(url).then(
            data=>proxy.getIPS(data)
        )
    )).then(values=>
        proxy.check([].concat(...values))
    ).then(()=>
        proxy.write()
    )},300000);
app.get("/api/proxy",(req,res)=> {
    res.send(proxy.getValuableProxy());
});
app.listen(8000);