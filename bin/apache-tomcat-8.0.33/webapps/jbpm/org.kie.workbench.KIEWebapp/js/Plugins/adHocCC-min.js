if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.AdHocCC=Clazz.extend({facade:undefined,UNSAVED_RESOURCE:"unsaved",construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.AdHocCC.compl,functionality:this.editCC.bind(this),group:ORYX.I18N.AdHocCC.group,icon:ORYX.BASE_FILE_PATH+"images/adhoc.gif",description:ORYX.I18N.AdHocCC.complDesc,index:0,minShape:1,maxShape:1})
},editCC:function(){var f=this.facade.getSelection();
if(f.length!=1){this.openErroDialog(ORYX.I18N.AdHocCC.notOne);
return
}var h=f[0];
if(h._stencil.id()!="http://b3mn.org/stencilset/bpmnexec#Subprocess"||!h.properties["oryx-isadhoc"]){this.openErroDialog(ORYX.I18N.AdHocCC.nodAdHocCC);
return
}var G=h.properties["oryx-adhoccompletioncondition"];
var L=["resourceID","resourceName"];
var q=[];
var K=["state"];
var k=[["ready"],["skipped"],["completed"]];
var t=["resourceID_FieldName","dataNameAndFieldName"];
var p=[];
var w=new DOMParser();
var s=h.getChildNodes();
for(var J=0;
J<s.length;
J++){var g=s[J];
if(g._stencil.id()=="http://b3mn.org/stencilset/bpmnexec#Task"){var C=g.properties["oryx-name"];
var v=g.resourceId;
if(typeof v=="undefined"){DataManager.__persistDOM(this.facade);
v=g.resourceId;
if(typeof v=="undefined"){v=this.UNSAVED_RESOURCE;
C=C+" (unsaved)"
}}q.push([v,C])
}else{if(g._stencil.id()=="http://b3mn.org/stencilset/bpmnexec#DataObject"){var C=g.properties["oryx-name"];
var v=g.resourceId;
if(typeof v=="undefined"){DataManager.__persistDOM(this.facade);
v=g.resourceId;
if(typeof v=="undefined"){v=this.UNSAVED_RESOURCE;
C=C+" (unsaved)"
}}var z=g.properties["oryx-datamodel"];
var o=w.parseFromString(z,"text/xml");
var H=o.childNodes[0];
if(H!=null){var e=H.childNodes;
for(var I=0;
I<e.length;
I++){var y=e[I].attributes.name.nodeValue;
if(y!=null){p.push([[v,y],C+"/"+y])
}}}}}}var n=new Ext.data.SimpleStore({fields:L,data:q});
var d=new Ext.data.SimpleStore({fields:K,data:k});
var m=new Ext.data.SimpleStore({fields:t,data:p});
var N=new Ext.form.ComboBox({store:n,valueField:L[0],displayField:L[1],emptyText:ORYX.I18N.AdHocCC.selectTask,typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,editable:false,width:180});
var D=new Ext.form.ComboBox({store:d,displayField:K[0],emptyText:ORYX.I18N.AdHocCC.selectState,typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,editable:false,width:180});
var A=new Ext.Button({text:ORYX.I18N.AdHocCC.addExp,handler:function(){var i=N.getValue();
var j=D.getValue();
if(i!=this.UNSAVED_RESOURCE&&i!=""&&j!=""){this.addStringToTextArea(a,"stateExpression('"+i+"', '"+j+"')");
N.setValue("");
D.setValue("")
}}.bind(this)});
var M=new Ext.form.ComboBox({store:m,valueField:t[0],displayField:t[1],emptyText:ORYX.I18N.AdHocCC.selectDataField,typeAhead:true,mode:"local",triggerAction:"all",selectOnFocus:true,editable:false,width:180});
var x=new Ext.form.TextField({width:180,emptyText:ORYX.I18N.AdHocCC.enterEqual});
var u=new Ext.Button({text:ORYX.I18N.AdHocCC.addExp,handler:function(){var j=M.getValue();
var i=x.getValue();
if(j!=null&&j[0]!=this.UNSAVED_RESOURCE&&i!=""){this.addStringToTextArea(a,"dataExpression('"+j[0]+"', '"+j[1]+"', '"+i+"')");
M.setValue("");
x.setValue("")
}}.bind(this)});
var c=new Ext.Button({text:ORYX.I18N.AdHocCC.and,minWidth:50,handler:function(){this.addStringToTextArea(a,"&")
}.bind(this)});
var b=new Ext.Button({text:ORYX.I18N.AdHocCC.or,minWidth:50,handler:function(){this.addStringToTextArea(a,"|")
}.bind(this)});
var B=new Ext.Button({text:"(",minWidth:50,handler:function(){this.addStringToTextArea(a,"(")
}.bind(this)});
var l=new Ext.Button({text:")",minWidth:50,handler:function(){this.addStringToTextArea(a,")")
}.bind(this)});
var E=new Ext.Button({text:ORYX.I18N.AdHocCC.not,minWidth:50,handler:function(){this.addStringToTextArea(a,"!")
}.bind(this)});
var a=new Ext.form.TextArea({width:418,height:100,value:G});
var r=new Ext.Button({text:ORYX.I18N.AdHocCC.clearCC,handler:function(){a.setValue("")
}});
var F=new Ext.Window({width:450,height:485,resizable:false,minimizable:false,modal:true,autoScroll:true,title:ORYX.I18N.AdHocCC.editCC,layout:"table",defaults:{bodyStyle:"padding:3px;background-color:transparent;border-width:0px"},layoutConfig:{columns:7},items:[{items:[new Ext.form.Label({text:ORYX.I18N.AdHocCC.addExecState,style:"font-size:12px;"})],colspan:7},{},{items:[N],colspan:6},{},{items:[D],colspan:4},{items:[A]},{},{colspan:7},{items:[new Ext.form.Label({text:ORYX.I18N.AdHocCC.addDataExp,style:"font-size:12px;"})],colspan:7},{},{items:[M],colspan:6},{},{items:[x],colspan:4},{items:[u]},{},{colspan:7},{items:[new Ext.form.Label({text:ORYX.I18N.AdHocCC.addLogOp,style:"font-size:12px;"})],colspan:7},{},{items:[c]},{items:[b]},{items:[B]},{items:[l]},{items:[E]},{},{colspan:7},{items:[new Ext.form.Label({text:ORYX.I18N.AdHocCC.curCond,style:"font-size:12px;"})],colspan:7},{},{items:[a],colspan:5},{},{colspan:5},{items:[r]},{}],buttons:[{text:ORYX.I18N.theme.Apply,handler:function(){F.hide();
h.properties["oryx-adhoccompletioncondition"]=a.getValue();
this.facade.setSelection([]);
this.facade.setSelection(f)
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){F.hide()
}}],keys:[{key:27,fn:function(){F.hide()
}}]});
F.show()
},addStringToTextArea:function(e,a){var c=e.getEl().dom.selectionStart;
var d=e.getEl().dom.selectionEnd;
var b=e.getValue();
e.setValue(b.substring(0,c)+a+b.substring(d));
e.getEl().dom.selectionStart=c+a.length;
e.getEl().dom.selectionEnd=e.getEl().dom.selectionStart
},openErroDialog:function(a){Ext.MessageBox.show({title:ORYX.I18N.BPMN2PNConverter_error,msg:a,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})
}});