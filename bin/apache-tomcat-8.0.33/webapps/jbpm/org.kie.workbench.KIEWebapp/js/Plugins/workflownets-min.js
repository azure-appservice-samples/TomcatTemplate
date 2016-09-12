if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Workflownets={construct:function(a){this.facade=a;
this.facade.registerOnEvent("Workflownets.Activity.serialize",this.handleSerialize.bind(this))
},handleSerialize:function(c){var b=c.shape;
var d=c.data;
var a=b.getOutgoingShapes().length;
d.push({name:"numOfOutgoings",prefix:"oryx",value:a,type:"literal"});
c.result=d
}};
ORYX.Plugins.Workflownets=Clazz.extend(ORYX.Plugins.Workflownets);