if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.JPDLSupport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,stencilSetExtensionNamespace:"http://oryx-editor.org/stencilsets/extensions/jbpm#",stencilSetExtensionDefinition:"jbpm/jbpm.json",stencilSetNamespace:"http://b3mn.org/stencilset/bpmn1.1#",stencilSetUrlSuffix:"/bpmn1.1/bpmn1.1.json",construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.jPDLSupport.exp,functionality:this.exportJPDL.bind(this),group:ORYX.I18N.jPDLSupport.group,icon:ORYX.BASE_FILE_PATH+"images/jpdl_export_icon.png",description:ORYX.I18N.jPDLSupport.expDesc,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",index:1,minShape:0,maxShape:0,maxShape:0,isEnabled:this._isJpdlStencilSetExtensionLoaded.bind(this)});
this.facade.offer({name:ORYX.I18N.jPDLSupport.imp,functionality:this.importJPDL.bind(this),group:ORYX.I18N.jPDLSupport.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/jpdl_import_icon.png",description:ORYX.I18N.jPDLSupport.impDesc,index:2,minShape:0,maxShape:0})
},_isJpdlStencilSetExtensionLoaded:function(){return this.isStencilSetExtensionLoaded(this.stencilSetExtensionNamespace)
},importJPDL:function(){this._showImportDialog()
},exportJPDL:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this._doExport();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a()
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedReq);
ORYX.log.warn("Import jPDL failed: "+g.responseText)
}}.bind(this)});
return c
},_loadJSON:function(a){if(a){var b=a.evalJSON();
if(b&&this._hasStencilset(b)){if(this._isJpdlStencilSetExtensionLoaded()){this.facade.importJSON(a)
}else{Ext.MessageBox.confirm(ORYX.I18N.jPDLSupport.loadSseQuestionTitle,ORYX.I18N.jPDLSupport.loadSseQuestionBody,function(c){if(c=="yes"){if(this.loadStencilSetExtension(this.stencilSetNamespace,this.stencilSetExtensionDefinition)){this.facade.importJSON(a)
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJson)
}}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJsonAbort)
}},this)
}}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJson)
}}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJson)
}},loadStencilSetExtension:function(c,b){var a=this.facade.getStencilSets()[c];
if(a){a.addExtension(ORYX.CONFIG.SS_EXTENSIONS_FOLDER+b);
this.facade.getRules().initializeRules(a);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED});
return true
}return false
},_hasStencilset:function(a){return a.properties.ssextension==this.stencilSetExtensionNamespace&&a.stencilset.url.endsWith(this.stencilSetUrlSuffix)
},_doExport:function(){var a=this.facade.getSerializedJSON();
this._sendRequest(ORYX.CONFIG.JPDLEXPORTURL,"POST",{data:a},function(b){var d=new DOMParser();
var c=d.parseFromString(b,"text/xml");
if(c.firstChild.localName=="error"){this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.expFailedXml+c.firstChild.firstChild.data)
}else{this.openXMLWindow(b)
}}.bind(this),function(){this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.expFailedReq)
}.bind(this))
},_showImportDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.jPDLSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.jPDLSupport.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.jPDLSupport.impJPDL,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.jPDLSupport.impBtn,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.jPDLSupport.impProgress});
d.show();
window.setTimeout(function(){var e=c.items.items[2].getValue();
this._sendRequest(ORYX.CONFIG.JPDLIMPORTURL,"POST",{data:e},function(f){this._loadJSON(f);
d.hide();
b.hide()
}.bind(this),function(){d.hide();
b.hide()
}.bind(this))
}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.jPDLSupport.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsText("UTF-8");
c.items.items[2].setValue(e)
},true);
c.items.items[3].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsText("UTF-8");
c.items.items[4].setValue(e)
},true)
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}});