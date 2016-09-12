if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.TransformationDownloadDialogForBPEL4Chor={construct:function(){arguments.callee.$.construct.apply(this,arguments)
},openResultDialog:function(g){var f=new Ext.data.Store({proxy:new Ext.data.MemoryProxy(g),reader:new Ext.data.ArrayReader({},[{name:"file",type:"string"},{name:"result",type:"string"},{name:"info",type:"string"}])});
f.load();
var b=function(h){if(h=="success"){return'<span style="color:green;">'+h+"</span>"
}else{if(h=="error"){return'<span style="color:red;">'+h+"</span>"
}}return h
};
var a=new Ext.grid.ColumnModel([{id:"file",header:"File",width:200,sortable:false,dataIndex:"file",resizable:false},{header:"Info",width:75,sortable:false,dataIndex:"info",renderer:b,resizable:false}]);
var d=new Ext.grid.GridPanel({store:f,cm:a,sm:new Ext.grid.RowSelectionModel({singleSelect:true}),autoWidth:true});
var e=new Ext.Toolbar();
var c=new Ext.Window({autoCreate:true,title:ORYX.I18N.TransformationDownloadDialog.transResult,autoHeight:true,width:297,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,resizable:false,items:[e,d]});
c.on("hide",function(){c.destroy(true);
d.destroy(true);
delete c;
delete d
});
c.show();
e.add({icon:"images/view.png",cls:"x-btn-icon",tooltip:ORYX.I18N.TransformationDownloadDialog.showFile,handler:function(){var j=d.getStore();
var i=d.getSelectionModel().getSelected();
if(i==undefined){return
}var h=i.get("result");
if(i.get("info")=="success"){this.openXMLWindow(h)
}else{this.openErrorWindow(h)
}}.bind(this)});
e.add({icon:"images/disk.png",cls:"x-btn-icon",tooltip:ORYX.I18N.TransformationDownloadDialog.downloadFile,handler:function(){var i=d.getStore();
var h=d.getSelectionModel().getSelected();
if(h==undefined){return
}this.openDownloadWindow(h,false)
}.bind(this)});
e.add({icon:"images/disk_multi.png",cls:"x-btn-icon",tooltip:ORYX.I18N.TransformationDownloadDialog.downloadAll,handler:function(){var h=d.getStore();
this.openDownloadWindow(h.getRange(0,h.getCount()),true)
}.bind(this)});
d.getSelectionModel().selectFirstRow()
},openDownloadWindow:function(f,e){var g=window.open("");
if(g!=null){g.document.open();
g.document.write("<html><body>");
var a=g.document.createElement("form");
g.document.body.appendChild(a);
try{if(e){for(var d=0;
d<f.length;
d++){var c=this.addFileExtension(f[d].get("file"));
if(c.include("-wsdl")){c=c.replace("-wsdl","")
}a.appendChild(this.createHiddenElement("download_"+d,f[d].get("result")));
a.appendChild(this.createHiddenElement("file_"+d,c))
}}else{var c=this.addFileExtension(f.get("file"));
if(c.include("-wsdl")){c=c.replace("-wsdl","")
}a.appendChild(this.createHiddenElement("download",f.get("result")));
a.appendChild(this.createHiddenElement("file",c))
}}catch(b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,b)
}a.method="POST";
g.document.write("</body></html>");
g.document.close();
a.action="download";
a.submit()
}},addFileExtension:function(a){if(a.include("wsdl")){return a+".wsdl"
}else{return a+".bpel"
}},getResultInfo:function(a){if(!a){return"error"
}else{if(a.substr(0,5)=="<?xml"){return"success"
}}return"error"
},getBPELName:function(a){var d=new DOMParser();
var c=d.parseFromString(a,"text/xml");
var b=c.documentElement.getAttribute("name");
return b
}};
ORYX.Plugins.TransformationDownloadDialogForBPEL4Chor=ORYX.Plugins.TransformationDownloadDialog.extend(ORYX.Plugins.TransformationDownloadDialogForBPEL4Chor);