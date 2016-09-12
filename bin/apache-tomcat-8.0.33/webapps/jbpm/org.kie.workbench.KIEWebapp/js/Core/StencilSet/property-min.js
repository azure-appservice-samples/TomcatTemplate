if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.Property=Clazz.extend({construct:function(c,a,b){arguments.callee.$.construct.apply(this,arguments);
this._jsonProp=c||ORYX.Log.error("Parameter jsonProp is not defined.");
this._namespace=a||ORYX.Log.error("Parameter namespace is not defined.");
this._stencil=b||ORYX.Log.error("Parameter stencil is not defined.");
this._items=new Hash();
this._complexItems=new Hash();
c.id=c.id||ORYX.Log.error("ORYX.Core.StencilSet.Property(construct): Id is not defined.");
c.id=c.id.toLowerCase();
if(!c.type){ORYX.Log.info("Type is not defined for stencil '%0', id '%1'. Falling back to 'String'.",b,c.id);
c.type="string"
}else{c.type=c.type.toLowerCase()
}c.prefix=c.prefix||"oryx";
c.title=c.title||"";
c.value=c.value||"";
c.description=c.description||"";
c.readonly=c.readonly||false;
if(c.optional!=false){c.optional=true
}if(this._jsonProp.refToView){if(!(this._jsonProp.refToView instanceof Array)){this._jsonProp.refToView=[this._jsonProp.refToView]
}}else{this._jsonProp.refToView=[]
}if(c.min===undefined||c.min===null){c.min=Number.MIN_VALUE
}if(c.max===undefined||c.max===null){c.max=Number.MAX_VALUE
}if(!c.fillOpacity){c.fillOpacity=false
}if(!c.strokeOpacity){c.strokeOpacity=false
}if(c.length===undefined||c.length===null){c.length=Number.MAX_VALUE
}if(!c.wrapLines){c.wrapLines=false
}if(!c.dateFormat){c.dataFormat="m/d/y"
}if(!c.fill){c.fill=false
}if(!c.stroke){c.stroke=false
}if(!c.inverseBoolean){c.inverseBoolean=false
}if(!c.directlyEditable&&c.directlyEditable!=false){c.directlyEditable=true
}if(!c.visible){c.visible=true
}if(!c.hidden){c.hidden=false
}if(!c.fortasktypes){c.fortasktypes=""
}if(!c.ifproptrue){c.ifproptrue=""
}if(!c.fordistribution){c.fordistribution=""
}if(!c.popular){c.popular=false
}if(!c.simulation){c.simulation=false
}if(!c.customassignment){c.customassignment=false
}if(!c.display){c.display=false
}if(!c.extra){c.extra=false
}if(c.complexItems&&c.complexItems instanceof Array){c.complexItems.each((function(f){try{this._complexItems[f.id]=new ORYX.Core.StencilSet.ComplexPropertyItem(f,a,this)
}catch(d){ORYX.Log.error("error while initializing complex items for "+c.title);
ORYX.Log.error(d)
}}).bind(this))
}if((c.type===ORYX.CONFIG.TYPE_CHOICE)||(c.type===ORYX.CONFIG.TYPE_DYNAMICCHOICE)){if(c.items&&c.items instanceof Array){c.items.each((function(d){this._items[d.value]=new ORYX.Core.StencilSet.PropertyItem(d,a,this)
}).bind(this))
}else{throw"ORYX.Core.StencilSet.Property(construct): No property items defined."
}}if(c.type===ORYX.CONFIG.TYPE_COMPLEX&&c.complexItems===undefined){throw"ORYX.Core.StencilSet.Property(construct): No complex property items defined."
}if(c.labelProvider){this._labelProvider=c.labelProvider.transform
}},equals:function(a){return(this._namespace===a.namespace()&&this.id()===a.id())?true:false
},namespace:function(){return this._namespace
},stencil:function(){return this._stencil
},id:function(){return this._jsonProp.id
},prefix:function(){return this._jsonProp.prefix
},type:function(){return this._jsonProp.type
},inverseBoolean:function(){return this._jsonProp.inverseBoolean
},popular:function(){return this._jsonProp.popular
},simulation:function(){return this._jsonProp.simulation
},customassignment:function(){return this._jsonProp.customassignment
},display:function(){return this._jsonProp.display
},extra:function(){return this._jsonProp.extra
},setPopular:function(){this._jsonProp.popular=true
},setSimulation:function(){this._jsonProp.simulation=true
},setCustomassignment:function(){this._jsonProp.customassignment=true
},setDisplay:function(){this._jsonProp.display=true
},setExtra:function(){this._jsonProp.extra=true
},directlyEditable:function(){return this._jsonProp.directlyEditable
},visible:function(){return this._jsonProp.visible
},hidden:function(){return this._jsonProp.hidden
},fortasktypes:function(){return this._jsonProp.fortasktypes
},ifproptrue:function(){return this._jsonProp.ifproptrue
},fordistribution:function(){return this._jsonProp.fordistribution
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonProp,"title")
},value:function(){return this._jsonProp.value
},readonly:function(){return this._jsonProp.readonly
},optional:function(){return this._jsonProp.optional
},description:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonProp,"description")
},refToView:function(){return this._jsonProp.refToView
},min:function(){return this._jsonProp.min
},max:function(){return this._jsonProp.max
},fillOpacity:function(){return this._jsonProp.fillOpacity
},strokeOpacity:function(){return this._jsonProp.strokeOpacity
},length:function(){return this._jsonProp.length?this._jsonProp.length:Number.MAX_VALUE
},wrapLines:function(){return this._jsonProp.wrapLines
},dateFormat:function(){return this._jsonProp.dateFormat
},fill:function(){return this._jsonProp.fill
},stroke:function(){return this._jsonProp.stroke
},items:function(){return this._items.values()
},item:function(a){return this._items[a]
},toString:function(){return"Property "+this.title()+" ("+this.id()+")"
},complexItems:function(){return this._complexItems.values()
},complexItem:function(a){return this._complexItems[a]
},complexAttributeToView:function(){return this._jsonProp.complexAttributeToView||""
},labelProvider:function(){return this._labelProvider
}});