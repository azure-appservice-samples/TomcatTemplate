if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.SelectionFrame=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.handleMouseUp.bind(this),true);
this.position={x:0,y:0};
this.size={width:0,height:0};
this.offsetPosition={x:0,y:0};
this.moveCallback=undefined;
this.offsetScroll={x:0,y:0};
this.node=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",this.facade.getCanvas().getHTMLContainer(),["div",{"class":"Oryx_SelectionFrame"}]);
this.hide()
},handleMouseDown:function(d,c){if(c instanceof ORYX.Core.Canvas){var e=c.rootNode.parentNode.parentNode;
var b=this.facade.getCanvas().node.getScreenCTM();
this.offsetPosition={x:b.e,y:b.f};
this.setPos({x:Event.pointerX(d)-this.offsetPosition.x,y:Event.pointerY(d)-this.offsetPosition.y});
this.resize({width:0,height:0});
this.moveCallback=this.handleMouseMove.bind(this);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.moveCallback,false);
this.offsetScroll={x:e.scrollLeft,y:e.scrollTop};
this.show()
}Event.stop(d)
},handleMouseUp:function(f){if(this.moveCallback){this.hide();
document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.moveCallback,false);
this.moveCallback=undefined;
var e=this.facade.getCanvas().node.getScreenCTM();
var d={x:this.size.width>0?this.position.x:this.position.x+this.size.width,y:this.size.height>0?this.position.y:this.position.y+this.size.height};
var c={x:d.x+Math.abs(this.size.width),y:d.y+Math.abs(this.size.height)};
d.x/=e.a;
d.y/=e.d;
c.x/=e.a;
c.y/=e.d;
var g=this.facade.getCanvas().getChildShapes(true).findAll(function(b){var a=b.absoluteBounds();
var i=a.upperLeft();
var h=a.lowerRight();
if(i.x>d.x&&i.y>d.y&&h.x<c.x&&h.y<c.y){return true
}return false
});
this.facade.setSelection(g)
}},handleMouseMove:function(b){var a={width:Event.pointerX(b)-this.position.x-this.offsetPosition.x,height:Event.pointerY(b)-this.position.y-this.offsetPosition.y};
var c=this.facade.getCanvas().rootNode.parentNode.parentNode;
a.width-=this.offsetScroll.x-c.scrollLeft;
a.height-=this.offsetScroll.y-c.scrollTop;
this.resize(a);
Event.stop(b)
},hide:function(){this.node.style.display="none"
},show:function(){this.node.style.display=""
},setPos:function(a){this.node.style.top=a.y+"px";
this.node.style.left=a.x+"px";
this.position=a
},resize:function(a){this.setPos(this.position);
this.size=Object.clone(a);
if(a.width<0){this.node.style.left=(this.position.x+a.width)+"px";
a.width=-a.width
}if(a.height<0){this.node.style.top=(this.position.y+a.height)+"px";
a.height=-a.height
}this.node.style.width=a.width+"px";
this.node.style.height=a.height+"px"
}});