if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.SimplePnmlexport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.SimplePnmlexport.name,functionality:this.exportIt.bind(this),group:ORYX.I18N.SimplePnmlexport.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/page_white_gear.png",description:ORYX.I18N.SimplePnmlexport.desc,index:1,minShape:0,maxShape:0})
},exportIt:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this.exportSynchronously();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},exportSynchronously:function(){var c=location.href;
try{var b=this.getRDFFromDOM();
if(!b.startsWith("<?xml")){b='<?xml version="1.0" encoding="UTF-8"?>'+b
}new Ajax.Request(ORYX.CONFIG.SIMPLE_PNML_EXPORT_URL,{method:"POST",asynchronous:false,parameters:{resource:c,data:b},onSuccess:function(d){this.openDownloadWindow(window.document.title+".xml",d.responseText)
}.bind(this)})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}}});