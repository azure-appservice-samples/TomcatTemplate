if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.Math){ORYX.Core.Math={}
}ORYX.Core.Math.midPoint=function(b,a){return{x:(b.x+a.x)/2,y:(b.y+a.y)/2}
};
ORYX.Core.Math.isPointInLine=function(h,f,g,e,b,a,d){d=d?Math.abs(d):1;
if(Math.abs(g-b)<=d&&Math.abs(h-g)<=d&&f-Math.max(e,a)<=d&&Math.min(e,a)-f<=d){return true
}if(Math.abs(e-a)<=d&&Math.abs(f-e)<=d&&h-Math.max(g,b)<=d&&Math.min(g,b)-h<=d){return true
}if(h>Math.max(g,b)||h<Math.min(g,b)){return false
}if(f>Math.max(e,a)||f<Math.min(e,a)){return false
}var c=(e-a)/(g-b);
return Math.abs(f-((c*h)+e-c*g))<d
};
ORYX.Core.Math.isPointInEllipse=function(h,f,b,g,e,d){if(b===undefined||g===undefined||e===undefined||d===undefined){throw"ORYX.Core.Math.isPointInEllipse needs a ellipse with these properties: x, y, radiusX, radiusY"
}var c=(h-b)/e;
var a=(f-g)/d;
return c*c+a*a<1
};
ORYX.Core.Math.isPointInPolygone=function(a,m,e){if(arguments.length<3){throw"ORYX.Core.Math.isPointInPolygone needs two arguments"
}var g=e.length-1;
if(e[0]!==e[g-1]||e[1]!==e[g]){e.push(e[0]);
e.push(e[1])
}var h=0;
var c,l,b,k,j;
for(var f=0;
f<e.length-3;
){c=e[f];
l=e[++f];
b=e[++f];
k=e[f+1];
j=(m-l)*(b-c)-(a-c)*(k-l);
if((l>=m)!=(k>=m)){h+=k-l>=0?j>=0:j<=0
}if(!j&&Math.min(c,b)<=a&&a<=Math.max(c,b)&&Math.min(l,k)<=m&&m<=Math.max(l,k)){return true
}}return(h%2)?true:false
};
ORYX.Core.Math.distancePointLinie=function(e,d,a,b){var c=ORYX.Core.Math.getPointOfIntersectionPointLine(e,d,a,b);
if(!c){return null
}return ORYX.Core.Math.getDistancePointToPoint(a,c)
};
ORYX.Core.Math.getDistancePointToPoint=function(b,a){return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2))
};
ORYX.Core.Math.getPointOfIntersectionPointLine=function(f,c,a,e){var d=Math.pow(c.x-f.x,2)+Math.pow(c.y-f.y,2);
if(d==0){return undefined
}var b=((a.x-f.x)*(c.x-f.x)+(a.y-f.y)*(c.y-f.y))/d;
if(e){if(!(0<=b&&b<=1)){return undefined
}}pointOfIntersection=new Object();
pointOfIntersection.x=f.x+b*(c.x-f.x);
pointOfIntersection.y=f.y+b*(c.y-f.y);
return pointOfIntersection
};