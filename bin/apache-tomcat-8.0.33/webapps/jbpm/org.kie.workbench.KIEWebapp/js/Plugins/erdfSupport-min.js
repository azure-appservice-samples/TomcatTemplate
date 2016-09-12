if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ERDFSupport=Clazz.extend({facade:undefined,ERDFServletURL:"/erdfsupport",construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.ERDFSupport.exp,functionality:this.exportERDF.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/erdf_export_icon.png",description:ORYX.I18N.ERDFSupport.expDesc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.ERDFSupport.imp,functionality:this.importERDF.bind(this),group:"Export",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/erdf_import_icon.png",description:ORYX.I18N.ERDFSupport.impDesc,index:1,minShape:0,maxShape:0})
},importERDF:function(){this._showImportDialog()
},exportERDF:function(){Ext.Msg.show({title:ORYX.I18N.ERDFSupport.deprTitle,msg:ORYX.I18N.ERDFSupport.deprText,buttons:Ext.Msg.YESNO,fn:function(b){if(b==="yes"){var a=this.facade.getERDF();
this.openDownloadWindow(window.document.title+".xml",a)
}}.bind(this),icon:Ext.MessageBox.WARNING})
},sendRequest:function(b,d,e,a){var c=false;
new Ajax.Request(b,{method:"POST",asynchronous:false,parameters:d,onSuccess:function(f){c=true;
if(e){e(f.result)
}}.bind(this),onFailure:function(f){if(a){a()
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.ERDFSupport.impFailed);
ORYX.log.warn("Import ERDF failed: "+f.responseText)
}}.bind(this)});
return c
},loadERDF:function(b,e,a){var c=b;
c=c.startsWith("<?xml")?c:'<?xml version="1.0" encoding="utf-8"?>'+c+"";
var f=new DOMParser();
var d=f.parseFromString(c,"text/xml");
if(d.firstChild.tagName=="parsererror"){Ext.MessageBox.show({title:ORYX.I18N.ERDFSupport.error,msg:ORYX.I18N.ERDFSupport.impFailed2+d.firstChild.textContent.escapeHTML(),buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});
if(a){a()
}}else{if(!this.hasStencilSet(d)){if(a){a()
}}else{this.facade.importERDF(d);
if(e){e()
}}}},hasStencilSet:function(e){var a=function(f,g){return $A(f.getElementsByTagName("div")).findAll(function(h){return $A(h.attributes).any(function(i){return i.nodeName=="class"&&i.nodeValue==g
})
})
};
var b=a(e,"-oryx-canvas")[0];
if(!b){this.throwWarning(ORYX.I18N.ERDFSupport.noCanvas);
return false
}var c=$A(b.getElementsByTagName("a")).find(function(f){return f.getAttribute("rel")=="oryx-stencilset"
});
if(!c){this.throwWarning(ORYX.I18N.ERDFSupport.noSS);
return false
}var d=c.getAttribute("href").split("/");
d=d[d.length-2]+"/"+d[d.length-1];
return true
},throwWarning:function(a){Ext.MessageBox.show({title:ORYX.I18N.Oryx.title,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})
},openXMLWindow:function(a){var b=window.open("data:application/xml,"+encodeURIComponent(a),"_blank","resizable=yes,width=600,height=600,toolbar=0,scrollbars=yes")
},openDownloadWindow:function(b,c){var d=window.open("");
if(d!=null){d.document.open();
d.document.write("<html><body>");
var a=d.document.createElement("form");
d.document.body.appendChild(a);
a.appendChild(this.createHiddenElement("download",c));
a.appendChild(this.createHiddenElement("file",b));
a.method="POST";
d.document.write("</body></html>");
d.document.close();
a.action=ORYX.PATH+"/download";
a.submit()
}},createHiddenElement:function(a,b){var c=document.createElement("input");
c.name=a;
c.type="hidden";
c.value=b;
return c
},_showImportDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.ERDFSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.ERDFSupport.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.ERDFSupport.impERDF,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.ERDFSupport.impBtn,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.ERDFSupport.impProgress});
d.show();
window.setTimeout(function(){var e=c.items.items[2].getValue();
this.loadERDF(e,function(){d.hide();
b.hide()
}.bind(this),function(){d.hide()
}.bind(this))
}.bind(this),100)
}.bind(this)},{text:ORYX.I18N.ERDFSupport.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsText("UTF-8");
c.items.items[2].setValue(e)
},true)
}});