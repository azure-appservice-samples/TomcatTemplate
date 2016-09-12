if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.Rules={construct:function(){arguments.callee.$.construct.apply(this,arguments);
this._stencilSets=[];
this._stencils=[];
this._cachedConnectSET=new Hash();
this._cachedConnectSE=new Hash();
this._cachedConnectTE=new Hash();
this._cachedCardSE=new Hash();
this._cachedCardTE=new Hash();
this._cachedContainPC=new Hash();
this._cachedMorphRS=new Hash();
this._connectionRules=new Hash();
this._cardinalityRules=new Hash();
this._containmentRules=new Hash();
this._morphingRules=new Hash();
this._layoutRules=new Hash()
},initializeRules:function(k){var j=this._stencilSets.find(function(n){return(n.namespace()==k.namespace())
});
if(j){var f=this._stencilSets.clone();
f=f.without(j);
f.push(k);
this._stencilSets=[];
this._stencils=[];
this._cachedConnectSET=new Hash();
this._cachedConnectSE=new Hash();
this._cachedConnectTE=new Hash();
this._cachedCardSE=new Hash();
this._cachedCardTE=new Hash();
this._cachedContainPC=new Hash();
this._cachedMorphRS=new Hash();
this._connectionRules=new Hash();
this._cardinalityRules=new Hash();
this._containmentRules=new Hash();
this._morphingRules=new Hash();
this._layoutRules=new Hash();
f.each(function(n){this.initializeRules(n)
}.bind(this));
return
}else{this._stencilSets.push(k);
var l=new Hash(k.jsonRules());
var e=k.namespace();
var b=k.stencils();
k.extensions().values().each(function(n){if(n.rules){if(n.rules.connectionRules){l.connectionRules=l.connectionRules.concat(n.rules.connectionRules)
}if(n.rules.cardinalityRules){l.cardinalityRules=l.cardinalityRules.concat(n.rules.cardinalityRules)
}if(n.rules.containmentRules){l.containmentRules=l.containmentRules.concat(n.rules.containmentRules)
}if(n.rules.morphingRules){l.morphingRules=l.morphingRules.concat(n.rules.morphingRules)
}}if(n.stencils){b=b.concat(n.stencils)
}});
this._stencils=this._stencils.concat(k.stencils());
var g=this._connectionRules;
if(l.connectionRules){l.connectionRules.each((function(n){if(this._isRoleOfOtherNamespace(n.role)){if(!g[n.role]){g[n.role]=new Hash()
}}else{if(!g[e+n.role]){g[e+n.role]=new Hash()
}}n.connects.each((function(o){var r=[];
if(o.to){if(!(o.to instanceof Array)){o.to=[o.to]
}o.to.each((function(s){if(this._isRoleOfOtherNamespace(s)){r.push(s)
}else{r.push(e+s)
}}).bind(this))
}var q,p;
if(this._isRoleOfOtherNamespace(n.role)){q=n.role
}else{q=e+n.role
}if(this._isRoleOfOtherNamespace(o.from)){p=o.from
}else{p=e+o.from
}if(!g[q][p]){g[q][p]=r
}else{g[q][p]=g[q][p].concat(r)
}}).bind(this))
}).bind(this))
}var c=this._cardinalityRules;
if(l.cardinalityRules){l.cardinalityRules.each((function(p){var n;
if(this._isRoleOfOtherNamespace(p.role)){n=p.role
}else{n=e+p.role
}if(!c[n]){c[n]={};
for(i in p){c[n][i]=p[i]
}}var q=new Hash();
if(p.outgoingEdges){p.outgoingEdges.each((function(r){if(this._isRoleOfOtherNamespace(r.role)){q[r.role]=r
}else{q[e+r.role]=r
}}).bind(this))
}c[n].outgoingEdges=q;
var o=new Hash();
if(p.incomingEdges){p.incomingEdges.each((function(r){if(this._isRoleOfOtherNamespace(r.role)){o[r.role]=r
}else{o[e+r.role]=r
}}).bind(this))
}c[n].incomingEdges=o
}).bind(this))
}var a=this._containmentRules;
if(l.containmentRules){l.containmentRules.each((function(o){var n;
if(this._isRoleOfOtherNamespace(o.role)){n=o.role
}else{n=e+o.role
}if(!a[n]){a[n]=[]
}o.contains.each((function(p){if(this._isRoleOfOtherNamespace(p)){a[n].push(p)
}else{a[n].push(e+p)
}}).bind(this))
}).bind(this))
}var d=this._morphingRules;
if(l.morphingRules){l.morphingRules.each((function(o){var n;
if(this._isRoleOfOtherNamespace(o.role)){n=o.role
}else{n=e+o.role
}if(!d[n]){d[n]=[]
}if(!o.preserveBounds){o.preserveBounds=false
}o.baseMorphs.each((function(p){d[n].push(this._getStencilById(e+p))
}).bind(this))
}).bind(this))
}var h=this._layoutRules;
if(l.layoutRules){var m=function(n){return{edgeRole:n.edgeRole||undefined,t:n.t||1,r:n.r||1,b:n.b||1,l:n.l||1}
};
l.layoutRules.each(function(o){var n;
if(this._isRoleOfOtherNamespace(o.role)){n=o.role
}else{n=e+o.role
}if(!h[n]){h[n]={}
}if(o["in"]){h[n]["in"]=m(o["in"])
}if(o.ins){h[n]["ins"]=(o.ins||[]).map(function(p){return m(p)
})
}if(o.out){h[n]["out"]=m(o.out)
}if(o.outs){h[n]["outs"]=(o.outs||[]).map(function(p){return m(p)
})
}}.bind(this))
}}},_getStencilById:function(a){return this._stencils.find(function(b){if(!b){return false
}return b.id()==a
})
},_cacheConnect:function(a){result=this._canConnect(a);
if(a.sourceStencil&&a.targetStencil){var c=this._cachedConnectSET[a.sourceStencil.id()];
if(!c){c=new Hash();
this._cachedConnectSET[a.sourceStencil.id()]=c
}var b=c[a.edgeStencil.id()];
if(!b){b=new Hash();
c[a.edgeStencil.id()]=b
}b[a.targetStencil.id()]=result
}else{if(a.sourceStencil){var c=this._cachedConnectSE[a.sourceStencil.id()];
if(!c){c=new Hash();
this._cachedConnectSE[a.sourceStencil.id()]=c
}c[a.edgeStencil.id()]=result
}else{var d=this._cachedConnectTE[a.targetStencil.id()];
if(!d){d=new Hash();
this._cachedConnectTE[a.targetStencil.id()]=d
}d[a.edgeStencil.id()]=result
}}return result
},_cacheCard:function(b){if(b.sourceStencil){var c=this._cachedCardSE[b.sourceStencil.id()];
if(!c){c=new Hash();
this._cachedCardSE[b.sourceStencil.id()]=c
}var a=this._getMaximumNumberOfOutgoingEdge(b);
if(a==undefined){a=-1
}c[b.edgeStencil.id()]=a
}if(b.targetStencil){var d=this._cachedCardTE[b.targetStencil.id()];
if(!d){d=new Hash();
this._cachedCardTE[b.targetStencil.id()]=d
}var a=this._getMaximumNumberOfIncomingEdge(b);
if(a==undefined){a=-1
}d[b.edgeStencil.id()]=a
}},_cacheContain:function(b){var a=[this._canContain(b),this._getMaximumOccurrence(b.containingStencil,b.containedStencil)];
if(a[1]==undefined){a[1]=-1
}var c=this._cachedContainPC[b.containingStencil.id()];
if(!c){c=new Hash();
this._cachedContainPC[b.containingStencil.id()]=c
}c[b.containedStencil.id()]=a;
return a
},_cacheMorph:function(b){var a=this._cachedMorphRS[b];
if(!a){a=[];
if(this._morphingRules.keys().include(b)){a=this._stencils.select(function(c){if(!c){return false
}return c.roles().include(b)
})
}this._cachedMorphRS[b]=a
}return a
},outgoingEdgeStencils:function(a){if(!a.sourceShape&&!a.sourceStencil){return[]
}if(a.sourceShape){a.sourceStencil=a.sourceShape.getStencil()
}var b=[];
this._stencils.each((function(d){if(d&&d.type()==="edge"){var c=Object.clone(a);
c.edgeStencil=d;
if(this.canConnect(c)){b.push(d)
}}}).bind(this));
return b
},incomingEdgeStencils:function(a){if(!a.targetShape&&!a.targetStencil){return[]
}if(a.targetShape){a.targetStencil=a.targetShape.getStencil()
}var b=[];
this._stencils.each((function(d){if(d&&d.type()==="edge"){var c=Object.clone(a);
c.edgeStencil=d;
if(this.canConnect(c)){b.push(d)
}}}).bind(this));
return b
},sourceStencils:function(b){if(!b||!b.edgeShape&&!b.edgeStencil){return[]
}if(b.targetShape){b.targetStencil=b.targetShape.getStencil()
}if(b.edgeShape){b.edgeStencil=b.edgeShape.getStencil()
}var a=[];
this._stencils.each((function(d){if(d){var c=Object.clone(b);
c.sourceStencil=d;
if(this.canConnect(c)){a.push(d)
}}}).bind(this));
return a
},targetStencils:function(a){if(!a||!a.edgeShape&&!a.edgeStencil){return[]
}if(a.sourceShape){a.sourceStencil=a.sourceShape.getStencil()
}if(a.edgeShape){a.edgeStencil=a.edgeShape.getStencil()
}var b=[];
this._stencils.each((function(d){if(d){var c=Object.clone(a);
c.targetStencil=d;
if(this.canConnect(c)){b.push(d)
}}}).bind(this));
return b
},canConnect:function(c){if(!c||(!c.sourceShape&&!c.sourceStencil&&!c.targetShape&&!c.targetStencil)||!c.edgeShape&&!c.edgeStencil){return false
}if(c.sourceShape){c.sourceStencil=c.sourceShape.getStencil()
}if(c.targetShape){c.targetStencil=c.targetShape.getStencil()
}if(c.edgeShape){c.edgeStencil=c.edgeShape.getStencil()
}var b;
if(c.sourceStencil&&c.targetStencil){var e=this._cachedConnectSET[c.sourceStencil.id()];
if(!e){b=this._cacheConnect(c)
}else{var d=e[c.edgeStencil.id()];
if(!d){b=this._cacheConnect(c)
}else{var f=d[c.targetStencil.id()];
if(f==undefined){b=this._cacheConnect(c)
}else{b=f
}}}}else{if(c.sourceStencil){var e=this._cachedConnectSE[c.sourceStencil.id()];
if(!e){b=this._cacheConnect(c)
}else{var d=e[c.edgeStencil.id()];
if(d==undefined){b=this._cacheConnect(c)
}else{b=d
}}}else{var f=this._cachedConnectTE[c.targetStencil.id()];
if(!f){b=this._cacheConnect(c)
}else{var d=f[c.edgeStencil.id()];
if(d==undefined){b=this._cacheConnect(c)
}else{b=d
}}}}if(b){if(c.sourceShape){var e=this._cachedCardSE[c.sourceStencil.id()];
if(!e){this._cacheCard(c);
e=this._cachedCardSE[c.sourceStencil.id()]
}var a=e[c.edgeStencil.id()];
if(a==undefined){this._cacheCard(c)
}a=e[c.edgeStencil.id()];
if(a!=-1){b=c.sourceShape.getOutgoingShapes().all(function(g){if((g.getStencil().id()===c.edgeStencil.id())&&((c.edgeShape)?g!==c.edgeShape:true)){a--;
return(a>0)?true:false
}else{return true
}})
}}if(c.targetShape){var f=this._cachedCardTE[c.targetStencil.id()];
if(!f){this._cacheCard(c);
f=this._cachedCardTE[c.targetStencil.id()]
}var a=f[c.edgeStencil.id()];
if(a==undefined){this._cacheCard(c)
}a=f[c.edgeStencil.id()];
if(a!=-1){b=c.targetShape.getIncomingShapes().all(function(g){if((g.getStencil().id()===c.edgeStencil.id())&&((c.edgeShape)?g!==c.edgeShape:true)){a--;
return(a>0)?true:false
}else{return true
}})
}}}return b
},_canConnect:function(b){if(!b||(!b.sourceShape&&!b.sourceStencil&&!b.targetShape&&!b.targetStencil)||!b.edgeShape&&!b.edgeStencil){return false
}if(b.sourceShape){b.sourceStencil=b.sourceShape.getStencil()
}if(b.targetShape){b.targetStencil=b.targetShape.getStencil()
}if(b.edgeShape){b.edgeStencil=b.edgeShape.getStencil()
}var c;
var a=this._getConnectionRulesOfEdgeStencil(b.edgeStencil);
if(a.keys().length===0){c=false
}else{if(b.sourceStencil){c=b.sourceStencil.roles().any(function(e){var d=a[e];
if(!d){return false
}if(b.targetStencil){return(d.any(function(f){return b.targetStencil.roles().member(f)
}))
}else{return true
}})
}else{c=a.values().any(function(d){return b.targetStencil.roles().any(function(e){return d.member(e)
})
})
}}return c
},canContain:function(c){if(!c||!c.containingStencil&&!c.containingShape||!c.containedStencil&&!c.containedShape){return false
}if(c.containedShape){c.containedStencil=c.containedShape.getStencil()
}if(c.containingShape){c.containingStencil=c.containingShape.getStencil()
}if(c.containedStencil.type()=="edge"){return false
}var b;
var d=this._cachedContainPC[c.containingStencil.id()];
if(!d){b=this._cacheContain(c)
}else{b=d[c.containedStencil.id()];
if(!b){b=this._cacheContain(c)
}}if(!b[0]){return false
}else{if(b[1]==-1){return true
}else{if(c.containingShape){var a=b[1];
return c.containingShape.getChildShapes(false).all(function(e){if(e.getStencil().id()===c.containedStencil.id()){a--;
return(a>0)?true:false
}else{return true
}})
}else{return true
}}}},_canContain:function(b){if(!b||!b.containingStencil&&!b.containingShape||!b.containedStencil&&!b.containedShape){return false
}if(b.containedShape){b.containedStencil=b.containedShape.getStencil()
}if(b.containingShape){b.containingStencil=b.containingShape.getStencil()
}var a;
a=b.containingStencil.roles().any((function(d){var c=this._containmentRules[d];
if(c){return c.any(function(e){return b.containedStencil.roles().member(e)
})
}else{return false
}}).bind(this));
return a
},morphStencils:function(b){if(!b.stencil&&!b.shape){return[]
}if(b.shape){b.stencil=b.shape.getStencil()
}var a=[];
b.stencil.roles().each(function(c){this._cacheMorph(c).each(function(d){if(d){a.push(d)
}})
}.bind(this));
return a.uniq()
},baseMorphs:function(){var a=[];
this._morphingRules.each(function(b){b.value.each(function(c){a.push(c)
})
});
return a
},containsMorphingRules:function(){return this._stencilSets.any(function(a){return !!a.jsonRules().morphingRules
})
},connectMorph:function(e){if(!e||(!e.sourceShape&&!e.sourceStencil&&!e.targetShape&&!e.targetStencil)){return false
}if(e.sourceShape){e.sourceStencil=e.sourceShape.getStencil()
}if(e.targetShape){e.targetStencil=e.targetShape.getStencil()
}var a=this.incomingEdgeStencils(e);
var d=this.outgoingEdgeStencils(e);
var c=a.select(function(f){return d.member(f)
});
var b=this.baseMorphs().select(function(f){return c.member(f)
});
if(b.size()>0){return b[0]
}else{if(c.size()>0){return c[0]
}}return null
},showInShapeMenu:function(a){return this._stencilSets.any(function(b){return b.jsonRules().morphingRules.any(function(c){return a.roles().include(b.namespace()+c.role)&&c.showInShapeMenu!==false
})
})
},preserveBounds:function(a){return this._stencilSets.any(function(b){return b.jsonRules().morphingRules.any(function(c){return a.roles().include(b.namespace()+c.role)&&c.preserveBounds
})
})
},getLayoutingRules:function(b,d){if(!b||!(b instanceof ORYX.Core.Shape)){return
}var c={"in":{},out:{}};
var a=function(f,e){if(f&&f[e]){["t","r","b","l"].each(function(g){c[e][g]=Math.max(f[e][g],c[e][g]||0)
})
}if(f&&f[e+"s"] instanceof Array){["t","r","b","l"].each(function(j){var g=f[e+"s"].find(function(k){return !k.edgeRole
});
var h;
if(d instanceof ORYX.Core.Edge){h=f[e+"s"].find(function(k){return this._hasRole(d,k.edgeRole)
}.bind(this))
}c[e][j]=Math.max(h?h[j]:g[j],c[e][j]||0)
}.bind(this))
}}.bind(this);
b.getStencil().roles().each(function(e){if(this._layoutRules[e]){a(this._layoutRules[e],"in");
a(this._layoutRules[e],"out")
}}.bind(this));
["in","out"].each(function(e){["t","r","b","l"].each(function(f){c[e][f]=c[e][f]!==undefined?c[e][f]:1
})
});
return c
},_hasRole:function(b,c){if(!(b instanceof ORYX.Core.Shape)||!c){return
}var a=b.getStencil().roles().any(function(d){return d==c
});
return a||b.getStencil().id()==(b.getStencil().namespace()+c)
},_stencilsWithRole:function(a){return this._stencils.findAll(function(b){if(!b){return false
}return(b.roles().member(a))?true:false
})
},_edgesWithRole:function(a){return this._stencils.findAll(function(b){if(!b){return false
}return(b.roles().member(a)&&b.type()==="edge")?true:false
})
},_nodesWithRole:function(a){return this._stencils.findAll(function(b){if(!b){return false
}return(b.roles().member(a)&&b.type()==="node")?true:false
})
},_getMaximumOccurrence:function(b,c){var a;
c.roles().each((function(e){var d=this._cardinalityRules[e];
if(d&&d.maximumOccurrence){if(a){a=Math.min(a,d.maximumOccurrence)
}else{a=d.maximumOccurrence
}}}).bind(this));
return a
},_getMaximumNumberOfOutgoingEdge:function(b){if(!b||!b.sourceStencil||!b.edgeStencil){return false
}var a;
b.sourceStencil.roles().each((function(d){var c=this._cardinalityRules[d];
if(c&&c.outgoingEdges){b.edgeStencil.roles().each(function(e){var f=c.outgoingEdges[e];
if(f&&f.maximum){if(a){a=Math.min(a,f.maximum)
}else{a=f.maximum
}}})
}}).bind(this));
return a
},_getMaximumNumberOfIncomingEdge:function(b){if(!b||!b.targetStencil||!b.edgeStencil){return false
}var a;
b.targetStencil.roles().each((function(d){var c=this._cardinalityRules[d];
if(c&&c.incomingEdges){b.edgeStencil.roles().each(function(e){var f=c.incomingEdges[e];
if(f&&f.maximum){if(a){a=Math.min(a,f.maximum)
}else{a=f.maximum
}}})
}}).bind(this));
return a
},_getConnectionRulesOfEdgeStencil:function(b){var a=new Hash();
b.roles().each((function(c){if(this._connectionRules[c]){this._connectionRules[c].each(function(d){if(a[d.key]){a[d.key]=a[d.key].concat(d.value)
}else{a[d.key]=d.value
}})
}}).bind(this));
return a
},_isRoleOfOtherNamespace:function(a){return(a.indexOf("#")>0)
},toString:function(){return"Rules"
}};
ORYX.Core.StencilSet.Rules=Clazz.extend(ORYX.Core.StencilSet.Rules);