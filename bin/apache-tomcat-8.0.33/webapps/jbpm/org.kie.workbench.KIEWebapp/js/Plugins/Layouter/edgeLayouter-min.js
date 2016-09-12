if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Plugins.Layouter){ORYX.Plugins.Layouter={}
}new function(){ORYX.Plugins.Layouter.EdgeLayouter=ORYX.Plugins.AbstractLayouter.extend({layouted:[],findRelatedEdges:function(a,b){edges=new Array();
if(this.isIncludedInEdgeIds(a)){edges.push(a)
}else{this.getChildShapesWithout(a,b).each(function(c){edges=edges.concat(c.outgoing).concat(c.incoming).concat(this.findRelatedEdges(c,b))
}.bind(this))
}return edges
},isIncludedInEdgeIds:function(a){if(typeof a.getStencil=="function"){return a.getStencil().type()=="edge"
}else{return false
}},layout:function(a){a.each(function(b){this.findRelatedEdges(b,[]).each(function(c){this.doLayout(c)
}.bind(this))
}.bind(this))
},doLayout:function(b){var d=b.getIncomingNodes()[0];
var c=b.getOutgoingNodes()[0];
if(!d||!c){return
}var a=this.getPositions(d,c,b);
if(a.length>0){this.setDockers(b,a[0].a,a[0].b)
}},getPositions:function(p,q,e){var s=p.absoluteBounds();
var k=q.absoluteBounds();
var o=s.center();
var l=k.center();
var j=s.midPoint();
var d=k.midPoint();
var i=Object.clone(e.dockers.first().referencePoint);
var r=Object.clone(e.dockers.last().referencePoint);
var c=e.dockers.first().getAbsoluteReferencePoint();
var n=e.dockers.last().getAbsoluteReferencePoint();
if(Math.abs(c.x-n.x)<1||Math.abs(c.y-n.y)<1){return[]
}var g={};
g.x=o.x<l.x?(((l.x-k.width()/2)-(o.x+s.width()/2))/2)+(o.x+s.width()/2):(((o.x-s.width()/2)-(l.x+k.width()/2))/2)+(l.x+k.width()/2);
g.y=o.y<l.y?(((l.y-k.height()/2)-(o.y+s.height()/2))/2)+(o.y+s.height()/2):(((o.y-s.height()/2)-(l.y+k.height()/2))/2)+(l.y+k.height()/2);
s.widen(5);
k.widen(20);
var h=[];
var f=this.getOffset.bind(this);
if(!s.isIncluded(l.x,o.y)&&!k.isIncluded(l.x,o.y)){h.push({a:{x:l.x+f(r,d,"x"),y:o.y+f(i,j,"y")},z:this.getWeight(p,o.x<l.x?"r":"l",q,o.y<l.y?"t":"b",e)})
}if(!s.isIncluded(o.x,l.y)&&!k.isIncluded(o.x,l.y)){h.push({a:{x:o.x+f(i,j,"x"),y:l.y+f(r,d,"y")},z:this.getWeight(p,o.y<l.y?"b":"t",q,o.x<l.x?"l":"r",e)})
}if(!s.isIncluded(g.x,o.y)&&!k.isIncluded(g.x,l.y)){h.push({a:{x:g.x,y:o.y+f(i,j,"y")},b:{x:g.x,y:l.y+f(r,d,"y")},z:this.getWeight(p,"r",q,"l",e,o.x>l.x)})
}if(!s.isIncluded(o.x,g.y)&&!k.isIncluded(l.x,g.y)){h.push({a:{x:o.x+f(i,j,"x"),y:g.y},b:{x:l.x+f(r,d,"x"),y:g.y},z:this.getWeight(p,"b",q,"t",e,o.y>l.y)})
}return h.sort(function(t,m){return t.z<m.z?1:(t.z==m.z?-1:-1)
})
},getOffset:function(c,b,a){return c[a]-b[a]
},getWeight:function(k,b,l,a,d,g){b=(b||"").toLowerCase();
a=(a||"").toLowerCase();
if(!["t","r","b","l"].include(b)){b="r"
}if(!["t","r","b","l"].include(a)){b="l"
}if(g){b=b=="t"?"b":(b=="r"?"l":(b=="b"?"t":(b=="l"?"r":"r")));
a=a=="t"?"b":(a=="r"?"l":(a=="b"?"t":(a=="l"?"r":"r")))
}var f=0;
var n=this.facade.getRules().getLayoutingRules(k,d)["out"];
var m=this.facade.getRules().getLayoutingRules(l,d)["in"];
var e=n[b];
var c=m[a];
var j=function(q,p,o){switch(q){case"t":return Math.abs(p.x-o.x)<2&&p.y<o.y;
case"r":return p.x>o.x&&Math.abs(p.y-o.y)<2;
case"b":return Math.abs(p.x-o.x)<2&&p.y>o.y;
case"l":return p.x<o.x&&Math.abs(p.y-o.y)<2;
default:return false
}};
var i=k.getIncomingShapes().findAll(function(o){return o instanceof ORYX.Core.Edge
}).any(function(o){return j(b,o.dockers[o.dockers.length-2].bounds.center(),o.dockers.last().bounds.center())
});
var h=l.getOutgoingShapes().findAll(function(o){return o instanceof ORYX.Core.Edge
}).any(function(o){return j(a,o.dockers[1].bounds.center(),o.dockers.first().bounds.center())
});
return(i||h?0:e+c)
},setDockers:function(e,d,c){if(!e){return
}e.dockers.each(function(a){e.removeDocker(a)
});
[d,c].compact().each(function(b){var a=e.createDocker(undefined,b);
a.bounds.centerMoveTo(b)
});
e.dockers.each(function(a){a.update()
});
e._update(true)
}})
}();