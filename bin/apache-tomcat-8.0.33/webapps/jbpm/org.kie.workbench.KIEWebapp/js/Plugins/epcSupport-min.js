if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.EPCSupport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.EPCSupport.exp,functionality:this.exportEPC.bind(this),group:ORYX.I18N.EPCSupport.group,icon:ORYX.BASE_FILE_PATH+"images/epml_export_icon.png",description:ORYX.I18N.EPCSupport.expDesc,index:1,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.EPCSupport.imp,functionality:this.importEPC.bind(this),group:ORYX.I18N.EPCSupport.group,icon:ORYX.BASE_FILE_PATH+"images/epml_import_icon.png",description:ORYX.I18N.EPCSupport.impDesc,index:2,minShape:0,maxShape:0})
},importEPC:function(){this.openUploadDialog()
},exportEPC:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.EPCSupport.progressExp});
var b=new XMLSerializer();
var g="Oryx-EPC";
var d=DataManager.serializeDOM(this.facade);
d='<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:b3mn="http://b3mn.org/2007/b3mn" xmlns:ext="http://b3mn.org/2007/ext" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:atom="http://b3mn.org/2007/atom+xhtml"><head profile="http://purl.org/NET/erdf/profile"><link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" /><link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " /><link rel="schema.b3mn" href="http://b3mn.org" /><link rel="schema.oryx" href="http://oryx-editor.org/" /><link rel="schema.raziel" href="http://raziel.org/" /><base href="'+location.href.split("?")[0]+'" /></head><body>'+d+'<div id="generatedProcessInfos"><span class="oryx-id">'+g+'</span><span class="oryx-name">'+g+"</span></div></body></html>";
var h=ORYX.PATH+"/lib/extract-rdf.xsl";
var f;
rdfResult=this.transformString(d,h,true);
if(rdfResult instanceof String){f=rdfResult;
rdfResult=null
}else{f=b.serializeToString(rdfResult);
if(!f.startsWith("<?xml")){f='<?xml version="1.0" encoding="UTF-8"?>'+f
}}var c=ORYX.PATH+"/xslt/RDF2EPML.xslt";
var e=this.transformDOM(rdfResult,c,true);
var a;
if(e instanceof String){a=e;
e=null
}else{a=b.serializeToString(e);
if(!a.startsWith("<?xml")){a='<?xml version="1.0" encoding="UTF-8"?>'+a
}}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
this.openDownloadWindow(g+".epml",a)
},transformString:function(d,b,c){var e=new DOMParser();
var a=e.parseFromString(d,"text/xml");
return this.transformDOM(a,b,c)
},transformDOM:function(i,a,d){if(i==null){return new String("Parse Error: \nThe given dom content is null.")
}var b="";
source=ORYX.PATH+"lib/extract-rdf.xsl";
new Ajax.Request(source,{asynchronous:false,method:"get",onSuccess:function(k){b=k.responseText
}.bind(this),onFailure:(function(k){ORYX.Log.error("XSL load failed"+k)
}).bind(this)});
var j;
var g;
var e=new XSLTProcessor();
var h=new DOMParser();
var c=h.parseFromString(b,"text/xml");
e.importStylesheet(c);
try{j=e.transformToFragment(i,document)
}catch(f){return new String("Parse Error: "+f.name+"\n"+f.message)
}if(d){return j
}g=(new XMLSerializer()).serializeToString(j);
return g
},openUploadDialog:function(){var b=new Ext.form.FormPanel({frame:true,bodyStyle:"padding:5px;",defaultType:"textfield",labelAlign:"left",buttonAlign:"right",fileUpload:true,enctype:"multipart/form-data",items:[{text:ORYX.I18N.EPCSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{fieldLabel:ORYX.I18N.EPCSupport.file,inputType:"file",labelStyle:"width:50px;",itemCls:"ext_specific_window_overflow"}]});
var a=new Ext.Window({autoCreate:true,title:ORYX.I18N.EPCSupport.impPanel,height:"auto",width:"auto",modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,resizable:false,items:[b],buttons:[{text:ORYX.I18N.EPCSupport.impBtn,handler:function(){var c=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.EPCSupport.progressImp});
c.show();
b.form.submit({url:ORYX.PATH+"/epc-upload",success:function(e,d){a.hide();
var g=d.result;
g=g.startsWith("<?xml")?g:'<?xml version="1.0" encoding="utf-8"?><div>'+g+"</div>";
this.loadContent(g);
c.hide()
}.bind(this),failure:function(e,d){a.hide();
c.hide();
Ext.MessageBox.show({title:ORYX.I18N.EPCSupport.error,msg:d.response.responseText.substring(d.response.responseText.indexOf("content:'")+9,d.response.responseText.indexOf("'}")),buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}})
}.bind(this)},{text:ORYX.I18N.EPCSupport.close,handler:function(){a.hide()
}.bind(this)}]});
a.on("hide",function(){a.destroy(true);
delete a
});
a.show()
},createHiddenElement:function(a,b){var c=document.createElement("input");
c.name=a;
c.type="hidden";
c.value=b;
return c
},getFileName:function(b){var a=b.length;
if(a>5){if(b.substr(a-5,5)=="(AML)"){return b.substr(0,a-6)
}}return b
},openDownloadWindow:function(b,c){var d=window.open("");
if(d!=null){d.document.open();
d.document.write("<html><body>");
var a=d.document.createElement("form");
d.document.body.appendChild(a);
var b=this.getFileName(b);
a.appendChild(this.createHiddenElement("download",c));
a.appendChild(this.createHiddenElement("file",b));
a.method="POST";
d.document.write("</body></html>");
d.document.close();
a.action=ORYX.PATH+"/download";
a.submit()
}},loadContent:function(a){var c=new DOMParser();
var b=c.parseFromString(a,"text/xml");
this.facade.importERDF(b)
}});