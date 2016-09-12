if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.LockNode=Clazz.extend({construct:function(a){this.facade=a;
if(!(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)){this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.checkLocksOnLoad.bind(this));
this.facade.offer({name:ORYX.I18N.lockNode.lock,functionality:this.locknodes.bind(this),group:"lockunlockgroup",icon:ORYX.BASE_FILE_PATH+"images/lock.png",description:ORYX.I18N.lockNode.lock_desc,index:1,minShape:1,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.facade.offer({name:ORYX.I18N.lockNode.unlock,functionality:this.unlocknodes.bind(this),group:"lockunlockgroup",icon:ORYX.BASE_FILE_PATH+"images/unlock.png",description:ORYX.I18N.lockNode.unlock_desc,index:2,minShape:1,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)})
}},checkLocksOnLoad:function(){ORYX.EDITOR._canvas.getChildren().each((function(a){this.applyLockingToChild(a)
}).bind(this))
},applyLockingToChild:function(b){if(b&&(b instanceof ORYX.Core.Node||b instanceof ORYX.Core.Edge)&&b.properties["oryx-isselectable"]=="false"){b.setSelectable(false);
b.setMovable(false);
if(b instanceof ORYX.Core.Edge){b.dockers.each((function(c){c.setMovable(false);
c.update()
}))
}b.refresh()
}if(b&&b.getChildren().size()>0){for(var a=0;
a<b.getChildren().size();
a++){this.applyLockingToChild(b.getChildren()[a])
}}},locknodes:function(){var a=this.facade.getSelection();
a.each(function(b){this.lockShape(b)
}.bind(this));
this.facade.setSelection([])
},unlocknodes:function(){var a=this.facade.getSelection();
a.each(function(b){this.unlockShape(b)
}.bind(this));
this.facade.setSelection([])
},unlockShape:function(a){if(a){a.setSelectable(true);
a.setMovable(true);
if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor",a.properties["oryx-origbordercolor"]);
a.setProperty("oryx-bgcolor",a.properties["oryx-origbgcolor"])
}a.setProperty("oryx-isselectable","true");
if(a instanceof ORYX.Core.Edge){a.dockers.each((function(c){c.setMovable(true);
c.update()
}))
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.unlockShape(a.getChildren()[b])
}}}}},lockShape:function(a){if(a){a.setSelectable(false);
a.setMovable(false);
if(a instanceof ORYX.Core.Node||a instanceof ORYX.Core.Edge){a.setProperty("oryx-bordercolor","#888888");
a.setProperty("oryx-bgcolor","#CCEEFF")
}a.setProperty("oryx-isselectable","false");
if(a instanceof ORYX.Core.Edge){a.dockers.each((function(c){c.setMovable(false);
c.update()
}))
}a.refresh();
if(a.getChildren().size()>0){for(var b=0;
b<a.getChildren().size();
b++){if(a.getChildren()[b] instanceof ORYX.Core.Node||a.getChildren()[b] instanceof ORYX.Core.Edge){this.lockShape(a.getChildren()[b])
}}}}}});