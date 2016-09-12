if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2DTRPXMI=ORYX.Plugins.AbstractPlugin.extend({stencilSetExtensionSuffix:"/bpmn-design-thinking-subset#",construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.BPMN2DTRPXMI.DTRPXMIExport,functionality:this.transform.bind(this),group:ORYX.I18N.BPMN2DTRPXMI.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_code_red.png",description:ORYX.I18N.BPMN2DTRPXMI.DTRPXMIExportDescription,index:1,minShape:0,maxShape:0,isEnabled:this.isStencilSetExtensionLoaded.bind(this)})
},isStencilSetExtensionLoaded:function(){return this.facade.getStencilSets().values().any(function(a){return a.extensions().keys().any(function(b){return b.endsWith(this.stencilSetExtensionSuffix)
}.bind(this))
}.bind(this))
},transform:function(){var b=ORYX.PATH+"xslt/BPMN2DTRP-XMI.xslt";
var a=this.doTransform(this.getRDFFromDOM(),b);
this.openDownloadWindow(window.document.title+".xmi",a)
}});