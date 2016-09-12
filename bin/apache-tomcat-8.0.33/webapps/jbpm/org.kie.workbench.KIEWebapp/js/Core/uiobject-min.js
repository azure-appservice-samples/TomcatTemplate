if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.UIObject={construct:function(a){this.isChanged=true;
this.isResized=true;
this.isVisible=true;
this.isSelectable=false;
this.isResizable=false;
this.isMovable=false;
this.id=ORYX.Editor.provideId();
this.parent=undefined;
this.node=undefined;
this.children=[];
this.bounds=new ORYX.Core.Bounds();
this._changedCallback=this._changed.bind(this);
this.bounds.registerCallback(this._changedCallback);
if(a&&a.eventHandlerCallback){this.eventHandlerCallback=a.eventHandlerCallback
}},_changed:function(b,a){this.isChanged=true;
if(this.bounds==b){this.isResized=a||this.isResized
}},update:function(){if(this.isChanged){this.refresh();
this.isChanged=false;
this.children.each(function(a){a.update()
})
}},refresh:function(){},getChildren:function(){return this.children.clone()
},getParents:function(){var a=[];
var b=this.parent;
while(b){a.push(b);
b=b.parent
}return a
},isParent:function(a){var b=this;
while(b){if(b===a){return true
}b=b.parent
}return false
},getId:function(){return this.id
},getChildById:function(b,a){return this.children.find(function(c){if(c.getId()===b){return c
}else{if(a){var d=c.getChildById(b,a);
if(d){return d
}}}})
},add:function(a){if(!(this.children.member(a))){if(a.parent){a.remove(a)
}this.children.push(a);
a.parent=this;
a.node=this.node.appendChild(a.node);
a.bounds.registerCallback(this._changedCallback);
if(this.eventHandlerCallback){this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED,shape:a})
}}else{ORYX.Log.info("add: ORYX.Core.UIObject is already a child of this object.")
}},remove:function(a){if(this.children.member(a)){this.children=this._uiObjects.without(a);
a.parent=undefined;
a.node=this.node.removeChild(a.node);
a.bounds.unregisterCallback(this._changedCallback)
}else{ORYX.Log.info("remove: ORYX.Core.UIObject is not a child of this object.")
}},absoluteBounds:function(){if(this.parent){var a=this.absoluteXY();
return new ORYX.Core.Bounds(a.x,a.y,a.x+this.bounds.width(),a.y+this.bounds.height())
}else{return this.bounds.clone()
}},absoluteXY:function(){if(this.parent){var a=this.parent.absoluteXY();
return{x:a.x+this.bounds.upperLeft().x,y:a.y+this.bounds.upperLeft().y}
}else{return{x:this.bounds.upperLeft().x,y:this.bounds.upperLeft().y}
}},absoluteCenterXY:function(){if(this.parent){var a=this.parent.absoluteXY();
return{x:a.x+this.bounds.center().x,y:a.y+this.bounds.center().y}
}else{return{x:this.bounds.center().x,y:this.bounds.center().y}
}},hide:function(){this.node.setAttributeNS(null,"display","none");
this.isVisible=false;
this.children.each(function(a){a.hide()
})
},show:function(){this.node.setAttributeNS(null,"display","inherit");
this.isVisible=true;
this.children.each(function(a){a.show()
})
},addEventHandlers:function(a){a.addEventListener(ORYX.CONFIG.EVENT_MOUSEDOWN,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT,this._delegateEvent.bind(this),false);
a.addEventListener("click",this._delegateEvent.bind(this),false);
a.addEventListener(ORYX.CONFIG.EVENT_DBLCLICK,this._delegateEvent.bind(this),false)
},_delegateEvent:function(a){if(this.eventHandlerCallback){this.eventHandlerCallback(a,this)
}},toString:function(){return"UIObject "+this.id
}};
ORYX.Core.UIObject=Clazz.extend(ORYX.Core.UIObject);