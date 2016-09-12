if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.UML={construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.handlePropertyChanged.bind(this));
this.facade.registerOnEvent("layout.uml.class",this.handleLayoutClass.bind(this));
this.facade.registerOnEvent("layout.uml.list",this.handleLayoutList.bind(this));
this.facade.registerOnEvent("layout.uml.association",this.handleLayoutAssociation.bind(this));
this.facade.registerOnEvent("layout.uml.qualified_association",this.handleLayoutQualifiedAssociation.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.addReadingDirectionOnLoad.bind(this))
},addReadingDirectionOnLoad:function(a){this.facade.getCanvas().edges.each(function(b){if(b.properties["oryx-direction"]=="left"||b.properties["oryx-direction"]=="right"){this.addReadingDirection(b)
}}.bind(this))
},calculateLabelHeight:function(a,b){var d=a.getFontSize();
var c=1;
b.scan("\n",function(){c+=1
});
return c*d+0.75
},handlePropertyChanged:function(a){if(a.key=="oryx-name"){this.addReadingDirection(a.elements[0])
}},handleLayoutClass:function(b){var h=b.shape;
if(h.propertiesChanged["oryx-abstract"]==true){var j=b.shape.getLabels().find(function(i){return i.id==(b.shape.id+"className")
});
if(h.properties["oryx-abstract"]==true){j.node.setAttribute("font-style","italic")
}else{j.node.setAttribute("font-style","none")
}}if(h.propertiesChanged["oryx-attributes"]==true||h.propertiesChanged["oryx-methods"]){var k=b.shape.properties["oryx-attributes"];
var m=b.shape.properties["oryx-methods"];
var d=b.shape.getLabels().find(function(i){return i.id==(b.shape.id+"attributes")
});
var c=b.shape.getLabels().find(function(i){return i.id==(b.shape.id+"methods")
});
var g=b.shape._svgShapes.find(function(i){return i.element.id==(b.shape.id+"separator")
}).element;
var n=this.calculateLabelHeight(d,k);
var f=this.calculateLabelHeight(c,m);
var l=24+n+2;
var a=l+f+2;
g.setAttribute("y1",l);
g.setAttribute("y2",l);
c.y=l+3;
c.node.setAttribute("y",l+3);
for(var e=0;
e<c.node.childElementCount;
e++){c.node.childNodes[e].setAttribute("y",l+2)
}h.bounds.set(h.bounds.a.x,h.bounds.a.y,h.bounds.b.x,h.bounds.a.y+a+5)
}},handleLayoutList:function(e){var c=e.shape;
if(c.propertiesChanged["oryx-items"]==true){var a=c.properties["oryx-items"];
var b=c.getLabels().find(function(g){return g.id==(e.shape.id+"items")
});
var f=this.calculateLabelHeight(b,a);
var d=32+f+2;
c.bounds.set(c.bounds.a.x,c.bounds.a.y,c.bounds.b.x,c.bounds.a.y+d+5)
}},handleLayoutAssociation:function(a){this.addReadingDirection(a.shape)
},addReadingDirection:function(a){var b=a.getLabels().find(function(c){return c.id==(a.id+"name")
});
if(a.properties["oryx-direction"]=="left"){b.text("◀ "+a.properties["oryx-name"])
}else{if(a.properties["oryx-direction"]=="right"){b.text(a.properties["oryx-name"]+" ▶")
}else{b.text(a.properties["oryx-name"])
}}b.update()
},handleLayoutQualifiedAssociation:function(d){var a=d.shape;
var c=a.getLabels().find(function(e){return e.id==(d.shape.id+"qualifier")
});
var b=c._estimateTextWidth(a.properties["oryx-qualifier"],12);
if(b<40){b=40
}a._markers.values()[0].element.lastElementChild.setAttribute("width",b+5);
a._markers.values()[0].element.setAttributeNS(null,"markerWidth",b+5)
}};
ORYX.Plugins.UML=Clazz.extend(ORYX.Plugins.UML);