if(!ORYX.Plugins){ORYX.Plugins=new Object()
}var guvnorPopupEditor;
ORYX.Plugins.ConstraintExpressionEditor=Clazz.extend({construct:function(b,a){this.facade=b;
ORYX.CONFIG.GUVNOR_USE_FIXED_PACKAGE=false;
ORYX.CONFIG.GUVNOR_FIXED_PACKAGE="mortgages";
ORYX.CONFIG.GUVNOR_CATEGORY="Home Mortgage";
ORYX.CONFIG.GUVNOR_HIDE_RHS=true;
ORYX.CONFIG.GUVNOR_HIDE_ATTRIBUTES=true;
console.log(a);
if(a.properties){a.properties.each(function(c){if(c.useFixedPackage){ORYX.CONFIG.GUVNOR_USE_FIXED_PACKAGE=(c.useFixedPackage=="true")
}if(c.fixedPackage){ORYX.CONFIG.GUVNOR_FIXED_PACKAGE=c.fixedPackage
}if(c.category){ORYX.CONFIG.GUVNOR_CATEGORY=c.category
}if(c.hideRHS){ORYX.CONFIG.GUVNOR_HIDE_RHS=(c.hideRHS=="true")
}if(c.hideAttributes){ORYX.CONFIG.GUVNOR_HIDE_ATTRIBUTES=(c.hideAttributes=="true")
}}.bind(this))
}ORYX.FieldEditors.simpleconstraintexpressioneditor=new ORYX.Plugins.ConstraintExpressionEditor.SimpleConstraintExpressionEditorFactory();
ORYX.FieldEditors.contextawareconstraintexpressioneditor=new ORYX.Plugins.ConstraintExpressionEditor.ContextAwareConstraintExpressionEditorFactory()
}});
ORYX.Plugins.ConstraintExpressionEditor.SimpleConstraintExpressionEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var c=arguments[1];
var a=arguments[3];
return new ORYX.Plugins.ConstraintExpressionEditor.BaseConstraintExpressionEditorFactory().createEditor.bind(this)(false,b,c,a)
}});
ORYX.Plugins.ConstraintExpressionEditor.ContextAwareConstraintExpressionEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var c=arguments[1];
var a=arguments[3];
return new ORYX.Plugins.ConstraintExpressionEditor.BaseConstraintExpressionEditorFactory().createEditor.bind(this)(true,b,c,a)
}});
ORYX.Plugins.ConstraintExpressionEditor.BaseConstraintExpressionEditorFactory=Clazz.extend({construct:function(){},createEditor:function(h,i,b,d){var f=true;
if(b._jsonProp.showConstraintEditorWhen){var a=b._jsonProp.showConstraintEditorWhen.property;
if(!a){alert(ORYX.I18N.constraintExpr.errorPropertyMissing);
return null
}var g=b._jsonProp.showConstraintEditorWhen.value;
if(!g){alert(ORYX.I18N.constraintExpr.errorValueIsMissing);
return null
}f=this.shapeSelection.shapes[0].properties[b.prefix()+"-"+a]==g
}var c;
if(f){var e=h?this.shapeSelection.shapes[0]:undefined;
c=new Ext.form.GuvnorPopupEditor(e,function(j){this.editDirectly(i,j)
}.bind(this));
guvnorPopupEditor=c
}else{c=new Ext.form.ComplexTextField({allowBlank:b.optional(),dataSource:this.dataSource,grid:this.grid,row:d,facade:this.facade});
c.on("dialogClosed",this.dialogClosed,{scope:this,row:d,col:1,field:c})
}return new Ext.Editor(c)
}});
Ext.form.GuvnorPopupEditor=function(b,g){var f="#-#";
var e="";
var d="";
var c=g;
var a=b;
Ext.form.GuvnorPopupEditor.superclass.constructor.call(this,{defaultAutoCreate:{tag:"textarea",rows:1,style:"height:16px;overflow:hidden;"},onTriggerClick:function(){if(this.disabled){return
}var k=document.body.clientWidth-20;
var l=document.body.clientHeight-20;
var o=ORYX.EXTERNAL_PROTOCOL+"://"+ORYX.EXTERNAL_HOST+"/"+ORYX.EXTERNAL_SUBDOMAIN+"/org.drools.guvnor.Guvnor/standaloneEditorServlet";
var j=[];
j.push({name:"client",value:""});
var v=ORYX.CONFIG.GUVNOR_FIXED_PACKAGE;
if(!ORYX.CONFIG.GUVNOR_USE_FIXED_PACKAGE){var r=ORYX.EDITOR.getJSON();
if(r.properties["package"]&&r.properties["package"]!=""){}else{alert(ORYX.I18N.constraintExpr.configureProcess);
return
}v=r.properties["package"]
}j.push({name:"packageName",value:v});
j.push({name:"categoryName",value:ORYX.CONFIG.GUVNOR_CATEGORY});
j.push({name:"hideRuleRHS",value:""+ORYX.CONFIG.GUVNOR_HIDE_RHS});
j.push({name:"hideRuleAttributes",value:""+ORYX.CONFIG.GUVNOR_HIDE_ATTRIBUTES});
if(e==""){j.push({name:"brlSource",value:"<rule><name>Condition Constraint</name><modelVersion>1.0</modelVersion><attributes></attributes><metadataList/><lhs></lhs><rhs></rhs></rule>"})
}else{j.push({name:"brlSource",value:e})
}if(a){var x=collectNodesInPath(a,new RegExp("ModelEntity"));
x=x.concat(collectNodesInPath(a,new RegExp("Model_")));
if(!x||x.length==0){alert(ORYX.I18N.constraintExpr.defineOneModel);
return
}var u=[];
var q=[];
x.each(function(z){var p=z.properties["oryx-modelentity"];
var w=z.properties["oryx-fieldconstraint"];
var i=z.properties["oryx-constraintvalue"];
if(!p){u.push(ORYX.I18N.constraintExpr.factNameMandatory);
return
}if(!w){u.push(ORYX.I18N.constraintExpr.mustSpecifyField+" '"+p+"' "+ORYX.I18N.constraintExpr.modelEntity);
return
}if(!i){u.push(ORYX.I18N.constraintExpr.mustSpecifyValue+" '"+p+"."+w+"' "+ORYX.I18N.constraintExpr.modelEntity);
return
}q.push("{"+p+"--@--"+w+"--@--"+i+"}")
});
if(u.length>0){this.showErrors(u);
return
}var y="";
new Ajax.Request("/workingSet",{asynchronous:false,method:"POST",parameters:{action:"createWorkingSetWithMandatoryConstraint",config:q},onSuccess:function(i){y=i.responseText
}.bind(this),onFailure:(function(i){u.push("Error getting Working Set Definition: "+i.responseText)
}).bind(this)});
if(u.length>0){this.showErrors(u);
return
}alert(y);
j.push({name:"workingSetXMLDefinitions",value:y})
}if(j.length>0){var m=0;
var n="";
o+="?";
for(m=0;
m<j.length;
m++){var h=j[m];
var s=n+h.name+"="+encodeURIComponent(h.value);
if(n==""){n="&amp;"
}o+=s
}}var t=new Ext.Window({id:"guvnorWindow",layout:"fit",width:k,height:l,closeAction:"close",plain:true,modal:true,title:ORYX.I18N.AMLSupport.title,autoScroll:true,resizable:true,html:'<iframe id="guvnorFrame" name="guvnorFrame" width="'+k+'" height="'+l+'"  onload="attachCallbacksToGuvnor();" src="'+o+'"></iframe>'});
t.show()
},showErrors:function(i){var h="Errors:";
i.each(function(j){h+="\n\t"+j
});
alert(h)
},encodeBRL:function(){var j="";
if(e){var h=e.split("\n");
for(var k=0;
k<h.length;
k++){var l=h[k];
l=encodeURIComponent(l);
l=f+l;
j+=l+"\n"
}}return j
},trimDRL:function(){var k="";
if(d){var h=false;
var m=d.split("\n");
for(var l=0;
l<m.length;
l++){var j=m[l];
j=j.replace(/^\s+/,"").replace(/\s+$/,"");
if(j=="then"){break
}if(h){k+=j+"\n"
}if(j=="when"){h=true
}}}return k
},getValue:function(){var h="";
h+=this.encodeBRL();
h+="\n";
h+=this.trimDRL();
return h
},closeGuvnorWindow:function(){Ext.getCmp("guvnorWindow").close()
},guvnorSaveAndCloseButtonCallback:function(){getGuvnorFrame(top).guvnorEditorObject.getBRL(function(h){this.setBRLValue(h);
getGuvnorFrame(top).guvnorEditorObject.getDRL(function(i){this.setDRLValue(i);
this.closeGuvnorWindow();
if(c){c(this.getValue())
}}.bind(this))
}.bind(this))
},guvnorCancelButtonCallback:function(){this.closeGuvnorWindow()
},setValue:function(l){d="";
e="";
var m=new RegExp("^"+f+".*");
var j=l.split("\n");
for(var k=0;
k<j.length;
k++){var h=j[k];
if(h.match(m)){e+=decodeURIComponent(h.substring(f.length))+"\n"
}else{d+=h+"\n"
}}},getDRLValue:function(){return d
},setDRLValue:function(h){d=h
},getBRLValue:function(){return e
},setBRLValue:function(h){e=h
}})
};
Ext.extend(Ext.form.GuvnorPopupEditor,Ext.form.TriggerField,{});
function attachCallbacksToGuvnor(){if(!getGuvnorFrame(top).guvnorEditorObject){setTimeout("this.attachCallbacksToGuvnor()",1000);
return
}getGuvnorFrame(top).guvnorEditorObject.registerAfterSaveAndCloseButtonCallbackFunction(guvnorPopupEditor.guvnorSaveAndCloseButtonCallback.bind(guvnorPopupEditor));
getGuvnorFrame(top).guvnorEditorObject.registerAfterCancelButtonCallbackFunction(guvnorPopupEditor.guvnorCancelButtonCallback.bind(guvnorPopupEditor))
}function getGuvnorFrame(b){if(b.frames.guvnorFrame){return b.frames.guvnorFrame
}for(var a=0;
a<b.frames.length;
a++){var c=getGuvnorFrame(b.frames[a]);
if(c){return c
}}return null
}function collectNodesInPath(a,c){if(!a.incoming||a.incoming.length==0){return[]
}var b=[];
a.incoming.each(function(d){if(d._stencil._jsonStencil.id.match(c)){b.push(d)
}b=b.concat(collectNodesInPath(d,c))
});
return b
};