if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN={construct:function(a){this.facade=a;
this.facade.registerOnEvent("layout.bpmn.pool",this.handleLayoutBPMNPool.bind(this))
},handleLayoutBPMNPool:function(f){var a=f.shape;
var b=a.getChildNodes(false).findAll(function(h){return(h.getStencil().id()==="http://b3mn.org/stencilset/bpmn#Lane")
});
if(b.length>0){b=b.sortBy(function(h){return h.bounds.upperLeft().y
});
var e=a.bounds.width();
var c=0;
var d=0;
b.each(function(h){var j=h.bounds.upperLeft();
var i=h.bounds.lowerRight();
j.y=c;
i.y=j.y+h.bounds.height();
c+=h.bounds.height();
j.x=30;
i.x=e;
h.bounds.set(j,i)
});
var g=a.bounds.upperLeft();
a.bounds.set(g.x,g.y,a.bounds.lowerRight().x,g.y+c)
}}};
ORYX.Plugins.BPMN=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.BPMN);