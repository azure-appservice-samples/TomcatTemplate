(function(){function f(h,g,i){return function(m,l,j){var c=h(m),b=[];
c<m&&g(c);
if(j>1){while(c<l){var a=new Date(+c);
i(a)%j===0&&b.push(a),g(c)
}}else{while(c<l){b.push(new Date(+c)),g(c)
}}return b
}
}function d(g,c){return(new Date(c,g+1,0)).getDate()
}var e={version:"0.0.1a",dev:!0};
window.nv=e,e.tooltip={},e.utils={},e.models={},e.charts={},e.graphs=[],e.logs={},e.dispatch=d3.dispatch("render_start","render_end"),e.dev&&(e.dispatch.on("render_start",function(a){e.logs.startTime=+(new Date)
}),e.dispatch.on("render_end",function(a){e.logs.endTime=+(new Date),e.logs.totalTime=e.logs.endTime-e.logs.startTime,e.log("total",e.logs.totalTime)
})),e.log=function(){e.dev&&console.log&&console.log.apply(console,arguments);
return arguments[arguments.length-1]
},e.render=function d(a){a=a||1,d.active=!0,e.dispatch.render_start(),setTimeout(function(){var c;
for(var b=0;
b<a&&(graph=d.queue[b]);
b++){c=graph.generate(),typeof graph.callback==typeof Function&&graph.callback(c),e.graphs.push(c)
}d.queue.splice(0,b),d.queue.length?setTimeout(arguments.callee,0):(e.render.active=!1,e.dispatch.render_end())
},0)
},e.render.queue=[],e.addGraph=function(a){typeof arguments[0]==typeof Function&&(a={generate:arguments[0],callback:arguments[1]}),e.render.queue.push(a),e.render.active||e.render()
},e.identity=function(b){return b
},e.strip=function(b){return b.replace(/(\s|&)/g,"")
},d3.time.monthEnd=function(b){return new Date(b.getFullYear(),b.getMonth(),0)
},d3.time.monthEnds=f(d3.time.monthEnd,function(b){b.setUTCDate(b.getUTCDate()+1),b.setDate(d(b.getMonth()+1,b.getFullYear()))
},function(b){return b.getMonth()
}),function(){var a=window.nv.tooltip={};
a.show=function(G,F,E,D,C,B){var A=document.createElement("div");
A.className="nvtooltip "+(B?B:"xy-tooltip"),E=E||"s",D=D||20;
var z=C?C:document.getElementsByTagName("body")[0];
A.innerHTML=F,A.style.left=0,A.style.top=0,A.style.opacity=0,z.appendChild(A);
var y=parseInt(A.offsetHeight),x=parseInt(A.offsetWidth),w=e.utils.windowSize().width,v=e.utils.windowSize().height,u=z.scrollTop,t=z.scrollLeft,s,r;
switch(E){case"e":s=G[0]-x-D,r=G[1]-y/2,s<t&&(s=G[0]+D),r<u&&(r=u+5),r+y>u+v&&(r=u-y-5);
break;
case"w":s=G[0]+D,r=G[1]-y/2,s+x>w&&(s=G[0]-x-D),r<u&&(r=u+5),r+y>u+v&&(r=u-y-5);
break;
case"n":s=G[0]-x/2,r=G[1]+D,s<t&&(s=t+5),s+x>w&&(s=w-x-5),r+y>u+v&&(r=G[1]-y-D);
break;
case"s":s=G[0]-x/2,r=G[1]-y-D,s<t&&(s=t+5),s+x>w&&(s=w-x-5),u>r&&(r=G[1]+20)
}A.style.left=s+"px",A.style.top=r+"px",A.style.opacity=1,A.style.position="absolute",A.style.pointerEvents="none";
return A
},a.cleanup=function(){var g=document.getElementsByClassName("nvtooltip"),c=[];
while(g.length){c.push(g[0]),g[0].style.transitionDelay="0 !important",g[0].style.opacity=0,g[0].className="nvtooltip-pending-removal"
}setTimeout(function(){while(c.length){var b=c.pop();
b.parentNode.removeChild(b)
}},500)
}
}(),e.utils.windowSize=function(){var b={width:640,height:480};
document.body&&document.body.offsetWidth&&(b.width=document.body.offsetWidth,b.height=document.body.offsetHeight),document.compatMode=="CSS1Compat"&&document.documentElement&&document.documentElement.offsetWidth&&(b.width=document.documentElement.offsetWidth,b.height=document.documentElement.offsetHeight),window.innerWidth&&window.innerHeight&&(b.width=window.innerWidth,b.height=window.innerHeight);
return b
},e.utils.windowResize=function(g){var c=window.onresize;
window.onresize=function(a){typeof c=="function"&&c(a),g(a)
}
},e.utils.getColor=function(b){return Object.prototype.toString.call(b)==="[object Array]"?function(a,g){return a.color||b[g%b.length]
}:b
},e.utils.defaultColor=function(){var b=d3.scale.category20().range();
return function(a,g){return a.color||b[g%b.length]
}
},e.utils.pjax=function(a,h){function g(b){d3.html(b,function(i){var c=d3.select(h).node();
c.parentNode.replaceChild(d3.select(i).select(h).node(),c),e.utils.pjax(a,h)
})
}d3.selectAll(a).on("click",function(){history.pushState(this.href,this.textContent,this.href),g(this.href),d3.event.preventDefault()
}),d3.select(window).on("popstate",function(){d3.event.state&&g(d3.event.state)
})
},e.models.axis=function(){function n(a){a.each(function(B){var l=d3.select(this),j=l.selectAll("g.nv-wrap.nv-axis").data([B]),i=j.enter().append("g").attr("class","nvd3 nv-wrap nv-axis"),h=i.append("g"),g=j.select("g");
q!==null?p.ticks(q):(p.orient()=="top"||p.orient()=="bottom")&&p.ticks(Math.abs(x.range()[1]-x.range()[0])/100),d3.transition(g).call(p),o=o||p.scale();
var c=g.selectAll("text.nv-axislabel").data([w||null]);
c.exit().remove();
switch(p.orient()){case"top":c.enter().append("text").attr("class","nv-axislabel").attr("text-anchor","middle").attr("y",0);
var H=x.range().length==2?x.range()[1]:x.range()[x.range().length-1]+(x.range()[1]-x.range()[0]);
c.attr("x",H/2);
if(v){var G=j.selectAll("g.nv-axisMaxMin").data(x.domain());
G.enter().append("g").attr("class","nv-axisMaxMin").append("text"),G.exit().remove(),G.attr("transform",function(I,m){return"translate("+x(I)+",0)"
}).select("text").attr("dy","0em").attr("y",-p.tickPadding()).attr("text-anchor","middle").text(function(I,m){return(""+p.tickFormat()(I)).match("NaN")?"":p.tickFormat()(I)
}),d3.transition(G).attr("transform",function(I,m){return"translate("+x.range()[m]+",0)"
})
}break;
case"bottom":var F=30,E=30;
if(t%360){var D=g.selectAll("g").select("text");
D.each(function(I,m){var J=this.getBBox().width;
J>E&&(E=J)
});
var C=Math.abs(Math.sin(t*Math.PI/180)),F=(C?C*E:E)+30;
D.attr("transform",function(I,m,J){return"rotate("+t+" 0,0)"
}).attr("text-anchor",t%360>0?"start":"end")
}c.enter().append("text").attr("class","nv-axislabel").attr("text-anchor","middle").attr("y",F);
var H=x.range().length==2?x.range()[1]:x.range()[x.range().length-1]+(x.range()[1]-x.range()[0]);
c.attr("x",H/2);
if(v){var G=j.selectAll("g.nv-axisMaxMin").data(x.domain());
G.enter().append("g").attr("class","nv-axisMaxMin").append("text"),G.exit().remove(),G.attr("transform",function(I,m){return"translate("+x(I)+",0)"
}).select("text").attr("dy",".71em").attr("y",p.tickPadding()).attr("transform",function(I,m,J){return"rotate("+t+" 0,0)"
}).attr("text-anchor",t%360>0?"start":"end").text(function(I,m){return(""+p.tickFormat()(I)).match("NaN")?"":p.tickFormat()(I)
}),d3.transition(G).attr("transform",function(I,m){return"translate("+x.range()[m]+",0)"
})
}break;
case"right":c.enter().append("text").attr("class","nv-axislabel").attr("text-anchor",s?"middle":"begin").attr("transform",s?"rotate(90)":"").attr("y",s?-Math.max(r.right,z)-12:-10),c.attr("x",s?x.range()[0]/2:p.tickPadding());
if(v){var G=j.selectAll("g.nv-axisMaxMin").data(x.domain());
G.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0),G.exit().remove(),G.attr("transform",function(I,m){return"translate(0,"+x(I)+")"
}).select("text").attr("dy",".32em").attr("y",0).attr("x",p.tickPadding()).attr("text-anchor","start").text(function(I,m){return(""+p.tickFormat()(I)).match("NaN")?"":p.tickFormat()(I)
}),d3.transition(G).attr("transform",function(I,m){return"translate(0,"+x.range()[m]+")"
}).select("text").style("opacity",1)
}break;
case"left":c.enter().append("text").attr("class","nv-axislabel").attr("text-anchor",s?"middle":"end").attr("transform",s?"rotate(-90)":"").attr("y",s?-Math.max(r.left,z)+12:-10),c.attr("x",s?-x.range()[0]/2:-p.tickPadding());
if(v){var G=j.selectAll("g.nv-axisMaxMin").data(x.domain());
G.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0),G.exit().remove(),G.attr("transform",function(I,m){return"translate(0,"+o(I)+")"
}).select("text").attr("dy",".32em").attr("y",0).attr("x",-p.tickPadding()).attr("text-anchor","end").text(function(I,m){return(""+p.tickFormat()(I)).match("NaN")?"":p.tickFormat()(I)
}),d3.transition(G).attr("transform",function(I,m){return"translate(0,"+x.range()[m]+")"
}).select("text").style("opacity",1)
}}c.text(function(b){return b
}),v&&(p.orient()==="left"||p.orient()==="right")&&g.selectAll("g").each(function(I,m){if(x(I)<x.range()[1]+10||x(I)>x.range()[0]-10){I>1e-10||I<-1e-10?d3.select(this).remove():d3.select(this).select("text").remove()
}});
if(v&&(p.orient()==="top"||p.orient()==="bottom")){var A=[];
j.selectAll("g.nv-axisMaxMin").each(function(I,m){m?A.push(x(I)-this.getBBox().width-4):A.push(x(I)+this.getBBox().width+4)
}),g.selectAll("g").each(function(I,m){if(x(I)<A[0]||x(I)>A[1]){I>1e-10||I<-1e-10?d3.select(this).remove():d3.select(this).select("text").remove()
}})
}u&&g.selectAll("line.tick").filter(function(b){return !parseFloat(Math.round(b*100000)/1000000)
}).classed("zero",!0),o=x.copy()
});
return n
}var z=60,y=60,x=d3.scale.linear(),w=null,v=!0,u=!0,t=0,s=!0,r={top:0,right:0,bottom:0,left:0},q=null,p=d3.svg.axis().scale(x).orient("bottom").tickFormat(function(b){return b
}),o;
d3.rebind(n,p,"orient","tickValues","tickSubdivide","tickSize","tickPadding","tickFormat"),d3.rebind(n,x,"domain","range","rangeBand","rangeBands"),n.width=function(a){if(!arguments.length){return z
}z=a;
return n
},n.ticks=function(b){if(!arguments.length){return q
}q=b;
return n
},n.height=function(b){if(!arguments.length){return y
}y=b;
return n
},n.axisLabel=function(b){if(!arguments.length){return w
}w=b;
return n
},n.showMaxMin=function(b){if(!arguments.length){return v
}v=b;
return n
},n.highlightZero=function(b){if(!arguments.length){return u
}u=b;
return n
},n.scale=function(b){if(!arguments.length){return x
}x=b,p.scale(x),d3.rebind(n,x,"domain","range","rangeBand","rangeBands");
return n
},n.rotateYLabel=function(b){if(!arguments.length){return s
}s=b;
return n
},n.rotateLabels=function(b){if(!arguments.length){return t
}t=b;
return n
},n.margin=function(b){if(!arguments.length){return r
}r=b;
return n
};
return n
},e.models.historicalBar=function(){function a(b){b.each(function(l){var h=I-J.left-J.right,c=H-J.top-J.bottom;
x.domain(z||d3.extent(l[0].values.map(F).concat(D))).range([0,h]),w.domain(y||d3.extent(l[0].values.map(E).concat(C))).range([c,0]);
if(x.domain()[0]===x.domain()[1]||w.domain()[0]===w.domain()[1]){singlePoint=!0
}x.domain()[0]===x.domain()[1]&&(x.domain()[0]?x.domain([x.domain()[0]-x.domain()[0]*0.01,x.domain()[1]+x.domain()[1]*0.01]):x.domain([-1,1])),w.domain()[0]===w.domain()[1]&&(w.domain()[0]?w.domain([w.domain()[0]+w.domain()[0]*0.01,w.domain()[1]-w.domain()[1]*0.01]):w.domain([-1,1]));
var K=d3.select(this).on("click",function(q,p){t.chartClick({data:q,index:p,pos:d3.event,id:G})
}),r=d3.select(this).selectAll("g.nv-wrap.nv-bar").data([l[0].values]),o=r.enter().append("g").attr("class","nvd3 nv-wrap nv-bar"),n=o.append("g");
n.append("g").attr("class","nv-bars"),r.attr("width",I).attr("height",H);
var m=r.select("g").attr("transform","translate("+J.left+","+J.top+")");
o.append("defs").append("clipPath").attr("id","nv-chart-clip-path-"+G).append("rect"),r.select("#nv-chart-clip-path-"+G+" rect").attr("width",h).attr("height",c),n.attr("clip-path",B?"url(#nv-chart-clip-path-"+G+")":"");
var j=n.append("g").attr("class","nv-shiftWrap"),i=r.select(".nv-bars").selectAll(".nv-bar").data(function(p){return p
});
i.exit().remove();
var g=i.enter().append("rect").attr("class",function(q,p,s){return(E(q,p)<0?"nv-bar negative":"nv-bar positive")+" nv-bar-"+s+"-"+p
}).attr("fill",function(q,p){return A(q,p)
}).attr("x",0).attr("y",function(q,p){return w(Math.max(0,E(q,p)))
}).attr("height",function(q,p){return Math.abs(w(E(q,p))-w(0))
}).on("mouseover",function(p,q){d3.select(this).classed("hover",!0),t.elementMouseover({point:p,series:l[0],pos:[x(F(p,q)),w(E(p,q))],pointIndex:q,seriesIndex:0,e:d3.event})
}).on("mouseout",function(p,q){d3.select(this).classed("hover",!1),t.elementMouseout({point:p,series:l[0],pointIndex:q,seriesIndex:0,e:d3.event})
}).on("click",function(q,p){t.elementClick({value:E(q,p),data:q,index:p,pos:[x(F(q,p)),w(E(q,p))],e:d3.event,id:G}),d3.event.stopPropagation()
}).on("dblclick",function(q,p){t.elementDblClick({value:E(q,p),data:q,index:p,pos:[x(F(q,p)),w(E(q,p))],e:d3.event,id:G}),d3.event.stopPropagation()
});
i.attr("class",function(q,p,s){return(E(q,p)<0?"nv-bar negative":"nv-bar positive")+" nv-bar-"+s+"-"+p
}).attr("transform",function(p,q){return"translate("+(x(F(p,q))-h/l[0].values.length*0.5)+",0)"
}).attr("width",h/l[0].values.length*0.9),d3.transition(i).attr("y",function(q,p){return w(Math.max(0,E(q,p)))
}).attr("height",function(q,p){return Math.abs(w(E(q,p))-w(0))
})
});
return a
}var J={top:0,right:0,bottom:0,left:0},I=960,H=500,G=Math.floor(Math.random()*10000),F=function(b){return b.x
},E=function(b){return b.y
},D=[],C=[],B=!0,A=e.utils.defaultColor(),z,y,x=d3.scale.linear(),w=d3.scale.linear(),v=d3.svg.axis().scale(x).orient("bottom"),u=d3.svg.axis().scale(w).orient("left"),t=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");
a.dispatch=t,a.x=function(b){if(!arguments.length){return F
}F=b;
return a
},a.y=function(b){if(!arguments.length){return E
}E=b;
return a
},a.margin=function(b){if(!arguments.length){return J
}J=b;
return a
},a.width=function(b){if(!arguments.length){return I
}I=b;
return a
},a.height=function(b){if(!arguments.length){return H
}H=b;
return a
},a.xScale=function(b){if(!arguments.length){return x
}x=b;
return a
},a.yScale=function(b){if(!arguments.length){return w
}w=b;
return a
},a.xDomain=function(b){if(!arguments.length){return z
}z=b;
return a
},a.yDomain=function(b){if(!arguments.length){return y
}y=b;
return a
},a.forceX=function(b){if(!arguments.length){return D
}D=b;
return a
},a.forceY=function(b){if(!arguments.length){return C
}C=b;
return a
},a.clipEdge=function(b){if(!arguments.length){return B
}B=b;
return a
},a.color=function(c){if(!arguments.length){return A
}A=e.utils.getColor(c);
return a
},a.id=function(b){if(!arguments.length){return G
}G=b;
return a
};
return a
},e.models.bullet=function(){function l(b){b.each(function(P,O){var N=p-t.left-t.right,M=o-t.top-t.bottom,L=s.call(this,P,O).slice().sort(d3.descending),K=r.call(this,P,O).slice().sort(d3.descending),J=q.call(this,P,O).slice().sort(d3.descending),I=d3.select(this).selectAll("g.nv-wrap.nv-bullet").data([P]),G=I.enter().append("g").attr("class","nvd3 nv-wrap nv-bullet"),F=G.append("g"),E=I.select("g");
I.attr("transform","translate("+t.left+","+t.top+")");
var D=d3.scale.linear().domain([0,Math.max(L[0],K[0],J[0])]).range(u?[N,0]:[0,N]),C=this.__chart__||d3.scale.linear().domain([0,Infinity]).range(D.range());
this.__chart__=D;
var B=function(i){return Math.abs(C(i)-C(0))
},j=function(i){return Math.abs(D(i)-D(0))
},h=E.selectAll("rect.nv-range").data(L);
h.enter().append("rect").attr("class",function(w,i){return"nv-range nv-s"+i
}).attr("width",B).attr("height",M).attr("x",u?C:0).on("mouseover",function(w,i){m.elementMouseover({value:w,label:i<=0?"Maximum":i>1?"Minimum":"Mean",pos:[D(w),M/2]})
}).on("mouseout",function(w,i){m.elementMouseout({value:w,label:i<=0?"Minimum":i>=1?"Maximum":"Mean"})
}),d3.transition(h).attr("x",u?D:0).attr("width",j).attr("height",M);
var g=E.selectAll("rect.nv-measure").data(J);
g.enter().append("rect").attr("class",function(w,i){return"nv-measure nv-s"+i
}).attr("width",B).attr("height",M/3).attr("x",u?C:0).attr("y",M/3).on("mouseover",function(i){m.elementMouseover({value:i,label:"Current",pos:[D(i),M/2]})
}).on("mouseout",function(i){m.elementMouseout({value:i,label:"Current"})
}),d3.transition(g).attr("width",j).attr("height",M/3).attr("x",u?D:0).attr("y",M/3);
var c=E.selectAll("path.nv-markerTriangle").data(K),H=M/6;
c.enter().append("path").attr("class","nv-markerTriangle").attr("transform",function(i){return"translate("+C(i)+","+M/2+")"
}).attr("d","M0,"+H+"L"+H+","+-H+" "+-H+","+-H+"Z").on("mouseover",function(w,i){m.elementMouseover({value:w,label:"Previous",pos:[D(w),M/2]})
}).on("mouseout",function(w,i){m.elementMouseout({value:w,label:"Previous"})
}),d3.transition(c).attr("transform",function(i){return"translate("+D(i)+","+M/2+")"
}),c.exit().remove()
}),d3.timer.flush()
}var v="left",u=!1,t={top:0,right:0,bottom:0,left:0},s=function(b){return b.ranges
},r=function(b){return b.markers
},q=function(b){return b.measures
},p=380,o=30,n=null,m=d3.dispatch("elementMouseover","elementMouseout");
l.dispatch=m,l.orient=function(a){if(!arguments.length){return v
}v=a,u=v=="right"||v=="bottom";
return l
},l.ranges=function(b){if(!arguments.length){return s
}s=b;
return l
},l.markers=function(b){if(!arguments.length){return r
}r=b;
return l
},l.measures=function(b){if(!arguments.length){return q
}q=b;
return l
},l.width=function(b){if(!arguments.length){return p
}p=b;
return l
},l.height=function(b){if(!arguments.length){return o
}o=b;
return l
},l.margin=function(b){if(!arguments.length){return t
}t=b;
return l
},l.tickFormat=function(b){if(!arguments.length){return n
}n=b;
return l
};
return l
},e.models.bulletChart=function(){function a(c){c.each(function(Z,Y){var X=d3.select(this),V=(z||parseInt(X.style("width"))||960)-D.left-D.right,T=y-D.top-D.bottom,Q=this,P=C.call(this,Z,Y).slice().sort(d3.descending),N=B.call(this,Z,Y).slice().sort(d3.descending),L=A.call(this,Z,Y).slice().sort(d3.descending),p=X.selectAll("g.nv-wrap.nv-bulletChart").data([Z]),n=p.enter().append("g").attr("class","nvd3 nv-wrap nv-bulletChart"),i=n.append("g");
i.append("g").attr("class","nv-bulletWrap"),i.append("g").attr("class","nv-titles");
var g=p.select("g");
p.attr("transform","translate("+D.left+","+D.top+")");
var W=d3.scale.linear().domain([0,Math.max(P[0],N[0],L[0])]).range(E?[V,0]:[0,V]),U=this.__chart__||d3.scale.linear().domain([0,Infinity]).range(W.range());
this.__chart__=W;
var S=function(b){return Math.abs(U(b)-U(0))
},R=function(b){return Math.abs(W(b)-W(0))
},O=g.select(".nv-titles").append("g").attr("text-anchor","end").attr("transform","translate(-6,"+(y-D.top-D.bottom)/2+")");
O.append("text").attr("class","nv-title").text(function(b){return b.title
}),O.append("text").attr("class","nv-subtitle").attr("dy","1em").text(function(b){return b.subtitle
}),s.width(V).height(T);
var M=g.select(".nv-bulletWrap");
d3.transition(M).call(s);
var K=x||W.tickFormat(8),o=g.selectAll("g.nv-tick").data(W.ticks(8),function(b){return this.textContent||K(b)
}),j=o.enter().append("g").attr("class","nv-tick").attr("transform",function(b){return"translate("+U(b)+",0)"
}).style("opacity",0.000001);
j.append("line").attr("y1",T).attr("y2",T*7/6),j.append("text").attr("text-anchor","middle").attr("dy","1em").attr("y",T*7/6).text(K),d3.transition(j).attr("transform",function(b){return"translate("+W(b)+",0)"
}).style("opacity",1);
var h=d3.transition(o).attr("transform",function(b){return"translate("+W(b)+",0)"
}).style("opacity",1);
h.select("line").attr("y1",T).attr("y2",T*7/6),h.select("text").attr("y",T*7/6),d3.transition(o.exit()).attr("transform",function(b){return"translate("+W(b)+",0)"
}).style("opacity",0.000001).remove(),s.dispatch.on("elementMouseover.tooltip",function(b){t.tooltipShow(b)
}),w&&t.on("tooltipShow",function(b){r(b,Q.parentNode)
}),s.dispatch.on("elementMouseout.tooltip",function(b){t.tooltipHide(b)
}),w&&t.on("tooltipHide",e.tooltip.cleanup)
}),d3.timer.flush()
}var F="left",E=!1,D={top:5,right:40,bottom:20,left:120},C=function(b){return b.ranges
},B=function(b){return b.markers
},A=function(b){return b.measures
},z=null,y=55,x=null,w=!0,v=function(h,g,l,j,i){return"<h3>"+j.label+"</h3><p>"+j.value+"</p>"
},u="No Data Available.",t=d3.dispatch("tooltipShow","tooltipHide"),s=e.models.bullet(),r=function(h,m){var m=document.getElementById("chart"),l=h.pos[0]+m.offsetLeft+D.left,j=h.pos[1]+m.offsetTop+D.top,i="<h3>"+h.label+"</h3><p>"+h.value+"</p>";
e.tooltip.show([l,j],i,h.value<0?"e":"w",null,m)
};
a.dispatch=t,a.bullet=s,a.orient=function(b){if(!arguments.length){return F
}F=b,E=F=="right"||F=="bottom";
return a
},a.ranges=function(b){if(!arguments.length){return C
}C=b;
return a
},a.markers=function(b){if(!arguments.length){return B
}B=b;
return a
},a.measures=function(b){if(!arguments.length){return A
}A=b;
return a
},a.width=function(b){if(!arguments.length){return z
}z=b;
return a
},a.height=function(b){if(!arguments.length){return y
}y=b;
return a
},a.margin=function(b){if(!arguments.length){return D
}D=b;
return a
},a.tickFormat=function(b){if(!arguments.length){return x
}x=b;
return a
},a.tooltips=function(b){if(!arguments.length){return w
}w=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return v
}v=b;
return a
},a.noData=function(b){if(!arguments.length){return u
}u=b;
return a
};
return a
},e.models.cumulativeLineChart=function(){function L(g,c){return c.map(function(h,j){var i=T.y()(h.values[g],g);
h.values=h.values.map(function(m,l){m.display={y:(T.y()(m,l)-i)/(1+i)};
return m
});
return h
})
}function N(b){b.each(function(h){var l=d3.select(this).classed("nv-chart-"+Q,!0),g=this,c=(ad||parseInt(l.style("width"))||960)-af.left-af.right,s=(ac||parseInt(l.style("height"))||400)-af.top-af.bottom;
if(!h||!h.length||!h.filter(function(j){return j.values.length
}).length){l.append("text").attr("class","nvd3 nv-noData").attr("x",c/2).attr("y",s/2).attr("dy","-.7em").style("text-anchor","middle").text(U);
return N
}l.select(".nv-noData").remove(),W=T.xScale(),V=T.yScale();
if(!Y){var r=h.filter(function(j){return !j.disabled
}).map(function(t,j){var u=d3.extent(t.values,T.y());
return[(u[0]-u[1])/(1+u[1]),(u[1]-u[0])/(1+u[0])]
}),q=[d3.min(r,function(j){return j[0]
}),d3.max(r,function(j){return j[1]
})];
T.yDomain(q)
}else{T.yDomain(null)
}S.domain([0,h[0].values.length-1]).range([0,c]).clamp(!0);
var h=L(H.i,h),p=l.selectAll("g.nv-wrap.nv-cumulativeLine").data([h]),o=p.enter().append("g").attr("class","nvd3 nv-wrap nv-cumulativeLine").append("g");
o.append("g").attr("class","nv-x nv-axis"),o.append("g").attr("class","nv-y nv-axis"),o.append("g").attr("class","nv-linesWrap"),o.append("g").attr("class","nv-legendWrap"),o.append("g").attr("class","nv-controlsWrap");
var n=p.select("g");
ab&&(K.width(c),n.select(".nv-legendWrap").datum(h).call(K),af.top!=K.height()&&(af.top=K.height(),s=(ac||parseInt(l.style("height"))||400)-af.top-af.bottom),n.select(".nv-legendWrap").attr("transform","translate(0,"+-af.top+")")),Z&&(J.width(140).color(["#444","#444","#444"]),n.select(".nv-controlsWrap").datum(G).attr("transform","translate(0,"+-af.top+")").call(J)),T.y(function(j){return j.display.y
}).width(c).height(s).color(h.map(function(t,j){return t.color||ae(t,j)
}).filter(function(t,j){return !h[j].disabled
})),n.attr("transform","translate("+af.left+","+af.top+")");
var m=n.select(".nv-linesWrap").datum(h.filter(function(j){return !j.disabled
}));
d3.transition(m).call(T);
var i=m.selectAll(".nv-indexLine").data([H]);
i.enter().append("rect").attr("class","nv-indexLine").attr("width",3).attr("x",-2).attr("fill","red").attr("fill-opacity",0.5).call(E),i.attr("transform",function(j){return"translate("+S(j.i)+",0)"
}).attr("height",s),O.scale(W).ticks(c/100).tickSize(-s,0),n.select(".nv-x.nv-axis").attr("transform","translate(0,"+V.range()[0]+")"),d3.transition(n.select(".nv-x.nv-axis")).call(O),M.scale(V).ticks(s/36).tickSize(-c,0),d3.transition(n.select(".nv-y.nv-axis")).call(M),J.dispatch.on("legendClick",function(j,t){j.disabled=!j.disabled,Y=!j.disabled,b.transition().call(N)
}),K.dispatch.on("legendClick",function(j,t){j.disabled=!j.disabled,h.filter(function(u){return !u.disabled
}).length||h.map(function(u){u.disabled=!1,p.selectAll(".nv-series").classed("disabled",!1);
return u
}),b.transition().call(N)
}),I.on("tooltipShow",function(j){aa&&F(j,g.parentNode)
})
}),N.update=function(){N(b)
},N.container=this;
return N
}function P(g,c){N.update()
}function R(g,c){g.x+=d3.event.dx,g.i=Math.round(S.invert(g.x)),d3.select(this).attr("transform","translate("+S(g.i)+",0)")
}function a(g,c){}var af={top:30,right:30,bottom:50,left:60},ae=e.utils.getColor(),ad=null,ac=null,ab=!0,aa=!0,Z=!0,Y=!0,X=function(h,g,l,j,i){return"<h3>"+h+"</h3><p>"+l+" at "+g+"</p>"
},W,V,U="No Data Available.",T=e.models.line(),S=d3.scale.linear(),Q=T.id(),O=e.models.axis().orient("bottom").tickPadding(5),M=e.models.axis().orient("left"),K=e.models.legend().height(30),J=e.models.legend().height(30),I=d3.dispatch("tooltipShow","tooltipHide"),H={i:0,x:0},G=[{key:"Re-scale y-axis"}],F=function(i,p){var o=i.pos[0]+(p.offsetLeft||0),n=i.pos[1]+(p.offsetTop||0),m=O.tickFormat()(T.x()(i.point,i.pointIndex)),l=M.tickFormat()(T.y()(i.point,i.pointIndex)),j=X(i.series.key,m,l,i,N);
e.tooltip.show([o,n],j,null,null,p)
},E=d3.behavior.drag().on("dragstart",a).on("drag",R).on("dragend",P);
T.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+af.left,b.pos[1]+af.top],I.tooltipShow(b)
}),T.dispatch.on("elementMouseout.tooltip",function(b){I.tooltipHide(b)
}),I.on("tooltipHide",function(){aa&&e.tooltip.cleanup()
}),N.dispatch=I,N.legend=K,N.xAxis=O,N.yAxis=M,d3.rebind(N,T,"defined","isArea","x","y","size","xDomain","yDomain","forceX","forceY","interactive","clipEdge","clipVoronoi","id"),N.margin=function(b){if(!arguments.length){return af
}af=b;
return N
},N.width=function(b){if(!arguments.length){return ad
}ad=b;
return N
},N.height=function(b){if(!arguments.length){return ac
}ac=b;
return N
},N.color=function(c){if(!arguments.length){return ae
}ae=e.utils.getColor(c),K.color(ae);
return N
},N.showLegend=function(b){if(!arguments.length){return ab
}ab=b;
return N
},N.tooltips=function(b){if(!arguments.length){return aa
}aa=b;
return N
},N.tooltipContent=function(b){if(!arguments.length){return X
}X=b;
return N
},N.noData=function(b){if(!arguments.length){return U
}U=b;
return N
};
return N
},e.models.discreteBar=function(){function a(b){b.each(function(j){var p=I-J.left-J.right,o=H-J.top-J.bottom;
j=j.map(function(s,r){s.values=s.values.map(function(K){K.series=r;
return K
});
return s
});
var n=x&&w?[]:j.map(function(r){return r.values.map(function(K,s){return{x:D(K,s),y:C(K,s),y0:K.y0}
})
});
F.domain(x||d3.merge(n).map(function(r){return r.x
})).rangeBands([0,p],0.1),E.domain(w||d3.extent(d3.merge(n).map(function(r){return r.y
}).concat(B))),z?E.range([o-(E.domain()[0]<0?12:0),E.domain()[1]>0?12:0]):E.range([o,0]),u=u||F,t=t||E.copy().range([E(0),E(0)]);
var m=d3.select(this).selectAll("g.nv-wrap.nv-discretebar").data([j]),l=m.enter().append("g").attr("class","nvd3 nv-wrap nv-discretebar"),i=l.append("g");
i.append("g").attr("class","nv-groups");
var h=m.select("g");
m.attr("transform","translate("+J.left+","+J.top+")");
var g=m.select(".nv-groups").selectAll(".nv-group").data(function(r){return r
},function(r){return r.key
});
g.enter().append("g").style("stroke-opacity",0.000001).style("fill-opacity",0.000001),d3.transition(g.exit()).style("stroke-opacity",0.000001).style("fill-opacity",0.000001).remove(),g.attr("class",function(s,r){return"nv-group nv-series-"+r
}).classed("hover",function(r){return r.hover
}),d3.transition(g).style("stroke-opacity",1).style("fill-opacity",0.75);
var c=g.selectAll("g.nv-bar").data(function(r){return r.values
});
c.exit().remove();
var q=c.enter().append("g").attr("transform",function(s,r,K){return"translate("+F(D(s,r))+", "+E(0)+")"
}).on("mouseover",function(s,r){d3.select(this).classed("hover",!0),v.elementMouseover({value:C(s,r),point:s,series:j[s.series],pos:[F(D(s,r))+F.rangeBand()*(s.series+0.5)/j.length,E(C(s,r))],pointIndex:r,seriesIndex:s.series,e:d3.event})
}).on("mouseout",function(s,r){d3.select(this).classed("hover",!1),v.elementMouseout({value:C(s,r),point:s,series:j[s.series],pointIndex:r,seriesIndex:s.series,e:d3.event})
}).on("click",function(s,r){v.elementClick({value:C(s,r),point:s,series:j[s.series],pos:[F(D(s,r))+F.rangeBand()*(s.series+0.5)/j.length,E(C(s,r))],pointIndex:r,seriesIndex:s.series,e:d3.event}),d3.event.stopPropagation()
}).on("dblclick",function(s,r){v.elementDblClick({value:C(s,r),point:s,series:j[s.series],pos:[F(D(s,r))+F.rangeBand()*(s.series+0.5)/j.length,E(C(s,r))],pointIndex:r,seriesIndex:s.series,e:d3.event}),d3.event.stopPropagation()
});
q.append("rect").attr("height",0).attr("width",F.rangeBand()/j.length).style("fill",function(s,r){return s.color||A(s,r)
}).style("stroke",function(s,r){return s.color||A(s,r)
}),z?(q.append("text").attr("text-anchor","middle"),c.selectAll("text").attr("x",F.rangeBand()/2).attr("y",function(s,r){return C(s,r)<0?E(C(s,r))-E(0)+12:-4
}).text(function(s,r){return y(C(s,r))
})):c.selectAll("text").remove(),c.attr("class",function(s,r){return C(s,r)<0?"nv-bar negative":"nv-bar positive"
}).attr("transform",function(s,r){return"translate("+F(D(s,r))+", "+(C(s,r)<0?t(0):t(C(s,r)))+")"
}).selectAll("rect").attr("width",F.rangeBand()/j.length),d3.transition(c).attr("transform",function(s,r){return"translate("+F(D(s,r))+", "+(C(s,r)<0?E(0):E(C(s,r)))+")"
}).selectAll("rect").attr("height",function(s,r){return Math.abs(E(C(s,r))-E(0))
}),a.update=function(){a(b)
},u=F.copy(),t=E.copy()
});
return a
}var J={top:0,right:0,bottom:0,left:0},I=960,H=500,G=Math.floor(Math.random()*10000),F=d3.scale.ordinal(),E=d3.scale.linear(),D=function(b){return b.x
},C=function(b){return b.y
},B=[0],A=e.utils.defaultColor(),z=!1,y=d3.format(",.2f"),x,w,v=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),u,t;
a.dispatch=v,a.x=function(b){if(!arguments.length){return D
}D=b;
return a
},a.y=function(b){if(!arguments.length){return C
}C=b;
return a
},a.margin=function(b){if(!arguments.length){return J
}J=b;
return a
},a.width=function(b){if(!arguments.length){return I
}I=b;
return a
},a.height=function(b){if(!arguments.length){return H
}H=b;
return a
},a.xScale=function(b){if(!arguments.length){return F
}F=b;
return a
},a.yScale=function(b){if(!arguments.length){return E
}E=b;
return a
},a.xDomain=function(b){if(!arguments.length){return x
}x=b;
return a
},a.yDomain=function(b){if(!arguments.length){return w
}w=b;
return a
},a.forceY=function(b){if(!arguments.length){return B
}B=b;
return a
},a.color=function(c){if(!arguments.length){return A
}A=e.utils.getColor(c);
return a
},a.id=function(b){if(!arguments.length){return G
}G=b;
return a
},a.showValues=function(b){if(!arguments.length){return z
}z=b;
return a
},a.valueFormat=function(b){if(!arguments.length){return y
}y=b;
return a
};
return a
},e.models.discreteBarChart=function(){function a(b){b.each(function(l){var g=d3.select(this),I=this,r=(G||parseInt(g.style("width"))||960)-H.left-H.right,p=(F||parseInt(g.style("height"))||400)-H.top-H.bottom;
if(!l||!l.length||!l.filter(function(h){return h.values.length
}).length){g.append("text").attr("class","nvd3 nv-noData").attr("x",r/2).attr("y",p/2).attr("dy","-.7em").style("text-anchor","middle").text(A);
return a
}g.select(".nv-noData").remove(),z.width(r).height(p);
var o=g.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([l]),n=o.enter().append("g").attr("class","nvd3 nv-wrap nv-discreteBarWithAxes").append("g"),m=n.append("defs");
n.append("g").attr("class","nv-x nv-axis"),n.append("g").attr("class","nv-y nv-axis"),n.append("g").attr("class","nv-barsWrap");
var j=o.select("g");
j.attr("transform","translate("+H.left+","+H.top+")");
var i=j.select(".nv-barsWrap").datum(l.filter(function(h){return !h.disabled
}));
d3.transition(i).call(z),m.append("clipPath").attr("id","nv-x-label-clip-"+z.id()).append("rect"),j.select("#nv-x-label-clip-"+z.id()+" rect").attr("width",y.rangeBand()*(D?2:1)).attr("height",16).attr("x",-y.rangeBand()/(D?1:2)),w.ticks(r/100).tickSize(-p,0),j.select(".nv-x.nv-axis").attr("transform","translate(0,"+(x.range()[0]+(z.showValues()&&x.domain()[0]<0?16:0))+")"),j.select(".nv-x.nv-axis").transition().duration(0).call(w);
var c=j.select(".nv-x.nv-axis").selectAll("g");
D&&c.selectAll("text").attr("transform",function(q,h,J){return"translate(0,"+(J%2==0?"0":"12")+")"
}),v.ticks(p/36).tickSize(-r,0),d3.transition(j.select(".nv-y.nv-axis")).call(v),z.dispatch.on("elementMouseover.tooltip",function(h){h.pos=[h.pos[0]+H.left,h.pos[1]+H.top],u.tooltipShow(h)
}),C&&u.on("tooltipShow",function(h){t(h,I.parentNode)
}),z.dispatch.on("elementMouseout.tooltip",function(h){u.tooltipHide(h)
}),C&&u.on("tooltipHide",e.tooltip.cleanup),a.update=function(){b.transition().call(a)
},a.container=this
});
return a
}var H={top:10,right:10,bottom:50,left:60},G=null,F=null,E=e.utils.getColor(),D=!1,C=!0,B=function(h,g,l,j,i){return"<h3>"+g+"</h3><p>"+l+"</p>"
},A="No Data Available.",z=e.models.discreteBar(),y=z.xScale(),x=z.yScale(),w=e.models.axis().scale(y).orient("bottom").highlightZero(!1).showMaxMin(!1),v=e.models.axis().scale(x).orient("left"),u=d3.dispatch("tooltipShow","tooltipHide");
w.tickFormat(function(b){return b
}),v.tickFormat(d3.format(",.1f"));
var t=function(h,p){var o=h.pos[0]+(p.offsetLeft||0),n=h.pos[1]+(p.offsetTop||0),m=w.tickFormat()(z.x()(h.point,h.pointIndex)),l=v.tickFormat()(z.y()(h.point,h.pointIndex)),j=B(h.series.key,m,l,h,a);
e.tooltip.show([o,n],j,h.value<0?"n":"s",null,p)
},s=[{key:"Grouped"},{key:"Stacked",disabled:!0}];
a.dispatch=u,a.discretebar=z,a.xAxis=w,a.yAxis=v,d3.rebind(a,z,"x","y","xDomain","yDomain","forceX","forceY","id","showValues","valueFormat"),a.margin=function(b){if(!arguments.length){return H
}H=b;
return a
},a.width=function(b){if(!arguments.length){return G
}G=b;
return a
},a.height=function(b){if(!arguments.length){return F
}F=b;
return a
},a.color=function(c){if(!arguments.length){return E
}E=e.utils.getColor(c),z.color(E);
return a
},a.staggerLabels=function(b){if(!arguments.length){return D
}D=b;
return a
},a.tooltips=function(b){if(!arguments.length){return C
}C=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return B
}B=b;
return a
},a.noData=function(b){if(!arguments.length){return A
}A=b;
return a
};
return a
},e.models.distribution=function(){function a(b){b.each(function(y){var x=s-(q==="x"?t.left+t.right:t.top+t.bottom),w=q=="x"?"y":"x";
l=l||m;
var v=d3.select(this).selectAll("g.nv-distribution").data([y]),u=v.enter().append("g").attr("class","nvd3 nv-distribution"),j=u.append("g"),i=v.select("g");
v.attr("transform","translate("+t.left+","+t.top+")");
var g=i.selectAll("g.nv-dist").data(function(h){return h
},function(h){return h.key
});
g.enter().append("g"),g.attr("class",function(z,h){return"nv-dist nv-series-"+h
}).style("stroke",function(z,h){return o(z,h)
});
var c=g.selectAll("line.nv-dist"+q).data(function(h){return h.values
});
c.enter().append("line").attr(q+"1",function(z,h){return l(p(z,h))
}).attr(q+"2",function(z,h){return l(p(z,h))
}),d3.transition(g.exit().selectAll("line.nv-dist"+q)).attr(q+"1",function(z,h){return m(p(z,h))
}).attr(q+"2",function(z,h){return m(p(z,h))
}).style("stroke-opacity",0).remove(),c.attr("class",function(z,h){return"nv-dist"+q+" nv-dist"+q+"-"+h
}).attr(w+"1",0).attr(w+"2",r),d3.transition(c).attr(q+"1",function(z,h){return m(p(z,h))
}).attr(q+"2",function(z,h){return m(p(z,h))
}),l=m.copy()
});
return a
}var t={top:0,right:0,bottom:0,left:0},s=400,r=8,q="x",p=function(b){return b[q]
},o=e.utils.defaultColor(),n,m=d3.scale.linear(),l;
a.margin=function(b){if(!arguments.length){return t
}t=b;
return a
},a.width=function(b){if(!arguments.length){return s
}s=b;
return a
},a.axis=function(b){if(!arguments.length){return q
}q=b;
return a
},a.size=function(b){if(!arguments.length){return r
}r=b;
return a
},a.getData=function(b){if(!arguments.length){return p
}p=d3.functor(b);
return a
},a.scale=function(b){if(!arguments.length){return m
}m=b;
return a
},a.color=function(c){if(!arguments.length){return o
}o=e.utils.getColor(c);
return a
};
return a
},e.models.indentedTree=function(){function a(b){b.each(function(Q){function G(u){var t=u.values||u._values;
return t&&t.length
}function I(t){return t._values&&t._values.length
}function c(t){return t._values&&t._values.length?iconOpen:t.values&&t.values.length?iconClose:""
}function g(u,t,v){d3.event.stopPropagation();
if(d3.event.shiftKey&&!v){d3.event.shiftKey=!1,u.values&&u.values.forEach(function(w){(w.values||w._values)&&g(w,0,!0)
});
return !0
}if(!G(u)){return !0
}u.values?(u._values=u.values,u.values=null):(u.values=u._values,u._values=null),a.update()
}var P=r-s.left-s.right,O=q-s.top-s.bottom;
a.update=function(){b.transition().call(a)
};
var N=0,M=1,L=d3.layout.tree().children(function(t){return t.values
}).size([q,childIndent]);
Q[0].key||(Q[0].key=m);
var K=L.nodes(Q[0]),J=d3.select(this).selectAll("div").data([[K]]),H=J.enter().append("div").attr("class","nvd3 nv-wrap nv-indentedtree"),F=H.append("table"),E=J.select("table").attr("width","100%").attr("class",tableClass);
if(n){var D=F.append("thead"),C=D.append("tr");
columns.forEach(function(t){C.append("th").attr("width",t.width?t.width:"10%").style("text-align",t.type=="numeric"?"right":"left").append("span").text(t.label)
})
}var j=E.selectAll("tbody").data(function(t){return t
});
j.enter().append("tbody"),M=d3.max(K,function(t){return t.depth
}),L.size([q,M*childIndent]);
var i=j.selectAll("tr").data(function(t){return t
},function(t){return t.id||t.id==++N
});
i.exit().remove(),i.select("img.nv-treeicon").attr("src",c).classed("folded",I);
var h=i.enter().append("tr");
columns.forEach(function(u,t){var v=h.append("td").style("padding-left",function(w){return(t?0:w.depth*childIndent+12+(c(w)?0:16))+"px"
},"important").style("text-align",u.type=="numeric"?"right":"left");
t==0&&v.append("img").classed("nv-treeicon",!0).classed("nv-folded",I).attr("src",c).style("width","14px").style("height","14px").style("padding","0 1px").style("display",function(w){return c(w)?"inline-block":"none"
}).on("click",g),v.append("span").attr("class",d3.functor(u.classes)).text(function(w){return u.format?u.format(w):w[u.key]||"-"
}),u.showCount&&v.append("span").attr("class","nv-childrenCount").text(function(w){return w.values&&w.values.length||w._values&&w._values.length?"("+(w.values&&w.values.length||w._values&&w._values.length)+")":""
}),u.click&&v.select("span").on("click",u.click)
}),i.order().on("click",function(t){l.elementClick({row:this,data:t,pos:[t.x,t.y]})
}).on("dblclick",function(t){l.elementDblclick({row:this,data:t,pos:[t.x,t.y]})
}).on("mouseover",function(t){l.elementMouseover({row:this,data:t,pos:[t.x,t.y]})
}).on("mouseout",function(t){l.elementMouseout({row:this,data:t,pos:[t.x,t.y]})
})
});
return a
}var s={top:0,right:0,bottom:0,left:0},r=960,q=500,p=e.utils.defaultColor(),o=Math.floor(Math.random()*10000),n=!0,m="No Results found.";
childIndent=20,columns=[{key:"key",label:"Name",type:"text"}],tableClass=null,iconOpen="images/grey-plus.png",iconClose="images/grey-minus.png";
var l=d3.dispatch("elementClick","elementDblclick","elementMouseover","elementMouseout");
a.margin=function(b){if(!arguments.length){return s
}s=b;
return a
},a.width=function(b){if(!arguments.length){return r
}r=b;
return a
},a.height=function(b){if(!arguments.length){return q
}q=b;
return a
},a.color=function(c){if(!arguments.length){return p
}p=e.utils.getColor(c),scatter.color(p);
return a
},a.id=function(b){if(!arguments.length){return o
}o=b;
return a
},a.header=function(b){if(!arguments.length){return n
}n=b;
return a
},a.noResultsText=function(b){if(!arguments.length){return m
}m=b;
return a
},a.columns=function(b){if(!arguments.length){return columns
}columns=b;
return a
},a.tableClass=function(b){if(!arguments.length){return tableClass
}tableClass=b;
return a
},a.iconOpen=function(b){if(!arguments.length){return iconOpen
}iconOpen=b;
return a
},a.iconClose=function(b){if(!arguments.length){return iconClose
}iconClose=b;
return a
};
return a
},e.models.legend=function(){function j(b){b.each(function(O){var N=q-a.left-a.right,M=d3.select(this).selectAll("g.nv-legend").data([O]),L=M.enter().append("g").attr("class","nvd3 nv-legend").append("g"),K=M.select("g").attr("transform","translate("+a.left+","+a.top+")"),J=K.selectAll(".nv-series").data(function(i){return i
}),I=J.enter().append("g").attr("class","nv-series").on("mouseover",function(r,i){l.legendMouseover(r,i)
}).on("mouseout",function(r,i){l.legendMouseout(r,i)
}).on("click",function(r,i){l.legendClick(r,i)
}).on("dblclick",function(r,i){l.legendDblclick(r,i)
});
I.append("circle").style("fill",function(r,i){return r.color||n(r,i)
}).style("stroke",function(r,i){return r.color||n(r,i)
}).style("stroke-width",2).attr("r",5),I.append("text").text(o).attr("text-anchor","start").attr("dy",".32em").attr("dx","8"),J.classed("disabled",function(i){return i.disabled
}),J.exit().remove();
if(m){var H=[];
J.each(function(r,i){H.push(d3.select(this).select("text").node().getComputedTextLength()+28)
});
var G=0,F=0,E=[];
while(F<N&&G<H.length){E[G]=H[G],F+=H[G++]
}while(F>N&&G>1){E=[],G--;
for(k=0;
k<H.length;
k++){H[k]>(E[k%G]||0)&&(E[k%G]=H[k])
}F=E.reduce(function(r,i,t,s){return r+i
})
}var D=[];
for(var C=0,B=0;
C<G;
C++){D[C]=B,B+=E[C]
}J.attr("transform",function(r,i){return"translate("+D[i%G]+","+(5+Math.floor(i/G)*20)+")"
}),K.attr("transform","translate("+(q-a.right-F)+","+a.top+")"),p=a.top+a.bottom+Math.ceil(H.length/G)*20
}else{var A=5,h=5,g=0,c;
J.attr("transform",function(i,s){var r=d3.select(this).select("text").node().getComputedTextLength()+28;
c=h,q<a.left+a.right+c+r&&(h=c=5,A+=20),h+=r,h>g&&(g=h);
return"translate("+c+","+A+")"
}),K.attr("transform","translate("+(q-a.right-g)+","+a.top+")"),p=a.top+a.bottom+A+15
}});
return j
}var a={top:5,right:0,bottom:5,left:0},q=400,p=20,o=function(b){return b.key
},n=e.utils.defaultColor(),m=!0,l=d3.dispatch("legendClick","legendDblclick","legendMouseover","legendMouseout");
j.dispatch=l,j.margin=function(b){if(!arguments.length){return a
}a=b;
return j
},j.width=function(b){if(!arguments.length){return q
}q=b;
return j
},j.height=function(b){if(!arguments.length){return p
}p=b;
return j
},j.key=function(b){if(!arguments.length){return o
}o=b;
return j
},j.color=function(c){if(!arguments.length){return n
}n=e.utils.getColor(c);
return j
},j.align=function(b){if(!arguments.length){return m
}m=b;
return j
};
return j
},e.models.line=function(){function a(b){b.each(function(m){var g=I-J.left-J.right,L=H-J.top-J.bottom,q=d3.select(this);
z=w.xScale(),y=w.yScale(),v=v||z,u=u||y;
var p=q.selectAll("g.nv-wrap.nv-line").data([m]),o=p.enter().append("g").attr("class","nvd3 nv-wrap nv-line"),n=o.append("defs"),l=o.append("g"),j=p.select("g");
l.append("g").attr("class","nv-groups"),l.append("g").attr("class","nv-scatterWrap");
var i=p.select(".nv-scatterWrap");
w.width(g).height(L),d3.transition(i).call(w),p.attr("transform","translate("+J.left+","+J.top+")"),n.append("clipPath").attr("id","nv-edge-clip-"+F).append("rect"),p.select("#nv-edge-clip-"+F+" rect").attr("width",g).attr("height",L),j.attr("clip-path",A?"url(#nv-edge-clip-"+F+")":""),i.attr("clip-path",A?"url(#nv-edge-clip-"+F+")":"");
var h=p.select(".nv-groups").selectAll(".nv-group").data(function(r){return r
},function(r){return r.key
});
h.enter().append("g").style("stroke-opacity",0.000001).style("fill-opacity",0.000001),d3.transition(h.exit()).style("stroke-opacity",0.000001).style("fill-opacity",0.000001).remove(),h.attr("class",function(s,r){return"nv-group nv-series-"+r
}).classed("hover",function(r){return r.hover
}).style("fill",function(s,r){return G(s,r)
}).style("stroke",function(s,r){return G(s,r)
}),d3.transition(h).style("stroke-opacity",1).style("fill-opacity",0.5);
var c=h.selectAll("path.nv-area").data(function(r){return[r]
});
c.enter().append("path").filter(B).attr("class","nv-area").attr("d",function(r){return d3.svg.area().interpolate(x).defined(C).x(function(M,s){return v(E(M,s))
}).y0(function(M,s){return u(D(M,s))
}).y1(function(M,s){return u(y.domain()[0]<=0?y.domain()[1]>=0?0:y.domain()[1]:y.domain()[0])
}).apply(this,[r.values])
}),d3.transition(h.exit().selectAll("path.nv-area")).attr("d",function(r){return d3.svg.area().interpolate(x).defined(C).x(function(M,s){return v(E(M,s))
}).y0(function(M,s){return u(D(M,s))
}).y1(function(M,s){return u(y.domain()[0]<=0?y.domain()[1]>=0?0:y.domain()[1]:y.domain()[0])
}).apply(this,[r.values])
}),d3.transition(c.filter(B)).attr("d",function(r){return d3.svg.area().interpolate(x).defined(C).x(function(M,s){return v(E(M,s))
}).y0(function(M,s){return u(D(M,s))
}).y1(function(M,s){return u(y.domain()[0]<=0?y.domain()[1]>=0?0:y.domain()[1]:y.domain()[0])
}).apply(this,[r.values])
});
var K=h.selectAll("path.nv-line").data(function(r){return[r.values]
});
K.enter().append("path").attr("class",function(r){return"nv-line"
}).attr("d",d3.svg.line().interpolate(x).defined(C).x(function(s,r){return v(E(s,r))
}).y(function(s,r){return u(D(s,r))
})),d3.transition(h.exit().selectAll("path.nv-line")).attr("d",d3.svg.line().interpolate(x).defined(C).x(function(s,r){return z(E(s,r))
}).y(function(s,r){return y(D(s,r))
})),d3.transition(K).attr("d",d3.svg.line().interpolate(x).defined(C).x(function(s,r){return z(E(s,r))
}).y(function(s,r){return y(D(s,r))
})),v=z.copy(),u=y.copy()
});
return a
}var J={top:0,right:0,bottom:0,left:0},I=960,H=500,G=e.utils.defaultColor(),F=Math.floor(Math.random()*10000),E=function(b){return b.x
},D=function(b){return b.y
},C=function(g,c){return !isNaN(D(g,c))&&D(g,c)!==null
},B=function(b){return b.area
},A=!1,z,y,x="linear",w=e.models.scatter().id(F).size(16).sizeDomain([16,256]),v,u,t;
a.dispatch=w.dispatch,d3.rebind(a,w,"interactive","size","xScale","yScale","zScale","xDomain","yDomain","sizeDomain","forceX","forceY","forceSize","clipVoronoi","clipRadius"),a.margin=function(b){if(!arguments.length){return J
}J=b;
return a
},a.width=function(b){if(!arguments.length){return I
}I=b;
return a
},a.height=function(b){if(!arguments.length){return H
}H=b;
return a
},a.x=function(b){if(!arguments.length){return E
}E=b,w.x(b);
return a
},a.y=function(b){if(!arguments.length){return D
}D=b,w.y(b);
return a
},a.clipEdge=function(b){if(!arguments.length){return A
}A=b;
return a
},a.color=function(c){if(!arguments.length){return G
}G=e.utils.getColor(c),w.color(G);
return a
},a.id=function(b){if(!arguments.length){return F
}F=b;
return a
},a.interpolate=function(b){if(!arguments.length){return x
}x=b;
return a
},a.defined=function(b){if(!arguments.length){return C
}C=b;
return a
},a.isArea=function(b){if(!arguments.length){return B
}B=d3.functor(b);
return a
};
return a
},e.models.lineChart=function(){function a(b){b.each(function(i){var p=d3.select(this),o=this,n=(F||parseInt(p.style("width"))||960)-H.left-H.right,m=(E||parseInt(p.style("height"))||400)-H.top-H.bottom;
if(!i||!i.length||!i.filter(function(h){return h.values.length
}).length){p.append("text").attr("class","nvd3 nv-noData").attr("x",n/2).attr("y",m/2).attr("dy","-.7em").style("text-anchor","middle").text(y);
return a
}p.select(".nv-noData").remove(),A=x.xScale(),z=x.yScale();
var l=p.selectAll("g.nv-wrap.nv-lineChart").data([i]),j=l.enter().append("g").attr("class","nvd3 nv-wrap nv-lineChart").append("g");
j.append("g").attr("class","nv-x nv-axis"),j.append("g").attr("class","nv-y nv-axis"),j.append("g").attr("class","nv-linesWrap"),j.append("g").attr("class","nv-legendWrap");
var g=l.select("g");
D&&(u.width(n),g.select(".nv-legendWrap").datum(i).call(u),H.top!=u.height()&&(H.top=u.height(),m=(E||parseInt(p.style("height"))||400)-H.top-H.bottom),g.select(".nv-legendWrap").attr("transform","translate(0,"+-H.top+")")),x.width(n).height(m).color(i.map(function(q,h){return q.color||G(q,h)
}).filter(function(q,h){return !i[h].disabled
})),g.attr("transform","translate("+H.left+","+H.top+")");
var c=g.select(".nv-linesWrap").datum(i.filter(function(h){return !h.disabled
}));
d3.transition(c).call(x),w.scale(A).ticks(n/100).tickSize(-m,0),g.select(".nv-x.nv-axis").attr("transform","translate(0,"+z.range()[0]+")"),d3.transition(g.select(".nv-x.nv-axis")).call(w),v.scale(z).ticks(m/36).tickSize(-n,0),d3.transition(g.select(".nv-y.nv-axis")).call(v),u.dispatch.on("legendClick",function(h,q){h.disabled=!h.disabled,i.filter(function(r){return !r.disabled
}).length||i.map(function(r){r.disabled=!1,l.selectAll(".nv-series").classed("disabled",!1);
return r
}),b.transition().call(a)
}),t.on("tooltipShow",function(h){C&&s(h,o.parentNode)
})
}),a.update=function(){a(b)
},a.container=this;
return a
}var H={top:30,right:20,bottom:50,left:60},G=e.utils.defaultColor(),F=null,E=null,D=!0,C=!0,B=function(h,g,l,j,i){return"<h3>"+h+"</h3><p>"+l+" at "+g+"</p>"
},A,z,y="No Data Available.",x=e.models.line(),w=e.models.axis().orient("bottom").tickPadding(5),v=e.models.axis().orient("left"),u=e.models.legend().height(30),t=d3.dispatch("tooltipShow","tooltipHide"),s=function(K,J){if(J){var I=d3.select(J).select("svg"),r=I.attr("viewBox");
if(r){r=r.split(" ");
var q=parseInt(I.style("width"))/r[2];
K.pos[0]=K.pos[0]*q,K.pos[1]=K.pos[1]*q
}}var p=K.pos[0]+(J.offsetLeft||0),n=K.pos[1]+(J.offsetTop||0),m=w.tickFormat()(x.x()(K.point,K.pointIndex)),l=v.tickFormat()(x.y()(K.point,K.pointIndex)),h=B(K.series.key,m,l,K,a);
e.tooltip.show([p,n],h,null,null,J)
};
x.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+H.left,b.pos[1]+H.top],t.tooltipShow(b)
}),x.dispatch.on("elementMouseout.tooltip",function(b){t.tooltipHide(b)
}),t.on("tooltipHide",function(){C&&e.tooltip.cleanup()
}),a.dispatch=t,a.legend=u,a.xAxis=w,a.yAxis=v,d3.rebind(a,x,"defined","isArea","x","y","size","xScale","yScale","xDomain","yDomain","forceX","forceY","interactive","clipEdge","clipVoronoi","id","interpolate"),a.margin=function(b){if(!arguments.length){return H
}H=b;
return a
},a.width=function(b){if(!arguments.length){return F
}F=b;
return a
},a.height=function(b){if(!arguments.length){return E
}E=b;
return a
},a.color=function(c){if(!arguments.length){return G
}G=e.utils.getColor(c),u.color(G);
return a
},a.showLegend=function(b){if(!arguments.length){return D
}D=b;
return a
},a.tooltips=function(b){if(!arguments.length){return C
}C=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return B
}B=b;
return a
},a.noData=function(b){if(!arguments.length){return y
}y=b;
return a
};
return a
},e.models.linePlusBarChart=function(){function a(b){b.each(function(i){var n=d3.select(this),l=this,j=(Q||parseInt(n.style("width"))||960)-R.left-R.right,h=(P||parseInt(n.style("height"))||400)-R.top-R.bottom;
if(!i||!i.length||!i.filter(function(p){return p.values.length
}).length){n.append("text").attr("class","nvd3 nv-noData").attr("x",j/2).attr("y",h/2).attr("dy","-.7em").style("text-anchor","middle").text(I);
return a
}n.select(".nv-noData").remove();
var g=i.filter(function(p){return !p.disabled&&p.bar
}),c=i.filter(function(p){return !p.disabled&&!p.bar
}),u=i.filter(function(p){return !p.disabled&&p.bar
}).map(function(p){return p.values.map(function(w,v){return{x:O(w,v),y:N(w,v)}
})
}),t=i.filter(function(p){return !p.disabled&&!p.bar
}).map(function(p){return p.values.map(function(w,v){return{x:O(w,v),y:N(w,v)}
})
});
F.domain(d3.extent(d3.merge(u.concat(t)),function(p){return p.x
})).range([0,j]);
var s=d3.select(this).selectAll("g.nv-wrap.nv-linePlusBar").data([i]),r=s.enter().append("g").attr("class","nvd3 nv-wrap nv-linePlusBar").append("g");
r.append("g").attr("class","nv-x nv-axis"),r.append("g").attr("class","nv-y1 nv-axis"),r.append("g").attr("class","nv-y2 nv-axis"),r.append("g").attr("class","nv-barsWrap"),r.append("g").attr("class","nv-linesWrap"),r.append("g").attr("class","nv-legendWrap");
var q=s.select("g");
L&&(z.width(j/2),q.select(".nv-legendWrap").datum(i.map(function(p){p.originalKey=p.originalKey===undefined?p.key:p.originalKey,p.key=p.originalKey+(p.bar?" (left axis)":" (right axis)");
return p
})).call(z),R.top!=z.height()&&(R.top=z.height(),h=(P||parseInt(n.style("height"))||400)-R.top-R.bottom),q.select(".nv-legendWrap").attr("transform","translate("+j/2+","+-R.top+")")),H.width(j).height(h).color(i.map(function(v,p){return v.color||M(v,p)
}).filter(function(v,p){return !i[p].disabled&&!i[p].bar
})),G.width(j).height(h).color(i.map(function(v,p){return v.color||M(v,p)
}).filter(function(v,p){return !i[p].disabled&&i[p].bar
}));
var o=q.select(".nv-barsWrap").datum(g.length?g:[{values:[]}]),m=q.select(".nv-linesWrap").datum(c.length?c:[{values:[]}]);
d3.transition(o).call(G),d3.transition(m).call(H),q.attr("transform","translate("+R.left+","+R.top+")"),C.ticks(j/100).tickSize(-h,0),q.select(".nv-x.nv-axis").attr("transform","translate(0,"+E.range()[0]+")"),d3.transition(q.select(".nv-x.nv-axis")).call(C),B.ticks(h/36).tickSize(-j,0),d3.transition(q.select(".nv-y1.nv-axis")).style("opacity",g.length?1:0).call(B),A.ticks(h/36).tickSize(g.length?0:-j,0),q.select(".nv-y2.nv-axis").style("opacity",c.length?1:0).attr("transform","translate("+F.range()[1]+",0)"),d3.transition(q.select(".nv-y2.nv-axis")).call(A),z.dispatch.on("legendClick",function(v,p){v.disabled=!v.disabled,i.filter(function(w){return !w.disabled
}).length||i.map(function(w){w.disabled=!1,s.selectAll(".nv-series").classed("disabled",!1);
return w
}),b.transition().call(a)
}),H.dispatch.on("elementMouseover.tooltip",function(p){p.pos=[p.pos[0]+R.left,p.pos[1]+R.top],y.tooltipShow(p)
}),K&&y.on("tooltipShow",function(p){x(p,l.parentNode)
}),H.dispatch.on("elementMouseout.tooltip",function(p){y.tooltipHide(p)
}),K&&y.on("tooltipHide",e.tooltip.cleanup),G.dispatch.on("elementMouseover.tooltip",function(p){p.pos=[p.pos[0]+R.left,p.pos[1]+R.top],y.tooltipShow(p)
}),K&&y.on("tooltipShow",function(p){x(p,l.parentNode)
}),G.dispatch.on("elementMouseout.tooltip",function(p){y.tooltipHide(p)
}),K&&y.on("tooltipHide",e.tooltip.cleanup),a.update=function(){b.transition().call(a)
},a.container=this
});
return a
}var R={top:30,right:60,bottom:50,left:60},Q=null,P=null,O=function(b){return b.x
},N=function(b){return b.y
},M=e.utils.defaultColor(),L=!0,K=!0,J=function(h,g,l,j,i){return"<h3>"+h+"</h3><p>"+l+" at "+g+"</p>"
},I="No Data Available.",H=e.models.line(),G=e.models.historicalBar(),F=d3.scale.linear(),E=G.yScale(),D=H.yScale(),C=e.models.axis().scale(F).orient("bottom").tickPadding(5),B=e.models.axis().scale(E).orient("left"),A=e.models.axis().scale(D).orient("right"),z=e.models.legend().height(30),y=d3.dispatch("tooltipShow","tooltipHide"),x=function(i,p){var o=i.pos[0]+(p.offsetLeft||0),n=i.pos[1]+(p.offsetTop||0),m=C.tickFormat()(H.x()(i.point,i.pointIndex)),l=(i.series.bar?B:A).tickFormat()(H.y()(i.point,i.pointIndex)),j=J(i.series.key,m,l,i,a);
e.tooltip.show([o,n],j,i.value<0?"n":"s",null,p)
};
a.dispatch=y,a.legend=z,a.lines=H,a.bars=G,a.xAxis=C,a.yAxis1=B,a.yAxis2=A,d3.rebind(a,H,"defined","size","clipVoronoi","interpolate"),a.x=function(b){if(!arguments.length){return O
}O=b,H.x(b),G.x(b);
return a
},a.y=function(b){if(!arguments.length){return N
}N=b,H.y(b),G.y(b);
return a
},a.margin=function(b){if(!arguments.length){return R
}R=b;
return a
},a.width=function(b){if(!arguments.length){return Q
}Q=b;
return a
},a.height=function(b){if(!arguments.length){return P
}P=b;
return a
},a.color=function(c){if(!arguments.length){return M
}M=e.utils.getColor(c),z.color(M);
return a
},a.showLegend=function(b){if(!arguments.length){return L
}L=b;
return a
},a.tooltips=function(b){if(!arguments.length){return K
}K=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return J
}J=b;
return a
},a.noData=function(b){if(!arguments.length){return I
}I=b;
return a
};
return a
},e.models.lineWithFocusChart=function(){function K(b){b.each(function(h){function i(){S=B.empty()?null:B.extent(),extent=B.empty()?J.domain():B.extent(),l();
var x=p.select(".nv-focus .nv-linesWrap").datum(h.filter(function(y){return !y.disabled
}).map(function(z,y){return{key:z.key,values:z.values.filter(function(aa,A){return O.x()(aa,A)>=extent[0]&&O.x()(aa,A)<=extent[1]
})}
}));
d3.transition(x).call(O),d3.transition(p.select(".nv-focus .nv-x.nv-axis")).call(H),d3.transition(p.select(".nv-focus .nv-y.nv-axis")).call(G)
}function j(y){var x=+(y=="e"),A=x?1:-1,z=u/3;
return"M"+0.5*A+","+z+"A6,6 0 0 "+x+" "+6.5*A+","+(z+6)+"V"+(2*z-6)+"A6,6 0 0 "+x+" "+0.5*A+","+2*z+"ZM"+2.5*A+","+(z+8)+"V"+(2*z-8)+"M"+4.5*A+","+(z+8)+"V"+(2*z-8)
}function l(){B.empty()||B.extent(S),n.data([B.empty()?J.domain():S]).each(function(y,x){var A=J(y[0])-M.range()[0],z=M.range()[1]-J(y[1]);
d3.select(this).select(".left").attr("width",A<0?0:A),d3.select(this).select(".right").attr("x",J(y[1])).attr("width",z<0?0:z)
})
}var g=d3.select(this),c=this,w=(W||parseInt(g.style("width"))||960)-Z.left-Z.right,v=(V||parseInt(g.style("height"))||400)-Z.top-Z.bottom-U,u=U-Y.top-Y.bottom;
if(!h||!h.length||!h.filter(function(x){return x.values.length
}).length){g.append("text").attr("class","nvd3 nv-noData").attr("x",w/2).attr("y",v/2).attr("dy","-.7em").style("text-anchor","middle").text(P);
return K
}g.select(".nv-noData").remove(),B.on("brush",i);
var t=g.selectAll("g.nv-wrap.nv-lineWithFocusChart").data([h]),s=t.enter().append("g").attr("class","nvd3 nv-wrap nv-lineWithFocusChart").append("g");
s.append("g").attr("class","nv-legendWrap");
var r=s.append("g").attr("class","nv-focus");
r.append("g").attr("class","nv-x nv-axis"),r.append("g").attr("class","nv-y nv-axis"),r.append("g").attr("class","nv-linesWrap");
var q=s.append("g").attr("class","nv-context");
q.append("g").attr("class","nv-x nv-axis"),q.append("g").attr("class","nv-y nv-axis"),q.append("g").attr("class","nv-linesWrap"),q.append("g").attr("class","nv-brushBackground"),q.append("g").attr("class","nv-x nv-brush");
var p=t.select("g");
T&&(D.width(w),p.select(".nv-legendWrap").datum(h).call(D),Z.top!=D.height()&&(Z.top=D.height(),v=(V||parseInt(g.style("height"))||400)-Z.top-Z.bottom-U),p.select(".nv-legendWrap").attr("transform","translate(0,"+-Z.top+")")),O.width(w).height(v).color(h.map(function(y,x){return y.color||X(y,x)
}).filter(function(y,x){return !h[x].disabled
})),N.defined(O.defined()).width(w).height(u).color(h.map(function(y,x){return y.color||X(y,x)
}).filter(function(y,x){return !h[x].disabled
})),p.attr("transform","translate("+Z.left+","+Z.top+")"),H.ticks(w/100).tickSize(-v,0),G.ticks(v/36).tickSize(-w,0),p.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+L.range()[0]+")"),p.select(".nv-context").attr("transform","translate(0,"+(v+Z.bottom+Y.top)+")");
var o=p.select(".nv-context .nv-linesWrap").datum(h.filter(function(x){return !x.disabled
}));
d3.transition(o).call(N),S&&B.extent(S);
var n=p.select(".nv-brushBackground").selectAll("g").data([S||B.extent()]),m=n.enter().append("g");
m.append("rect").attr("class","left").attr("x",0).attr("y",0).attr("height",u),m.append("rect").attr("class","right").attr("x",0).attr("y",0).attr("height",u),gBrush=p.select(".nv-x.nv-brush").call(B),gBrush.selectAll("rect").attr("height",u),gBrush.selectAll(".resize").append("path").attr("d",j),i(),F.ticks(w/100).tickSize(-u,0),p.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+I.range()[0]+")"),d3.transition(p.select(".nv-context .nv-x.nv-axis")).call(F),E.ticks(u/36).tickSize(-w,0),d3.transition(p.select(".nv-context .nv-y.nv-axis")).call(E),p.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+L.range()[0]+")"),p.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+I.range()[0]+")"),D.dispatch.on("legendClick",function(y,x){y.disabled=!y.disabled,h.filter(function(z){return !z.disabled
}).length||h.map(function(z){z.disabled=!1,t.selectAll(".nv-series").classed("disabled",!1);
return z
}),b.transition().call(K)
}),O.dispatch.on("elementMouseover.tooltip",function(x){x.pos=[x.pos[0]+Z.left,x.pos[1]+Z.top],C.tooltipShow(x)
}),R&&C.on("tooltipShow",function(x){a(x,c.parentNode)
}),O.dispatch.on("elementMouseout.tooltip",function(x){C.tooltipHide(x)
}),R&&C.on("tooltipHide",e.tooltip.cleanup)
}),K.update=function(){K(b)
},K.container=this;
return K
}var Z={top:30,right:30,bottom:30,left:60},Y={top:0,right:30,bottom:20,left:60},X=e.utils.defaultColor(),W=null,V=null,U=100,T=!0,S=null,R=!0,Q=function(h,g,l,j,i){return"<h3>"+h+"</h3><p>"+l+" at "+g+"</p>"
},P="No Data Available.",O=e.models.line().clipEdge(!0),N=e.models.line().interactive(!1),M=O.xScale(),L=O.yScale(),J=N.xScale(),I=N.yScale(),H=e.models.axis().scale(M).orient("bottom").tickPadding(5),G=e.models.axis().scale(L).orient("left"),F=e.models.axis().scale(J).orient("bottom").tickPadding(5),E=e.models.axis().scale(I).orient("left"),D=e.models.legend().height(30),C=d3.dispatch("tooltipShow","tooltipHide"),B=d3.svg.brush().x(J),a=function(i,p){var o=i.pos[0]+(p.offsetLeft||0),n=i.pos[1]+(p.offsetTop||0),m=H.tickFormat()(O.x()(i.point,i.pointIndex)),l=G.tickFormat()(O.y()(i.point,i.pointIndex)),j=Q(i.series.key,m,l,i,K);
e.tooltip.show([o,n],j,null,null,p)
};
K.dispatch=C,K.legend=D,K.lines=O,K.lines2=N,K.xAxis=H,K.yAxis=G,K.x2Axis=F,K.y2Axis=E,d3.rebind(K,O,"defined","isArea","size","xDomain","yDomain","forceX","forceY","interactive","clipEdge","clipVoronoi","id"),K.x=function(b){if(!arguments.length){return O.x
}O.x(b),N.x(b);
return K
},K.y=function(b){if(!arguments.length){return O.y
}O.y(b),N.y(b);
return K
},K.margin=function(b){if(!arguments.length){return Z
}Z=b;
return K
},K.margin2=function(b){if(!arguments.length){return Y
}Y=b;
return K
},K.width=function(b){if(!arguments.length){return W
}W=b;
return K
},K.height=function(b){if(!arguments.length){return V
}V=b;
return K
},K.color=function(c){if(!arguments.length){return X
}X=e.utils.getColor(c),D.color(X);
return K
},K.showLegend=function(b){if(!arguments.length){return T
}T=b;
return K
},K.tooltips=function(b){if(!arguments.length){return R
}R=b;
return K
},K.tooltipContent=function(b){if(!arguments.length){return Q
}Q=b;
return K
},K.interpolate=function(b){if(!arguments.length){return O.interpolate()
}O.interpolate(b),N.interpolate(b);
return K
},K.noData=function(b){if(!arguments.length){return P
}P=b;
return K
},K.xTickFormat=function(b){if(!arguments.length){return H.tickFormat()
}H.tickFormat(b),F.tickFormat(b);
return K
},K.yTickFormat=function(b){if(!arguments.length){return G.tickFormat()
}G.tickFormat(b),E.tickFormat(b);
return K
};
return K
},e.models.multiBar=function(){function a(b){b.each(function(p){var n=K-L.left-L.right,l=J-L.top-L.bottom;
B&&(p=d3.layout.stack().offset("zero").values(function(s){return s.values
}).y(E)(p)),p=p.map(function(t,s){t.values=t.values.map(function(M){M.series=s;
return M
});
return t
});
var j=y&&x?[]:p.map(function(s){return s.values.map(function(M,t){return{x:F(M,t),y:E(M,t),y0:M.y0}
})
});
I.domain(d3.merge(j).map(function(s){return s.x
})).rangeBands([0,n],0.1),H.domain(x||d3.extent(d3.merge(j).map(function(s){return s.y+(B?s.y0:0)
}).concat(D))).range([l,0]);
if(I.domain()[0]===I.domain()[1]||H.domain()[0]===H.domain()[1]){singlePoint=!0
}I.domain()[0]===I.domain()[1]&&(I.domain()[0]?I.domain([I.domain()[0]-I.domain()[0]*0.01,I.domain()[1]+I.domain()[1]*0.01]):I.domain([-1,1])),H.domain()[0]===H.domain()[1]&&(H.domain()[0]?H.domain([H.domain()[0]+H.domain()[0]*0.01,H.domain()[1]-H.domain()[1]*0.01]):H.domain([-1,1])),v=v||I,u=u||H;
var i=d3.select(this).selectAll("g.nv-wrap.nv-multibar").data([p]),h=i.enter().append("g").attr("class","nvd3 nv-wrap nv-multibar"),g=h.append("defs"),c=h.append("g");
c.append("g").attr("class","nv-groups");
var r=i.select("g");
i.attr("transform","translate("+L.left+","+L.top+")"),g.append("clipPath").attr("id","nv-edge-clip-"+G).append("rect"),i.select("#nv-edge-clip-"+G+" rect").attr("width",n).attr("height",l),r.attr("clip-path",C?"url(#nv-edge-clip-"+G+")":"");
var q=i.select(".nv-groups").selectAll(".nv-group").data(function(s){return s
},function(s){return s.key
});
q.enter().append("g").style("stroke-opacity",0.000001).style("fill-opacity",0.000001),d3.transition(q.exit()).selectAll("rect.nv-bar").delay(function(t,s){return s*z/p[0].values.length
}).attr("y",function(s){return B?u(s.y0):u(0)
}).attr("height",0).remove(),q.attr("class",function(t,s){return"nv-group nv-series-"+s
}).classed("hover",function(s){return s.hover
}).style("fill",function(t,s){return A(t,s)
}).style("stroke",function(t,s){return A(t,s)
}),d3.transition(q).style("stroke-opacity",1).style("fill-opacity",0.75);
var o=q.selectAll("rect.nv-bar").data(function(s){return s.values
});
o.exit().remove();
var m=o.enter().append("rect").attr("class",function(t,s){return E(t,s)<0?"nv-bar negative":"nv-bar positive"
}).attr("x",function(t,s,M){return B?0:M*I.rangeBand()/p.length
}).attr("y",function(s){return u(B?s.y0:0)
}).attr("height",0).attr("width",I.rangeBand()/(B?1:p.length));
o.on("mouseover",function(t,s){d3.select(this).classed("hover",!0),w.elementMouseover({value:E(t,s),point:t,series:p[t.series],pos:[I(F(t,s))+I.rangeBand()*(B?p.length/2:t.series+0.5)/p.length,H(E(t,s)+(B?t.y0:0))],pointIndex:s,seriesIndex:t.series,e:d3.event})
}).on("mouseout",function(t,s){d3.select(this).classed("hover",!1),w.elementMouseout({value:E(t,s),point:t,series:p[t.series],pointIndex:s,seriesIndex:t.series,e:d3.event})
}).on("click",function(t,s){w.elementClick({value:E(t,s),point:t,series:p[t.series],pos:[I(F(t,s))+I.rangeBand()*(B?p.length/2:t.series+0.5)/p.length,H(E(t,s)+(B?t.y0:0))],pointIndex:s,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()
}).on("dblclick",function(t,s){w.elementDblClick({value:E(t,s),point:t,series:p[t.series],pos:[I(F(t,s))+I.rangeBand()*(B?p.length/2:t.series+0.5)/p.length,H(E(t,s)+(B?t.y0:0))],pointIndex:s,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()
}),o.attr("class",function(t,s){return E(t,s)<0?"nv-bar negative":"nv-bar positive"
}).attr("transform",function(t,s){return"translate("+I(F(t,s))+",0)"
}),B?d3.transition(o).delay(function(t,s){return s*z/p[0].values.length
}).attr("y",function(t,s){return H(E(t,s)+(B?t.y0:0))
}).attr("height",function(t,s){return Math.abs(H(t.y+(B?t.y0:0))-H(B?t.y0:0))
}).each("end",function(){d3.transition(d3.select(this)).attr("x",function(t,s){return B?0:t.series*I.rangeBand()/p.length
}).attr("width",I.rangeBand()/(B?1:p.length))
}):d3.transition(o).delay(function(t,s){return s*z/p[0].values.length
}).attr("x",function(t,s){return t.series*I.rangeBand()/p.length
}).attr("width",I.rangeBand()/p.length).each("end",function(){d3.transition(d3.select(this)).attr("y",function(t,s){return E(t,s)<0?H(0):H(E(t,s))
}).attr("height",function(t,s){return Math.abs(H(E(t,s))-H(0))
})
}),a.update=function(){a(b)
},v=I.copy(),u=H.copy()
});
return a
}var L={top:0,right:0,bottom:0,left:0},K=960,J=500,I=d3.scale.ordinal(),H=d3.scale.linear(),G=Math.floor(Math.random()*10000),F=function(b){return b.x
},E=function(b){return b.y
},D=[0],C=!0,B=!1,A=e.utils.defaultColor(),z=1200,y,x,w=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),v,u;
a.dispatch=w,a.x=function(b){if(!arguments.length){return F
}F=b;
return a
},a.y=function(b){if(!arguments.length){return E
}E=b;
return a
},a.margin=function(b){if(!arguments.length){return L
}L=b;
return a
},a.width=function(b){if(!arguments.length){return K
}K=b;
return a
},a.height=function(b){if(!arguments.length){return J
}J=b;
return a
},a.xScale=function(b){if(!arguments.length){return I
}I=b;
return a
},a.yScale=function(b){if(!arguments.length){return H
}H=b;
return a
},a.xDomain=function(b){if(!arguments.length){return y
}y=b;
return a
},a.yDomain=function(b){if(!arguments.length){return x
}x=b;
return a
},a.forceY=function(b){if(!arguments.length){return D
}D=b;
return a
},a.stacked=function(b){if(!arguments.length){return B
}B=b;
return a
},a.clipEdge=function(b){if(!arguments.length){return C
}C=b;
return a
},a.color=function(c){if(!arguments.length){return A
}A=e.utils.getColor(c);
return a
},a.id=function(b){if(!arguments.length){return G
}G=b;
return a
},a.delay=function(b){if(!arguments.length){return z
}z=b;
return a
};
return a
},e.models.multiBarChart=function(){function a(b){b.each(function(j){var m=d3.select(this),l=this,i=(O||parseInt(m.style("width"))||960)-P.left-P.right,h=(N||parseInt(m.style("height"))||400)-P.top-P.bottom;
if(!j||!j.length||!j.filter(function(r){return r.values.length
}).length){m.append("text").attr("class","nvd3 nv-noData").attr("x",i/2).attr("y",h/2).attr("dy","-.7em").style("text-anchor","middle").text(D);
return a
}m.select(".nv-noData").remove(),F=C.xScale(),E=C.yScale();
var g=m.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([j]),c=g.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarWithLegend").append("g");
c.append("g").attr("class","nv-x nv-axis"),c.append("g").attr("class","nv-y nv-axis"),c.append("g").attr("class","nv-barsWrap"),c.append("g").attr("class","nv-legendWrap"),c.append("g").attr("class","nv-controlsWrap");
var q=g.select("g");
K&&(z.width(i/2),q.select(".nv-legendWrap").datum(j).call(z),P.top!=z.height()&&(P.top=z.height(),h=(N||parseInt(m.style("height"))||400)-P.top-P.bottom),q.select(".nv-legendWrap").attr("transform","translate("+i/2+","+-P.top+")")),C.width(i).height(h).color(j.map(function(s,r){return s.color||M(s,r)
}).filter(function(s,r){return !j[r].disabled
}));
if(L){var p=[{key:"Grouped",disabled:C.stacked()},{key:"Stacked",disabled:!C.stacked()}];
y.width(180).color(["#444","#444","#444"]),q.select(".nv-controlsWrap").datum(p).attr("transform","translate(0,"+-P.top+")").call(y)
}q.attr("transform","translate("+P.left+","+P.top+")");
var o=q.select(".nv-barsWrap").datum(j.filter(function(r){return !r.disabled
}));
d3.transition(o).call(C),B.scale(F).ticks(i/100).tickSize(-h,0),q.select(".nv-x.nv-axis").attr("transform","translate(0,"+E.range()[0]+")"),d3.transition(q.select(".nv-x.nv-axis")).call(B);
var n=q.select(".nv-x.nv-axis > g").selectAll("g");
n.selectAll("line, text").style("opacity",1),J&&n.filter(function(s,r){return r%Math.ceil(j[0].values.length/(i/100))!==0
}).selectAll("text, line").style("opacity",0),I&&n.selectAll("text").attr("transform",function(s,r,t){return"rotate("+I+" 0,0)"
}).attr("text-transform",I>0?"start":"end"),A.scale(E).ticks(h/36).tickSize(-i,0),d3.transition(q.select(".nv-y.nv-axis")).call(A),z.dispatch.on("legendClick",function(r,s){r.disabled=!r.disabled,j.filter(function(t){return !t.disabled
}).length||j.map(function(t){t.disabled=!1,g.selectAll(".nv-series").classed("disabled",!1);
return t
}),b.transition().call(a)
}),y.dispatch.on("legendClick",function(r,s){if(!!r.disabled){p=p.map(function(t){t.disabled=!0;
return t
}),r.disabled=!1;
switch(r.key){case"Grouped":C.stacked(!1);
break;
case"Stacked":C.stacked(!0)
}b.transition().call(a)
}}),x.on("tooltipShow",function(r){H&&w(r,l.parentNode)
}),a.update=function(){b.transition().call(a)
},a.container=this
});
return a
}var P={top:30,right:20,bottom:50,left:60},O=null,N=null,M=e.utils.defaultColor(),L=!0,K=!0,J=!0,I=0,H=!0,G=function(h,g,l,j,i){return"<h3>"+h+"</h3><p>"+l+" on "+g+"</p>"
},F,E,D="No Data Available.",C=e.models.multiBar().stacked(!1),B=e.models.axis().orient("bottom").highlightZero(!1).showMaxMin(!1),A=e.models.axis().orient("left"),z=e.models.legend().height(30),y=e.models.legend().height(30),x=d3.dispatch("tooltipShow","tooltipHide");
B.tickFormat(function(b){return b
}),A.tickFormat(d3.format(",.1f"));
var w=function(i,p){var o=i.pos[0]+(p.offsetLeft||0),n=i.pos[1]+(p.offsetTop||0),m=B.tickFormat()(C.x()(i.point,i.pointIndex)),l=A.tickFormat()(C.y()(i.point,i.pointIndex)),j=G(i.series.key,m,l,i,a);
e.tooltip.show([o,n],j,i.value<0?"n":"s",null,p)
};
C.dispatch.on("elementMouseover.tooltip2",function(b){b.pos=[b.pos[0]+P.left,b.pos[1]+P.top],x.tooltipShow(b)
}),C.dispatch.on("elementMouseout.tooltip",function(b){x.tooltipHide(b)
}),x.on("tooltipHide",function(){H&&e.tooltip.cleanup()
}),a.dispatch=x,a.legend=z,a.xAxis=B,a.yAxis=A,d3.rebind(a,C,"x","y","xDomain","yDomain","forceX","forceY","clipEdge","id","stacked","delay"),a.margin=function(b){if(!arguments.length){return P
}P=b;
return a
},a.width=function(b){if(!arguments.length){return O
}O=b;
return a
},a.height=function(b){if(!arguments.length){return N
}N=b;
return a
},a.color=function(c){if(!arguments.length){return M
}M=e.utils.getColor(c),z.color(M);
return a
},a.showControls=function(b){if(!arguments.length){return L
}L=b;
return a
},a.showLegend=function(b){if(!arguments.length){return K
}K=b;
return a
},a.reduceXTicks=function(b){if(!arguments.length){return J
}J=b;
return a
},a.rotateLabels=function(b){if(!arguments.length){return I
}I=b;
return a
},a.tooltip=function(b){if(!arguments.length){return G
}G=b;
return a
},a.tooltips=function(b){if(!arguments.length){return H
}H=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return G
}G=b;
return a
},a.noData=function(b){if(!arguments.length){return D
}D=b;
return a
};
return a
},e.models.multiBarHorizontal=function(){function a(b){b.each(function(l){var i=O-P.left-P.right,n=N-P.top-P.bottom;
F&&(l=d3.layout.stack().offset("zero").values(function(p){return p.values
}).y(I)(l)),l=l.map(function(t,p){t.values=t.values.map(function(u){u.series=p;
return u
});
return t
});
var m=A&&z?[]:l.map(function(p){return p.values.map(function(u,t){return{x:J(u,t),y:I(u,t),y0:u.y0}
})
});
L.domain(A||d3.merge(m).map(function(p){return p.x
})).rangeBands([0,n],0.1),K.domain(z||d3.extent(d3.merge(m).map(function(p){return p.y+(F?p.y0:0)
}).concat(H))),E&&!F?K.range([K.domain()[0]<0?D:0,i-(K.domain()[1]>0?D:0)]):K.range([0,i]),y=y||L,x=x||d3.scale.linear().domain(K.domain()).range([K(0),K(0)]);
var j=d3.select(this).selectAll("g.nv-wrap.nv-multibarHorizontal").data([l]),h=j.enter().append("g").attr("class","nvd3 nv-wrap nv-multibarHorizontal"),g=h.append("defs"),c=h.append("g");
c.append("g").attr("class","nv-groups");
var s=j.select("g");
j.attr("transform","translate("+P.left+","+P.top+")");
var r=j.select(".nv-groups").selectAll(".nv-group").data(function(p){return p
},function(p){return p.key
});
r.enter().append("g").style("stroke-opacity",0.000001).style("fill-opacity",0.000001),d3.transition(r.exit()).style("stroke-opacity",0.000001).style("fill-opacity",0.000001).remove(),r.attr("class",function(t,p){return"nv-group nv-series-"+p
}).classed("hover",function(p){return p.hover
}).style("fill",function(t,p){return G(t,p)
}).style("stroke",function(t,p){return G(t,p)
}),d3.transition(r).style("stroke-opacity",1).style("fill-opacity",0.75);
var q=r.selectAll("g.nv-bar").data(function(p){return p.values
});
q.exit().remove();
var o=q.enter().append("g").attr("transform",function(t,p,u){return"translate("+x(F?t.y0:0)+","+(F?0:u*L.rangeBand()/l.length+L(J(t,p)))+")"
});
o.append("rect").attr("width",0).attr("height",L.rangeBand()/(F?1:l.length)),q.on("mouseover",function(t,p){d3.select(this).classed("hover",!0),w.elementMouseover({value:I(t,p),point:t,series:l[t.series],pos:[K(I(t,p)+(F?t.y0:0)),L(J(t,p))+L.rangeBand()*(F?l.length/2:t.series+0.5)/l.length],pointIndex:p,seriesIndex:t.series,e:d3.event})
}).on("mouseout",function(t,p){d3.select(this).classed("hover",!1),w.elementMouseout({value:I(t,p),point:t,series:l[t.series],pointIndex:p,seriesIndex:t.series,e:d3.event})
}).on("click",function(t,p){w.elementClick({value:I(t,p),point:t,series:l[t.series],pos:[L(J(t,p))+L.rangeBand()*(F?l.length/2:t.series+0.5)/l.length,K(I(t,p)+(F?t.y0:0))],pointIndex:p,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()
}).on("dblclick",function(t,p){w.elementDblClick({value:I(t,p),point:t,series:l[t.series],pos:[L(J(t,p))+L.rangeBand()*(F?l.length/2:t.series+0.5)/l.length,K(I(t,p)+(F?t.y0:0))],pointIndex:p,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()
}),E&&!F?(o.append("text").attr("text-anchor",function(t,p){return I(t,p)<0?"end":"start"
}),q.select("text").attr("y",L.rangeBand()/2).attr("dy","-.32em").text(function(t,p){return C(I(t,p))
}),d3.transition(q).select("text").attr("x",function(t,p){return I(t,p)<0?-4:K(I(t,p))-K(0)+4
})):q.selectAll("text").remove(),q.attr("class",function(t,p){return I(t,p)<0?"nv-bar negative":"nv-bar positive"
}),F?d3.transition(q).attr("transform",function(t,p){return"translate("+K(t.y0)+","+L(J(t,p))+")"
}).select("rect").attr("width",function(t,p){return Math.abs(K(I(t,p)+t.y0)-K(t.y0))
}).attr("height",L.rangeBand()):d3.transition(q).attr("transform",function(t,p){return"translate("+(I(t,p)<0?K(I(t,p)):K(0))+","+(t.series*L.rangeBand()/l.length+L(J(t,p)))+")"
}).select("rect").attr("height",L.rangeBand()/l.length).attr("width",function(t,p){return Math.abs(K(I(t,p))-K(0))
}),a.update=function(){b.transition().call(a)
},y=L.copy(),x=K.copy()
});
return a
}var P={top:0,right:0,bottom:0,left:0},O=960,N=500,M=Math.floor(Math.random()*10000),L=d3.scale.ordinal(),K=d3.scale.linear(),J=function(b){return b.x
},I=function(b){return b.y
},H=[0],G=e.utils.defaultColor(),F=!1,E=!1,D=60,C=d3.format(",.2f"),B=1200,A,z,y,x,w=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");
a.dispatch=w,a.x=function(b){if(!arguments.length){return J
}J=b;
return a
},a.y=function(b){if(!arguments.length){return I
}I=b;
return a
},a.margin=function(b){if(!arguments.length){return P
}P=b;
return a
},a.width=function(b){if(!arguments.length){return O
}O=b;
return a
},a.height=function(b){if(!arguments.length){return N
}N=b;
return a
},a.xScale=function(b){if(!arguments.length){return L
}L=b;
return a
},a.yScale=function(b){if(!arguments.length){return K
}K=b;
return a
},a.xDomain=function(b){if(!arguments.length){return A
}A=b;
return a
},a.yDomain=function(b){if(!arguments.length){return z
}z=b;
return a
},a.forceY=function(b){if(!arguments.length){return H
}H=b;
return a
},a.stacked=function(b){if(!arguments.length){return F
}F=b;
return a
},a.color=function(c){if(!arguments.length){return G
}G=e.utils.getColor(c);
return a
},a.id=function(b){if(!arguments.length){return M
}M=b;
return a
},a.delay=function(b){if(!arguments.length){return B
}B=b;
return a
},a.showValues=function(b){if(!arguments.length){return E
}E=b;
return a
},a.valueFormat=function(b){if(!arguments.length){return C
}C=b;
return a
},a.valuePadding=function(b){if(!arguments.length){return D
}D=b;
return a
};
return a
},e.models.multiBarHorizontalChart=function(){function a(b){b.each(function(o){var l=d3.select(this),i=this,s=(O||parseInt(l.style("width"))||960)-P.left-P.right,r=(N||parseInt(l.style("height"))||400)-P.top-P.bottom;
if(!o||!o.length||!o.filter(function(j){return j.values.length
}).length){l.append("text").attr("class","nvd3 nv-noData").attr("x",s/2).attr("y",r/2).attr("dy","-.7em").style("text-anchor","middle").text(G);
return a
}l.select(".nv-noData").remove();
var q=l.selectAll("g.nv-wrap.nv-multiBarHorizontalChart").data([o]),p=q.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarHorizontalChart").append("g");
p.append("g").attr("class","nv-x nv-axis"),p.append("g").attr("class","nv-y nv-axis"),p.append("g").attr("class","nv-barsWrap"),p.append("g").attr("class","nv-legendWrap"),p.append("g").attr("class","nv-controlsWrap"),P.top=A.height();
var h=q.select("g");
K&&(A.width(s/2),h.select(".nv-legendWrap").datum(o).call(A),P.top!=A.height()&&(P.top=A.height(),r=(N||parseInt(l.style("height"))||400)-P.top-P.bottom),h.select(".nv-legendWrap").attr("transform","translate("+s/2+","+-P.top+")")),F.width(s).height(r).color(o.map(function(m,j){return m.color||M(m,j)
}).filter(function(m,j){return !o[j].disabled
})),L&&(z.width(180).color(["#444","#444","#444"]),h.select(".nv-controlsWrap").datum(w).attr("transform","translate(0,"+-P.top+")").call(z)),h.attr("transform","translate("+P.left+","+P.top+")");
var g=h.select(".nv-barsWrap").datum(o.filter(function(j){return !j.disabled
}));
d3.transition(g).call(F),C.ticks(r/24).tickSize(-s,0),h.select(".nv-x.nv-axis").transition().duration(0).call(C);
var c=h.select(".nv-x.nv-axis").selectAll("g");
c.selectAll("line, text").style("opacity",1),B.ticks(s/100).tickSize(-r,0),h.select(".nv-y.nv-axis").attr("transform","translate(0,"+r+")"),d3.transition(h.select(".nv-y.nv-axis")).call(B),A.dispatch.on("legendClick",function(m,j){m.disabled=!m.disabled,o.filter(function(n){return !n.disabled
}).length||o.map(function(n){n.disabled=!1,q.selectAll(".nv-series").classed("disabled",!1);
return n
}),b.transition().call(a)
}),z.dispatch.on("legendClick",function(m,j){if(!!m.disabled){w=w.map(function(n){n.disabled=!0;
return n
}),m.disabled=!1;
switch(m.key){case"Grouped":F.stacked(!1);
break;
case"Stacked":F.stacked(!0)
}b.transition().call(a)
}}),F.dispatch.on("elementMouseover.tooltip",function(j){j.pos=[j.pos[0]+P.left,j.pos[1]+P.top],y.tooltipShow(j)
}),I&&y.on("tooltipShow",function(j){x(j,i.parentNode)
}),F.dispatch.on("elementMouseout.tooltip",function(j){y.tooltipHide(j)
}),I&&y.on("tooltipHide",e.tooltip.cleanup),a.update=function(){b.transition().call(a)
},a.container=this
});
return a
}var P={top:30,right:20,bottom:50,left:60},O=null,N=null,M=e.utils.defaultColor(),L=!0,K=!0,J=!1,I=!0,H=function(h,g,l,j,i){return"<h3>"+h+" - "+g+"</h3><p>"+l+"</p>"
},G="No Data Available.",F=e.models.multiBarHorizontal().stacked(J),E=F.xScale(),D=F.yScale(),C=e.models.axis().scale(E).orient("left").highlightZero(!1).showMaxMin(!1),B=e.models.axis().scale(D).orient("bottom"),A=e.models.legend().height(30),z=e.models.legend().height(30),y=d3.dispatch("tooltipShow","tooltipHide");
C.tickFormat(function(b){return b
}),B.tickFormat(d3.format(",.1f"));
var x=function(i,p){var o=i.pos[0]+(p.offsetLeft||0),n=i.pos[1]+(p.offsetTop||0),m=C.tickFormat()(F.x()(i.point,i.pointIndex)),l=B.tickFormat()(F.y()(i.point,i.pointIndex)),j=H(i.series.key,m,l,i,a);
e.tooltip.show([o,n],j,i.value<0?"e":"w",null,p)
},w=[{key:"Grouped"},{key:"Stacked",disabled:!0}];
a.dispatch=y,a.multibar=F,a.legend=A,a.xAxis=C,a.yAxis=B,d3.rebind(a,F,"x","y","xDomain","yDomain","forceX","forceY","clipEdge","id","delay","showValues","valueFormat","stacked"),a.margin=function(b){if(!arguments.length){return P
}P=b;
return a
},a.width=function(b){if(!arguments.length){return O
}O=b;
return a
},a.height=function(b){if(!arguments.length){return N
}N=b;
return a
},a.color=function(c){if(!arguments.length){return M
}M=e.utils.getColor(c),A.color(M);
return a
},a.showControls=function(b){if(!arguments.length){return L
}L=b;
return a
},a.showLegend=function(b){if(!arguments.length){return K
}K=b;
return a
},a.tooltip=function(b){if(!arguments.length){return H
}H=b;
return a
},a.tooltips=function(b){if(!arguments.length){return I
}I=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return H
}H=b;
return a
},a.noData=function(b){if(!arguments.length){return G
}G=b;
return a
};
return a
},e.models.multiChart=function(){function a(b){b.each(function(ac){var ab=d3.select(this),t=this,aa=(T||parseInt(ab.style("width"))||960)-V.left-V.right,Z=(S||parseInt(ab.style("height"))||400)-V.top-V.bottom,Y=ac.filter(function(h){return !h.disabled&&h.type=="line"&&h.yAxis==1
}),X=ac.filter(function(h){return !h.disabled&&h.type=="line"&&h.yAxis==2
}),W=ac.filter(function(h){return !h.disabled&&h.type=="bar"&&h.yAxis==1
}),y=ac.filter(function(h){return !h.disabled&&h.type=="bar"&&h.yAxis==2
}),x=ac.filter(function(h){return !h.disabled&&h.type=="area"&&h.yAxis==1
}),w=ac.filter(function(h){return !h.disabled&&h.type=="area"&&h.yAxis==2
}),v=ac.filter(function(h){return !h.disabled&&h.yAxis==1
}).map(function(h){return h.values.map(function(ad,j){return{x:ad.x,y:ad.y}
})
}),u=ac.filter(function(h){return !h.disabled&&h.yAxis==2
}).map(function(h){return h.values.map(function(ad,j){return{x:ad.x,y:ad.y}
})
});
O.domain(d3.extent(d3.merge(v.concat(u)),function(h){return h.x
})).range([0,aa]);
var s=ab.selectAll("g.wrap.multiChart").data([ac]),r=s.enter().append("g").attr("class","wrap nvd3 multiChart").append("g");
r.append("g").attr("class","x axis"),r.append("g").attr("class","y1 axis"),r.append("g").attr("class","y2 axis"),r.append("g").attr("class","lines1Wrap"),r.append("g").attr("class","lines2Wrap"),r.append("g").attr("class","bars1Wrap"),r.append("g").attr("class","bars2Wrap"),r.append("g").attr("class","stack1Wrap"),r.append("g").attr("class","stack2Wrap"),r.append("g").attr("class","legendWrap");
var q=s.select("g");
R&&(B.width(aa/2),q.select(".legendWrap").datum(ac.map(function(h){h.originalKey=h.originalKey===undefined?h.key:h.originalKey,h.key=h.originalKey+(h.yAxis==1?"":" (right axis)");
return h
})).call(B),V.top!=B.height()&&(V.top=B.height(),Z=(S||parseInt(ab.style("height"))||400)-V.top-V.bottom),q.select(".legendWrap").attr("transform","translate("+aa/2+","+-V.top+")")),K.width(aa).height(Z).interpolate("monotone").color(ac.map(function(j,h){return j.color||U[h%U.length]
}).filter(function(j,h){return !ac[h].disabled&&ac[h].yAxis==1&&ac[h].type=="line"
})),J.width(aa).height(Z).interpolate("monotone").color(ac.map(function(j,h){return j.color||U[h%U.length]
}).filter(function(j,h){return !ac[h].disabled&&ac[h].yAxis==2&&ac[h].type=="line"
})),I.width(aa).height(Z).color(ac.map(function(j,h){return j.color||U[h%U.length]
}).filter(function(j,h){return !ac[h].disabled&&ac[h].yAxis==1&&ac[h].type=="bar"
})),H.width(aa).height(Z).color(ac.map(function(j,h){return j.color||U[h%U.length]
}).filter(function(j,h){return !ac[h].disabled&&ac[h].yAxis==2&&ac[h].type=="bar"
})),G.width(aa).height(Z).color(ac.map(function(j,h){return j.color||U[h%U.length]
}).filter(function(j,h){return !ac[h].disabled&&ac[h].yAxis==1&&ac[h].type=="area"
})),F.width(aa).height(Z).color(ac.map(function(j,h){return j.color||U[h%U.length]
}).filter(function(j,h){return !ac[h].disabled&&ac[h].yAxis==2&&ac[h].type=="area"
})),q.attr("transform","translate("+V.left+","+V.top+")");
var p=q.select(".lines1Wrap").datum(Y),o=q.select(".bars1Wrap").datum(W),n=q.select(".stack1Wrap").datum(x),m=q.select(".lines2Wrap").datum(X),l=q.select(".bars2Wrap").datum(y),i=q.select(".stack2Wrap").datum(w),g=x.length?x.map(function(h){return h.values
}).reduce(function(j,h){return j.map(function(ad,ae){return{x:ad.x,y:ad.y+h[ae].y}
})
}).concat([{x:0,y:0}]):[],c=w.length?w.map(function(h){return h.values
}).reduce(function(j,h){return j.map(function(ad,ae){return{x:ad.x,y:ad.y+h[ae].y}
})
}).concat([{x:0,y:0}]):[];
M.domain(d3.extent(d3.merge(v).concat(g),function(h){return h.y
})).range([0,Z]),L.domain(d3.extent(d3.merge(u).concat(c),function(h){return h.y
})).range([0,Z]),K.yDomain(M.domain()),I.yDomain(M.domain()),G.yDomain(M.domain()),J.yDomain(L.domain()),H.yDomain(L.domain()),F.yDomain(L.domain()),x.length&&d3.transition(n).call(G),w.length&&d3.transition(i).call(F),W.length&&d3.transition(o).call(I),y.length&&d3.transition(l).call(H),Y.length&&d3.transition(p).call(K),X.length&&d3.transition(m).call(J),E.ticks(aa/100).tickSize(-Z,0),q.select(".x.axis").attr("transform","translate(0,"+Z+")"),d3.transition(q.select(".x.axis")).call(E),D.ticks(Z/36).tickSize(-aa,0),d3.transition(q.select(".y1.axis")).call(D),C.ticks(Z/36).tickSize(-aa,0),d3.transition(q.select(".y2.axis")).call(C),q.select(".y2.axis").style("opacity",u.length?1:0).attr("transform","translate("+O.range()[1]+",0)"),B.dispatch.on("legendClick",function(h,j){h.disabled=!h.disabled,ac.filter(function(ad){return !ad.disabled
}).length||ac.map(function(ad){ad.disabled=!1,s.selectAll(".series").classed("disabled",!1);
return ad
}),b.transition().call(a)
}),A.on("tooltipShow",function(h){Q&&z(h,t.parentNode)
})
}),a.update=function(){a(b)
},a.container=this;
return a
}var V={top:30,right:20,bottom:50,left:60},U=d3.scale.category20().range(),T=null,S=null,R=!0,Q=!0,P=function(h,g,l,j,i){return"<h3>"+h+"</h3><p>"+l+" at "+g+"</p>"
},O,N,O=d3.scale.linear(),M=d3.scale.linear(),L=d3.scale.linear(),K=e.models.line().yScale(M),J=e.models.line().yScale(L),I=e.models.multiBar().stacked(!1).yScale(M),H=e.models.multiBar().stacked(!1).yScale(L),G=e.models.stackedArea().yScale(M),F=e.models.stackedArea().yScale(L),E=e.models.axis().scale(O).orient("bottom").tickPadding(5),D=e.models.axis().scale(M).orient("left"),C=e.models.axis().scale(L).orient("right"),B=e.models.legend().height(30),A=d3.dispatch("tooltipShow","tooltipHide"),z=function(h,p){var o=h.pos[0]+(p.offsetLeft||0),n=h.pos[1]+(p.offsetTop||0),m=E.tickFormat()(K.x()(h.point,h.pointIndex)),l=(h.series.bar?D:C).tickFormat()(K.y()(h.point,h.pointIndex)),j=P(h.series.key,m,l,h,a);
e.tooltip.show([o,n],j,undefined,undefined,p.offsetParent)
};
K.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),K.dispatch.on("elementMouseout.tooltip",function(b){A.tooltipHide(b)
}),J.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),J.dispatch.on("elementMouseout.tooltip",function(b){A.tooltipHide(b)
}),I.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),I.dispatch.on("elementMouseout.tooltip",function(b){A.tooltipHide(b)
}),H.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),H.dispatch.on("elementMouseout.tooltip",function(b){A.tooltipHide(b)
}),G.dispatch.on("tooltipShow",function(b){if(!Math.round(G.y()(b.point)*100)){setTimeout(function(){d3.selectAll(".point.hover").classed("hover",!1)
},0);
return !1
}b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),G.dispatch.on("tooltipHide",function(b){A.tooltipHide(b)
}),F.dispatch.on("tooltipShow",function(b){if(!Math.round(F.y()(b.point)*100)){setTimeout(function(){d3.selectAll(".point.hover").classed("hover",!1)
},0);
return !1
}b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),F.dispatch.on("tooltipHide",function(b){A.tooltipHide(b)
}),K.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),K.dispatch.on("elementMouseout.tooltip",function(b){A.tooltipHide(b)
}),J.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+V.left,b.pos[1]+V.top],A.tooltipShow(b)
}),J.dispatch.on("elementMouseout.tooltip",function(b){A.tooltipHide(b)
}),A.on("tooltipHide",function(){Q&&e.tooltip.cleanup()
}),a.dispatch=A,a.lines1=K,a.lines2=J,a.bars1=I,a.bars2=H,a.stack1=G,a.stack2=F,a.xAxis=E,a.yAxis1=D,a.yAxis2=C,a.x=function(b){if(!arguments.length){return getX
}getX=b,K.x(b),I.x(b);
return a
},a.y=function(b){if(!arguments.length){return getY
}getY=b,K.y(b),I.y(b);
return a
},a.margin=function(b){if(!arguments.length){return V
}V=b;
return a
},a.width=function(b){if(!arguments.length){return T
}T=b;
return a
},a.height=function(b){if(!arguments.length){return S
}S=b;
return a
},a.color=function(b){if(!arguments.length){return U
}U=b,B.color(b);
return a
},a.showLegend=function(b){if(!arguments.length){return R
}R=b;
return a
},a.tooltips=function(b){if(!arguments.length){return Q
}Q=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return P
}P=b;
return a
};
return a
},e.models.ohlcBar=function(){function a(b){b.each(function(m){var i=Q-R.left-R.right,q=P-R.top-R.bottom;
B.domain(D||d3.extent(m[0].values.map(N).concat(H))).range([0,i]),A.domain(C||[d3.min(m[0].values.map(I).concat(G)),d3.max(m[0].values.map(J).concat(G))]).range([q,0]);
if(B.domain()[0]===B.domain()[1]||A.domain()[0]===A.domain()[1]){singlePoint=!0
}B.domain()[0]===B.domain()[1]&&(B.domain()[0]?B.domain([B.domain()[0]-B.domain()[0]*0.01,B.domain()[1]+B.domain()[1]*0.01]):B.domain([-1,1])),A.domain()[0]===A.domain()[1]&&(A.domain()[0]?A.domain([A.domain()[0]+A.domain()[0]*0.01,A.domain()[1]-A.domain()[1]*0.01]):A.domain([-1,1]));
var p=d3.select(this).on("click",function(s,o){x.chartClick({data:s,index:o,pos:d3.event,id:O})
}),n=d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([m[0].values]),l=n.enter().append("g").attr("class","nvd3 nv-wrap nv-ohlcBar"),j=l.append("g");
j.append("g").attr("class","nv-ticks"),n.attr("width",Q).attr("height",P);
var h=n.select("g").attr("transform","translate("+R.left+","+R.top+")");
l.append("defs").append("clipPath").attr("id","nv-chart-clip-path-"+O).append("rect"),n.select("#nv-chart-clip-path-"+O+" rect").attr("width",i).attr("height",q),j.attr("clip-path",F?"url(#nv-chart-clip-path-"+O+")":"");
var g=j.append("g").attr("class","nv-shiftWrap"),c=n.select(".nv-ticks").selectAll(".nv-tick").data(function(o){return o
});
c.exit().remove();
var r=c.enter().append("path").attr("class",function(s,o,t){return(L(s,o)>K(s,o)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+t+"-"+o
}).attr("d",function(o,t){var s=i/m[0].values.length*0.9;
return"m0,0l0,"+(A(L(o,t))-A(J(o,t)))+"l"+-s/2+",0l"+s/2+",0l0,"+(A(I(o,t))-A(L(o,t)))+"l0,"+(A(K(o,t))-A(I(o,t)))+"l"+s/2+",0l"+-s/2+",0z"
}).attr("transform",function(s,o){return"translate("+B(N(s,o))+","+A(J(s,o))+")"
}).on("mouseover",function(o,s){d3.select(this).classed("hover",!0),x.elementMouseover({point:o,series:m[0],pos:[B(N(o,s)),A(M(o,s))],pointIndex:s,seriesIndex:0,e:d3.event})
}).on("mouseout",function(o,s){d3.select(this).classed("hover",!1),x.elementMouseout({point:o,series:m[0],pointIndex:s,seriesIndex:0,e:d3.event})
}).on("click",function(s,o){x.elementClick({value:M(s,o),data:s,index:o,pos:[B(N(s,o)),A(M(s,o))],e:d3.event,id:O}),d3.event.stopPropagation()
}).on("dblclick",function(s,o){x.elementDblClick({value:M(s,o),data:s,index:o,pos:[B(N(s,o)),A(M(s,o))],e:d3.event,id:O}),d3.event.stopPropagation()
});
c.attr("class",function(s,o,t){return(L(s,o)>K(s,o)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+t+"-"+o
}),d3.transition(c).attr("transform",function(s,o){return"translate("+B(N(s,o))+","+A(J(s,o))+")"
}).attr("d",function(o,t){var s=i/m[0].values.length*0.9;
return"m0,0l0,"+(A(L(o,t))-A(J(o,t)))+"l"+-s/2+",0l"+s/2+",0l0,"+(A(I(o,t))-A(L(o,t)))+"l0,"+(A(K(o,t))-A(I(o,t)))+"l"+s/2+",0l"+-s/2+",0z"
})
});
return a
}var R={top:0,right:0,bottom:0,left:0},Q=960,P=500,O=Math.floor(Math.random()*10000),N=function(b){return b.x
},M=function(b){return b.y
},L=function(b){return b.open
},K=function(b){return b.close
},J=function(b){return b.high
},I=function(b){return b.low
},H=[],G=[],F=!0,E=e.utils.defaultColor(),D,C,B=d3.scale.linear(),A=d3.scale.linear(),z=d3.svg.axis().scale(B).orient("bottom"),y=d3.svg.axis().scale(A).orient("left"),x=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");
a.dispatch=x,a.x=function(b){if(!arguments.length){return N
}N=b;
return a
},a.y=function(b){if(!arguments.length){return M
}M=b;
return a
},a.open=function(b){if(!arguments.length){return L
}L=b;
return a
},a.close=function(b){if(!arguments.length){return K
}K=b;
return a
},a.high=function(b){if(!arguments.length){return J
}J=b;
return a
},a.low=function(b){if(!arguments.length){return I
}I=b;
return a
},a.margin=function(b){if(!arguments.length){return R
}R=b;
return a
},a.width=function(b){if(!arguments.length){return Q
}Q=b;
return a
},a.height=function(b){if(!arguments.length){return P
}P=b;
return a
},a.xScale=function(b){if(!arguments.length){return B
}B=b;
return a
},a.yScale=function(b){if(!arguments.length){return A
}A=b;
return a
},a.xDomain=function(b){if(!arguments.length){return D
}D=b;
return a
},a.yDomain=function(b){if(!arguments.length){return C
}C=b;
return a
},a.forceX=function(b){if(!arguments.length){return H
}H=b;
return a
},a.forceY=function(b){if(!arguments.length){return G
}G=b;
return a
},a.clipEdge=function(b){if(!arguments.length){return F
}F=b;
return a
},a.color=function(c){if(!arguments.length){return E
}E=e.utils.getColor(c);
return a
},a.id=function(b){if(!arguments.length){return O
}O=b;
return a
};
return a
},e.models.pie=function(){function a(b){b.each(function(O){function n(p){p.innerRadius=0;
var j=d3.interpolate({startAngle:0,endAngle:0},p);
return function(E){return i(j(E))
}
}function G(p){r||(p.innerRadius=0);
var j=d3.interpolate(this._current,p);
this._current=j(0);
return function(E){return i(j(E))
}
}function H(p){var j=(p.startAngle+p.endAngle)*90/Math.PI-90;
return j>90?j-180:j
}var N=C-D.left-D.right,M=B-D.top-D.bottom,K=Math.min(N,M)/2,I=d3.select(this).on("click",function(p,j){q.chartClick({data:p,index:j,pos:d3.event,id:x})
}),F=I.selectAll(".nv-wrap.nv-pie").data([A(O[0])]),o=F.enter().append("g").attr("class","nvd3 nv-wrap nv-pie nv-chart-"+x),m=o.append("g"),l=F.select("g");
m.append("g").attr("class","nv-pie"),F.attr("transform","translate("+D.left+","+D.top+")"),l.select(".nv-pie").attr("transform","translate("+N/2+","+M/2+")");
var i=d3.svg.arc().outerRadius(K-K/5);
r&&i.innerRadius(K/2);
var h=d3.layout.pie().sort(null).value(function(j){return j.disabled?0:y(j)
}),g=F.select(".nv-pie").selectAll(".nv-slice").data(h);
g.exit().remove();
var c=g.enter().append("g").attr("class","nv-slice").on("mouseover",function(p,j){d3.select(this).classed("hover",!0),q.elementMouseover({label:z(p.data),value:y(p.data),point:p.data,pointIndex:j,pos:[d3.event.pageX,d3.event.pageY],id:x})
}).on("mouseout",function(p,j){d3.select(this).classed("hover",!1),q.elementMouseout({label:z(p.data),value:y(p.data),point:p.data,index:j,id:x})
}).on("click",function(p,j){q.elementClick({label:z(p.data),value:y(p.data),point:p.data,index:j,pos:d3.event,id:x}),d3.event.stopPropagation()
}).on("dblclick",function(p,j){q.elementDblClick({label:z(p.data),value:y(p.data),point:p.data,index:j,pos:d3.event,id:x}),d3.event.stopPropagation()
});
g.attr("fill",function(p,j){return w(p,j)
}).attr("stroke",function(p,j){return w(p,j)
});
var L=c.append("path").each(function(j){this._current=j
});
d3.transition(g.select("path")).attr("d",i).attrTween("d",G);
if(u){var J=i;
t&&(J=d3.svg.arc().outerRadius(i.outerRadius())),c.append("g").classed("nv-label",!0).each(function(p,j){var E=d3.select(this);
E.attr("transform",function(P){P.outerRadius=K+10,P.innerRadius=K+15;
return"translate("+J.centroid(P)+")"
}),E.append("rect").style("stroke","#fff").style("fill","#fff").attr("rx",3).attr("ry",3),E.append("text").style("text-anchor","middle").style("fill","#000")
}),g.select(".nv-label").transition().attr("transform",function(j){j.outerRadius=K+10,j.innerRadius=K+15;
return"translate("+J.centroid(j)+")"
}),g.each(function(p,j){var P=d3.select(this);
P.select(".nv-label text").text(function(R,Q){var S=(R.endAngle-R.startAngle)/(2*Math.PI);
return R.value&&S>s?z(R.data):""
});
var E=P.select("text").node().getBBox();
P.select(".nv-label rect").attr("width",E.width+10).attr("height",E.height+10).attr("transform",function(){return"translate("+[E.x-5,E.y-5]+")"
})
})
}});
return a
}var D={top:0,right:0,bottom:0,left:0},C=500,B=500,A=function(b){return b.values
},z=function(b){return b.x
},y=function(b){return b.y
},x=Math.floor(Math.random()*10000),w=e.utils.defaultColor(),v=d3.format(",.2f"),u=!0,t=!1,s=0.02,r=!1,q=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");
a.dispatch=q,a.margin=function(b){if(!arguments.length){return D
}D=b;
return a
},a.width=function(b){if(!arguments.length){return C
}C=b;
return a
},a.height=function(b){if(!arguments.length){return B
}B=b;
return a
},a.values=function(b){if(!arguments.length){return A
}A=b;
return a
},a.x=function(b){if(!arguments.length){return z
}z=b;
return a
},a.y=function(b){if(!arguments.length){return y
}y=d3.functor(b);
return a
},a.showLabels=function(b){if(!arguments.length){return u
}u=b;
return a
},a.donutLabelsOutside=function(b){if(!arguments.length){return t
}t=b;
return a
},a.donut=function(b){if(!arguments.length){return r
}r=b;
return a
},a.id=function(b){if(!arguments.length){return x
}x=b;
return a
},a.color=function(c){if(!arguments.length){return w
}w=e.utils.getColor(c);
return a
},a.valueFormat=function(b){if(!arguments.length){return v
}v=b;
return a
},a.labelThreshold=function(b){if(!arguments.length){return s
}s=b;
return a
};
return a
},e.models.pieChart=function(){function a(b){b.each(function(l){var j=d3.select(this),i=this,g=(y||parseInt(j.style("width"))||960)-z.left-z.right,c=(x||parseInt(j.style("height"))||400)-z.top-z.bottom;
if(!l||!l.length){j.append("text").attr("class","nvd3 nv-noData").attr("x",g/2).attr("y",c/2).attr("dy","-.7em").style("text-anchor","middle").text(s);
return a
}j.select(".nv-noData").remove();
var B=j.selectAll("g.nv-wrap.nv-pieChart").data([l]),A=B.enter().append("g").attr("class","nvd3 nv-wrap nv-pieChart").append("g");
A.append("g").attr("class","nv-pieWrap"),A.append("g").attr("class","nv-legendWrap");
var n=B.select("g");
w&&(q.width(g).key(r.x()),B.select(".nv-legendWrap").datum(r.values()(l[0])).call(q),z.top!=q.height()&&(z.top=q.height(),c=(x||parseInt(j.style("height"))||400)-z.top-z.bottom),B.select(".nv-legendWrap").attr("transform","translate(0,"+-z.top+")")),r.width(g).height(c),n.attr("transform","translate("+z.left+","+z.top+")");
var m=n.select(".nv-pieWrap").datum(l);
d3.transition(m).call(r),q.dispatch.on("legendClick",function(C,h,D){C.disabled=!C.disabled,r.values()(l[0]).filter(function(E){return !E.disabled
}).length||r.values()(l[0]).map(function(E){E.disabled=!1,B.selectAll(".nv-series").classed("disabled",!1);
return E
}),b.transition().call(a)
}),r.dispatch.on("elementMouseover.tooltip",function(h){h.pos=[h.pos[0]+z.left,h.pos[1]+z.top],p.tooltipShow(h)
}),u&&p.on("tooltipShow",function(h){o(h)
}),r.dispatch.on("elementMouseout.tooltip",function(h){p.tooltipHide(h)
}),u&&p.on("tooltipHide",e.tooltip.cleanup),a.update=function(){b.transition().call(a)
},a.container=this
});
return a
}var z={top:30,right:20,bottom:20,left:20},y=null,x=null,w=!0,v=e.utils.defaultColor(),u=!0,t=function(h,g,j,i){return"<h3>"+h+"</h3><p>"+g+"</p>"
},s="No Data Available.",r=e.models.pie(),q=e.models.legend().height(30),p=d3.dispatch("tooltipShow","tooltipHide"),o=function(h,n){var m=h.pos[0]+(n&&n.offsetLeft||0),l=h.pos[1]+(n&&n.offsetTop||0),j=r.valueFormat()(r.y()(h.point)),i=t(r.x()(h.point),j,h,a);
e.tooltip.show([m,l],i,h.value<0?"n":"s",null,n)
};
a.dispatch=p,a.pie=r,d3.rebind(a,r,"valueFormat","values","x","y","id","showLabels","donutLabelsOutside","donut","labelThreshold"),a.margin=function(b){if(!arguments.length){return z
}z=b;
return a
},a.width=function(b){if(!arguments.length){return y
}y=b;
return a
},a.height=function(b){if(!arguments.length){return x
}x=b;
return a
},a.color=function(c){if(!arguments.length){return v
}v=e.utils.getColor(c),q.color(v),r.color(v);
return a
},a.showLegend=function(b){if(!arguments.length){return w
}w=b;
return a
},a.tooltips=function(b){if(!arguments.length){return u
}u=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return t
}t=b;
return a
},a.noData=function(b){if(!arguments.length){return s
}s=b;
return a
};
return a
},e.models.scatter=function(){function L(b){b.each(function(p){function h(){if(!V){return !1
}var y,x=d3.merge(p.map(function(A,z){return A.values.filter(T).map(function(B,C){return[ag(ad(B,C))*(Math.random()/1000000000000+1),af(ac(B,C))*(Math.random()/1000000000000+1),z,C]
})
}));
if(P){l.append("clipPath").attr("id","nv-points-clip-"+ah);
var w=n.select("#nv-points-clip-"+ah).selectAll("circle").data(x);
w.enter().append("circle").attr("r",N),w.exit().remove(),w.attr("cx",function(z){return z[0]
}).attr("cy",function(z){return z[1]
}),n.select(".nv-point-paths").attr("clip-path","url(#nv-points-clip-"+ah+")")
}if(U===!0){var v=d3.geom.voronoi(x).map(function(A,z){return{data:A,series:x[z][2],point:x[z][3]}
}),u=n.select(".nv-point-paths").selectAll("path").data(v);
u.enter().append("path").attr("class",function(A,z){return"nv-path-"+z
}),u.exit().remove(),u.attr("d",function(z){return"M"+z.data.join(",")+"Z"
}),y=u
}else{var t=x.map(function(A,z){return{data:A,series:x[z][2],point:x[z][3]}
});
y=n.select(".nv-groups").selectAll(".nv-group").selectAll("path.nv-point").data(t).style("pointer-events","auto")
}y.on("click",function(B){var A=p[B.series],z=A.values[B.point];
W.elementClick({point:z,series:A,pos:[ag(ad(z,B.point))+al.left,af(ac(z,B.point))+al.top],seriesIndex:B.series,pointIndex:B.point})
}).on("mouseover",function(B){var A=p[B.series],z=A.values[B.point];
W.elementMouseover({point:z,series:A,pos:[ag(ad(z,B.point))+al.left,af(ac(z,B.point))+al.top],seriesIndex:B.series,pointIndex:B.point})
}).on("mouseout",function(z,C){var B=p[z.series],A=B.values[z.point];
W.elementMouseout({point:A,series:B,seriesIndex:z.series,pointIndex:z.point})
})
}var s=ak-al.left-al.right,r=aj-al.top-al.bottom,q=d3.select(this);
p=p.map(function(u,t){u.values=u.values.map(function(v){v.series=t;
return v
});
return u
});
var o=K&&J&&I?[]:d3.merge(p.map(function(t){return t.values.map(function(v,u){return{x:ad(v,u),y:ac(v,u),size:ab(v,u)}
})
}));
ag.domain(K||d3.extent(o.map(function(t){return t.x
}).concat(Z))).range([0,s]),af.domain(J||d3.extent(o.map(function(t){return t.y
}).concat(Y))).range([r,0]),ae.domain(I||d3.extent(o.map(function(t){return t.size
}).concat(X))).range(H||[16,256]);
if(ag.domain()[0]===ag.domain()[1]||af.domain()[0]===af.domain()[1]){a=!0
}ag.domain()[0]===ag.domain()[1]&&(ag.domain()[0]?ag.domain([ag.domain()[0]-ag.domain()[0]*0.01,ag.domain()[1]+ag.domain()[1]*0.01]):ag.domain([-1,1])),af.domain()[0]===af.domain()[1]&&(af.domain()[0]?af.domain([af.domain()[0]+af.domain()[0]*0.01,af.domain()[1]-af.domain()[1]*0.01]):af.domain([-1,1])),S=S||ag,Q=Q||af,O=O||ae;
var n=q.selectAll("g.nv-wrap.nv-scatter").data([p]),m=n.enter().append("g").attr("class","nvd3 nv-wrap nv-scatter nv-chart-"+ah+(a?" nv-single-point":"")),l=m.append("defs"),j=m.append("g"),i=n.select("g");
j.append("g").attr("class","nv-groups"),j.append("g").attr("class","nv-point-paths"),n.attr("transform","translate("+al.left+","+al.top+")"),l.append("clipPath").attr("id","nv-edge-clip-"+ah).append("rect"),n.select("#nv-edge-clip-"+ah+" rect").attr("width",s).attr("height",r),i.attr("clip-path",R?"url(#nv-edge-clip-"+ah+")":"");
var g=n.select(".nv-groups").selectAll(".nv-group").data(function(t){return t
},function(t){return t.key
});
g.enter().append("g").style("stroke-opacity",0.000001).style("fill-opacity",0.000001),d3.transition(g.exit()).style("stroke-opacity",0.000001).style("fill-opacity",0.000001).remove(),g.attr("class",function(u,t){return"nv-group nv-series-"+t
}).classed("hover",function(t){return t.hover
}),d3.transition(g).style("fill",function(u,t){return ai(u,t)
}).style("stroke",function(u,t){return ai(u,t)
}).style("stroke-opacity",1).style("fill-opacity",0.5);
var c=g.selectAll("path.nv-point").data(function(t){return t.values
});
c.enter().append("path").attr("transform",function(u,t){return"translate("+S(ad(u,t))+","+Q(ac(u,t))+")"
}).attr("d",d3.svg.symbol().type(aa).size(function(u,t){return ae(ab(u,t))
})),c.exit().remove(),d3.transition(g.exit().selectAll("path.nv-point")).attr("transform",function(u,t){return"translate("+ag(ad(u,t))+","+af(ac(u,t))+")"
}).remove(),c.attr("class",function(u,t){return"nv-point nv-point-"+t
}),d3.transition(c).attr("transform",function(u,t){return"translate("+ag(ad(u,t))+","+af(ac(u,t))+")"
}).attr("d",d3.svg.symbol().type(aa).size(function(u,t){return ae(ab(u,t))
})),clearTimeout(M),M=setTimeout(h,1000),S=ag.copy(),Q=af.copy(),O=ae.copy()
});
return L
}var al={top:0,right:0,bottom:0,left:0},ak=960,aj=500,ai=e.utils.defaultColor(),ah=Math.floor(Math.random()*100000),ag=d3.scale.linear(),af=d3.scale.linear(),ae=d3.scale.linear(),ad=function(b){return b.x
},ac=function(b){return b.y
},ab=function(b){return b.size
},aa=function(b){return b.shape||"circle"
},Z=[],Y=[],X=[],V=!0,T=function(b){return !b.notActive
},R=!1,P=!0,N=function(){return 25
},K=null,J=null,I=null,H=null,a=!1,W=d3.dispatch("elementClick","elementMouseover","elementMouseout"),U=!0,S,Q,O,M;
W.on("elementMouseover.point",function(b){V&&d3.select(".nv-chart-"+ah+" .nv-series-"+b.seriesIndex+" .nv-point-"+b.pointIndex).classed("hover",!0)
}),W.on("elementMouseout.point",function(b){V&&d3.select(".nv-chart-"+ah+" .nv-series-"+b.seriesIndex+" .nv-point-"+b.pointIndex).classed("hover",!1)
}),L.dispatch=W,L.x=function(b){if(!arguments.length){return ad
}ad=d3.functor(b);
return L
},L.y=function(b){if(!arguments.length){return ac
}ac=d3.functor(b);
return L
},L.size=function(b){if(!arguments.length){return ab
}ab=d3.functor(b);
return L
},L.margin=function(b){if(!arguments.length){return al
}al=b;
return L
},L.width=function(b){if(!arguments.length){return ak
}ak=b;
return L
},L.height=function(b){if(!arguments.length){return aj
}aj=b;
return L
},L.xScale=function(b){if(!arguments.length){return ag
}ag=b;
return L
},L.yScale=function(b){if(!arguments.length){return af
}af=b;
return L
},L.zScale=function(b){if(!arguments.length){return ae
}ae=b;
return L
},L.xDomain=function(b){if(!arguments.length){return K
}K=b;
return L
},L.yDomain=function(b){if(!arguments.length){return J
}J=b;
return L
},L.sizeDomain=function(b){if(!arguments.length){return I
}I=b;
return L
},L.sizeRange=function(b){if(!arguments.length){return H
}H=b;
return L
},L.forceX=function(b){if(!arguments.length){return Z
}Z=b;
return L
},L.forceY=function(b){if(!arguments.length){return Y
}Y=b;
return L
},L.forceSize=function(b){if(!arguments.length){return X
}X=b;
return L
},L.interactive=function(b){if(!arguments.length){return V
}V=b;
return L
},L.pointActive=function(b){if(!arguments.length){return T
}T=b;
return L
},L.clipEdge=function(b){if(!arguments.length){return R
}R=b;
return L
},L.clipVoronoi=function(b){if(!arguments.length){return P
}P=b;
return L
},L.useVoronoi=function(b){if(!arguments.length){return U
}U=b,U===!1&&(P=!1);
return L
},L.clipRadius=function(b){if(!arguments.length){return N
}N=b;
return L
},L.color=function(c){if(!arguments.length){return ai
}ai=e.utils.getColor(c);
return L
},L.shape=function(b){if(!arguments.length){return aa
}aa=b;
return L
},L.id=function(b){if(!arguments.length){return ah
}ah=b;
return L
},L.singlePoint=function(b){if(!arguments.length){return a
}a=b;
return L
};
return L
},e.models.scatterChart=function(){function L(b){b.each(function(h){function i(){if(W){j.select(".nv-point-paths").style("pointer-events","all");
return !1
}j.select(".nv-point-paths").style("pointer-events","none");
var o=d3.mouse(this);
ad.distortion(X).focus(o[0]),ac.distortion(X).focus(o[1]),j.select(".nv-scatterWrap").datum(h.filter(function(p){return !p.disabled
})).call(P),j.select(".nv-x.nv-axis").call(N),j.select(".nv-y.nv-axis").call(K),j.select(".nv-distributionX").datum(h.filter(function(p){return !p.disabled
})).call(H),j.select(".nv-distributionY").datum(h.filter(function(p){return !p.disabled
})).call(G)
}var g=d3.select(this),c=this,s=(ag||parseInt(g.style("width"))||960)-ah.left-ah.right,r=(af||parseInt(g.style("height"))||400)-ah.top-ah.bottom;
if(!h||!h.length||!h.filter(function(o){return o.values.length
}).length){g.append("text").attr("class","nvd3 nv-noData").attr("x",s/2).attr("y",r/2).attr("dy","-.7em").style("text-anchor","middle").text(a);
return L
}g.select(".nv-noData").remove(),ad=P.xScale(),ac=P.yScale(),S=S||ad,Q=Q||ac;
var n=g.selectAll("g.nv-wrap.nv-scatterChart").data([h]),m=n.enter().append("g").attr("class","nvd3 nv-wrap nv-scatterChart nv-chart-"+P.id()),l=m.append("g"),j=n.select("g");
l.append("rect").attr("class","nvd3 nv-background"),l.append("g").attr("class","nv-x nv-axis"),l.append("g").attr("class","nv-y nv-axis"),l.append("g").attr("class","nv-scatterWrap"),l.append("g").attr("class","nv-distWrap"),l.append("g").attr("class","nv-legendWrap"),l.append("g").attr("class","nv-controlsWrap"),n.attr("transform","translate("+ah.left+","+ah.top+")"),Z&&(J.width(s/2),n.select(".nv-legendWrap").datum(h).call(J),ah.top!=J.height()&&(ah.top=J.height(),r=(af||parseInt(g.style("height"))||400)-ah.top-ah.bottom),n.select(".nv-legendWrap").attr("transform","translate("+s/2+","+-ah.top+")")),Y&&(I.width(180).color(["#444"]),j.select(".nv-controlsWrap").datum(M).attr("transform","translate(0,"+-ah.top+")").call(I)),j.select(".nv-background").attr("width",s).attr("height",r),P.width(s).height(r).color(h.map(function(p,o){return p.color||ae(p,o)
}).filter(function(p,o){return !h[o].disabled
})),n.select(".nv-scatterWrap").datum(h.filter(function(o){return !o.disabled
})).call(P),N.scale(ad).ticks(N.ticks()?N.ticks():s/100).tickSize(-r,0),j.select(".nv-x.nv-axis").attr("transform","translate(0,"+ac.range()[0]+")").call(N),K.scale(ac).ticks(K.ticks()?K.ticks():r/36).tickSize(-s,0),j.select(".nv-y.nv-axis").call(K),ab&&(H.getData(P.x()).scale(ad).width(s).color(h.map(function(p,o){return p.color||ae(p,o)
}).filter(function(p,o){return !h[o].disabled
})),l.select(".nv-distWrap").append("g").attr("class","nv-distributionX").attr("transform","translate(0,"+ac.range()[0]+")"),j.select(".nv-distributionX").datum(h.filter(function(o){return !o.disabled
})).call(H)),aa&&(G.getData(P.y()).scale(ac).width(r).color(h.map(function(p,o){return p.color||ae(p,o)
}).filter(function(p,o){return !h[o].disabled
})),l.select(".nv-distWrap").append("g").attr("class","nv-distributionY").attr("transform","translate(-"+G.size()+",0)"),j.select(".nv-distributionY").datum(h.filter(function(o){return !o.disabled
})).call(G)),j.select(".nv-background").on("mousemove",i),j.select(".nv-background").on("click",function(){W=!W
}),P.dispatch.on("elementClick.freezeFisheye",function(){W=!W
}),I.dispatch.on("legendClick",function(o,p){o.disabled=!o.disabled,X=o.disabled?0:2.5,j.select(".nv-background").style("pointer-events",o.disabled?"none":"all"),j.select(".nv-point-paths").style("pointer-events",o.disabled?"all":"none"),o.disabled?(ad.distortion(X).focus(0),ac.distortion(X).focus(0),j.select(".nv-scatterWrap").call(P),j.select(".nv-x.nv-axis").call(N),j.select(".nv-y.nv-axis").call(K)):W=!1,L(b)
}),J.dispatch.on("legendClick",function(o,q,p){o.disabled=!o.disabled,h.filter(function(t){return !t.disabled
}).length||h.map(function(t){t.disabled=!1,n.selectAll(".nv-series").classed("disabled",!1);
return t
}),L(b)
}),P.dispatch.on("elementMouseover.tooltip",function(o){d3.select(".nv-chart-"+P.id()+" .nv-series-"+o.seriesIndex+" .nv-distx-"+o.pointIndex).attr("y1",o.pos[1]-r),d3.select(".nv-chart-"+P.id()+" .nv-series-"+o.seriesIndex+" .nv-disty-"+o.pointIndex).attr("x2",o.pos[0]+H.size()),o.pos=[o.pos[0]+ah.left,o.pos[1]+ah.top],F.tooltipShow(o)
}),F.on("tooltipShow",function(o){V&&O(o,c.parentNode)
}),S=ad.copy(),Q=ac.copy(),L.update=function(){L(b)
},L.container=this
});
return L
}var ah={top:30,right:20,bottom:50,left:60},ag=null,af=null,ae=e.utils.defaultColor(),ad=d3.fisheye.scale(d3.scale.linear).distortion(0),ac=d3.fisheye.scale(d3.scale.linear).distortion(0),ab=!1,aa=!1,Z=!0,Y=!0,X=0,W=!1,V=!0,U=function(h,g,i){return"<strong>"+g+"</strong>"
},T=function(h,g,i){return"<strong>"+i+"</strong>"
},R=null,P=e.models.scatter().xScale(ad).yScale(ac),N=e.models.axis().orient("bottom").tickPadding(10),K=e.models.axis().orient("left").tickPadding(10),J=e.models.legend().height(30),I=e.models.legend().height(30),H=e.models.distribution().axis("x"),G=e.models.distribution().axis("y"),F=d3.dispatch("tooltipShow","tooltipHide"),a="No Data Available.",S,Q,O=function(v,u){var t=v.pos[0]+(u.offsetLeft||0),s=v.pos[1]+(u.offsetTop||0),r=v.pos[0]+(u.offsetLeft||0),q=ac.range()[0]+ah.top+(u.offsetTop||0),p=ad.range()[0]+ah.left+(u.offsetLeft||0),o=v.pos[1]+(u.offsetTop||0),g=N.tickFormat()(P.x()(v.point,v.pointIndex)),b=K.tickFormat()(P.y()(v.point,v.pointIndex));
U!=null&&e.tooltip.show([r,q],U(v.series.key,g,b,v,L),"n",1,u,"x-nvtooltip"),T!=null&&e.tooltip.show([p,o],T(v.series.key,g,b,v,L),"e",1,u,"y-nvtooltip"),R!=null&&e.tooltip.show([t,s],R(v.series.key,g,b,v,L),v.value<0?"n":"s",null,u)
},M=[{key:"Magnify",disabled:!0}];
P.dispatch.on("elementMouseout.tooltip",function(b){F.tooltipHide(b),d3.select(".nv-chart-"+P.id()+" .nv-series-"+b.seriesIndex+" .nv-distx-"+b.pointIndex).attr("y1",0),d3.select(".nv-chart-"+P.id()+" .nv-series-"+b.seriesIndex+" .nv-disty-"+b.pointIndex).attr("x2",G.size())
}),F.on("tooltipHide",function(){V&&e.tooltip.cleanup()
}),L.dispatch=F,L.legend=J,L.controls=J,L.xAxis=N,L.yAxis=K,L.distX=H,L.distY=G,d3.rebind(L,P,"id","interactive","pointActive","x","y","shape","size","xScale","yScale","zScale","xDomain","yDomain","sizeDomain","sizeRange","forceX","forceY","forceSize","clipVoronoi","clipRadius","useVoronoi"),L.margin=function(b){if(!arguments.length){return ah
}ah=b;
return L
},L.width=function(b){if(!arguments.length){return ag
}ag=b;
return L
},L.height=function(b){if(!arguments.length){return af
}af=b;
return L
},L.color=function(c){if(!arguments.length){return ae
}ae=e.utils.getColor(c),J.color(ae),H.color(ae),G.color(ae);
return L
},L.showDistX=function(b){if(!arguments.length){return ab
}ab=b;
return L
},L.showDistY=function(b){if(!arguments.length){return aa
}aa=b;
return L
},L.showControls=function(b){if(!arguments.length){return Y
}Y=b;
return L
},L.showLegend=function(b){if(!arguments.length){return Z
}Z=b;
return L
},L.fisheye=function(b){if(!arguments.length){return X
}X=b;
return L
},L.tooltips=function(b){if(!arguments.length){return V
}V=b;
return L
},L.tooltipContent=function(b){if(!arguments.length){return R
}R=b;
return L
},L.tooltipXContent=function(b){if(!arguments.length){return U
}U=b;
return L
},L.tooltipYContent=function(b){if(!arguments.length){return T
}T=b;
return L
},L.noData=function(b){if(!arguments.length){return a
}a=b;
return L
};
return L
},e.models.sparkline=function(){function a(b){b.each(function(g){var j=w-x.left-x.right,c=v-x.top-x.bottom;
o.domain(q||d3.extent(g,t)).range([0,j]),n.domain(p||d3.extent(g,s)).range([c,0]);
var y=d3.select(this).selectAll("g.nv-wrap.nv-sparkline").data([g]),l=y.enter().append("g").attr("class","nvd3 nv-wrap nv-sparkline");
l.attr("transform","translate("+x.left+","+x.top+")").style("stroke",function(z,m){return z.color||r(z,m)
});
var i=l.selectAll("path").data(function(m){return[m]
});
i.enter().append("path"),i.exit().remove(),i.attr("d",d3.svg.line().x(function(z,m){return o(t(z,m))
}).y(function(z,m){return n(s(z,m))
}));
var h=l.selectAll("circle.nv-point").data(function(m){return m.filter(function(A,z){return n.domain().indexOf(s(A,z))!=-1||t(A,z)==o.domain()[1]
})
});
h.enter().append("circle").attr("class","nv-point"),h.exit().remove(),h.attr("cx",function(z,m){return o(t(z,m))
}).attr("cy",function(z,m){return n(s(z,m))
}).attr("r",2).style("stroke",function(z,m){return z.x==o.domain()[1]?"#444":z.y==n.domain()[0]?"#d62728":"#2ca02c"
}).style("fill",function(z,m){return z.x==o.domain()[1]?"#444":z.y==n.domain()[0]?"#d62728":"#2ca02c"
})
});
return a
}var x={top:0,right:0,bottom:0,left:0},w=400,v=32,u=!0,t=function(b){return b.x
},s=function(b){return b.y
},r=e.utils.defaultColor(),q,p,o=d3.scale.linear(),n=d3.scale.linear();
a.margin=function(b){if(!arguments.length){return x
}x=b;
return a
},a.width=function(b){if(!arguments.length){return w
}w=b;
return a
},a.height=function(b){if(!arguments.length){return v
}v=b;
return a
},a.x=function(b){if(!arguments.length){return t
}t=d3.functor(b);
return a
},a.y=function(b){if(!arguments.length){return s
}s=d3.functor(b);
return a
},a.xDomain=function(b){if(!arguments.length){return q
}q=b;
return a
},a.yDomain=function(b){if(!arguments.length){return p
}p=b;
return a
},a.animate=function(b){if(!arguments.length){return u
}u=b;
return a
};
return a
},e.models.sparklinePlus=function(){function a(b){b.each(function(n){function h(){var H=d3.event.offsetX-D.left;
p.attr("x1",H).attr("x2",H),o.attr("transform",function(I){return"translate("+(H-6)+","+-D.top+")"
}).text(v(Math.round(s.invert(H))));
var i=function(J,I){var M=Math.abs(z(J[0])-I),L=0;
for(var K=0;
K<J.length;
K++){Math.abs(z(J[K])-I)<M&&(M=Math.abs(z(J[K])-I),L=K)
}return L
};
m.attr("transform",function(I){return"translate("+(H+6)+","+-D.top+")"
}).text(u(y(n[i(n,Math.round(s.invert(H)))])))
}var l=C-D.left-D.right,j=B-D.top-D.bottom;
if(!n||!n.length||!n.filter(function(i){return i.values.length
}).length){container.append("text").attr("class","nvd3 nv-noData").attr("x",l/2).attr("y",j/2).attr("dy","-.7em").style("text-anchor","middle").text(t);
return a
}container.select(".nv-noData").remove(),s.domain(d3.extent(n,z)).range([0,l]),r.domain(d3.extent(n,y)).range([j,0]);
var g=d3.select(this).selectAll("g.nv-wrap.nv-sparklineplus").data([n]),c=g.enter().append("g"),G=c.append("g").attr("class","nvd3 nv-wrap nv-sparklineplus").attr("transform","translate("+D.left+","+D.top+")").style("stroke",function(H,i){return H.color||x(H,i)
});
q.xDomain(s.domain()).yDomain(r.domain()),G.call(q);
var F=G.append("g").attr("class","nv-hoverValue"),E=G.append("g").attr("class","nv-hoverArea");
F.attr("transform",function(i){return"translate("+s(i)+",0)"
});
var p=F.append("line").attr("x1",s.range()[1]).attr("y1",-D.top).attr("x2",s.range()[1]).attr("y2",B),o=F.append("text").attr("class","nv-xValue").attr("text-anchor","end").attr("dy",".9em"),m=F.append("text").attr("class","nv-yValue").attr("text-anchor","start").attr("dy",".9em");
E.append("rect").attr("width",l).attr("height",j).on("mousemove",h)
});
return a
}var D={top:15,right:40,bottom:3,left:40},C=400,B=50,A=!0,z=function(b){return b.x
},y=function(b){return b.y
},x=e.utils.defaultColor(),w=Math.floor(Math.random()*100000),v=d3.format(",r"),u=d3.format(",.2f"),t="No Data Available.",s=d3.scale.linear(),r=d3.scale.linear(),q=e.models.sparkline();
a.margin=function(b){if(!arguments.length){return D
}D=b;
return a
},a.width=function(b){if(!arguments.length){return C
}C=b,q.width(b-D.left-D.right);
return a
},a.height=function(b){if(!arguments.length){return B
}B=b,q.height(b-D.top-D.bottom);
return a
},a.x=function(b){if(!arguments.length){return z
}z=d3.functor(b),q.x(b);
return a
},a.y=function(b){if(!arguments.length){return y
}y=d3.functor(b),q.y(b);
return a
},a.id=function(b){if(!arguments.length){return w
}w=b;
return a
},a.animate=function(b){if(!arguments.length){return A
}A=b;
return a
},a.noData=function(b){if(!arguments.length){return t
}t=b;
return a
};
return a
},e.models.stackedArea=function(){function a(b){b.each(function(n){var l=G-H.left-H.right,j=F-H.top-H.bottom;
w=t.xScale(),v=t.yScale(),n=n.map(function(o,i){o.values=o.values.map(function(r,L){r.index=L,r.stackedY=o.disabled?0:B(r,L);
return r
});
return o
}),n=d3.layout.stack().order(y).offset(z).values(function(i){return i.values
}).x(C).y(function(i){return i.stackedY
}).out(function(o,i,r){o.display={y:r,y0:i}
})(n);
var c=d3.select(this).selectAll("g.nv-wrap.nv-stackedarea").data([n]),K=c.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedarea"),J=K.append("defs"),I=K.append("g"),q=c.select("g");
I.append("g").attr("class","nv-areaWrap"),t.width(l).height(j).x(C).y(function(i){return i.display.y+i.display.y0
}).forceY([0]).color(n.map(function(o,i){return o.color||E(o,i)
}).filter(function(i,o){return !n[o].disabled
})),I.append("g").attr("class","nv-scatterWrap");
var p=q.select(".nv-scatterWrap").datum(n.filter(function(i){return !i.disabled
}));
d3.transition(p).call(t),c.attr("transform","translate("+H.left+","+H.top+")"),J.append("clipPath").attr("id","nv-edge-clip-"+D).append("rect"),c.select("#nv-edge-clip-"+D+" rect").attr("width",l).attr("height",j),q.attr("clip-path",x?"url(#nv-edge-clip-"+D+")":"");
var m=d3.svg.area().x(function(o,i){return w(C(o,i))
}).y0(function(i){return v(i.display.y0)
}).y1(function(i){return v(i.display.y+i.display.y0)
}),h=d3.svg.area().x(function(o,i){return w(C(o,i))
}).y0(function(i){return v(i.display.y0)
}).y1(function(i){return v(i.display.y0)
}),g=q.select(".nv-areaWrap").selectAll("path.nv-area").data(function(i){return i
});
g.enter().append("path").attr("class",function(o,i){return"nv-area nv-area-"+i
}).on("mouseover",function(o,i){d3.select(this).classed("hover",!0),s.areaMouseover({point:o,series:o.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:i})
}).on("mouseout",function(o,i){d3.select(this).classed("hover",!1),s.areaMouseout({point:o,series:o.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:i})
}).on("click",function(o,i){d3.select(this).classed("hover",!1),s.areaClick({point:o,series:o.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:i})
}),d3.transition(g.exit()).attr("d",function(o,i){return h(o.values,i)
}).remove(),g.style("fill",function(o,i){return o.color||E(o,i)
}).style("stroke",function(o,i){return o.color||E(o,i)
}),d3.transition(g).attr("d",function(o,i){return m(o.values,i)
}),t.dispatch.on("elementMouseover.area",function(i){q.select(".nv-chart-"+D+" .nv-area-"+i.seriesIndex).classed("hover",!0)
}),t.dispatch.on("elementMouseout.area",function(i){q.select(".nv-chart-"+D+" .nv-area-"+i.seriesIndex).classed("hover",!1)
})
});
return a
}var H={top:0,right:0,bottom:0,left:0},G=960,F=500,E=e.utils.defaultColor(),D=Math.floor(Math.random()*100000),C=function(b){return b.x
},B=function(b){return b.y
},A="stack",z="zero",y="default",x=!1,w,v,u=d3.layout.stack().values(function(b){return b.values
}).x(C).y(function(b){return b.stackedY
}).out(function(h,g,i){h.display={y:i,y0:g}
}),t=e.models.scatter().size(2.2).sizeDomain([2.5]),s=d3.dispatch("tooltipShow","tooltipHide","areaClick","areaMouseover","areaMouseout");
t.dispatch.on("elementClick.area",function(b){s.areaClick(b)
}),t.dispatch.on("elementMouseover.tooltip",function(b){b.pos=[b.pos[0]+H.left,b.pos[1]+H.top],s.tooltipShow(b)
}),t.dispatch.on("elementMouseout.tooltip",function(b){s.tooltipHide(b)
}),a.dispatch=s,a.scatter=t,d3.rebind(a,t,"interactive","size","xScale","yScale","zScale","xDomain","yDomain","sizeDomain","forceX","forceY","forceSize","clipVoronoi","clipRadius"),a.x=function(b){if(!arguments.length){return C
}C=d3.functor(b);
return a
},a.y=function(b){if(!arguments.length){return B
}B=d3.functor(b);
return a
},a.margin=function(b){if(!arguments.length){return H
}H=b;
return a
},a.width=function(b){if(!arguments.length){return G
}G=b;
return a
},a.height=function(b){if(!arguments.length){return F
}F=b;
return a
},a.clipEdge=function(b){if(!arguments.length){return x
}x=b;
return a
},a.color=function(c){if(!arguments.length){return E
}E=e.utils.getColor(c);
return a
},a.offset=function(b){if(!arguments.length){return z
}z=b;
return a
},a.order=function(b){if(!arguments.length){return y
}y=b;
return a
},a.style=function(b){if(!arguments.length){return A
}A=b;
switch(A){case"stack":a.offset("zero"),a.order("default");
break;
case"stream":a.offset("wiggle"),a.order("inside-out");
break;
case"expand":a.offset("expand"),a.order("default")
}return a
};
return a
},e.models.stackedAreaChart=function(){function a(b){b.each(function(m){var l=d3.select(this),o=this,n=(O||parseInt(l.style("width"))||960)-P.left-P.right,j=(N||parseInt(l.style("height"))||400)-P.top-P.bottom;
if(!m||!m.length||!m.filter(function(i){return i.values.length
}).length){l.append("text").attr("class","nvd3 nv-noData").attr("x",n/2).attr("y",j/2).attr("dy","-.7em").style("text-anchor","middle").text(F);
return a
}l.select(".nv-noData").remove(),H=E.xScale(),G=E.yScale();
var h=l.selectAll("g.nv-wrap.nv-stackedAreaChart").data([m]),g=h.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedAreaChart").append("g");
g.append("g").attr("class","nv-x nv-axis"),g.append("g").attr("class","nv-y nv-axis"),g.append("g").attr("class","nv-stackedWrap"),g.append("g").attr("class","nv-legendWrap"),g.append("g").attr("class","nv-controlsWrap");
var c=h.select("g");
K&&(A.width(n/2),c.select(".nv-legendWrap").datum(m).call(A),P.top!=A.height()&&(P.top=A.height(),j=(N||parseInt(l.style("height"))||400)-P.top-P.bottom),c.select(".nv-legendWrap").attr("transform","translate("+n/2+","+-P.top+")")),E.width(n).height(j),L&&(z.width(280).color(["#444","#444","#444"]),c.select(".nv-controlsWrap").datum(x).attr("transform","translate(0,"+-P.top+")").call(z)),c.attr("transform","translate("+P.left+","+P.top+")");
var p=c.select(".nv-stackedWrap").datum(m);
d3.transition(p).call(E),D.scale(H).ticks(n/100).tickSize(-j,0),c.select(".nv-x.nv-axis").attr("transform","translate(0,"+j+")"),d3.transition(c.select(".nv-x.nv-axis")).call(D),C.scale(G).ticks(E.offset()=="wiggle"?0:j/36).tickSize(-n,0).setTickFormat(E.offset()=="expand"?d3.format("%"):B),d3.transition(c.select(".nv-y.nv-axis")).call(C),E.dispatch.on("areaClick.toggle",function(i){m.filter(function(q){return !q.disabled
}).length===1?m=m.map(function(q){q.disabled=!1;
return q
}):m=m.map(function(q,r){q.disabled=r!=i.seriesIndex;
return q
}),b.transition().call(a)
}),A.dispatch.on("legendClick",function(i,q){i.disabled=!i.disabled,m.filter(function(r){return !r.disabled
}).length||m.map(function(r){r.disabled=!1;
return r
}),b.transition().call(a)
}),z.dispatch.on("legendClick",function(i,q){if(!!i.disabled){x=x.map(function(r){r.disabled=!0;
return r
}),i.disabled=!1;
switch(i.key){case"Stacked":E.style("stack");
break;
case"Stream":E.style("stream");
break;
case"Expanded":E.style("expand")
}b.transition().call(a)
}}),y.on("tooltipShow",function(i){J&&w(i,o.parentNode)
})
}),a.update=function(){b.transition().call(a)
},a.container=this;
return a
}var P={top:30,right:25,bottom:50,left:60},O=null,N=null,M=e.utils.defaultColor(),L=!0,K=!0,J=!0,I=function(h,g,l,j,i){return"<h3>"+h+"</h3><p>"+l+" on "+g+"</p>"
},H,G,F="No Data Available.",E=e.models.stackedArea(),D=e.models.axis().orient("bottom").tickPadding(5),C=e.models.axis().orient("left"),B=d3.format(",.2f"),A=e.models.legend().height(30),z=e.models.legend().height(30),y=d3.dispatch("tooltipShow","tooltipHide"),x=[{key:"Stacked"},{key:"Stream",disabled:!0},{key:"Expanded",disabled:!0}],w=function(i,p){var o=i.pos[0]+(p.offsetLeft||0),n=i.pos[1]+(p.offsetTop||0),m=D.tickFormat()(E.x()(i.point,i.pointIndex)),l=C.tickFormat()(E.y()(i.point,i.pointIndex)),j=I(i.series.key,m,l,i,a);
e.tooltip.show([o,n],j,i.value<0?"n":"s",null,p)
};
E.dispatch.on("tooltipShow",function(b){if(!Math.round(E.y()(b.point)*100)){setTimeout(function(){d3.selectAll(".point.hover").classed("hover",!1)
},0);
return !1
}b.pos=[b.pos[0]+P.left,b.pos[1]+P.top],y.tooltipShow(b)
}),E.dispatch.on("tooltipHide",function(b){y.tooltipHide(b)
}),y.on("tooltipHide",function(){J&&e.tooltip.cleanup()
}),a.dispatch=y,a.stacked=E,a.xAxis=D,a.yAxis=C,d3.rebind(a,E,"x","y","size","xScale","yScale","xDomain","yDomain","sizeDomain","interactive","offset","order","style","clipEdge","forceX","forceY","forceSize"),a.margin=function(b){if(!arguments.length){return P
}P=b;
return a
},a.width=function(b){if(!arguments.length){return getWidth
}O=b;
return a
},a.height=function(b){if(!arguments.length){return getHeight
}N=b;
return a
},a.color=function(c){if(!arguments.length){return M
}M=e.utils.getColor(c),A.color(M),E.color(M);
return a
},a.showControls=function(b){if(!arguments.length){return L
}L=b;
return a
},a.showLegend=function(b){if(!arguments.length){return K
}K=b;
return a
},a.tooltips=function(b){if(!arguments.length){return J
}J=b;
return a
},a.tooltipContent=function(b){if(!arguments.length){return I
}I=b;
return a
},a.noData=function(b){if(!arguments.length){return F
}F=b;
return a
},C.setTickFormat=C.tickFormat,C.tickFormat=function(b){if(!arguments.length){return B
}B=b;
return C
};
return a
}
})();