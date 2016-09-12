if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.Stencil={construct:function(d,e,a,j,i,h){arguments.callee.$.construct.apply(this,arguments);
if(!d){throw"Stencilset seems corrupt."
}if(!e){throw"Stencil does not provide namespace."
}if(!a){throw"Stencil does not provide SVG source."
}if(!j){throw"Fatal internal error loading stencilset."
}this._source=a;
this._jsonStencil=d;
this._stencilSet=j;
this._namespace=e;
this._propertyPackages=i;
if(h&&!this._jsonStencil.position){this._jsonStencil.position=h
}this._view;
this._properties=new Hash();
if(!this._jsonStencil.type||!(this._jsonStencil.type==="edge"||this._jsonStencil.type==="node")){throw"ORYX.Core.StencilSet.Stencil(construct): Type is not defined."
}if(!this._jsonStencil.id||this._jsonStencil.id===""){throw"ORYX.Core.StencilSet.Stencil(construct): Id is not defined."
}if(!this._jsonStencil.title||this._jsonStencil.title===""){throw"ORYX.Core.StencilSet.Stencil(construct): Title is not defined."
}if(!this._jsonStencil.description){this._jsonStencil.description=""
}if(!this._jsonStencil.groups){this._jsonStencil.groups=[]
}if(!this._jsonStencil.roles){this._jsonStencil.roles=[]
}this._jsonStencil.roles.push(this._jsonStencil.id);
this._jsonStencil.roles.each((function(l,k){this._jsonStencil.roles[k]=e+l
}).bind(this));
this._jsonStencil.roles=this._jsonStencil.roles.uniq();
this._jsonStencil.id=e+this._jsonStencil.id;
this.postProcessProperties();
if(!this._jsonStencil.serialize){this._jsonStencil.serialize={}
}if(!this._jsonStencil.deserialize){this._jsonStencil.deserialize={}
}if(!this._jsonStencil.layout){this._jsonStencil.layout=[]
}if(d.view===undefined){}else{if(d.view.charAt(0)=="/"){var c=d.view
}else{var c=a+"view/"+d.view
}}if(this._jsonStencil.view){if(this._jsonStencil.view.trim().match(/</)){var b=new DOMParser();
var f=b.parseFromString(this._jsonStencil.view,"text/xml");
if(ORYX.Editor.checkClassType(f.documentElement,SVGSVGElement)){this._view=f.documentElement;
var g=this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg","image");
$A(g).each((function(l){var k=l.getAttributeNodeNS("http://www.w3.org/1999/xlink","href");
if(k&&(k.value.indexOf("://")==-1&&k.value.indexOf("base64")==-1)){k.textContent=this._source+"view/"+k.value
}}).bind(this))
}else{throw"ORYX.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
}}else{new Ajax.Request(c,{asynchronous:false,method:"get",onSuccess:this._loadSVGOnSuccess.bind(this),onFailure:this._loadSVGOnFailure.bind(this)})
}}},postProcessProperties:function(){if(this._jsonStencil.icon){if(this._jsonStencil.icon.charAt(0)==="/"){}else{if((this._jsonStencil.icon.indexOf("://")===-1)&&(this._jsonStencil.icon.indexOf("base64")===-1)){this._jsonStencil.icon=this._source+"icons/"+this._jsonStencil.icon
}else{}}}else{this._jsonStencil.icon=""
}if(this._jsonStencil.propertyPackages&&this._jsonStencil.propertyPackages instanceof Array){this._jsonStencil.propertyPackages.each((function(b){var a=this._propertyPackages[b];
if(a){a.each((function(d){var c=new ORYX.Core.StencilSet.Property(d,this._namespace,this);
this._properties[c.prefix()+"-"+c.id()]=c
}).bind(this))
}}).bind(this))
}if(this._jsonStencil.properties&&this._jsonStencil.properties instanceof Array){this._jsonStencil.properties.each((function(b){var a=new ORYX.Core.StencilSet.Property(b,this._namespace,this);
this._properties[a.prefix()+"-"+a.id()]=a
}).bind(this))
}},equals:function(a){return(this.id()===a.id())
},stencilSet:function(){return this._stencilSet
},type:function(){return this._jsonStencil.type
},namespace:function(){return this._namespace
},id:function(){return this._jsonStencil.id
},idWithoutNs:function(){return this.id().replace(this.namespace(),"")
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonStencil,"title")
},description:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonStencil,"description")
},groups:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonStencil,"groups")
},position:function(){return(isNaN(this._jsonStencil.position)?0:this._jsonStencil.position)
},view:function(){return this._view.cloneNode(true)||this._view
},hidden:function(){return this._jsonStencil.hide
},icon:function(){return this._jsonStencil.icon
},fixedAspectRatio:function(){return this._jsonStencil.fixedAspectRatio===true
},hasMultipleRepositoryEntries:function(){return(this.getRepositoryEntries().length>0)
},getRepositoryEntries:function(){return(this._jsonStencil.repositoryEntries)?$A(this._jsonStencil.repositoryEntries):$A([])
},properties:function(){return this._properties.values()
},property:function(a){return this._properties[a]
},roles:function(){return this._jsonStencil.roles
},defaultAlign:function(){if(!this._jsonStencil.defaultAlign){return"east"
}return this._jsonStencil.defaultAlign
},serialize:function(a,b){return this._jsonStencil.serialize
},deserialize:function(a,b){return this._jsonStencil.deserialize
},layout:function(a){return this._jsonStencil.layout
},addProperty:function(c,b){if(c&&b){var a=new ORYX.Core.StencilSet.Property(c,b,this);
this._properties[a.prefix()+"-"+a.id()]=a
}},removeProperty:function(b){if(b){var a=this._properties.values().find(function(c){return(b==c.id())
});
if(a){delete this._properties[a.prefix()+"-"+a.id()]
}}},_loadSVGOnSuccess:function(a){var b=null;
b=a.responseXML;
if(ORYX.Editor.checkClassType(b.documentElement,SVGSVGElement)){this._view=b.documentElement;
var c=this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg","image");
$A(c).each((function(e){var d=e.getAttributeNodeNS("http://www.w3.org/1999/xlink","href");
if(d&&(d.value.indexOf("://")==-1&&d.value.indexOf("base64")==-1)){d.textContent=this._source+"view/"+d.value
}}).bind(this))
}else{throw"ORYX.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
}},_loadSVGOnFailure:function(a){throw"ORYX.Core.StencilSet.Stencil(_loadSVGOnFailure): Loading SVG document failed."
},toString:function(){return"Stencil "+this.title()+" ("+this.id()+")"
}};
ORYX.Core.StencilSet.Stencil=Clazz.extend(ORYX.Core.StencilSet.Stencil);
function _evenMoreEvilHack(c,e){if(window.ActiveXObject){var b=new ActiveXObject("MSXML.DomDocument");
b.loadXML(c);
return b
}else{if(window.XMLHttpRequest){var a=new XMLHttpRequest;
a.open("GET","data:"+(e||"application/xml")+";charset=utf-8,"+encodeURIComponent(c),false);
if(a.overrideMimeType){a.overrideMimeType(e)
}a.send(null);
return a.responseXML
}}}function _evilSafariHack(d){var b=d;
var a="data:text/xml;charset=utf-8,"+encodeURIComponent(b);
var e=null;
var c=new XMLHttpRequest();
c.open("GET",a);
c.onload=function(){e=c.responseXML
};
c.send(null);
return e
};