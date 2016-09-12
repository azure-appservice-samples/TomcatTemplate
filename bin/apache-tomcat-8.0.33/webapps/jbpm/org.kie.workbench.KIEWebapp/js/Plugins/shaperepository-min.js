if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ShapeRepository={facade:undefined,construct:function(c){this.facade=c;
this._currentParent;
this._canContain=undefined;
this._canAttach=undefined;
this._patternData;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_LOADED,this.setStencilSets.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_RELOAD,this.setStencilSets.bind(this));
this.shapeList=new Ext.tree.TreeNode({});
var a=new Ext.tree.TreePanel({cls:"shaperepository",loader:new Ext.tree.TreeLoader(),root:this.shapeList,autoScroll:true,rootVisible:false,lines:false,anchors:"0, -30"});
var d=this.facade.addToRegion("west",a,ORYX.I18N.ShapeRepository.title);
Ext.Ajax.request({url:ORYX.PATH+"stencilpatterns",method:"POST",success:function(f){try{this._patternData=Ext.decode(f.responseText)
}catch(g){ORYX.Log.error("Failed to retrieve Stencil Patterns Data :\n"+g)
}}.createDelegate(this),failure:function(){ORYX.Log.error("Failed to retrieve Stencil Patterns Data")
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID))}});
var b=new Ext.dd.DragZone(this.shapeList.getUI().getEl(),{shadow:!Ext.isMac});
b.afterDragDrop=this.drop.bind(this,b);
b.beforeDragOver=this.beforeDragOver.bind(this,b);
b.beforeDragEnter=function(){this._lastOverElement=false;
return true
}.bind(this);
this.setStencilSets()
},setStencilSets:function(){var a=this.shapeList.firstChild;
while(a){this.shapeList.removeChild(a);
a=this.shapeList.firstChild
}this.facade.getStencilSets().values().each((function(d){var b;
var f=ORYX.I18N.propertyNames[d.title()];
var c=d.extensions();
this.shapeList.appendChild(b=new Ext.tree.TreeNode({text:f,allowDrag:false,allowDrop:false,iconCls:"headerShapeRepImg",cls:"headerShapeRep",singleClickExpand:true}));
b.render();
b.expand();
var e=d.stencils(this.facade.getCanvas().getStencil(),this.facade.getRules());
var g=new Hash();
e=e.sortBy(function(h){return h.position()
});
e.each((function(j){if(j.hidden()){return
}var h=j.groups();
h.each((function(l){var k=l;
if(ORYX.I18N.propertyNames[l]&&ORYX.I18N.propertyNames[l].length>0){k=ORYX.I18N.propertyNames[l]
}if(!g[l]){if(Ext.isIE){g[l]=new Ext.tree.TreeNode({text:k,allowDrag:false,allowDrop:false,iconCls:"headerShapeRepImg",cls:"headerShapeRepChild",singleClickExpand:true,expanded:true});
g[l].expand()
}else{g[l]=new Ext.tree.TreeNode({text:k,allowDrag:false,allowDrop:false,iconCls:"headerShapeRepImg",cls:"headerShapeRepChild",singleClickExpand:true})
}b.appendChild(g[l]);
g[l].render()
}this.createStencilTreeNode(g[l],j)
}).bind(this));
if(h.length==0){this.createStencilTreeNode(b,j)
}var i=ORYX.CONFIG.STENCIL_GROUP_ORDER();
b.sort(function(l,k){return i[d.namespace()][l.text]-i[d.namespace()][k.text]
})
}).bind(this))
}).bind(this))
},createStencilTreeNode:function(c,d){try{var a=d.id().split("#");
var b=ORYX.I18N.propertyNames[a[1]];
if(!b){b=d.title()
}else{if(b.length<=0){b=d.title()
}}var h;
if(window.SpriteUtils.isIconFile(d.icon())){h=new Ext.tree.TreeNode({text:b,iconCls:window.SpriteUtils.toUniqueId(d.icon()),allowDrag:false,allowDrop:false})
}else{h=new Ext.tree.TreeNode({text:b,icon:decodeURIComponent(d.icon()),allowDrag:false,allowDrop:false,iconCls:"ShapeRepEntreeImg",cls:"ShapeRepEntree"})
}if(c===undefined){}else{c.appendChild(h);
h.render()
}var f=h.getUI();
f.elNode.setAttributeNS(null,"title",d.description());
Ext.dd.Registry.register(f.elNode,{node:f.node,handles:[f.elNode,f.textNode].concat($A(f.elNode.childNodes)),isHandle:false,type:d.id(),title:d.title(),namespace:d.namespace()})
}catch(g){}},drop:function(m,k,b){this._lastOverElement=undefined;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"shapeRepo.added"});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"shapeRepo.attached"});
var l=m.getProxy();
if(l.dropStatus==l.dropNotAllowed){return
}if(!this._currentParent){return
}var h=Ext.dd.Registry.getHandle(k.DDM.currentTarget);
var s=b.getXY();
var o={x:s[0],y:s[1]};
var p=this.facade.getCanvas().node.getScreenCTM();
o.x-=p.e;
o.y-=p.f;
o.x/=p.a;
o.y/=p.d;
o.x-=document.documentElement.scrollLeft;
o.y-=document.documentElement.scrollTop;
var q=this._currentParent.absoluteXY();
o.x-=q.x;
o.y-=q.y;
h.position=o;
if(this._canAttach&&this._currentParent instanceof ORYX.Core.Node){h.parent=undefined
}else{h.parent=this._currentParent
}var f=ORYX.Core.Command.extend({construct:function(u,i,w,a,t,v){this.option=u;
this.currentParent=i;
this.canAttach=w;
this.position=a;
this.facade=t;
this.selection=this.facade.getSelection();
this.shape;
this.parent
},execute:function(){if(!this.shape){this.shape=this.facade.createShape(h);
this.parent=this.shape.parent
}else{this.parent.add(this.shape)
}if(this.canAttach&&this.currentParent instanceof ORYX.Core.Node&&this.shape.dockers.length>0){var a=this.shape.dockers[0];
if(this.currentParent.parent instanceof ORYX.Core.Node){this.currentParent.parent.add(a.parent)
}a.bounds.centerMoveTo(this.position);
a.setDockedShape(this.currentParent)
}if(j&&j.length>0&&this.shape instanceof ORYX.Core.Node){this.shape.setProperty("oryx-tasktype",j);
this.shape.refresh()
}this.facade.setSelection([this.shape]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_DROP_SHAPE,shape:this.shape})
},rollback:function(){this.facade.deleteShape(this.shape);
this.facade.setSelection(this.selection.without(this.shape));
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var g=this.facade.eventCoordinates(b.browserEvent);
var e=h.type.split("#");
var n=false;
if(ORYX.PREPROCESSING){var r=ORYX.PREPROCESSING.split(",");
for(var d=0;
d<r.length;
d++){if(r[d]==e[1]){n=true
}}}if(e[1].startsWith("wp-")&&!n){this.facade.raiseEvent({type:ORYX.CONFIG.CREATE_PATTERN,pid:e[1],pdata:this._patternData,pos:g})
}else{if(e[1].endsWith("Task")&&!n){var j=e[1];
j=j.substring(0,j.length-4);
h.type=e[0]+"#Task";
if(j.length<1){if(h.title=="User"||h.title=="Send"||h.title=="Receive"||h.title=="Manual"||h.title=="Service"||h.title=="Business Rule"||h.title=="Script"){j=h.title
}}var c=new f(h,this._currentParent,this._canAttach,g,this.facade,j);
this.facade.executeCommands([c])
}else{var c=new f(h,this._currentParent,this._canAttach,g,this.facade);
this.facade.executeCommands([c])
}}this._currentParent=undefined
},beforeDragOver:function(h,f,b){var e=this.facade.eventCoordinates(b.browserEvent);
var k=this.facade.getCanvas().getAbstractShapesAtPosition(e);
if(k.length<=0){var a=h.getProxy();
a.setStatus(a.dropNotAllowed);
a.sync();
return false
}var c=k.last();
if(k.lenght==1&&k[0] instanceof ORYX.Core.Canvas){return false
}else{var d=Ext.dd.Registry.getHandle(f.DDM.currentTarget);
var i=this.facade.getStencilSets()[d.namespace];
var j=i.stencil(d.type);
if(j.type()==="node"){var g=k.reverse().find(function(l){return(l instanceof ORYX.Core.Canvas||l instanceof ORYX.Core.Node||l instanceof ORYX.Core.Edge)
});
if(g!==this._lastOverElement){this._canAttach=undefined;
this._canContain=undefined
}if(g){if(!(g instanceof ORYX.Core.Canvas)&&g.isPointOverOffset(e.x,e.y)&&this._canAttach==undefined){this._canAttach=this.facade.getRules().canConnect({sourceShape:g,edgeStencil:j,targetStencil:j});
if(g&&g.properties["oryx-tasktype"]&&g.properties["oryx-tasktype"]=="Script"){this._canAttach=false
}if(this._canAttach){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"shapeRepo.attached",elements:[g],style:ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,color:ORYX.CONFIG.SELECTION_VALID_COLOR});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"shapeRepo.added"});
this._canContain=undefined
}}if(!(g instanceof ORYX.Core.Canvas)&&!g.isPointOverOffset(e.x,e.y)){this._canAttach=this._canAttach==false?this._canAttach:undefined
}if(this._canContain==undefined&&!this._canAttach){this._canContain=this.facade.getRules().canContain({containingShape:g,containedStencil:j});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:"shapeRepo.added",elements:[g],color:this._canContain?ORYX.CONFIG.SELECTION_VALID_COLOR:ORYX.CONFIG.SELECTION_INVALID_COLOR});
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:"shapeRepo.attached"})
}this._currentParent=this._canContain||this._canAttach?g:undefined;
this._lastOverElement=g;
var a=h.getProxy();
a.setStatus(this._currentParent?a.dropAllowed:a.dropNotAllowed);
a.sync()
}}else{this._currentParent=this.facade.getCanvas();
var a=h.getProxy();
a.setStatus(a.dropAllowed);
a.sync()
}}return false
}};
ORYX.Plugins.ShapeRepository=Clazz.extend(ORYX.Plugins.ShapeRepository);