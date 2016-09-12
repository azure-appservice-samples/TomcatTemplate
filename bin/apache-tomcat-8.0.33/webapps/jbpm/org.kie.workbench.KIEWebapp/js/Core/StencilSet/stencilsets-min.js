if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet._stencilSetsByNamespace=new Hash();
ORYX.Core.StencilSet._stencilSetsByUrl=new Hash();
ORYX.Core.StencilSet._StencilSetNSByEditorInstance=new Hash();
ORYX.Core.StencilSet._rulesByEditorInstance=new Hash();
ORYX.Core.StencilSet.stencilSets=function(b){var c=ORYX.Core.StencilSet._StencilSetNSByEditorInstance[b];
var a=new Hash();
if(c){c.each(function(e){var d=ORYX.Core.StencilSet.stencilSet(e);
a[d.namespace()]=d
})
}return a
};
ORYX.Core.StencilSet.stencilSet=function(a){ORYX.Log.trace("Getting stencil set %0",a);
var b=a.split("#",1);
if(b.length===1){ORYX.Log.trace("Getting stencil set %0",b[0]);
return ORYX.Core.StencilSet._stencilSetsByNamespace[b[0]+"#"]
}else{return undefined
}};
ORYX.Core.StencilSet.stencil=function(b){ORYX.Log.trace("Getting stencil for %0",b);
var a=ORYX.Core.StencilSet.stencilSet(b);
if(a){return a.stencil(b)
}else{ORYX.Log.trace("Cannot fild stencil for %0",b);
return undefined
}};
ORYX.Core.StencilSet.rules=function(a){if(!ORYX.Core.StencilSet._rulesByEditorInstance[a]){ORYX.Core.StencilSet._rulesByEditorInstance[a]=new ORYX.Core.StencilSet.Rules()
}return ORYX.Core.StencilSet._rulesByEditorInstance[a]
};
ORYX.Core.StencilSet.loadStencilSet=function(a,c){var d=ORYX.Core.StencilSet._stencilSetsByUrl[a];
if(!d){d=new ORYX.Core.StencilSet.StencilSet(a);
ORYX.Core.StencilSet._stencilSetsByNamespace[d.namespace()]=d;
ORYX.Core.StencilSet._stencilSetsByUrl[a]=d
}var b=d.namespace();
if(ORYX.Core.StencilSet._StencilSetNSByEditorInstance[c]){ORYX.Core.StencilSet._StencilSetNSByEditorInstance[c].push(b)
}else{ORYX.Core.StencilSet._StencilSetNSByEditorInstance[c]=[b]
}if(ORYX.Core.StencilSet._rulesByEditorInstance[c]){ORYX.Core.StencilSet._rulesByEditorInstance[c].initializeRules(d)
}else{var e=new ORYX.Core.StencilSet.Rules();
e.initializeRules(d);
ORYX.Core.StencilSet._rulesByEditorInstance[c]=e
}};
ORYX.Core.StencilSet.getTranslation=function(c,b){var d=ORYX.I18N.Language.toLowerCase();
var a=c[b+"_"+d];
if(a){return a
}a=c[b+"_"+d.substr(0,2)];
if(a){return a
}return c[b]
};