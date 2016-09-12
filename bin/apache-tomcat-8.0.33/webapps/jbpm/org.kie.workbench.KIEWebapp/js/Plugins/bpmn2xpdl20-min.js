if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2XPDL20=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.BPMN2XPDL.xpdlExport,functionality:this.transform.bind(this),group:ORYX.I18N.BPMN2XPDL.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_gear.png",description:ORYX.I18N.BPMN2XPDL.xpdlExport,index:1,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.BPMN2XPDL.xpdlImport,functionality:this.importXPDL.bind(this),group:ORYX.I18N.BPMN2XPDL.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_gear.png",description:ORYX.I18N.BPMN2XPDL.xpdlImport,index:1,minShape:0,maxShape:0})
},transform:function(){var a=ORYX.CONFIG.BPMN2XPDLPATH;
var b=this.facade.getSerializedJSON();
Ext.Ajax.request({url:a,method:"POST",success:function(c){this.openDownloadWindow(window.document.title+".xml",c.responseText)
}.bind(this),failure:function(){Ext.Msg.alert("Conversion failed")
},params:{data:b,action:"Export"}})
},importXPDL:function(a){var b=ORYX.CONFIG.BPMN2XPDLPATH;
var d=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.BPMN2XPDL.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.BPMN2XPDL.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var c=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.BPMN2XPDL.impXPDL,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[d],buttons:[{text:ORYX.I18N.BPMN2XPDL.impBtn,handler:function(){var e=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.BPMN2XPDL.impProgress});
e.show();
window.setTimeout(function(){var f=d.items.items[2].getValue();
Ext.Ajax.request({url:b,method:"POST",success:function(g){this.facade.importJSON(g.responseText);
e.hide();
c.hide()
}.bind(this),failure:function(){e.hide();
Ext.Msg.alert("Import failed")
},params:{data:f,action:"Import"}})
}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.BPMN2XPDL.close,handler:function(){c.hide()
}.bind(this)}]});
c.on("hide",function(){c.destroy(true);
delete c
});
c.show();
d.items.items[1].getEl().dom.addEventListener("change",function(e){var f=e.target.files[0].getAsText("UTF-8");
d.items.items[2].setValue(f)
},true)
}});