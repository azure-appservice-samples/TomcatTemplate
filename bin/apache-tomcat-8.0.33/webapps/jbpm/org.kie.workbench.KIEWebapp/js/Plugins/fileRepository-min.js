if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Config.SignavioFileRepositoryModelHandler="/signavio/p/model/";
ORYX.Plugins.FileRepositorySave=Clazz.extend({facade:undefined,modelUri:window.location.hash.substring(1).strip()||undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.Save.save,functionality:this.save.bind(this,false),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk.png",description:ORYX.I18N.Save.saveDesc,index:1,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Save.saveAs,functionality:this.save.bind(this,true),group:ORYX.I18N.Save.group,icon:ORYX.BASE_FILE_PATH+"images/disk_multi.png",description:ORYX.I18N.Save.saveAsDesc,index:2,minShape:0,maxShape:0});
this.changeDifference=0;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_EXECUTE,function(){this.changeDifference++
});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS,function(){this.changeDifference++
});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_UNDO_ROLLBACK,function(){this.changeDifference--
});
window.onbeforeunload=function(){if(this.changeDifference>0){return ORYX.I18N.Save.unsavedData
}}.bind(this)
},saveAs:function(){return this.save(true)
},save:function(h){h=h||!this.modelUri;
var a=DataManager.serialize(this.facade.getCanvas().getSVGRepresentation(true));
var f=Ext.encode(this.facade.getJSON());
var i={name:"New Process",description:"",comment:"",namespace:this.facade.getStencilSets().values()[0].namespace(),json_xml:f,parent:undefined,svg_xml:a,type:this.facade.getStencilSets().values()[0].namespace()};
if(this.modelUri){var c=new Ajax.Request(ORYX.Config.SignavioFileRepositoryModelHandler+this.modelUri.replace(/^\/?/,"")+"/info",{method:"GET",asynchronous:false});
if(!c.transport||!c.transport.status==200){Ext.Msg.show({title:"Unable to load model data",msg:"The model does not seem to exist anymore or the model storage is unavailable. Remove the model-id (everything behind #) and try again.",buttons:Ext.MessageBox.OK});
return false
}var d=c.transport.responseText.evalJSON();
["name","description","comment","parent","type"].each(function(j){i[j]=d[j]||i[j]
})
}else{var g=Ext.urlDecode(location.search.substring(1))["directory"];
if(!g){Ext.Msg.show({title:"Parent Directory Missing",msg:"The model does not semm to be saved yet, however I can't find a parent diractory. Thus the model cannot be saved at all. My bad. :( \n PS: Your best shot is to try to export the model, create a new one, import andh hope for the best.",buttons:Ext.MessageBox.OK});
return false
}i.parent=g
}if(!h){this.submit(i,false);
return true
}var b=new Ext.XTemplate('<form class="oryx_repository_edit_model" action="#" id="edit_model" onsubmit="return false;">',"<fieldset>",'<p class="description">'+ORYX.I18N.Save.dialogDesciption+"</p>",'<input type="hidden" name="namespace" value="{namespace}" />','<p><label for="edit_model_title">'+ORYX.I18N.Save.dialogLabelTitle+'</label><input type="text" class="text" name="title" value="{name}" id="edit_model_title" onfocus="this.className = \'text activated\'" onblur="this.className = \'text\'"/></p>','<p><label for="edit_model_summary">'+ORYX.I18N.Save.dialogLabelDesc+'</label><textarea rows="5" name="summary" id="edit_model_summary" onfocus="this.className = \'activated\'" onblur="this.className = \'\'">{description}</textarea></p>','<p><label for="edit_model_type">'+ORYX.I18N.Save.dialogLabelType+'</label><input type="text" name="type" class="text disabled" value="{type}" disabled="disabled" id="edit_model_type" /></p>',"</fieldset>","</form>");
var e=new Ext.Window({width:"auto",height:"auto",title:(h?ORYX.I18N.Save.saveAsTitle:ORYX.I18N.Save.save),modal:true,bodyStyle:"background:#FFFFFF",html:b.apply(i),buttons:[{text:ORYX.I18N.Save.saveBtn,handler:function(){i.name=$("edit_model_title").value.strip();
i.description=$("edit_model_summary").value.strip();
this.submit(i,true);
e.close()
}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){e.close()
}}],listeners:{close:function(){e.close()
}}});
e.show();
return true
},submit:function(e,c){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.Save.saving});
if(c){new Ajax.Request(ORYX.Config.SignavioFileRepositoryModelHandler,{method:"POST",parameters:e,asynchronous:true,onSuccess:function d(f){this.modelUri=f.responseText.evalJSON()["href"].replace(/^\/?(model)?\/?/,"");
location.hash=this.modelUri;
this.changeDifference=0;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.Save.saved})
}.bind(this),onFailure:function b(){alert("fail")
}.bind(this),on403:function a(){alert("403")
}.bind(this)})
}else{new Ajax.Request(ORYX.Config.SignavioFileRepositoryModelHandler+this.modelUri,{method:"PUT",parameters:e,asynchronous:true,onSuccess:function d(f){this.changeDifference=0;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.Save.saved})
}.bind(this),onFailure:function b(){alert("fail")
}.bind(this),on403:function a(){alert("403")
}.bind(this)})
}}});
onOryxResourcesLoaded=function(){if(location.hash.slice(1).length==0||location.hash.slice(1).indexOf("new")!=-1){var a=ORYX.Utils.getParamFromUrl("stencilset")?ORYX.Utils.getParamFromUrl("stencilset"):"stencilsets/bpmn1.1/bpmn1.1.json";
new ORYX.Editor({id:"oryx-canvas123",stencilset:{url:ORYX.PATH+a}})
}else{ORYX.Editor.createByUrl(ORYX.Config.SignavioFileRepositoryModelHandler+location.hash.slice(1).replace(/^\/?/,"")+"/json",{id:"oryx-canvas123"})
}};