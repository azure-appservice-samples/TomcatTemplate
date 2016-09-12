if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}Ext.override(Ext.Button,{setIcon:function(a){if(this.rendered){var b=this.getEl().child(this.buttonSelector);
b.setStyle("background-image","url("+a+")")
}}});
Ext.Button.override({setTooltip:function(a){var b=this.getEl().child(this.buttonSelector);
Ext.QuickTips.register({target:b.id,text:a})
}});
ORYX.Plugins.UUIDRepositorySave=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.Save.save,functionality:this.save.bind(this),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.saveDesc,index:1,minShape:0,maxShape:0});
if(ORYX.CONFIG.UUID_AUTOSAVE_DEFAULT===undefined){ORYX.CONFIG.UUID_AUTOSAVE_DEFAULT=true
}autosaveicon=ORYX.BASE_FILE_PATH+"images/disk_multiple_disabled.png";
autosavetip=ORYX.I18N.Save.autosaveDesc_off;
if(ORYX.CONFIG.UUID_AUTOSAVE_DEFAULT){autosaveicon=ORYX.BASE_FILE_PATH+"images/disk_multiple.png";
autosavetip=ORYX.I18N.Save.autosaveDesc_on
}autosavecfg={name:ORYX.I18N.Save.autosave,group:ORYX.I18N.Save.group,functionality:function(b){this.setautosave(ORYX.CONFIG.UUID_AUTOSAVE_INTERVAL);
if(this.autosaving){b.setIcon(ORYX.BASE_FILE_PATH+"images/disk_multiple.png");
b.setTooltip(ORYX.I18N.Save.autosaveDesc_on)
}else{b.setIcon(ORYX.BASE_FILE_PATH+"images/disk_multiple_disabled.png");
b.setTooltip(ORYX.I18N.Save.autosaveDesc_off)
}b.hide();
b.show()
}.bind(this),icon:autosaveicon,description:autosavetip,index:2,minShape:0,maxShape:0};
this.facade.offer(autosavecfg);
this.changeDifference=0;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_EXECUTE,function(){this.changeDifference++
});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS,function(){this.changeDifference++
});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_ROLLBACK,function(){this.changeDifference--
});
window.onbeforeunload=function(){if(this.changeDifference>0){return ORYX.I18N.Save.unsavedData
}}.bind(this);
this.autosaveFunction=function(){if(true){this._save(this,true,true)
}}.bind(this,autosavecfg);
this.setautosave(ORYX.CONFIG.UUID_AUTOSAVE_INTERVAL)
},setautosave:function(a){if(this.autosaving===undefined){this.autosaving=!ORYX.CONFIG.UUID_AUTOSAVE_DEFAULT
}value=!this.autosaving;
if(value){this.autosaveInternalId=self.setInterval(this.autosaveFunction,a)
}else{self.clearInterval(this.autosaveInternalId)
}this.autosaving=value
},save:function(){this._save(this,false,false)
},_save:function(f,b,d){this.showSaveStatus(f,b);
var e=DataManager.serialize(this.facade.getCanvas().getSVGRepresentation(true));
var a=Ext.encode(this.facade.getJSON());
var c=this.getRDFFromDOM();
new Ajax.Request(ORYX.CONFIG.UUID_URL(),{method:"POST",asynchronous:b,postBody:Ext.encode({data:a,svg:e,uuid:ORYX.UUID,rdf:c,profile:ORYX.PROFILE,savetype:d}),onSuccess:(function(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.Save.saved})
}).bind(this),onFailure:(function(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.Save.failed);
ORYX.log.warn("Saving failed: "+g.responseText)
}).bind(this),on403:(function(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.Save.noRights);
ORYX.log.warn("Saving failed (403): "+g.responseText)
}).bind(this)});
this.hideSaveStatus(f,b);
return true
},showSaveStatus:function(b,a){if(a){autosavecfg.buttonInstance.setIcon(ORYX.BASE_FILE_PATH+"images/ajax-loader.gif")
}},hideSaveStatus:function(a){if(a){autosavecfg.buttonInstance.setIcon(ORYX.BASE_FILE_PATH+"images/disk_multiple.png")
}}});
ORYX.Plugins.UUIDRepositoryDummySave=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
ORYX.CONFIG.UUID_AUTOSAVE_DEFAULT=false;
autosavecfg={name:ORYX.I18N.Save.autosave,group:ORYX.I18N.Save.group,functionality:function(b){this.setautosave(ORYX.CONFIG.UUID_AUTOSAVE_INTERVAL);
if(this.autosaving){b.setIcon(ORYX.BASE_FILE_PATH+"images/disk_multiple.png");
b.setTooltip(ORYX.I18N.Save.autosaveDesc_on)
}else{b.setIcon(ORYX.BASE_FILE_PATH+"images/disk_multiple_disabled.png");
b.setTooltip(ORYX.I18N.Save.autosaveDesc_off)
}b.hide();
b.show()
}.bind(this),icon:autosaveicon,description:autosavetip,index:2,minShape:0,maxShape:0}
},setautosave:function(a){},save:function(){},_save:function(c,a,b){return true
},showSaveStatus:function(b,a){},hideSaveStatus:function(a){}});
window.onOryxResourcesLoaded=function(){var a=ORYX.Utils.getParamFromUrl("stencilset")||ORYX.CONFIG.SSET;
var b={id:ORYX.UUID,stencilset:{url:a}};
if(!(ORYX.UUID===undefined)){new Ajax.Request(ORYX.CONFIG.UUID_URL(),{asynchronous:false,encoding:"UTF-8",method:"get",onSuccess:function(e){response=e.responseText;
if(response.length!=0){try{model=response.evalJSON();
b.model=model
}catch(d){ORYX.LOG.error(d)
}}},onFailure:function(d){ORYX.LOG.error("Could not load the model for uuid "+ORYX.UUID)
}})
}var c=new ORYX.Editor(b);
ORYX.EDITOR=c
};