nv.models.discreteBarChart=function(){var d={top:10,right:10,bottom:50,left:60},b=null,p=null,e=nv.utils.getColor(),f=false,i=true,q=function(s,r,v,u,t){return"<h3>"+r+"</h3><p>"+v+"</p>"
},o="No Data Available.";
var n=nv.models.discreteBar(),l=n.xScale(),k=n.yScale(),c=nv.models.axis().scale(l).orient("bottom").highlightZero(false).showMaxMin(false),a=nv.models.axis().scale(k).orient("left"),g=d3.dispatch("tooltipShow","tooltipHide");
c.tickFormat(function(r){return r
});
a.tickFormat(d3.format(",.1f"));
var m=function(w,s){var v=w.pos[0]+(s.offsetLeft||0),u=w.pos[1]+(s.offsetTop||0),r=c.tickFormat()(n.x()(w.point,w.pointIndex)),z=a.tickFormat()(n.y()(w.point,w.pointIndex)),t=q(w.series.key,r,z,w,h);
nv.tooltip.show([v,u],t,w.value<0?"n":"s",null,s)
};
var j=[{key:"Grouped"},{key:"Stacked",disabled:true}];
function h(r){r.each(function(y){var t=d3.select(this),B=this;
var C=(b||parseInt(t.style("width"))||960)-d.left-d.right,v=(p||parseInt(t.style("height"))||400)-d.top-d.bottom;
if(!y||!y.length||!y.filter(function(D){return D.values.length
}).length){t.append("text").attr("class","nvd3 nv-noData").attr("x",C/2).attr("y",v/2).attr("dy","-.7em").style("text-anchor","middle").text(o);
return h
}else{t.select(".nv-noData").remove()
}n.width(C).height(v);
var u=t.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([y]);
var s=u.enter().append("g").attr("class","nvd3 nv-wrap nv-discreteBarWithAxes").append("g");
var w=s.append("defs");
s.append("g").attr("class","nv-x nv-axis");
s.append("g").attr("class","nv-y nv-axis");
s.append("g").attr("class","nv-barsWrap");
var z=u.select("g");
z.attr("transform","translate("+d.left+","+d.top+")");
var A=z.select(".nv-barsWrap").datum(y.filter(function(D){return !D.disabled
}));
d3.transition(A).call(n);
w.append("clipPath").attr("id","nv-x-label-clip-"+n.id()).append("rect");
z.select("#nv-x-label-clip-"+n.id()+" rect").attr("width",l.rangeBand()*(f?2:1)).attr("height",16).attr("x",-l.rangeBand()/(f?1:2));
c.ticks(C/100).tickSize(-v,0);
z.select(".nv-x.nv-axis").attr("transform","translate(0,"+(k.range()[0]+((n.showValues()&&k.domain()[0]<0)?16:0))+")");
z.select(".nv-x.nv-axis").transition().duration(0).call(c);
var x=z.select(".nv-x.nv-axis").selectAll("g");
if(f){x.selectAll("text").attr("transform",function(F,E,D){return"translate(0,"+(D%2==0?"0":"12")+")"
})
}a.ticks(v/36).tickSize(-C,0);
d3.transition(z.select(".nv-y.nv-axis")).call(a);
n.dispatch.on("elementMouseover.tooltip",function(D){D.pos=[D.pos[0]+d.left,D.pos[1]+d.top];
g.tooltipShow(D)
});
if(i){g.on("tooltipShow",function(D){m(D,B.parentNode)
})
}n.dispatch.on("elementMouseout.tooltip",function(D){g.tooltipHide(D)
});
if(i){g.on("tooltipHide",nv.tooltip.cleanup)
}h.update=function(){r.transition().call(h)
};
h.container=this
});
return h
}h.dispatch=g;
h.discretebar=n;
h.xAxis=c;
h.yAxis=a;
d3.rebind(h,n,"x","y","xDomain","yDomain","forceX","forceY","id","showValues","valueFormat");
h.margin=function(r){if(!arguments.length){return d
}d=r;
return h
};
h.width=function(r){if(!arguments.length){return b
}b=r;
return h
};
h.height=function(r){if(!arguments.length){return p
}p=r;
return h
};
h.color=function(r){if(!arguments.length){return e
}e=nv.utils.getColor(r);
n.color(e);
return h
};
h.staggerLabels=function(r){if(!arguments.length){return f
}f=r;
return h
};
h.tooltips=function(r){if(!arguments.length){return i
}i=r;
return h
};
h.tooltipContent=function(r){if(!arguments.length){return q
}q=r;
return h
};
h.noData=function(r){if(!arguments.length){return o
}o=r;
return h
};
return h
};