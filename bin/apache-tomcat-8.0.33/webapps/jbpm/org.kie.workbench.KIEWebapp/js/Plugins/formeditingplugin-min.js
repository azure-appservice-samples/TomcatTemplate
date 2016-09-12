if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.FormEditing=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){if(ORYX.PRESET_PERSPECTIVE!="ruleflow"){this.facade.offer({name:ORYX.I18N.View.editProcessForm,functionality:this.editProcessForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.View.editProcessFormDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.editTaskForm,functionality:this.editTaskForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.View.editTaskFormDesc,index:2,minShape:1,maxShape:1,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.forms.generateTaskForm,functionality:this.generateTaskForm.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.forms.generateTaskForm_desc,index:3,minShape:1,maxShape:1,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.forms.generateAllForms,functionality:this.generateTaskForms.bind(this),group:"editprocessforms",icon:ORYX.BASE_FILE_PATH+"images/processforms.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/processforms.png",description:ORYX.I18N.forms.generateAllForms_desc,index:4,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}}},generateTaskForm:function(){var a=ORYX.Config.FACADE.getSelection();
if(a){if(a.length!=1){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.invalidNumberNodes,title:""})
}else{var c=a[0].properties["oryx-tasktype"];
if(c&&c=="User"){var b=a[0].properties["oryx-taskname"];
if(b&&b.length>0){b=b.replace(/\&/g,"");
b=b.replace(/\s/g,"");
Ext.Ajax.request({url:ORYX.PATH+"taskforms",method:"POST",success:function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.forms.successGenTask,title:""})
}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failGenTask,title:""})
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,taskid:a[0].resourceId}})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskName,title:""})
}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoUserTask,title:""})
}}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskSelected,title:""})
}},editTaskForm:function(){var a=ORYX.Config.FACADE.getSelection();
if(a){if(a.length!=1){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.invalidNumberNodes,title:""})
}else{var c=a[0].properties["oryx-tasktype"];
if(c&&c=="User"){var b=a[0].properties["oryx-taskname"];
if(b&&b.length>0){b=b.replace(/\&/g,"");
b=b.replace(/\s/g,"");
ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskName,title:""})
}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoUserTask,title:""})
}}}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failNoTaskSelected,title:""})
}},editProcessForm:function(){var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.id");
if(b&&b!=""){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failProcIdUndef,title:""})
}},generateTaskForms:function(){Ext.Ajax.request({url:ORYX.PATH+"taskforms",method:"POST",success:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.forms.successGenProcAndTask,title:""})
}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.forms.failGenProcAndTask,title:""})
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING}});
ORYX.CONFIG.TASKFORMS_URL=function(b,a){if(b===undefined){b=ORYX.UUID
}if(a===undefined){a=ORYX.PROFILE
}return ORYX.PATH+"taskforms?uuid="+window.btoa(encodeURI(b))+"&profile="+a
}
}});