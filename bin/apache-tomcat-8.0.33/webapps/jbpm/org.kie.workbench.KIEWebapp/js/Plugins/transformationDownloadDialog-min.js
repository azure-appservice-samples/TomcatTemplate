if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.TransformationDownloadDialog={construct:function(){},openMessageDialog:function(c,b){var a=new Ext.Window({autoCreate:true,title:c,modal:true,height:120,width:400,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,buttonAlign:"center",bodyStyle:"padding:10px",html:'<span class="ext-mb-text">'+b+"</span>"});
a.addButton("OK",a.hide,a);
a.on("hide",function(){a.destroy(true);
delete a
});
a.show()
},openErrorDialog:function(b){var c=new Ext.form.TextArea({id:"error-field",fieldLabel:ORYX.I18N.TransformationDownloadDialog.error,name:"desc",height:405,width:633,preventScrollbars:true,value:b,readOnly:true});
var a=new Ext.Window({autoCreate:true,title:ORYX.I18N.TransformationDownloadDialog.errorParsing,modal:true,height:450,width:650,collapsible:false,fixedcenter:true,shadow:true,resizable:false,proxyDrag:true,autoScroll:false});
a.on("hide",function(){a.destroy(true);
c.destroy(true);
delete a;
delete c
});
c.render(a.body);
a.show()
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
},openXMLWindow:function(a){var b=window.open("data:application/xml,"+encodeURIComponent([a].join("\r\n")),"_blank","resizable=yes,width=600,height=600,toolbar=0,scrollbars=yes")
},openErrorWindow:function(a){var b=window.open("data:text/html,"+encodeURIComponent(["<html><body><pre>"+a+"</pre></body></html>"].join("\r\n")),"_blank","resizable=yes,width=800,height=300,toolbar=0,scrollbars=yes")
},createHiddenElement:function(a,b){var c=document.createElement("input");
c.name=a;
c.type="hidden";
c.value=b;
return c
},addFileExtension:function(a){if((a.toLowerCase()=="topology")||(a=="XPDL4Chor")){return a+".xml"
}else{return a+".bpel"
}},openDownloadWindow:function(e,d){var f=window.open("");
if(f!=null){f.document.open();
f.document.write("<html><body>");
var a=f.document.createElement("form");
f.document.body.appendChild(a);
if(d){for(var c=0;
c<e.length;
c++){var b=this.addFileExtension(e[c].get("file"));
a.appendChild(this.createHiddenElement("download_"+c,e[c].get("result")));
a.appendChild(this.createHiddenElement("file_"+c,b))
}}else{var b=this.addFileExtension(e.get("file"));
a.appendChild(this.createHiddenElement("download",e.get("result")));
a.appendChild(this.createHiddenElement("file",b))
}a.method="POST";
f.document.write("</body></html>");
f.document.close();
a.action="download";
a.submit()
}},getResultInfo:function(a){if(!a){return"error"
}else{if(a.substr(0,5)=="<?xml"){return"success"
}}return"error"
},getProcessName:function(c){var d=new DOMParser();
var b=d.parseFromString(c,"text/xml");
var a=b.documentElement.getAttribute("name");
return a
}};
ORYX.Plugins.TransformationDownloadDialog=Clazz.extend(ORYX.Plugins.TransformationDownloadDialog);