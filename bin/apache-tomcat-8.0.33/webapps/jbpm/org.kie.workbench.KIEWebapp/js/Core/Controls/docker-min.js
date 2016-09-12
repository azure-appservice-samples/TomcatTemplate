if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.Controls){ORYX.Core.Controls={}
}ORYX.Core.Controls.Docker=ORYX.Core.Controls.Control.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.isMovable=true;
this.bounds.set(0,0,16,16);
this.referencePoint=undefined;
this._dockedShapeBounds=undefined;
this._dockedShape=undefined;
this._oldRefPoint1=undefined;
this._oldRefPoint2=undefined;
this.anchorLeft;
this.anchorRight;
this.anchorTop;
this.anchorBottom;
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g"]);
this._dockerNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.node,["g",{"pointer-events":"all"},["circle",{cx:"8",cy:"8",r:"8",stroke:"none",fill:"none"}],["circle",{cx:"8",cy:"8",r:"3",stroke:"black",fill:"red","stroke-width":"1"}]]);
this._referencePointNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.node,["g",{"pointer-events":"none"},["circle",{cx:this.bounds.upperLeft().x,cy:this.bounds.upperLeft().y,r:3,fill:"red","fill-opacity":0.4}]]);
this.hide();
this.addEventHandlers(this.node);
this._updateCallback=this._changed.bind(this)
},setMovable:function(a){this.isMovable=a
},update:function(){if(this._dockedShape){if(this._dockedShapeBounds&&this._dockedShape instanceof ORYX.Core.Node){var g=this._dockedShapeBounds.width();
var d=this._dockedShapeBounds.height();
if(!g){g=1
}if(!d){d=1
}var m=this._dockedShape.bounds.width()/g;
var k=this._dockedShape.bounds.height()/d;
if(m!==1||k!==1){this.referencePoint.x*=m;
this.referencePoint.y*=k
}this._dockedShapeBounds=this._dockedShape.bounds.clone()
}var b=this.parent.dockers.indexOf(this);
var f=this;
var e=this.parent.dockers.length>1?(b===0?this.parent.dockers[b+1]:this.parent.dockers[b-1]):undefined;
var l=f.getDockedShape()?f.getAbsoluteReferencePoint():f.bounds.center();
var i=e&&e.getDockedShape()?e.getAbsoluteReferencePoint():e?e.bounds.center():undefined;
if(!i){var a=this._dockedShape.absoluteCenterXY();
var j=this._dockedShape.bounds.width()*this._dockedShape.bounds.height();
i={x:l.x+(a.x-l.x)*-j,y:l.y+(a.y-l.y)*-j}
}var c=undefined;
c=this._dockedShape.getIntersectionPoint(l,i);
if(!c){c=this.getAbsoluteReferencePoint()
}if(this.parent&&this.parent.parent){var h=this.parent.parent.absoluteXY();
c.x-=h.x;
c.y-=h.y
}this.bounds.centerMoveTo(c);
this._oldRefPoint1=l;
this._oldRefPoint2=i
}arguments.callee.$.update.apply(this,arguments)
},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var a=this.bounds.upperLeft();
this._dockerNode.setAttributeNS(null,"transform","translate("+a.x+", "+a.y+")");
a=Object.clone(this.referencePoint);
if(a&&this._dockedShape){var b;
if(this.parent instanceof ORYX.Core.Edge){b=this._dockedShape.absoluteXY()
}else{b=this._dockedShape.bounds.upperLeft()
}a.x+=b.x;
a.y+=b.y
}else{a=this.bounds.center()
}this._referencePointNode.setAttributeNS(null,"transform","translate("+a.x+", "+a.y+")")
},setReferencePoint:function(a){if(this.referencePoint!==a&&(!this.referencePoint||!a||this.referencePoint.x!==a.x||this.referencePoint.y!==a.y)){this.referencePoint=a;
this._changed()
}},getAbsoluteReferencePoint:function(){if(!this.referencePoint||!this._dockedShape){return undefined
}else{var a=this._dockedShape.absoluteXY();
return{x:this.referencePoint.x+a.x,y:this.referencePoint.y+a.y}
}},setDockedShape:function(b){if(this._dockedShape){this._dockedShape.bounds.unregisterCallback(this._updateCallback);
if(this===this.parent.dockers.first()){this.parent.incoming=this.parent.incoming.without(this._dockedShape);
this._dockedShape.outgoing=this._dockedShape.outgoing.without(this.parent)
}else{if(this===this.parent.dockers.last()){this.parent.outgoing=this.parent.outgoing.without(this._dockedShape);
this._dockedShape.incoming=this._dockedShape.incoming.without(this.parent)
}}}this._dockedShape=b;
this._dockedShapeBounds=undefined;
var a=undefined;
if(this._dockedShape){if(this===this.parent.dockers.first()){this.parent.incoming.push(b);
b.outgoing.push(this.parent)
}else{if(this===this.parent.dockers.last()){this.parent.outgoing.push(b);
b.incoming.push(this.parent)
}}var c=this.bounds;
var d=b.absoluteXY();
a={x:c.center().x-d.x,y:c.center().y-d.y};
this._dockedShapeBounds=this._dockedShape.bounds.clone();
this._dockedShape.bounds.registerCallback(this._updateCallback);
this.setDockerColor(ORYX.CONFIG.DOCKER_DOCKED_COLOR)
}else{this.setDockerColor(ORYX.CONFIG.DOCKER_UNDOCKED_COLOR)
}this.setReferencePoint(a);
this._changed()
},getDockedShape:function(){return this._dockedShape
},isDocked:function(){return !!this._dockedShape
},setDockerColor:function(a){this._dockerNode.lastChild.setAttributeNS(null,"fill",a)
},hide:function(){this.node.setAttributeNS(null,"visibility","hidden");
this.children.each(function(a){a.hide()
})
},show:function(){this.node.setAttributeNS(null,"visibility","visible");
this.children.each(function(a){a.show()
})
},toString:function(){return"Docker "+this.id
}});