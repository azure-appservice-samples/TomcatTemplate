if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Save=Clazz.extend({facade:undefined,processURI:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.Save.save,functionality:this.save.bind(this,false),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.saveDesc,index:1,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Save.saveAs,functionality:this.save.bind(this,true),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk_multi.png",description:ORYX.I18N.Save.saveAsDesc,index:2,minShape:0,maxShape:0});
window.onbeforeunload=this.onUnLoad.bind(this);
this.changeDifference=0;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_EXECUTE,function(){this.changeDifference++
}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS,function(){this.changeDifference++
}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_ROLLBACK,function(){this.changeDifference--
}.bind(this))
},onUnLoad:function(){if(this.changeDifference!==0){return ORYX.I18N.Save.unsavedData
}},saveSynchronously:function(e){this.changeDifference=0;
var d="";
if(this.processURI){d=this.processURI
}else{if(!location.hash.slice(1)){d="/backend/poem/new"
}else{d="/backend/poem/"+(location.hash.slice(1).replace(/^\/?/,"").replace(/\/?$/,""))+"/self"
}}if(e){var c=this.facade.getStencilSets();
var h=c[c.keys()[0]].source().split("stencilsets")[1];
d="/backend/poem"+ORYX.CONFIG.ORYX_NEW_URL+"?stencilset=/stencilsets"+h
}var g=this.facade.getCanvas().getSVGRepresentation(true);
var f=DataManager.serialize(g);
this.serializedDOM=Ext.encode(this.facade.getJSON());
if(d.include(ORYX.CONFIG.ORYX_NEW_URL)){var c=this.facade.getStencilSets().values()[0];
var a={title:ORYX.I18N.Save.newProcess,summary:"",type:c.title(),url:d,namespace:c.namespace()};
var b=new Ext.XTemplate('<form class="oryx_repository_edit_model" action="#" id="edit_model" onsubmit="return false;">',"<fieldset>",'<p class="description">'+ORYX.I18N.Save.dialogDesciption+"</p>",'<input type="hidden" name="namespace" value="{namespace}" />','<p><label for="edit_model_title">'+ORYX.I18N.Save.dialogLabelTitle+'</label><input type="text" class="text" name="title" value="{title}" id="edit_model_title" onfocus="this.className = \'text activated\'" onblur="this.className = \'text\'"/></p>','<p><label for="edit_model_summary">'+ORYX.I18N.Save.dialogLabelDesc+'</label><textarea rows="5" name="summary" id="edit_model_summary" onfocus="this.className = \'activated\'" onblur="this.className = \'\'">{summary}</textarea></p>','<p><label for="edit_model_type">'+ORYX.I18N.Save.dialogLabelType+'</label><input type="text" name="type" class="text disabled" value="{type}" disabled="disabled" id="edit_model_type" /></p>',"</fieldset>","</form>");
callback=function(k){var l=k.elements.title.value.strip();
l=l.length==0?a.title:l;
window.document.title=l+" - Oryx";
var i=k.elements.summary.value.strip();
i=i.length==0?a.summary:i;
var j=k.elements.namespace.value.strip();
j=j.length==0?a.namespace:j;
win.destroy();
this.sendSaveRequest(d,{data:this.serializedDOM,svg:f,title:l,summary:i,type:j},e)
}.bind(this);
win=new Ext.Window({id:"Propertie_Window",width:"auto",height:"auto",title:e?ORYX.I18N.Save.saveAsTitle:ORYX.I18N.Save.save,modal:true,bodyStyle:"background:#FFFFFF",html:b.apply(a),buttons:[{text:ORYX.I18N.Save.saveBtn,handler:function(){callback($("edit_model"))
}},{text:ORYX.I18N.Save.close,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
win.destroy()
}.bind(this)}]});
win.show()
}else{this.sendSaveRequest(d,{data:this.serializedDOM,svg:f})
}},sendSaveRequest:function(a,c,b){new Ajax.Request(a,{method:"POST",asynchronous:false,parameters:c,onSuccess:(function(g){var f=g.getResponseHeader("location");
if(f){this.processURI=f
}else{this.processURI=a
}var e="/model"+this.processURI.split("model")[1].replace(/self\/?$/i,"");
location.hash="#"+e;
if(b){var d=new Ext.Window({title:ORYX.I18N.Save.savedAs,bodyStyle:"background:white;padding:10px",width:"auto",height:"auto",html:"<div style='font-weight:bold;margin-bottom:10px'>"+ORYX.I18N.Save.saveAsHint+"</div><span><a href='"+f+"' target='_blank'>"+f+"</a></span>",buttons:[{text:Ext.MessageBox.buttonText.ok,handler:function(){d.destroy()
}}]});
d.show()
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.Save.saved})
}).bind(this),onFailure:(function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.Save.failed);
ORYX.log.warn("Saving failed: "+d.responseText)
}).bind(this),on403:(function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.Save.noRights);
ORYX.log.warn("Saving failed: "+d.responseText)
}).bind(this)})
},save:function(a,b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.Save.saving});
window.setTimeout((function(){this.saveSynchronously(a)
}).bind(this),10);
return true
}});
ORYX.Plugins.File=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.File.print,functionality:this.print.bind(this),group:ORYX.I18N.File.group,icon:ORYX.BASE_FILE_PATH+"images/printer.png",description:ORYX.I18N.File.printDesc,index:3,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.File.pdf,functionality:this.exportPDF.bind(this),group:ORYX.I18N.File.group,icon:ORYX.BASE_FILE_PATH+"images/page_white_acrobat.png",description:ORYX.I18N.File.pdfDesc,index:4,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.File.info,functionality:this.info.bind(this),group:ORYX.I18N.File.group,icon:ORYX.BASE_FILE_PATH+"images/information.png",description:ORYX.I18N.File.infoDesc,index:5,minShape:0,maxShape:0})
},info:function(){var a='<iframe src="'+ORYX.CONFIG.LICENSE_URL+'" type="text/plain" style="border:none;display:block;width:575px;height:460px;"/>\n\n<pre style="display:inline;">Version: </pre><iframe src="'+ORYX.CONFIG.VERSION_URL+'" type="text/plain" style="border:none;overflow:hidden;display:inline;width:40px;height:20px;"/>';
this.infoBox=Ext.Msg.show({title:ORYX.I18N.Oryx.title,msg:a,width:640,maxWidth:640,maxHeight:480,buttons:Ext.MessageBox.OK});
return false
},exportPDF:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.File.genPDF});
var c=location.href;
var b=this.facade.getCanvas().getSVGRepresentation(true);
var a=DataManager.serialize(b);
new Ajax.Request(ORYX.CONFIG.PDF_EXPORT_URL,{method:"POST",parameters:{resource:c,data:a,format:"pdf"},onSuccess:(function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
window.open(d.responseText)
}).bind(this),onFailure:(function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.File.genPDFFailed)
}).bind(this)})
},print:function(){Ext.Msg.show({title:ORYX.I18N.File.printTitle,msg:ORYX.I18N.File.printMsg,buttons:Ext.Msg.YESNO,icon:Ext.MessageBox.QUESTION,fn:function(c){if(c=="yes"){var e=$H({width:300,height:400,toolbar:"no",status:"no",menubar:"yes",dependent:"yes",resizable:"yes",scrollbars:"yes"});
var f=window.open("","PrintWindow",e.invoke("join","=").join(","));
var b=f.document.getElementsByTagName("head")[0];
var d=document.createElement("style");
d.innerHTML=" body {padding:0px; margin:0px} .svgcontainer { display:none; }";
b.appendChild(d);
f.document.getElementsByTagName("body")[0].appendChild(this.facade.getCanvas().getSVGRepresentation());
var a=f.document.getElementsByTagName("body")[0].getElementsByTagName("svg")[0];
a.setAttributeNS(null,"width",1100);
a.setAttributeNS(null,"height",1400);
a.lastChild.setAttributeNS(null,"transform","scale(0.47, 0.47) rotate(270, 1510, 1470)");
var h=["marker-start","marker-mid","marker-end"];
var g=$A(f.document.getElementsByTagName("path"));
g.each(function(i){h.each(function(j){var k=i.getAttributeNS(null,j);
if(!k){return
}k="url(about:blank#"+k.slice(5);
i.setAttributeNS(null,j,k)
})
});
f.print();
return true
}}.bind(this)})
}});
window.onOryxResourcesLoaded=function(){if(location.hash.slice(1).length==0||location.hash.slice(1).indexOf("new")!=-1){var a=ORYX.Utils.getParamFromUrl("stencilset")||ORYX.CONFIG.SSET;
new ORYX.Editor({id:"oryx-canvas123",stencilset:{url:ORYX.PATH+a}})
}else{ORYX.Editor.createByUrl("/backend/poem"+location.hash.slice(1).replace(/\/*$/,"/").replace(/^\/*/,"/")+"json",{id:"oryx-canvas123",onFailure:function(b){if(403==b.status){Ext.Msg.show({title:"Authentication Failed",msg:'You may not have access rights for this model, maybe you forgot to <a href="'+ORYX.CONFIG.WEB_URL+'/backend/poem/repository">log in</a>?',icon:Ext.MessageBox.WARNING,closeable:false,closable:false})
}else{if(404==b.status){Ext.Msg.show({title:"Not Found",msg:"The model you requested could not be found.",icon:Ext.MessageBox.WARNING,closeable:false,closable:false})
}else{Ext.Msg.show({title:"Internal Error",msg:"We're sorry, the model cannot be loaded due to an internal error",icon:Ext.MessageBox.WARNING,closeable:false,closable:false})
}}}})
}};