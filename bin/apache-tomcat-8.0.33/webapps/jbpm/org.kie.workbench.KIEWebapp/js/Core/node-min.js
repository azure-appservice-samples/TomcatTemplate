if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Node={construct:function(a,b){arguments.callee.$.construct.apply(this,arguments);
this.isSelectable=true;
this.isMovable=true;
this._dockerUpdated=false;
this._oldBounds=new ORYX.Core.Bounds();
this._svgShapes=[];
this.minimumSize=undefined;
this.maximumSize=undefined;
this.isHorizontallyResizable=false;
this.isVerticallyResizable=false;
this.dataId=undefined;
this._init(this._stencil.view())
},setSelectable:function(a){this.isSelectable=a
},setMovable:function(a){this.isMovable=a
},_update:function(){this.dockers.invoke("update");
if(this.isChanged){var c=this.bounds;
var d=this._oldBounds;
if(this.isResized){var m=c.width()/d.width();
var l=c.height()/d.height();
this._svgShapes.each(function(u){if(u.isHorizontallyResizable){u.width=u.oldWidth*m
}if(u.isVerticallyResizable){u.height=u.oldHeight*l
}var t;
var q=u.anchorLeft;
var s=u.anchorRight;
if(s){t=d.width()-(u.oldX+u.oldWidth);
if(q){u.width=c.width()-u.x-t
}else{u.x=c.width()-(t+u.width)
}}else{if(!q){u.x=m*u.oldX;
if(!u.isHorizontallyResizable){u.x=u.x+u.width*m/2-u.width/2
}}}var p=u.anchorTop;
var r=u.anchorBottom;
if(r){t=d.height()-(u.oldY+u.oldHeight);
if(p){u.height=c.height()-u.y-t
}else{if(!u._isYLocked){u.y=c.height()-(t+u.height)
}}}else{if(!p){u.y=l*u.oldY;
if(!u.isVerticallyResizable){u.y=u.y+u.height*l/2-u.height/2
}}}});
var g={x:0,y:0};
if(!this.isHorizontallyResizable&&c.width()!==d.width()){g.x=d.width()-c.width()
}if(!this.isVerticallyResizable&&c.height()!==d.height()){g.y=d.height()-c.height()
}if(g.x!==0||g.y!==0){c.extend(g)
}g={x:0,y:0};
var e,i;
if(this.minimumSize){ORYX.Log.debug("Shape (%0)'s min size: (%1x%2)",this,this.minimumSize.width,this.minimumSize.height);
e=this.minimumSize.width-c.width();
if(e>0){g.x+=e
}i=this.minimumSize.height-c.height();
if(i>0){g.y+=i
}}if(this.maximumSize){ORYX.Log.debug("Shape (%0)'s max size: (%1x%2)",this,this.maximumSize.width,this.maximumSize.height);
e=c.width()-this.maximumSize.width;
if(e>0){g.x-=e
}i=c.height()-this.maximumSize.height;
if(i>0){g.y-=i
}}if(g.x!==0||g.y!==0){c.extend(g)
}var m=c.width()/d.width();
var l=c.height()/d.height();
var k,j,n,f,b,a,o;
this.magnets.each(function(p){k=p.anchorLeft;
j=p.anchorRight;
n=p.anchorTop;
f=p.anchorBottom;
b=p.bounds.center();
if(k){a=b.x
}else{if(j){a=c.width()-(d.width()-b.x)
}else{a=b.x*m
}}if(n){o=b.y
}else{if(f){o=c.height()-(d.height()-b.y)
}else{o=b.y*l
}}if(b.x!==a||b.y!==o){p.bounds.centerMoveTo(a,o)
}});
this.getLabels().each(function(p){k=p.anchorLeft;
j=p.anchorRight;
n=p.anchorTop;
f=p.anchorBottom;
if(k){}else{if(j){p.x=c.width()-(d.width()-p.oldX)
}else{p.x*=m
}}if(n){}else{if(f){p.y=c.height()-(d.height()-p.oldY)
}else{p.y*=l
}}});
var h=this.dockers[0];
if(h){h.bounds.unregisterCallback(this._dockerChangedCallback);
if(!this._dockerUpdated){h.bounds.centerMoveTo(this.bounds.center());
this._dockerUpdated=false
}h.update();
h.bounds.registerCallback(this._dockerChangedCallback)
}this.isResized=false
}this.refresh();
this.isChanged=false;
this._oldBounds=this.bounds.clone()
}this.children.each(function(p){if(!(p instanceof ORYX.Core.Controls.Docker)){p._update()
}});
if(this.dockers.length>0&&!this.dockers.first().getDockedShape()){this.dockers.each(function(p){p.bounds.centerMoveTo(this.bounds.center())
}.bind(this))
}},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var a=this.bounds.upperLeft().x;
var b=this.bounds.upperLeft().y;
this.node.firstChild.setAttributeNS(null,"transform","translate("+a+", "+b+")");
this.node.childNodes[1].childNodes[1].setAttributeNS(null,"transform","translate("+a+", "+b+")");
this._svgShapes.each(function(c){c.update()
})
},_dockerChanged:function(){var a=this.dockers[0];
this.bounds.centerMoveTo(a.bounds.center());
this._dockerUpdated=true
},_initSVGShapes:function(c){var a=[];
try{var f=new ORYX.Core.SVG.SVGShape(c);
a.push(f)
}catch(d){}if(c.hasChildNodes()){for(var b=0;
b<c.childNodes.length;
b++){a=a.concat(this._initSVGShapes(c.childNodes[b]))
}}return a
},isPointIncluded:function(a,j,c){var h=c&&c instanceof ORYX.Core.Bounds?c:this.absoluteBounds();
if(!h.isIncluded(a,j)){return false
}else{}var e=h.upperLeft();
var g=a-e.x;
var f=j-e.y;
var d=0;
do{var b=this._svgShapes[d++].isPointIncluded(g,f)
}while(!b&&d<this._svgShapes.length);
return b
},isPointOverOffset:function(d,c){var b=arguments.callee.$.isPointOverOffset.apply(this,arguments);
if(b){var a=this.absoluteBounds();
a.widen(-ORYX.CONFIG.BORDER_OFFSET);
if(!a.isIncluded(d,c)){return true
}}return false
},serialize:function(){var a=arguments.callee.$.serialize.apply(this);
this.dockers.each((function(e){if(e.getDockedShape()){var d=e.referencePoint;
d=d?d:e.bounds.center();
a.push({name:"docker",prefix:"oryx",value:$H(d).values().join(","),type:"literal"})
}}).bind(this));
try{var b=this.getStencil().serialize();
if(b.type){b.shape=this;
b.data=a;
b.result=undefined;
b.forceExecution=true;
this._delegateEvent(b);
if(b.result){a=b.result
}}}catch(c){}return a
},deserialize:function(f){arguments.callee.$.deserialize.apply(this,[f]);
try{var a=this.getStencil().deserialize();
if(a.type){a.shape=this;
a.data=f;
a.result=undefined;
a.forceExecution=true;
this._delegateEvent(a);
if(a.result){f=a.result
}}}catch(g){}var b=f.findAll(function(e){return(e.prefix+"-"+e.name)=="raziel-outgoing"
});
b.each((function(h){if(!this.parent){return
}var e=this.getCanvas().getChildShapeByResourceId(h.value);
if(e){if(e instanceof ORYX.Core.Edge){e.dockers.first().setDockedShape(this);
e.dockers.first().setReferencePoint(e.dockers.first().bounds.center())
}else{if(e.dockers.length>0){e.dockers.first().setDockedShape(this)
}}}}).bind(this));
if(this.dockers.length===1){var d;
d=f.find(function(e){return(e.prefix+"-"+e.name==="oryx-dockers")
});
if(d){var c=d.value.replace(/,/g," ").split(" ").without("").without("#");
if(c.length===2&&this.dockers[0].getDockedShape()){this.dockers[0].setReferencePoint({x:parseFloat(c[0]),y:parseFloat(c[1])})
}else{this.dockers[0].bounds.centerMoveTo(parseFloat(c[0]),parseFloat(c[1]))
}}}},_init:function(m){arguments.callee.$._init.apply(this,arguments);
var n=m.getElementsByTagName("g")[0];
var s=m.ownerDocument.createAttributeNS(null,"id");
s.nodeValue=this.id;
n.setAttributeNode(s);
var b=this.node.childNodes[0].childNodes[0];
n=b.appendChild(n);
this.addEventHandlers(n);
var r=n.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"minimumSize");
if(r){r=r.replace("/,/g"," ");
var j=r.split(" ");
j=j.without("");
if(j.length>1){this.minimumSize={width:parseFloat(j[0]),height:parseFloat(j[1])}
}else{this.minimumSize={width:1,height:1}
}}var g=n.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"maximumSize");
if(g){g=g.replace("/,/g"," ");
var k=g.split(" ");
k=k.without("");
if(k.length>1){this.maximumSize={width:parseFloat(k[0]),height:parseFloat(k[1])}
}}if(this.minimumSize&&this.maximumSize&&(this.minimumSize.width>this.maximumSize.width||this.minimumSize.height>this.maximumSize.height)){throw this+": Minimum Size must be greater than maxiumSize."
}this._svgShapes=this._initSVGShapes(n);
var a={x:undefined,y:undefined};
var d={x:undefined,y:undefined};
var w=this;
this._svgShapes.each(function(i){a.x=(a.x!==undefined)?Math.min(a.x,i.x):i.x;
a.y=(a.y!==undefined)?Math.min(a.y,i.y):i.y;
d.x=(d.x!==undefined)?Math.max(d.x,i.x+i.width):i.x+i.width;
d.y=(d.y!==undefined)?Math.max(d.y,i.y+i.height):i.y+i.height;
if(i.isHorizontallyResizable){w.isHorizontallyResizable=true;
w.isResizable=true
}if(i.isVerticallyResizable){w.isVerticallyResizable=true;
w.isResizable=true
}if(i.anchorTop&&i.anchorBottom){w.isVerticallyResizable=true;
w.isResizable=true
}if(i.anchorLeft&&i.anchorRight){w.isHorizontallyResizable=true;
w.isResizable=true
}});
this._svgShapes.each(function(i){i.x-=a.x;
i.y-=a.y;
i.update()
});
var v=a.x;
var u=a.y;
d.x-=v;
d.y-=u;
a.x=0;
a.y=0;
if(d.x===0){d.x=1
}if(d.y===0){d.y=1
}this._oldBounds.set(a,d);
this.bounds.set(a,d);
var f=m.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX,"magnets");
if(f&&f.length>0){f=$A(f[0].getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX,"magnet"));
var w=this;
f.each(function(y){var C=new ORYX.Core.Controls.Magnet({eventHandlerCallback:w.eventHandlerCallback});
var x=parseFloat(y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cx"));
var D=parseFloat(y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cy"));
C.bounds.centerMoveTo({x:x-v,y:D-u});
var B=y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"anchors");
if(B){B=B.replace("/,/g"," ");
B=B.split(" ").without("");
for(var z=0;
z<B.length;
z++){switch(B[z].toLowerCase()){case"left":C.anchorLeft=true;
break;
case"right":C.anchorRight=true;
break;
case"top":C.anchorTop=true;
break;
case"bottom":C.anchorBottom=true;
break
}}}w.add(C);
if(!this._defaultMagnet){var A=y.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"default");
if(A&&A.toLowerCase()==="yes"){w._defaultMagnet=C
}}})
}else{var h=new ORYX.Core.Controls.Magnet();
h.bounds.centerMoveTo(this.bounds.width()/2,this.bounds.height()/2);
this.add(h)
}var q=m.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_ORYX,"docker");
if(q&&q.length>0){q=q[0];
var p=this.createDocker();
var e=parseFloat(q.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cx"));
var c=parseFloat(q.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"cy"));
p.bounds.centerMoveTo({x:e-v,y:c-u});
var o=q.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"anchors");
if(o){o=o.replace("/,/g"," ");
o=o.split(" ").without("");
for(var t=0;
t<o.length;
t++){switch(o[t].toLowerCase()){case"left":p.anchorLeft=true;
break;
case"right":p.anchorRight=true;
break;
case"top":p.anchorTop=true;
break;
case"bottom":p.anchorBottom=true;
break
}}}}var l=n.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text");
$A(l).each((function(x){var i=new ORYX.Core.SVG.Label({textElement:x,shapeId:this.id});
i.x-=v;
i.y-=u;
this._labels[i.id]=i
}).bind(this))
},createDocker:function(){var a=new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
a.bounds.registerCallback(this._dockerChangedCallback);
this.dockers.push(a);
a.parent=this;
a.bounds.registerCallback(this._changedCallback);
return a
},toString:function(){return this._stencil.title()+" "+this.id
}};
ORYX.Core.Node=ORYX.Core.Shape.extend(ORYX.Core.Node);