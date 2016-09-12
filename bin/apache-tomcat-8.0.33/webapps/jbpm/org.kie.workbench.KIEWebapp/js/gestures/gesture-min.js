video=document.getElementById("video");
canvas=document.getElementById("canvas");
_=canvas.getContext("2d");
ccanvas=document.getElementById("comp");
c_=ccanvas.getContext("2d");
navigator.webkitGetUserMedia({audio:true,video:true},function(c){s=c;
video.src=window.webkitURL.createObjectURL(c);
video.addEventListener("play",function(){setInterval(dump,1000/25)
})
},function(){alert("no cam access")
});
compression=5;
width=height=0;
function dump(){if(canvas.width!=video.videoWidth){width=Math.floor(video.videoWidth/compression);
height=Math.floor(video.videoHeight/compression);
canvas.width=ccanvas.width=width;
canvas.height=ccanvas.height=height
}_.drawImage(video,width,0,-width,height);
draw=_.getImageData(0,0,width,height);
skinfilter();
test()
}huemin=0;
huemax=0.1;
satmin=0;
satmax=1;
valmin=0.4;
valmax=1;
function skinfilter(){skin_filter=_.getImageData(0,0,width,height);
var f=skin_filter.width*skin_filter.height;
var e=f*4;
var d=0;
for(var h=0;
h<height;
h++){for(var c=0;
c<width;
c++){e=c+h*width;
r=draw.data[d];
g=draw.data[d+1];
b=draw.data[d+2];
a=draw.data[d+3];
hsv=rgb2Hsv(r,g,b);
if(((hsv[0]>huemin&&hsv[0]<huemax)||(hsv[0]>0.59&&hsv[0]<1))&&(hsv[1]>satmin&&hsv[1]<satmax)&&(hsv[2]>valmin&&hsv[2]<valmax)){skin_filter[d]=r;
skin_filter[d+1]=g;
skin_filter[d+2]=b;
skin_filter[d+3]=a
}else{skin_filter.data[d]=skin_filter.data[d+1]=skin_filter.data[d+2]=0;
skin_filter.data[d+3]=0
}d=e*4
}}draw=skin_filter
}function rgb2Hsv(c,i,k){c=c/255;
i=i/255;
k=k/255;
var l=Math.max(c,i,k);
var e=Math.min(c,i,k);
var f,n,m=l;
var j=l-e;
n=l==0?0:j/l;
if(l==e){f=0
}else{switch(l){case c:f=(i-k)/j+(i<k?6:0);
break;
case i:f=(k-c)/j+2;
break;
case k:f=(c-i)/j+4;
break
}f/=6
}return[f,n,m]
}last=false;
thresh=150;
down=false;
wasdown=false;
function test(){delt=_.createImageData(width,height);
if(last!==false){var k=0,j=0,f=0,i=delt.width*delt.height,c=0,e=i*4;
while(e-=4){var h=Math.abs(draw.data[e]-last.data[e])+Math.abs(draw.data[e+1]-last.data[e+1])+Math.abs(draw.data[e+2]-last.data[e+2]);
if(h>thresh){delt.data[e]=160;
delt.data[e+1]=255;
delt.data[e+2]=delt.data[e+3]=255;
f+=1;
k+=((e/4)%width);
j+=(Math.floor((e/4)/delt.height))
}else{delt.data[e]=delt.data[e+1]=delt.data[e+2]=0;
delt.data[e+3]=0
}}}if(f){down={x:k/f,y:j/f,d:f};
handledown()
}last=draw;
c_.putImageData(delt,0,0)
}movethresh=2;
brightthresh=300;
overthresh=1000;
function calibrate(){wasdown={x:down.x,y:down.y,d:down.d}
}avg=0;
state=0;
function handledown(){avg=0.9*avg+0.1*down.d;
var f=down.d-avg,h=f>brightthresh;
switch(state){case 0:if(h){state=1;
calibrate()
}break;
case 2:if(!h){state=0
}break;
case 1:var d=down.x-wasdown.x,c=down.y-wasdown.y;
var e=Math.abs(c)<Math.abs(d);
if(d<-movethresh&&e){alert("navigate right")
}else{if(d>movethresh&&e){alert("navigate left")
}}if(c>movethresh&&!e){if(f>overthresh){alert("over up")
}else{alert("up")
}}else{if(c<-movethresh&&!e){if(f>overthresh){alert("over down")
}else{alert("down")
}}}state=2;
break
}};