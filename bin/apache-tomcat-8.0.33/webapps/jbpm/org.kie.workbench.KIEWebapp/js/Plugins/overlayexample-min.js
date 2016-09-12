if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.OverlayExample=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.el=undefined;
this.callback=undefined;
this.facade.offer({name:"Overlay Test",functionality:this.testing.bind(this),group:"Overlay",icon:ORYX.BASE_FILE_PATH+"images/disk.png",description:"Overlay Test",index:1,minShape:0,maxShape:0})
},testing:function(){if(this.active){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"overlaytest.test"})
}else{var a=this.facade.getCanvas().getChildShapes(true);
this.el=a[0];
this.showOverlay(this.el)
}this.active=!this.active;
if(this.active){this.callback=this.doMouseUp.bind(this);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEUP,this.callback)
}else{this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_MOUSEUP,this.callback);
this.callback=undefined
}},doMouseUp:function(b,a){if(a instanceof ORYX.Core.Shape&&a!=this.el){this.el=a;
this.showOverlay(this.el)
}},showOverlay:function(a){var b=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{"stroke-width":5,stroke:"red",d:"M0,0 L-15,-15 M-15,0 L0,-15","line-captions":"round"}]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"overlaytest.test",shapes:[a],attributes:{fill:"red",stroke:"green","stroke-width":4},node:b,nodePosition:a instanceof ORYX.Core.Edge?"START":"NE"})
}});