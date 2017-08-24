var fs=require("fs");
var proxyspider=require("./proxyspider");
var url="http://www.xicidaili.com/nn",
    url2="http://www.xicidaili.com/nn/2",
    url3="http://www.xicidaili.com/nn/3";
var express = require('express');
var app = express();
var proxy=new proxyspider(url);
proxy.getPage()
    .then((data)=>{
        proxy.getIPS(data);
    }).then(()=>{
    return proxy.check()
}).then(()=>{
    return proxy.getPage(url2)
}).then((data)=>{
    proxy.getIPS(data)
}).then(()=>{
    return proxy.check()
}).then(()=>{
    return proxy.getPage(url3)
}).then((data)=>{
    proxy.getIPS(data)
}).then(()=>{
    return proxy.check()
}).then(()=>{
    proxy.write();
}).catch((err)=>{
    console.log(err);
});
setInterval(()=>{
    proxy.clearValuableIPS();
    proxy.getPage()
        .then((data)=>{
            proxy.getIPS(data);
        }).then(()=>{
        return proxy.check()
    }).then(()=>{
        return proxy.getPage(url2)
    }).then((data)=>{
        proxy.getIPS(data)
    }).then(()=>{
        return proxy.check()
    }).then(()=>{
        return proxy.getPage(url3)
    }).then((data)=>{
        proxy.getIPS(data)
    }).then(()=>{
        return proxy.check()
    }).then(()=>{
        proxy.write();
    }).catch((err)=>{
        console.log(err);
    });
    },300000);
app.get("/api/proxy",(req,res)=> {
    res.send(proxy.getValuableProxy());
});
app.listen(8000);