if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.DragDocker=Clazz.extend({construct:function(a){this.facade=a;
this.VALIDCOLOR=ORYX.CONFIG.SELECTION_VALID_COLOR;
this.INVALIDCOLOR=ORYX.CONFIG.SELECTION_INVALID_COLOR;
this.shapeSelection=undefined;
this.docker=undefined;
this.dockerParent=undefined;
this.dockerSource=undefined;
this.dockerTarget=undefined;
this.lastUIObj=undefined;
this.isStartDocker=undefined;
this.isEndDocker=undefined;
this.undockTreshold=10;
this.initialDockerPosition=undefined;
this.outerDockerNotMoved=undefined;
this.isValid=false;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DOCKERDRAG,this.handleDockerDrag.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOVER,this.handleMouseOver.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOUT,this.handleMouseOut.bind(this))
},handleMouseOut:function(b,a){if(!this.docker&&a instanceof ORYX.Core.Controls.Docker){a.hide()
}else{if(!this.docker&&a instanceof ORYX.Core.Edge){a.dockers.each(function(c){c.hide()
})
}}},handleMouseOver:function(b,a){if(!this.docker&&a instanceof ORYX.Core.Controls.Docker){a.show()
}else{if(!this.docker&&a instanceof ORYX.Core.Edge){a.dockers.each(function(c){c.show()
})
}}},handleDockerDrag:function(b,a){this.handleMouseDown(b.uiEvent,a)
},handleMouseDown:function(d,c){if(c instanceof ORYX.Core.Controls.Docker&&c.isMovable){this.shapeSelection=this.facade.getSelection();
this.facade.setSelection();
this.docker=c;
this.initialDockerPosition=this.docker.bounds.center();
this.outerDockerNotMoved=false;
this.dockerParent=c.parent;
this._commandArg={docker:c,dockedShape:c.getDockedShape(),refPoint:c.referencePoint||c.bounds.center()};
this.docker.show();
if(c.parent instanceof ORYX.Core.Edge&&(c.parent.dockers.first()==c||c.parent.dockers.last()==c)){if(c.parent.dockers.first()==c&&c.parent.dockers.last().getDockedShape()){this.dockerTarget=c.parent.dockers.last().getDockedShape()
}else{if(c.parent.dockers.last()==c&&c.parent.dockers.first().getDockedShape()){this.dockerSource=c.parent.dockers.first().getDockedShape()
}}}else{this.dockerSource=undefined;
this.dockerTarget=undefined
}this.isStartDocker=this.docker.parent.dockers.first()===this.docker;
this.isEndDocker=this.docker.parent.dockers.last()===this.docker;
this.facade.getCanvas().add(this.docker.parent);
this.docker.parent.getLabels().each(function(e){e.hide()
});
if((!this.isStartDocker&&!this.isEndDocker)||!this.docker.isDocked()){this.docker.setDockedShape(undefined);
var b=this.facade.eventCoordinates(d);
this.docker.bounds.centerMoveTo(b);
this.dockerParent._update()
}else{this.outerDockerNotMoved=true
}var a={movedCallback:this.dockerMoved.bind(this),upCallback:this.dockerMovedFinished.bind(this)};
ORYX.Core.UIEnableDrag(d,c,a)
}},dockerMoved:function(s){this.outerDockerNotMoved=false;
var j=undefined;
if(this.docker.parent){if(this.isStartDocker||this.isEndDocker){var m=this.facade.eventCoordinates(s);
if(this.docker.isDocked()){var b=ORYX.Core.Math.getDistancePointToPoint(m,this.initialDockerPosition);
if(b<this.undockTreshold){this.outerDockerNotMoved=true;
return
}this.docker.setDockedShape(undefined);
this.dockerParent._update()
}var q=this.facade.getCanvas().getAbstractShapesAtPosition(m);
var o=q.pop();
if(this.docker.parent===o){o=q.pop()
}if(this.lastUIObj==o){}else{if(o instanceof ORYX.Core.Shape){var r=this.docker.parent.getStencil().stencilSet();
if(this.docker.parent instanceof ORYX.Core.Edge){var t=this.getHighestParentBeforeCanvas(o);
if(t instanceof ORYX.Core.Edge&&this.docker.parent===t){this.isValid=false;
this.dockerParent._update();
return
}this.isValid=false;
var a=o,c=o;
while(!this.isValid&&a&&!(a instanceof ORYX.Core.Canvas)){o=a;
this.isValid=this.facade.getRules().canConnect({sourceShape:this.dockerSource?this.dockerSource:(this.isStartDocker?o:undefined),edgeShape:this.docker.parent,targetShape:this.dockerTarget?this.dockerTarget:(this.isEndDocker?o:undefined)});
a=a.parent
}if(!this.isValid){o=c
}}else{this.isValid=this.facade.getRules().canConnect({sourceShape:o,edgeShape:this.docker.parent,targetShape:this.docker.parent})
}if(this.lastUIObj){this.hideMagnets(this.lastUIObj)
}if(this.isValid){this.showMagnets(o)
}this.showHighlight(o,this.isValid?this.VALIDCOLOR:this.INVALIDCOLOR);
this.lastUIObj=o
}else{this.hideHighlight();
this.lastUIObj?this.hideMagnets(this.lastUIObj):null;
this.lastUIObj=undefined;
this.isValid=false
}}if(this.lastUIObj&&this.isValid&&!(s.shiftKey||s.ctrlKey)){j=this.lastUIObj.magnets.find(function(w){return w.absoluteBounds().isIncluded(m)
});
if(j){this.docker.bounds.centerMoveTo(j.absoluteCenterXY())
}}}}if(!(s.shiftKey||s.ctrlKey)&&!j){var l=ORYX.CONFIG.DOCKER_SNAP_OFFSET;
var h=l+1;
var f=l+1;
var v=this.docker.bounds.center();
if(this.docker.parent){this.docker.parent.dockers.each((function(x){if(this.docker==x){return
}var w=x.referencePoint?x.getAbsoluteReferencePoint():x.bounds.center();
h=Math.abs(h)>Math.abs(w.x-v.x)?w.x-v.x:h;
f=Math.abs(f)>Math.abs(w.y-v.y)?w.y-v.y:f
}).bind(this));
if(Math.abs(h)<l||Math.abs(f)<l){h=Math.abs(h)<l?h:0;
f=Math.abs(f)<l?f:0;
this.docker.bounds.centerMoveTo(v.x+h,v.y+f)
}else{var d=this.docker.parent.dockers[Math.max(this.docker.parent.dockers.indexOf(this.docker)-1,0)];
var p=this.docker.parent.dockers[Math.min(this.docker.parent.dockers.indexOf(this.docker)+1,this.docker.parent.dockers.length-1)];
if(d&&p&&d!==this.docker&&p!==this.docker){var e=d.bounds.center();
var g=p.bounds.center();
var n=this.docker.bounds.center();
if(ORYX.Core.Math.isPointInLine(n.x,n.y,e.x,e.y,g.x,g.y,10)){var u=(Number(g.y)-Number(e.y))/(Number(g.x)-Number(e.x));
var k=((e.y-(e.x*u))-(n.y-(n.x*(-Math.pow(u,-1)))))/((-Math.pow(u,-1))-u);
var i=(e.y-(e.x*u))+(u*k);
if(isNaN(k)||isNaN(i)){return
}this.docker.bounds.centerMoveTo(k,i)
}}}}}this.dockerParent._update()
},dockerMovedFinished:function(e){this.facade.setSelection(this.shapeSelection);
this.hideHighlight();
this.dockerParent.getLabels().each(function(g){g.show()
});
if(this.lastUIObj&&(this.isStartDocker||this.isEndDocker)){if(this.isValid){this.docker.setDockedShape(this.lastUIObj);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED,docker:this.docker,parent:this.docker.parent,target:this.lastUIObj})
}this.hideMagnets(this.lastUIObj)
}this.docker.hide();
if(this.outerDockerNotMoved){var d=this.facade.eventCoordinates(e);
var a=this.facade.getCanvas().getAbstractShapesAtPosition(d);
var b=a.findAll(function(g){return g instanceof ORYX.Core.Node
});
a=b.length?b:a;
this.facade.setSelection(a)
}else{var c=ORYX.Core.Command.extend({construct:function(l,h,g,k,j,i){this.docker=l;
this.index=l.parent.dockers.indexOf(l);
this.newPosition=h;
this.newDockedShape=k;
this.oldPosition=g;
this.oldDockedShape=j;
this.facade=i;
this.index=l.parent.dockers.indexOf(l);
this.shape=l.parent
},execute:function(){if(!this.docker.parent){this.docker=this.shape.dockers[this.index]
}this.dock(this.newDockedShape,this.newPosition);
this.removedDockers=this.shape.removeUnusedDockers();
this.facade.updateSelection()
},rollback:function(){this.dock(this.oldDockedShape,this.oldPosition);
(this.removedDockers||$H({})).each(function(g){this.shape.add(g.value,Number(g.key));
this.shape._update(true)
}.bind(this));
this.facade.updateSelection()
},dock:function(g,h){this.docker.setDockedShape(undefined);
if(g){this.docker.setDockedShape(g);
this.docker.setReferencePoint(h)
}else{this.docker.bounds.centerMoveTo(h)
}this.facade.getCanvas().update()
}});
if(this.docker.parent){var f=new c(this.docker,this.docker.getDockedShape()?this.docker.referencePoint:this.docker.bounds.center(),this._commandArg.refPoint,this.docker.getDockedShape(),this._commandArg.dockedShape,this.facade);
this.facade.executeCommands([f])
}}this.docker=undefined;
this.dockerParent=undefined;
this.dockerSource=undefined;
this.dockerTarget=undefined;
this.lastUIObj=undefined;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DRAGDOCKER_MOVE_FINISHED})
},hideHighlight:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"validDockedShape"})
},showHighlight:function(b,a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"validDockedShape",elements:[b],color:a})
},showMagnets:function(a){a.magnets.each(function(b){b.show()
})
},hideMagnets:function(a){a.magnets.each(function(b){b.hide()
})
},getHighestParentBeforeCanvas:function(a){if(!(a instanceof ORYX.Core.Shape)){return undefined
}var b=a.parent;
while(b&&!(b.parent instanceof ORYX.Core.Canvas)){b=b.parent
}return b
}});