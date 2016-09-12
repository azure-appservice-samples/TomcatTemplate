if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.AbstractShape=ORYX.Core.UIObject.extend({construct:function(a,b){arguments.callee.$.construct.apply(this,arguments);
this.resourceId=ORYX.Editor.provideId();
this._stencil=b;
if(this._stencil._jsonStencil.superId){stencilId=this._stencil.id();
superStencilId=stencilId.substring(0,stencilId.indexOf("#")+1)+b._jsonStencil.superId;
stencilSet=this._stencil.stencilSet();
this._stencil=stencilSet.stencil(superStencilId)
}this.properties=new Hash();
this.propertiesChanged=new Hash();
this.hiddenProperties=new Hash();
this._stencil.properties().each((function(d){var c=d.prefix()+"-"+d.id();
this.properties[c]=d.value();
this.propertiesChanged[c]=true
}).bind(this));
if(b._jsonStencil.superId){b.properties().each((function(f){var d=f.prefix()+"-"+f.id();
var e=f.value();
var c=this.properties[d];
this.properties[d]=e;
this.propertiesChanged[d]=true;
this._delegateEvent({type:ORYX.CONFIG.EVENT_PROPERTY_CHANGED,name:d,value:e,oldValue:c})
}).bind(this))
}},layout:function(){},getStencil:function(){return this._stencil
},getChildShapeByResourceId:function(a){a=ERDF.__stripHashes(a);
return this.getChildShapes(true).find(function(b){return b.resourceId==a
})
},getChildShapes:function(b,c){var a=[];
this.children.each(function(d){if(d instanceof ORYX.Core.Shape&&d.isVisible){if(c){c(d)
}a.push(d);
if(b){a=a.concat(d.getChildShapes(b,c))
}}});
return a
},hasChildShape:function(a){return this.getChildShapes().any(function(b){return(b===a)||b.hasChildShape(a)
})
},getChildNodes:function(b,c){var a=[];
this.children.each(function(d){if(d instanceof ORYX.Core.Node&&d.isVisible){if(c){c(d)
}a.push(d)
}if(d instanceof ORYX.Core.Shape){if(b){a=a.concat(d.getChildNodes(b,c))
}}});
return a
},getChildEdges:function(b,c){var a=[];
this.children.each(function(d){if(d instanceof ORYX.Core.Edge&&d.isVisible){if(c){c(d)
}a.push(d)
}if(d instanceof ORYX.Core.Shape){if(b){a=a.concat(d.getChildEdges(b,c))
}}});
return a
},getAbstractShapesAtPosition:function(){var b,e;
switch(arguments.length){case 1:b=arguments[0].x;
e=arguments[0].y;
break;
case 2:b=arguments[0];
e=arguments[1];
break;
default:throw"getAbstractShapesAtPosition needs 1 or 2 arguments!"
}if(this.isPointIncluded(b,e)){var a=[];
a.push(this);
var d=this.getChildNodes();
var c=this.getChildEdges();
[d,c].each(function(f){var g=new Hash();
f.each(function(h){if(!h.isVisible){return
}var j=h.getAbstractShapesAtPosition(b,e);
if(j.length>0){var i=$A(h.node.parentNode.childNodes);
var k=i.indexOf(h.node);
g[k]=j
}});
g.keys().sort().each(function(h){a=a.concat(g[h])
})
});
return a
}else{return[]
}},setProperty:function(b,d,c){var a=this.properties[b];
if(a!==d||c===true){this.properties[b]=d;
this.propertiesChanged[b]=true;
this._changed();
if(!this._isInSetProperty){this._isInSetProperty=true;
this._delegateEvent({type:ORYX.CONFIG.EVENT_PROPERTY_CHANGED,elements:[this],name:b,value:d,oldValue:a});
delete this._isInSetProperty
}}},setHiddenProperty:function(b,c){if(c===undefined){delete this.hiddenProperties[b];
return
}var a=this.hiddenProperties[b];
if(a!==c){this.hiddenProperties[b]=c
}},isPointIncluded:function(d,c,b){var a=b?b:this.absoluteBounds();
return a.isIncluded(d,c)
},serialize:function(){var a=[];
a.push({name:"type",prefix:"oryx",value:this.getStencil().id(),type:"literal"});
this.hiddenProperties.each(function(b){a.push({name:b.key.replace("oryx-",""),prefix:"oryx",value:b.value,type:"literal"})
}.bind(this));
this.getStencil().properties().each((function(d){var c=d.prefix();
var b=d.id();
a.push({name:b,prefix:c,value:this.properties[c+"-"+b],type:"literal"})
}).bind(this));
return a
},deserialize:function(b){var a=0;
b=b.sort(function(d,c){return Number(this.properties.keys().member(d.prefix+"-"+d.name))>Number(this.properties.keys().member(c.prefix+"-"+c.name))?-1:0
}.bind(this));
b.each((function(g){var c=g.name;
var f=g.prefix;
var e=g.value;
if(Ext.type(e)==="object"){e=Ext.encode(e)
}switch(f+"-"+c){case"raziel-parent":if(!this.parent){break
}var d=this.getCanvas().getChildShapeByResourceId(e);
if(d){d.add(this)
}break;
default:if(this.properties.keys().member(f+"-"+c)){this.setProperty(f+"-"+c,e)
}else{if(!(c==="bounds"||c==="parent"||c==="target"||c==="dockers"||c==="docker"||c==="outgoing"||c==="incoming")){this.setHiddenProperty(f+"-"+c,e)
}}}}).bind(this))
},toString:function(){return"ORYX.Core.AbstractShape "+this.id
},toJSON:function(){var a={resourceId:this.resourceId,properties:Ext.apply({},this.properties,this.hiddenProperties).inject({},function(d,f){var c=f[0];
var e=f[1];
if(this.getStencil().property(c)&&this.getStencil().property(c).type()===ORYX.CONFIG.TYPE_COMPLEX&&Ext.type(e)==="string"){try{e=Ext.decode(e)
}catch(b){}}c=c.replace(/^[\w_]+-/,"");
d[c]=e;
return d
}.bind(this)),stencil:{id:this.getStencil().idWithoutNs()},childShapes:this.getChildShapes().map(function(b){return b.toJSON()
})};
if(this.getOutgoingShapes){a.outgoing=this.getOutgoingShapes().map(function(b){return{resourceId:b.resourceId}
})
}if(this.bounds){a.bounds={lowerRight:this.bounds.lowerRight(),upperLeft:this.bounds.upperLeft()}
}if(this.dockers){a.dockers=this.dockers.map(function(b){var c=b.getDockedShape()&&b.referencePoint?b.referencePoint:b.bounds.center();
c.getDocker=function(){return b
};
return c
})
}Ext.apply(a,ORYX.Core.AbstractShape.JSONHelper);
a.getShape=function(){return this
}.bind(this);
return a
}});
ORYX.Core.AbstractShape.JSONHelper={eachChild:function(c,b,d){if(!this.childShapes){return
}var a=[];
this.childShapes.each(function(e){var f=c(e,this);
if(f){a.push(f)
}if(b){e.eachChild(c,b,d)
}}.bind(this));
if(d){this.childShapes=a
}},getChildShapes:function(a){var b=this.childShapes;
if(a){this.eachChild(function(c){b=b.concat(c.getChildShapes(a))
},true)
}return b
},serialize:function(){return Ext.encode(this)
}};