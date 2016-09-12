Ext.ns("Oryx.Plugins");
ORYX.Plugins.BPMNImport=Clazz.extend({converterUrl:ORYX.CONFIG.ROOT_PATH+"bpmn2pn",construct:function(a){this.facade=a;
this.importBpmn()
},getParamFromUrl:function(b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var a="[\\?&]"+b+"=([^&#]*)";
var d=new RegExp(a);
var c=d.exec(window.location.href);
if(c==null){return null
}else{return c[1]
}},bpmnToPn:function(a){Ext.Msg.updateProgress(0.66,ORYX.I18N.BPMN2PNConverter.progress.convertingModel);
Ext.Ajax.request({url:this.converterUrl,method:"POST",success:function(b){try{var f=new DOMParser();
Ext.Msg.updateProgress(1,ORYX.I18N.BPMN2PNConverter.progress.renderingModel);
var d=f.parseFromString(b.responseText,"text/xml");
this.facade.importERDF(d)
}catch(c){Ext.Msg.alert("Rendering Failed :\n"+c)
}Ext.Msg.hide()
}.createDelegate(this),failure:function(){Ext.Msg.alert(ORYX.I18N.BPMN2PNConverter.error,ORYX.I18N.BPMN2PNConverter.errors.server)
},params:{rdf:a}})
},importBpmn:function(){var a=this.getParamFromUrl("importBPMN");
if(!a){return
}Ext.Msg.progress(ORYX.I18N.BPMN2PNConverter.progress.status,ORYX.I18N.BPMN2PNConverter.progress.importingModel);
Ext.Msg.updateProgress(0.33,ORYX.I18N.BPMN2PNConverter.progress.fetchingModel);
Ext.Ajax.request({url:this.getRdfUrl(a),success:function(b){var c=b.responseText;
this.bpmnToPn(c)
}.createDelegate(this),failure:function(b){Ext.Msg.alert(ORYX.I18N.BPMN2PNConverter.error,ORYX.I18N.BPMN2PNConverter.errors.noRights)
},method:"GET"})
},getRdfUrl:function(a){return a.replace(/\/self(\/)?$/,"/rdf")
}});
ORYX.Plugins.PNExport=Clazz.extend({construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.BPMN2PNConverter.name,functionality:this.exportIt.bind(this),group:ORYX.I18N.BPMN2PNConverter.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_convert.png",description:ORYX.I18N.BPMN2PNConverter.desc,index:3,minShape:0,maxShape:0})
},exportIt:function(){var a="";
if(!location.hash.slice(1)){Ext.Msg.alert(ORYX.I18N.BPMN2PNConverter.error,ORYX.I18N.BPMN2PNConverter.errors.notSaved);
return
}else{a="/backend/poem/"+(location.hash.slice(1).replace(/^\/?/,"").replace(/\/?$/,""))+"/rdf"
}this.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.RESET_ERRORS_EVENT});
this.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.CHECK_FOR_ERRORS_EVENT,context:"bpmn2pn",onNoErrors:function(){this.openPetriNetEditor(a)
}.bind(this)})
},openPetriNetEditor:function(a){window.open("/backend/poem/new?stencilset=/stencilsets/petrinets/petrinet.json&importBPMN="+a)
}});