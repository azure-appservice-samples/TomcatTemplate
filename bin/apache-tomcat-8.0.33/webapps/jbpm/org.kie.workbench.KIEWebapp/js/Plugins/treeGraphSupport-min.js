if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.TreeGraphSupport=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:ORYX.I18N.TreeGraphSupport.syntaxCheckName,functionality:this.syntaxCheck.bind(this),group:ORYX.I18N.TreeGraphSupport.group,icon:ORYX.BASE_FILE_PATH+"images/checker_syntax.png",description:ORYX.I18N.TreeGraphSupport.syntaxCheckDesc,index:1,minShape:0,maxShape:0})
},syntaxCheck:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"treegraph",});
new Ajax.Request(ORYX.CONFIG.TREEGRAPH_SUPPORT,{method:"POST",asynchronous:false,parameters:{data:this.facade.getERDF()},onSuccess:function(a){var b=a.responseText.evalJSON();
if(b instanceof Array){if(b.length>0){b.each(function(d){var c=this.facade.getCanvas().getChildShapeByResourceId(d);
if(c){this.highlightShape(c)
}}.bind(this))
}}Ext.Msg.show({title:ORYX.I18N.Oryx.title,msg:a.responseText,icon:Ext.MessageBox.INFO})
}.bind(this),onFailure:function(a){Ext.Msg.show({title:ORYX.I18N.Oryx.title,msg:"An error occurs while sending request!",icon:Ext.MessageBox.WARNING})
}})
},highlightShape:function(b){if(!(b instanceof ORYX.Core.Shape)){return
}var a;
if(b instanceof ORYX.Core.Edge){a={stroke:"red"}
}else{a={fill:"red",stroke:"black","stroke-width":2}
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"treegraph",shapes:[b],attributes:a,})
}});