if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.JSONSupport=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.JSONSupport.exp.name,functionality:this.exportJSON.bind(this),group:ORYX.I18N.JSONSupport.exp.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_javascript.png",description:ORYX.I18N.JSONSupport.exp.desc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.JSONSupport.imp.name,functionality:this.showImportDialog.bind(this),group:ORYX.I18N.JSONSupport.imp.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_javascript.png",description:ORYX.I18N.JSONSupport.imp.desc,index:1,minShape:0,maxShape:0})
},exportJSON:function(){var a=this.facade.getSerializedJSON();
this.openDownloadWindow(window.document.title+".json",a)
},showImportDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.JSONSupport.imp.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.JSONSupport.imp.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.JSONSupport.imp.name,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.JSONSupport.imp.btnImp,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.JSONSupport.imp.progress});
d.show();
window.setTimeout(function(){var f=c.items.items[2].getValue();
try{this.facade.importJSON(f,true);
b.close()
}catch(e){Ext.Msg.alert(ORYX.I18N.JSONSupport.imp.syntaxError,e.message)
}finally{d.hide()
}}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.JSONSupport.imp.btnClose,handler:function(){b.close()
}.bind(this)}]});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsText("UTF-8");
c.items.items[2].setValue(e)
},true)
}});