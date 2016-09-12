if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.NodeXMLViewer=Clazz.extend({sourceEditor:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_NODEXML_SHOW,this.showNodeXML.bind(this));
this.sourceMode=false
},showNodeXML:function(b){if(b&&b.nodesource){this.sourceEditor=undefined;
var a=Ext.id();
var d=new Ext.form.TextArea({id:a,fieldLabel:ORYX.I18N.lockNode.nodeSource,value:b.nodesource,autoScroll:true});
var f=ORYX.Utils.getDialogSize(550,600);
var c=Ext.id();
var e=new Ext.Window({height:f.height,width:f.width,id:c,layout:"fit",title:ORYX.I18N.lockNode.nodeSource,items:[d],buttons:[{text:ORYX.I18N.Save.close,handler:function(){e.destroy();
this.sourceEditor=undefined
}.bind(this)}]});
e.show();
this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
this.sourceEditor=CodeMirror.fromTextArea(document.getElementById(a),{mode:"application/xml",lineNumbers:true,lineWrapping:true,onGutterClick:this.foldFunc})
}else{Ext.Msg.alert(ORYX.I18N.lockNode.nodeSourceNoSpecified)
}}});