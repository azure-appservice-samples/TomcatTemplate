if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.DockerCreation=Clazz.extend({construct:function(a){this.facade=a;
this.active=false;
this.circle=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g",{"pointer-events":"none"},["circle",{cx:"8",cy:"8",r:"3",fill:"yellow"}]]);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOVER,this.handleMouseOver.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOUT,this.handleMouseOut.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEMOVE,this.handleMouseMove.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DBLCLICK,function(){window.clearTimeout(this.timer)
}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEUP,function(){window.clearTimeout(this.timer)
}.bind(this))
},handleMouseOut:function(b,a){if(this.active){this.hideOverlay();
this.active=false
}},handleMouseOver:function(b,a){if(a instanceof ORYX.Core.Edge&&this.isEdgeDocked(a)){this.showOverlay(a,this.facade.eventCoordinates(b))
}this.active=true
},handleMouseDown:function(b,a){if(b.which==1&&a instanceof ORYX.Core.Edge&&this.isEdgeDocked(a)){if(a.getIsSelectable()){window.clearTimeout(this.timer);
this.timer=window.setTimeout(function(){this.addDockerCommand({edge:a,event:b,position:this.facade.eventCoordinates(b)})
}.bind(this),200)
}this.hideOverlay()
}},handleMouseMove:function(b,a){if(a instanceof ORYX.Core.Edge&&this.isEdgeDocked(a)){if(this.active){this.hideOverlay();
this.showOverlay(a,this.facade.eventCoordinates(b))
}else{this.showOverlay(a,this.facade.eventCoordinates(b))
}}},isEdgeDocked:function(a){return !!(a.incoming.length||a.outgoing.length)
},addDockerCommand:function(b){if(!b.edge){return
}var a=ORYX.Core.Command.extend({construct:function(f,g,h,e,d){this.edge=f;
this.docker=g;
this.pos=h;
this.facade=e;
this.options=d
},execute:function(){this.docker=this.edge.addDocker(this.pos,this.docker);
this.index=this.edge.dockers.indexOf(this.docker);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.options.docker=this.docker
},rollback:function(){if(this.docker instanceof ORYX.Core.Controls.Docker){this.edge.removeDocker(this.docker)
}this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var c=new a(b.edge,b.docker,b.position,this.facade,b);
this.facade.executeCommands([c]);
this.facade.raiseEvent({uiEvent:b.event,type:ORYX.CONFIG.EVENT_DOCKERDRAG},b.docker)
},showOverlay:function(a,j){var e=j;
var f=[0,1];
var b=Infinity;
for(var g=0,d=a.dockers.length;
g<d-1;
g++){var c=ORYX.Core.Math.getPointOfIntersectionPointLine(a.dockers[g].bounds.center(),a.dockers[g+1].bounds.center(),j,true);
if(!c){continue
}var h=ORYX.Core.Math.getDistancePointToPoint(j,c);
if(b>h){b=h;
e=c
}}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"ghostpoint",shapes:[a],node:this.circle,ghostPoint:e,dontCloneNode:true})
},hideOverlay:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"ghostpoint"})
}});