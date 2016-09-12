nv.models.axis=function(){var b=60,m=60,g=d3.scale.linear(),i=null,d=true,f=true,a=0,c=true,h={top:0,right:0,bottom:0,left:0},l=null;
var e=d3.svg.axis().scale(g).orient("bottom").tickFormat(function(n){return n
}),j;
function k(n){n.each(function(y){var p=d3.select(this);
var r=p.selectAll("g.nv-wrap.nv-axis").data([y]);
var t=r.enter().append("g").attr("class","nvd3 nv-wrap nv-axis");
var o=t.append("g");
var A=r.select("g");
if(l!==null){e.ticks(l)
}else{if(e.orient()=="top"||e.orient()=="bottom"){e.ticks(Math.abs(g.range()[1]-g.range()[0])/100)
}}d3.transition(A).call(e);
j=j||e.scale();
var s=A.selectAll("text.nv-axislabel").data([i||null]);
s.exit().remove();
switch(e.orient()){case"top":s.enter().append("text").attr("class","nv-axislabel").attr("text-anchor","middle").attr("y",0);
var C=(g.range().length==2)?g.range()[1]:(g.range()[g.range().length-1]+(g.range()[1]-g.range()[0]));
s.attr("x",C/2);
if(d){var z=r.selectAll("g.nv-axisMaxMin").data(g.domain());
z.enter().append("g").attr("class","nv-axisMaxMin").append("text");
z.exit().remove();
z.attr("transform",function(D,w){return"translate("+g(D)+",0)"
}).select("text").attr("dy","0em").attr("y",-e.tickPadding()).attr("text-anchor","middle").text(function(D,w){return(""+e.tickFormat()(D)).match("NaN")?"":e.tickFormat()(D)
});
d3.transition(z).attr("transform",function(D,w){return"translate("+g.range()[w]+",0)"
})
}break;
case"bottom":var x=30;
var q=30;
if(a%360){var u=A.selectAll("g").select("text");
u.each(function(E,w){var D=this.getBBox().width;
if(D>q){q=D
}});
var B=Math.abs(Math.sin(a*Math.PI/180));
var x=(B?B*q:q)+30;
u.attr("transform",function(E,D,w){return"rotate("+a+" 0,0)"
}).attr("text-anchor",a%360>0?"start":"end")
}s.enter().append("text").attr("class","nv-axislabel").attr("text-anchor","middle").attr("y",x);
var C=(g.range().length==2)?g.range()[1]:(g.range()[g.range().length-1]+(g.range()[1]-g.range()[0]));
s.attr("x",C/2);
if(d){var z=r.selectAll("g.nv-axisMaxMin").data(g.domain());
z.enter().append("g").attr("class","nv-axisMaxMin").append("text");
z.exit().remove();
z.attr("transform",function(D,w){return"translate("+g(D)+",0)"
}).select("text").attr("dy",".71em").attr("y",e.tickPadding()).attr("transform",function(E,D,w){return"rotate("+a+" 0,0)"
}).attr("text-anchor",a%360>0?"start":"end").text(function(D,w){return(""+e.tickFormat()(D)).match("NaN")?"":e.tickFormat()(D)
});
d3.transition(z).attr("transform",function(D,w){return"translate("+g.range()[w]+",0)"
})
}break;
case"right":s.enter().append("text").attr("class","nv-axislabel").attr("text-anchor",c?"middle":"begin").attr("transform",c?"rotate(90)":"").attr("y",c?(-Math.max(h.right,b)-12):-10);
s.attr("x",c?(g.range()[0]/2):e.tickPadding());
if(d){var z=r.selectAll("g.nv-axisMaxMin").data(g.domain());
z.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0);
z.exit().remove();
z.attr("transform",function(D,w){return"translate(0,"+g(D)+")"
}).select("text").attr("dy",".32em").attr("y",0).attr("x",e.tickPadding()).attr("text-anchor","start").text(function(D,w){return(""+e.tickFormat()(D)).match("NaN")?"":e.tickFormat()(D)
});
d3.transition(z).attr("transform",function(D,w){return"translate(0,"+g.range()[w]+")"
}).select("text").style("opacity",1)
}break;
case"left":s.enter().append("text").attr("class","nv-axislabel").attr("text-anchor",c?"middle":"end").attr("transform",c?"rotate(-90)":"").attr("y",c?(-Math.max(h.left,b)+12):-10);
s.attr("x",c?(-g.range()[0]/2):-e.tickPadding());
if(d){var z=r.selectAll("g.nv-axisMaxMin").data(g.domain());
z.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0);
z.exit().remove();
z.attr("transform",function(D,w){return"translate(0,"+j(D)+")"
}).select("text").attr("dy",".32em").attr("y",0).attr("x",-e.tickPadding()).attr("text-anchor","end").text(function(D,w){return(""+e.tickFormat()(D)).match("NaN")?"":e.tickFormat()(D)
});
d3.transition(z).attr("transform",function(D,w){return"translate(0,"+g.range()[w]+")"
}).select("text").style("opacity",1)
}break
}s.text(function(w){return w
});
if(d&&(e.orient()==="left"||e.orient()==="right")){A.selectAll("g").each(function(D,w){if(g(D)<g.range()[1]+10||g(D)>g.range()[0]-10){if(D>1e-10||D<-1e-10){d3.select(this).remove()
}else{d3.select(this).select("text").remove()
}}})
}if(d&&(e.orient()==="top"||e.orient()==="bottom")){var v=[];
r.selectAll("g.nv-axisMaxMin").each(function(D,w){if(w){v.push(g(D)-this.getBBox().width-4)
}else{v.push(g(D)+this.getBBox().width+4)
}});
A.selectAll("g").each(function(D,w){if(g(D)<v[0]||g(D)>v[1]){if(D>1e-10||D<-1e-10){d3.select(this).remove()
}else{d3.select(this).select("text").remove()
}}})
}if(f){A.selectAll("line.tick").filter(function(w){return !parseFloat(Math.round(w*100000)/1000000)
}).classed("zero",true)
}j=g.copy()
});
return k
}d3.rebind(k,e,"orient","tickValues","tickSubdivide","tickSize","tickPadding","tickFormat");
d3.rebind(k,g,"domain","range","rangeBand","rangeBands");
k.width=function(n){if(!arguments.length){return b
}b=n;
return k
};
k.ticks=function(n){if(!arguments.length){return l
}l=n;
return k
};
k.height=function(n){if(!arguments.length){return m
}m=n;
return k
};
k.axisLabel=function(n){if(!arguments.length){return i
}i=n;
return k
};
k.showMaxMin=function(n){if(!arguments.length){return d
}d=n;
return k
};
k.highlightZero=function(n){if(!arguments.length){return f
}f=n;
return k
};
k.scale=function(n){if(!arguments.length){return g
}g=n;
e.scale(g);
d3.rebind(k,g,"domain","range","rangeBand","rangeBands");
return k
};
k.rotateYLabel=function(n){if(!arguments.length){return c
}c=n;
return k
};
k.rotateLabels=function(n){if(!arguments.length){return a
}a=n;
return k
};
k.margin=function(n){if(!arguments.length){return h
}h=n;
return k
};
return k
};