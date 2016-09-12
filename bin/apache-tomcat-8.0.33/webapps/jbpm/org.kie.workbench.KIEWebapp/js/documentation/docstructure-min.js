if(!String.prototype.startsWith){String.prototype.startsWith=function(b,a){a=a||0;
return this.indexOf(b,a)===a
}
}var elementDataInfo={UserTask:{group:"Tasks",groupdispname:"Tasks",dispname:"User Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/swimlane/process.participant.png",properties:"name,documentation,datainputset,dataoutputset,assignments,isasync,taskname,actors,groupid,subject,description,skippable,content,createdby,locale,multipleinstance,notifications,priority,reassignment"},SendTask:{group:"Tasks",groupdispname:"Tasks",dispname:"Send Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",properties:"name,documentation,datainputset,dataoutputset,assignments,isasync,taskname,messageref,description,skippable,multipleinstance"},ReceiveTask:{group:"Tasks",groupdispname:"Tasks",dispname:"Receive Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",properties:"name,documentation,datainputset,dataoutputset,assignments,isasync,messageref"},ManualTask:{group:"Tasks",groupdispname:"Tasks",dispname:"Manual Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",properties:"name,documentation,isasync,skippable,datainputset,dataoutputset,assignments,multipleinstance,"},ServiceTask:{group:"Tasks",groupdispname:"Tasks",dispname:"Service Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",properties:"name,documentation,isasync,skippable,serviceoperation,serviceinterface,serviceimplementation,datainputset,dataoutputset,assignments,multipleinstance"},BusinessRuleTask:{group:"Tasks",groupdispname:"Tasks",dispname:"Business Rule Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",properties:"name,documentation,isasync,ruleflowgroup,datainputset,dataoutputset,assignments"},ScriptTask:{group:"Tasks",groupdispname:"Tasks",dispname:"Script Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",properties:"name,documentation,isasync,script,script_language"},Task:{group:"Tasks",groupdispname:"Tasks",dispname:"Task",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/task.png",properties:"name,documentation,isasync,taskname,description,skippable"},WorkItem:{group:"WorkItems",groupdispname:"Work Items",dispname:"Work Item",groupicon:"images/servicenode.png",icon:"images/servicenode.png",properties:"name,documentation,datainputset,dataoutputset,assignments,isasync,taskname,description"},ReusableSubprocess:{group:"Subprocesses",groupdispname:"Subprocesses",dispname:"Reusable Subprocess",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",properties:"name,documentation,calledelement,datainputset,dataoutputset,assignments,independent,isasync,waitforcompletion"},MultipleInstanceSubprocess:{group:"Subprocesses",groupdispname:"Subprocesses",dispname:"Multiple Instance Subprocess",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",properties:"name,documentation,multipleinstancecollectioninput,multipleinstancecollectionoutput,multipleinstancedatainput,multipleinstancedataoutput,multipleinstancecompletioncondition,vardefs,isasync"},Subprocess:{group:"Subprocesses",groupdispname:"Subprocesses",dispname:"Embedded Subprocess",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",properties:"name,documentation,vardefs,isasync"},AdHocSubprocess:{group:"Subprocesses",groupdispname:"Subprocesses",dispname:"Ad-Hoc Subprocess",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",properties:"name,documentation,adhocordering,adhoccompletioncondition,adhoccancelremaininginstances,vardefs,isasync"},EventSubprocess:{group:"Subprocesses",groupdispname:"Subprocesses",dispname:"Event Subprocess",groupicon:"stencilsets/bpmn2.0jbpm/icons/activity/subprocess.png",icon:"stencilsets/bpmn2.0jbpm/icons/activity/event.subprocess.png",properties:"name,documentation,vardefs,isasync"},Exclusive_Databased_Gateway:{group:"Gateways",groupdispname:"Gateways",dispname:"Exclusive Databased Gateway",groupicon:"stencilsets/bpmn2.0jbpm/icons/gateway/parallel.png",icon:"stencilsets/bpmn2.0jbpm/icons/gateway/exclusive.databased.png",properties:"name,documentation,defaultgate"},EventbasedGateway:{group:"Gateways",groupdispname:"Gateways",dispname:"Event-Based Gateway",groupicon:"stencilsets/bpmn2.0jbpm/icons/gateway/parallel.png",icon:"stencilsets/bpmn2.0jbpm/icons/gateway/eventbased.png",properties:"name,documentation,eventtype"},ParallelGateway:{group:"Gateways",groupdispname:"Gateways",dispname:"Parallel Gateway",groupicon:"stencilsets/bpmn2.0jbpm/icons/gateway/parallel.png",icon:"stencilsets/bpmn2.0jbpm/icons/gateway/parallel.png",properties:"name,documentation"},InclusiveGateway:{group:"Gateways",groupdispname:"Gateways",dispname:"Inclusive Gateway",groupicon:"stencilsets/bpmn2.0jbpm/icons/gateway/parallel.png",icon:"stencilsets/bpmn2.0jbpm/icons/gateway/inclusive.png",properties:"name,documentation,defaultgate"},Lane:{group:"Lanes",groupdispname:"Lanes",dispname:"Swimlane",groupicon:"stencilsets/bpmn2.0jbpm/icons/swimlane/lane.png",icon:"stencilsets/bpmn2.0jbpm/icons/swimlane/lane.png",properties:"name,documentation"},Group:{group:"Artifacts",groupdispname:"Artifacts",dispname:"Group",groupicon:"stencilsets/bpmn2.0jbpm/icons/artifact/group.png",icon:"stencilsets/bpmn2.0jbpm/icons/artifact/group.png",properties:"name,documentation"},TextAnnotation:{group:"Artifacts",groupdispname:"Artifacts",dispname:"Text Annotation",groupicon:"stencilsets/bpmn2.0jbpm/icons/artifact/group.png",icon:"stencilsets/bpmn2.0jbpm/icons/artifact/text.annotation.png",properties:"name,documentation"},DataObject:{group:"DataObjects",groupdispname:"Data Objects",dispname:"Data Object",groupicon:"stencilsets/bpmn2.0jbpm/icons/dataobject/data.object.png",icon:"stencilsets/bpmn2.0jbpm/icons/dataobject/data.object.png",properties:"name,documentation"},StartNoneEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",properties:"name,documentation,dataoutput,dataoutputassociations,isinterrupting"},StartMessageEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Message Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/message.png",properties:"name,documentation,dataoutput,dataoutputassociations,messageref,isinterrupting"},StartTimerEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Timer Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/timer.png",properties:"name,documentation,dataoutput,dataoutputassociations,timedate,timeduration,timecycle,timecyclelanguage,isinterrupting"},StartEscalationEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Escalation Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/escalation.png",properties:"name,documentation,dataoutput,dataoutputassociations,escalationcode,isinterrupting"},StartConditionalEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Conditional Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/conditional.png",properties:"name,documentation,dataoutput,dataoutputassociations,conditionlanguage,conditionexpression,isinterrupting"},StartErrorEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Error Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/error.png",properties:"name,documentation,dataoutput,dataoutputassociations,errorref,isinterrupting"},StartCompensationEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Compensation Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/compensation.png",properties:"name,documentation,dataoutput,dataoutputassociations,isinterrupting"},StartSignalEvent:{group:"StartEvents",groupdispname:"Start Events",dispname:"Signal Start Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/startevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/startevent/signal.png",properties:"name,documentation,dataoutput,dataoutputassociations,signalref,isinterrupting"},IntermediateMessageEventCatching:{group:"CatchingEvents",groupdispname:"Catching Events",dispname:"Catching Message Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",icon:"stencilsets/bpmn2.0jbpm/icons/catching/message.png",properties:"name,documentation,messageref,dataoutput,dataoutputassociations,boundarycancelactivity"},IntermediateTimerEvent:{group:"CatchingEvents",groupdispname:"Catching Events",dispname:"Catching Timer Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",icon:"stencilsets/bpmn2.0jbpm/icons/catching/timer.png",properties:"name,documentation,timedate,timeduration,timecycle,timecyclelanguage,boundarycancelactivity"},IntermediateEscalationEvent:{group:"CatchingEvents",groupdispname:"Catching Events",dispname:"Catching Escalation Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",icon:"stencilsets/bpmn2.0jbpm/icons/catching/escalation.png",properties:"name,documentation,escalationcode,dataoutput,dataoutputassociations,boundarycancelactivity"},IntermediateConditionalEvent:{group:"CatchingEvents",groupdispname:"Catching Events",dispname:"Catching Conditional Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",icon:"stencilsets/bpmn2.0jbpm/icons/catching/conditional.png",properties:"name,documentation,conditionlanguage,conditionexpression,dataoutput,dataoutputassociations,boundarycancelactivity"},IntermediateErrorEvent:{group:"CatchingEvents",groupdispname:"Catching Events",dispname:"Catching Error Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",icon:"stencilsets/bpmn2.0jbpm/icons/catching/error.png",properties:"name,documentation,errorref,dataoutput,dataoutputassociations,boundarycancelactivity"},IntermediateCompensationEventCatching:{group:"CatchingEvents",groupdispname:"Catching Events",dispname:"Catching Compensation Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",icon:"stencilsets/bpmn2.0jbpm/icons/catching/compensation.png",properties:"name,documentation,dataoutput,dataoutputassociations,boundarycancelactivity"},IntermediateSignalEventCatching:{group:"CatchingEvents",groupdispname:"Catching Events",dispname:"Catching Signal Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",icon:"stencilsets/bpmn2.0jbpm/icons/catching/signal.png",properties:"name,documentation,signalref,signalscope,dataoutput,dataoutputassociations,boundarycancelactivity"},IntermediateMessageEventThrowing:{group:"ThrowingEvents",groupdispname:"Throwing Events",dispname:"Throwing Message Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/throwing/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/throwing/message.png",properties:"name,documentation,datainput,datainputassociations,messageref"},IntermediateEscalationEventThrowing:{group:"ThrowingEvents",groupdispname:"Throwing Events",dispname:"Throwing Escalation Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/throwing/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/throwing/escalation.png",properties:"name,documentation,datainput,datainputassociations,escalationcode"},IntermediateCompensationEventThrowing:{group:"ThrowingEvents",groupdispname:"Throwing Events",dispname:"Throwing Compensation Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/throwing/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/throwing/compensation.png",properties:"name,documentation,datainput,datainputassociations,activityref"},IntermediateSignalEventThrowing:{group:"ThrowingEvents",groupdispname:"Throwing Events",dispname:"Throwing Signal Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/throwing/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/throwing/signal.png",properties:"name,documentation,datainput,datainputassociations,signalref,signalscope"},EndNoneEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",properties:"name,documentation,datainput,datainputassociations"},EndMessageEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"Message End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/message.png",properties:"name,documentation,datainput,datainputassociations,messageref"},EndEscalationEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"Escalation End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/escalation.png",properties:"name,documentation,datainput,datainputassociations,escalationcode"},EndErrorEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"Error End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/error.png",properties:"name,documentation,datainput,datainputassociations,errorref"},EndCancelEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"Cancel End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/cancel.png",properties:"name,documentation,datainput,datainputassociations"},EndCompensationEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"Compensation End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/compensation.png",properties:"name,documentation,datainput,datainputassociations,activityref"},EndSignalEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"Signal End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/signal.png",properties:"name,documentation,datainput,datainputassociations,signalref,signalscope"},EndTerminateEvent:{group:"EndEvents",groupdispname:"End Events",dispname:"Terminate End Event",groupicon:"stencilsets/bpmn2.0jbpm/icons/endevent/none.png",icon:"stencilsets/bpmn2.0jbpm/icons/endevent/terminate.png",properties:"name,documentation,datainput,datainputassociations"},SequenceFlow:{group:"ConnectingObjects",groupdispname:"Connectors",dispname:"Sequence Flow",groupicon:"stencilsets/bpmn2.0jbpm/icons/connector/sequenceflow.png",icon:"stencilsets/bpmn2.0jbpm/icons/connector/sequenceflow.png",properties:"name,documentation,priority"},Association_Undirected:{group:"ConnectingObjects",groupdispname:"Connectors",dispname:"Undirected Association",groupicon:"stencilsets/bpmn2.0jbpm/icons/connector/sequenceflow.png",icon:"stencilsets/bpmn2.0jbpm/icons/connector/association.undirected.png",properties:"documentation"},Association_Unidirectional:{group:"ConnectingObjects",groupdispname:"Connectors",dispname:"Unidirectional Association",groupicon:"stencilsets/bpmn2.0jbpm/icons/connector/sequenceflow.png",icon:"stencilsets/bpmn2.0jbpm/icons/connector/association.undirectional.png",properties:"documentation"}};
var propertyNameMappings={assignmentsview:"Assignments Count",script_language:"Script Language",multipleinstancecollectioninput:"MI Collection Input",multipleinstancecollectionoutput:"MI Collection Output",multipleinstancedatainput:"MI Data Iput",multipleinstancedataoutput:"MI Data Output",multipleinstancecompletioncondition:"MI Completion Condition",vardefs:"Variable Definitions",adhocordering:"Ad-Hoc Ordering",adhoccompletioncondition:"Ad-Hoc Completion Condition",adhoccancelremaininginstances:"Ad-Hoc Cancel Remaining",serviceoperation:"Service Operation",serviceinterface:"Service Interface",serviceimplementation:"Service Implementation",dataoutputassociationsview:"Data Output Associations Count",datainputassociationsview:"Data Input Associations Count",datainputset:"Data Inputs",dataoutputset:"Data Outputs",activityref:"Activity Ref",signalref:"Signal Ref",signalscope:"Signal Scope",dataoutput:"Data Input",dataoutputassociations:"Data Output Associations",datainputassociations:"Data Input Associations",boundarycancelactivity:"Cancel Activity",isinterrupting:"Is Interrupting",waitforcompletion:"Wait for completion",eventtype:"Event Type",groupid:"Groups"};
var elementGroups={Tasks:[],WorkItems:[],Subprocesses:[],Gateways:[],Lanes:[],Artifacts:[],DataObjects:[],StartEvents:[],EndEvents:[],CatchingEvents:[],ThrowingEvents:[],ConnectingObjects:[]};
function processElementInfo(b){var c=jsonPath(JSON.parse(b),"$.childShapes.*");
var a=JSON.parse(JSON.stringify(elementGroups));
if(c){addChildElements(c,a)
}return a
}function addChildElements(b,a){for(var d=0;
d<b.length;
d++){var c=b[d];
addElement(c,a);
if(c.childShapes){addChildElements(c.childShapes,a)
}}}function addElement(c,l){var f=c.stencil.id;
var d=false;
if(elementDataInfo[f]){d=true
}else{if(c.properties&&c.properties.tasktype){d=true
}}if(d){var h;
if(f=="Task"){var g=c.properties.tasktype;
if(g=="Send"){h=elementDataInfo.SendTask
}else{if(g=="Receive"){h=elementDataInfo.ReceiveTask
}else{if(g=="Manual"){h=elementDataInfo.ManualTask
}else{if(g=="Service"){h=elementDataInfo.ServiceTask
}else{if(g=="Business Rule"){h=elementDataInfo.BusinessRuleTask
}else{if(g=="Script"){h=elementDataInfo.ScriptTask
}else{if(g=="None"){h=elementDataInfo.Task
}else{if(g=="User"){h=elementDataInfo.UserTask
}}}}}}}}}else{if(c.properties&&c.properties.tasktype){h=elementDataInfo.WorkItem
}else{h=elementDataInfo[f]
}}var k=[];
var j="";
var e=h.properties.split(",");
for(var b=0;
b<e.length;
b++){var a=e[b];
if(a=="name"){j=c.properties[a]
}k.push({name:presentPropertyName(a),value:parsePropertyValue(a,c.properties[a])})
}l[h.group].push({id:c.resourceId,group:h.group,groupdispname:h.groupdispname,dispname:h.dispname,groupicon:ctx+h.groupicon,icon:ctx+h.icon,properties:k,nodename:j.trim().length>0?j:"(Not Named)"})
}}function parsePropertyValue(a,e){if(e===undefined){return""
}if(typeof e==="boolean"){e=e.toString()
}if(a=="datainputset"||a=="dataoutputset"||a=="datainput"||a=="dataoutput"||a=="vardefs"){var c="";
var k=e.trim().split(",");
for(var f=0;
f<k.length;
f++){var d=k[f];
if(d.indexOf(":")>0){var l=d.split(":");
c+=l[0]+"("+l[1]+")\n"
}else{if(d.trim().length>0){c+=d+"(no defined type)\n"
}}}if(c.length>0){return c.substring(0,c.length-1)
}else{return e
}}else{if(a=="assignments"||a=="dataoutputassociations"||a=="datainputassociations"){var c="";
var g=e.trim().split(",");
for(var f=0;
f<g.length;
f++){var d=g[f];
if(d.indexOf("=")>0){var l=d.split("=");
if(l[0].startsWith("[din]")){var h=l[0].slice(5,l[0].length);
l.shift();
var b=l.join("=").replace(/\#\#/g,",");
b=b.replace(/\|\|/g,"=");
c+="(Data Input) "+h+" is given value "+decodeURIComponent(b.replace(/\+/g," "))+"\n"
}else{if(l[0].startsWith("[dout]")){var h=l[0].slice(6,l[0].length);
l.shift();
var b=l.join("=").replace(/\#\#/g,",");
b=b.replace(/\|\|/g,"=");
c+="(Data Output) "+h+" is given value "+decodeURIComponent(b.replace(/\+/g," "))+"\n"
}else{var h=l[0];
l.shift();
var b=l.join("=").replace(/\#\#/g,",");
b=b.replace(/\|\|/g,"=");
c+="(Data Input) "+h+" is given value "+decodeURIComponent(b.replace(/\+/g," "))+"\n"
}}}else{if(d.indexOf("->")>0){var l=d.split("->");
if(l[0].startsWith("[din]")){var h=l[0].slice(5,l[0].length);
c+="(Data Input) "+h+" is mapped to "+l[1]+"\n"
}else{if(l[0].startsWith("[dout]")){var h=l[0].slice(6,l[0].length);
c+="(Data Output) "+h+" is mapped to "+l[1]+"\n"
}}}else{if(d.trim().length>0){var l=d.split("=");
var h=l[0].slice(5,l[0].length);
var j=l[0].startsWith("[din]")?"(Data Input) ":"(Data Output) ";
c+=j+h+"is given value\n"
}}}}return c
}else{if(a=="script"){return formatScript(e)
}else{return e
}}}}function presentPropertyName(a){if(propertyNameMappings[a]){return propertyNameMappings[a]
}else{return a.charAt(0).toUpperCase()+a.slice(1)
}}function displayProcessImg(){var e=parent.ORYX.EDITOR.getCanvas().getSVGRepresentation(true,true);
var c=parent.DataManager.serialize(e);
var f=e.getAttributeNS(null,"height");
var j=e.getAttributeNS(null,"width");
var b=Object.hasOwnProperty.call(window,"ActiveXObject");
var a=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor);
if(a||b){var g=document.getElementById("processimgdivdisplay");
if(g){g.parentNode.removeChild(g)
}var h=parent.ORYX.EDITOR.getCanvas().getSVGRepresentation(false,false);
h.setAttributeNS(null,"width",parent.ORYX.CONFIG.MAXIMUM_SIZE);
h.setAttributeNS(null,"height",parent.ORYX.CONFIG.MAXIMUM_SIZE);
$("#processimgdivdisplayframe").contents().find("body").html("");
$("#processimgdivdisplayframe").contents().find("body").html(h)
}else{var d=document.getElementById("processimgdivdisplayframe");
if(d){d.parentNode.removeChild(d)
}parent.Ext.Ajax.request({url:parent.ORYX.PATH+"transformer",method:"POST",success:function(k){try{document.getElementById("processimgdivdisplay").innerHTML="";
document.getElementById("processimgdivdisplay").innerHTML=k.responseText
}catch(l){parent.ORYX.EDITOR._pluginFacade.raiseEvent({type:parent.ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:parent.ORYX.I18N.view.processImgFail+": "+l,title:""})
}},failure:function(){parent.ORYX.EDITOR._pluginFacade.raiseEvent({type:parent.ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:parent.ORYX.I18N.view.processImgFail+".",title:""})
},params:{profile:parent.ORYX.PROFILE,uuid:window.btoa(encodeURI(parent.ORYX.UUID)),fsvg:parent.Base64.encode(c),transformto:"png",respaction:"showurl",svgheight:f,svgwidth:j}})
}}function showAsPDF(){var l="html2pdf";
$("table").attr("border","1");
var d=parent.Base64.encode($("#pagecontainercore").clone().wrap("<div></div>").parent().html());
$("table").attr("border","0");
var b="post";
var c=document.createElement("form");
c.setAttribute("name","transformerform");
c.setAttribute("method",b);
c.setAttribute("action",parent.ORYX.CONFIG.TRANSFORMER_URL());
c.setAttribute("target","_blank");
var h=document.createElement("input");
h.setAttribute("type","hidden");
h.setAttribute("name","htmlenc");
h.setAttribute("value",d);
c.appendChild(h);
var k=document.createElement("input");
k.setAttribute("type","hidden");
k.setAttribute("name","uuid");
k.setAttribute("value",parent.ORYX.UUID);
c.appendChild(k);
var f=document.createElement("input");
f.setAttribute("type","hidden");
f.setAttribute("name","profile");
f.setAttribute("value",parent.ORYX.PROFILE);
c.appendChild(f);
var e=document.createElement("input");
e.setAttribute("type","hidden");
e.setAttribute("name","transformto");
e.setAttribute("value",l);
c.appendChild(e);
var g=parent.ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(JSON.parse(g),"$.properties.id");
var j=document.createElement("input");
j.setAttribute("type","hidden");
j.setAttribute("name","processid");
j.setAttribute("value",a);
c.appendChild(j);
document.body.appendChild(c);
c.submit()
}function formatScript(e){var a=new String("");
var f="\0";
var b="\0";
var d=false;
for(i=0;
i<e.length;
i++){b=f;
f=e.charAt(i);
if(f==="\\"){if(d){a=a+f;
d=false;
f="\0"
}else{d=true
}}else{if(d){if(f==="n"){a=a+"<br />"
}else{if(f==="t"){a=a+"&nbsp;&nbsp;&nbsp;&nbsp"
}else{a=a+f
}}}else{if(f===" "){a=a+"&nbsp;"
}else{a=a+f
}}}if(b==="\\"){if(d){d=false
}}}return a
};