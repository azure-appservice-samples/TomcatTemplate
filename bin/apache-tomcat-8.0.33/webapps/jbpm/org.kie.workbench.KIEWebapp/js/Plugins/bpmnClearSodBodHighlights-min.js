if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ClearSodBodHighlights=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.ClearSodBodHighlights.name,functionality:this.removeHighlightsAndOverlays.bind(this),group:ORYX.I18N.ClearSodBodHighlights.group,icon:ORYX.BASE_FILE_PATH+"images/sod_bod_view_clear.png",description:ORYX.I18N.ClearSodBodHighlights.desc,index:5,toggle:false,minShape:0,maxShape:0})
},removeHighlightsAndOverlays:function(){var d=this.facade.getCanvas().getChildShapes(true);
var c=[];
var b=0;
for(var a=0;
a<d.length;
a++){if(d[a].properties["oryx-activitytype"]=="Task"){if(d[a].properties["oryx-id"]!=""){c[b]=d[a].properties["oryx-id"];
b++
}}}c.each(function(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:e})
}.bind(this));
c.each(function(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:e})
}.bind(this))
}});