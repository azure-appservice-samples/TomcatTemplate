if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN2XPDL=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.BPMN2XPDL.xpdlExport,functionality:this.transform.bind(this),group:ORYX.I18N.BPMN2XPDL.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_gear.png",description:ORYX.I18N.BPMN2XPDL.xpdlExport,index:1,minShape:0,maxShape:0})
},transform:function(){var b=ORYX.PATH+"xslt/BPMN2XPDL.xslt";
var a=this.doTransform(this.facade.getERDF(),b);
this.openDownloadWindow(window.document.title+".xml",a)
}});