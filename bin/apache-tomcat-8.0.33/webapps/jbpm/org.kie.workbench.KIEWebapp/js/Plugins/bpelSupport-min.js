if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPELSupport=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,dialogSupport:undefined,construct:function(a){this.facade=a;
this.dialogSupport=new ORYX.Plugins.TransformationDownloadDialog();
this.facade.offer({name:ORYX.I18N.BPELSupport.exp,functionality:this.exportProcess.bind(this),group:ORYX.I18N.BPELSupport.group,icon:ORYX.BASE_FILE_PATH+"images/bpel_export_icon.png",description:ORYX.I18N.BPELSupport.expDesc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.BPELSupport.imp,functionality:this.importProcess.bind(this),group:ORYX.I18N.BPELSupport.group,icon:ORYX.BASE_FILE_PATH+"images/bpel_import_icon.png",description:ORYX.I18N.BPELSupport.impDesc,index:1,minShape:0,maxShape:0})
},exportProcess:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this.exportSynchronously();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},exportSynchronously:function(){var c=location.href;
try{var b=this.getRDFFromDOM();
if(!b.startsWith("<?xml")){b='<?xml version="1.0" encoding="UTF-8"?>'+b
}new Ajax.Request(ORYX.CONFIG.BPEL_EXPORT_URL,{method:"POST",asynchronous:false,parameters:{resource:c,data:b},onSuccess:function(d){this.displayResult(d.responseText)
}.bind(this)})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}},displayResult:function(result){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
var resultString="("+result+")";
var resultObject;
try{resultObject=eval(resultString)
}catch(e1){alert("Error during evaluation of result: "+e1+"\r\n"+resultString)
}if((!resultObject.res)||(resultObject.res.length==0)){this.dialogSupport.openMessageDialog(ORYX.I18N.TransformationDownloadDialog.error,ORYX.I18N.TransformationDownloadDialog.noResult)
}else{if(resultObject.res[0].success=="false"){this.dialogSupport.openErrorDialog(resultObject.res[0].content)
}else{var processes=new Array();
for(var i=0;
i<resultObject.res.length;
i++){processes[i]=resultObject.res[i].content
}var data=this.buildTransData(processes);
this.dialogSupport.openResultDialog(data)
}}},buildTransData:function(c){var d=[];
for(var b=0;
b<c.length;
b++){var a=this.dialogSupport.getProcessName(c[b]);
if(a==undefined){a="Process "+(b+1)
}d[b]=[a,c[b],this.dialogSupport.getResultInfo(c[b])]
}return d
},importProcess:function(){this.openUploadDialog()
},openUploadDialog:function(){var b=new Ext.form.FormPanel({frame:true,bodyStyle:"padding:5px;",defaultType:"textfield",labelAlign:"left",buttonAlign:"right",fileUpload:true,enctype:"multipart/form-data",items:[{text:ORYX.I18N.BPELSupport.selectFile,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{fieldLabel:ORYX.I18N.BPELSupport.file,inputType:"file",labelStyle:"width:50px;",itemCls:"ext_specific_window_overflow"}]});
var c=new Ext.form.FormPanel({frame:true,bodyStyle:"padding:5px;",defaultType:"textfield",labelAlign:"left",buttonAlign:"right",fileUpload:true,enctype:"multipart/form-data",items:[{text:ORYX.I18N.BPELSupport.content,style:"font-size:12px;margin-bottom:10px;display:block;",xtype:"label"},{xtype:"textarea",width:"160",height:"350",hideLabel:true,anchor:"100% -63"}]});
var a=new Ext.Window({autoCreate:true,title:ORYX.I18N.BPELSupport.impPanel,height:"auto",width:"auto",modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,resizable:false,items:[b,c],buttons:[{text:ORYX.I18N.BPELSupport.impBtn,handler:function(){var d=new Ext.LoadMask(Ext.getBody(),{msg:ORYX.I18N.BPELSupport.progressImp});
d.show();
b.form.submit({headers:{accept:"application/json, text/plain, text/html"},url:ORYX.PATH+"/bpelimporter",timeout:6,success:function(h,e){a.hide();
var g=e.result;
this.facade.importJSON(g.content,true);
this.facade.getCanvas().update();
d.hide()
}.bind(this),failure:function(g,e){a.hide();
d.hide();
Ext.MessageBox.show({title:ORYX.I18N.BPELSupport.error,msg:ORYX.I18N.BPELSupport.impFailed+e.response.responseText.substring(e.response.responseText.indexOf("content:'")+9,e.response.responseText.indexOf("'}")),buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}.bind(this)})
}.bind(this)},{text:ORYX.I18N.BPELSupport.close,handler:function(){a.hide()
}.bind(this)}]});
a.on("hide",function(){a.destroy(true);
delete a
});
a.show();
b.items.items[1].getEl().dom.addEventListener("change",function(d){var e=d.target.files[0].getAsBinary();
c.items.items[1].setValue(e)
},true)
},loadERDF:function(a){var c=new DOMParser();
var b=c.parseFromString(a,"text/xml");
this.facade.importERDF(b)
}});