if(!ORYX.Plugins){ORYX.Plugins=new Object()
}if(!ORYX.FieldEditors){ORYX.FieldEditors={}
}if(!ORYX.AssociationEditors){ORYX.AssociationEditors={}
}if(!ORYX.LabelProviders){ORYX.LabelProviders={}
}Ext.override(Ext.form.ComboBox,{anyMatch:false,caseSensitive:false,doQuery:function(c,b){if(c===undefined||c===null){c=""
}var a={query:c,forceAll:b,combo:this,cancel:false};
if(this.fireEvent("beforequery",a)===false||a.cancel){return false
}c=a.query;
b=a.forceAll;
if(b===true||(c.length>=this.minChars)){if(this.lastQuery!==c){this.lastQuery=c;
if(this.mode=="local"){this.selectedIndex=-1;
if(b){this.store.clearFilter()
}else{this.store.filter(this.displayField,c,this.anyMatch,this.caseSensitive)
}this.onLoad()
}else{this.store.baseParams[this.queryParam]=c;
this.store.load({params:this.getParams(c)});
this.expand()
}}else{this.selectedIndex=-1;
this.onLoad()
}}}});
ORYX.Plugins.PropertyWindow={facade:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SHOW_PROPERTYWINDOW,this.init.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.onSelectionChanged.bind(this));
this.init()
},init:function(){this.node=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",null,["div"]);
this.currentDateFormat;
this.popularProperties=[];
this.simulationProperties=[];
this.displayProperties=[];
this.customAssignmentsProperties=[];
this.properties=[];
this.shapeSelection=new Hash();
this.shapeSelection.shapes=new Array();
this.shapeSelection.commonProperties=new Array();
this.shapeSelection.commonPropertiesValues=new Hash();
this.updaterFlag=false;
this.columnModel=new Ext.grid.ColumnModel([{header:ORYX.I18N.PropertyWindow.name,dataIndex:"name",width:90,sortable:true,renderer:this.tooltipRenderer.bind(this),css:"font-weight: bold;"},{header:ORYX.I18N.PropertyWindow.value,dataIndex:"value",id:"propertywindow_column_value",width:110,editor:new Ext.form.TextField({allowBlank:true}),renderer:this.renderer.bind(this)},{header:ORYX.I18N.PropertyWindow.desk,dataIndex:"groupname",hidden:true,sortable:true}]);
this.dataSource=new Ext.data.GroupingStore({proxy:new Ext.data.MemoryProxy(this.properties),reader:new Ext.data.ArrayReader({},[{name:"groupname"},{name:"name"},{name:"value"},{name:"icons"},{name:"gridProperties"}]),sortInfo:{field:"name",direction:"ASC"},groupField:"groupname"});
this.dataSource.load();
this.grid=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,clicksToEdit:1,stripeRows:true,autoExpandColumn:"propertywindow_column_value",width:"auto",colModel:this.columnModel,enableHdMenu:false,view:new Ext.grid.GroupingView({forceFit:false,groupTextTpl:"{[values.rs.first().data.groupname]}"}),store:this.dataSource});
region=this.facade.addToRegion("east",new Ext.Panel({width:400,layout:"anchor",autoScroll:true,autoHeight:true,border:false,items:[this.grid],anchors:"0, -30"}),ORYX.I18N.PropertyWindow.title);
this.grid.on("beforeedit",this.beforeEdit,this,true);
this.grid.on("afteredit",this.afterEdit,this,true);
this.grid.view.on("refresh",this.hideMoreAttrs,this,true);
this.grid.enableColumnMove=false
},selectDiagram:function(){this.shapeSelection.shapes=[this.facade.getCanvas()];
this.setPropertyWindowTitle();
this.identifyCommonProperties();
this.createProperties()
},specialKeyDown:function(b,a){if(b instanceof Ext.form.TextArea&&a.button==ORYX.CONFIG.KEY_Code_enter){return false
}},tooltipRenderer:function(b,c,a){c.cellAttr='title="'+a.data.gridProperties.tooltip+'"';
return b
},renderer:function(b,c,a){this.tooltipRenderer(b,c,a);
if(a.data.gridProperties.labelProvider){return a.data.gridProperties.labelProvider(b)
}if(b instanceof Date){b=b.dateFormat(ORYX.I18N.PropertyWindow.dateFormat)
}else{if(String(b).search("<a href='")<0){b=String(b).gsub("<","&lt;");
b=String(b).gsub(">","&gt;");
b=String(b).gsub("%","&#37;");
b=String(b).gsub("&","&amp;");
if(a.data.gridProperties.type==ORYX.CONFIG.TYPE_COLOR){b="<div class='prop-background-color' style='background-color:"+b+"' />"
}a.data.icons.each(function(d){if(d.name==b){if(d.icon){b="<img src='"+d.icon+"' /> "+b
}}})
}}return b
},beforeEdit:function(c){var d=this.dataSource.getAt(c.row).data.gridProperties.editor;
var a=this.dataSource.getAt(c.row).data.gridProperties.renderer;
if(d){this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
c.grid.getColumnModel().setEditor(1,d);
d.field.row=c.row;
d.render(this.grid);
d.setSize(c.grid.getColumnModel().getColumnWidth(1),d.height)
}else{return false
}var b=this.dataSource.getAt(c.row).data.gridProperties.propId;
this.oldValues=new Hash();
this.shapeSelection.shapes.each(function(e){this.oldValues[e.getId()]=e.properties[b]
}.bind(this))
},afterEdit:function(e){e.grid.getStore().commitChanges();
var c=e.record.data.gridProperties.propId;
var h=this.shapeSelection.shapes;
var b=this.oldValues;
var f=e.value;
var d=this.facade;
var a=ORYX.Core.Command.extend({construct:function(){this.key=c;
this.selectedElements=h;
this.oldValues=b;
this.newValue=f;
this.facade=d
},execute:function(){this.selectedElements.each(function(j){if(!j.getStencil().property(this.key).readonly()){j.setProperty(this.key,this.newValue)
}}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.selectedElements.each(function(j){j.setProperty(this.key,this.oldValues[j.getId()])
}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var g=new a();
this.facade.executeCommands([g]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:h,key:c,value:e.value})
},editDirectly:function(a,b){this.shapeSelection.shapes.each(function(d){if(!d.getStencil().property(a).readonly()){d.setProperty(a,b)
}}.bind(this));
var c=this.shapeSelection.shapes;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:c,key:a,value:b});
this.facade.getCanvas().update()
},updateAfterInvalid:function(a){this.shapeSelection.shapes.each(function(b){if(!b.getStencil().property(a).readonly()){b.setProperty(a,this.oldValues[b.getId()]);
b.update()
}}.bind(this));
this.facade.getCanvas().update()
},dialogClosed:function(a){var b=this.field?this.field.row:this.row;
this.scope.afterEdit({grid:this.scope.grid,record:this.scope.grid.getStore().getAt(b),value:a});
this.scope.grid.startEditing(b,this.col)
},setPropertyWindowTitle:function(){if(this.shapeSelection.shapes.length==1){var a=this.shapeSelection.shapes.first().getStencil().title();
if(this.shapeSelection.shapes.first()&&this.shapeSelection.shapes.first().properties&&this.shapeSelection.shapes.first().properties["oryx-tasktype"]&&this.shapeSelection.shapes.first().properties["oryx-tasktype"].length>0){a=this.shapeSelection.shapes.first().properties["oryx-tasktype"]
}region.setTitle(ORYX.I18N.PropertyWindow.title+" ("+a+")")
}else{region.setTitle(ORYX.I18N.PropertyWindow.title+" ("+this.shapeSelection.shapes.length+" "+ORYX.I18N.PropertyWindow.selected+")")
}},setCommonPropertiesValues:function(){this.shapeSelection.commonPropertiesValues=new Hash();
this.shapeSelection.commonProperties.each(function(d){var c=d.prefix()+"-"+d.id();
var b=false;
var a=this.shapeSelection.shapes.first();
this.shapeSelection.shapes.each(function(e){if(a.properties[c]!=e.properties[c]){b=true
}}.bind(this));
if(!b){this.shapeSelection.commonPropertiesValues[c]=a.properties[c]
}}.bind(this))
},getStencilSetOfSelection:function(){var a=new Hash();
this.shapeSelection.shapes.each(function(b){a[b.getStencil().id()]=b.getStencil()
});
return a
},identifyCommonProperties:function(){this.shapeSelection.commonProperties.clear();
var d=this.getStencilSetOfSelection();
var c=d.values().first();
var b=d.values().without(c);
if(b.length==0){this.shapeSelection.commonProperties=c.properties()
}else{var a=new Hash();
c.properties().each(function(e){a[e.namespace()+"-"+e.id()+"-"+e.type()]=e
});
b.each(function(e){var f=new Hash();
e.properties().each(function(g){if(a[g.namespace()+"-"+g.id()+"-"+g.type()]){f[g.namespace()+"-"+g.id()+"-"+g.type()]=g
}});
a=f
});
this.shapeSelection.commonProperties=a.values()
}},onSelectionChanged:function(b){this.grid.stopEditing();
this.shapeSelection.shapes=b.elements;
if(b.elements){if(b.elements.length==0){this.shapeSelection.shapes=[this.facade.getCanvas()]
}}else{this.shapeSelection.shapes=[this.facade.getCanvas()]
}if(b.subSelection){this.shapeSelection.shapes=[b.subSelection]
}if(this.shapeSelection.shapes.length==1){if(ORYX.USEOLDDATAASSIGNMENTS==false){var a=this.shapeSelection.shapes[0];
if(ORYX.DataIOEditorUtils.hasDataIOProperty(a)){ORYX.DataIOEditorUtils.setAssignmentsViewProperty(a)
}}}this.setPropertyWindowTitle();
this.identifyCommonProperties();
this.setCommonPropertiesValues();
this.createProperties()
},createProperties:function(){this.properties=[];
this.popularProperties=[];
this.simulationProperties=[];
this.customAssignmentsProperties=[];
this.displayProperties=[];
if(this.shapeSelection.commonProperties){this.shapeSelection.commonProperties.each((function(p,F){var t=p.prefix()+"-"+p.id();
var q=p.title();
var Z=[];
var C=this.shapeSelection.commonPropertiesValues[t];
var N=undefined;
var K=null;
var G=false;
var O=ORYX.FieldEditors[p.type()];
if(O!==undefined){N=O.init.bind(this,t,p,Z,F)();
if(N==null){return
}N.on("beforehide",this.facade.enableEvent.bind(this,ORYX.CONFIG.EVENT_KEYDOWN));
N.on("specialkey",this.specialKeyDown.bind(this))
}else{if(!p.readonly()){switch(p.type()){case ORYX.CONFIG.TYPE_STRING:if(p.wrapLines()){var f=new Ext.form.TextArea({alignment:"tl-tl",allowBlank:p.optional(),msgTarget:"title",maxLength:p.length()});
f.on("keyup",function(k,j){this.editDirectly(t,k.getValue().replace(/\\n/g,"\n"))
}.bind(this));
N=new Ext.Editor(f)
}else{var D=new Ext.form.TextField({allowBlank:p.optional(),msgTarget:"title",maxLength:p.length()});
D.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
D.on("blur",function(j){if(!j.isValid(false)){this.updateAfterInvalid(t)
}}.bind(this));
D.on("specialkey",function(j,k){if(!j.isValid(false)){this.updateAfterInvalid(t)
}}.bind(this));
N=new Ext.Editor(D)
}break;
case ORYX.CONFIG.TYPE_BOOLEAN:var n=new Ext.form.Checkbox();
n.on("check",function(k,j){this.editDirectly(t,j)
}.bind(this));
N=new Ext.Editor(n);
break;
case ORYX.CONFIG.TYPE_INTEGER:var z=new Ext.form.NumberField({allowBlank:p.optional(),allowDecimals:false,msgTarget:"title",minValue:p.min(),maxValue:p.max()});
z.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(z);
break;
case ORYX.CONFIG.TYPE_FLOAT:var z=new Ext.form.NumberField({allowBlank:p.optional(),allowDecimals:true,msgTarget:"title",minValue:p.min(),maxValue:p.max()});
z.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(z);
break;
case ORYX.CONFIG.TYPE_COLOR:var X=new Ext.ux.ColorField({allowBlank:p.optional(),msgTarget:"title",facade:this.facade});
N=new Ext.Editor(X);
break;
case ORYX.CONFIG.TYPE_CHOICE:var v=p.items();
var y=[];
if(p.id()=="tasktype"&&ORYX.CALCULATE_CURRENT_PERSPECTIVE()==ORYX.RULEFLOW_PERSPECTIVE){v.each(function(j){if(j.value()==C){C=j.title()
}if(j.refToView()[0]){G=true
}if(j.value()=="Business Rule"||j.value()=="Script"||j.value()=="None"){if(ORYX.I18N.propertyNamesTaskType&&ORYX.I18N.propertyNamesTaskType[j.title()]&&ORYX.I18N.propertyNamesTaskType[j.title()].length>0){y.push([j.icon(),ORYX.I18N.propertyNamesTaskType[j.title()],j.value()])
}else{y.push([j.icon(),j.title(),j.value()])
}if(ORYX.I18N.propertyNamesTaskType&&ORYX.I18N.propertyNamesTaskType[j.title()]&&ORYX.I18N.propertyNamesTaskType[j.title()].length>0){Z.push({name:ORYX.I18N.propertyNamesTaskType[j.title()],icon:j.icon()})
}else{Z.push({name:j.title(),icon:j.icon()})
}}})
}else{v.each(function(k){if(k.value()==C){C=k.title()
}if(k.refToView()[0]){G=true
}var j="";
if(ORYX.I18N.propertyNamesValue[k.title()]&&ORYX.I18N.propertyNamesValue[k.title()].length>0){j=ORYX.I18N.propertyNamesValue[k.title()]
}else{j=k.title()
}if(!j){j=k.title()
}y.push([k.icon(),j,k.value()]);
Z.push({name:j,icon:k.icon()})
})
}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
if(p.id()=="tasktype"){o.on("select",function(ad,j,k){this.editDirectly(t,ad.getValue());
var ab=this.facade.getSelection();
var ac=ab.first();
this.facade.setSelection([]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.setSelection([ac]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADED,elements:[ac]})
}.bind(this))
}else{o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this))
}N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICCHOICE:var v=p.items();
var y=[];
var aa=false;
var R="";
v.each(function(af){if(af.value()==C){C=af.title()
}if(af.refToView()[0]){G=true
}if(af.needsprop().length>0){aa=true;
R=af.needsprop()
}var ad=ORYX.EDITOR.getSerializedJSON();
var ae=jsonPath(ad.evalJSON(),af.value());
if(ae){if(ae.toString().length>0){for(var ac=0;
ac<ae.length;
ac++){var ag=ae[ac].split(",");
for(var ab=0;
ab<ag.length;
ab++){if(ag[ab].indexOf(":")>0){var k=ag[ab].split(":");
y.push([af.icon(),k[0],k[0]])
}else{if(ag[ab].trim().length>0){y.push([af.icon(),ag[ab],ag[ab]])
}}}}}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.PropertyWindow.noDataAvailableForProp,title:""})
}Z.push({name:af.title(),icon:af.icon()})
});
var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(af,j,ab){if(aa==true&&R.length>0){var ae=ORYX.EDITOR._pluginFacade.getSelection();
if(ae){var k=ae.first();
var ad="oryx-"+R;
var ac=k.properties[ad];
if(ac!=undefined&&ac.length<1){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"warning",msg:"This property needs the associated property '"+R+"' to be set.",title:""})
}}}this.editDirectly(t,af.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICDATAINPUT:var y=[];
var r=ORYX.EDITOR._pluginFacade.getSelection();
if(r&&r.length==1){var u=r.first();
var s=u.resourceId;
var Y=ORYX.EDITOR.getSerializedJSON();
var P=jsonPath(Y.evalJSON(),"$.childShapes.*");
for(var W=0;
W<P.length;
W++){var h=P[W];
if(h.resourceId==s){var Q=h.properties.datainputset;
if(Q!==undefined){var B=Q.split(",");
for(var V=0;
V<B.length;
V++){var m=B[V];
if(m.indexOf(":")>0){var a=m.split(":");
y.push(["",a[0],a[0]])
}else{y.push(["",m,m])
}}}}}}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICDATAOUTPUT:var y=[];
var r=ORYX.EDITOR._pluginFacade.getSelection();
if(r&&r.length==1){var u=r.first();
var s=u.resourceId;
var Y=ORYX.EDITOR.getSerializedJSON();
var P=jsonPath(Y.evalJSON(),"$.childShapes.*");
for(var W=0;
W<P.length;
W++){var h=P[W];
if(h.resourceId==s){var e=h.properties.dataoutputset;
if(e!==undefined){var g=e.split(",");
for(var S=0;
S<g.length;
S++){var m=g[S];
if(m.indexOf(":")>0){var a=m.split(":");
y.push(["",a[0],a[0]])
}else{if(m.length>0){y.push(["",m,m])
}}}}}}}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DYNAMICGATEWAYCONNECTIONS:var U=ORYX.Config.FACADE.getSelection();
var y=[];
if(U&&U.length==1){var u=U.first();
var s=u.resourceId;
var Y=ORYX.EDITOR.getSerializedJSON();
var x=new XMLHttpRequest;
var d=ORYX.PATH+"processinfo";
var c="uuid="+window.btoa(encodeURI(ORYX.UUID))+"&ppdata="+ORYX.PREPROCESSING+"&profile="+ORYX.PROFILE+"&gatewayid="+s+"&json="+encodeURIComponent(Y);
x.open("POST",d,false);
x.setRequestHeader("Content-type","application/x-www-form-urlencoded");
x.send(c);
if(x.status==200){var J=x.responseText.evalJSON();
for(var W=0;
W<J.length;
W++){var h=J[W];
y.push(["",h.sequenceflowinfo,h.sequenceflowinfo])
}}else{ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorDetOutConnections,title:""})
}}var b=new Ext.data.SimpleStore({fields:[{name:"icon"},{name:"title"},{name:"value"}],data:y});
var o=new Ext.form.ComboBox({editable:false,tpl:'<tpl for="."><div class="x-combo-list-item">{[(values.icon) ? "<img src=\'" + values.icon + "\' />" : ""]} {title}</div></tpl>',store:b,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true});
o.on("select",function(ab,j,k){this.editDirectly(t,ab.getValue())
}.bind(this));
N=new Ext.Editor(o);
break;
case ORYX.CONFIG.TYPE_DATE:var I=ORYX.I18N.PropertyWindow.dateFormat;
if(!(C instanceof Date)){C=Date.parseDate(C,I)
}N=new Ext.Editor(new Ext.form.DateField({allowBlank:p.optional(),format:I,msgTarget:"title"}));
break;
case ORYX.CONFIG.TYPE_TEXT:var E=new Ext.form.ComplexTextField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_ENCODED_TEXT:var E=new Ext.form.ComplexEncodedTextField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_VARDEF:var E=new Ext.form.ComplexVardefField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_EXPRESSION:var E=new Ext.form.ConditionExpressionEditorField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_CALLEDELEMENT:var E=new Ext.form.ComplexCalledElementField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_RULEFLOW_GROUP:var E=new Ext.form.ComplexRuleflowGroupElementField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_CUSTOM:var E=new Ext.form.ComplexCustomField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade,title:(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:p.title(),attr:C});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_ACTION:var E=new Ext.form.ComplexActionsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_GLOBAL:var E=new Ext.form.ComplexGlobalsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_IMPORT:var E=new Ext.form.ComplexImportsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_REASSIGNMENT:var E=new Ext.form.ComplexReassignmentField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_NOTIFICATIONS:var E=new Ext.form.ComplexNotificationsField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAINPUT:var E=new Ext.form.ComplexDataInputField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAINPUT_SINGLE:var E=new Ext.form.ComplexDataInputFieldSingle({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAOUTPUT:var E=new Ext.form.ComplexDataOutputField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAOUTPUT_SINGLE:var E=new Ext.form.ComplexDataOutputFieldSingle({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_DATAASSIGNMENT:var E=new Ext.form.ComplexDataAssignmenField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade,shapes:this.shapeSelection.shapes});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_VISUALDATAASSIGNMENTS:var E=new Ext.form.ComplexVisualDataAssignmentField({allowBlank:p.optional(),dataSource:this.dataSource,grid:this.grid,row:F,facade:this.facade,shapes:this.shapeSelection.shapes});
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case ORYX.CONFIG.TYPE_COMPLEX:var E=new Ext.form.ComplexListField({allowBlank:p.optional()},p.complexItems(),t,this.facade);
E.on("dialogClosed",this.dialogClosed,{scope:this,row:F,col:1,field:E});
N=new Ext.Editor(E);
break;
case"CPNString":var D=new Ext.form.TextField({allowBlank:p.optional(),msgTarget:"title",maxLength:p.length(),enableKeyEvents:true});
D.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(D);
break;
default:var D=new Ext.form.TextField({allowBlank:p.optional(),msgTarget:"title",maxLength:p.length(),enableKeyEvents:true});
D.on("keyup",function(j,k){this.editDirectly(t,j.getValue())
}.bind(this));
N=new Ext.Editor(D)
}N.on("beforehide",this.facade.enableEvent.bind(this,ORYX.CONFIG.EVENT_KEYDOWN));
N.on("specialkey",this.specialKeyDown.bind(this))
}else{if(p.type()===ORYX.CONFIG.TYPE_URL||p.type()===ORYX.CONFIG.TYPE_DIAGRAM_LINK){C=String(C).search("http")!==0?("http://"+C):C;
C="<a href='"+C+"' target='_blank'>"+C.split("://")[1]+"</a>"
}}}if((p.visible()&&p.visible()==true)&&p.hidden()!=true&&(p.id()!="origbordercolor"&&p.id()!="origbgcolor"&&p.id()!="isselectable")){var H=true;
if(this.shapeSelection.shapes.length==1){if(p.fortasktypes()&&p.fortasktypes().length>0){var l=false;
var A=p.fortasktypes().split("|");
for(var W=0;
W<A.size();
W++){if(A[W]==this.shapeSelection.shapes.first().properties["oryx-tasktype"]){l=true
}}if(!l){H=false
}}if(p.ifproptrue()&&p.ifproptrue().length>0){var w=false;
var M=p.ifproptrue();
if(this.shapeSelection.shapes.first().properties["oryx-"+M]&&this.shapeSelection.shapes.first().properties["oryx-"+M]=="true"){w=true
}if(!w){H=false
}}if(p.fordistribution()&&p.fordistribution().length>0){var L=false;
var A=p.fordistribution().split("|");
for(var V=0;
V<A.size();
V++){if(A[V]==this.shapeSelection.shapes.first().properties["oryx-distributiontype"]){L=true
}}if(!L){H=false
}}}if(H){if(p.popular()){p.setPopular()
}if(p.simulation()){p.setSimulation()
}if(p.customassignment()){p.setCustomassignment()
}if(p.display()){p.setDisplay()
}if(p.extra()){p.setExtra()
}if(p.customassignment()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.properties.push(["Assignments",T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{if(p.extra()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.properties.push([ORYX.I18N.PropertyWindow.moreProps,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{if(p.simulation()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.simulationProperties.push([ORYX.I18N.PropertyWindow.simulationProps,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{if(p.display()){var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.displayProperties.push([ORYX.I18N.PropertyWindow.displayProps,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}else{var T=(ORYX.I18N.propertyNames[p.id()]&&ORYX.I18N.propertyNames[p.id()].length>0)?ORYX.I18N.propertyNames[p.id()]:q;
this.popularProperties.push([ORYX.I18N.PropertyWindow.oftenUsed,T,C,Z,{editor:N,propId:t,type:p.type(),tooltip:(ORYX.I18N.propertyNames[p.id()+"_desc"]&&ORYX.I18N.propertyNames[p.id()+"_desc"].length>0)?ORYX.I18N.propertyNames[p.id()+"_desc"]:p.description(),renderer:K,labelProvider:this.getLabelProvider(p)}])
}}}}}}}).bind(this))
}this.setProperties()
},getLabelProvider:function(a){lp=ORYX.LabelProviders[a.labelProvider()];
if(lp){return lp(a)
}return null
},hideMoreAttrs:function(a){if(this.properties.length<=0){return
}this.grid.view.un("refresh",this.hideMoreAttrs,this)
},setProperties:function(){var d=this.popularProperties.concat(this.properties);
var a=d.concat(this.simulationProperties);
var c=a.concat(this.customAssignmentsProperties);
var b=c.concat(this.displayProperties);
this.dataSource.loadData(b)
}};
ORYX.Plugins.PropertyWindow=Clazz.extend(ORYX.Plugins.PropertyWindow);
Ext.form.ComplexListField=function(b,a,c,d){Ext.form.ComplexListField.superclass.constructor.call(this,b);
this.items=a;
this.key=c;
this.facade=d
};
Ext.extend(Ext.form.ComplexListField,Ext.form.TriggerField,{triggerClass:"x-form-complex-trigger",readOnly:true,emptyText:ORYX.I18N.PropertyWindow.clickIcon,editable:false,readOnly:true,buildValue:function(){var f=this.grid.getStore();
f.commitChanges();
if(f.getCount()==0){return""
}var d="[";
for(var c=0;
c<f.getCount();
c++){var e=f.getAt(c);
d+="{";
for(var a=0;
a<this.items.length;
a++){var b=this.items[a].id();
d+=b+":"+(""+e.get(b)).toJSON();
if(a<(this.items.length-1)){d+=", "
}}d+="}";
if(c<(f.getCount()-1)){d+=", "
}}d+="]";
d="{'totalCount':"+f.getCount().toJSON()+", 'items':"+d+"}";
return Object.toJSON(d.evalJSON())
},getFieldKey:function(){return this.key
},getValue:function(){if(this.grid){return this.buildValue()
}else{if(this.data==undefined){return""
}else{return this.data
}}},setValue:function(a){if(a.length>0){if(this.data==undefined){this.data=a
}}},keydownHandler:function(a){return false
},dialogListeners:{show:function(){this.onFocus();
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_KEYDOWN,this.keydownHandler.bind(this));
this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
return
},hide:function(){var a=this.dialogListeners;
this.dialog.un("show",a.show,this);
this.dialog.un("hide",a.hide,this);
this.dialog.destroy(true);
this.grid.destroy(true);
delete this.grid;
delete this.dialog;
this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_KEYDOWN,this.keydownHandler.bind(this));
this.facade.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN);
this.fireEvent("dialogClosed",this.data);
Ext.form.ComplexListField.superclass.setValue.call(this,this.data)
}},buildInitial:function(f,a){var b=new Hash();
for(var c=0;
c<a.length;
c++){var e=a[c].id();
b[e]=a[c].value()
}var d=Ext.data.Record.create(f);
return new d(b)
},buildColumnModel:function(n){var k=[];
for(var d=0;
d<this.items.length;
d++){var a=this.items[d].id();
var e=this.items[d].name();
var b=this.items[d].width();
var j=this.items[d].type();
var f;
if(j==ORYX.CONFIG.TYPE_STRING){f=new Ext.form.TextField({allowBlank:this.items[d].optional(),width:b})
}else{if(j==ORYX.CONFIG.TYPE_CHOICE){var h=this.items[d].items();
var m=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",n,["select",{style:"display:none"}]);
var l=new Ext.Template('<option value="{value}">{value}</option>');
h.each(function(o){l.append(m,{value:o.value()})
});
f=new Ext.form.ComboBox({editable:false,typeAhead:true,triggerAction:"all",transform:m,lazyRender:true,msgTarget:"title",width:b})
}else{if(j==ORYX.CONFIG.TYPE_DYNAMICCHOICE){var h=this.items[d].items();
var m=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",n,["select",{style:"display:none"}]);
var l=new Ext.Template('<option value="{value}">{value}</option>');
var g=false;
var c="";
h.each(function(t){if(t.needsprop()&&t.needsprop().length>0){g=true;
c=t.needsprop()
}var r=ORYX.EDITOR.getSerializedJSON();
var s=jsonPath(r.evalJSON(),t.value());
if(s){if(s.toString().length>0){for(var q=0;
q<s.length;
q++){var u=s[q].split(",");
for(var p=0;
p<u.length;
p++){if(u[p].indexOf(":")>0){var o=u[p].split(":");
l.append(m,{value:o[0]})
}else{l.append(m,{value:u[p]})
}}}}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.PropertyWindow.noDataAvailableForProp,title:""})
}});
f=new Ext.form.ComboBox({editable:false,typeAhead:true,triggerAction:"all",transform:m,lazyRender:true,msgTarget:"title",width:b});
f.on("select",function(u,o,q){if(g==true&&c.length>0){var t=ORYX.EDITOR._pluginFacade.getSelection();
if(t&&t.length==1){var p=t.first();
var s="oryx-"+c;
var r=p.properties[s];
if(r&&r.length<1){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"warning",msg:"This property needs the associated property '"+c+"' to be set.",title:""})
}}}}.bind(this))
}else{if(j==ORYX.CONFIG.TYPE_BOOLEAN){f=new Ext.form.Checkbox({width:b})
}else{if(j=="xpath"){f=new Ext.form.TextField({allowBlank:this.items[d].optional(),width:b})
}}}}}k.push({id:a,header:e,dataIndex:a,resizable:true,editor:f,width:b})
}return new Ext.grid.ColumnModel(k)
},afterEdit:function(a){a.grid.getStore().commitChanges()
},beforeEdit:function(h){var a=this.grid.getView().getScrollState();
var b=h.column;
var p=h.row;
var e=this.grid.getColumnModel().config[b].id;
for(var g=0;
g<this.items.length;
g++){var o=this.items[g];
var m=o.disable();
if(m!=undefined){var n=this.grid.getStore().getAt(p).get(o.id());
for(var d=0;
d<m.length;
d++){var f=m[d];
if(f.value==n){for(var c=0;
c<f.items.length;
c++){var l=f.items[c];
if(l==e){this.grid.getColumnModel().getCellEditor(b,p).disable();
return
}}}}}}this.grid.getColumnModel().getCellEditor(b,p).enable()
},onTriggerClick:function(){if(this.disabled){return
}var dialogWidth=0;
var recordType=[];
for(var i=0;
i<this.items.length;
i++){var id=this.items[i].id();
var width=this.items[i].width();
var type=this.items[i].type();
if((type==ORYX.CONFIG.TYPE_CHOICE)||(type==ORYX.CONFIG.TYPE_DYNAMICCHOICE)){type=ORYX.CONFIG.TYPE_STRING
}dialogWidth+=width;
recordType[i]={name:id,type:type}
}if(dialogWidth>800){dialogWidth=800
}dialogWidth+=22;
var data=this.data;
if(data==""){data="{}"
}var ds=new Ext.data.Store({proxy:new Ext.data.MemoryProxy(eval("("+data+")")),reader:new Ext.data.JsonReader({root:"items",totalProperty:"totalCount"},recordType)});
ds.load();
var cm=this.buildColumnModel();
this.grid=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:ds,cm:cm,stripeRows:true,clicksToEdit:1,selModel:new Ext.grid.CellSelectionModel()});
var toolbar=new Ext.Toolbar([{text:ORYX.I18N.PropertyWindow.add,handler:function(){var ds=this.grid.getStore();
var index=ds.getCount();
this.grid.stopEditing();
var p=this.buildInitial(recordType,this.items);
ds.insert(index,p);
ds.commitChanges();
this.grid.startEditing(index,0)
}.bind(this)},{text:ORYX.I18N.PropertyWindow.rem,handler:function(){var ds=this.grid.getStore();
var selection=this.grid.getSelectionModel().getSelectedCell();
if(selection==undefined){return
}this.grid.getSelectionModel().clearSelections();
this.grid.stopEditing();
var record=ds.getAt(selection[0]);
ds.remove(record);
ds.commitChanges()
}.bind(this)}]);
this.dialog=new Ext.Window({autoScroll:true,autoCreate:true,title:ORYX.I18N.PropertyWindow.complex,height:350,width:dialogWidth,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,keys:[{key:27,fn:function(){this.dialog.hide
}.bind(this)}],items:[toolbar,this.grid],bodyStyle:"background-color:#FFFFFF",buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){this.grid.getView().refresh();
this.grid.stopEditing();
this.data=this.buildValue();
this.dialog.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){this.dialog.destroy()
}.bind(this)}]});
this.dialog.on(Ext.apply({},this.dialogListeners,{scope:this}));
this.dialog.show();
this.grid.on("beforeedit",this.beforeEdit,this,true);
this.grid.on("afteredit",this.afterEdit,this,true);
this.grid.render()
}});
Ext.form.ComplexTextField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var b=new Ext.form.TextArea({anchor:"100% 100%",value:this.value,listeners:{focus:function(){this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}.bind(this)}});
var c=ORYX.Utils.getDialogSize(500,500);
var a=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.text,width:c.width,height:c.height,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,keys:[{key:27,fn:function(){a.hide()
}.bind(this)}],items:[b],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
a.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var d=b.getValue();
this.setValue(d);
this.dataSource.getAt(this.row).set("value",d);
this.dataSource.commitChanges();
a.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){a.destroy()
}.bind(this)}]});
a.show();
b.render();
this.grid.stopEditing();
b.focus(false,100)
}});
Ext.form.ComplexEncodedTextField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var b=new Ext.form.TextArea({anchor:"100% 100%",value:Ext.util.Format.htmlDecode(this.value),listeners:{focus:function(){this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}.bind(this)}});
var c=ORYX.Utils.getDialogSize(500,500);
var a=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.text,width:c.width,height:c.height,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,keys:[{key:27,fn:function(){a.hide()
}.bind(this)}],items:[b],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
a.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var d=Ext.util.Format.htmlEncode(b.getValue());
this.setValue(d);
this.dataSource.getAt(this.row).set("value",d);
this.dataSource.commitChanges();
a.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){a.destroy()
}.bind(this)}]});
a.show();
b.render();
this.grid.stopEditing();
b.focus(false,100)
}});
Ext.form.ComplexCustomField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}Ext.Ajax.request({url:ORYX.PATH+"customeditors",method:"POST",success:function(a){try{if(a.responseText&&a.responseText.length>0){var d=a.responseText.evalJSON();
var c=d.editors;
if(c[this.title]){var g=ORYX.Utils.getDialogSize(300,450);
var b=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.customEditorFor+" "+this.title,height:g.height,width:g.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){b.hide()
}.bind(this)}],items:[{xtype:"component",id:"customeditorswindow",autoEl:{tag:"iframe",src:c[this.title],width:"100%",height:"100%"}}],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
b.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var e=document.getElementById("customeditorswindow").contentWindow.getEditorValue();
this.setValue(e);
this.dataSource.getAt(this.row).set("value",e);
this.dataSource.commitChanges();
b.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){b.destroy()
}.bind(this)}]});
b.show();
this.grid.stopEditing()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.unableFindCustomEditor+" "+this.title,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.invalidCustomEditorData,title:""})
}}catch(f){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorApplyingCustomEditor+":\n"+f,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorApplyingCustomEditor+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID}})
}});
Ext.form.ComplexNotificationsField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var p=Ext.data.Record.create([{name:"type"},{name:"expires"},{name:"from"},{name:"tousers"},{name:"togroups"},{name:"replyto"},{name:"subject"},{name:"body"}]);
var b=new Ext.data.MemoryProxy({root:[]});
var z=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},p),proxy:b,sorters:[{property:"subject",direction:"ASC"},{property:"from",direction:"ASC"},{property:"tousers",direction:"ASC"},{property:"togroups",direction:"ASC"}]});
z.load();
if(this.value.length>0){this.value=this.value.replace(/\[/g,"");
this.value=this.value.replace(/\]/g,"");
var q=this.value.split("^");
for(var x=0;
x<q.length;
x++){var e=q[x];
if(e.indexOf("@")>0){var t=e.split("@");
var s=t[0];
var k=t[1];
var g=t[2];
var A="";
var l="";
var f="";
var m="";
var h="";
var d="";
if(s.indexOf("|")>0){var C=s.split("|");
for(var v=0;
v<C.length;
v++){var c=C[v].split(/:(.+)?/)[0];
var w=C[v].split(/:(.+)?/)[1];
if(c=="from"){A=w
}else{if(c=="tousers"){l=w
}else{if(c=="togroups"){f=w
}else{if(c=="replyTo"){m=w
}else{if(c=="subject"){h=w
}else{if(c=="body"){d=w.replace(/<br\s?\/?>/g,"\n")
}}}}}}}}else{var c=s.split(/:(.+)?/)[0];
var w=s.split(/:(.+)?/)[1];
if(c=="from"){A=w
}else{if(c=="tousers"){l=w
}else{if(c=="togroups"){f=w
}else{if(c=="replyTo"){m=w
}else{if(c=="subject"){h=w
}else{if(c=="body"){d=w.replace(/<br\s?\/?>/g,"\n")
}}}}}}}z.add(new p({type:g==undefined?"":g,expires:k==undefined?"":k,from:A==undefined?"":A,tousers:l==undefined?"":l,togroups:f==undefined?"":f,replyto:m==undefined?"":m,subject:h==undefined?"":h,body:d==undefined?"":d}))
}}}var n=new Array();
var E=new Array();
E.push("not-started");
E.push("not-started");
n.push(E);
var u=new Array();
u.push("not-completed");
u.push("not-completed");
n.push(u);
var B=ORYX.Utils.getDialogSize(350,900);
var D=(B.width-80)/8;
var r=Ext.id();
var o=new Extensive.grid.ItemDeleter();
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:z,id:r,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"type",header:ORYX.I18N.PropertyWindow.type,width:D,dataIndex:"type",editor:new Ext.form.ComboBox({id:"typeCombo",valueField:"name",displayField:"value",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:n})})},{id:"expires",header:ORYX.I18N.PropertyWindow.expiresAt,width:D,dataIndex:"expires",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"from",header:ORYX.I18N.PropertyWindow.from,width:D,dataIndex:"from",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"tousers",header:ORYX.I18N.PropertyWindow.toUsers,width:D,dataIndex:"tousers",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"togroups",header:ORYX.I18N.PropertyWindow.toGroups,width:D,dataIndex:"togroups",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"replyto",header:ORYX.I18N.PropertyWindow.replyTo,width:D,dataIndex:"replyto",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"subject",header:ORYX.I18N.PropertyWindow.subject,width:D,dataIndex:"subject",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"body",header:ORYX.I18N.PropertyWindow.body,width:D,dataIndex:"body",editor:new Ext.form.TextArea({allowBlank:true,disableKeyFilter:true,grow:true}),renderer:Ext.util.Format.htmlEncode},o]),selModel:o,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addNotification,handler:function(){z.add(new p({expires:"",from:"",tousers:"",type:"not-started",togroups:"",replyto:"",subject:"",body:""}));
a.fireEvent("cellclick",a,z.getCount()-1,1,null)
}}],clicksToEdit:1,listeners:{beforeedit:function(j){if(j.column!=8){return true
}var F=new Ext.form.TextArea({anchor:"100% 100%",value:j.value});
var G=ORYX.Utils.getDialogSize(300,350);
var H=new Ext.Window({id:"notificationsBodyEditorWindow",layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.addNotificationInstructions,height:G.height,width:G.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,proxyDrag:true,items:[F],buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var I=F.getValue();
j.record.set("body",I);
H.destroy()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){H.destroy()
}.bind(this)}]});
H.show();
return false
}.bind(this)}});
var y=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForNotifications,height:B.height,width:B.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){y.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
y.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var j="";
a.stopEditing();
a.getView().refresh();
z.data.each(function(){if((this.data.tousers.length>0||this.data.togroups.length>0)&&this.data.subject.length>0&&this.data.body.length>0){j+="[from:"+this.data.from+"|tousers:"+this.data.tousers+"|togroups:"+this.data.togroups+"|replyTo:"+this.data.replyto+"|subject:"+this.data.subject+"|body:"+this.data.body.replace(/\r\n|\r|\n/g,"<br />")+"]";
j+="@["+this.data.expires+"]";
j+="@"+this.data.type;
j+="^"
}});
if(j.length>0){j=j.slice(0,-1)
}this.setValue(j);
this.dataSource.getAt(this.row).set("value",j);
this.dataSource.commitChanges();
y.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){y.destroy()
}.bind(this)}]});
y.show();
a.render();
this.grid.stopEditing();
a.focus(false,100)
}});
Ext.form.ComplexReassignmentField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var c=Ext.data.Record.create([{name:"users"},{name:"groups"},{name:"expires"},{name:"type"}]);
var l=new Ext.data.MemoryProxy({root:[]});
var d=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},c),proxy:l,sorters:[{property:"users",direction:"ASC"},{property:"groups",direction:"ASC"}]});
d.load();
if(this.value.length>0){this.value=this.value.replace(/\[/g,"");
this.value=this.value.replace(/\]/g,"");
var n=this.value.split("^");
for(var t=0;
t<n.length;
t++){var e=n[t];
if(e.indexOf("@")>0){var q=e.split("@");
var p=q[0];
var h=q[1];
var f=q[2];
var g="";
var s="";
if(p.indexOf("|")>0){var x=p.split("|");
var z=x[0];
var m=x[1];
var b=z.split(":");
if(b[0]=="users"){g=b[1]
}else{if(b[0]=="groups"){s=b[1]
}}var u=m.split(":");
if(u[0]=="users"){g=u[1]
}else{if(u[0]=="groups"){s=u[1]
}}}else{var B=p.split(":");
if(B[0]=="users"){g=B[1]
}else{if(B[0]=="groups"){s=B[1]
}}}d.add(new c({users:g,groups:s,expires:h,type:f}))
}}}var j=new Array();
var A=new Array();
A.push("not-started");
A.push("not-started");
j.push(A);
var r=new Array();
r.push("not-completed");
r.push("not-completed");
j.push(r);
var o=Ext.id();
var k=new Extensive.grid.ItemDeleter();
var w=ORYX.Utils.getDialogSize(350,700);
var y=(w.width-80)/4;
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:d,id:o,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"users",header:ORYX.I18N.PropertyWindow.users,width:y,dataIndex:"users",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"groups",header:ORYX.I18N.PropertyWindow.groups,width:y,dataIndex:"groups",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_\,]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"expires",header:ORYX.I18N.PropertyWindow.expiresAt,width:y,dataIndex:"expires",editor:new Ext.form.TextField({allowBlank:true,regex:/^[a-z0-9 \#\{\}\-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"type",header:ORYX.I18N.PropertyWindow.type,width:y,dataIndex:"type",editor:new Ext.form.ComboBox({id:"typeCombo",valueField:"name",displayField:"value",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})},k]),selModel:k,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addReassignment,handler:function(){d.add(new c({users:"",groups:"",expires:"",type:"not-started"}));
a.fireEvent("cellclick",a,d.getCount()-1,1,null)
}}],clicksToEdit:1});
var v=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForReassignment,height:w.height,width:w.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){v.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
v.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var C="";
a.stopEditing();
a.getView().refresh();
d.data.each(function(){if((this.data.users.length>0||this.data.groups.length>0)&&this.data.expires.length>0&&this.data.type.length>0){C+="[users:"+this.data.users+"|groups:"+this.data.groups+"]";
C+="@["+this.data.expires+"]";
C+="@"+this.data.type;
C+="^"
}});
if(C.length>0){C=C.slice(0,-1)
}this.setValue(C);
this.dataSource.getAt(this.row).set("value",C);
this.dataSource.commitChanges();
v.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){v.destroy()
}.bind(this)}]});
v.show();
a.render();
this.grid.stopEditing();
a.focus(false,100)
}});
Ext.form.ComplexImportsField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.package");
var c=jsonPath(a.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(l){try{if(l.responseText.length>=0&&l.responseText!="false"){var x=Ext.decode(l.responseText);
var o=new Array();
var S=new Array();
S.push("String");
S.push("String");
o.push(S);
var k=new Array();
k.push("Integer");
k.push("Integer");
o.push(k);
var G=new Array();
G.push("Boolean");
G.push("Boolean");
o.push(G);
var v=new Array();
v.push("Float");
v.push("Float");
o.push(v);
var C=new Array();
C.push("Object");
C.push("Object");
o.push(C);
var f=new Array();
f.push("**********");
f.push("**********");
o.push(f);
var d=new Array();
for(var u in x){var z=x[u];
d.push(z)
}d.sort();
for(var K=0;
K<d.length;
K++){var M=new Array();
var g=d[K];
var w=g.split(".");
var Q=w[w.length-1];
var E=g.substring(0,g.length-(Q.length+1));
M.push(Q+" ["+E+"]");
M.push(d[K]);
o.push(M)
}var H=Ext.data.Record.create([{name:"type"},{name:"classname"},{name:"customclassname"},{name:"wsdllocation"},{name:"wsdlnamespace"}]);
var P=new Ext.data.MemoryProxy({root:[]});
var n=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},H),proxy:P,sorters:[{property:"type",direction:"ASC"}]});
n.load();
if(this.value.length>0){var r=this.value.split(",");
for(var O=0;
O<r.length;
O++){var T="";
var h,s,I;
var q=r[O];
var j=q.split("|");
if(j[1]=="default"){T="default";
h=j[0];
s="";
I=""
}else{T="wsdl";
h="";
s=j[0];
I=j[1]
}var p=false;
for(var u in x){var z=x[u];
if(z==h){p=true
}}if(p){n.add(new H({type:T,classname:h,customclassname:"",wsdllocation:s,wsdlnamespace:I}))
}else{n.add(new H({type:T,classname:"",customclassname:h,wsdllocation:s,wsdlnamespace:I}))
}}}var m=new Extensive.grid.ItemDeleter();
var D=new Array();
var L=new Array();
L.push("default");
L.push("default");
D.push(L);
var A=new Array();
A.push("wsdl");
A.push("wsdl");
D.push(A);
var y=ORYX.Utils.getDialogSize(400,900);
var B=(y.width-80)/5;
var F=Ext.id();
var J=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:n,id:F,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"imptype",header:ORYX.I18N.PropertyWindow.importType,width:B,dataIndex:"type",editor:new Ext.form.ComboBox({id:"importTypeCombo",typeAhead:true,anyMatch:true,valueField:"name",displayField:"value",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:D})})},{id:"classname",header:"Defined Class Name",width:B,dataIndex:"classname",editor:new Ext.form.ComboBox({id:"customTypeCombo",typeAhead:true,anyMatch:true,valueField:"value",displayField:"name",labelStyle:"display:none",submitValue:true,typeAhead:false,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,store:new Ext.data.SimpleStore({fields:["name","value"],data:o})})},{id:"customclassname",header:"Custom Class Name",width:B,dataIndex:"customclassname",editor:new Ext.form.TextField({allowBlank:true})},{id:"wsdllocation",header:ORYX.I18N.PropertyWindow.wsdlLocation,width:B,dataIndex:"wsdllocation",editor:new Ext.form.TextField({allowBlank:true})},{id:"wsdlnamespace",header:ORYX.I18N.PropertyWindow.wsdlNamespace,width:B,dataIndex:"wsdlnamespace",editor:new Ext.form.TextField({allowBlank:true})},m]),selModel:m,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addImport,handler:function(){n.add(new H({type:"default",classname:"",customclassname:"",wsdllocation:"",wsdlnamespace:""}));
J.fireEvent("cellclick",J,n.getCount()-1,1,null)
}}],clicksToEdit:1});
var N=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForImports,height:y.height,width:y.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){N.hide()
}.bind(this)}],items:[J],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
N.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var e="";
J.getView().refresh();
J.stopEditing();
n.data.each(function(){if(this.data.type=="default"){if(this.data.classname.length>0){e+=this.data.classname+"|"+this.data.type+","
}else{e+=this.data.customclassname+"|"+this.data.type+","
}}if(this.data.type=="wsdl"){e+=this.data.wsdllocation+"|"+this.data.wsdlnamespace+"|"+this.data.type+","
}});
if(e.length>0){e=e.slice(0,-1)
}this.setValue(e);
this.dataSource.getAt(this.row).set("value",e);
this.dataSource.commitChanges();
N.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){N.destroy()
}.bind(this)}]});
N.show();
J.render();
this.grid.stopEditing();
J.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find Data Types.",title:""})
}}catch(R){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info  :\n"+R,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:b,pid:c,action:"showdatatypes"}})
}});
Ext.form.ComplexActionsField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}var h=Ext.data.Record.create([{name:"action"}]);
var l=new Ext.data.MemoryProxy({root:[]});
var e=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},h),proxy:l,sorters:[{property:"action",direction:"ASC"}]});
e.load();
if(this.value.length>0){var k=this.value.split("|");
for(var g=0;
g<k.length;
g++){var c=k[g];
e.add(new h({action:c}))
}}var j=new Extensive.grid.ItemDeleter();
var d=Ext.id();
var b=ORYX.Utils.getDialogSize(300,450);
var f=b.width-80;
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:e,id:d,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"action",header:ORYX.I18N.PropertyWindow.action,width:f,dataIndex:"action",editor:new Ext.form.TextField({allowBlank:true})},j]),selModel:j,autoHeight:true,tbar:[{text:ORYX.I18N.PropertyWindow.addAction,handler:function(){e.add(new h({action:""}));
a.fireEvent("cellclick",a,e.getCount()-1,1,null)
}}],clicksToEdit:1});
var m=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForActions,height:b.height,width:b.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){m.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
m.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var n="";
a.getView().refresh();
a.stopEditing();
e.data.each(function(){if(this.data.action.length>0){n+=this.data.action+"|"
}});
if(n.length>0){n=n.slice(0,-1)
}this.setValue(n);
this.dataSource.getAt(this.row).set("value",n);
this.dataSource.commitChanges();
m.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){m.destroy()
}.bind(this)}]});
m.show();
a.render();
this.grid.stopEditing();
a.focus(false,100)
}});
Ext.form.ComplexDataAssignmenField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,addParentVars:function(h,d,m,c,b,l){if(h){if(h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"||h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#Subprocess"||h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#AdHocSubprocess"){var j=h.properties["oryx-vardefs"];
if(j&&j.length>0){var o=j.split(",");
for(var f=0;
f<o.length;
f++){var e=o[f];
var g=new Array();
if(e.indexOf(":")>0){var p=e.split(":");
g.push(p[0]);
g.push(p[0]);
b[p[0]]=p[1];
l.push(p[0])
}else{g.push(e);
g.push(e);
b[e]="java.lang.String";
l.push(e)
}m.push(g);
c.push(g)
}}if(h._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"){var a=h.properties["oryx-multipleinstancedatainput"];
if(a&&a.length>0){var g=new Array();
g.push(a);
g.push(a);
b[a]="java.lang.String";
l.push(g);
m.push(g);
c.push(g)
}var n=h.properties["oryx-multipleinstancedataoutput"];
if(n&&n.length>0){var g=new Array();
g.push(n);
g.push(n);
b[n]="java.lang.String";
l.push(g);
m.push(g);
c.push(g)
}}}if(h.parent){this.addParentVars(h.parent,d,m,c,b,l)
}}},onTriggerClick:function(){if(this.disabled){return undefined
}if(ORYX.USEOLDDATAASSIGNMENTS==false){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW,element:this.shapes[0]});
return
}var c="";
var f=ORYX.EDITOR.getSerializedJSON();
var G=jsonPath(f.evalJSON(),"$.properties.vardefs");
var m=new Array();
var p=new Array();
var d=new Hash();
var j=new Array();
var b=new Array();
var B=new Array();
var l=new Array();
var o=new Array();
var t=new Array();
p.push("");
var z=false;
var J=ORYX.EDITOR._pluginFacade.getSelection();
if(J){var y=J.first();
if(y&&y.parent){if(y.parent._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"||y.parent._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#Subprocess"||y.parent._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#AdHocSubprocess"){p.push("** Process/Subprocess Definitions **");
m.push(p);
j.push(p);
z=true
}this.addParentVars(y.parent,p,m,j,d,b)
}}if(!z){p.push("** Variable Definitions **");
m.push(p);
j.push(p)
}if(G){G.forEach(function(O){if(O.length>0){var L=O.split(",");
for(var N=0;
N<L.length;
N++){var M=new Array();
var P=L[N];
if(P.indexOf(":")>0){var K=P.split(":");
M.push(K[0]);
M.push(K[0]);
d[K[0]]=K[1];
b.push(K[0])
}else{M.push(P);
M.push(P);
d[P]="java.lang.String";
b.push(P)
}m.push(M);
j.push(M)
}}})
}var q=new Array();
q.push("");
q.push("** Data Inputs **");
m.push(q);
B.push(q);
Ext.each(this.dataSource.data.items,function(O){if((O.data.gridProperties.propId=="oryx-datainputset")||(O.data.gridProperties.propId=="oryx-datainput")){var L=O.data.value.split(",");
for(var N=0;
N<L.length;
N++){var P=L[N];
var M=new Array();
if(P.indexOf(":")>0){var K=P.split(":");
M.push(K[0]);
M.push(K[0]);
d[K[0]]=K[1];
l.push(K[0])
}else{M.push(P);
M.push(P);
d[P]="java.lang.String";
l.push(P)
}m.push(M);
B.push(M)
}}});
var s=new Array();
s.push("");
s.push("** Data Outputs **");
m.push(s);
o.push(s);
Ext.each(this.dataSource.data.items,function(O){if((O.data.gridProperties.propId=="oryx-dataoutputset")||(O.data.gridProperties.propId=="oryx-dataoutput")){var M=O.data.value.split(",");
for(var K=0;
K<M.length;
K++){var P=M[K];
var N=new Array();
if(P.indexOf(":")>0){var L=P.split(":");
N.push(L[0]);
N.push(L[0]);
d[L[0]]=L[1];
t.push(L[0])
}else{N.push(P);
N.push(P);
d[P]="java.lang.String";
t.push(P)
}m.push(N);
o.push(N)
}}});
var e=Ext.data.Record.create([{name:"atype"},{name:"from"},{name:"type"},{name:"to"},{name:"tostr"},{name:"dataType"},{name:"assignment"}]);
var E=new Ext.data.MemoryProxy({root:[]});
var I=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},e),proxy:E,sorters:[{property:"atype",direction:"ASC"},{property:"from",direction:"ASC"},{property:"to",direction:"ASC"},{property:"tostr",direction:"ASC"}]});
I.load();
if(this.value.length>0){var w=this.value.split(",");
for(var D=0;
D<w.length;
D++){var g=w[D];
if(g.indexOf("=")>0){var A=g.split("=");
if(A[0].startsWith("[din]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}A.shift();
var h=A.join("=").replace(/\#\#/g,",");
h=h.replace(/\|\|/g,"=");
I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:h,dataType:C,assignment:"false"}))
}else{if(A[0].startsWith("[dout]")){var r=A[0].slice(6,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}A.shift();
var h=A.join("=").replace(/\#\#/g,",");
h=h.replace(/\|\|/g,"=");
I.add(new e({atype:"DataOutput",from:r,type:"is equal to",to:"",tostr:h,dataType:C,assignment:"false"}))
}else{var r=A[0];
var C=d[r];
if(!C){C="java.lang.String"
}A.shift();
var h=A.join("=").replace(/\#\#/g,",");
h=h.replace(/\|\|/g,"=");
I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:h,dataType:C,assignment:"false"}))
}}}else{if(g.indexOf("->")>0){var A=g.split("->");
if(A[0].startsWith("[din]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}var k="DataInput";
I.add(new e({atype:k,from:r,type:"is mapped to",to:A[1],tostr:"",dataType:C,assignment:"true"}))
}else{if(A[0].startsWith("[dout]")){var r=A[0].slice(6,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}var k="DataOutput";
I.add(new e({atype:k,from:r,type:"is mapped to",to:A[1],tostr:"",dataType:C,assignment:"true"}))
}}}else{if(A[0].startsWith("[din]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:"",dataType:C,assignment:"false"}))
}else{if(A[0].startsWith("[dout]")){var r=A[0].slice(5,A[0].length);
var C=d[r];
if(!C){C="java.lang.String"
}I.add(new e({atype:"DataInput",from:r,type:"is equal to",to:"",tostr:"",dataType:C,assignment:"false"}))
}}var C=d[g]
}}}}I.on("update",function(M,K,L){if(L=="edit"){var N=d[K.get("from")];
if(!N){N="java.lang.String"
}K.set("dataType",N)
}});
var H=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:m})});
var v=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is mapped to",ORYX.I18N.PropertyWindow.isMappedTo],["is equal to",ORYX.I18N.PropertyWindow.isEqualTo]]})});
var n=new Ext.form.ComboBox({name:"toCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:m})});
var u=new Extensive.grid.ItemDeleter();
var x=Ext.id();
var a=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:I,id:x,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"valueType",header:ORYX.I18N.PropertyWindow.dataType,width:180,dataIndex:"dataType",hidden:"true"},{id:"atype",header:"Assignment Type",width:180,dataIndex:"atype"},{id:"from",header:ORYX.I18N.PropertyWindow.fromObject,width:180,dataIndex:"from",editor:H},{id:"type",header:ORYX.I18N.PropertyWindow.assignmentType,width:100,dataIndex:"type",editor:v},{id:"to",header:ORYX.I18N.PropertyWindow.toObject,width:180,dataIndex:"to",editor:n},{id:"tostr",header:ORYX.I18N.PropertyWindow.toValue,width:180,dataIndex:"tostr",editor:new Ext.form.TextField({name:"tostrTxt",allowBlank:true}),renderer:Ext.util.Format.htmlEncode},u]),selModel:u,autoHeight:true,tbar:[{text:"[ Input Assignment ]",handler:function(){I.add(new e({atype:"DataInput",from:"",type:"",to:"",tostr:"",assignment:"false"}));
c="datainput";
a.fireEvent("cellclick",a,I.getCount()-1,1,null)
}},{text:"[ Input Mapping ]",handler:function(){I.add(new e({atype:"DataInput",from:"",type:"",to:"",tostr:"",assignment:"true"}));
c="datainput";
a.fireEvent("cellclick",a,I.getCount()-1,1,null)
}},{text:"[ Output Mapping ]",handler:function(){I.add(new e({atype:"DataOutput",from:"",type:"",to:"",tostr:"",assignment:"true"}));
c="dataoutput";
a.fireEvent("cellclick",a,I.getCount()-1,1,null)
}}],clicksToEdit:1,listeners:{beforeedit:function(P){if(P.record.data.atype=="DataInput"){var K=P.grid.getColumnModel().getCellEditor(P.column,P.row)||{};
K=K.field||{};
if(K.name=="typeCombo"){K.destroy();
var L;
if(P.record.data.assignment=="true"){L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is mapped to",ORYX.I18N.PropertyWindow.isMappedTo]]})})
}else{L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is equal to",ORYX.I18N.PropertyWindow.isEqualTo]]})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(L))
}if(K.name=="fromCombo"){K.destroy();
var M;
if(P.record.data.assignment=="true"){M=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})
}else{M=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:B})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(M))
}if(K.name=="toCombo"){K.destroy();
var O;
if(P.record.data.assignment=="true"){O=new Ext.form.ComboBox({name:"toCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:B})})
}else{O=new Ext.form.ComboBox({name:"toCombo",disabled:true,valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:B})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(O))
}if(K.name=="tostrTxt"){K.destroy();
var N;
if(P.record.data.assignment=="true"){N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true,disabled:true})
}else{N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(N))
}}if(P.record.data.atype=="DataOutput"){var K=P.grid.getColumnModel().getCellEditor(P.column,P.row)||{};
K=K.field||{};
if(K.name=="typeCombo"){K.destroy();
var L;
if(P.record.data.assignment=="true"){L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is mapped to",ORYX.I18N.PropertyWindow.isMappedTo]]})})
}else{L=new Ext.form.ComboBox({name:"typeCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:[["is equal to",ORYX.I18N.PropertyWindow.isEqualTo]]})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(L))
}if(K.name=="fromCombo"){K.destroy();
var M;
if(P.record.data.assignment=="true"){M=new Ext.form.ComboBox({name:"fromCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:o})})
}else{M=new Ext.form.ComboBox({name:"fromCombo",disabled:true,valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:o})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(M))
}if(K.name=="toCombo"){K.destroy();
var O;
if(P.record.data.assignment=="true"){O=new Ext.form.ComboBox({name:"toCombo",valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})
}else{O=new Ext.form.ComboBox({name:"toCombo",disabled:true,valueField:"name",displayField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:j})})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(O))
}if(K.name=="tostrTxt"){K.destroy();
var N;
if(P.record.data.assignment=="true"){N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true,disabled:true})
}else{N=new Ext.form.TextField({name:"tostrTxt",allowBlank:true})
}P.grid.getColumnModel().setEditor(P.column,new Ext.grid.GridEditor(N))
}}}}});
var F=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForDataAssignments,height:350,width:890,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){F.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
F.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var K="";
a.getView().refresh();
a.stopEditing();
I.data.each(function(){if(this.data.from.length>0&&this.data.type.length>0){var L=this.data.atype;
if(this.data.type=="is mapped to"){if(L=="DataInput"){K+="[din]"+this.data.from+"->"+this.data.to+","
}else{if(L=="DataOutput"){K+="[dout]"+this.data.from+"->"+this.data.to+","
}}}else{if(this.data.type=="is equal to"){if(this.data.tostr.length>0){var M=this.data.tostr.replace(/,/g,"##");
M=M.replace(/=/g,"||");
if(L=="DataInput"){K+="[din]"+this.data.from+"="+M+","
}else{if(L=="DataOutput"){K+="[dout]"+this.data.from+"="+M+","
}}}else{if(L=="DataInput"){K+="[din]"+this.data.from+"=,"
}else{if(L=="DataOutput"){K+="[dout]"+this.data.from+"=,"
}}}}}}});
if(K.length>0){K=K.slice(0,-1)
}this.setValue(K);
this.dataSource.getAt(this.row).set("value",K);
this.dataSource.commitChanges();
F.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){F.destroy()
}.bind(this)}]});
F.show();
a.render();
this.grid.stopEditing();
a.focus(false,100);
return a
}});
Ext.form.NameTypeEditor=Ext.extend(Ext.form.TriggerField,{windowTitle:"",addButtonLabel:"",single:false,editable:false,readOnly:true,dtype:"",addCustomKPI:"",onTriggerClick:function(){if(this.disabled){return
}if(ORYX.USEOLDDATAASSIGNMENTS==false){if(this.dtype==ORYX.CONFIG.TYPE_DTYPE_DINPUT||this.dtype==ORYX.CONFIG.TYPE_DTYPE_DOUTPUT){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW,element:this.facade.getSelection()[0]});
return
}}var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.package");
var c=jsonPath(a.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(n){try{if(n.responseText.length>=0&&n.responseText!="false"){var A=Ext.decode(n.responseText);
var O=new Array();
var X=new Array();
X.push("true");
X.push("true");
O.push(X);
var T=new Array();
T.push("false");
T.push("false");
O.push(T);
var q=new Array();
var W=new Array();
W.push("String");
W.push("String");
q.push(W);
var m=new Array();
m.push("Integer");
m.push("Integer");
q.push(m);
var I=new Array();
I.push("Boolean");
I.push("Boolean");
q.push(I);
var y=new Array();
y.push("Float");
y.push("Float");
q.push(y);
var E=new Array();
E.push("Object");
E.push("Object");
q.push(E);
var f=new Array();
f.push("**********");
f.push("**********");
q.push(f);
var d=new Array();
for(var x in A){var D=A[x];
d.push(D)
}d.sort();
for(var M=0;
M<d.length;
M++){var N=new Array();
var g=d[M];
var z=g.split(".");
var U=z[z.length-1];
var G=g.substring(0,g.length-(U.length+1));
N.push(U+" ["+G+"]");
N.push(d[M]);
q.push(N)
}var J=Ext.data.Record.create([{name:"name"},{name:"stype"},{name:"ctype"},{name:"kpi"}]);
var w=new Ext.data.MemoryProxy({root:[]});
var l=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},J),proxy:w,sorters:[{property:"name",direction:"ASC"}]});
l.load();
if(this.value.length>0){var v=this.value.split(",");
for(var S=0;
S<v.length;
S++){var r=v[S];
if(r.indexOf(":")>0){var h=r.split(":");
var s=false;
for(var R=0;
R<q.length;
R++){var u=q[R];
for(var P=0;
P<u.length;
P++){var K=u[P];
if(K==h[1]){s=true;
break
}}}if(s==true){var F="false";
if(h.length==3){F=h[2]
}l.add(new J({name:h[0],stype:h[1],ctype:"",kpi:F}))
}else{var F="false";
if(h[1]=="true"||h[1]=="false"){l.add(new J({name:h[0],stype:"",ctype:"",kpi:h[1]}))
}else{var F="false";
if(h.length==3){F=h[2]
}l.add(new J({name:h[0],stype:"",ctype:h[1],kpi:F}))
}}}else{l.add(new J({name:r,stype:"",ctype:"",kpi:"false"}))
}}}var o=new Extensive.grid.ItemDeleter();
o.setDType(this.dtype);
var C=ORYX.Utils.getDialogSize(300,700);
var p=(C.width-80)/7;
var H=Ext.id();
Ext.form.VTypes.inputNameVal=/^[a-z0-9\-\.\_]*$/i;
Ext.form.VTypes.inputNameText="Invalid name";
Ext.form.VTypes.inputName=function(e){return Ext.form.VTypes.inputNameVal.test(e)
};
var B=this.addCustomKPI;
var L=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:l,id:H,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"name",header:ORYX.I18N.PropertyWindow.name,width:p*2,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:true,vtype:"inputName",regex:/^[a-z0-9\-\.\_]*$/i}),renderer:Ext.util.Format.htmlEncode},{id:"stype",header:"Defined Types",width:p*2,dataIndex:"stype",editor:new Ext.form.ComboBox({typeAhead:true,anyMatch:true,id:"customTypeCombo",valueField:"value",displayField:"name",labelStyle:"display:none",submitValue:true,typeAhead:true,queryMode:"local",mode:"local",triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,editable:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:q})})},{id:"ctype",header:ORYX.I18N.PropertyWindow.customType,width:p*2,dataIndex:"ctype",editor:new Ext.form.TextField({allowBlank:true}),renderer:Ext.util.Format.htmlEncode},{id:"kpi",header:"KPI",width:p,dataIndex:"kpi",disabled:(B!="true"),editor:new Ext.form.ComboBox({typeAhead:true,anyMatch:true,id:"kpiConbo",valueField:"value",displayField:"name",labelStyle:"display:none",submitValue:true,typeAhead:true,queryMode:"local",mode:"local",disabled:(B!="true"),triggerAction:"all",selectOnFocus:true,hideTrigger:false,forceSelection:false,selectOnFocus:true,autoSelect:false,editable:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:O})})},o]),selModel:o,autoHeight:true,tbar:[{text:this.addButtonLabel,handler:function(){if(this.single&&l.getCount()>0){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.OnlySingleEntry,title:""})
}else{l.add(new J({name:"",stype:"",ctype:"",kpi:"false"}));
L.fireEvent("cellclick",L,l.getCount()-1,1,null)
}}.bind(this)}],clicksToEdit:1});
var Q=new Ext.Window({layout:"anchor",autoCreate:true,title:this.windowTitle,height:C.height,width:C.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){Q.hide()
}.bind(this)}],items:[L],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
Q.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var e="";
L.stopEditing();
L.getView().refresh();
var j=this.addCustomKPI;
l.data.each(function(){if(this.data.name.length>0){if(this.data.stype.length>0){if(this.data.stype=="Object"&&this.data.ctype.length>0){e+=this.data.name+":"+this.data.ctype;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}else{e+=this.data.name+":"+this.data.stype;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}}else{if(this.data.ctype.length>0){e+=this.data.name+":"+this.data.ctype;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}else{e+=this.data.name;
if(j=="true"){e+=":"+this.data.kpi
}e+=","
}}}});
if(e.length>0){e=e.slice(0,-1)
}this.setValue(e);
this.dataSource.getAt(this.row).set("value",e);
this.dataSource.commitChanges();
Q.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){Q.destroy()
}.bind(this)}]});
Q.show();
L.render();
this.grid.stopEditing();
L.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find Data Types.",title:""})
}}catch(V){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info  :\n"+V,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:b,pid:c,action:"showdatatypes"}})
}});
Ext.form.ComplexVardefField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForVariableDefinitions,addButtonLabel:ORYX.I18N.PropertyWindow.addVariable,dtype:ORYX.CONFIG.TYPE_DTYPE_VARDEF,addCustomKPI:"true"});
Ext.form.ComplexDataInputField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataInput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataInput,dtype:ORYX.CONFIG.TYPE_DTYPE_DINPUT});
Ext.form.ComplexDataOutputField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataOutput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataOutput,dtype:ORYX.CONFIG.TYPE_DTYPE_DOUTPUT});
Ext.form.ComplexDataInputFieldSingle=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataInput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataInput,single:true,dtype:ORYX.CONFIG.TYPE_DTYPE_DINPUT});
Ext.form.ComplexDataOutputFieldSingle=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForDataOutput,addButtonLabel:ORYX.I18N.PropertyWindow.addDataOutput,single:true,dtype:ORYX.CONFIG.TYPE_DTYPE_DOUTPUT});
Ext.form.ComplexGlobalsField=Ext.extend(Ext.form.NameTypeEditor,{windowTitle:ORYX.I18N.PropertyWindow.editorForGlobals,addButtonLabel:ORYX.I18N.PropertyWindow.addGlobal,dtype:ORYX.CONFIG.TYPE_DTYPE_GLOBAL});
Ext.form.ConditionExpressionEditorField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}function a(ab){c.setValue(ab);
c.dataSource.getAt(c.row).set("value",ab);
c.dataSource.commitChanges();
S.hide()
}function e(ae){var ab=new String("");
var af="\0";
var ac="\0";
var ad=false;
for(i=0;
i<ae.length;
i++){ac=af;
af=ae.charAt(i);
if(af==="\\"){if(ad){ab=ab+af;
ad=false;
af="\0"
}else{ad=true
}}else{if(ad){if(af==="n"){ab=ab+"\n"
}else{ab=ab+af
}}else{ab=ab+af
}}if(ac==="\\"){if(ad){ad=false
}}}return ab
}var A=false;
Ext.each(this.dataSource.data.items,function(ab){if(ab.data.gridProperties.propId=="oryx-conditionexpressionlanguage"&&ab.data.value=="java"){A=true
}});
var c=this;
var w=true;
var U=true;
var p;
var m=new Ext.form.TextArea({id:Ext.id(),fieldLabel:ORYX.I18N.PropertyWindow.expressionEditor,value:e(this.value),autoScroll:true});
var P;
var n;
if(!A){p=new Ext.Panel({border:false,items:[m]})
}else{var r;
var J=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.TextField({name:"stringValue"})]});
var f=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"floatValue",allowDecimals:true})]});
var E=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"floatFrom",allowDecimals:true}),new Ext.form.NumberField({name:"floatTo",allowDecimals:true,style:"margin-left:10px;display:block;"})]});
var X=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"intValue",allowDecimals:false})]});
var aa=new Ext.Panel({layout:"column",border:false,style:"margin-left:10px;display:block;",items:[new Ext.form.NumberField({name:"intForm",allowDecimals:false}),new Ext.form.NumberField({name:"intTo",allowDecimals:false,style:"margin-left:10px;display:block;"})]});
var u=[];
u.push(["contains",ORYX.I18N.ConditionExpressionEditorField.contains,J,[0]]);
u.push(["endsWith",ORYX.I18N.ConditionExpressionEditorField.endsWith,J,[0]]);
u.push(["equalsTo",ORYX.I18N.ConditionExpressionEditorField.equalsTo,J,[0]]);
u.push(["isEmpty",ORYX.I18N.ConditionExpressionEditorField.isEmpty,null,null]);
u.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
u.push(["startsWith",ORYX.I18N.ConditionExpressionEditorField.startsWith,J,[0]]);
var B=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:u});
var s=[];
s.push(["between",ORYX.I18N.ConditionExpressionEditorField.between,E,[0,1]]);
s.push(["equalsTo",ORYX.I18N.ConditionExpressionEditorField.equalsTo,f,[0]]);
s.push(["greaterThan",ORYX.I18N.ConditionExpressionEditorField.greaterThan,f,[0]]);
s.push(["greaterOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.greaterThanOrEqual,f,[0]]);
s.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
s.push(["lessThan",ORYX.I18N.ConditionExpressionEditorField.lessThan,f,[0]]);
s.push(["lessOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.lessThanOrEqual,f,[0]]);
var z=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:s});
var x=[];
x.push(["between",ORYX.I18N.ConditionExpressionEditorField.between,aa,[0,1]]);
x.push(["equalsTo",ORYX.I18N.ConditionExpressionEditorField.equalsTo,X,[0]]);
x.push(["greaterThan",ORYX.I18N.ConditionExpressionEditorField.greaterThan,X,[0]]);
x.push(["greaterOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.greaterThanOrEqual,X,[0]]);
x.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
x.push(["lessThan",ORYX.I18N.ConditionExpressionEditorField.lessThan,X,[0]]);
x.push(["lessOrEqualThan",ORYX.I18N.ConditionExpressionEditorField.lessThanOrEqual,X,[0]]);
var Z=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:x});
var Q=[];
Q.push(["isFalse",ORYX.I18N.ConditionExpressionEditorField.isFalse,null,null]);
Q.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
Q.push(["isTrue",ORYX.I18N.ConditionExpressionEditorField.isTrue,null,null]);
var o=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:Q});
var O=[];
O.push(["isNull",ORYX.I18N.ConditionExpressionEditorField.isNull,null,null]);
var q=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"title"},{name:"panel"},{name:"inputs"}],data:O});
J.hide();
f.hide();
E.hide();
X.hide();
aa.hide();
var V=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(V.evalJSON(),"$.properties.vardefs");
var F=[];
if(b){b.forEach(function(af){if(af.length>0){var ad=af.split(",");
for(var ae=0;
ae<ad.length;
ae++){var ag=ad[ae];
if(ag.indexOf(":")>0){var ac=ag.split(":");
var ah=ac[0].trim();
var ab=ac[1].trim();
switch(ab){case"String":case"java.lang.String":F.push([ah,ab,B]);
break;
case"Integer":case"java.lang.Integer":case"java.math.BigInteger":case"java.lang.Short":case"java.lang.Long":F.push([ah,ab,Z]);
break;
case"Float":case"java.math.BigDecimal":case"java.lang.Float":case"java.lang.Double":F.push([ah,ab,z]);
break;
case"Boolean":case"java.lang.Boolean":F.push([ah,ab,o]);
break;
default:F.push([ah,ab,q])
}}}}})
}var v=new Ext.data.SimpleStore({fields:[{name:"value"},{name:"type"},{name:"store"}],data:F});
var h=new Ext.form.ComboBox({editable:false,displayField:"title",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,listeners:{select:function(ae,ac,ad){M();
r=ac;
var ab=r.get("panel");
if(ab!=null){ab.show()
}}}});
var Y=new Ext.form.ComboBox({editable:false,store:v,displayField:"value",valueField:"value",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,listeners:{select:function(ad,ab,ac){h.clearValue();
M();
h.bindStore(ab.get("store"))
}}});
var N=new Ext.form.FormPanel({layout:"table",title:ORYX.I18N.ConditionExpressionEditorField.editorTab,layoutConfig:{columns:3},defaults:{border:false},items:[{colspan:3,items:[{style:"font-size:12px;margin:10px;display:block;",anchor:"100%",xtype:"label",html:ORYX.I18N.ConditionExpressionEditorField.editorDescription}]},{style:"font-size:12px;margin:10px;display:block;",anchor:"100%",xtype:"label",html:ORYX.I18N.ConditionExpressionEditorField.processVariable},{colspan:2,items:[Y]},{style:"font-size:12px;margin:10px;display:block;",anchor:"100%",xtype:"label",html:ORYX.I18N.ConditionExpressionEditorField.condition},h,{items:[J,f,E,X,aa]}]});
var y=new Ext.Panel({title:ORYX.I18N.ConditionExpressionEditorField.scriptTab,layout:"anchor",defaults:{border:false},items:[m]});
function k(ab){var ac=ORYX.I18N.ConditionExpressionEditorField.scriptParseError;
ac=ac.replace("{0}",ab);
Ext.MessageBox.show({msg:ac,icon:Ext.MessageBox.WARNING,buttons:{ok:ORYX.I18N.PropertyWindow.ok,cancel:ORYX.I18N.PropertyWindow.cancel},fn:function(ad){if(ad=="ok"){I(true,true)
}else{D(false,false)
}}})
}function W(ab){var ac=ORYX.I18N.ConditionExpressionEditorField.scriptGenerationError;
ac=ac.replace("{0}",ab);
Ext.MessageBox.show({msg:ac,icon:Ext.MessageBox.WARNING,buttons:{ok:ORYX.I18N.PropertyWindow.ok}})
}var l=function(ah){if(ah.responseText.length>0){var an=Ext.decode(ah.responseText);
if(an.errorMessage){if(!U){k(an.errorMessage);
return
}else{w=false
}}else{var af;
var ag;
var ae=[];
an.conditions.forEach(function(ap){af=ap.condition;
ap.parameters.forEach(function(aq){if(ag==null){ag=aq
}else{ae.push(aq)
}})
});
var al=v.find("value",ag);
if(al==-1){var am=ORYX.I18N.ConditionExpressionEditorField.nonExistingVariable;
am=am.replace("{0}",ag);
k(am);
return
}else{Y.setValue(ag);
var ac=v.getAt(al);
Y.fireEvent("select",Y,ac);
h.setValue(af);
var ad=ac.get("store");
al=ad.find("value",af);
var ai=ad.getAt(al);
h.fireEvent("select",h,ai);
var ab=ai.get("panel");
if(ab!=null){var ak=ai.get("inputs");
if(ak!=null&&ak.length==ae.length){var aj;
for(aj=0;
aj<ak.length;
aj++){var ao=ab.getComponent(ak[aj]).setValue(ae[aj])
}}}w=true
}}}U=false;
if(w){I(true,false)
}else{D(false,false)
}};
var C=function(){D(false,false)
};
function D(ac,ab,ad){if(P){P.toTextArea();
P=null
}if(ab){m.setValue(ad)
}w=ac;
p.setActiveTab(y);
S.setTitle(ORYX.I18N.ConditionExpressionEditorField.sequenceFlowFullTitle);
K()
}function I(ab,ac){if(ac){j()
}w=ab;
p.setActiveTab(N);
S.setTitle(ORYX.I18N.ConditionExpressionEditorField.sequenceFlowTitle)
}p=new Ext.TabPanel({renderTo:Ext.getBody(),activeTab:0,defaults:{border:false},items:[N,y],listeners:{tabchange:function(ad,ae){if(ae.title==ORYX.I18N.ConditionExpressionEditorField.scriptTab){if(w){if(Y.getValue()==""||(Y.getValue()!=""&&h.getValue()=="")){D(false,true,"")
}else{var ac=function(ah){w=true;
if(ah.responseText.length>0){var ag=Ext.decode(ah.responseText);
if(ag.errorMessage){W(ag.errorMessage);
I(true,false)
}else{D(false,true,ag.script)
}}};
var af=function(){I(true,false)
};
var ab=t(ac,af);
if(ab==false){I(true,false)
}}}}else{if(!w){if(P.getValue()==null||P.getValue().trim()==""){I(true,true)
}else{m.setValue(P.getValue());
G({script:P.getValue()})
}}}}}});
function j(){Y.clearValue();
h.clearValue();
M()
}function M(){if(r!=null){var ab=r.get("panel");
if(ab){var ac=r.get("inputs");
if(ac!=null){ac.forEach(function(ad){ab.getComponent(ad).setValue(null)
})
}ab.hide()
}r=null
}}function d(){if(!r){return false
}var ab=r.get("panel");
if(ab==null){return true
}var ad=r.get("inputs");
if(ad!=null){var ac=[];
ad.forEach(function(ae){var af=ab.getComponent(ae).getValue();
if(af===undefined){return false
}ac.push(af)
});
if(ac.length!=ad.length){return false
}if(ac.length==2){return ac[1]>ac[0]
}}return true
}function R(){var af=Y.getValue();
if(!af||!d()){return null
}var ac=[];
ac.push(af);
var ab=r.get("panel");
if(ab!=null){var ae=r.get("inputs");
if(ae!=null){ae.forEach(function(ag){ac.push(ab.getComponent(ag).getValue())
})
}}var ad={operator:"AND",conditions:[{condition:h.getValue(),parameters:ac}]};
return ad
}function g(ae,ac,ab,ad){Ext.Ajax.request({url:ORYX.PATH+"customeditors",method:"POST",params:{expression_editor_command:ae,expression_editor_message:Ext.util.JSON.encode(ac)},success:function(af){ab(af)
}.bind(this),failure:function(){ad()
}})
}function G(ab){g("parseScript",ab,l,C)
}function t(ab,ac){var ad=R();
if(!ad){W(ORYX.I18N.ConditionExpressionEditorField.paramsError);
return false
}g("generateScript",ad,ab,ac);
return true
}var T=function(ac){if(ac.responseText.length>0){var ab=Ext.decode(ac.responseText);
if(ab.errorMessage){W(ab.errorMessage)
}else{a(ab.script)
}}};
var L=function(){W(ORYX.I18N.ConditionExpressionEditorField.saveError)
}
}var H=ORYX.Utils.getDialogSize(430,680);
var S=new Ext.Window({layout:"anchor",autoCreate:true,height:H.height,width:H.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){S.hide()
}.bind(this)}],items:[p],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
S.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){if(A){if(w){t(T,L)
}else{var ab=P.getValue().replace(/\\/g,"\\\\").replace(/\r\n|\r|\n/g,"\\n");
a(ab)
}}else{var ab=P.getValue().replace(/\\/g,"\\\\").replace(/\r\n|\r|\n/g,"\\n");
a(ab)
}}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){S.destroy()
}.bind(this)}]});
function K(){this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
P=CodeMirror.fromTextArea(document.getElementById(m.getId()),{mode:"text/x-java",lineNumbers:true,lineWrapping:true,matchBrackets:true,onGutterClick:this.foldFunc,extraKeys:{"Ctrl-Z":function(ab){CodeMirror.hint(ab,CodeMirror.jbpmHint,S)
}},onCursorActivity:function(){P.setLineClass(n,null,null);
n=P.setLineClass(P.getCursor().line,null,"activeline")
}.bind(this)});
n=P.setLineClass(0,"activeline")
}if(A){if(this.getValue()!=null&&this.getValue()!=""){G({script:this.getValue()})
}else{I(true,false);
U=false
}}else{S.setTitle(ORYX.I18N.ConditionExpressionEditorField.simpleTitle)
}S.show();
p.setHeight(S.getInnerHeight());
if(!A){K()
}this.grid.stopEditing()
}});
Ext.form.ComplexRuleflowGroupElementField=Ext.extend(Ext.form.TriggerField,{editable:true,readOnly:false,onTriggerClick:function(){if(this.disabled){return
}var b=ORYX.EDITOR.getSerializedJSON();
var d=jsonPath(b.evalJSON(),"$.properties.package");
var f=jsonPath(b.evalJSON(),"$.properties.id");
var a=Ext.data.Record.create([{name:"name"},{name:"rules"},{name:"repo"},{name:"project"},{name:"branch"},{name:"fullpath"}]);
var c=new Ext.data.MemoryProxy({root:[]});
var e=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},a),proxy:c,sorters:[{property:"name",direction:"ASC"}]});
e.load();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:"Loading RuleFlow Groups",title:""});
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(j){try{if(j.responseText.length>0&&j.responseText!="false"){var D=Ext.decode(j.responseText);
for(var J in D){var A=D[J];
var z=new Array();
var s=A.split("||");
var r=s[0];
var m=s[1];
var y=m.split("<<");
var o="";
var u="";
var h="";
for(var B=0;
B<y.length;
B++){var E=y[B].split("^^");
var t=new Array();
t.push(E[0]);
t.push(E[1]);
z.push(t);
var v=y[B];
var l=v.split("^^");
var I=l[1];
var p=I.split("://");
var H=p[1];
var x=H.split("@");
if(h.indexOf(x[0])<0){h+=x[0]+","
}var k=x[1];
if(o.indexOf(k.split("/")[0])<0){o+=k.split("/")[0]+","
}if(u.indexOf(k.split("/")[1])<0){u+=k.split("/")[1]+","
}}if(o.endsWith(",")){o=o.substr(0,o.length-1)
}if(u.endsWith(",")){u=u.substr(0,u.length-1)
}if(h.endsWith(",")){h=h.substr(0,h.length-1)
}e.add(new a({name:r,rules:z,repo:o,project:u,branch:h,fullpath:I}))
}e.commitChanges();
var G=ORYX.Utils.getDialogSize(350,760);
var q=(G.width-80)/7;
var w=Ext.id();
var g=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:e,id:w,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"rfgname",header:"RuleFlow Group Name",width:q*2,sortable:true,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"rfrulenames",header:"Rules",width:q*2,sortable:false,renderer:function(P,L,N,O,S,Q){function K(V,X,U,W){new Ext.form.ComboBox({name:"ruleflowscombo",id:W,valueField:"value",displayField:"name",typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:new Ext.data.SimpleStore({fields:["name","value"],data:V})}).render(document.getElementById(w),X)
}function R(V,X,U,W){new Ext.Button({text:"view",handler:function(Y,ab){var aa=Ext.getCmp(W).getRawValue();
var Z=Ext.getCmp(W).getValue();
if(aa&&aa.length>0&&Z&&Z.length>0){parent.designeropenintab(aa,Z)
}}}).render(document.getElementById(w),X)
}var M="rulenamescombodiv-"+O;
var T="rncombo-"+O;
K.defer(1,this,[Q.getAt(O).get("rules"),M,N,T]);
R.defer(1,this,[Q.getAt(O).get("rules"),M,N,T]);
return('<div id="'+M+'"></div>')
}},{id:"rfrepository",header:"Repositories",width:q,sortable:true,dataIndex:"repo",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"rfproject",header:"Projects",width:q,sortable:true,dataIndex:"project",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"rfbranch",header:"Branches",width:q,sortable:true,dataIndex:"branch",editor:new Ext.form.TextField({allowBlank:true,disabled:true})}])});
g.on("afterrender",function(M){if(this.value.length>0){var K=0;
var N=this.value;
var L=g;
e.data.each(function(){if(this.data.name==N){L.getSelectionModel().select(K,1)
}K++
})
}}.bind(this));
var n=new Ext.Panel({id:"ruleFlowGroupsPanel",title:'<center><p style="font-size:11px"><i>Select RuleFlow Group Name and click on Save</i></p></center>',layout:"column",items:[g],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var C=new Ext.Window({layout:"anchor",autoCreate:true,title:"Editor for RuleFlow Groups",height:G.height,width:G.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,items:[n],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
C.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.Save.save,handler:function(){if(g.getSelectionModel().getSelectedCell()!=null){var K=g.getSelectionModel().getSelectedCell()[0];
var L=e.getAt(K).data.name;
g.stopEditing();
g.getView().refresh();
this.setValue(L);
this.dataSource.getAt(this.row).set("value",L);
this.dataSource.commitChanges();
C.hide()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"No data selected.",title:""})
}}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){C.destroy()
}.bind(this)}]});
C.show();
g.render();
g.fireEvent("afterrender");
this.grid.stopEditing();
g.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find RuleFlow Groups.",title:""})
}}catch(F){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving RuleFlow Groups info  :\n"+F,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving RuleFlow Groups info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:d,pid:f,action:"showruleflowgroups"}});
this.grid.stopEditing()
}});
Ext.form.ComplexCalledElementField=Ext.extend(Ext.form.TriggerField,{editable:true,readOnly:false,onTriggerClick:function(){if(this.disabled){return
}var a=Ext.data.Record.create([{name:"name"},{name:"pkgname"},{name:"imgsrc"}]);
var e=new Ext.data.MemoryProxy({root:[]});
var d=new Ext.data.Store({autoDestroy:true,reader:new Ext.data.JsonReader({root:"root"},a),proxy:e,sorters:[{property:"name",direction:"ASC"}]});
d.load();
var b=ORYX.EDITOR.getSerializedJSON();
var c=jsonPath(b.evalJSON(),"$.properties.package");
var f=jsonPath(b.evalJSON(),"$.properties.id");
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.PropertyWindow.loadingProcessInf,title:""});
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(k){try{if(k.responseText.length>0&&k.responseText!="false"){var o=Ext.decode(k.responseText);
for(var q in o){var r=q.split("|");
d.add(new a({name:r[0],pkgname:r[1],imgsrc:o[q]}))
}d.commitChanges();
var h=ORYX.Utils.getDialogSize(350,690);
var l=(h.width-30)/3;
var j=Ext.id();
var g=new Ext.grid.EditorGridPanel({autoScroll:true,autoHeight:true,store:d,id:j,stripeRows:true,cm:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),{id:"pid",header:ORYX.I18N.PropertyWindow.processId,width:l,dataIndex:"name",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"pkgn",header:ORYX.I18N.PropertyWindow.packageName,width:l,dataIndex:"pkgname",editor:new Ext.form.TextField({allowBlank:true,disabled:true})},{id:"pim",header:ORYX.I18N.LocalHistory.headertxt.ProcessImage,width:l,dataIndex:"imgsrc",renderer:function(s){if(s&&s.length>0){return'<center><img src="'+ORYX.PATH+"images/page_white_picture.png\" onclick=\"new ImageViewer({title: 'Process Image', width: '650', height: '450', autoScroll: true, fixedcenter: true, src: '"+s+"',hideAction: 'close'}).show();\" alt=\"Click to view Process Image\"/></center>"
}else{return ORYX.I18N.LocalHistory.headertxt.ProcessImage.NoAvailable
}}}]),autoHeight:true});
g.on("afterrender",function(u){if(this.value.length>0){var s=0;
var v=this.value;
var t=g;
d.data.each(function(){if(this.data.name==v){t.getSelectionModel().select(s,1)
}s++
})
}}.bind(this));
var p=new Ext.Panel({id:"calledElementsPanel",title:"<center>"+ORYX.I18N.PropertyWindow.selectProcessId+"</center>",layout:"column",items:[g],layoutConfig:{columns:1},defaults:{columnWidth:1}});
var n=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorForCalledEvents,height:h.height,width:h.width,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){n.hide()
}.bind(this)}],items:[p],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
n.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.Save.save,handler:function(){if(g.getSelectionModel().getSelectedCell()!=null){var s=g.getSelectionModel().getSelectedCell()[0];
var t=d.getAt(s).data.name;
g.stopEditing();
g.getView().refresh();
this.setValue(t);
this.dataSource.getAt(this.row).set("value",t);
this.dataSource.commitChanges();
n.hide()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.LocalHistory.LocalHistoryView.msg,title:""})
}}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){n.destroy()
}.bind(this)}]});
n.show();
g.render();
g.fireEvent("afterrender");
this.grid.stopEditing();
g.focus(false,100)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.unableToFindOtherProcess,title:""})
}}catch(m){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorResolvingOtherProcessInfo+" :\n"+m,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.PropertyWindow.errorResolvingOtherProcessInfo+".",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:c,pid:f}})
}});
Ext.form.ComplexVisualDataAssignmentField=Ext.extend(Ext.form.TriggerField,{editable:false,readOnly:true,onTriggerClick:function(){if(this.disabled){return
}Ext.each(this.dataSource.data.items,function(h){if((h.data.gridProperties.propId=="oryx-assignments")){}});
var f=ORYX.EDITOR.getSerializedJSON();
var a=jsonPath(f.evalJSON(),"$.properties.vardefs");
if(!a){a=""
}var c=jsonPath(f.evalJSON(),"$.properties.globals");
if(!c){c=""
}var g="";
var b=jsonPath(f.evalJSON(),"$.childShapes.*");
for(var e=0;
e<b.length;
e++){if(b[e].stencil.id=="DataObject"){g+=b[e].properties.name;
g+=","
}}if(g.endsWith(",")){g=g.substr(0,g.length-1)
}var d=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.PropertyWindow.editorVisualDataAssociations,height:550,width:850,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){d.hide()
}.bind(this)}],items:[{xtype:"component",id:"visualdataassignmentswindow",autoEl:{tag:"iframe",src:ORYX.BASE_FILE_PATH+"customeditors/visualassignmentseditor.jsp?vars="+a+"&globals="+c+"&dobj="+g,width:"100%",height:"100%"}}],listeners:{hide:function(){this.fireEvent("dialogClosed",this.value);
d.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){var h=document.getElementById("visualdataassignmentswindow").contentWindow.getEditorValue();
this.setValue(h);
this.dataSource.getAt(this.row).set("value",h);
this.dataSource.commitChanges();
d.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){d.destroy()
}.bind(this)}]});
d.show();
this.grid.stopEditing()
}});