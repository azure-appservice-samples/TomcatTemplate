if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.TaskPropertiesUpdater=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.handlePropertyChanged.bind(this))
},handlePropertyChanged:function(b){if(b.key=="oryx-tasktype"){var a=b.elements[0];
if(a){this.facade.getCanvas().update()
}}}});