# freeProxySpider-promise
the promise version freeProxySpider

把这个改成[freeProxySpider](https://github.com/cuijinyu/freeProxySpider)用promise控制流程，并且提供了API接口

## 程序功能

从百度到的提供免费代理的网站上爬取免费代理，并通过访问静态资源的方式检测代理是否可用，将可用的代理存放到本地文件当中。
## 使用方法:
```
npm install安装依赖
node index.js
```

## API
```
get localhost:8000/api/proxy
```
[线上测试地址](http://crsc.site:8000/api/proxy)
