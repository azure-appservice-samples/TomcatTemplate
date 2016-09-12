if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.RenameShapes=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_DBLCLICK,this.actOnDBLClick.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_CLICK,this.actOnClick.bind(this));
this.facade.offer({keyCodes:[{keyCode:113,keyAction:ORYX.CONFIG.KEY_ACTION_DOWN}],functionality:this.renamePerF2.bind(this)})
},renamePerF2:function renamePerF2(){var a=this.facade.getSelection();
this.actOnDBLClick(undefined,a.first())
},getEditableProperties:function getEditableProperties(a){var b=a.getStencil().properties().findAll(function(c){return(c.refToView()&&c.refToView().length>0&&c.directlyEditable())
});
return b.findAll(function(c){return !c.readonly()&&(c.type()==ORYX.CONFIG.TYPE_STRING||c.type()==ORYX.CONFIG.TYPE_TEXT)
})
},getPropertyForLabel:function getPropertyForLabel(c,a,b){return c.find(function(d){return d.refToView().any(function(e){return b.id==a.id+e
})
})
},actOnClick:function actOnClick(a,b){if(!(b instanceof ORYX.Core.Shape)){if(this.shownComboBox){this.hide();
this.destroy()
}}},actOnDBLClick:function actOnDBLClick(h,d){if(!(d instanceof ORYX.Core.Shape)){return
}if((d instanceof ORYX.Core.Node||d instanceof ORYX.Core.Edge)&&d.properties["oryx-isselectable"]=="false"){return
}this.hide();
this.destroy();
var e=this.getEditableProperties(d);
var f=e.collect(function(k){return k.refToView()
}).flatten().compact();
var b=d.getLabels().findAll(function(k){return f.any(function(l){return k.id.endsWith(l)
})
});
if(b.length==0){return
}var c=b.length==1?b[0]:null;
if(!c){c=b.find(function(k){return k.node==h.target||k.node==h.target.parentNode
});
if(!c){var i=this.facade.eventCoordinates(h);
var j=this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
i.x*=j.a;
i.y*=j.d;
if(!d instanceof ORYX.Core.Node){var g=b.collect(function(m){var l=this.getCenterPosition(m.node);
var k=Math.sqrt(Math.pow(l.x-i.x,2)+Math.pow(l.y-i.y,2));
return{diff:k,label:m}
}.bind(this));
g.sort(function(l,k){return l.diff>k.diff
});
c=g[0].label
}else{var g=b.collect(function(m){var l=this.getDifferenceCenterForNode(m.node);
var k=Math.sqrt(Math.pow(l.x-i.x,2)+Math.pow(l.y-i.y,2));
return{diff:k,label:m}
}.bind(this));
g.sort(function(l,k){return l.diff>k.diff
});
c=g[0].label
}}}var a=this.getPropertyForLabel(e,d,c);
this.showTextField(d,a,c)
},showTextField:function showTextField(i,d,j){var h=this.facade.getCanvas().getHTMLContainer().id;
var f;
if(!(i instanceof ORYX.Core.Node)){var a=j.node.getBoundingClientRect();
f=Math.max(150,a.width)
}else{f=i.bounds.width()
}if(!i instanceof ORYX.Core.Node){var b=this.getCenterPosition(j.node);
b.x-=(f/2)
}else{var b=i.absoluteBounds().center();
b.x-=(f/2)
}var e=d.prefix()+"-"+d.id();
this.comboId=Ext.id();
var g={id:this.comboId,renderTo:h,value:i.properties[e],maxLength:d.length(),emptyText:d.title(),listeners:{specialkey:this._specialKeyPressed.bind(this),blur:function(){}.bind(this),change:function(p,o,l){if(this.shownComboBox){var n=i;
var l=n.properties[e];
var o=this.shownComboBox.getRawValue();
var m=this.facade;
if(l!=o){var k=ORYX.Core.Command.extend({construct:function(){this.el=n;
this.propId=e;
this.oldValue=l;
this.newValue=o;
this.facade=m
},execute:function(){this.el.setProperty(this.propId,this.newValue);
this.facade.setSelection([this.el]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:this.el,key:this.propId,value:this.newValue})
},rollback:function(){this.el.setProperty(this.propId,this.oldValue);
this.facade.setSelection([this.el]);
this.facade.getCanvas().update();
this.facade.updateSelection();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,elements:this.el,key:this.propId,value:this.oldValue})
}});
var q=new k();
this.facade.executeCommands([q])
}}}.bind(this)},hideTrigger:true,typeAhead:true,queryMode:"local",minChars:1,labelStyle:"display:none",store:ORYX.Dictionary.Dictionaryitems,displayField:"name",valueField:"name",mode:"local",triggerAction:"all",forceSelection:false,caseSensitive:false,autoSelect:false};
this.shownComboBox=new Ext.form.ComboBox(g);
this.shownComboBox.setPosition((b.x<10)?10:b.x,b.y-16);
this.shownComboBox.setSize(Math.max(100,f),40);
if(("webkitSpeech" in document.createElement("input"))){var c={"x-webkit-speech":"true"};
Ext.get(this.comboId).set(c)
}this.shownComboBox.show();
this.shownComboBox.focus("",40);
this.facade.disableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
},_specialKeyPressed:function _specialKeyPressed(c,b){var a=b.getKey();
if(a==13&&(b.shiftKey||!c.initialConfig.grow)){c.fireEvent("change",null,c.getValue());
this.destroy()
}else{if(a==b.ESC){this.destroy()
}}},getCenterPosition:function(f){var a={x:0,y:0};
var c=f.getTransformToElement(this.facade.getCanvas().rootNode.lastChild);
var h=this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
var b=f.getTransformToElement(f.parentNode);
var d=undefined;
a.x=c.e-b.e;
a.y=c.f-b.f;
try{d=f.getBBox()
}catch(g){}if(d===null||typeof d==="undefined"||d.width==0||d.height==0){d={x:Number(f.getAttribute("x")),y:Number(f.getAttribute("y")),width:0,height:0}
}a.x+=d.x;
a.y+=d.y;
a.x+=d.width/2;
a.y+=d.height/2;
a.x*=h.a;
a.y*=h.d;
return a
},getDifferenceCenterForNode:function getDifferenceCenterForNode(b){var a=this.getCenterPosition(b);
a.x=0;
a.y=a.y+10;
return a
},hide:function(a){if(this.shownComboBox){this.shownComboBox.fireEvent("change");
this.shownComboBox.fireEvent("blur")
}},destroy:function(a){if(this.shownComboBox){this.shownComboBox.hide();
delete this.shownComboBox;
this.facade.enableEvent(ORYX.CONFIG.EVENT_KEYDOWN)
}}});