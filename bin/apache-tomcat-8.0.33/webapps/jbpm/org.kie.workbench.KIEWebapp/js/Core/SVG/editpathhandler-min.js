if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.SVG){ORYX.Core.SVG={}
}ORYX.Core.SVG.EditPathHandler=Clazz.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.x=0;
this.y=0;
this.oldX=0;
this.oldY=0;
this.deltaWidth=1;
this.deltaHeight=1;
this.d=""
},init:function(a,f,d,b,c,e){this.x=a;
this.y=f;
this.oldX=d;
this.oldY=b;
this.deltaWidth=c;
this.deltaHeight=e;
this.d=""
},editPointsAbs:function(c){if(c instanceof Array){var d=[];
var a,e;
for(var b=0;
b<c.length;
b++){a=(parseFloat(c[b])-this.oldX)*this.deltaWidth+this.x;
b++;
e=(parseFloat(c[b])-this.oldY)*this.deltaHeight+this.y;
d.push(a);
d.push(e)
}return d
}else{}},editPointsRel:function(c){if(c instanceof Array){var d=[];
var a,e;
for(var b=0;
b<c.length;
b++){a=parseFloat(c[b])*this.deltaWidth;
b++;
e=parseFloat(c[b])*this.deltaHeight;
d.push(a);
d.push(e)
}return d
}else{}},arcAbs:function(e,c,i,b,f,h,g){var d=this.editPointsAbs([h,g]);
var a=this.editPointsRel([e,c]);
this.d=this.d.concat(" A"+a[0]+" "+a[1]+" "+i+" "+b+" "+f+" "+d[0]+" "+d[1]+" ")
},arcRel:function(f,d,b,e,c,a,h){var g=this.editPointsRel([f,d,a,h]);
this.d=this.d.concat(" a"+g[0]+" "+g[1]+" "+b+" "+e+" "+c+" "+g[2]+" "+g[3]+" ")
},curvetoCubicAbs:function(c,e,b,d,a,g){var f=this.editPointsAbs([c,e,b,d,a,g]);
this.d=this.d.concat(" C"+f[0]+" "+f[1]+" "+f[2]+" "+f[3]+" "+f[4]+" "+f[5]+" ")
},curvetoCubicRel:function(c,e,b,d,a,g){var f=this.editPointsRel([c,e,b,d,a,g]);
this.d=this.d.concat(" c"+f[0]+" "+f[1]+" "+f[2]+" "+f[3]+" "+f[4]+" "+f[5]+" ")
},linetoHorizontalAbs:function(a){var b=this.editPointsAbs([a,0]);
this.d=this.d.concat(" H"+b[0]+" ")
},linetoHorizontalRel:function(a){var b=this.editPointsRel([a,0]);
this.d=this.d.concat(" h"+b[0]+" ")
},linetoAbs:function(a,c){var b=this.editPointsAbs([a,c]);
this.d=this.d.concat(" L"+b[0]+" "+b[1]+" ")
},linetoRel:function(a,c){var b=this.editPointsRel([a,c]);
this.d=this.d.concat(" l"+b[0]+" "+b[1]+" ")
},movetoAbs:function(a,c){var b=this.editPointsAbs([a,c]);
this.d=this.d.concat(" M"+b[0]+" "+b[1]+" ")
},movetoRel:function(a,c){var b;
if(this.d===""){b=this.editPointsAbs([a,c])
}else{b=this.editPointsRel([a,c])
}this.d=this.d.concat(" m"+b[0]+" "+b[1]+" ")
},curvetoQuadraticAbs:function(b,c,a,e){var d=this.editPointsAbs([b,c,a,e]);
this.d=this.d.concat(" Q"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoQuadraticRel:function(b,c,a,e){var d=this.editPointsRel([b,c,a,e]);
this.d=this.d.concat(" q"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoCubicSmoothAbs:function(b,c,a,e){var d=this.editPointsAbs([b,c,a,e]);
this.d=this.d.concat(" S"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoCubicSmoothRel:function(b,c,a,e){var d=this.editPointsRel([b,c,a,e]);
this.d=this.d.concat(" s"+d[0]+" "+d[1]+" "+d[2]+" "+d[3]+" ")
},curvetoQuadraticSmoothAbs:function(a,c){var b=this.editPointsAbs([a,c]);
this.d=this.d.concat(" T"+b[0]+" "+b[1]+" ")
},curvetoQuadraticSmoothRel:function(a,c){var b=this.editPointsRel([a,c]);
this.d=this.d.concat(" t"+b[0]+" "+b[1]+" ")
},linetoVerticalAbs:function(b){var a=this.editPointsAbs([0,b]);
this.d=this.d.concat(" V"+a[1]+" ")
},linetoVerticalRel:function(b){var a=this.editPointsRel([0,b]);
this.d=this.d.concat(" v"+a[1]+" ")
},closePath:function(){this.d=this.d.concat(" z")
}});