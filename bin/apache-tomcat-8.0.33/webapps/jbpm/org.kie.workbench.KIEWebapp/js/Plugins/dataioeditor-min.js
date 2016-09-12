if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.DataIOEditorPlugin={currentElement:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DATAIOEDITOR_SHOW,this.showDataIOEditor.bind(this))
},showDataIOEditor:function(a){this.currentElement=a.element;
this.getDataTypesForDataIOEditor(this.currentElement)
},getDataTypesForDataIOEditor:function(b){var a=ORYX.EDITOR.getSerializedJSON();
var c=jsonPath(a.evalJSON(),"$.properties.package");
var d=jsonPath(a.evalJSON(),"$.properties.id");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(g){try{if(g.responseText.length>=0&&g.responseText!="false"){var f=Ext.decode(g.responseText);
this.doShowDataIOEditor(b,f)
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to find Data Types.",title:""})
}}catch(h){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info  :\n"+h,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error retrieving Data Types info.",title:""})
},params:{profile:ORYX.PROFILE,uuid:ORYX.UUID,ppackage:c,pid:d,action:"showdatatypes"}})
},doShowDataIOEditor:function(a,d){var e="";
var r=new Array();
for(var x in d){var p=d[x];
r.push(p)
}r.sort();
for(var g=0;
g<r.length;
g++){var b=r[g];
var h=b.split(".");
var q=h[h.length-1];
var f=b.substring(0,b.length-(q.length+1));
var k=q+" ["+f+"]:"+b;
e=e+k;
if(g<r.length-1){e=e+","
}}var c="";
var v="String:String, Integer:Integer, Boolean:Boolean, Float:Float, Object:Object, ******:******,"+c+e;
var o=a.getStencil();
var s=undefined;
if(o.property("oryx-name")!==undefined){s=a.properties["oryx-name"]
}var w=undefined;
if(o.property("oryx-datainput")!==undefined){w=a.properties["oryx-datainput"]
}var l=undefined;
if(o.property("oryx-datainputset")!==undefined){l=a.properties["oryx-datainputset"]
}var m=undefined;
if(o.property("oryx-dataoutput")!==undefined){m=a.properties["oryx-dataoutput"]
}var u=undefined;
if(o.property("oryx-dataoutputset")!==undefined){u=a.properties["oryx-dataoutputset"]
}var j=undefined;
if(o.property("oryx-assignments")!==undefined){j=a.properties["oryx-assignments"]
}else{if(o.property("oryx-datainputassociations")!==undefined){j=a.properties["oryx-datainputassociations"]
}else{if(o.property("oryx-dataoutputassociations")!==undefined){j=a.properties["oryx-dataoutputassociations"]
}}}var i=ORYX.DataIOEditorUtils.getProcessVars(a);
var n=ORYX.DataIOEditorUtils.getDisallowedPropertyNames(a);
parent.designersignalshowdataioeditor(s,w,l,m,u,i,j,v,n,function(B){var C=JSON.parse(B);
var y=this.currentElement;
var z=y.getStencil();
var t=new Hash();
var A=new Hash();
if(z.property("oryx-datainput")!==undefined){t["oryx-datainput"]=C.inputVariables;
A["oryx-datainput"]=y.properties["oryx-datainput"]
}if(z.property("oryx-datainputset")!==undefined){t["oryx-datainputset"]=C.inputVariables;
A["oryx-datainputset"]=y.properties["oryx-datainputset"]
}if(z.property("oryx-dataoutput")!==undefined){t["oryx-dataoutput"]=C.outputVariables;
A["oryx-dataoutput"]=y.properties["oryx-dataoutput"]
}if(z.property("oryx-dataoutputset")!==undefined){t["oryx-dataoutputset"]=C.outputVariables;
A["oryx-dataoutputset"]=y.properties["oryx-dataoutputset"]
}if(z.property("oryx-assignments")!==undefined){t["oryx-assignments"]=C.assignments;
A["oryx-assignments"]=y.properties["oryx-assignments"]
}else{if(z.property("oryx-datainputassociations")!==undefined){t["oryx-datainputassociations"]=C.assignments;
A["oryx-datainputassociations"]=y.properties["oryx-datainputassociations"]
}else{if(z.property("oryx-dataoutputassociations")!==undefined){t["oryx-dataoutputassociations"]=C.assignments;
A["oryx-dataoutputassociations"]=y.properties["oryx-dataoutputassociations"]
}}}if(z.property("oryx-assignments")!==undefined){t["oryx-assignmentsview"]=C.variablecountsstring;
A["oryx-assignmentsview"]=y.properties["oryx-assignmentsview"]
}else{if(z.property("oryx-datainputassociations")!==undefined){t["oryx-datainputassociationsview"]=C.variablecountsstring;
A["oryx-datainputassociationsview"]=y.properties["oryx-datainputassociationsview"]
}else{if(z.property("oryx-dataoutputassociations")!==undefined){t["oryx-dataoutputassociationsview"]=C.variablecountsstring;
A["oryx-dataoutputassociationsview"]=y.properties["oryx-dataoutputassociationsview"]
}}}this.setElementProperties(y,t,A)
}.bind(this))
},setElementProperties:function(c,a,e){var d=this.facade;
var b=ORYX.Core.Command.extend({construct:function(){this.newProperties=a;
this.oldProperties=e;
this.selectedElements=[c];
this.facade=d
},execute:function(){this.newProperties.each(function(g){if(!c.getStencil().property(g.key).readonly()){c.setProperty(g.key,g.value)
}}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.oldProperties.each(function(g){if(!c.getStencil().property(g.key).readonly()){c.setProperty(g.key,g.value)
}}.bind(this));
this.facade.setSelection(this.selectedElements);
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var f=new b();
this.facade.executeCommands([f]);
a.each(function(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:[c],key:g.key,value:g.value})
}.bind(this))
}};
ORYX.Plugins.DataIOEditorPlugin=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.DataIOEditorPlugin);
ORYX.DataIOEditorUtils={hasDataIOProperty:function(d){var f=d.getStencil();
var c=["oryx-assignmentsview","oryx-datainputassociationsview","oryx-dataoutputassociationsview","oryx-datainput","oryx-datainputset","oryx-dataoutput","oryx-dataoutputset"];
for(var b=0;
b<c.length;
b++){if(f.property(c[b])!==undefined){var g=f.property(c[b]);
if((g.visible()&&g.visible()==true)&&g.hidden()!=true){var e=d.properties["oryx-tasktype"];
if(g.fortasktypes()&&g.fortasktypes().length>0){var a=g.fortasktypes().split("|");
for(var b=0;
b<a.size();
b++){if(a[b]==e){return true
}}}else{return true
}}}}return false
},getDisallowedPropertyNames:function(a){if(a.properties["oryx-tasktype"]!==undefined&&a.properties["oryx-tasktype"]=="User"){return"GroupId,Skippable,Comment,Description,Priority,Content,TaskName,Locale,CreatedBy,NotCompletedReassign,NotStartedReassign,NotCompletedNotify,NotStartedNotify"
}else{return""
}},getProcessVars:function(c){var e="** "+ORYX.I18N.DataIOEditorPlugin.VariableDefinitions+" **,";
if(c&&c.parent){var d=this.getParentVars(c.parent);
if(d&&d.length>0){e=e+d
}}var a="";
var b=ORYX.EDITOR.getSerializedJSON();
var f=jsonPath(b.evalJSON(),"$.properties.vardefs");
if(f){f.forEach(function(g){if(g.length>0){a=a+g+","
}})
}if(a&&a.length>0){e=e+a
}return e
},getParentVars:function(c){var d="";
if(c){if(c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"||c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#Subprocess"||c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#EventSubprocess"||c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#AdHocSubprocess"){var f=c.properties["oryx-vardefs"];
if(f&&f.length>0){d=d+this.sortVarsString(f)
}if(c._stencil._jsonStencil.id=="http://b3mn.org/stencilset/bpmn2.0#MultipleInstanceSubprocess"){var b=c.properties["oryx-multipleinstancedatainput"];
if(b&&b.length>0){d=d+this.sortVarsString(b)
}var a=c.properties["oryx-multipleinstancedataoutput"];
if(a&&a.length>0){d=d+this.sortVarsString(a)
}}}if(c.parent){var e=this.getParentVars(c.parent);
if(e&&e.length>0){d=d+e
}}}return d
},sortVarsString:function(d){if(!d||d.length<1){return""
}var b=d.split(",");
b.sort();
var c="";
for(var a=0;
a<b.length;
a++){c=c+b[a]+","
}return c+","
},setAssignmentsViewProperty:function(f){var i=f.getStencil();
var c=undefined;
if(i.property("oryx-datainput")!==undefined){c=f.properties["oryx-datainput"]
}var d=undefined;
if(i.property("oryx-datainputset")!==undefined){d=f.properties["oryx-datainputset"]
}var j=undefined;
if(i.property("oryx-dataoutput")!==undefined){j=f.properties["oryx-dataoutput"]
}var e=undefined;
if(i.property("oryx-dataoutputset")!==undefined){e=f.properties["oryx-dataoutputset"]
}var a=undefined;
if(i.property("oryx-assignments")!==undefined){a=f.properties["oryx-assignments"]
}else{if(i.property("oryx-datainputassociations")!==undefined){a=f.properties["oryx-datainputassociations"]
}else{if(i.property("oryx-dataoutputassociations")!==undefined){a=f.properties["oryx-dataoutputassociations"]
}}}var h=this.getProcessVars(f);
var g=this.getDisallowedPropertyNames(f);
var b=parent.designersignalgetassignmentsviewproperty(c,d,j,e,h,a,g);
if(b&&b.length>0){if(i.property("oryx-assignmentsview")!==undefined){f.setProperty("oryx-assignmentsview",b)
}else{if(i.property("oryx-datainputassociationsview")!==undefined){f.setProperty("oryx-datainputassociationsview",b)
}else{if(i.property("oryx-dataoutputassociationsview")!==undefined){f.setProperty("oryx-dataoutputassociationsview",b)
}}}}}};