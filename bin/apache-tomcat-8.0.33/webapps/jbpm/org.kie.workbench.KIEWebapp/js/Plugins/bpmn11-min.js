if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPMN11={construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED,this.handleDockerDocked.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.handlePropertyChanged.bind(this));
this.facade.registerOnEvent("layout.bpmn11.pool",this.handleLayoutPool.bind(this));
this.facade.registerOnEvent("layout.bpmn11.subprocess",this.handleSubProcess.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.afterLoad.bind(this))
},afterLoad:function(){this.facade.getCanvas().getChildNodes().each(function(a){if(a.getStencil().id().endsWith("Pool")){this.handleLayoutPool({shape:a})
}}.bind(this))
},onSelectionChanged:function(c){if(c.elements&&c.elements.length===1){var a=c.elements[0];
if(a.getStencil().idWithoutNs()==="Pool"){if(a.getChildNodes().length===0){var b={type:"http://b3mn.org/stencilset/bpmn1.1#Lane",position:{x:0,y:0},namespace:a.getStencil().namespace(),parent:a};
this.facade.createShape(b);
this.facade.getCanvas().update()
}}}},hashedSubProcesses:{},handleSubProcess:function(b){var a=b.shape;
if(!this.hashedSubProcesses[a.resourceId]){this.hashedSubProcesses[a.resourceId]=a.bounds.clone();
return
}var c=a.bounds.upperLeft();
c.x-=this.hashedSubProcesses[a.resourceId].upperLeft().x;
c.y-=this.hashedSubProcesses[a.resourceId].upperLeft().y;
this.hashedSubProcesses[a.resourceId]=a.bounds.clone();
this.moveChildDockers(a,c)
},moveChildDockers:function(a,b){if(!b.x&&!b.y){return
}a.getChildNodes(true).map(function(c){return[].concat(c.getIncomingShapes()).concat(c.getOutgoingShapes())
}).flatten().uniq().map(function(c){return c.dockers.length>2?c.dockers.slice(1,c.dockers.length-1):[]
}).flatten().each(function(c){if(c.isChanged){return
}c.bounds.moveBy(b)
})
},handleDockerDocked:function(c){var d=c.parent;
var b=c.target;
if(d.getStencil().id()==="http://b3mn.org/stencilset/bpmn1.1#SequenceFlow"){var a=b.getStencil().groups().find(function(e){if(e=="Gateways"){return e
}});
if(!a&&(d.properties["oryx-conditiontype"]=="Expression")){d.setProperty("oryx-showdiamondmarker",true)
}else{d.setProperty("oryx-showdiamondmarker",false)
}this.facade.getCanvas().update()
}},handlePropertyChanged:function(c){var b=c.elements;
var d=c.key;
var a=c.value;
var e=false;
b.each(function(g){if((g.getStencil().id()==="http://b3mn.org/stencilset/bpmn1.1#SequenceFlow")&&(d==="oryx-conditiontype")){if(a!="Expression"){g.setProperty("oryx-showdiamondmarker",false)
}else{var h=g.getIncomingShapes();
if(!h){g.setProperty("oryx-showdiamondmarker",true)
}var f=h.find(function(i){var k=i.getStencil().groups().find(function(l){if(l=="Gateways"){return l
}});
if(k){return k
}});
if(!f){g.setProperty("oryx-showdiamondmarker",true)
}else{g.setProperty("oryx-showdiamondmarker",false)
}}e=true
}});
if(e){this.facade.getCanvas().update()
}},hashedPoolPositions:{},hashedLaneDepth:{},hashedBounds:{},handleLayoutPool:function(b){var k=b.shape;
var m=this.facade.getSelection();
var l=m.first();
if(l instanceof ORYX.Core.UIObject){l=l.isParent(k)?l:k
}else{l=k
}if(!(l.getStencil().id().endsWith("Pool")||l.getStencil().id().endsWith("Lane"))){return
}if(!this.hashedBounds[k.resourceId]){this.hashedBounds[k.resourceId]={}
}this.currentPool=k;
var d=this.getLanes(k);
if(d.length<=0){return
}if(d.length===1&&this.getLanes(d.first()).length<=0){d.first().setProperty("oryx-showcaption",d.first().properties["oryx-name"].trim().length>0)
}else{d.invoke("setProperty","oryx-showcaption",true)
}var c=this.getLanes(k,true);
var g=[];
var h=[];
var f=-1;
while(++f<c.length){if(!this.hashedBounds[k.resourceId][c[f].resourceId]){h.push(c[f])
}}if(h.length>0){l=h.first()
}var a=$H(this.hashedBounds[k.resourceId]).keys();
var f=-1;
while(++f<a.length){if(!c.any(function(i){return i.resourceId==a[f]
})){g.push(this.hashedBounds[k.resourceId][a[f]]);
m=m.without(function(i){return i.resourceId==a[f]
})
}}var n,e;
if(g.length>0||h.length>0){n=this.updateHeight(k);
e=this.adjustWidth(d,k.bounds.width());
k.update()
}else{if(k==l){n=this.adjustHeight(d,undefined,k.bounds.height());
e=this.adjustWidth(d,k.bounds.width())
}else{n=this.adjustHeight(d,l);
e=this.adjustWidth(d,l.bounds.width()+(this.getDepth(l,k)*30))
}}this.setDimensions(k,e,n);
this.updateDockers(c,k);
this.hashedBounds[k.resourceId]={};
var f=-1;
while(++f<c.length){this.hashedBounds[k.resourceId][c[f].resourceId]=c[f].absoluteBounds();
this.hashedLaneDepth[c[f].resourceId]=this.getDepth(c[f],k);
this.forceToUpdateLane(c[f])
}this.hashedPoolPositions[k.resourceId]=k.bounds.clone()
},forceToUpdateLane:function(a){if(a.bounds.height()!==a._svgShapes[0].height){a.isChanged=true;
a.isResized=true;
a._update()
}},getDepth:function(c,b){var a=0;
while(c&&c.parent&&c!==b){c=c.parent;
++a
}return a
},updateDepth:function(b,a,c){var d=(a-c)*30;
b.getChildNodes().each(function(e){e.bounds.moveBy(d,0);
[].concat(children[j].getIncomingShapes()).concat(children[j].getOutgoingShapes())
})
},setDimensions:function(c,d,a){var b=c.getStencil().id().endsWith("Lane");
c.bounds.set(b?30:c.bounds.a.x,c.bounds.a.y,d?c.bounds.a.x+d-(b?30:0):c.bounds.b.x,a?c.bounds.a.y+a:c.bounds.b.y)
},setLanePosition:function(a,b){a.bounds.moveTo(30,b)
},adjustWidth:function(a,b){(a||[]).each(function(c){this.setDimensions(c,b);
this.adjustWidth(this.getLanes(c),b-30)
}.bind(this));
return b
},adjustHeight:function(d,f,b){var g=0;
if(!f&&b){var e=-1;
while(++e<d.length){g+=d[e].bounds.height()
}}var e=-1;
var a=0;
while(++e<d.length){if(d[e]===f){this.adjustHeight(this.getLanes(d[e]),undefined,d[e].bounds.height());
d[e].bounds.set({x:30,y:a},{x:d[e].bounds.width()+30,y:d[e].bounds.height()+a})
}else{if(!f&&b){var c=(d[e].bounds.height()*b)/g;
this.adjustHeight(this.getLanes(d[e]),undefined,c);
this.setDimensions(d[e],null,c);
this.setLanePosition(d[e],a)
}else{var c=this.adjustHeight(this.getLanes(d[e]),f,b);
if(!c){c=d[e].bounds.height()
}this.setDimensions(d[e],null,c);
this.setLanePosition(d[e],a)
}}a+=d[e].bounds.height()
}return a
},updateHeight:function(b){var c=this.getLanes(b);
if(c.length==0){return b.bounds.height()
}var a=0;
var d=-1;
while(++d<c.length){this.setLanePosition(c[d],a);
a+=this.updateHeight(c[d])
}this.setDimensions(b,null,a);
return a
},getOffset:function(a,c,b){var e={x:0,y:0};
var e=a.absoluteXY();
var d=this.hashedBounds[b.resourceId][a.resourceId]||(c===true?this.hashedPoolPositions[a.resourceId]:undefined);
if(d){e.x-=d.upperLeft().x;
e.y-=d.upperLeft().y
}else{return{x:0,y:0}
}return e
},getNextLane:function(a){while(a&&!a.getStencil().id().endsWith("Lane")){if(a instanceof ORYX.Core.Canvas){return null
}a=a.parent
}return a
},getParentPool:function(a){while(a&&!a.getStencil().id().endsWith("Pool")){if(a instanceof ORYX.Core.Canvas){return null
}a=a.parent
}return a
},updateDockers:function(x,r){var o=r.absoluteBounds();
var q=(this.hashedPoolPositions[r.resourceId]||o).clone();
var w=-1,v=-1,u=-1,t=-1,s;
var y={};
while(++w<x.length){if(!this.hashedBounds[r.resourceId][x[w].resourceId]){continue
}var f=x[w].getChildNodes();
var m=x[w].absoluteBounds();
var c=(this.hashedBounds[r.resourceId][x[w].resourceId]||m);
var g=this.getOffset(x[w],true,r);
var d=0;
var z=this.getDepth(x[w],r);
if(this.hashedLaneDepth[x[w].resourceId]!==undefined&&this.hashedLaneDepth[x[w].resourceId]!==z){d=(this.hashedLaneDepth[x[w].resourceId]-z)*30;
g.x+=d
}v=-1;
while(++v<f.length){if(d){f[v].bounds.moveBy(d,0)
}if(f[v].getStencil().id().endsWith("Subprocess")){this.moveChildDockers(f[v],g)
}var b=[].concat(f[v].getIncomingShapes()).concat(f[v].getOutgoingShapes()).findAll(function(i){return i instanceof ORYX.Core.Edge
});
u=-1;
while(++u<b.length){if(b[u].getStencil().id().endsWith("MessageFlow")){this.layoutEdges(f[v],[b[u]],g);
continue
}t=-1;
while(++t<b[u].dockers.length){s=b[u].dockers[t];
if(s.getDockedShape()||s.isChanged){continue
}pos=s.bounds.center();
var a=c.isIncluded(pos);
var n=!q.isIncluded(pos);
var e=t==0?a:c.isIncluded(b[u].dockers[t-1].bounds.center());
var h=t==b[u].dockers.length-1?a:c.isIncluded(b[u].dockers[t+1].bounds.center());
if(a){y[s.id]={docker:s,offset:g}
}}}}}w=-1;
var p=$H(y).keys();
while(++w<p.length){y[p[w]].docker.bounds.moveBy(y[p[w]].offset)
}},moveBy:function(b,a){b.x+=a.x;
b.y+=a.y;
return b
},getHashedBounds:function(a){return this.currentPool&&this.hashedBounds[this.currentPool.resourceId][a.resourceId]?this.hashedBounds[this.currentPool.resourceId][a.resourceId]:a.bounds.clone()
},getLanes:function(a,c){var b=a.getChildNodes(c||false).findAll(function(d){return(d.getStencil().id()==="http://b3mn.org/stencilset/bpmn1.1#Lane")
});
b=b.sort(function(e,d){var f=Math.round(e.bounds.upperLeft().y);
var g=Math.round(d.bounds.upperLeft().y);
if(f==g){f=Math.round(this.getHashedBounds(e).upperLeft().y);
g=Math.round(this.getHashedBounds(d).upperLeft().y)
}return f<g?-1:(f>g?1:0)
}.bind(this));
return b
},handleLayoutPool_deprecated:function(c){var k=c.shape;
var d=k.getChildNodes(false).findAll(function(s){return(s.getStencil().id()==="http://b3mn.org/stencilset/bpmn1.1#Lane")
});
if(d.length>0){if(d.length==1){var q=d.first().getChildNodes(false).findAll(function(s){return(s.getStencil().id()==="http://b3mn.org/stencilset/bpmn1.1#Lane")
});
if(q.length>0){d.first().setProperty("oryx-showcaption",true)
}else{if(d.first().properties["oryx-name"].trim().length>0){d.first().setProperty("oryx-showcaption",true)
}else{d.first().setProperty("oryx-showcaption",false)
}var n=d.first();
var g=n.bounds.upperLeft();
g.x=30;
g.y=0;
var r=n.bounds.lowerRight();
r.x=k.bounds.width();
r.y=k.bounds.height();
return
}}else{d.each(function(s){s.setProperty("oryx-showcaption",true)
})
}d=d.sortBy(function(s){return s.bounds.upperLeft().y
});
var h=k.bounds.width();
d.each(function(s){if(s.isChanged){h=s.bounds.width()+30
}});
var i=d.clone();
var l=1;
do{var b=new Array();
var p=d.findAll(function(s){var t=s.getChildNodes(false).findAll(function(u){return(u.getStencil().id()==="http://b3mn.org/stencilset/bpmn1.1#Lane")
});
if(t.length>0){b=b.concat(t);
return true
}});
var a=k.bounds.upperLeft();
b.each(function(s){var t=s.bounds.upperLeft();
var u=s.bounds.lowerRight();
u.x=h-30*l;
s.bounds.set(t,u)
});
d=b.clone();
l++
}while(p.length>0);
var f=0;
var o=0;
var e=[];
i.each(function(s){var u=s.bounds.upperLeft();
var t=s.bounds.lowerRight();
u.y=f;
t.y=u.y+s.bounds.height();
f+=s.bounds.height();
u.x=30;
t.x=h;
e.push({x:u.x-s.bounds.upperLeft().x,y:u.y-s.bounds.upperLeft().y});
s.bounds.set(u,t)
}.bind(this));
this.handleDockers(i,e);
var m=k.bounds.upperLeft();
k.bounds.set(m.x,m.y,m.x+h,m.y+f)
}},handleLayoutLane:function(f){var a=f.shape;
var b=a.getChildNodes(false).findAll(function(h){return(h.getStencil().id()==="http://b3mn.org/stencilset/bpmn1.1#Lane")
});
if(b.length>0){b=b.sortBy(function(h){return h.bounds.upperLeft().y
});
var e=a.bounds.width();
b.each(function(h){if(h.isChanged){e=h.bounds.width()+30
}});
var c=0;
var d=0;
b.each(function(h){var k=h.bounds.upperLeft();
var i=h.bounds.lowerRight();
k.y=c;
i.y=k.y+h.bounds.height();
c+=h.bounds.height();
k.x=30;
i.x=e;
var l={x:k.x-h.bounds.upperLeft().x,y:k.y-h.bounds.upperLeft().y};
this.handleChildNodes(h.getChildNodes(true),l);
h.bounds.set(k,i)
}.bind(this));
var g=a.bounds.upperLeft();
a.bounds.set(g.x,g.y,g.x+e,g.y+c)
}},handleDockers:function(a,c){var m=-1,h=-1,e=-1,d=-1,g;
while(++m<a.length){var b=a[m].getChildNodes(true);
h=-1;
while(++h<b.length){var f=[].concat(b[h].getIncomingShapes()).concat(b[h].getOutgoingShapes()).findAll(function(i){return i instanceof ORYX.Core.Edge
});
e=-1;
while(++e<f.length){d=-1;
while(++d<f[e].dockers.length){g=f[e].dockers[d];
pos=g.bounds.center();
pos.x+=c[m].x;
pos.y+=c[m].y;
if(!a.any(function(i){return i!=a[m]&&i.absoluteBounds().isIncluded(pos)
})){g.bounds.moveBy({x:0,y:-c[m].y})
}}}}}},handleChildNodes:function(c,h){return;
var e=-1,d=-1,b=-1,g;
var f=[];
while(++e<c.length){var a=[].concat(c[e].getIncomingShapes()).concat(c[e].getOutgoingShapes()).findAll(function(i){return i instanceof ORYX.Core.Edge&&!f.include(i)
});
if(a.length<=0){continue
}f=f.concat(a);
this.layoutEdges(c[e],a,h);
if(h.x!==0){d=-1;
while(++d<f.length){b=-1;
while(++b<f[d].dockers.length){g=f[d].dockers[b];
if(g.getDockedShape()){continue
}g.bounds.moveBy({x:-h.x,y:-h.y})
}}}}}};
ORYX.Plugins.BPMN11=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.BPMN11);