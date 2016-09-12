if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.PetriNet={construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.handlePropertyChanged.bind(this))
},handlePropertyChanged:function(c){var b=c.elements;
var d=c.key;
var a=c.value;
var e=false;
b.each(function(f){if((f.getStencil().id()==="http://b3mn.org/stencilset/petrinet#Place")&&(d==="oryx-numberoftokens")){if(a==0){f.setProperty("oryx-numberoftokens_text","");
f.setProperty("oryx-numberoftokens_drawing","0")
}else{if(a==1){f.setProperty("oryx-numberoftokens_text","");
f.setProperty("oryx-numberoftokens_drawing","1")
}else{if(a==2){f.setProperty("oryx-numberoftokens_text","");
f.setProperty("oryx-numberoftokens_drawing","2")
}else{if(a==3){f.setProperty("oryx-numberoftokens_text","");
f.setProperty("oryx-numberoftokens_drawing","3")
}else{if(a==4){f.setProperty("oryx-numberoftokens_text","");
f.setProperty("oryx-numberoftokens_drawing","4")
}else{var g=parseInt(a,10);
if(g&&g>0){f.setProperty("oryx-numberoftokens_text",""+g);
f.setProperty("oryx-numberoftokens_drawing","0")
}else{f.setProperty("oryx-numberoftokens_text","");
f.setProperty("oryx-numberoftokens_drawing","0")
}}}}}}e=true
}});
if(e){this.facade.getCanvas().update()
}}};
ORYX.Plugins.PetriNet=ORYX.Plugins.AbstractPlugin.extend(ORYX.Plugins.PetriNet);