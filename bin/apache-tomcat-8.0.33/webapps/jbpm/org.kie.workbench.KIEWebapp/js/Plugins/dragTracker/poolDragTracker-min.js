if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Plugins.DragTracker){ORYX.Plugins.DragTracker={}
}new function(){ORYX.Plugins.DragTracker.PoolDragTracker=ORYX.Plugins.AbstractDragTracker.extend({shapes:["Pool"],resizeEnd:function(b){var c=[];
var a=ORYX.Core.Command.extend({construct:function(d,f,e){this.shape=d;
this.oldBounds=d.bounds.clone();
this.newBounds=f;
this.plugin=e
},execute:function(){this.shape.bounds.set(this.newBounds.a,this.newBounds.b);
this.update(this.getOffset(this.oldBounds,this.newBounds))
},rollback:function(){this.shape.bounds.set(this.oldBounds.a,this.oldBounds.b);
this.update(this.getOffset(this.newBounds,this.oldBounds))
},getOffset:function(e,d){return{x:d.a.x-e.a.x,y:d.a.y-e.a.y,xs:d.width()/e.width(),ys:d.height()/e.height()}
},update:function(d){this.shape.getLabels().each(function(e){e.changed()
});
this.plugin.facade.getCanvas().update()
}});
commands=[];
b.each(function(e){var d=e.bounds.width();
e.getChildShapes().each(function(h){if(h.getStencil().id().include("Lane")){newBounds=h.bounds.clone();
var f=h.bounds.lowerRight().y;
if(h.bounds.lowerRight().y>e.bounds.height()){f=e.bounds.height()
}newBounds.set(30,h.bounds.upperLeft().y,e.bounds.width(),f);
var g=new a(h,newBounds,this);
commands.push(g)
}}.bind(this))
}.bind(this));
this.facade.executeCommands(commands)
},resize:function(a,c){var d=function(f,g){var e=undefined;
f.getChildShapes(true).findAll(function(h){return !g.detect(function(i){h.getStencil().id().include(i)
}.bind(h))
}).each(function(j,h){if(h==0){e=j.absoluteBounds();
return
}e.include(j.absoluteBounds())
});
return e
};
var b=["Lane"];
a.each(function(e){occupiedArea=d(e,b);
if(occupiedArea!==undefined){occupiedArea.moveBy(20,20);
if(c.lowerRight().y<occupiedArea.lowerRight().y){c.set(c.upperLeft().x,c.upperLeft().y,c.lowerRight().x,occupiedArea.lowerRight().y)
}if(c.lowerRight().x<occupiedArea.lowerRight().x){c.set(c.upperLeft().x,c.upperLeft().y,occupiedArea.lowerRight().x,c.lowerRight().y)
}}})
}})
}();