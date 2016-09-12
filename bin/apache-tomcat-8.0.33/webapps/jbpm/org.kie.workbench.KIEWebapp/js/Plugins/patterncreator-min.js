if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.PatternCreator=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.CREATE_PATTERN,this.handleCreatePattern.bind(this));
this.patternShapes={};
this.patternPositions={};
this.selectedRoots=[];
this.selectedRootsCount;
this.createdElementCount;
this.patternContainer
},handleCreatePattern:function(c){if(c&&c.pid&&c.pdata&&c.pos){this.patternShapes={};
this.patternPositions={};
this.selectedRoots=[];
this.selectedRootsCount=0;
this.createdElementCount=0;
this.patternContainer=undefined;
for(var e=0;
e<c.pdata.length;
e++){var g=c.pdata[e];
if(g.id==c.pid){var f=g.elements;
var h=this.facade.getSelection();
h.each(function(i){if(i instanceof ORYX.Core.Node){this.selectedRoots[this.selectedRootsCount]=i;
this.selectedRootsCount++
}}.bind(this));
var b=this.getPatternRoots(f);
if(this.selectedRoots.length>0&&(this.selectedRoots.length!=b.length)){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.errorAttaching,title:""});
return
}for(var a=0;
a<f.length;
a++){var d=f[a];
if(this.patternShapes[d.id]===undefined){this.createElement(d,c);
this.createElementChildren(d,f,c)
}else{this.createElementChildren(d,f,c)
}}this.updateParentContainer()
}}this.facade.setSelection([]);
this.facade.getCanvas().update();
this.facade.updateSelection()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.invalidData,title:""})
}},updateParentContainer:function(){if(!(this.patternContainer instanceof ORYX.Core.Canvas)){var b=0;
var a=0;
var c=100;
this.patternContainer.getChildShapes(false,function(f){var e=f.bounds;
b=Math.max(b,e.lowerRight().x+c);
a=Math.max(a,e.lowerRight().y+c)
});
if(this.patternContainer.bounds.width()<b||this.patternContainer.bounds.height()<a){var d=this.patternContainer.bounds.upperLeft();
this.patternContainer.bounds.set(d.x,d.y,d.x+b,d.y+a);
this.patternContainer.update();
this.facade.getCanvas().update()
}}},getPatternRoots:function(e){var a=[];
var d=0;
for(var b=0;
b<e.length;
b++){var c=e[b];
if(c.parent.length==0){a[d]=c;
d++
}}return a
},findChildObject:function(a,d){for(var b=0;
b<d.length;
b++){var c=d[b];
if(c.id==a){return c
}}return undefined
},createElement:function(d,c){var g;
var f=this.facade.getCanvas().getAbstractShapesAtPosition(c.pos);
if(f.length<=0){g=ORYX.EDITOR._canvas
}if(f.lenght==1&&f[0] instanceof ORYX.Core.Canvas){g=ORYX.EDITOR._canvas
}else{var a=f.reverse().find(function(h){return(h instanceof ORYX.Core.Canvas||h instanceof ORYX.Core.Node||h instanceof ORYX.Core.Edge)
});
g=a
}if(!this.patternContainer||this.patternContainer===undefined){this.patternContainer=g
}if(d.parent.length==0&&this.selectedRoots.length>0){this.patternShapes[d.id]=this.selectedRoots[this.createdElementCount];
this.patternPositions[d.id]=this.selectedRoots[this.createdElementCount].absoluteCenterXY();
this.createdElementCount++;
return
}var e={x:0,y:0};
if(this.patternPositions[d.id]===undefined){e.x=c.pos.x;
e.y=c.pos.y
}else{e.x=this.patternPositions[d.id].x;
e.y=this.patternPositions[d.id].y
}e.x+=d.xyOffset[0];
e.y+=d.xyOffset[1];
var b={type:d.nodetype,namespace:d.namespace,connectingType:d.connectingType,position:e,parent:g};
this.patternShapes[d.id]=this.facade.createShape(b);
this.patternPositions[d.id]=e;
this.setElementProperties(d);
this.patternShapes[d.id].refresh();
this.facade.getCanvas().update()
},createElementChildren:function(e,j,n){var m=e.children;
for(var d=0;
d<m.length;
d++){var g=m[d];
if(this.patternShapes[g]===undefined){var f=this.findChildObject(g,j);
if(f){var c={x:0,y:0};
c.x=this.patternPositions[e.id].x;
c.y=this.patternPositions[e.id].y;
c.x+=f.xyOffset[0];
c.y+=f.xyOffset[1];
var b={type:f.nodetype,namespace:f.namespace,connectingType:f.connectingType,connectedShape:this.patternShapes[e.id],position:c,parent:this.patternContainer};
this.patternShapes[f.id]=this.facade.createShape(b);
this.patternPositions[f.id]=c;
this.setElementProperties(f);
this.patternShapes[f.id].refresh();
this.facade.getCanvas().update()
}}else{var a;
var f=this.findChildObject(g,j);
var i=ORYX.Core.StencilSet.stencil(f.connectingType);
a=new ORYX.Core.Edge({eventHandlerCallback:this.facade.raiseEvent},i);
a.dockers.first().setDockedShape(this.patternShapes[e.id]);
var h=this.patternShapes[e.id].getDefaultMagnet();
var l=h?h.bounds.center():this.patternShapes[e.id].bounds.midPoint();
a.dockers.first().setReferencePoint(l);
a.dockers.last().setDockedShape(this.patternShapes[g]);
a.dockers.last().setReferencePoint(this.patternShapes[g].getDefaultMagnet().bounds.center());
this.facade.getCanvas().add(a);
this.facade.getCanvas().update()
}}},createPatternFromSelection:function(){var d=this.facade.getSelection();
if(d&&d.size()>0){var c=this.findParentShapes(d);
if(c&&c.size()>0){var e=new Ext.form.TextField({fieldLabel:ORYX.I18N.patternCreator.patternName,allowBlank:false,id:"patternName",regex:/^[a-z0-9 \-\.\_]*$/i});
var a=new Ext.form.FormPanel({baseCls:"x-plain",labelWidth:150,labelAlign:"right",bodyStyle:"padding:15x 15px 15px 15px",defaultType:"textfield",items:[e]});
var b=new Ext.Window({layout:"anchor",autoCreate:true,title:ORYX.I18N.patternCreator.create,height:150,width:400,modal:true,collapsible:false,fixedcenter:true,shadow:true,resizable:true,proxyDrag:true,autoScroll:true,keys:[{key:27,fn:function(){b.hide()
}.bind(this)}],items:[a],listeners:{hide:function(){b.destroy()
}.bind(this)},buttons:[{text:ORYX.I18N.PropertyWindow.ok,handler:function(){b.hide()
}.bind(this)},{text:ORYX.I18N.PropertyWindow.cancel,handler:function(){b.hide()
}.bind(this)}]});
b.show()
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.invalidSelect,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.patternCreator.noNodesSel,title:""})
}},setElementProperties:function(b){if(b.properties){var c=b.properties;
for(var a in c){this.patternShapes[b.id].setProperty("oryx-"+a,c[a])
}}},findParentShapes:function(c){var a=[];
var b=0;
c.each(function(d){if(d.getIncomingShapes()&&d.getIncomingShapes().size()>0){if(!this.isInSelection(c,d.getIncomingShapes())){if(d instanceof ORYX.Core.Node){a[b]=d;
b++
}}}else{a[b]=d;
b++
}}.bind(this));
return a
},isInSelection:function(d,a){var b=false;
if(!a||a.size()==0){return false
}for(var c=0;
c<a.length;
c++){d.each(function(e){if(e.resourceId==a[c].resourceId){b=true
}}.bind(this))
}return b
}});