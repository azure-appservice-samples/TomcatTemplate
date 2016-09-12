if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.XFormsExportOrbeon=ORYX.Plugins.AbstractPlugin.extend({CSS_URL:ORYX.PATH+"/css/xforms_default.css",facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:"Run XForm with Orbeon",functionality:this.exportIt.bind(this),group:ORYX.I18N.XFormsSerialization.group,icon:ORYX.BASE_FILE_PATH+"images/xforms_orbeon_export.png",description:"XForms export for Orbeon",index:1,minShape:0,maxShape:0})
},exportIt:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this.exportSynchronously();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},exportSynchronously:function(){var c=location.href;
try{var b=this.getRDFFromDOM();
b=b.startsWith("<?xml")?b:'<?xml version="1.0" encoding="UTF-8"?>'+b;
new Ajax.Request(ORYX.CONFIG.XFORMS_EXPORT_ORBEON_URL,{method:"POST",asynchronous:false,parameters:{resource:c,data:b,css:this.CSS_URL},onSuccess:function(d){var e=window.open("");
e.document.write(d.responseText)
},onFailure:function(d){var e=window.open("");
e.document.write(d.responseText)
}})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}},checkClientXFormsSupport:function(){if(!clientSupportsXForms){var a=ORYX.I18N.XFormsSerialization.noClientXFormsSupportDesc;
var b=new Ext.Window({width:320,height:240,resizable:false,minimizable:false,modal:true,autoScroll:true,title:ORYX.I18N.XFormsSerialization.noClientXFormsSupport,html:a,buttons:[{text:ORYX.I18N.XFormsSerialization.ok,handler:function(){b.hide()
}}]});
b.show()
}}});