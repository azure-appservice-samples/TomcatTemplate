if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.InlineTaskFormEditor=Clazz.extend({sourceMode:undefined,taskformeditor:undefined,taskformsourceeditor:undefined,taskformcolorsourceeditor:undefined,hlLine:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_TASKFORM_EDIT,this.chooseFormEditor.bind(this))
},chooseFormEditor:function(a){Ext.Msg.show({title:ORYX.I18N.inlineTaskFormEditor.formEditor,msg:ORYX.I18N.inlineTaskFormEditor.selectForm,buttons:{yes:ORYX.I18N.inlineTaskFormEditor.graphicalModeler,no:ORYX.I18N.inlineTaskFormEditor.markupEditor,cancel:ORYX.I18N.Dictionary.cancel},icon:Ext.MessageBox.QUESTION,fn:function(b){if(b=="yes"){this.showTaskFormEditor("form",a)
}else{if(b=="no"){this.showTaskFormEditor("ftl",a)
}}}.bind(this)})
},showTaskFormEditor:function(b,a){if(a&&a.tn){Ext.Ajax.request({url:ORYX.PATH+"formwidget",method:"POST",success:function(c){try{var d=c.responseText.evalJSON();
Ext.Ajax.request({url:ORYX.PATH+"taskformseditor",method:"POST",success:function(g){try{if(b=="form"){var i=g.responseText.split("|");
parent.designeropenintab(i[0],encodeURI(i[1]))
}else{this._buildandshow(b,a.tn,g.responseText,d)
}}catch(h){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingEditor+": "+h,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingEditor+".",title:""})
},params:{formtype:b,action:"load",taskname:a.tn,profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
}catch(f){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingWidgets+": "+f,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInitiatingWidgets+".",title:""})
},params:{action:"getwidgets",profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.taskNameNotSpecified,title:""})
}},_buildandshow:function(k,o,h,e){var c="";
if(h&&h!="false"){c=h
}var d=[];
for(var n in e){if(e.hasOwnProperty(n)){d.push(n)
}}d.sort();
var l=[];
for(var g=0;
g<d.length;
g++){l[g]=[d[g]+""]
}var m=new Ext.data.SimpleStore({fields:["name"],data:l});
var b=new Ext.form.ComboBox({fieldLabel:ORYX.I18N.inlineTaskFormEditor.insertFormWidget,labelStyle:"width:240px",hiddenName:"widget_name",emptyText:ORYX.I18N.inlineTaskFormEditor.insertFormWidget+"...",store:m,displayField:"name",valueField:"name",mode:"local",typeAhead:true,triggerAction:"all",listeners:{select:{fn:function(q,i){if(this.taskformcolorsourceeditor){Ext.Ajax.request({url:ORYX.PATH+"formwidget",method:"POST",success:function(r){try{this.taskformcolorsourceeditor.replaceSelection(r.responseText,"end")
}catch(s){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInsertingFormWidget+": "+s,title:""})
}}.bind(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorInsertingFormWidget+".",title:""})
},params:{action:"getwidgetsource",profile:ORYX.PROFILE,widgetname:q.getValue(),uuid:window.btoa(encodeURI(ORYX.UUID))}})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.widgetInsertionSourceMode,title:""})
}}.bind(this)}}});
var j=Ext.id();
this.taskformsourceeditor=new Ext.form.TextArea({id:j,anchor:"100%",autoScroll:true,value:c});
var a=new Ext.Panel({header:false,anchor:"100%",layout:"column",autoScroll:true,border:false,layoutConfig:{columns:2,pack:"center",align:"middle"},items:[{columnWidth:0.5,items:this.taskformsourceeditor},{columnWidth:0.5,items:[{xtype:"component",id:"livepreviewpanel",anchor:"100%",autoScroll:true,autoEl:{tag:"iframe",width:"100%",height:"570",frameborder:"0",scrolling:"auto"}}]}]});
var p=new Ext.Window({id:"maineditorwindow",layout:"fit",autoCreate:true,title:ORYX.I18N.inlineTaskFormEditor.editingForm+o+" - "+ORYX.I18N.inlineTaskFormEditor.completionInst,height:570,width:930,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,keys:[{fn:function(){p.close();
p=null
}.bind(this)}],items:[a],listeners:{hide:function(){p=null
}.bind(this)},buttons:[{text:ORYX.I18N.Dictionary.Save,handler:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"info",msg:ORYX.I18N.inlineTaskFormEditor.storingForm,title:""});
var i="";
i=this.taskformcolorsourceeditor.getValue();
Ext.Ajax.request({url:ORYX.PATH+"taskformseditor",method:"POST",success:function(q){try{p.close();
p=null
}catch(r){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorSavingForm+": "+r,title:""})
}}.createDelegate(this),failure:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.inlineTaskFormEditor.errorSavingForm+".",title:""})
},params:{formtype:k,action:"save",taskname:o,profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),tfvalue:i}})
}.bind(this)},{text:ORYX.I18N.Dictionary.cancel,handler:function(){p.close();
p=null
}.bind(this)}],tbar:[b]});
p.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var f;
this.taskformcolorsourceeditor=CodeMirror.fromTextArea(document.getElementById(j),{mode:"text/html",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc,extraKeys:{"'>'":function(i){i.closeTag(i,">")
},"'/'":function(i){i.closeTag(i,"/")
},"Ctrl-Z":function(i){CodeMirror.hint(i,CodeMirror.formsHint,a)
}},onCursorActivity:function(){this.taskformcolorsourceeditor.setLineClass(this.hlLine,null,null);
this.hlLine=this.taskformcolorsourceeditor.setLineClass(this.taskformcolorsourceeditor.getCursor().line,null,"activeline")
}.bind(this),onChange:function(){clearTimeout(f);
f=setTimeout(this.updatePreview.bind(this),300)
}.bind(this)});
this.hlLine=this.taskformcolorsourceeditor.setLineClass(0,"activeline");
setTimeout(this.updatePreview.bind(this),300)
},updatePreview:function(){var b=document.getElementById("livepreviewpanel");
var a=b.contentDocument||b.contentWindow.document;
a.open();
a.write(this.taskformcolorsourceeditor.getValue());
a.close()
}});