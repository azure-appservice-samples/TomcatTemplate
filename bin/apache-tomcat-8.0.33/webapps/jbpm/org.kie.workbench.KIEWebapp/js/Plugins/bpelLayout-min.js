if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.BPELLayouting=Clazz.extend({facade:undefined,isEnabled:undefined,construct:function(a){this.facade=a;
this.isEnabled=true;
this.facade.offer({name:ORYX.I18N.BPELSupport.enable,functionality:this.enableBpelLayout.bind(this),group:ORYX.I18N.BPELLayout.group,icon:ORYX.BASE_FILE_PATH+"images/bpel_layout_enable.png",description:ORYX.I18N.BPELLayout.enDesc,index:0,minShape:0,maxShape:0,isEnabled:function(){return !(this.isEnabled)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.BPELSupport.disable,functionality:this.disableBpelLayout.bind(this),group:ORYX.I18N.BPELLayout.group,icon:ORYX.BASE_FILE_PATH+"images/bpel_layout_disable.png",description:ORYX.I18N.BPELLayout.disDesc,index:1,minShape:0,maxShape:0,isEnabled:function(){return this.isEnabled
}.bind(this)});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT_BPEL,this.handleLayoutEvent.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT_BPEL_VERTICAL,this.handleLayoutVerticalEvent.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT_BPEL_HORIZONTAL,this.handleLayoutHorizontalEvent.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT_BPEL_SINGLECHILD,this.handleSingleChildLayoutEvent.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LAYOUT_BPEL_AUTORESIZE,this.handleAutoResizeLayoutEvent.bind(this))
},disableBpelLayout:function(){this.isEnabled=false
},enableBpelLayout:function(){this.isEnabled=true;
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:"Auto Layouting..."});
nodes=this.facade.getCanvas().getChildNodes();
for(var a=0;
a<nodes.size();
a++){node=nodes[a];
if(node.getStencil().id()==node.getStencil().namespace()+"process"){this._adjust_node(node)
}}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
},_adjust_node:function(c){var a=c.getChildNodes();
for(var b=0;
b<a.size();
b++){this._adjust_node(a[b])
}this._handleLayoutEventAdapter(c)
},_handleLayoutEventAdapter:function(a){if(a.getStencil().id()==a.getStencil().namespace()+"process"||a.getStencil().id()==a.getStencil().namespace()+"invoke"||a.getStencil().id()==a.getStencil().namespace()+"scope"){this._handleLayoutEvent(a)
}else{if(a.getStencil().id()==a.getStencil().namespace()+"assign"||a.getStencil().id()==a.getStencil().namespace()+"eventHandlers"||a.getStencil().id()==a.getStencil().namespace()+"faultHandlers"||a.getStencil().id()==a.getStencil().namespace()+"compensationHandler"||a.getStencil().id()==a.getStencil().namespace()+"terminationHandler"){this._handleLayoutVerticalEvent(a)
}else{if(a.getStencil().id()==a.getStencil().namespace()+"if"||a.getStencil().id()==a.getStencil().namespace()+"sequence"||a.getStencil().id()==a.getStencil().namespace()+"pick"){this._handleLayoutHorizontalEvent(a)
}else{if(a.getStencil().id()==a.getStencil().namespace()+"onMessage"||a.getStencil().id()==a.getStencil().namespace()+"if_branch"||a.getStencil().id()==a.getStencil().namespace()+"else_branch"||a.getStencil().id()==a.getStencil().namespace()+"while"||a.getStencil().id()==a.getStencil().namespace()+"repeatUntil"||a.getStencil().id()==a.getStencil().namespace()+"forEach"||a.getStencil().id()==a.getStencil().namespace()+"onAlarm"||a.getStencil().id()==a.getStencil().namespace()+"onEvent"||a.getStencil().id()==a.getStencil().namespace()+"catch"||a.getStencil().id()==a.getStencil().namespace()+"catchAll"){this._handleSingleChildLayoutEvent(a)
}else{if(a.getStencil().id()==a.getStencil().namespace()+"flow"){this._handleAutoResizeLayoutEvent(a)
}else{return
}}}}}},handleLayoutEvent:function(a){this._handleLayoutEvent(a.shape)
},handleLayoutVerticalEvent:function(a){this._handleLayoutVerticalEvent(a.shape)
},handleLayoutHorizontalEvent:function(a){this._handleLayoutHorizontalEvent(a.shape)
},handleSingleChildLayoutEvent:function(a){this._handleSingleChildLayoutEvent(a.shape)
},handleAutoResizeLayoutEvent:function(a){this._handleAutoResizeLayoutEvent(a.shape)
},_handleLayoutEvent:function(m){if(this.isEnabled==false){return
}var b=m.getChildShapes(false);
if(!this._requiredAutoLayout(m)){return
}if(!b||b.length==0){this._resetBounds(m);
this._update(m);
return
}var d=b.find(function(q){return(q.getStencil().id()==q.getStencil().namespace()+"eventHandlers")
});
var o=b.find(function(q){return(q.getStencil().id()==q.getStencil().namespace()+"faultHandlers")
});
var i=b.find(function(q){return(q.getStencil().id()==q.getStencil().namespace()+"compensationHandler")
});
var l=b.find(function(q){return(q.getStencil().id()==q.getStencil().namespace()+"terminationHandler")
});
var g=b.findAll(function(q){return(q!==d&&q!==o&&q!==i&&q!==l)
});
var e=30;
var a=30;
if(g){g=g.sortBy(function(q){return q.bounds.upperLeft().y
});
if(this._moveSomeElementToLastPosition(g)){g=g.sortBy(function(q){return q.bounds.upperLeft().y
})
}var c=0;
var n;
var k=0;
g.each(function(s){var r=s.bounds.upperLeft();
var q=r.y;
r.y=c+30;
c=r.y+s.bounds.height();
if(r.y!=q){s.bounds.moveTo(30,r.y)
}n=s.bounds.width();
if(n>k){k=n
}});
e=30+k+30
}var f;
var p=0;
if(d){d.bounds.moveTo(e,a);
a=d.bounds.lowerRight().y+10;
f=this._getRightestBoundOfAllChildren(d)+30;
if(f>p){p=f
}}if(o){o.bounds.moveTo(e,a);
a=o.bounds.lowerRight().y+10;
f=this._getRightestBoundOfAllChildren(o)+30;
if(f>p){p=f
}}if(i){i.bounds.moveTo(e,a);
a=i.bounds.lowerRight().y+10;
f=this._getRightestBoundOfAllChildren(i)+30;
if(f>p){p=f
}}if(l){l.bounds.moveTo(e,a);
f=this._getRightestBoundOfAllChildren(l)+30;
if(f>p){p=f
}}if(f>0){var j;
var h;
if(d){f=d.bounds.width();
if(f!==p){j=d.bounds.upperLeft();
h=d.bounds.lowerRight();
d.bounds.set(j.x,j.y,j.x+p,h.y)
}}if(o){f=o.bounds.width();
if(f!==p){j=o.bounds.upperLeft();
h=o.bounds.lowerRight();
o.bounds.set(j.x,j.y,j.x+p,h.y)
}}if(i){f=i.bounds.width();
if(f!==p){j=i.bounds.upperLeft();
h=i.bounds.lowerRight();
i.bounds.set(j.x,j.y,j.x+p,h.y)
}}if(l){f=l.bounds.width();
if(f!==p){j=l.bounds.upperLeft();
h=l.bounds.lowerRight();
l.bounds.set(j.x,j.y,j.x+p,h.y)
}}}this._autoResizeLayout(m);
this._update(m);
return
},_getRightestBoundOfAllChildren:function(a){var b=a.getChildShapes(false);
if(!b||b.length==0){return 130
}b=b.sortBy(function(c){return c.bounds.lowerRight().x
});
return b.last().bounds.lowerRight().x
},_handleLayoutVerticalEvent:function(a){if(this.isEnabled==false){return
}var c=a.getChildShapes(false);
if(!this._requiredAutoLayout(a)){return
}if(!c||c.length==0){this._resetBounds(a);
return
}c=c.sortBy(function(d){return d.bounds.upperLeft().y
});
if(this._moveSomeElementToLastPosition(c)){c=c.sortBy(function(d){return d.bounds.upperLeft().y
})
}var b=0;
c.each(function(f){var e=f.bounds.upperLeft();
var d=e.y;
e.y=b+30;
b=e.y+f.bounds.height();
if((e.y!=d)){f.bounds.moveTo(30,e.y)
}});
this._autoResizeLayout(a);
return
},_handleLayoutHorizontalEvent:function(a){if(this.isEnabled==false){return
}var b=a.getChildShapes(false);
if(!this._requiredAutoLayout(a)){return
}if(!b||b.length==0){this._resetBounds(a);
return
}b=b.sortBy(function(d){return d.bounds.upperLeft().x
});
if(this._moveSomeElementToLastPosition(b)){b=b.sortBy(function(d){return d.bounds.upperLeft().x
})
}var c=0;
b.each(function(f){var e=f.bounds.upperLeft();
var d=e.x;
e.x=c+30;
c=e.x+f.bounds.width();
if((e.x!=d)){f.bounds.moveTo(e.x,30)
}});
this._autoResizeLayout(a);
return
},_handleSingleChildLayoutEvent:function(a){if(this.isEnabled==false){return
}var b=a.getChildShapes(false);
if(!this._requiredAutoLayout(a)){return
}if(!b||b.length==0){this._resetBounds(a);
return
}b.first().bounds.moveTo(30,30);
this._autoResizeLayout(a);
return
},_handleAutoResizeLayoutEvent:function(a){if(this.isEnabled==false){return
}var b=a.getChildShapes(false);
if(!this._requiredAutoLayout(a)){return
}b.each(function(d){var c=d.bounds.upperLeft();
if((c.x<30)){d.bounds.moveTo(30,c.y);
c=d.bounds.upperLeft()
}if((c.y<30)){d.bounds.moveTo(c.x,30)
}});
this._autoResizeLayout(a)
},_autoResizeLayout:function(b){var d=b.getChildShapes(false);
if(d.length>0){d=d.sortBy(function(g){return g.bounds.lowerRight().x
});
var f=d.last().bounds.lowerRight().x;
d=d.sortBy(function(g){return g.bounds.lowerRight().y
});
var e=d.last().bounds.lowerRight().y;
var c=b.bounds.upperLeft();
var a=b.bounds.lowerRight();
if(b.getStencil().id()==b.getStencil().namespace()+"flow"){if(a.x<c.x+f+30){b.bounds.set(c.x,c.y,c.x+f+30,a.y);
a.x=c.x+f+30
}if(a.y<c.y+e+30){b.bounds.set(c.x,c.y,a.x,c.y+e+30)
}}else{if(a.x!=c.x+f+30||a.y!=c.y+e+30){b.bounds.set(c.x,c.y,c.x+f+30,c.y+e+30)
}}}return
},_resetBounds:function(b){var c=b.bounds.upperLeft();
var a=b.bounds.lowerRight();
if(b.getStencil().id()==b.getStencil().namespace()+"process"){if(b.getStencil().namespace()=="http://b3mn.org/stencilset/bpel#"){if(a.x!=c.x+600||a.y!=c.y+500){b.bounds.set(c.x,c.y,c.x+600,c.y+500)
}}else{if(b.getStencil().namespace()=="http://b3mn.org/stencilset/bpel4chor#"){if(a.x!=c.x+690||a.y!=c.y+200){b.bounds.set(c.x,c.y,c.x+690,c.y+200)
}}else{return
}}}else{if(b.getStencil().id()==b.getStencil().namespace()+"flow"){if(a.x!=c.x+290||a.y!=c.y+250){b.bounds.set(c.x,c.y,c.x+290,c.y+250)
}}else{if(this._isHandlers(b)){if(a.x!=c.x+160||a.y!=c.y+80){b.bounds.set(c.x,c.y,c.x+160,c.y+80)
}}else{if(a.x!=c.x+100||a.y!=c.y+80){b.bounds.set(c.x,c.y,c.x+100,c.y+80)
}}}}},_isHandlers:function(a){if(a.getStencil().id()==a.getStencil().namespace()+"eventHandlers"){return true
}if(a.getStencil().id()==a.getStencil().namespace()+"faultHandlers"){return true
}if(a.getStencil().id()==a.getStencil().namespace()+"compensationHandler"){return true
}if(a.getStencil().id()==a.getStencil().namespace()+"terminationHandler"){return true
}return false
},_requiredAutoLayout:function(b){var c="oryx-autolayout";
var a=b.properties[c];
if(a==null){return true
}if(a){return true
}return false
},_moveSomeElementToLastPosition:function(b){var a=b.find(function(c){return(Array.indexOf(c.getStencil().roles(),c.getStencil().namespace()+"lastChild")>=0)
});
if(!a||a==b.last()){return false
}ulOfCurrentLastChild=b.last().bounds.upperLeft();
a.bounds.moveTo(ulOfCurrentLastChild.x+1,ulOfCurrentLastChild.y+1);
return true
},_update:function(a){if(a.getStencil().id()==a.getStencil().namespace()+"process"&&a.isChanged){}}});