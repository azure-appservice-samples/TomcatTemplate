if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.SavePlugin=Clazz.extend({construct:function(a){this.facade=a;
this.vt;
this.editorLocked=false;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Save.enableAutosave,functionality:this.enableautosave.bind(this),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.enableAutosave_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !ORYX.AUTOSAVE_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.Save.disableAutosave,functionality:this.disableautosave.bind(this),group:ORYX.I18N.Save.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.disableAutosave_desc,index:3,minShape:0,maxShape:0,isEnabled:function(){return ORYX.AUTOSAVE_ENABLED&&!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_ROLLBACK,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_EXECUTE,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_END,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_ADDED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_CREATED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_DELETED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_MOVE_FINISHED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DOCKERDRAG,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DOCKER_EVENT,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UPDATE_TASK_TYPE,this.setUnsaved.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DO_SAVE,this.handleEventDoSave.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DO_CHECKSAVE,this.handleEventDoCheckSave.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_CANCEL_SAVE,this.handleEventCancelSave.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DO_RELOAD,this.handleEventDoRealod.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.handleOpenXMLEditor.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UPDATE_LOCK,this.handleEventUpdateLock.bind(this));
window.onunload=this.unloadWindow.bind(this)
},handleEventUpdateLock:function(){if(typeof parent.acquireLock==="function"){if(this.editorLocked&&!parent.isLockedByCurrentUser()){this.editorLocked=false
}else{if(!this.editorLocked&&!parent.isLocked()){ORYX.EDITOR.updateViewLockState()
}}}},setUnsaved:function(){ORYX.PROCESS_SAVED=false;
ORYX.EDITOR.updateViewLockState();
if(!this.editorLocked){if(typeof parent.acquireLock==="function"){if(!parent.isLockedByCurrentUser()){parent.acquireLock()
}this.editorLocked=true
}}},saveWithMessage:function(){var a=parent.designersignalassetupdate(ORYX.UUID);
if(a&&a==true){}else{this.save(true)
}},handleEventDoSave:function(){this.setUnsaved();
this.save(true)
},handleEventDoCheckSave:function(a){this.save(true,a.pathuri)
},handleEventCancelSave:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.saveCancelled,title:""})
},handleOpenXMLEditor:function(){if(ORYX.LOADING_ERRORS==true){Ext.MessageBox.confirm("Unable to open Process","Open Process Sources with the XML Editor?",function(a){if(a=="yes"){parent.designeropeninxmleditortab(ORYX.UUID)
}}.bind(this))
}ORYX.LOADING_ERRORS=false
},handleEventDoRealod:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.processReloading,title:""});
new Ajax.Request(ORYX.CONFIG.UUID_URL(),{encoding:"UTF-8",method:"GET",onSuccess:function(b){response=b.responseText;
try{if(response.length!=0){if(response.startsWith("error:")){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableReloadContent,title:""})
}else{this.updateProcessOnReload(response.evalJSON())
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.invalidContent,title:""})
}}catch(a){ORYX.LOG.error(a)
}}.createDelegate(this),onFailure:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.couldNotReload,title:""})
}});
ORYX.PROCESS_SAVED=false
},save:function(c,b){var e=parent.designerIsLatest();
if(!e){ORYX.PROCESS_SAVED=false
}if(!ORYX.PROCESS_SAVED){var a="";
if(b){a=b
}var d="";
if(c&&c==true){d=prompt("Save this item","Check in comment");
if(d==null){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.saveCancelled,title:""});
return
}}Ext.Ajax.request({url:ORYX.PATH+"assetservice",method:"POST",success:function(i){try{if(i.responseText&&i.responseText.length>0){var m=i.responseText.evalJSON();
if(m.errors&&m.errors.length>0){var n=m.errors;
for(var k=0;
k<n.length;
k++){var g=n[k];
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:g.message,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.saveSuccess,title:"",timeOut:1000,extendedTimeOut:1000});
ORYX.PROCESS_SAVED=true;
if(ORYX.CONFIG.STORESVGONSAVE&&ORYX.CONFIG.STORESVGONSAVE=="true"){var h=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
var o=DataManager.serialize(ORYX.EDITOR.getCanvas().getRootNode().cloneNode(true));
var p=ORYX.EDITOR.getSerializedJSON();
var f=jsonPath(p.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(j){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.saveImageSuccess,title:""})
}.bind(this),failure:function(j,q){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.saveImageFailed,title:""})
}.bind(this),params:{fsvg:Base64.encode(h),rsvg:Base64.encode(o),uuid:window.btoa(encodeURI(ORYX.UUID)),profile:ORYX.PROFILE,transformto:"svg",processid:f}})
}}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+": "+l,title:""})
}}catch(l){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+": "+l,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+".",title:""})
}.bind(this),params:{action:"updateasset",profile:ORYX.PROFILE,assetcontent:window.btoa(encodeURIComponent(ORYX.EDITOR.getSerializedJSON())),pp:ORYX.PREPROCESSING,assetid:window.btoa(encodeURI(ORYX.UUID)),assetcontenttransform:"jsontobpmn2",commitmessage:d,sessionid:ORYX.SESSION_ID,latestpath:a}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.noChanges,title:""})
}},saveSync:function(){ORYX.EDITOR.updateViewLockState();
if(!ORYX.PROCESS_SAVED&&ORYX.VIEWLOCKED!=true){var k=ORYX.EDITOR.getSerializedJSON();
var a=new XMLHttpRequest;
var b=ORYX.PATH+"assetservice";
var d="action=updateasset&profile="+ORYX.PROFILE+"&pp="+ORYX.PREPROCESSING+"&assetid="+window.btoa(encodeURI(ORYX.UUID))+"&assetcontenttransform=jsontobpmn2&assetcontent="+window.btoa(encodeURIComponent(k));
a.open("POST",b,false);
a.setRequestHeader("Content-type","application/x-www-form-urlencoded");
a.send(d);
if(a.status==200){try{if(a.responseText&&a.responseText.length>0){var h=a.responseText.evalJSON();
if(h.errors&&h.errors.lengt>0){var i=h.errors;
for(var f=0;
f<i.length;
f++){var c=i[f];
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:c.message,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.saveSuccess,title:"",timeOut:1000,extendedTimeOut:1000});
ORYX.PROCESS_SAVED=true
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.unableToSave+": "+g,title:""})
}}catch(g){alert("error : "+g)
}}}},enableautosave:function(){ORYX.AUTOSAVE_ENABLED=true;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
this.vt=window.setInterval((function(){this.save(false)
}).bind(this),30000);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.autosaveEnabled,title:""})
},disableautosave:function(){ORYX.AUTOSAVE_ENABLED=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
window.clearInterval(this.vt);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.Save.autosaveDisabled,title:""})
},deleteassetnotify:function(){Ext.MessageBox.confirm(ORYX.I18N.Save.deleteConfirm_title,ORYX.I18N.Save.deleteConfirm_msg,function(a){if(a=="yes"){parent.designersignalassetdelete(ORYX.UUID)
}}.bind(this))
},copyassetnotify:function(){Ext.MessageBox.confirm(ORYX.I18N.Save.copyConfirm_title,ORYX.I18N.Save.copyConfirm_msg,function(a){if(a=="yes"){this.save(true);
parent.designersignalassetcopy(ORYX.UUID)
}else{parent.designersignalassetcopy(ORYX.UUID)
}}.bind(this))
},renameassetnotify:function(){if(ORYX.Editor.checkIfSaved()){parent.designersignalassetrename(ORYX.UUID)
}else{Ext.MessageBox.confirm(ORYX.I18N.Save.renameConfirm_title,ORYX.I18N.Save.renameConfirm_msg,function(a){if(a=="yes"){this.save(true);
parent.designersignalassetrename(ORYX.UUID)
}else{parent.designersignalassetrename(ORYX.UUID)
}}.bind(this))
}},unloadWindow:function(){this.saveSync(false)
},clearCanvas:function(){ORYX.EDITOR.getCanvas().nodes.each(function(a){ORYX.EDITOR.deleteShape(a)
}.bind(this));
ORYX.EDITOR.getCanvas().edges.each(function(a){ORYX.EDITOR.deleteShape(a)
}.bind(this))
},updateProcessOnReload:function(a){if(a){try{this.clearCanvas();
this.facade.importJSON(a);
ORYX.PROCESS_SAVED=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.Save.reloadSuccess,title:""})
}catch(b){this.facade.importJSON(currentJSON);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.reloadFail,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.Save.processReloadedInvalid,title:""})
}}});