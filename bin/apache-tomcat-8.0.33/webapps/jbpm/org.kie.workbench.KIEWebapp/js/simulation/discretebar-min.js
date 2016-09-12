nv.models.discreteBar=function(){var g={top:0,right:0,bottom:0,left:0},j=960,h=500,i=Math.floor(Math.random()*10000),e=d3.scale.ordinal(),d=d3.scale.linear(),o=function(s){return s.x
},n=function(s){return s.y
},b=[0],m=nv.utils.defaultColor(),q=false,c=d3.format(",.2f"),l,k;
var r=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),p,a;
function f(s){s.each(function(A){var D=j-g.left-g.right,w=h-g.top-g.bottom;
A=A.map(function(F,E){F.values=F.values.map(function(G){G.series=E;
return G
});
return F
});
var v=(l&&k)?[]:A.map(function(E){return E.values.map(function(G,F){return{x:o(G,F),y:n(G,F),y0:G.y0}
})
});
e.domain(l||d3.merge(v).map(function(E){return E.x
})).rangeBands([0,D],0.1);
d.domain(k||d3.extent(d3.merge(v).map(function(E){return E.y
}).concat(b)));
if(q){d.range([w-(d.domain()[0]<0?12:0),d.domain()[1]>0?12:0])
}else{d.range([w,0])
}p=p||e;
a=a||d.copy().range([d(0),d(0)]);
var u=d3.select(this).selectAll("g.nv-wrap.nv-discretebar").data([A]);
var y=u.enter().append("g").attr("class","nvd3 nv-wrap nv-discretebar");
var t=y.append("g");
t.append("g").attr("class","nv-groups");
var B=u.select("g");
u.attr("transform","translate("+g.left+","+g.top+")");
var x=u.select(".nv-groups").selectAll(".nv-group").data(function(E){return E
},function(E){return E.key
});
x.enter().append("g").style("stroke-opacity",0.000001).style("fill-opacity",0.000001);
d3.transition(x.exit()).style("stroke-opacity",0.000001).style("fill-opacity",0.000001).remove();
x.attr("class",function(F,E){return"nv-group nv-series-"+E
}).classed("hover",function(E){return E.hover
});
d3.transition(x).style("stroke-opacity",1).style("fill-opacity",0.75);
var C=x.selectAll("g.nv-bar").data(function(E){return E.values
});
C.exit().remove();
var z=C.enter().append("g").attr("transform",function(G,F,E){return"translate("+e(o(G,F))+", "+d(0)+")"
}).on("mouseover",function(F,E){d3.select(this).classed("hover",true);
r.elementMouseover({value:n(F,E),point:F,series:A[F.series],pos:[e(o(F,E))+(e.rangeBand()*(F.series+0.5)/A.length),d(n(F,E))],pointIndex:E,seriesIndex:F.series,e:d3.event})
}).on("mouseout",function(F,E){d3.select(this).classed("hover",false);
r.elementMouseout({value:n(F,E),point:F,series:A[F.series],pointIndex:E,seriesIndex:F.series,e:d3.event})
}).on("click",function(F,E){r.elementClick({value:n(F,E),point:F,series:A[F.series],pos:[e(o(F,E))+(e.rangeBand()*(F.series+0.5)/A.length),d(n(F,E))],pointIndex:E,seriesIndex:F.series,e:d3.event});
d3.event.stopPropagation()
}).on("dblclick",function(F,E){r.elementDblClick({value:n(F,E),point:F,series:A[F.series],pos:[e(o(F,E))+(e.rangeBand()*(F.series+0.5)/A.length),d(n(F,E))],pointIndex:E,seriesIndex:F.series,e:d3.event});
d3.event.stopPropagation()
});
z.append("rect").attr("height",0).attr("width",e.rangeBand()/A.length).style("fill",function(F,E){return F.color||m(F,E)
}).style("stroke",function(F,E){return F.color||m(F,E)
});
if(q){z.append("text").attr("text-anchor","middle");
C.selectAll("text").attr("x",e.rangeBand()/2).attr("y",function(F,E){return n(F,E)<0?d(n(F,E))-d(0)+12:-4
}).text(function(F,E){return c(n(F,E))
})
}else{C.selectAll("text").remove()
}C.attr("class",function(F,E){return n(F,E)<0?"nv-bar negative":"nv-bar positive"
}).attr("transform",function(F,E){return"translate("+e(o(F,E))+", "+(n(F,E)<0?a(0):a(n(F,E)))+")"
}).selectAll("rect").attr("width",e.rangeBand()/A.length);
d3.transition(C).attr("transform",function(F,E){return"translate("+e(o(F,E))+", "+(n(F,E)<0?d(0):d(n(F,E)))+")"
}).selectAll("rect").attr("height",function(F,E){return Math.abs(d(n(F,E))-d(0))
});
f.update=function(){f(s)
};
p=e.copy();
a=d.copy()
});
return f
}f.dispatch=r;
f.x=function(s){if(!arguments.length){return o
}o=s;
return f
};
f.y=function(s){if(!arguments.length){return n
}n=s;
return f
};
f.margin=function(s){if(!arguments.length){return g
}g=s;
return f
};
f.width=function(s){if(!arguments.length){return j
}j=s;
return f
};
f.height=function(s){if(!arguments.length){return h
}h=s;
return f
};
f.xScale=function(s){if(!arguments.length){return e
}e=s;
return f
};
f.yScale=function(s){if(!arguments.length){return d
}d=s;
return f
};
f.xDomain=function(s){if(!arguments.length){return l
}l=s;
return f
};
f.yDomain=function(s){if(!arguments.length){return k
}k=s;
return f
};
f.forceY=function(s){if(!arguments.length){return b
}b=s;
return f
};
f.color=function(s){if(!arguments.length){return m
}m=nv.utils.getColor(s);
return f
};
f.id=function(s){if(!arguments.length){return i
}i=s;
return f
};
f.showValues=function(s){if(!arguments.length){return q
}q=s;
return f
};
f.valueFormat=function(s){if(!arguments.length){return c
}c=s;
return f
};
return f
};