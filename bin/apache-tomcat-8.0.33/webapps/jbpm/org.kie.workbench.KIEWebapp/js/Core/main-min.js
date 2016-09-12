var idCounter=0;
var ID_PREFIX="resource";
function init(){Ext.BLANK_IMAGE_URL=ORYX.BASE_FILE_PATH+"lib/ext-2.0.2/resources/images/default/s.gif";
ORYX.Log.debug("Querying editor instances");
ORYX.Editor.setMissingClasses()
}if(!ORYX){var ORYX={}
}ORYX.Editor={DOMEventListeners:new Hash(),selection:[],zoomLevel:1,construct:function(d){this._eventsQueue=[];
this.loadedPlugins=[];
this.pluginsData=[];
this.simulationChartTimeUnit="";
this.simulationChartData="";
this.simulationEventData="";
this.simulationEventAggregationData="";
this.simulationInstancesData="";
this.simulationHTCostData="";
this.simulationHTResourceData="";
this.simulationChartTitle="";
this.simulationChartId="";
this.simulationChartNodeName="";
this.simulationPathData="";
this.simulationPathId="";
this.simulationPathSVG="";
this.localStorageSVG="";
this.imagePreviewSVG="";
this.modelMetaData=d;
var c=d;
if(d.model){c=d.model
}this.updateViewLockState();
if(d.error){Ext.Msg.show({title:"Unable to open Process",msg:"Process will be opened with XML Editor",buttons:Ext.MessageBox.OK,fn:function(h,g){parent.designeropeninxmleditortab(ORYX.UUID)
}})
}this.id=c.resourceId;
if(!this.id){this.id=c.id;
if(!this.id){this.id=ORYX.Editor.provideId()
}}this.fullscreen=c.fullscreen||true;
this._initEventListener();
if(ORYX.CONFIG.BACKEND_SWITCH){var b=(c.stencilset.namespace||c.stencilset.url).replace("#","%23");
ORYX.Core.StencilSet.loadStencilSet(ORYX.CONFIG.STENCILSET_HANDLER+b,this.id)
}else{var b=c.stencilset.url;
ORYX.Core.StencilSet.loadStencilSet(b,this.id)
}if(!!ORYX.CONFIG.SSEXTS){ORYX.CONFIG.SSEXTS.each(function(g){this.loadSSExtension(g)
}.bind(this))
}this._createCanvas(c.stencil?c.stencil.id:null,c.properties);
this._generateGUI(d);
var f=false;
var e=false;
var a=function(){if(!f||!e){return
}this._finishedLoading()
}.bind(this);
ORYX.Editor.makeExtModalWindowKeysave(this._getPluginFacade());
window.setTimeout(function(){this.loadPlugins();
f=true;
a()
}.bind(this),100);
window.setTimeout(function(){this.loadSerialized(c);
this.getCanvas().update();
e=true;
a()
}.bind(this),200)
},updateViewLockState:function(){if(ORYX.INSTANCE_VIEW_MODE!=true){if((typeof parent.isLocked==="function")&&(typeof parent.isLockedByCurrentUser==="function")){var a=parent.isLocked();
var b=parent.isLockedByCurrentUser();
var c=(ORYX.READONLY==true)||(ORYX.VIEWLOCKED==true);
if(!a){ORYX.VIEWLOCKED=false
}else{if(a&&!b){ORYX.VIEWLOCKED=true
}else{if(a&&b){ORYX.VIEWLOCKED=false
}}}if(c&&!ORYX.VIEWLOCKED){if(typeof parent.reload==="function"){ORYX.PROCESS_SAVED=true;
parent.reload()
}}}}},_finishedLoading:function(){if(Ext.getCmp("oryx-loading-panel")){Ext.getCmp("oryx-loading-panel").hide()
}this.layout.doLayout();
new Ext.dd.DropTarget(this.getCanvas().rootNode.parentNode);
if(ORYX.CONFIG.PANEL_RIGHT_COLLAPSED===true){this.layout_regions.east.collapse()
}if(ORYX.CONFIG.PANEL_LEFT_COLLAPSED===true){this.layout_regions.west.collapse()
}this.handleEvents({type:ORYX.CONFIG.EVENT_LOADED})
},_initEventListener:function(){document.documentElement.addEventListener(ORYX.CONFIG.EVENT_KEYDOWN,this.catchKeyDownEvents.bind(this),true);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_KEYUP,this.catchKeyUpEvents.bind(this),true);
this._keydownEnabled=true;
this._keyupEnabled=true;
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEDOWN]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEUP]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEOVER]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEOUT]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_SELECTION_CHANGED]=[];
this.DOMEventListeners[ORYX.CONFIG.EVENT_MOUSEMOVE]=[]
},_chartSelected:function(b,a){this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_SIMULATION_DISPLAY_GRAPH,value:b})
},_generateGUI:function(b){var c=660;
var f=this.getCanvas().rootNode.parentNode;
this.centerContentPanel=new Ext.Panel({autoScroll:true,cmargins:{left:0,right:0},border:false,items:{layout:"fit",autoHeight:true,el:f}});
this.resultsChartPanel=new Ext.Panel({border:false,id:"simchart",html:"<svg></svg>"});
this.simResultsContentPanel=new Ext.Panel({id:"simresultscontent",autoScroll:true,autoheight:true,border:false,items:[{xtype:"component",id:"simchartframe",anchor:"100%",autoScroll:true,autoEl:{tag:"iframe",src:ORYX.BASE_FILE_PATH+"simulation/default.jsp",width:"100%",height:"500",frameborder:"0",scrolling:"auto"}}]});
this.simInfoPanel=new Ext.Panel({bodyStyle:"background:#ffff;font-size:9px;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;padding-left:5px;",id:"siminfopanel",title:ORYX.I18N.View.sim.resultsInfo,autoScroll:true,autoheight:false,height:300,border:false,html:""});
this.simResultsTree=new Ext.tree.TreePanel({id:"simresultscharts",title:ORYX.I18N.View.sim.resultsGraphs,animate:true,loader:new Ext.tree.TreeLoader(),rootVisible:false,scroll:true,autoScroll:true,autoheight:true,viewConfig:{style:{overflow:"scroll",overflowY:"scroll",overflowX:"scroll"}},lines:true,listeners:{click:{fn:this._chartSelected.bind(this)}}});
var a=new Ext.tree.TreeNode({draggable:false,id:"simcharts"});
this.simResultsTree.setRootNode(a);
this.simResultsContentPanelLayout=new Ext.Panel({width:"100%",autoscroll:true,layout:"border",items:[{xtype:"panel",region:"east",margins:"5 0 0 5",layout:"fit",anchor:"100%",width:300,border:false,collapsible:true,autoscroll:true,split:false,cmargins:"5 5 0 5",bodyCfg:{style:{overflow:"auto"}},autoScroll:true,items:[this.simResultsTree,this.simInfoPanel]},{xtype:"panel",region:"center",layout:"fit",anchor:"100%",border:false,autoscroll:true,autoheight:true,margins:"5 5 0 0",items:[this.simResultsContentPanel]}]});
this.processDocContentPanel=new Ext.Panel({id:"processdoccontent",autoScroll:true,autoheight:true,border:false,items:[{xtype:"component",id:"processdocframe",anchor:"100%",autoScroll:true,autoEl:{tag:"iframe",src:ORYX.BASE_FILE_PATH+"processdoc/default.jsp",width:"100%",height:"500",frameborder:"0",scrolling:"auto"}}]});
this.processDocPanelLayout=new Ext.Panel({width:"100%",autoscroll:true,layout:"border",items:[{xtype:"panel",region:"center",layout:"fit",anchor:"100%",border:false,autoscroll:true,autoheight:true,margins:"5 5 0 0",items:[this.processDocContentPanel]}]});
var g={id:"maintabs",region:"center",cls:"x-panel-editor-center",autoScroll:false,cmargins:{left:0,right:0},activeTab:0,border:false,tabPosition:"top",anchor:"100%",deferredRender:false,listeners:{tabchange:function(h,i){if(i.id=="processdoctab"){document.getElementById("processdocframe").contentWindow.showProcessDocs()
}this.centerContentTabPannel.doLayout();
this.simResultsContentPanelLayout.doLayout();
this.processDocPanelLayout.doLayout();
h.doLayout()
}.bind(this)},items:[{layout:"fit",title:ORYX.I18N.View.tabs.modelling,id:"processmodellingtab",items:[this.centerContentPanel]},{layout:"fit",title:ORYX.I18N.View.tabs.simResults,id:"simulationtab",autoScroll:false,items:[this.simResultsContentPanelLayout]},{layout:"fit",title:ORYX.I18N.View.tabs.processDoc,id:"processdoctab",autoScroll:false,items:[this.processDocPanelLayout]}]};
this.centerContentTabPannel=new Ext.TabPanel(g);
if(ORYX.READONLY==true){Ext.getCmp("maintabs").remove("simulationtab");
Ext.getCmp("maintabs").remove("processdoctab")
}if(ORYX.VIEWLOCKED==true){Ext.getCmp("maintabs").remove("simulationtab");
Ext.getCmp("maintabs").remove("processdoctab")
}var e=ORYX.CONFIG.PANEL_LEFT_WIDTH||400;
if(ORYX.READONLY==true){e=10
}if(ORYX.VIEWLOCKED==true){e=10
}this.layout_regions={north:new Ext.Panel({region:"north",cls:"x-panel-editor-north",autoEl:"div",border:false}),east:new Ext.Panel({region:"east",layout:"anchor",autoEl:"div",border:false,cls:"x-panel-editor-east",width:e,autoScroll:true,split:false,animate:true,collapsible:true,titleCollapse:true,title:"Properties",plugins:new Ext.ux.PanelCollapsedTitlePlugin()}),south:new Ext.Panel({region:"south",cls:"x-panel-editor-south",autoEl:"div",border:false}),west:new Ext.Panel({region:"west",layout:"anchor",autoEl:"div",border:false,cls:"x-panel-editor-west",width:ORYX.CONFIG.PANEL_LEFT_WIDTH||200,autoScroll:true,split:false,animate:true,collapsible:true,titleCollapse:true,title:ORYX.I18N.main.shapeRepo,plugins:new Ext.ux.PanelCollapsedTitlePlugin()}),center:this.centerContentTabPannel};
for(region in this.layout_regions){if((region!="center"&&region!="north")&&(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.layout_regions[region].setVisible(false)
}}var d={layout:"border",items:[this.layout_regions.north,this.layout_regions.east,this.layout_regions.south,this.layout_regions.west,this.layout_regions.center]};
this.contentviewport=new Ext.Viewport(d);
if(this.fullscreen){this.layout=new Ext.Viewport(d)
}else{d.renderTo=this.id;
d.height=c;
this.layout=new Ext.Panel(d)
}f.parentNode.setAttributeNS(null,"align","center");
f.setAttributeNS(null,"align","left");
this.getCanvas().setSize({width:ORYX.CONFIG.CANVAS_WIDTH,height:ORYX.CONFIG.CANVAS_HEIGHT})
},addToRegion:function(d,a,e){if(d.toLowerCase&&this.layout_regions[d.toLowerCase()]){var b=this.layout_regions[d.toLowerCase()];
b.add(a);
ORYX.Log.debug("original dimensions of region %0: %1 x %2",b.region,b.width,b.height);
if(!b.width&&a.initialConfig&&a.initialConfig.width){ORYX.Log.debug("resizing width of region %0: %1",b.region,a.initialConfig.width);
b.setWidth(a.initialConfig.width)
}if(a.initialConfig&&a.initialConfig.height){ORYX.Log.debug("resizing height of region %0: %1",b.region,a.initialConfig.height);
var c=b.height||0;
b.height=a.initialConfig.height+c;
b.setHeight(a.initialConfig.height+c)
}if(typeof e=="string"){b.setTitle(e)
}b.ownerCt.doLayout();
if((ORYX.VIEWLOCKED==true||ORYX.READONLY==true)&&b.region!="center"){}else{b.show()
}if(Ext.isMac){ORYX.Editor.resizeFix()
}return b
}return null
},getAvailablePlugins:function(){var a=ORYX.availablePlugins.clone();
a.each(function(b){if(this.loadedPlugins.find(function(c){return c.type==this.name
}.bind(b))){b.engaged=true
}else{b.engaged=false
}}.bind(this));
return a
},loadScript:function(b,c){var a=document.createElement("script");
a.type="text/javascript";
if(a.readyState){a.onreadystatechange=function(){if(a.readyState=="loaded"||a.readyState=="complete"){a.onreadystatechange=null;
c()
}}
}else{a.onload=function(){c()
}
}a.src=b;
document.getElementsByTagName("head")[0].appendChild(a)
},activatePluginByName:function(name,callback,loadTry){var match=this.getAvailablePlugins().find(function(value){return value.name==name
});
if(match&&(!match.engaged||(match.engaged==="false"))){var loadedStencilSetsNamespaces=this.getStencilSets().keys();
var facade=this._getPluginFacade();
var newPlugin;
var me=this;
ORYX.Log.debug("Initializing plugin '%0'",match.name);
if(!match.requires||!match.requires.namespaces||match.requires.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
})){if(!match.notUsesIn||!match.notUsesIn.namespaces||!match.notUsesIn.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
})){try{var className=eval(match.name);
var newPlugin=new className(facade,match);
newPlugin.type=match.name;
if(newPlugin.registryChanged){newPlugin.registryChanged(me.pluginsData)
}if(newPlugin.onSelectionChanged){me.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,newPlugin.onSelectionChanged.bind(newPlugin))
}this.loadedPlugins.push(newPlugin);
this.loadedPlugins.each(function(loaded){if(loaded.registryChanged){loaded.registryChanged(this.pluginsData)
}}.bind(me));
callback(true)
}catch(e){ORYX.Log.warn("Plugin %0 is not available",match.name);
if(!!loadTry){callback(false,"INITFAILED");
return
}this.loadScript("plugins/scripts/"+match.source,this.activatePluginByName.bind(this,match.name,callback,true))
}}else{callback(false,"NOTUSEINSTENCILSET");
ORYX.Log.info("Plugin need a stencilset which is not loaded'",match.name)
}}else{callback(false,"REQUIRESTENCILSET");
ORYX.Log.info("Plugin need a stencilset which is not loaded'",match.name)
}}else{callback(false,match?"NOTFOUND":"YETACTIVATED")
}},loadPlugins:function(){var me=this;
var newPlugins=[];
var loadedStencilSetsNamespaces=this.getStencilSets().keys();
var facade=this._getPluginFacade();
if(ORYX.MashupAPI&&ORYX.MashupAPI.loadablePlugins&&ORYX.MashupAPI.loadablePlugins instanceof Array){ORYX.availablePlugins=$A(ORYX.availablePlugins).findAll(function(value){return ORYX.MashupAPI.loadablePlugins.include(value.name)
});
ORYX.MashupAPI.loadablePlugins.each(function(className){if(!(ORYX.availablePlugins.find(function(val){return val.name==className
}))){ORYX.availablePlugins.push({name:className})
}})
}ORYX.availablePlugins.each(function(value){ORYX.Log.debug("Initializing plugin '%0'",value.name);
if((!value.requires||!value.requires.namespaces||value.requires.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
}))&&(!value.notUsesIn||!value.notUsesIn.namespaces||!value.notUsesIn.namespaces.any(function(req){return loadedStencilSetsNamespaces.indexOf(req)>=0
}))&&(value.engaged||(value.engaged===undefined))){try{var className=eval(value.name);
if(className){var plugin=new className(facade,value);
plugin.type=value.name;
newPlugins.push(plugin);
plugin.engaged=true
}}catch(e){ORYX.Log.warn("Plugin %0 is not available",value.name)
}}else{ORYX.Log.info("Plugin need a stencilset which is not loaded'",value.name)
}});
newPlugins.each(function(value){if(value.registryChanged){value.registryChanged(me.pluginsData)
}if(value.onSelectionChanged){me.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,value.onSelectionChanged.bind(value))
}});
this.loadedPlugins=newPlugins;
if(Ext.isMac){ORYX.Editor.resizeFix()
}this.registerPluginsOnKeyEvents();
this.setSelection()
},_createCanvas:function(c,d){if(c){if(c.search(/^http/)===-1){c=this.getStencilSets().values()[0].namespace()+c
}}else{c=this.getStencilSets().values()[0].findRootStencilName()
}var a=ORYX.Core.StencilSet.stencil(c);
if(!a){ORYX.Log.fatal("Initialisation failed, because the stencil with the type %0 is not part of one of the loaded stencil sets.",c)
}var e=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",null,["div"]);
e.addClassName("ORYX_Editor");
this._canvas=new ORYX.Core.Canvas({width:ORYX.CONFIG.CANVAS_WIDTH,height:ORYX.CONFIG.CANVAS_HEIGHT,eventHandlerCallback:this.handleEvents.bind(this),id:this.id,parentNode:e},a);
if(d){var b=[];
for(field in d){b.push({prefix:"oryx",name:field,value:d[field]})
}this._canvas.deserialize(b)
}},_getPluginFacade:function(){if(!(this._pluginFacade)){this._pluginFacade={activatePluginByName:this.activatePluginByName.bind(this),getAvailablePlugins:this.getAvailablePlugins.bind(this),offer:this.offer.bind(this),getStencilSets:this.getStencilSets.bind(this),getRules:this.getRules.bind(this),loadStencilSet:this.loadStencilSet.bind(this),createShape:this.createShape.bind(this),deleteShape:this.deleteShape.bind(this),getSelection:this.getSelection.bind(this),setSelection:this.setSelection.bind(this),updateSelection:this.updateSelection.bind(this),getCanvas:this.getCanvas.bind(this),importJSON:this.importJSON.bind(this),importERDF:this.importERDF.bind(this),getERDF:this.getERDF.bind(this),getJSON:this.getJSON.bind(this),getSerializedJSON:this.getSerializedJSON.bind(this),checkParsingErrors:this.checkParsingErrors.bind(this),showParsingErrors:this.showParsingErrors.bind(this),executeCommands:this.executeCommands.bind(this),registerOnEvent:this.registerOnEvent.bind(this),unregisterOnEvent:this.unregisterOnEvent.bind(this),raiseEvent:this.handleEvents.bind(this),enableEvent:this.enableEvent.bind(this),disableEvent:this.disableEvent.bind(this),eventCoordinates:this.eventCoordinates.bind(this),addToRegion:this.addToRegion.bind(this),getModelMetaData:this.getModelMetaData.bind(this)}
}return this._pluginFacade
},executeCommands:function(a){if(a instanceof Array&&a.length>0&&a.all(function(c){return c instanceof ORYX.Core.Command
})){this.handleEvents({type:ORYX.CONFIG.EVENT_EXECUTE_COMMANDS,commands:a});
var b;
a.each(function(c){b=c.execute()
});
return b
}},getJSON:function(){var a=this.getCanvas().toJSON();
a.ssextensions=this.getStencilSets().values()[0].extensions().keys();
return a
},getSerializedJSON:function(){return Ext.encode(this.getJSON())
},checkParsingErrors:function(){var c=ORYX.EDITOR.getSerializedJSON();
var a=new XMLHttpRequest;
var b=ORYX.PATH+"uuidRepository";
var g="action=checkErrors&pp="+ORYX.PREPROCESSING+"&profile="+ORYX.PROFILE+"&data="+encodeURIComponent(c);
a.open("POST",b,false);
a.setRequestHeader("Content-type","application/x-www-form-urlencoded");
a.send(g);
if(a.status==200){if(a.responseText=="true"){return"true"
}else{var f=DataManager.serialize(ORYX.EDITOR.getCanvas().getSVGRepresentation(false));
var d=DataManager.serialize(ORYX.EDITOR.getCanvas().getRootNode().cloneNode(true));
var c=ORYX.EDITOR.getSerializedJSON();
var e=jsonPath(c.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"transformer",method:"POST",success:function(h){},failure:function(){Ext.Msg.minWidth=400;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.main.failSave,title:""})
},params:{fsvg:f,rsvg:d,uuid:ORYX.UUID,profile:ORYX.PROFILE,transformto:"svg",processid:e}});
return"false"
}}else{return"true"
}},showParsingErrors:function(){Ext.Msg.minWidth=360;
Ext.MessageBox.alert(ORYX.I18N.main.unableUserAction)
},getERDF:function(){var a=DataManager.serializeDOM(this._getPluginFacade());
a='<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:b3mn="http://b3mn.org/2007/b3mn" xmlns:ext="http://b3mn.org/2007/ext" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:atom="http://b3mn.org/2007/atom+xhtml"><head profile="http://purl.org/NET/erdf/profile"><link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" /><link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " /><link rel="schema.b3mn" href="http://b3mn.org" /><link rel="schema.oryx" href="http://oryx-editor.org/" /><link rel="schema.raziel" href="http://raziel.org/" /><base href="'+location.href.split("?")[0]+'" /></head><body>'+a+"</body></html>";
return a
},importJSON:function(d,c){try{d=this.renewResourceIds(d)
}catch(b){throw b
}if(!d.stencilset){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.JSONImport.invalidJSON,title:ORYX.I18N.JSONImport.title});
return null
}if(d.stencilset.namespace&&d.stencilset.namespace!==this.getCanvas().getStencil().stencilSet().namespace()){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:String.format(ORYX.I18N.JSONImport.wrongSS,d.stencilset.namespace,this.getCanvas().getStencil().stencilSet().namespace()),title:ORYX.I18N.JSONImport.title});
return null
}else{var a=ORYX.Core.Command.extend({construct:function(g,i,f,h){this.jsonObject=g;
this.noSelection=f;
this.facade=h;
this.shapes;
this.connections=[];
this.parents=new Hash();
this.selection=this.facade.getSelection();
this.loadSerialized=i
},execute:function(){if(!this.shapes){this.shapes=this.loadSerialized(this.jsonObject);
this.shapes.each(function(g){if(g.getDockers){var f=g.getDockers();
if(f){if(f.length>0){this.connections.push([f.first(),f.first().getDockedShape(),f.first().referencePoint])
}if(f.length>1){this.connections.push([f.last(),f.last().getDockedShape(),f.last().referencePoint])
}}}this.parents[g.id]=g.parent
}.bind(this))
}else{this.shapes.each(function(f){this.parents[f.id].add(f)
}.bind(this));
this.connections.each(function(f){f[0].setDockedShape(f[1]);
f[0].setReferencePoint(f[2])
})
}this.facade.getCanvas().update();
if(!this.noSelection){this.facade.setSelection(this.shapes)
}else{this.facade.updateSelection()
}},rollback:function(){var f=this.facade.getSelection();
this.shapes.each(function(g){f=f.without(g);
this.facade.deleteShape(g)
}.bind(this));
this.facade.getCanvas().update();
this.facade.setSelection(f)
}});
var e=new a(d,this.loadSerialized.bind(this),c,this._getPluginFacade());
this.executeCommands([e]);
return e.shapes.clone()
}},renewResourceIds:function(b){if(Ext.type(b)==="string"){try{var d=b;
b=Ext.decode(b)
}catch(a){throw new SyntaxError(a.message)
}}else{var d=Ext.encode(b)
}var e=function(f){if(!f){return[]
}return f.map(function(g){return e(g.childShapes).concat(g.resourceId)
}).flatten()
};
var c=e(b.childShapes);
c.each(function(f){var g=ORYX.Editor.provideId();
d=d.gsub('"'+f+'"','"'+g+'"')
});
return Ext.decode(d)
},importERDF:function(a){var b=this.parseToSerializeObjects(a);
if(b){return this.importJSON(b,true)
}},parseToSerializeObjects:function(c){if(c.normalize){c.normalize()
}try{var d="";
var a=ORYX.PATH+"lib/extract-rdf.xsl";
new Ajax.Request(a,{asynchronous:false,method:"get",onSuccess:function(e){d=e.responseText
}.bind(this),onFailure:(function(e){ORYX.Log.error("XSL load failed"+e)
}).bind(this)});
var k=new DOMParser();
var g=c;
var f=k.parseFromString(d,"text/xml");
var h=new XSLTProcessor();
var l=document.implementation.createDocument("","",null);
h.importStylesheet(f);
var m=h.transformToFragment(g,document);
var b=(new XMLSerializer()).serializeToString(m)
}catch(i){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.BPELSupport.error+": "+i,title:""});
var b=""
}b=!b.startsWith("<?xml")?'<?xml version="1.0" encoding="UTF-8"?>'+b:b;
var j=new Ajax.Request(ORYX.CONFIG.ROOT_PATH+"rdf2json",{method:"POST",asynchronous:false,onSuccess:function(e){Ext.decode(e.responseText)
},parameters:{rdf:b}});
return Ext.decode(j.transport.responseText)
},loadSerialized:function(c){var b=this.getCanvas();
this.loadSSExtensions(c.ssextensions);
var a=this.getCanvas().addShapeObjects(c.childShapes,this.handleEvents.bind(this));
if(c.properties){for(key in c.properties){var d=c.properties[key];
if(!(typeof d==="string")){d=Ext.encode(d)
}this.getCanvas().setProperty("oryx-"+key,d)
}}this.getCanvas().updateSize();
return a
},loadSSExtensions:function(a){if(!a){return
}a.each(function(b){this.loadSSExtension(b)
}.bind(this))
},loadSSExtension:function(b){if(!b){return
}var a=this.getStencilSets()[b["extends"]];
if(!a){return
}a.addExtension(b);
this.getRules().initializeRules(a);
this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED})
},disableEvent:function(a){if(a==ORYX.CONFIG.EVENT_KEYDOWN){this._keydownEnabled=false
}if(a==ORYX.CONFIG.EVENT_KEYUP){this._keyupEnabled=false
}if(this.DOMEventListeners.keys().member(a)){var b=this.DOMEventListeners.remove(a);
this.DOMEventListeners["disable_"+a]=b
}},enableEvent:function(a){if(a==ORYX.CONFIG.EVENT_KEYDOWN){this._keydownEnabled=true
}if(a==ORYX.CONFIG.EVENT_KEYUP){this._keyupEnabled=true
}if(this.DOMEventListeners.keys().member("disable_"+a)){var b=this.DOMEventListeners.remove("disable_"+a);
this.DOMEventListeners[a]=b
}},registerOnEvent:function(a,b){if(!(this.DOMEventListeners.keys().member(a))){this.DOMEventListeners[a]=[]
}this.DOMEventListeners[a].push(b)
},unregisterOnEvent:function(a,b){if(this.DOMEventListeners.keys().member(a)){this.DOMEventListeners[a]=this.DOMEventListeners[a].without(b)
}else{}},getSelection:function(){return this.selection
},getStencilSets:function(){return ORYX.Core.StencilSet.stencilSets(this.id)
},getRules:function(){return ORYX.Core.StencilSet.rules(this.id)
},loadStencilSet:function(a){try{ORYX.Core.StencilSet.loadStencilSet(a,this.id);
this.handleEvents({type:ORYX.CONFIG.EVENT_STENCIL_SET_LOADED})
}catch(b){ORYX.Log.warn("Requesting stencil set file failed. ("+b+")")
}},offer:function(a){if(!this.pluginsData.member(a)){this.pluginsData.push(a)
}},registerPluginsOnKeyEvents:function(){this.pluginsData.each(function(a){if(a.keyCodes){a.keyCodes.each(function(c){var b="key.event";
b+="."+c.keyAction;
if(c.metaKeys){if(c.metaKeys.indexOf(ORYX.CONFIG.META_KEY_META_CTRL)>-1){b+="."+ORYX.CONFIG.META_KEY_META_CTRL
}if(c.metaKeys.indexOf(ORYX.CONFIG.META_KEY_ALT)>-1){b+="."+ORYX.CONFIG.META_KEY_ALT
}if(c.metaKeys.indexOf(ORYX.CONFIG.META_KEY_SHIFT)>-1){b+="."+ORYX.CONFIG.META_KEY_SHIFT
}}if(c.keyCode){b+="."+c.keyCode
}ORYX.Log.debug("Register Plugin on Key Event: %0",b);
this.registerOnEvent(b,a.functionality)
}.bind(this))
}}.bind(this))
},setSelection:function(c,a,b){if(!c){c=[]
}c=c.compact().findAll(function(d){return d instanceof ORYX.Core.Shape
});
if(c.first() instanceof ORYX.Core.Canvas){c=[]
}if(!b&&c.length===this.selection.length&&this.selection.all(function(d){return c.include(d)
})){return
}this.selection=c;
this._subSelection=a;
this.handleEvents({type:ORYX.CONFIG.EVENT_SELECTION_CHANGED,elements:c,subSelection:a})
},updateSelection:function(){this.setSelection(this.selection,this._subSelection,true)
},getCanvas:function(){return this._canvas
},createShape:function(f){if(f&&f.serialize&&f.serialize instanceof Array){var i=f.serialize.find(function(b){return(b.prefix+"-"+b.name)=="oryx-type"
});
var n=ORYX.Core.StencilSet.stencil(i.value);
if(n.type()=="node"){var h=new ORYX.Core.Node({eventHandlerCallback:this.handleEvents.bind(this)},n)
}else{var h=new ORYX.Core.Edge({eventHandlerCallback:this.handleEvents.bind(this)},n)
}this.getCanvas().add(h);
h.deserialize(f.serialize);
return h
}if(!f||!f.type||!f.namespace){throw"To create a new shape you have to give an argument with type and namespace"
}var e=this.getCanvas();
var h;
var a=f.type;
var k=ORYX.Core.StencilSet.stencilSet(f.namespace);
if(k.stencil(a).type()=="node"){h=new ORYX.Core.Node({eventHandlerCallback:this.handleEvents.bind(this)},k.stencil(a))
}else{h=new ORYX.Core.Edge({eventHandlerCallback:this.handleEvents.bind(this)},k.stencil(a))
}if(f.template){h._jsonStencil.properties=f.template._jsonStencil.properties;
h.postProcessProperties()
}if(f.parent&&h instanceof ORYX.Core.Node){f.parent.add(h)
}else{e.add(h)
}var l=f.position?f.position:{x:100,y:200};
var c;
if(f.connectingType&&f.connectedShape&&!(h instanceof ORYX.Core.Edge)){c=new ORYX.Core.Edge({eventHandlerCallback:this.handleEvents.bind(this)},k.stencil(f.connectingType));
c.dockers.first().setDockedShape(f.connectedShape);
var m=f.connectedShape.getDefaultMagnet();
var o=m?m.bounds.center():f.connectedShape.bounds.midPoint();
c.dockers.first().setReferencePoint(o);
c.dockers.last().setDockedShape(h);
c.dockers.last().setReferencePoint(h.getDefaultMagnet().bounds.center());
e.add(c)
}if(h instanceof ORYX.Core.Edge&&f.connectedShape){h.dockers.first().setDockedShape(f.connectedShape);
if(f.connectedShape instanceof ORYX.Core.Node){h.dockers.first().setReferencePoint(f.connectedShape.getDefaultMagnet().bounds.center());
h.dockers.last().bounds.centerMoveTo(l)
}else{h.dockers.first().setReferencePoint(f.connectedShape.bounds.midPoint())
}}else{var j=h.bounds;
if(h instanceof ORYX.Core.Node&&h.dockers.length==1){j=h.dockers.first().bounds
}j.centerMoveTo(l);
var d=j.upperLeft();
j.moveBy(-Math.min(d.x,0),-Math.min(d.y,0));
var g=j.lowerRight();
j.moveBy(-Math.max(g.x-e.bounds.width(),0),-Math.max(g.y-e.bounds.height(),0))
}if(h instanceof ORYX.Core.Edge){h._update(false)
}if(!(h instanceof ORYX.Core.Edge)){this.setSelection([h])
}if(c&&c.alignDockers){c.alignDockers()
}if(h.alignDockers){h.alignDockers()
}this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_CREATED,value:h});
return h
},deleteShape:function(a){if(!a||!a.parent){return
}a.parent.remove(a);
a.getOutgoingShapes().each(function(c){var b=c.getDockers().first();
if(b&&b.getDockedShape()==a){b.setDockedShape(undefined)
}}.bind(this));
a.getIncomingShapes().each(function(b){var c=b.getDockers().last();
if(c&&c.getDockedShape()==a){c.setDockedShape(undefined)
}}.bind(this));
a.getDockers().each(function(b){b.setDockedShape(undefined)
});
this._getPluginFacade().raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_DELETED,value:a})
},getModelMetaData:function(){return this.modelMetaData
},_executeEventImmediately:function(a){if(this.DOMEventListeners.keys().member(a.event.type)){this.DOMEventListeners[a.event.type].each((function(b){b(a.event,a.arg)
}).bind(this))
}},_executeEvents:function(){this._queueRunning=true;
while(this._eventsQueue.length>0){var a=this._eventsQueue.shift();
this._executeEventImmediately(a)
}this._queueRunning=false
},handleEvents:function(b,a){ORYX.Log.trace("Dispatching event type %0 on %1",b.type,a);
switch(b.type){case ORYX.CONFIG.EVENT_MOUSEDOWN:this._handleMouseDown(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEMOVE:this._handleMouseMove(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEUP:this._handleMouseUp(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEOVER:this._handleMouseHover(b,a);
break;
case ORYX.CONFIG.EVENT_MOUSEOUT:this._handleMouseOut(b,a);
break
}if(b.forceExecution){this._executeEventImmediately({event:b,arg:a})
}else{this._eventsQueue.push({event:b,arg:a})
}if(!this._queueRunning){this._executeEvents()
}return false
},catchKeyUpEvents:function(b){if(!this._keyupEnabled){return
}if(!b){b=window.event
}if(["INPUT","TEXTAREA"].include(b.target.tagName.toUpperCase())){return
}var a=this.createKeyCombEvent(b,ORYX.CONFIG.KEY_ACTION_UP);
ORYX.Log.debug("Key Event to handle: %0",a);
this.handleEvents({type:a,event:b})
},catchKeyDownEvents:function(b){if(!this._keydownEnabled){return
}if(!b){b=window.event
}if(["INPUT","TEXTAREA"].include(b.target.tagName.toUpperCase())){return
}var a=this.createKeyCombEvent(b,ORYX.CONFIG.KEY_ACTION_DOWN);
ORYX.Log.debug("Key Event to handle: %0",a);
this.handleEvents({type:a,event:b})
},createKeyCombEvent:function(c,b){var d=c.which||c.keyCode;
var a="key.event";
if(b){a+="."+b
}if(c.ctrlKey||c.metaKey){a+="."+ORYX.CONFIG.META_KEY_META_CTRL
}if(c.altKey){a+="."+ORYX.CONFIG.META_KEY_ALT
}if(c.shiftKey){a+="."+ORYX.CONFIG.META_KEY_SHIFT
}return a+"."+d
},_handleMouseDown:function(a,j){var b=this.getCanvas();
b.focus();
var d=a.currentTarget;
var c=j;
var g=(c!==null)&&(c!==undefined)&&(c.isSelectable);
var k=(c!==null)&&(c!==undefined)&&(c.isMovable);
var i=a.shiftKey||a.ctrlKey;
var h=this.selection.length===0;
var e=this.selection.member(c);
if(g&&h){this.setSelection([c]);
ORYX.Log.trace("Rule #1 applied for mouse down on %0",d.id)
}else{if(g&&!h&&!i&&!e){this.setSelection([c]);
ORYX.Log.trace("Rule #3 applied for mouse down on %0",d.id)
}else{if(g&&i&&!e){var f=this.selection.clone();
f.push(c);
this.setSelection(f);
ORYX.Log.trace("Rule #4 applied for mouse down on %0",d.id)
}else{if(g&&e&&i){var f=this.selection.clone();
this.setSelection(f.without(c));
ORYX.Log.trace("Rule #6 applied for mouse down on %0",c.id)
}else{if(!g&&!k){this.setSelection([]);
ORYX.Log.trace("Rule #2 applied for mouse down on %0",d.id);
return
}else{if(!g&&k&&!(c instanceof ORYX.Core.Controls.Docker)){ORYX.Log.trace("Rule #7 applied for mouse down on %0",d.id)
}else{if(g&&e&&!i){this._subSelection=this._subSelection!=c?c:undefined;
this.setSelection(this.selection,this._subSelection);
ORYX.Log.trace("Rule #8 applied for mouse down on %0",d.id)
}}}}}}}return
},_handleMouseMove:function(b,a){return
},_handleMouseUp:function(d,c){var a=this.getCanvas();
var e=c;
var b=this.eventCoordinates(d)
},_handleMouseHover:function(b,a){return
},_handleMouseOut:function(b,a){return
},eventCoordinates:function(c){var b=this.getCanvas();
var d=b.node.ownerSVGElement.createSVGPoint();
d.x=c.clientX;
d.y=c.clientY;
var a=b.node.getScreenCTM();
return d.matrixTransform(a.inverse())
}};
ORYX.Editor=Clazz.extend(ORYX.Editor);
ORYX.Editor.createByUrl=function(b,a){if(!a){a={}
}new Ajax.Request(b,{method:"GET",onSuccess:function(d){var c=Ext.decode(d.responseText);
c=Ext.applyIf(c,a);
new ORYX.Editor(c);
if("function"==typeof(a.onSuccess)){a.onSuccess(d)
}}.bind(this),onFailure:function(c){if("function"==typeof(a.onFailure)){a.onFailure(c)
}}.bind(this)})
};
ORYX.Editor.graft=function(g,f,d,j){j=(j||(f&&f.ownerDocument)||document);
var h;
if(d===undefined){throw"Can't graft an undefined value"
}else{if(d.constructor==String){h=j.createTextNode(d)
}else{for(var c=0;
c<d.length;
c++){if(c===0&&d[c].constructor==String){var a;
a=d[c].match(/^([a-z][a-z0-9]*)\.([^\s\.]+)$/i);
if(a){h=j.createElementNS(g,a[1]);
h.setAttributeNS(null,"class",a[2]);
continue
}a=d[c].match(/^([a-z][a-z0-9]*)$/i);
if(a){h=j.createElementNS(g,a[1]);
continue
}h=j.createElementNS(g,"span");
h.setAttribute(null,"class","namelessFromLOL")
}if(d[c]===undefined){throw"Can't graft an undefined value in a list!"
}else{if(d[c].constructor==String||d[c].constructor==Array){this.graft(g,h,d[c],j)
}else{if(d[c].constructor==Number){this.graft(g,h,d[c].toString(),j)
}else{if(d[c].constructor==Object){for(var b in d[c]){h.setAttributeNS(null,b,d[c][b])
}}else{}}}}}}}if(f){f.appendChild(h)
}else{}return h
};
ORYX.Editor.provideId=function(){var b=[],c="0123456789ABCDEF";
for(var a=0;
a<36;
a++){b[a]=Math.floor(Math.random()*16)
}b[14]=4;
b[19]=(b[19]&3)|8;
for(var a=0;
a<36;
a++){b[a]=c[b[a]]
}b[8]=b[13]=b[18]=b[23]="-";
return"_"+b.join("")
};
ORYX.Editor.resizeFix=function(){if(!ORYX.Editor._resizeFixTimeout){ORYX.Editor._resizeFixTimeout=window.setTimeout(function(){window.resizeBy(1,1);
window.resizeBy(-1,-1);
ORYX.Editor._resizefixTimeout=null
},100)
}};
ORYX.Editor.Cookie={callbacks:[],onChange:function(b,a){this.callbacks.push(b);
this.start(a)
},start:function(a){if(this.pe){return
}var b=document.cookie;
this.pe=new PeriodicalExecuter(function(){if(b!=document.cookie){b=document.cookie;
this.callbacks.each(function(c){c(this.getParams())
}.bind(this))
}}.bind(this),(a||10000)/1000)
},stop:function(){if(this.pe){this.pe.stop();
this.pe=null
}},getParams:function(){var a={};
var b=document.cookie;
b.split("; ").each(function(c){a[c.split("=")[0]]=c.split("=")[1]
});
return a
},toString:function(){return document.cookie
}};
ORYX.Editor.SVGClassElementsAreAvailable=true;
ORYX.Editor.setMissingClasses=function(){try{SVGElement
}catch(a){ORYX.Editor.SVGClassElementsAreAvailable=false;
SVGSVGElement=document.createElementNS("http://www.w3.org/2000/svg","svg").toString();
SVGGElement=document.createElementNS("http://www.w3.org/2000/svg","g").toString();
SVGPathElement=document.createElementNS("http://www.w3.org/2000/svg","path").toString();
SVGTextElement=document.createElementNS("http://www.w3.org/2000/svg","text").toString();
SVGRectElement=document.createElementNS("http://www.w3.org/2000/svg","rect").toString();
SVGImageElement=document.createElementNS("http://www.w3.org/2000/svg","image").toString();
SVGCircleElement=document.createElementNS("http://www.w3.org/2000/svg","circle").toString();
SVGEllipseElement=document.createElementNS("http://www.w3.org/2000/svg","ellipse").toString();
SVGLineElement=document.createElementNS("http://www.w3.org/2000/svg","line").toString();
SVGPolylineElement=document.createElementNS("http://www.w3.org/2000/svg","polyline").toString();
SVGPolygonElement=document.createElementNS("http://www.w3.org/2000/svg","polygon").toString()
}};
ORYX.Editor.checkIfSaved=function(){if(ORYX.READONLY==true||ORYX.VIEWLOCKED==true){return true
}else{return ORYX.PROCESS_SAVED
}};
ORYX.Editor.checkClassType=function(b,a){if(ORYX.Editor.SVGClassElementsAreAvailable){return b instanceof a
}else{return b==a
}};
ORYX.Editor.makeExtModalWindowKeysave=function(a){Ext.override(Ext.Window,{beforeShow:function(){delete this.el.lastXY;
delete this.el.lastLT;
if(this.x===undefined||this.y===undefined){var b=this.el.getAlignToXY(this.container,"c-c");
var c=this.el.translatePoints(b[0],b[1]);
this.x=this.x===undefined?c.left:this.x;
this.y=this.y===undefined?c.top:this.y
}this.el.setLeftTop(this.x,this.y);
if(this.expandOnShow){this.expand(false)
}if(this.modal){a.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
Ext.getBody().addClass("x-body-masked");
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.mask.show()
}},afterHide:function(){this.proxy.hide();
if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.removeResizeListener(this.onWindowResize,this)
}if(this.modal){this.mask.hide();
a.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
Ext.getBody().removeClass("x-body-masked")
}if(this.keyMap){this.keyMap.disable()
}this.fireEvent("hide",this)
},beforeDestroy:function(){if(this.modal){a.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}Ext.destroy(this.resizer,this.dd,this.proxy,this.mask);
Ext.Window.superclass.beforeDestroy.call(this)
}})
};