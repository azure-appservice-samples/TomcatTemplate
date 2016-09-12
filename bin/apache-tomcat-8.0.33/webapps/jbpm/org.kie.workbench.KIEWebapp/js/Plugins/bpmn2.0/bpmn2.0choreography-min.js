if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Bpmn2_0Choreography={construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_LOADED,this.handleStencilSetLoaded.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,function(){if(!this._eventsRegistered){this.handleStencilSetLoaded({});
this.afterLoad()
}}.bind(this));
this.participantSize=20;
this.extensionSizeForMarker=10;
this.choreographyTasksMeta=new Hash();
this._isLayoutEnabled=false
},handleStencilSetLoaded:function(a){if(a.lazyLoaded){this._isLayoutEnabled=true
}if(this.isStencilSetExtensionLoaded("http://oryx-editor.org/stencilsets/extensions/bpmn2.0choreography#")){this.registerPluginOnEvents()
}else{this.unregisterPluginOnEvents()
}},registerPluginOnEvents:function(){this._eventsRegistered=true;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.handlePropertyChanged.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,this.addParticipantsOnCreation.bind(this));
this.facade.registerOnEvent("layout.bpmn2_0.choreography.task",this.handleLayoutChoreographyTask.bind(this));
this.facade.registerOnEvent("layout.bpmn2_0.choreography.subprocess.expanded",this.handleLayoutChoreographySubprocessExpanded.bind(this));
this.facade.registerOnEvent("layout.bpmn2_0.choreography.subprocess.collapsed",this.handleLayoutChoreographySubprocessCollapsed.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.afterLoad.bind(this))
},unregisterPluginOnEvents:function(){this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_LOADED,this.afterLoad.bind(this))
},afterLoad:function(a){this._isLayoutEnabled=true;
this.facade.getCanvas().getChildNodes(true).each(function(d){if(!(d.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyTask"||d.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographySubprocessCollapsed"||d.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographySubprocessExpanded")){return
}var h=new Array();
var g=new Array();
var i=this.addOrGetChoreographyTaskMeta(d);
var f=d.getChildNodes(false).findAll(function(j){return j.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant"
});
f=f.sort(function(k,j){var l=Math.round(k.absoluteBounds().upperLeft().y);
var m=Math.round(j.absoluteBounds().upperLeft().y);
return l<m?-1:(l>m?1:0)
});
var c=0;
var e=0;
var b=0;
f.each(function(k){k.isResizable=false;
var j=(k.properties["oryx-multiple_instance"]===""?false:k.properties["oryx-multiple_instance"]);
if(k.bounds.upperLeft().y==c){h.push(k);
c=k.bounds.lowerRight().y;
if(j){e++
}}else{g.push(k);
if(j){b++
}}});
i.numOfParticipantsOnTop=h.length;
i.numOfParticipantsOnBottom=g.length;
i.numOfParticipantsExtendedOnBottom=b;
i.numOfParticipantsExtendedOnTop=e;
i.bottomYStartValue=(g.first()?g.first().bounds.upperLeft().y:d.bounds.height());
i.topYEndValue=(h.last()?h.last().bounds.lowerRight().y:0);
i.center=i.topYEndValue+(i.bottomYStartValue-i.topYEndValue)/2;
i.oldHeight=d.bounds.height();
i.oldBounds=d.bounds.clone();
i.topParticipants=h;
i.bottomParticipants=g;
d.isChanged=true
}.bind(this));
this.facade.getCanvas().update()
},handleLayoutChoreographySubprocessExpanded:function(b){if(!this._isLayoutEnabled){return
}var e=b.shape;
var f=this.addOrGetChoreographyTaskMeta(e);
var d=e.bounds.height()/e._oldBounds.height();
var a=e._labels[e.getId()+"text_name"];
if(a){var c=f.topYEndValue+5;
if(e.isResized&&d){a.y=c/d
}else{a.y=c
}}},handleLayoutChoreographySubprocessCollapsed:function(b){if(!this._isLayoutEnabled){return
}var d=b.shape;
var e=this.addOrGetChoreographyTaskMeta(d);
var a=d._svgShapes.find(function(f){return f.element.id==d.getId()+"plus_marker"
});
var c=d._svgShapes.find(function(f){return f.element.id==d.getId()+"plus_marker_border"
});
if(a&&c){a._isYLocked=true;
a.y=e.bottomYStartValue-12;
c._isYLocked=true;
c.y=e.bottomYStartValue-14
}},addParticipantsOnCreation:function(f){if(!this._isLayoutEnabled){return
}var b=f.elements[0];
if(b&&f.elements.length===1&&b._stencil&&!b.initialParticipantsAdded&&(b.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyTask"||b.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographySubprocessCollapsed"||b.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographySubprocessExpanded")){var e=b.getChildNodes().find(function(h){return(h.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant")
});
if(e){return
}var d={type:"http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant",position:{x:0,y:0},namespace:b.getStencil().namespace(),parent:b};
var c=this.facade.createShape(d);
c.setProperty("oryx-initiating",true);
var g={elements:[c],key:"oryx-initiating",value:true};
this.handlePropertyChanged(g);
var a={type:"http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant",position:{x:0,y:b.bounds.lowerRight().y},namespace:b.getStencil().namespace(),parent:b};
this.facade.createShape(a);
this.facade.getCanvas().update();
this.facade.setSelection([b]);
b.initialParticipantsAdded=true
}},addOrGetChoreographyTaskMeta:function(a){if(!this.choreographyTasksMeta[a.getId()]){this.choreographyTasksMeta[a.getId()]=new Object();
this.choreographyTasksMeta[a.getId()].numOfParticipantsOnTop=0;
this.choreographyTasksMeta[a.getId()].numOfParticipantsOnBottom=0;
this.choreographyTasksMeta[a.getId()].numOfParticipantsExtendedOnBottom=0;
this.choreographyTasksMeta[a.getId()].numOfParticipantsExtendedOnTop=0;
this.choreographyTasksMeta[a.getId()].bottomYStartValue=a.bounds.height();
this.choreographyTasksMeta[a.getId()].topYEndValue=0;
this.choreographyTasksMeta[a.getId()].center=a.bounds.height()/2;
this.choreographyTasksMeta[a.getId()].oldHeight=a.bounds.height();
this.choreographyTasksMeta[a.getId()].oldBounds=a.bounds.clone();
this.choreographyTasksMeta[a.getId()].topParticipants=new Array();
this.choreographyTasksMeta[a.getId()].bottomParticipants=new Array()
}return this.choreographyTasksMeta[a.getId()]
},handleResizingOfChoreographyTask:function(g,h){if(g.bounds.height()==h.oldHeight){return
}var c=h.numOfParticipantsOnTop*this.participantSize+h.numOfParticipantsExtendedOnTop*this.extensionSizeForMarker+h.numOfParticipantsOnBottom*this.participantSize+h.numOfParticipantsExtendedOnBottom*this.extensionSizeForMarker+40;
if(c>g.bounds.height()){var e=g.bounds.upperLeft();
var d=h.oldBounds.upperLeft();
var b=g.bounds.lowerRight();
var a=h.oldBounds.lowerRight();
if(e.y!=d.y){g.bounds.set(e.x,b.y-c,b.x,b.y)
}else{if(b.y!=a.y){g.bounds.set(e.x,e.y,b.x,e.y+c)
}}}var f=h.oldHeight-g.bounds.height();
h.bottomYStartValue-=f;
return true
},handleLayoutChoreographyTask:function(event){if(!this._isLayoutEnabled){return
}var choreographyTask=event.shape;
var isNew=!this.choreographyTasksMeta[choreographyTask.getId()];
var choreographyTaskMeta=this.addOrGetChoreographyTaskMeta(choreographyTask);
var isResized=this.handleResizingOfChoreographyTask(choreographyTask,choreographyTaskMeta);
var oldCountTop=choreographyTaskMeta.numOfParticipantsOnTop;
var oldCountBottom=choreographyTaskMeta.numOfParticipantsOnBottom;
if(isResized){var participants=choreographyTaskMeta.topParticipants
}else{var participants=this.getParticipants(choreographyTask,true,false);
if(!participants){return
}this.ensureParticipantsParent(choreographyTask,participants)
}var numOfParticipantsExtended=0;
participants.each(function(participant,i){participant.isResizable=false;
participant.setProperty("oryx-corners","None");
var isExtended=this.setBoundsOfParticipantDependOnProperties(participant,i,numOfParticipantsExtended,choreographyTask.bounds.width(),0);
if(isExtended){numOfParticipantsExtended++
}if(i==0){participant.setProperty("oryx-corners","Top")
}this.adjustTopBackground(participant)
}.bind(this));
var resizeFactor=participants.length-choreographyTaskMeta.numOfParticipantsOnTop;
var resizeFactorExtended=numOfParticipantsExtended-choreographyTaskMeta.numOfParticipantsExtendedOnTop;
var bounds=choreographyTask.bounds;
var ul=bounds.upperLeft();
var lr=bounds.lowerRight();
if(!isNew){bounds.set(ul.x,ul.y-resizeFactor*this.participantSize-resizeFactorExtended*this.extensionSizeForMarker,lr.x,lr.y)
}choreographyTaskMeta.topYEndValue=participants.length*this.participantSize+numOfParticipantsExtended*this.extensionSizeForMarker;
choreographyTaskMeta.numOfParticipantsExtendedOnTop=numOfParticipantsExtended;
choreographyTaskMeta.numOfParticipantsOnTop=participants.length;
choreographyTaskMeta.topParticipants=participants;
if(isResized){var participants=choreographyTaskMeta.bottomParticipants
}else{var participants=this.getParticipants(choreographyTask,false,true);
if(!participants){return
}this.ensureParticipantsParent(choreographyTask,participants)
}if(isNew){choreographyTaskMeta.bottomYStartValue=(bounds.height()-(participants.length!=0?eval(participants.map(function(p){return this.participantSize+(this.isExtended(p)?this.extensionSizeForMarker:0)
}.bind(this)).join("+")):0))
}else{choreographyTaskMeta.bottomYStartValue+=resizeFactor*this.participantSize+resizeFactorExtended*this.extensionSizeForMarker
}var bottomStartYValue=choreographyTaskMeta.bottomYStartValue;
var numOfParticipantsExtended=0;
participants.each(function(participant,i){participant.isResizable=false;
participant.setProperty("oryx-corners","None");
var isExtendedParticipant=this.setBoundsOfParticipantDependOnProperties(participant,i,numOfParticipantsExtended,choreographyTask.bounds.width(),bottomStartYValue);
if(isExtendedParticipant){numOfParticipantsExtended++
}if(i==participants.length-1){participant.setProperty("oryx-corners","Bottom")
}this.adjustTopBackground(participant)
}.bind(this));
var resizeFactor=participants.length-choreographyTaskMeta.numOfParticipantsOnBottom;
var resizeFactorExtended=numOfParticipantsExtended-choreographyTaskMeta.numOfParticipantsExtendedOnBottom;
var bounds=choreographyTask.bounds;
var ul=bounds.upperLeft();
var lr=bounds.lowerRight();
if(!isNew){bounds.set(ul.x,ul.y,lr.x,lr.y+resizeFactor*this.participantSize+resizeFactorExtended*this.extensionSizeForMarker)
}choreographyTaskMeta.numOfParticipantsExtendedOnBottom=numOfParticipantsExtended;
choreographyTaskMeta.numOfParticipantsOnBottom=participants.length;
choreographyTaskMeta.bottomParticipants=participants;
var participantsHasChanged=oldCountTop!==choreographyTaskMeta.numOfParticipantsOnTop||oldCountBottom!==choreographyTaskMeta.numOfParticipantsOnBottom;
this.ensureCenterPositionOfMagnets(choreographyTask,isResized,participantsHasChanged);
this.adjustTextFieldAndMarkerPosition(choreographyTask);
choreographyTaskMeta.oldHeight=bounds.height();
choreographyTaskMeta.oldBounds=bounds.clone()
},isExtended:function(a){return(!a||a.properties["oryx-multiple_instance"]===""?false:!!a.properties["oryx-multiple_instance"])
},setBoundsOfParticipantDependOnProperties:function(b,d,g,e,f){var a=this.isExtended(b);
var h=f+d*this.participantSize+g*this.extensionSizeForMarker;
var c=f+this.participantSize+d*this.participantSize+(a?(g+1)*this.extensionSizeForMarker:g*this.extensionSizeForMarker);
b.bounds.set(0,h,e,c);
return a
},adjustTextFieldAndMarkerPosition:function(f){var g=this.addOrGetChoreographyTaskMeta(f);
var e=f.bounds.height()/f._oldBounds.height();
var d=f._labels[f.getId()+"text_name"];
if(d){var a=g.topYEndValue+(g.bottomYStartValue-g.topYEndValue)/2;
if(f.isResized&&e){d.y=a/e
}else{d.y=a
}}var c=f._svgShapes.find(function(h){return h.element.id==f.getId()+"loop_path"
});
if(c){c._isYLocked=true;
c.y=g.bottomYStartValue-7
}var b=f._svgShapes.find(function(h){return h.element.id==f.getId()+"mi_path"
});
if(b){b._isYLocked=true;
b.y=g.bottomYStartValue-11
}},ensureCenterPositionOfMagnets:function(d,j,c){var f=this.addOrGetChoreographyTaskMeta(d);
var a=f.topYEndValue+(f.bottomYStartValue-f.topYEndValue)/2;
var b=a-f.center;
var g=d.bounds.height()/f.oldBounds.height();
if(!b&&!g){return
}var h=d.magnets.findAll(function(l){return(!l.anchorTop&&!l.anchorBottom)
});
h.each(function(m){var l=m.bounds.center().x;
var n=(m.bounds.center().y+b)/g;
m.bounds.centerMoveTo(l,n)
});
var e=d.absoluteBounds().upperLeft().y+f.topYEndValue;
var i=d.absoluteBounds().upperLeft().y+f.bottomYStartValue;
var k=new Array();
d.incoming.each(function(l){if(!(l instanceof ORYX.Core.Edge)){return
}var m=l.dockers.last();
if(e<=m.bounds.center().y&&m.bounds.center().y<=i){k.push(m)
}});
d.outgoing.each(function(l){if(!(l instanceof ORYX.Core.Edge)){return
}var m=l.dockers.first();
if(e<=m.bounds.center().y&&m.bounds.center().y<=i){k.push(m)
}});
if(c&&d.initialParticipantsAdded){k.each(function(l){var m=l.referencePoint;
l.setReferencePoint({x:m.x,y:(m.y+b)/g})
})
}f.center=a
},ensureParticipantsParent:function(a,b){if(!a||!b){return
}b.each(function(c){if(c.parent.getId()==a.getId()){return
}c.parent.remove(c);
a.add(c)
})
},getParticipants:function(b,h,e){if(b.getStencil().id()!=="http://b3mn.org/stencilset/bpmn2.0#ChoreographyTask"&&b.getStencil().id()!=="http://b3mn.org/stencilset/bpmn2.0#ChoreographySubprocessCollapsed"&&b.getStencil().id()!=="http://b3mn.org/stencilset/bpmn2.0#ChoreographySubprocessExpanded"){return null
}var g=this.addOrGetChoreographyTaskMeta(b);
var a=b.absoluteBounds().upperLeft().y+g.topYEndValue+(g.bottomYStartValue-g.topYEndValue)/2;
var f=b.getChildNodes(true).findAll(function(i){return(h&&i.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant"&&i.absoluteBounds().center().y<=a&&this.isParticipantOfShape(b,i))
}.bind(this));
var d=b.getChildNodes(true).findAll(function(i){return(e&&i.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant"&&i.absoluteBounds().center().y>a&&this.isParticipantOfShape(b,i))
}.bind(this));
var c=f.concat(d);
c=c.sort(function(j,i){var k=Math.round(j.absoluteBounds().upperLeft().y);
var l=Math.round(i.absoluteBounds().upperLeft().y);
return k<l?-1:(k>l?1:0)
});
return c
},isParticipantOfShape:function(b,a){var c=a.parent;
while(c.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant"){c=c.parent
}return c.getId()===b.getId()
},adjustTopBackground:function(a){var d=a.properties["oryx-corners"];
var b=$(a.getId()+"roundedBgRect");
if(!b){return
}if(d==="Top"){b.setAttributeNS(null,"fill","url(#"+a.getId()+"background_top) white")
}else{var c=a.properties["oryx-color"];
b.setAttributeNS(null,"fill",c)
}},handlePropertyChanged:function(c){var b=c.elements;
var d=c.key||c.name;
var a=c.value;
var e=false;
b.each(function(f){if(f.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0#ChoreographyParticipant"&&d==="oryx-initiating"){if(!a){f.setProperty("oryx-color","#acacac")
}else{f.setProperty("oryx-color","#ffffff")
}e=true
}});
if(e){this.facade.getCanvas().update()
}}};
ORYX.Plugins.Bpmn2_0Choreography=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.Bpmn2_0Choreography);