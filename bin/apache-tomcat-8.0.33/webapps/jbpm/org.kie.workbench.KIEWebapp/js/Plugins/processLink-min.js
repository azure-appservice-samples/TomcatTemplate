if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ProcessLink=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPERTY_CHANGED,this.propertyChanged.bind(this))
},propertyChanged:function(a,b){if(a.name!=="oryx-refuri"||!b instanceof ORYX.Core.Node){return
}if(a.value&&a.value.length>0&&a.value!="undefined"){this.show(b,a.value)
}else{this.hide(b)
}},show:function(a,b){var c=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["a",{target:"_blank"},["path",{"stroke-width":1,stroke:"#00DD00",fill:"#00AA00",d:"M3,3 l0,-2.5 l7.5,0 l0,-2.5 l7.5,4.5 l-7.5,3.5 l0,-2.5 l-8,0","line-captions":"round"}]]);
var c=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["a",{target:"_blank"},["path",{style:"fill:#92BFFC;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.72",d:"M0 1.44 L0 15.05 L11.91 15.05 L11.91 5.98 L7.37 1.44 L0 1.44 Z"}],["path",{style:"stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.72;fill:none;",transform:"translate(7.5, -8.5)",d:"M0 10.51 L0 15.05 L4.54 15.05"}],["path",{style:"fill:#f28226;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.72",transform:"translate(-3, -1)",d:"M0 8.81 L0 13.06 L5.95 13.06 L5.95 15.05 A50.2313 50.2313 -175.57 0 0 10.77 11.08 A49.9128 49.9128 -1.28 0 0 5.95 6.54 L5.95 8.81 L0 8.81 Z"}],]);
c.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",b);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"arissupport.urlref_"+a.id,shapes:[a],node:c,nodePosition:"SE"})
},hide:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"arissupport.urlref_"+a.id})
}});