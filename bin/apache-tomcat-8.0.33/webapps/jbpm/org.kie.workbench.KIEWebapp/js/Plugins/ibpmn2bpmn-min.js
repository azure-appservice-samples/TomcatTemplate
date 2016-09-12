if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.IBPMN2BPMN=Clazz.extend({facade:undefined,TransformServletURL:"./ibpmn2bpmn",construct:function(a){this.facade=a;
this.facade.offer({name:"Transform from iBPMN to BPMN",functionality:this.transform.bind(this),group:"Transform",icon:ORYX.BASE_FILE_PATH+"images/erdf_export_icon.png",description:"Transformation from iBPMN to BPMN",index:0,minShape:0,maxShape:0})
},transform:function(){this._showImportDialog()
},sendRequest:function(b,d,e,a){var c=false;
new Ajax.Request(b,{method:"POST",asynchronous:false,parameters:d,onSuccess:function(f){c=true;
if(e){e(f.responseText)
}}.bind(this),onFailure:function(f){if(a){a()
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.ERDFSupport.impFailed);
ORYX.log.warn("Transform failed: "+f.responseText)
}}.bind(this)});
return c
},transformToBPMN:function(d,n,h){var o=d;
o=o.startsWith("<?xml")?o:'<?xml version="1.0" encoding="utf-8"?>'+o+"";
var b=new DOMParser();
var m=b.parseFromString(o,"text/xml");
if(m.firstChild.tagName=="parsererror"){Ext.MessageBox.show({title:"Parse Error",msg:"The given RDF is not xml valid.",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});
if(h){h()
}}else{var k=function(q){q='<?xml version="1.0" encoding="utf-8"?><div>'+q+"</div>";
var r=new DOMParser();
var p=r.parseFromString(q,"text/xml");
this.facade.importERDF(p)
}.bind(this);
var f="";
source=ORYX.PATH+"lib/extract-rdf.xsl";
new Ajax.Request(source,{asynchronous:false,method:"get",onSuccess:function(e){f=e.responseText
}.bind(this),onFailure:(function(e){ORYX.Log.error("XSL load failed"+e)
}).bind(this)});
var b=new DOMParser();
var c=b.parseFromString(o,"text/xml");
var g=domParser.parseFromString(f,"text/xml");
var j=new XSLTProcessor();
j.importStylesheet(g);
try{var i=j.transformToFragment(c,document);
var a=(new XMLSerializer()).serializeToString(i);
if(!a.startsWith("<?xml")){a='<?xml version="1.0" encoding="UTF-8"?>'+a
}this.sendRequest(this.TransformServletURL,{data:a},k)
}catch(l){}if(n){n()
}}},_showImportDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.ERDFSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.ERDFSupport.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.ERDFSupport.impERDF,height:350,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.ERDFSupport.impBtn,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.ERDFSupport.impProgress});
d.show();
window.setTimeout(function(){var e=c.items.items[2].getValue();
this.transformToBPMN(e,function(){d.hide();
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
c.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsBinary();
c.items.items[2].setValue(e)
},true)
}});