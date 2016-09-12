(function(){function h9(f,e){try{for(var h in e){Object.defineProperty(f.prototype,h,{value:e[h],enumerable:!1})
}}catch(g){f.prototype=e
}}function h2(f){var e=-1,h=f.length,g=[];
while(++e<h){g.push(f[e])
}return g
}function hZ(b){return Array.prototype.slice.call(b)
}function hR(){}function hH(b){return b
}function hE(){return this
}function hB(){return !0
}function hy(b){return typeof b=="function"?b:function(){return b
}
}function hv(e,d,f){return function(){var a=f.apply(d,arguments);
return arguments.length?e:a
}
}function hs(b){return b!=null&&!isNaN(b)
}function hq(b){return b.length
}function hj(b){return b==null
}function hg(b){return b.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ")
}function he(d){var c=1;
while(d*c%1){c*=10
}return c
}function g4(){}function jF(f){function g(){var j=e,i=-1,b=j.length,a;
while(++i<b){(a=j[i].on)&&a.apply(this,arguments)
}return f
}var e=[],h=new hR;
return g.on=function(i,c){var b=h.get(i),a;
return arguments.length<2?b&&b.on:(b&&(b.on=null,e=e.slice(0,a=e.indexOf(b)).concat(e.slice(a+1)),h.remove(i)),c&&e.push(h.set(i,{on:c})),f)
},g
}function jw(d,c){return c-(d?1+Math.floor(Math.log(d+Math.pow(10,1+Math.floor(Math.log(d)/Math.LN10)-c))/Math.LN10):1)
}function jt(b){return b+""
}function jr(f){var e=f.lastIndexOf("."),h=e>=0?f.substring(e):(e=f.length,""),g=[];
while(e>0){g.push(f.substring(e-=3,e+3))
}return g.reverse().join(",")+h
}function jk(e,d){var f=Math.pow(10,Math.abs(8-d)*3);
return{scale:d>8?function(b){return b/f
}:function(b){return b*f
},symbol:e}
}function i2(b){return function(a){return a<=0?0:a>=1?1:b(a)
}
}function i0(b){return function(a){return 1-b(1-a)
}
}function iX(b){return function(a){return 0.5*(a<0.5?b(2*a):2-b(2-2*a))
}
}function iT(b){return b
}function iQ(b){return function(a){return Math.pow(a,b)
}
}function iN(b){return 1-Math.cos(b*Math.PI/2)
}function iK(b){return Math.pow(2,10*(b-1))
}function iH(b){return 1-Math.sqrt(1-b*b)
}function iE(e,d){var f;
return arguments.length<2&&(d=0.45),arguments.length<1?(e=1,f=d/4):f=d/(2*Math.PI)*Math.asin(1/e),function(a){return 1+e*Math.pow(2,10*-a)*Math.sin((a-f)*2*Math.PI/d)
}
}function iB(b){return b||(b=1.70158),function(a){return a*a*((b+1)*a-b)
}
}function iy(b){return b<1/2.75?7.5625*b*b:b<2/2.75?7.5625*(b-=1.5/2.75)*b+0.75:b<2.5/2.75?7.5625*(b-=2.25/2.75)*b+0.9375:7.5625*(b-=2.625/2.75)*b+0.984375
}function iv(){d3.event.stopPropagation(),d3.event.preventDefault()
}function ir(){var d=d3.event,c;
while(c=d.sourceEvent){d=c
}return d
}function j6(f){var e=new g4,h=0,g=arguments.length;
while(++h<g){e[arguments[h]]=jF(e)
}return e.of=function(b,a){return function(d){try{var c=d.sourceEvent=d3.event;
d.target=f,d3.event=d,e[d.type].apply(b,a)
}finally{d3.event=c
}}
},e
}function jC(b){return b=="transform"?d3.interpolateTransform:d3.interpolate
}function jy(d,c){return c=c-(d=+d)?1/(c-d):0,function(a){return(a-d)*c
}
}function jv(d,c){return c=c-(d=+d)?1/(c-d):0,function(a){return Math.max(0,Math.min(1,(a-d)*c))
}
}function js(e,d,f){return new jp(e,d,f)
}function jp(e,d,f){this.r=e,this.g=d,this.b=f
}function jm(b){return b<16?"0"+Math.max(0,b).toString(16):Math.min(255,b).toString(16)
}function jj(r,q,p){var o=0,n=0,m=0,l,k,j;
l=/([a-z]+)\((.*)\)/i.exec(r);
if(l){k=l[2].split(",");
switch(l[1]){case"hsl":return p(parseFloat(k[0]),parseFloat(k[1])/100,parseFloat(k[2])/100);
case"rgb":return q(jd(k[0]),jd(k[1]),jd(k[2]))
}}return(j=ja.get(r))?q(j.r,j.g,j.b):(r!=null&&r.charAt(0)==="#"&&(r.length===4?(o=r.charAt(1),o+=o,n=r.charAt(2),n+=n,m=r.charAt(3),m+=m):r.length===7&&(o=r.substring(1,3),n=r.substring(3,5),m=r.substring(5,7)),o=parseInt(o,16),n=parseInt(n,16),m=parseInt(m,16)),q(o,n,m))
}function jg(r,q,p){var o=Math.min(r/=255,q/=255,p/=255),n=Math.max(r,q,p),m=n-o,l,k,j=(n+o)/2;
return m?(k=j<0.5?m/(n+o):m/(2-n-o),r==n?l=(q-p)/m+(q<p?6:0):q==n?l=(p-r)/m+2:l=(r-q)/m+4,l*=60):k=l=0,i7(l,k,j)
}function jd(d){var c=parseFloat(d);
return d.charAt(d.length-1)==="%"?Math.round(c*2.55):c
}function i7(e,d,f){return new i4(e,d,f)
}function i4(e,d,f){this.h=e,this.s=d,this.l=f
}function i1(i,h,n){function k(b){return b>360?b-=360:b<0&&(b+=360),b<60?m+(l-m)*b/60:b<180?l:b<240?m+(l-m)*(240-b)/60:m
}function j(b){return Math.round(k(b)*255)
}var m,l;
return i%=360,i<0&&(i+=360),h=h<0?0:h>1?1:h,n=n<0?0:n>1?1:n,l=n<=0.5?n*(1+h):n+h-n*h,m=2*n-l,js(j(i+120),j(i),j(i-120))
}function iY(b){return hT(b,iG),b
}function iD(b){return function(){return iV(b,this)
}
}function iA(b){return function(){return iS(b,this)
}
}function ix(j,i){function m(){if(a=this.classList){return a.add(j)
}var a=this.className,f=a.baseVal!=null,c=f?a.baseVal:a;
p.lastIndex=0,p.test(c)||(c=hg(c+" "+j),f?a.baseVal=c:this.className=c)
}function l(){if(a=this.classList){return a.remove(j)
}var a=this.className,f=a.baseVal!=null,c=f?a.baseVal:a;
c=hg(c.replace(p," ")),f?a.baseVal=c:this.className=c
}function k(){(i.apply(this,arguments)?m:l).call(this)
}var p=new RegExp("(^|\\s+)"+d3.requote(j)+"(\\s+|$)","g");
if(arguments.length<2){var o=this.node();
if(n=o.classList){return n.contains(j)
}var n=o.className;
return p.lastIndex=0,p.test(n.baseVal!=null?n.baseVal:n)
}return this.each(typeof i=="function"?k:i?m:l)
}function iu(b){return{__data__:b}
}function iq(b){return function(){return iJ(this,b)
}
}function io(b){return arguments.length||(b=d3.ascending),function(a,d){return b(a&&a.__data__,d&&d.__data__)
}
}function j8(j,i){for(var p=0,o=j.length;
p<o;
p++){for(var n=j[p],m=0,l=n.length,k;
m<l;
m++){(k=n[m])&&i(k,m,p)
}}return j
}function j5(b){return hT(b,j3),b
}function j2(h,g,l){hT(h,jY);
var k=new hR,j=d3.dispatch("start","end"),i=jQ;
return h.id=g,h.time=l,h.tween=function(a,d){return arguments.length<2?k.get(a):(d==null?k.remove(a):k.set(a,d),h)
},h.ease=function(a){return arguments.length?(i=typeof a=="function"?a:d3.ease.apply(d3,arguments),h):i
},h.each=function(a,d){return arguments.length<2?jP.call(h,a):(j.on(a,d),h)
},d3.timer(function(a){return j8(h,function(w,v,u){function d(m){return f.active>g?b():(f.active=g,k.forEach(function(n,o){(o=o.call(w,e,v))&&t.push(o)
}),j.start.call(w,e,v),c(m)||d3.timer(c,0,l),1)
}function c(p){if(f.active!==g){return b()
}var o=(p-s)/r,n=i(o),m=t.length;
while(m>0){t[--m].call(w,n)
}if(o>=1){return b(),jW=g,j.end.call(w,e,v),jW=0,1
}}function b(){return --f.count||delete w.__transition__,1
}var t=[],s=w.delay,r=w.duration,f=(w=w.node).__transition__||(w.__transition__={active:0,count:0}),e=w.__data__;
++f.count,s<=a?d(a):d3.timer(d,s,l)
})
},0,l),h
}function j0(e,d,f){return f!=""&&j1
}function jZ(g,f){function i(b,l,k){var c=f.call(this,b,l);
return c==null?k!=""&&j1:k!=c&&j(k,c)
}function h(b,k,c){return c!=f&&j(c,f)
}var j=jC(g);
return typeof f=="function"?i:f==null?j0:(f+="",h)
}function jP(g){var f=jW,j=jQ,i=jS,h=jR;
return jW=this.id,jQ=this.ease(),j8(this,function(a,k,e){jS=a.delay,jR=a.duration,g.call(a=a.node,a.__data__,k,e)
}),jW=f,jQ=j,jS=i,jR=h,this
}function jL(){var f,e=Date.now(),h=jO;
while(h){f=e-h.then,f>=h.delay&&(h.flush=h.callback(f)),h=h.next
}var g=jK()-e;
g>24?(isFinite(g)&&(clearTimeout(jM),jM=setTimeout(jL,g)),jN=0):(jN=1,jJ(jL))
}function jK(){var e=null,d=jO,f=Infinity;
while(d){d.flush?d=e?e.next=d.next:jO=d.next:(f=Math.min(f,d.then+d.delay),d=(e=d).next)
}return f
}function jI(h){var g=[h.a,h.b],l=[h.c,h.d],k=j9(g),j=jH(g,l),i=j9(jG(l,g,-j))||0;
g[0]*l[1]<l[0]*g[1]&&(g[0]*=-1,g[1]*=-1,k*=-1,j*=-1),this.rotate=(k?Math.atan2(g[1],g[0]):Math.atan2(-l[0],l[1]))*ii,this.translate=[h.e,h.f],this.scale=[k,i],this.skew=i?Math.atan2(j,i)*ii:0
}function jH(d,c){return d[0]*c[0]+d[1]*c[1]
}function j9(d){var c=Math.sqrt(jH(d,d));
return c&&(d[0]/=c,d[1]/=c),c
}function jG(e,d,f){return e[0]+=f*d[0],e[1]+=f*d[1],e
}function ia(h,g){var l=h.ownerSVGElement||h;
if(l.createSVGPoint){var k=l.createSVGPoint();
if(ie<0&&(window.scrollX||window.scrollY)){l=d3.select(document.body).append("svg").style("position","absolute").style("top",0).style("left",0);
var j=l[0][0].getScreenCTM();
ie=!j.f&&!j.e,l.remove()
}return ie?(k.x=g.pageX,k.y=g.pageY):(k.x=g.clientX,k.y=g.clientY),k=k.matrixTransform(h.getScreenCTM().inverse()),[k.x,k.y]
}var i=h.getBoundingClientRect();
return[g.clientX-i.left-h.clientLeft,g.clientY-i.top-h.clientTop]
}function h7(){}function h4(e){var d=e[0],f=e[e.length-1];
return d<f?[d,f]:[f,d]
}function h1(b){return b.rangeExtent?b.rangeExtent():h4(b.range())
}function hY(i,h){var n=0,m=i.length-1,l=i[n],k=i[m],j;
k<l&&(j=n,n=m,m=j,j=l,l=k,k=j);
if(j=k-l){h=h(j),i[n]=h.floor(l),i[m]=h.ceil(k)
}return i
}function hV(){return Math
}function hS(j,i,p,o){function l(){var b=Math.min(j.length,i.length)>2?hx:hA,a=o?jv:jy;
return n=b(j,i,a,p),m=b(i,j,a,d3.interpolate),k
}function k(b){return n(b)
}var n,m;
return k.invert=function(b){return m(b)
},k.domain=function(a){return arguments.length?(j=a.map(Number),l()):j
},k.range=function(b){return arguments.length?(i=b,l()):i
},k.rangeRound=function(b){return k.range(b).interpolate(d3.interpolateRound)
},k.clamp=function(b){return arguments.length?(o=b,l()):o
},k.interpolate=function(b){return arguments.length?(p=b,l()):p
},k.ticks=function(a){return hG(j,a)
},k.tickFormat=function(a){return hD(j,a)
},k.nice=function(){return hY(j,hM),l()
},k.copy=function(){return hS(j,i,p,o)
},l()
}function hP(d,c){return d3.rebind(d,c,"range","rangeRound","interpolate","clamp")
}function hM(b){return b=Math.pow(10,Math.round(Math.log(b)/Math.LN10)-1),{floor:function(a){return Math.floor(a/b)*b
},ceil:function(a){return Math.ceil(a/b)*b
}}
}function hJ(h,g){var l=h4(h),k=l[1]-l[0],j=Math.pow(10,Math.floor(Math.log(k/g)/Math.LN10)),i=g/k*j;
return i<=0.15?j*=10:i<=0.35?j*=5:i<=0.75&&(j*=2),l[0]=Math.ceil(l[0]/j)*j,l[1]=Math.floor(l[1]/j)*j+j*0.5,l[2]=j,l
}function hG(d,c){return d3.range.apply(d3,hJ(d,c))
}function hD(d,c){return d3.format(",."+Math.max(0,-Math.floor(Math.log(hJ(d,c)[2])/Math.LN10+0.01))+"f")
}function hA(h,g,l,k){var j=l(h[0],h[1]),i=k(g[0],g[1]);
return function(b){return i(j(b))
}
}function hx(j,i,p,o){var n=[],m=[],l=0,k=Math.min(j.length,i.length)-1;
j[k]<j[0]&&(j=j.slice().reverse(),i=i.slice().reverse());
while(++l<=k){n.push(p(j[l-1],j[l])),m.push(o(i[l-1],i[l]))
}return function(a){var d=d3.bisect(j,a,1,k)-1;
return m[d](n[d](a))
}
}function hu(f,e){function g(a){return f(e(a))
}var h=e.pow;
return g.invert=function(a){return h(f.invert(a))
},g.domain=function(a){return arguments.length?(e=a[0]<0?hl:ho,h=e.pow,f.domain(a.map(e)),g):f.domain().map(h)
},g.nice=function(){return f.domain(hY(f.domain(),hV)),g
},g.ticks=function(){var n=h4(f.domain()),m=[];
if(n.every(isFinite)){var l=Math.floor(n[0]),k=Math.ceil(n[1]),c=h(n[0]),b=h(n[1]);
if(e===hl){m.push(h(l));
for(;
l++<k;
){for(var a=9;
a>0;
a--){m.push(h(l)*a)
}}}else{for(;
l<k;
l++){for(var a=1;
a<10;
a++){m.push(h(l)*a)
}}m.push(h(l))
}for(l=0;
m[l]<c;
l++){}for(k=m.length;
m[k-1]>b;
k--){}m=m.slice(l,k)
}return m
},g.tickFormat=function(b,j){arguments.length<2&&(j=hr);
if(arguments.length<1){return j
}var i=Math.max(0.1,b/g.ticks().length),d=e===hl?(c=-1e-12,Math.floor):(c=1e-12,Math.ceil),c;
return function(k){return k/h(d(e(k)+c))<=i?j(k):""
}
},g.copy=function(){return hu(f.copy(),e)
},hP(g,f)
}function ho(b){return Math.log(b<0?0:b)/Math.LN10
}function hl(b){return -Math.log(b>0?0:-b)/Math.LN10
}function hi(g,f){function h(a){return g(j(a))
}var j=hf(f),i=hf(1/f);
return h.invert=function(a){return i(g.invert(a))
},h.domain=function(a){return arguments.length?(g.domain(a.map(j)),h):g.domain().map(i)
},h.ticks=function(b){return hG(h.domain(),b)
},h.tickFormat=function(b){return hD(h.domain(),b)
},h.nice=function(){return h.domain(hY(h.domain(),hM))
},h.exponent=function(b){if(!arguments.length){return f
}var c=h.domain();
return j=hf(f=b),i=hf(1/f),h.domain(c)
},h.copy=function(){return hi(g.copy(),f)
},hP(h,g)
}function hf(b){return function(a){return a<0?-Math.pow(-a,b):Math.pow(a,b)
}
}function hc(i,h){function k(a){return m[((n.get(a)||n.set(a,i.push(a)))-1)%m.length]
}function j(a,d){return d3.range(i.length).map(function(b){return a+d*b
})
}var n,m,l;
return k.domain=function(f){if(!arguments.length){return i
}i=[],n=new hR;
var c=-1,b=f.length,a;
while(++c<b){n.has(a=f[c])||n.set(a,i.push(a))
}return k[h.t](h.x,h.p)
},k.range=function(b){return arguments.length?(m=b,l=0,h={t:"range",x:b},k):m
},k.rangePoints=function(f,e){arguments.length<2&&(e=0);
var d=f[0],b=f[1],a=(b-d)/(i.length-1+e);
return m=j(i.length<2?(d+b)/2:d+a*e/2,a),l=0,h={t:"rangePoints",x:f,p:e},k
},k.rangeBands=function(g,f){arguments.length<2&&(f=0);
var e=g[1]<g[0],d=g[e-0],b=g[1-e],a=(b-d)/(i.length+f);
return m=j(d+a*f,a),e&&m.reverse(),l=a*(1-f),h={t:"rangeBands",x:g,p:f},k
},k.rangeRoundBands=function(o,g){arguments.length<2&&(g=0);
var f=o[1]<o[0],e=o[f-0],d=o[1-f],b=Math.floor((d-e)/(i.length+g)),a=d-e-(i.length-g)*b;
return m=j(e+Math.round(a/2),b),f&&m.reverse(),l=Math.round(b*(1-g)),h={t:"rangeRoundBands",x:o,p:g},k
},k.rangeBand=function(){return l
},k.rangeExtent=function(){return h4(h.x)
},k.copy=function(){return hc(i,h)
},k.domain(i)
}function jB(g,f){function i(){var c=0,b=g.length,a=f.length;
j=[];
while(++c<a){j[c-1]=d3.quantile(g,c/a)
}return h
}function h(b){return isNaN(b=+b)?NaN:f[d3.bisect(j,b)]
}var j;
return h.domain=function(a){return arguments.length?(g=a.filter(function(b){return !isNaN(b)
}).sort(d3.ascending),i()):g
},h.range=function(b){return arguments.length?(f=b,i()):f
},h.quantiles=function(){return j
},h.copy=function(){return jB(g,f)
},i()
}function jx(i,h,n){function k(a){return n[Math.max(0,Math.min(l,Math.floor(m*(a-i))))]
}function j(){return m=n.length/(h-i),l=n.length-1,k
}var m,l;
return k.domain=function(a){return arguments.length?(i=+a[0],h=+a[a.length-1],j()):[i,h]
},k.range=function(b){return arguments.length?(n=b,j()):n
},k.copy=function(){return jx(i,h,n)
},j()
}function ju(d){function c(b){return +b
}return c.invert=c,c.domain=c.range=function(a){return arguments.length?(d=a.map(c),c):d
},c.ticks=function(a){return hG(d,a)
},c.tickFormat=function(a){return hD(d,a)
},c.copy=function(){return ju(d)
},c
}function jl(b){return b.innerRadius
}function ji(b){return b.outerRadius
}function jf(b){return b.startAngle
}function jc(b){return b.endAngle
}function i9(j){function k(s){function a(){r.push("M",m(j(q),l))
}var r=[],q=[],g=-1,f=s.length,d,c=hy(i),b=hy(p);
while(++g<f){o.call(this,d=s[g],g)?q.push([+c.call(this,d,g),+b.call(this,d,g)]):q.length&&(a(),q=[])
}return q.length&&a(),r.length?r.join(""):null
}var i=i6,p=i3,o=hB,n=iZ,m=iU,l=0.7;
return k.x=function(b){return arguments.length?(i=b,k):i
},k.y=function(b){return arguments.length?(p=b,k):p
},k.defined=function(b){return arguments.length?(o=b,k):o
},k.interpolate=function(b){return arguments.length?(iW.has(b+="")||(b=iZ),m=iW.get(n=b),k):n
},k.tension=function(b){return arguments.length?(l=b,k):l
},k
}function i6(b){return b[0]
}function i3(b){return b[1]
}function iU(g){var f=0,j=g.length,i=g[0],h=[i[0],",",i[1]];
while(++f<j){h.push("L",(i=g[f])[0],",",i[1])
}return h.join("")
}function iR(g){var f=0,j=g.length,i=g[0],h=[i[0],",",i[1]];
while(++f<j){h.push("V",(i=g[f])[1],"H",i[0])
}return h.join("")
}function iO(g){var f=0,j=g.length,i=g[0],h=[i[0],",",i[1]];
while(++f<j){h.push("H",(i=g[f])[0],"V",i[1])
}return h.join("")
}function iL(d,c){return d.length<4?iU(d):d[1]+iC(d.slice(1,d.length-1),iz(d,c))
}function iI(d,c){return d.length<3?iU(d):d[0]+iC((d.push(d[0]),d),iz([d[d.length-2]].concat(d,[d[1]]),c))
}function iF(e,d,f){return e.length<3?iU(e):e[0]+iC(e,iz(e,d))
}function iC(v,u){if(u.length<1||v.length!=u.length&&v.length!=u.length+2){return iU(v)
}var t=v.length!=u.length,s="",r=v[0],q=v[1],p=u[0],o=p,n=1;
t&&(s+="Q"+(q[0]-p[0]*2/3)+","+(q[1]-p[1]*2/3)+","+q[0]+","+q[1],r=v[1],n=2);
if(u.length>1){o=u[1],q=v[n],n++,s+="C"+(r[0]+p[0])+","+(r[1]+p[1])+","+(q[0]-o[0])+","+(q[1]-o[1])+","+q[0]+","+q[1];
for(var m=2;
m<u.length;
m++,n++){q=v[n],o=u[m],s+="S"+(q[0]-o[0])+","+(q[1]-o[1])+","+q[0]+","+q[1]
}}if(t){var l=v[n];
s+="Q"+(q[0]+o[0]*2/3)+","+(q[1]+o[1]*2/3)+","+l[0]+","+l[1]
}return s
}function iz(r,q){var p=[],o=(1-q)/2,n,m=r[0],l=r[1],k=1,j=r.length;
while(++k<j){n=m,m=l,l=r[k],p.push([o*(l[0]-n[0]),o*(l[1]-n[1])])
}return p
}function iw(r){if(r.length<3){return iU(r)
}var q=1,p=r.length,o=r[0],n=o[0],m=o[1],l=[n,n,n,(o=r[1])[0]],k=[m,m,m,o[1]],j=[n,",",m];
gS(j,l,k);
while(++q<p){o=r[q],l.shift(),l.push(o[0]),k.shift(),k.push(o[1]),gS(j,l,k)
}q=-1;
while(++q<2){l.shift(),l.push(o[0]),k.shift(),k.push(o[1]),gS(j,l,k)
}return j.join("")
}function it(i){if(i.length<4){return iU(i)
}var h=[],n=-1,m=i.length,l,k=[0],j=[0];
while(++n<3){l=i[n],k.push(l[0]),j.push(l[1])
}h.push(il(gU,k)+","+il(gU,j)),--n;
while(++n<m){l=i[n],k.shift(),k.push(l[0]),j.shift(),j.push(l[1]),gS(h,k,j)
}return h.join("")
}function ip(j){var i,p=-1,o=j.length,n=o+4,m,l=[],k=[];
while(++p<4){m=j[p%o],l.push(m[0]),k.push(m[1])
}i=[il(gU,l),",",il(gU,k)],--p;
while(++p<n){m=j[p%o],l.shift(),l.push(m[0]),k.shift(),k.push(m[1]),gS(i,l,k)
}return i.join("")
}function j4(t,s){var r=t.length-1;
if(r){var q=t[0][0],p=t[0][1],o=t[r][0]-q,n=t[r][1]-p,m=-1,l,k;
while(++m<=r){l=t[m],k=m/r,l[0]=s*l[0]+(1-s)*(q+k*o),l[1]=s*l[1]+(1-s)*(p+k*n)
}}return iw(t)
}function il(d,c){return d[0]*c[0]+d[1]*c[1]+d[2]*c[2]+d[3]*c[3]
}function gS(e,d,f){e.push("C",il(gZ,d),",",il(gZ,f),",",il(gW,d),",",il(gW,f),",",il(gU,d),",",il(gU,f))
}function gQ(d,c){return(c[1]-d[1])/(c[0]-d[0])
}function gO(i){var h=0,n=i.length-1,m=[],l=i[0],k=i[1],j=m[0]=gQ(l,k);
while(++h<n){m[h]=j+(j=gQ(l=k,k=i[h+1]))
}return m[h]=j,m
}function gM(r){var q=[],p,o,n,m,l=gO(r),k=-1,j=r.length-1;
while(++k<j){p=gQ(r[k],r[k+1]),Math.abs(p)<0.000001?l[k]=l[k+1]=0:(o=l[k]/p,n=l[k+1]/p,m=o*o+n*n,m>9&&(m=p*3/Math.sqrt(m),l[k]=m*o,l[k+1]=m*n))
}k=-1;
while(++k<=j){m=(r[Math.min(j,k+1)][0]-r[Math.max(0,k-1)][0])/(6*(1+l[k]*l[k])),q.push([m||0,l[k]*m||0])
}return q
}function gK(b){return b.length<3?iU(b):b[0]+iC(b,gM(b))
}function gI(h){var g,l=-1,k=h.length,j,i;
while(++l<k){g=h[l],j=g[0],i=g[1]+jq,g[0]=j*Math.cos(i),g[1]=j*Math.sin(i)
}return h
}function gG(x){function m(h){function i(){f.push("M",q(x(d),n),o,p(x(e.reverse()),n),"Z")
}var f=[],e=[],d=[],c=-1,b=h.length,a,C=hy(w),B=hy(u),A=w===v?function(){return k
}:hy(v),z=u===t?function(){return j
}:hy(t),k,j;
while(++c<b){s.call(this,a=h[c],c)?(e.push([k=+C.call(this,a,c),j=+B.call(this,a,c)]),d.push([+A.call(this,a,c),+z.call(this,a,c)])):e.length&&(i(),e=[],d=[])
}return e.length&&i(),f.length?f.join(""):null
}var w=i6,v=i6,u=0,t=i3,s=hB,r=iZ,q=iU,p=iU,o="L",n=0.7;
return m.x=function(b){return arguments.length?(w=v=b,m):v
},m.x0=function(b){return arguments.length?(w=b,m):w
},m.x1=function(b){return arguments.length?(v=b,m):v
},m.y=function(b){return arguments.length?(u=t=b,m):t
},m.y0=function(b){return arguments.length?(u=b,m):u
},m.y1=function(b){return arguments.length?(t=b,m):t
},m.defined=function(b){return arguments.length?(s=b,m):s
},m.interpolate=function(b){return arguments.length?(iW.has(b+="")||(b=iZ),q=iW.get(r=b),p=q.reverse||q,o=/-closed$/.test(b)?"M":"L",m):r
},m.tension=function(b){return arguments.length?(n=b,m):n
},m
}function gE(b){return b.source
}function gC(b){return b.target
}function gB(b){return b.radius
}function gy(b){return b.startAngle
}function gv(b){return b.endAngle
}function gu(b){return[b.x,b.y]
}function gr(b){return function(){var a=b.apply(this,arguments),f=a[0],e=a[1]+jq;
return[f*Math.cos(e),f*Math.sin(e)]
}
}function f9(){return 64
}function f7(){return"circle"
}function f5(d){var c=Math.sqrt(d/Math.PI);
return"M0,"+c+"A"+c+","+c+" 0 1,1 0,"+-c+"A"+c+","+c+" 0 1,1 0,"+c+"Z"
}function e7(d,c){d.attr("transform",function(b){return"translate("+c(b)+",0)"
})
}function e6(d,c){d.attr("transform",function(b){return"translate(0,"+c(b)+")"
})
}function ik(t,s,r){p=[];
if(r&&s.length>1){var q=h4(t.domain()),p,o=-1,n=s.length,m=(s[1]-s[0])/++r,l,k;
while(++o<n){for(l=r;
--l>0;
){(k=+s[o]-l*m)>=q[0]&&p.push(k)
}}for(--o,l=0;
++l<r&&(k=+s[o]+l*m)<q[1];
){p.push(k)
}}return p
}function h3(){h8||(h8=d3.select("body").append("div").style("visibility","hidden").style("top",0).style("height",0).style("width",0).style("overflow-y","scroll").append("div").style("height","2000px").node().parentNode);
var e=d3.event,d;
try{h8.scrollTop=1000,h8.dispatchEvent(e),d=1000-h8.scrollTop
}catch(f){d=e.wheelDelta||-e.detail*5
}return d
}function h0(h){var g=h.source,l=h.target,k=hU(g,l),j=[g];
while(g!==k){g=g.parent,j.push(g)
}var i=j.length;
while(l!==k){j.splice(i,0,l),l=l.parent
}return j
}function hX(e){var d=[],f=e.parent;
while(f!=null){d.push(e),e=f,f=f.parent
}return d.push(e),d
}function hU(i,h){if(i===h){return i
}var n=hX(i),m=hX(h),l=n.pop(),k=m.pop(),j=null;
while(l===k){j=l,l=n.pop(),k=m.pop()
}return j
}function hL(b){b.fixed|=2
}function hI(b){b!==hN&&(b.fixed&=1)
}function hF(){hN.fixed&=1,hQ=hN=null
}function hC(){hN.px=d3.event.x,hN.py=d3.event.y,hQ.resume()
}function hz(t,s,r){var q=0,p=0;
t.charge=0;
if(!t.leaf){var o=t.nodes,n=o.length,m=-1,l;
while(++m<n){l=o[m];
if(l==null){continue
}hz(l,s,r),t.charge+=l.charge,q+=l.charge*l.cx,p+=l.charge*l.cy
}}if(t.point){t.leaf||(t.point.x+=Math.random()-0.5,t.point.y+=Math.random()-0.5);
var k=s*r[t.point.index];
t.charge+=t.pointCharge=k,q+=k*t.point.x,p+=k*t.point.y
}t.cx=q/t.charge,t.cy=p/t.charge
}function hw(b){return 20
}function ht(b){return 1
}function hn(b){return b.x
}function hk(b){return b.y
}function hh(e,d,f){e.y0=d,e.y=f
}function g8(b){return d3.range(b.length)
}function g5(f){var e=-1,h=f[0].length,g=[];
while(++e<h){g[e]=0
}return g
}function jz(h){var g=1,l=0,k=h[0][1],j,i=h.length;
for(;
g<i;
++g){(j=h[g][1])>k&&(l=g,k=j)
}return l
}function g2(b){return b.reduce(e3,0)
}function e3(d,c){return d+c[1]
}function e0(d,c){return d9(d,Math.ceil(Math.log(c.length)/Math.LN2+1))
}function d9(h,g){var l=-1,k=+h[0],j=(h[1]-k)/g,i=[];
while(++l<=g){i[l]=j*l+k
}return i
}function d6(b){return[d3.min(b),d3.max(b)]
}function d5(d,c){return d3.rebind(d,c,"sort","children","value"),d.links=c5,d.nodes=function(a){return c3=!0,(d.nodes=d)(a)
},d
}function d2(b){return b.children
}function d0(b){return b.value
}function c7(d,c){return c.value-d.value
}function c5(b){return d3.merge(b.map(function(c){return(c.children||[]).map(function(a){return{source:c,target:a}
})
}))
}function c1(d,c){return d.value-c.value
}function b9(e,d){var f=e._pack_next;
e._pack_next=d,d._pack_prev=e,d._pack_next=f,f._pack_prev=d
}function b7(d,c){d._pack_next=c,c._pack_prev=d
}function b5(g,f){var j=f.x-g.x,i=f.y-g.y,h=g.r+f.r;
return h*h-j*j-i*i>0.001
}function b3(N){function C(b){M=Math.min(b.x-b.r,M),L=Math.max(b.x+b.r,L),K=Math.min(b.y-b.r,K),J=Math.max(b.y+b.r,J)
}var M=Infinity,L=-Infinity,K=Infinity,J=-Infinity,I=N.length,H,G,F,E,D;
N.forEach(b1),H=N[0],H.x=-H.r,H.y=0,C(H);
if(I>1){G=N[1],G.x=G.r,G.y=0,C(G);
if(I>2){F=N[2],a4(H,G,F),C(F),b9(H,F),H._pack_prev=F,b9(F,G),G=H._pack_next;
for(var B=3;
B<I;
B++){a4(H,G,F=N[B]);
var A=0,z=1,y=1;
for(E=G._pack_next;
E!==G;
E=E._pack_next,z++){if(b5(E,F)){A=1;
break
}}if(A==1){for(D=H._pack_prev;
D!==E._pack_prev;
D=D._pack_prev,y++){if(b5(D,F)){break
}}}A?(z<y||z==y&&G.r<H.r?b7(H,G=E):b7(H=D,G),B--):(b9(H,F),G=F,C(F))
}}}var x=(M+L)/2,w=(K+J)/2,v=0;
for(var B=0;
B<I;
B++){var u=N[B];
u.x-=x,u.y-=w,v=Math.max(v,u.r+Math.sqrt(u.x*u.x+u.y*u.y))
}return N.forEach(a9),v
}function b1(b){b._pack_next=b._pack_prev=b
}function a9(b){delete b._pack_next,delete b._pack_prev
}function a7(d){var c=d.children;
c&&c.length?(c.forEach(a7),d.r=b3(c)):d.r=Math.sqrt(d.value)
}function a5(i,h,n,m){var l=i.children;
i.x=h+=m*i.x,i.y=n+=m*i.y,i.r*=m;
if(l){var k=-1,j=l.length;
while(++k<j){a5(l[k],h,n,m)
}}}function a4(x,w,v){var u=x.r+v.r,t=w.x-x.x,s=w.y-x.y;
if(u&&(t||s)){var r=w.r+v.r,q=Math.sqrt(t*t+s*s),p=Math.max(-1,Math.min(1,(u*u+q*q-r*r)/(2*u*q))),o=Math.acos(p),n=p*(u/=q),m=Math.sin(o)*u;
v.x=x.x+n*t+m*s,v.y=x.y+n*s-m*t
}else{v.x=x.x+u,v.y=x.y
}}function a1(b){return 1+d3.max(b,function(c){return c.y
})
}function a0(b){return b.reduce(function(d,c){return d+c.x
},0)/b.length
}function aX(d){var c=d.children;
return c&&c.length?aX(c[0]):d
}function aW(e){var d=e.children,f;
return d&&(f=d.length)?aW(d[f-1]):e
}function aT(d,c){return d.parent==c.parent?1:2
}function aS(d){var c=d.children;
return c&&c.length?c[0]:d._tree.thread
}function g1(e){var d=e.children,f;
return d&&(f=d.length)?d[f-1]:e._tree.thread
}function g0(h,g){var l=h.children;
if(l&&(j=l.length)){var k,j,i=-1;
while(++i<j){g(k=g0(l[i],g),h)>0&&(h=k)
}}return h
}function gX(d,c){return d.x-c.x
}function gV(d,c){return c.x-d.x
}function gT(d,c){return d.depth-c.depth
}function gR(e,d){function f(b,n){var m=b.children;
if(m&&(c=m.length)){var l,k=null,j=-1,c;
while(++j<c){l=m[j],f(l,k),k=l
}}d(b,n)
}f(e,null)
}function gP(h){var g=0,l=0,k=h.children,j=k.length,i;
while(--j>=0){i=k[j]._tree,i.prelim+=g,i.mod+=g,g+=i.shift+(l+=i.change)
}}function gN(f,e,h){f=f._tree,e=e._tree;
var g=h/(e.number-f.number);
f.change+=g,e.change-=g,e.shift+=h,e.prelim+=h,e.mod+=h
}function gL(e,d,f){return e._tree.ancestor.parent==d.parent?e._tree.ancestor:f
}function gJ(b){return{x:b.x,y:b.y,dx:b.dx,dy:b.dy}
}function gH(h,g){var l=h.x+g[3],k=h.y+g[0],j=h.dx-g[1]-g[3],i=h.dy-g[0]-g[2];
return j<0&&(l+=j/2,j=0),i<0&&(k+=i/2,i=0),{x:l,y:k,dx:j,dy:i}
}function gF(b){return b.map(gD).join(",")
}function gD(b){return/[",\n]/.test(b)?'"'+b.replace(/\"/g,'""')+'"':b
}function gz(d,c){return function(a){return a&&d.hasOwnProperty(a.type)?d[a.type](a):c
}
}function gx(b){return"m0,"+b+"a"+b+","+b+" 0 1,1 0,"+-2*b+"a"+b+","+b+" 0 1,1 0,"+2*b+"z"
}function gw(d,c){gt.hasOwnProperty(d.type)&&gt[d.type](d,c)
}function gs(d,c){gw(d.geometry,c)
}function gq(g,f){for(var j=g.features,i=0,h=j.length;
i<h;
i++){gw(j[i].geometry,f)
}}function f8(g,f){for(var j=g.geometries,i=0,h=j.length;
i<h;
i++){gw(j[i],f)
}}function f6(g,f){for(var j=g.coordinates,i=0,h=j.length;
i<h;
i++){f.apply(null,j[i])
}}function f4(j,i){for(var p=j.coordinates,o=0,n=p.length;
o<n;
o++){for(var m=p[o],l=0,k=m.length;
l<k;
l++){i.apply(null,m[l])
}}}function f2(j,i){for(var p=j.coordinates,o=0,n=p.length;
o<n;
o++){for(var m=p[o][0],l=0,k=m.length;
l<k;
l++){i.apply(null,m[l])
}}}function f0(d,c){c.apply(null,d.coordinates)
}function e8(g,f){for(var j=g.coordinates[0],i=0,h=j.length;
i<h;
i++){f.apply(null,j[i])
}}function id(b){return b.source
}function e5(b){return b.target
}function aQ(){function p(e){var d=Math.sin(e*=r)*q,l=Math.sin(r-e)*q,k=l*z+d*t,j=l*y+d*s,f=l*A+d*u;
return[Math.atan2(j,k)/gA,Math.atan2(f,Math.sqrt(k*k+j*j))/gA]
}var D,C,B,A,z,y,x,w,v,u,t,s,r,q;
return p.distance=function(){return r==null&&(q=1/Math.sin(r=Math.acos(Math.max(-1,Math.min(1,A*u+B*v*Math.cos(x-D)))))),r
},p.source=function(c){var b=Math.cos(D=c[0]*gA),a=Math.sin(D);
return B=Math.cos(C=c[1]*gA),A=Math.sin(C),z=B*b,y=B*a,r=null,p
},p.target=function(e){var d=Math.cos(x=e[0]*gA),f=Math.sin(x);
return v=Math.cos(w=e[1]*gA),u=Math.sin(w),t=v*d,s=v*f,r=null,p
},p
}function aP(e,d){var f=aQ().source(e).target(d);
return f.distance(),f
}function aM(e){var d=0,f=0;
for(;
;
){if(e(d,f)){return[d,f]
}d===0?(d=f+1,f=0):(d-=1,f+=1)
}}function aL(v,u,t,s){var r,q,p,o,n,m,l;
return r=s[v],q=r[0],p=r[1],r=s[u],o=r[0],n=r[1],r=s[t],m=r[0],l=r[1],(l-p)*(o-q)-(n-p)*(m-q)>0
}function aK(e,d,f){return(f[0]-d[0])*(e[1]-d[1])<(f[1]-d[1])*(e[0]-d[0])
}function aJ(L,K,J,I){var H=L[0],G=K[0],F=J[0],E=I[0],D=L[1],C=K[1],B=J[1],A=I[1],z=H-F,y=G-H,x=E-F,w=D-B,v=C-D,u=A-B,t=(x*w-u*z)/(u*y-x*v);
return[H+t*y,D+t*v]
}function aH(N,M){var L={list:N.map(function(d,c){return{index:c,x:d[0],y:d[1]}
}).sort(function(d,c){return d.y<c.y?-1:d.y>c.y?1:d.x<c.x?-1:d.x>c.x?1:0
}),bottomSite:null},K={list:[],leftEnd:null,rightEnd:null,init:function(){K.leftEnd=K.createHalfEdge(null,"l"),K.rightEnd=K.createHalfEdge(null,"l"),K.leftEnd.r=K.rightEnd,K.rightEnd.l=K.leftEnd,K.list.unshift(K.leftEnd,K.rightEnd)
},createHalfEdge:function(d,c){return{edge:d,side:c,vertex:null,l:null,r:null}
},insert:function(d,c){c.l=d,c.r=d.r,d.r.l=c,d.r=c
},leftBound:function(d){var c=K.leftEnd;
do{c=c.r
}while(c!=K.rightEnd&&J.rightOf(c,d));
return c=c.l,c
},del:function(b){b.l.r=b.r,b.r.l=b.l,b.edge=null
},right:function(b){return b.r
},left:function(b){return b.l
},leftRegion:function(b){return b.edge==null?L.bottomSite:b.edge.region[b.side]
},rightRegion:function(b){return b.edge==null?L.bottomSite:b.edge.region[aI[b.side]]
}},J={bisect:function(i,h){var n={region:{l:i,r:h},ep:{l:null,r:null}},m=h.x-i.x,l=h.y-i.y,k=m>0?m:-m,j=l>0?l:-l;
return n.c=i.x*m+i.y*l+(m*m+l*l)*0.5,k>j?(n.a=1,n.b=l/m,n.c/=m):(n.b=1,n.a=m/l,n.c/=l),n
},intersect:function(R,Q){var P=R.edge,O=Q.edge;
if(!P||!O||P.region.r==O.region.r){return null
}var t=P.a*O.b-P.b*O.a;
if(Math.abs(t)<1e-10){return null
}var s=(P.c*O.b-O.c*P.b)/t,r=(O.c*P.a-P.c*O.a)/t,q=P.region.r,p=O.region.r,o,n;
q.y<p.y||q.y==p.y&&q.x<p.x?(o=R,n=P):(o=Q,n=O);
var m=s>=n.region.r.x;
return m&&o.side==="l"||!m&&o.side==="r"?null:{x:s,y:r}
},rightOf:function(V,U){var T=V.edge,S=T.region.r,R=U.x>S.x;
if(R&&V.side==="l"){return 1
}if(!R&&V.side==="r"){return 0
}if(T.a===1){var Q=U.y-S.y,P=U.x-S.x,O=0,t=0;
!R&&T.b<0||R&&T.b>=0?t=O=Q>=T.b*P:(t=U.x+U.y*T.b>T.c,T.b<0&&(t=!t),t||(O=1));
if(!O){var s=S.x-T.region.l.x;
t=T.b*(P*P-Q*Q)<s*Q*(1+2*P/s+T.b*T.b),T.b<0&&(t=!t)
}}else{var r=T.c-T.a*U.x,q=U.y-r,p=U.x-S.x,o=r-S.y;
t=q*q>p*p+o*o
}return V.side==="l"?t:!t
},endPoint:function(b,f,e){b.ep[f]=e;
if(!b.ep[aI[f]]){return
}M(b)
},distance:function(f,e){var h=f.x-e.x,g=f.y-e.y;
return Math.sqrt(h*h+g*g)
}},I={list:[],insert:function(i,f,n){i.vertex=f,i.ystar=f.y+n;
for(var m=0,l=I.list,k=l.length;
m<k;
m++){var j=l[m];
if(i.ystar>j.ystar||i.ystar==j.ystar&&f.x>j.vertex.x){continue
}break
}l.splice(m,0,i)
},del:function(f){for(var e=0,h=I.list,g=h.length;
e<g&&h[e]!=f;
++e){}h.splice(e,1)
},empty:function(){return I.list.length===0
},nextEvent:function(f){for(var e=0,h=I.list,g=h.length;
e<g;
++e){if(h[e]==f){return h[e+1]
}}return null
},min:function(){var b=I.list[0];
return{x:b.vertex.x,y:b.ystar}
},extractMin:function(){return I.list.shift()
}};
K.init(),L.bottomSite=L.list.shift();
var H=L.list.shift(),G,F,E,D,C,B,A,z,y,x,w,v,u;
for(;
;
){I.empty()||(G=I.min());
if(H&&(I.empty()||H.y<G.y||H.y==G.y&&H.x<G.x)){F=K.leftBound(H),E=K.right(F),A=K.rightRegion(F),v=J.bisect(A,H),B=K.createHalfEdge(v,"l"),K.insert(F,B),x=J.intersect(F,B),x&&(I.del(F),I.insert(F,x,J.distance(x,H))),F=B,B=K.createHalfEdge(v,"r"),K.insert(F,B),x=J.intersect(B,E),x&&I.insert(B,x,J.distance(x,H)),H=L.list.shift()
}else{if(!I.empty()){F=I.extractMin(),D=K.left(F),E=K.right(F),C=K.right(E),A=K.leftRegion(F),z=K.rightRegion(E),w=F.vertex,J.endPoint(F.edge,F.side,w),J.endPoint(E.edge,E.side,w),K.del(F),I.del(E),K.del(E),u="l",A.y>z.y&&(y=A,A=z,z=y,u="r"),v=J.bisect(A,z),B=K.createHalfEdge(v,u),K.insert(D,B),J.endPoint(v,aI[u],w),x=J.intersect(D,B),x&&(I.del(D),I.insert(D,x,J.distance(x,A))),x=J.intersect(B,C),x&&I.insert(B,x,J.distance(x,A))
}else{break
}}}for(F=K.right(K.leftEnd);
F!=K.rightEnd;
F=K.right(F)){M(F.edge)
}}function aG(){return{leaf:!0,nodes:[],point:null}
}function aF(r,q,p,o,n,m){if(!r(q,p,o,n,m)){var l=(p+n)*0.5,k=(o+m)*0.5,j=q.nodes;
j[0]&&aF(r,j[0],p,o,l,k),j[1]&&aF(r,j[1],l,o,n,k),j[2]&&aF(r,j[2],p,k,l,m),j[3]&&aF(r,j[3],l,k,n,m)
}}function aE(b){return{x:b[0],y:b[1]}
}function aC(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])
}function aA(r,q,p,o){var n,m,l=0,k=q.length,j=p.length;
while(l<k){if(o>=j){return -1
}n=q.charCodeAt(l++);
if(n==37){m=au[q.charAt(l++)];
if(!m||(o=m(r,p,o))<0){return -1
}}else{if(n!=p.charCodeAt(o++)){return -1
}}}return o
}function at(e,d,f){return aq.test(d.substring(f,f+=3))?f:-1
}function ar(f,e,h){e4.lastIndex=0;
var g=e4.exec(e.substring(h,h+10));
return g?h+=g[0].length:-1
}function e1(f,e,h){var g=d8.get(e.substring(h,h+=3).toLowerCase());
return g==null?-1:(f.m=g,h)
}function d7(f,e,h){d4.lastIndex=0;
var g=d4.exec(e.substring(h,h+12));
return g?(f.m=d1.get(g[0].toLowerCase()),h+=g[0].length):-1
}function c8(e,d,f){return aA(e,av.c.toString(),d,f)
}function c6(e,d,f){return aA(e,av.x.toString(),d,f)
}function c4(e,d,f){return aA(e,av.X.toString(),d,f)
}function c2(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+4));
return g?(f.y=+g[0],h+=g[0].length):-1
}function c0(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+2));
return g?(f.y=b8()+ +g[0],h+=g[0].length):-1
}function b8(){return ~~((new Date).getFullYear()/1000)*1000
}function b6(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+2));
return g?(f.m=g[0]-1,h+=g[0].length):-1
}function b4(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+2));
return g?(f.d=+g[0],h+=g[0].length):-1
}function b2(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+2));
return g?(f.H=+g[0],h+=g[0].length):-1
}function b0(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+2));
return g?(f.M=+g[0],h+=g[0].length):-1
}function a8(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+2));
return g?(f.S=+g[0],h+=g[0].length):-1
}function a6(f,e,h){a3.lastIndex=0;
var g=a3.exec(e.substring(h,h+3));
return g?(f.L=+g[0],h+=g[0].length):-1
}function a2(f,e,h){var g=aZ.get(e.substring(h,h+=2).toLowerCase());
return g==null?-1:(f.p=g,h)
}function aY(g){var f=g.getTimezoneOffset(),j=f>0?"-":"+",i=~~(Math.abs(f)/60),h=Math.abs(f)%60;
return j+az(i)+az(h)
}function aU(b){return b.toISOString()
}function gY(r,q,p){function o(a){var f=r(a),e=m(f,1);
return a-f<e-a?f:e
}function n(a){return q(a=r(new aD(a-1)),1),a
}function m(b,d){return q(b=new aD(+b),d),b
}function l(b,s,i){var e=n(b),c=[];
if(i>1){while(e<s){p(e)%i||c.push(new Date(+e)),q(e,1)
}}else{while(e<s){c.push(new Date(+e)),q(e,1)
}}return c
}function k(f,e,h){try{aD=aC;
var g=new aC;
return g._=f,l(g,e,h)
}finally{aD=Date
}}r.floor=r,r.round=o,r.ceil=n,r.offset=m,r.range=l;
var j=r.utc=aR(r);
return j.floor=j,j.round=aR(o),j.ceil=aR(n),j.offset=aR(m),j.range=k,r
}function aR(b){return function(a,f){try{aD=aC;
var e=new aC;
return e._=a,b(e,f)._
}finally{aD=Date
}}
}function ap(f,e,h){function g(a){return f(a)
}return g.invert=function(a){return an(f.invert(a))
},g.domain=function(a){return arguments.length?(f.domain(a),g):f.domain().map(an)
},g.nice=function(d){var c=ao(g.domain());
return g.domain([d.floor(c[0]),d.ceil(c[1])])
},g.ticks=function(l,k){var j=ao(g.domain());
if(typeof l!="function"){var d=j[1]-j[0],b=d/l,a=d3.bisect(aj,b);
if(a==aj.length){return e.year(j,l)
}if(!a){return f.ticks(l).map(an)
}Math.log(b/aj[a-1])<Math.log(aj[a]/b)&&--a,l=e[a],k=l[1],l=l[0].range
}return l(j[0],new Date(+j[1]+1),k)
},g.tickFormat=function(){return h
},g.copy=function(){return ap(f.copy(),e,h)
},d3.rebind(g,f,"range","rangeRound","interpolate","clamp")
}function ao(e){var d=e[0],f=e[e.length-1];
return d<f?[d,f]:[f,d]
}function an(b){return new Date(b)
}function am(b){return function(a){var f=b.length-1,e=b[f];
while(!e[1](a)){e=b[--f]
}return e[0](a)
}
}function al(d){var c=new Date(d,0,1);
return c.setFullYear(d),c
}function ak(f){var e=f.getFullYear(),h=al(e),g=al(e+1);
return e+(f-h)/(g-h)
}function ab(d){var c=new Date(Date.UTC(d,0,1));
return c.setUTCFullYear(d),c
}function aa(f){var e=f.getUTCFullYear(),h=ab(e),g=ab(e+1);
return e+(f-h)/(g-h)
}Date.now||(Date.now=function(){return +(new Date)
});
try{document.createElement("div").style.setProperty("opacity",0,"")
}catch(ij){var ih=CSSStyleDeclaration.prototype,ic=ih.setProperty;
ih.setProperty=function(e,c,f){ic.call(this,e,c+"",f)
}
}d3={version:"2.9.6"};
var h6=hZ;
try{h6(document.documentElement.childNodes)[0].nodeType
}catch(hW){h6=h2
}var hT=[].__proto__?function(d,c){d.__proto__=c
}:function(e,d){for(var f in d){e[f]=d[f]
}};
d3.map=function(e){var d=new hR;
for(var f in e){d.set(f,e[f])
}return d
},h9(hR,{has:function(b){return hO+b in this
},get:function(b){return this[hO+b]
},set:function(d,c){return this[hO+d]=c
},remove:function(b){return b=hO+b,b in this&&delete this[b]
},keys:function(){var b=[];
return this.forEach(function(a){b.push(a)
}),b
},values:function(){var b=[];
return this.forEach(function(a,d){b.push(d)
}),b
},entries:function(){var b=[];
return this.forEach(function(a,d){b.push({key:a,value:d})
}),b
},forEach:function(d){for(var c in this){c.charCodeAt(0)===hK&&d.call(this,c.substring(1),this[c])
}}});
var hO="\0",hK=hO.charCodeAt(0);
d3.functor=hy,d3.rebind=function(g,f){var j=1,i=arguments.length,h;
while(++j<i){g[h=arguments[j]]=hv(g,f,f[h])
}return g
},d3.ascending=function(d,c){return d<c?-1:d>c?1:d>=c?0:NaN
},d3.descending=function(d,c){return c<d?-1:c>d?1:c>=d?0:NaN
},d3.mean=function(i,h){var n=i.length,m,l=0,k=-1,j=0;
if(arguments.length===1){while(++k<n){hs(m=i[k])&&(l+=(m-l)/++j)
}}else{while(++k<n){hs(m=h.call(i,i[k],k))&&(l+=(m-l)/++j)
}}return j?l:undefined
},d3.median=function(d,c){return arguments.length>1&&(d=d.map(c)),d=d.filter(hs),d.length?d3.quantile(d.sort(d3.ascending),0.5):undefined
},d3.min=function(h,g){var l=-1,k=h.length,j,i;
if(arguments.length===1){while(++l<k&&((j=h[l])==null||j!=j)){j=undefined
}while(++l<k){(i=h[l])!=null&&j>i&&(j=i)
}}else{while(++l<k&&((j=g.call(h,h[l],l))==null||j!=j)){j=undefined
}while(++l<k){(i=g.call(h,h[l],l))!=null&&j>i&&(j=i)
}}return j
},d3.max=function(h,g){var l=-1,k=h.length,j,i;
if(arguments.length===1){while(++l<k&&((j=h[l])==null||j!=j)){j=undefined
}while(++l<k){(i=h[l])!=null&&i>j&&(j=i)
}}else{while(++l<k&&((j=g.call(h,h[l],l))==null||j!=j)){j=undefined
}while(++l<k){(i=g.call(h,h[l],l))!=null&&i>j&&(j=i)
}}return j
},d3.extent=function(i,h){var n=-1,m=i.length,l,k,j;
if(arguments.length===1){while(++n<m&&((l=j=i[n])==null||l!=l)){l=j=undefined
}while(++n<m){(k=i[n])!=null&&(l>k&&(l=k),j<k&&(j=k))
}}else{while(++n<m&&((l=j=h.call(i,i[n],n))==null||l!=l)){l=undefined
}while(++n<m){(k=h.call(i,i[n],n))!=null&&(l>k&&(l=k),j<k&&(j=k))
}}return[l,j]
},d3.random={normal:function(d,c){return arguments.length<2&&(c=1),arguments.length<1&&(d=0),function(){var f,b,a;
do{f=Math.random()*2-1,b=Math.random()*2-1,a=f*f+b*b
}while(!a||a>1);
return d+c*f*Math.sqrt(-2*Math.log(a)/a)
}
}},d3.sum=function(h,g){var l=0,k=h.length,j,i=-1;
if(arguments.length===1){while(++i<k){isNaN(j=+h[i])||(l+=j)
}}else{while(++i<k){isNaN(j=+g.call(h,h[i],i))||(l+=j)
}}return l
},d3.quantile=function(h,g){var l=(h.length-1)*g+1,k=Math.floor(l),j=h[k-1],i=l-k;
return i?j+i*(h[k]-j):j
},d3.transpose=function(b){return d3.zip.apply(d3,b)
},d3.zip=function(){if(!(j=arguments.length)){return[]
}for(var h=-1,g=d3.min(arguments,hq),l=new Array(g);
++h<g;
){for(var k=-1,j,i=l[h]=new Array(j);
++k<j;
){i[k]=arguments[k][h]
}}return l
},d3.bisector=function(b){return{left:function(a,j,i,h){arguments.length<3&&(i=0),arguments.length<4&&(h=a.length);
while(i<h){var g=i+h>>1;
b.call(a,a[g],g)<j?i=g+1:h=g
}return i
},right:function(a,j,i,h){arguments.length<3&&(i=0),arguments.length<4&&(h=a.length);
while(i<h){var g=i+h>>1;
j<b.call(a,a[g],g)?h=g:i=g+1
}return i
}}
};
var hm=d3.bisector(function(b){return b
});
d3.bisectLeft=hm.left,d3.bisect=d3.bisectRight=hm.right,d3.first=function(h,g){var l=0,k=h.length,j=h[0],i;
arguments.length===1&&(g=d3.ascending);
while(++l<k){g.call(h,j,i=h[l])>0&&(j=i)
}return j
},d3.last=function(h,g){var l=0,k=h.length,j=h[0],i;
arguments.length===1&&(g=d3.ascending);
while(++l<k){g.call(h,j,i=h[l])<=0&&(j=i)
}return j
},d3.nest=function(){function k(u,t){if(t>=h.length){return l?l.call(i,u):m?u.sort(m):u
}var s=-1,r=u.length,q=h[t++],f,e,d=new hR,b,a={};
while(++s<r){(b=d.get(f=q(e=u[s])))?b.push(e):d.set(f,[e])
}return d.forEach(function(c){a[c]=k(d.get(c),t)
}),a
}function j(b,p){if(p>=h.length){return b
}var o=[],g=n[p++],c;
for(c in b){o.push({key:c,values:j(b[c],p)})
}return g&&o.sort(function(e,d){return g(e.key,d.key)
}),o
}var i={},h=[],n=[],m,l;
return i.map=function(b){return k(b,0)
},i.entries=function(b){return j(k(b,0),0)
},i.key=function(a){return h.push(a),i
},i.sortKeys=function(a){return n[h.length-1]=a,i
},i.sortValues=function(a){return m=a,i
},i.rollup=function(a){return l=a,i
},i
},d3.keys=function(e){var d=[];
for(var f in e){d.push(f)
}return d
},d3.values=function(e){var d=[];
for(var f in e){d.push(e[f])
}return d
},d3.entries=function(e){var d=[];
for(var f in e){d.push({key:f,value:e[f]})
}return d
},d3.permute=function(g,f){var j=[],i=-1,h=f.length;
while(++i<h){j[i]=g[f[i]]
}return j
},d3.merge=function(b){return Array.prototype.concat.apply([],b)
},d3.split=function(i,h){var n=[],m=[],l,k=-1,j=i.length;
arguments.length<2&&(h=hj);
while(++k<j){h.call(m,l=i[k],k)?m=[]:(m.length||n.push(m),m.push(l))
}return n
},d3.range=function(i,h,n){arguments.length<3&&(n=1,arguments.length<2&&(h=i,i=0));
if((h-i)/n===Infinity){throw new Error("infinite range")
}var m=[],l=he(Math.abs(n)),k=-1,j;
i*=l,h*=l,n*=l;
if(n<0){while((j=i+n*++k)>h){m.push(j/l)
}}else{while((j=i+n*++k)<h){m.push(j/l)
}}return m
},d3.requote=function(b){return b.replace(hb,"\\$&")
};
var hb=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
d3.round=function(d,c){return c?Math.round(d*(c=Math.pow(10,c)))/c:Math.round(d)
},d3.xhr=function(f,e,h){var g=new XMLHttpRequest;
arguments.length<3?(h=e,e=null):e&&g.overrideMimeType&&g.overrideMimeType(e),g.open("GET",f,!0),e&&g.setRequestHeader("Accept",e),g.onreadystatechange=function(){if(g.readyState===4){var b=g.status;
h(!b&&g.response||b>=200&&b<300||b===304?g:null)
}},g.send(null)
},d3.text=function(f,e,h){function g(b){h(b&&b.responseText)
}arguments.length<3&&(h=e,e=null),d3.xhr(f,e,g)
},d3.json=function(d,c){d3.text(d,"application/json",function(b){c(b?JSON.parse(b):null)
})
},d3.html=function(d,c){d3.text(d,"text/html",function(b){if(b!=null){var e=document.createRange();
e.selectNode(document.body),b=e.createContextualFragment(b)
}c(b)
})
},d3.xml=function(f,e,h){function g(b){h(b&&b.responseXML)
}arguments.length<3&&(h=e,e=null),d3.xhr(f,e,g)
};
var g7={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};
d3.ns={prefix:g7,qualify:function(e){var d=e.indexOf(":"),f=e;
return d>=0&&(f=e.substring(0,d),e=e.substring(d+1)),g7.hasOwnProperty(f)?{space:g7[f],local:e}:e
}},d3.dispatch=function(){var e=new g4,d=-1,f=arguments.length;
while(++d<f){e[arguments[d]]=jF(e)
}return e
},g4.prototype.on=function(f,e){var h=f.indexOf("."),g="";
return h>0&&(g=f.substring(h+1),f=f.substring(0,h)),arguments.length<2?this[f].on(g):this[f].on(g,e)
},d3.format=function(x){var w=jE.exec(x),v=w[1]||" ",u=w[3]||"",t=w[5],s=+w[6],r=w[7],q=w[8],p=w[9],o=1,n="",m=!1;
q&&(q=+q.substring(1)),t&&(v="0",r&&(s-=Math.floor((s-1)/4)));
switch(p){case"n":r=!0,p="g";
break;
case"%":o=100,n="%",p="f";
break;
case"p":o=100,n="%",p="r";
break;
case"d":m=!0,q=0;
break;
case"s":o=-1,p="r"
}return p=="r"&&!q&&(p="g"),p=jA.get(p)||jt,function(e){if(m&&e%1){return""
}var d=e<0&&(e=-e)?"âˆ’":u;
if(o<0){var c=d3.formatPrefix(e,q);
e=c.scale(e),n=c.symbol
}else{e*=o
}e=p(e,q);
if(t){var f=e.length+d.length;
f<s&&(e=(new Array(s-f+1)).join(v)+e),r&&(e=jr(e)),e=d+e
}else{r&&(e=jr(e)),e=d+e;
var f=e.length;
f<s&&(e=(new Array(s-f+1)).join(v)+e)
}return e+n
}
};
var jE=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,jA=d3.map({g:function(d,c){return d.toPrecision(c)
},e:function(d,c){return d.toExponential(c)
},f:function(d,c){return d.toFixed(c)
},r:function(d,c){return d3.round(d,c=jw(d,c)).toFixed(Math.max(0,Math.min(20,c)))
}}),jo=["y","z","a","f","p","n","Î¼","m","","k","M","G","T","P","E","Z","Y"].map(jk);
d3.formatPrefix=function(e,d){var f=0;
return e&&(e<0&&(e*=-1),d&&(e=d3.round(e,jw(e,d))),f=1+Math.floor(1e-12+Math.log(e)/Math.LN10),f=Math.max(-24,Math.min(24,Math.floor((f<=0?f+1:f-1)/3)*3))),jo[8+f/3]
};
var jh=iQ(2),je=iQ(3),jb=function(){return iT
},i8=d3.map({linear:jb,poly:iQ,quad:function(){return jh
},cubic:function(){return je
},sin:function(){return iN
},exp:function(){return iK
},circle:function(){return iH
},elastic:iE,back:iB,bounce:function(){return iy
}}),i5=d3.map({"in":iT,out:i0,"in-out":iX,"out-in":function(b){return iX(i0(b))
}});
d3.ease=function(f){var e=f.indexOf("-"),h=e>=0?f.substring(0,e):f,g=e>=0?f.substring(e+1):"in";
return h=i8.get(h)||jb,g=i5.get(g)||iT,i2(g(h.apply(null,Array.prototype.slice.call(arguments,1))))
},d3.event=null,d3.interpolate=function(f,e){var h=d3.interpolators.length,g;
while(--h>=0&&!(g=d3.interpolators[h](f,e))){}return g
},d3.interpolateNumber=function(d,c){return c-=d,function(a){return d+c*a
}
},d3.interpolateRound=function(d,c){return c-=d,function(a){return Math.round(d+c*a)
}
},d3.interpolateString=function(v,u){var t,s,r,q=0,p=0,o=[],n=[],m,l;
im.lastIndex=0;
for(s=0;
t=im.exec(u);
++s){t.index&&o.push(u.substring(q,p=t.index)),n.push({i:o.length,x:t[0]}),o.push(null),q=im.lastIndex
}q<u.length&&o.push(u.substring(q));
for(s=0,m=n.length;
(t=im.exec(v))&&s<m;
++s){l=n[s];
if(l.x==t[0]){if(l.i){if(o[l.i+1]==null){o[l.i-1]+=l.x,o.splice(l.i,1);
for(r=s+1;
r<m;
++r){n[r].i--
}}else{o[l.i-1]+=l.x+o[l.i+1],o.splice(l.i,2);
for(r=s+1;
r<m;
++r){n[r].i-=2
}}}else{if(o[l.i+1]==null){o[l.i]=l.x
}else{o[l.i]=l.x+o[l.i+1],o.splice(l.i+1,1);
for(r=s+1;
r<m;
++r){n[r].i--
}}}n.splice(s,1),m--,s--
}else{l.x=d3.interpolateNumber(parseFloat(t[0]),parseFloat(l.x))
}}while(s<m){l=n.pop(),o[l.i+1]==null?o[l.i]=l.x:(o[l.i]=l.x+o[l.i+1],o.splice(l.i+1,1)),m--
}return o.length===1?o[0]==null?n[0].x:function(){return u
}:function(b){for(s=0;
s<m;
++s){o[(l=n[s]).i]=l.x(b)
}return o.join("")
}
},d3.interpolateTransform=function(D,C){var B=[],A=[],z,y=d3.transform(D),x=d3.transform(C),w=y.translate,v=x.translate,u=y.rotate,t=x.rotate,s=y.skew,r=x.skew,q=y.scale,p=x.scale;
return w[0]!=v[0]||w[1]!=v[1]?(B.push("translate(",null,",",null,")"),A.push({i:1,x:d3.interpolateNumber(w[0],v[0])},{i:3,x:d3.interpolateNumber(w[1],v[1])})):v[0]||v[1]?B.push("translate("+v+")"):B.push(""),u!=t?(u-t>180?t+=360:t-u>180&&(u+=360),A.push({i:B.push(B.pop()+"rotate(",null,")")-2,x:d3.interpolateNumber(u,t)})):t&&B.push(B.pop()+"rotate("+t+")"),s!=r?A.push({i:B.push(B.pop()+"skewX(",null,")")-2,x:d3.interpolateNumber(s,r)}):r&&B.push(B.pop()+"skewX("+r+")"),q[0]!=p[0]||q[1]!=p[1]?(z=B.push(B.pop()+"scale(",null,",",null,")"),A.push({i:z-4,x:d3.interpolateNumber(q[0],p[0])},{i:z-2,x:d3.interpolateNumber(q[1],p[1])})):(p[0]!=1||p[1]!=1)&&B.push(B.pop()+"scale("+p+")"),z=A.length,function(d){var c=-1,e;
while(++c<z){B[(e=A[c]).i]=e.x(d)
}return B.join("")
}
},d3.interpolateRgb=function(j,i){j=d3.rgb(j),i=d3.rgb(i);
var p=j.r,o=j.g,n=j.b,m=i.r-p,l=i.g-o,k=i.b-n;
return function(b){return"#"+jm(Math.round(p+m*b))+jm(Math.round(o+l*b))+jm(Math.round(n+k*b))
}
},d3.interpolateHsl=function(j,i){j=d3.hsl(j),i=d3.hsl(i);
var p=j.h,o=j.s,n=j.l,m=i.h-p,l=i.s-o,k=i.l-n;
return m>180?m-=360:m<-180&&(m+=360),function(b){return i1(p+m*b,o+l*b,n+k*b).toString()
}
},d3.interpolateArray=function(j,i){var p=[],o=[],n=j.length,m=i.length,l=Math.min(j.length,i.length),k;
for(k=0;
k<l;
++k){p.push(d3.interpolate(j[k],i[k]))
}for(;
k<n;
++k){o[k]=j[k]
}for(;
k<m;
++k){o[k]=i[k]
}return function(b){for(k=0;
k<l;
++k){o[k]=p[k](b)
}return o
}
},d3.interpolateObject=function(g,f){var j={},i={},h;
for(h in g){h in f?j[h]=jC(h)(g[h],f[h]):i[h]=g[h]
}for(h in f){h in g||(i[h]=f[h])
}return function(b){for(h in j){i[h]=j[h](b)
}return i
}
};
var im=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
d3.interpolators=[d3.interpolateObject,function(d,c){return c instanceof Array&&d3.interpolateArray(d,c)
},function(d,c){return(typeof d=="string"||typeof c=="string")&&d3.interpolateString(d+"",c+"")
},function(d,c){return(typeof c=="string"?ja.has(c)||/^(#|rgb\(|hsl\()/.test(c):c instanceof jp||c instanceof i4)&&d3.interpolateRgb(d,c)
},function(d,c){return !isNaN(d=+d)&&!isNaN(c=+c)&&d3.interpolateNumber(d,c)
}],d3.rgb=function(e,d,f){return arguments.length===1?e instanceof jp?js(e.r,e.g,e.b):jj(""+e,js,i1):js(~~e,~~d,~~f)
},jp.prototype.brighter=function(g){g=Math.pow(0.7,arguments.length?g:1);
var f=this.r,j=this.g,i=this.b,h=30;
return !f&&!j&&!i?js(h,h,h):(f&&f<h&&(f=h),j&&j<h&&(j=h),i&&i<h&&(i=h),js(Math.min(255,Math.floor(f/g)),Math.min(255,Math.floor(j/g)),Math.min(255,Math.floor(i/g))))
},jp.prototype.darker=function(b){return b=Math.pow(0.7,arguments.length?b:1),js(Math.floor(b*this.r),Math.floor(b*this.g),Math.floor(b*this.b))
},jp.prototype.hsl=function(){return jg(this.r,this.g,this.b)
},jp.prototype.toString=function(){return"#"+jm(this.r)+jm(this.g)+jm(this.b)
};
var ja=d3.map({aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"});
ja.forEach(function(d,c){ja.set(d,jj(c,js,i1))
}),d3.hsl=function(e,d,f){return arguments.length===1?e instanceof i4?i7(e.h,e.s,e.l):jj(""+e,jg,i7):i7(+e,+d,+f)
},i4.prototype.brighter=function(b){return b=Math.pow(0.7,arguments.length?b:1),i7(this.h,this.s,this.l/b)
},i4.prototype.darker=function(b){return b=Math.pow(0.7,arguments.length?b:1),i7(this.h,this.s,b*this.l)
},i4.prototype.rgb=function(){return i1(this.h,this.s,this.l)
},i4.prototype.toString=function(){return this.rgb().toString()
};
var iV=function(d,c){return c.querySelector(d)
},iS=function(d,c){return c.querySelectorAll(d)
},iP=document.documentElement,iM=iP.matchesSelector||iP.webkitMatchesSelector||iP.mozMatchesSelector||iP.msMatchesSelector||iP.oMatchesSelector,iJ=function(d,c){return iM.call(d,c)
};
typeof Sizzle=="function"&&(iV=function(d,c){return Sizzle(d,c)[0]||null
},iS=function(d,c){return Sizzle.uniqueSort(Sizzle(d,c))
},iJ=Sizzle.matchesSelector);
var iG=[];
d3.selection=function(){return j7
},d3.selection.prototype=iG,iG.select=function(t){var s=[],r,q,p,o;
typeof t!="function"&&(t=iD(t));
for(var n=-1,m=this.length;
++n<m;
){s.push(r=[]),r.parentNode=(p=this[n]).parentNode;
for(var l=-1,k=p.length;
++l<k;
){(o=p[l])?(r.push(q=t.call(o,o.__data__,l)),q&&"__data__" in o&&(q.__data__=o.__data__)):r.push(null)
}}return iY(s)
},iG.selectAll=function(r){var q=[],p,o;
typeof r!="function"&&(r=iA(r));
for(var n=-1,m=this.length;
++n<m;
){for(var l=this[n],k=-1,e=l.length;
++k<e;
){if(o=l[k]){q.push(p=h6(r.call(o,o.__data__,k))),p.parentNode=o
}}}return iY(q)
},iG.attr=function(r,q){function o(){this.removeAttribute(r)
}function n(){this.removeAttributeNS(r.space,r.local)
}function m(){this.setAttribute(r,q)
}function l(){this.setAttributeNS(r.space,r.local,q)
}function k(){var a=q.apply(this,arguments);
a==null?this.removeAttribute(r):this.setAttribute(r,a)
}function j(){var a=q.apply(this,arguments);
a==null?this.removeAttributeNS(r.space,r.local):this.setAttributeNS(r.space,r.local,a)
}r=d3.ns.qualify(r);
if(arguments.length<2){var p=this.node();
return r.local?p.getAttributeNS(r.space,r.local):p.getAttribute(r)
}return this.each(q==null?r.local?n:o:typeof q=="function"?r.local?j:k:r.local?l:m)
},iG.classed=function(g,f){var j=hg(g).split(" "),i=j.length,h=-1;
if(arguments.length>1){while(++h<i){ix.call(this,j[h],f)
}return this
}while(++h<i){if(!ix.call(this,j[h])){return !1
}}return !0
},iG.style=function(h,g,l){function k(){this.style.removeProperty(h)
}function j(){this.style.setProperty(h,g,l)
}function i(){var a=g.apply(this,arguments);
a==null?this.style.removeProperty(h):this.style.setProperty(h,a,l)
}return arguments.length<3&&(l=""),arguments.length<2?window.getComputedStyle(this.node(),null).getPropertyValue(h):this.each(g==null?k:typeof g=="function"?i:j)
},iG.property=function(g,f){function j(){delete this[g]
}function i(){this[g]=f
}function h(){var a=f.apply(this,arguments);
a==null?delete this[g]:this[g]=a
}return arguments.length<2?this.node()[g]:this.each(f==null?j:typeof f=="function"?h:i)
},iG.text=function(b){return arguments.length<1?this.node().textContent:this.each(typeof b=="function"?function(){var a=b.apply(this,arguments);
this.textContent=a==null?"":a
}:b==null?function(){this.textContent=""
}:function(){this.textContent=b
})
},iG.html=function(b){return arguments.length<1?this.node().innerHTML:this.each(typeof b=="function"?function(){var a=b.apply(this,arguments);
this.innerHTML=a==null?"":a
}:b==null?function(){this.innerHTML=""
}:function(){this.innerHTML=b
})
},iG.append=function(e){function d(){return this.appendChild(document.createElementNS(this.namespaceURI,e))
}function f(){return this.appendChild(document.createElementNS(e.space,e.local))
}return e=d3.ns.qualify(e),this.select(e.local?f:d)
},iG.insert=function(f,e){function h(){return this.insertBefore(document.createElementNS(this.namespaceURI,f),iV(e,this))
}function g(){return this.insertBefore(document.createElementNS(f.space,f.local),iV(e,this))
}return f=d3.ns.qualify(f),this.select(f.local?g:h)
},iG.remove=function(){return this.each(function(){var b=this.parentNode;
b&&b.removeChild(this)
})
},iG.data=function(t,s){function n(D,C){var B,A=D.length,z=C.length,y=Math.min(A,z),x=Math.max(A,z),w=[],v=[],k=[],i,h;
if(s){var b=new hR,G=[],F,E=C.length;
for(B=-1;
++B<A;
){F=s.call(i=D[B],i.__data__,B),b.has(F)?k[E++]=i:b.set(F,i),G.push(F)
}for(B=-1;
++B<z;
){F=s.call(C,h=C[B],B),b.has(F)?(w[B]=i=b.get(F),i.__data__=h,v[B]=k[B]=null):(v[B]=iu(h),w[B]=k[B]=null),b.remove(F)
}for(B=-1;
++B<A;
){b.has(G[B])&&(k[B]=D[B])
}}else{for(B=-1;
++B<y;
){i=D[B],h=C[B],i?(i.__data__=h,w[B]=i,v[B]=k[B]=null):(v[B]=iu(h),w[B]=k[B]=null)
}for(;
B<z;
++B){v[B]=iu(C[B]),w[B]=k[B]=null
}for(;
B<x;
++B){k[B]=D[B],v[B]=w[B]=null
}}v.update=w,v.parentNode=w.parentNode=k.parentNode=D.parentNode,m.push(v),l.push(w),j.push(k)
}var r=-1,q=this.length,p,o;
if(!arguments.length){t=new Array(q=(p=this[0]).length);
while(++r<q){if(o=p[r]){t[r]=o.__data__
}}return t
}var m=j5([]),l=iY([]),j=iY([]);
if(typeof t=="function"){while(++r<q){n(p=this[r],t.call(p,p.parentNode.__data__,r))
}}else{while(++r<q){n(p=this[r],t)
}}return l.enter=function(){return m
},l.exit=function(){return j
},l
},iG.datum=iG.map=function(b){return arguments.length<1?this.property("__data__"):this.property("__data__",b)
},iG.filter=function(r){var q=[],p,o,n;
typeof r!="function"&&(r=iq(r));
for(var m=0,l=this.length;
m<l;
m++){q.push(p=[]),p.parentNode=(o=this[m]).parentNode;
for(var k=0,j=o.length;
k<j;
k++){(n=o[k])&&r.call(n,n.__data__,k)&&p.push(n)
}}return iY(q)
},iG.order=function(){for(var h=-1,g=this.length;
++h<g;
){for(var l=this[h],k=l.length-1,j=l[k],i;
--k>=0;
){if(i=l[k]){j&&j!==i.nextSibling&&j.parentNode.insertBefore(i,j),j=i
}}}return this
},iG.sort=function(e){e=io.apply(this,arguments);
for(var d=-1,f=this.length;
++d<f;
){this[d].sort(e)
}return this.order()
},iG.on=function(g,f,j){arguments.length<3&&(j=!1);
var i="__on"+g,h=g.indexOf(".");
return h>0&&(g=g.substring(0,h)),arguments.length<2?(h=this.node()[i])&&h._:this.each(function(k,d){function a(e){var l=d3.event;
d3.event=e;
try{f.call(c,c.__data__,d)
}finally{d3.event=l
}}var c=this,b=c[i];
b&&(c.removeEventListener(g,b,b.$),delete c[i]),f&&(c.addEventListener(g,c[i]=a,a.$=j),a._=f)
})
},iG.each=function(b){return j8(this,function(a,f,e){b.call(a,a.__data__,f,e)
})
},iG.call=function(b){return b.apply(this,(arguments[0]=this,arguments)),this
},iG.empty=function(){return !this.node()
},iG.node=function(i){for(var h=0,n=this.length;
h<n;
h++){for(var m=this[h],l=0,k=m.length;
l<k;
l++){var j=m[l];
if(j){return j
}}}return null
},iG.transition=function(){var j=[],i,p;
for(var o=-1,n=this.length;
++o<n;
){j.push(i=[]);
for(var m=this[o],l=-1,k=m.length;
++l<k;
){i.push((p=m[l])?{node:p,delay:jS,duration:jR}:null)
}}return j2(j,jW||++jX,Date.now())
};
var j7=iY([[document]]);
j7[0].parentNode=iP,d3.select=function(b){return typeof b=="string"?j7.select(b):iY([[b]])
},d3.selectAll=function(b){return typeof b=="string"?j7.selectAll(b):iY([h6(b)])
};
var j3=[];
d3.selection.enter=j5,d3.selection.enter.prototype=j3,j3.append=iG.append,j3.insert=iG.insert,j3.empty=iG.empty,j3.node=iG.node,j3.select=function(v){var u=[],t,s,r,q,p;
for(var o=-1,n=this.length;
++o<n;
){r=(q=this[o]).update,u.push(t=[]),t.parentNode=q.parentNode;
for(var m=-1,l=q.length;
++m<l;
){(p=q[m])?(t.push(r[m]=s=v.call(q.parentNode,p.__data__,m)),s.__data__=p.__data__):t.push(null)
}}return iY(u)
};
var j1={},jY=[],jX=0,jW=0,jV=0,jU=250,jT=d3.ease("cubic-in-out"),jS=jV,jR=jU,jQ=jT;
jY.call=iG.call,d3.transition=function(b){return arguments.length?jW?b.transition():b:j7.transition()
},d3.transition.prototype=jY,jY.select=function(t){var s=[],r,q,p;
typeof t!="function"&&(t=iD(t));
for(var o=-1,n=this.length;
++o<n;
){s.push(r=[]);
for(var m=this[o],l=-1,k=m.length;
++l<k;
){(p=m[l])&&(q=t.call(p.node,p.node.__data__,l))?("__data__" in p.node&&(q.__data__=p.node.__data__),r.push({node:q,delay:p.delay,duration:p.duration})):r.push(null)
}}return j2(s,this.id,this.time).ease(this.ease())
},jY.selectAll=function(x){var w=[],v,u,t;
typeof x!="function"&&(x=iA(x));
for(var s=-1,r=this.length;
++s<r;
){for(var q=this[s],p=-1,o=q.length;
++p<o;
){if(t=q[p]){u=x.call(t.node,t.node.__data__,p),w.push(v=[]);
for(var n=-1,m=u.length;
++n<m;
){v.push({node:u[n],delay:t.delay,duration:t.duration})
}}}}return j2(w,this.id,this.time).ease(this.ease())
},jY.attr=function(d,c){return this.attrTween(d,jZ(d,c))
},jY.attrTween=function(g,f){function i(b,k){var c=f.call(this,b,k,this.getAttribute(j));
return c===j1?(this.removeAttribute(j),null):c&&function(d){this.setAttribute(j,c(d))
}
}function h(b,k){var c=f.call(this,b,k,this.getAttributeNS(j.space,j.local));
return c===j1?(this.removeAttributeNS(j.space,j.local),null):c&&function(d){this.setAttributeNS(j.space,j.local,c(d))
}
}var j=d3.ns.qualify(g);
return this.tween("attr."+g,j.local?h:i)
},jY.style=function(e,d,f){return arguments.length<3&&(f=""),this.styleTween(e,jZ(e,d),f)
},jY.styleTween=function(e,d,f){return arguments.length<3&&(f=""),this.tween("style."+e,function(c,b){var a=d.call(this,c,b,window.getComputedStyle(this,null).getPropertyValue(e));
return a===j1?(this.style.removeProperty(e),null):a&&function(g){this.style.setProperty(e,a(g),f)
}
})
},jY.text=function(b){return this.tween("text",function(a,d){this.textContent=typeof b=="function"?b.call(this,a,d):b
})
},jY.remove=function(){return this.each("end.transition",function(){var b;
!this.__transition__&&(b=this.parentNode)&&b.removeChild(this)
})
},jY.delay=function(b){return j8(this,typeof b=="function"?function(a,f,e){a.delay=b.call(a=a.node,a.__data__,f,e)|0
}:(b|=0,function(a){a.delay=b
}))
},jY.duration=function(b){return j8(this,typeof b=="function"?function(a,f,e){a.duration=Math.max(1,b.call(a=a.node,a.__data__,f,e)|0)
}:(b=Math.max(1,b|0),function(a){a.duration=b
}))
},jY.transition=function(){return this.select(hE)
};
var jO=null,jN,jM;
d3.timer=function(h,g,l){var k=!1,j,i=jO;
if(arguments.length<3){if(arguments.length<2){g=0
}else{if(!isFinite(g)){return
}}l=Date.now()
}while(i){if(i.callback===h){i.then=l,i.delay=g,k=!0;
break
}j=i,i=i.next
}k||(jO={callback:h,then:l,delay:g,next:jO}),jN||(jM=clearTimeout(jM),jN=1,jJ(jL))
},d3.timer.flush=function(){var e,d=Date.now(),f=jO;
while(f){e=d-f.then,f.delay||(f.flush=f.callback(e)),f=f.next
}jK()
};
var jJ=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b){setTimeout(b,17)
};
d3.transform=function(e){var d=document.createElementNS(d3.ns.prefix.svg,"g"),f={a:1,b:0,c:0,d:1,e:0,f:0};
return(d3.transform=function(b){d.setAttribute("transform",b);
var c=d.transform.baseVal.consolidate();
return new jI(c?c.matrix:f)
})(e)
},jI.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"
};
var ii=180/Math.PI;
d3.mouse=function(b){return ia(b,ir())
};
var ie=/WebKit/.test(navigator.userAgent)?-1:0;
d3.touches=function(d,c){return arguments.length<2&&(c=ir().touches),c?h6(c).map(function(a){var e=ia(d,a);
return e.identifier=a.identifier,e
}):[]
},d3.scale={},d3.scale.linear=function(){return hS([0,1],[0,1],d3.interpolate,!1)
},d3.scale.log=function(){return hu(d3.scale.linear(),ho)
};
var hr=d3.format(".0e");
ho.pow=function(b){return Math.pow(10,b)
},hl.pow=function(b){return -Math.pow(10,-b)
},d3.scale.pow=function(){return hi(d3.scale.linear(),1)
},d3.scale.sqrt=function(){return d3.scale.pow().exponent(0.5)
},d3.scale.ordinal=function(){return hc([],{t:"range",x:[]})
},d3.scale.category10=function(){return d3.scale.ordinal().range(g9)
},d3.scale.category20=function(){return d3.scale.ordinal().range(g6)
},d3.scale.category20b=function(){return d3.scale.ordinal().range(g3)
},d3.scale.category20c=function(){return d3.scale.ordinal().range(jD)
};
var g9=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],g6=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],g3=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"],jD=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];
d3.scale.quantile=function(){return jB([],[])
},d3.scale.quantize=function(){return jx(0,1,[0,1])
},d3.scale.identity=function(){return ju([0,1])
},d3.svg={},d3.svg.arc=function(){function h(){var t=g.apply(this,arguments),s=f.apply(this,arguments),r=j.apply(this,arguments)+jq,q=i.apply(this,arguments)+jq,p=(q<r&&(p=r,r=q,q=p),q-r),o=p<Math.PI?"0":"1",d=Math.cos(r),c=Math.sin(r),b=Math.cos(q),a=Math.sin(q);
return p>=jn?t?"M0,"+s+"A"+s+","+s+" 0 1,1 0,"+-s+"A"+s+","+s+" 0 1,1 0,"+s+"M0,"+t+"A"+t+","+t+" 0 1,0 0,"+-t+"A"+t+","+t+" 0 1,0 0,"+t+"Z":"M0,"+s+"A"+s+","+s+" 0 1,1 0,"+-s+"A"+s+","+s+" 0 1,1 0,"+s+"Z":t?"M"+s*d+","+s*c+"A"+s+","+s+" 0 "+o+",1 "+s*b+","+s*a+"L"+t*b+","+t*a+"A"+t+","+t+" 0 "+o+",0 "+t*d+","+t*c+"Z":"M"+s*d+","+s*c+"A"+s+","+s+" 0 "+o+",1 "+s*b+","+s*a+"L0,0Z"
}var g=jl,f=ji,j=jf,i=jc;
return h.innerRadius=function(a){return arguments.length?(g=hy(a),h):g
},h.outerRadius=function(b){return arguments.length?(f=hy(b),h):f
},h.startAngle=function(b){return arguments.length?(j=hy(b),h):j
},h.endAngle=function(b){return arguments.length?(i=hy(b),h):i
},h.centroid=function(){var b=(g.apply(this,arguments)+f.apply(this,arguments))/2,a=(j.apply(this,arguments)+i.apply(this,arguments))/2+jq;
return[Math.cos(a)*b,Math.sin(a)*b]
},h
};
var jq=-Math.PI/2,jn=2*Math.PI-0.000001;
d3.svg.line=function(){return i9(hH)
};
var iZ="linear",iW=d3.map({linear:iU,"step-before":iR,"step-after":iO,basis:iw,"basis-open":it,"basis-closed":ip,bundle:j4,cardinal:iF,"cardinal-open":iL,"cardinal-closed":iI,monotone:gK}),gZ=[0,2/3,1/3,0],gW=[0,1/3,2/3,0],gU=[0,1/6,2/3,1/6];
d3.svg.line.radial=function(){var b=i9(gI);
return b.radius=b.x,delete b.x,b.angle=b.y,delete b.y,b
},iR.reverse=iO,iO.reverse=iR,d3.svg.area=function(){return gG(Object)
},d3.svg.area.radial=function(){var b=gG(gI);
return b.radius=b.x,delete b.x,b.innerRadius=b.x0,delete b.x0,b.outerRadius=b.x1,delete b.x1,b.angle=b.y,delete b.y,b.startAngle=b.y0,delete b.y0,b.endAngle=b.y1,delete b.y1,b
},d3.svg.chord=function(){function o(h,g){var b=n(this,t,h,g),a=n(this,s,h,g);
return"M"+b.p0+l(b.r,b.p1,b.a1-b.a0)+(m(b,a)?k(b.r,b.p1,b.r,b.p0):k(b.r,b.p1,a.r,a.p0)+l(a.r,a.p1,a.a1-a.a0)+k(a.r,a.p1,b.r,b.p0))+"Z"
}function n(d,c,y,x){var w=c.call(d,y,x),v=r.call(d,w,x),u=q.call(d,w,x)+jq,e=p.call(d,w,x)+jq;
return{r:v,a0:u,a1:e,p0:[v*Math.cos(u),v*Math.sin(u)],p1:[v*Math.cos(e),v*Math.sin(e)]}
}function m(d,c){return d.a0==c.a0&&d.a1==c.a1
}function l(e,d,f){return"A"+e+","+e+" 0 "+ +(f>Math.PI)+",1 "+d
}function k(f,e,h,g){return"Q 0,0 "+g
}var t=gE,s=gC,r=gB,q=jf,p=jc;
return o.radius=function(b){return arguments.length?(r=hy(b),o):r
},o.source=function(a){return arguments.length?(t=hy(a),o):t
},o.target=function(b){return arguments.length?(s=hy(b),o):s
},o.startAngle=function(b){return arguments.length?(q=hy(b),o):q
},o.endAngle=function(b){return arguments.length?(p=hy(b),o):p
},o
},d3.svg.diagonal=function(){function g(l,k){var j=f.call(this,l,k),c=e.call(this,l,k),b=(j.y+c.y)/2,a=[j,{x:j.x,y:b},{x:c.x,y:b},c];
return a=a.map(h),"M"+a[0]+"C"+a[1]+" "+a[2]+" "+a[3]
}var f=gE,e=gC,h=gu;
return g.source=function(a){return arguments.length?(f=hy(a),g):f
},g.target=function(b){return arguments.length?(e=hy(b),g):e
},g.projection=function(b){return arguments.length?(h=b,g):h
},g
},d3.svg.diagonal.radial=function(){var e=d3.svg.diagonal(),d=gu,f=e.projection;
return e.projection=function(b){return arguments.length?f(gr(d=b)):d
},e
},d3.svg.mouse=d3.mouse,d3.svg.touches=d3.touches,d3.svg.symbol=function(){function f(b,a){return(f3.get(e.call(this,b,a))||f5)(d.call(this,b,a))
}var e=f7,d=f9;
return f.type=function(a){return arguments.length?(e=hy(a),f):e
},f.size=function(b){return arguments.length?(d=hy(b),f):d
},f
};
var f3=d3.map({circle:f5,cross:function(d){var c=Math.sqrt(d/5)/2;
return"M"+-3*c+","+-c+"H"+-c+"V"+-3*c+"H"+c+"V"+-c+"H"+3*c+"V"+c+"H"+c+"V"+3*c+"H"+-c+"V"+c+"H"+-3*c+"Z"
},diamond:function(e){var d=Math.sqrt(e/(2*e9)),f=d*e9;
return"M0,"+-d+"L"+f+",0 0,"+d+" "+-f+",0Z"
},square:function(d){var c=Math.sqrt(d)/2;
return"M"+-c+","+-c+"L"+c+","+-c+" "+c+","+c+" "+-c+","+c+"Z"
},"triangle-down":function(e){var d=Math.sqrt(e/f1),f=d*f1/2;
return"M0,"+f+"L"+d+","+-f+" "+-d+","+-f+"Z"
},"triangle-up":function(e){var d=Math.sqrt(e/f1),f=d*f1/2;
return"M0,"+-f+"L"+d+","+f+" "+-d+","+f+"Z"
}});
d3.svg.symbolTypes=f3.keys();
var f1=Math.sqrt(3),e9=Math.tan(30*Math.PI/180);
d3.svg.axis=function(){function l(a){a.each(function(){var ba=d3.select(this),Z=o==null?v.ticks?v.ticks.apply(v,p):v.domain():o,Y=n==null?v.tickFormat?v.tickFormat.apply(v,p):String:n,X=ik(v,Z,m),W=ba.selectAll(".minor").data(X,String),V=W.enter().insert("line","g").attr("class","tick minor").style("opacity",0.000001),T=d3.transition(W.exit()).style("opacity",0.000001).remove(),R=d3.transition(W).style("opacity",1),P=ba.selectAll("g").data(Z,String),N=P.enter().insert("g","path").style("opacity",0.000001),L=d3.transition(P.exit()).style("opacity",0.000001).remove(),j=d3.transition(P).style("opacity",1),h,f=h1(v),d=ba.selectAll(".domain").data([0]),b=d.enter().append("path").attr("class","domain"),U=d3.transition(d),S=v.copy(),Q=this.__chart__||S;
this.__chart__=S,N.append("line").attr("class","tick"),N.append("text");
var O=N.select("line"),M=j.select("line"),K=P.select("text").text(Y),i=N.select("text"),g=j.select("text");
switch(u){case"bottom":h=e7,V.attr("y2",s),R.attr("x2",0).attr("y2",s),O.attr("y2",t),i.attr("y",Math.max(t,0)+q),M.attr("x2",0).attr("y2",t),g.attr("x",0).attr("y",Math.max(t,0)+q),K.attr("dy",".71em").attr("text-anchor","middle"),U.attr("d","M"+f[0]+","+r+"V0H"+f[1]+"V"+r);
break;
case"top":h=e7,V.attr("y2",-s),R.attr("x2",0).attr("y2",-s),O.attr("y2",-t),i.attr("y",-(Math.max(t,0)+q)),M.attr("x2",0).attr("y2",-t),g.attr("x",0).attr("y",-(Math.max(t,0)+q)),K.attr("dy","0em").attr("text-anchor","middle"),U.attr("d","M"+f[0]+","+-r+"V0H"+f[1]+"V"+-r);
break;
case"left":h=e6,V.attr("x2",-s),R.attr("x2",-s).attr("y2",0),O.attr("x2",-t),i.attr("x",-(Math.max(t,0)+q)),M.attr("x2",-t).attr("y2",0),g.attr("x",-(Math.max(t,0)+q)).attr("y",0),K.attr("dy",".32em").attr("text-anchor","end"),U.attr("d","M"+-r+","+f[0]+"H0V"+f[1]+"H"+-r);
break;
case"right":h=e6,V.attr("x2",s),R.attr("x2",s).attr("y2",0),O.attr("x2",t),i.attr("x",Math.max(t,0)+q),M.attr("x2",t).attr("y2",0),g.attr("x",Math.max(t,0)+q).attr("y",0),K.attr("dy",".32em").attr("text-anchor","start"),U.attr("d","M"+r+","+f[0]+"H0V"+f[1]+"H"+r)
}if(v.ticks){N.call(h,Q),j.call(h,S),L.call(h,S),V.call(h,Q),R.call(h,S),T.call(h,S)
}else{var e=S.rangeBand()/2,c=function(k){return S(k)+e
};
N.call(h,c),j.call(h,c)
}})
}var v=d3.scale.linear(),u="bottom",t=6,s=6,r=6,q=3,p=[10],o=null,n,m=0;
return l.scale=function(a){return arguments.length?(v=a,l):v
},l.orient=function(b){return arguments.length?(u=b,l):u
},l.ticks=function(){return arguments.length?(p=arguments,l):p
},l.tickValues=function(b){return arguments.length?(o=b,l):o
},l.tickFormat=function(b){return arguments.length?(n=b,l):n
},l.tickSize=function(d,c,h){if(!arguments.length){return t
}var e=arguments.length-1;
return t=+d,s=e>1?+c:t,r=e>0?+arguments[e]:t,l
},l.tickPadding=function(b){return arguments.length?(q=+b,l):q
},l.tickSubdivide=function(b){return arguments.length?(m=+b,l):m
},l
},d3.svg.brush=function(){function p(b){b.each(function(){var g=d3.select(this),i=g.selectAll(".background").data([0]),h=g.selectAll(".extent").data([0]),d=g.selectAll(".resize").data(s,String),c;
g.style("pointer-events","all").on("mousedown.brush",l).on("touchstart.brush",l),i.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),h.enter().append("rect").attr("class","extent").style("cursor","move"),d.enter().append("g").attr("class",function(e){return"resize "+e
}).style("cursor",function(e){return ig[e]
}).append("rect").attr("x",function(e){return/[ew]$/.test(e)?-3:null
}).attr("y",function(e){return/^[ns]/.test(e)?-3:null
}).attr("width",6).attr("height",6).style("visibility","hidden"),d.style("display",p.empty()?"none":null),d.exit().remove(),u&&(c=h1(u),i.attr("x",c[0]).attr("width",c[1]-c[0]),n(g)),t&&(c=h1(t),i.attr("y",c[0]).attr("height",c[1]-c[0]),m(g)),o(g)
})
}function o(b){b.selectAll(".resize").attr("transform",function(c){return"translate("+r[+/e$/.test(c)][0]+","+r[+/^s/.test(c)][1]+")"
})
}function n(b){b.select(".extent").attr("x",r[0][0]),b.selectAll(".extent,.n>rect,.s>rect").attr("width",r[1][0]-r[0][0])
}function m(b){b.select(".extent").attr("y",r[0][1]),b.selectAll(".extent,.e>rect,.w>rect").attr("height",r[1][1]-r[0][1])
}function l(){function c(){var d=d3.event.changedTouches;
return d?d3.touches(N,d)[0]:d3.mouse(N)
}function b(){d3.event.keyCode==32&&(F||(D=null,i[0]-=r[1][0],i[1]-=r[1][1],F=2),iv())
}function a(){d3.event.keyCode==32&&F==2&&(i[0]+=r[1][0],i[1]+=r[1][1],F=0,iv())
}function G(){var k=c(),w=!1;
h&&(k[0]+=h[0],k[1]+=h[1]),F||(d3.event.altKey?(D||(D=[(r[0][0]+r[1][0])/2,(r[0][1]+r[1][1])/2]),i[0]=r[+(k[0]<D[0])][0],i[1]=r[+(k[1]<D[1])][1]):D=null),I&&E(k,u,0)&&(n(K),w=!0),H&&E(k,t,1)&&(m(K),w=!0),w&&(o(K),L({type:"brush",mode:F?"move":"resize"}))
}function E(Q,P,O){var C=h1(P),B=C[0],A=C[1],z=i[O],y=r[1][O]-r[0][O],x,w;
F&&(B-=z,A-=y+z),x=Math.max(B,Math.min(A,Q[O])),F?w=(x+=z)+y:(D&&(z=Math.max(B,Math.min(A,2*D[O]-x))),z<x?(w=x,x=z):w=z);
if(r[0][O]!==x||r[1][O]!==w){return q=null,r[0][O]=x,r[1][O]=w,!0
}}function j(){G(),K.style("pointer-events","all").selectAll(".resize").style("display",p.empty()?"none":null),d3.select("body").style("cursor",null),g.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),L({type:"brushend"}),iv()
}var N=this,M=d3.select(d3.event.target),L=v.of(N,arguments),K=d3.select(N),J=M.datum(),I=!/^(n|s)$/.test(J)&&u,H=!/^(e|w)$/.test(J)&&t,F=M.classed("extent"),D,i=c(),h,g=d3.select(window).on("mousemove.brush",G).on("mouseup.brush",j).on("touchmove.brush",G).on("touchend.brush",j).on("keydown.brush",b).on("keyup.brush",a);
if(F){i[0]=r[0][0]-i[0],i[1]=r[0][1]-i[1]
}else{if(J){var f=+/w$/.test(J),e=+/^n/.test(J);
h=[r[1-f][0]-i[0],r[1-e][1]-i[1]],i[0]=r[f][0],i[1]=r[e][1]
}else{d3.event.altKey&&(D=i.slice())
}}K.style("pointer-events","none").selectAll(".resize").style("display",null),d3.select("body").style("cursor",M.style("cursor")),L({type:"brushstart"}),G(),iv()
}var v=j6(p,"brushstart","brush","brushend"),u=null,t=null,s=ib[0],r=[[0,0],[0,0]],q;
return p.x=function(b){return arguments.length?(u=b,s=ib[!u<<1|!t],p):u
},p.y=function(b){return arguments.length?(t=b,s=ib[!u<<1|!t],p):t
},p.extent=function(b){var w,g,f,e,c;
return arguments.length?(q=[[0,0],[0,0]],u&&(w=b[0],g=b[1],t&&(w=w[0],g=g[0]),q[0][0]=w,q[1][0]=g,u.invert&&(w=u(w),g=u(g)),g<w&&(c=w,w=g,g=c),r[0][0]=w|0,r[1][0]=g|0),t&&(f=b[0],e=b[1],u&&(f=f[1],e=e[1]),q[0][1]=f,q[1][1]=e,t.invert&&(f=t(f),e=t(e)),e<f&&(c=f,f=e,e=c),r[0][1]=f|0,r[1][1]=e|0),p):(b=q||r,u&&(w=b[0][0],g=b[1][0],q||(w=r[0][0],g=r[1][0],u.invert&&(w=u.invert(w),g=u.invert(g)),g<w&&(c=w,w=g,g=c))),t&&(f=b[0][1],e=b[1][1],q||(f=r[0][1],e=r[1][1],t.invert&&(f=t.invert(f),e=t.invert(e)),e<f&&(c=f,f=e,e=c))),u&&t?[[w,f],[g,e]]:u?[w,g]:t&&[f,e])
},p.clear=function(){return q=null,r[0][0]=r[0][1]=r[1][0]=r[1][1]=0,p
},p.empty=function(){return u&&r[0][0]===r[1][0]||t&&r[0][1]===r[1][1]
},d3.rebind(p,v,"on")
};
var ig={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},ib=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]];
d3.behavior={},d3.behavior.drag=function(){function h(){this.on("mousedown.drag",g).on("touchstart.drag",g)
}function g(){function o(){var d=v.parentNode,c=d3.event.changedTouches;
return c?d3.touches(d,c)[0]:d3.mouse(d)
}function n(){if(!v.parentNode){return b()
}var d=o(),c=d[0]-r[0],i=d[1]-r[1];
q|=c|i,r=d,iv(),u({type:"drag",x:d[0]+s[0],y:d[1]+s[1],dx:c,dy:i})
}function b(){u({type:"dragend"}),q&&(iv(),d3.event.target===t&&p.on("click.drag",a,!0)),p.on("mousemove.drag",null).on("touchmove.drag",null).on("mouseup.drag",null).on("touchend.drag",null)
}function a(){iv(),p.on("click.drag",null)
}var v=this,u=f.of(v,arguments),t=d3.event.target,s,r=o(),q=0,p=d3.select(window).on("mousemove.drag",n).on("touchmove.drag",n).on("mouseup.drag",b,!0).on("touchend.drag",b,!0);
e?(s=e.apply(v,arguments),s=[s.x-r[0],s.y-r[1]]):s=[0,0],iv(),u({type:"dragstart"})
}var f=j6(h,"drag","dragstart","dragend"),e=null;
return h.origin=function(b){return arguments.length?(e=b,h):e
},d3.rebind(h,f,"on")
},d3.behavior.zoom=function(){function I(){this.on("mousedown.zoom",C).on("mousewheel.zoom",B).on("mousemove.zoom",A).on("DOMMouseScroll.zoom",B).on("dblclick.zoom",z).on("touchstart.zoom",y).on("touchmove.zoom",x).on("touchend.zoom",y)
}function H(a){return[(a[0]-T[0])/R,(a[1]-T[1])/R]
}function G(a){return[a[0]*R+T[0],a[1]*R+T[1]]
}function F(b){R=Math.max(P[0],Math.min(P[1],b))
}function E(a,d){d=G(d),T[0]+=a[0]-d[0],T[1]+=a[1]-d[1]
}function D(a){M&&M.domain(N.range().map(function(c){return(c-T[0])/R
}).map(N.invert)),K&&K.domain(L.range().map(function(c){return(c-T[1])/R
}).map(L.invert)),d3.event.preventDefault(),a({type:"zoom",scale:R,translate:T})
}function C(){function l(){o=1,E(d3.mouse(r),m),D(q)
}function k(){o&&iv(),n.on("mousemove.zoom",null).on("mouseup.zoom",null),o&&d3.event.target===p&&n.on("click.zoom",f,!0)
}function f(){iv(),n.on("click.zoom",null)
}var r=this,q=O.of(r,arguments),p=d3.event.target,o=0,n=d3.select(window).on("mousemove.zoom",l).on("mouseup.zoom",k),m=H(d3.mouse(r));
window.focus(),iv()
}function B(){S||(S=H(d3.mouse(this))),F(Math.pow(2,h3()*0.002)*R),E(d3.mouse(this),S),D(O.of(this,arguments))
}function A(){S=null
}function z(){var d=d3.mouse(this),c=H(d);
F(d3.event.shiftKey?R/2:R*2),E(d,c),D(O.of(this,arguments))
}function y(){var b=d3.touches(this),f=Date.now();
Q=R,S={},b.forEach(function(e){S[e.identifier]=H(e)
}),iv();
if(b.length===1&&f-J<500){var d=b[0],c=H(b[0]);
F(R*2),E(d,c),D(O.of(this,arguments))
}J=f
}function x(){var b=d3.touches(this),j=b[0],i=S[j.identifier];
if(f=b[1]){var f,d=S[f.identifier];
j=[(j[0]+f[0])/2,(j[1]+f[1])/2],i=[(i[0]+d[0])/2,(i[1]+d[1])/2],F(d3.event.scale*Q)
}E(j,i),D(O.of(this,arguments))
}var T=[0,0],S,R=1,Q,P=h5,O=j6(I,"zoom"),N,M,L,K,J;
return I.translate=function(a){return arguments.length?(T=a.map(Number),I):T
},I.scale=function(b){return arguments.length?(R=+b,I):R
},I.scaleExtent=function(b){return arguments.length?(P=b==null?h5:b.map(Number),I):P
},I.x=function(b){return arguments.length?(M=b,N=b.copy(),I):M
},I.y=function(b){return arguments.length?(K=b,L=b.copy(),I):K
},d3.rebind(I,O,"on")
};
var h8,h5=[0,Infinity];
d3.layout={},d3.layout.bundle=function(){return function(f){var e=[],h=-1,g=f.length;
while(++h<g){e.push(h0(f[h]))
}return e
}
},d3.layout.chord=function(){function m(){var A={},i=[],h=d3.range(r),g=[],f,e,d,c,b;
u=[],t=[],f=0,c=-1;
while(++c<r){e=0,b=-1;
while(++b<r){e+=s[c][b]
}i.push(e),g.push(d3.range(r)),f+=e
}p&&h.sort(function(w,j){return p(i[w],i[j])
}),o&&g.forEach(function(w,j){w.sort(function(x,y){return o(s[j][x],s[j][y])
})
}),f=(2*Math.PI-q*r)/f,e=0,c=-1;
while(++c<r){d=e,b=-1;
while(++b<r){var F=h[c],E=g[F][b],D=s[F][E],C=e,B=e+=D*f;
A[F+"-"+E]={index:F,subindex:E,startAngle:C,endAngle:B,value:D}
}t[F]={index:F,startAngle:d,endAngle:e,value:(e-d)/f},e+=q
}c=-1;
while(++c<r){b=c-1;
while(++b<r){var z=A[c+"-"+b],k=A[b+"-"+c];
(z.value||k.value)&&u.push(z.value<k.value?{source:k,target:z}:{source:z,target:k})
}}n&&l()
}function l(){u.sort(function(d,c){return n((d.source.value+d.target.value)/2,(c.source.value+c.target.value)/2)
})
}var v={},u,t,s,r,q=0,p,o,n;
return v.matrix=function(a){return arguments.length?(r=(s=a)&&s.length,u=t=null,v):s
},v.padding=function(a){return arguments.length?(q=a,u=t=null,v):q
},v.sortGroups=function(a){return arguments.length?(p=a,u=t=null,v):p
},v.sortSubgroups=function(a){return arguments.length?(o=a,u=null,v):o
},v.sortChords=function(a){return arguments.length?(n=a,u&&l(),v):n
},v.chords=function(){return u||m(),u
},v.groups=function(){return t||m(),t
},v
},d3.layout.force=function(){function p(b){return function(t,s,r,q,o){if(t.point!==b){var n=t.cx-b.x,l=t.cy-b.y,k=1/Math.sqrt(n*n+l*l);
if((q-s)*k<B){var a=t.charge*k*k;
return b.px-=n*a,b.py-=l*a,!0
}if(t.point&&isFinite(k)){var a=t.pointCharge*k*k;
b.px-=n*a,b.py-=l*a
}}return !t.charge
}
}function m(a){hL(hN=a),hQ=L
}var L={},K=d3.dispatch("start","tick","end"),J=[1,1],I,H,G=0.9,F=hw,E=ht,D=-30,C=0.1,B=0.8,A,z=[],y=[],x,w,v;
return L.tick=function(){if((H*=0.99)<0.005){return K.end({type:"end",alpha:H=0}),!0
}var o=z.length,n=y.length,j,i,f,e,c,b,s,r,q;
for(i=0;
i<n;
++i){f=y[i],e=f.source,c=f.target,r=c.x-e.x,q=c.y-e.y;
if(b=r*r+q*q){b=H*w[i]*((b=Math.sqrt(b))-x[i])/b,r*=b,q*=b,c.x-=r*(s=e.weight/(c.weight+e.weight)),c.y-=q*s,e.x+=r*(s=1-s),e.y+=q*s
}}if(s=H*C){r=J[0]/2,q=J[1]/2,i=-1;
if(s){while(++i<o){f=z[i],f.x+=(r-f.x)*s,f.y+=(q-f.y)*s
}}}if(D){hz(j=d3.geom.quadtree(z),H,v),i=-1;
while(++i<o){(f=z[i]).fixed||j.visit(p(f))
}}i=-1;
while(++i<o){f=z[i],f.fixed?(f.x=f.px,f.y=f.py):(f.x-=(f.px-(f.px=f.x))*G,f.y-=(f.py-(f.py=f.y))*G)
}K.tick({type:"tick",alpha:H})
},L.nodes=function(a){return arguments.length?(z=a,L):z
},L.links=function(a){return arguments.length?(y=a,L):y
},L.size=function(a){return arguments.length?(J=a,L):J
},L.linkDistance=function(a){return arguments.length?(F=hy(a),L):F
},L.distance=L.linkDistance,L.linkStrength=function(a){return arguments.length?(E=hy(a),L):E
},L.friction=function(a){return arguments.length?(G=a,L):G
},L.charge=function(a){return arguments.length?(D=typeof a=="function"?a:+a,L):D
},L.gravity=function(a){return arguments.length?(C=a,L):C
},L.theta=function(a){return arguments.length?(B=a,L):B
},L.alpha=function(a){return arguments.length?(H?a>0?H=a:H=0:a>0&&(K.start({type:"start",alpha:H=a}),d3.timer(L.tick)),L):H
},L.start=function(){function a(b,u){var t=s(r),l=-1,k=t.length,j;
while(++l<k){if(!isNaN(j=t[l][b])){return j
}}return Math.random()*u
}function s(){if(!g){g=[];
for(q=0;
q<o;
++q){g[q]=[]
}for(q=0;
q<n;
++q){var b=y[q];
g[b.source.index].push(b.target),g[b.target.index].push(b.source)
}}return g[r]
}var r,q,o=z.length,n=y.length,i=J[0],h=J[1],g,c;
for(r=0;
r<o;
++r){(c=z[r]).index=r,c.weight=0
}x=[],w=[];
for(r=0;
r<n;
++r){c=y[r],typeof c.source=="number"&&(c.source=z[c.source]),typeof c.target=="number"&&(c.target=z[c.target]),x[r]=F.call(this,c,r),w[r]=E.call(this,c,r),++c.source.weight,++c.target.weight
}for(r=0;
r<o;
++r){c=z[r],isNaN(c.x)&&(c.x=a("x",i)),isNaN(c.y)&&(c.y=a("y",h)),isNaN(c.px)&&(c.px=c.x),isNaN(c.py)&&(c.py=c.y)
}v=[];
if(typeof D=="function"){for(r=0;
r<o;
++r){v[r]=+D.call(this,z[r],r)
}}else{for(r=0;
r<o;
++r){v[r]=D
}}return L.resume()
},L.resume=function(){return L.alpha(0.1)
},L.stop=function(){return L.alpha(0)
},L.drag=function(){I||(I=d3.behavior.drag().origin(hH).on("dragstart",m).on("drag",hC).on("dragend",hF)),this.on("mouseover.force",hL).on("mouseout.force",hI).call(I)
},d3.rebind(L,K,"on")
};
var hQ,hN;
d3.layout.partition=function(){function j(r,q,p,o){var n=r.children;
r.x=q,r.y=r.depth*o,r.dx=p,r.dy=o;
if(n&&(l=n.length)){var m=-1,l,k,c;
p=r.value?p/r.value:0;
while(++m<l){j(k=n[m],q,c=k.value*p,o),q+=c
}}}function i(k){var d=k.children,n=0;
if(d&&(l=d.length)){var m=-1,l;
while(++m<l){n=Math.max(n,i(d[m]))
}}return 1+n
}function h(c,b){var a=g.call(this,c,b);
return j(a[0],0,f[0],f[1]/i(a[0])),a
}var g=d3.layout.hierarchy(),f=[1,1];
return h.size=function(b){return arguments.length?(f=b,h):f
},d5(h,g)
},d3.layout.pie=function(){function h(n,m){var e=n.map(function(k,l){return +g.call(h,k,l)
}),d=+(typeof j=="function"?j.apply(this,arguments):j),c=((typeof i=="function"?i.apply(this,arguments):i)-j)/d3.sum(e),b=d3.range(n.length);
f!=null&&b.sort(f===hp?function(l,k){return e[k]-e[l]
}:function(k,l){return f(n[k],n[l])
});
var a=[];
return b.forEach(function(l){var k;
a[l]={data:n[l],value:k=e[l],startAngle:d,endAngle:d+=k*c}
}),a
}var g=Number,f=hp,j=0,i=2*Math.PI;
return h.value=function(a){return arguments.length?(g=a,h):g
},h.sort=function(b){return arguments.length?(f=b,h):f
},h.startAngle=function(b){return arguments.length?(j=b,h):j
},h.endAngle=function(b){return arguments.length?(i=b,h):i
},h
};
var hp={};
d3.layout.stack=function(){function j(v,u){var t=v.map(function(o,p){return i.call(j,o,p)
}),s=t.map(function(p,o){return p.map(function(r,q){return[l.call(j,r,q),k.call(j,r,q)]
})
}),g=h.call(j,s,u);
t=d3.permute(t,g),s=d3.permute(s,g);
var f=n.call(j,s,u),e=t.length,d=t[0].length,c,b,a;
for(b=0;
b<d;
++b){m.call(j,t[0][b],a=f[b],s[0][b][1]);
for(c=1;
c<e;
++c){m.call(j,t[c][b],a+=s[c-1][b][1],s[c][b][1])
}}return v
}var i=hH,h=g8,n=g5,m=hh,l=hn,k=hk;
return j.values=function(a){return arguments.length?(i=a,j):i
},j.order=function(b){return arguments.length?(h=typeof b=="function"?b:hd.get(b)||g8,j):h
},j.offset=function(b){return arguments.length?(n=typeof b=="function"?b:ha.get(b)||g5,j):n
},j.x=function(b){return arguments.length?(l=b,j):l
},j.y=function(b){return arguments.length?(k=b,j):k
},j.out=function(b){return arguments.length?(m=b,j):m
},j
};
var hd=d3.map({"inside-out":function(v){var u=v.length,t,s,r=v.map(jz),q=v.map(g2),p=d3.range(u).sort(function(d,c){return r[d]-r[c]
}),o=0,n=0,m=[],l=[];
for(t=0;
t<u;
++t){s=p[t],o<n?(o+=q[s],m.push(s)):(n+=q[s],l.push(s))
}return l.reverse().concat(m)
},reverse:function(b){return d3.range(b.length).reverse()
},"default":g8}),ha=d3.map({silhouette:function(r){var q=r.length,p=r[0].length,o=[],n=0,m,l,k,j=[];
for(l=0;
l<p;
++l){for(m=0,k=0;
m<q;
m++){k+=r[m][l][1]
}k>n&&(n=k),o.push(k)
}for(l=0;
l<p;
++l){j[l]=(n-o[l])/2
}return j
},wiggle:function(D){var C=D.length,B=D[0],A=B.length,z=0,y,x,w,v,u,t,s,r,q,p=[];
p[0]=r=q=0;
for(x=1;
x<A;
++x){for(y=0,v=0;
y<C;
++y){v+=D[y][x][1]
}for(y=0,u=0,s=B[x][0]-B[x-1][0];
y<C;
++y){for(w=0,t=(D[y][x][1]-D[y][x-1][1])/(2*s);
w<y;
++w){t+=(D[w][x][1]-D[w][x-1][1])/s
}u+=t*D[y][x][1]
}p[x]=r-=v?u/v*s:0,r<q&&(q=r)
}for(x=0;
x<A;
++x){p[x]-=q
}return p
},expand:function(j){var i=j.length,p=j[0].length,o=1/i,n,m,l,k=[];
for(m=0;
m<p;
++m){for(n=0,l=0;
n<i;
n++){l+=j[n][m][1]
}if(l){for(n=0;
n<i;
n++){j[n][m][1]/=l
}}else{for(n=0;
n<i;
n++){j[n][m][1]=o
}}}for(m=0;
m<p;
++m){k[m]=0
}return k
},zero:g5});
d3.layout.histogram=function(){function h(v,u){var t=[],s=v.map(f,this),r=j.call(this,s,u),q=i.call(this,r,s,u),p,u=-1,d=s.length,c=q.length-1,b=g?1:1/d,a;
while(++u<c){p=t[u]=[],p.dx=q[u+1]-(p.x=q[u]),p.y=0
}if(c>0){u=-1;
while(++u<d){a=s[u],a>=r[0]&&a<=r[1]&&(p=t[d3.bisect(q,a,1,c)-1],p.y+=b,p.push(v[u]))
}}return t
}var g=!0,f=Number,j=d6,i=e0;
return h.value=function(b){return arguments.length?(f=b,h):f
},h.range=function(b){return arguments.length?(j=hy(b),h):j
},h.bins=function(b){return arguments.length?(i=typeof b=="number"?function(a){return d9(a,b)
}:hy(b),h):i
},h.frequency=function(a){return arguments.length?(g=!!a,h):g
},h
},d3.layout.hierarchy=function(){function k(v,u,t){var s=g.call(i,v,u),r=c3?v:{data:v};
r.depth=u,t.push(r);
if(s&&(f=s.length)){var q=-1,f,d=r.children=[],c=0,b=u+1,a;
while(++q<f){a=k(s[q],b,t),a.parent=r,d.push(a),c+=a.value
}h&&d.sort(h),l&&(r.value=c)
}else{l&&(r.value=+l.call(i,v,u)||0)
}return r
}function j(e,c){var p=e.children,o=0;
if(p&&(m=p.length)){var n=-1,m,f=c+1;
while(++n<m){o+=j(p[n],f)
}}else{l&&(o=+l.call(i,c3?e:e.data,c)||0)
}return l&&(e.value=o),o
}function i(d){var c=[];
return k(d,0,c),c
}var h=c7,g=d2,l=d0;
return i.sort=function(a){return arguments.length?(h=a,i):h
},i.children=function(b){return arguments.length?(g=b,i):g
},i.value=function(b){return arguments.length?(l=b,i):l
},i.revalue=function(b){return j(b,0),b
},i
};
var c3=!1;
d3.layout.pack=function(){function f(n,m){var l=e.call(this,n,m),k=l[0];
k.x=0,k.y=0,a7(k);
var j=d[0],b=d[1],a=1/Math.max(2*k.r/j,2*k.r/b);
return a5(k,j/2,b/2,a),l
}var e=d3.layout.hierarchy().sort(c1),d=[1,1];
return f.size=function(b){return arguments.length?(d=b,f):d
},d5(f,e)
},d3.layout.cluster=function(){function g(x,w){var v=f.call(this,x,w),u=v[0],t,s=0,r,q;
gR(u,function(d){var i=d.children;
i&&i.length?(d.x=a0(i),d.y=a1(i)):(d.x=t?s+=e(d,t):0,d.y=0,t=d)
});
var p=aX(u),c=aW(u),b=p.x-e(p,c)/2,a=c.x+e(c,p)/2;
return gR(u,function(d){d.x=(d.x-b)/(a-b)*h[0],d.y=(1-(u.y?d.y/u.y:1))*h[1]
}),v
}var f=d3.layout.hierarchy().sort(null).value(null),e=aT,h=[1,1];
return g.separation=function(b){return arguments.length?(e=b,g):e
},g.size=function(b){return arguments.length?(h=b,g):h
},d5(g,f)
},d3.layout.tree=function(){function g(z,y){function v(H,G){var F=H.children,E=H._tree;
if(F&&(D=F.length)){var D,C=F[0],B,A=C,p,o=-1;
while(++o<D){p=F[o],v(p,B),A=t(p,B,A),B=p
}gP(H);
var j=0.5*(C._tree.prelim+p._tree.prelim);
G?(E.prelim=G._tree.prelim+e(H,G),E.mod=E.prelim-j):E.prelim=j
}else{G&&(E.prelim=G._tree.prelim+e(H,G))
}}function u(j,i){j.x=j._tree.prelim+i;
var m=j.children;
if(m&&(k=m.length)){var l=-1,k;
i+=j._tree.mod;
while(++l<k){u(m[l],i)
}}}function t(I,H,G){if(H){var F=I,E=I,D=H,C=I.parent.children[0],B=F._tree.mod,A=E._tree.mod,p=D._tree.mod,o=C._tree.mod,n;
while(D=g1(D),F=aS(F),D&&F){C=aS(C),E=g1(E),E._tree.ancestor=I,n=D._tree.prelim+p-F._tree.prelim-B+e(D,F),n>0&&(gN(gL(D,I,G),I,n),B+=n,A+=n),p+=D._tree.mod,B+=F._tree.mod,o+=C._tree.mod,A+=E._tree.mod
}D&&!g1(E)&&(E._tree.thread=D,E._tree.mod+=p-A),F&&!aS(C)&&(C._tree.thread=F,C._tree.mod+=B-o,G=I)
}return G
}var x=f.call(this,z,y),w=x[0];
gR(w,function(i,d){i._tree={ancestor:i,prelim:0,mod:0,change:0,shift:0,number:d?d._tree.number+1:0}
}),v(w),u(w,-w._tree.prelim);
var s=g0(w,gV),r=g0(w,gX),q=g0(w,gT),c=s.x-e(s,r)/2,b=r.x+e(r,s)/2,a=q.depth||1;
return gR(w,function(d){d.x=(d.x-c)/(b-c)*h[0],d.y=d.depth/a*h[1],delete d._tree
}),x
}var f=d3.layout.hierarchy().sort(null).value(null),e=aT,h=[1,1];
return g.separation=function(b){return arguments.length?(e=b,g):e
},g.size=function(b){return arguments.length?(h=b,g):h
},d5(g,f)
},d3.layout.treemap=function(){function t(h,g){var l=-1,k=h.length,j,i;
while(++l<k){i=(j=h[l]).value*(g<0?0:g),j.area=isNaN(i)||i<=0?0:i
}}function s(G){var F=G.children;
if(F&&F.length){var E=x(G),D=[],C=F.slice(),m,l=Infinity,j,i=Math.min(E.dx,E.dy),e;
t(C,E.dx*E.dy/G.value),D.area=0;
while((e=C.length)>0){D.push(m=C[e-1]),D.area+=m.area,(j=q(D,i))<=l?(C.pop(),l=j):(D.area-=D.pop().area,p(D,i,E,!1),i=Math.min(E.dx,E.dy),D.length=D.area=0,l=Infinity)
}D.length&&(p(D,i,E,!0),D.length=D.area=0),F.forEach(s)
}}function r(h){var e=h.children;
if(e&&e.length){var l=x(h),k=e.slice(),j,i=[];
t(k,l.dx*l.dy/h.value),i.area=0;
while(j=k.pop()){i.push(j),i.area+=j.area,j.z!=null&&(p(i,j.z?l.dx:l.dy,l,!k.length),i.length=i.area=0)
}e.forEach(r)
}}function q(j,h){var D=j.area,C,n=0,m=Infinity,l=-1,k=j.length;
while(++l<k){if(!(C=j[l].area)){continue
}C<m&&(m=C),C>n&&(n=C)
}return D*=D,h*=h,D?Math.max(h*n*u/D,D/(h*m*u)):Infinity
}function p(H,G,F,E){var D=-1,C=H.length,n=F.x,m=F.y,l=G?A(H.area/G):0,b;
if(G==F.dx){if(E||l>F.dy){l=F.dy
}while(++D<C){b=H[D],b.x=n,b.y=m,b.dy=l,n+=b.dx=Math.min(F.x+F.dx-n,l?A(b.area/l):0)
}b.z=!0,b.dx+=F.x+F.dx-n,F.y+=l,F.dy-=l
}else{if(E||l>F.dx){l=F.dx
}while(++D<C){b=H[D],b.x=n,b.y=m,b.dx=l,m+=b.dy=Math.min(F.y+F.dy-m,l?A(b.area/l):0)
}b.z=!1,b.dy+=F.y+F.dy-m,F.x+=l,F.dx-=l
}}function o(a){var f=v||B(a),c=f[0];
return c.x=0,c.y=0,c.dx=z[0],c.dy=z[1],v&&B.revalue(c),t([c],c.dx*c.dy/c.value),(v?r:s)(c),w&&(v=f),f
}var B=d3.layout.hierarchy(),A=Math.round,z=[1,1],y=null,x=gJ,w=!1,v,u=0.5*(1+Math.sqrt(5));
return o.size=function(b){return arguments.length?(z=b,o):z
},o.padding=function(e){function d(a){var f=e.call(o,a,a.depth);
return f==null?gJ(a):gH(a,typeof f=="number"?[f,f,f,f]:f)
}function h(a){return gH(a,e)
}if(!arguments.length){return y
}var g;
return x=(y=e)==null?gJ:(g=typeof e)==="function"?d:g==="number"?(e=[e,e,e,e],h):h,o
},o.round=function(b){return arguments.length?(A=b?Math.round:Number,o):A!=Number
},o.sticky=function(b){return arguments.length?(w=b,v=null,o):w
},o.ratio=function(b){return arguments.length?(u=b,o):u
},d5(o,B)
},d3.csv=function(d,c){d3.text(d,"text/csv",function(b){c(b&&d3.csv.parse(b))
})
},d3.csv.parse=function(d){var c;
return d3.csv.parseRows(d,function(b,j){if(j){var i={},h=-1,g=c.length;
while(++h<g){i[c[h]]=b[h]
}return i
}return c=b,null
})
},d3.csv.parseRows=function(v,u){function m(){if(q.lastIndex>=v.length){return s
}if(n){return n=!1,t
}var a=q.lastIndex;
if(v.charCodeAt(a)===34){var f=a;
while(f++<v.length){if(v.charCodeAt(f)===34){if(v.charCodeAt(f+1)!==34){break
}f++
}}q.lastIndex=f+2;
var d=v.charCodeAt(f+1);
return d===13?(n=!0,v.charCodeAt(f+2)===10&&q.lastIndex++):d===10&&(n=!0),v.substring(a+1,f).replace(/""/g,'"')
}var c=q.exec(v);
return c?(n=c[0].charCodeAt(0)!==44,v.substring(a,c.index)):(q.lastIndex=v.length,v.substring(a))
}var t={},s={},r=[],q=/\r\n|[,\r\n]/g,p=0,o,n;
q.lastIndex=0;
while((o=m())!==s){var l=[];
while(o!==t&&o!==s){l.push(o),o=m()
}if(u&&!(l=u(l,p++))){continue
}r.push(l)
}return r
},d3.csv.format=function(b){return b.map(gF).join("\n")
},d3.geo={};
var gA=Math.PI/180;
d3.geo.azimuthal=function(){function j(x){var w=x[0]*gA-n,v=x[1]*gA,u=Math.cos(w),t=Math.sin(w),s=Math.cos(v),h=Math.sin(v),g=r!=="orthographic"?k*h+l*s*u:null,e,d=r==="stereographic"?1/(1+g):r==="gnomonic"?1/g:r==="equidistant"?(e=Math.acos(g),e?e/Math.sin(e):0):r==="equalarea"?Math.sqrt(2/(1+g)):1,c=d*s*t,a=d*(k*s*u-l*h);
return[p*c+o[0],p*a+o[1]]
}var r="orthographic",q,p=200,o=[480,250],n,m,l,k;
return j.invert=function(c){var s=(c[0]-o[0])/p,h=(c[1]-o[1])/p,g=Math.sqrt(s*s+h*h),e=r==="stereographic"?2*Math.atan(g):r==="gnomonic"?Math.atan(g):r==="equidistant"?g:r==="equalarea"?2*Math.asin(0.5*g):Math.asin(g),d=Math.sin(e),a=Math.cos(e);
return[(n+Math.atan2(s*d,g*l*a+h*k*d))/gA,Math.asin(a*k-(g?h*d*l/g:0))/gA]
},j.mode=function(a){return arguments.length?(r=a+"",j):r
},j.origin=function(b){return arguments.length?(q=b,n=q[0]*gA,m=q[1]*gA,l=Math.cos(m),k=Math.sin(m),j):q
},j.scale=function(b){return arguments.length?(p=+b,j):p
},j.translate=function(b){return arguments.length?(o=[+b[0],+b[1]],j):o
},j.origin([0,0])
},d3.geo.albers=function(){function l(d){var c=o*(gA*d[0]-p),e=Math.sqrt(n-2*o*Math.sin(gA*d[1]))/o;
return[r*e*Math.sin(c)+q[0],r*(e*Math.cos(c)-m)+q[1]]
}function k(){var g=gA*s[0],f=gA*s[1],e=gA*t[1],b=Math.sin(g),a=Math.cos(g);
return p=gA*t[0],o=0.5*(b+Math.sin(f)),n=a*a+2*o*b,m=Math.sqrt(n-2*o*Math.sin(e))/o,l
}var t=[-98,38],s=[29.5,45.5],r=1000,q=[480,250],p,o,n,m;
return l.invert=function(e){var c=(e[0]-q[0])/r,h=(e[1]-q[1])/r,g=m+h,f=Math.atan2(c,g),d=Math.sqrt(c*c+g*g);
return[(p+f/o)/gA,Math.asin((n-d*d*o*o)/(2*o))/gA]
},l.origin=function(a){return arguments.length?(t=[+a[0],+a[1]],k()):t
},l.parallels=function(b){return arguments.length?(s=[+b[0],+b[1]],k()):s
},l.scale=function(b){return arguments.length?(r=+b,l):r
},l.translate=function(b){return arguments.length?(q=[+b[0],+b[1]],l):q
},k()
},d3.geo.albersUsa=function(){function h(c){var b=c[0],a=c[1];
return(a>50?f:b<-140?j:a<21?i:g)(c)
}var g=d3.geo.albers(),f=d3.geo.albers().origin([-160,60]).parallels([55,65]),j=d3.geo.albers().origin([-160,20]).parallels([8,18]),i=d3.geo.albers().origin([-60,10]).parallels([8,18]);
return h.scale=function(a){return arguments.length?(g.scale(a),f.scale(a*0.6),j.scale(a),i.scale(a*1.5),h.translate(g.translate())):g.scale()
},h.translate=function(d){if(!arguments.length){return g.translate()
}var c=g.scale()/1000,b=d[0],a=d[1];
return g.translate(d),f.translate([b-400*c,a+170*c]),j.translate([b-190*c,a+200*c]),i.translate([b+580*c,a+430*c]),h
},h.scale(g.scale())
},d3.geo.bonne=function(){function j(e){var d=e[0]*gA-n,c=e[1]*gA-m;
if(l){var b=k+l-c,a=d*Math.cos(c)/b;
d=b*Math.sin(a),c=b*Math.cos(a)-k
}else{d*=Math.cos(c),c*=-1
}return[i*d+h[0],i*c+h[1]]
}var i=200,h=[480,250],n,m,l,k;
return j.invert=function(f){var e=(f[0]-h[0])/i,c=(f[1]-h[1])/i;
if(l){var b=k+c,a=Math.sqrt(e*e+b*b);
c=k+l-a,e=n+a*Math.atan2(e,b)/Math.cos(c)
}else{c*=-1,e/=Math.cos(c)
}return[e/gA,c/gA]
},j.parallel=function(b){return arguments.length?(k=1/Math.tan(l=b*gA),j):l/gA
},j.origin=function(b){return arguments.length?(n=b[0]*gA,m=b[1]*gA,j):[n/gA,m/gA]
},j.scale=function(a){return arguments.length?(i=+a,j):i
},j.translate=function(b){return arguments.length?(h=[+b[0],+b[1]],j):h
},j.origin([0,0]).parallel(45)
},d3.geo.equirectangular=function(){function f(g){var b=g[0]/360,a=-g[1]/360;
return[e*b+d[0],e*a+d[1]]
}var e=500,d=[480,250];
return f.invert=function(g){var b=(g[0]-d[0])/e,a=(g[1]-d[1])/e;
return[360*b,-360*a]
},f.scale=function(a){return arguments.length?(e=+a,f):e
},f.translate=function(b){return arguments.length?(d=[+b[0],+b[1]],f):d
},f
},d3.geo.mercator=function(){function f(g){var b=g[0]/360,a=-(Math.log(Math.tan(Math.PI/4+g[1]*gA/2))/gA)/360;
return[e*b+d[0],e*Math.max(-0.5,Math.min(0.5,a))+d[1]]
}var e=500,d=[480,250];
return f.invert=function(g){var b=(g[0]-d[0])/e,a=(g[1]-d[1])/e;
return[360*b,2*Math.atan(Math.exp(-360*a*gA))/gA-90]
},f.scale=function(a){return arguments.length?(e=+a,f):e
},f.translate=function(b){return arguments.length?(d=[+b[0],+b[1]],f):d
},f
},d3.geo.path=function(){function t(d,b){typeof x=="function"&&(w=gx(x.apply(this,arguments))),r(d);
var a=u.length?u.join(""):null;
return u=[],a
}function s(b){return v(b).join(",")
}function p(f){var e=m(f[0]),h=0,g=f.length;
while(++h<g){e-=m(f[h])
}return e
}function o(D){var C=d3.geom.polygon(D[0].map(v)),B=C.area(),A=C.centroid(B<0?(B*=-1,1):-1),z=A[0],y=A[1],l=B,k=0,c=D.length;
while(++k<c){C=d3.geom.polygon(D[k].map(v)),B=C.area(),A=C.centroid(B<0?(B*=-1,1):-1),z-=A[0],y-=A[1],l-=B
}return[z,y,6*l]
}function m(b){return Math.abs(d3.geom.polygon(b.map(v)).area())
}var x=4.5,w=gx(x),v=d3.geo.albersUsa(),u=[],r=gz({FeatureCollection:function(f){var d=f.features,h=-1,g=d.length;
while(++h<g){u.push(r(d[h].geometry))
}},Feature:function(b){r(b.geometry)
},Point:function(b){u.push("M",s(b.coordinates),w)
},MultiPoint:function(b){var h=b.coordinates,f=-1,d=h.length;
while(++f<d){u.push("M",s(h[f]),w)
}},LineString:function(f){var d=f.coordinates,h=-1,g=d.length;
u.push("M");
while(++h<g){u.push(s(d[h]),"L")
}u.pop()
},MultiLineString:function(f){var d=f.coordinates,z=-1,y=d.length,l,k,j;
while(++z<y){l=d[z],k=-1,j=l.length,u.push("M");
while(++k<j){u.push(s(l[k]),"L")
}u.pop()
}},Polygon:function(f){var d=f.coordinates,z=-1,y=d.length,l,k,j;
while(++z<y){l=d[z],k=-1;
if((j=l.length-1)>0){u.push("M");
while(++k<j){u.push(s(l[k]),"L")
}u[u.length-1]="Z"
}}},MultiPolygon:function(F){var E=F.coordinates,D=-1,C=E.length,B,A,z,y,f,d;
while(++D<C){B=E[D],A=-1,z=B.length;
while(++A<z){y=B[A],f=-1;
if((d=y.length-1)>0){u.push("M");
while(++f<d){u.push(s(y[f]),"L")
}u[u.length-1]="Z"
}}}},GeometryCollection:function(f){var d=f.geometries,h=-1,g=d.length;
while(++h<g){u.push(r(d[h]))
}}}),q=t.area=gz({FeatureCollection:function(g){var f=0,j=g.features,i=-1,h=j.length;
while(++i<h){f+=q(j[i])
}return f
},Feature:function(b){return q(b.geometry)
},Polygon:function(b){return p(b.coordinates)
},MultiPolygon:function(g){var f=0,j=g.coordinates,i=-1,h=j.length;
while(++i<h){f+=p(j[i])
}return f
},GeometryCollection:function(g){var f=0,j=g.geometries,i=-1,h=j.length;
while(++i<h){f+=q(j[i])
}return f
}},0),n=t.centroid=gz({Feature:function(b){return n(b.geometry)
},Polygon:function(d){var c=o(d.coordinates);
return[c[0]/c[2],c[1]/c[2]]
},MultiPolygon:function(D){var C=0,B=D.coordinates,A,z=0,y=0,l=0,k=-1,j=B.length;
while(++k<j){A=o(B[k]),z+=A[0],y+=A[1],l+=A[2]
}return[z/l,y/l]
}});
return t.projection=function(b){return v=b,t
},t.pointRadius=function(a){return typeof a=="function"?x=a:(x=+a,w=gx(x)),t
},t
},d3.geo.bounds=function(g){var f=Infinity,j=Infinity,i=-Infinity,h=-Infinity;
return gw(g,function(b,c){b<f&&(f=b),b>i&&(i=b),c<j&&(j=c),c>h&&(h=c)
}),[[f,j],[i,h]]
};
var gt={Feature:gs,FeatureCollection:gq,GeometryCollection:f8,LineString:f6,MultiLineString:f4,MultiPoint:f6,MultiPolygon:f2,Point:f0,Polygon:e8};
d3.geo.circle=function(){function n(){}function m(b){return o.distance(b)<p
}function k(x){var w=-1,v=x.length,u=[],t,s,i,d,c;
while(++w<v){c=o.distance(i=x[w]),c<p?(s&&u.push(aP(s,i)((d-p)/(d-c))),u.push(i),t=s=null):(s=i,!t&&u.length&&(u.push(aP(u[u.length-1],s)((p-d)/(c-d))),t=s)),d=c
}return t=x[0],s=u[0],s&&i[0]===t[0]&&i[1]===t[1]&&(i[0]!==s[0]||i[1]!==s[1])&&u.push(s),j(u)
}function j(s){var d=0,y=s.length,x,w,v=y?[s[0]]:s,u,t=o.source();
while(++d<y){u=o.source(s[d-1])(s[d]).coordinates;
for(x=0,w=u.length;
++x<w;
){v.push(u[x])
}}return o.source(t),v
}var r=[0,0],q=89.99,p=q*gA,o=d3.geo.greatArc().source(r).target(hH);
n.clip=function(a){return typeof r=="function"&&o.source(r.apply(this,arguments)),l(a)||null
};
var l=gz({FeatureCollection:function(d){var c=d.features.map(l).filter(hH);
return c&&(d=Object.create(d),d.features=c,d)
},Feature:function(d){var c=l(d.geometry);
return c&&(d=Object.create(d),d.geometry=c,d)
},Point:function(b){return m(b.coordinates)&&b
},MultiPoint:function(d){var c=d.coordinates.filter(m);
return c.length&&{type:d.type,coordinates:c}
},LineString:function(d){var c=k(d.coordinates);
return c.length&&(d=Object.create(d),d.coordinates=c,d)
},MultiLineString:function(d){var c=d.coordinates.map(k).filter(function(b){return b.length
});
return c.length&&(d=Object.create(d),d.coordinates=c,d)
},Polygon:function(d){var c=d.coordinates.map(k);
return c[0].length&&(d=Object.create(d),d.coordinates=c,d)
},MultiPolygon:function(d){var c=d.coordinates.map(function(b){return b.map(k)
}).filter(function(b){return b[0].length
});
return c.length&&(d=Object.create(d),d.coordinates=c,d)
},GeometryCollection:function(d){var c=d.geometries.map(l).filter(hH);
return c.length&&(d=Object.create(d),d.geometries=c,d)
}});
return n.origin=function(a){return arguments.length?(r=a,typeof r!="function"&&o.source(r),n):r
},n.angle=function(b){return arguments.length?(p=(q=+b)*gA,n):q
},d3.rebind(n,o,"precision")
},d3.geo.greatArc=function(){function j(){var b=j.distance.apply(this,arguments),f=0,e=l/b,d=[h];
while((f+=e)<1){d.push(k(f))
}return d.push(m),{type:"LineString",coordinates:d}
}var i=id,h,n=e5,m,l=6*gA,k=aQ();
return j.distance=function(){return typeof i=="function"&&k.source(h=i.apply(this,arguments)),typeof n=="function"&&k.target(m=n.apply(this,arguments)),k.distance()
},j.source=function(a){return arguments.length?(i=a,typeof i!="function"&&k.source(h=i),j):i
},j.target=function(b){return arguments.length?(n=b,typeof n!="function"&&k.target(m=n),j):n
},j.precision=function(b){return arguments.length?(l=b*gA,j):l/gA
},j
},d3.geo.greatCircle=d3.geo.circle,d3.geom={},d3.geom.contour=function(v,u){var t=u||aM(v),s=[],r=t[0],q=t[1],p=0,o=0,n=NaN,m=NaN,l=0;
do{l=0,v(r-1,q-1)&&(l+=1),v(r,q-1)&&(l+=2),v(r-1,q)&&(l+=4),v(r,q)&&(l+=8),l===6?(p=m===-1?-1:1,o=0):l===9?(p=0,o=n===1?-1:1):(p=aO[l],o=aN[l]),p!=n&&o!=m&&(s.push([r,q]),n=p,m=o),r+=p,q+=o
}while(t[0]!=r||t[1]!=q);
return s
};
var aO=[1,0,1,1,-1,0,-1,1,0,0,0,0,-1,0,-1,NaN],aN=[0,-1,0,0,0,-1,0,0,1,-1,1,1,0,-1,0,NaN];
d3.geom.hull=function(H){if(H.length<3){return[]
}var G=H.length,F=G-1,E=[],D=[],C,B,A=0,z,y,x,w,v,u,t,s;
for(C=1;
C<G;
++C){H[C][1]<H[A][1]?A=C:H[C][1]==H[A][1]&&(A=H[C][0]<H[A][0]?C:A)
}for(C=0;
C<G;
++C){if(C===A){continue
}y=H[C][1]-H[A][1],z=H[C][0]-H[A][0],E.push({angle:Math.atan2(y,z),index:C})
}E.sort(function(d,c){return d.angle-c.angle
}),t=E[0].angle,u=E[0].index,v=0;
for(C=1;
C<F;
++C){B=E[C].index,t==E[C].angle?(z=H[u][0]-H[A][0],y=H[u][1]-H[A][1],x=H[B][0]-H[A][0],w=H[B][1]-H[A][1],z*z+y*y>=x*x+w*w?E[C].index=-1:(E[v].index=-1,t=E[C].angle,v=C,u=B)):(t=E[C].angle,v=C,u=B)
}D.push(A);
for(C=0,B=0;
C<2;
++B){E[B].index!==-1&&(D.push(E[B].index),C++)
}s=D.length;
for(;
B<F;
++B){if(E[B].index===-1){continue
}while(!aL(D[s-2],D[s-1],E[B].index,H)){--s
}D[s++]=E[B].index
}var r=[];
for(C=0;
C<s;
++C){r.push(H[D[C]])
}return r
},d3.geom.polygon=function(b){return b.area=function(){var a=0,h=b.length,g=b[h-1][0]*b[0][1],f=b[h-1][1]*b[0][0];
while(++a<h){g+=b[a-1][0]*b[a][1],f+=b[a-1][1]*b[a][0]
}return(f-g)*0.5
},b.centroid=function(a){var p=-1,o=b.length,n=0,m=0,l,k=b[o-1],j;
arguments.length||(a=-1/(6*b.area()));
while(++p<o){l=k,k=b[p],j=l[0]*k[1]-k[0]*l[1],n+=(l[0]+k[0])*j,m+=(l[1]+k[1])*j
}return[n*a,m*a]
},b.clip=function(t){var s,r=-1,q=b.length,p,o,n=b[q-1],m,l,a;
while(++r<q){s=t.slice(),t.length=0,m=b[r],l=s[(o=s.length)-1],p=-1;
while(++p<o){a=s[p],aK(a,n,m)?(aK(l,n,m)||t.push(aJ(l,a,n,m)),t.push(a)):aK(l,n,m)&&t.push(aJ(l,a,n,m)),l=a
}n=m
}return t
},b
},d3.geom.voronoi=function(d){var c=d.map(function(){return[]
});
return aH(d,function(r){var q,p,o,n,m,l;
r.a===1&&r.b>=0?(q=r.ep.r,p=r.ep.l):(q=r.ep.l,p=r.ep.r),r.a===1?(m=q?q.y:-1000000,o=r.c-r.b*m,l=p?p.y:1000000,n=r.c-r.b*l):(o=q?q.x:-1000000,m=r.c-r.a*o,n=p?p.x:1000000,l=r.c-r.a*n);
var k=[o,m],b=[n,l];
c[r.region.l.index].push(k,b),c[r.region.r.index].push(k,b)
}),c.map(function(a,h){var g=d[h][0],f=d[h][1];
return a.forEach(function(b){b.angle=Math.atan2(b[0]-g,b[1]-f)
}),a.sort(function(i,e){return i.angle-e.angle
}).filter(function(b,e){return !e||b.angle-a[e-1].angle>1e-10
})
})
};
var aI={l:"r",r:"l"};
d3.geom.delaunay=function(e){var d=e.map(function(){return[]
}),f=[];
return aH(e,function(a){d[a.region.l.index].push(e[a.region.r.index])
}),d.forEach(function(a,n){var m=e[n],l=m[0],k=m[1];
a.forEach(function(b){b.angle=Math.atan2(b[0]-l,b[1]-k)
}),a.sort(function(h,g){return h.angle-g.angle
});
for(var j=0,c=a.length-1;
j<c;
j++){f.push([m,a[j],a[j+1]])
}}),f
},d3.geom.quadtree=function(z,y,x,w,v){function p(i,h,A,m,l,k){if(isNaN(h.x)||isNaN(h.y)){return
}if(i.leaf){var j=i.point;
j?Math.abs(j.x-h.x)+Math.abs(j.y-h.y)<0.01?o(i,h,A,m,l,k):(i.point=null,o(i,j,A,m,l,k),o(i,h,A,m,l,k)):i.point=h
}else{o(i,h,A,m,l,k)
}}function o(I,H,G,F,E,D){var C=(G+E)*0.5,B=(F+D)*0.5,A=H.x>=C,m=H.y>=B,k=(m<<1)+A;
I.leaf=!1,I=I.nodes[k]||(I.nodes[k]=aG()),A?G=C:E=C,m?F=B:D=B,p(I,H,G,F,E,D)
}var u,t=-1,s=z.length;
s&&isNaN(z[0].x)&&(z=z.map(aE));
if(arguments.length<5){if(arguments.length===3){v=w=x,x=y
}else{y=x=Infinity,w=v=-Infinity;
while(++t<s){u=z[t],u.x<y&&(y=u.x),u.y<x&&(x=u.y),u.x>w&&(w=u.x),u.y>v&&(v=u.y)
}var r=w-y,q=v-x;
r>q?v=x+r:w=y+q
}}var n=aG();
return n.add=function(b){p(n,b,y,x,w,v)
},n.visit=function(b){aF(b,n,y,x,w,v)
},z.forEach(n.add),n
},d3.time={};
var aD=Date;
aC.prototype={getDate:function(){return this._.getUTCDate()
},getDay:function(){return this._.getUTCDay()
},getFullYear:function(){return this._.getUTCFullYear()
},getHours:function(){return this._.getUTCHours()
},getMilliseconds:function(){return this._.getUTCMilliseconds()
},getMinutes:function(){return this._.getUTCMinutes()
},getMonth:function(){return this._.getUTCMonth()
},getSeconds:function(){return this._.getUTCSeconds()
},getTime:function(){return this._.getTime()
},getTimezoneOffset:function(){return 0
},valueOf:function(){return this._.valueOf()
},setDate:function(){aB.setUTCDate.apply(this._,arguments)
},setDay:function(){aB.setUTCDay.apply(this._,arguments)
},setFullYear:function(){aB.setUTCFullYear.apply(this._,arguments)
},setHours:function(){aB.setUTCHours.apply(this._,arguments)
},setMilliseconds:function(){aB.setUTCMilliseconds.apply(this._,arguments)
},setMinutes:function(){aB.setUTCMinutes.apply(this._,arguments)
},setMonth:function(){aB.setUTCMonth.apply(this._,arguments)
},setSeconds:function(){aB.setUTCSeconds.apply(this._,arguments)
},setTime:function(){aB.setTime.apply(this._,arguments)
}};
var aB=Date.prototype;
d3.time.format=function(e){function f(l){var k=[],j=-1,i=0,b,a;
while(++j<d){e.charCodeAt(j)==37&&(k.push(e.substring(i,j),(a=av[b=e.charAt(++j)])?a(l):b),i=j+1)
}return k.push(e.substring(i,j)),k.join("")
}var d=e.length;
return f.parse=function(a){var i={y:1900,m:0,d:1,H:0,M:0,S:0,L:0},h=aA(i,e,a,0);
if(h!=a.length){return null
}"p" in i&&(i.H=i.H%12+i.p*12);
var g=new aD;
return g.setFullYear(i.y,i.m,i.d),g.setHours(i.H,i.M,i.S,i.L),g
},f.toString=function(){return e
},f
};
var az=d3.format("02d"),ay=d3.format("03d"),ax=d3.format("04d"),aw=d3.format("2d"),av={a:function(b){return e2[b.getDay()].substring(0,3)
},A:function(b){return e2[b.getDay()]
},b:function(b){return c9[b.getMonth()].substring(0,3)
},B:function(b){return c9[b.getMonth()]
},c:d3.time.format("%a %b %e %H:%M:%S %Y"),d:function(b){return az(b.getDate())
},e:function(b){return aw(b.getDate())
},H:function(b){return az(b.getHours())
},I:function(b){return az(b.getHours()%12||12)
},j:function(b){return ay(1+d3.time.dayOfYear(b))
},L:function(b){return ay(b.getMilliseconds())
},m:function(b){return az(b.getMonth()+1)
},M:function(b){return az(b.getMinutes())
},p:function(b){return b.getHours()>=12?"PM":"AM"
},S:function(b){return az(b.getSeconds())
},U:function(b){return az(d3.time.sundayOfYear(b))
},w:function(b){return b.getDay()
},W:function(b){return az(d3.time.mondayOfYear(b))
},x:d3.time.format("%m/%d/%y"),X:d3.time.format("%H:%M:%S"),y:function(b){return az(b.getFullYear()%100)
},Y:function(b){return ax(b.getFullYear()%10000)
},Z:aY,"%":function(b){return"%"
}},au={a:at,A:ar,b:e1,B:d7,c:c8,d:b4,e:b4,H:b2,I:b2,L:a6,m:b6,M:b0,p:a2,S:a8,x:c6,X:c4,y:c0,Y:c2},aq=/^(?:sun|mon|tue|wed|thu|fri|sat)/i,e4=/^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i,e2=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d8=d3.map({jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11}),d4=/^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,d1=d3.map({january:0,february:1,march:2,april:3,may:4,june:5,july:6,august:7,september:8,october:9,november:10,december:11}),c9=["January","February","March","April","May","June","July","August","September","October","November","December"],a3=/\s*\d+/,aZ=d3.map({am:0,pm:1});
d3.time.format.utc=function(e){function f(b){try{aD=aC;
var g=new aD;
return g._=b,d(g)
}finally{aD=Date
}}var d=d3.time.format(e);
return f.parse=function(b){try{aD=aC;
var g=d.parse(b);
return g&&g._
}finally{aD=Date
}},f.toString=d.toString,f
};
var aV=d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
d3.time.format.iso=Date.prototype.toISOString?aU:aV,aU.parse=function(d){var c=new Date(d);
return isNaN(c)?null:c
},aU.toString=aV.toString,d3.time.second=gY(function(b){return new aD(Math.floor(b/1000)*1000)
},function(d,c){d.setTime(d.getTime()+Math.floor(c)*1000)
},function(b){return b.getSeconds()
}),d3.time.seconds=d3.time.second.range,d3.time.seconds.utc=d3.time.second.utc.range,d3.time.minute=gY(function(b){return new aD(Math.floor(b/60000)*60000)
},function(d,c){d.setTime(d.getTime()+Math.floor(c)*60000)
},function(b){return b.getMinutes()
}),d3.time.minutes=d3.time.minute.range,d3.time.minutes.utc=d3.time.minute.utc.range,d3.time.hour=gY(function(d){var c=d.getTimezoneOffset()/60;
return new aD((Math.floor(d/3600000-c)+c)*3600000)
},function(d,c){d.setTime(d.getTime()+Math.floor(c)*3600000)
},function(b){return b.getHours()
}),d3.time.hours=d3.time.hour.range,d3.time.hours.utc=d3.time.hour.utc.range,d3.time.day=gY(function(b){return new aD(b.getFullYear(),b.getMonth(),b.getDate())
},function(d,c){d.setDate(d.getDate()+c)
},function(b){return b.getDate()-1
}),d3.time.days=d3.time.day.range,d3.time.days.utc=d3.time.day.utc.range,d3.time.dayOfYear=function(d){var c=d3.time.year(d);
return Math.floor((d-c)/86400000-(d.getTimezoneOffset()-c.getTimezoneOffset())/1440)
},e2.forEach(function(e,d){e=e.toLowerCase(),d=7-d;
var f=d3.time[e]=gY(function(b){return(b=d3.time.day(b)).setDate(b.getDate()-(b.getDay()+d)%7),b
},function(g,c){g.setDate(g.getDate()+Math.floor(c)*7)
},function(b){var g=d3.time.year(b).getDay();
return Math.floor((d3.time.dayOfYear(b)+(g+d)%7)/7)-(g!==d)
});
d3.time[e+"s"]=f.range,d3.time[e+"s"].utc=f.utc.range,d3.time[e+"OfYear"]=function(b){var g=d3.time.year(b).getDay();
return Math.floor((d3.time.dayOfYear(b)+(g+d)%7)/7)
}
}),d3.time.week=d3.time.sunday,d3.time.weeks=d3.time.sunday.range,d3.time.weeks.utc=d3.time.sunday.utc.range,d3.time.weekOfYear=d3.time.sundayOfYear,d3.time.month=gY(function(b){return new aD(b.getFullYear(),b.getMonth(),1)
},function(d,c){d.setMonth(d.getMonth()+c)
},function(b){return b.getMonth()
}),d3.time.months=d3.time.month.range,d3.time.months.utc=d3.time.month.utc.range,d3.time.year=gY(function(b){return new aD(b.getFullYear(),0,1)
},function(d,c){d.setFullYear(d.getFullYear()+c)
},function(b){return b.getFullYear()
}),d3.time.years=d3.time.year.range,d3.time.years.utc=d3.time.year.utc.range;
var aj=[1000,5000,15000,30000,60000,300000,900000,1800000,3600000,10800000,21600000,43200000,86400000,172800000,604800000,2592000000,7776000000,31536000000],ai=[[d3.time.second,1],[d3.time.second,5],[d3.time.second,15],[d3.time.second,30],[d3.time.minute,1],[d3.time.minute,5],[d3.time.minute,15],[d3.time.minute,30],[d3.time.hour,1],[d3.time.hour,3],[d3.time.hour,6],[d3.time.hour,12],[d3.time.day,1],[d3.time.day,2],[d3.time.week,1],[d3.time.month,1],[d3.time.month,3],[d3.time.year,1]],ah=[[d3.time.format("%Y"),function(b){return !0
}],[d3.time.format("%B"),function(b){return b.getMonth()
}],[d3.time.format("%b %d"),function(b){return b.getDate()!=1
}],[d3.time.format("%a %d"),function(b){return b.getDay()&&b.getDate()!=1
}],[d3.time.format("%I %p"),function(b){return b.getHours()
}],[d3.time.format("%I:%M"),function(b){return b.getMinutes()
}],[d3.time.format(":%S"),function(b){return b.getSeconds()
}],[d3.time.format(".%L"),function(b){return b.getMilliseconds()
}]],ag=d3.scale.linear(),af=am(ah);
ai.year=function(d,c){return ag.domain(d.map(ak)).ticks(c).map(al)
},d3.time.scale=function(){return ap(d3.scale.linear(),ai,af)
};
var ae=ai.map(function(b){return[b[0].utc,b[1]]
}),ad=[[d3.time.format.utc("%Y"),function(b){return !0
}],[d3.time.format.utc("%B"),function(b){return b.getUTCMonth()
}],[d3.time.format.utc("%b %d"),function(b){return b.getUTCDate()!=1
}],[d3.time.format.utc("%a %d"),function(b){return b.getUTCDay()&&b.getUTCDate()!=1
}],[d3.time.format.utc("%I %p"),function(b){return b.getUTCHours()
}],[d3.time.format.utc("%I:%M"),function(b){return b.getUTCMinutes()
}],[d3.time.format.utc(":%S"),function(b){return b.getUTCSeconds()
}],[d3.time.format.utc(".%L"),function(b){return b.getUTCMilliseconds()
}]],ac=am(ad);
ae.year=function(d,c){return ag.domain(d.map(aa)).ticks(c).map(ab)
},d3.time.scale.utc=function(){return ap(d3.scale.linear(),ae,ac)
}
})();