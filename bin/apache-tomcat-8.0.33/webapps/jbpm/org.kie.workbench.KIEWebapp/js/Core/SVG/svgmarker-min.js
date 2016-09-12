NAMESPACE_ORYX="http://www.b3mn.org/oryx";
NAMESPACE_SVG="http://www.w3.org/2000/svg/";
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.SVGMarker=Clazz.extend({construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.id=undefined;
this.element=a;
this.refX=undefined;
this.refY=undefined;
this.markerWidth=undefined;
this.markerHeight=undefined;
this.oldRefX=undefined;
this.oldRefY=undefined;
this.oldMarkerWidth=undefined;
this.oldMarkerHeight=undefined;
this.optional=false;
this.enabled=true;
this.minimumLength=undefined;
this.resize=false;
this.svgShapes=[];
this._init()
},_init:function(){if(!(this.element=="[object SVGMarkerElement]")){throw"SVGMarker: Argument is not an instance of SVGMarkerElement."
}this.id=this.element.getAttributeNS(null,"id");
var a=this.element.getAttributeNS(null,"refX");
if(a){this.refX=parseFloat(a)
}else{this.refX=0
}var h=this.element.getAttributeNS(null,"refY");
if(h){this.refY=parseFloat(h)
}else{this.refY=0
}var f=this.element.getAttributeNS(null,"markerWidth");
if(f){this.markerWidth=parseFloat(f)
}else{this.markerWidth=3
}var c=this.element.getAttributeNS(null,"markerHeight");
if(c){this.markerHeight=parseFloat(c)
}else{this.markerHeight=3
}this.oldRefX=this.refX;
this.oldRefY=this.refY;
this.oldMarkerWidth=this.markerWidth;
this.oldMarkerHeight=this.markerHeight;
var g=this.element.getAttributeNS(NAMESPACE_ORYX,"optional");
if(g){g=g.strip();
this.optional=(g.toLowerCase()==="yes")
}else{this.optional=false
}var e=this.element.getAttributeNS(NAMESPACE_ORYX,"enabled");
if(e){e=e.strip();
this.enabled=!(e.toLowerCase()==="no")
}else{this.enabled=true
}var d=this.element.getAttributeNS(NAMESPACE_ORYX,"minimumLength");
if(d){this.minimumLength=parseFloat(d)
}var b=this.element.getAttributeNS(NAMESPACE_ORYX,"resize");
if(b){b=b.strip();
this.resize=(b.toLowerCase()==="yes")
}else{this.resize=false
}},_getSVGShapes:function(c){if(c.hasChildNodes){var a=[];
var b=this;
$A(c.childNodes).each(function(d){try{var g=new ORYX.Core.SVG.SVGShape(d);
a.push(g)
}catch(f){a=a.concat(b._getSVGShapes(d))
}});
return a
}},update:function(){this.oldRefX=this.refX;
this.oldRefY=this.refY;
this.oldMarkerWidth=this.markerWidth;
this.oldMarkerHeight=this.markerHeight
},toString:function(){return(this.element)?"SVGMarker "+this.element.id:"SVGMarker "+this.element
}});