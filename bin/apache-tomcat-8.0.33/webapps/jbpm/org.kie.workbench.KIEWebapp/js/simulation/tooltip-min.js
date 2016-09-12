(function(){var a=window.nv.tooltip={};
a.show=function(o,l,q,m,c,j){var d=document.createElement("div");
d.className="nvtooltip "+(j?j:"xy-tooltip");
q=q||"s";
m=m||20;
var k=c?c:document.getElementsByTagName("body")[0];
d.innerHTML=l;
d.style.left=0;
d.style.top=0;
d.style.opacity=0;
k.appendChild(d);
var p=parseInt(d.offsetHeight),e=parseInt(d.offsetWidth),g=nv.utils.windowSize().width,b=nv.utils.windowSize().height,f=k.scrollTop,i=k.scrollLeft,h,n;
switch(q){case"e":h=o[0]-e-m;
n=o[1]-(p/2);
if(h<i){h=o[0]+m
}if(n<f){n=f+5
}if(n+p>f+b){n=f-p-5
}break;
case"w":h=o[0]+m;
n=o[1]-(p/2);
if(h+e>g){h=o[0]-e-m
}if(n<f){n=f+5
}if(n+p>f+b){n=f-p-5
}break;
case"n":h=o[0]-(e/2);
n=o[1]+m;
if(h<i){h=i+5
}if(h+e>g){h=g-e-5
}if(n+p>f+b){n=o[1]-p-m
}break;
case"s":h=o[0]-(e/2);
n=o[1]-p-m;
if(h<i){h=i+5
}if(h+e>g){h=g-e-5
}if(f>n){n=o[1]+20
}break
}d.style.left=h+"px";
d.style.top=n+"px";
d.style.opacity=1;
d.style.position="absolute";
d.style.pointerEvents="none";
return d
};
a.cleanup=function(){var b=document.getElementsByClassName("nvtooltip");
var c=[];
while(b.length){c.push(b[0]);
b[0].style.transitionDelay="0 !important";
b[0].style.opacity=0;
b[0].className="nvtooltip-pending-removal"
}setTimeout(function(){while(c.length){var d=c.pop();
d.parentNode.removeChild(d)
}},500)
}
})();