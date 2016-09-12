if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Footer=Clazz.extend({facade:undefined,plugs:[],construct:function(b,a){this.facade=b;
this.groupIndex=new Hash();
if(ORYX.CONFIG.MENU_INDEX){this.groupIndex=ORYX.CONFIG.MENU_INDEX
}else{a.properties.each((function(c){if(c.group&&c.index!=undefined){this.groupIndex[c.group]=c.index
}}).bind(this))
}Ext.QuickTips.init();
this.buttons=[];
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_BUTTON_UPDATE,this.onButtonUpdate.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_STENCIL_SET_LOADED,this.onSelectionChanged.bind(this))
},onButtonUpdate:function(b){var a=this.buttons.find(function(c){return c.id===b.id
});
if(b.pressed!==undefined){a.buttonInstance.toggle(b.pressed)
}},registryChanged:function(c){var b=c.sortBy((function(g){return((this.groupIndex[g.group]!=undefined?this.groupIndex[g.group]:"")+g.group+""+g.index).toLowerCase()
}).bind(this));
var a=$A(b).findAll(function(g){return !this.plugs.include(g)&&(g.group&&g.group.indexOf("footer")===0)
}.bind(this));
if(a.length<1){return
}this.buttons=[];
ORYX.Log.trace("Creating a footer.");
if(!this.footer){this.footer=new Ext.ux.SlicedToolbar({height:24});
var e=this.facade.addToRegion("south",this.footer,"Footer")
}var f=this.plugs.last()?this.plugs.last().group:a[0].group;
var d={};
a.each((function(i){if(!i.name){return
}this.plugs.push(i);
if(f!=i.group){this.footer.add("-");
f=i.group;
d={}
}var h=i.functionality;
i.functionality=function(){if("undefined"!=typeof(pageTracker)&&"function"==typeof(pageTracker._trackEvent)){pageTracker._trackEvent("FooterButton",i.name)
}return h.apply(this,arguments)
};
if(i.dropDownGroupIcon){var k=d[i.dropDownGroupIcon];
if(k===undefined){k=d[i.dropDownGroupIcon]=new Ext.Toolbar.SplitButton({cls:"x-btn-icon",icon:i.dropDownGroupIcon,menu:new Ext.menu.Menu({items:[]}),listeners:{click:function(l,m){if(!l.menu.isVisible()&&!l.ignoreNextClick){l.showMenu()
}else{l.hideMenu()
}}}});
this.footer.add(k)
}var j={icon:i.icon,text:i.name,itemId:i.id,handler:i.toggle?undefined:i.functionality,checkHandler:i.toggle?i.functionality:undefined,listeners:{render:function(l){if(i.description){new Ext.ToolTip({target:l.getEl(),title:i.description})
}}}};
if(i.toggle){var g=new Ext.menu.CheckItem(j)
}else{var g=new Ext.menu.Item(j)
}k.menu.add(g)
}else{var g=new Ext.Toolbar.Button({icon:i.icon,cls:"x-btn-text",text:i.text,itemId:i.id,tooltip:i.description,tooltipType:"title",handler:i.toggle?null:i.functionality,enableToggle:i.toggle,toggleHandler:i.toggle?i.functionality:null});
this.footer.add(g);
g.getEl().onclick=function(){this.blur()
}
}i.buttonInstance=g;
this.buttons.push(i)
}).bind(this));
this.enableButtons([]);
this.footer.calcSlices();
window.addEventListener("resize",function(g){this.footer.calcSlices()
}.bind(this),false);
window.addEventListener("onresize",function(g){this.footer.calcSlices()
}.bind(this),false)
},onSelectionChanged:function(a){if(!a.elements){this.enableButtons([])
}else{this.enableButtons(a.elements)
}},enableButtons:function(a){this.buttons.each((function(b){b.buttonInstance.enable();
if(b.minShape&&b.minShape>a.length){b.buttonInstance.disable()
}if(b.maxShape&&b.maxShape<a.length){b.buttonInstance.disable()
}if(b.isEnabled&&!b.isEnabled()){b.buttonInstance.disable()
}}).bind(this))
}});
Ext.ns("Ext.ux");
Ext.ux.SlicedToolbar=Ext.extend(Ext.Toolbar,{currentSlice:0,iconStandardWidth:22,seperatorStandardWidth:2,toolbarStandardPadding:2,initComponent:function(){Ext.apply(this,{});
Ext.ux.SlicedToolbar.superclass.initComponent.apply(this,arguments)
},onRender:function(){Ext.ux.SlicedToolbar.superclass.onRender.apply(this,arguments)
},onResize:function(){Ext.ux.SlicedToolbar.superclass.onResize.apply(this,arguments)
},calcSlices:function(){var c=0;
this.sliceMap={};
var b=0;
var a=this.getEl().getWidth();
this.items.getRange().each(function(f,d){if(f.helperItem){f.destroy();
return
}var g=f.getEl().getWidth();
if(b+g+5*this.iconStandardWidth>a){var e=this.items.indexOf(f);
this.insertSlicingButton("next",c,e);
if(c!==0){this.insertSlicingButton("prev",c,e)
}this.insertSlicingSeperator(c,e);
c+=1;
b=0
}this.sliceMap[f.id]=c;
b+=g
}.bind(this));
this.maxSlice=c;
this.setCurrentSlice(this.currentSlice)
},insertSlicedButton:function(b,c,a){this.insertButton(a,b);
this.sliceMap[b.id]=c
},insertSlicedHelperButton:function(b,c,a){b.helperItem=true;
this.insertSlicedButton(b,c,a)
},insertSlicingSeperator:function(b,a){this.insertSlicedHelperButton(new Ext.Toolbar.Fill(),b,a)
},insertSlicingButton:function(e,f,b){var d=function(){this.setCurrentSlice(this.currentSlice+1)
}.bind(this);
var a=function(){this.setCurrentSlice(this.currentSlice-1)
}.bind(this);
var c=new Ext.Toolbar.Button({cls:"x-btn-icon",icon:ORYX.BASE_FILE_PATH+"images/toolbar_"+e+".png",handler:(e==="next")?d:a});
this.insertSlicedHelperButton(c,f,b)
},setCurrentSlice:function(a){if(a>this.maxSlice||a<0){return
}this.currentSlice=a;
this.items.getRange().each(function(b){b.setVisible(a===this.sliceMap[b.id])
}.bind(this))
}});