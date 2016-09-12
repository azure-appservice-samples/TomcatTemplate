if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.EnforceabilityOverlay=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.el=undefined;
this.callback=undefined;
this.facade.offer({name:"Enforceability",functionality:this.showOverlay.bind(this),group:"Enforceability",icon:ORYX.BASE_FILE_PATH+"images/checker_validation.png",description:"enforce?",index:3,minShape:0,maxShape:0})
},showOverlay:function(){if(this.active){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"enforceability"});
this.active=!this.active
}else{try{var b=this.getRDFFromDOM();
new Ajax.Request(ORYX.CONFIG.ENFORCEABILITY_URL,{method:"POST",asynchronous:false,parameters:{resource:location.href,data:b},onSuccess:function(c){var e=c.responseText.evalJSON();
if(e.conflicttransitions){if(e.conflicttransitions.length>0){var d=e.conflicttransitions.collect(function(f){return this.facade.getCanvas().getChildShapeByResourceId(f)
}.bind(this)).compact();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"enforceability",shapes:d,attributes:{fill:"red",stroke:"black"}});
this.active=!this.active
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.DesynchronizabilityOverlay.sync)
}}else{if(e.syntaxerrors){Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.DesynchronizabilityOverlay.error.replace(/1/,e.syntaxerrors.length))
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.DesynchronizabilityOverlay.invalid)
}}}.bind(this)})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}}}});