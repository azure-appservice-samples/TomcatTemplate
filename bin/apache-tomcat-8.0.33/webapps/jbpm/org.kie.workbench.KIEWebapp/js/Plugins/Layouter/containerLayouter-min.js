if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.ContainerLayouter=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent("layout.containers",this.handleLayoutContainerMinBounds.bind(this));
this.hashedContainers=new Hash()
},handleLayoutContainerDockers:function(b){var a=b.shape;
if(!this.hashedContainers[a.resourceId]){this.hashedContainers[a.resourceId]=a.bounds.clone();
return
}var c=a.bounds.upperLeft();
c.x-=this.hashedContainers[a.resourceId].upperLeft().x;
c.y-=this.hashedContainers[a.resourceId].upperLeft().y;
this.hashedContainers[a.resourceId]=a.bounds.clone();
this.moveChildDockers(a,c)
},handleLayoutContainerMinBounds:function(c){alert("handling layout for containers!");
var h=c.shape;
var g=c.topOffset;
var b=h._oldBounds;
var l=c.options;
var e=(l.ignoreChildsWithId?l.ignoreChildsWithId:new Array());
var m=this.retrieveChildsIncludingBounds(h,e);
if(!m){return
}var k=this.getChildShapesWithout(h,e).find(function(n){return m.upperLeft().y==n.bounds.upperLeft().y
});
if(this.ensureContainersMinimumSize(h,m,k.absoluteBounds(),e,l)){return
}var a=m.upperLeft();
var j=m.lowerRight();
var f=(a.y?a.y:1)/((b.height()-j.y)?(b.height()-j.y):1);
var i=f*(h.bounds.height()-m.height())/(1+f);
this.getChildShapesWithout(h,e).each(function(o){var n=o.bounds.upperLeft().y-a.y;
o.bounds.moveTo({x:o.bounds.upperLeft().x,y:i+n})
});
var d=k.bounds.upperLeft().y-k._oldBounds.upperLeft().y;
this.moveChildDockers(h,{x:0,y:d})
},ensureContainersMinimumSize:function(b,l,t,k,d){var f=b.bounds;
var a=f.upperLeft();
var p=f.lowerRight();
var j=l.upperLeft();
var m=l.lowerRight();
var g=b.absoluteBounds();
if(!d){d=new Object()
}if(!b.isResized){var q=0;
var u=0;
var o=false;
var v=a.x;
var r=a.y;
var x=p.x;
var w=p.y;
if(j.x<0){v+=j.x;
u-=j.x;
o=true
}if(j.y<0){r+=j.y;
q-=j.y;
o=true
}var n=u+j.x+l.width()-f.width();
if(n>0){x+=n;
o=true
}var h=q+j.y+l.height()-f.height();
if(h>0){w+=h;
o=true
}f.set(v,r,x,w);
if(o){this.hashedContainers[b.resourceId]=f.clone()
}this.moveChildsBy(b,{x:u,y:q},k);
return true
}var v=a.x;
var r=a.y;
var x=p.x;
var w=p.y;
o=false;
if(f.height()<l.height()){if(a.y!=b._oldBounds.upperLeft().y&&p.y==b._oldBounds.lowerRight().y){r=w-l.height()-1;
if(d.fixedY){r-=l.upperLeft().y
}o=true
}else{if(a.y==b._oldBounds.upperLeft().y&&p.y!=b._oldBounds.lowerRight().y){w=r+l.height()+1;
if(d.fixedY){w+=l.upperLeft().y
}o=true
}else{if(t){var c=g.upperLeft().y-t.upperLeft().y;
var s=g.lowerRight().y-t.lowerRight().y;
r-=c;
w-=s;
r--;
w++;
o=true
}}}}if(f.width()<l.width()){if(a.x!=b._oldBounds.upperLeft().x&&p.x==b._oldBounds.lowerRight().x){v=x-l.width()-1;
if(d.fixedX){v-=l.upperLeft().x
}o=true
}else{if(a.x==b._oldBounds.upperLeft().x&&p.x!=b._oldBounds.lowerRight().x){x=v+l.width()+1;
if(d.fixedX){x+=l.upperLeft().x
}o=true
}else{if(t){var i=g.upperLeft().x-t.upperLeft().x;
var e=g.lowerRight().x-t.lowerRight().x;
v-=i;
x-=e;
v--;
x++;
o=true
}}}}f.set(v,r,x,w);
if(o){this.handleLayoutContainerDockers({shape:b})
}},findRelatedEdges:function(a,b){edges=new Array();
this.getChildShapesWithout(a,b).each(function(c){edges=edges.concat(c.outgoing).concat(c.incoming).concat(this.findRelatedEdges(c,b))
}.bind(this));
return edges
},moveChildsBy:function(a,c,b){if(!a||!c){return
}},getAbsoluteBoundsForChildShapes:function(a){},moveChildDockers:function(a,b){if(!b.x&&!b.y){return
}a.getChildNodes(true).map(function(c){return[].concat(c.getIncomingShapes()).concat(c.getOutgoingShapes())
}).flatten().uniq().flatten().each(function(c){c.bounds.moveBy(b)
})
},retrieveChildsIncludingBounds:function(b,c){var a=undefined;
this.getChildShapesWithout(b,c).each(function(e,d){if(d==0){a=e.bounds.clone();
return
}a.include(e.bounds)
});
return a
},getChildShapesWithout:function(a,b){if(typeof a.getChildShapes=="function"){var c=a.getChildShapes(false);
return c.findAll(function(d){return !b.member(d.getStencil().id())
})
}else{return[]
}}});