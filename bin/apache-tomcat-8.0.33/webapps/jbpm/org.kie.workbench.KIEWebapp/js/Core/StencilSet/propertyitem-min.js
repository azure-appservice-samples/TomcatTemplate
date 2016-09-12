if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.StencilSet){ORYX.Core.StencilSet={}
}ORYX.Core.StencilSet.PropertyItem=Clazz.extend({construct:function(a,b,c){arguments.callee.$.construct.apply(this,arguments);
if(!a){throw"ORYX.Core.StencilSet.PropertyItem(construct): Parameter jsonItem is not defined."
}if(!b){throw"ORYX.Core.StencilSet.PropertyItem(construct): Parameter namespace is not defined."
}if(!c){throw"ORYX.Core.StencilSet.PropertyItem(construct): Parameter property is not defined."
}this._jsonItem=a;
this._namespace=b;
this._property=c;
if(!a.value){throw"ORYX.Core.StencilSet.PropertyItem(construct): Value is not defined."
}if(this._jsonItem.refToView){if(!(this._jsonItem.refToView instanceof Array)){this._jsonItem.refToView=[this._jsonItem.refToView]
}}else{this._jsonItem.refToView=[]
}},equals:function(a){return(this.property().equals(a.property())&&this.value()===a.value())
},namespace:function(){return this._namespace
},property:function(){return this._property
},value:function(){return this._jsonItem.value
},needsprop:function(){return this._jsonItem.needsprop
},title:function(){return ORYX.Core.StencilSet.getTranslation(this._jsonItem,"title")
},refToView:function(){return this._jsonItem.refToView
},icon:function(){return(this._jsonItem.icon)?this.property().stencil()._source+"icons/"+this._jsonItem.icon:""
},toString:function(){return"PropertyItem "+this.property()+" ("+this.value()+")"
}});