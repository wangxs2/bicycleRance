(function(e){function t(t){for(var r,o,i=t[0],c=t[1],s=t[2],f=0,p=[];f<i.length;f++)o=i[f],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(p.length)p.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},u=[];function i(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"4340c02f"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"6b48e1ab"}[e]+".css",a=c.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var s=u[i],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===a))return t()}var p=document.getElementsByTagName("style");for(i=0;i<p.length;i++){s=p[i],f=s.getAttribute("data-href");if(f===r||f===a)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],l.parentNode.removeChild(l),n(u)},l.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(l)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,c.nc&&f.setAttribute("nonce",c.nc),f.src=i(e);var p=new Error;s=function(t){f.onerror=f.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",p.name="ChunkLoadError",p.type=r,p.request=o,n[1](p)}a[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var p=0;p<s.length;p++)t(s[p]);var l=f;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},2:function(e,t){},3:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("c9ba"),n("e6f5"),n("5bda"),n("85ea");var r=n("a593"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],u={name:"App",components:{}},i=u,c=(n("7c55"),n("5d22")),s=Object(c["a"])(i,o,a,!1,null,null,null),f=s.exports,p=(n("186d"),n("c447"),n("9208"),n("8aaf"));r["default"].use(p["a"]);var l=p["a"].prototype.push;p["a"].prototype.push=function(e){return l.call(this,e).catch((function(e){return e}))};var d=new p["a"]({routes:[{path:"/",name:"layout",component:function(){return n.e("about").then(n.bind(null,"162e"))}}]}),h=(n("8585"),n("7736")),g={state:{menuFlag:!1,rankingData:[],weatherobj:{}},mutations:{SET_FLAG:function(e){e.menuFlag=!e.menuFlag},SET_RANK:function(e,t){e.rankingData=t},SET_WEATER:function(e,t){e.weatherobj=t}}},m=g,b={state:{token:""},mutations:{SET_TOKEN:function(e,t){e.token=t}},actions:{}},v=b,y={token:function(e){return e.user.token},rankingData:function(e){return e.app.rankingData},weatherobj:function(e){return e.app.weatherobj}},w=y;r["default"].use(h["a"]);var j=new h["a"].Store({modules:{app:m,user:v},getters:w}),k=j,O=n("38bc"),E=n.n(O);n("70e7");E.a.configure({showSpinner:!1}),d.beforeEach((function(e,t,n){E.a.start(),n()})),d.afterEach((function(e,t){E.a.done()}));var S=n("7659"),T=(n("60fc"),n("bbc6")),P=(n("58af"),n("aa0d3"),n("1f5d"),n("9b20"),n("b0da"),n("2763")),_=(n("cd57"),n("73ef")),x=n.n(_),C=n("7c78"),A=n.n(C),F=x.a.create({baseURL:"/",timeout:5e3,withCredentials:!0});function N(e,t,n){return new Promise((function(r,o){F({url:t,method:e,params:n,headers:{"Content-Type":"application/json;charset=UTF-8"}}).then((function(e){r(e)}),(function(e){o(e)})).catch((function(e){o(e)}))}))}function M(e,t,n,r){return new Promise((function(o,a){F({url:t,method:e,data:"json"==r?n:A.a.stringify(n),headers:{"Content-Type":"json"==r?"application/json;charset=UTF-8":"application/x-www-form-urlencoded;charset=UTF-8"}}).then((function(e){o(e)}),(function(e){a(e)})).catch((function(e){a(e)}))}))}function $(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return N("get",e,t)}function D(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return N("delete",e,t)}function L(e,t,n){return M("post",e,t,n)}function G(e,t,n){return M("put",e,t,n)}F.interceptors.request.use((function(e){return k.getters.token&&(e.headers["token"]=k.getters.token),e}),(function(e){return Promise.reject(e)})),F.interceptors.response.use((function(e){var t=e.data;return t}),(function(e){var t=e.response;if(401==t.status)switch(t.status){case 401:P["Message"].error({message:"登录过期，请重新登录"}),d.replace({path:"/login?flag=true"});break}else P["Message"].error({message:"网络错误，请刷新重试"});return Promise.reject(e)}));var J={install:function(e,t){e.prototype.Gsuccess=function(e){P["Message"].success({message:e})},e.prototype.Gwarning=function(e){P["Message"].warning({message:e})},e.prototype.Gerror=function(e){P["Message"].error({message:e})},e.prototype.$fetchGet=$,e.prototype.$fetchPost=L,e.prototype.$fetchPut=G,e.prototype.$fetchDelete=D,e.prototype.getBack=function(){this.$router.go(-1)},e.prototype.isContains=function(e){var t=localStorage.getItem("auth");return new RegExp(e,"g").test(t)},e.prototype.deletetimestamp=function(e){var t="",n=e.lastIndexOf("."),r=e.substring(0,n),o=e.substring(n,n.length);return r=r.substring(0,r.length-13),t=r+o,t},e.prototype.getCookie=function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},e.prototype.cloneObj=function(e){var t,n=this,r=e.constructor===Array?[]:{};if("object"===Object(T["a"])(e)){if(window.JSON)t=JSON.stringify(e),r=JSON.parse(t);else for(var o in e)r[o]="object"===Object(T["a"])(e[o])?n.cloneObj(e[o]):e[o];return r}},e.filter("FormatTime",(function(e,t){if(e)return new Date(e).Format(t)})),e.filter("FormatSex",(function(e){return 0==e?"男":1==e?"女":void 0}))}},R=n("babc"),U=n("77bc");n("07d6");r["default"].prototype.$video=U["a"],r["default"].use(R["a"]),r["default"].use(J),r["default"].use(S["a"]),r["default"].config.productionTip=!1,new r["default"]({router:d,store:k,render:function(e){return e(f)}}).$mount("#app")},"7c55":function(e,t,n){"use strict";n("bc76")},bc76:function(e,t,n){}});
//# sourceMappingURL=app.c4f39db9.js.map