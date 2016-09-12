jsPlumbUtil={isArray:function(a){return Object.prototype.toString.call(a)==="[object Array]"
},isString:function(b){return typeof b==="string"
},isBoolean:function(b){return typeof b==="boolean"
},isObject:function(b){return Object.prototype.toString.call(b)==="[object Object]"
},isDate:function(b){return Object.prototype.toString.call(b)==="[object Date]"
},isFunction:function(b){return Object.prototype.toString.call(b)==="[object Function]"
},clone:function(b){if(this.isString(b)){return new String(b)
}else{if(this.isBoolean(b)){return new Boolean(b)
}else{if(this.isDate(b)){return new Date(b.getTime())
}else{if(this.isFunction(b)){return b
}else{if(this.isArray(b)){var f=[];
for(var a=0;
a<b.length;
a++){f.push(this.clone(b[a]))
}return f
}else{if(this.isObject(b)){var f={};
for(var a in b){f[a]=this.clone(b[a])
}return f
}else{return b
}}}}}}},merge:function(l,m){var a=this.clone(l);
for(var b in m){if(a[b]==null||this.isString(m[b])||this.isBoolean(m[b])){a[b]=m[b]
}else{if(this.isArray(m[b])&&this.isArray(a[b])){var i=[];
i.push.apply(i,a[b]);
i.push.apply(i,m[b]);
a[b]=i
}else{if(this.isObject(a[b])&&this.isObject(m[b])){for(var c in m[b]){a[b][c]=m[b][c]
}}}}}return a
},convertStyle:function(h,i){if("transparent"===h){return h
}var k=h,l=function(a){return a.length==1?"0"+a:a
},o=function(a){return l(Number(a).toString(16))
},n=/(rgb[a]?\()(.*)(\))/;
if(h.match(n)){var m=h.match(n)[2].split(",");
k="#"+o(m[0])+o(m[1])+o(m[2]);
if(!i&&m.length==4){k=k+o(m[3])
}}return k
},gradient:function(c,d){c=jsPlumbUtil.isArray(c)?c:[c.x,c.y];
d=jsPlumbUtil.isArray(d)?d:[d.x,d.y];
return(d[1]-c[1])/(d[0]-c[0])
},normal:function(c,d){return -1/jsPlumbUtil.gradient(c,d)
},lineLength:function(c,d){c=jsPlumbUtil.isArray(c)?c:[c.x,c.y];
d=jsPlumbUtil.isArray(d)?d:[d.x,d.y];
return Math.sqrt(Math.pow(d[1]-c[1],2)+Math.pow(d[0]-c[0],2))
},segment:function(c,d){c=jsPlumbUtil.isArray(c)?c:[c.x,c.y];
d=jsPlumbUtil.isArray(d)?d:[d.x,d.y];
if(d[0]>c[0]){return(d[1]>c[1])?2:1
}else{return(d[1]>c[1])?3:4
}},intersects:function(p,q){var s=p.x,u=p.x+p.w,l=p.y,n=p.y+p.h,r=q.x,t=q.x+q.w,m=q.y,o=q.y+q.h;
return((s<=r&&r<=u)&&(l<=m&&m<=n))||((s<=t&&t<=u)&&(l<=m&&m<=n))||((s<=r&&r<=u)&&(l<=o&&o<=n))||((s<=t&&r<=u)&&(l<=o&&o<=n))||((r<=s&&s<=t)&&(m<=l&&l<=o))||((r<=u&&u<=t)&&(m<=l&&l<=o))||((r<=s&&s<=t)&&(m<=n&&n<=o))||((r<=u&&s<=t)&&(m<=n&&n<=o))
},segmentMultipliers:[null,[1,-1],[1,1],[-1,1],[-1,-1]],inverseSegmentMultipliers:[null,[-1,-1],[-1,1],[1,1],[1,-1]],pointOnLine:function(s,o,r){var p=jsPlumbUtil.gradient(s,o),k=jsPlumbUtil.segment(s,o),l=r>0?jsPlumbUtil.segmentMultipliers[k]:jsPlumbUtil.inverseSegmentMultipliers[k],q=Math.atan(p),n=Math.abs(r*Math.sin(q))*l[1],m=Math.abs(r*Math.cos(q))*l[0];
return{x:s.x+m,y:s.y+n}
},perpendicularLineTo:function(o,n,m){var h=jsPlumbUtil.gradient(o,n),l=Math.atan(-1/h),k=m/2*Math.sin(l),i=m/2*Math.cos(l);
return[{x:n.x+i,y:n.y+k},{x:n.x-i,y:n.y-k}]
},findWithFunction:function(a,e){if(a){for(var f=0;
f<a.length;
f++){if(e(a[f])){return f
}}}return -1
},indexOf:function(d,c){return jsPlumbUtil.findWithFunction(d,function(a){return a==c
})
},removeWithFunction:function(f,e){var a=jsPlumbUtil.findWithFunction(f,e);
if(a>-1){f.splice(a,1)
}return a!=-1
},remove:function(d,f){var e=jsPlumbUtil.indexOf(d,f);
if(e>-1){d.splice(e,1)
}return e!=-1
},addWithFunction:function(f,d,e){if(jsPlumbUtil.findWithFunction(f,e)==-1){f.push(d)
}},addToList:function(g,e,h){var f=g[e];
if(f==null){f=[],g[e]=f
}f.push(h);
return f
},EventGenerator:function(){var f={},d=this;
var e=["ready"];
this.bind=function(b,a){jsPlumbUtil.addToList(f,b,a);
return d
};
this.fire=function(c,b,l){if(f[c]){for(var i=0;
i<f[c].length;
i++){if(jsPlumbUtil.findWithFunction(e,function(g){return g===c
})!=-1){f[c][i](b,l)
}else{try{f[c][i](b,l)
}catch(a){jsPlumbUtil.log("jsPlumb: fire failed for event "+c+" : "+a)
}}}}return d
};
this.unbind=function(a){if(a){delete f[a]
}else{f={}
}return d
};
this.getListener=function(a){return f[a]
}
},logEnabled:true,log:function(){if(jsPlumbUtil.logEnabled&&typeof console!="undefined"){try{var c=arguments[arguments.length-1];
console.log(c)
}catch(d){}}},group:function(b){if(jsPlumbUtil.logEnabled&&typeof console!="undefined"){console.group(b)
}},groupEnd:function(b){if(jsPlumbUtil.logEnabled&&typeof console!="undefined"){console.groupEnd(b)
}},time:function(b){if(jsPlumbUtil.logEnabled&&typeof console!="undefined"){console.time(b)
}},timeEnd:function(b){if(jsPlumbUtil.logEnabled&&typeof console!="undefined"){console.timeEnd(b)
}}};
(function(){var e=!!document.createElement("canvas").getContext,f=!!window.SVGAngle||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),g=function(){if(g.vml==undefined){var a=document.body.appendChild(document.createElement("div"));
a.innerHTML='<v:shape id="vml_flag1" adj="1" />';
var b=a.firstChild;
b.style.behavior="url(#default#VML)";
g.vml=b?typeof b.adj=="object":true;
a.parentNode.removeChild(a)
}return g.vml
};
var h=function(a){var b={},c=[],d={},k={};
this.register=function(u){var i=jsPlumb.CurrentLibrary;
u=i.getElementObject(u);
var s=a.getId(u),q=i.getDOMElement(u),r=i.getOffset(u);
if(!b[s]){b[s]=u;
c.push(u);
d[s]={}
}var t=function(m,w){if(m){for(var p=0;
p<m.childNodes.length;
p++){if(m.childNodes[p].nodeType!=3){var n=i.getElementObject(m.childNodes[p]),l=a.getId(n,null,true);
if(l&&k[l]&&k[l]>0){var o=i.getOffset(n);
d[s][l]={id:l,offset:{left:o.left-r.left,top:o.top-r.top}}
}t(m.childNodes[p])
}}}};
t(q)
};
this.updateOffsets=function(v){var i=jsPlumb.CurrentLibrary,x=i.getElementObject(v),y=a.getId(x),w=d[y],z=i.getOffset(x);
if(w){for(var t in w){var A=i.getElementObject(t),u=i.getOffset(A);
d[y][t]={id:t,offset:{left:u.left-z.left,top:u.top-z.top}}
}}};
this.endpointAdded=function(z){var i=jsPlumb.CurrentLibrary,E=document.body,B=a.getId(z),F=i.getDOMElement(z),A=F.parentNode,x=A==E;
k[B]=k[B]?k[B]+1:1;
while(A!=E){var p=a.getId(A,null,true);
if(p&&b[p]){var C=-1,G=i.getElementObject(A),y=i.getOffset(G);
if(d[p][B]==null){var D=jsPlumb.CurrentLibrary.getOffset(z);
d[p][B]={id:B,offset:{left:D.left-y.left,top:D.top-y.top}}
}break
}A=A.parentNode
}};
this.endpointDeleted=function(i){if(k[i.elementId]){k[i.elementId]--;
if(k[i.elementId]<=0){for(var m in d){delete d[m][i.elementId]
}}}};
this.getElementsForDraggable=function(i){return d[i]
};
this.reset=function(){b={};
c=[];
d={};
k={}
}
};
if(!window.console){window.console={time:function(){},timeEnd:function(){},group:function(){},groupEnd:function(){},log:function(){}}
}window.jsPlumbAdapter={headless:false,appendToRoot:function(a){document.body.appendChild(a)
},getRenderModes:function(){return["canvas","svg","vml"]
},isRenderModeAvailable:function(a){return{canvas:e,svg:f,vml:g()}[a]
},getDragManager:function(a){return new h(a)
},setRenderMode:function(a){var b;
if(a){a=a.toLowerCase();
var d=this.isRenderModeAvailable("canvas"),k=this.isRenderModeAvailable("svg"),c=this.isRenderModeAvailable("vml");
if(a==="svg"){if(k){b="svg"
}else{if(d){b="canvas"
}else{if(c){b="vml"
}}}}else{if(a==="canvas"&&d){b="canvas"
}else{if(c){b="vml"
}}}}return b
}}
})();
(function(){var ag=jsPlumbUtil.findWithFunction,L=jsPlumbUtil.indexOf,Y=jsPlumbUtil.removeWithFunction,ad=jsPlumbUtil.remove,U=jsPlumbUtil.addWithFunction,ae=jsPlumbUtil.addToList,ac=jsPlumbUtil.isArray,H=jsPlumbUtil.isString,O=jsPlumbUtil.isObject;
var M=null,ak=function(b,a){return aa.CurrentLibrary.getAttribute(T(b),a)
},aj=function(b,a,c){aa.CurrentLibrary.setAttribute(T(b),a,c)
},I=function(a,b){aa.CurrentLibrary.addClass(T(a),b)
},af=function(a,b){return aa.CurrentLibrary.hasClass(T(a),b)
},ab=function(a,b){aa.CurrentLibrary.removeClass(T(a),b)
},T=function(a){return aa.CurrentLibrary.getElementObject(a)
},S=function(c,d){var a=aa.CurrentLibrary.getOffset(T(c));
if(d!=null){var b=d.getZoom();
return{left:a.left/b,top:a.top/b}
}else{return a
}},am=function(a){return aa.CurrentLibrary.getSize(T(a))
},Z=jsPlumbUtil.log,N=jsPlumbUtil.group,ah=jsPlumbUtil.groupEnd,Q=jsPlumbUtil.time,P=jsPlumbUtil.timeEnd,X=function(){return""+(new Date()).getTime()
},W=function(w){var f=this,v=arguments,h=false,o=w.parameters||{},q=f.idPrefix,c=q+(new Date()).getTime(),d=null,u=null;
f._jsPlumb=w._jsPlumb;
f.getId=function(){return c
};
f.tooltip=w.tooltip;
f.hoverClass=w.hoverClass||f._jsPlumb.Defaults.HoverClass||aa.Defaults.HoverClass;
jsPlumbUtil.EventGenerator.apply(this);
this.clone=function(){var x=new Object();
f.constructor.apply(x,v);
return x
};
this.getParameter=function(x){return o[x]
},this.getParameters=function(){return o
},this.setParameter=function(y,x){o[y]=x
},this.setParameters=function(x){o=x
},this.overlayPlacements=[];
var p=w.beforeDetach;
this.isDetachAllowed=function(z){var y=f._jsPlumb.checkCondition("beforeDetach",z);
if(p){try{y=p(z)
}catch(x){Z("jsPlumb: beforeDetach callback failed",x)
}}return y
};
var m=w.beforeDrop;
this.isDropAllowed=function(x,A,z,C,B){var y=f._jsPlumb.checkCondition("beforeDrop",{sourceId:x,targetId:A,scope:z,connection:C,dropEndpoint:B});
if(m){try{y=m({sourceId:x,targetId:A,scope:z,connection:C,dropEndpoint:B})
}catch(D){Z("jsPlumb: beforeDrop callback failed",D)
}}return y
};
var b=function(){if(d&&u){var x={};
aa.extend(x,d);
aa.extend(x,u);
delete f.hoverPaintStyle;
if(x.gradient&&d.fillStyle){delete x.gradient
}u=x
}};
this.setPaintStyle=function(y,x){d=y;
f.paintStyleInUse=d;
b();
if(!x){f.repaint()
}};
this.getPaintStyle=function(){return d
};
this.setHoverPaintStyle=function(y,x){u=y;
b();
if(!x){f.repaint()
}};
this.getHoverPaintStyle=function(){return u
};
this.setHover=function(z,x,y){if(!f._jsPlumb.currentlyDragging&&!f._jsPlumb.isHoverSuspended()){h=z;
if(f.hoverClass!=null&&f.canvas!=null){if(z){r.addClass(f.canvas,f.hoverClass)
}else{r.removeClass(f.canvas,f.hoverClass)
}}if(u!=null){f.paintStyleInUse=z?u:d;
y=y||X();
f.repaint({timestamp:y,recalc:false})
}if(f.getAttachedElements&&!x){a(z,X(),f)
}}};
this.isHover=function(){return h
};
var e=null;
this.setZIndex=function(x){e=x
};
this.getZIndex=function(){return e
};
var r=aa.CurrentLibrary,s=["click","dblclick","mouseenter","mouseout","mousemove","mousedown","mouseup","contextmenu"],g={mouseout:"mouseexit"},n=function(y,x,z){var A=g[z]||z;
r.bind(y,z,function(B){x.fire(A,x,B)
})
},i=function(x,y){var z=g[y]||y;
r.unbind(x,y)
};
this.attachListeners=function(y,x){for(var z=0;
z<s.length;
z++){n(y,x,s[z])
}};
var a=function(x,y,B){var z=f.getAttachedElements();
if(z){for(var A=0;
A<z.length;
A++){if(!B||B!=z[A]){z[A].setHover(x,true,y)
}}}};
this.reattachListenersForElement=function(x){if(arguments.length>1){for(var y=0;
y<s.length;
y++){i(x,s[y])
}for(var y=1;
y<arguments.length;
y++){f.attachListeners(x,arguments[y])
}}};
var t=[],l=function(x){return x==null?null:x.split(" ")
},k=function(z){if(f.getDefaultType){var x=f.getTypeDescriptor();
var y=jsPlumbUtil.merge({},f.getDefaultType());
for(var A=0;
A<t.length;
A++){y=jsPlumbUtil.merge(y,f._jsPlumb.getType(t[A],x))
}f.applyType(y);
if(!z){f.repaint()
}}};
f.setType=function(y,x){t=l(y)||[];
k(x)
};
f.getType=function(){return t
};
f.hasType=function(x){return jsPlumbUtil.indexOf(t,x)!=-1
};
f.addType=function(z,y){var A=l(z),x=false;
if(A!=null){for(var B=0;
B<A.length;
B++){if(!f.hasType(A[B])){t.push(A[B]);
x=true
}}if(x){k(y)
}}};
f.removeType=function(z,y){var B=l(z),x=false,A=function(D){var E=jsPlumbUtil.indexOf(t,D);
if(E!=-1){t.splice(E,1);
return true
}return false
};
if(B!=null){for(var C=0;
C<B.length;
C++){x=A(B[C])||x
}if(x){k(y)
}}};
f.toggleType=function(y,x){var z=l(y);
if(z!=null){for(var A=0;
A<z.length;
A++){var B=jsPlumbUtil.indexOf(t,z[A]);
if(B!=-1){t.splice(B,1)
}else{t.push(z[A])
}}k(x)
}};
this.applyType=function(x){f.setPaintStyle(x.paintStyle);
f.setHoverPaintStyle(x.hoverPaintStyle);
if(x.parameters){for(var y in x.parameters){f.setParameter(y,x.parameters[y])
}}}
},J=function(g){W.apply(this,arguments);
var a=this;
this.overlays=[];
var i=function(r){var o=null;
if(ac(r)){var p=r[0],n=aa.extend({component:a,_jsPlumb:a._jsPlumb},r[1]);
if(r.length==3){aa.extend(n,r[2])
}o=new aa.Overlays[a._jsPlumb.getRenderMode()][p](n);
if(n.events){for(var q in n.events){o.bind(q,n.events[q])
}}}else{if(r.constructor==String){o=new aa.Overlays[a._jsPlumb.getRenderMode()][r]({component:a,_jsPlumb:a._jsPlumb})
}else{o=r
}}a.overlays.push(o)
},h=function(r){var q=a.defaultOverlayKeys||[],n=r.overlays,p=function(s){return a._jsPlumb.Defaults[s]||aa.Defaults[s]||[]
};
if(!n){n=[]
}for(var o=0;
o<q.length;
o++){n.unshift.apply(n,p(q[o]))
}return n
};
var l=h(g);
if(l){for(var e=0;
e<l.length;
e++){i(l[e])
}}var m=function(n){var p=-1;
for(var o=0;
o<a.overlays.length;
o++){if(n===a.overlays[o].id){p=o;
break
}}return p
};
this.addOverlay=function(o,n){i(o);
if(!n){a.repaint()
}};
this.getOverlay=function(n){var o=m(n);
return o>=0?a.overlays[o]:null
};
this.getOverlays=function(){return a.overlays
};
this.hideOverlay=function(n){var o=a.getOverlay(n);
if(o){o.hide()
}};
this.hideOverlays=function(){for(var n=0;
n<a.overlays.length;
n++){a.overlays[n].hide()
}};
this.showOverlay=function(n){var o=a.getOverlay(n);
if(o){o.show()
}};
this.showOverlays=function(){for(var n=0;
n<a.overlays.length;
n++){a.overlays[n].show()
}};
this.removeAllOverlays=function(){for(var n=0;
n<a.overlays.length;
n++){if(a.overlays[n].cleanup){a.overlays[n].cleanup()
}}a.overlays.splice(0,a.overlays.length);
a.repaint()
};
this.removeOverlay=function(o){var p=m(o);
if(p!=-1){var n=a.overlays[p];
if(n.cleanup){n.cleanup()
}a.overlays.splice(p,1)
}};
this.removeOverlays=function(){for(var n=0;
n<arguments.length;
n++){a.removeOverlay(arguments[n])
}};
var k="__label",b=function(n){var p={cssClass:n.cssClass,labelStyle:this.labelStyle,id:k,component:a,_jsPlumb:a._jsPlumb},o=aa.extend(p,n);
return new aa.Overlays[a._jsPlumb.getRenderMode()].Label(o)
};
if(g.label){var d=g.labelLocation||a.defaultLabelLocation||0.5,c=g.labelStyle||a._jsPlumb.Defaults.LabelStyle||aa.Defaults.LabelStyle;
this.overlays.push(b({label:g.label,location:d,labelStyle:c}))
}this.setLabel=function(p){var o=a.getOverlay(k);
if(!o){var n=p.constructor==String||p.constructor==Function?{label:p}:p;
o=b(n);
this.overlays.push(o)
}else{if(p.constructor==String||p.constructor==Function){o.setLabel(p)
}else{if(p.label){o.setLabel(p.label)
}if(p.location){o.setLocation(p.location)
}}}if(!a._jsPlumb.isSuspendDrawing()){a.repaint()
}};
this.getLabel=function(){var n=a.getOverlay(k);
return n!=null?n.getLabel():null
};
this.getLabelOverlay=function(){return a.getOverlay(k)
};
var f=this.applyType;
this.applyType=function(n){f(n);
a.removeAllOverlays();
if(n.overlays){for(var o=0;
o<n.overlays.length;
o++){a.addOverlay(n.overlays[o],true)
}}}
},R=function(a,c,b){a.bind("click",function(e,d){c.fire("click",c,d)
});
a.bind("dblclick",function(e,d){c.fire("dblclick",c,d)
});
a.bind("contextmenu",function(e,d){c.fire("contextmenu",c,d)
});
a.bind("mouseenter",function(e,d){if(!c.isHover()){b(true);
c.fire("mouseenter",c,d)
}});
a.bind("mouseexit",function(e,d){if(c.isHover()){b(false);
c.fire("mouseexit",c,d)
}})
};
var ai=0,al=function(){var a=ai+1;
ai++;
return a
};
var K=function(bo){this.Defaults={Anchor:"BottomCenter",Anchors:[null,null],ConnectionsDetachable:true,ConnectionOverlays:[],Connector:"Bezier",ConnectorZIndex:null,Container:null,DragOptions:{},DropOptions:{},Endpoint:"Dot",EndpointOverlays:[],Endpoints:[null,null],EndpointStyle:{fillStyle:"#456"},EndpointStyles:[null,null],EndpointHoverStyle:null,EndpointHoverStyles:[null,null],HoverPaintStyle:null,LabelStyle:{color:"black"},LogEnabled:false,Overlays:[],MaxConnections:1,PaintStyle:{lineWidth:8,strokeStyle:"#456"},ReattachConnections:false,RenderMode:"svg",Scope:"jsPlumb_DefaultScope"};
if(bo){aa.extend(this.Defaults,bo)
}this.logEnabled=this.Defaults.LogEnabled;
var cj={},bC={};
this.registerConnectionType=function(ao,an){cj[ao]=aa.extend({},an)
};
this.registerConnectionTypes=function(ao){for(var an in ao){cj[an]=aa.extend({},ao[an])
}};
this.registerEndpointType=function(ao,an){bC[ao]=aa.extend({},an)
};
this.registerEndpointTypes=function(ao){for(var an in ao){bC[an]=aa.extend({},ao[an])
}};
this.getType=function(ao,an){return an==="connection"?cj[ao]:bC[ao]
};
jsPlumbUtil.EventGenerator.apply(this);
var i=this,bZ=al(),bW=i.bind,b9={},bK=1;
this.setZoom=function(ao,an){bK=ao;
if(an){i.repaintEverything()
}};
this.getZoom=function(){return bK
};
for(var ca in this.Defaults){b9[ca]=this.Defaults[ca]
}this.bind=function(ao,an){if("ready"===ao&&bl){an()
}else{bW.apply(i,[ao,an])
}};
i.importDefaults=function(ao){for(var an in ao){i.Defaults[an]=ao[an]
}};
i.restoreDefaults=function(){i.Defaults=aa.extend({},b9)
};
var bh=null,t=null,bl=false,a={},bS={},bR={},bE={},f={},r={},k={},b=[],bH=[],G=this.Defaults.Scope,s=null,w=function(ao,aq,ap){var an=ao[aq];
if(an==null){an=[];
ao[aq]=an
}an.push(ap);
return an
},bQ=function(ao,an){if(i.Defaults.Container){aa.CurrentLibrary.appendElement(ao,i.Defaults.Container)
}else{if(!an){jsPlumbAdapter.appendToRoot(ao)
}else{aa.CurrentLibrary.appendElement(ao,an)
}}},b8=1,bA=function(){return""+b8++
},b2=function(an){return an._nodes?an._nodes:an
},E=function(ar,ao,aq){if(!jsPlumbAdapter.headless&&!ce){var an=ak(ar,"id"),ap=i.dragManager.getElementsForDraggable(an);
if(aq==null){aq=X()
}i.anchorManager.redraw(an,ao,aq);
if(ap){for(var at in ap){i.anchorManager.redraw(ap[at].id,ao,aq,ap[at].offset)
}}}},b4=function(at,aq){var ao=null;
if(ac(at)){ao=[];
for(var ap=0;
ap<at.length;
ap++){var ar=T(at[ap]),an=ak(ar,"id");
ao.push(aq(ar,an))
}}else{var ar=T(at),an=ak(ar,"id");
ao=aq(ar,an)
}return ao
},br=function(an){return bR[an]
},A=function(aw,ap,at){if(!jsPlumbAdapter.headless){var aq=ap==null?false:ap,av=aa.CurrentLibrary;
if(aq){if(av.isDragSupported(aw)&&!av.isAlreadyDraggable(aw)){var ar=at||i.Defaults.DragOptions||aa.Defaults.DragOptions;
ar=aa.extend({},ar);
var au=av.dragEvents.drag,ao=av.dragEvents.stop,ax=av.dragEvents.start;
ar[ax]=by(ar[ax],function(){i.setHoverSuspended(true)
});
ar[au]=by(ar[au],function(){var ay=av.getUIPosition(arguments,i.getZoom());
E(aw,ay);
I(aw,"jsPlumb_dragged")
});
ar[ao]=by(ar[ao],function(){var ay=av.getUIPosition(arguments,i.getZoom());
E(aw,ay);
ab(aw,"jsPlumb_dragged");
i.setHoverSuspended(false)
});
var an=bp(aw);
k[an]=true;
var aq=k[an];
ar.disabled=aq==null?false:!aq;
av.initDraggable(aw,ar,false);
i.dragManager.register(aw)
}}}},cb=function(ao,av){var at=aa.extend({sourceIsNew:true,targetIsNew:true},ao);
if(av){aa.extend(at,av)
}if(at.source&&at.source.endpoint){at.sourceEndpoint=at.source
}if(at.source&&at.target.endpoint){at.targetEndpoint=at.target
}if(ao.uuids){at.sourceEndpoint=br(ao.uuids[0]);
at.targetEndpoint=br(ao.uuids[1])
}if(at.sourceEndpoint&&at.sourceEndpoint.isFull()){Z(i,"could not add connection; source endpoint is full");
return
}if(at.targetEndpoint&&at.targetEndpoint.isFull()){Z(i,"could not add connection; target endpoint is full");
return
}if(at.sourceEndpoint){at.sourceIsNew=false
}if(at.targetEndpoint){at.targetIsNew=false
}if(!at.type&&at.sourceEndpoint){at.type=at.sourceEndpoint.connectionType
}if(at.sourceEndpoint&&at.sourceEndpoint.connectorOverlays){at.overlays=at.overlays||[];
for(var aq=0;
aq<at.sourceEndpoint.connectorOverlays.length;
aq++){at.overlays.push(at.sourceEndpoint.connectorOverlays[aq])
}}at.tooltip=ao.tooltip;
if(!at.tooltip&&at.sourceEndpoint&&at.sourceEndpoint.connectorTooltip){at.tooltip=at.sourceEndpoint.connectorTooltip
}if(at.target&&!at.target.endpoint&&!at.targetEndpoint&&!at.newConnection){var ap=bp(at.target),an=cm[ap],au=b3[ap];
if(an){if(!bB[ap]){return
}var ar=au!=null?au:i.addEndpoint(at.target,an);
if(p[ap]){b3[ap]=ar
}at.targetEndpoint=ar;
ar._makeTargetCreator=true;
at.targetIsNew=true
}}if(at.source&&!at.source.endpoint&&!at.sourceEndpoint&&!at.newConnection){var ap=bp(at.source),an=cc[ap],au=ch[ap];
if(an){if(!bJ[ap]){return
}var ar=au!=null?au:i.addEndpoint(at.source,an);
if(a0[ap]){ch[ap]=ar
}at.sourceEndpoint=ar;
at.sourceIsNew=true
}}return at
},bI=function(an){var ap=i.Defaults.ConnectionType||i.getDefaultConnectionType(),aq=i.Defaults.EndpointType||bG,ar=aa.CurrentLibrary.getParent;
if(an.container){an.parent=an.container
}else{if(an.sourceEndpoint){an.parent=an.sourceEndpoint.parent
}else{if(an.source.constructor==aq){an.parent=an.source.parent
}else{an.parent=ar(an.source)
}}}an._jsPlumb=i;
var ao=new ap(an);
ao.id="con_"+bA();
d("click","click",ao);
d("dblclick","dblclick",ao);
d("contextmenu","contextmenu",ao);
return ao
},c=function(ap,ao,an){ao=ao||{};
if(!ap.suspendedEndpoint){w(a,ap.scope,ap)
}if(!ao.doNotFireConnectionEvent&&ao.fireEvent!==false){var aq={connection:ap,source:ap.source,target:ap.target,sourceId:ap.sourceId,targetId:ap.targetId,sourceEndpoint:ap.endpoints[0],targetEndpoint:ap.endpoints[1]};
i.fire("jsPlumbConnection",aq,an);
i.fire("connection",aq,an)
}i.anchorManager.newConnection(ap);
E(ap.source)
},d=function(an,ap,ao){ao.bind(an,function(aq,ar){i.fire(ap,ao,ar)
})
},bq=function(ao){if(ao.container){return ao.container
}else{var an=aa.CurrentLibrary.getTagName(ao.source),ap=aa.CurrentLibrary.getParent(ao.source);
if(an&&an.toLowerCase()==="td"){return aa.CurrentLibrary.getParent(ap)
}else{return ap
}}},b6=function(ao){var ap=i.Defaults.EndpointType||bG;
ao.parent=bq(ao);
ao._jsPlumb=i;
var an=new ap(ao);
an.id="ep_"+bA();
d("click","endpointClick",an);
d("dblclick","endpointDblClick",an);
d("contextmenu","contextmenu",an);
if(!jsPlumbAdapter.headless){i.dragManager.endpointAdded(ao.source)
}return an
},y=function(at,ao,ap){var ar=bS[at];
if(ar&&ar.length){for(var aq=0;
aq<ar.length;
aq++){for(var au=0;
au<ar[aq].connections.length;
au++){var an=ao(ar[aq].connections[au]);
if(an){return
}}if(ap){ap(ar[aq])
}}}},q=function(ao){for(var an in bS){y(an,ao)
}},bs=function(an,ao){if(an!=null&&an.parentNode!=null){an.parentNode.removeChild(an)
}},bO=function(ao,ap){for(var an=0;
an<ao.length;
an++){bs(ao[an],ap)
}},m=function(ao,an){return b4(ao,function(aq,ap){k[ap]=an;
if(aa.CurrentLibrary.isDragSupported(aq)){aa.CurrentLibrary.setDraggable(aq,an)
}})
},cg=function(aq,ap,ao){ap=ap==="block";
var ar=null;
if(ao){if(ap){ar=function(at){at.setVisible(true,true,true)
}
}else{ar=function(at){at.setVisible(false,true,true)
}
}}var an=ak(aq,"id");
y(an,function(at){if(ap&&ao){var au=at.sourceId===an?1:0;
if(at.endpoints[au].isVisible()){at.setVisible(true)
}}else{at.setVisible(ap)
}},ar)
},o=function(an){return b4(an,function(ap,aq){var ao=k[aq]==null?false:k[aq];
ao=!ao;
k[aq]=ao;
aa.CurrentLibrary.setDraggable(ap,ao);
return ao
})
},bV=function(an,ao){var ap=null;
if(ao){ap=function(ar){var aq=ar.isVisible();
ar.setVisible(!aq)
}
}y(an,function(aq){var ar=aq.isVisible();
aq.setVisible(!ar)
},ap)
},u=function(an){var aq=an.timestamp,ap=an.recalc,ao=an.offset,at=an.elId;
if(ce&&!aq){aq=F
}if(!ap){if(aq&&aq===f[at]){return bE[at]
}}if(ap||!ao){var ar=T(at);
if(ar!=null){bH[at]=am(ar);
bE[at]=S(ar,i);
f[at]=aq
}}else{bE[at]=ao;
if(bH[at]==null){var ar=T(at);
if(ar!=null){bH[at]=am(ar)
}}}if(bE[at]&&!bE[at].right){bE[at].right=bE[at].left+bH[at][0];
bE[at].bottom=bE[at].top+bH[at][1];
bE[at].width=bH[at][0];
bE[at].height=bH[at][1];
bE[at].centerx=bE[at].left+(bE[at].width/2);
bE[at].centery=bE[at].top+(bE[at].height/2)
}return bE[at]
},bX=function(an){var ao=bE[an];
if(!ao){ao=u({elId:an})
}return{o:ao,s:bH[an]}
},bp=function(ap,ar,ao){var aq=T(ap);
var an=ak(aq,"id");
if(!an||an=="undefined"){if(arguments.length==2&&arguments[1]!=undefined){an=ar
}else{if(arguments.length==1||(arguments.length==3&&!arguments[2])){an="jsPlumb_"+bZ+"_"+bA()
}}if(!ao){aj(aq,"id",an)
}}return an
},by=function(ao,an,ap){ao=ao||function(){};
an=an||function(){};
return function(){var ar=null;
try{ar=an.apply(this,arguments)
}catch(aq){Z(i,"jsPlumb function failed : "+aq)
}if(ap==null||(ar!==ap)){try{ao.apply(this,arguments)
}catch(aq){Z(i,"wrapped function failed : "+aq)
}}return ar
}
};
this.connectorClass="_jsPlumb_connector";
this.endpointClass="_jsPlumb_endpoint";
this.overlayClass="_jsPlumb_overlay";
this.Anchors={};
this.Connectors={canvas:{},svg:{},vml:{}};
this.Endpoints={canvas:{},svg:{},vml:{}};
this.Overlays={canvas:{},svg:{},vml:{}};
this.addClass=function(ao,an){return aa.CurrentLibrary.addClass(ao,an)
};
this.removeClass=function(ao,an){return aa.CurrentLibrary.removeClass(ao,an)
};
this.hasClass=function(ao,an){return aa.CurrentLibrary.hasClass(ao,an)
};
this.addEndpoint=function(aB,aA,ap){ap=ap||{};
var an=aa.extend({},ap);
aa.extend(an,aA);
an.endpoint=an.endpoint||i.Defaults.Endpoint||aa.Defaults.Endpoint;
an.paintStyle=an.paintStyle||i.Defaults.EndpointStyle||aa.Defaults.EndpointStyle;
aB=b2(aB);
var az=[],aw=aB.length&&aB.constructor!=String?aB:[aB];
for(var ay=0;
ay<aw.length;
ay++){var at=T(aw[ay]),ao=bp(at);
an.source=at;
u({elId:ao,timestamp:F});
var au=b6(an);
if(an.parentAnchor){au.parentAnchor=an.parentAnchor
}w(bS,ao,au);
var av=bE[ao],ax=bH[ao];
var ar=au.anchor.compute({xy:[av.left,av.top],wh:ax,element:au,timestamp:F});
var aq={anchorLoc:ar,timestamp:F};
if(ce){aq.recalc=false
}au.paint(aq);
az.push(au)
}return az.length==1?az[0]:az
};
this.addEndpoints=function(ao,at,aq){var ap=[];
for(var ar=0;
ar<at.length;
ar++){var an=i.addEndpoint(ao,at[ar],aq);
if(ac(an)){Array.prototype.push.apply(ap,an)
}else{ap.push(an)
}}return ap
};
this.animate=function(at,au,ar){var aq=T(at),an=ak(at,"id");
ar=ar||{};
var ao=aa.CurrentLibrary.dragEvents.step;
var ap=aa.CurrentLibrary.dragEvents.complete;
ar[ao]=by(ar[ao],function(){i.repaint(an)
});
ar[ap]=by(ar[ap],function(){i.repaint(an)
});
aa.CurrentLibrary.animate(aq,au,ar)
};
this.checkCondition=function(ar,ao){var aq=i.getListener(ar),ap=true;
if(aq&&aq.length>0){try{for(var at=0;
at<aq.length;
at++){ap=ap&&aq[at](ao)
}}catch(an){Z(i,"cannot check condition ["+ar+"]"+an)
}}return ap
};
this.checkASyncCondition=function(ar,ao,aq,at){var ap=i.getListener(ar);
if(ap&&ap.length>0){try{ap[0](ao,aq,at)
}catch(an){Z(i,"cannot asynchronously check condition ["+ar+"]"+an)
}}};
this.connect=function(ao,aq){var an=cb(ao,aq),ap;
if(an){if(an.deleteEndpointsOnDetach==null){an.deleteEndpointsOnDetach=true
}ap=bI(an);
c(ap,an)
}return ap
};
this.deleteEndpoint=function(au){var an=(typeof au=="string")?bR[au]:au;
if(an){var ar=an.getUuid();
if(ar){bR[ar]=null
}an.detachAll();
if(an.endpoint.cleanup){an.endpoint.cleanup()
}bO(an.endpoint.getDisplayElements());
i.anchorManager.deleteEndpoint(an);
for(var ao in bS){var aq=bS[ao];
if(aq){var ap=[];
for(var at=0;
at<aq.length;
at++){if(aq[at]!=an){ap.push(aq[at])
}}bS[ao]=ap
}}if(!jsPlumbAdapter.headless){i.dragManager.endpointDeleted(an)
}}};
this.deleteEveryEndpoint=function(){i.setSuspendDrawing(true);
for(var ao in bS){var an=bS[ao];
if(an&&an.length){for(var ap=0;
ap<an.length;
ap++){i.deleteEndpoint(an[ap])
}}}bS={};
bR={};
i.setSuspendDrawing(false,true)
};
var bg=function(aq,an,ap){var ar=i.Defaults.ConnectionType||i.getDefaultConnectionType(),at=aq.constructor==ar,ao=at?{connection:aq,source:aq.source,target:aq.target,sourceId:aq.sourceId,targetId:aq.targetId,sourceEndpoint:aq.endpoints[0],targetEndpoint:aq.endpoints[1]}:aq;
if(an){i.fire("jsPlumbConnectionDetached",ao,ap);
i.fire("connectionDetached",ao,ap)
}i.anchorManager.connectionDetached(ao)
},cf=function(an){i.fire("connectionDrag",an)
},bU=function(an){i.fire("connectionDragStop",an)
};
this.detach=function(){if(arguments.length==0){return
}var av=i.Defaults.ConnectionType||i.getDefaultConnectionType(),au=arguments[0].constructor==av,aw=arguments.length==2?au?(arguments[1]||{}):arguments[0]:arguments[0],aq=(aw.fireEvent!==false),an=aw.forceDetach,ao=au?arguments[0]:aw.connection;
if(ao){if(an||(ao.isDetachAllowed(ao)&&ao.endpoints[0].isDetachAllowed(ao)&&ao.endpoints[1].isDetachAllowed(ao))){if(an||i.checkCondition("beforeDetach",ao)){ao.endpoints[0].detach(ao,false,true,aq)
}}}else{var ap=aa.extend({},aw);
if(ap.uuids){br(ap.uuids[0]).detachFrom(br(ap.uuids[1]),aq)
}else{if(ap.sourceEndpoint&&ap.targetEndpoint){ap.sourceEndpoint.detachFrom(ap.targetEndpoint)
}else{var ar=bp(ap.source),at=bp(ap.target);
y(ar,function(ax){if((ax.sourceId==ar&&ax.targetId==at)||(ax.targetId==ar&&ax.sourceId==at)){if(i.checkCondition("beforeDetach",ax)){ax.endpoints[0].detach(ax,false,true,aq)
}}})
}}}};
this.detachAllConnections=function(aq,ap){ap=ap||{};
aq=T(aq);
var an=ak(aq,"id"),ao=bS[an];
if(ao&&ao.length){for(var ar=0;
ar<ao.length;
ar++){ao[ar].detachAll(ap.fireEvent)
}}};
this.detachEveryConnection=function(ap){ap=ap||{};
for(var ao in bS){var an=bS[ao];
if(an&&an.length){for(var aq=0;
aq<an.length;
aq++){an[aq].detachAll(ap.fireEvent)
}}}a={}
};
this.draggable=function(ap,ao){if(typeof ap=="object"&&ap.length){for(var aq=0;
aq<ap.length;
aq++){var an=T(ap[aq]);
if(an){A(an,true,ao)
}}}else{if(ap._nodes){for(var aq=0;
aq<ap._nodes.length;
aq++){var an=T(ap._nodes[aq]);
if(an){A(an,true,ao)
}}}else{var an=T(ap);
if(an){A(an,true,ao)
}}}};
this.extend=function(ao,an){return aa.CurrentLibrary.extend(ao,an)
};
this.getDefaultEndpointType=function(){return bG
};
this.getDefaultConnectionType=function(){return bn
};
var g=function(an,ap,ar,ao){for(var aq=0;
aq<an.length;
aq++){an[aq][ap].apply(an[aq],ar)
}return ao(an)
},C=function(an,ap,ar){var ao=[];
for(var aq=0;
aq<an.length;
aq++){ao.push([an[aq][ap].apply(an[aq],ar),an[aq]])
}return ao
},bx=function(ao,ap,an){return function(){return g(ao,ap,arguments,an)
}
},cd=function(ao,an){return function(){return C(ao,an,arguments)
}
},e=function(ao,an){var ap=[];
if(ao){if(typeof ao=="string"){if(ao==="*"){return ao
}ap.push(ao)
}else{if(an){ap=ao
}else{for(var aq=0;
aq<ao.length;
aq++){ap.push(bp(T(ao[aq])))
}}}}return ap
},b5=function(ao,ap,an){if(ao==="*"){return true
}return ao.length>0?L(ao,ap)!=-1:!an
};
this.getConnections=function(ar,ao){if(!ar){ar={}
}else{if(ar.constructor==String){ar={scope:ar}
}}var at=ar.scope||i.getDefaultScope(),au=e(at,true),ap=e(ar.source),aw=e(ar.target),ax=(!ao&&au.length>1)?{}:[],aq=function(aA,az){if(!ao&&au.length>1){var aB=ax[aA];
if(aB==null){aB=[];
ax[aA]=aB
}aB.push(az)
}else{ax.push(az)
}};
for(var ay in a){if(b5(au,ay)){for(var an=0;
an<a[ay].length;
an++){var av=a[ay][an];
if(b5(ap,av.sourceId)&&b5(aw,av.targetId)){aq(ay,av)
}}}}return ax
};
var bk=function(an,ao){return function(ap){for(var aq=0;
aq<an.length;
aq++){ap(an[aq])
}return ao(an)
}
},bf=function(an){return function(ao){return an[ao]
}
};
var bd=function(an,ao){return{setHover:bx(an,"setHover",ao),removeAllOverlays:bx(an,"removeAllOverlays",ao),setLabel:bx(an,"setLabel",ao),addOverlay:bx(an,"addOverlay",ao),removeOverlay:bx(an,"removeOverlay",ao),removeOverlays:bx(an,"removeOverlays",ao),showOverlay:bx(an,"showOverlay",ao),hideOverlay:bx(an,"hideOverlay",ao),showOverlays:bx(an,"showOverlays",ao),hideOverlays:bx(an,"hideOverlays",ao),setPaintStyle:bx(an,"setPaintStyle",ao),setHoverPaintStyle:bx(an,"setHoverPaintStyle",ao),setParameter:bx(an,"setParameter",ao),setParameters:bx(an,"setParameters",ao),setVisible:bx(an,"setVisible",ao),setZIndex:bx(an,"setZIndex",ao),repaint:bx(an,"repaint",ao),addType:bx(an,"addType",ao),toggleType:bx(an,"toggleType",ao),removeType:bx(an,"removeType",ao),getLabel:cd(an,"getLabel"),getOverlay:cd(an,"getOverlay"),isHover:cd(an,"isHover"),getParameter:cd(an,"getParameter"),getParameters:cd(an,"getParameters"),getPaintStyle:cd(an,"getPaintStyle"),getHoverPaintStyle:cd(an,"getHoverPaintStyle"),isVisible:cd(an,"isVisible"),getZIndex:cd(an,"getZIndex"),hasType:cd(an,"hasType"),getType:cd(an,"getType"),length:an.length,each:bk(an,ao),get:bf(an)}
};
var b0=function(ao){var an=bd(ao,b0);
return aa.CurrentLibrary.extend(an,{setDetachable:bx(ao,"setDetachable",b0),setReattach:bx(ao,"setReattach",b0),setConnector:bx(ao,"setConnector",b0),detach:function(){for(var ap=0;
ap<ao.length;
ap++){i.detach(ao[ap])
}},isDetachable:cd(ao,"isDetachable"),isReattach:cd(ao,"isReattach")})
};
var B=function(ao){var an=bd(ao,B);
return aa.CurrentLibrary.extend(an,{setEnabled:bx(ao,"setEnabled",B),isEnabled:cd(ao,"isEnabled"),detachAll:function(){for(var ap=0;
ap<ao.length;
ap++){ao[ap].detachAll()
}},"delete":function(){for(var ap=0;
ap<ao.length;
ap++){i.deleteEndpoint(ao[ap])
}}})
};
this.select=function(an){an=an||{};
an.scope=an.scope||"*";
var ao=i.getConnections(an,true);
return b0(ao)
};
this.selectEndpoints=function(az){az=az||{};
az.scope=az.scope||"*";
var at=!az.element&&!az.source&&!az.target,ao=at?"*":e(az.element),an=at?"*":e(az.source),ax=at?"*":e(az.target),aq=e(az.scope,true);
var ap=[];
for(var aB in bS){var aD=b5(ao,aB,true),av=b5(an,aB,true),aC=an!="*",aw=b5(ax,aB,true),aE=ax!="*";
if(aD||av||aw){inner:for(var ay=0;
ay<bS[aB].length;
ay++){var au=bS[aB][ay];
if(b5(aq,au.scope,true)){var ar=(aC&&an.length>0&&!au.isSource),aA=(aE&&ax.length>0&&!au.isTarget);
if(ar||aA){continue inner
}ap.push(au)
}}}}return B(ap)
};
this.getAllConnections=function(){return a
};
this.getDefaultScope=function(){return G
};
this.getEndpoint=br;
this.getEndpoints=function(an){return bS[bp(an)]
};
this.getId=bp;
this.getOffset=function(ao){var an=bE[ao];
return u({elId:ao})
};
this.getSelector=function(an){return aa.CurrentLibrary.getSelector(an)
};
this.getSize=function(ao){var an=bH[ao];
if(!an){u({elId:ao})
}return bH[ao]
};
this.appendElement=bQ;
var bT=false;
this.isHoverSuspended=function(){return bT
};
this.setHoverSuspended=function(an){bT=an
};
var bP=function(an){return function(){return jsPlumbAdapter.isRenderModeAvailable(an)
}
};
this.isCanvasAvailable=bP("canvas");
this.isSVGAvailable=bP("svg");
this.isVMLAvailable=bP("vml");
this.hide=function(an,ao){cg(an,"none",ao)
};
this.idstamp=bA;
this.init=function(){if(!bl){i.setRenderMode(i.Defaults.RenderMode);
var an=function(ao){aa.CurrentLibrary.bind(document,ao,function(aq){if(!i.currentlyDragging&&s==aa.CANVAS){for(var ar in a){var ap=a[ar];
for(var au=0;
au<ap.length;
au++){var av=ap[au].connector[ao](aq);
if(av){return
}}}for(var at in bS){var aw=bS[at];
for(var au=0;
au<aw.length;
au++){if(aw[au].endpoint[ao](aq)){return
}}}}})
};
an("click");
an("dblclick");
an("mousemove");
an("mousedown");
an("mouseup");
an("contextmenu");
bl=true;
i.fire("ready")
}};
this.log=bh;
this.jsPlumbUIComponent=W;
this.makeAnchor=function(){if(arguments.length==0){return null
}var an=arguments[0],ar=arguments[1],at=arguments[2],aq=null;
if(an.compute&&an.getOrientation){return an
}else{if(typeof an=="string"){aq=aa.Anchors[arguments[0]]({elementId:ar,jsPlumbInstance:i})
}else{if(ac(an)){if(ac(an[0])||H(an[0])){if(an.length==2&&H(an[0])&&O(an[1])){var ap=aa.extend({elementId:ar,jsPlumbInstance:i},an[1]);
aq=aa.Anchors[an[0]](ap)
}else{aq=new bu(an,null,ar)
}}else{var ao={x:an[0],y:an[1],orientation:(an.length>=4)?[an[2],an[3]]:[0,0],offsets:(an.length==6)?[an[4],an[5]]:[0,0],elementId:ar};
aq=new bM(ao);
aq.clone=function(){return new bM(ao)
}
}}}}if(!aq.id){aq.id="anchor_"+bA()
}return aq
};
this.makeAnchors=function(ap,ar,ao){var an=[];
for(var aq=0;
aq<ap.length;
aq++){if(typeof ap[aq]=="string"){an.push(aa.Anchors[ap[aq]]({elementId:ar,jsPlumbInstance:ao}))
}else{if(ac(ap[aq])){an.push(i.makeAnchor(ap[aq],ar,ao))
}}}return an
};
this.makeDynamicAnchor=function(an,ao){return new bu(an,ao)
};
var cm={},b3={},p={},bv={},bL=function(an,ao){an.paintStyle=an.paintStyle||i.Defaults.EndpointStyles[ao]||i.Defaults.EndpointStyle||aa.Defaults.EndpointStyles[ao]||aa.Defaults.EndpointStyle;
an.hoverPaintStyle=an.hoverPaintStyle||i.Defaults.EndpointHoverStyles[ao]||i.Defaults.EndpointHoverStyle||aa.Defaults.EndpointHoverStyles[ao]||aa.Defaults.EndpointHoverStyle;
an.anchor=an.anchor||i.Defaults.Anchors[ao]||i.Defaults.Anchor||aa.Defaults.Anchors[ao]||aa.Defaults.Anchor;
an.endpoint=an.endpoint||i.Defaults.Endpoints[ao]||i.Defaults.Endpoint||aa.Defaults.Endpoints[ao]||aa.Defaults.Endpoint
};
this.makeTarget=function(ay,ax,aq){var ao=aa.extend({_jsPlumb:i},aq);
aa.extend(ao,ax);
bL(ao,1);
var at=aa.CurrentLibrary,ar=ao.scope||i.Defaults.Scope,aw=!(ao.deleteEndpointsOnDetach===false),an=ao.maxConnections||-1,ap=ao.onMaxConnections;
_doOne=function(az){var aB=bp(az);
cm[aB]=ao;
p[aB]=ao.uniqueEndpoint,bv[aB]=an,bB[aB]=true,proxyComponent=new W(ao);
var aC=aa.extend({},ao.dropOptions||{}),aD=function(){var aL=aa.CurrentLibrary.getDropEvent(arguments),aJ=i.select({target:aB}).length;
i.currentlyDragging=false;
var aO=T(at.getDragObject(arguments)),aK=ak(aO,"dragId"),aQ=ak(aO,"originalScope"),aE=r[aK],aM=aE.endpoints[0],aN=ao.endpoint?aa.extend({},ao.endpoint):{};
if(!bB[aB]||bv[aB]>0&&aJ>=bv[aB]){if(ap){ap({element:az,connection:aE},aL)
}return false
}aM.anchor.locked=false;
if(aQ){at.setDragScope(aO,aQ)
}var aG=proxyComponent.isDropAllowed(aE.sourceId,bp(az),aE.scope,aE,null);
if(aE.endpointsToDeleteOnDetach){if(aM===aE.endpointsToDeleteOnDetach[0]){aE.endpointsToDeleteOnDetach[0]=null
}else{if(aM===aE.endpointsToDeleteOnDetach[1]){aE.endpointsToDeleteOnDetach[1]=null
}}}if(aE.suspendedEndpoint){aE.targetId=aE.suspendedEndpoint.elementId;
aE.target=at.getElementObject(aE.suspendedEndpoint.elementId);
aE.endpoints[1]=aE.suspendedEndpoint
}if(aG){aM.detach(aE,false,true,false);
var aP=b3[aB]||i.addEndpoint(az,ao);
if(ao.uniqueEndpoint){b3[aB]=aP
}aP._makeTargetCreator=true;
if(aP.anchor.positionFinder!=null){var aS=at.getUIPosition(arguments,i.getZoom()),aH=S(az,i),aR=am(az),aI=aP.anchor.positionFinder(aS,aH,aR,aP.anchor.constructorParams);
aP.anchor.x=aI[0];
aP.anchor.y=aI[1]
}var aF=i.connect({source:aM,target:aP,scope:aQ,previousConnection:aE,container:aE.parent,deleteEndpointsOnDetach:aw,doNotFireConnectionEvent:aM.endpointWillMoveAfterConnection});
if(aE.endpoints[1]._makeTargetCreator&&aE.endpoints[1].connections.length<2){i.deleteEndpoint(aE.endpoints[1])
}if(aw){aF.endpointsToDeleteOnDetach=[aM,aP]
}aF.repaint()
}else{if(aE.suspendedEndpoint){if(aE.isReattach()){aE.setHover(false);
aE.floatingAnchorIndex=null;
aE.suspendedEndpoint.addConnection(aE);
i.repaint(aM.elementId)
}else{aM.detach(aE,false,true,true,aL)
}}}};
var aA=at.dragEvents.drop;
aC.scope=aC.scope||ar;
aC[aA]=by(aC[aA],aD);
at.initDroppable(az,aC,true)
};
ay=b2(ay);
var au=ay.length&&ay.constructor!=String?ay:[ay];
for(var av=0;
av<au.length;
av++){_doOne(T(au[av]))
}return i
};
this.unmakeTarget=function(ap,ao){ap=aa.CurrentLibrary.getElementObject(ap);
var an=bp(ap);
if(!ao){delete cm[an];
delete p[an];
delete bv[an];
delete bB[an]
}return i
};
this.makeTargets=function(ap,ao,an){for(var aq=0;
aq<ap.length;
aq++){i.makeTarget(ap[aq],ao,an)
}};
var cc={},ch={},a0={},bJ={},bm={},bi={},bB={};
this.makeSource=function(aw,av,aq){var an=aa.extend({},aq);
aa.extend(an,av);
bL(an,0);
var ar=aa.CurrentLibrary,ax=an.maxConnections||-1,ao=an.onMaxConnections,ap=function(aC){var aI=bp(aC),aB=an.parent,aJ=aB!=null?i.getId(ar.getElementObject(aB)):aI;
cc[aJ]=an;
a0[aJ]=an.uniqueEndpoint;
bJ[aJ]=true;
var aH=ar.dragEvents.stop,aD=ar.dragEvents.drag,aA=aa.extend({},an.dragOptions||{}),aF=aA.drag,az=aA.stop,ay=null,aE=false;
bi[aJ]=ax;
aA.scope=aA.scope||an.scope;
aA[aD]=by(aA[aD],function(){if(aF){aF.apply(this,arguments)
}aE=false
});
aA[aH]=by(aA[aH],function(){if(az){az.apply(this,arguments)
}i.currentlyDragging=false;
if(ay.connections.length==0){i.deleteEndpoint(ay)
}else{ar.unbind(ay.canvas,"mousedown");
var aO=an.anchor||i.Defaults.Anchor,aN=ay.anchor,aL=ay.connections[0];
ay.anchor=i.makeAnchor(aO,aI,i);
if(an.parent){var aM=ar.getElementObject(an.parent);
if(aM){var aP=ay.elementId;
var aK=an.container||i.Defaults.Container||aa.Defaults.Container;
ay.setElement(aM,aK);
ay.endpointWillMoveAfterConnection=false;
i.anchorManager.rehomeEndpoint(aP,aM);
aL.previousConnection=null;
Y(a[aL.scope],function(aQ){return aQ.id===aL.id
});
i.anchorManager.connectionDetached({sourceId:aL.sourceId,targetId:aL.targetId,connection:aL});
c(aL)
}}ay.repaint();
i.repaint(ay.elementId);
i.repaint(aL.targetId)
}});
var aG=function(aW){if(!bJ[aJ]){return
}var aL=i.select({source:aJ}).length;
if(bi[aJ]>=0&&aL>=bi[aJ]){if(ao){ao({element:aC,maxConnections:ax},aW)
}return false
}if(av.filter){var aN=av.filter(ar.getOriginalEvent(aW),aC);
if(aN===false){return
}}var aS=u({elId:aI});
var aT=((aW.pageX||aW.page.x)-aS.left)/aS.width,aU=((aW.pageY||aW.page.y)-aS.top)/aS.height,aO=aT,aP=aU;
if(an.parent){var aV=ar.getElementObject(an.parent),aK=bp(aV);
aS=u({elId:aK});
aO=((aW.pageX||aW.page.x)-aS.left)/aS.width,aP=((aW.pageY||aW.page.y)-aS.top)/aS.height
}var aQ={};
aa.extend(aQ,an);
aQ.isSource=true;
aQ.anchor=[aT,aU,0,0];
aQ.parentAnchor=[aO,aP,0,0];
aQ.dragOptions=aA;
if(an.parent){var aM=aQ.container||i.Defaults.Container||aa.Defaults.Container;
if(aM){aQ.container=aM
}else{aQ.container=aa.CurrentLibrary.getParent(an.parent)
}}ay=i.addEndpoint(aI,aQ);
aE=true;
ay.endpointWillMoveAfterConnection=an.parent!=null;
ay.endpointWillMoveTo=an.parent?ar.getElementObject(an.parent):null;
var aR=function(){if(aE){i.deleteEndpoint(ay)
}};
i.registerListener(ay.canvas,"mouseup",aR);
i.registerListener(aC,"mouseup",aR);
ar.trigger(ay.canvas,"mousedown",aW)
};
i.registerListener(aC,"mousedown",aG);
bm[aI]=aG
};
aw=b2(aw);
var at=aw.length&&aw.constructor!=String?aw:[aw];
for(var au=0;
au<at.length;
au++){ap(T(at[au]))
}return i
};
this.unmakeSource=function(aq,ap){aq=aa.CurrentLibrary.getElementObject(aq);
var ao=bp(aq),an=bm[ao];
if(an){i.unregisterListener(_el,"mousedown",an)
}if(!ap){delete cc[ao];
delete a0[ao];
delete bJ[ao];
delete bm[ao];
delete bi[ao]
}return i
};
this.unmakeEverySource=function(){for(var an in bJ){i.unmakeSource(an,true)
}cc={};
a0={};
bJ={};
bm={}
};
this.unmakeEveryTarget=function(){for(var an in bB){i.unmakeTarget(an,true)
}cm={};
p={};
bv={};
bB={};
return i
};
this.makeSources=function(ap,ao,an){for(var aq=0;
aq<ap.length;
aq++){i.makeSource(ap[aq],ao,an)
}return i
};
var bY=function(ap,ar,ao,aq){var au=ap=="source"?bJ:bB;
if(H(ar)){au[ar]=aq?!au[ar]:ao
}else{if(ar.length){ar=b2(ar);
for(var at=0;
at<ar.length;
at++){var an=_el=aa.CurrentLibrary.getElementObject(ar[at]),an=bp(_el);
au[an]=aq?!au[an]:ao
}}}return i
};
this.setSourceEnabled=function(an,ao){return bY("source",an,ao)
};
this.toggleSourceEnabled=function(an){bY("source",an,null,true);
return i.isSourceEnabled(an)
};
this.isSource=function(an){an=aa.CurrentLibrary.getElementObject(an);
return bJ[bp(an)]!=null
};
this.isSourceEnabled=function(an){an=aa.CurrentLibrary.getElementObject(an);
return bJ[bp(an)]===true
};
this.setTargetEnabled=function(an,ao){return bY("target",an,ao)
};
this.toggleTargetEnabled=function(an){return bY("target",an,null,true);
return i.isTargetEnabled(an)
};
this.isTarget=function(an){an=aa.CurrentLibrary.getElementObject(an);
return bB[bp(an)]!=null
};
this.isTargetEnabled=function(an){an=aa.CurrentLibrary.getElementObject(an);
return bB[bp(an)]===true
};
this.ready=function(an){i.bind("ready",an)
};
this.repaint=function(aq,ao,ap){if(typeof aq=="object"){for(var an=0;
an<aq.length;
an++){E(T(aq[an]),ao,ap)
}}else{E(T(aq),ao,ap)
}return i
};
this.repaintEverything=function(){for(var an in bS){E(T(an))
}return i
};
this.removeAllEndpoints=function(ap){var ao=ak(ap,"id"),an=bS[ao];
if(an){for(var aq=0;
aq<an.length;
aq++){i.deleteEndpoint(an[aq])
}}bS[ao]=[];
return i
};
var bF={},v=function(){for(var ap in bF){for(var an=0;
an<bF[ap].length;
an++){var ao=bF[ap][an];
aa.CurrentLibrary.unbind(ao.el,ao.event,ao.listener)
}}bF={}
};
this.registerListener=function(ap,an,ao){aa.CurrentLibrary.bind(ap,an,ao);
w(bF,an,{el:ap,event:an,listener:ao})
};
this.unregisterListener=function(ap,an,ao){aa.CurrentLibrary.unbind(ap,an,ao);
Y(bF,function(aq){return aq.type==an&&aq.listener==ao
})
};
this.reset=function(){i.deleteEveryEndpoint();
i.unbind();
cm={};
b3={};
p={};
bv={};
cc={};
ch={};
a0={};
bi={};
v();
i.anchorManager.reset();
if(!jsPlumbAdapter.headless){i.dragManager.reset()
}};
this.setDefaultScope=function(an){G=an;
return i
};
this.setDraggable=m;
this.setId=function(aq,at,ao){var an=aq.constructor==String?aq:i.getId(aq),ar=i.getConnections({source:an,scope:"*"},true),au=i.getConnections({target:an,scope:"*"},true);
at=""+at;
if(!ao){aq=aa.CurrentLibrary.getElementObject(an);
aa.CurrentLibrary.setAttribute(aq,"id",at)
}aq=aa.CurrentLibrary.getElementObject(at);
bS[at]=bS[an]||[];
for(var av=0;
av<bS[at].length;
av++){bS[at][av].elementId=at;
bS[at][av].element=aq;
bS[at][av].anchor.elementId=at
}delete bS[an];
i.anchorManager.changeId(an,at);
var ap=function(az,ay,aw){for(var ax=0;
ax<az.length;
ax++){az[ax].endpoints[ay].elementId=at;
az[ax].endpoints[ay].element=aq;
az[ax][aw+"Id"]=at;
az[ax][aw]=aq
}};
ap(ar,0,"source");
ap(au,1,"target")
};
this.setIdChanged=function(ao,an){i.setId(ao,an,true)
};
this.setDebugLog=function(an){bh=an
};
var ce=false,F=null;
this.setSuspendDrawing=function(ao,an){ce=ao;
if(ao){F=new Date().getTime()
}else{F=null
}if(an){i.repaintEverything()
}};
this.isSuspendDrawing=function(){return ce
};
this.CANVAS="canvas";
this.SVG="svg";
this.VML="vml";
this.setRenderMode=function(an){s=jsPlumbAdapter.setRenderMode(an);
return s
};
this.getRenderMode=function(){return s
};
this.show=function(an,ao){cg(an,"block",ao);
return i
};
this.sizeCanvas=function(aq,ap,an,ar,ao){if(aq){aq.style.height=ao+"px";
aq.height=ao;
aq.style.width=ar+"px";
aq.width=ar;
aq.style.left=ap+"px";
aq.style.top=an+"px"
}return i
};
this.getTestHarness=function(){return{endpointsByElement:bS,endpointCount:function(an){var ao=bS[an];
return ao?ao.length:0
},connectionCount:function(an){an=an||G;
var ao=a[an];
return ao?ao.length:0
},getId:bp,makeAnchor:self.makeAnchor,makeDynamicAnchor:self.makeDynamicAnchor}
};
this.toggle=bV;
this.toggleVisible=bV;
this.toggleDraggable=o;
this.wrap=by;
this.addListener=this.bind;
var h=function(an,ar){var aq=null,ap=an;
if(ar.tagName.toLowerCase()==="svg"&&ar.parentNode){aq=ar.parentNode
}else{if(ar.offsetParent){aq=ar.offsetParent
}}if(aq!=null){var at=aq.tagName.toLowerCase()==="body"?{left:0,top:0}:S(aq,i),ao=aq.tagName.toLowerCase()==="body"?{left:0,top:0}:{left:aq.scrollLeft,top:aq.scrollTop};
ap[0]=an[0]-at.left+ao.left;
ap[1]=an[1]-at.top+ao.top
}return ap
};
var bM=function(an){var aq=this;
this.x=an.x||0;
this.y=an.y||0;
this.elementId=an.elementId;
var ar=an.orientation||[0,0];
var ap=null,ao=null;
this.offsets=an.offsets||[0,0];
aq.timestamp=null;
this.compute=function(at){var au=at.xy,ax=at.wh,aw=at.element,av=at.timestamp;
if(av&&av===aq.timestamp){return ao
}ao=[au[0]+(aq.x*ax[0])+aq.offsets[0],au[1]+(aq.y*ax[1])+aq.offsets[1]];
ao=h(ao,aw.canvas);
aq.timestamp=av;
return ao
};
this.getOrientation=function(at){return ar
};
this.equals=function(av){if(!av){return false
}var au=av.getOrientation();
var at=this.getOrientation();
return this.x==av.x&&this.y==av.y&&this.offsets[0]==av.offsets[0]&&this.offsets[1]==av.offsets[1]&&at[0]==au[0]&&at[1]==au[1]
};
this.getCurrentLocation=function(){return ao
}
};
var ck=function(ao){var aq=ao.reference,ap=ao.referenceCanvas,au=am(T(ap)),av=0,an=0,at=null,ar=null;
this.x=0;
this.y=0;
this.isFloating=true;
this.compute=function(az){var aw=az.xy,ax=az.element,ay=[aw[0]+(au[0]/2),aw[1]+(au[1]/2)];
ay=h(ay,ax.canvas);
ar=ay;
return ay
};
this.getOrientation=function(aw){if(at){return at
}else{var ax=aq.getOrientation(aw);
return[Math.abs(ax[0])*av*-1,Math.abs(ax[1])*an*-1]
}};
this.over=function(aw){at=aw.getOrientation()
};
this.out=function(){at=null
};
this.getCurrentLocation=function(){return ar
}
};
var bu=function(an,ao,au){this.isSelective=true;
this.isDynamic=true;
var aq=[],ar=this,at=function(az){return az.constructor==bM?az:i.makeAnchor(az,au,i)
};
for(var av=0;
av<an.length;
av++){aq[av]=at(an[av])
}this.addAnchor=function(az){aq.push(at(az))
};
this.getAnchors=function(){return aq
};
this.locked=false;
var ay=aq.length>0?aq[0]:null,aw=aq.length>0?0:-1,ar=this,ax=function(aB,aE,aF,aA,aG){var aH=aA[0]+(aB.x*aG[0]),az=aA[1]+(aB.y*aG[1]),aC=aA[0]+(aG[0]/2),aD=aA[1]+(aG[1]/2);
return(Math.sqrt(Math.pow(aE-aH,2)+Math.pow(aF-az,2))+Math.sqrt(Math.pow(aC-aH,2)+Math.pow(aD-az,2)))
},ap=ao||function(az,aI,aH,aG,aJ){var aE=aH[0]+(aG[0]/2),aF=aH[1]+(aG[1]/2);
var aC=-1,aA=Infinity;
for(var aD=0;
aD<aJ.length;
aD++){var aB=ax(aJ[aD],aE,aF,az,aI);
if(aB<aA){aC=aD+0;
aA=aB
}}return aJ[aC]
};
this.compute=function(aA){var aB=aA.xy,aE=aA.wh,aC=aA.timestamp,aD=aA.txy,az=aA.twh;
if(ar.locked||aD==null||az==null){return ay.compute(aA)
}else{aA.timestamp=null
}ay=ap(aB,aE,aD,az,aq);
ar.x=ay.x;
ar.y=ay.y;
return ay.compute(aA)
};
this.getCurrentLocation=function(){return ay!=null?ay.getCurrentLocation():null
};
this.getOrientation=function(az){return ay!=null?ay.getOrientation(az):[0,0]
};
this.over=function(az){if(ay!=null){ay.over(az)
}};
this.out=function(){if(ay!=null){ay.out()
}}
};
var n={},bD={},b1={},z={HORIZONTAL:"horizontal",VERTICAL:"vertical",DIAGONAL:"diagonal",IDENTITY:"identity"},l=function(at,ar,aw,az){if(at===ar){return{orientation:z.IDENTITY,a:["top","top"]}
}var ao=Math.atan2((az.centery-aw.centery),(az.centerx-aw.centerx)),ay=Math.atan2((aw.centery-az.centery),(aw.centerx-az.centerx)),ax=((aw.left<=az.left&&aw.right>=az.left)||(aw.left<=az.right&&aw.right>=az.right)||(aw.left<=az.left&&aw.right>=az.right)||(az.left<=aw.left&&az.right>=aw.right)),aq=((aw.top<=az.top&&aw.bottom>=az.top)||(aw.top<=az.bottom&&aw.bottom>=az.bottom)||(aw.top<=az.top&&aw.bottom>=az.bottom)||(az.top<=aw.top&&az.bottom>=aw.bottom));
if(!(ax||aq)){var au=null,an=false,ap=false,av=null;
if(az.left>aw.left&&az.top>aw.top){au=["right","top"]
}else{if(az.left>aw.left&&aw.top>az.top){au=["top","left"]
}else{if(az.left<aw.left&&az.top<aw.top){au=["top","right"]
}else{if(az.left<aw.left&&az.top>aw.top){au=["left","top"]
}}}}return{orientation:z.DIAGONAL,a:au,theta:ao,theta2:ay}
}else{if(ax){return{orientation:z.HORIZONTAL,a:aw.top<az.top?["bottom","top"]:["top","bottom"],theta:ao,theta2:ay}
}else{return{orientation:z.VERTICAL,a:aw.left<az.left?["right","left"]:["left","right"],theta:ao,theta2:ay}
}}},ci=function(aq,aw,ay,ax,ap,au,aE){var ao=[],aF=aw[ap?0:1]/(ax.length+1);
for(var at=0;
at<ax.length;
at++){var an=(at+1)*aF,av=au*aw[ap?1:0];
if(aE){an=aw[ap?0:1]-an
}var az=(ap?an:av),aC=ay[0]+az,aA=az/aw[0],aB=(ap?av:an),aD=ay[1]+aB,ar=aB/aw[1];
ao.push([aC,aD,aA,ar,ax[at][1],ax[at][2]])
}return ao
},be=function(ao,an){return ao[0]>an[0]?1:-1
},bN=function(an){return function(ap,aq){var ao=true;
if(an){if(ap[0][0]<aq[0][0]){ao=true
}else{ao=ap[0][1]>aq[0][1]
}}else{if(ap[0][0]>aq[0][0]){ao=true
}else{ao=ap[0][1]>aq[0][1]
}}return ao===false?-1:1
}
},bj=function(aq,ao){var an=aq[0][0]<0?-Math.PI-aq[0][0]:Math.PI-aq[0][0],ap=ao[0][0]<0?-Math.PI-ao[0][0]:Math.PI-ao[0][0];
if(an>ap){return 1
}else{return aq[0][1]>ao[0][1]?1:-1
}},cl={top:be,right:bN(true),bottom:bN(true),left:bj},bw=function(an,ao){return an.sort(ao)
},bz=function(ar,ap){var ao=bH[ar],an=bE[ar],aq=function(aB,au,aF,aC,aw,ax,aG){if(aC.length>0){var ay=bw(aC,cl[aB]),aA=aB==="right"||aB==="top",aH=ci(aB,au,aF,ay,aw,ax,aA);
var at=function(aK,aI){var aJ=h([aI[0],aI[1]],aK.canvas);
bD[aK.id]=[aJ[0],aJ[1],aI[2],aI[3]];
b1[aK.id]=aG
};
for(var aE=0;
aE<aH.length;
aE++){var az=aH[aE][4],av=az.endpoints[0].elementId===ar,aD=az.endpoints[1].elementId===ar;
if(av){at(az.endpoints[0],aH[aE])
}else{if(aD){at(az.endpoints[1],aH[aE])
}}}}};
aq("bottom",ao,[an.left,an.top],ap.bottom,true,1,[0,1]);
aq("top",ao,[an.left,an.top],ap.top,true,0,[0,-1]);
aq("left",ao,[an.left,an.top],ap.left,false,0,[-1,0]);
aq("right",ao,[an.left,an.top],ap.right,false,1,[1,0])
},b7=function(){var ap={},an={},ar=this,ao={};
this.reset=function(){ap={};
an={};
ao={}
};
this.newConnection=function(av){var at=av.sourceId,aw=av.targetId,ay=av.endpoints,au=true,ax=function(aD,aC,aA,aB,az){if((at==aw)&&aA.isContinuous){aa.CurrentLibrary.removeElement(ay[1].canvas);
au=false
}w(an,aB,[az,aC,aA.constructor==bu])
};
ax(0,ay[0],ay[0].anchor,aw,av);
if(au){ax(1,ay[1],ay[1].anchor,at,av)
}};
this.connectionDetached=function(aD){var aC=aD.connection||aD;
var ax=aC.sourceId,aw=aC.targetId,at=aC.endpoints,ay=function(aI,aH,aF,aG,aE){if(aF.constructor==ck){}else{Y(an[aG],function(aJ){return aJ[0].id==aE.id
})
}};
ay(1,at[1],at[1].anchor,ax,aC);
ay(0,at[0],at[0].anchor,aw,aC);
var aB=aC.sourceId,aA=aC.targetId,au=aC.endpoints[0].id,az=aC.endpoints[1].id,av=function(aE,aG){if(aE){var aF=function(aH){return aH[4]==aG
};
Y(aE.top,aF);
Y(aE.left,aF);
Y(aE.bottom,aF);
Y(aE.right,aF)
}};
av(ao[aB],au);
av(ao[aA],az);
ar.redraw(aB);
ar.redraw(aA)
};
this.add=function(at,au){w(ap,au,at)
};
this.changeId=function(at,au){an[au]=an[at];
ap[au]=ap[at];
delete an[at];
delete ap[at]
};
this.getConnectionsFor=function(at){return an[at]||[]
};
this.getEndpointsFor=function(at){return ap[at]||[]
};
this.deleteEndpoint=function(at){Y(ap[at.elementId],function(au){return au.id==at.id
})
};
this.clearFor=function(at){delete ap[at];
ap[at]=[]
};
var aq=function(av,aI,aA,aL,aF,aE,aC,aG,at,aD,aM,aw){var ay=-1,aN=-1,aK=aL.endpoints[aC],aB=aK.id,aH=[1,0][aC],aP=[[aI,aA],aL,aF,aE,aB],aO=av[at],au=aK._continuousAnchorEdge?av[aK._continuousAnchorEdge]:null;
if(au){var ax=ag(au,function(aQ){return aQ[4]==aB
});
if(ax!=-1){au.splice(ax,1);
for(var az=0;
az<au.length;
az++){U(aM,au[az][1],function(aQ){return aQ.id==au[az][1].id
});
U(aw,au[az][1].endpoints[aC],function(aQ){return aQ.id==au[az][1].endpoints[aC].id
})
}}}for(var az=0;
az<aO.length;
az++){if(aC==1&&aO[az][3]===aE&&aN==-1){aN=az
}U(aM,aO[az][1],function(aQ){return aQ.id==aO[az][1].id
});
U(aw,aO[az][1].endpoints[aC],function(aQ){return aQ.id==aO[az][1].endpoints[aC].id
})
}if(ay!=-1){aO[ay]=aP
}else{var aJ=aG?aN!=-1?aN:0:aO.length;
aO.splice(aJ,0,aP)
}aK._continuousAnchorEdge=at
};
this.redraw=function(aE,aC,aR,aO){if(!ce){var at=ap[aE]||[],au=an[aE]||[],aS=[],av=[],aQ=[];
aR=aR||X();
aO=aO||{left:0,top:0};
if(aC){aC={left:aC.left+aO.left,top:aC.top+aO.top}
}u({elId:aE,offset:aC,recalc:false,timestamp:aR});
var aJ=bE[aE],aN=bH[aE],aH={};
for(var ax=0;
ax<au.length;
ax++){var aM=au[ax][0],aK=aM.sourceId,aP=aM.targetId,aL=aM.endpoints[0].anchor.isContinuous,aF=aM.endpoints[1].anchor.isContinuous;
if(aL||aF){var aw=aK+"_"+aP,az=aP+"_"+aK,aA=aH[aw],aG=aM.sourceId==aE?1:0;
if(aL&&!ao[aK]){ao[aK]={top:[],right:[],bottom:[],left:[]}
}if(aF&&!ao[aP]){ao[aP]={top:[],right:[],bottom:[],left:[]}
}if(aE!=aP){u({elId:aP,timestamp:aR})
}if(aE!=aK){u({elId:aK,timestamp:aR})
}var aI=bX(aP),aT=bX(aK);
if(aP==aK&&(aL||aF)){aq(ao[aK],-Math.PI/2,0,aM,false,aP,0,false,"top",aK,aS,av)
}else{if(!aA){aA=l(aK,aP,aT.o,aI.o);
aH[aw]=aA
}if(aL){aq(ao[aK],aA.theta,0,aM,false,aP,0,false,aA.a[0],aK,aS,av)
}if(aF){aq(ao[aP],aA.theta2,-1,aM,true,aK,1,true,aA.a[1],aP,aS,av)
}}if(aL){U(aQ,aK,function(aU){return aU===aK
})
}if(aF){U(aQ,aP,function(aU){return aU===aP
})
}U(aS,aM,function(aU){return aU.id==aM.id
});
if((aL&&aG==0)||(aF&&aG==1)){U(av,aM.endpoints[aG],function(aU){return aU.id==aM.endpoints[aG].id
})
}}}for(var ax=0;
ax<at.length;
ax++){if(at[ax].connections.length==0&&at[ax].anchor.isContinuous){if(!ao[aE]){ao[aE]={top:[],right:[],bottom:[],left:[]}
}aq(ao[aE],-Math.PI/2,0,{endpoints:[at[ax],at[ax]],paint:function(){}},false,aE,0,false,"top",aE,aS,av);
U(aQ,aE,function(aU){return aU===aE
})
}}for(var ax=0;
ax<aQ.length;
ax++){bz(aQ[ax],ao[aQ[ax]])
}for(var ax=0;
ax<at.length;
ax++){at[ax].paint({timestamp:aR,offset:aJ,dimensions:aN})
}for(var ax=0;
ax<av.length;
ax++){av[ax].paint({timestamp:aR,offset:aJ,dimensions:aN})
}for(var ax=0;
ax<au.length;
ax++){var aD=au[ax][1];
if(aD.anchor.constructor==bu){aD.paint({elementWithPrecedence:aE});
U(aS,au[ax][0],function(aU){return aU.id==au[ax][0].id
});
for(var ay=0;
ay<aD.connections.length;
ay++){if(aD.connections[ay]!==au[ax][0]){U(aS,aD.connections[ay],function(aU){return aU.id==aD.connections[ay].id
})
}}}else{if(aD.anchor.constructor==bM){U(aS,au[ax][0],function(aU){return aU.id==au[ax][0].id
})
}}}var aB=r[aE];
if(aB){aB.paint({timestamp:aR,recalc:false,elId:aE})
}for(var ax=0;
ax<aS.length;
ax++){aS[ax].paint({elId:aE,timestamp:aR,recalc:false})
}}};
this.rehomeEndpoint=function(ax,at){var aw=ap[ax]||[],av=i.getId(at);
if(av!==ax){for(var au=0;
au<aw.length;
au++){ar.add(aw[au],av)
}aw.splice(0,aw.length)
}}
};
i.anchorManager=new b7();
i.continuousAnchorFactory={get:function(ao){var an=n[ao.elementId];
if(!an){an={type:"Continuous",compute:function(ap){return bD[ap.element.id]||[0,0]
},getCurrentLocation:function(ap){return bD[ap.id]||[0,0]
},getOrientation:function(ap){return b1[ap.id]||[0,0]
},isDynamic:true,isContinuous:true};
n[ao.elementId]=an
}return an
}};
if(!jsPlumbAdapter.headless){i.dragManager=jsPlumbAdapter.getDragManager(i)
}i.recalculateOffsets=i.dragManager.updateOffsets;
var bn=function(ao){var az=this,aJ=true,au,at;
az.idPrefix="_jsplumb_c_";
az.defaultLabelLocation=0.5;
az.defaultOverlayKeys=["Overlays","ConnectionOverlays"];
this.parent=ao.parent;
J.apply(this,arguments);
this.isVisible=function(){return aJ
};
this.setVisible=function(aL){aJ=aL;
az[aL?"showOverlays":"hideOverlays"]();
if(az.connector&&az.connector.canvas){az.connector.canvas.style.display=aL?"block":"none"
}az.repaint()
};
this.getTypeDescriptor=function(){return"connection"
};
this.getDefaultType=function(){return{parameters:{},scope:null,detachable:az._jsPlumb.Defaults.ConnectionsDetachable,rettach:az._jsPlumb.Defaults.ReattachConnections,paintStyle:az._jsPlumb.Defaults.PaintStyle||aa.Defaults.PaintStyle,connector:az._jsPlumb.Defaults.Connector||aa.Defaults.Connector,hoverPaintStyle:az._jsPlumb.Defaults.HoverPaintStyle||aa.Defaults.HoverPaintStyle,overlays:az._jsPlumb.Defaults.ConnectorOverlays||aa.Defaults.ConnectorOverlays}
};
var aq=this.applyType;
this.applyType=function(aL){aq(aL);
if(aL.detachable!=null){az.setDetachable(aL.detachable)
}if(aL.reattach!=null){az.setReattach(aL.reattach)
}if(aL.scope){az.scope=aL.scope
}az.setConnector(aL.connector)
};
at=az.setHover;
az.setHover=function(aL){var aM=i.ConnectorZIndex||aa.Defaults.ConnectorZIndex;
if(aM){az.connector.setZIndex(aM+(aL?1:0))
}az.connector.setHover.apply(az.connector,arguments);
at.apply(az,arguments)
};
au=function(aL){if(M==null){az.setHover(aL,false)
}};
this.setConnector=function(aO,aM){if(az.connector!=null){bO(az.connector.getDisplayElements(),az.parent)
}var aL={_jsPlumb:az._jsPlumb,parent:ao.parent,cssClass:ao.cssClass,container:ao.container,tooltip:az.tooltip};
if(H(aO)){this.connector=new aa.Connectors[s][aO](aL)
}else{if(ac(aO)){if(aO.length==1){this.connector=new aa.Connectors[s][aO[0]](aL)
}else{this.connector=new aa.Connectors[s][aO[0]](aa.extend(aO[1],aL))
}}}az.canvas=az.connector.canvas;
R(az.connector,az,au);
var aN=i.ConnectorZIndex||aa.Defaults.ConnectorZIndex;
if(aN){az.connector.setZIndex(aN)
}if(!aM){az.repaint()
}};
this.source=T(ao.source);
this.target=T(ao.target);
if(ao.sourceEndpoint){this.source=ao.sourceEndpoint.endpointWillMoveTo||ao.sourceEndpoint.getElement()
}if(ao.targetEndpoint){this.target=ao.targetEndpoint.getElement()
}az.previousConnection=ao.previousConnection;
this.sourceId=ak(this.source,"id");
this.targetId=ak(this.target,"id");
this.scope=ao.scope;
this.endpoints=[];
this.endpointStyles=[];
var ap=function(aL,aM){return(aL)?i.makeAnchor(aL,aM,i):null
},av=function(aN,aU,aM,aX,aW,aL,aV){var aT;
if(aN){az.endpoints[aU]=aN;
aN.addConnection(az)
}else{if(!aM.endpoints){aM.endpoints=[null,null]
}var aO=aM.endpoints[aU]||aM.endpoint||i.Defaults.Endpoints[aU]||aa.Defaults.Endpoints[aU]||i.Defaults.Endpoint||aa.Defaults.Endpoint;
if(!aM.endpointStyles){aM.endpointStyles=[null,null]
}if(!aM.endpointHoverStyles){aM.endpointHoverStyles=[null,null]
}var aQ=aM.endpointStyles[aU]||aM.endpointStyle||i.Defaults.EndpointStyles[aU]||aa.Defaults.EndpointStyles[aU]||i.Defaults.EndpointStyle||aa.Defaults.EndpointStyle;
if(aQ.fillStyle==null&&aL!=null){aQ.fillStyle=aL.strokeStyle
}if(aQ.outlineColor==null&&aL!=null){aQ.outlineColor=aL.outlineColor
}if(aQ.outlineWidth==null&&aL!=null){aQ.outlineWidth=aL.outlineWidth
}var aR=aM.endpointHoverStyles[aU]||aM.endpointHoverStyle||i.Defaults.EndpointHoverStyles[aU]||aa.Defaults.EndpointHoverStyles[aU]||i.Defaults.EndpointHoverStyle||aa.Defaults.EndpointHoverStyle;
if(aV!=null){if(aR==null){aR={}
}if(aR.fillStyle==null){aR.fillStyle=aV.strokeStyle
}}var aS=aM.anchors?aM.anchors[aU]:aM.anchor?aM.anchor:ap(i.Defaults.Anchors[aU],aW)||ap(aa.Defaults.Anchors[aU],aW)||ap(i.Defaults.Anchor,aW)||ap(aa.Defaults.Anchor,aW),aP=aM.uuids?aM.uuids[aU]:null;
aT=b6({paintStyle:aQ,hoverPaintStyle:aR,endpoint:aO,connections:[az],uuid:aP,anchor:aS,source:aX,scope:aM.scope,container:aM.container,reattach:aM.reattach||i.Defaults.ReattachConnections,detachable:aM.detachable||i.Defaults.ConnectionsDetachable});
az.endpoints[aU]=aT;
if(aM.drawEndpoints===false){aT.setVisible(false,true,true)
}}return aT
};
var ax=av(ao.sourceEndpoint,0,ao,az.source,az.sourceId,ao.paintStyle,ao.hoverPaintStyle);
if(ax){w(bS,this.sourceId,ax)
}var ay=av(ao.targetEndpoint,1,ao,az.target,az.targetId,ao.paintStyle,ao.hoverPaintStyle);
if(ay){w(bS,this.targetId,ay)
}if(!this.scope){this.scope=this.endpoints[0].scope
}az.endpointsToDeleteOnDetach=[null,null];
if(ao.deleteEndpointsOnDetach){if(ao.sourceIsNew){az.endpointsToDeleteOnDetach[0]=az.endpoints[0]
}if(ao.targetIsNew){az.endpointsToDeleteOnDetach[1]=az.endpoints[1]
}}az.setConnector(this.endpoints[0].connector||this.endpoints[1].connector||ao.connector||i.Defaults.Connector||aa.Defaults.Connector,true);
this.setPaintStyle(this.endpoints[0].connectorStyle||this.endpoints[1].connectorStyle||ao.paintStyle||i.Defaults.PaintStyle||aa.Defaults.PaintStyle,true);
this.setHoverPaintStyle(this.endpoints[0].connectorHoverStyle||this.endpoints[1].connectorHoverStyle||ao.hoverPaintStyle||i.Defaults.HoverPaintStyle||aa.Defaults.HoverPaintStyle,true);
this.paintStyleInUse=this.getPaintStyle();
u({elId:this.sourceId,timestamp:F});
u({elId:this.targetId,timestamp:F});
var aH=bE[this.sourceId],aI=bH[this.sourceId],aA=bE[this.targetId],aD=bH[this.targetId],aC=F||X(),aw=this.endpoints[0].anchor.compute({xy:[aH.left,aH.top],wh:aI,element:this.endpoints[0],elementId:this.endpoints[0].elementId,txy:[aA.left,aA.top],twh:aD,tElement:this.endpoints[1],timestamp:aC});
this.endpoints[0].paint({anchorLoc:aw,timestamp:aC});
aw=this.endpoints[1].anchor.compute({xy:[aA.left,aA.top],wh:aD,element:this.endpoints[1],elementId:this.endpoints[1].elementId,txy:[aH.left,aH.top],twh:aI,tElement:this.endpoints[0],timestamp:aC});
this.endpoints[1].paint({anchorLoc:aw,timestamp:aC});
var aK=i.Defaults.ConnectionsDetachable;
if(ao.detachable===false){aK=false
}if(az.endpoints[0].connectionsDetachable===false){aK=false
}if(az.endpoints[1].connectionsDetachable===false){aK=false
}this.isDetachable=function(){return aK===true
};
this.setDetachable=function(aL){aK=aL===true
};
var aE=ao.reattach||az.endpoints[0].reattachConnections||az.endpoints[1].reattachConnections||i.Defaults.ReattachConnections;
this.isReattach=function(){return aE===true
};
this.setReattach=function(aL){aE=aL===true
};
var aF=ao.cost||az.endpoints[0].getConnectionCost();
az.getCost=function(){return aF
};
az.setCost=function(aL){aF=aL
};
var aG=!(ao.bidirectional===false);
if(ao.bidirectional==null){aG=az.endpoints[0].areConnectionsBidirectional()
}az.isBidirectional=function(){return aG
};
var an=aa.extend({},this.endpoints[0].getParameters());
aa.extend(an,this.endpoints[1].getParameters());
aa.extend(an,az.getParameters());
az.setParameters(an);
this.getAttachedElements=function(){return az.endpoints
};
this.moveParent=function(aL){var aM=aa.CurrentLibrary,aN=aM.getParent(az.connector.canvas);
if(az.connector.bgCanvas){aM.removeElement(az.connector.bgCanvas,aN);
aM.appendElement(az.connector.bgCanvas,aL)
}aM.removeElement(az.connector.canvas,aN);
aM.appendElement(az.connector.canvas,aL);
for(var aO=0;
aO<az.overlays.length;
aO++){if(az.overlays[aO].isAppendedAtTopLevel){aM.removeElement(az.overlays[aO].canvas,aN);
aM.appendElement(az.overlays[aO].canvas,aL);
if(az.overlays[aO].reattachListeners){az.overlays[aO].reattachListeners(az.connector)
}}}if(az.connector.reattachListeners){az.connector.reattachListeners()
}};
var aB=null;
this.paint=function(a2){if(aJ){a2=a2||{};
var aQ=a2.elId,aP=a2.ui,aS=a2.recalc,aX=a2.timestamp,aO=false,a3=aO?this.sourceId:this.targetId,aT=aO?this.targetId:this.sourceId,aW=aO?0:1,a1=aO?1:0;
if(aX==null||aX!=aB){var aZ=u({elId:aQ,offset:aP,recalc:aS,timestamp:aX}),aR=u({elId:a3,timestamp:aX});
var aM=this.endpoints[a1],aY=this.endpoints[aW],aU=aM.anchor.getCurrentLocation(aM),a4=aY.anchor.getCurrentLocation(aY);
var aV=0;
for(var a5=0;
a5<az.overlays.length;
a5++){var aN=az.overlays[a5];
if(aN.isVisible()){aV=Math.max(aV,aN.computeMaxSize())
}}var aL=this.connector.compute(aU,a4,this.endpoints[a1],this.endpoints[aW],this.endpoints[a1].anchor,this.endpoints[aW].anchor,az.paintStyleInUse.lineWidth,aV,aZ,aR);
az.connector.paint(aL,az.paintStyleInUse);
for(var a5=0;
a5<az.overlays.length;
a5++){var aN=az.overlays[a5];
if(aN.isVisible){az.overlayPlacements[a5]=aN.draw(az.connector,az.paintStyleInUse,aL)
}}}aB=aX
}};
this.repaint=function(aL){aL=aL||{};
var aM=!(aL.recalc===false);
this.paint({elId:this.sourceId,recalc:aM,timestamp:aL.timestamp})
};
var ar=ao.type||az.endpoints[0].connectionType||az.endpoints[1].connectionType;
if(ar){az.addType(ar)
}};
var x=function(ao){var an=false;
return{drag:function(){if(an){an=false;
return true
}var aq=aa.CurrentLibrary.getUIPosition(arguments,i.getZoom()),ap=ao.element;
if(ap){aa.CurrentLibrary.setOffset(ap,aq);
E(T(ap),aq)
}},stopDrag:function(){an=true
}}
};
var bt=function(ao,aq,an,ar,ap){var at=new ck({reference:aq,referenceCanvas:ar});
return b6({paintStyle:ao,endpoint:an,anchor:at,source:ap,scope:"__floating"})
};
var D=function(aq,ap){var an=document.createElement("div");
an.style.position="absolute";
var ar=T(an);
bQ(an,ap);
var ao=bp(ar);
u({elId:ao});
aq.id=ao;
aq.element=ar
};
var bG=function(ao){var aC=this;
aC.idPrefix="_jsplumb_e_";
aC.defaultLabelLocation=[0.5,0.5];
aC.defaultOverlayKeys=["Overlays","EndpointOverlays"];
this.parent=ao.parent;
J.apply(this,arguments);
ao=ao||{};
this.getTypeDescriptor=function(){return"endpoint"
};
this.getDefaultType=function(){return{parameters:{},scope:null,maxConnections:aC._jsPlumb.Defaults.MaxConnections,paintStyle:aC._jsPlumb.Defaults.EndpointStyle||aa.Defaults.EndpointStyle,endpoint:aC._jsPlumb.Defaults.Endpoint||aa.Defaults.Endpoint,hoverPaintStyle:aC._jsPlumb.Defaults.EndpointHoverStyle||aa.Defaults.EndpointHoverStyle,overlays:aC._jsPlumb.Defaults.EndpointOverlays||aa.Defaults.EndpointOverlays,connectorStyle:ao.connectorStyle,connectorHoverStyle:ao.connectorHoverStyle,connectorClass:ao.connectorClass,connectorHoverClass:ao.connectorHoverClass,connectorOverlays:ao.connectorOverlays,connector:ao.connector,connectorTooltip:ao.connectorTooltip}
};
var aq=this.applyType;
this.applyType=function(aW){aq(aW);
if(aW.maxConnections!=null){aw=aW.maxConnections
}if(aW.scope){aC.scope=aW.scope
}aC.connectorStyle=aW.connectorStyle;
aC.connectorHoverStyle=aW.connectorHoverStyle;
aC.connectorOverlays=aW.connectorOverlays;
aC.connector=aW.connector;
aC.connectorTooltip=aW.connectorTooltip;
aC.connectionType=aW.connectionType;
aC.connectorClass=aW.connectorClass;
aC.connectorHoverClass=aW.connectorHoverClass
};
var aR=true,aT=!(ao.enabled===false);
this.isVisible=function(){return aR
};
this.setVisible=function(aZ,aW,a1){aR=aZ;
if(aC.canvas){aC.canvas.style.display=aZ?"block":"none"
}aC[aZ?"showOverlays":"hideOverlays"]();
if(!aW){for(var aX=0;
aX<aC.connections.length;
aX++){aC.connections[aX].setVisible(aZ);
if(!a1){var aY=aC===aC.connections[aX].endpoints[0]?1:0;
if(aC.connections[aX].endpoints[aY].connections.length==1){aC.connections[aX].endpoints[aY].setVisible(aZ,true,true)
}}}}};
this.isEnabled=function(){return aT
};
this.setEnabled=function(aW){aT=aW
};
var aD=ao.source,aJ=ao.uuid,ar=null,aP=null;
if(aJ){bR[aJ]=aC
}var aM=ak(aD,"id");
this.elementId=aM;
this.element=aD;
var aU=ao.connectionCost;
this.getConnectionCost=function(){return aU
};
this.setConnectionCost=function(aW){aU=aW
};
var at=ao.connectionsBidirectional===false?false:true;
this.areConnectionsBidirectional=function(){return at
};
this.setConnectionsBidirectional=function(aW){at=aW
};
aC.anchor=ao.anchor?i.makeAnchor(ao.anchor,aM,i):ao.anchors?i.makeAnchor(ao.anchors,aM,i):i.makeAnchor(i.Defaults.Anchor||"TopCenter",aM,i);
if(!ao._transient){i.anchorManager.add(aC,aM)
}var aF=null,aA=null;
this.setEndpoint=function(aY){var aX={_jsPlumb:aC._jsPlumb,parent:ao.parent,container:ao.container,tooltip:ao.tooltip,connectorTooltip:ao.connectorTooltip,endpoint:aC};
if(H(aY)){aF=new aa.Endpoints[s][aY](aX)
}else{if(ac(aY)){aX=aa.extend(aY[1],aX);
aF=new aa.Endpoints[s][aY[0]](aX)
}else{aF=aY.clone()
}}var aW=aa.extend({},aX);
aF.clone=function(){var aZ=new Object();
aF.constructor.apply(aZ,[aW]);
return aZ
};
aC.endpoint=aF;
aC.type=aC.endpoint.type
};
this.setEndpoint(ao.endpoint||i.Defaults.Endpoint||aa.Defaults.Endpoint||"Dot");
aA=aF;
var aE=aC.setHover;
aC.setHover=function(){aC.endpoint.setHover.apply(aC.endpoint,arguments);
aE.apply(aC,arguments)
};
var an=function(aW){if(aC.connections.length>0){aC.connections[0].setHover(aW,false)
}else{aC.setHover(aW)
}};
R(aC.endpoint,aC,an);
this.setPaintStyle(ao.paintStyle||ao.style||i.Defaults.EndpointStyle||aa.Defaults.EndpointStyle,true);
this.setHoverPaintStyle(ao.hoverPaintStyle||i.Defaults.EndpointHoverStyle||aa.Defaults.EndpointHoverStyle,true);
this.paintStyleInUse=this.getPaintStyle();
var aH=this.getPaintStyle();
this.connectorStyle=ao.connectorStyle;
this.connectorHoverStyle=ao.connectorHoverStyle;
this.connectorOverlays=ao.connectorOverlays;
this.connector=ao.connector;
this.connectorTooltip=ao.connectorTooltip;
this.connectorClass=ao.connectorClass;
this.connectorHoverClass=ao.connectorHoverClass;
this.isSource=ao.isSource||false;
this.isTarget=ao.isTarget||false;
var aw=ao.maxConnections||i.Defaults.MaxConnections;
this.getAttachedElements=function(){return aC.connections
};
this.canvas=this.endpoint.canvas;
this.connections=ao.connections||[];
this.scope=ao.scope||G;
this.connectionType=ao.connectionType;
this.timestamp=null;
aC.reattachConnections=ao.reattach||i.Defaults.ReattachConnections;
aC.connectionsDetachable=i.Defaults.ConnectionsDetachable;
if(ao.connectionsDetachable===false||ao.detachable===false){aC.connectionsDetachable=false
}var aI=ao.dragAllowedWhenFull||true;
if(ao.onMaxConnections){aC.bind("maxConnections",ao.onMaxConnections)
}this.computeAnchor=function(aW){return aC.anchor.compute(aW)
};
this.addConnection=function(aW){aC.connections.push(aW)
};
this.detach=function(a6,a1,a5,aX,a7){var aY=ag(aC.connections,function(a8){return a8.id==a6.id
}),aZ=false;
aX=(aX!==false);
if(aY>=0){if(a5||a6._forceDetach||a6.isDetachable()||a6.isDetachAllowed(a6)){var aW=a6.endpoints[0]==aC?a6.endpoints[1]:a6.endpoints[0];
if(a5||a6._forceDetach||(aC.isDetachAllowed(a6))){aC.connections.splice(aY,1);
if(!a1){aW.detach(a6,true,a5);
if(a6.endpointsToDeleteOnDetach){for(var a2=0;
a2<a6.endpointsToDeleteOnDetach.length;
a2++){var a4=a6.endpointsToDeleteOnDetach[a2];
if(a4&&a4.connections.length==0){i.deleteEndpoint(a4)
}}}}bO(a6.connector.getDisplayElements(),a6.parent);
Y(a[a6.scope],function(a8){return a8.id==a6.id
});
aZ=true;
var a3=(!a1&&aX);
bg(a6,a3,a7)
}}}return aZ
};
this.detachAll=function(aW,aX){while(aC.connections.length>0){aC.detach(aC.connections[0],false,true,aW,aX)
}};
this.detachFrom=function(aX,aY,a1){var aW=[];
for(var aZ=0;
aZ<aC.connections.length;
aZ++){if(aC.connections[aZ].endpoints[1]==aX||aC.connections[aZ].endpoints[0]==aX){aW.push(aC.connections[aZ])
}}for(var aZ=0;
aZ<aW.length;
aZ++){if(aC.detach(aW[aZ],false,true,aY,a1)){aW[aZ].setHover(false,false)
}}};
this.detachFromConnection=function(aW){var aX=ag(aC.connections,function(aY){return aY.id==aW.id
});
if(aX>=0){aC.connections.splice(aX,1)
}};
this.getElement=function(){return aD
};
this.setElement=function(aX,a1){var a2=bp(aX);
Y(bS[aC.elementId],function(a3){return a3.id==aC.id
});
aD=T(aX);
aM=bp(aD);
aC.elementId=aM;
var aW=bq({source:a2,container:a1}),aY=aS.getParent(aC.canvas);
aS.removeElement(aC.canvas,aY);
aS.appendElement(aC.canvas,aW);
for(var aZ=0;
aZ<aC.connections.length;
aZ++){aC.connections[aZ].moveParent(aW);
aC.connections[aZ].sourceId=aM;
aC.connections[aZ].source=aD
}w(bS,a2,aC)
};
this.getUuid=function(){return aJ
};
this.makeInPlaceCopy=function(){var aW=aC.anchor.getCurrentLocation(aC),aX=aC.anchor.getOrientation(aC),aY={compute:function(){return[aW[0],aW[1]]
},getCurrentLocation:function(){return[aW[0],aW[1]]
},getOrientation:function(){return aX
}};
return b6({anchor:aY,source:aD,paintStyle:this.getPaintStyle(),endpoint:aF,_transient:true,scope:aC.scope})
};
this.isConnectedTo=function(aW){var aX=false;
if(aW){for(var aY=0;
aY<aC.connections.length;
aY++){if(aC.connections[aY].endpoints[1]==aW){aX=true;
break
}}}return aX
};
this.isFloating=function(){return ar!=null
};
this.connectorSelector=function(){var aW=aC.connections[0];
if(aC.isTarget&&aW){return aW
}else{return(aC.connections.length<aw)||aw==-1?null:aW
}};
this.isFull=function(){return !(aC.isFloating()||aw<1||aC.connections.length<aw)
};
this.setDragAllowedWhenFull=function(aW){aI=aW
};
this.setStyle=aC.setPaintStyle;
this.equals=function(aW){return this.anchor.equals(aW.anchor)
};
var aG=function(aX){var aY=0;
if(aX!=null){for(var aW=0;
aW<aC.connections.length;
aW++){if(aC.connections[aW].sourceId==aX||aC.connections[aW].targetId==aX){aY=aW;
break
}}}return aC.connections[aY]
};
this.paint=function(a4){a4=a4||{};
var aX=a4.timestamp,aY=!(a4.recalc===false);
if(!aX||aC.timestamp!==aX){u({elId:aM,timestamp:aX,recalc:aY});
var a8=a4.offset||bE[aM];
if(a8){var a1=a4.anchorPoint,a3=a4.connectorPaintStyle;
if(a1==null){var a7=a4.dimensions||bH[aM];
if(a8==null||a7==null){u({elId:aM,timestamp:aX});
a8=bE[aM];
a7=bH[aM]
}var a5={xy:[a8.left,a8.top],wh:a7,element:aC,timestamp:aX};
if(aY&&aC.anchor.isDynamic&&aC.connections.length>0){var bb=aG(a4.elementWithPrecedence),a9=bb.endpoints[0]==aC?1:0,a2=a9==0?bb.sourceId:bb.targetId,bc=bE[a2],ba=bH[a2];
a5.txy=[bc.left,bc.top];
a5.twh=ba;
a5.tElement=bb.endpoints[a9]
}a1=aC.anchor.compute(a5)
}var aW=aF.compute(a1,aC.anchor.getOrientation(aC),aC.paintStyleInUse,a3||aC.paintStyleInUse);
aF.paint(aW,aC.paintStyleInUse,aC.anchor);
aC.timestamp=aX;
for(var aZ=0;
aZ<aC.overlays.length;
aZ++){var a6=aC.overlays[aZ];
if(a6.isVisible){aC.overlayPlacements[aZ]=a6.draw(aC.endpoint,aC.paintStyleInUse,aW)
}}}}};
this.repaint=this.paint;
this.removeConnection=this.detach;
if(aa.CurrentLibrary.isDragSupported(aD)){var ax={id:null,element:null},ay=null,aV=false,aQ=null,aL=x(ax);
var aO=function(){ay=aC.connectorSelector();
var a2=true;
if(!aC.isEnabled()){a2=false
}if(ay==null&&!ao.isSource){a2=false
}if(ao.isSource&&aC.isFull()&&!aI){a2=false
}if(ay!=null&&!ay.isDetachable()){a2=false
}if(a2===false){if(aa.CurrentLibrary.stopDrag){aa.CurrentLibrary.stopDrag()
}aL.stopDrag();
return false
}if(ay&&!aC.isFull()&&ao.isSource){ay=null
}u({elId:aM});
aP=aC.makeInPlaceCopy();
aP.referenceEndpoint=aC;
aP.paint();
D(ax,aC.parent);
var a3=T(aP.canvas),aW=S(a3,i),aZ=h([aW.left,aW.top],aP.canvas);
aa.CurrentLibrary.setOffset(ax.element,{left:aZ[0],top:aZ[1]});
if(aC.parentAnchor){aC.anchor=i.makeAnchor(aC.parentAnchor,aC.elementId,i)
}aj(T(aC.canvas),"dragId",ax.id);
aj(T(aC.canvas),"elId",aM);
if(ao.proxy){aC.setPaintStyle(ao.proxy.paintStyle)
}ar=bt(aC.getPaintStyle(),aC.anchor,aF,aC.canvas,ax.element);
if(ay==null){aC.anchor.locked=true;
aC.setHover(false,false);
ay=bI({sourceEndpoint:aC,targetEndpoint:ar,source:aC.endpointWillMoveTo||T(aD),target:ax.element,anchors:[aC.anchor,ar.anchor],paintStyle:ao.connectorStyle,hoverPaintStyle:ao.connectorHoverStyle,connector:ao.connector,overlays:ao.connectorOverlays,type:aC.connectionType,cssClass:aC.connectorClass,hoverClass:aC.connectorHoverClass})
}else{aV=true;
ay.setHover(false);
aN(T(aP.canvas),false,true);
var aX=ay.endpoints[0].id==aC.id?0:1;
ay.floatingAnchorIndex=aX;
aC.detachFromConnection(ay);
var a1=T(aC.canvas),a4=aa.CurrentLibrary.getDragScope(a1);
aj(a1,"originalScope",a4);
var aY=aa.CurrentLibrary.getDropScope(a1);
aa.CurrentLibrary.setDragScope(a1,aY);
if(aX==0){aQ=[ay.source,ay.sourceId,au,a4];
ay.source=ax.element;
ay.sourceId=ax.id
}else{aQ=[ay.target,ay.targetId,au,a4];
ay.target=ax.element;
ay.targetId=ax.id
}ay.endpoints[aX==0?1:0].anchor.locked=true;
ay.suspendedEndpoint=ay.endpoints[aX];
ay.suspendedEndpoint.setHover(false);
ar.referenceEndpoint=ay.suspendedEndpoint;
ay.endpoints[aX]=ar;
cf(ay)
}r[ax.id]=ay;
ar.addConnection(ay);
w(bS,ax.id,ar);
i.currentlyDragging=true
};
var aS=aa.CurrentLibrary,av=ao.dragOptions||{},aB=aa.extend({},aS.defaultDragOptions),az=aS.dragEvents.start,ap=aS.dragEvents.stop,aK=aS.dragEvents.drag;
av=aa.extend(aB,av);
av.scope=av.scope||aC.scope;
av[az]=by(av[az],aO);
av[aK]=by(av[aK],aL.drag);
av[ap]=by(av[ap],function(){var aW=aS.getDropEvent(arguments);
i.currentlyDragging=false;
Y(bS[ax.id],function(aY){return aY.id==ar.id
});
bO([ax.element[0],ar.canvas],aD);
bs(aP.canvas,aD);
i.anchorManager.clearFor(ax.id);
var aX=ay.floatingAnchorIndex==null?1:ay.floatingAnchorIndex;
ay.endpoints[aX==0?1:0].anchor.locked=false;
aC.setPaintStyle(aH);
if(ay.endpoints[aX]==ar){if(aV&&ay.suspendedEndpoint){if(aX==0){ay.source=aQ[0];
ay.sourceId=aQ[1]
}else{ay.target=aQ[0];
ay.targetId=aQ[1]
}aa.CurrentLibrary.setDragScope(aQ[2],aQ[3]);
ay.endpoints[aX]=ay.suspendedEndpoint;
if(ay.isReattach()||ay._forceReattach||ay._forceDetach||!ay.endpoints[aX==0?1:0].detach(ay,false,false,true,aW)){ay.setHover(false);
ay.floatingAnchorIndex=null;
ay.suspendedEndpoint.addConnection(ay);
i.repaint(aQ[1])
}ay._forceDetach=null;
ay._forceReattach=null
}else{bO(ay.connector.getDisplayElements(),aC.parent);
aC.detachFromConnection(ay)
}}aC.anchor.locked=false;
aC.paint({recalc:false});
bU(ay);
ay=null;
aP=null;
delete bS[ar.elementId];
ar.anchor=null;
ar=null;
i.currentlyDragging=false
});
var au=T(aC.canvas);
aa.CurrentLibrary.initDraggable(au,av,true)
}var aN=function(a3,aX,aZ,aW){if((ao.isTarget||aX)&&aa.CurrentLibrary.isDropSupported(aD)){var a2=ao.dropOptions||i.Defaults.DropOptions||aa.Defaults.DropOptions;
a2=aa.extend({},a2);
a2.scope=a2.scope||aC.scope;
var a4=aa.CurrentLibrary.dragEvents.drop,aY=aa.CurrentLibrary.dragEvents.over,a5=aa.CurrentLibrary.dragEvents.out,a1=function(){var a7=aa.CurrentLibrary.getDropEvent(arguments),a8=T(aa.CurrentLibrary.getDragObject(arguments)),cA=ak(a8,"dragId"),cy=ak(a8,"elId"),a9=ak(a8,"originalScope"),cv=r[cA];
var cx=cv.suspendedEndpoint&&(cv.suspendedEndpoint.id==aC.id||aC.referenceEndpoint&&cv.suspendedEndpoint.id==aC.referenceEndpoint.id);
if(cx){cv._forceReattach=true;
return
}if(cv!=null){var bc=cv.floatingAnchorIndex==null?1:cv.floatingAnchorIndex,bb=bc==0?1:0;
if(a9){aa.CurrentLibrary.setDragScope(a8,a9)
}var ba=aW!=null?aW.isEnabled():true;
if(aC.isFull()){aC.fire("maxConnections",{endpoint:aC,connection:cv,maxConnections:aw},a7)
}if(!aC.isFull()&&!(bc==0&&!aC.isSource)&&!(bc==1&&!aC.isTarget)&&ba){var cw=true;
if(cv.suspendedEndpoint&&cv.suspendedEndpoint.id!=aC.id){if(bc==0){cv.source=cv.suspendedEndpoint.element;
cv.sourceId=cv.suspendedEndpoint.elementId
}else{cv.target=cv.suspendedEndpoint.element;
cv.targetId=cv.suspendedEndpoint.elementId
}if(!cv.isDetachAllowed(cv)||!cv.endpoints[bc].isDetachAllowed(cv)||!cv.suspendedEndpoint.isDetachAllowed(cv)||!i.checkCondition("beforeDetach",cv)){cw=false
}}if(bc==0){cv.source=aC.element;
cv.sourceId=aC.elementId
}else{cv.target=aC.element;
cv.targetId=aC.elementId
}var cu=function(){cv.floatingAnchorIndex=null
};
var a6=function(){cv.endpoints[bc].detachFromConnection(cv);
if(cv.suspendedEndpoint){cv.suspendedEndpoint.detachFromConnection(cv)
}cv.endpoints[bc]=aC;
aC.addConnection(cv);
var cn=aC.getParameters();
for(var cp in cn){cv.setParameter(cp,cn[cp])
}if(!cv.suspendedEndpoint){if(cn.draggable){aa.CurrentLibrary.initDraggable(aC.element,av,true)
}}else{var co=cv.suspendedEndpoint.getElement(),cq=cv.suspendedEndpoint.elementId;
bg({source:bc==0?co:cv.source,target:bc==1?co:cv.target,sourceId:bc==0?cq:cv.sourceId,targetId:bc==1?cq:cv.targetId,sourceEndpoint:bc==0?cv.suspendedEndpoint:cv.endpoints[0],targetEndpoint:bc==1?cv.suspendedEndpoint:cv.endpoints[1],connection:cv},true,a7)
}c(cv,null,a7);
cu()
};
var cz=function(){if(cv.suspendedEndpoint){cv.endpoints[bc]=cv.suspendedEndpoint;
cv.setHover(false);
cv._forceDetach=true;
if(bc==0){cv.source=cv.suspendedEndpoint.element;
cv.sourceId=cv.suspendedEndpoint.elementId
}else{cv.target=cv.suspendedEndpoint.element;
cv.targetId=cv.suspendedEndpoint.elementId
}cv.suspendedEndpoint.addConnection(cv);
cv.endpoints[0].repaint();
cv.repaint();
i.repaint(cv.source.elementId);
cv._forceDetach=false
}cu()
};
cw=cw&&aC.isDropAllowed(cv.sourceId,cv.targetId,cv.scope,cv,aC);
if(cw){a6()
}else{cz()
}}i.currentlyDragging=false;
delete r[cA];
cv.suspendedEndpoint=null
}};
a2[a4]=by(a2[a4],a1);
a2[aY]=by(a2[aY],function(){var a9=aa.CurrentLibrary.getDragObject(arguments),a6=ak(T(a9),"dragId"),a7=r[a6];
if(a7!=null){var ba=a7.floatingAnchorIndex==null?1:a7.floatingAnchorIndex;
var a8=(aC.isTarget&&a7.floatingAnchorIndex!=0)||(a7.suspendedEndpoint&&aC.referenceEndpoint&&aC.referenceEndpoint.id==a7.suspendedEndpoint.id);
if(a8){a7.endpoints[ba].anchor.over(aC.anchor)
}}});
a2[a5]=by(a2[a5],function(){var a9=aa.CurrentLibrary.getDragObject(arguments),a6=ak(T(a9),"dragId"),a7=r[a6];
if(a7!=null){var ba=a7.floatingAnchorIndex==null?1:a7.floatingAnchorIndex;
var a8=(aC.isTarget&&a7.floatingAnchorIndex!=0)||(a7.suspendedEndpoint&&aC.referenceEndpoint&&aC.referenceEndpoint.id==a7.suspendedEndpoint.id);
if(a8){a7.endpoints[ba].anchor.out()
}}});
aa.CurrentLibrary.initDroppable(a3,a2,true,aZ)
}};
aN(T(aC.canvas),true,!(ao._transient||aC.anchor.isFloating),aC);
if(ao.type){aC.addType(ao.type)
}return aC
}
};
var aa=new K();
if(typeof window!="undefined"){window.jsPlumb=aa
}aa.getInstance=function(a){var b=new K(a);
b.init();
return b
};
if(typeof define==="function"&&define.amd&&define.amd.jsPlumb){define("jsplumb",[],function(){return aa
})
}var V=function(e,f,c,d,a,b){return function(g){g=g||{};
var h=g.jsPlumbInstance.makeAnchor([e,f,c,d,0,0],g.elementId,g.jsPlumbInstance);
h.type=a;
if(b){b(h,g)
}return h
}
};
aa.Anchors.TopCenter=V(0.5,0,0,-1,"TopCenter");
aa.Anchors.BottomCenter=V(0.5,1,0,1,"BottomCenter");
aa.Anchors.LeftMiddle=V(0,0.5,-1,0,"LeftMiddle");
aa.Anchors.RightMiddle=V(1,0.5,1,0,"RightMiddle");
aa.Anchors.Center=V(0.5,0.5,0,0,"Center");
aa.Anchors.TopRight=V(1,0,0,-1,"TopRight");
aa.Anchors.BottomRight=V(1,1,0,1,"BottomRight");
aa.Anchors.TopLeft=V(0,0,0,-1,"TopLeft");
aa.Anchors.BottomLeft=V(0,1,0,1,"BottomLeft");
aa.Defaults.DynamicAnchors=function(a){return a.jsPlumbInstance.makeAnchors(["TopCenter","RightMiddle","BottomCenter","LeftMiddle"],a.elementId,a.jsPlumbInstance)
};
aa.Anchors.AutoDefault=function(a){var b=a.jsPlumbInstance.makeDynamicAnchor(aa.Defaults.DynamicAnchors(a));
b.type="AutoDefault";
return b
};
aa.Anchors.Assign=V(0,0,0,0,"Assign",function(b,a){var c=a.position||"Fixed";
b.positionFinder=c.constructor==String?a.jsPlumbInstance.AnchorPositionFinders[c]:c;
b.constructorParams=a
});
aa.Anchors.Continuous=function(a){return a.jsPlumbInstance.continuousAnchorFactory.get(a)
};
aa.AnchorPositionFinders={Fixed:function(a,d,b,c){return[(a.left-d.left)/b[0],(a.top-d.top)/b[1]]
},Grid:function(k,a,f,i){var b=k.left-a.left,c=k.top-a.top,d=f[0]/(i.grid[0]),e=f[1]/(i.grid[1]),g=Math.floor(b/d),h=Math.floor(c/e);
return[((g*d)+(d/2))/f[0],((h*e)+(e/2))/f[1]]
}};
aa.Anchors.Perimeter=function(l){l=l||{};
var k=l.anchorCount||60,g=l.shape;
if(!g){throw new Error("no shape supplied to Perimeter Anchor type")
}var i=function(){var m=0.5,n=Math.PI*2/k,s=0,p=[];
for(var o=0;
o<k;
o++){var q=m+(m*Math.sin(s)),r=m+(m*Math.cos(s));
p.push([q,r,0,0]);
s+=n
}return p
},f=function(o){var m=k/o.length,q=[],p=function(w,s,v,t,r){m=k*r;
var x=(v-w)/m,y=(t-s)/m;
for(var u=0;
u<m;
u++){q.push([w+(x*u),s+(y*u),0,0])
}};
for(var n=0;
n<o.length;
n++){p.apply(null,o[n])
}return q
},c=function(o){var m=[];
for(var n=0;
n<o.length;
n++){m.push([o[n][0],o[n][1],o[n][2],o[n][3],1/o.length])
}return f(m)
},e=function(){return c([[0,0,1,0],[1,0,1,1],[1,1,0,1],[0,1,0,0]])
};
var h={circle:i,ellipse:i,diamond:function(){return c([[0.5,0,1,0.5],[1,0.5,0.5,1],[0.5,1,0,0.5],[0,0.5,0.5,0]])
},rectangle:e,square:e,triangle:function(){return c([[0.5,0,1,1],[1,1,0,1],[0,1,0.5,0]])
},path:function(r){var n=r.points;
var m=[],p=0;
for(var o=0;
o<n.length-1;
o++){var q=Math.sqrt(Math.pow(n[o][2]-n[o][0])+Math.pow(n[o][3]-n[o][1]));
p+=q;
m.push([n[o][0],n[o][1],n[o+1][0],n[o+1][1],q])
}for(var o=0;
o<m.length;
o++){m[o][4]=m[o][4]/p
}return f(m)
}},b=function(s,m){var r=[],n=m/180*Math.PI;
for(var o=0;
o<s.length;
o++){var p=s[o][0]-0.5,q=s[o][1]-0.5;
r.push([0.5+((p*Math.cos(n))-(q*Math.sin(n))),0.5+((p*Math.sin(n))+(q*Math.cos(n))),s[o][2],s[o][3]])
}return r
};
if(!h[g]){throw new Error("Shape ["+g+"] is unknown by Perimeter Anchor type")
}var a=h[g](l);
if(l.rotation){a=b(a,l.rotation)
}var d=l.jsPlumbInstance.makeDynamicAnchor(a);
d.type="Perimeter";
return d
}
})();
(function(){jsPlumb.DOMElementComponent=function(a){jsPlumb.jsPlumbUIComponent.apply(this,arguments);
this.mousemove=this.dblclick=this.click=this.mousedown=this.mouseup=function(b){}
};
jsPlumb.Connectors.Straight=function(){this.type="Straight";
var E=this,x=null,B,w,b,t,v,A,a,y,z,C,D,c,u;
this.compute=function(i,m,M,k,r,s,N,l){var n=Math.abs(i[0]-m[0]),g=Math.abs(i[1]-m[1]),h=0.45*n,q=0.45*g;
n*=1.9;
g*=1.9;
var p=Math.min(i[0],m[0])-h;
var L=Math.min(i[1],m[1])-q;
var o=Math.max(2*N,l);
if(n<o){n=o;
p=i[0]+((m[0]-i[0])/2)-(o/2);
h=(n-Math.abs(i[0]-m[0]))/2
}if(g<o){g=o;
L=i[1]+((m[1]-i[1])/2)-(o/2);
q=(g-Math.abs(i[1]-m[1]))/2
}y=i[0]<m[0]?h:n-h;
z=i[1]<m[1]?q:g-q;
C=i[0]<m[0]?n-h:h;
D=i[1]<m[1]?g-q:q;
x=[p,L,n,g,y,z,C,D];
t=C-y,v=D-z;
B=jsPlumbUtil.gradient({x:y,y:z},{x:C,y:D}),w=-1/B;
b=-1*((B*y)-z);
A=Math.atan(B);
a=Math.atan(w);
u=Math.sqrt((t*t)+(v*v));
return x
};
this.pointOnPath=function(h,g){if(h==0&&!g){return{x:y,y:z}
}else{if(h==1&&!g){return{x:C,y:D}
}else{var i=g?h>0?h:u+h:h*u;
return jsPlumbUtil.pointOnLine({x:y,y:z},{x:C,y:D},i)
}}};
this.gradientAtPoint=function(g){return B
};
this.pointAlongPathFrom=function(l,g,h){var i=E.pointOnPath(l,h),k=l==1?{x:y+((C-y)*10),y:z+((z-D)*10)}:g<=0?{x:y,y:z}:{x:C,y:D};
if(g<=0&&Math.abs(g)>1){g*=-1
}return jsPlumbUtil.pointOnLine(i,k,g)
}
};
jsPlumb.Connectors.Bezier=function(a){var A=this;
a=a||{};
this.majorAnchor=a.curviness||150;
this.minorAnchor=10;
var c=null;
this.type="Bezier";
this._findControlPoint=function(p,o,g,m,i,r,l){var s=r.getOrientation(m),q=l.getOrientation(i),h=s[0]!=q[0]||s[1]==q[1],k=[],n=A.majorAnchor,t=A.minorAnchor;
if(!h){if(s[0]==0){k.push(o[0]<g[0]?p[0]+t:p[0]-t)
}else{k.push(p[0]-(n*s[0]))
}if(s[1]==0){k.push(o[1]<g[1]?p[1]+t:p[1]-t)
}else{k.push(p[1]+(n*q[1]))
}}else{if(q[0]==0){k.push(g[0]<o[0]?p[0]+t:p[0]-t)
}else{k.push(p[0]+(n*q[0]))
}if(q[1]==0){k.push(g[1]<o[1]?p[1]+t:p[1]-t)
}else{k.push(p[1]+(n*s[1]))
}}return k
};
var z,E,J,B,C,J,K,x,y,b,L,H,I,F,G;
this.compute=function(g,aa,n,Z,i,t,v,o){v=Math.max(o,(v||0));
b=Math.abs(g[0]-aa[0])+v;
L=Math.abs(g[1]-aa[1])+v;
x=Math.min(g[0],aa[0])-(v/2);
y=Math.min(g[1],aa[1])-(v/2);
J=g[0]<aa[0]?b-(v/2):(v/2);
K=g[1]<aa[1]?L-(v/2):(v/2);
B=g[0]<aa[0]?(v/2):b-(v/2);
C=g[1]<aa[1]?(v/2):L-(v/2);
z=A._findControlPoint([J,K],g,aa,n,Z,i,t);
E=A._findControlPoint([B,C],aa,g,Z,n,t,i);
var p=Math.min(J,B),r=Math.min(z[0],E[0]),U=Math.min(p,r),h=Math.max(J,B),l=Math.max(z[0],E[0]),X=Math.max(h,l);
if(X>b){b=X
}if(U<0){x+=U;
var u=Math.abs(U);
b+=u;
z[0]+=u;
J+=u;
B+=u;
E[0]+=u
}var k=Math.min(K,C),m=Math.min(z[1],E[1]),Y=Math.min(k,m),w=Math.max(K,C),V=Math.max(z[1],E[1]),q=Math.max(w,V);
if(q>L){L=q
}if(Y<0){y+=Y;
var W=Math.abs(Y);
L+=W;
z[1]+=W;
K+=W;
C+=W;
E[1]+=W
}if(o&&b<o){var s=(o-b)/2;
b=o;
x-=s;
J=J+s;
B=B+s;
z[0]=z[0]+s;
E[0]=E[0]+s
}if(o&&L<o){var s=(o-L)/2;
L=o;
y-=s;
K=K+s;
C=C+s;
z[1]=z[1]+s;
E[1]=E[1]+s
}c=[x,y,b,L,J,K,B,C,z[0],z[1],E[0],E[1]];
return c
};
var M=function(){return[{x:J,y:K},{x:z[0],y:z[1]},{x:E[0],y:E[1]},{x:B,y:C}]
};
var D=function(i,g,h){if(h){g=jsBezier.locationAlongCurveFrom(i,g>0?0:1,g)
}return g
};
this.pointOnPath=function(g,h){var i=M();
g=D(i,g,h);
return jsBezier.pointOnCurve(i,g)
};
this.gradientAtPoint=function(g,h){var i=M();
g=D(i,g,h);
return jsBezier.gradientAtPoint(i,g)
};
this.pointAlongPathFrom=function(h,g,i){var k=M();
h=D(k,h,i);
return jsBezier.pointAlongCurveFrom(k,h,g)
}
};
jsPlumb.Connectors.Flowchart=function(M){this.type="Flowchart";
M=M||{};
var H=this,X=M.stub||M.minStubLength||30,S=jsPlumbUtil.isArray(X)?X[0]:X,N=jsPlumbUtil.isArray(X)?X[1]:X,F=M.gap||0,W=M.midpoint||0.5,E=[],P=0,U=[],J=[],D=[],G,L,a=-Infinity,c=-Infinity,K=Infinity,b=Infinity,Y=M.grid,V=function(g,l){var h=g%l,k=Math.floor(g/l),i=h>(l/2)?1:0;
return(k+i)*l
},O=function(k,g,h,i){return[h||Y==null?k:V(k,Y[0]),i||Y==null?g:V(g,Y[1])]
},I=function(l,m,g,h){var i=0;
for(var k=0;
k<E.length;
k++){J[k]=E[k][5]/P;
U[k]=[i,(i+=(E[k][5]/P))]
}},Q=function(){D.push(E.length);
for(var g=0;
g<E.length;
g++){D.push(E[g][0]);
D.push(E[g][1])
}},R=function(h,l,i,k,m,n){var q=E.length==0?i:E[E.length-1][0],g=E.length==0?k:E[E.length-1][1],p=h==q?Infinity:0;
var o=Math.abs(h==q?l-g:h-q);
E.push([h,l,q,g,p,o]);
P+=o;
a=Math.max(a,h);
c=Math.max(c,l);
K=Math.min(K,h);
b=Math.min(b,l)
},T=function(i,g){if(g){i=i>0?i/P:(P+i)/P
}var l=U.length-1,k=1;
for(var h=0;
h<U.length;
h++){if(U[h][1]>=i){l=h;
k=(i-U[h][0])/J[h];
break
}}return{segment:E[l],proportion:k,index:l}
};
this.compute=function(aQ,ap,aM,r,h,C,i,t,s,z){E=[];
U=[];
P=0;
J=[];
a=c=-Infinity;
K=b=Infinity;
H.lineWidth=i;
G=ap[0]<aQ[0];
L=ap[1]<aQ[1];
var aL=i||1,aC=(aL/2)+(S+N),aI=(aL/2)+(N+S),aE=(aL/2)+(S+N),aK=(aL/2)+(N+S),w=h.orientation||h.getOrientation(aM),aR=C.orientation||C.getOrientation(r),ar=G?ap[0]:aQ[0],au=L?ap[1]:aQ[1],B=Math.abs(ap[0]-aQ[0])+aC+aI,l=Math.abs(ap[1]-aQ[1])+aE+aK;
if(w[0]==0&&w[1]==0||aR[0]==0&&aR[1]==0){var aH=B>l?0:1,aD=[1,0][aH];
w=[];
aR=[];
w[aH]=aQ[aH]>ap[aH]?-1:1;
aR[aH]=aQ[aH]>ap[aH]?1:-1;
w[aD]=0;
aR[aD]=0
}var at=G?(B-aI)+(F*w[0]):aC+(F*w[0]),av=L?(l-aK)+(F*w[1]):aE+(F*w[1]),p=G?aC+(F*aR[0]):(B-aI)+(F*aR[0]),q=L?aE+(F*aR[1]):(l-aK)+(F*aR[1]),aN=at+(w[0]*S),aO=av+(w[1]*S),A=p+(aR[0]*N),aq=q+(aR[1]*N),g=Math.abs(at-p)>(S+N),aP=Math.abs(av-q)>(S+N),ax=aN+((A-aN)*W),aB=aO+((aq-aO)*W),v=((w[0]*aR[0])+(w[1]*aR[1])),aJ=v==-1,aG=v==0,aF=v==1;
ar-=aC;
au-=aE;
D=[ar,au,B,l,at,av,p,q];
var u=[];
var n=w[0]==0?"y":"x",y=aJ?"opposite":aF?"orthogonal":"perpendicular",az=jsPlumbUtil.segment([at,av],[p,q]),ay=w[n=="x"?0:1]==-1,o={x:[null,4,3,2,1],y:[null,2,1,4,3]};
if(ay){az=o[n][az]
}R(aN,aO,at,av,p,q);
var k=function(Z,aa,ac,ab){return Z+(aa*((1-ac)*ab)+Math.max(S,N))
},aw={oppositex:function(){if(aM.elementId==r.elementId){var Z=aO+((1-h.y)*s.height)+Math.max(S,N);
return[[aN,Z],[A,Z]]
}else{if(g&&(az==1||az==2)){return[[ax,av],[ax,q]]
}else{return[[aN,aB],[A,aB]]
}}},orthogonalx:function(){if(az==1||az==2){return[[A,aO]]
}else{return[[aN,aq]]
}},perpendicularx:function(){var Z=(q+av)/2;
if((az==1&&aR[1]==1)||(az==2&&aR[1]==-1)){if(Math.abs(p-at)>Math.max(S,N)){return[[A,aO]]
}else{return[[aN,aO],[aN,Z],[A,Z]]
}}else{if((az==3&&aR[1]==-1)||(az==4&&aR[1]==1)){return[[aN,Z],[A,Z]]
}else{if((az==3&&aR[1]==1)||(az==4&&aR[1]==-1)){return[[aN,aq]]
}else{if((az==1&&aR[1]==-1)||(az==2&&aR[1]==1)){if(Math.abs(p-at)>Math.max(S,N)){return[[ax,aO],[ax,aq]]
}else{return[[aN,aq]]
}}}}}},oppositey:function(){if(aM.elementId==r.elementId){var Z=aN+((1-h.x)*s.width)+Math.max(S,N);
return[[Z,aO],[Z,aq]]
}else{if(aP&&(az==2||az==3)){return[[at,aB],[p,aB]]
}else{return[[ax,aO],[ax,aq]]
}}},orthogonaly:function(){if(az==2||az==3){return[[aN,aq]]
}else{return[[A,aO]]
}},perpendiculary:function(){var Z=(p+at)/2;
if((az==2&&aR[0]==-1)||(az==3&&aR[0]==1)){if(Math.abs(p-at)>Math.max(S,N)){return[[aN,aq]]
}else{return[[aN,aB],[A,aB]]
}}else{if((az==1&&aR[0]==-1)||(az==4&&aR[0]==1)){var Z=(p+at)/2;
return[[Z,aO],[Z,aq]]
}else{if((az==1&&aR[0]==1)||(az==4&&aR[0]==-1)){return[[A,aO]]
}else{if((az==2&&aR[0]==1)||(az==3&&aR[0]==-1)){if(Math.abs(q-av)>Math.max(S,N)){return[[aN,aB],[A,aB]]
}else{return[[A,aO]]
}}}}}}};
var x=aw[y+n]();
if(x){for(var m=0;
m<x.length;
m++){R(x[m][0],x[m][1],at,av,p,q)
}}R(A,aq,at,av,p,q);
R(p,q,at,av,p,q);
Q();
I(at,av,p,q);
if(c>D[3]){D[3]=c+(i*2)
}if(a>D[2]){D[2]=a+(i*2)
}return D
};
this.pointOnPath=function(h,g){return H.pointAlongPathFrom(h,0,g)
};
this.gradientAtPoint=function(h,g){return E[T(h,g)["index"]][4]
};
this.pointAlongPathFrom=function(i,g,k){var h=T(i,k),m=h.segment,p=h.proportion,n=E[h.index][5],o=E[h.index][4];
var l={x:o==Infinity?m[2]:m[2]>m[0]?m[0]+((1-p)*n)-g:m[2]+(p*n)+g,y:o==0?m[3]:m[3]>m[1]?m[1]+((1-p)*n)-g:m[3]+(p*n)+g,segmentInfo:h};
return l
}
};
jsPlumb.Endpoints.Dot=function(a){this.type="Dot";
var b=this;
a=a||{};
this.radius=a.radius||10;
this.defaultOffset=0.5*this.radius;
this.defaultInnerRadius=this.radius/3;
this.compute=function(o,r,c,p){var q=c.radius||b.radius,s=o[0]-q,n=o[1]-q;
return[s,n,q*2,q*2,q]
}
};
jsPlumb.Endpoints.Rectangle=function(a){this.type="Rectangle";
var b=this;
a=a||{};
this.width=a.width||20;
this.height=a.height||20;
this.compute=function(o,r,u,p){var q=u.width||b.width,s=u.height||b.height,t=o[0]-(q/2),c=o[1]-(s/2);
return[t,c,q,s]
}
};
var d=function(a){jsPlumb.DOMElementComponent.apply(this,arguments);
var c=this;
var b=[];
this.getDisplayElements=function(){return b
};
this.appendDisplayElement=function(h){b.push(h)
}
};
jsPlumb.Endpoints.Image=function(p){this.type="Image";
d.apply(this,arguments);
var a=this,q=false,r=false,s=p.width,t=p.height,c=null,u=p.endpoint;
this.img=new Image();
a.ready=false;
this.img.onload=function(){a.ready=true;
s=s||a.img.width;
t=t||a.img.height;
if(c){c(a)
}};
u.setImage=function(i,g){var h=i.constructor==String?i:i.src;
c=g;
a.img.src=i;
if(a.canvas!=null){a.canvas.setAttribute("src",i)
}};
u.setImage(p.src||p.url,p.onload);
this.compute=function(h,k,g,i){a.anchorPoint=h;
if(a.ready){return[h[0]-s/2,h[1]-t/2,s,t]
}else{return[0,0,0,0]
}};
a.canvas=document.createElement("img"),q=false;
a.canvas.style.margin=0;
a.canvas.style.padding=0;
a.canvas.style.outline=0;
a.canvas.style.position="absolute";
var o=p.cssClass?" "+p.cssClass:"";
a.canvas.className=jsPlumb.endpointClass+o;
if(s){a.canvas.setAttribute("width",s)
}if(t){a.canvas.setAttribute("height",t)
}jsPlumb.appendElement(a.canvas,p.parent);
a.attachListeners(a.canvas,a);
a.cleanup=function(){r=true
};
var b=function(h,i,k){if(!r){if(!q){a.canvas.setAttribute("src",a.img.src);
a.appendDisplayElement(a.canvas);
q=true
}var l=a.anchorPoint[0]-(s/2),g=a.anchorPoint[1]-(t/2);
jsPlumb.sizeCanvas(a.canvas,l,g,s,t)
}};
this.paint=function(g,h,i){if(a.ready){b(g,h,i)
}else{window.setTimeout(function(){a.paint(g,h,i)
},200)
}}
};
jsPlumb.Endpoints.Blank=function(a){var b=this;
this.type="Blank";
d.apply(this,arguments);
this.compute=function(k,m,c,l){return[k[0],k[1],10,0]
};
b.canvas=document.createElement("div");
b.canvas.style.display="block";
b.canvas.style.width="1px";
b.canvas.style.height="1px";
b.canvas.style.background="transparent";
b.canvas.style.position="absolute";
b.canvas.className=b._jsPlumb.endpointClass;
jsPlumb.appendElement(b.canvas,a.parent);
this.paint=function(c,i,k){jsPlumb.sizeCanvas(b.canvas,c[0],c[1],c[2],c[3])
}
};
jsPlumb.Endpoints.Triangle=function(a){this.type="Triangle";
a=a||{};
a.width=a.width||55;
a.height=a.height||55;
this.width=a.width;
this.height=a.height;
this.compute=function(n,q,b,o){var p=b.width||self.width,r=b.height||self.height,s=n[0]-(p/2),c=n[1]-(r/2);
return[s,c,p,r]
}
};
var f=function(a){var b=true,c=this;
this.isAppendedAtTopLevel=true;
this.component=a.component;
this.loc=a.location==null?0.5:a.location;
this.endpointLoc=a.endpointLocation==null?[0.5,0.5]:a.endpointLocation;
this.setVisible=function(h){b=h;
c.component.repaint()
};
this.isVisible=function(){return b
};
this.hide=function(){c.setVisible(false)
};
this.show=function(){c.setVisible(true)
};
this.incrementLocation=function(h){c.loc+=h;
c.component.repaint()
};
this.setLocation=function(h){c.loc=h;
c.component.repaint()
};
this.getLocation=function(){return c.loc
}
};
jsPlumb.Overlays.Arrow=function(a){this.type="Arrow";
f.apply(this,arguments);
this.isAppendedAtTopLevel=false;
a=a||{};
var i=this;
this.length=a.length||20;
this.width=a.width||20;
this.id=a.id;
var b=(a.direction||1)<0?-1:1,c=a.paintStyle||{lineWidth:1},k=a.foldback||0.623;
this.computeMaxSize=function(){return i.width*1.5
};
this.cleanup=function(){};
this.draw=function(O,G,C){var h,K,E,F,P;
if(O.pointAlongPathFrom){if(jsPlumbUtil.isString(i.loc)||i.loc>1||i.loc<0){var D=parseInt(i.loc);
h=O.pointAlongPathFrom(D,b*i.length/2,true),K=O.pointOnPath(D,true),E=jsPlumbUtil.pointOnLine(h,K,i.length)
}else{if(i.loc==1){h=O.pointOnPath(i.loc);
K=O.pointAlongPathFrom(i.loc,-1);
E=jsPlumbUtil.pointOnLine(h,K,i.length);
if(b==-1){var I=E;
E=h;
h=I
}}else{if(i.loc==0){E=O.pointOnPath(i.loc);
K=O.pointAlongPathFrom(i.loc,1);
h=jsPlumbUtil.pointOnLine(E,K,i.length);
if(b==-1){var I=E;
E=h;
h=I
}}else{h=O.pointAlongPathFrom(i.loc,b*i.length/2),K=O.pointOnPath(i.loc),E=jsPlumbUtil.pointOnLine(h,K,i.length)
}}}F=jsPlumbUtil.perpendicularLineTo(h,E,i.width);
P=jsPlumbUtil.pointOnLine(h,E,k*i.length);
var J=Math.min(h.x,F[0].x,F[1].x),L=Math.max(h.x,F[0].x,F[1].x),M=Math.min(h.y,F[0].y,F[1].y),N=Math.max(h.y,F[0].y,F[1].y);
var g={hxy:h,tail:F,cxy:P},l=c.strokeStyle||G.strokeStyle,H=c.fillStyle||G.strokeStyle,Q=c.lineWidth||G.lineWidth;
i.paint(O,g,Q,l,H,C);
return[J,L,M,N]
}else{return[0,0,0,0]
}}
};
jsPlumb.Overlays.PlainArrow=function(a){a=a||{};
var b=jsPlumb.extend(a,{foldback:1});
jsPlumb.Overlays.Arrow.call(this,b);
this.type="PlainArrow"
};
jsPlumb.Overlays.Diamond=function(a){a=a||{};
var c=a.length||40,b=jsPlumb.extend(a,{length:c/2,foldback:2});
jsPlumb.Overlays.Arrow.call(this,b);
this.type="Diamond"
};
var e=function(c){jsPlumb.DOMElementComponent.apply(this,arguments);
f.apply(this,arguments);
var q=this,p=false;
c=c||{};
this.id=c.id;
var a;
var m=function(){a=c.create(c.component);
a=jsPlumb.CurrentLibrary.getDOMElement(a);
a.style.position="absolute";
var g=c._jsPlumb.overlayClass+" "+(q.cssClass?q.cssClass:c.cssClass?c.cssClass:"");
a.className=g;
jsPlumb.appendElement(a,c.component.parent);
c._jsPlumb.getId(a);
q.attachListeners(a,q);
q.canvas=a
};
this.getElement=function(){if(a==null){m()
}return a
};
this.getDimensions=function(){return jsPlumb.CurrentLibrary.getSize(jsPlumb.CurrentLibrary.getElementObject(q.getElement()))
};
var o=null,b=function(g){if(o==null){o=q.getDimensions()
}return o
};
this.clearCachedDimensions=function(){o=null
};
this.computeMaxSize=function(){var g=b();
return Math.max(g[0],g[1])
};
var n=q.setVisible;
q.setVisible=function(g){n(g);
a.style.display=g?"block":"none"
};
this.cleanup=function(){if(a!=null){jsPlumb.CurrentLibrary.removeElement(a)
}};
this.paint=function(g,h,i){if(!p){q.getElement();
g.appendDisplayElement(a);
q.attachListeners(a,g);
p=true
}a.style.left=(i[0]+h.minx)+"px";
a.style.top=(i[1]+h.miny)+"px"
};
this.draw=function(w,v,u){var h=b();
if(h!=null&&h.length==2){var l={x:0,y:0};
if(w.pointOnPath){var k=q.loc,i=false;
if(jsPlumbUtil.isString(q.loc)||q.loc<0||q.loc>1){k=parseInt(q.loc);
i=true
}l=w.pointOnPath(k,i)
}else{var g=q.loc.constructor==Array?q.loc:q.endpointLoc;
l={x:g[0]*u[2],y:g[1]*u[3]}
}minx=l.x-(h[0]/2),miny=l.y-(h[1]/2);
q.paint(w,{minx:minx,miny:miny,td:h,cxy:l},u);
return[minx,minx+h[0],miny,miny+h[1]]
}else{return[0,0,0,0]
}};
this.reattachListeners=function(g){if(a){q.reattachListenersForElement(a,q,g)
}}
};
jsPlumb.Overlays.Custom=function(a){this.type="Custom";
e.apply(this,arguments)
};
jsPlumb.Overlays.Label=function(b){var m=this;
this.labelStyle=b.labelStyle||jsPlumb.Defaults.LabelStyle;
this.cssClass=this.labelStyle!=null?this.labelStyle.cssClass:null;
b.create=function(){return document.createElement("div")
};
jsPlumb.Overlays.Custom.apply(this,arguments);
this.type="Label";
var k=b.label||"",m=this,c=null;
this.setLabel=function(g){k=g;
c=null;
m.clearCachedDimensions();
l();
m.component.repaint()
};
var l=function(){if(typeof k=="function"){var g=k(m);
m.getElement().innerHTML=g.replace(/\r\n/g,"<br/>")
}else{if(c==null){c=k;
m.getElement().innerHTML=c.replace(/\r\n/g,"<br/>")
}}};
this.getLabel=function(){return k
};
var a=this.getDimensions;
this.getDimensions=function(){l();
return a()
}
}
})();
(function(){var f=function(c,a,h,b){this.m=(b-a)/(h-c);
this.b=-1*((this.m*c)-a);
this.rectIntersect=function(u,v,D,w){var x=[];
var A=(v-this.b)/this.m;
if(A>=u&&A<=(u+D)){x.push([A,(this.m*A)+this.b])
}var C=(this.m*(u+D))+this.b;
if(C>=v&&C<=(v+w)){x.push([(C-this.b)/this.m,C])
}var A=((v+w)-this.b)/this.m;
if(A>=u&&A<=(u+D)){x.push([A,(this.m*A)+this.b])
}var C=(this.m*u)+this.b;
if(C>=v&&C<=(v+w)){x.push([(C-this.b)/this.m,C])
}if(x.length==2){var y=(x[0][0]+x[1][0])/2,z=(x[0][1]+x[1][1])/2;
x.push([y,z]);
var B=y<=u+(D/2)?-1:1,g=z<=v+(w/2)?-1:1;
x.push([B,g]);
return x
}return null
}
},e=function(c,a,h,b){if(c<=h&&b<=a){return 1
}else{if(c<=h&&a<=b){return 2
}else{if(h<=c&&b>=a){return 3
}}}return 4
},d=function(p,q,n,r,o,a,b,s,c){if(s<=c){return[p,q]
}if(n==1){if(r[3]<=0&&o[3]>=1){return[p+(r[2]<0.5?-1*a:a),q]
}else{if(r[2]>=1&&o[2]<=0){return[p,q+(r[3]<0.5?-1*b:b)]
}else{return[p+(-1*a),q+(-1*b)]
}}}else{if(n==2){if(r[3]>=1&&o[3]<=0){return[p+(r[2]<0.5?-1*a:a),q]
}else{if(r[2]>=1&&o[2]<=0){return[p,q+(r[3]<0.5?-1*b:b)]
}else{return[p+(1*a),q+(-1*b)]
}}}else{if(n==3){if(r[3]>=1&&o[3]<=0){return[p+(r[2]<0.5?-1*a:a),q]
}else{if(r[2]<=0&&o[2]>=1){return[p,q+(r[3]<0.5?-1*b:b)]
}else{return[p+(-1*a),q+(-1*b)]
}}}else{if(n==4){if(r[3]<=0&&o[3]>=1){return[p+(r[2]<0.5?-1*a:a),q]
}else{if(r[2]<=0&&o[2]>=1){return[p,q+(r[3]<0.5?-1*b:b)]
}else{return[p+(1*a),q+(-1*b)]
}}}}}}};
jsPlumb.Connectors.StateMachine=function(y){var G=this,w=null,v,x,C,E,c=[],F=y.curviness||10,z=y.margin||5,b=y.proximityLimit||80,D=y.orientation&&y.orientation=="clockwise",A=y.loopbackRadius||25,B=false,H=y.showLoopback!==false;
this.type="StateMachine";
y=y||{};
this.compute=function(at,aj,k,ai,au,ag,al,m){var q=Math.abs(at[0]-aj[0]),h=Math.abs(at[1]-aj[1]),o=0.45*q,av=0.45*h;
q*=1.9;
h*=1.9;
al=al||1;
var s=Math.min(at[0],aj[0])-o,u=Math.min(at[1],aj[1])-av;
if(!H||(k.elementId!=ai.elementId)){B=false;
v=at[0]<aj[0]?o:q-o;
x=at[1]<aj[1]?av:h-av;
C=at[0]<aj[0]?q-o:o;
E=at[1]<aj[1]?h-av:av;
if(at[2]==0){v-=z
}if(at[2]==1){v+=z
}if(at[3]==0){x-=z
}if(at[3]==1){x+=z
}if(aj[2]==0){C-=z
}if(aj[2]==1){C+=z
}if(aj[3]==0){E-=z
}if(aj[3]==1){E+=z
}var t=(v+C)/2,ae=(x+E)/2,ar=(-1*t)/ae,l=Math.atan(ar),r=(ar==Infinity||ar==-Infinity)?0:Math.abs(F/2*Math.sin(l)),p=(ar==Infinity||ar==-Infinity)?0:Math.abs(F/2*Math.cos(l)),aq=e(v,x,C,E),ah=Math.sqrt(Math.pow(C-v,2)+Math.pow(E-x,2));
c=d(t,ae,aq,at,aj,F,F,ah,b);
var ak=Math.max(Math.abs(c[0]-v)*3,Math.abs(c[0]-C)*3,Math.abs(C-v),2*al,m),af=Math.max(Math.abs(c[1]-x)*3,Math.abs(c[1]-E)*3,Math.abs(E-x),2*al,m);
if(q<ak){var n=ak-q;
s-=(n/2);
v+=(n/2);
C+=(n/2);
q=ak;
c[0]+=(n/2)
}if(h<af){var aw=af-h;
u-=(aw/2);
x+=(aw/2);
E+=(aw/2);
h=af;
c[1]+=(aw/2)
}w=[s,u,q,h,v,x,C,E,c[0],c[1]]
}else{B=true;
var g=at[0],i=at[0],am=at[1]-z,ao=at[1]-z,an=g,ap=am-A;
q=((2*al)+(4*A)),h=((2*al)+(4*A));
s=an-A-al-A,u=ap-A-al-A;
w=[s,u,q,h,an-s,ap-u,A,D,g-s,am-u,i-s,ao-u]
}return w
};
var a=function(){return[{x:C,y:E},{x:c[0],y:c[1]},{x:c[0]+1,y:c[1]+1},{x:v,y:x}]
};
var I=function(h,i,g){if(g){i=jsBezier.locationAlongCurveFrom(h,i>0?0:1,i)
}return i
};
this.pointOnPath=function(h,n){if(B){if(n){var m=Math.PI*2*A;
h=h/m
}if(h>0&&h<1){h=1-h
}var l=(h*2*Math.PI)+(Math.PI/2),i=w[4]+(w[6]*Math.cos(l)),k=w[5]+(w[6]*Math.sin(l));
return{x:i,y:k}
}else{var g=a();
h=I(g,h,n);
return jsBezier.pointOnCurve(g,h)
}};
this.gradientAtPoint=function(i,k){if(B){if(k){var h=Math.PI*2*A;
i=i/h
}return Math.atan(i*2*Math.PI)
}else{var g=a();
i=I(g,i,k);
return jsBezier.gradientAtPoint(g,i)
}};
this.pointAlongPathFrom=function(g,p,h){if(B){if(h){var i=Math.PI*2*A;
g=g/i
}if(g>0&&g<1){g=1-g
}var i=2*Math.PI*w[6],o=p/i*2*Math.PI,l=(g*2*Math.PI)-o+(Math.PI/2),m=w[4]+(w[6]*Math.cos(l)),n=w[5]+(w[6]*Math.sin(l));
return{x:m,y:n}
}else{var k=a();
g=I(k,g,h);
return jsBezier.pointAlongCurveFrom(k,g,p)
}}
};
jsPlumb.Connectors.canvas.StateMachine=function(b){b=b||{};
var h=this,a=b.drawGuideline||true,c=b.avoidSelector;
jsPlumb.Connectors.StateMachine.apply(this,arguments);
jsPlumb.CanvasConnector.apply(this,arguments);
this._paint=function(g){if(g.length==10){h.ctx.beginPath();
h.ctx.moveTo(g[4],g[5]);
h.ctx.bezierCurveTo(g[8],g[9],g[8],g[9],g[6],g[7]);
h.ctx.stroke()
}else{h.ctx.save();
h.ctx.beginPath();
var m=0,n=2*Math.PI,o=g[7];
h.ctx.arc(g[4],g[5],g[6],0,n,o);
h.ctx.stroke();
h.ctx.closePath();
h.ctx.restore()
}};
this.createGradient=function(g,k){return k.createLinearGradient(g[4],g[5],g[6],g[7])
}
};
jsPlumb.Connectors.svg.StateMachine=function(){var a=this;
jsPlumb.Connectors.StateMachine.apply(this,arguments);
jsPlumb.SvgConnector.apply(this,arguments);
this.getPath=function(b){if(b.length==10){return"M "+b[4]+" "+b[5]+" C "+b[8]+" "+b[9]+" "+b[8]+" "+b[9]+" "+b[6]+" "+b[7]
}else{return"M"+(b[8]+4)+" "+b[9]+" A "+b[6]+" "+b[6]+" 0 1,0 "+(b[8]-4)+" "+b[9]
}}
};
jsPlumb.Connectors.vml.StateMachine=function(){jsPlumb.Connectors.StateMachine.apply(this,arguments);
jsPlumb.VmlConnector.apply(this,arguments);
var a=jsPlumb.vml.convertValue;
this.getPath=function(c){if(c.length==10){return"m"+a(c[4])+","+a(c[5])+" c"+a(c[8])+","+a(c[9])+","+a(c[8])+","+a(c[9])+","+a(c[6])+","+a(c[7])+" e"
}else{var n=a(c[8]-c[6]),o=a(c[9]-(2*c[6])),p=n+a(2*c[6]),q=o+a(2*c[6]),b=n+","+o+","+p+","+q;
var m="ar "+b+","+a(c[8])+","+a(c[9])+","+a(c[8])+","+a(c[9])+" e";
return m
}}
}
})();
(function(){var D={"stroke-linejoin":"joinstyle",joinstyle:"joinstyle",endcap:"endcap",miterlimit:"miterlimit"},I=null;
if(document.createStyleSheet&&document.namespaces){var A=[".jsplumb_vml","jsplumb\\:textbox","jsplumb\\:oval","jsplumb\\:rect","jsplumb\\:stroke","jsplumb\\:shape","jsplumb\\:group"],E="behavior:url(#default#VML);position:absolute;";
I=document.createStyleSheet();
for(var v=0;
v<A.length;
v++){I.addRule(A[v],E)
}document.namespaces.add("jsplumb","urn:schemas-microsoft-com:vml")
}jsPlumb.vml={};
var i=1000,u={},K=function(c,d){var a=jsPlumb.getId(c),b=u[a];
if(!b){b=F("group",[0,0,i,i],{"class":d});
b.style.backgroundColor="red";
u[a]=b;
jsPlumb.appendElement(b,c)
}return b
},G=function(b,a){for(var c in a){b[c]=a[c]
}},F=function(d,g,f,b,e,c){f=f||{};
var a=document.createElement("jsplumb:"+d);
if(c){e.appendElement(a,b)
}else{jsPlumb.CurrentLibrary.appendElement(a,b)
}a.className=(f["class"]?f["class"]+" ":"")+"jsplumb_vml";
C(a,g);
G(a,f);
return a
},C=function(b,c,a){b.style.left=c[0]+"px";
b.style.top=c[1]+"px";
b.style.width=c[2]+"px";
b.style.height=c[3]+"px";
b.style.position="absolute";
if(a){b.style.zIndex=a
}},x=jsPlumb.vml.convertValue=function(a){return Math.floor(a*i)
},J=function(a,c,b,d){if("transparent"===c){d.setOpacity(b,"0.0")
}else{d.setOpacity(b,"1.0")
}},w=function(f,l,c,b){var g={};
if(l.strokeStyle){g.stroked="true";
var a=jsPlumbUtil.convertStyle(l.strokeStyle,true);
g.strokecolor=a;
J(g,a,"stroke",c);
g.strokeweight=l.lineWidth+"px"
}else{g.stroked="false"
}if(l.fillStyle){g.filled="true";
var k=jsPlumbUtil.convertStyle(l.fillStyle,true);
g.fillcolor=k;
J(g,k,"fill",c)
}else{g.filled="false"
}if(l.dashstyle){if(c.strokeNode==null){c.strokeNode=F("stroke",[0,0,0,0],{dashstyle:l.dashstyle},f,b)
}else{c.strokeNode.dashstyle=l.dashstyle
}}else{if(l["stroke-dasharray"]&&l.lineWidth){var m=l["stroke-dasharray"].indexOf(",")==-1?" ":",",e=l["stroke-dasharray"].split(m),h="";
for(var d=0;
d<e.length;
d++){h+=(Math.floor(e[d]/l.lineWidth)+m)
}if(c.strokeNode==null){c.strokeNode=F("stroke",[0,0,0,0],{dashstyle:h},f,b)
}else{c.strokeNode.dashstyle=h
}}}G(f,g)
},z=function(){var b=this;
jsPlumb.jsPlumbUIComponent.apply(this,arguments);
this.opacityNodes={stroke:null,fill:null};
this.initOpacityNodes=function(c){b.opacityNodes.stroke=F("stroke",[0,0,1,1],{opacity:"0.0"},c,b._jsPlumb);
b.opacityNodes.fill=F("fill",[0,0,1,1],{opacity:"0.0"},c,b._jsPlumb)
};
this.setOpacity=function(e,c){var d=b.opacityNodes[e];
if(d){d.opacity=""+c
}};
var a=[];
this.getDisplayElements=function(){return a
};
this.appendDisplayElement=function(c,d){if(!d){b.canvas.parentNode.appendChild(c)
}a.push(c)
}
},H=jsPlumb.VmlConnector=function(a){var c=this;
c.strokeNode=null;
c.canvas=null;
z.apply(this,arguments);
var b=c._jsPlumb.connectorClass+(a.cssClass?(" "+a.cssClass):"");
this.paint=function(g,l,h){if(l!=null){var n=c.getPath(g),k={path:n};
if(l.outlineColor){var e=l.outlineWidth||1,d=l.lineWidth+(2*e),f={strokeStyle:jsPlumbUtil.convertStyle(l.outlineColor),lineWidth:d};
for(var m in D){f[m]=l[m]
}if(c.bgCanvas==null){k["class"]=b;
k.coordsize=(g[2]*i)+","+(g[3]*i);
c.bgCanvas=F("shape",g,k,a.parent,c._jsPlumb,true);
C(c.bgCanvas,g,c.getZIndex());
c.appendDisplayElement(c.bgCanvas,true);
c.attachListeners(c.bgCanvas,c);
c.initOpacityNodes(c.bgCanvas,["stroke"])
}else{k.coordsize=(g[2]*i)+","+(g[3]*i);
C(c.bgCanvas,g,c.getZIndex());
G(c.bgCanvas,k)
}w(c.bgCanvas,f,c)
}if(c.canvas==null){k["class"]=b;
k.coordsize=(g[2]*i)+","+(g[3]*i);
if(c.tooltip){k.label=c.tooltip
}c.canvas=F("shape",g,k,a.parent,c._jsPlumb,true);
c.appendDisplayElement(c.canvas,true);
c.attachListeners(c.canvas,c);
c.initOpacityNodes(c.canvas,["stroke"])
}else{k.coordsize=(g[2]*i)+","+(g[3]*i);
C(c.canvas,g,c.getZIndex());
G(c.canvas,k)
}w(c.canvas,l,c,c._jsPlumb)
}};
this.reattachListeners=function(){if(c.canvas){c.reattachListenersForElement(c.canvas,c)
}}
},B=window.VmlEndpoint=function(f){z.apply(this,arguments);
var e=null,c=this,d=null,a=null;
c.canvas=document.createElement("div");
c.canvas.style.position="absolute";
var b=c._jsPlumb.endpointClass+(f.cssClass?(" "+f.cssClass):"");
f._jsPlumb.appendElement(c.canvas,f.parent);
if(c.tooltip){c.canvas.setAttribute("label",c.tooltip)
}this.paint=function(k,g,h){var l={};
jsPlumb.sizeCanvas(c.canvas,k[0],k[1],k[2],k[3]);
if(e==null){l["class"]=b;
e=c.getVml([0,0,k[2],k[3]],l,h,c.canvas,c._jsPlumb);
c.attachListeners(e,c);
c.appendDisplayElement(e,true);
c.appendDisplayElement(c.canvas,true);
c.initOpacityNodes(e,["fill"])
}else{C(e,[0,0,k[2],k[3]]);
G(e,l)
}w(e,g,c)
};
this.reattachListeners=function(){if(e){c.reattachListenersForElement(e,c)
}}
};
jsPlumb.Connectors.vml.Bezier=function(){jsPlumb.Connectors.Bezier.apply(this,arguments);
H.apply(this,arguments);
this.getPath=function(a){return"m"+x(a[4])+","+x(a[5])+" c"+x(a[8])+","+x(a[9])+","+x(a[10])+","+x(a[11])+","+x(a[6])+","+x(a[7])+" e"
}
};
jsPlumb.Connectors.vml.Straight=function(){jsPlumb.Connectors.Straight.apply(this,arguments);
H.apply(this,arguments);
this.getPath=function(a){return"m"+x(a[4])+","+x(a[5])+" l"+x(a[6])+","+x(a[7])+" e"
}
};
jsPlumb.Connectors.vml.Flowchart=function(){jsPlumb.Connectors.Flowchart.apply(this,arguments);
H.apply(this,arguments);
this.getPath=function(b){var a="m "+x(b[4])+","+x(b[5])+" l";
for(var c=0;
c<b[8];
c++){a=a+" "+x(b[9+(c*2)])+","+x(b[10+(c*2)])
}a=a+" "+x(b[6])+","+x(b[7])+" e";
return a
}
};
jsPlumb.Endpoints.vml.Dot=function(){jsPlumb.Endpoints.Dot.apply(this,arguments);
B.apply(this,arguments);
this.getVml=function(b,a,d,c,e){return F("oval",b,a,c,e)
}
};
jsPlumb.Endpoints.vml.Rectangle=function(){jsPlumb.Endpoints.Rectangle.apply(this,arguments);
B.apply(this,arguments);
this.getVml=function(b,a,d,c,e){return F("rect",b,a,c,e)
}
};
jsPlumb.Endpoints.vml.Image=jsPlumb.Endpoints.Image;
jsPlumb.Endpoints.vml.Blank=jsPlumb.Endpoints.Blank;
jsPlumb.Overlays.vml.Label=jsPlumb.Overlays.Label;
jsPlumb.Overlays.vml.Custom=jsPlumb.Overlays.Custom;
var y=function(a,c){a.apply(this,c);
z.apply(this,c);
var d=this,b=null;
d.canvas=null;
d.isAppendedAtTopLevel=true;
var e=function(f,g){return"m "+x(f.hxy.x)+","+x(f.hxy.y)+" l "+x(f.tail[0].x)+","+x(f.tail[0].y)+" "+x(f.cxy.x)+","+x(f.cxy.y)+" "+x(f.tail[1].x)+","+x(f.tail[1].y)+" x e"
};
this.paint=function(h,s,t,r,m,o){var l={};
if(r){l.stroked="true";
l.strokecolor=jsPlumbUtil.convertStyle(r,true)
}if(t){l.strokeweight=t+"px"
}if(m){l.filled="true";
l.fillcolor=m
}var n=Math.min(s.hxy.x,s.tail[0].x,s.tail[1].x,s.cxy.x),p=Math.min(s.hxy.y,s.tail[0].y,s.tail[1].y,s.cxy.y),g=Math.max(s.hxy.x,s.tail[0].x,s.tail[1].x,s.cxy.x),k=Math.max(s.hxy.y,s.tail[0].y,s.tail[1].y,s.cxy.y),q=Math.abs(g-n),M=Math.abs(k-p),f=[n,p,q,M];
l.path=e(s,o);
l.coordsize=(o[2]*i)+","+(o[3]*i);
f[0]=o[0];
f[1]=o[1];
f[2]=o[2];
f[3]=o[3];
if(d.canvas==null){d.canvas=F("shape",f,l,h.canvas.parentNode,h._jsPlumb,true);
h.appendDisplayElement(d.canvas,true);
d.attachListeners(d.canvas,h);
d.attachListeners(d.canvas,d)
}else{C(d.canvas,f);
G(d.canvas,l)
}};
this.reattachListeners=function(){if(d.canvas){d.reattachListenersForElement(d.canvas,d)
}};
this.cleanup=function(){if(d.canvas!=null){jsPlumb.CurrentLibrary.removeElement(d.canvas)
}}
};
jsPlumb.Overlays.vml.Arrow=function(){y.apply(this,[jsPlumb.Overlays.Arrow,arguments])
};
jsPlumb.Overlays.vml.PlainArrow=function(){y.apply(this,[jsPlumb.Overlays.PlainArrow,arguments])
};
jsPlumb.Overlays.vml.Diamond=function(){y.apply(this,[jsPlumb.Overlays.Diamond,arguments])
}
})();
(function(){var U={joinstyle:"stroke-linejoin","stroke-linejoin":"stroke-linejoin","stroke-dashoffset":"stroke-dashoffset","stroke-linecap":"stroke-linecap"},G="stroke-dasharray",Q="dashstyle",aa="linearGradient",ad="radialGradient",ac="fill",ae="stop",D="stroke",O="stroke-width",X="style",T="none",J="jsplumb_gradient_",R="lineWidth",M={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml"},Y=function(a,c){for(var b in c){a.setAttribute(b,""+c[b])
}},Z=function(b,c){var a=document.createElementNS(M.svg,b);
c=c||{};
c.version="1.1";
c.xmlns=M.xhtml;
Y(a,c);
return a
},S=function(a){return"position:absolute;left:"+a[0]+"px;top:"+a[1]+"px"
},W=function(a){for(var b=0;
b<a.childNodes.length;
b++){if(a.childNodes[b].tagName==aa||a.childNodes[b].tagName==ad){a.removeChild(a.childNodes[b])
}}},H=function(c,h,l,a,g){var k=J+g._jsPlumb.idstamp();
W(c);
if(!l.gradient.offset){var e=Z(aa,{id:k,gradientUnits:"userSpaceOnUse"});
c.appendChild(e)
}else{var e=Z(ad,{id:k});
c.appendChild(e)
}for(var f=0;
f<l.gradient.stops.length;
f++){var i=f;
if(a.length==8){i=a[4]<a[6]?f:l.gradient.stops.length-1-f
}else{i=a[4]<a[6]?l.gradient.stops.length-1-f:f
}var d=jsPlumbUtil.convertStyle(l.gradient.stops[i][1],true);
var b=Z(ae,{offset:Math.floor(l.gradient.stops[f][0]*100)+"%","stop-color":d});
e.appendChild(b)
}var m=l.strokeStyle?D:ac;
h.setAttribute(X,m+":url(#"+k+")")
},F=function(c,g,i,a,f){if(i.gradient){H(c,g,i,a,f)
}else{W(c);
g.setAttribute(X,"")
}g.setAttribute(ac,i.fillStyle?jsPlumbUtil.convertStyle(i.fillStyle,true):T);
g.setAttribute(D,i.strokeStyle?jsPlumbUtil.convertStyle(i.strokeStyle,true):T);
if(i.lineWidth){g.setAttribute(O,i.lineWidth)
}if(i[Q]&&i[R]&&!i[G]){var b=i[Q].indexOf(",")==-1?" ":",",e=i[Q].split(b),h="";
e.forEach(function(k){h+=(Math.floor(k*i.lineWidth)+b)
});
g.setAttribute(G,h)
}else{if(i[G]){g.setAttribute(G,i[G])
}}for(var d in U){if(i[d]){g.setAttribute(U[d],i[d])
}}},N=function(a){var c=/([0-9].)(p[xt])\s(.*)/;
var b=a.match(c);
return{size:b[1]+b[2],font:b[3]}
},L=function(c,b,g){var a=g.split(" "),d=c.className,e=d.baseVal.split(" ");
for(var f=0;
f<a.length;
f++){if(b){if(e.indexOf(a[f])==-1){e.push(a[f])
}}else{var h=e.indexOf(a[f]);
if(h!=-1){e.splice(h,1)
}}}c.className.baseVal=e.join(" ")
},I=function(a,b){L(a,true,b)
},V=function(a,b){L(a,false,b)
};
jsPlumbUtil.svg={addClass:I,removeClass:V,node:Z,attr:Y,pos:S};
var K=function(b){var f=this,c=b.pointerEventsSpec||"all";
jsPlumb.jsPlumbUIComponent.apply(this,b.originalArgs);
f.canvas=null,f.path=null,f.svg=null;
var d=b.cssClass+" "+(b.originalArgs[0].cssClass||""),a={style:"",width:0,height:0,"pointer-events":c,position:"absolute"};
if(f.tooltip){a.title=f.tooltip
}f.svg=Z("svg",a);
if(b.useDivWrapper){f.canvas=document.createElement("div");
f.canvas.style.position="absolute";
jsPlumb.sizeCanvas(f.canvas,0,0,1,1);
f.canvas.className=d;
if(f.tooltip){f.canvas.setAttribute("title",f.tooltip)
}}else{Y(f.svg,{"class":d});
f.canvas=f.svg
}b._jsPlumb.appendElement(f.canvas,b.originalArgs[0]["parent"]);
if(b.useDivWrapper){f.canvas.appendChild(f.svg)
}var e=[f.canvas];
this.getDisplayElements=function(){return e
};
this.appendDisplayElement=function(g){e.push(g)
};
this.paint=function(l,g,h){if(g!=null){var i=l[0],k=l[1];
if(b.useDivWrapper){jsPlumb.sizeCanvas(f.canvas,l[0],l[1],l[2],l[3]);
i=0,k=0
}var m=S([i,k,l[2],l[3]]);
if(f.getZIndex()){m+=";z-index:"+f.getZIndex()+";"
}Y(f.svg,{style:m,width:l[2],height:l[3]});
f._paint.apply(this,arguments)
}}
};
var ab=jsPlumb.SvgConnector=function(a){var b=this;
K.apply(this,[{cssClass:a._jsPlumb.connectorClass,originalArgs:arguments,pointerEventsSpec:"none",tooltip:a.tooltip,_jsPlumb:a._jsPlumb}]);
this._paint=function(c,g){var d=b.getPath(c),i={d:d},e=null;
i["pointer-events"]="all";
if(g.outlineColor){var f=g.outlineWidth||1,h=g.lineWidth+(2*f),e=jsPlumb.CurrentLibrary.extend({},g);
e.strokeStyle=jsPlumbUtil.convertStyle(g.outlineColor);
e.lineWidth=h;
if(b.bgPath==null){b.bgPath=Z("path",i);
b.svg.appendChild(b.bgPath);
b.attachListeners(b.bgPath,b)
}else{Y(b.bgPath,i)
}F(b.svg,b.bgPath,e,c,b)
}if(b.path==null){b.path=Z("path",i);
b.svg.appendChild(b.path);
b.attachListeners(b.path,b)
}else{Y(b.path,i)
}F(b.svg,b.path,g,c,b)
};
this.reattachListeners=function(){if(b.bgPath){b.reattachListenersForElement(b.bgPath,b)
}if(b.path){b.reattachListenersForElement(b.path,b)
}}
};
jsPlumb.Connectors.svg.Bezier=function(a){jsPlumb.Connectors.Bezier.apply(this,arguments);
ab.apply(this,arguments);
this.getPath=function(b){var c="M "+b[4]+" "+b[5];
c+=(" C "+b[8]+" "+b[9]+" "+b[10]+" "+b[11]+" "+b[6]+" "+b[7]);
return c
}
};
jsPlumb.Connectors.svg.Straight=function(a){jsPlumb.Connectors.Straight.apply(this,arguments);
ab.apply(this,arguments);
this.getPath=function(b){return"M "+b[4]+" "+b[5]+" L "+b[6]+" "+b[7]
}
};
jsPlumb.Connectors.svg.Flowchart=function(){var a=this;
jsPlumb.Connectors.Flowchart.apply(this,arguments);
ab.apply(this,arguments);
this.getPath=function(p){var n="M "+p[4]+","+p[5],k=p[4],l=p[5];
for(var g=0;
g<p[8];
g++){var m=p[9+(g*2)],c=p[10+(g*2)],o=p[9+((g+1)*2)],d=p[10+((g+1)*2)],b=(m!=k)&&(c==l),f=(m==k)&&(c!=l),h=b?m>o?1:-1:0,i=f?c>d?1:-1:0,e=a.lineWidth/2;
n=n+" L "+m+" "+c;
n=n+" L "+(m+(h*e))+" "+(c+(i*e));
k=m;
l=c;
n=n+" M "+m+" "+c
}n=n+" L "+p[6]+","+p[7];
return n
}
};
var E=window.SvgEndpoint=function(a){var b=this;
K.apply(this,[{cssClass:a._jsPlumb.endpointClass,originalArgs:arguments,pointerEventsSpec:"all",useDivWrapper:true,_jsPlumb:a._jsPlumb}]);
this._paint=function(c,d){var e=jsPlumb.extend({},d);
if(e.outlineColor){e.strokeWidth=e.outlineWidth;
e.strokeStyle=jsPlumbUtil.convertStyle(e.outlineColor,true)
}if(b.node==null){b.node=b.makeNode(c,e);
b.svg.appendChild(b.node);
b.attachListeners(b.node,b)
}F(b.svg,b.node,e,c,b);
S(b.node,c)
};
this.reattachListeners=function(){if(b.node){b.reattachListenersForElement(b.node,b)
}}
};
jsPlumb.Endpoints.svg.Dot=function(){jsPlumb.Endpoints.Dot.apply(this,arguments);
E.apply(this,arguments);
this.makeNode=function(a,b){return Z("circle",{cx:a[2]/2,cy:a[3]/2,r:a[2]/2})
}
};
jsPlumb.Endpoints.svg.Rectangle=function(){jsPlumb.Endpoints.Rectangle.apply(this,arguments);
E.apply(this,arguments);
this.makeNode=function(a,b){return Z("rect",{width:a[2],height:a[3]})
}
};
jsPlumb.Endpoints.svg.Image=jsPlumb.Endpoints.Image;
jsPlumb.Endpoints.svg.Blank=jsPlumb.Endpoints.Blank;
jsPlumb.Overlays.svg.Label=jsPlumb.Overlays.Label;
jsPlumb.Overlays.svg.Custom=jsPlumb.Overlays.Custom;
var P=function(a,c){a.apply(this,c);
jsPlumb.jsPlumbUIComponent.apply(this,c);
this.isAppendedAtTopLevel=false;
var e=this,b=null;
this.paint=function(h,l,i,k,g){if(b==null){b=Z("path",{"pointer-events":"all"});
h.svg.appendChild(b);
e.attachListeners(b,h);
e.attachListeners(b,e)
}var f=c&&(c.length==1)?(c[0].cssClass||""):"";
Y(b,{d:d(l),"class":f,stroke:k?k:null,fill:g?g:null})
};
var d=function(f){return"M"+f.hxy.x+","+f.hxy.y+" L"+f.tail[0].x+","+f.tail[0].y+" L"+f.cxy.x+","+f.cxy.y+" L"+f.tail[1].x+","+f.tail[1].y+" L"+f.hxy.x+","+f.hxy.y
};
this.reattachListeners=function(){if(b){e.reattachListenersForElement(b,e)
}};
this.cleanup=function(){if(b!=null){jsPlumb.CurrentLibrary.removeElement(b)
}}
};
jsPlumb.Overlays.svg.Arrow=function(){P.apply(this,[jsPlumb.Overlays.Arrow,arguments])
};
jsPlumb.Overlays.svg.PlainArrow=function(){P.apply(this,[jsPlumb.Overlays.PlainArrow,arguments])
};
jsPlumb.Overlays.svg.Diamond=function(){P.apply(this,[jsPlumb.Overlays.Diamond,arguments])
};
jsPlumb.Overlays.svg.GuideLines=function(){var a=null,f=this,b=null,c,d;
jsPlumb.Overlays.GuideLines.apply(this,arguments);
this.paint=function(h,l,i,k,g){if(a==null){a=Z("path");
h.svg.appendChild(a);
f.attachListeners(a,h);
f.attachListeners(a,f);
c=Z("path");
h.svg.appendChild(c);
f.attachListeners(c,h);
f.attachListeners(c,f);
d=Z("path");
h.svg.appendChild(d);
f.attachListeners(d,h);
f.attachListeners(d,f)
}Y(a,{d:e(l[0],l[1]),stroke:"red",fill:null});
Y(c,{d:e(l[2][0],l[2][1]),stroke:"blue",fill:null});
Y(d,{d:e(l[3][0],l[3][1]),stroke:"green",fill:null})
};
var e=function(g,h){return"M "+g.x+","+g.y+" L"+h.x+","+h.y
}
}
})();
(function(){var x=null,s=function(a,b){return jsPlumb.CurrentLibrary.hasClass(A(a),b)
},A=function(a){return jsPlumb.CurrentLibrary.getElementObject(a)
},p=function(a){return jsPlumb.CurrentLibrary.getOffset(A(a))
},o=function(a){return jsPlumb.CurrentLibrary.getPageXY(a)
},v=function(a){return jsPlumb.CurrentLibrary.getClientXY(a)
};
var r=function(){var d=this;
d.overlayPlacements=[];
jsPlumb.jsPlumbUIComponent.apply(this,arguments);
jsPlumbUtil.EventGenerator.apply(this,arguments);
this._over=function(n){var E=p(A(d.canvas)),l=o(n),k=l[0]-E.left,m=l[1]-E.top;
if(k>0&&m>0&&k<d.canvas.width&&m<d.canvas.height){for(var i=0;
i<d.overlayPlacements.length;
i++){var h=d.overlayPlacements[i];
if(h&&(h[0]<=k&&h[1]>=k&&h[2]<=m&&h[3]>=m)){return true
}}var g=d.canvas.getContext("2d").getImageData(parseInt(k),parseInt(m),1,1);
return g.data[0]!=0||g.data[1]!=0||g.data[2]!=0||g.data[3]!=0
}return false
};
var e=false,f=false,a=null,b=false,c=function(g,h){return g!=null&&s(g,h)
};
this.mousemove=function(g){var l=o(g),h=v(g),i=document.elementFromPoint(h[0],h[1]),m=c(i,"_jsPlumb_overlay");
var k=x==null&&(c(i,"_jsPlumb_endpoint")||c(i,"_jsPlumb_connector"));
if(!e&&k&&d._over(g)){e=true;
d.fire("mouseenter",d,g);
return true
}else{if(e&&(!d._over(g)||!k)&&!m){e=false;
d.fire("mouseexit",d,g)
}}d.fire("mousemove",d,g)
};
this.click=function(g){if(e&&d._over(g)&&!b){d.fire("click",d,g)
}b=false
};
this.dblclick=function(g){if(e&&d._over(g)&&!b){d.fire("dblclick",d,g)
}b=false
};
this.mousedown=function(g){if(d._over(g)&&!f){f=true;
a=p(A(d.canvas));
d.fire("mousedown",d,g)
}};
this.mouseup=function(g){f=false;
d.fire("mouseup",d,g)
};
this.contextmenu=function(g){if(e&&d._over(g)&&!b){d.fire("contextmenu",d,g)
}b=false
}
};
var y=function(a){var b=document.createElement("canvas");
a._jsPlumb.appendElement(b,a.parent);
b.style.position="absolute";
if(a["class"]){b.className=a["class"]
}a._jsPlumb.getId(b,a.uuid);
if(a.tooltip){b.setAttribute("title",a.tooltip)
}return b
};
var q=function(a){r.apply(this,arguments);
var b=[];
this.getDisplayElements=function(){return b
};
this.appendDisplayElement=function(c){b.push(c)
}
};
var t=jsPlumb.CanvasConnector=function(a){q.apply(this,arguments);
var d=function(e,g){c.ctx.save();
jsPlumb.extend(c.ctx,g);
if(g.gradient){var f=c.createGradient(e,c.ctx);
for(var h=0;
h<g.gradient.stops.length;
h++){f.addColorStop(g.gradient.stops[h][0],g.gradient.stops[h][1])
}c.ctx.strokeStyle=f
}c._paint(e,g);
c.ctx.restore()
};
var c=this,b=c._jsPlumb.connectorClass+" "+(a.cssClass||"");
c.canvas=y({"class":b,_jsPlumb:c._jsPlumb,parent:a.parent,tooltip:a.tooltip});
c.ctx=c.canvas.getContext("2d");
c.appendDisplayElement(c.canvas);
c.paint=function(e,h){if(h!=null){jsPlumb.sizeCanvas(c.canvas,e[0],e[1],e[2],e[3]);
if(c.getZIndex()){c.canvas.style.zIndex=c.getZIndex()
}if(h.outlineColor!=null){var f=h.outlineWidth||1,i=h.lineWidth+(2*f),g={strokeStyle:h.outlineColor,lineWidth:i};
d(e,g)
}d(e,h)
}}
};
var z=function(a){var c=this;
q.apply(this,arguments);
var b=c._jsPlumb.endpointClass+" "+(a.cssClass||""),d={"class":b,_jsPlumb:c._jsPlumb,parent:a.parent,tooltip:c.tooltip};
c.canvas=y(d);
c.ctx=c.canvas.getContext("2d");
c.appendDisplayElement(c.canvas);
this.paint=function(e,h,k){jsPlumb.sizeCanvas(c.canvas,e[0],e[1],e[2],e[3]);
if(h.outlineColor!=null){var f=h.outlineWidth||1,i=h.lineWidth+(2*f);
var g={strokeStyle:h.outlineColor,lineWidth:i}
}c._paint.apply(this,arguments)
}
};
jsPlumb.Endpoints.canvas.Dot=function(a){jsPlumb.Endpoints.Dot.apply(this,arguments);
z.apply(this,arguments);
var b=this,c=function(f){try{return parseInt(f)
}catch(e){if(f.substring(f.length-1)=="%"){return parseInt(f.substring(0,f-1))
}}},d=function(e){var g=b.defaultOffset,f=b.defaultInnerRadius;
e.offset&&(g=c(e.offset));
e.innerRadius&&(f=c(e.innerRadius));
return[g,f]
};
this._paint=function(f,n,i){if(n!=null){var e=b.canvas.getContext("2d"),m=i.getOrientation(b);
jsPlumb.extend(e,n);
if(n.gradient){var l=d(n.gradient),h=m[1]==1?l[0]*-1:l[0],C=m[0]==1?l[0]*-1:l[0],g=e.createRadialGradient(f[4],f[4],f[4],f[4]+C,f[4]+h,l[1]);
for(var k=0;
k<n.gradient.stops.length;
k++){g.addColorStop(n.gradient.stops[k][0],n.gradient.stops[k][1])
}e.fillStyle=g
}e.beginPath();
e.arc(f[4],f[4],f[4],0,Math.PI*2,true);
e.closePath();
if(n.fillStyle||n.gradient){e.fill()
}if(n.strokeStyle){e.stroke()
}}}
};
jsPlumb.Endpoints.canvas.Rectangle=function(a){var b=this;
jsPlumb.Endpoints.Rectangle.apply(this,arguments);
z.apply(this,arguments);
this._paint=function(h,c,k){var e=b.canvas.getContext("2d"),m=k.getOrientation(b);
jsPlumb.extend(e,c);
if(c.gradient){var f=m[1]==1?h[3]:m[1]==0?h[3]/2:0;
var g=m[1]==-1?h[3]:m[1]==0?h[3]/2:0;
var n=m[0]==1?h[2]:m[0]==0?h[2]/2:0;
var d=m[0]==-1?h[2]:m[0]==0?h[2]/2:0;
var i=e.createLinearGradient(n,f,d,g);
for(var l=0;
l<c.gradient.stops.length;
l++){i.addColorStop(c.gradient.stops[l][0],c.gradient.stops[l][1])
}e.fillStyle=i
}e.beginPath();
e.rect(0,0,h[2],h[3]);
e.closePath();
if(c.fillStyle||c.gradient){e.fill()
}if(c.strokeStyle){e.stroke()
}}
};
jsPlumb.Endpoints.canvas.Triangle=function(a){var b=this;
jsPlumb.Endpoints.Triangle.apply(this,arguments);
z.apply(this,arguments);
this._paint=function(i,f,l){var E=i[2],e=i[3],g=i[0],h=i[1],d=b.canvas.getContext("2d"),k=0,m=0,n=0,c=l.getOrientation(b);
if(c[0]==1){k=E;
m=e;
n=180
}if(c[1]==-1){k=E;
n=90
}if(c[1]==1){m=e;
n=-90
}d.fillStyle=f.fillStyle;
d.translate(k,m);
d.rotate(n*Math.PI/180);
d.beginPath();
d.moveTo(0,0);
d.lineTo(E/2,e/2);
d.lineTo(0,e);
d.closePath();
if(f.fillStyle||f.gradient){d.fill()
}if(f.strokeStyle){d.stroke()
}}
};
jsPlumb.Endpoints.canvas.Image=jsPlumb.Endpoints.Image;
jsPlumb.Endpoints.canvas.Blank=jsPlumb.Endpoints.Blank;
jsPlumb.Connectors.canvas.Bezier=function(){var a=this;
jsPlumb.Connectors.Bezier.apply(this,arguments);
t.apply(this,arguments);
this._paint=function(b,c){a.ctx.beginPath();
a.ctx.moveTo(b[4],b[5]);
a.ctx.bezierCurveTo(b[8],b[9],b[10],b[11],b[6],b[7]);
a.ctx.stroke()
};
this.createGradient=function(b,d,c){return a.ctx.createLinearGradient(b[6],b[7],b[4],b[5])
}
};
jsPlumb.Connectors.canvas.Straight=function(){var a=this,b=[null,[1,-1],[1,1],[-1,1],[-1,-1]];
jsPlumb.Connectors.Straight.apply(this,arguments);
t.apply(this,arguments);
this._paint=function(d,K){a.ctx.beginPath();
if(K.dashstyle&&K.dashstyle.split(" ").length==2){var n=K.dashstyle.split(" ");
if(n.length!=2){n=[2,2]
}var f=[n[0]*K.lineWidth,n[1]*K.lineWidth],k=(d[6]-d[4])/(d[7]-d[5]),H=jsPlumbUtil.segment([d[4],d[5]],[d[6],d[7]]),l=b[H],I=Math.atan(k),i=Math.sqrt(Math.pow(d[6]-d[4],2)+Math.pow(d[7]-d[5],2)),g=Math.floor(i/(f[0]+f[1])),m=[d[4],d[5]];
for(var h=0;
h<g;
h++){a.ctx.moveTo(m[0],m[1]);
var e=m[0]+(Math.abs(Math.sin(I)*f[0])*l[0]),J=m[1]+(Math.abs(Math.cos(I)*f[0])*l[1]),L=m[0]+(Math.abs(Math.sin(I)*(f[0]+f[1]))*l[0]),c=m[1]+(Math.abs(Math.cos(I)*(f[0]+f[1]))*l[1]);
a.ctx.lineTo(e,J);
m=[L,c]
}a.ctx.moveTo(m[0],m[1]);
a.ctx.lineTo(d[6],d[7])
}else{a.ctx.moveTo(d[4],d[5]);
a.ctx.lineTo(d[6],d[7])
}a.ctx.stroke()
};
this.createGradient=function(c,d){return d.createLinearGradient(c[4],c[5],c[6],c[7])
}
};
jsPlumb.Connectors.canvas.Flowchart=function(){var a=this;
jsPlumb.Connectors.Flowchart.apply(this,arguments);
t.apply(this,arguments);
this._paint=function(b,c){a.ctx.beginPath();
a.ctx.moveTo(b[4],b[5]);
for(var d=0;
d<b[8];
d++){a.ctx.lineTo(b[9+(d*2)],b[10+(d*2)])
}a.ctx.lineTo(b[6],b[7]);
a.ctx.stroke()
};
this.createGradient=function(b,c){return c.createLinearGradient(b[4],b[5],b[6],b[7])
}
};
jsPlumb.Overlays.canvas.Label=jsPlumb.Overlays.Label;
jsPlumb.Overlays.canvas.Custom=jsPlumb.Overlays.Custom;
var u=function(){jsPlumb.jsPlumbUIComponent.apply(this,arguments)
};
var w=function(a,b){a.apply(this,b);
u.apply(this,b);
this.paint=function(f,d,h,c,e){var g=f.ctx;
g.lineWidth=h;
g.beginPath();
g.moveTo(d.hxy.x,d.hxy.y);
g.lineTo(d.tail[0].x,d.tail[0].y);
g.lineTo(d.cxy.x,d.cxy.y);
g.lineTo(d.tail[1].x,d.tail[1].y);
g.lineTo(d.hxy.x,d.hxy.y);
g.closePath();
if(c){g.strokeStyle=c;
g.stroke()
}if(e){g.fillStyle=e;
g.fill()
}}
};
jsPlumb.Overlays.canvas.Arrow=function(){w.apply(this,[jsPlumb.Overlays.Arrow,arguments])
};
jsPlumb.Overlays.canvas.PlainArrow=function(){w.apply(this,[jsPlumb.Overlays.PlainArrow,arguments])
};
jsPlumb.Overlays.canvas.Diamond=function(){w.apply(this,[jsPlumb.Overlays.Diamond,arguments])
}
})();
(function(b){jsPlumb.CurrentLibrary={addClass:function(f,a){f=jsPlumb.CurrentLibrary.getElementObject(f);
try{if(f[0].className.constructor==SVGAnimatedString){jsPlumbUtil.svg.addClass(f[0],a)
}}catch(e){}f.addClass(a)
},animate:function(e,f,a){e.animate(f,a)
},appendElement:function(d,a){jsPlumb.CurrentLibrary.getElementObject(a).append(d)
},ajax:function(a){a=a||{};
a.type=a.type||"get";
b.ajax(a)
},bind:function(a,f,e){a=jsPlumb.CurrentLibrary.getElementObject(a);
a.bind(f,e)
},dragEvents:{start:"start",stop:"stop",drag:"drag",step:"step",over:"over",out:"out",drop:"drop",complete:"complete"},extend:function(d,a){return b.extend(d,a)
},getAttribute:function(a,d){return a.attr(d)
},getClientXY:function(a){return[a.clientX,a.clientY]
},getDragObject:function(a){return a[1].draggable
},getDragScope:function(a){return a.draggable("option","scope")
},getDropEvent:function(a){return a[0]
},getDropScope:function(a){return a.droppable("option","scope")
},getDOMElement:function(a){if(typeof(a)=="string"){return document.getElementById(a)
}else{if(a.context||a.length!=null){return a[0]
}else{return a
}}},getElementObject:function(a){return typeof(a)=="string"?b("#"+a):b(a)
},getOffset:function(a){return a.offset()
},getOriginalEvent:function(a){return a.originalEvent
},getPageXY:function(a){return[a.pageX,a.pageY]
},getParent:function(a){return jsPlumb.CurrentLibrary.getElementObject(a).parent()
},getScrollLeft:function(a){return a.scrollLeft()
},getScrollTop:function(a){return a.scrollTop()
},getSelector:function(a){return b(a)
},getSize:function(a){return[a.outerWidth(),a.outerHeight()]
},getTagName:function(a){var d=jsPlumb.CurrentLibrary.getElementObject(a);
return d.length>0?d[0].tagName:null
},getUIPosition:function(h,g){g=g||1;
if(h.length==1){ret={left:h[0].pageX,top:h[0].pageY}
}else{var f=h[1],a=f.offset;
ret=a||f.absolutePosition;
f.position.left/=g;
f.position.top/=g
}return{left:ret.left/g,top:ret.top/g}
},hasClass:function(d,a){return d.hasClass(a)
},initDraggable:function(f,a,e){a=a||{};
a.helper=null;
if(e){a.scope=a.scope||jsPlumb.Defaults.Scope
}f.draggable(a)
},initDroppable:function(d,a){a.scope=a.scope||jsPlumb.Defaults.Scope;
d.droppable(a)
},isAlreadyDraggable:function(a){a=jsPlumb.CurrentLibrary.getElementObject(a);
return a.hasClass("ui-draggable")
},isDragSupported:function(d,a){return d.draggable
},isDropSupported:function(d,a){return d.droppable
},removeClass:function(f,a){f=jsPlumb.CurrentLibrary.getElementObject(f);
try{if(f[0].className.constructor==SVGAnimatedString){jsPlumbUtil.svg.removeClass(f[0],a)
}}catch(e){}f.removeClass(a)
},removeElement:function(a,d){jsPlumb.CurrentLibrary.getElementObject(a).remove()
},setAttribute:function(f,e,a){f.attr(e,a)
},setDraggable:function(d,a){d.draggable("option","disabled",!a)
},setDragScope:function(d,a){d.draggable("option","scope",a)
},setOffset:function(a,d){jsPlumb.CurrentLibrary.getElementObject(a).offset(d)
},trigger:function(g,f,a){var h=jQuery._data(jsPlumb.CurrentLibrary.getElementObject(g)[0],"handle");
h(a)
},unbind:function(a,f,e){a=jsPlumb.CurrentLibrary.getElementObject(a);
a.unbind(f,e)
}};
b(document).ready(jsPlumb.init)
})(jQuery);
(function(){"undefined"==typeof Math.sgn&&(Math.sgn=function(a){return 0==a?0:0<a?1:-1
});
var r={subtract:function(a,b){return{x:a.x-b.x,y:a.y-b.y}
},dotProduct:function(a,b){return a.x*b.x+a.y*b.y
},square:function(a){return Math.sqrt(a.x*a.x+a.y*a.y)
},scale:function(a,b){return{x:a.x*b,y:a.y*b}
}},p=Math.pow(2,-65),n=function(f,g){for(var z=[],i=g.length-1,a=2*i-1,A=[],h=[],c=[],b=[],d=[[1,0.6,0.3,0.1],[0.4,0.6,0.6,0.4],[0.1,0.3,0.6,1]],k=0;
k<=i;
k++){A[k]=r.subtract(g[k],f)
}for(k=0;
k<=i-1;
k++){h[k]=r.subtract(g[k+1],g[k]);
h[k]=r.scale(h[k],3)
}for(k=0;
k<=i-1;
k++){for(var e=0;
e<=i;
e++){c[k]||(c[k]=[]);
c[k][e]=r.dotProduct(h[k],A[e])
}}for(k=0;
k<=a;
k++){b[k]||(b[k]=[]);
b[k].y=0;
b[k].x=parseFloat(k)/a
}a=i-1;
for(A=0;
A<=i+a;
A++){k=Math.max(0,A-a);
for(h=Math.min(A,i);
k<=h;
k++){j=A-k;
b[k+j].y=b[k+j].y+c[j][k]*d[j][k]
}}i=g.length-1;
b=u(b,2*i-1,z,0);
a=r.subtract(f,g[0]);
c=r.square(a);
for(k=d=0;
k<b;
k++){a=r.subtract(f,l(g,i,z[k],null,null));
a=r.square(a);
if(a<c){c=a;
d=z[k]
}}a=r.subtract(f,g[i]);
a=r.square(a);
if(a<c){c=a;
d=1
}return{location:d,distance:c}
},u=function(c,e,i,g){var D=[],k=[],f=[],F=[],E=0,G,h;
h=Math.sgn(c[0].y);
for(var b=1;
b<=e;
b++){G=Math.sgn(c[b].y);
G!=h&&E++;
h=G
}switch(E){case 0:return 0;
case 1:if(g>=64){i[0]=(c[0].x+c[e].x)/2;
return 1
}var d,E=c[0].y-c[e].y;
h=c[e].x-c[0].x;
b=c[0].x*c[e].y-c[e].x*c[0].y;
G=max_distance_below=0;
for(d=1;
d<e;
d++){var a=E*c[d].x+h*c[d].y+b;
a>G?G=a:a<max_distance_below&&(max_distance_below=a)
}d=h;
G=(1*(b-G)-d*0)*(1/(0*d-E*1));
d=h;
h=b-max_distance_below;
E=(1*h-d*0)*(1/(0*d-E*1));
h=Math.min(G,E);
if(Math.max(G,E)-h<p){f=c[e].x-c[0].x;
F=c[e].y-c[0].y;
i[0]=0+1*(f*(c[0].y-0)-F*(c[0].x-0))*(1/(f*0-F*1));
return 1
}}l(c,e,0.5,D,k);
c=u(D,e,f,g+1);
e=u(k,e,F,g+1);
for(g=0;
g<c;
g++){i[g]=f[g]
}for(g=0;
g<e;
g++){i[g+c]=F[g]
}return c+e
},l=function(a,b,e,d,g){for(var f=[[]],c=0;
c<=b;
c++){f[0][c]=a[c]
}for(a=1;
a<=b;
a++){for(c=0;
c<=b-a;
c++){f[a]||(f[a]=[]);
f[a][c]||(f[a][c]={});
f[a][c].x=(1-e)*f[a-1][c].x+e*f[a-1][c+1].x;
f[a][c].y=(1-e)*f[a-1][c].y+e*f[a-1][c+1].y
}}if(d!=null){for(c=0;
c<=b;
c++){d[c]=f[c][0]
}}if(g!=null){for(c=0;
c<=b;
c++){g[c]=f[b-c][c]
}}return f[b][0]
},o={},q=function(h){var i=o[h];
if(!i){var i=[],c=function(k){return function(){return k
}
},b=function(){return function(k){return k
}
},e=function(){return function(k){return 1-k
}
},d=function(k){return function(A){for(var y=1,z=0;
z<k.length;
z++){y=y*k[z](A)
}return y
}
};
i.push(new function(){return function(k){return Math.pow(k,h)
}
});
for(var a=1;
a<h;
a++){for(var g=[new c(h)],f=0;
f<h-a;
f++){g.push(new b)
}for(f=0;
f<a;
f++){g.push(new e)
}i.push(new d(g))
}i.push(new function(){return function(k){return Math.pow(1-k,h)
}
});
o[h]=i
}return i
},s=function(a,b){for(var d=q(a.length-1),c=0,f=0,e=0;
e<a.length;
e++){c=c+a[e].x*d[e](b);
f=f+a[e].y*d[e](b)
}return{x:c,y:f}
},t=function(a,b,e){for(var d=s(a,b),g=0,f=e>0?1:-1,c=null;
g<Math.abs(e);
){b=b+0.005*f;
c=s(a,b);
g=g+Math.sqrt(Math.pow(c.x-d.x,2)+Math.pow(c.y-d.y,2));
d=c
}return{point:c,location:b}
},m=function(a,b){var d=s(a,b),c=s(a.slice(0,a.length-1),b),e=c.y-d.y,d=c.x-d.x;
return e==0?Infinity:Math.atan(e/d)
};
window.jsBezier={distanceFromCurve:n,gradientAtPoint:m,gradientAtPointAlongCurveFrom:function(a,b,c){b=t(a,b,c);
if(b.location>1){b.location=1
}if(b.location<0){b.location=0
}return m(a,b.location)
},nearestPointOnCurve:function(a,b){var c=n(a,b);
return{point:l(b,b.length-1,c.location,null,null),location:c.location}
},pointOnCurve:s,pointAlongCurveFrom:function(a,b,c){return t(a,b,c).point
},perpendicularToCurveAt:function(a,b,d,c){b=t(a,b,c==null?0:c);
a=m(a,b.location);
c=Math.atan(-1/a);
a=d/2*Math.sin(c);
d=d/2*Math.cos(c);
return[{x:b.point.x+d,y:b.point.y+a},{x:b.point.x-d,y:b.point.y-a}]
},locationAlongCurveFrom:function(a,b,c){return t(a,b,c).location
}}
})();