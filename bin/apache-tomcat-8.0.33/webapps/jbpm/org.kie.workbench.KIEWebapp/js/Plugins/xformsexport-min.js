if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.XFormsExport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.XFormsSerialization.exportXForms,functionality:this.exportXForms.bind(this),group:ORYX.I18N.XFormsSerialization.group,icon:ORYX.BASE_FILE_PATH+"images/xforms_export.png",description:ORYX.I18N.XFormsSerialization.exportXFormsDesc,index:2,minShape:0,maxShape:0})
},exportXForms:function(){this._showCssDialog()
},exportIt:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this.exportSynchronously(a);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},exportSynchronously:function(b){var d=location.href;
try{var c=this.getRDFFromDOM();
c=c.startsWith("<?xml")?c:'<?xml version="1.0" encoding="UTF-8"?>'+c;
new Ajax.Request(ORYX.CONFIG.XFORMS_EXPORT_URL,{method:"POST",asynchronous:false,parameters:{resource:d,data:c,css:b},onSuccess:function(e){var f=window.open("data:text/xml,"+e.responseText,"_blank","resizable=yes,width=640,height=480,toolbar=0,scrollbars=yes")
}})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}},checkClientXFormsSupport:function(){if(!clientSupportsXForms){var a=ORYX.I18N.XFormsSerialization.noClientXFormsSupportDesc;
var b=new Ext.Window({width:320,height:240,resizable:false,minimizable:false,modal:true,autoScroll:true,title:ORYX.I18N.XFormsSerialization.noClientXFormsSupport,html:a,buttons:[{text:ORYX.I18N.XFormsSerialization.ok,handler:function(){b.hide()
}}]});
b.show()
}},_showCssDialog:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.XFormsSerialization.selectCss,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -30"}]});
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.XFormsSerialization.expTitle,height:150,width:500,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.XFormsSerialization.ok,handler:function(){this.exportIt(c.items.items[1].getValue());
b.hide()
}.bind(this)},{text:ORYX.I18N.XFormsSerialization.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show()
}});