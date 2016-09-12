Ext.namespace("ORYX.Plugins");
ORYX.Plugins.AbstractStepThroughPlugin=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.StepThroughPlugin.stepThrough,functionality:this.load.bind(this),group:ORYX.I18N.StepThroughPlugin.group,icon:ORYX.BASE_FILE_PATH+"images/control_play.png",description:ORYX.I18N.StepThroughPlugin.stepThroughDesc,index:1,toggle:true,minShape:0,maxShape:0});
this.facade.offer({name:ORYX.I18N.StepThroughPlugin.undo,functionality:this.undo.bind(this),group:ORYX.I18N.StepThroughPlugin.group,icon:ORYX.BASE_FILE_PATH+"images/control_rewind.png",description:ORYX.I18N.StepThroughPlugin.undoDesc,index:2,minShape:0,maxShape:0})
},showEnabled:function(a,b){if(!(a instanceof ORYX.Core.Shape)){return
}else{if(this.isOrSplit(a)){this.showEnabledOrSplit(a);
return
}}this.showPlayOnShape(a)
},showPlayOnShape:function(b){var a;
if(b instanceof ORYX.Core.Edge){a={stroke:"green"}
}else{a={fill:"green"}
}var c=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{title:"Click the element to execute it!","stroke-width":2,stroke:"black",d:"M0,-5 L5,0 L0,5 Z","line-captions":"round"}]);
this.showOverlayOnShape(b,a,c)
},showOverlayOnShape:function(b,a,c){this.hideOverlayOnShape(b);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"st."+b.resourceId,shapes:[b],attributes:a,node:(c?c:null),nodePosition:b instanceof ORYX.Core.Edge?"END":"SE"})
},hideOverlayOnShape:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"st."+a.resourceId})
},hideOverlays:function(a){var b=this.facade.getCanvas().getChildShapes(true);
var c;
for(i=0;
i<b.size();
i++){c=b[i];
if(!(a&&this.isStartNode(c))){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"st."+c.resourceId})
}}},load:function(a,b){this.initializeLoadButton(a,b);
this.togglePlugin(b)
},togglePlugin:function(a){if(a){this.initialMarking=[];
if(this.getDiagramType()==="epc"){this.prepareInitialMarking()
}else{this.startAndCheckSyntax()
}}else{this.executionTrace="";
this.rdf=undefined;
this.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.RESET_ERRORS_EVENT});
this.onDeactivate()
}if(this.active()){this.callback=this.doMouseUp.bind(this);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEUP,this.callback)
}else{this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_MOUSEUP,this.callback);
this.callback=undefined
}},onDeactivate:function(){this.hideOverlays()
},initializeLoadButton:function(b,c){if(this.loadButton!==b){var a=function(d){if(d){this.facade.disableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN)
}else{this.facade.enableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN)
}}.createDelegate(this);
b.on("toggle",function(d,e){a(e)
});
a(b,c)
}this.loadButton=b
},active:function(){return this.loadButton?this.loadButton.pressed:false
},onSelectionChanged:function(){if(this.active()&&this.facade.getSelection().length>0){this.facade.setSelection([])
}},getDiagramType:function(){switch(this.facade.getCanvas().getStencil().namespace()){case"http://b3mn.org/stencilset/epc#":return"epc";
case"http://b3mn.org/stencilset/bpmn#":return"bpmn";
default:return null
}},showUsed:function(b,c){if(!(b instanceof ORYX.Core.Shape)){return
}var a;
if(b instanceof ORYX.Core.Edge){a={stroke:"mediumslateblue"}
}else{a={fill:"mediumslateblue"}
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"st."+b.resourceId});
if(c!="-1"&&c!="1"){var d=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{style:"font-size: 16px; font-weight: bold;"},c]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"st."+b.resourceId,shapes:[b],attributes:a,node:d,nodePosition:b instanceof ORYX.Core.Edge?"END":"SE"})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"st."+b.resourceId,shapes:[b],attributes:a})
}}});
ORYX.Plugins.PetriNetStepThroughPlugin=ORYX.Plugins.AbstractStepThroughPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments)
},startAndCheckSyntax:function(){this.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.CHECK_FOR_ERRORS_EVENT,onErrors:function(){Ext.Msg.alert("Syntax Check","Some syntax errors have been found, please correct them!")
}.bind(this),onNoErrors:function(){if(this.initializeMarking()){this.firedTransitions=[];
this.showEnabledTransition()
}else{this.togglePlugin(false)
}}.bind(this)})
},initializeMarking:function(){var b=function(d,c){if(c==0){d.setProperty("oryx-numberoftokens_text","");
d.setProperty("oryx-numberoftokens_drawing","0")
}else{if(c==1){d.setProperty("oryx-numberoftokens_text","");
d.setProperty("oryx-numberoftokens_drawing","1")
}else{if(c==2){d.setProperty("oryx-numberoftokens_text","");
d.setProperty("oryx-numberoftokens_drawing","2")
}else{if(c==3){d.setProperty("oryx-numberoftokens_text","");
d.setProperty("oryx-numberoftokens_drawing","3")
}else{if(c==4){d.setProperty("oryx-numberoftokens_text","");
d.setProperty("oryx-numberoftokens_drawing","4")
}else{var e=parseInt(c,10);
if(e&&e>0){d.setProperty("oryx-numberoftokens_text",""+e);
d.setProperty("oryx-numberoftokens_drawing","0")
}else{d.setProperty("oryx-numberoftokens_text","");
d.setProperty("oryx-numberoftokens_drawing","0")
}}}}}}};
this.getPlaces().each(function(c){if("undefined"==typeof(c._setProperty_monkey)){c._setProperty_monkey=c.setProperty;
c.setProperty=function(e,d){if("oryx-numberoftokens"==e){b(c,d)
}c._setProperty_monkey.apply(c,arguments)
}
}});
var a=0;
this.getPlaces().each(function(c){var d=parseInt(c.properties["oryx-numberoftokens"]);
if(isNaN(d)){c.setProperty("oryx-numberoftokens",0)
}else{if(d>0){a+=d
}}});
if(0==a){this.getPlaces().each(function(c){if(c.getIncomingShapes().length==0){c.setProperty("oryx-numberoftokens",1)
}});
Ext.Msg.show({title:"No Tokens Found",msg:"Current marking of the Petri net doesn't contain any token. Tokens are added to the initial places of the net.",buttons:Ext.Msg.OK,icon:Ext.MessageBox.INFO})
}if(a>3){Ext.Msg.show({title:"Too Many Tokens On Place",msg:"Places with more than 3 tokens aren't supported yet. Please avoid this scenario.",buttons:Ext.Msg.OK,icon:Ext.MessageBox.WARNING})
}return true
},doMouseUp:function(c,a){if(!(this.isTransition(a))){return
}var b=this.getIncomingNodes(a).all(function(d){return parseInt(d.properties["oryx-numberoftokens"])>0
});
if(b){this.fireTransition(a)
}this.showEnabledTransition()
},onDeactivate:function(){this.hideOverlays();
while(this.firedTransitions.length!==0){this.undoLastFiredTransition()
}this.facade.getCanvas().update();
this.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.RESET_ERRORS_EVENT})
},fireTransition:function(a){this.firedTransitions.push(a);
this.getIncomingNodes(a).each(function(b){this.removeToken(b)
}.bind(this));
this.getOutgoingNodes(a).each(function(b){this.addToken(b)
}.bind(this))
},undoLastFiredTransition:function(){var a=this.firedTransitions.pop();
if(!a){return
}this.getIncomingNodes(a).each(function(b){this.addToken(b)
}.bind(this));
this.getOutgoingNodes(a).each(function(b){this.removeToken(b)
}.bind(this))
},removeToken:function(a){a.setProperty("oryx-numberoftokens",parseInt(a.properties["oryx-numberoftokens"])-1)
},addToken:function(a){var b=parseInt(a.properties["oryx-numberoftokens"])+1;
a.setProperty("oryx-numberoftokens",b);
if(b>3){Ext.Msg.show({title:"Too Many Tokens On Place",msg:"Places with more than 3 tokens aren't supported yet. Please avoid this scenario.",buttons:Ext.Msg.OK,icon:Ext.MessageBox.WARNING})
}},showEnabledTransition:function(){this.hideOverlays();
this.firedTransitions.each(function(a){this.showUsed(a,"1")
}.bind(this));
this.getEnabledTransitions().each(function(a){this.showPlayOnShape(a)
}.bind(this));
this.facade.getCanvas().update()
},getTransitions:function(){return this.facade.getCanvas().getChildShapes().select(function(a){return this.isTransition(a)
}.bind(this))
},isTransition:function(a){return a instanceof ORYX.Core.Shape&&a.getStencil().id().search(/Transition/)>-1
},getPlaces:function(){return this.facade.getCanvas().getChildShapes().select(function(a){return a.getStencil().id().search(/Place/)>-1
})
},getIncomingNodes:function(a){return a.getIncomingShapes().collect(function(b){return b.getIncomingShapes()
}).flatten()
},getOutgoingNodes:function(a){return a.getOutgoingShapes().collect(function(b){return b.getOutgoingShapes()
}).flatten()
},getEnabledTransitions:function(){return this.getTransitions().select(function(a){return this.getIncomingNodes(a).all(function(b){return parseInt(b.properties["oryx-numberoftokens"])>0
})
}.bind(this))
},undo:function(){this.undoLastFiredTransition();
this.showEnabledTransition()
}});
ORYX.Plugins.StepThroughPlugin=ORYX.Plugins.AbstractStepThroughPlugin.extend({construct:function(a){this.el=undefined;
this.callback=undefined;
this.executionTrace="";
this.rdf=undefined;
arguments.callee.$.construct.apply(this,arguments)
},prepareInitialMarking:function(){this.startNodes=[];
Ext.each(this.facade.getCanvas().getChildShapes(true),function(a){if(this.isStartNode(a)){this.startNodes.push(a);
a.initialMarkingFired=false;
this.showPlayOnShape(a);
if(a.getOutgoingShapes().size()==1){this.showOverlayOnShape(a.getOutgoingShapes()[0],{stroke:"green"});
a.getOutgoingShapes()[0].initialMarking=true
}}}.createDelegate(this))
},isStartNode:function(a){return(a.getStencil().id().search(/#Event$/)>-1)&&a.getIncomingShapes().length==0&&a.getOutgoingShapes().length==1
},isStartArc:function(a){return this.isStartNode(a.getIncomingShapes()[0])
},isStartArcOrNode:function(a){return this.isStartNode(a)||this.isStartArc(a)
},generateRDF:function(){try{var b=this.getRDFFromDOM();
b=!b.startsWith("<?xml")?'<?xml version="1.0" encoding="UTF-8"?>'+b:b
}catch(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,a)
}this.rdf=b
},getRDF:function(){if(this.rdf==undefined){this.generateRDF()
}return this.rdf
},startAndCheckSyntax:function(){this.postExecutionTrace({checkSyntax:true,onlyChangedObjects:false,onSuccess:function(a){if(a.responseText.startsWith("{")){var b=Ext.decode(a.responseText).syntaxErrors;
this.facade.raiseEvent({type:ORYX.Plugins.SyntaxChecker.SHOW_ERRORS_EVENT,errors:b})
}else{this.showObjectStates(a.responseText)
}}.bind(this)})
},fireObject:function(a){this.executionTrace+=a+";";
if(this.isOrSplit(this.el)){this.executionTrace=this.executionTrace.substring(0,this.executionTrace.length-1);
this.executionTrace+="#";
var c=new Ext.util.MixedCollection();
c.addAll(this.el.getOutgoingShapes());
var b=[];
c.filter("selectedForOrSplit","true").each(function(d){b.push(d.resourceId)
}.createDelegate(this));
c.each(function(d){d.selectedForOrSplit=false;
this.hideOverlayOnShape(d)
}.createDelegate(this));
this.executionTrace+=b.join(",")+";"
}this.postExecutionTrace({checkSyntax:false,onlyChangedObjects:true,onSuccess:function(d){if(d.responseText!=""){this.showObjectStates(d.responseText)
}else{this.removeLastFiredObject()
}}.bind(this)})
},doMouseUp:function(d,a){if(a instanceof ORYX.Core.Shape){if(a instanceof ORYX.Core.Edge&&this.isOrSplit(a.getIncomingShapes()[0])){this.doMouseUpOnEdgeComingFromOrSplit(a)
}else{if(a instanceof ORYX.Core.Edge&&this.getDiagramType()==="epc"&&this.isStartNode(a.getIncomingShapes()[0])){this.doMouseUpOnEdgeComingFromStartNode(a)
}else{if(this.getDiagramType()==="epc"&&this.isStartNode(a)){a.initialMarkingFired=true;
var c=a.getOutgoingShapes()[0];
this.hideOverlayOnShape(c);
if(c.initialMarking){this.showUsed(a,"1");
this.initialMarking.push(a.resourceId)
}else{this.hideOverlayOnShape(a)
}var b=true;
Ext.each(this.startNodes,function(e){if(!e.initialMarkingFired){b=false
}});
if(b){this.startAndCheckSyntax()
}}else{this.el=a;
this.fireObject(this.el.resourceId)
}}}}},showObjectStates:function(d){var a=d.split(";");
for(i=0;
i<a.size();
i++){var b=a[i].split(",");
if(b.size()<3){continue
}var c=this.facade.getCanvas().getChildShapeByResourceId(b[0]);
if(b[2]=="t"){this.showEnabled(c,b[1])
}else{if(b[1]!="0"){this.showUsed(c,b[1])
}else{this.hideOverlayOnShape(c)
}}}},doMouseUpOnEdgeComingFromOrSplit:function(b){var a=b.getIncomingShapes()[0];
if(b.selectedForOrSplit){this.showOverlayOnShape(b,{stroke:"orange"});
var c=new Ext.util.MixedCollection();
c.addAll(a.getOutgoingShapes());
if(c.filter("selectedForOrSplit","true").length<=1){this.hideOverlayOnShape(a)
}}else{this.showOverlayOnShape(b,{stroke:"green"});
this.showPlayOnShape(a)
}b.selectedForOrSplit=!b.selectedForOrSplit
},doMouseUpOnEdgeComingFromStartNode:function(a){a.initialMarking=!a.initialMarking;
if(a.initialMarking){this.showOverlayOnShape(a,{stroke:"green"})
}else{this.showOverlayOnShape(a,{stroke:"orange"})
}},isOrSplit:function(a){return(a.getStencil().id().search(/#(OR_Gateway|OrConnector)$/)>-1)&&(a.getOutgoingShapes().length>1)
},showEnabledOrSplit:function(a){Ext.each(a.getOutgoingShapes(),function(b){Ext.apply(b,{selectedForOrSplit:false});
this.showOverlayOnShape(b,{stroke:"orange"})
}.createDelegate(this))
},removeLastFiredObject:function(){this.executionTrace=this.executionTrace.replace(/[^;]*;$/,"")
},undo:function(){if(!this.active()){return
}if(this.executionTrace!==""){this.removeLastFiredObject();
this.postExecutionTrace({checkSyntax:false,onlyChangedObjects:false,onSuccess:function(a){this.hideOverlays(true);
this.showObjectStates(a.responseText)
}.bind(this)})
}else{if(this.getDiagramType()==="epc"){this.hideOverlays();
this.prepareInitialMarking()
}}},postExecutionTrace:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.StepThroughPlugin.executing});
new Ajax.Request(ORYX.CONFIG.STEP_THROUGH,{method:"POST",asynchronous:false,parameters:{rdf:this.getRDF(),checkSyntax:a.checkSyntax,fire:this.executionTrace,onlyChangedObjects:a.onlyChangedObjects,initialMarking:this.initialMarking.join(";")},onSuccess:function(b){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
a.onSuccess(b)
}.createDelegate(this),onFailure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}.createDelegate(this)})
}});