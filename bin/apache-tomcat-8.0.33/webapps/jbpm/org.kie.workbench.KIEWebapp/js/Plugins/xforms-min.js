if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.XForms={construct:function(a){this.facade=a;
this.facade.registerOnEvent("layout.xforms.label",this.handleLayoutLabel.bind(this));
this.facade.registerOnEvent("layout.xforms.label.button",this.handleLayoutLabelButton.bind(this));
this.facade.registerOnEvent("layout.xforms.label.item",this.handleLayoutLabelItem.bind(this));
this.facade.registerOnEvent("layout.xforms.item",this.handleLayoutItem.bind(this));
this.facade.registerOnEvent("layout.xforms.case",this.handleLayoutCase.bind(this));
this.facade.registerOnEvent("layout.xforms.action",this.handleLayoutAction.bind(this))
},handleLayoutLabel:function(d){var a=d.shape;
var c=d.moveX;
var b=d.moveY;
var e=a.getChildNodes(false).findAll(function(f){return(f.getStencil().id()==="http://b3mn.org/stencilset/xforms#Label")
});
if(e.length>0){e.each(function(g){var h=g.bounds.upperLeft();
var f=g.bounds.lowerRight();
h.y=-g.bounds.height()+b;
f.y=b;
h.x=c;
f.x=g.bounds.width()+c;
g.bounds.set(h,f)
})
}},handleLayoutLabelButton:function(b){var a=b.shape;
var c=a.getChildNodes(false).findAll(function(d){return(d.getStencil().id()==="http://b3mn.org/stencilset/xforms#Label")
});
if(c.length>0){c.each(function(e){var g=e.bounds.upperLeft();
var d=e.bounds.lowerRight();
g.y=2;
d.y=2+e.bounds.height();
if((a.bounds.width()-4)<e.bounds.width()){var h=a.bounds.upperLeft();
var f=a.bounds.lowerRight();
f.x=h.x+e.bounds.width()+4;
a.bounds.set(h,f)
}g.x=(a.bounds.width()-4-e.bounds.width())*0.5;
d.x=g.x+e.bounds.width();
e.bounds.set(g,d)
})
}},handleLayoutItem:function(e){var b=e.shape;
var a=b.getChildNodes(false).findAll(function(h){return((h.getStencil().id()==="http://b3mn.org/stencilset/xforms#Item")||(h.getStencil().id()==="http://b3mn.org/stencilset/xforms#Choices")||(h.getStencil().id()==="http://b3mn.org/stencilset/xforms#Itemset"))
});
if(a.length>0){a=a.sortBy(function(h){return h.bounds.upperLeft().y
});
var d=b.bounds.width();
var c=0;
a.each(function(j){var i=j.bounds.upperLeft();
var h=j.bounds.lowerRight();
if(j.getStencil().id()==="http://b3mn.org/stencilset/xforms#Choices"){i.y=c+25;
c+=25
}else{i.y=c+5;
c+=5
}h.y=i.y+j.bounds.height();
c+=j.bounds.height();
i.x=30;
h.x=d;
j.bounds.set(i,h)
});
var g=b.bounds.upperLeft();
b.bounds.set(g.x,g.y,b.bounds.lowerRight().x,g.y+c+5)
}var f=b.getChildNodes(false).findAll(function(h){return(h.getStencil().id()==="http://b3mn.org/stencilset/xforms#Label")
});
if(f.length>0){f.each(function(i){var j=i.bounds.upperLeft();
var h=i.bounds.lowerRight();
j.y=-i.bounds.height()-1;
h.y=-1;
j.x=0;
h.x=i.bounds.width();
i.bounds.set(j,h)
})
}},handleLayoutCase:function(e){var a=e.shape;
var d=a.getChildNodes(false);
var c=0;
d.each(function(g){if(g.bounds.width()>c){c=g.bounds.width()
}});
if(d.length>0){d=d.sortBy(function(g){return g.bounds.upperLeft().y
});
var b=5;
d.each(function(i){var h=i.bounds.upperLeft();
var g=i.bounds.lowerRight();
h.y=b;
g.y=h.y+i.bounds.height();
b+=i.bounds.height()+5;
h.x=0;
g.x=c;
i.bounds.set(h,g)
});
var f=a.bounds.upperLeft();
a.bounds.set(f.x,f.y,f.x+c,f.y+b+20)
}},handleLayoutLabelItem:function(b){var a=b.shape;
var c=a.getChildNodes(false).findAll(function(d){return(d.getStencil().id()==="http://b3mn.org/stencilset/xforms#Label")
});
if(c.length>0){c.each(function(e){var f=e.bounds.upperLeft();
var d=e.bounds.lowerRight();
f.y=2;
f.x=2;
d.y=2+e.bounds.height();
d.x=2+e.bounds.width();
e.bounds.set(f,d)
})
}},handleLayoutAction:function(d){var a=d.shape;
var e=a.getChildNodes(false);
if(e.length>0){e=e.sortBy(function(g){return g.bounds.upperLeft().y
});
var c=5;
e.each(function(i){var h=i.bounds.upperLeft();
var g=i.bounds.lowerRight();
h.y=c;
g.y=h.y+i.bounds.height();
c+=i.bounds.height()+5;
h.x=2;
g.x=2+i.bounds.width();
i.bounds.set(h,g)
});
var f=a.bounds.upperLeft();
var b=a.bounds.lowerRight();
a.bounds.set(f.x,f.y,b.x,f.y+c+15)
}}};
ORYX.Plugins.XForms=Clazz.extend(ORYX.Plugins.XForms);