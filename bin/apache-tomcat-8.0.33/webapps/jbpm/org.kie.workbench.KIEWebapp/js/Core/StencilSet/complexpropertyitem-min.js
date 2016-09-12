if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.ComplexPropertyItem=Clazz.extend({construct:function(a,b,c){arguments.callee.$.construct.apply(this,arguments);
if(!a){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter jsonItem is not defined."
}if(!b){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter namespace is not defined."
}if(!c){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter property is not defined."
}this._jsonItem=a;
this._namespace=b;
this._property=c;
this._items=new Hash();
if(!a.name){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Name is not defined."
}if(!a.type){throw"ORYX.Core.StencilSet.ComplexPropertyItem(construct): Type is not defined."
}else{a.type=a.type.toLowerCase()
}if((a.type===ORYX.CONFIG.TYPE_CHOICE)||(a.type===ORYX.CONFIG.TYPE_DYNAMICCHOICE)){if(a.items&&a.items instanceof Array){a.items.each((function(d){this._items[d.value]=new ORYX.Core.StencilSet.PropertyItem(d,b,this)
}).bind(this))
}else{throw"ORYX.Core.StencilSet.Property(construct): No property items defined."
}}},equals:function(a){return(this.property().equals(a.property())&&this.name()===a.name())
},namespace:function(){return this._namespace
},property:function(){return this._property
},name:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonItem,"name")
},id:function(){return this._jsonItem.id
},type:function(){return this._jsonItem.type
},optional:function(){return this._jsonItem.optional
},width:function(){return this._jsonItem.width
},value:function(){return this._jsonItem.value
},items:function(){return this._items.values()
},disable:function(){return this._jsonItem.disable
}});