(function(){d3.fisheye={scale:function(b){return a(b(),3,0)
},circular:function(){var c=200,g=2,b,h,e=[0,0];
function f(n){var m=n.x-e[0],j=n.y-e[1],i=Math.sqrt(m*m+j*j);
if(!i||i>=c){return{x:n.x,y:n.y,z:1}
}var l=b*(1-Math.exp(-i*h))/i*0.75+0.25;
return{x:e[0]+m*l,y:e[1]+j*l,z:Math.min(l,10)}
}function d(){b=Math.exp(g);
b=b/(b-1)*c;
h=g/c;
return f
}f.radius=function(i){if(!arguments.length){return c
}c=+i;
return d()
};
f.distortion=function(i){if(!arguments.length){return g
}g=+i;
return d()
};
f.focus=function(i){if(!arguments.length){return e
}e=i;
return f
};
return d()
}};
function a(f,e,b){function c(k){var h=f(k),n=h<b,j,i=d3.extent(f.range()),l=i[0],g=i[1],d=n?b-l:g-b;
if(d==0){d=g-l
}return(n?-1:1)*d*(e+1)/(e+(d/Math.abs(h-b)))+b
}c.distortion=function(d){if(!arguments.length){return e
}e=+d;
return c
};
c.focus=function(d){if(!arguments.length){return b
}b=+d;
return c
};
c.copy=function(){return a(f.copy(),e,b)
};
c.nice=f.nice;
c.ticks=f.ticks;
c.tickFormat=f.tickFormat;
return d3.rebind(c,f,"domain","range")
}})();