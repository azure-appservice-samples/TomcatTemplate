if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.CpnSupport=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.resetTokenPosition.bind(this))
},resetTokenPosition:function(){var a=this.facade.getSelection().findAll(function(b){return(b.getStencil().id()==="http://b3mn.org/stencilset/coloredpetrinet#Place")
});
if(a.length>0){a.each(function(g){var e=g.absoluteBounds();
var f=e.center();
var b=f.y-e.upperLeft().y;
var d=f.x-e.upperLeft().x;
var j=Math.min(b,d);
var k=j/2;
var n=g.getChildNodes(false).findAll(function(c){return(c.getStencil().id()==="http://b3mn.org/stencilset/coloredpetrinet#Token")
});
if(n.length>0){var h=0;
var m=0;
var l=0;
n.each(function(p){var r=p.absoluteBounds();
var o=r.center();
var i=f.x-o.x;
var c=f.y-o.y;
var q=i*i+c*c;
if(j*j<=q){l=Math.round(Math.sin((Math.PI/6)*h)*k);
m=Math.round(Math.cos((Math.PI/6)*h)*k);
p.bounds.centerMoveTo(g.bounds.width()/2+m,g.bounds.height()/2+l);
p.update();
h=h+1
}})
}})
}this.facade.getCanvas().update()
}});