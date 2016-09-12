if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPEL4ChorSupport=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.dialogSupport=new ORYX.Plugins.TransformationDownloadDialog();
this.facade.offer({name:ORYX.I18N.BPEL4ChorSupport.exp,functionality:this.exportProcess.bind(this),group:ORYX.I18N.JSONSupport.exp.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/bpel4chor_export_icon.png",description:ORYX.I18N.BPEL4ChorSupport.expDesc,index:0,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.BPEL4ChorSupport.imp,functionality:this.importProcess.bind(this),group:ORYX.I18N.JSONSupport.imp.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/import.png",icon:ORYX.BASE_FILE_PATH+"images/bpel4chor_import_icon.png",description:ORYX.I18N.BPEL4ChorSupport.impDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return false
}})
},exportProcess:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this.exportSynchronously();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},exportSynchronously:function(){var c=location.href;
try{var b=this.getRDFFromDOM();
if(!b.startsWith("<?xml")){b='<?xml version="1.0" encoding="UTF-8"?>'+b
}new Ajax.Request(ORYX.CONFIG.BPEL4CHOR_EXPORT_URL,{method:"POST",asynchronous:false,parameters:{resource:c,data:b},onSuccess:function(d){this.displayResult(d.responseText)
}.bind(this)})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}},buildTransData:function(g,f,d){var e=[["topology",g,this.dialogSupport.getResultInfo(g)]];
var a=1;
if(f.indexOf("grounding")>0){e[1]=["grounding",f,this.dialogSupport.getResultInfo(f)];
a++
}for(var c=0;
c<d.length;
c++){var b=this.dialogSupport.getProcessName(d[c]);
if(b==undefined){b="Process "+(c+1)
}e[c+a]=[b,d[c],this.dialogSupport.getResultInfo(d[c])]
}return e
},displayResult:function(result){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
var resultString="("+result+")";
var resultObject;
try{resultObject=eval(resultString)
}catch(e1){alert("Error during evaluation of result: "+e1+"\r\n"+resultString)
}if((!resultObject.res)||(resultObject.res.length==0)){this.dialogSupport.openMessageDialog(ORYX.I18N.TransformationDownloadDialog.error,ORYX.I18N.TransformationDownloadDialog.noResult)
}else{if(resultObject.res[0].content.indexOf("Parser Error")>0){this.dialogSupport.openErrorDialog(resultObject.res[0].content)
}else{var topology=resultObject.res[0].content;
var grounding=resultObject.res[1].content;
var processes=new Array();
for(var i=2;
i<resultObject.res.length;
i++){processes[i-2]=resultObject.res[i].content
}var data=this.buildTransData(topology,grounding,processes);
this.dialogSupport.openResultDialog(data)
}}},importProcess:function(){this.openUploadDialog()
},openUploadDialog:function(){},loadERDF:function(a){var c=new DOMParser();
var b=c.parseFromString(a,"text/xml");
alert(a);
this.facade.importERDF(b)
}});