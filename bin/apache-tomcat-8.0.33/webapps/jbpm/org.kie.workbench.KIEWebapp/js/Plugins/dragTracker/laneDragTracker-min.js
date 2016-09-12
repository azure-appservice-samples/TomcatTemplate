if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Plugins.DragTracker){ORYX.Plugins.DragTracker={}
}new function(){ORYX.Plugins.DragTracker.LaneDragTracker=ORYX.Plugins.AbstractDragTracker.extend({shapes:["Lane"],drag:function(a,d){shape=a.first();
var b=d.lowerRight().y;
var c=d.upperLeft().y;
if(b>shape.parent.absoluteBounds().lowerRight().y){b=shape.parent.absoluteBounds().lowerRight().y;
c=b-shape.bounds.height()
}else{if(c<shape.parent.absoluteBounds().upperLeft().y){c=shape.parent.absoluteBounds().upperLeft().y;
b=c+shape.bounds.height()
}}d.set(shape.parent.absoluteBounds().upperLeft().x+30,c,shape.parent.absoluteBounds().lowerRight().x,b)
},resize:function(a,d){shape=a.first();
var b=d.lowerRight().y;
if(b>shape.parent.absoluteBounds().lowerRight().y){b=shape.parent.absoluteBounds().lowerRight().y
}var c=d.upperLeft().y;
if(c<shape.parent.absoluteBounds().upperLeft().y){c=shape.parent.absoluteBounds().upperLeft().y
}d.set(shape.parent.absoluteBounds().upperLeft().x+30,c,shape.parent.absoluteBounds().lowerRight().x,b)
},newShape:function(c){var a=ORYX.Core.Command.extend({construct:function(g,i,h){this.shape=g;
this.oldBounds=g.bounds.clone();
this.newBounds=i;
this.plugin=h
},execute:function(){this.shape.bounds.set(this.newBounds.a,this.newBounds.b);
this.update(this.getOffset(this.oldBounds,this.newBounds))
},rollback:function(){this.shape.bounds.set(this.oldBounds.a,this.oldBounds.b);
this.update(this.getOffset(this.newBounds,this.oldBounds))
},getOffset:function(h,g){return{x:g.a.x-h.a.x,y:g.a.y-h.a.y,xs:g.width()/h.width(),ys:g.height()/h.height()}
},update:function(g){this.shape.getLabels().each(function(h){h.changed()
});
this.plugin.facade.getCanvas().update();
this.plugin.facade.updateSelection()
}});
var b=c.bounds.lowerRight().y;
if(b>c.parent.absoluteBounds().height()){b=c.parent.absoluteBounds().height()
}var d=c.bounds.upperLeft().y;
if(d<0){d=0
}var e=new ORYX.Core.Bounds(30,d,c.parent.bounds.width(),b);
var f=new a(c,e,this);
this.facade.executeCommands([f]);
this.doLayout([c])
}})
}();