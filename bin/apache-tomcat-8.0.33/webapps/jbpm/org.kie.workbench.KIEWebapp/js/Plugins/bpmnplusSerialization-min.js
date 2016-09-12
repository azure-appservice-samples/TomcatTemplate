if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMNPlusSerialization={construct:function(a){this.facade=a;
this.facade.registerOnEvent("serialize.bpmnplus.pool",this.handleSerializePool.bind(this));
this.facade.registerOnEvent("serialize.bpmnplus.variable",this.handleSerializeVariable.bind(this));
this.facade.registerOnEvent("serialize.bpmnplus.dataobject",this.handleSerializeDataObject.bind(this));
this.facade.registerOnEvent("serialize.bpmnplus.attachedevent",this.handleSerializeAttachedEvent.bind(this));
this.facade.registerOnEvent("serialize.bpmnplus.unidirectedassociation",this.handleSerializeUnidirectedAssociation.bind(this));
this.facade.registerOnEvent("serialize.bpmnplus.directedassociation",this.handleSerializeDirectedAssociation.bind(this));
this.facade.registerOnEvent("serialize.bpmnplus.messageflow",this.handleSerializeMessageFlow.bind(this))
},handleSerializePool:function(d){var b=d.shape;
var e=d.data;
var a=b.resourceId;
var g=b.properties["oryx-processid"];
if(g==""){g=a+"_process";
var f;
for(var c=0;
c<e.length;
c++){if(e[c].name=="processid"){f=e[c];
break
}}f.value=g
}d.result=e
},handleSerializeVariable:function(b){var h=b.shape;
var f=b.data;
var i=h.getParentShape();
var e=false;
while(i.getParentShape!=undefined){if((i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#Scope")||(i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#FaultHandler")||(i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#CompensationHandler")||(i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#TerminationHandler")||(i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#MessageHandler")||(i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#TimerHandler")){var d=i.resourceId;
if(d==""){d=i.resourceId;
if(d==undefined){d=""
}}if(!e){f.push({name:"subprocess",prefix:"oryx",value:d,type:"literal"});
e=true
}i=i.getParentShape()
}else{if((i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#Pool")||(i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#PoolSet")){var c;
if(i.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#Pool"){c="pool"
}else{c="poolset"
}var g=i.resourceId;
if(g==""){g=i.resourceId;
if(g==undefined){g=""
}}f.push({name:c,prefix:"oryx",value:g,type:"literal"});
if(!e){var a=i.properties["oryx-processid"];
if(a==""){a=g+"_process"
}f.push({name:"process",prefix:"oryx",value:a,type:"literal"})
}break
}else{i=i.getParentShape()
}}}b.result=f
},handleSerializeDataObject:function(e){var b=e.shape;
var f=e.data;
var d=b.getParentShape();
while(d.getParentShape!=undefined){if((d.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#Pool")||(d.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#PoolSet")){var c;
if(d.getStencil().id()=="http://b3mn.org/stencilset/bpmnplus#Pool"){c="pool"
}else{c="poolset"
}var a=d.resourceId;
if(a==""){a=d.resourceId;
if(a==undefined){a=""
}}f.push({name:c,prefix:"oryx",value:a,type:"literal"});
break
}else{d=d.getParentShape()
}}e.result=f
},handleSerializeAttachedEvent:function(e){var b=e.shape;
var f=e.data;
var c;
var d=b.getIncomingShapes();
d.each(function(j){var h=j.getStencil().roles();
for(var g=0;
g<h.length;
g++){if(h[g]==j.getStencil().namespace()+"attachmentAllowed"){c=j;
break
}}});
if(c!=undefined){var a=c.resourceId;
if(a==""){a=c.resourceId
}if(a!=undefined){f.push({name:"target",prefix:"oryx",value:a,type:"literal"})
}}e.result=f
},handleSerializeUnidirectedAssociation:function(d){var j=d.shape;
var g=d.data;
var b=j.getIncomingShapes();
var f=false;
if(b.length>0){var a=b[0];
var k=a.getStencil().id();
var e=a.resourceId;
var c;
if(k=="http://b3mn.org/stencilset/bpmnplus#StandardVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#FaultVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#MessageVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#CounterVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#ParticipantReferenceDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#ParticipantSetDataObject"){c="target";
f=true
}else{c="source"
}g.push({name:"direction",prefix:"oryx",value:"None",type:"literal",});
if(e!=undefined){g.push({name:c,prefix:"oryx",value:e,type:"literal"})
}}var h=j.getOutgoingShapes();
if(h.length>0){var i=h[0];
var e=i.resourceId;
var c;
if(f){c="source"
}else{c="target"
}if(e!=undefined){g.push({name:c,prefix:"oryx",value:e,type:"literal"})
}}d.result=g
},handleSerializeDirectedAssociation:function(d){var j=d.shape;
var g=d.data;
var b=j.getIncomingShapes();
var f=false;
if(b.length>0){var a=b[0];
var k=a.getStencil().id();
var e=a.resourceId;
var c;
if(k=="http://b3mn.org/stencilset/bpmnplus#StandardVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#FaultVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#MessageVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#CounterVariableDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#ParticipantReferenceDataObject"||k=="http://b3mn.org/stencilset/bpmnplus#ParticipantSetDataObject"){g.push({name:"direction",prefix:"oryx",value:"To",type:"literal"});
c="target";
f=true
}else{g.push({name:"direction",prefix:"oryx",value:"From",type:"literal"});
c="source"
}if(e!=undefined){g.push({name:c,prefix:"oryx",value:e,type:"literal"})
}}var h=j.getOutgoingShapes();
if(h.length>0){var i=h[0];
var e=i.resourceId;
if(e==""){e=i.resourceId
}var c;
if(f){c="source"
}else{c="target"
}if(e!=undefined){g.push({name:c,prefix:"oryx",value:e,type:"literal"})
}}d.result=g
},handleSerializeMessageFlow:function(d){var b=d.shape;
var f=d.data;
var c=b.getIncomingShapes();
if(c.length>0){var e=c[0];
var h=e.resourceId;
if(h!=undefined){f.push({name:"source",prefix:"oryx",value:h,type:"literal"})
}}var a=b.getOutgoingShapes();
if(a.length>0){var g=a[0];
var h=g.resourceId;
if(h!=undefined){f.push({name:"target",prefix:"oryx",value:h,type:"literal"})
}}d.result=f
}};
ORYX.Plugins.BPMNPlusSerialization=Clazz.extend(ORYX.Plugins.BPMNPlusSerialization);