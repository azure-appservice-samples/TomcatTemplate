if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ShapeConnector=Clazz.extend({construct:function(a){this.facade=a;
this.active=false;
this.sourceNode=null;
this.facade.offer({name:ORYX.I18N.ShapeConnector.add,functionality:this.enableConnector.bind(this),group:ORYX.I18N.ShapeConnector.group,toolbarGroup:ORYX.I18N.ShapeConnector.toolbarGroup,icon:ORYX.BASE_FILE_PATH+"images/pencil_go.png",description:ORYX.I18N.ShapeConnector.addDesc,index:1,toggle:true,minShape:0,maxShape:0});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this))
},enableConnector:function(a,b){this.connectButton=a;
if(!b){this.active=false;
this.sourceNode=null
}else{this.active=true
}},handleMouseDown:function(b,a){if(this.active&&a instanceof ORYX.Core.Node){if(this.sourceNode){this.createEdge(this.sourceNode,a)
}this.sourceNode=a
}else{if(this.active){if(this.connectButton){this.connectButton.toggle()
}}}},createEdge:function(d,e){var a=this.facade.getStencilSets().keys()[0];
var c=ORYX.Core.StencilSet.stencil(a+"SequenceFlow");
var b=new ORYX.Core.Edge({eventHandlerCallback:this.facade.raiseEvent},c);
b.dockers.first().setDockedShape(d);
b.dockers.first().setReferencePoint({x:d.bounds.width()/2,y:d.bounds.height()/2});
b.dockers.last().setDockedShape(e);
b.dockers.last().setReferencePoint({x:e.bounds.width()/2,y:e.bounds.height()/2});
this.facade.getCanvas().add(b);
this.facade.getCanvas().update();
return b
},});