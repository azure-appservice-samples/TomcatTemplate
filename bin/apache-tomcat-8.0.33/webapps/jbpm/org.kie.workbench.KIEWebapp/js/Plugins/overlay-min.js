if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Overlay=Clazz.extend({facade:undefined,styleNode:undefined,construct:function(a){this.facade=a;
this.changes=[];
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_OVERLAY_SHOW,this.show.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_OVERLAY_HIDE,this.hide.bind(this));
this.styleNode=document.createElement("style");
this.styleNode.setAttributeNS(null,"type","text/css");
document.getElementsByTagName("head")[0].appendChild(this.styleNode)
},show:function(a){if(!a||!a.shapes||!a.shapes instanceof Array||!a.id||!a.id instanceof String||a.id.length==0){return
}if(a.attributes){a.shapes.each(function(d){if(!d instanceof ORYX.Core.Shape){return
}this.setAttributes(d.node,a.attributes)
}.bind(this))
}var c=true;
try{c=a.node&&a.node instanceof SVGElement
}catch(b){}if(a.node&&c){a._temps=[];
a.shapes.each(function(h,g){if(!h instanceof ORYX.Core.Shape){return
}var f={};
f.svg=a.dontCloneNode?a.node:a.node.cloneNode(true);
h.node.firstChild.appendChild(f.svg);
if(h instanceof ORYX.Core.Edge&&!a.nodePosition){a.nodePosition="START"
}if(a.nodePosition){var e=h.bounds;
var i=a.nodePosition.toUpperCase();
if(h instanceof ORYX.Core.Node&&i=="START"){i="NW"
}else{if(h instanceof ORYX.Core.Node&&i=="END"){i="SE"
}else{if(h instanceof ORYX.Core.Edge&&i=="START"){e=h.getDockers().first().bounds
}else{if(h instanceof ORYX.Core.Edge&&i=="END"){e=h.getDockers().last().bounds
}}}}f.callback=function(){var j=0;
var k=0;
if(i=="NW"){}else{if(i=="N"){j=e.width()/2
}else{if(i=="NE"){j=e.width()
}else{if(i=="E"){j=e.width();
k=e.height()/2
}else{if(i=="SE"){j=e.width();
k=e.height()
}else{if(i=="S"){j=e.width()/2;
k=e.height()
}else{if(i=="SW"){k=e.height()
}else{if(i=="W"){k=e.height()/2
}else{if(i=="START"||i=="END"){j=e.width()/2;
k=e.height()/2
}else{if(i=="CANVAS_TITLE_FORM"){j=10;
k=20
}else{if(i=="CANVAS_TITLE"){j=10;
k=20
}else{if(i=="SYNTAX_CHECKS"){j=-25;
k=(e.height()+15/2)-15
}else{if(i=="SIMMODELMAX"){j=(e.width()/2)-10;
k=e.height()
}else{if(i=="SIMMODELMIN"){j=(e.width()/2)-10;
k=e.height()-10
}else{if(i=="SIMMODELAVG"){j=(e.width()/2)-10;
k=e.height()-20
}else{return
}}}}}}}}}}}}}}}if(h instanceof ORYX.Core.Edge){j+=e.upperLeft().x;
k+=e.upperLeft().y
}f.svg.setAttributeNS(null,"transform","translate("+j+", "+k+")")
}.bind(this);
f.element=h;
f.callback();
e.registerCallback(f.callback)
}if(a.ghostPoint){var d={x:0,y:0};
d=a.ghostPoint;
f.callback=function(){var j=0;
var k=0;
j=d.x-7;
k=d.y-7;
f.svg.setAttributeNS(null,"transform","translate("+j+", "+k+")")
}.bind(this);
f.element=h;
f.callback();
e.registerCallback(f.callback)
}if(a.labelPoint){var d={x:0,y:0};
d=a.labelPoint;
f.callback=function(){var j=0;
var k=0;
j=d.x;
k=d.y;
f.svg.setAttributeNS(null,"transform","translate("+j+", "+k+")")
}.bind(this);
f.element=h;
f.callback();
e.registerCallback(f.callback)
}a._temps.push(f)
}.bind(this))
}if(!this.changes[a.id]){this.changes[a.id]=[]
}this.changes[a.id].push(a)
},hide:function(a){if(!a||!a.id||!a.id instanceof String||a.id.length==0||!this.changes[a.id]){return
}this.changes[a.id].each(function(b){b.shapes.each(function(d,c){if(!d instanceof ORYX.Core.Shape){return
}this.deleteAttributes(d.node)
}.bind(this));
if(b._temps){b._temps.each(function(c){if(c.svg&&c.svg.parentNode){c.svg.parentNode.removeChild(c.svg)
}if(c.callback&&c.element){c.element.bounds.unregisterCallback(c.callback)
}}.bind(this))
}}.bind(this));
this.changes[a.id]=null
},setAttributes:function(c,d){var h=this.getAllChilds(c.firstChild.firstChild);
var a=[];
h.each(function(k){a.push($A(k.attributes).findAll(function(l){return l.nodeValue.startsWith("url(#")
}))
});
a=a.flatten().compact();
a=a.collect(function(k){return k.nodeValue
}).uniq();
a=a.collect(function(k){return k.slice(5,k.length-1)
});
a.unshift(c.id+" .me");
var g=$H(d);
var e=g.toJSON().gsub(",",";").gsub('"',"");
var i=d.stroke?e.slice(0,e.length-1)+"; fill:"+d.stroke+";}":e;
var f;
if(d.fill){var b=Object.clone(d);
b.fill="black";
f=$H(b).toJSON().gsub(",",";").gsub('"',"")
}csstags=a.collect(function(l,k){return"#"+l+" * "+(!k?e:i)+""+(f?" #"+l+" text * "+f:"")
});
var j=csstags.join(" ")+"\n";
this.styleNode.appendChild(document.createTextNode(j))
},deleteAttributes:function(b){var a=$A(this.styleNode.childNodes).findAll(function(c){return c.textContent.include("#"+b.id)
});
a.each(function(c){c.parentNode.removeChild(c)
})
},getAllChilds:function(a){var b=$A(a.childNodes);
$A(a.childNodes).each(function(c){b.push(this.getAllChilds(c))
}.bind(this));
return b.flatten()
}});