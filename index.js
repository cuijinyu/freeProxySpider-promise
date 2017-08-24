var fs=require("fs");
var proxyspider=require("./proxyspider");
var url="http://www.xicidaili.com/nn";
var express = require('express');
var app = express();
var proxy=new proxyspider(url);
proxy.getPage()
    .then((data)=>{
        proxy.getIPS(data);
    }).then(()=>{
    proxy.check().then(()=>{
        proxy.write();
    })
}).catch((err)=>{
    console.log(err);
});
setInterval(()=>{
    proxy.getPage()
        .then((data)=>{
            proxy.getIPS(data);
        }).then(()=>{
        proxy.check().then(()=>{
            proxy.write();
        })
    }).catch((err)=>{
            console.log(err);
        });
},300000);
app.get("/api/proxy",(req,res)=> {
    res.send(proxy.getValuableProxy());
})
app.listen(8000);