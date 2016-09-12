if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.View={facade:undefined,diffEditor:undefined,diffDialog:undefined,construct:function(b,a){this.facade=b;
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_GENERATE_IMAGE,this.showAsPNG.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_VIEW_SOURCE,this.showProcessBPMN.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDROP_END,this.refreshCanvasForIE.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHAPE_ADDED,this.refreshCanvasForIE.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_MOVE_FINISHED,this.refreshCanvasForIE.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.refreshCanvasForIE.bind(this));
this.zoomLevel=1;
this.maxFitToScreenLevel=1.5;
this.minZoomLevel=0.4;
this.maxZoomLevel=2;
this.diff=5;
if(a.properties){a.properties.each(function(c){if(c.zoomLevel){this.zoomLevel=Number(1)
}if(c.maxFitToScreenLevel){this.maxFitToScreenLevel=Number(c.maxFitToScreenLevel)
}if(c.minZoomLevel){this.minZoomLevel=Number(c.minZoomLevel)
}if(c.maxZoomLevel){this.maxZoomLevel=Number(c.maxZoomLevel)
}}.bind(this))
}this.facade.offer({name:ORYX.I18N.View.zoomIn,functionality:this.zoom.bind(this,[1+ORYX.CONFIG.ZOOM_OFFSET]),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/magnifier_zoom_in.png",description:ORYX.I18N.View.zoomInDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return this.zoomLevel<this.maxZoomLevel
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.zoomOut,functionality:this.zoom.bind(this,[1-ORYX.CONFIG.ZOOM_OFFSET]),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/magnifier_zoom_out.png",description:ORYX.I18N.View.zoomOutDesc,index:2,minShape:0,maxShape:0,isEnabled:function(){return this._checkSize()
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.zoomStandard,functionality:this.setAFixZoomLevel.bind(this,1),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/zoom_standard.png",cls:"icon-large",description:ORYX.I18N.View.zoomStandardDesc,index:3,minShape:0,maxShape:0,isEnabled:function(){return this.zoomLevel!=1
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.zoomFitToModel,functionality:this.zoomFitToModel.bind(this),group:ORYX.I18N.View.group,icon:ORYX.BASE_FILE_PATH+"images/image.png",description:ORYX.I18N.View.zoomFitToModelDesc,index:4,minShape:0,maxShape:0});
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.view.showFullScreen,functionality:function(c){var d=parent.document.getElementById(ORYX.EDITORID);
if(d.requestFullScreen){d.requestFullScreen()
}else{if(d.mozRequestFullScreen){d.mozRequestFullScreen()
}else{if(d.webkitRequestFullScreen){d.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.failShowFullScreen,title:""})
}}}}.bind(this),group:"fullscreengroup",icon:ORYX.BASE_FILE_PATH+"images/fullscreen.png",description:ORYX.I18N.view.showFullScreen_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.shareProcessImg,functionality:this.shareProcessImage.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.shareProcessImg_desc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.shareProcessPDF,functionality:this.shareProcessPdf.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.shareProcessPDF_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.importFromBPMN2,functionality:this.importFromBPMN2.bind(this),group:"importgroup",icon:ORYX.BASE_FILE_PATH+"images/import.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",description:ORYX.I18N.view.importFromBPMN2_desc,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.importFromJSON,functionality:this.importFromJSON.bind(this),group:"importgroup",icon:ORYX.BASE_FILE_PATH+"images/import.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",description:ORYX.I18N.view.importFromJSON_desc,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.downloadProcPDF,functionality:this.showAsPDF.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.downloadProcPDF_desc,index:4,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.downloadProcPNG,functionality:this.showAsPNG.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.downloadProcPNG_desc,index:3,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.downloadProcSVG,functionality:this.showAsSVG.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.downloadProcSVG_desc,index:5,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.view.viewProcSources,functionality:this.showProcessSources.bind(this),group:"sharegroup",icon:ORYX.BASE_FILE_PATH+"images/share.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/share.png",description:ORYX.I18N.view.viewProcSources_desc,index:6,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},setAFixZoomLevel:function(a){this.zoomLevel=a;
this._checkZoomLevelRange();
this.zoom(1)
},showInPopout:function(){uuidParamName="uuid";
uuidParamName=uuidParamName.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
regexS="[\\?&]"+uuidParamName+"=([^&#]*)";
regex=new RegExp(regexS);
uuidParams=regex.exec(window.location.href);
uuidParamValue=uuidParams[1];
window.open(ORYX.EXTERNAL_PROTOCOL+"://"+ORYX.EXTERNAL_HOST+"/"+ORYX.EXTERNAL_SUBDOMAIN+"/org.drools.guvnor.Guvnor/standaloneEditorServlet?assetsUUIDs="+uuidParamValue+"&client=oryx","Process Editor","status=0,toolbar=0,menubar=0,resizable=0,location=no,width=1400,height=1000")
},importFromBPMN2:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.FromBPMN2Support.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.FromBPMN2Support.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var d=ORYX.Utils.getDialogSize(350,500);
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.FromBPMN2Support.impBPMN2,height:d.height,width:d.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.FromBPMN2Support.impBtn,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.FromBPMN2Support.impProgress,title:""});
var f=c.items.items[1].getValue();
var e=false;
if(f===undefined||f.length<=0){e=true
}else{if(f.endsWith(".bpmn")||f.endsWith(".bpmn2")){e=true
}}if(e){var g=c.items.items[2].getValue();
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(h){if(h.responseText.length<1){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromBPMN2Error+ORYX.I18N.view.importFromBPMN2ErrorCheckLogs,title:""});
b.hide()
}else{try{this._loadJSON(h.responseText,"BPMN2")
}catch(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromBPMN2Error+"<p>"+i+"</p>",title:""})
}b.hide()
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromBPMN2Error+ORYX.I18N.view.importFromBPMN2ErrorCheckLogs,title:""});
b.hide()
}.createDelegate(this),params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),pp:ORYX.PREPROCESSING,bpmn2:g,transformto:"bpmn2json"}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Invalid file type. Must be .bpmn or .bpmn2",title:""})
}}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(f){var e=new FileReader();
e.onload=function(g){c.items.items[2].setValue(g.target.result)
};
e.readAsText(f.target.files[0],"UTF-8")
},true)
},importFromJSON:function(a){var c=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:50,defaultType:"textfield",items:[{text:ORYX.I18N.FromJSONSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",anchor:"100%",xtype:"label"},{fieldLabel:ORYX.I18N.FromJSONSupport.file,name:"subject",inputType:"file",style:"margin-bottom:10px;display:block;",itemCls:"ext_specific_window_overflow"},{xtype:"textarea",hideLabel:true,name:"msg",anchor:"100% -63"}]});
var d=ORYX.Utils.getDialogSize(350,500);
var b=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.FromJSONSupport.impBPMN2,height:d.height,width:d.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[c],buttons:[{text:ORYX.I18N.FromJSONSupport.impBtn,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.FromJSONSupport.impProgress,title:""});
var g=c.items.items[1].getValue();
var f=false;
if(g===undefined||g.length<=0){f=true
}else{if(g.endsWith(".json")){f=true
}}if(f){var h=c.items.items[2].getValue();
try{this._loadJSON(h,"JSON")
}catch(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.importFromJSONError+"\n"+i,title:""})
}b.hide()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Invalid file type. Must be .json",title:""})
}}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){b.hide()
}.bind(this)}]});
b.on("hide",function(){b.destroy(true);
delete b
});
b.show();
c.items.items[1].getEl().dom.addEventListener("change",function(f){var e=new FileReader();
e.onload=function(g){c.items.items[2].setValue(g.target.result)
};
e.readAsText(f.target.files[0],"UTF-8")
},true)
},shareEmbeddableProcess:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.creatingEmbeddableProc,title:""});
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(a){try{var b=new Ext.form.TextArea({id:"sharedEmbeddableArea",fieldLabel:ORYX.I18N.view.enbedableProc,width:400,height:250,value:a.responseText});
var d=new Ext.Window({width:400,id:"sharedEmbeddableURL",height:250,autoScroll:true,title:ORYX.I18N.view.enbedableProc,items:[b]});
d.show()
}catch(c){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.enbedableProcFailCreate+": "+c,title:""})
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.enbedableProcFailCreate+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),respaction:"showembeddable"}})
},shareProcessPdf:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.creatingProcPDF,title:""});
var c=ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true);
var d=DataManager.serialize(c);
var a=c.getAttributeNS(null,"height");
var b=c.getAttributeNS(null,"width");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(f){try{var j=ORYX.Utils.getDialogSize(250,400);
var g=new Ext.form.TextArea({id:"sharedPDFArea",fieldLabel:ORYX.I18N.view.processImgPDF,width:j.width,height:j.height,value:f.responseText});
var i=new Ext.Window({width:j.width,id:"sharedPDFURL",height:j.height,autoScroll:true,layout:"fit",title:ORYX.I18N.view.processPDFurl,items:[g]});
i.show()
}catch(h){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processPDFFail+": "+h,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processPDFFail+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),fsvg:Base64.encode(d),svgheight:a,svgwidth:b,transformto:"pdf",respaction:"showurl"}})
},shareProcessImage:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.processCreatingImg,title:""});
var c=ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true);
var d=DataManager.serialize(c);
var a=c.getAttributeNS(null,"height");
var b=c.getAttributeNS(null,"width");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(f){try{var j=ORYX.Utils.getDialogSize(250,400);
var g=new Ext.form.TextArea({id:"sharedImageArea",fieldLabel:ORYX.I18N.view.processImgUrl,width:j.width,height:j.height,value:f.responseText});
var i=new Ext.Window({width:j.width,id:"sharedImageURL",height:j.height,layout:"fit",autoScroll:true,title:ORYX.I18N.view.processImgUrl,items:[g]});
i.show()
}catch(h){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processImgFail+": "+h,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.processImgFail+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),fsvg:Base64.encode(d),transformto:"png",respaction:"showurl",svgheight:a,svgwidth:b}})
},shareProcess:function(){alert("sharing process")
},diffprocess:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.viewDiffLoadingVersions,title:""});
Ext.Ajax.request({url:ORYX.PATH+"processdiff",method:"POST",success:function(a){try{this._showProcessDiffDialog(a.responseText)
}catch(b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.versionsFail+":\n"+b,title:""})
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.versionsFail+".",title:""})
},params:{action:"versions",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
},_showProcessDiffDialog:function(g){var j=g.evalJSON();
var a=[];
var d=0;
for(var h in j){if(j.hasOwnProperty(h)){a.push(parseInt(h));
d++
}}if(d==0){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.versionsNotfound+".",title:"Diff"})
}else{a.sort(function(k,i){return k-i
});
var f=[];
for(var c=0;
c<a.length;
c++){f[c]=[a[c]+""]
}var b=new Ext.data.SimpleStore({fields:["name"],data:f});
var e=new Ext.form.ComboBox({fieldLabel:ORYX.I18N.view.versionsSelect,labelStyle:"width:180px",hiddenName:"version_name",emptyText:ORYX.I18N.view.versionsSelect+"...",store:b,displayField:"name",valueField:"name",mode:"local",typeAhead:true,triggerAction:"all",listeners:{select:{fn:function(l,k){var i=ORYX.EDITOR.getSerializedJSON();
Ext.Ajax.request({url:ORYX.PATH+"uuidRepository",method:"POST",success:function(m){try{var o=m.responseText;
Ext.Ajax.request({url:ORYX.PATH+"processdiff",method:"POST",success:function(q){try{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.view.creatingDiff+"...",title:""});
var u=q.responseText;
var p=new diff_match_patch();
p.Diff_Timeout=0;
var t=p.diff_main(u,o);
p.diff_cleanupSemantic(t);
var r=p.diff_prettyHtml(t);
this.diffDialog.remove(this.diffEditor,true);
this.diffEditor=new Ext.form.HtmlEditor({id:"diffeditor",value:r,enableSourceEdit:false,enableAlignments:false,enableColors:false,enableFont:false,enableFontSize:false,enableFormat:false,enableLinks:false,enableLists:false,autoScroll:true,width:520,height:310});
this.diffDialog.add(this.diffEditor);
this.diffDialog.doLayout()
}catch(s){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.failRetrieveVersionsSource+":"+s,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.failRetrieveVersionsSource+".",title:""})
}.bind(this),params:{action:"getversion",version:l.getValue(),profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
}catch(n){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+":"+n,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+".",title:""})
},params:{action:"toXML",pp:ORYX.PREPROCESSING,profile:ORYX.PROFILE,data:i}})
}.bind(this)}}});
this.diffEditor=new Ext.form.HtmlEditor({id:"diffeditor",value:"",enableSourceEdit:false,enableAlignments:false,enableColors:false,enableFont:false,enableFontSize:false,enableFormat:false,enableLinks:false,enableLists:false,autoScroll:true,width:520,height:310});
this.diffDialog=new Ext.Window({autoCreate:true,autoScroll:false,plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.view.compareBPMN2PReviousVersions,height:410,width:550,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[this.diffEditor],tbar:[e],buttons:[{text:ORYX.I18N.Save.close,handler:function(){this.diffDialog.hide()
}.bind(this)}]});
this.diffDialog.show();
this.diffDialog.doLayout()
}},_loadJSON:function(a,b){if(a){Ext.MessageBox.confirm("Import",ORYX.I18N.view.replaceExistingModel,function(c){if(c=="yes"){this.facade.setSelection(this.facade.getCanvas().getChildShapes(true));
var h=ORYX.EDITOR.getSerializedJSON();
var d=this.facade.getSelection();
var f=new ORYX.Plugins.Edit.ClipBoard();
f.refresh(d,this.getAllShapesToConsider(d,true));
var g=new ORYX.Plugins.Edit.DeleteCommand(f,this.facade);
this.facade.executeCommands([g]);
try{this.facade.importJSON(a);
ORYX.PROCESS_SAVED=false;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.view.importSuccess+" "+b,title:""})
}catch(e){this.facade.importJSON(h);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.unableImportProvided+" "+b,title:""})
}}else{try{this.facade.importJSON(a);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"success",msg:ORYX.I18N.view.importSuccess+" "+b,title:""})
}catch(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.unableImportProvided+" "+b,title:""})
}}}.bind(this))
}else{this._showErrorMessageBox(ORYX.I18N.Oryx.title,ORYX.I18N.jPDLSupport.impFailedJson)
}},getAllShapesToConsider:function(b,d){var a=[];
var c=[];
b.each(function(f){isChildShapeOfAnother=b.any(function(i){return i.hasChildShape(f)
});
if(isChildShapeOfAnother){return
}a.push(f);
if(f instanceof ORYX.Core.Node){var h=f.getOutgoingNodes();
h=h.findAll(function(i){return !b.include(i)
});
a=a.concat(h)
}c=c.concat(f.getChildShapes(true));
if(d&&!(f instanceof ORYX.Core.Edge)){var g=f.getIncomingShapes().concat(f.getOutgoingShapes());
g.each(function(i){if(i instanceof ORYX.Core.Edge&&i.properties["oryx-conditionexpression"]&&i.properties["oryx-conditionexpression"]!=""){return
}a.push(i)
}.bind(this))
}}.bind(this));
var e=this.facade.getCanvas().getChildEdges().select(function(f){if(a.include(f)){return false
}if(f.getAllDockedShapes().size()===0){return false
}return f.getAllDockedShapes().all(function(g){return g instanceof ORYX.Core.Edge||c.include(g)
})
});
a=a.concat(e);
return a
},_showErrorMessageBox:function(b,a){Ext.MessageBox.show({title:b,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
},showAsSVG:function(){var m=ORYX.EDITOR.getSerializedJSON();
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true));
var h=jsonPath(m.evalJSON(),"$.properties.processn");
var k=jsonPath(m.evalJSON(),"$.properties.package");
var i=jsonPath(m.evalJSON(),"$.properties.version");
var g="";
if(k&&k!=""){g+=k
}if(h&&h!=""){if(g!=""){g+="."
}g+=h
}if(i&&i!=""){if(g!=""){g+="."
}g+="v"+i
}if(g==""){g="processsvg"
}var b="post";
var c=document.createElement("form");
c.setAttribute("name","storetofileform");
c.setAttribute("method",b);
c.setAttribute("action",ORYX.PATH+"filestore");
c.setAttribute("target","_blank");
var l=document.createElement("input");
l.setAttribute("type","hidden");
l.setAttribute("name","fname");
l.setAttribute("value",g);
c.appendChild(l);
var e=document.createElement("input");
e.setAttribute("type","hidden");
e.setAttribute("name","fext");
e.setAttribute("value","svg");
c.appendChild(e);
var f=document.createElement("input");
f.setAttribute("type","hidden");
f.setAttribute("name","storeinrepo");
f.setAttribute("value","true");
c.appendChild(f);
var p=document.createElement("input");
p.setAttribute("type","hidden");
p.setAttribute("name","uuid");
p.setAttribute("value",ORYX.UUID);
c.appendChild(p);
var j=document.createElement("input");
j.setAttribute("type","hidden");
j.setAttribute("name","profile");
j.setAttribute("value",ORYX.PROFILE);
c.appendChild(j);
var m=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(m.evalJSON(),"$.properties.id");
var o=document.createElement("input");
o.setAttribute("type","hidden");
o.setAttribute("name","processid");
o.setAttribute("value",a);
c.appendChild(o);
var n=document.createElement("input");
n.setAttribute("type","hidden");
n.setAttribute("name","data_encoded");
n.setAttribute("value",Base64.encode(d));
c.appendChild(n);
document.body.appendChild(c);
c.submit()
},showAsPDF:function(){var k="pdf";
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true));
var b="post";
var c=document.createElement("form");
c.setAttribute("name","transformerform");
c.setAttribute("method",b);
c.setAttribute("action",ORYX.CONFIG.TRANSFORMER_URL());
c.setAttribute("target","_blank");
var h=document.createElement("input");
h.setAttribute("type","hidden");
h.setAttribute("name","fsvg");
h.setAttribute("value",Base64.encode(d));
c.appendChild(h);
var j=document.createElement("input");
j.setAttribute("type","hidden");
j.setAttribute("name","uuid");
j.setAttribute("value",ORYX.UUID);
c.appendChild(j);
var f=document.createElement("input");
f.setAttribute("type","hidden");
f.setAttribute("name","profile");
f.setAttribute("value",ORYX.PROFILE);
c.appendChild(f);
var e=document.createElement("input");
e.setAttribute("type","hidden");
e.setAttribute("name","transformto");
e.setAttribute("value",k);
c.appendChild(e);
var g=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(g.evalJSON(),"$.properties.id");
var i=document.createElement("input");
i.setAttribute("type","hidden");
i.setAttribute("name","processid");
i.setAttribute("value",a);
c.appendChild(i);
document.body.appendChild(c);
c.submit()
},showProcessSVG:function(){var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true));
var b=new Ext.form.TextArea({id:"svgSourceTextArea",fieldLabel:ORYX.I18N.view.processSVGSource,value:d,autoScroll:true});
var c=new Ext.Window({width:600,id:"processSVGSource",height:550,layout:"fit",title:ORYX.I18N.view.processSVGSource,items:[b],buttons:[{text:ORYX.I18N.Save.close,handler:function(){c.close();
c=null;
b=null;
a=null
}.bind(this)}]});
c.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var a=CodeMirror.fromTextArea(document.getElementById("svgSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
},showProcessERDF:function(){var d=ORYX.EDITOR.getERDF();
var b=new Ext.form.TextArea({id:"erdfSourceTextArea",fieldLabel:ORYX.I18N.view.erdfSource,value:d,autoScroll:true,height:"80%"});
var c=new Ext.Window({width:600,id:"processERDFSource",height:550,layout:"fit",title:ORYX.I18N.view.erdfSource,items:[b],buttons:[{text:ORYX.I18N.Save.close,handler:function(){c.close();
c=null;
b=null;
a=null
}.bind(this)}]});
c.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var a=CodeMirror.fromTextArea(document.getElementById("erdfSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
},showProcessJSON:function(){var b=ORYX.EDITOR.getSerializedJSON();
var c=new Ext.form.TextArea({id:"jsonSourceTextArea",fieldLabel:ORYX.I18N.view.jsonSource,value:b,autoScroll:true});
var d=new Ext.Window({width:600,id:"processJSONSource",height:550,layout:"fit",title:ORYX.I18N.view.jsonSource,items:[c],buttons:[{text:ORYX.I18N.Save.close,handler:function(){d.close();
d=null;
c=null;
a=null
}.bind(this)}]});
d.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
var a=CodeMirror.fromTextArea(document.getElementById("jsonSourceTextArea"),{mode:"application/json",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
},showProcessBPMN:function(){var a=ORYX.EDITOR.getSerializedJSON();
Ext.Ajax.request({url:ORYX.PATH+"uuidRepository",method:"POST",success:function(c){try{var d=new Ext.form.TextArea({id:"bpmnSourceTextArea",fieldLabel:ORYX.I18N.view.bpmn2Source,value:c.responseText,autoScroll:true});
var g=new Ext.Window({width:600,id:"processBPMNSource",height:550,layout:"fit",title:ORYX.I18N.view.bpmn2Source,items:[d],buttons:[{text:ORYX.I18N.view.saveToFile,handler:function(){var p=ORYX.EDITOR.getSerializedJSON();
var k=jsonPath(p.evalJSON(),"$.properties.processn");
var n=jsonPath(p.evalJSON(),"$.properties.package");
var l=jsonPath(p.evalJSON(),"$.properties.version");
var j="";
if(n&&n!=""){j+=n
}if(k&&k!=""){if(j!=""){j+="."
}j+=k
}if(l&&l!=""){if(j!=""){j+="."
}j+="v"+l
}if(j==""){j="processbpmn2"
}var m=d.getValue();
var e="post";
var h=document.createElement("form");
h.setAttribute("name","storetofileform");
h.setAttribute("method",e);
h.setAttribute("action",ORYX.PATH+"filestore");
h.setAttribute("target","_blank");
var o=document.createElement("input");
o.setAttribute("type","hidden");
o.setAttribute("name","fname");
o.setAttribute("value",j);
h.appendChild(o);
var i=document.createElement("input");
i.setAttribute("type","hidden");
i.setAttribute("name","fext");
i.setAttribute("value","bpmn2");
h.appendChild(i);
var q=document.createElement("input");
q.setAttribute("type","hidden");
q.setAttribute("name","data");
q.setAttribute("value",m);
h.appendChild(q);
document.body.appendChild(h);
h.submit()
}},{text:ORYX.I18N.Save.close,handler:function(){g.close();
g=null;
d=null;
b=null
}.bind(this)}]});
g.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var b=CodeMirror.fromTextArea(document.getElementById("bpmnSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
}catch(f){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+":"+f,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+".",title:""})
},params:{action:"toXML",pp:ORYX.PREPROCESSING,profile:ORYX.PROFILE,data:a}})
},showProcessSources:function(){var a=ORYX.EDITOR.getSerializedJSON();
var c=ORYX.EDITOR.getERDF();
var b=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true));
Ext.Ajax.request({url:ORYX.PATH+"uuidRepository",method:"POST",success:function(k){try{var g=new Ext.form.TextArea({id:"bpmnSourceTextArea",fieldLabel:"BPMN2",value:k.responseText,autoScroll:true});
var q=new Ext.Panel({title:"BPMN2",layout:"fit",border:false,items:[g],style:"padding-bottom:20px",listeners:{afterlayout:function(e){this.bpmn2FoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var s=CodeMirror.fromTextArea(document.getElementById("bpmnSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.bpmn2FoldFunc})
}}});
var r=new Ext.form.TextArea({id:"jsonSourceTextArea",fieldLabel:"JSON",value:a,autoScroll:true});
var i=new Ext.Panel({title:"JSON",layout:"fit",border:false,items:[r],style:"padding-bottom:20px",listeners:{afterlayout:function(s){this.jsonFoldFunc=CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
var e=CodeMirror.fromTextArea(document.getElementById("jsonSourceTextArea"),{mode:"application/json",lineNumbers:true,lineWrapping:true,onGutterClick:this.jsonFoldFunc})
}}});
var d=new Ext.form.TextArea({id:"erdfSourceTextArea",fieldLabel:"ERDF",value:c,autoScroll:true});
var p=new Ext.Panel({title:"ERDF",layout:"fit",border:false,items:[d],style:"padding-bottom:20px",listeners:{afterlayout:function(s){this.erdfFoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var e=CodeMirror.fromTextArea(document.getElementById("erdfSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.erdfFoldFunc})
}}});
var j=new Ext.form.TextArea({id:"svgSourceTextArea",fieldLabel:"SVG",value:b,autoScroll:true});
var m=new Ext.Panel({title:"SVG",layout:"fit",border:false,items:[j],style:"padding-bottom:10px",listeners:{afterlayout:function(s){this.svgFoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var e=CodeMirror.fromTextArea(document.getElementById("svgSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.svgFoldFunc})
}}});
var h=new Ext.TabPanel({activeTab:0,border:false,width:"100%",height:"100%",tabPosition:"top",layoutOnTabChange:true,deferredRender:false,defaults:{autoHeight:true,autoScroll:true},items:[q,i,m,p]});
var n=new Ext.Button({text:ORYX.I18N.view.downloadBPMN2,handler:function(){var A=ORYX.EDITOR.getSerializedJSON();
var v=jsonPath(A.evalJSON(),"$.properties.processn");
var y=jsonPath(A.evalJSON(),"$.properties.package");
var w=jsonPath(A.evalJSON(),"$.properties.version");
var u="";
if(y&&y!=""){u+=y
}if(v&&v!=""){if(u!=""){u+="."
}u+=v
}if(w&&w!=""){if(u!=""){u+="."
}u+="v"+w
}if(u==""){u="processbpmn2"
}var x=k.responseText;
var e="post";
var s=document.createElement("form");
s.setAttribute("name","storetofileform");
s.setAttribute("method",e);
s.setAttribute("action",ORYX.PATH+"filestore");
s.setAttribute("target","_blank");
var z=document.createElement("input");
z.setAttribute("type","hidden");
z.setAttribute("name","fname");
z.setAttribute("value",u);
s.appendChild(z);
var t=document.createElement("input");
t.setAttribute("type","hidden");
t.setAttribute("name","fext");
t.setAttribute("value","bpmn2");
s.appendChild(t);
var B=document.createElement("input");
B.setAttribute("type","hidden");
B.setAttribute("name","data");
B.setAttribute("value",x);
s.appendChild(B);
document.body.appendChild(s);
s.submit()
}});
var f=ORYX.Utils.getDialogSize(550,600);
if(this.sourcewin!=null&&this.sourcewin!==undefined){this.sourcewin.destroy()
}this.sourcewin=new Ext.Window({id:"processSources",height:f.height,width:f.width,layout:"fit",title:ORYX.I18N.view.processSources,items:[h],tbar:[n],listeners:{hide:function(){this.sourcewin.destroy()
}.bind(this)}});
this.sourcewin.show();
this.bpmn2FoldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var l=CodeMirror.fromTextArea(document.getElementById("bpmnSourceTextArea"),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.bpmn2FoldFunc})
}catch(o){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+":"+o,title:""})
}}.createDelegate(this),failure:function(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.view.convertingToBPMN2Fail+".",title:""})
},params:{action:"toXML",pp:ORYX.PREPROCESSING,profile:ORYX.PROFILE,data:a}})
},showAsPNG:function(){var k="png";
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true));
var b="post";
var c=document.createElement("form");
c.setAttribute("name","transformerform");
c.setAttribute("method",b);
c.setAttribute("action",ORYX.CONFIG.TRANSFORMER_URL());
c.setAttribute("target","_blank");
var h=document.createElement("input");
h.setAttribute("type","hidden");
h.setAttribute("name","fsvg");
h.setAttribute("value",Base64.encode(d));
c.appendChild(h);
var j=document.createElement("input");
j.setAttribute("type","hidden");
j.setAttribute("name","uuid");
j.setAttribute("value",ORYX.UUID);
c.appendChild(j);
var f=document.createElement("input");
f.setAttribute("type","hidden");
f.setAttribute("name","profile");
f.setAttribute("value",ORYX.PROFILE);
c.appendChild(f);
var e=document.createElement("input");
e.setAttribute("type","hidden");
e.setAttribute("name","transformto");
e.setAttribute("value",k);
c.appendChild(e);
var g=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(g.evalJSON(),"$.properties.id");
var i=document.createElement("input");
i.setAttribute("type","hidden");
i.setAttribute("name","processid");
i.setAttribute("value",a);
c.appendChild(i);
document.body.appendChild(c);
c.submit()
},zoom:function(d){this.zoomLevel*=d;
var h=this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
var c=this.facade.getCanvas();
var g=c.bounds.width()*this.zoomLevel;
var a=c.bounds.height()*this.zoomLevel;
var f=(c.node.parentNode.parentNode.parentNode.offsetHeight-a)/2;
f=f>20?f-20:0;
c.node.parentNode.parentNode.style.marginTop=f+"px";
f+=5;
c.getHTMLContainer().style.top=f+"px";
var b=h.scrollTop-Math.round((c.getHTMLContainer().parentNode.getHeight()-a)/2)+this.diff;
var e=h.scrollLeft-Math.round((c.getHTMLContainer().parentNode.getWidth()-g)/2)+this.diff;
c.setSize({width:g,height:a},true);
c.node.setAttributeNS(null,"transform","scale("+this.zoomLevel+")");
this.facade.updateSelection();
h.scrollTop=b;
h.scrollLeft=e;
c.zoomLevel=this.zoomLevel
},zoomFitToModel:function(){var h=this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
var b=h.getHeight()-30;
var d=h.getWidth()-30;
var c=this.facade.getCanvas().getChildShapes();
if(!c||c.length<1){return false
}var g=c[0].absoluteBounds().clone();
c.each(function(i){g.include(i.absoluteBounds().clone())
});
var f=d/g.width();
var a=b/g.height();
var e=a<f?a:f;
if(e>this.maxFitToScreenLevel){e=this.maxFitToScreenLevel
}this.setAFixZoomLevel(e);
h.scrollTop=Math.round(g.upperLeft().y*this.zoomLevel)-5;
h.scrollLeft=Math.round(g.upperLeft().x*this.zoomLevel)-5
},_checkSize:function(){var a=this.facade.getCanvas().getHTMLContainer().parentNode;
var b=Math.min((a.parentNode.getWidth()/a.getWidth()),(a.parentNode.getHeight()/a.getHeight()));
return 0.7>b
},_checkZoomLevelRange:function(){if(this.zoomLevel<this.minZoomLevel){this.zoomLevel=this.minZoomLevel
}if(this.zoomLevel>this.maxZoomLevel){this.zoomLevel=this.maxZoomLevel
}},refreshCanvasForIE:function(b){if((Object.hasOwnProperty.call(window,"ActiveXObject")&&!window.ActiveXObject)||(navigator.appVersion.indexOf("MSIE 10")!==-1)){if(!b.shape){var c=this.facade.getSelection();
if(c&&c.length>0&&c[0] instanceof ORYX.Core.Node){var a=c[0];
a.properties["oryx-invisid"]=Math.random();
b.shape=a
}}var h=ORYX.EDITOR.getSerializedJSON();
this.facade.setSelection(this.facade.getCanvas().getChildShapes(true));
var d=this.facade.getSelection();
var e=new ORYX.Plugins.Edit.ClipBoard();
e.refresh(d,this.getAllShapesToConsider(d,true));
var g=new ORYX.Plugins.Edit.DeleteCommand(e,this.facade);
this.facade.executeCommands([g]);
this.facade.importJSON(h);
var f=false;
f=this.findSelectedShape(b.shape,b);
if(f){this.facade.setSelection([f])
}else{this.facade.setSelection([])
}}},findSelectedShape:function(a,b){var c=false;
if(b&&b.shape){ORYX.EDITOR._canvas.getChildren().each((function(d){if(d instanceof ORYX.Core.Node||d instanceof ORYX.Core.Edge){if(b.shape.properties["oryx-invisid"]==d.properties["oryx-invisid"]){c=d
}}}).bind(this))
}return c
}};
ORYX.Plugins.View=Clazz.extend(ORYX.Plugins.View);