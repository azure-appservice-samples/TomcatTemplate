if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.RowLayouting={construct:function(a){this.facade=a;
this.currentShapes=[];
this.toMoveShapes=[];
this.dragBounds=undefined;
this.offSetPosition={x:0,y:0};
this.evCoord={x:0,y:0};
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT_ROWS,this.handleLayoutRows.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this))
},onSelectionChanged:function(a){var c=a.elements;
if(!c||c.length==0){this.currentShapes=[];
this.toMoveShapes=[];
this.dragBounds=undefined
}else{this.currentShapes=c;
this.toMoveShapes=this.facade.getCanvas().getShapesWithSharedParent(c);
this.toMoveShapes=this.toMoveShapes.findAll(function(d){return d instanceof ORYX.Core.Node&&(d.dockers.length===0||!c.member(d.dockers.first().getDockedShape()))
});
var b=undefined;
c.each(function(d){if(!b){b=d.absoluteBounds()
}else{b.include(d.absoluteBounds())
}});
this.dragBounds=b
}return
},handleMouseDown:function(c,b){if(!this.dragBounds||!this.toMoveShapes.member(b)){return
}var d=this.facade.eventCoordinates(c);
var a=this.dragBounds.upperLeft();
this.offSetPosition={x:d.x-a.x,y:d.y-a.y};
return
},handleLayoutRows:function(n){var b=n.shape;
var i=this.offSetPosition;
var m=n.marginLeft;
var d=n.marginTop;
var p=n.spacingX;
var o=n.spacingY;
var j=n.shape.getChildShapes(false);
var l=this.toMoveShapes;
l.each(function(s){if(j.include(s)){s.bounds.moveBy(i)
}});
if(n.exclude){j=j.filter(function(s){return !n.exclude.some(function(t){return s.getStencil().id()==t
})
})
}var c=d;
var q=d-o;
if(n.horizontalLayout){j.each(function(t){var s=t.bounds.upperLeft();
t.bounds.moveTo(s.x,c)
})
}else{if(n.verticalLayout){j.each(function(t){var s=t.bounds.upperLeft();
t.bounds.moveTo(m,s.y)
})
}}j=j.sortBy(function(s){return s.bounds.upperLeft().y
});
var e=0;
var f=0;
var k=false;
j.each(function(w){var v=w.bounds.upperLeft();
var s=w.bounds.lowerRight();
var u=v.x;
var t=v.y;
var y=s.x;
var x=s.y;
if(l.include(w)){v.y-=f;
if((v.y>q)||((w==j.first())&&v.y<d)){k=false;
c=q+o;
if(v.y<c){k=true
}}}else{v.y+=e;
v.y-=f;
if(v.y>c){k=false;
c=q+o
}}v.y=c;
s.y=v.y+w.bounds.height();
if(s.y>q){if(k){e+=s.y-q
}else{if(l.include(w)){e+=s.y-q
}}q=s.y
}if((v.x!=u)||(v.y!=t)||(s.x!=y)||(s.y!=x)){if(!l.include(w)){if((t-v.y)>f){f=t-v.y
}}w.bounds.set(v.x,v.y,s.x,s.y)
}});
j=j.sortBy(function(s){return s.bounds.upperLeft().y*10000+s.bounds.upperLeft().x
});
c=d;
var a=m-p;
var r=a;
var h=0;
j.each(function(w){var v=w.bounds.upperLeft();
var s=w.bounds.lowerRight();
var u=v.x;
var t=v.y;
var y=s.x;
var x=s.y;
if(v.y>c){c=v.y;
a=m-p
}v.x=a+p;
s.x=v.x+w.bounds.width();
a=s.x;
if(a>r){r=a
}if(s.y>h){h=s.y
}if((v.x!=u)||(v.y!=t)||(s.x!=y)||(s.y!=x)){w.bounds.set(v.x,v.y,s.x,s.y)
}});
if(n.shape!=this.facade.getCanvas()){var g=n.shape.bounds.upperLeft();
if(r>m){n.shape.bounds.set(g.x,g.y,g.x+r+m,g.y+q+d)
}}else{if(r>this.facade.getCanvas().bounds.width()){this.facade.getCanvas().setSize({width:(r+m),height:this.facade.getCanvas().bounds.height()})
}if(h>this.facade.getCanvas().bounds.height()){this.facade.getCanvas().setSize({width:this.facade.getCanvas().bounds.width(),height:(q+d)})
}}return
}};
ORYX.Plugins.RowLayouting=Clazz.extend(ORYX.Plugins.RowLayouting);