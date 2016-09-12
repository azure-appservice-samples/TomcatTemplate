if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMNPlusLayout={construct:function(a){this.facade=a;
this.facade.registerOnEvent("layout.bpmnplus.pool",this.handleLayoutPool.bind(this));
this.facade.registerOnEvent("layout.bpmnplus.poolset",this.handleLayoutPoolSet.bind(this))
},handleLayoutPool:function(e){var a=e.shape;
var b=a.getChildNodes(false).findAll(function(g){return(g.getStencil().id()==="http://b3mn.org/stencilset/bpmnplus#Lane")
});
if(b.length>0){b=b.sortBy(function(g){return g.bounds.upperLeft().y
});
var d=a.bounds.width();
var c=0;
b.each(function(g){var i=g.bounds.upperLeft();
var h=g.bounds.lowerRight();
i.y=c;
h.y=i.y+g.bounds.height();
c+=g.bounds.height();
i.x=30;
h.x=d;
g.bounds.set(i,h)
});
var f=a.bounds.upperLeft();
a.bounds.set(f.x,f.y,a.bounds.lowerRight().x,f.y+c);
a.getLabels().each(function(g){g.y=c/2;
g.x=12
})
}},handleLayoutPoolSet:function(a){var g=a.shape;
var c=g.getChildNodes(false).findAll(function(k){return(k.getStencil().id()==="http://b3mn.org/stencilset/bpmnplus#Lane")
});
if(c.length>0){c=c.sortBy(function(k){return k.bounds.upperLeft().y
});
var f=g.bounds.width();
var j=f*500/515;
var d=0;
c.each(function(k){d+=k.bounds.height()
});
var b=d*315/300;
var i=b-d;
var e=i;
c.each(function(k){var m=k.bounds.upperLeft();
var l=k.bounds.lowerRight();
m.y=e;
l.y=m.y+k.bounds.height();
e+=k.bounds.height();
m.x=30;
l.x=j;
k.bounds.set(m,l)
});
var h=g.bounds.upperLeft();
g.bounds.set(h.x,h.y,g.bounds.lowerRight().x,h.y+e);
g.getLabels().each(function(k){k.y=e/2;
k.x=12
})
}}};
ORYX.Plugins.BPMNPlusLayout=Clazz.extend(ORYX.Plugins.BPMNPlusLayout);