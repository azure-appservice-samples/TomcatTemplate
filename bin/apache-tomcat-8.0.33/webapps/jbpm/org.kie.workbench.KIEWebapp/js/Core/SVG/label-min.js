if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.Label=Clazz.extend({_characterSets:["%W","@","m","wDGMOQÖ#+=<>~^","ABCHKNRSUVXZÜÄ&","bdghnopquxöüETY1234567890ß_§${}*´`µ€","aeksvyzäFLP?°²³","c-",'rtJ"/()[]:;!|\\',"fjI., ","'","il"],_characterSetValues:[15,14,13,11,10,9,8,7,6,5,4,3],construct:function(l){arguments.callee.$.construct.apply(this,arguments);
if(!l.textElement){throw"Label: No parameter textElement."
}else{if(!ORYX.Editor.checkClassType(l.textElement,SVGTextElement)){throw"Label: Parameter textElement is not an SVGTextElement."
}}this.invisibleRenderPoint=-5000;
this.node=l.textElement;
this.node.setAttributeNS(null,"stroke-width","0pt");
this.node.setAttributeNS(null,"letter-spacing","-0.01px");
this.shapeId=l.shapeId;
this.id;
this.fitToElemId;
this.edgePosition;
this.x;
this.y;
this.oldX;
this.oldY;
this.isVisible=true;
this._text;
this._verticalAlign;
this._horizontalAlign;
this._rotate;
this._rotationPoint;
this.anchorLeft;
this.anchorRight;
this.anchorTop;
this.anchorBottom;
this._isChanged=true;
var j=this.node.getAttributeNS(null,"id");
if(j){this.id=j
}this.fitToElemId=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"fittoelem");
if(this.fitToElemId){this.fitToElemId=this.shapeId+this.fitToElemId
}var f=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"align");
if(f){f=f.replace(/,/g," ");
f=f.split(" ");
f=f.without("");
f.each((function(e){switch(e){case"top":case"middle":case"bottom":if(!this._verticalAlign){this._verticalAlign=e
}break;
case"left":case"center":case"right":if(!this._horizontalAlign){this._horizontalAlign=e
}break
}}).bind(this))
}this.edgePosition=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"edgePosition");
if(this.edgePosition){this.edgePosition=this.edgePosition.toLowerCase()
}this.offsetTop=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"offsetTop")||ORYX.CONFIG.OFFSET_EDGE_LABEL_TOP;
if(this.offsetTop){this.offsetTop=parseInt(this.offsetTop)
}this.offsetBottom=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"offsetBottom")||ORYX.CONFIG.OFFSET_EDGE_LABEL_BOTTOM;
if(this.offsetBottom){this.offsetBottom=parseInt(this.offsetBottom)
}var k=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"rotate");
if(k){try{this._rotate=parseFloat(k)
}catch(g){this._rotate=0
}}else{this._rotate=0
}var b=this.node.getAttributeNS(ORYX.CONFIG.NAMESPACE_ORYX,"anchors");
if(b){b=b.replace("/,/g"," ");
var a=b.split(" ").without("");
for(var d=0;
d<a.length;
d++){switch(a[d].toLowerCase()){case"left":this.anchorLeft=true;
break;
case"right":this.anchorRight=true;
break;
case"top":this.anchorTop=true;
break;
case"bottom":this.anchorBottom=true;
break
}}}if(!this._verticalAlign){this._verticalAlign="bottom"
}if(!this._horizontalAlign){this._horizontalAlign="left"
}var c=this.node.getAttributeNS(null,"x");
if(c){this.x=parseFloat(c);
this.oldX=this.x
}else{}var h=this.node.getAttributeNS(null,"y");
if(h){this.y=parseFloat(h);
this.oldY=this.y
}else{}this.text(this.node.textContent)
},changed:function(){this._isChanged=true
},update:function(){if(this._isChanged||this.x!==this.oldX||this.y!==this.oldY){if(this.isVisible){this._isChanged=false;
this.node.setAttributeNS(null,"x",this.x);
this.node.setAttributeNS(null,"y",this.y);
if(this._fontSize){this.node.setAttributeNS(null,"font-size",this._fontSize)
}switch(this._horizontalAlign){case"left":this.node.setAttributeNS(null,"text-anchor","start");
break;
case"center":this.node.setAttributeNS(null,"text-anchor","middle");
break;
case"right":this.node.setAttributeNS(null,"text-anchor","end");
break
}this.oldX=this.x;
this.oldY=this.y;
if(this._rotate!==undefined){if(this._rotationPoint){this.node.setAttributeNS(null,"transform","rotate("+this._rotate+" "+this._rotationPoint.x+" "+this._rotationPoint.y+")")
}else{this.node.setAttributeNS(null,"transform","rotate("+this._rotate+" "+this.x+" "+this.y+")")
}}var a=this._text.split("\n");
while(a.last()==""){a.pop()
}this.node.textContent="";
if(this.node.ownerDocument){a.each((function(c,b){var d=this.node.ownerDocument.createElementNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
d.textContent=c;
d.setAttributeNS(null,"x",this.invisibleRenderPoint);
d.setAttributeNS(null,"y",this.invisibleRenderPoint);
if(d.textContent===""){d.textContent=" "
}this.node.appendChild(d)
}).bind(this));
if(this.isVisible){this.node.setAttributeNS(null,"visibility","hidden")
}if(this.fitToElemId){window.setTimeout(this._checkFittingToReferencedElem.bind(this),0)
}else{window.setTimeout(this._positionText.bind(this),0)
}}}else{this.node.textContent=""
}}},_checkFittingToReferencedElem:function(){try{var b=$A(this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan"));
var d=[];
var l=this.node.ownerDocument.getElementById(this.fitToElemId);
if(l){var k=l.getBBox();
var s=this.getFontSize();
for(var f=0;
f<b.length;
f++){var p=b[f];
var t=this._getRenderedTextLength(p,undefined,undefined,s);
var h=(this._rotate!=0&&this._rotate%180!=0&&this._rotate%90==0?k.height:k.width);
if(t>h){var q=0;
var n=0;
var o=this.getTrimmedTextLength(p.textContent);
for(var g=0;
g<o;
g++){var r=this._getRenderedTextLength(p,q,g-q,s);
if(r>h-3){var c=this.node.ownerDocument.createElementNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
if(n<=q){n=(g==0)?g:g-1;
c.textContent=p.textContent.slice(q,n)
}else{c.textContent=p.textContent.slice(q,++n)
}c.setAttributeNS(null,"x",this.invisibleRenderPoint);
c.setAttributeNS(null,"y",this.invisibleRenderPoint);
d.push(c);
q=n
}else{var a=p.textContent.charAt(g);
if(a==" "||a=="-"||a=="."||a==","||a==";"||a==":"){n=g
}}}p.textContent=p.textContent.slice(q)
}d.push(p)
}while(this.node.hasChildNodes()){this.node.removeChild(this.node.childNodes[0])
}while(d.length>0){this.node.appendChild(d.shift())
}}}catch(m){}window.setTimeout(this._positionText.bind(this),0)
},_positionText:function(){try{var a=this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
var c=this.getFontSize(this.node);
var b=[];
$A(a).each((function(g,f){if(g.textContent.trim()===""){b.push(g)
}else{var e=0;
switch(this._verticalAlign){case"bottom":e=-(a.length-f-1)*(c);
break;
case"middle":e=-(a.length/2-f-1)*(c);
e-=ORYX.CONFIG.LABEL_LINE_DISTANCE/2;
break;
case"top":e=f*(c);
e+=c;
break
}g.setAttributeNS(null,"dy",e);
g.setAttributeNS(null,"x",this.x);
g.setAttributeNS(null,"y",this.y)
}}).bind(this));
b.each(function(e){this.node.removeChild(e)
}.bind(this))
}catch(d){this._isChanged=true
}if(this.isVisible){this.node.setAttributeNS(null,"visibility","inherit")
}},_getRenderedTextLength:function(c,d,b,a){if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)&&new Number(RegExp.$1)>=3){if(d===undefined){return c.getComputedTextLength()
}else{return c.getSubStringLength(d,b)
}}else{if(d===undefined){return this._estimateTextWidth(c.textContent,a)
}else{return this._estimateTextWidth(c.textContent.substr(d,b).trim(),a)
}}},_estimateTextWidth:function(d,c){var b=0;
for(var a=0;
a<d.length;
a++){b+=this._estimateCharacterWidth(d.charAt(a))
}return b*(c/14)
},_estimateCharacterWidth:function(b){for(var a=0;
a<this._characterSets.length;
a++){if(this._characterSets[a].indexOf(b)>=0){return this._characterSetValues[a]
}}return 9
},getReferencedElementWidth:function(){var a=this.node.ownerDocument.getElementById(this.fitToElemId);
if(a){var b=a.getBBox();
if(b){return b.width
}else{return undefined
}}else{return undefined
}},text:function(){switch(arguments.length){case 0:return this._text;
break;
case 1:var a=this._text;
if(arguments[0]){this._text=arguments[0].toString()
}else{this._text=""
}if(a!==this._text){this._isChanged=true
}break;
default:break
}},fontSize:function(){switch(arguments.length){case 0:return this._fontSize;
break;
case 1:var a=this._fontSize;
if(arguments[0]){this._fontSize=arguments[0].toString()
}else{this._fontSize=12
}if(a!==this._fontSize){this._isChanged=true
}break;
default:break
}},verticalAlign:function(){switch(arguments.length){case 0:return this._verticalAlign;
case 1:if(["top","middle","bottom"].member(arguments[0])){var a=this._verticalAlign;
this._verticalAlign=arguments[0];
if(this._verticalAlign!==a){this._isChanged=true
}}break;
default:break
}},horizontalAlign:function(){switch(arguments.length){case 0:return this._horizontalAlign;
case 1:if(["left","center","right"].member(arguments[0])){var a=this._horizontalAlign;
this._horizontalAlign=arguments[0];
if(this._horizontalAlign!==a){this._isChanged=true
}}break;
default:break
}},rotate:function(){switch(arguments.length){case 0:return this._rotate;
case 1:if(this._rotate!=arguments[0]){this._rotate=arguments[0];
this._rotationPoint=undefined;
this._isChanged=true
}case 2:if(this._rotate!=arguments[0]||!this._rotationPoint||this._rotationPoint.x!=arguments[1].x||this._rotationPoint.y!=arguments[1].y){this._rotate=arguments[0];
this._rotationPoint=arguments[1];
this._isChanged=true
}}},hide:function(){if(this.isVisible){this.isVisible=false;
this._isChanged=true
}},show:function(){if(!this.isVisible){this.isVisible=true;
this._isChanged=true
}},getInheritedFontSize:function(b){if(!b||!b.getAttributeNS){return
}var a=b.getAttributeNS(null,"font-size");
if(a){return parseFloat(a)
}else{if(!ORYX.Editor.checkClassType(b,SVGSVGElement)){return this.getInheritedFontSize(b.parentNode)
}}},getFontSize:function(b){var a=this.node.getElementsByTagNameNS(ORYX.CONFIG.NAMESPACE_SVG,"tspan");
var c=this.getInheritedFontSize(this.node);
if(!c){if(a[0]&&/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)&&new Number(RegExp.$1)>=3){c=a[0].getExtentOfChar(0).height
}else{c=ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT
}if(c<=0){c=ORYX.CONFIG.LABEL_DEFAULT_LINE_HEIGHT
}}if(c){this.node.setAttribute("oryx:fontSize",c)
}return c
},getTrimmedTextLength:function(b){b=b.strip().gsub("  "," ");
var a;
do{a=b.length;
b=b.gsub("  "," ")
}while(a>b.length);
return b.length
},getOffsetBottom:function(){return this.offsetBottom
},getOffsetTop:function(){return this.offsetTop
},toString:function(){return"Label "+this.id
}});