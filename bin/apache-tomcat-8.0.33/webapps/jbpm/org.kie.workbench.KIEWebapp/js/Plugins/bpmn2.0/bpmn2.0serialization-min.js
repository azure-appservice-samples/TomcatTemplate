if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2_0Serialization={bpmnSerializationHandlerUrl:ORYX.CONFIG.ROOT_PATH+"bpmn2_0serialization",bpmnDeserializationHandlerUrl:ORYX.CONFIG.ROOT_PATH+"bpmn2_0deserialization",bpmn2XpdlSerializationHandlerUrl:ORYX.CONFIG.ROOT_PATH+"bpmn2xpdlserialization",construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.Bpmn2_0Serialization.show,functionality:this.showBpmnXml.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/source.png",description:ORYX.I18N.Bpmn2_0Serialization.showDesc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Bpmn2_0Serialization.download,functionality:this.downloadBpmnXml.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/source.png",description:ORYX.I18N.Bpmn2_0Serialization.downloadDesc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Bpmn2_0Serialization.xpdlShow,functionality:this.showXpdl.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/source.png",description:ORYX.I18N.Bpmn2_0Serialization.xpdlShowDesc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Bpmn2_0Serialization.xpdlDownload,functionality:this.downloadXpdl.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/source.png",description:ORYX.I18N.Bpmn2_0Serialization.xpdlDownloadDesc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Bpmn2_0Serialization["import"],functionality:this.showImportDialog.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/source.png",description:ORYX.I18N.Bpmn2_0Serialization.importDesc,index:0,minShape:0,maxShape:0})
},showBpmnXml:function(){this.generateBpmnXml(function(a){var b=a.evalJSON();
this.showSchemaValidationEvent(b.validationEvents);
this.openXMLWindow(b.xml)
}.bind(this),this.bpmnSerializationHandlerUrl)
},downloadBpmnXml:function(){this.generateBpmnXml(function(a){var b=a.evalJSON();
this.showSchemaValidationEvent(b.validationEvents);
this.openDownloadWindow("model.bpmn",b.xml)
}.bind(this),this.bpmnSerializationHandlerUrl)
},showSchemaValidationEvent:function(a){if(a&&ORYX.CONFIG.BPMN20_SCHEMA_VALIDATION_ON){this._showErrorMessageBox("Validation",a)
}},showXpdl:function(){this.generateBpmnXml(function(a){this.openXMLWindow(a)
}.bind(this),this.bpmn2XpdlSerializationHandlerUrl)
},downloadXpdl:function(){this.generateBpmnXml(function(a){this.openDownloadWindow("model.xpdl",a)
}.bind(this),this.bpmn2XpdlSerializationHandlerUrl)
},generateBpmnXml:function(c,d){var b=new Ext.LoadMask(Ext.getBody(),{msg:"Serialization of BPMN 2.0 model"});
b.show();
var a=this.facade.getSerializedJSON();
this._sendRequest(d,"POST",{data:a},function(e){c(e);
b.hide()
}.bind(this),function(e){b.hide();
this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.Bpmn2_0Serialization.serialFailed);
ORYX.log.warn("Serialization of BPMN 2.0 model failed: "+e.responseText)
}.bind(this))
},showImportDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.Bpmn2_0Serialization.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.Bpmn2_0Serialization.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.Bpmn2_0Serialization.name,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.Bpmn2_0Serialization.btnImp,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.Bpmn2_0Serialization.progress});
d.show();
window.setTimeout(function(){var f=c.items.items[2].getValue();
try{this._sendRequest(this.bpmnDeserializationHandlerUrl,"POST",{data:f},function(g){this.facade.importJSON(g,true);
b.close()
}.bind(this),function(g){d.hide();
this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.Bpmn2_0Serialization.serialFailed);
ORYX.log.warn("Serialization of BPMN 2.0 model failed: "+g.responseText)
}.bind(this))
}catch(e){Ext.Msg.alert(ORYX.I18N.Bpmn2_0Serialization.error,e.message)
}finally{d.hide()
}}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.Bpmn2_0Serialization.btnClose,handler:function(){b.close()
}.bind(this)}]});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsText("UTF-8");
c.items.items[2].setValue(e)
},true)
},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a(g)
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.Bpmn2Bpel.transfFailed);
ORYX.log.warn("Serialization of BPMN 2.0 model failed: "+g.responseText)
}}.bind(this)});
return c
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}};
ORYX.Plugins.BPMN2_0Serialization=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.BPMN2_0Serialization);