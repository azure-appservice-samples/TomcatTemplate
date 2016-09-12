Array.prototype.insertFrom=function(e,d){d=Math.max(0,d);
e=Math.min(Math.max(0,e),this.length-1);
var b=this[e];
var a=this.without(b);
var c=a.slice(0,d);
c.push(b);
if(a.length>d){c=c.concat(a.slice(d))
}return c
};
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Arrangement=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.offer({name:ORYX.I18N.Arrangement.btf,functionality:this.setZLevel.bind(this,this.setToTop),group:ORYX.I18N.Arrangement.groupZ,icon:ORYX.BASE_FILE_PATH+"images/shape_move_front.png",dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",description:ORYX.I18N.Arrangement.btfDesc,index:1,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.btb,functionality:this.setZLevel.bind(this,this.setToBack),group:ORYX.I18N.Arrangement.groupZ,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",icon:ORYX.BASE_FILE_PATH+"images/shape_move_back.png",description:ORYX.I18N.Arrangement.btbDesc,index:2,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.bf,functionality:this.setZLevel.bind(this,this.setForward),group:ORYX.I18N.Arrangement.groupZ,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",icon:ORYX.BASE_FILE_PATH+"images/shape_move_forwards.png",description:ORYX.I18N.Arrangement.bfDesc,index:3,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.bb,functionality:this.setZLevel.bind(this,this.setBackward),group:ORYX.I18N.Arrangement.groupZ,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",icon:ORYX.BASE_FILE_PATH+"images/shape_move_backwards.png",description:ORYX.I18N.Arrangement.bbDesc,index:4,minShape:1});
this.facade.offer({name:ORYX.I18N.Arrangement.ab,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_BOTTOM]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_bottom.png",description:ORYX.I18N.Arrangement.abDesc,index:1,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.am,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_MIDDLE]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_middle.png",description:ORYX.I18N.Arrangement.amDesc,index:2,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.at,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_TOP]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_top.png",description:ORYX.I18N.Arrangement.atDesc,index:3,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.al,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_LEFT]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_left.png",description:ORYX.I18N.Arrangement.alDesc,index:4,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.ac,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_CENTER]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",description:ORYX.I18N.Arrangement.acDesc,index:5,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.ar,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_RIGHT]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_right.png",description:ORYX.I18N.Arrangement.arDesc,index:6,minShape:2});
this.facade.offer({name:ORYX.I18N.Arrangement.as,functionality:this.alignShapes.bind(this,[ORYX.CONFIG.EDITOR_ALIGN_SIZE]),group:ORYX.I18N.Arrangement.groupA,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/shape_align_center.png",icon:ORYX.BASE_FILE_PATH+"images/shape_align_size.png",description:ORYX.I18N.Arrangement.asDesc,index:7,minShape:2})
}this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_TOP,this.setZLevel.bind(this,this.setToTop));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_BACK,this.setZLevel.bind(this,this.setToBack));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_FORWARD,this.setZLevel.bind(this,this.setForward));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_ARRANGEMENT_BACKWARD,this.setZLevel.bind(this,this.setBackward))
},setZLevel:function(d,b){var a=ORYX.Core.Command.extend({construct:function(g,f,e){this.callback=g;
this.elements=f;
this.elAndIndex=f.map(function(h){return{el:h,previous:h.parent.children[h.parent.children.indexOf(h)-1]}
});
this.facade=e
},execute:function(){this.callback(this.elements);
this.facade.setSelection(this.elements)
},rollback:function(){var g=this.elAndIndex.sortBy(function(l){var m=l.el;
var i=$A(m.node.parentNode.childNodes);
return i.indexOf(m.node)
});
for(var f=0;
f<g.length;
f++){var h=g[f].el;
var j=h.parent;
var k=j.children.indexOf(h);
var e=j.children.indexOf(g[f].previous);
e=e||0;
j.children=j.children.insertFrom(k,e);
h.node.parentNode.insertBefore(h.node,h.node.parentNode.childNodes[e+1])
}this.facade.setSelection(this.elements)
}});
var c=new a(d,this.facade.getSelection(),this.facade);
if(b.excludeCommand){c.execute()
}else{this.facade.executeCommands([c])
}},setToTop:function(b){var a=b.sortBy(function(e,c){var d=$A(e.node.parentNode.childNodes);
return d.indexOf(e.node)
});
a.each(function(c){var d=c.parent;
d.children=d.children.without(c);
d.children.push(c);
c.node.parentNode.appendChild(c.node)
})
},setToBack:function(b){var a=b.sortBy(function(e,c){var d=$A(e.node.parentNode.childNodes);
return d.indexOf(e.node)
});
a=a.reverse();
a.each(function(c){var d=c.parent;
d.children=d.children.without(c);
d.children.unshift(c);
c.node.parentNode.insertBefore(c.node,c.node.parentNode.firstChild)
})
},setBackward:function(c){var b=c.sortBy(function(f,d){var e=$A(f.node.parentNode.childNodes);
return e.indexOf(f.node)
});
b=b.reverse();
var a=b.findAll(function(d){return !b.some(function(e){return e.node==d.node.previousSibling
})
});
a.each(function(e){if(e.node.previousSibling===null){return
}var f=e.parent;
var d=f.children.indexOf(e);
f.children=f.children.insertFrom(d,d-1);
e.node.parentNode.insertBefore(e.node,e.node.previousSibling)
})
},setForward:function(c){var b=c.sortBy(function(f,d){var e=$A(f.node.parentNode.childNodes);
return e.indexOf(f.node)
});
var a=b.findAll(function(d){return !b.some(function(e){return e.node==d.node.nextSibling
})
});
a.each(function(f){var d=f.node.nextSibling;
if(d===null){return
}var e=f.parent.children.indexOf(f);
var g=f.parent;
g.children=g.children.insertFrom(e,e+1);
f.node.parentNode.insertBefore(d,f.node)
})
},alignShapes:function(b){var f=this.facade.getSelection();
f=this.facade.getCanvas().getShapesWithSharedParent(f);
f=f.findAll(function(h){return(h instanceof ORYX.Core.Node)
});
f=f.findAll(function(h){var i=h.getIncomingShapes();
return i.length==0||!f.include(i[0])
});
if(f.length<2){return
}var e=f[0].absoluteBounds().clone();
f.each(function(h){e.include(h.absoluteBounds().clone())
});
var d=0;
var c=0;
f.each(function(h){d=Math.max(h.bounds.width(),d);
c=Math.max(h.bounds.height(),c)
});
var a=ORYX.Core.Command.extend({construct:function(m,l,k,j,h,i){this.elements=m;
this.bounds=l;
this.maxHeight=k;
this.maxWidth=j;
this.way=h;
this.facade=i;
this.orgPos=[]
},setBounds:function(h,j){if(!j){j={width:ORYX.CONFIG.MAXIMUM_SIZE,height:ORYX.CONFIG.MAXIMUM_SIZE}
}if(!h.bounds){throw"Bounds not definined."
}var i={a:{x:h.bounds.upperLeft().x-(this.maxWidth-h.bounds.width())/2,y:h.bounds.upperLeft().y-(this.maxHeight-h.bounds.height())/2},b:{x:h.bounds.lowerRight().x+(this.maxWidth-h.bounds.width())/2,y:h.bounds.lowerRight().y+(this.maxHeight-h.bounds.height())/2}};
if(this.maxWidth>j.width){i.a.x=h.bounds.upperLeft().x-(j.width-h.bounds.width())/2;
i.b.x=h.bounds.lowerRight().x+(j.width-h.bounds.width())/2
}if(this.maxHeight>j.height){i.a.y=h.bounds.upperLeft().y-(j.height-h.bounds.height())/2;
i.b.y=h.bounds.lowerRight().y+(j.height-h.bounds.height())/2
}h.bounds.set(i)
},execute:function(){this.elements.each(function(h,i){this.orgPos[i]=h.bounds.upperLeft();
var j=this.bounds.clone();
if(h.parent&&!(h.parent instanceof ORYX.Core.Canvas)){var k=h.parent.absoluteBounds().upperLeft();
j.moveBy(-k.x,-k.y)
}switch(this.way){case ORYX.CONFIG.EDITOR_ALIGN_BOTTOM:h.bounds.moveTo({x:h.bounds.upperLeft().x,y:j.b.y-h.bounds.height()});
break;
case ORYX.CONFIG.EDITOR_ALIGN_MIDDLE:h.bounds.moveTo({x:h.bounds.upperLeft().x,y:(j.a.y+j.b.y-h.bounds.height())/2});
break;
case ORYX.CONFIG.EDITOR_ALIGN_TOP:h.bounds.moveTo({x:h.bounds.upperLeft().x,y:j.a.y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_LEFT:h.bounds.moveTo({x:j.a.x,y:h.bounds.upperLeft().y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_CENTER:h.bounds.moveTo({x:(j.a.x+j.b.x-h.bounds.width())/2,y:h.bounds.upperLeft().y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_RIGHT:h.bounds.moveTo({x:j.b.x-h.bounds.width(),y:h.bounds.upperLeft().y});
break;
case ORYX.CONFIG.EDITOR_ALIGN_SIZE:if(h.isResizable){this.orgPos[i]={a:h.bounds.upperLeft(),b:h.bounds.lowerRight()};
this.setBounds(h,h.maximumSize)
}break
}}.bind(this));
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.elements.each(function(h,i){if(this.way==ORYX.CONFIG.EDITOR_ALIGN_SIZE){if(h.isResizable){h.bounds.set(this.orgPos[i])
}}else{h.bounds.moveTo(this.orgPos[i])
}}.bind(this));
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var g=new a(f,e,c,d,parseInt(b),this.facade);
this.facade.executeCommands([g])
}});