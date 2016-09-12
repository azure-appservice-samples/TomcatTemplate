if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}if(!ORYX.Core.Controls){ORYX.Core.Controls={}
}ORYX.Core.Controls.Magnet=ORYX.Core.Controls.Control.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.anchorLeft;
this.anchorRight;
this.anchorTop;
this.anchorBottom;
this.bounds.set(0,0,16,16);
this.node=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["g",{"pointer-events":"all"},["circle",{cx:"8",cy:"8",r:"4",stroke:"none",fill:"red","fill-opacity":"0.3"}]]);
this.hide()
},update:function(){arguments.callee.$.update.apply(this,arguments)
},_update:function(){arguments.callee.$.update.apply(this,arguments)
},refresh:function(){arguments.callee.$.refresh.apply(this,arguments);
var a=this.bounds.upperLeft();
this.node.setAttributeNS(null,"transform","translate("+a.x+", "+a.y+")")
},show:function(){arguments.callee.$.show.apply(this,arguments)
},toString:function(){return"Magnet "+this.id
}});