if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2XForms=ORYX.Plugins.AbstractPlugin.extend({stencilSetExtensionSuffix:"/bpmn-xforms-user-interfaces#",construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:"Aggregate User Interface",functionality:this.aggregateUI.bind(this),group:"User Interface Generation",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bpmn2xforms.png",icon:ORYX.BASE_FILE_PATH+"images/page_world.png",description:"Aggregates an XForm out of BPMN (requires 'BPMN Extension for XForms User Interfaces')",index:1,minShape:0,maxShape:0});
this.facade.offer({name:"Save Aggregated User Interface",functionality:this.saveAggregatedUI.bind(this),group:"User Interface Generation",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bpmn2xforms.png",icon:ORYX.BASE_FILE_PATH+"images/page_save.png",description:"Aggregates an XForm out of BPMN and stores it on the server (requires 'BPMN Extension for XForms User Interfaces')",index:3,minShape:0,maxShape:0});
this.facade.offer({name:"Browse Saved User Interfaces",functionality:this.browseAggregatedUIs.bind(this),group:"User Interface Generation",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bpmn2xforms.png",icon:ORYX.BASE_FILE_PATH+"images/folder_page.png",description:"Opens a list of Aggregated User Interfaces that are stored on the server.",index:4,minShape:0,maxShape:0})
},aggregateUI:function(){this.invokeBPMN2XFormsServlet(ORYX.CONFIG.ROOT_PATH+"bpmn2xforms",this.openXMLWindow.bind(this))
},aggregateUIAndRenderInOrbeon:function(){this.invokeBPMN2XFormsServlet(ORYX.CONFIG.ROOT_PATH+"bpmn2xforms-orbeon",this.openOrbeonWindow.bind(this))
},saveAggregatedUI:function(){this.invokeBPMN2XFormsServlet(ORYX.CONFIG.ROOT_PATH+"bpmn2xforms?save=true",window.open.bind(window))
},browseAggregatedUIs:function(){window.open(ORYX.PATH+"/generated-uis/","_blank","resizable=yes,width=640,height=480,toolbar=0,scrollbars=yes")
},openOrbeonWindow:function(a){var b=window.open("data:application/xml,"+encodeURIComponent(a),"_blank","resizable=yes,width=600,height=600,toolbar=0,scrollbars=yes")
},invokeBPMN2XFormsServlet:function(b,d){var a=new Ext.LoadMask(Ext.getBody(),{msg:"Aggregating User Interface..."});
a.show();
var c=this.getRDFFromDOM();
this._sendRequest(b,"POST",{data:c},function(e){d(e);
a.hide()
}.bind(this),function(){a.hide();
this._showErrorMessageBox("Oryx","User Interface Aggregation failed.");
ORYX.log.warn("User Interface Aggregation failed: "+transport.responseText)
}.bind(this))
},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a()
}else{Ext.Msg.alert("Oryx","User Interface Aggregation failed.");
ORYX.log.warn("User Interface Aggregation failed: "+g.responseText)
}}.bind(this)});
return c
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
},transform:function(){var b=ORYX.PATH+"xslt/BPMN2XHTML.xslt";
var a=this.doTransform(this.getRDFFromDOM(),b);
var c=window.open("data:application/xhtml+xml,"+a,"_blank","resizable=yes,width=640,height=480,toolbar=0,scrollbars=yes")
},isStencilSetExtensionLoaded:function(){return this.facade.getStencilSets().values().any(function(a){return a.extensions().keys().any(function(b){return b.endsWith(this.stencilSetExtensionSuffix)
}.bind(this))
}.bind(this))
}});