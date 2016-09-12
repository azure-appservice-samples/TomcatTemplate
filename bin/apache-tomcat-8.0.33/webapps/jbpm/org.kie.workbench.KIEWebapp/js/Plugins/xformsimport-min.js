if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.XFormsImport=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.XFormsSerialization.importXForms,functionality:this.importXForms.bind(this),group:ORYX.I18N.XFormsSerialization.group,icon:ORYX.BASE_FILE_PATH+"images/xforms_import.png",description:ORYX.I18N.XFormsSerialization.importXFormsDesc,index:3,minShape:0,maxShape:0})
},importXForms:function(){this._showImportDialog()
},sendRequest:function(b,d,e,a){var c=false;
new Ajax.Request(b,{method:"POST",asynchronous:false,parameters:d,onSuccess:function(f){c=true;
if(e){e(f)
}}.bind(this),onFailure:function(f){if(a){a()
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.XFormsSerialization.impFailed);
ORYX.log.warn("Import XForms failed: "+transport.responseText)
}}.bind(this)});
return c
},throwWarning:function(a){Ext.MessageBox.show({title:ORYX.I18N.Oryx.title,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})
},_showImportDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.XFormsSerialization.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.XFormsSerialization.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.XFormsSerialization.impTitle,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.XFormsSerialization.impButton,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.XFormsSerialization.impProgress});
d.show();
window.setTimeout(function(){var f=c.items.items[2].getValue();
var e={resource:location.href,data:f};
this.sendRequest(ORYX.CONFIG.XFORMS_IMPORT_URL,e,function(g){this.facade.importJSON(g.responseText);
d.hide();
b.hide()
}.bind(this))
}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.XFormsSerialization.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsBinary();
c.items.items[2].setValue(e)
},true)
}});