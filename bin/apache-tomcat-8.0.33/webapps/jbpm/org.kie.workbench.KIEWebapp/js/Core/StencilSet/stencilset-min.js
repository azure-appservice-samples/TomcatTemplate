if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.StencilSet=Clazz.extend({construct:function(a){arguments.callee.$.construct.apply(this,arguments);
if(!a){throw"ORYX.Core.StencilSet.StencilSet(construct): Parameter 'source' is not defined."
}if(a.endsWith("/")){a=a.substr(0,a.length-1)
}this._extensions=new Hash();
this._source=a;
this._baseUrl=ORYX.PATH+"stencilset/"+a+"/";
this._jsonObject={};
this._stencils=new Hash();
this._availableStencils=new Hash();
this._removedStencils=[];
new Ajax.Request(ORYX.PATH+"stencilset/"+a,{asynchronous:false,method:"get",onSuccess:this._init.bind(this),onFailure:function(){throw"Loading stencil set "+a+" failed."
}.bind(a)})
},findRootStencilName:function(){var a=this._stencils.values().find(function(b){return b._jsonStencil.mayBeRoot
});
if(!a){ORYX.Log.warn("Did not find any stencil that may be root. Taking a guess.");
a=this._stencils.values()[0]
}return a.id()
},equals:function(a){return(this.namespace()===a.namespace())
},stencils:function(j,k,h){if(j&&k){var a=this._availableStencils.values();
var e=[j];
var d=[];
var l=[];
while(e.size()>0){var b=e.pop();
d.push(b);
var c=a.findAll(function(m){var i={containingStencil:b,containedStencil:m};
return k.canContain(i)
});
for(var g=0;
g<c.size();
g++){if(!d.member(c[g])){e.push(c[g])
}}l=l.concat(c).uniq()
}l=l.sortBy(function(i){return a.indexOf(i)
});
if(h){l=l.sortBy(function(i){return i.groups().first()
})
}var f=a.findAll(function(i){if(!i){return false
}return i.type()=="edge"
});
l=l.concat(f);
return l
}else{if(h){return this._availableStencils.values().sortBy(function(i){return i.groups().first()
})
}else{return this._availableStencils.values()
}}},nodes:function(){return this._availableStencils.values().findAll(function(a){if(!a){return false
}return(a.type()==="node")
})
},edges:function(){return this._availableStencils.values().findAll(function(a){if(!a){return false
}return(a.type()==="edge")
})
},stencil:function(a){return this._stencils[a]
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonObject,"title")
},description:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonObject,"description")
},namespace:function(){return this._jsonObject?this._jsonObject.namespace:null
},jsonRules:function(){return this._jsonObject?this._jsonObject.rules:null
},source:function(){return this._source
},extensions:function(){return this._extensions
},addExtension:function(a){this.addExtensionDirectly(a)
},addExtensionFromDefinition:function(a){new Ajax.Request(a,{method:"GET",asynchronous:false,onSuccess:(function(f){try{var b=f.responseText;
var c=b.evalJSON();
this.addExtensionDirectly(c)
}catch(d){ORYX.Log.debug("Unable to load extension definition: "+d);
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to load extension definition: "+d,title:""})
}}).bind(this),onFailure:(function(b){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Unable to create extension definition.",title:""})
}).bind(this)})
},addExtensionDirectly:function(b){try{if(!(b["extends"].endsWith("#"))){b["extends"]+="#"
}if(b["extends"]==this.namespace()){this._extensions[b.namespace]=b;
var a=this._stencils.keys().size();
if(b.stencils){$A(b.stencils).each(function(f){a++;
var e=new ORYX.Core.StencilSet.Stencil(f,this.namespace(),this._baseUrl,this,undefined,a);
this._stencils[e.id()]=e;
this._availableStencils[e.id()]=e
}.bind(this))
}if(b.properties){var d=this._stencils.values();
d.each(function(f){var e=f.roles();
b.properties.each(function(g){g.roles.any(function(h){h=b["extends"]+h;
if(e.member(h)){g.properties.each(function(i){f.addProperty(i,b.namespace)
});
return true
}else{return false
}})
})
}.bind(this))
}if(b.removeproperties){b.removeproperties.each(function(f){var e=this.stencil(b["extends"]+f.stencil);
if(e){f.properties.each(function(g){e.removeProperty(g)
})
}}.bind(this))
}if(b.removestencilgroups){var d=this._stencils.values();
d.each(function(e){if(e.groups){$A(e.groups()).each(function(f){if(b.removestencilgroups.indexOf(f)!=-1){delete this._availableStencils[e.id()];
this._removedStencils.push(e.id())
}}.bind(this))
}}.bind(this))
}if(b.removestencils){$A(b.removestencils).each(function(f){var e=b["extends"]+f;
delete this._availableStencils[e];
this._removedStencils.push(e)
}.bind(this))
}}}catch(c){ORYX.Log.debug("StencilSet.addExtension: Something went wrong when initialising the stencil set extension. "+c)
}},changeTitle:function(a){this._jsonObject.title=a
},removeExtension:function(a){var b=this._extensions[a];
if(b){if(b.stencils){$A(b.stencils).each(function(e){var d=new ORYX.Core.StencilSet.Stencil(e,this.namespace(),this._baseUrl,this);
delete this._stencils[d.id()];
delete this._availableStencils[d.id()]
}.bind(this))
}if(b.properties){var c=this._stencils.values();
c.each(function(e){var d=e.roles();
b.properties.each(function(f){f.roles.any(function(g){g=b["extends"]+g;
if(d.member(g)){f.properties.each(function(h){e.removeProperty(h.id)
});
return true
}else{return false
}})
})
}.bind(this))
}if(b.removeproperties){b.removeproperties.each(function(f){var e=this.stencil(b["extends"]+f.stencil);
if(e){var d=$A(this._jsonObject.stencils).find(function(g){return g.id==e.id()
});
f.properties.each(function(h){var g=$A(d.properties).find(function(i){return i.id==h
});
e.addProperty(g,this.namespace())
}.bind(this))
}}.bind(this))
}if(this._removedStencils.length>0){$A(this._removedStencils).each(function(d){this._availableStencils[d]=this._stencils[d]
}.bind(this));
this._removedStencils.length=0
}}delete this._extensions[a]
},__handleStencilset:function(response){try{eval("this._jsonObject ="+response.responseText)
}catch(e){throw"Stenciset corrupt: "+e
}if(!this._jsonObject){throw"Error evaluating stencilset. It may be corrupt."
}with(this._jsonObject){if(!namespace||namespace===""){throw"Namespace definition missing in stencilset."
}if(!(stencils instanceof Array)){throw"Stencilset corrupt."
}if(!namespace.endsWith("#")){namespace=namespace+"#"
}if(!title){title=""
}if(!description){description=""
}}},_getJSONURL:function(a){this._baseUrl=a.responseText.substring(0,a.responseText.lastIndexOf("/")+1);
this._source=a.responseText;
new Ajax.Request(a.responseText,{asynchronous:false,method:"get",onSuccess:this._init.bind(this),onFailure:this._cancelInit.bind(this)})
},_init:function(c){this.__handleStencilset(c);
var b=new Hash();
if(this._jsonObject.propertyPackages){$A(this._jsonObject.propertyPackages).each((function(d){b[d.name]=d.properties
}).bind(this))
}var a=0;
$A(this._jsonObject.stencils).each((function(f){a++;
try{var d=new ORYX.Core.StencilSet.Stencil(f,this.namespace(),this._baseUrl,this,b,a);
this._stencils[d.id()]=d;
this._availableStencils[d.id()]=d
}catch(g){ORYX.Log.error("Problems instantiating a stencil:");
if(console!==undefined){console.log(g);
if(g.stack!==undefined){console.log(g.stack)
}}}}).bind(this))
},toString:function(){return"StencilSet "+this.title()+" ("+this.namespace()+")"
}});