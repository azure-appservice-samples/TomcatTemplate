NAMESPACE_SVG="http://www.w3.org/2000/svg";
NAMESPACE_ORYX="http://www.b3mn.org/oryx";
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Edge={construct:function(a,c){arguments.callee.$.construct.apply(this,arguments);
this.isMovable=true;
this.isSelectable=true;
this._dockerUpdated=false;
this._markers=new Hash();
this._paths=[];
this._interactionPaths=[];
this._dockersByPath=new Hash();
this._markersByPath=new Hash();
this.attachedNodePositionData=new Hash();
var b=this.node.childNodes[0].childNodes[0];
b=ORYX.Editor.graft("http://www.w3.org/2000/svg",b,["g",{"pointer-events":"painted",bpmn2nodeid:this.resourceId}]);
this.addEventHandlers(b);
this._oldBounds=this.bounds.clone();
this._init(this._stencil.view());
if(c instanceof Array){this.deserialize(c)
}},setSelectable:function(a){this.isSelectable=a
},setMovable:function(a){this.isMovable=a
},getIsSelectable:function(){return this.isSelectable
},_update:function(c){if(this._dockerUpdated||this.isChanged||c){this.dockers.invoke("update");
if(this.bounds.width()===0||this.bounds.height()===0){this.bounds.moveBy({x:this.bounds.width()===0?-1:0,y:this.bounds.height()===0?-1:0});
this.bounds.extend({x:this.bounds.width()===0?2:0,y:this.bounds.height()===0?2:0})
}var d=this.bounds.upperLeft();
var l=this._oldBounds.upperLeft();
var e=this._oldBounds.width()===0?this.bounds.width():this._oldBounds.width();
var m=this._oldBounds.height()===0?this.bounds.height():this._oldBounds.height();
var k=d.x-l.x;
var h=d.y-l.y;
var n=this.bounds.width()/e;
var f=this.bounds.height()/m;
this.dockers.each((function(b){b.bounds.unregisterCallback(this._dockerChangedCallback);
if(!this._dockerUpdated){b.bounds.moveBy(k,h);
if(n!==1||f!==1){var o=b.bounds.upperLeft().x-d.x;
var a=b.bounds.upperLeft().y-d.y;
b.bounds.moveTo(d.x+o*n,d.y+a*f)
}}b.update();
b.bounds.registerCallback(this._dockerChangedCallback)
}).bind(this));
if(this._dockerUpdated){var j=this.dockers.first().bounds.center();
var g=this.dockers.first().bounds.center();
this.dockers.each((function(b){var a=b.bounds.center();
j.x=Math.min(j.x,a.x);
j.y=Math.min(j.y,a.y);
g.x=Math.max(g.x,a.x);
g.y=Math.max(g.y,a.y)
}).bind(this));
this.bounds.set(Object.clone(j),Object.clone(g))
}this.getLabels().each(function(o){switch(o.edgePosition){case"freeMoved":o.x=o.x;
o.y=o.y;
break;
case"starttop":var s=this._getAngle(this.dockers[0],this.dockers[1]);
var t=this.dockers.first().bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("bottom");
o.x=t.x+o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("bottom");
o.x=t.x-o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(180-s,t)
}break;
case"startbottom":var s=this._getAngle(this.dockers[0],this.dockers[1]);
var t=this.dockers.first().bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("top");
o.x=t.x+o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("top");
o.x=t.x-o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(180-s,t)
}break;
case"midtop":var a=this.dockers.length;
if(a%2==0){var s=this._getAngle(this.dockers[a/2-1],this.dockers[a/2]);
var q=this.dockers[a/2-1].bounds.center();
var p=this.dockers[a/2].bounds.center();
var t={x:(q.x+p.x)/2,y:(q.y+p.y)/2};
o.horizontalAlign("center");
o.verticalAlign("bottom");
o.x=t.x;
o.y=t.y-o.getOffsetTop();
if(s<=90||s>270){o.rotate(360-s,t)
}else{o.rotate(180-s,t)
}}else{var b=parseInt(a/2);
var s=this._getAngle(this.dockers[b],this.dockers[b+1]);
var t=this.dockers[b].bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("bottom");
o.x=t.x+o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("bottom");
o.x=t.x-o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(180-s,t)
}}break;
case"midbottom":var a=this.dockers.length;
if(a%2==0){var s=this._getAngle(this.dockers[a/2-1],this.dockers[a/2]);
var q=this.dockers[a/2-1].bounds.center();
var p=this.dockers[a/2].bounds.center();
var t={x:(q.x+p.x)/2,y:(q.y+p.y)/2};
o.horizontalAlign("center");
o.verticalAlign("top");
o.x=t.x;
o.y=t.y+o.getOffsetTop();
if(s<=90||s>270){o.rotate(360-s,t)
}else{o.rotate(180-s,t)
}}else{var b=parseInt(a/2);
var s=this._getAngle(this.dockers[b],this.dockers[b+1]);
var t=this.dockers[b].bounds.center();
if(s<=90||s>270){o.horizontalAlign("left");
o.verticalAlign("top");
o.x=t.x+o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(360-s,t)
}else{o.horizontalAlign("right");
o.verticalAlign("top");
o.x=t.x-o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(180-s,t)
}}break;
case"endtop":var r=this.dockers.length;
var s=this._getAngle(this.dockers[r-2],this.dockers[r-1]);
var t=this.dockers.last().bounds.center();
if(s<=90||s>270){o.horizontalAlign("right");
o.verticalAlign("bottom");
o.x=t.x-o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(360-s,t)
}else{o.horizontalAlign("left");
o.verticalAlign("bottom");
o.x=t.x+o.getOffsetTop();
o.y=t.y-o.getOffsetTop();
o.rotate(180-s,t)
}break;
case"endbottom":var r=this.dockers.length;
var s=this._getAngle(this.dockers[r-2],this.dockers[r-1]);
var t=this.dockers.last().bounds.center();
if(s<=90||s>270){o.horizontalAlign("right");
o.verticalAlign("top");
o.x=t.x-o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(360-s,t)
}else{o.horizontalAlign("left");
o.verticalAlign("top");
o.x=t.x+o.getOffsetBottom();
o.y=t.y+o.getOffsetBottom();
o.rotate(180-s,t)
}break
}}.bind(this));
this.children.each(function(a){if(a instanceof ORYX.Core.Node){this.calculatePositionOfAttachedChildNode.call(this,a)
}}.bind(this));
this.refreshAttachedNodes();
this.refresh();
this.isChanged=false;
this._dockerUpdated=false;
this._oldBounds=this.bounds.clone()
}},movePointToUpperLeftOfNode:function(a,b){a.x-=b.width()/2;
a.y-=b.height()/2
},refreshAttachedNodes:function(){this.attachedNodePositionData.values().each(function(a){var d=a.segment.docker1.bounds.center();
var b=a.segment.docker2.bounds.center();
this.relativizePoint(d);
this.relativizePoint(b);
var c=new Object();
c.x=d.x+a.relativDistanceFromDocker1*(b.x-d.x);
c.y=d.y+a.relativDistanceFromDocker1*(b.y-d.y);
this.movePointToUpperLeftOfNode(c,a.node.bounds);
a.node.bounds.moveTo(c);
a.node._update()
}.bind(this))
},calculatePositionOfAttachedChildNode:function(b){var a=new Object();
a.x=0;
a.y=0;
if(!this.attachedNodePositionData[b.getId()]){this.attachedNodePositionData[b.getId()]=new Object();
this.attachedNodePositionData[b.getId()].relativDistanceFromDocker1=0;
this.attachedNodePositionData[b.getId()].node=b;
this.attachedNodePositionData[b.getId()].segment=new Object();
this.findEdgeSegmentForNode(b)
}else{if(b.isChanged){this.findEdgeSegmentForNode(b)
}}},findEdgeSegmentForNode:function(c){var b=this.dockers.length;
var a=undefined;
for(i=1;
i<b;
i++){var g=this.dockers[i-1].bounds.center();
var e=this.dockers[i].bounds.center();
this.relativizePoint(g);
this.relativizePoint(e);
var d=c.bounds.center();
var f=ORYX.Core.Math.distancePointLinie(g,e,d,true);
if((f||f==0)&&((!a&&a!=0)||f<a)){a=f;
this.attachedNodePositionData[c.getId()].segment.docker1=this.dockers[i-1];
this.attachedNodePositionData[c.getId()].segment.docker2=this.dockers[i]
}if(!f&&!a&&a!=0){(ORYX.Core.Math.getDistancePointToPoint(d,g)<ORYX.Core.Math.getDistancePointToPoint(d,e))?this.attachedNodePositionData[c.getId()].relativDistanceFromDocker1=0:this.attachedNodePositionData[c.getId()].relativDistanceFromDocker1=1;
this.attachedNodePositionData[c.getId()].segment.docker1=this.dockers[i-1];
this.attachedNodePositionData[c.getId()].segment.docker2=this.dockers[i]
}}if(a||a==0){this.attachedNodePositionData[c.getId()].relativDistanceFromDocker1=this.getLineParameterForPosition(this.attachedNodePositionData[c.getId()].segment.docker1,this.attachedNodePositionData[c.getId()].segment.docker2,c)
}},getLineParameterForPosition:function(b,g,d){var f=b.bounds.center();
var e=g.bounds.center();
this.relativizePoint(f);
this.relativizePoint(e);
var c=ORYX.Core.Math.getPointOfIntersectionPointLine(f,e,d.bounds.center(),true);
if(!c){return 0
}var a=ORYX.Core.Math.getDistancePointToPoint(c,f)/ORYX.Core.Math.getDistancePointToPoint(f,e);
return a
},relativizePoint:function(a){a.x-=this.bounds.upperLeft().x;
a.y-=this.bounds.upperLeft().y
},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var b;
this._paths.each((function(h,f){var e=this._dockersByPath[h.id];
var k=undefined;
var j=undefined;
if(b){j="M"+b.x+" "+b.y
}else{k=e[0].bounds.center();
b=k;
j="M"+k.x+" "+k.y
}for(var g=1;
g<e.length;
g++){k=e[g].bounds.center();
j=j+"L"+k.x+" "+k.y+" ";
b=k
}h.setAttributeNS(null,"d",j);
this._interactionPaths[f].setAttributeNS(null,"d",j)
}).bind(this));
if(this.getChildNodes().length>0){var a=this.bounds.upperLeft().x;
var c=this.bounds.upperLeft().y;
this.node.firstChild.childNodes[1].setAttributeNS(null,"transform","translate("+a+", "+c+")")
}},getIntersectionPoint:function(){var a=Math.floor(this.dockers.length/2);
return ORYX.Core.Math.midPoint(this.dockers[a-1].bounds.center(),this.dockers[a].bounds.center())
},isPointIncluded:function(g,f){var a=this.absoluteBounds().isIncluded(g,f,ORYX.CONFIG.OFFSET_EDGE_BOUNDS);
var e=undefined;
if(a&&this.dockers.length>0){var c=0;
var d,b;
do{d=this.dockers[c].bounds.center();
b=this.dockers[++c].bounds.center();
e=ORYX.Core.Math.isPointInLine(g,f,d.x,d.y,b.x,b.y,ORYX.CONFIG.OFFSET_EDGE_BOUNDS)
}while(!e&&c<this.dockers.length-1)
}return e
},isPointOverOffset:function(){return false
},_getAngle:function(a,e){var d=a.absoluteCenterXY();
var b=e.absoluteCenterXY();
if(d.x==b.x&&d.y==b.y){return 0
}var c=Math.asin(Math.sqrt(Math.pow(d.y-b.y,2))/(Math.sqrt(Math.pow(b.x-d.x,2)+Math.pow(d.y-b.y,2))))*180/Math.PI;
if(b.x>=d.x&&b.y<=d.y){return c
}else{if(b.x<d.x&&b.y<=d.y){return 180-c
}else{if(b.x<d.x&&b.y>d.y){return 180+c
}else{return 360-c
}}}},alignDockers:function(){this._update(true);
var e=this.dockers.first().bounds.center();
var d=this.dockers.last().bounds.center();
var c=d.x-e.x;
var a=d.y-e.y;
var b=this.dockers.length-1;
this.dockers.each((function(h,g){var f=g/b;
h.bounds.unregisterCallback(this._dockerChangedCallback);
h.bounds.moveTo(e.x+f*c,e.y+f*a);
h.bounds.registerCallback(this._dockerChangedCallback)
}).bind(this));
this._dockerChanged()
},add:function(a){arguments.callee.$.add.apply(this,arguments);
if(a instanceof ORYX.Core.Controls.Docker&&this.dockers.include(a)){var b=this._dockersByPath.values()[0];
if(b){b.splice(this.dockers.indexOf(a),0,a)
}this.handleChildShapesAfterAddDocker(a)
}},handleChildShapesAfterAddDocker:function(f){if(!f instanceof ORYX.Core.Controls.Docker){return undefined
}var d=this.dockers.indexOf(f);
if(!(0<d&&d<this.dockers.length-1)){return undefined
}var e=this.dockers[d-1];
var b=this.dockers[d+1];
var c=this.getAttachedNodePositionDataForSegment(e,b);
var a=ORYX.Core.Math.getDistancePointToPoint(e.bounds.center(),f.bounds.center());
var h=ORYX.Core.Math.getDistancePointToPoint(b.bounds.center(),f.bounds.center());
if(!(a+h)){return
}var g=a/(a+h);
c.each(function(l){if(l.value.relativDistanceFromDocker1<g){l.value.segment.docker2=f;
l.value.relativDistanceFromDocker1=l.value.relativDistanceFromDocker1/g
}else{l.value.segment.docker1=f;
var k=1-g;
var j=l.value.relativDistanceFromDocker1-g;
l.value.relativDistanceFromDocker1=j/k
}});
this.refreshAttachedNodes()
},getAttachedNodePositionDataForSegment:function(c,a){if(!((c instanceof ORYX.Core.Controls.Docker)&&(a instanceof ORYX.Core.Controls.Docker))){return[]
}var b=this.attachedNodePositionData.findAll(function(d){return d.value.segment.docker1===c&&d.value.segment.docker2===a
});
if(!b){return[]
}return b
},remove:function(a){arguments.callee.$.remove.apply(this,arguments);
if(this.attachedNodePositionData[a.getId()]){delete this.attachedNodePositionData[a.getId()]
}if(a instanceof ORYX.Core.Controls.Docker){this.handleChildShapesAfterRemoveDocker(a)
}},handleChildShapesAfterRemoveDocker:function(a){if(!(a instanceof ORYX.Core.Controls.Docker)){return
}this.attachedNodePositionData.each(function(c){if(c.value.segment.docker1===a){var b=this.dockers.indexOf(c.value.segment.docker2);
if(b==-1){return
}c.value.segment.docker1=this.dockers[b-1]
}else{if(c.value.segment.docker2===a){var b=this.dockers.indexOf(c.value.segment.docker1);
if(b==-1){return
}c.value.segment.docker2=this.dockers[b+1]
}}}.bind(this));
this.refreshAttachedNodes()
},addDocker:function(b,d){var c;
var a;
this._dockersByPath.any((function(e){return e.value.any((function(j,f){if(!c){c=j;
return false
}else{var h=c.bounds.center();
var g=j.bounds.center();
if(ORYX.Core.Math.isPointInLine(b.x,b.y,h.x,h.y,g.x,g.y,10)){var l=this._paths.find(function(n){return n.id===e.key
});
if(l){var m=l.getAttributeNS(NAMESPACE_ORYX,"allowDockers");
if(m&&m.toLowerCase()==="no"){return true
}}var k=(d)?d:this.createDocker(this.dockers.indexOf(c)+1,b);
k.bounds.centerMoveTo(b);
if(d){this.add(k,this.dockers.indexOf(c)+1)
}a=k;
return true
}else{c=j;
return false
}}}).bind(this))
}).bind(this));
return a
},removeDocker:function(a){if(this.dockers.length>2&&!(this.dockers.first()===a)){this._dockersByPath.any((function(b){if(b.value.member(a)){if(a===b.value.last()){return true
}else{this.remove(a);
this._dockersByPath[b.key]=b.value.without(a);
this.isChanged=true;
this._dockerChanged();
return true
}}return false
}).bind(this))
}},removeUnusedDockers:function(){var a=$H({});
this.dockers.each(function(e,b){if(b==0||b==this.dockers.length-1){return
}var d=this.dockers[b-1];
if(a.values().indexOf(d)!=-1&&this.dockers[b-2]){d=this.dockers[b-2]
}var c=this.dockers[b+1];
var f=d.getDockedShape()&&d.referencePoint?d.getAbsoluteReferencePoint():d.bounds.center();
var h=c.getDockedShape()&&c.referencePoint?c.getAbsoluteReferencePoint():c.bounds.center();
var g=e.bounds.center();
if(ORYX.Core.Math.isPointInLine(g.x,g.y,f.x,f.y,h.x,h.y,1)){a[b]=e
}}.bind(this));
a.each(function(b){this.removeDocker(b.value)
}.bind(this));
if(a.values().length>0){this._update(true)
}return a
},_init:function(e){arguments.callee.$._init.apply(this,arguments);
var d,b,p,n;
var h=e.getElementsByTagNameNS(NAMESPACE_SVG,"defs");
if(h.length>0){h=h[0];
var c=$A(h.getElementsByTagNameNS(NAMESPACE_SVG,"marker"));
var j;
var m=this;
c.each(function(q){try{j=new ORYX.Core.SVG.SVGMarker(q.cloneNode(true));
m._markers[j.id]=j;
var r=$A(j.element.getElementsByTagNameNS(NAMESPACE_SVG,"text"));
var g;
r.each(function(t){g=new ORYX.Core.SVG.Label({textElement:t,shapeId:this.id});
m._labels[g.id]=g
})
}catch(s){}})
}var a=e.getElementsByTagNameNS(NAMESPACE_SVG,"g");
if(a.length<=0){throw"Edge: No g element found."
}var k=a[0];
k.setAttributeNS(null,"id",null);
var f=true;
$A(k.childNodes).each((function(D,v){if(ORYX.Editor.checkClassType(D,SVGPathElement)){D=D.cloneNode(false);
var u=this.id+"_"+v;
D.setAttributeNS(null,"id",u);
this._paths.push(D);
var z=[];
var E=D.getAttributeNS(null,"marker-start");
if(E&&E!==""){if(E=='url("#start")'){E="url(#start)"
}E=E.strip();
E=E.replace(/^url\(#/,"");
var t=this.id.concat(E.replace(/\)$/,""));
D.setAttributeNS(null,"marker-start","url(#"+t+")");
z.push(this._markers[t])
}E=D.getAttributeNS(null,"marker-mid");
if(E&&E!==""){if(E=='url("#mid")'){E="url(#mid)"
}E=E.strip();
E=E.replace(/^url\(#/,"");
var q=this.id.concat(E.replace(/\)$/,""));
D.setAttributeNS(null,"marker-mid","url(#"+q+")");
z.push(this._markers[q])
}E=D.getAttributeNS(null,"marker-end");
if(E&&E!==""){if(E=='url("#end")'){E="url(#end)"
}E=E.strip();
E=E.replace(/^url\(#/,"");
var w=this.id.concat(E.replace(/\)$/,""));
D.setAttributeNS(null,"marker-end","url(#"+w+")");
z.push(this._markers[w])
}this._markersByPath[u]=z;
var g=new PathParser();
var C=new ORYX.Core.SVG.PointsPathHandler();
g.setHandler(C);
g.parsePath(D);
if(C.points.length<4){throw"Edge: Path has to have two or more points specified."
}this._dockersByPath[u]=[];
for(var s=0;
s<C.points.length;
s+=2){var B=C.points[s];
var A=C.points[s+1];
if(f||s>0){var r=new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
r.bounds.centerMoveTo(B,A);
r.bounds.registerCallback(this._dockerChangedCallback);
this.add(r,this.dockers.length);
if(d){d=Math.min(B,d);
b=Math.min(A,b)
}else{d=B;
b=A
}if(p){p=Math.max(B,p);
n=Math.max(A,n)
}else{p=B;
n=A
}}}f=false
}}).bind(this));
this.bounds.set(d,b,p,n);
if(this.bounds.width()===0||this.bounds.height()===0){this.bounds.extend({x:this.bounds.width()===0?2:0,y:this.bounds.height()===0?2:0});
this.bounds.moveBy({x:this.bounds.width()===0?-1:0,y:this.bounds.height()===0?-1:0})
}this._oldBounds=this.bounds.clone();
this._paths.reverse();
var o=[];
this._paths.each((function(g){o.push(this.node.childNodes[0].childNodes[0].childNodes[0].appendChild(g))
}).bind(this));
this._paths=o;
this._paths.each((function(q){var g=q.cloneNode(false);
g.setAttributeNS(null,"id",undefined);
g.setAttributeNS(null,"stroke-width",10);
g.setAttributeNS(null,"visibility","hidden");
g.setAttributeNS(null,"stroke-dasharray","none");
g.setAttributeNS(null,"stroke","black");
g.setAttributeNS(null,"fill","none");
this._interactionPaths.push(this.node.childNodes[0].childNodes[0].childNodes[0].appendChild(g))
}).bind(this));
this._paths.reverse();
this._interactionPaths.reverse();
var l=e.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"text");
$A(l).each((function(q){var g=new ORYX.Core.SVG.Label({textElement:q,shapeId:this.id});
this.node.childNodes[0].childNodes[0].appendChild(g.node);
this._labels[g.id]=g
}).bind(this));
this.propertiesChanged.each(function(g){g.value=true
})
},addMarkers:function(a){this._markers.each(function(b){if(!a.ownerDocument.getElementById(b.value.id)){b.value.element=a.appendChild(b.value.element)
}})
},removeMarkers:function(){var b=this.node.ownerSVGElement;
if(b){var a=b.getElementsByTagNameNS(NAMESPACE_SVG,"defs");
if(a.length>0){a=a[0];
this._markers.each(function(c){var d=a.ownerDocument.getElementById(c.value.id);
if(d){c.value.element=a.removeChild(c.value.element)
}})
}}},_dockerChanged:function(){this._dockerUpdated=true
},serialize:function(){var a=arguments.callee.$.serialize.apply(this);
var d="";
this._dockersByPath.each((function(e){e.value.each(function(j){var h=j.getDockedShape()&&j.referencePoint?j.referencePoint:j.bounds.center();
d=d.concat(h.x+" "+h.y+" ")
});
d+=" # "
}).bind(this));
a.push({name:"dockers",prefix:"oryx",value:d,type:"literal"});
var b=this.dockers.last();
var g=b.getDockedShape();
if(g){a.push({name:"target",prefix:"raziel",value:"#"+ERDF.__stripHashes(g.resourceId),type:"resource"})
}try{var c=this.getStencil().serialize();
if(c.type){c.shape=this;
c.data=a;
c.result=undefined;
c.forceExecution=true;
this._delegateEvent(c);
if(c.result){a=c.result
}}}catch(f){}return a
},deserialize:function(f){try{var c=this.getStencil().deserialize();
if(c.type){c.shape=this;
c.data=f;
c.result=undefined;
c.forceExecution=true;
this._delegateEvent(c);
if(c.result){f=c.result
}}}catch(h){}var g=f.find(function(e){return(e.prefix+"-"+e.name)=="raziel-target"
});
var a;
if(g){a=this.getCanvas().getChildShapeByResourceId(g.value)
}var d=f.findAll(function(e){return(e.prefix+"-"+e.name)=="raziel-outgoing"
});
d.each((function(k){if(!this.parent){return
}var e=this.getCanvas().getChildShapeByResourceId(k.value);
if(e){if(e==a){this.dockers.last().setDockedShape(e);
this.dockers.last().setReferencePoint({x:e.bounds.width()/2,y:e.bounds.height()/2})
}else{if(e instanceof ORYX.Core.Edge){e.dockers.first().setDockedShape(this)
}}}}).bind(this));
arguments.callee.$.deserialize.apply(this,[f]);
var b=f.find(function(e){return(e.prefix==="oryx"&&e.name==="dockers")
});
if(b){var j=b.value.split("#").without("").without(" ");
j.each((function(k,n){var q=k.replace(/,/g," ").split(" ").without("");
if(q.length%2===0){var r=this._paths[n];
if(r){if(n===0){while(this._dockersByPath[r.id].length>2){this.removeDocker(this._dockersByPath[r.id][1])
}}else{while(this._dockersByPath[r.id].length>1){this.removeDocker(this._dockersByPath[r.id][0])
}}var e=this._dockersByPath[r.id];
if(n===0){var p=parseFloat(q.shift());
var o=parseFloat(q.shift());
if(e.first().getDockedShape()){e.first().setReferencePoint({x:p,y:o})
}else{e.first().bounds.centerMoveTo(p,o)
}}o=parseFloat(q.pop());
p=parseFloat(q.pop());
if(e.last().getDockedShape()){e.last().setReferencePoint({x:p,y:o})
}else{e.last().bounds.centerMoveTo(p,o)
}for(var l=0;
l<q.length;
l++){p=parseFloat(q[l]);
o=parseFloat(q[++l]);
var m=this.createDocker();
m.bounds.centerMoveTo(p,o)
}}}}).bind(this))
}else{this.alignDockers()
}this._changed()
},toString:function(){return this.getStencil().title()+" "+this.id
},getTarget:function(){return this.dockers.last()?this.dockers.last().getDockedShape():null
},getSource:function(){return this.dockers.first()?this.dockers.first().getDockedShape():null
},isDocked:function(){var a=false;
this.dockers.each(function(b){if(b.isDocked()){a=true;
throw $break
}});
return a
},toJSON:function(){var a=arguments.callee.$.toJSON.apply(this,arguments);
if(this.getTarget()){a.target={resourceId:this.getTarget().resourceId}
}return a
}};
ORYX.Core.Edge=ORYX.Core.Shape.extend(ORYX.Core.Edge);