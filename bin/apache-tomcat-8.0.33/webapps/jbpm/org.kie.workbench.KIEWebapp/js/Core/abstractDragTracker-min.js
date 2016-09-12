if(!ORYX){var ORYX={}
}if(!ORYX.Plugins){ORYX.Plugins={}
}ORYX.Plugins.AbstractDragTracker=ORYX.Plugins.AbstractPlugin.extend({shapes:[null],construct:function(a){arguments.callee.$.construct.apply(this,arguments);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAG_TRACKER_DRAG,function(b){if(this.isIncludedInShapes(b.shapes)){this.drag(b.shapes,b.bounds)
}}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DRAG_TRACKER_RESIZE,function(b){if(this.isIncludedInShapes(b.shapes)){this.resize(b.shapes,b.bounds)
}}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,function(b){if(this.isIncludedInShapes(b.shapes)){this.resizeEnd(b.shapes)
}}.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DROP_SHAPE,function(b){if(this.isIncludedInShapes(b.shape)){this.newShape(b.shape)
}}.bind(this))
},drag:function(a,b){},resize:function(a,b){},resizeEnd:function(a){},newShape:function(a){},isIncludedInShapes:function(a){if(a instanceof Array){included=false;
a.each(function(b){if(this.isIncludedInShapes(b)){included=true;
return
}}.bind(this));
return included
}if(!(this.shapes instanceof Array)){this.shapes=[this.shapes].compact()
}if(this.shapes.length<=0){return true
}return this.shapes.any(function(b){if(typeof b=="string"){return a.getStencil().id().include(b)
}else{return a instanceof b
}})
}});