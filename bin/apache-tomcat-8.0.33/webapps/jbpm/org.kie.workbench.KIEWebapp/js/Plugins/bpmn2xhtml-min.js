if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2XHTML=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.BPMN2XHTML.XHTMLExport,functionality:this.transform.bind(this),group:ORYX.I18N.BPMN2XHTML.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_world.png",description:ORYX.I18N.BPMN2XHTML.XHTMLExport,index:99998,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.BPMN2XHTML.XHTMLExport,functionality:this.showXHTML.bind(this),group:ORYX.I18N.BPMN2XHTML.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/report.png",description:ORYX.I18N.BPMN2XHTML.XHTMLExport,index:99999,minShape:0,maxShape:0})
},showXHTML:function(){window.open(ORYX.PATH+"/testcase-BPMN2XHTML-extended.xhtml","_blank","resizable=yes,width=640,height=480,toolbar=0,scrollbars=yes")
},generateXHTML:function(c){var a=new Ext.LoadMask(Ext.getBody(),{msg:"Transforming BPMN to XHTML"});
a.show();
var b=this.getRDFFromDOM();
this._sendRequest(ORYX.PATH+"/bpmn2xhtml","POST",{data:b},function(d){c(d);
a.hide()
}.bind(this),function(){a.hide();
this._showErrorMessageBox("Oryx",ORYX.I18N.Bpmn2Bpel.transfFailed);
ORYX.log.warn("Transformation to XHTML failed: "+transport.responseText)
}.bind(this))
},_sendRequest:function(b,f,d,e,a){var c=false;
new Ajax.Request(b,{method:f,asynchronous:false,parameters:d,onSuccess:function(g){c=true;
if(e){e(g.responseText)
}}.bind(this),onFailure:function(g){if(a){a()
}else{Ext.Msg.alert("Oryx",ORYX.I18N.Bpmn2Bpel.transfFailed);
ORYX.log.warn("Transformation to XHTML failed: "+g.responseText)
}}.bind(this)});
return c
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
},transform:function(){var b=ORYX.PATH+"xslt/BPMN2XHTML.xslt";
var a=this.doTransform(this.getRDFFromDOM(),b);
var c=window.open("data:application/xhtml+xml,"+a,"_blank","resizable=yes,width=640,height=480,toolbar=0,scrollbars=yes")
}});