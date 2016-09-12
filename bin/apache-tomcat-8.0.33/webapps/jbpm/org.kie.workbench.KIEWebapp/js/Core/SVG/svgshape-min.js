NAMESPACE_ORYX="http://www.b3mn.org/oryx";
NAMESPACE_SVG="http://www.w3.org/2000/svg/";
if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.SVGShape=Clazz.extend({construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.type;
this.element=a;
this.x=undefined;
this.y=undefined;
this.width=undefined;
this.height=undefined;
this.oldX=undefined;
this.oldY=undefined;
this.oldWidth=undefined;
this.oldHeight=undefined;
this.radiusX=undefined;
this.radiusY=undefined;
this.isHorizontallyResizable=false;
this.isVerticallyResizable=false;
this.anchorLeft=false;
this.anchorRight=false;
this.anchorTop=false;
this.anchorBottom=false;
this.allowDockers=true;
this.resizeMarkerMid=false;
this.editPathParser;
this.editPathHandler;
this.init()
},init:function(){if(ORYX.Editor.checkClassType(this.element,SVGRectElement)||ORYX.Editor.checkClassType(this.element,SVGImageElement)){this.type="Rect";
var G=this.element.getAttributeNS(null,"x");
if(G){this.oldX=parseFloat(G)
}else{throw"Missing attribute in element "+this.element
}var o=this.element.getAttributeNS(null,"y");
if(o){this.oldY=parseFloat(o)
}else{throw"Missing attribute in element "+this.element
}var q=this.element.getAttributeNS(null,"width");
if(q){this.oldWidth=parseFloat(q)
}else{throw"Missing attribute in element "+this.element
}var s=this.element.getAttributeNS(null,"height");
if(s){this.oldHeight=parseFloat(s)
}else{throw"Missing attribute in element "+this.element
}}else{if(ORYX.Editor.checkClassType(this.element,SVGCircleElement)){this.type="Circle";
var h=undefined;
var e=undefined;
var a=this.element.getAttributeNS(null,"cx");
if(a){h=parseFloat(a)
}else{throw"Missing attribute in element "+this.element
}var u=this.element.getAttributeNS(null,"cy");
if(u){e=parseFloat(u)
}else{throw"Missing attribute in element "+this.element
}var j=this.element.getAttributeNS(null,"r");
if(j){this.radiusX=parseFloat(j)
}else{throw"Missing attribute in element "+this.element
}this.oldX=h-this.radiusX;
this.oldY=e-this.radiusX;
this.oldWidth=2*this.radiusX;
this.oldHeight=2*this.radiusX
}else{if(ORYX.Editor.checkClassType(this.element,SVGEllipseElement)){this.type="Ellipse";
var h=undefined;
var e=undefined;
var a=this.element.getAttributeNS(null,"cx");
if(a){h=parseFloat(a)
}else{throw"Missing attribute in element "+this.element
}var u=this.element.getAttributeNS(null,"cy");
if(u){e=parseFloat(u)
}else{throw"Missing attribute in element "+this.element
}var H=this.element.getAttributeNS(null,"rx");
if(H){this.radiusX=parseFloat(H)
}else{throw"Missing attribute in element "+this.element
}var p=this.element.getAttributeNS(null,"ry");
if(p){this.radiusY=parseFloat(p)
}else{throw"Missing attribute in element "+this.element
}this.oldX=h-this.radiusX;
this.oldY=e-this.radiusY;
this.oldWidth=2*this.radiusX;
this.oldHeight=2*this.radiusY
}else{if(ORYX.Editor.checkClassType(this.element,SVGLineElement)){this.type="Line";
var A=undefined;
var g=undefined;
var y=undefined;
var d=undefined;
var F=this.element.getAttributeNS(null,"x1");
if(F){A=parseFloat(F)
}else{throw"Missing attribute in element "+this.element
}var b=this.element.getAttributeNS(null,"y1");
if(b){g=parseFloat(b)
}else{throw"Missing attribute in element "+this.element
}var l=this.element.getAttributeNS(null,"x2");
if(l){y=parseFloat(l)
}else{throw"Missing attribute in element "+this.element
}var t=this.element.getAttributeNS(null,"y2");
if(t){d=parseFloat(t)
}else{throw"Missing attribute in element "+this.element
}this.oldX=Math.min(A,y);
this.oldY=Math.min(g,d);
this.oldWidth=Math.abs(A-y);
this.oldHeight=Math.abs(g-d)
}else{if(ORYX.Editor.checkClassType(this.element,SVGPolylineElement)||ORYX.Editor.checkClassType(this.element,SVGPolygonElement)){this.type="Polyline";
var x=this.element.getAttributeNS(null,"points");
if(x){x=x.replace(/,/g," ");
var m=x.split(" ");
m=m.without("");
if(m&&m.length&&m.length>1){var E=parseFloat(m[0]);
var D=parseFloat(m[1]);
var C=parseFloat(m[0]);
var B=parseFloat(m[1]);
for(var w=0;
w<m.length;
w++){E=Math.min(E,parseFloat(m[w]));
C=Math.max(C,parseFloat(m[w]));
w++;
D=Math.min(D,parseFloat(m[w]));
B=Math.max(B,parseFloat(m[w]))
}this.oldX=E;
this.oldY=D;
this.oldWidth=C-E;
this.oldHeight=B-D
}else{throw"Missing attribute in element "+this.element
}}else{throw"Missing attribute in element "+this.element
}}else{if(ORYX.Editor.checkClassType(this.element,SVGPathElement)){this.type="Path";
this.editPathParser=new PathParser();
this.editPathHandler=new ORYX.Core.SVG.EditPathHandler();
this.editPathParser.setHandler(this.editPathHandler);
var f=new PathParser();
var c=new ORYX.Core.SVG.MinMaxPathHandler();
f.setHandler(c);
f.parsePath(this.element);
this.oldX=c.minX;
this.oldY=c.minY;
this.oldWidth=c.maxX-c.minX;
this.oldHeight=c.maxY-c.minY;
delete f;
delete c
}else{throw"Element is not a shape."
}}}}}}var r=this.element.getAttributeNS(NAMESPACE_ORYX,"resize");
if(r){r=r.toLowerCase();
if(r.match(/horizontal/)){this.isHorizontallyResizable=true
}else{this.isHorizontallyResizable=false
}if(r.match(/vertical/)){this.isVerticallyResizable=true
}else{this.isVerticallyResizable=false
}}else{this.isHorizontallyResizable=false;
this.isVerticallyResizable=false
}var v=this.element.getAttributeNS(NAMESPACE_ORYX,"anchors");
if(v){v=v.replace("/,/g"," ");
var n=v.split(" ").without("");
for(var w=0;
w<n.length;
w++){switch(n[w].toLowerCase()){case"left":this.anchorLeft=true;
break;
case"right":this.anchorRight=true;
break;
case"top":this.anchorTop=true;
break;
case"bottom":this.anchorBottom=true;
break
}}}if(ORYX.Editor.checkClassType(this.element,SVGPathElement)){var k=this.element.getAttributeNS(NAMESPACE_ORYX,"allowDockers");
if(k){if(k.toLowerCase()==="no"){this.allowDockers=false
}else{this.allowDockers=true
}}var z=this.element.getAttributeNS(NAMESPACE_ORYX,"resizeMarker-mid");
if(z){if(z.toLowerCase()==="yes"){this.resizeMarkerMid=true
}else{this.resizeMarkerMid=false
}}}this.x=this.oldX;
this.y=this.oldY;
this.width=this.oldWidth;
this.height=this.oldHeight
},update:function(){if(this.x!==this.oldX||this.y!==this.oldY||this.width!==this.oldWidth||this.height!==this.oldHeight){switch(this.type){case"Rect":if(this.x!==this.oldX){this.element.setAttributeNS(null,"x",this.x)
}if(this.y!==this.oldY){this.element.setAttributeNS(null,"y",this.y)
}if(this.width!==this.oldWidth){this.element.setAttributeNS(null,"width",this.width)
}if(this.height!==this.oldHeight){this.element.setAttributeNS(null,"height",this.height)
}break;
case"Circle":this.radiusX=((this.width<this.height)?this.width:this.height)/2;
this.element.setAttributeNS(null,"cx",this.x+this.width/2);
this.element.setAttributeNS(null,"cy",this.y+this.height/2);
this.element.setAttributeNS(null,"r",this.radiusX);
break;
case"Ellipse":this.radiusX=this.width/2;
this.radiusY=this.height/2;
this.element.setAttributeNS(null,"cx",this.x+this.radiusX);
this.element.setAttributeNS(null,"cy",this.y+this.radiusY);
this.element.setAttributeNS(null,"rx",this.radiusX);
this.element.setAttributeNS(null,"ry",this.radiusY);
break;
case"Line":if(this.x!==this.oldX){this.element.setAttributeNS(null,"x1",this.x)
}if(this.y!==this.oldY){this.element.setAttributeNS(null,"y1",this.y)
}if(this.x!==this.oldX||this.width!==this.oldWidth){this.element.setAttributeNS(null,"x2",this.x+this.width)
}if(this.y!==this.oldY||this.height!==this.oldHeight){this.element.setAttributeNS(null,"y2",this.y+this.height)
}break;
case"Polyline":var d=this.element.getAttributeNS(null,"points");
if(d){d=d.replace(/,/g," ").split(" ").without("");
if(d&&d.length&&d.length>1){var g=(this.oldWidth===0)?0:this.width/this.oldWidth;
var e=(this.oldHeight===0)?0:this.height/this.oldHeight;
var b="";
for(var c=0;
c<d.length;
c++){var a=(parseFloat(d[c])-this.oldX)*g+this.x;
c++;
var f=(parseFloat(d[c])-this.oldY)*e+this.y;
b+=a+" "+f+" "
}this.element.setAttributeNS(null,"points",b)
}else{}}else{}break;
case"Path":var g=(this.oldWidth===0)?0:this.width/this.oldWidth;
var e=(this.oldHeight===0)?0:this.height/this.oldHeight;
this.editPathHandler.init(this.x,this.y,this.oldX,this.oldY,g,e);
this.editPathParser.parsePath(this.element);
this.element.setAttributeNS(null,"d",this.editPathHandler.d);
break
}this.oldX=this.x;
this.oldY=this.y;
this.oldWidth=this.width;
this.oldHeight=this.height
}},isPointIncluded:function(e,c){if(!e||!c||!this.isVisible()){return false
}switch(this.type){case"Rect":return(e>=this.x&&e<=this.x+this.width&&c>=this.y&&c<=this.y+this.height);
break;
case"Circle":return ORYX.Core.Math.isPointInEllipse(e,c,this.x+this.width/2,this.y+this.height/2,this.radiusX,this.radiusX);
break;
case"Ellipse":return ORYX.Core.Math.isPointInEllipse(e,c,this.x+this.radiusX,this.y+this.radiusY,this.radiusX,this.radiusY);
break;
case"Line":return ORYX.Core.Math.isPointInLine(e,c,this.x,this.y,this.x+this.width,this.y+this.height);
break;
case"Polyline":var b=this.element.getAttributeNS(null,"points");
if(b){b=b.replace(/,/g," ").split(" ").without("");
b=b.collect(function(f){return parseFloat(f)
});
return ORYX.Core.Math.isPointInPolygone(e,c,b)
}else{return false
}break;
case"Path":var d=new PathParser();
var a=new ORYX.Core.SVG.PointsPathHandler();
d.setHandler(a);
d.parsePath(this.element);
return ORYX.Core.Math.isPointInPolygone(e,c,a.points);
break;
default:return false
}},isVisible:function(c){if(!c){c=this.element
}var b=false;
try{b=!!c.ownerSVGElement
}catch(g){}if(b){if(ORYX.Editor.checkClassType(c,SVGGElement)){if(c.className&&c.className.baseVal=="me"){return true
}}var f=c.getAttributeNS(null,"fill");
var d=c.getAttributeNS(null,"stroke");
if(f&&f=="none"&&d&&d=="none"){return false
}var a=c.getAttributeNS(null,"display");
if(!a){return this.isVisible(c.parentNode)
}else{if(a=="none"){return false
}else{return true
}}}return true
},toString:function(){return(this.element)?"SVGShape "+this.element.id:"SVGShape "+this.element
}});