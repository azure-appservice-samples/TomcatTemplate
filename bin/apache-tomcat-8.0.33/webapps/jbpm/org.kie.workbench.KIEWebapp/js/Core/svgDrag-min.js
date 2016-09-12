if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.UIEnableDrag=function(e,d,c){this.uiObj=d;
var f=d.bounds.upperLeft();
var b=d.node.getScreenCTM();
this.faktorXY={x:b.a,y:b.d};
this.scrollNode=d.node.ownerSVGElement.parentNode.parentNode;
this.offSetPosition={x:Event.pointerX(e)-(f.x*this.faktorXY.x),y:Event.pointerY(e)-(f.y*this.faktorXY.y)};
this.offsetScroll={x:this.scrollNode.scrollLeft,y:this.scrollNode.scrollTop};
this.dragCallback=ORYX.Core.UIDragCallback.bind(this);
this.disableCallback=ORYX.Core.UIDisableDrag.bind(this);
this.movedCallback=c?c.movedCallback:undefined;
this.upCallback=c?c.upCallback:undefined;
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.disableCallback,true);
document.documentElement.addEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.dragCallback,false)
};
ORYX.Core.UIDragCallback=function(b){var a={x:Event.pointerX(b)-this.offSetPosition.x,y:Event.pointerY(b)-this.offSetPosition.y};
a.x-=this.offsetScroll.x-this.scrollNode.scrollLeft;
a.y-=this.offsetScroll.y-this.scrollNode.scrollTop;
a.x/=this.faktorXY.x;
a.y/=this.faktorXY.y;
this.uiObj.bounds.moveTo(a);
if(this.movedCallback){this.movedCallback(b)
}Event.stop(b)
};
ORYX.Core.UIDisableDrag=function(a){document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEMOVE,this.dragCallback,false);
document.documentElement.removeEventListener(ORYX.CONFIG.EVENT_MOUSEUP,this.disableCallback,true);
if(this.upCallback){this.upCallback(a)
}this.upCallback=undefined;
this.movedCallback=undefined;
Event.stop(a)
};