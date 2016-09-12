if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.Simulation=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.View.sim.processPathsTitle,functionality:this.findPaths.bind(this),group:"validationandsimulation",icon:ORYX.BASE_FILE_PATH+"images/path.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/simulation.png",description:ORYX.I18N.View.sim.processPaths,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.View.sim.runSim,functionality:this.runSimulation.bind(this),group:"validationandsimulation",icon:ORYX.BASE_FILE_PATH+"images/control_play.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/simulation.png",description:ORYX.I18N.View.sim.runSim,index:2,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_BUILD_PATH_SVG,this.autoDisplayPath.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SIMULATION_CLEAR_PATH_SVG,this.resetNodeColors.bind(this))
},autoDisplayPath:function(a){if(a&&a.pid){var b=a.pid;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.creatingPathImage,title:""});
Ext.Ajax.request({url:ORYX.PATH+"simulation",method:"POST",success:function(d){try{if(d.responseText&&d.responseText.length>0){var j=d.responseText.evalJSON();
var h=j.paths;
for(var f in h){if(f==b){var c=this.getDisplayColor(0);
var i=h[f];
this.setNodeColors(f,c,i)
}}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_PATH_SVG_GENERATED})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorInvalidData,title:""})
}}catch(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+":\n"+g,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+".",title:""})
},params:{action:"getpathinfo",profile:ORYX.PROFILE,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,sel:""}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorUnknownPathId,title:""})
}},findPaths:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.calculatingPaths,title:""});
var b=this.facade.getSelection();
var a="";
var c=ORYX.I18N.View.sim.processPathsTitle;
if(b.length==1){b.each(function(d){if(d.getStencil().title()=="Embedded"||d.getStencil().title()=="Event"){a=d.resourceId;
c=ORYX.I18N.View.sim.subProcessPathsTitle
}})
}Ext.Ajax.request({url:ORYX.PATH+"simulation",method:"POST",success:function(m){try{if(m.responseText&&m.responseText.length>0){var t=m.responseText.evalJSON();
var p=t.paths;
var f=Ext.data.Record.create([{name:"display"},{name:"numele"},{name:"pid"}]);
var u=new Ext.data.MemoryProxy({root:[]});
var h=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},f),proxy:u,sorters:[{property:"display",direction:"ASC"}]});
h.load();
var s=0;
for(var r in p){var i=p[r];
var q=i.split("|");
h.add(new f({display:this.getDisplayColor(s),numele:q.length,pid:r}));
s++
}h.commitChanges();
var g=ORYX.Utils.getDialogSize(200,330);
var l=(g.width-80)/5;
var k=Ext.id();
var d=new Ext.grid.EditorGridPanel({store:h,id:k,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"display",header:ORYX.I18N.View.sim.dispColor,width:l*2,dataIndex:"display",renderer:function(e){if(e){return'<center><div width="20px" height="8px" style="width:20px;height:8px;background-color:'+e+'"></div></center>'
}else{return"<center>None</center>"
}}},{id:"numele",header:ORYX.I18N.View.sim.numElements,width:l*3,dataIndex:"numele",renderer:function(e){if(e){return"<center>"+e+"</center>"
}else{return"<center>0</center>"
}}}]),autoHeight:true});
var j=new Ext.Panel({id:"processPathsPanel",title:"<center>"+ORYX.I18N.View.sim.select+c+" "+ORYX.I18N.View.sim.display+"</center>",layout:"column",items:[d],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var o=new Ext.Window({layout:"anchor",autoCreate:true,title:c,height:g.height,width:g.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){o.hide()
}.bind(this)}],items:[j],listeners:{hide:function(){this.resetNodeColors();
o.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.View.sim.showPath,handler:function(){if(d.getSelectionModel().getSelectedCell()!=null){var e=d.getSelectionModel().getSelectedCell()[0];
var v=h.getAt(e).data.pid;
this.setNodeColors(v,this.getDisplayColor(e),p[v])
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.selectPath,title:""})
}}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){this.resetNodeColors();
o.hide()
}.bind(this)}]});
o.show()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorInvalidData,title:""})
}}catch(n){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+":\n"+n,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.errorFindingPath+".",title:""})
},params:{action:"getpathinfo",profile:ORYX.PROFILE,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,sel:a}})
},getDisplayColor:function(b){var a=["#3399FF","#FFCC33","#FF99FF","#6666CC","#CCCCCC","#66FF00","#FFCCFF","#0099CC","#CC66FF","#FFFF00","#993300","#0000CC","#3300FF","#990000","#33CC00"];
return a[b]
},setDefaultColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.setDefaultValues(a)
}).bind(this))
},setDefaultValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor",a.properties["oryx-origbordercolor"]);
a.setProperty("oryx-bgcolor",a.properties["oryx-origbgcolor"])
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.setDefaultValues(a.getChildren()[b])
}}}},resetNodeColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.setOriginalValues(a)
}).bind(this))
},setOriginalValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){if(a.savedbordercolor!==undefined){a.setProperty("oryx-bordercolor",a.savedbordercolor);
delete a.savedbordercolor
}if(a.savedbgcolor!==undefined){a.setProperty("oryx-bgcolor",a.savedbgcolor);
delete a.savedbgcolor
}}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.setOriginalValues(a.getChildren()[b])
}}}},saveNodeColors:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.saveOriginalValues(a)
}).bind(this))
},saveOriginalValues:function(a){if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){if(a.savedbordercolor===undefined){a.savedbordercolor=a.properties["oryx-bordercolor"]
}if(a.savedbgcolor===undefined){a.savedbgcolor=a.properties["oryx-bgcolor"]
}}if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.saveOriginalValues(a.getChildren()[b])
}}}},setNodeColors:function(c,b,a){this.saveNodeColors();
this.setDefaultColors();
ORYX.EDITOR._canvas.getChildren().each((function(d){this.applyPathColors(d,b,a)
}).bind(this))
},applyPathColors:function(b,a,e){var d=e.split("|");
if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){for(var c=0;
c<d.length;
c++){var f=d[c];
if(b.resourceId==f){b.setProperty("oryx-bordercolor",a);
b.setProperty("oryx-bgcolor",a)
}}}b.refresh();
if(b.getChildren().size()>0){for(var c=0;
c<b.getChildren().size();
c++){if(b.getChildren()[c] instanceof ORYX.Core.Node||b.getChildren()[c] instanceof ORYX.Core.Edge){this.applyPathColors(b.getChildren()[c],a,e)
}}}},runSimulation:function(){var e=ORYX.Utils.getDialogSize(300,350);
var a=e.width/2;
var d=e.width/3;
var b=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:a,defaultType:"numberfield",items:[{fieldLabel:ORYX.I18N.View.sim.numInstances,name:"instances",allowBlank:false,allowDecimals:false,minValue:1,width:d},{fieldLabel:ORYX.I18N.View.sim.interval,name:"interval",allowBlank:false,allowDecimals:false,minValue:1,width:d},{xtype:"combo",name:"intervalunits",store:new Ext.data.SimpleStore({fields:["units","value"],data:[["millisecond",ORYX.I18N.LocalHistory.unitsMillisecond],["seconds",ORYX.I18N.LocalHistory.unitsSeconds],["minutes",ORYX.I18N.LocalHistory.unitsMinutes],["hours",ORYX.I18N.LocalHistory.unitsHours],["days",ORYX.I18N.LocalHistory.unitsDays]]}),allowBlank:false,displayField:"value",valueField:"units",mode:"local",typeAhead:true,value:"minutes",triggerAction:"all",fieldLabel:ORYX.I18N.View.sim.intervalUnits,width:d}]});
var c=new Ext.Window({autoCreate:true,layout:"fit",plain:true,bodyStyle:"padding:5px;",title:ORYX.I18N.View.sim.runSim,height:e.height,width:e.width,modal:true,fixedcenter:true,shadow:true,proxyDrag:true,resizable:true,items:[b],buttons:[{text:ORYX.I18N.View.sim.runSim,handler:function(){c.hide();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.View.sim.runningSim,title:""});
var f=b.items.items[0].getValue();
var h=b.items.items[1].getValue();
var g=b.items.items[2].getValue();
Ext.Ajax.request({url:ORYX.PATH+"simulation",method:"POST",success:function(i){try{if(i.responseText&&i.responseText.length>0&&i.status==200){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_SHOW_RESULTS,results:i.responseText})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.simNoResults+i.statusText,title:""})
}}catch(j){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.unableToPerform+j,title:""})
}}.bind(this),failure:function(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.View.sim.unableToPerform+i.responseText,title:""})
}.bind(this),params:{action:"runsimulation",profile:ORYX.PROFILE,json:ORYX.EDITOR.getSerializedJSON(),ppdata:ORYX.PREPROCESSING,numinstances:f,interval:h,intervalunit:g}})
}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){c.hide()
}.bind(this)}]});
c.on("hide",function(){c.destroy(true);
delete c
});
c.show()
}});