if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ResourcesBoDShow=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.raisedOverlayEventIds=[];
this.raisedHighlightEventIds=[];
this.facade.offer({name:ORYX.I18N.ResourcesBoDShow.name,functionality:this.showBoD.bind(this),group:ORYX.I18N.ResourcesBoDShow.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bod.png",icon:ORYX.BASE_FILE_PATH+"images/bod_view.png",description:ORYX.I18N.ResourcesBoDShow.desc,index:4,toggle:true,minShape:1,maxShape:1})
},showBoD:function(){this.removeHighlightsAndOverlays();
var a=this.facade.getSelection();
if(a[0].properties["oryx-activitytype"]=="Task"){this.highlightSelectedTask(a[0]);
this.prepareOverlays(a[0])
}else{alert("Please select a task to show the related Binding of Duties constraints.")
}},highlightSelectedTask:function(a){if(!(a instanceof ORYX.Core.Shape)){return
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:a.properties["oryx-id"],elements:[a],color:"#28BB25"});
this.raisedHighlightEventIds.push(a.id)
},showOverlaysForSeparations:function(c,g){if(!(c instanceof ORYX.Core.Shape)){return
}var h={fill:"#28BB25",stroke:"white","stroke-width":1};
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:c.properties["oryx-id"],shapes:[c],attributes:h});
var d=0;
var b;
var j;
var i;
var f;
var e;
for(index=0;
index<this.raisedOverlayEventIds.length;
index++){if(c.properties["oryx-id"]==this.raisedOverlayEventIds[index]){d++
}}switch(d){case 0:b="NW";
j=9;
i=17;
f=13;
e=13;
break;
case 1:b="NE";
j=-17;
i=17;
f=-13;
e=13;
break;
case 2:b="SW";
j=9;
i=-9;
f=13;
e=-13;
break;
case 3:b="SE";
j=-17;
i=-9;
f=-13;
e=-13;
break;
case 4:b="N";
j=-4;
i=17;
f=0;
e=13;
break;
case 5:b="S";
j=-4;
i=-9;
f=0;
e=-13;
break;
case 6:b="W";
j=9;
i=4;
f=13;
e=0;
break;
case 7:b="E";
j=-17;
i=4;
f=-13;
e=0;
break;
case 8:alert("There exist more Binding of Duties constraints for task "+c.properties["oryx-id"]+", but they will not be illustrated by a number in that task's rectangle.");
break;
default:break
}if(g>=10){j=j-4
}if(d<8){var a=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["circle",{cx:f,cy:e,r:"10",stroke:"white",fill:"white","stroke-width":"2"}]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:c.properties["oryx-id"],shapes:[c],node:a,nodePosition:b});
var k=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{x:j,y:i,style:"font-size: 12px;"},g]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:c.properties["oryx-id"],shapes:[c],node:k,nodePosition:b})
}this.raisedOverlayEventIds.push(c.properties["oryx-id"])
},prepareOverlays:function(c){if(c.properties["oryx-bindingsofduties"]!=""){var e=c.properties["oryx-bindingsofduties"].evalJSON();
var b=e.items.toArray();
var a;
for(var d=0;
d<b.length;
d++){var f=b[d].BoundTasks;
while(f.indexOf(";")>-1){a=this.getTaskById(f.substring(0,f.indexOf(";")));
f=f.substring((f.indexOf(";"))+2);
this.showOverlaysForSeparations(a,d+1)
}a=this.getTaskById(f);
this.showOverlaysForSeparations(a,d+1)
}}else{alert("No Binding of Duties Constraints are defined for this task")
}},removeHighlightsAndOverlays:function(){var d=this.facade.getCanvas().getChildShapes(true);
var c=[];
var b=0;
for(var a=0;
a<d.length;
a++){if(d[a].properties["oryx-activitytype"]=="Task"){c[b]=d[a].properties["oryx-id"];
b++
}}c.each(function(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,highlightId:e})
}.bind(this));
this.raisedHighlightEventIds=[];
c.each(function(e){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:e})
}.bind(this));
this.raisedOverlayEventIds=[]
},getTaskById:function(d){var a=this.facade.getCanvas().getChildShapes(true);
var b;
for(var c=0;
c<a.length;
c++){if(a[c].properties["oryx-activitytype"]=="Task"){if(a[c].properties["oryx-id"]==d){b=a[c];
break
}}}return b
}});