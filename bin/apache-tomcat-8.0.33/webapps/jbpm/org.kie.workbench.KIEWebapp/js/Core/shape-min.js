if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Shape={construct:function(a,b){arguments.callee.$.construct.apply(this,arguments);
this.dockers=[];
this.magnets=[];
this._defaultMagnet;
this.incoming=[];
this.outgoing=[];
this.nodes=[];
this._dockerChangedCallback=this._dockerChanged.bind(this);
this._labels=new Hash();
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g",{id:this.id},["g",{"class":"stencils"},["g",{"class":"me"}],["g",{"class":"children",style:"overflow:hidden"}],["g",{"class":"edge"}]],["g",{"class":"controls"},["g",{"class":"dockers"}],["g",{"class":"magnets"}]]])
},update:function(){},_update:function(){},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
if(this.node.ownerDocument){var a=this;
this.node.setAttributeNS(null,"bpmn2nodeid",this.resourceId);
this.propertiesChanged.each((function(b){if(b.value){var e=this.properties[b.key];
var d=this.getStencil().property(b.key);
this.propertiesChanged[b.key]=false;
if((d.type()==ORYX.CONFIG.TYPE_CHOICE)||(d.type()==ORYX.CONFIG.TYPE_DYNAMICCHOICE)){d.refToView().each((function(g){if(g!==""){var f=this._labels[this.id+g];
if(f){if(d.id()=="fontsize"){if(e&&d.item(e)){f.fontSize(d.item(e).value())
}}else{f.text(d.item(e).value())
}}}}).bind(this));
var c=new Hash();
d.items().each((function(f){f.refToView().each((function(g){if(g==""){this.propertiesChanged[b.key]=true;
return
}var h=this.node.ownerDocument.getElementById(this.id+g);
if(!h){this.propertiesChanged[b.key]=true;
return
}if(!c[h.id]||e==f.value()){h.setAttributeNS(null,"display",((e==f.value())?"inherit":"none"));
c[h.id]=h
}if(ORYX.Editor.checkClassType(h,SVGImageElement)){h.setAttributeNS("http://www.w3.org/1999/xlink","href",h.getAttributeNS("http://www.w3.org/1999/xlink","href"))
}}).bind(this))
}).bind(this))
}else{d.refToView().each((function(h){if(h===""){this.propertiesChanged[b.key]=true;
return
}var g=this.id+h;
var i=this.node.ownerDocument.getElementById(g);
if(!i||!(i.ownerSVGElement)){if(d.type()===ORYX.CONFIG.TYPE_URL||d.type()===ORYX.CONFIG.TYPE_DIAGRAM_LINK){var o=this.node.ownerDocument.getElementsByTagNameNS("http://www.w3.org/2000/svg","a");
i=$A(o).find(function(q){return q.getAttributeNS(null,"id")===g
});
if(!i){this.propertiesChanged[b.key]=true;
return
}}else{this.propertiesChanged[b.key]=true;
return
}}if(d.complexAttributeToView()){var m=this._labels[g];
if(m){try{propJson=e.evalJSON();
var p=propJson[d.complexAttributeToView()];
m.text(p?p:e)
}catch(j){m.text(e)
}}}else{switch(d.type()){case ORYX.CONFIG.TYPE_BOOLEAN:if(typeof e=="string"){e=e==="true"
}i.setAttributeNS(null,"display",(!(e===d.inverseBoolean()))?"inherit":"none");
break;
case ORYX.CONFIG.TYPE_COLOR:if(d.fill()){if(i.tagName.toLowerCase()==="stop"){i.setAttributeNS(null,"stop-color",e);
if(i.parentNode.tagName.toLowerCase()==="radialgradient"){ORYX.Utils.adjustGradient(i.parentNode,i)
}}else{i.setAttributeNS(null,"fill",e)
}}if(d.stroke()){i.setAttributeNS(null,"stroke",e);
if(i.tagName.toLowerCase()==="stop"){i.setAttributeNS(null,"stop-color",e);
if(i.parentNode.tagName.toLowerCase()==="radialgradient"){ORYX.Utils.adjustGradient(i.parentNode,i)
}}}break;
case ORYX.CONFIG.TYPE_STRING:var m=this._labels[g];
if(m){m.text(e)
}break;
case ORYX.CONFIG.TYPE_STRING:var m=this._labels[g];
if(m){m.text(e)
}break;
case ORYX.CONFIG.TYPE_TEXT:var m=this._labels[g];
if(m){m.text(e)
}break;
case ORYX.CONFIG.TYPE_FLOAT:if(d.fillOpacity()){i.setAttributeNS(null,"fill-opacity",e)
}if(d.strokeOpacity()){i.setAttributeNS(null,"stroke-opacity",e)
}if(!d.fillOpacity()&&!d.strokeOpacity()){var m=this._labels[g];
if(m){m.text(e)
}}break;
case ORYX.CONFIG.TYPE_URL:case ORYX.CONFIG.TYPE_CALLEDELEMENT:if(ORYX.READONLY==true){}else{var l=i.getAttributeNodeNS("","onclick");
if(l){if(e&&e.length>0){var n=ORYX.EDITOR.getSerializedJSON();
var k=jsonPath(n.evalJSON(),"$.properties.package");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(q){try{if(q.responseText.length>0&&q.responseText!="false"){var s=q.responseText.split("|");
l.textContent='parent.designeropenintab("'+s[0]+'","'+s[1]+'");'
}else{l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });"
}}catch(r){l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });"
}}.bind(this),failure:function(){l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to find called process.',                                                                                        title       : ''                                                                                                                   });"
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),ppackage:k,pid:e,action:"openprocessintab"}})
}else{l.textContent="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'No Callable Element specified.',                                                                                        title       : ''                                                                                                                   });"
}}else{if(e&&e.length>0){var n=ORYX.EDITOR.getSerializedJSON();
var k=jsonPath(n.evalJSON(),"$.properties.package");
Ext.Ajax.request({url:ORYX.PATH+"calledelement",method:"POST",success:function(q){try{if(q.responseText.length>0&&q.responseText!="false"){var t=q.responseText.split("|");
var r='parent.designeropenintab("'+t[0]+'","'+t[1]+'");';
i.setAttributeNS("","onclick",r)
}else{var u="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });";
i.setAttributeNS("","onclick",u)
}}catch(s){var u="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to open called process.',                                                                                        title       : ''                                                                                                                   });";
i.setAttributeNS("","onclick",u)
}}.bind(this),failure:function(){var q="ORYX.EDITOR._pluginFacade.raiseEvent({                                                                          type 		: ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,                                                                                    ntype		: 'error',                                                                                                                msg         : 'Unable to find called process.',                                                                                        title       : ''                                                                                                                   });";
i.setAttributeNS("","onclick",q)
},params:{profile:ORYX.PROFILE,uuid:window.btoa(encodeURI(ORYX.UUID)),ppackage:k,pid:e,action:"openprocessintab"}})
}else{i.setAttributeNS("","onclick","Ext.Msg.alert('No Callable Element specified.');")
}}}break;
case ORYX.CONFIG.TYPE_DIAGRAM_LINK:var f=i.getAttributeNodeNS("http://www.w3.org/1999/xlink","xlink:onclick");
if(f){f.textContent=e
}else{i.setAttributeNS("http://www.w3.org/1999/xlink","xlink:onclick",e)
}break
}}}).bind(this))
}}}).bind(this));
this._labels.values().each(function(b){b.update()
})
}},layout:function(){var a=this.getStencil().layout();
if(this instanceof ORYX.Core.Node&&a){a.each(function(b){b.shape=this;
b.forceExecution=true;
this._delegateEvent(b)
}.bind(this))
}},getLabels:function(){return this._labels.values()
},getDockers:function(){return this.dockers
},getMagnets:function(){return this.magnets
},getDefaultMagnet:function(){if(this._defaultMagnet){return this._defaultMagnet
}else{if(this.magnets.length>0){return this.magnets[0]
}else{return undefined
}}},getParentShape:function(){return this.parent
},getIncomingShapes:function(a){if(a){this.incoming.each(a)
}return this.incoming
},getIncomingNodes:function(a){return this.incoming.select(function(b){var c=(b instanceof ORYX.Core.Node);
if(c&&a){a(b)
}return c
})
},getOutgoingShapes:function(a){if(a){this.outgoing.each(a)
}return this.outgoing
},getOutgoingNodes:function(a){return this.outgoing.select(function(b){var c=(b instanceof ORYX.Core.Node);
if(c&&a){a(b)
}return c
})
},getAllDockedShapes:function(b){var a=this.incoming.concat(this.outgoing);
if(b){a.each(b)
}return a
},getCanvas:function(){if(this.parent instanceof ORYX.Core.Canvas){return this.parent
}else{if(this.parent instanceof ORYX.Core.Shape){return this.parent.getCanvas()
}else{return undefined
}}},getChildNodes:function(b,c){if(!b&&!c){return this.nodes.clone()
}else{var a=[];
this.nodes.each(function(d){if(!d.isVisible){return
}if(c){c(d)
}a.push(d);
if(b&&d instanceof ORYX.Core.Shape){a=a.concat(d.getChildNodes(b,c))
}});
return a
}},add:function(b,c){if(b instanceof ORYX.Core.UIObject&&!(b instanceof ORYX.Core.Edge)){if(!(this.children.member(b))){if(b.parent){b.parent.remove(b)
}if(c!=undefined){this.children.splice(c,0,b)
}else{this.children.push(b)
}b.parent=this;
var d;
if(b instanceof ORYX.Core.Node){d=this.node.childNodes[0].childNodes[1];
this.nodes.push(b)
}else{if(b instanceof ORYX.Core.Controls.Control){var a=this.node.childNodes[1];
if(b instanceof ORYX.Core.Controls.Docker){d=a.childNodes[0];
if(this.dockers.length>=2){this.dockers.splice(c!==undefined?Math.min(c,this.dockers.length-1):this.dockers.length-1,0,b)
}else{this.dockers.push(b)
}}else{if(b instanceof ORYX.Core.Controls.Magnet){d=a.childNodes[1];
this.magnets.push(b)
}else{d=a
}}}else{d=this.node
}}if(c!=undefined&&c<d.childNodes.length){b.node=d.insertBefore(b.node,d.childNodes[c])
}else{b.node=d.appendChild(b.node)
}this._changed();
if(this.eventHandlerCallback){this.eventHandlerCallback({type:ORYX.CONFIG.EVENT_SHAPEADDED,shape:b})
}}else{ORYX.Log.warn("add: ORYX.Core.UIObject is already a child of this object.")
}}else{ORYX.Log.warn("add: Parameter is not of type ORYX.Core.UIObject.")
}},remove:function(a){if(this.children.member(a)){this.children=this.children.without(a);
a.parent=undefined;
if(a instanceof ORYX.Core.Shape){if(a instanceof ORYX.Core.Edge){a.removeMarkers();
a.node=this.node.childNodes[0].childNodes[2].removeChild(a.node)
}else{a.node=this.node.childNodes[0].childNodes[1].removeChild(a.node);
this.nodes=this.nodes.without(a)
}}else{if(a instanceof ORYX.Core.Controls.Control){if(a instanceof ORYX.Core.Controls.Docker){a.node=this.node.childNodes[1].childNodes[0].removeChild(a.node);
this.dockers=this.dockers.without(a)
}else{if(a instanceof ORYX.Core.Controls.Magnet){a.node=this.node.childNodes[1].childNodes[1].removeChild(a.node);
this.magnets=this.magnets.without(a)
}else{a.node=this.node.childNodes[1].removeChild(a.node)
}}}}this._changed()
}else{ORYX.Log.warn("remove: ORYX.Core.UIObject is not a child of this object.")
}},getIntersectionPoint:function(){var o,n,h,g;
switch(arguments.length){case 2:o=arguments[0].x;
n=arguments[0].y;
h=arguments[1].x;
g=arguments[1].y;
break;
case 4:o=arguments[0];
n=arguments[1];
h=arguments[2];
g=arguments[3];
break;
default:throw"getIntersectionPoints needs two or four arguments"
}var d,b,e,c;
var a=this.absoluteBounds();
if(this.isPointIncluded(o,n,a)){d=o;
b=n
}else{e=o;
c=n
}if(this.isPointIncluded(h,g,a)){d=h;
b=g
}else{e=h;
c=g
}if(!d||!b||!e||!c){return undefined
}var m=0;
var l=0;
var q,p;
var k=1;
var j=0;
while(true){var m=Math.min(d,e)+((Math.max(d,e)-Math.min(d,e))/2);
var l=Math.min(b,c)+((Math.max(b,c)-Math.min(b,c))/2);
if(this.isPointIncluded(m,l,a)){d=m;
b=l
}else{e=m;
c=l
}var f=Math.sqrt(Math.pow(d-e,2)+Math.pow(b-c,2));
q=d+((e-d)/f),p=b+((c-b)/f);
if(!this.isPointIncluded(q,p,a)){break
}}return{x:q,y:p}
},isPointIncluded:function(){return false
},isPointOverOffset:function(){return this.isPointIncluded.apply(this,arguments)
},_dockerChanged:function(){},createDocker:function(b,a){var c=new ORYX.Core.Controls.Docker({eventHandlerCallback:this.eventHandlerCallback});
c.bounds.registerCallback(this._dockerChangedCallback);
if(a){c.bounds.centerMoveTo(a)
}this.add(c,b);
return c
},serialize:function(){var a=arguments.callee.$.serialize.apply(this);
a.push({name:"bounds",prefix:"oryx",value:this.bounds.serializeForERDF(),type:"literal"});
this.getOutgoingShapes().each((function(b){a.push({name:"outgoing",prefix:"raziel",value:"#"+ERDF.__stripHashes(b.resourceId),type:"resource"})
}).bind(this));
a.push({name:"parent",prefix:"raziel",value:"#"+ERDF.__stripHashes(this.parent.resourceId),type:"resource"});
return a
},deserialize:function(c){arguments.callee.$.deserialize.apply(this,arguments);
var d=c.find(function(b){return(b.prefix+"-"+b.name)=="oryx-bounds"
});
if(d){var a=d.value.replace(/,/g," ").split(" ").without("");
if(this instanceof ORYX.Core.Edge){this.dockers.first().bounds.centerMoveTo(parseFloat(a[0]),parseFloat(a[1]));
this.dockers.last().bounds.centerMoveTo(parseFloat(a[2]),parseFloat(a[3]))
}else{this.bounds.set(parseFloat(a[0]),parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3]))
}}},_init:function(a){this._adjustIds(a,0)
},_adjustIds:function(c,e){if(c instanceof Element){var a=c.getAttributeNS(null,"id");
if(a&&a!==""){c.setAttributeNS(null,"id",this.id+a)
}else{c.setAttributeNS(null,"id",this.id+"_"+this.id+"_"+e);
e++
}var d=c.getAttributeNS(null,"fill");
if(d&&d.include("url(#")){d=d.replace(/url\(#/g,"url(#"+this.id);
c.setAttributeNS(null,"fill",d)
}if(c.hasChildNodes()){for(var b=0;
b<c.childNodes.length;
b++){e=this._adjustIds(c.childNodes[b],e)
}}}return e
},toString:function(){return"ORYX.Core.Shape "+this.getId()
}};
ORYX.Core.Shape=ORYX.Core.AbstractShape.extend(ORYX.Core.Shape);