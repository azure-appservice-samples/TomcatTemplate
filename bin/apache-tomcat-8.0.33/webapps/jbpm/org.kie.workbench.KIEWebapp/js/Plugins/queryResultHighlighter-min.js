if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.QueryResultHighlighter=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,isHighlighted:false,construct:function(a){this.facade=a;
this.raisedEventIds=[];
this.raisedHighlightEventIds=[];
this.facade.offer({name:"Query result highlighter",functionality:this.buttonClick.bind(this),group:ORYX.I18N.QueryEvaluator.group,icon:ORYX.BASE_FILE_PATH+"images/xforms_export.png",description:"This plugin highlights model parts which were matched by a query.",index:1,toggle:true,minShape:0,maxShape:0});
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.highlightMatches.bind(this))
},highlightMatches:function(){var g=this.deserializeMatches();
if(!g){return
}var b=null;
var d=null;
var f=this.deserializeDescription();
if(f){f.each(function(e){if(e.match){b=e.match
}if(e.diagnosis){d=e.diagnosis
}})
}else{b="pattern";
d=""
}var c="orange";
var a="#FFFF00";
if(d==="complies"){c="green";
a="#00FF00"
}else{if(d==="violation scenario"){c="red";
a="#FF0000"
}else{c="orange";
a="#FF6600"
}}try{g.each(function(i){if(i.nodeType!=null&&i.nodeId!=null){var e=this.getShapeById(i.nodeId)
}else{if(i.edgeType!=null){var e=this.getEdgeByFromAndTo(i.from,i.to)
}else{return
}}if(!e){return
}if(e instanceof ORYX.Core.Node){e.setProperty("oryx-bgcolor",a);
e.refresh()
}}.bind(this))
}catch(h){Ext.MessageBox.alert(ORYX.I18N.Oryx.title,"Something went wrong while applying highlighting to shapes: "+h)
}this.isHighlighted=true
},raiseOverlay:function(c,b,a,d){var f="queryhighlighter."+this.raisedEventIds.length;
if(c instanceof ORYX.Core.Node){c.setProperty("oryx-bgcolor",a);
c.refresh()
}var e=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{title:d,"stroke-width":5,stroke:b,d:"M20,-5 L5,-20 M5,-5 L20,-20","line-captions":"round"}]);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:f,shapes:[c],node:e,nodePosition:c instanceof ORYX.Core.Edge?"START":"NW"});
this.raisedEventIds.push(f);
return e
},removeHighlighting:function(a,b){this.raisedEventIds.each(function(c){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:c})
}.bind(this));
this.raisedEventIds=[];
this.raisedHighlightEventIds.each(function(c){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,id:c})
}.bind(this));
this.raisedHighlightEventIds=[]
},highlightSelectedTask:function(a){if(!(a instanceof ORYX.Core.Shape)){return
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,highlightId:a.id,elements:[a],color:"#FF0000"});
this.raisedHighlightEventIds.push(task.id)
},buttonClick:function(a,b){if(this.isHighlighted){this.removeHighlighting();
this.isHighlighted=false
}else{this.highlightMatches();
this.isHighlighted=true
}if(this.isHighlighted&&!b){a.toggle()
}},deserializeMatches:function(){var f=window.location.search;
var b="matches=";
var a=f.indexOf(b)+b.length;
if(a<b.length){return null
}var i=f.indexOf("&",a);
var d=f.substring(a,(i>a?i:f.length));
try{var c=decodeURIComponent(d);
var h=Ext.decode(c)
}catch(g){Ext.MessageBox.alert(ORYX.I18N.Oryx.title,"I found highlighting information from BPMN-Q, but they could not be understood: "+g);
return null
}return h
},deserializeDescription:function(){var f=window.location.search;
var b="description=";
var a=f.indexOf(b)+b.length;
if(a<b.length){return null
}var h=f.indexOf("&",a);
var c=f.substring(a,(h>a?h:f.length));
try{var i=decodeURIComponent(c);
var d=Ext.decode(i)
}catch(g){Ext.MessageBox.alert(ORYX.I18N.Oryx.title,"I found description information from BPMN-Q, but they could not be understood: "+g);
return null
}return d
},getShapeById:function(b){var a=this.facade.getCanvas().getChildShapeByResourceId(b);
return a
},getEdgeByFromAndTo:function(d,a){d=d.replace(/^.*#/,"");
a=a.replace(/^.*#/,"");
var c=this.facade.getCanvas().getChildEdges(true);
var b=c.find(function(e){return e.incoming!=null&&e.incoming[0]!=null&&e.incoming[0].resourceId==d&&e.outgoing!=null&&e.outgoing[0]!=null&&e.outgoing[0].resourceId==a
}.bind(this));
return b
}});