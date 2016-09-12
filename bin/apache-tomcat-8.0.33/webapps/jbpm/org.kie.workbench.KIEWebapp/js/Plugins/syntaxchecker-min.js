if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.SyntaxChecker=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.active=false;
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.SyntaxChecker.name,functionality:this.perform.bind(this),group:ORYX.I18N.View.jbpmgroup,icon:ORYX.BASE_FILE_PATH+"images/checker_syntax.png",description:ORYX.I18N.SyntaxChecker.desc,index:6,toggle:true,minShape:0,maxShape:0});
this.facade.registerOnEvent(ORYX.Plugins.SyntaxChecker.CHECK_FOR_ERRORS_EVENT,this.checkForErrors.bind(this));
this.facade.registerOnEvent(ORYX.Plugins.SyntaxChecker.RESET_ERRORS_EVENT,this.resetErrors.bind(this));
this.facade.registerOnEvent(ORYX.Plugins.SyntaxChecker.SHOW_ERRORS_EVENT,this.doShowErrors.bind(this))
},perform:function(a,b){if(!b){this.resetErrors()
}else{this.checkForErrors({onNoErrors:function(){this.setActivated(a,false);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.SyntaxChecker.noErrors,timeout:10000});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.SyntaxChecker.noErrors,title:""})
}.bind(this),onErrors:function(){this.enableDeactivationHandler(a);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.SyntaxChecker.hasErrors,title:""})
}.bind(this),onFailure:function(){this.setActivated(a,false);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.SyntaxChecker.invalid,title:""})
}.bind(this)})
}},enableDeactivationHandler:function(a){var b=function(){this.setActivated(a,false);
this.resetErrors();
this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,b)
};
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,b.bind(this))
},setActivated:function(b,a){b.toggle(a);
if(a===undefined){this.active=!this.active
}else{this.active=a
}},checkForErrors:function(a){Ext.applyIf(a||{},{showErrors:true,onErrors:Ext.emptyFn,onNoErrors:Ext.emptyFn,onFailure:Ext.emptyFn});
var b=this.facade.getStencilSets();
var d=ORYX.EDITOR.getSerializedJSON();
var c=true;
new Ajax.Request(ORYX.PATH+"syntaxcheck",{method:"POST",asynchronous:false,parameters:{data:d,profile:ORYX.PROFILE,pp:ORYX.PREPROCESSING,uuid:window.btoa(encodeURI(ORYX.UUID))},onSuccess:function(e){var f=(e&&e.responseText?e.responseText:"{}").evalJSON();
if(f instanceof Object){f=$H(f);
if(f.size()>0){if(a.showErrors){this.showErrors(f)
}a.onErrors()
}else{a.onNoErrors()
}}else{a.onFailure()
}}.bind(this),onFailure:function(){a.onFailure()
}})
},doShowErrors:function(b,a){this.showErrors(b.errors)
},showErrors:function(a){if(!(a instanceof Hash)){a=new Hash(a)
}a.keys().each(function(c){var b=this.facade.getCanvas().getChildShapeByResourceId(c);
if(b){this.raiseOverlay(b,this.parseCodeToMsg(a[c]))
}else{this.raiseOverlay(this.facade.getCanvas().nodes[0],this.parseCodeToMsg(a[c]))
}}.bind(this));
this.active=!this.active;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.SyntaxChecker.notice,timeout:10000})
},parseCodeToMsg:function(b){var c="";
for(var a=0;
a<b.length;
a++){c+="   * "+b[a]+"<br />"
}return c
},parseSingleCodeToMsg:function(a){return ORYX.I18N.SyntaxChecker[a]||a
},resetErrors:function(){this.raisedEventIds.each(function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:a})
}.bind(this));
this.raisedEventIds=[];
this.active=false
},raiseOverlay:function(a,b){var f="syntaxchecker."+this.raisedEventIds.length;
var d=ORYX.Editor.provideId();
var e=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{id:d,title:"","stroke-width":5,stroke:"red",d:"M20,-5 L5,-20 M5,-5 L20,-20","line-captions":"round"}]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:f,shapes:[a],node:e,nodePosition:a instanceof ORYX.Core.Edge?"SW":"SYNTAX_CHECKS"});
var c=new Ext.ToolTip({title:"Validation Results:",showDelay:50,html:b,target:d});
this.raisedEventIds.push(f);
return e
}});
ORYX.Plugins.SyntaxChecker.CHECK_FOR_ERRORS_EVENT="checkForErrors";
ORYX.Plugins.SyntaxChecker.RESET_ERRORS_EVENT="resetErrors";
ORYX.Plugins.SyntaxChecker.SHOW_ERRORS_EVENT="showErrors";
ORYX.Plugins.PetrinetSyntaxChecker=ORYX.Plugins.SyntaxChecker.extend({getRDFFromDOM:function(){return this.facade.getERDF()
}});