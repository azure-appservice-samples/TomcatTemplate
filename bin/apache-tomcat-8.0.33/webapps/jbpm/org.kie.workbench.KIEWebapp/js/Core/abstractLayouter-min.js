if(!ORYX){var ORYX={}
}if(!ORYX.Plugins){ORYX.Plugins={}
}ORYX.Plugins.AbstractLayouter=ORYX.Plugins.AbstractPlugin.extend({layouted:[],construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT,this._initLayout.bind(this))
},isIncludedInLayout:function(a){if(!(this.layouted instanceof Array)){this.layouted=[this.layouted].compact()
}if(this.layouted.length<=0){return true
}return this.layouted.any(function(b){if(typeof b=="string"){return a.getStencil().id().include(b)
}else{return a instanceof b
}})
},_initLayout:function(c){var b=[c.shapes].flatten().compact();
var a=b.findAll(function(d){return this.isIncludedInLayout(d)
}.bind(this));
if(a.length>0){this.layout(a)
}},layout:function(a){throw new Error("Layouter has to implement the layout function.")
},getChildShapesWithout:function(a,b){if(typeof a.getChildShapes=="function"){var c=a.getChildShapes(false);
return c.findAll(function(d){return !b.member(d.getStencil().id())
})
}else{return[]
}}});