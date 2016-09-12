if(!ORYX){ORYX=new Object()
}if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BpmnLayouter=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.offer({name:"Layout-BPMN",description:"Layout BPMN Model",functionality:this.layout.bind(this),group:"Layout",icon:ORYX.BASE_FILE_PATH+"images/auto_layout.png",index:1,minShape:0,maxShape:0})
},layout:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.Layouting.doing});
new Ajax.Request(ORYX.CONFIG.BPMN_LAYOUTER,{method:"POST",asynchronous:false,parameters:{data:this.facade.getSerializedJSON(),output:"coordinatesonly"},onFailure:function(a){Ext.Msg.alert("Layouting Error","Error while layouting:!\n"+a.responseText);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
},onSuccess:function(b){var a=ORYX.Core.Command.extend({construct:function(f,e){this.layoutArray=f;
this.plugin=e;
this.oldLayoutArray=[]
},execute:function(){this.layoutArray.each(function(h){var e=this.plugin.facade.getCanvas().getChildShapeByResourceId(h.id);
var g={id:h.id,bounds:e.bounds.clone()};
this.oldLayoutArray.push(g);
var f=h.bounds.split(" ");
e.bounds.set(f[0],f[1],f[2],f[3]);
if(h.dockers!=null){this.plugin.setDockersBad(e,h.dockers)
}e.update()
}.bind(this));
this.plugin.facade.getCanvas().update();
this.plugin.facade.updateSelection()
},rollback:function(){this.oldLayoutArray.each(function(f){var e=this.plugin.facade.getCanvas().getChildShapeByResourceId(f.id);
e.bounds.set(f.bounds);
e.update()
}.bind(this));
this.plugin.facade.getCanvas().update();
this.plugin.facade.updateSelection()
}});
var d=b.responseText.evalJSON();
if(d instanceof Array&&d.size()>0){var c=new a(d,this);
this.facade.executeCommands([c])
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}.bind(this)})
},setDockersBad:function(c,a){var b="";
a.each(function(d){b+=d.x+" "+d.y+" "
});
b+=" # ";
c.deserialize([{prefix:"oryx",name:"dockers",value:b}])
},setDockersGood:function(c,a){if(elem.dockers.length==1){}else{var a=c.getDockers().slice(1,-1);
a.each(function(f){c.removeDocker(f)
});
var e=c.getDockers()[0];
if(e.getDockedShape()){e.setReferencePoint(elem.dockers[0])
}else{e.bounds.moveTo(elem.dockers[0].x,elem.dockers[0].y)
}e.refresh();
var d=c.getDockers()[1];
if(d.getDockedShape()){d.setReferencePoint(elem.dockers[elem.dockers.length-1])
}else{d.bounds.moveTo(elem.dockers[elem.dockers.length-1].x,elem.dockers[elem.dockers.length-1].y)
}d.refresh();
var b=elem.dockers.slice(1,-1);
b.each(function(g){var f=c.createDocker(undefined,g);
f.parent=c;
f.bounds.centerMoveTo(g.x,g.y);
f.update()
})
}}});