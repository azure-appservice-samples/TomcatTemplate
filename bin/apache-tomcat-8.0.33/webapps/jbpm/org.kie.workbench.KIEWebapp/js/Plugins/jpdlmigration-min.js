if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.JPDLMigration=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.View.migratejPDL,functionality:this.migrateJPDL.bind(this),group:"importgroup",icon:ORYX.BASE_FILE_PATH+"images/jpdl_import_icon.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",description:ORYX.I18N.View.migratejPDLDesc,index:3,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},migrateJPDL:function(){this._showImportDialog()
},_showImportDialog:function(a){var f=ORYX.Utils.getDialogSize(450,500);
var d=Math.max(50,(f.height-150)/2);
var g=f.width-50;
var e=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.jPDLSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{fieldLabel:ORYX.I18N.jPDLSupport.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",grow:false,width:g,height:d}]});
var b=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.jPDLSupport.selectGpdFile,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{fieldLabel:ORYX.I18N.jPDLSupport.gpdfile,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",grow:false,width:g,height:d}]});
var c=new Ext.Window({autoCreate:true,autoScroll:true,plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.jPDLSupport.impJPDL,height:f.height,width:f.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[e,b],buttons:[{text:ORYX.I18N.jPDLSupport.impBtn,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.jPDLSupport.impProgress,title:""});
window.setTimeout(function(){var h=e.items.items[2].getValue();
var i=b.items.items[2].getValue();
this._sendRequest(ORYX.CONFIG.TRANSFORMER_URL(),"POST",{jpdl:h,gpd:i,transformto:"jpdl2bpmn2",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))},function(j){this._loadJSON(j);
c.hide()
}.bind(this),function(){c.hide()
}.bind(this))
}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.jPDLSupport.close,handler:function(){c.hide()
}.bind(this)}]});
c.on("hide",function(){c.destroy(true);
delete c
});
c.show();
e.items.items[1].getEl().dom.addEventListener("change",function(i){var h=new FileReader();
h.onload=function(j){e.items.items[2].setValue(j.target.result)
};
h.readAsText(i.target.files[0],"UTF-8")
},true);
b.items.items[1].getEl().dom.addEventListener("change",function(i){var h=new FileReader();
h.onload=function(j){b.items.items[2].setValue(j.target.result)
};
h.readAsText(i.target.files[0],"UTF-8")
},true)
},_loadJSON:function(a){if(a){var b=a.evalJSON();
this.facade.importJSON(a)
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJson)
}},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a()
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedReq);
ORYX.log.warn("jPDL migration failed: "+g.responseText)
}}.bind(this)});
return c
}});