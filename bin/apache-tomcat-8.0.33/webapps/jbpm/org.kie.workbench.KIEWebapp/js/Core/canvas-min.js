if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Canvas=ORYX.Core.AbstractShape.extend({zoomLevel:1,construct:function(a){arguments.callee.$.construct.apply(this,arguments);
if(!(a&&a.width&&a.height)){ORYX.Log.fatal("Canvas is missing mandatory parameters options.width and options.height.");
return
}this.resourceId=a.id;
this.nodes=[];
this.edges=[];
this.rootNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",a.parentNode,["svg",{id:this.id,width:a.width,height:a.height},["defs",{}]]);
this.rootNode.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
this.rootNode.setAttribute("xmlns:svg","http://www.w3.org/2000/svg");
this._htmlContainer=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",a.parentNode,["div",{id:"oryx_canvas_htmlContainer",style:"position:absolute; top:5px"}]);
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",this.rootNode,["g",{},["g",{"class":"stencils"},["g",{"class":"me"}],["g",{"class":"children"}],["g",{"class":"edge"}]],["g",{"class":"svgcontainer"}]]);
this.node.setAttributeNS(null,"stroke","none");
this.node.setAttributeNS(null,"font-family","Verdana, sans-serif");
this.node.setAttributeNS(null,"font-size-adjust","none");
this.node.setAttributeNS(null,"font-style","normal");
this.node.setAttributeNS(null,"font-variant","normal");
this.node.setAttributeNS(null,"font-weight","normal");
this.node.setAttributeNS(null,"line-heigth","normal");
this.node.setAttributeNS(null,"font-size",ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT);
this.bounds.set(0,0,a.width,a.height);
this.addEventHandlers(this.rootNode.parentNode);
this.rootNode.oncontextmenu=function(){return false
}
},focus:function(){},update:function(){this.nodes.each(function(b){this._traverseForUpdate(b)
}.bind(this));
var a=this.getStencil().layout();
if(a){a.each(function(b){b.shape=this;
b.forceExecution=true;
b.target=this.rootNode;
this._delegateEvent(b)
}.bind(this))
}this.nodes.invoke("_update");
this.edges.invoke("_update",true)
},_traverseForUpdate:function(a){var b=a.isChanged;
a.getChildNodes(false,function(c){if(this._traverseForUpdate(c)){b=true
}}.bind(this));
if(b){a.layout();
return true
}else{return false
}},layout:function(){},getChildNodes:function(b,c){if(!b&&!c){return this.nodes.clone()
}else{var a=[];
this.nodes.each(function(d){if(c){c(d)
}a.push(d);
if(b&&d instanceof ORYX.Core.Shape){a=a.concat(d.getChildNodes(b,c))
}});
return a
}},add:function(a){if(a instanceof ORYX.Core.UIObject){if(!(this.children.member(a))){if(a.parent){a.parent.remove(a)
}this.children.push(a);
a.parent=this;
if(a instanceof ORYX.Core.Shape){if(a instanceof ORYX.Core.Edge){a.addMarkers(this.rootNode.getElementsByTagNameNS(NAMESPACE_SVG,"defs")[0]);
a.node=this.node.childNodes[0].childNodes[2].appendChild(a.node);
this.edges.push(a)
}else{a.node=this.node.childNodes[0].childNodes[1].appendChild(a.node);
this.nodes.push(a)
}}else{a.node=this.node.appendChild(a.node)
}a.bounds.registerCallback(this._changedCallback);
if(this.eventHandlerCallback){this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED,shape:a})
}}else{ORYX.Log.warn("add: ORYX.Core.UIObject is already a child of this object.")
}}else{ORYX.Log.fatal("add: Parameter is not of type ORYX.Core.UIObject.")
}},remove:function(a){if(this.children.member(a)){this.children=this.children.without(a);
a.parent=undefined;
if(a instanceof ORYX.Core.Shape){if(a instanceof ORYX.Core.Edge){a.removeMarkers();
a.node=this.node.childNodes[0].childNodes[2].removeChild(a.node);
this.edges=this.edges.without(a)
}else{a.node=this.node.childNodes[0].childNodes[1].removeChild(a.node);
this.nodes=this.nodes.without(a)
}}else{a.node=this.node.removeChild(a.node)
}a.bounds.unregisterCallback(this._changedCallback)
}else{ORYX.Log.warn("remove: ORYX.Core.UIObject is not a child of this object.")
}},addShapeObjects:function(d,c){if(!d){return
}var b=function(f,i){try{var j=ORYX.Core.StencilSet.stencil(this.getStencil().namespace()+f.stencil.id);
var h=(j.type()=="node")?ORYX.Core.Node:ORYX.Core.Edge;
var g=new h({eventHandlerCallback:c},j);
g.resourceId=f.resourceId;
f.parent="#"+((f.parent&&f.parent.resourceId)||i.resourceId);
this.add(g);
return{json:f,object:g}
}catch(k){ORYX.Log.warn("LoadingContent: Stencil could not create.")
}}.bind(this);
var e=function(f){var g=[];
if(f.childShapes){f.childShapes.each(function(i){var h=b(i,f);
if(!(typeof h==="undefined")){g.push(h)
}g=g.concat(e(i))
})
}return g
}.bind(this);
var a=e({childShapes:d,resourceId:this.resourceId});
a.each(function(f){var g=[];
for(field in f.json.properties){g.push({prefix:"oryx",name:field,value:f.json.properties[field]})
}f.json.outgoing.each(function(i){g.push({prefix:"raziel",name:"outgoing",value:"#"+i.resourceId})
});
if(f.object instanceof ORYX.Core.Edge){var h=f.json.target||f.json.outgoing[0];
if(h){g.push({prefix:"raziel",name:"target",value:"#"+h.resourceId})
}}if(f.json.bounds){g.push({prefix:"oryx",name:"bounds",value:f.json.bounds.upperLeft.x+","+f.json.bounds.upperLeft.y+","+f.json.bounds.lowerRight.x+","+f.json.bounds.lowerRight.y})
}if(f.json.dockers){g.push({prefix:"oryx",name:"dockers",value:f.json.dockers.inject("",function(j,i){return j+i.x+" "+i.y+" "
})+" #"})
}g.push({prefix:"raziel",name:"parent",value:f.json.parent});
f.__properties=g
}.bind(this));
a.each(function(f){if(f.object instanceof ORYX.Core.Node){f.object.deserialize(f.__properties)
}});
a.each(function(f){if(f.object instanceof ORYX.Core.Edge){f.object.deserialize(f.__properties)
}});
return a.pluck("object")
},absoluteBounds:function(){return new ORYX.Core.Bounds(0,0,this.getHTMLContainer().parentNode.offsetWidth,this.getHTMLContainer().parentNode.offsetHeight)
},updateSize:function(){var b=0;
var a=0;
var c=100;
this.getChildShapes(true,function(e){var d=e.bounds;
b=Math.max(b,d.lowerRight().x+c);
a=Math.max(a,d.lowerRight().y+c)
});
if(this.bounds.width()<b||this.bounds.height()<a){this.setSize({width:Math.max(this.bounds.width(),b),height:Math.max(this.bounds.height(),a)})
}},getRootNode:function(){return this.rootNode
},getSvgContainer:function(){return this.node.childNodes[1]
},getHTMLContainer:function(){return this._htmlContainer
},getShapesWithSharedParent:function(a){if(!a||a.length<1){return[]
}if(a.length==1){return a
}return a.findAll(function(c){var b=c.parent;
while(b){if(a.member(b)){return false
}b=b.parent
}return true
})
},setSize:function(b,a){if(!b||!b.width||!b.height){return
}if(this.rootNode.parentNode){this.rootNode.parentNode.style.width=b.width+"px";
this.rootNode.parentNode.style.height=b.height+"px"
}this.rootNode.setAttributeNS(null,"width",b.width);
this.rootNode.setAttributeNS(null,"height",b.height);
if(!a){this.bounds.set({a:{x:0,y:0},b:{x:b.width/this.zoomLevel,y:b.height/this.zoomLevel}})
}},getSVGRepresentation:function(n,p){var i=this.getRootNode().cloneNode(true);
this._removeInvisibleElements(i);
var d,m,b,l;
try{var k=this.getRootNode().childNodes[1].getBBox();
d=k.x;
m=k.y;
b=k.x+k.width;
l=k.y+k.height
}catch(j){this.getChildShapes(true).each(function(q){var s=q.absoluteBounds();
var r=s.upperLeft();
var e=s.lowerRight();
if(d==undefined){d=r.x;
m=r.y;
b=e.x;
l=e.y
}else{d=Math.min(d,r.x);
m=Math.min(m,r.y);
b=Math.max(b,e.x);
l=Math.max(l,e.y)
}})
}var f=50;
var c,o,h,g;
if(d==undefined){c=0;
o=0;
h=0;
g=0
}else{c=b-d;
o=l-m;
h=-d+f/2;
g=-m+f/2
}i.setAttributeNS(null,"width",c+f);
i.setAttributeNS(null,"height",o+f);
i.childNodes[1].firstChild.setAttributeNS(null,"transform","translate("+h+", "+g+")");
i.childNodes[1].removeAttributeNS(null,"transform");
try{var a=i.childNodes[1].childNodes[1];
a.parentNode.removeChild(a)
}catch(j){}if(n){$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan")).each(function(e){e.textContent=e.textContent.escapeHTML()
});
$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text")).each(function(e){if(e.childNodes.length==0){e.textContent=e.textContent.escapeHTML()
}})
}if(p){$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text")).each(function(e){e.setAttributeNS(null,"font-size","8")
})
}$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"image")).each(function(q){var e=q.getAttributeNS("http://www.w3.org/1999/xlink","href");
if(!e.match("^(http|https)://")&&e.indexOf("base64")==-1){e=window.location.protocol+"//"+window.location.host+e;
q.setAttributeNS("http://www.w3.org/1999/xlink","href",e)
}});
$A(i.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"a")).each(function(e){e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",(e.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").escapeHTML())
});
return i
},_removeInvisibleElements:function(b){var a=0;
while(a<b.childNodes.length){var c=b.childNodes[a];
if(c.getAttributeNS&&c.getAttributeNS(null,"visibility")==="hidden"){b.removeChild(c)
}else{this._removeInvisibleElements(c);
a++
}}},_delegateEvent:function(a){if(this.eventHandlerCallback&&(a.target==this.rootNode||a.target==this.rootNode.parentNode)){this.eventHandlerCallback(a,this)
}},toString:function(){return"Canvas "+this.id
},toJSON:function(){var a=arguments.callee.$.toJSON.apply(this,arguments);
a.stencilset={url:this.getStencil().stencilSet().source(),namespace:this.getStencil().stencilSet().namespace()};
return a
}});