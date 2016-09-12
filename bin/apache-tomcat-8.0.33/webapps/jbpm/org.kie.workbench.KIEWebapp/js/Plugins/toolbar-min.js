if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Toolbar=Clazz.extend({facade:undefined,plugs:[],construct:function(b,a){this.facade=b;
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
}},registryChanged:function(e){var i=e.sortBy((function(j){return((this.groupIndex[j.group]!=undefined?this.groupIndex[j.group]:"")+j.group+""+j.index).toLowerCase()
}).bind(this));
var f=$A(i).findAll(function(j){if(j.group&&j.group.indexOf("footer")===0){return false
}return !this.plugs.include(j)
}.bind(this));
if(f.length<1){return
}this.buttons=[];
ORYX.Log.trace("Creating a toolbar.");
if(!this.toolbar){this.toolbar=new Ext.ux.SlicedToolbar({height:24});
var g=this.facade.addToRegion("north",this.toolbar,"Toolbar")
}var c=this.plugs.last()?this.plugs.last().group:f[0].group;
var a={};
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){if(("webkitSpeech" in document.createElement("input"))){var d=new Ext.form.TextField({id:"micinput"});
this.toolbar.add(d);
this.toolbar.add("-");
var b={"x-webkit-speech":"true"};
Ext.get("micinput").set(b);
var h=document.getElementById("micinput");
h.onfocus=h.blur;
h.onwebkitspeechchange=function(j){var k=h.value;
ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_VOICE_COMMAND,entry:k});
h.blur;
h.value=""
}
}}f.each((function(l){if(!l.name){return
}this.plugs.push(l);
if(c!=l.group){this.toolbar.add("-");
c=l.group;
a={}
}var k=l.functionality;
l.functionality=function(){if("undefined"!=typeof(pageTracker)&&"function"==typeof(pageTracker._trackEvent)){pageTracker._trackEvent("ToolbarButton",l.name)
}return k.apply(this,arguments)
};
if(l.dropDownGroupIcon){var n=a[l.dropDownGroupIcon];
if(n===undefined){n=a[l.dropDownGroupIcon]=new Ext.Toolbar.SplitButton({iconCls:window.SpriteUtils.toUniqueId(l.dropDownGroupIcon),menu:new Ext.menu.Menu({items:[]}),listeners:{click:function(o,p){if(!o.menu.isVisible()&&!o.ignoreNextClick){o.showMenu()
}else{o.hideMenu()
}}}});
this.toolbar.add(n)
}var m={iconCls:window.SpriteUtils.toUniqueId(l.icon),text:l.name,itemId:l.id,handler:l.toggle?undefined:l.functionality,checkHandler:l.toggle?l.functionality:undefined,listeners:{render:function(o){if(l.description){new Ext.ToolTip({target:o.getEl(),title:l.description})
}}}};
if(l.toggle){var j=new Ext.menu.CheckItem(m)
}else{var j=new Ext.menu.Item(m)
}n.menu.add(j)
}else{var j=new Ext.Toolbar.Button({iconCls:window.SpriteUtils.toUniqueId(l.icon),itemId:l.id,tooltip:l.description,tooltipType:"title",handler:l.toggle?null:l.functionality,enableToggle:l.toggle,toggleHandler:l.toggle?l.functionality:null});
this.toolbar.add(j);
j.getEl().onclick=function(){this.blur()
}
}l.buttonInstance=j;
this.buttons.push(l)
}).bind(this));
this.enableButtons([]);
this.toolbar.calcSlices();
window.addEventListener("resize",function(j){this.toolbar.calcSlices()
}.bind(this),false);
window.addEventListener("onresize",function(j){this.toolbar.calcSlices()
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
},calcSlices:function(){var g=0;
this.sliceMap={};
var f=0;
var b=this.getEl().getWidth();
var c=false;
var a=false;
var e=-1;
this.items.getRange().each(function(i,h){if(i.helperItem){i.destroy();
return
}var j=i.getEl().getWidth();
if(f+j+5*this.iconStandardWidth>b){e=this.items.indexOf(i);
this.insertSlicingButton("next",g,e);
a=true;
if(g!==0){this.insertSlicingButton("prev",g,e);
c=true
}this.insertSlicingSeperator(g,e);
g+=1;
f=0
}this.sliceMap[i.id]=g;
f+=j
}.bind(this));
if(!c){this.insertSlicingButton("prev",g,e)
}if(!a){if(c){this.insertSlicingButton("next",g,e+1)
}else{this.insertSlicingButton("next",g,e)
}}if(g>0){this.insertSlicingSeperator(g,-1);
this.insertSlicingButton("prev",g,-1);
var d=new Ext.Toolbar.Spacer();
this.insertSlicedHelperButton(d,g,-1);
Ext.get(d.id).setWidth(this.iconStandardWidth)
}this.maxSlice=g;
this.setCurrentSlice(this.currentSlice)
},insertSlicedButton:function(b,c,a){if(a==-1){this.addButton(b)
}else{this.insertButton(a,b)
}this.sliceMap[b.id]=c
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