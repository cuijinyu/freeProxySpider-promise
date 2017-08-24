var fs=require("fs");
var proxyspider=require("./proxyspider");
var url="http://www.xicidaili.com/nn";

var proxy=new proxyspider(url);
proxy.getPage()
    .then((data)=>{
        proxy.getIPS(data);
    }).then(()=>{
        proxy.check()
            .then(()=>{
                proxy.write();
            }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
    console.log(err);
})