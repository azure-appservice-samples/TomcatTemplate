if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.SimulationResults=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_SHOW_RESULTS,this.showSimulationResults.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_DISPLAY_GRAPH,this.showGraph.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_PATH_SVG_GENERATED,this.pathSvgGenerated.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_ANNOTATE_PROCESS,this.annotateProcess.bind(this));
this.resultsjson=""
},showSimulationResults:function(a){Ext.getCmp("maintabs").setActiveTab(1);
this.updateSimView(a)
},showGraph:function(b){if(b&&b.value){var e=b.value;
if(e.id.startsWith("pgraph:")){var a=e.id.split(":");
var d=a[1];
if(d=="processaverages"){this.showProcessAveragesGraph(d,this.resultsjson)
}}else{if(e.id.startsWith("htgraph:")){var a=e.id.split(":");
var d=a[1];
this.showHumanTaskAveragesGraph(d,this.resultsjson)
}else{if(e.id.startsWith("tgraph:")){var a=e.id.split(":");
var d=a[1];
this.showTaskAveragesGraph(d,this.resultsjson)
}else{if(e.id.startsWith("pathgraph:")){var a=e.id.split(":");
var c=a[1];
this.showPathGraph(c,this.resultsjson)
}}}}}},_showProcessGraphs:function(a){this.showProcessAveragesGraph(a,this.resultsjson)
},updateSimView:function(a){this.createProcessInfo(a);
this.createGraphsTree(a)
},createProcessInfo:function(c){var a=jsonPath(c.results.evalJSON(),"$.siminfo.*");
var b='<table border="0" width="100%">                           <tr>                          <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsProcessId+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].id+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsProcessName+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].name+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsProcessVersion+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].version+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsSimStartTime+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].starttime+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsSimEndTime+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].endtime+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsNumOfExecutions+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].executions+'</span></td>                           </tr>                           <tr>                           <td><span style="font-size: 10px"><b>'+ORYX.I18N.View.sim.resultsInterval+'</b></span></td>                           <td><span style="font-size: 10px">'+a[0].interval+"</span></td>                           </tr>                           </table>";
if(a){Ext.getCmp("siminfopanel").body.update(b)
}},createGraphsTree:function(r){var q=new Ext.tree.TreeNode({listeners:{beforecollapse:function(s,j,t){return false
}}});
var c;
var d;
var a=[];
this.resultsjson=r.results;
var l=jsonPath(r.results.evalJSON(),"$.processsim.*");
if(l){c=new Ext.tree.TreeNode({text:ORYX.I18N.View.sim.resultsGroupProcess,allowDrag:false,allowDrop:false,expanded:true,isLeaf:false,singleClickExpand:false,listeners:{beforecollapse:function(s,j,t){return false
}}});
d=new Ext.tree.TreeNode({id:"pgraph:processaverages",text:l[0].name+" ("+l[0].id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:"xnd-icon",icon:ORYX.BASE_FILE_PATH+"images/simulation/diagram.png",singleClickExpand:false,listeners:{beforecollapse:function(s,j,t){return false
}}});
c.appendChild(d);
q.appendChild(c);
a.push(d)
}var n=jsonPath(r.results.evalJSON(),"$.htsim.*");
var h=jsonPath(r.results.evalJSON(),"$.tasksim.*");
if(n||h){c=new Ext.tree.TreeNode({text:ORYX.I18N.View.sim.resultsGroupProcessElements,allowDrag:false,allowDrop:false,expanded:true,isLeaf:false,singleClickExpand:true,listeners:{beforecollapse:function(s,j,t){return false
}}});
for(var m=0;
m<n.length;
m++){var p=n[m];
d=new Ext.tree.TreeNode({id:"htgraph:"+p.id,text:p.name+" ("+p.id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:window.SpriteUtils.toUniqueId(ORYX.BASE_FILE_PATH+"images/simulation/activities/User.png"),singleClickExpand:true});
c.appendChild(d);
a.push(d)
}for(var k=0;
k<h.length;
k++){var g=h[k];
this.taskType="None";
this.findTaskType(g.id);
this.taskType=this.taskType.replace(/\s/g,"");
d=new Ext.tree.TreeNode({id:"tgraph:"+g.id,text:g.name+" ("+g.id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:window.SpriteUtils.toUniqueId(ORYX.BASE_FILE_PATH+"images/simulation/activities/"+this.taskType+".png"),singleClickExpand:true});
c.appendChild(d);
a.push(d)
}q.appendChild(c)
}var f=jsonPath(r.results.evalJSON(),"$.pathsim.*");
if(f){c=new Ext.tree.TreeNode({text:ORYX.I18N.View.sim.resultsGroupProcessPaths,allowDrag:false,allowDrop:false,expanded:true,isLeaf:false,singleClickExpand:true,listeners:{beforecollapse:function(s,j,t){return false
}}});
for(var m=0;
m<f.length;
m++){var b=f[m];
d=new Ext.tree.TreeNode({id:"pathgraph:"+b.id,text:"Path "+(m+1)+" ("+b.id+")",allowDrag:false,allowDrop:false,expanded:true,isLeaf:true,iconCls:"xnd-icon",icon:ORYX.BASE_FILE_PATH+"images/simulation/pathicon.png",singleClickExpand:true});
c.appendChild(d);
a.push(d)
}q.appendChild(c)
}Ext.getCmp("simresultscharts").setRootNode(q);
Ext.getCmp("simresultscharts").getRootNode().render();
Ext.getCmp("simresultscharts").el.dom.style.height="100%";
Ext.getCmp("simresultscharts").el.dom.style.overflow="scroll";
Ext.getCmp("simresultscharts").render();
var o=Ext.getCmp("simresultscharts");
var e=o.getNodeById("pgraph:processaverages");
e.select();
this._showProcessGraphs("processaverages");
if((Object.hasOwnProperty.call(window,"ActiveXObject")&&!window.ActiveXObject)||(navigator.appVersion.indexOf("MSIE 10")!==-1)){this.createDragZoneForIE(q,a)
}},createDragZoneForIE:function(e,a){var b=new Ext.dd.DragZone(e.getUI().getEl(),{shadow:!Ext.isMac});
b.onMouseUp=this.onMouseUpInDragZoneForIE.bind(this,b);
for(i=0;
i<a.length;
i++){var c=a[i];
var d=c.getUI();
Ext.dd.Registry.register(d.elNode,{node:d.node,handles:[d.elNode,d.textNode],isHandle:false,id:c.id})
}},onMouseUpInDragZoneForIE:function(b){if(b&&b.dragData&&b.dragData.id){var a={value:{id:b.dragData.id}};
this.showGraph(a)
}},findTaskType:function(a){ORYX.EDITOR._canvas.getChildren().each((function(b){this.isTaskType(b,a)
}).bind(this))
},isTaskType:function(b,a){if(b instanceof ORYX.Core.Node){if(b.resourceId==a&&b.properties["oryx-tasktype"]){this.taskType=b.properties["oryx-tasktype"]
}if(b.getChildren().size()>0){for(var c=0;
c<b.getChildren().size();
c++){if(b.getChildren()[c] instanceof ORYX.Core.Node){this.isTaskType(b.getChildren()[c],a)
}}}}},showProcessAveragesGraph:function(a,d){var o=jsonPath(d.evalJSON(),"$.processsim.*");
var g=jsonPath(d.evalJSON(),"$.timeline");
var k=jsonPath(d.evalJSON(),"$.activityinstances.*");
var m=jsonPath(d.evalJSON(),"$.eventaggregations.*");
var e=[];
var c=jsonPath(d.evalJSON(),"$.htsim.*");
for(var f=0;
f<c.length;
f++){var p=c[f];
e.push(p.costvalues)
}var b=[];
var j=jsonPath(d.evalJSON(),"$.htsim.*");
for(var f=0;
f<j.length;
f++){var p=j[f];
b.push(p.resourcevalues)
}var h={timeline:g[0]};
var l=ORYX.EDITOR.getSerializedJSON();
var n=jsonPath(l.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(n);
ORYX.EDITOR.simulationChartData=o;
ORYX.EDITOR.simulationEventData=h;
ORYX.EDITOR.simulationEventAggregationData=m;
ORYX.EDITOR.simulationInstancesData=k;
ORYX.EDITOR.simulationHTCostData=e;
ORYX.EDITOR.simulationHTResourceData=b;
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesProcessSimResults;
ORYX.EDITOR.simulationChartId=o[0].id;
ORYX.EDITOR.simulationChartNodeName=o[0].name;
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/processchart.jsp"
},showTaskAveragesGraph:function(h,e){var f=jsonPath(e.evalJSON(),"$.tasksim.*");
for(var b=0;
b<f.length;
b++){var a=f[b];
if(a.id==h){var d=[];
d[0]=a;
var c=ORYX.EDITOR.getSerializedJSON();
var g=jsonPath(c.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(g);
ORYX.EDITOR.simulationChartData=d;
ORYX.EDITOR.simulationEventData=d[0].timeline;
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesTaskSimResults;
ORYX.EDITOR.simulationChartId=d[0].id;
ORYX.EDITOR.simulationChartNodeName=d[0].name;
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/taskchart.jsp"
}}},showHumanTaskAveragesGraph:function(f,d){var g=jsonPath(d.evalJSON(),"$.htsim.*");
for(var c=0;
c<g.length;
c++){var a=g[c];
if(a.id==f){var b=ORYX.EDITOR.getSerializedJSON();
var e=jsonPath(b.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(e);
ORYX.EDITOR.simulationChartData=a;
ORYX.EDITOR.simulationEventData=a.timeline;
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesHumanTaskSimResults;
ORYX.EDITOR.simulationChartId=a.id;
ORYX.EDITOR.simulationChartNodeName=a.name;
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/humantaskchart.jsp"
}}},showPathGraph:function(c,b){var e=jsonPath(b.evalJSON(),"$.pathsim.*");
var a=ORYX.EDITOR.getSerializedJSON();
var d=jsonPath(a.evalJSON(),"$.properties.timeunit");
ORYX.EDITOR.simulationChartTimeUnit=this.getSimTimeUnit(d);
ORYX.EDITOR.simulationChartTitle=ORYX.I18N.View.sim.resultsTitlesPathExecutionInfo+" ("+c+")";
ORYX.EDITOR.simulationPathData=e;
ORYX.EDITOR.simulationPathId=c;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_BUILD_PATH_SVG,pid:c})
},pathSvgGenerated:function(){ORYX.EDITOR.simulationPathSVG=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
Ext.getDom("simchartframe").src=ORYX.BASE_FILE_PATH+"simulation/pathschart.jsp";
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_CLEAR_PATH_SVG})
},annotateProcess:function(a){this.resetNodeColors();
this.resetNodeOverlays();
this.annotateNode(a.nodeid,a.eventnum,a.data);
setTimeout(function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_SHOW_ANNOTATED_PROCESS,data:DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false)),wind:window,docu:document});
this.resetNodeColors();
this.resetNodeOverlays()
}.bind(this),500)
},resetNodeOverlays:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"simmodelmax"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"simmodelmin"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"simmodelavg"})
},resetNodeColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.setOriginalValues(a)
}).bind(this))
},setOriginalValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor",a.properties["oryx-origbordercolor"]);
a.setProperty("oryx-bgcolor",a.properties["oryx-origbgcolor"])
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.setOriginalValues(a.getChildren()[b])
}}}},annotateNode:function(c,a,b){ORYX.EDITOR._canvas.getChildren().each((function(d){this.setNodeAnnotation(d,c,a,b)
}).bind(this))
},setNodeAnnotation:function(h,a,g,f){if(h instanceof ORYX.Core.Node||h instanceof ORYX.Core.Edge){if(h.resourceId==a){var d=this.getDisplayColor(1);
h.setProperty("oryx-bordercolor",d);
h.setProperty("oryx-bgcolor",d);
h.refresh();
var c=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:"modelmax",style:"stroke-width:1;fill:red;font-family:arial;font-weight:bold","font-size":10}]);
c.textContent="Max: "+f.values[0].value;
var j=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:"modelmin",style:"stroke-width:1;fill:blue;font-family:arial;font-weight:bold","font-size":10}]);
j.textContent="Min: "+f.values[1].value;
var b=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:"modelavg",style:"stroke-width:1;fill:green;font-family:arial;font-weight:bold","font-size":10}]);
b.textContent="Avg: "+f.values[2].value;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"simmodelmax",shapes:[h],node:c,nodePosition:"SIMMODELMAX"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"simmodelmin",shapes:[h],node:j,nodePosition:"SIMMODELMIN"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"simmodelavg",shapes:[h],node:b,nodePosition:"SIMMODELAVG"})
}}if(h.getChildren().size()>0){for(var e=0;
e<h.getChildren().size();
e++){if(h.getChildren()[e] instanceof ORYX.Core.Node||h.getChildren()[e] instanceof ORYX.Core.Edge){this.setNodeAnnotation(h.getChildren()[e],a,g,f)
}}}},getDisplayColor:function(b){var a=["#3399FF","#FFCC33","#FF99FF","#6666CC","#CCCCCC","#66FF00","#FFCCFF","#0099CC","#CC66FF","#FFFF00","#993300","#0000CC","#3300FF","#990000","#33CC00"];
return a[b]
},getSimTimeUnit:function(a){if(ORYX.I18N.View.sim.chartsTimeUnits[a]!==undefined){return ORYX.I18N.View.sim.chartsTimeUnits[a]
}else{return a
}}});