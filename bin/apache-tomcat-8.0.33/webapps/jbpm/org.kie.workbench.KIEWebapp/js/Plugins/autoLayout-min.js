if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.AutoLayout=ORYX.Plugins.AbstractPlugin.extend({facade:undefined,construct:function(a){this.facade=a;
this.returned_layout=[];
this.facade.offer({name:ORYX.I18N.EPCSupport.autoLayoutPlugin,functionality:this.automatic_layout.bind(this),group:"Alignment",icon:ORYX.BASE_FILE_PATH+"images/auto_layout.png",description:ORYX.I18N.EPCSupport.autoLayoutPlugin_desc,index:0,minShape:0,maxShape:0});
a.registerOnEvent(ORYX.CONFIG.EVENT_AUTOLAYOUT_LAYOUT,this.force_automatic_layout.bind(this))
},adjust_node:function(e){var c=e.resourceId;
if(this.returned_layout[c]){var b=this.returned_layout[c];
e.bounds.set({x:b.x,y:b.y},{x:(b.width+b.x),y:(b.height+b.y)})
}a_b=e.bounds;
var a=e.getChildNodes();
for(var d=0;
d<a.size();
d++){this.adjust_node(a[d])
}},set_new_bounds:function(){nodes=this.facade.getCanvas().getChildNodes();
for(var a=0;
a<nodes.size();
a++){this.adjust_node(nodes[a]);
nodes[a]._changed()
}this.facade.getCanvas().update()
},automatic_layout:function(){Ext.Msg.confirm(ORYX.I18N.Oryx.title,ORYX.I18N.EPCSupport.recomendationBeforeAutoLayouting,this._automatic_layout,this)
},force_automatic_layout:function(){this._automatic_layout("yes")
},_automatic_layout:function(proceed){if(proceed!="yes"){return
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_ENABLE,text:ORYX.I18N.EPCSupport.autoLayouting});
try{var serialized_rdf=this.getRDFFromDOM();
serialized_rdf='<?xml version="1.0" encoding="UTF-8"?>'+serialized_rdf;
new Ajax.Request(ORYX.CONFIG.AUTO_LAYOUTER_URL,{method:"POST",parameters:{rdf:serialized_rdf},onSuccess:function(request){this.returned_layout=eval("("+request.responseText+")");
if(!this.returned_layout.error){this.set_new_bounds()
}else{Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.EPCSupport.errorOccurredServer+":\n"+this.returned_layout.error)
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE})
}.bind(this),onFailure:function(request){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.EPCSupport.requestFailed)
}.bind(this)})
}catch(error){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
Ext.Msg.alert(ORYX.I18N.Oryx.title,ORYX.I18N.EPCSupport.failAutoLayouting,error)
}},});