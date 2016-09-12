if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.EPC2BPMN=Clazz.extend({facade:undefined,EPC_NAMESPACE:"http://b3mn.org/stencilset/epc#",BPMN1_0_NAMESPACE:"http://b3mn.org/stencilset/bpmn#",BPMN1_1_NAMESPACE:"http://b3mn.org/stencilset/bpmn1.1#",construct:function(a){this.facade=a;
Facade=a;
this.isBPMN1_0=this.facade.getStencilSets().keys().include(this.BPMN1_0_NAMESPACE);
this.isBPMN1_1=this.facade.getStencilSets().keys().include(this.BPMN1_1_NAMESPACE);
if(!this.isBPMN1_0&&!this.isBPMN1_1){return
}this.facade.offer({name:ORYX.I18N.EPCSupport.epcToBPMN,functionality:this.startTransform.bind(this),group:"epc",icon:ORYX.BASE_FILE_PATH+"images/epc_export.png",description:ORYX.I18N.EPCSupport.epcToBPMN_desc,index:1,minShape:0,maxShape:0})
},startTransform:function(){this.showPanel(this.sendRequest.bind(this))
},sendRequest:function(c){var a=new Ext.Window({id:"oryx-loading-panel_epc2bpmn",bodyStyle:"padding: 8px",title:"Oryx",width:230,height:55,modal:true,resizable:false,closable:false,frame:true,html:'<span style="font-size:11px;">'+ORYX.I18N.EPCSupport.pleaseWait+"</span>"});
a.show();
if(!c||!c.url){return
}var b="./engineproxy?url="+c.url;
new Ajax.Request(b,{method:"GET",onSuccess:function(d){window.setTimeout((function(){try{this.doTransform(d.responseText,c)
}catch(f){Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.EPCSupport.errorImporting)
}Ext.getCmp("oryx-loading-panel_epc2bpmn").close();
if(c.autolayout){window.setTimeout((function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_AUTOLAYOUT_LAYOUT})
}).bind(this),100)
}}).bind(this),100)
}.bind(this),onFailure:function(d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.EPCSupport.requestFailed)
}.bind(this)})
},doTransform:function(n,f){var q=this.parseToObject(n);
var u=[];
if(!q){return
}var p=function(F){return q.find(function(G){return G.id==F
})
};
var w=function(G){var F=u.find(function(H){return H.epc==G
});
if(F){F.shape.parent.remove(F.shape);
u=u.without(F)
}};
var t=f&&f.events_throw?f.events_throw.split(";").compact().without("").without(" ").collect(function(F){return F.toLowerCase()
}):[];
var o=f&&f.events_catch?f.events_catch.split(";").compact().without("").without(" ").collect(function(F){return F.toLowerCase()
}):[];
var m=function(F){return t.any(function(G){return G.split(" ").all(function(H){return F.toLowerCase().include(H)
})
})
};
var i=function(F){return o.any(function(G){return G.split(" ").all(function(H){return F.toLowerCase().include(H)
})
})
};
var s=q.findAll(function(F){return F.type.endsWith("Function")
});
s.each(function(G){var F=this.createElement("Task",G,true);
F.setProperty("oryx-name",G.title);
F.setProperty("oryx-documentation",G.description);
u.push({shape:F,epc:G})
}.bind(this));
var b=q.findAll(function(F){return F.type.endsWith("Event")
});
var v=b.findAll(function(F){return !q.any(function(G){return G.outgoing&&G.outgoing.any(function(H){return H.slice(1)==F.id
})
})
});
v.each(function(G){var H=i(G.title)?"StartMessageEvent":"StartEvent";
var F=this.createElement(H,G,true);
if(H=="StartMessageEvent"){F.setProperty("oryx-message",G.title)
}else{F.setProperty("oryx-documentation",G.title+" - "+G.description)
}u.push({shape:F,epc:G})
}.bind(this));
var e=b.findAll(function(F){return !F.outgoing
});
e.each(function(G){var H=this.isBPMN1_1&&m(G.title)?"MessageEndEvent":"EndEvent";
var F=this.createElement(H,G,true);
if(H=="MessageEndEvent"){F.setProperty("oryx-message",G.title)
}else{F.setProperty("oryx-documentation",G.title+" - "+G.description)
}if(this.isBPMN1_0&&m(G.title)){F.setProperty("oryx-result","Message");
F.setProperty("oryx-message",G.title)
}u.push({shape:F,epc:G})
}.bind(this));
var A=[].without.apply(b,v.concat(e));
intermediateEventsCatch=A.findAll(function(F){return i(F.title)
});
intermediateEventsCatch.each(function(H){var G=this.isBPMN1_1?"IntermediateMessageEventCatching":"IntermediateMessageEvent";
var F=this.createElement(G,H,true);
F.setProperty("oryx-message",H.title);
u.push({shape:F,epc:H})
}.bind(this));
intermediateFunctionsThrow=s.findAll(function(F){return m(F.title)
});
intermediateFunctionsThrow.each(function(I){w(I);
var H=this.isBPMN1_1?"IntermediateMessageEventThrowing":"IntermediateMessageEvent";
var J=I.outgoing?p(I.outgoing[0].slice(1)):null;
if(J&&J.outgoing){var F=p(J.outgoing[0].slice(1));
if(F&&F.type.endsWith("Event")&&!F.outgoing&&m(F.title)){w(F);
H=this.isBPMN1_1?"MessageEndEvent":"EndEvent"
}}var G=this.createElement(H,I,true);
G.setProperty("oryx-message",I.title);
if(this.isBPMN1_0&&H=="EndEvent"){G.setProperty("oryx-result","Message")
}u.push({shape:G,epc:I})
}.bind(this));
var x=q.findAll(function(F){return F.type.endsWith("Connector")
});
x.each(function(H){var G="Exclusive_Databased_Gateway";
if(H.type.endsWith("AndConnector")){G="AND_Gateway"
}else{if(H.type.endsWith("OrConnector")){G="OR_Gateway"
}}if(G=="Exclusive_Databased_Gateway"&&H.outgoing&&H.outgoing.all(function(I){return intermediateEventsCatch.include(p(p(I.slice(1)).outgoing[0].slice(1)))
})){G="Exclusive_Eventbased_Gateway"
}var F=this.createElement(G,H,true);
u.push({shape:F,epc:H})
}.bind(this));
x.each(function(F){if(F.outgoing&&F.outgoing.length>1&&!F.type.endsWith("AndConnector")){F.outgoing.each(function(G){var H=p(G.slice(1));
if(H.type.endsWith("ControlFlow")&&H.outgoing){H.outgoing.each(function(J){var I=p(J.slice(1));
if(I.type.endsWith("Event")){H.expression=I.title
}})
}})
}}.bind(this));
var C=q.findAll(function(F){return F.type.endsWith("Data")
});
C.each(function(G){var F=this.createElement("DataObject",G,true);
F.setProperty("oryx-name",G.title);
F.setProperty("oryx-documentation",G.description);
u.push({shape:F,epc:G})
}.bind(this));
var g=q.findAll(function(F){return F.type.endsWith("System")
});
g.each(function(G){var F=this.createElement("TextAnnotation",G,true);
F.setProperty("oryx-text","Used System: "+G.title);
u.push({shape:F,epc:G})
}.bind(this));
var l=q.findAll(function(F){return F.type.endsWith("ProcessInterface")
});
l.each(function(H){var G=this.isBPMN1_1?"collapsedSubprocess":"Subprocess";
var F=this.createElement(G,H,true);
F.setProperty("oryx-name",H.title);
F.setProperty("oryx-documentation",H.description);
F.setProperty("raziel-entry",H.refuri);
u.push({shape:F,epc:H})
}.bind(this));
var d=f.organization?q.findAll(function(F){return F.type.endsWith("Organization")||F.type.endsWith("Position")
}):[];
var E=d.collect(function(F){return F.title
}).uniq().sort();
d=E.collect(function(F){return d.findAll(function(G){return G.title==F
})
});
if(d.length>0){var r=this.createElement("Pool");
var B=[];
var k=[];
d.each(function(G){var F=this.createElement("Lane");
F.setProperty("oryx-name",G[0].title);
r.add(F);
B.push({shape:F,epc:G[0]});
G.each(function(J){var I=J.outgoing?J.outgoing.collect(function(K){return p(K.slice(1)).outgoing[0].slice(1)
}):[];
var H=u.findAll(function(K){return K.epc.type.endsWith("Function")||K.epc.type.endsWith("ProcessInterface")
});
H=H.findAll(function(K){return I.include(K.epc.id)||(K.epc.outgoing&&K.epc.outgoing.any(function(L){return p(L.slice(1)).outgoing.first().slice(1)==J.id
}))
});
H.each(function(K){F.add(K.shape);
k.push(K)
})
})
}.bind(this));
var h=[].without.apply(u,k);
var y=h.findAll(function(F){return F.epc.type.endsWith("Function")||F.epc.type.endsWith("ProcessInterface")
});
if(y.length>0){var D=this.createElement("Lane");
r.add(D);
y.each(function(F){D.add(F.shape);
k.push(F)
})
}var h=[].without.apply(u,k);
var a=function(G){if(!G){return[]
}var F=[];
G.each(function(H){var I=u.find(function(J){return J.epc.id==H.slice(1)
});
if(I){if(k.indexOf(I)>=0){throw $break
}if(h.indexOf(I)>=0){F.push(I)
}F=F.concat(a(I.epc.outgoing))
}else{F=F.concat(a(p(H.slice(1)).outgoing))
}});
return F
};
k.each(function(F){var G=a(F.epc.outgoing);
G.each(function(H){F.shape.parent.add(H.shape);
h=h.without(H)
})
});
var j=function(G){if(!G){return[]
}var F;
G.each(function(H){var I=u.find(function(J){return J.epc.id==H.slice(1)
});
if(I){if(k.indexOf(I)>=0){F=I;
throw $break
}F=j(I.epc.outgoing)
}else{F=j(p(H.slice(1)).outgoing)
}});
return F
};
h.each(function(F){var G=j(F.epc.outgoing);
if(G){G.shape.parent.add(F.shape);
k.push(F)
}})
}var z=function(G){if(!G||!G.outgoing){return null
}var F=G;
var H;
while(!H){F=q.find(function(I){return F.outgoing&&F.outgoing.any(function(J){return J.slice(1)==I.id
})
});
H=u.find(function(I){return I.epc===F
});
if(!F||!F.outgoing){break
}}return H
};
var c=[];
u.each(function(F){if(F.epc.outgoing){F.epc.outgoing.each(function(G){var I=q.find(function(J){return(J.type.endsWith("ControlFlow")||J.type.endsWith("Relation"))&&J.id==G.slice(1)
});
var H=z(I);
if(I&&H){c.push({from:F,edge:I,to:H})
}})
}});
c.each(function(G){var F;
if(G.edge.type.endsWith("Relation")){if(G.edge.informationflow.toLowerCase()=="true"){F=this.createElement("Association_Unidirectional",G.edge)
}else{F=this.createElement("Association_Undirected",G.edge)
}}else{F=this.createElement("SequenceFlow",G.edge)
}var I=G.from.shape;
var H=G.to.shape;
F.dockers.first().setDockedShape(I);
F.dockers.first().setReferencePoint({x:I.bounds.width()/2,y:I.bounds.height()/2});
F.dockers.last().setDockedShape(H);
F.dockers.last().setReferencePoint({x:H.bounds.width()/2,y:H.bounds.height()/2});
if(G.edge.expression){F.setProperty("oryx-conditionexpression",G.edge.expression)
}u.push({shape:F,epc:G.edge})
}.bind(this));
this.facade.getCanvas().update()
},createElement:function(g,b,f,e){var a=this.facade.getStencilSets().keys()[0];
var d=ORYX.Core.StencilSet.stencil(a+g);
if(!d&&e){d=ORYX.Core.StencilSet.stencil(a+e)
}if(!d){return null
}var c=(d.type()=="node")?new ORYX.Core.Node({eventHandlerCallback:this.facade.raiseEvent},d):new ORYX.Core.Edge({eventHandlerCallback:this.facade.raiseEvent},d);
this.facade.getCanvas().add(c);
if(b&&b.bounds&&f){c.bounds.centerMoveTo(b.bounds.center)
}return c
},parseToObject:function(d){var h=new DOMParser();
var f=h.parseFromString(d,"text/xml");
var c=function(i){return $A(f.getElementsByTagName("div")).find(function(j){return j.getAttribute("id")==i
})
};
var a=c("oryxcanvas");
a=a?a:c("oryx-canvas123");
var e=a?$A(a.childNodes).any(function(i){return i.nodeName.toLowerCase()=="a"&&i.getAttribute("rel")=="oryx-stencilset"&&i.getAttribute("href").endsWith("epc/epc.json")
}):null;
if(!e){this.throwErrorMessage("Imported model is not an EPC model!");
return null
}var b=$A(a.childNodes).collect(function(i){return i.nodeName.toLowerCase()=="a"&&i.getAttribute("rel")=="oryx-render"?i.getAttribute("href").slice(1):null
}).compact();
b=b.collect(function(i){return c(i)
});
var g=function(j){var i={};
if(j.getAttribute("id")){i.id=j.getAttribute("id")
}$A(j.childNodes).each(function(l){if(l.nodeName.toLowerCase()=="span"&&l.getAttribute("class")){var k=l.getAttribute("class").slice(5);
i[k]=l.firstChild?l.firstChild.nodeValue:"";
if(k=="bounds"){var m=$A(i[k].split(",")).collect(function(n){return Number(n)
});
i[k]={a:{x:m[0],y:m[1]},b:{x:m[2],y:m[3]},center:{x:m[0]+((m[2]-m[0])/2),y:m[1]+((m[3]-m[1])/2)}}
}}else{if(l.nodeName.toLowerCase()=="a"&&l.getAttribute("rel")){var k=l.getAttribute("rel").split("-")[1];
if(!i[k]){i[k]=[]
}i[k].push(l.getAttribute("href"))
}}});
return i
};
return b.collect(function(i){return g(i)
})
},throwErrorMessage:function(a){Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
},showPanel:function(e){Ext.QuickTips.init();
var b=new Ext.form.FormPanel({id:"transform-epc-bpmn-id-main",labelWidth:40,defaultType:"textfield",bodyStyle:"padding:5px",defaults:{width:300,msgTarget:"side"},items:[{text:ORYX.I18N.EPCSupport.setTheURL,xtype:"label",style:"padding-bottom:10px;display:block",width:"100%"},{fieldLabel:ORYX.I18N.EPCSupport.url,name:"last",allowBlank:false}]});
var d=new Ext.form.FormPanel({id:"transform-epc-bpmn-id-advance",collapsed:true,labelWidth:30,defaultType:"textfield",bodyStyle:"padding:15px",defaults:{width:300,msgTarget:"side",labelSeparator:""},items:[{text:ORYX.I18N.EPCSupport.eventMapping,xtype:"label",cls:"transform-epc-bpmn-title"},{text:ORYX.I18N.EPCSupport.giveKeyword,xtype:"label",width:"100%",style:"margin-bottom:10px;display:block;"},{labelStyle:"background:transparent url(stencilsets/bpmn/icons/intermediate-message.png) no-repeat scroll 0px -1px;width:30px;height:20px",name:"events_catch"},{labelStyle:!this.isBPMN1_0?"background:transparent url(stencilsets/bpmn/icons/intermediate-message.png) no-repeat scroll 0px -30px;width:30px;height:20px":"display:none",name:"events_throw",style:this.isBPMN1_0?"display:none;":""},{text:ORYX.I18N.EPCSupport.organization,xtype:"label",style:"margin-top:10px;display:block;",cls:"transform-epc-bpmn-title"},{text:ORYX.I18N.EPCSupport.askIfOUandRolesMapped,xtype:"label",width:"100%",style:"margin-bottom:10px;display:block;"},{boxLabel:ORYX.I18N.EPCSupport.organization,name:"autolayout",id:"transform-epc-bpmn-id-organization",xtype:"checkbox",labelStyle:"width:30px;height:20px"},{text:ORYX.I18N.EPCSupport.autoLayout,xtype:"label",style:"margin-top:10px;display:block;",cls:"transform-epc-bpmn-title"},{text:ORYX.I18N.EPCSupport.autoLayout_desc,xtype:"label",width:"100%",style:"margin-bottom:10px;display:block;"},{boxLabel:ORYX.I18N.EPCSupport.autoLayout,name:"autolayout",id:"transform-epc-bpmn-id-autolayout",xtype:"checkbox",labelStyle:"width:30px;height:20px"}]});
Ext.getCmp("transform-epc-bpmn-id-organization").on("check",function(g,f){if(f){Ext.getCmp("transform-epc-bpmn-id-autolayout").setValue(true);
Ext.getCmp("transform-epc-bpmn-id-autolayout").disable()
}else{Ext.getCmp("transform-epc-bpmn-id-autolayout").enable()
}});
var c={text:ORYX.I18N.EPCSupport.advancedSettings,xtype:"button",enableToggle:true,cls:"transform-epc-bpmn-group-button",handler:function(f){var f=Ext.getCmp("transform-epc-bpmn-id-advance");
if(f.collapsed){f.expand()
}else{f.collapse()
}}};
var a=new Ext.Window({title:ORYX.I18N.Oryx.title+" - "+ORYX.I18N.EPCSupport.transformEPCToBPMN,width:400,id:"transform-epc-bpmn-id-panel",cls:"transform-epc-bpmn-window",items:new Ext.Panel({frame:true,autoHeight:true,items:[b,c,d]}),floating:true,shim:true,modal:true,resizable:false,autoHeight:true,buttons:[{text:ORYX.I18N.EPCSupport.impBtn,handler:function(){var f={};
var g=Ext.getCmp("transform-epc-bpmn-id-main").findByType("textfield")[0];
if(g.validate()){f.url=g.getValue()
}if(!Ext.getCmp("transform-epc-bpmn-id-advance").collapsed){f.events_catch=Ext.getCmp("transform-epc-bpmn-id-advance").findByType("textfield")[0].getValue();
if(this.isBPMN1_1){f.events_throw=Ext.getCmp("transform-epc-bpmn-id-advance").findByType("textfield")[1].getValue()
}f.organization=Ext.getCmp("transform-epc-bpmn-id-advance").findByType("checkbox")[0].getValue();
f.autolayout=Ext.getCmp("transform-epc-bpmn-id-advance").findByType("checkbox")[1].getValue()
}Ext.getCmp("transform-epc-bpmn-id-panel").close();
e(f)
}.bind(this)},{text:Ext.MessageBox.buttonText.cancel,handler:function(){Ext.getCmp("transform-epc-bpmn-id-panel").close()
}}]});
a.show()
}});
var Facade=undefined;