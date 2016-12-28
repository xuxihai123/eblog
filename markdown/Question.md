### web前端面试题
1. 地址栏里面输入网址，后面发生了什么？
2. js里面函数是对象吗？有哪些常用的方法和属性？
3. 原型链的作用是什么？
4. jquery里面重要的概念：settle,defered,data,ajax,callback,event
5. promise,$q,defered
6. http请求方式,get,post,put,option,delete
7. 数据通讯方式,json,xml
8. session 和cookie,localstorage,sessionstorage区别
9. regex
10. html5特性
     绘画 canvas;
     用于媒介回放的 video 和 audio 元素;
     本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
     sessionStorage 的数据在浏览器关闭后自动删除;
     语意化更好的内容元素，比如 article、footer、header、nav、section;
     表单控件，calendar、date、time、email、url、search;
     新的技术webworker, websocket, Geolocation;

11. http状态码举例
12. 书籍阅读
13. 事件委托概念
14. nodejs 使用情况，express使用情况
15. IE8创建ajax用的是哪个类xmlRequest,ActiveXObject
16. web页面性能优化?
代码优化：去除冗余代码、变量统一声明、减少对象属性查找(原型连即是优点也是缺点)、虚拟Dom操作(减少DOMreflow时间)
非代码优化：压缩合并,cdn,设置响应头缓存js和图片文件，apache或nginx启用gzip压缩，和设置页面过期时间，后端模板引擎缓存
17. HTML5的form如何关闭自动完成功能？给不想要提示的 form 或某个 input 设置为 autocomplete=off。
18. 如何实现浏览器内多个标签页之间的通信? (阿里)
  WebSocket、SharedWorker；
  也可以调用localstorge、cookies等本地存储方式；

  localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，
  我们通过监听事件，控制它的值来进行页面信息通信；
  注意quirks：Safari 在无痕模式下设置localstorge值时会抛出 QuotaExceededError 的异常；
19. 网页验证码是干嘛的，是为了解决什么安全问题。
 区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水；
 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。