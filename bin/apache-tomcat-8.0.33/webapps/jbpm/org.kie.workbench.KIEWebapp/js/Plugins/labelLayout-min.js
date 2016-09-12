if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.LabelLayout=Clazz.extend({construct:function(a){this.facade=a;
this.myLabel=undefined;
this.labelSelected=false;
this.labelLength=undefined;
this.rotationPointCoordinates={x:0,y:0};
this.mouseCoordinates={x:0,y:0};
this.labelCoordinates={x:0,y:0};
this.myEdge=undefined;
this.rotate=false;
this.State=0;
this.prevState=0;
this.canvasLabel=undefined;
this.canvas=false;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN,this.handleMouseDown.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEOVER,this.handleMouseOver.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEMOVE,this.handleMouseMove.bind(this));
this.rotationPoint=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{"stroke-width":2,stroke:"black",d:"M4,4 L0,6 M0,6 L-4,4 M-4,4 L-6,0 M-6,0 L-4,-4 M-4,-4 L0,-6 M0,-6 L4,-4 M4,-4 L6,2 M6,2 L2,0 M6,2 L8,0","line-captions":"round"}]);
this.line=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{"stroke-width":1,stroke:"silver",fill:"none","pointer-events":"none"}]);
this.startMovingCross=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{"stroke-width":1,stroke:"black",d:"M0,0 L-10,0 M-10,0 L-6,-4 M-10,0 L-6,4 M0,0 L10,0 M10,0 L6,4 M10,0 L6,-4 M0,0 L0,10 M0,10 L4,6 M0,10 L-4,6 M0,0 L0,-10 M0,-10 L4,-6 M0,-10 L-4,-6","line-captions":"round"}]);
this.endMovingCross=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{"stroke-width":1,stroke:"black",d:"M-2,0 L-10,0 M2,0 L10,0 M0,2 L0,10 M0,-2 L0,-10 M-2,0 L-6,4 M-2,0 L-6,-4 M2,0 L6,4 M2,0 L6,-4 M0,-2 L4,-6 M0,-2 L-4,-6 M0,2 L4,6 M0,2 L-4,6","line-captions":"round"}]);
this.moveLeftRight=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["path",{"stroke-width":2,stroke:"black",d:"M0,0 L-15,0 M-15,0 L-11,-4 M-15,0 L-11,4 M0,0 L15,0 M15,0 L11,4 M15,0 L11,-4","line-captions":"round"}])
},handleMouseOver:function(b,a){if(this.canvas==false){if(a instanceof ORYX.Core.Canvas){this.canvasLabel=a;
canvas=true
}}},handleMouseDown:function(d,c){if(this.myLabel&&this.myLabel._text!=""){var b=this.facade.eventCoordinates(d).x;
var a=this.facade.eventCoordinates(d).y;
this.calculateLabelCoordinates();
this.calculateRotationPointCoordinates();
if(this.labelSelected==true){if(this.myLabel._rotate==270||this.myLabel._rotate==315||this.myLabel._rotate==360||this.myLabel._rotate==45){this.myLabel.x=this.facade.eventCoordinates(d).x+5;
this.myLabel.y=this.facade.eventCoordinates(d).y-5
}else{if(this.myLabel._rotate==90||this.myLabel._rotate==135||this.myLabel._rotate==180||this.myLabel._rotate==225){this.myLabel.x=this.facade.eventCoordinates(d).x-5;
this.myLabel.y=this.facade.eventCoordinates(d).y+5
}else{this.myLabel.x=this.facade.eventCoordinates(d).x+10;
this.myLabel.y=this.facade.eventCoordinates(d).y-5
}}if(this.myLabel._rotationPoint){this.myLabel._rotationPoint.x=b;
this.myLabel._rotationPoint.y=a
}this.myLabel.edgePosition="freeMoved";
this.myLabel.update();
this.calculateLabelCoordinates();
this.calculateRotationPointCoordinates();
this.showOverlay("RotationPoint",this.myEdge,this.rotationPointCoordinates,this.rotationPoint);
this.hideOverlay("SettingArrows");
this.mouseCoordinates={x:this.labelCoordinates.x,y:this.labelCoordinates.y};
this.showOverlay("MovingArrows",this.myEdge,this.mouseCoordinates,this.startMovingCross);
this.showLine()
}else{this.hideLine();
this.hideOverlay("RotationPoint");
this.hideOverlay("MovingArrows");
this.hideOverlay("SettingArrows")
}if(this.labelSelected==false&&b>=this.labelCoordinates.x-20&&b<=this.labelCoordinates.x+20&&a<=this.labelCoordinates.y+20&&a>=this.labelCoordinates.y-20){this.labelSelected=true;
this.calculateRotationPointCoordinates();
this.showOverlay("RotationPoint",this.myEdge,this.rotationPointCoordinates,this.rotationPoint)
}else{this.labelSelected=false
}if(this.rotate==false&&b>=this.rotationPointCoordinates.x-20&&b<=this.rotationPointCoordinates.x+20&&a>=this.rotationPointCoordinates.y-20&&a<=this.rotationPointCoordinates.y+20){this.rotate=true;
this.State=0;
this.showOverlay("RotationPointActive",this.myEdge,this.rotationPointCoordinates,this.moveLeftRight)
}else{this.rotate=false;
this.hideOverlay("RotationPointActive")
}}if(c instanceof ORYX.Core.Edge){if(c._labels[c.id+"condition"]){this.myLabel=c._labels[c.id+"condition"]
}else{if(c._labels[c.id+"name"]){this.myLabel=c._labels[c.id+"name"]
}else{this.myLabel=c._labels[c.id+"text"]
}}this.myEdge=c;
if(this.myLabel&&this.myLabel._text!=""){this.calculateLabelCoordinates();
this.calculateRotationPointCoordinates();
this.showLine();
this.mouseCoordinates={x:this.labelCoordinates.x,y:this.labelCoordinates.y};
this.showOverlay("MovingArrows",this.myEdge,this.mouseCoordinates,this.startMovingCross);
this.showOverlay("RotationPoint",this.myEdge,this.rotationPointCoordinates,this.rotationPoint)
}}},handleMouseMove:function(d,c){if(this.labelSelected==true){if(this.myLabel){if(this.myLabel._rotate==270||this.myLabel._rotate==315||this.myLabel._rotate==360||this.myLabel._rotate==45){this.myLabel.x=this.facade.eventCoordinates(d).x+5;
this.myLabel.y=this.facade.eventCoordinates(d).y-5;
this.myLabel._rotationPoint.x=this.facade.eventCoordinates(d).x+10;
this.myLabel._rotationPoint.y=this.facade.eventCoordinates(d).y-10
}else{if(this.myLabel._rotate==90||this.myLabel._rotate==135||this.myLabel._rotate==180||this.myLabel._rotate==225){this.myLabel.x=this.facade.eventCoordinates(d).x-5;
this.myLabel.y=this.facade.eventCoordinates(d).y+5;
this.myLabel._rotationPoint.x=this.facade.eventCoordinates(d).x-10;
this.myLabel._rotationPoint.y=this.facade.eventCoordinates(d).y+10
}else{this.myLabel.x=this.facade.eventCoordinates(d).x+10;
this.myLabel.y=this.facade.eventCoordinates(d).y-5;
this.myLabel._rotationPoint.x=this.facade.eventCoordinates(d).x+10;
this.myLabel._rotationPoint.y=this.facade.eventCoordinates(d).y-10
}}this.myLabel.update();
this.calculateLabelCoordinates();
this.calculateRotationPointCoordinates();
this.hideOverlay("RotationPoint");
this.hideOverlay("MovingArrows");
this.hideOverlay("SettingArrows");
if(this.myLabel._rotate==270||this.myLabel._rotate==315||this.myLabel._rotate==360||this.myLabel._rotate==45){this.mouseCoordinates={x:this.facade.eventCoordinates(d).x,y:this.facade.eventCoordinates(d).y};
this.showOverlay("SettingArrows",this.myEdge,this.mouseCoordinates,this.endMovingCross)
}else{this.mouseCoordinates={x:this.facade.eventCoordinates(d).x,y:this.facade.eventCoordinates(d).y};
this.showOverlay("SettingArrows",this.myEdge,this.mouseCoordinates,this.endMovingCross)
}this.hideLine();
this.showLine()
}}if(this.rotate==true){var b=this.facade.eventCoordinates(d).x;
var a=this.facade.eventCoordinates(d).y;
this.calculateLabelCoordinates();
this.calculateRotationPointCoordinates();
if(b<this.rotationPointCoordinates.x-150){this.State=-8
}else{if(b<this.rotationPointCoordinates.x-130&&b>=this.rotationPointCoordinates.x-150){this.State=-7
}else{if(b<this.rotationPointCoordinates.x-110&&b>=this.rotationPointCoordinates.x-130){this.State=-6
}else{if(b<this.rotationPointCoordinates.x-90&&b>=this.rotationPointCoordinates.x-110){this.State=-5
}else{if(b<this.rotationPointCoordinates.x-70&&b>=this.rotationPointCoordinates.x-90){this.State=-4
}else{if(b<this.rotationPointCoordinates.x-50&&b>=this.rotationPointCoordinates.x-70){this.State=-3
}else{if(b<this.rotationPointCoordinates.x-30&&b>=this.rotationPointCoordinates.x-50){this.State=-2
}else{if(b<this.rotationPointCoordinates.x-10&&b>=this.rotationPointCoordinates.x-30){this.State=-1
}else{if(b<this.rotationPointCoordinates.x+10&&b>=this.rotationPointCoordinates.x-10){this.State=0
}else{if(b<this.rotationPointCoordinates.x+30&&b>=this.rotationPointCoordinates.x+10){this.State=1
}else{if(b<this.rotationPointCoordinates.x+50&&b>=this.rotationPointCoordinates.x+30){this.State=2
}else{if(b<this.rotationPointCoordinates.x+70&&b>=this.rotationPointCoordinates.x+50){this.State=3
}else{if(b<this.rotationPointCoordinates.x+90&&b>=this.rotationPointCoordinates.x+70){this.State=4
}else{if(b<this.rotationPointCoordinates.x+110&&b>=this.rotationPointCoordinates.x+90){this.State=5
}else{if(b<this.rotationPointCoordinates.x+130&&b>=this.rotationPointCoordinates.x+110){this.State=6
}else{if(b<this.rotationPointCoordinates.x+150&&b>=this.rotationPointCoordinates.x+130){this.State7
}else{if(b>=this.rotationPointCoordinates.x+150){this.State=8
}}}}}}}}}}}}}}}}}if(this.State>this.prevState){this.rotate_right();
this.prevState=this.State
}else{if(this.State<this.prevState){this.rotate_left();
this.prevState=this.State
}}}},rotate_right:function(){var b={x:this.labelCoordinates.x,y:this.labelCoordinates.y};
var a=this.myLabel._rotate;
if(a==0||a<45&&a>0||a==360){this.myLabel.rotate(45,b)
}else{if(a==45||a<90&&a>45){this.myLabel.rotate(90,b)
}else{if(a==315||a>315&&a<360){this.myLabel.rotate(360,b)
}else{if(a==270||a>270&&a<315){this.myLabel.rotate(315,b)
}else{if(a==90||a<135&&a>90){this.myLabel.rotate(135,b)
}else{if(a==135||a<180&&a>135){this.myLabel.rotate(180,b)
}else{if(a==180||a<225&&a>180){this.myLabel.rotate(225,b)
}else{if(a==225||a<270&&a>225){this.myLabel.rotate(270,b)
}}}}}}}}this.myLabel.update()
},rotate_left:function(){var b={x:this.labelCoordinates.x,y:this.labelCoordinates.y};
var a=this.myLabel._rotate;
if(a==0||a<360&&a>315||a==360){this.myLabel.rotate(315,b)
}else{if(a==315||a<315&&a>270){this.myLabel.rotate(270,b)
}else{if(a==45||a<45&&a>0){this.myLabel.rotate(360,b)
}else{if(a==90||a<90&&a>45){this.myLabel.rotate(45,b)
}else{if(a==135||a<135&&a>90){this.myLabel.rotate(90,b)
}else{if(a==180||a<180&&a>135){this.myLabel.rotate(135,b)
}else{if(a==225||a<225&&a>180){this.myLabel.rotate(180,b)
}else{if(a==270||a<270&&a>225){this.myLabel.rotate(225,b)
}}}}}}}}this.myLabel.update()
},calculateRotationPointCoordinates:function(){if(this.rotate==false){this.labelLength=this.myLabel._estimateTextWidth(this.myLabel._text,14);
if(this.myLabel._rotate==360){this.rotationPointCoordinates.x=this.labelCoordinates.x-8+this.labelLength/3;
this.rotationPointCoordinates.y=this.labelCoordinates.y-35
}else{if(this.myLabel._rotate==90){this.rotationPointCoordinates.x=this.labelCoordinates.x+35;
this.rotationPointCoordinates.y=this.labelCoordinates.y-8+this.labelLength/3
}else{if(this.myLabel._rotate==180){this.rotationPointCoordinates.x=this.labelCoordinates.x-this.labelLength/2;
this.rotationPointCoordinates.y=this.labelCoordinates.y+35
}else{if(this.myLabel._rotate==270){this.rotationPointCoordinates.x=this.labelCoordinates.x-35;
this.rotationPointCoordinates.y=this.labelCoordinates.y+8-this.labelLength/2
}else{if(this.myLabel._rotate==45){this.rotationPointCoordinates.x=this.labelCoordinates.x+40;
this.rotationPointCoordinates.y=this.labelCoordinates.y
}else{if(this.myLabel._rotate==135){this.rotationPointCoordinates.x=this.labelCoordinates.x;
this.rotationPointCoordinates.y=this.labelCoordinates.y+40
}else{if(this.myLabel._rotate==225){this.rotationPointCoordinates.x=this.labelCoordinates.x-40;
this.rotationPointCoordinates.y=this.labelCoordinates.y
}else{if(this.myLabel._rotate==315){this.rotationPointCoordinates.x=this.labelCoordinates.x;
this.rotationPointCoordinates.y=this.labelCoordinates.y-40
}else{this.rotationPointCoordinates.x=this.labelCoordinates.x-8+this.labelLength/3;
this.rotationPointCoordinates.y=this.labelCoordinates.y-35
}}}}}}}}}},calculateLabelCoordinates:function(){this.labelCoordinates.x=this.myLabel.x;
this.labelCoordinates.y=this.myLabel.y
},showOverlay:function(d,b,a,c){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:d,shapes:[b],node:c,labelPoint:a,dontCloneNode:true})
},hideOverlay:function(a){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:a})
},showLine:function(){var a=this.myEdge.dockers[0].bounds.b.x-8;
var b=this.myEdge.dockers[0].bounds.b.y-8;
this.line.setAttributeNS(null,"d","M"+a+" "+b+" L "+this.labelCoordinates.x+" "+this.labelCoordinates.y);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"line",shapes:[this.canvasLabel],node:this.line,position:"northeast",dontCloneNode:true})
},hideLine:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:"line"})
}});