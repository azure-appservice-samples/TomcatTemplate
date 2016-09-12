if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Validator=ORYX.Plugins.AbstractPlugin.extend({construct:function(a){this.facade=a;
this.active=false;
this.raisedEventIds=[];
this.buttonId=ORYX.Editor.provideId();
this.facade.offer({name:ORYX.I18N.Validator.name,id:this.buttonId,functionality:this.load.bind(this),group:"Verification",icon:ORYX.BASE_FILE_PATH+"images/checker_validation.png",description:ORYX.I18N.Validator.description,index:1,toggle:true,minShape:0,maxShape:0})
},load:function(a,b){if(!b){this.hideOverlays();
this.active=!this.active
}else{this.validate(a)
}},setActive:function(a){this.active=a;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_BUTTON_UPDATE,id:this.buttonId,pressed:a})
},hideOverlays:function(){this.raisedEventIds.each(function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:a})
}.bind(this));
this.raisedEventIds=[]
},validate:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.Validator.checking});
new Ajax.Request(ORYX.CONFIG.VALIDATOR_URL,{method:"POST",asynchronous:false,parameters:{resource:location.href,data:this.getRDFFromDOM()},onSuccess:function(c){var b=Ext.decode(c.responseText);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
this.handleValidationResponse(b,a)
}.bind(this),onFailure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Validator.error,ORYX.I18N.Validator.errorDesc)
}.bind(this)})
},showOverlay:function(b,c,a){var g="syntaxchecker."+this.raisedEventIds.length;
var e=ORYX.Editor.provideId();
var f=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{id:e,title:"","stroke-width":5,stroke:"red",d:"M20,-5 L5,-20 M5,-5 L20,-20","line-captions":"round"}]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:g,shapes:[b],node:f,nodePosition:b instanceof ORYX.Core.Edge?"START":"NW"});
this.raisedEventIds.push(g);
var d=new Ext.ToolTip({showDelay:50,title:a,html:c,target:e});
return f
},enableDeactivationHandler:function(a){var b=function(){this.setActive(false);
this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,b)
};
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,b.bind(this))
}});
ORYX.Plugins.BPMNValidator=Ext.extend(ORYX.Plugins.Validator,{handleValidationResponse:function(a,e){var f=a.conflictingNodes;
var c=a.leadsToEnd;
var b=a.unsafeNode;
this.setActive(f.size()>0);
if(f.size()>0){f.each(function(g){sh=this.facade.getCanvas().getChildShapeByResourceId(g.id);
if(sh){this.showOverlay(sh,ORYX.I18N.Validator.bpmnDeadlock,ORYX.I18N.Validator.bpmnDeadlockTitle)
}}.bind(this))
}if(b){var d=this.facade.getCanvas().getChildShapeByResourceId(b);
if(d){this.showOverlay(d,ORYX.I18N.Validator.bpmnUnsafe,ORYX.I18N.Validator.bpmnUnsafeTitle)
}}if(c&&f.size()===0&&!b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.Validator.noErrors,timeout:10000})
}else{if(!c&&f.size()===0&&!b){Ext.Msg.alert(ORYX.I18N.Validator.bpmnLeadsToNoEndTitle,ORYX.I18N.Validator.bpmnLeadsToNoEnd)
}else{this.enableDeactivationHandler(e);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.SyntaxChecker.notice,timeout:10000})
}}}});
ORYX.Plugins.EPCValidator=Ext.extend(ORYX.Plugins.Validator,{getLabelOfShape:function(a){if(a.properties["oryx-title"]===""){return a.id
}else{return a.properties["oryx-title"]
}},findShapeById:function(a){return this.facade.getCanvas().getChildShapeByResourceId(a)
},handleValidationResponse:function(j,d){var g=j.isSound;
var c=j.badStartArcs;
var b=j.badEndArcs;
var h=j.goodInitialMarkings;
var e=j.goodFinalMarkings;
var i="";
if(g){i+=ORYX.I18N.Validator.epcIsSound
}else{i+=ORYX.I18N.Validator.epcNotSound
}i+="<hr />";
var a=function(k,l){var m="<ul>";
k.each(function(n){m+="<li> - ";
n.each(function(o){m+='"'+l(o)+'" '
});
m+="</li>"
});
m+="</ul>";
return m
};
var f=function(m,k){var l="<ul>";
m.each(function(n){l+="<li> - "+k(n)+"</li>"
});
l+="</ul>";
return l
};
i+="<p>There are "+h.length+" initial markings which does not run into a deadlock.</p>";
i+=a(h,function(k){return this.getLabelOfShape(this.findShapeById(k.id).getIncomingShapes()[0])
}.createDelegate(this));
i+="<p>The initial markings do not include "+c.length+" start nodes.</p>";
i+=f(c,function(k){return this.getLabelOfShape(this.findShapeById(k.id).getIncomingShapes()[0])
}.createDelegate(this));
i+="<hr />";
i+="<p>There are "+e.length+" final markings which can be reached from the initial markings.</p>";
i+=a(e,function(k){return this.getLabelOfShape(this.findShapeById(k.id).getOutgoingShapes()[0])
}.createDelegate(this));
i+="<p>The final markings do not include "+b.length+" end nodes.</p>";
i+=f(b,function(k){return this.getLabelOfShape(this.findShapeById(k.id).getOutgoingShapes()[0])
}.createDelegate(this));
i+="<hr />";
i+="<p><i>Remark: Set titles of functions and events to get some nicer output (names instead of ids)</i></p>";
Ext.Msg.alert("Validation Result",i);
this.setActive(false)
}});