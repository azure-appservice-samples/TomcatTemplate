if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2YAWLMapper=ORYX.Plugins.AbstractPlugin.extend({stencilSetExtensionNamespace:"http://oryx-editor.org/stencilsets/extensions/bpmn4yawlSubset#",construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.active=false;
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.BPMN2YAWLMapper.name,functionality:this.perform.bind(this),group:ORYX.I18N.BPMN2YAWLMapper.group,icon:ORYX.BASE_FILE_PATH+"images/door.png",description:ORYX.I18N.BPMN2YAWLMapper.desc,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",index:1,minShape:0,maxShape:0,isEnabled:this._isStencilSetExtensionLoaded.bind(this)});
this.facade.registerOnEvent(ORYX.Plugins.BPMN2YAWLMapper.RESET_ERRORS_EVENT,this.resetErrors.bind(this));
this.facade.registerOnEvent(ORYX.Plugins.BPMN2YAWLMapper.SHOW_ERRORS_EVENT,this.doShowErrors.bind(this))
},_isStencilSetExtensionLoaded:function(){return this.isStencilSetExtensionLoaded(this.stencilSetExtensionNamespace)
},perform:function(a,b){this.resetErrors();
this.checkSyntaxAndMapBPMNtoYAWL({onMappingSucceeded:function(){this.setActivated(false);
Ext.Msg.alert("The BPMN to YAWL mapper succeeded and has created an YAWL file in your Eclipse directory")
},onErrors:function(){},onFailure:function(){this.setActivated(false);
Ext.Msg.alert("The connection to the server failed")
}})
},setActivated:function(a){if(a===undefined){this.active=!this.active
}else{this.active=a
}},checkSyntaxAndMapBPMNtoYAWL:function(a){Ext.applyIf(a||{},{showErrors:true,ononMappingSucceeded:Ext.emptyFn,onErrors:Ext.emptyFn,onFailure:Ext.emptyFn});
var b=this.getRDFFromDOM();
this.openDownload(ORYX.CONFIG.BPMN2YAWL_URL,b)
},doShowErrors:function(b,a){this.showErrors(b.errors)
},showErrors:function(a){if(!(a instanceof Hash)){a=new Hash(a)
}a.keys().each(function(c){var b=this.facade.getCanvas().getChildShapeByResourceId(c);
if(b){this.raiseOverlay(b,a[c])
}}.bind(this))
},resetErrors:function(){this.raisedEventIds.each(function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:a})
}.bind(this));
this.raisedEventIds=[];
this.active=false
},raiseOverlay:function(a,b){var e="syntaxchecker."+this.raisedEventIds.length;
var c=ORYX.Editor.provideId();
var d=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{id:c,title:b,"stroke-width":5,stroke:"red",d:"M20,-5 L5,-20 M5,-5 L20,-20","line-captions":"round"}]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:e,shapes:[a],node:d,nodePosition:a instanceof ORYX.Core.Edge?"START":"NW"});
this.raisedEventIds.push(e);
return d
},openDownload:function(b,c){var d=window.open("");
if(d!=null){d.document.open();
d.document.write("<html><body>");
var a=d.document.createElement("form");
d.document.body.appendChild(a);
var e=function(f,g){var h=document.createElement("input");
h.name=f;
h.type="hidden";
h.value=g;
return h
};
a.appendChild(e("data",c));
a.method="POST";
d.document.write("</body></html>");
d.document.close();
a.action=b;
a.submit();
window.setTimeout(function(){d.close()
}.bind(this),1000)
}}});
ORYX.Plugins.BPMN2YAWLMapper.RESET_ERRORS_EVENT="resetErrors";
ORYX.Plugins.BPMN2YAWLMapper.SHOW_ERRORS_EVENT="showErrors";