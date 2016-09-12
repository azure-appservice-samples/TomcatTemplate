if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2BPEL=ORYX.Plugins.AbstractPlugin.extend({bpmn2BpelHandlerUrl:ORYX.PATH+"/bpmn2bpel",stencilSetExtensionSuffix:"/bpmnservicecompositionsubset-goldeneye#",construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.Bpmn2Bpel.show,functionality:this.showBpel.bind(this),group:ORYX.I18N.Bpmn2Bpel.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bpmn2bpel_icon.png",description:ORYX.I18N.Bpmn2Bpel.showDesc,index:0,minShape:0,maxShape:0,isEnabled:this.isStencilSetExtensionLoaded.bind(this)});
this.facade.offer({name:ORYX.I18N.Bpmn2Bpel.download,functionality:this.downloadBpel.bind(this),group:ORYX.I18N.Bpmn2Bpel.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bpmn2bpel_icon.png",description:ORYX.I18N.Bpmn2Bpel.downloadDesc,index:0,minShape:0,maxShape:0,isEnabled:this.isStencilSetExtensionLoaded.bind(this)});
this.facade.offer({name:ORYX.I18N.Bpmn2Bpel.deploy,functionality:this.deployBpel.bind(this),group:ORYX.I18N.Bpmn2Bpel.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bpmn2bpel_icon.png",description:ORYX.I18N.Bpmn2Bpel.deployDesc,index:0,minShape:0,maxShape:0,isEnabled:this.isStencilSetExtensionLoaded.bind(this)})
},isStencilSetExtensionLoaded:function(){return this.facade.getStencilSets().values().any(function(a){return a.extensions().keys().any(function(b){return b.endsWith(this.stencilSetExtensionSuffix)
}.bind(this))
}.bind(this))
},showBpel:function(){var a=JSON.stringify({action:"transform"});
this.generateBpel(function(b){this.openXMLWindow(b.process)
}.bind(this),a)
},downloadBpel:function(){var a=JSON.stringify({action:"transform"});
this.generateBpel(function(b){this.openDownloadWindow("Oryx-BPEL",b.process)
}.bind(this),a)
},deployBpel:function(){this._showInputBox(function(b){var a={apacheOdeUrl:b,action:"deploy"};
a=JSON.stringify(a);
this.generateBpel(this._showProcessUrl.bind(this),a)
}.bind(this))
},generateBpel:function(bpelHandleFunction,options){var loadMask=new Ext.LoadMask(Ext.getBody(),{msg:"Transforming BPMN to BPEL"});
loadMask.show();
var erdfString=this.getRDFFromDOM();
this._sendRequest(this.bpmn2BpelHandlerUrl,"POST",{data:erdfString,options:options},function(arg){eval("var process = "+arg);
bpelHandleFunction(process);
loadMask.hide()
}.bind(this),function(){loadMask.hide();
this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.Bpmn2Bpel.transfFailed);
ORYX.log.warn("Transformation to BPEL failed: "+transport.responseText)
}.bind(this))
},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a()
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.Bpmn2Bpel.transfFailed);
ORYX.log.warn("Transformation to BPEL failed: "+g.responseText)
}}.bind(this)});
return c
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
},_showProcessUrl:function(a){Ext.MessageBox.show({title:"BPEL-Process-URL",msg:a.serviceName,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO})
},_showInputBox:function(a){var d=new Ext.form.TextField({value:"http://localhost:8080/ode",fieldLabel:"URL",width:200});
var b=new Ext.FormPanel({items:[{xtype:"label",text:ORYX.I18N.Bpmn2Bpel.ApacheOdeUrlInputPanelText,style:"margin:10px;display:block"},d],frame:true,buttons:[{text:ORYX.I18N.Bpmn2Bpel.ApacheOdeUrlInputLabelDeploy,handler:function(){var e=d.getValue();
Ext.getCmp("oryx_ode_url_input_panel_window").close();
a(e)
}.bind(this)},{text:ORYX.I18N.Bpmn2Bpel.ApacheOdeUrlInputLabelCancel,handler:function(){Ext.getCmp("oryx_ode_url_input_panel_window").close()
}.bind(this)}]});
var c=new Ext.Window({id:"oryx_ode_url_input_panel_window",width:350,title:ORYX.I18N.Bpmn2Bpel.ApacheOdeUrlInputTitle,floating:true,shim:true,modal:true,resizable:false,autoHeight:true,items:[b]});
c.show()
}});