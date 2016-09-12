if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.CanvasResize=Clazz.extend({construct:function(a){this.facade=a;
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"N",this.resize.bind(this));
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"W",this.resize.bind(this));
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"E",this.resize.bind(this));
new ORYX.Plugins.CanvasResizeButton(this.facade.getCanvas(),"S",this.resize.bind(this))
},resize:function(a,c){resizeCanvas=function(j,k,m){var f=m.getCanvas();
var l=f.bounds;
var h=m.getCanvas().getHTMLContainer().parentNode.parentNode;
if(j=="E"||j=="W"){f.setSize({width:(l.width()+k)*f.zoomLevel,height:(l.height())*f.zoomLevel})
}else{if(j=="S"||j=="N"){f.setSize({width:(l.width())*f.zoomLevel,height:(l.height()+k)*f.zoomLevel})
}}if(j=="N"||j=="W"){var g=j=="N"?{x:0,y:k}:{x:k,y:0};
f.getChildNodes(false,function(o){o.bounds.moveBy(g)
});
var i=f.getChildEdges().findAll(function(o){return o.getAllDockedShapes().length>0
});
var n=i.collect(function(o){return o.dockers.findAll(function(p){return !p.getDockedShape()
})
}).flatten();
n.each(function(o){o.bounds.moveBy(g)
})
}else{if(j=="S"){h.scrollTop+=k
}else{if(j=="E"){h.scrollLeft+=k
}}}f.update();
m.updateSelection()
};
var b=ORYX.Core.Command.extend({construct:function(f,h,g){this.position=f;
this.extentionSize=h;
this.facade=g
},execute:function(){resizeCanvas(this.position,this.extentionSize,this.facade)
},rollback:function(){resizeCanvas(this.position,-this.extentionSize,this.facade)
},update:function(){}});
var d=ORYX.CONFIG.CANVAS_RESIZE_INTERVAL;
if(c){d=-d
}var e=new b(a,d,this.facade);
this.facade.executeCommands([e])
}});
ORYX.Plugins.CanvasResizeButton=Clazz.extend({construct:function(c,h,l){this.canvas=c;
var i=c.getHTMLContainer().parentNode.parentNode.parentNode;
window.myParent=i;
var d=i.firstChild;
var b=d.firstChild.firstChild;
var a=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",i,["div",{"class":"canvas_resize_indicator canvas_resize_indicator_grow "+h,title:ORYX.I18N.RESIZE.tipGrow+ORYX.I18N.RESIZE[h]}]);
var e=ORYX.Editor.graft("http://www.w3.org/1999/xhtml",i,["div",{"class":"canvas_resize_indicator canvas_resize_indicator_shrink "+h,title:ORYX.I18N.RESIZE.tipShrink+ORYX.I18N.RESIZE[h]}]);
var f=60;
var k=function(n){if(n.target!=i&&n.target!=d&&n.target!=d.firstChild&&n.target!=b&&n.target!=d){return false
}var q=n.layerX;
var p=n.layerY;
if((q-d.scrollLeft)<0||Ext.isSafari){q+=d.scrollLeft
}if((p-d.scrollTop)<0||Ext.isSafari){p+=d.scrollTop
}if(h=="N"){return p<f+d.firstChild.offsetTop
}else{if(h=="W"){return q<f+d.firstChild.offsetLeft
}else{if(h=="E"){var m=(d.offsetWidth-(d.firstChild.offsetLeft+d.firstChild.offsetWidth));
if(m<0){m=0
}return q>d.scrollWidth-m-f
}else{if(h=="S"){var o=(d.offsetHeight-(d.firstChild.offsetTop+d.firstChild.offsetHeight));
if(o<0){o=0
}return p>d.scrollHeight-o-f
}}}}return false
};
var j=(function(){a.show();
var n,t,m,s;
try{var r=this.canvas.getRootNode().childNodes[1].getBBox();
n=r.x;
t=r.y;
m=r.x+r.width;
s=r.y+r.height
}catch(q){this.canvas.getChildShapes(true).each(function(w){var y=w.absoluteBounds();
var x=y.upperLeft();
var v=y.lowerRight();
if(n==undefined){n=x.x;
t=x.y;
m=v.x;
s=v.y
}else{n=Math.min(n,x.x);
t=Math.min(t,x.y);
m=Math.max(m,v.x);
s=Math.max(s,v.y)
}})
}var u=c.bounds.width();
var p=c.bounds.height();
var o=c.getChildNodes().size()==0;
if(h=="N"&&(t>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL||(o&&p>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL))){e.show()
}else{if(h=="E"&&(u-m)>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL){e.show()
}else{if(h=="S"&&(p-s)>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL){e.show()
}else{if(h=="W"&&(n>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL||(o&&u>ORYX.CONFIG.CANVAS_RESIZE_INTERVAL))){e.show()
}else{e.hide()
}}}}}).bind(this);
var g=function(){a.hide();
e.hide()
};
d.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,function(m){if(k(m)){j()
}else{g()
}},false);
a.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,function(m){j()
},true);
e.addEventListener(ORYX.CONFIG.EVENT_MOUSEOVER,function(m){j()
},true);
i.addEventListener(ORYX.CONFIG.EVENT_MOUSEOUT,function(m){g()
},true);
g();
a.addEventListener("click",function(){l(h);
j()
},true);
e.addEventListener("click",function(){l(h,true);
j()
},true)
}});