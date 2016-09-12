if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.RDFExport=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.RDFExport.rdfExport,functionality:this.exportRDF.bind(this),group:ORYX.I18N.RDFExport.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_code.png",description:ORYX.I18N.RDFExport.rdfExportDescription,index:0,minShape:0,maxShape:0})
},exportRDF:function(){this.openDownloadWindow(window.document.title+".rdf",this.getRDFFromDOM())
}});