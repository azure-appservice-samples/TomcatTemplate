if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Bounds={construct:function(){this._changedCallbacks=[];
this.a={};
this.b={};
this.set.apply(this,arguments);
this.suspendChange=false;
this.changedWhileSuspend=false
},_changed:function(a){if(!this.suspendChange){this._changedCallbacks.each(function(b){b(this,a)
}.bind(this));
this.changedWhileSuspend=false
}else{this.changedWhileSuspend=true
}},registerCallback:function(a){if(!this._changedCallbacks.member(a)){this._changedCallbacks.push(a)
}},unregisterCallback:function(a){this._changedCallbacks=this._changedCallbacks.without(a)
},set:function(){var e=false;
switch(arguments.length){case 1:if(this.a.x!==arguments[0].a.x){e=true;
this.a.x=arguments[0].a.x
}if(this.a.y!==arguments[0].a.y){e=true;
this.a.y=arguments[0].a.y
}if(this.b.x!==arguments[0].b.x){e=true;
this.b.x=arguments[0].b.x
}if(this.b.y!==arguments[0].b.y){e=true;
this.b.y=arguments[0].b.y
}break;
case 2:var b=Math.min(arguments[0].x,arguments[1].x);
var a=Math.min(arguments[0].y,arguments[1].y);
var d=Math.max(arguments[0].x,arguments[1].x);
var c=Math.max(arguments[0].y,arguments[1].y);
if(this.a.x!==b){e=true;
this.a.x=b
}if(this.a.y!==a){e=true;
this.a.y=a
}if(this.b.x!==d){e=true;
this.b.x=d
}if(this.b.y!==c){e=true;
this.b.y=c
}break;
case 4:var b=Math.min(arguments[0],arguments[2]);
var a=Math.min(arguments[1],arguments[3]);
var d=Math.max(arguments[0],arguments[2]);
var c=Math.max(arguments[1],arguments[3]);
if(this.a.x!==b){e=true;
this.a.x=b
}if(this.a.y!==a){e=true;
this.a.y=a
}if(this.b.x!==d){e=true;
this.b.x=d
}if(this.b.y!==c){e=true;
this.b.y=c
}break
}if(e){this._changed(true)
}},moveTo:function(){var a=this.upperLeft();
switch(arguments.length){case 1:this.moveBy({x:arguments[0].x-a.x,y:arguments[0].y-a.y});
break;
case 2:this.moveBy({x:arguments[0]-a.x,y:arguments[1]-a.y});
break;
default:}},moveBy:function(){var c=false;
switch(arguments.length){case 1:var b=arguments[0];
if(b.x!==0||b.y!==0){c=true;
this.a.x+=b.x;
this.b.x+=b.x;
this.a.y+=b.y;
this.b.y+=b.y
}break;
case 2:var a=arguments[0];
var d=arguments[1];
if(a!==0||d!==0){c=true;
this.a.x+=a;
this.b.x+=a;
this.a.y+=d;
this.b.y+=d
}break;
default:}if(c){this._changed()
}},include:function(c){if((this.a.x===undefined)&&(this.a.y===undefined)&&(this.b.x===undefined)&&(this.b.y===undefined)){return c
}var a=Math.min(this.a.x,c.a.x);
var f=Math.min(this.a.y,c.a.y);
var e=Math.max(this.b.x,c.b.x);
var d=Math.max(this.b.y,c.b.y);
this.set(a,f,e,d)
},extend:function(a){if(a.x!==0||a.y!==0){this.b.x+=a.x;
this.b.y+=a.y;
this._changed(true)
}},widen:function(a){if(a!==0){this.suspendChange=true;
this.moveBy({x:-a,y:-a});
this.extend({x:2*a,y:2*a});
this.suspendChange=false;
if(this.changedWhileSuspend){this._changed(true)
}}},upperLeft:function(){return{x:this.a.x,y:this.a.y}
},lowerRight:function(){return{x:this.b.x,y:this.b.y}
},width:function(){return this.b.x-this.a.x
},height:function(){return this.b.y-this.a.y
},center:function(){return{x:(this.a.x+this.b.x)/2,y:(this.a.y+this.b.y)/2}
},midPoint:function(){return{x:(this.b.x-this.a.x)/2,y:(this.b.y-this.a.y)/2}
},centerMoveTo:function(){var a=this.center();
switch(arguments.length){case 1:this.moveBy(arguments[0].x-a.x,arguments[0].y-a.y);
break;
case 2:this.moveBy(arguments[0]-a.x,arguments[1]-a.y);
break
}},isIncluded:function(a,e){var f,d,e;
switch(arguments.length){case 1:f=arguments[0].x;
d=arguments[0].y;
e=0;
break;
case 2:if(arguments[0].x&&arguments[0].y){f=arguments[0].x;
d=arguments[0].y;
e=Math.abs(arguments[1])
}else{f=arguments[0];
d=arguments[1];
e=0
}break;
case 3:f=arguments[0];
d=arguments[1];
e=Math.abs(arguments[2]);
break;
default:throw"isIncluded needs one, two or three arguments"
}var c=this.upperLeft();
var b=this.lowerRight();
if(f>=c.x-e&&f<=b.x+e&&d>=c.y-e&&d<=b.y+e){return true
}else{return false
}},clone:function(){return new ORYX.Core.Bounds(this)
},toString:function(){return"( "+this.a.x+" | "+this.a.y+" )/( "+this.b.x+" | "+this.b.y+" )"
},serializeForERDF:function(){return this.a.x+","+this.a.y+","+this.b.x+","+this.b.y
}};
ORYX.Core.Bounds=Clazz.extend(ORYX.Core.Bounds);