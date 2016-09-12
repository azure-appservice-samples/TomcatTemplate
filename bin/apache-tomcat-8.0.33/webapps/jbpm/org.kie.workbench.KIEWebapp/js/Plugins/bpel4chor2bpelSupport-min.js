if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPEL4Chor2BPELSupport=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.dialog2BPELSupport=new ORYX.Plugins.TransformationDownloadDialogForBPEL4Chor();
this.facade.offer({name:ORYX.I18N.BPEL4Chor2BPELSupport.exp,functionality:this.exportProcess.bind(this),group:ORYX.I18N.JSONSupport.exp.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/bpel4chor2bpel_export_icon.png",description:ORYX.I18N.BPEL4Chor2BPELSupport.expDesc,index:0,minShape:0,maxShape:0})
},exportProcess:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE});
window.setTimeout((function(){this.exportSynchronously();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}).bind(this),10);
return true
},exportSynchronously:function(){var c=location.href;
try{var b=this.getRDFFromDOM();
if(!b.startsWith("<?xml")){b='<?xml version="1.0" encoding="UTF-8"?>'+b
}new Ajax.Request(ORYX.CONFIG.BPEL4CHOR2BPEL_EXPORT_URL,{method:"POST",asynchronous:false,parameters:{resource:c,data:b},onSuccess:function(d){this.displayResult(d.responseText)
}.bind(this)})
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}},buildTransData:function(e,a){var d=new Array();
for(var c=0;
c<e.length;
c++){var b=this.dialog2BPELSupport.getBPELName(e[c]);
if(b==undefined){b="Process "+(c+1)
}d[c]=[b,e[c],this.dialog2BPELSupport.getResultInfo(e[c])]
}for(var c=0;
c<a.length;
c++){var b=this.dialog2BPELSupport.getBPELName(e[c]);
b=b+"-wsdl";
if(b==undefined){b="WSDL "+(c+1)
}d[c+e.length]=[b,a[c],this.dialog2BPELSupport.getResultInfo(a[c])]
}return d
},displayResult:function(result){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
var resultString="("+result+")";
var resultObject;
try{resultObject=eval(resultString)
}catch(e1){alert("Error during evaluation of result: "+e1+"\r\n"+resultString)
}if((!resultObject.res)||(resultObject.res.length==0)){this.dialog2BPELSupport.openMessageDialog(ORYX.I18N.TransformationDownloadDialog.error,ORYX.I18N.TransformationDownloadDialog.noResult)
}else{if(resultObject.res[0].contentBPEL.indexOf("Parser Error")>0){this.dialog2BPELSupport.openErrorDialog(resultObject.res[0].contentBPEL)
}else{var bpelArray=new Array();
var wsdlArray=new Array();
for(var i=0;
i<resultObject.res.length;
i++){bpelArray[i]=resultObject.res[i].contentBPEL;
wsdlArray[i]=resultObject.res[i].contentWSDL
}var data=this.buildTransData(bpelArray,wsdlArray);
this.dialog2BPELSupport.openResultDialog(data)
}}}});