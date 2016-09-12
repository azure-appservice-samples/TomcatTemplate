if(!ORYX){var ORYX={}
}if(!ORYX.Plugins){ORYX.Plugins={}
}ORYX.Plugins.AbstractPlugin=Clazz.extend({facade:null,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.onLoaded.bind(this))
},onLoaded:function(){},onSelectionChanged:function(){},showOverlay:function(a,b,d,c){if(!(a instanceof Array)){a=[a]
}a=a.map(function(e){var f=e;
if(typeof e=="string"){f=this.facade.getCanvas().getChildShapeByResourceId(e);
f=f||this.facade.getCanvas().getChildById(e,true)
}return f
}.bind(this)).compact();
if(!this.overlayID){this.overlayID=this.type+ORYX.Editor.provideId()
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:this.overlayID,shapes:a,attributes:b,node:d,nodePosition:c||"NW"})
},hideOverlay:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:this.overlayID})
},doTransform:function(d,a){if(!a||!d){return""
}var c=new DOMParser();
var i=c.parseFromString(d,"text/xml");
source=a;
new Ajax.Request(source,{asynchronous:false,method:"get",onSuccess:function(k){xsl=k.responseText
}.bind(this),onFailure:(function(k){ORYX.Log.error("XSL load failed"+k)
}).bind(this)});
var f=new XSLTProcessor();
var h=new DOMParser();
var e=h.parseFromString(xsl,"text/xml");
f.importStylesheet(e);
try{var j=f.transformToFragment(i,document);
var b=(new XMLSerializer()).serializeToString(j);
b=!b.startsWith("<?xml")?'<?xml version="1.0" encoding="UTF-8"?>'+b:b;
return b
}catch(g){return -1
}},openXMLWindow:function(a){var b=window.open("data:application/xml,"+encodeURIComponent(a),"_blank","resizable=yes,width=600,height=600,toolbar=0,scrollbars=yes")
},openDownloadWindow:function(b,c){var d=window.open("");
if(d!=null){d.document.open();
d.document.write("<html><body>");
var a=d.document.createElement("form");
d.document.body.appendChild(a);
var e=function(f,g){var h=document.createElement("input");
h.name=f;
h.type="hidden";
h.value=g;
return h
};
a.appendChild(e("download",c));
a.appendChild(e("file",b));
a.method="POST";
d.document.write("</body></html>");
d.document.close();
a.action=ORYX.PATH+"/download";
a.submit()
}},getSerializedDOM:function(){var a=DataManager.serializeDOM(this.facade);
a='<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:b3mn="http://b3mn.org/2007/b3mn" xmlns:ext="http://b3mn.org/2007/ext" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:atom="http://b3mn.org/2007/atom+xhtml"><head profile="http://purl.org/NET/erdf/profile"><link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" /><link rel="schema.dcTerms" href="http://purl.org/dc/terms/ " /><link rel="schema.b3mn" href="http://b3mn.org" /><link rel="schema.oryx" href="http://oryx-editor.org/" /><link rel="schema.raziel" href="http://raziel.org/" /><base href="'+location.href.split("?")[0]+'" /></head><body>'+a+"</body></html>";
return a
},enableReadOnlyMode:function(){this.facade.disableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN);
this._stopSelectionChange=function(){if(this.facade.getSelection().length>0){this.facade.setSelection([])
}};
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,this._stopSelectionChange.bind(this))
},disableReadOnlyMode:function(){this.facade.enableEvent(ORYX.CONFIG.EVENT_MOUSEDOWN);
if(this._stopSelectionChange){this.facade.unregisterOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED,this._stopSelectionChange.bind(this));
this._stopSelectionChange=undefined
}},getRDFFromDOM:function(){try{var c="";
source=ORYX.PATH+"lib/extract-rdf.xsl";
new Ajax.Request(source,{asynchronous:false,method:"get",onSuccess:function(e){c=e.responseText
}.bind(this),onFailure:(function(e){ORYX.Log.error("XSL load failed"+e)
}).bind(this)});
var i=new DOMParser();
var h=i.parseFromString(this.getSerializedDOM(),"text/xml");
var f=i.parseFromString(c,"text/xml");
var b=new XSLTProcessor();
b.importStylesheet(f);
var a=b.transformToFragment(h,document);
var d=new XMLSerializer();
return d.serializeToString(a)
}catch(g){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Error: "+error,title:""});
return""
}},isStencilSetExtensionLoaded:function(a){return this.facade.getStencilSets().values().any(function(b){return b.extensions().keys().any(function(c){return c==a
}.bind(this))
}.bind(this))
},doLayout:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LAYOUT,shapes:a})
},layoutEdges:function(c,f,e){var g=f.findAll(function(k){return k.dockers.length>2
}.bind(this));
if(g.length>0){var b=c.absoluteXY();
var a={x:b.x-e.x,y:b.y-e.y};
b.x+=c.bounds.width()/2;
b.y+=c.bounds.height()/2;
oldCenter=Object.clone(b);
oldCenter.x-=e?e.x:0;
oldCenter.y-=e?e.y:0;
var j={x:b.x-(c.bounds.width()/2),y:b.y-(c.bounds.height()/2)};
var h={x:b.x+(c.bounds.width()/2),y:b.y+(c.bounds.height()/2)};
var i=function(m,k){var n=m.center().x-k.center().x;
var l=m.center().y-k.center().y;
if(Math.abs(n)<3){m.moveBy({x:(e.xs?(((e.xs*(m.center().x-a.x))+e.x+a.x)-m.center().x):e.x)-n,y:0})
}else{if(Math.abs(l)<3){m.moveBy({x:0,y:(e.ys?(((e.ys*(m.center().y-a.y))+e.y+a.y)-m.center().y):e.y)-l})
}}};
var d=function(k){var l=k.dockers.first().getDockedShape();
var m=k.dockers.last().getDockedShape();
if(l){l=l.absoluteBounds();
l.widen(5)
}if(m){m=m.absoluteBounds();
m.widen(20)
}return k.dockers.any(function(o,n){var p=o.bounds.center();
return n!=0&&n!=k.dockers.length-1&&((l&&l.isIncluded(p))||(m&&m.isIncluded(p)))
})
};
g.each(function(m){if(m.dockers.first().getDockedShape()===c){var l=m.dockers[1];
if(i(l.bounds,m.dockers.first().bounds)){l.update()
}}else{if(m.dockers.last().getDockedShape()===c){var k=m.dockers[m.dockers.length-2];
if(i(k.bounds,m.dockers.last().bounds)){k.update()
}}}m._update(true);
m.removeUnusedDockers();
if(d(m)){this.doLayout(m);
return
}}.bind(this))
}f.each(function(k){if(k.dockers.length==2){var m=k.dockers.first().bounds.center();
var l=k.dockers.last().bounds.center();
if(Math.abs(m.x-l.x)<2||Math.abs(m.y-l.y)<2){k.dockers.first().update();
k.dockers.last().update();
this.doLayout(k)
}}}.bind(this))
}});