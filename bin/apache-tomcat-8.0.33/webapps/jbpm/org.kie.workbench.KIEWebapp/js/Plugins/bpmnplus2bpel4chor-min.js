if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Bpel4ChorTransformation=ORYX.Plugins.AbstractPlugin.extend({dialogSupport:undefined,construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.dialogSupport=new ORYX.Plugins.TransformationDownloadDialog();
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.Bpel4ChorTransformation.exportBPEL,functionality:this.transformBPEL4Chor.bind(this),group:ORYX.I18N.Bpel4ChorTransformation.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/export_multi.png",description:ORYX.I18N.Bpel4ChorTransformation.exportBPELDesc,index:1,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.Bpel4ChorTransformation.exportXPDL,functionality:this.transformXPDL4Chor.bind(this),group:ORYX.I18N.Bpel4ChorTransformation.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/export2.png",icon:ORYX.BASE_FILE_PATH+"images/export.png",description:ORYX.I18N.Bpel4ChorTransformation.exportXPDLDesc,index:0,minShape:0,maxShape:0});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.propertyChanged.bind(this))
},propertyChanged:function(b){var a=b.elements;
a.each(function(d){var k=d.getStencil();
if(b.propId=="oryx-name"){if((k.id()==k.namespace()+"ReceiveTask")||(k.id()==k.namespace()+"IntermediateMessageEvent")||(k.id()==k.namespace()+"StartMessageEvent")){var h=new Hash();
d.getIncomingShapes().each(function(j){if(j.getStencil().id()==j.getStencil().namespace()+"MessageFlow"){var i=j.getIncomingShapes();
i.each(function(m){m.getOutgoingShapes().each(function(n){if(n.getStencil().id()==n.getStencil().namespace()+"MessageFlow"){var o=h[m.resourceId];
if(o==undefined){o=new Array()
}o=o.concat(n.getOutgoingShapes());
h[m.resourceId]=o
}})
})
}});
var f=null;
var c=h.values();
for(var g=0;
g<c.length;
g++){var l=c[g];
for(var e=0;
e<l.length;
e++){var d=l[e];
if(f==undefined){f=l[e].properties["oryx-name"]
}else{if(f!=l[e].properties["oryx-name"]){this.dialogSupport.openMessageDialog(ORYX.I18N.Bpel4ChorTransformation.warning,ORYX.I18N.Bpel4ChorTransformation.wrongValue.replace(/1/,f));
return
}}}}}}else{if(b.propId=="oryx-looptype"){if(k.id()==k.namespace()+"ReceiveTask"){d.getIncomingShapes().each(function(j){if(j.getStencil().id()==j.getStencil().namespace()+"SequenceFlow"){var i=j.getIncomingShapes();
i.each(function(m){if(m.getStencil().id()==k.namespace()+"Exclusive_Eventbased_Gateway"){if(d.properties["oryx-looptype"]!="None"){this.dialogSupport.openMessageDialog(ORYX.I18N.Bpel4ChorTransformation.warning,ORYX.I18N.Bpel4ChorTransformation.loopNone);
return
}}})
}})
}}}})
},validate:function(){var a=this.facade.getCanvas().getChildEdges();
var e=true;
for(var c=0;
c<a.size();
c++){var d=a[c];
var b=d.getStencil().title();
var f=d.id;
if(d.getIncomingShapes().size()==0){this.showOverlay(d,ORYX.I18N.Bpel4ChorTransformation.noSource.replace(/1/,b).replace(/2/,f));
e=false
}else{if(d.getOutgoingShapes().size()==0){this.showOverlay(d,ORYX.I18N.Bpel4ChorTransformation.noTarget.replace(/1/,b).replace(/2/,f));
e=false
}}}return e
},addCanvasProperties:function(m){var d=this.facade.getCanvas();
var k=m.createAttribute("chor:TargetNamespace");
k.value=d.properties["oryx-targetNamespace"];
m.documentElement.setAttributeNode(k);
var a=m.createAttribute("Name");
a.value=d.properties["oryx-name"];
m.documentElement.setAttributeNode(a);
var g=m.createAttribute("Id");
var b=d.properties["oryx-id"];
if(b==""){b=DataManager.__provideId()
}g.value=b;
m.documentElement.setAttributeNode(g);
var e=m.createElement("xpdl:Created");
var j=document.createTextNode(d.properties["oryx-creationdate"]);
e.appendChild(j);
var l=m.documentElement.firstChild;
l.appendChild(e);
var n=d.properties["oryx-expressionlanguage"];
var i=d.properties["oryx-querylanguage"];
var f=m.createElement("xpdl:RedefinableHeader");
if(i!=""){var c=m.createAttribute("chor:QueryLanguage");
c.value=i;
f.setAttributeNode(c)
}if(n!=""){var h=m.createAttribute("chor:ExpressionLanguage");
h.value=n;
f.setAttributeNode(h)
}m.documentElement.insertBefore(f,m.documentElement.firstChild.nextSibling)
},buildXPDL4ChorData:function(a){var b=[["XPDL4Chor",a,this.dialogSupport.getResultInfo(a)]];
return b
},buildDisplayData:function(e){var g={data:[[]],errors:[[]]};
var a=0;
for(var d=0;
d<e.length;
d++){var b;
if(e[d].type=="PROCESS"){b=e[d].name
}else{b=e[d].type.toLowerCase()
}var k;
var f;
if(e[d].success){k="success";
f=e[d].document
}else{k="error";
f="";
for(var c=0;
c<e[d].errors.length;
c++){var h=e[d].errors[c];
f=f+h.message;
if(h.id){f=f+" ("+h.id+")"
}f=f+"\n";
g.errors[a]=h;
a++
}}g.data[d]=[b,f,k]
}if(a==0){g.errors=[]
}return g
},displayResult:function(result){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
var resultString="("+result+")";
var resultObject;
try{resultObject=eval(resultString)
}catch(e1){Ext.Msg.alert("Error during evaluation of result: "+e1+"\r\n"+resultString)
}var version=resultObject.version;
if(version!="1.0"){Ext.Msg.alert("Wrong version "+version+". Converting nevertheless.")
}if((!resultObject.res)||(resultObject.res.length==0)){this.dialogSupport.openMessageDialog(ORYX.I18N.TransformationDownloadDialog.error,ORYX.I18N.TransformationDownloadDialog.noResult)
}else{var displayData=this.buildDisplayData(resultObject.res);
displayData.errors.each(function(error){if(error.id=="undefined"){return
}sh=this.facade.getCanvas().getChildShapeByResourceId(error.id);
if(!sh){sh=this.facade.getCanvas().getChildShapes(true).find(function(shape){processId=shape.properties["oryx-processid"];
if(processId==""){return(shape.resourceId+"_process"==error.id)
}else{return(processId==error.id)
}})
}if(sh){this.showOverlay(sh,error.message)
}}.bind(this));
this.dialogSupport.openResultDialog(displayData.data)
}},transform:function(c){this.hideOverlays();
var a=this.validate();
if(!a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert("Transformation","input not valid");
return null
}var g="";
source=ORYX.PATH+"xslt/BPMNplus2XPDL4Chor.xslt";
new Ajax.Request(source,{asynchronous:false,method:"get",onSuccess:function(e){g=e.responseText
}.bind(this),onFailure:(function(e){ORYX.Log.error("XSL load failed"+e)
}).bind(this)});
var j=new XSLTProcessor();
var d=this.facade.getERDF();
var b=new DOMParser();
var i=b.parseFromString(g,"text/xml");
j.importStylesheet(i);
var o=b.parseFromString(d,"text/xml");
try{var n=j.transformToDocument(o,document)
}catch(m){this.dialogSupport.openMessageDialog(ORYX.I18N.Bpel4ChorTransformation.error,ORYX.I18N.Bpel4ChorTransformation.noGen.replace(/1/,m.name).replace(/2/,m.message));
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
return null
}this.addCanvasProperties(n);
var f=(new XMLSerializer()).serializeToString(n);
f=f.startsWith("<?xml")?f:'<?xml version="1.0" encoding="UTF-8"?>'+f;
if(c){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
var h=this.buildXPDL4ChorData(f);
this.dialogSupport.openResultDialog(h)
}else{var l="http://"+location.host+ORYX.CONFIG.XPDL4CHOR2BPEL4CHOR_TRANSFORMATION_URL;
try{Ext.Ajax.request({method:"POST",url:l,params:{data:f},success:function(e,p){this.displayResult(e.responseText)
}.bind(this)})
}catch(k){Ext.Msg.alert("Error during call of transformation: "+k)
}}},transformXPDL4Chor:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.Bpel4ChorTransformation.loadingXPDL4ChorExport});
this.transform(true)
},transformBPEL4Chor:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.Bpel4ChorTransformation.loadingBPEL4ChorExport});
this.transform(false)
},showOverlay:function(a,b){var d="syntaxchecker."+this.raisedEventIds.length;
var c=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{title:b,"stroke-width":5,stroke:"red",d:"M20,-5 L5,-20 M5,-5 L20,-20","line-captions":"round"}]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:d,shapes:[a],node:c,nodePosition:a instanceof ORYX.Core.Edge?"START":"NW"});
this.raisedEventIds.push(d)
},hideOverlays:function(){this.raisedEventIds.each(function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:a})
}.bind(this));
this.raisedEventIds=[]
},});