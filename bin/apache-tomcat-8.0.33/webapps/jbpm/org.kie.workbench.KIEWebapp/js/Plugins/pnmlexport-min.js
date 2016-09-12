if(!ORYX.Plugins){ORYX.Plugins=new Object()
}function gup(b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var a="[\\?&]"+b+"=([^&#]*)";
var d=new RegExp(a);
var c=d.exec(window.location.href);
if(c==null){return""
}else{return c[1]
}}ORYX.Plugins.Pnmlexport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.Pnmlexport.name,functionality:this.exportIt.bind(this),group:ORYX.I18N.Pnmlexport.group,icon:ORYX.BASE_FILE_PATH+"images/bpmn2pn_deploy.png",description:ORYX.I18N.Pnmlexport.desc,index:2,minShape:0,maxShape:0})
},exportIt:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this.exportSynchronously();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},exportSynchronously:function(){var d=location.href;
try{var b=this.getRDFFromDOM();
var c=gup("resource");
new Ajax.Request(ORYX.CONFIG.PNML_EXPORT_URL,{method:"POST",asynchronous:false,parameters:{resource:d,data:b,title:c},onSuccess:function(g){var i=g.responseText;
if(i.indexOf("RDF to BPMN failed with Exception:")==0){alert(i)
}else{var f="http://"+location.host+ORYX.CONFIG.ROOT_PATH+i;
var e="<h2>"+ORYX.I18N.Pnmlexport.process+": "+self.document.title+'</h2><a target="_blank" href="'+f;
var h=new Ext.Window({width:320,height:240,resizable:false,minimizable:false,modal:true,autoScroll:true,title:ORYX.I18N.Pnmlexport.deploySuccess,html:e,buttons:[{text:Ext.MessageBox.buttonText.ok,handler:function(){h.hide()
}}]});
h.show()
}}})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
alert(a)
}}});