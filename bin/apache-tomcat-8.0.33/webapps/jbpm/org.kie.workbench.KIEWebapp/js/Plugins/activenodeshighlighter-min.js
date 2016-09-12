if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.ActiveNodesHighlighter=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.highlightnodes.bind(this))
},highlightnodes:function(a){ORYX.EDITOR._canvas.getChildren().each((function(b){this.applyHighlightingToChild(b)
}).bind(this))
},applyHighlightingToChild:function(b){if(ORYX.COMPLETEDNODES){for(var a=0;
a<ORYX.COMPLETEDNODES.length;
a++){if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){if(ORYX.COMPLETEDNODES[a]==b.resourceId){b.setProperty("oryx-bordercolor","#A8A8A8");
b.setProperty("oryx-bgcolor","#CDCDCD")
}}}}if(ORYX.ACTIVENODES){for(var a=0;
a<ORYX.ACTIVENODES.length;
a++){if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){if(ORYX.ACTIVENODES[a]==b.resourceId){b.setProperty("oryx-bordercolor","#FF0000");
b.setProperty("oryx-bgcolor",b.properties["oryx-origbgcolor"])
}}}}if(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge){if(ORYX.READONLY==true||ORYX.VIEWLOCKED==true){b.setSelectable(false);
b.setMovable(false);
b.setProperty("oryx-isselectable","false");
if(b instanceof ORYX.Core.Edge){b.dockers.each((function(c){c.setMovable(false);
c.update()
}))
}}b.refresh()
}if(b&&b.getChildren().size()>0){for(var a=0;
a<b.getChildren().size();
a++){this.applyHighlightingToChild(b.getChildren()[a])
}}}});