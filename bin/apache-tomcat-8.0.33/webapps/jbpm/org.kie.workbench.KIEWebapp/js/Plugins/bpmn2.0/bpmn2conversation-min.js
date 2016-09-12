if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2CONVERSATION={construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED,this.handleDockerDocked.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.handlePropertyChanged.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_MENU_CLOSE,this.handleDragDrop.bind(this))
},checkForMultiInstance:function(b){var c=b.getIncomingShapes();
var d=b.getOutgoingShapes();
var a=b.properties["oryx-multiinstance"];
if(c){c.find(function(e){if(e.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#ConversationLink"){if(a){e.setProperty("oryx-showforkend",true)
}else{e.setProperty("oryx-showforkend",false)
}}})
}if(d){d.find(function(e){if(e.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#ConversationLink"){if(a){e.setProperty("oryx-showforkstart",true)
}else{e.setProperty("oryx-showforkstart",false)
}}})
}},handleDockerDocked:function(b){var c=b.parent;
var a=b.target;
if(c.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#ConversationLink"){if(a.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#Participant"){this.checkForMultiInstance(a);
this.facade.getCanvas().update()
}}},handlePropertyChanged:function(b){var a=b.elements;
var c=false;
a.each(function(d){if(d.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#Participant"){this.checkForMultiInstance(d);
c=true
}}.bind(this));
if(c){this.facade.getCanvas().update()
}},handleDragDrop:function(b){var c=b.source;
var a=b.destination;
var d=false;
c.each(function(e){if(e.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#Participant"){this.checkForMultiInstance(e);
d=true
}}.bind(this));
a.each(function(e){if(e.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#Communication"){var f=e.getOutgoingShapes();
if(f){f.each(function(g){var h=g.getTarget();
if(h){if(h.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#Participant"){this.checkForMultiInstance(h);
d=true
}}}.bind(this))
}}if(e.getStencil().id()==="http://b3mn.org/stencilset/bpmn2.0conversation#Participant"){this.checkForMultiInstance(e);
d=true
}}.bind(this));
if(d){this.facade.getCanvas().update()
}}};
ORYX.Plugins.BPMN2CONVERSATION=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.BPMN2CONVERSATION);