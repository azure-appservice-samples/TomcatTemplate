if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.PointsPathHandler=Clazz.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.points=[];
this._lastAbsX=undefined;
this._lastAbsY=undefined
},addPoints:function(c){if(c instanceof Array){var a,d;
for(var b=0;
b<c.length;
b++){a=parseFloat(c[b]);
b++;
d=parseFloat(c[b]);
this.points.push(a);
this.points.push(d);
this._lastAbsX=a;
this._lastAbsY=d
}}else{}},arcAbs:function(f,d,b,e,c,a,g){this.addPoints([a,g])
},arcRel:function(f,d,b,e,c,a,g){this.addPoints([this._lastAbsX+a,this._lastAbsY+g])
},curvetoCubicAbs:function(c,e,b,d,a,f){this.addPoints([a,f])
},curvetoCubicRel:function(c,e,b,d,a,f){this.addPoints([this._lastAbsX+a,this._lastAbsY+f])
},linetoHorizontalAbs:function(a){this.addPoints([a,this._lastAbsY])
},linetoHorizontalRel:function(a){this.addPoints([this._lastAbsX+a,this._lastAbsY])
},linetoAbs:function(a,b){this.addPoints([a,b])
},linetoRel:function(a,b){this.addPoints([this._lastAbsX+a,this._lastAbsY+b])
},movetoAbs:function(a,b){this.addPoints([a,b])
},movetoRel:function(a,b){if(this._lastAbsX&&this._lastAbsY){this.addPoints([this._lastAbsX+a,this._lastAbsY+b])
}else{this.addPoints([a,b])
}},curvetoQuadraticAbs:function(b,c,a,d){this.addPoints([a,d])
},curvetoQuadraticRel:function(b,c,a,d){this.addPoints([this._lastAbsX+a,this._lastAbsY+d])
},curvetoCubicSmoothAbs:function(b,c,a,d){this.addPoints([a,d])
},curvetoCubicSmoothRel:function(b,c,a,d){this.addPoints([this._lastAbsX+a,this._lastAbsY+d])
},curvetoQuadraticSmoothAbs:function(a,b){this.addPoints([a,b])
},curvetoQuadraticSmoothRel:function(a,b){this.addPoints([this._lastAbsX+a,this._lastAbsY+b])
},linetoVerticalAbs:function(a){this.addPoints([this._lastAbsX,a])
},linetoVerticalRel:function(a){this.addPoints([this._lastAbsX,this._lastAbsY+a])
},closePath:function(){return
}});