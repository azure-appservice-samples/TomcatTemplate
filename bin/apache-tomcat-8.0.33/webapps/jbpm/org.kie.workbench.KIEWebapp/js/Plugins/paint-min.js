if(!ORYX){var ORYX={}
}if(!ORYX.Core){ORYX.Core={}
}ORYX.Core.Commands={};
ORYX.Core.AbstractCommand=Clazz.extend({construct:function construct(a,b){this.metadata={};
this.metadata.id=ORYX.Editor.provideId();
this.metadata.name=this.getCommandName();
this.metadata.createdAt=new Date().getTime();
this.metadata.local=true;
this.metadata.putOnStack=true;
this.facade=a;
if(!b){this.execute=function c(d){d();
this.getAffectedShapes().each(function e(f){if(typeof f.metadata==="undefined"){return
}f.metadata.changedAt.push(this.getCreatedAt());
f.metadata.changedBy.push(this.getCreatorId());
f.metadata.commands.push(this.getDisplayName());
f.metadata.isLocal=this.isLocal();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_METADATA_CHANGED,shape:f})
}.bind(this))
}.bind(this,this.execute.bind(this));
this.rollback=function c(e){e();
this.getAffectedShapes().each(function d(f){if(typeof f.metadata==="undefined"){return
}f.metadata.changedAt.pop();
f.metadata.changedBy.pop();
f.metadata.commands.pop();
f.metadata.isLocal=this.isLocal();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_SHAPE_METADATA_CHANGED,shape:f})
}.bind(this))
}.bind(this,this.rollback.bind(this))
}},getCommandId:function getCommandId(){return this.metadata.id
},getCreatorId:function getCreatorId(){return this.metadata.creatorId
},getCreatedAt:function getCreatedAt(){return this.metadata.createdAt
},createFromCommandData:function createFromCommandData(a,b){throw"AbstractCommand.createFromCommandData() has to be implemented"
},getAffectedShapes:function getAffectedShapes(){throw"AbstractCommand.getAffectedShapes() has to be implemented"
},getCommandData:function getCommandData(){throw"AbstractCommand.getCommandData() has to be implemented"
},getCommandName:function getCommandName(){throw"AbstractCommand.getCommandName() has to be implemented"
},getDisplayName:function getDisplayName(){return this.getCommandName()
},execute:function execute(){throw"AbstractCommand.execute() has to be implemented"
},rollback:function rollback(){throw"AbstractCommand.rollback() has to be implemented!"
},isLocal:function isLocal(){return this.metadata.local
},jsonSerialize:function jsonSerialize(){var b=this.getCommandData();
var a={id:this.getCommandId(),name:this.getCommandName(),creatorId:this.getCreatorId(),createdAt:this.getCreatedAt(),data:b,putOnStack:this.metadata.putOnStack};
return Object.toJSON(a)
},jsonDeserialize:function jsonDeserialize(c,b){var a=b.evalJSON();
var d=ORYX.Core.Commands[a.name].prototype.createFromCommandData(c,a.data);
if(typeof d!=="undefined"){d.setMetadata({id:a.id,name:a.name,creatorId:a.creatorId,createdAt:a.createdAt,putOnStack:a.putOnStack,local:false})
}return d
},setMetadata:function setMetadata(a){this.metadata=Object.clone(a)
}});
if(!ORYX.Plugins){ORYX.Plugins=new Object()
}if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.Paint=ORYX.Plugins.AbstractPlugin.extend({construct:function construct(a){arguments.callee.$.construct.apply(this,arguments);
ORYX.EDITOR._pluginFacade.offer({name:ORYX.I18N.paint_name,description:ORYX.I18N.paint_desc,icon:ORYX.BASE_FILE_PATH+"images/paint.png",functionality:this._togglePaint.bind(this),group:"paintgroup",toggle:true,index:1,minShape:0,maxShape:0,isEnabled:function(){return !(ORYX.READONLY==true||ORYX.VIEWLOCKED==true)
}.bind(this)});
this.showCanvas=false;
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_PAINT_NEWSHAPE,this._onNewShape.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_PAINT_REMOVESHAPE,this._onRemoveShape.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_CANVAS_RESIZED,this._onCanvasResized.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_CANVAS_RESIZE_SHAPES_MOVED,this._onCanvasResizedShapesMoved.bind(this));
ORYX.EDITOR._pluginFacade.registerOnEvent(ORYX.CONFIG.EVENT_CANVAS_ZOOMED,this._onCanvasZoomed.bind(this))
},onLoaded:function onLoaded(){this.paintCanvas=this._createCanvas();
this._loadBrush(this.paintCanvas);
this.toolbar=this._createToolbar();
this.paintCanvas.hide();
this.paintCanvas.deactivate()
},_activateTool:function _activateTool(a){this.paintCanvas.setTool(a)
},_onCanvasZoomed:function _onCanvasZoomed(a){if(typeof this.paintCanvas==="undefined"){return
}this.paintCanvas.scale(a.zoomLevel);
this._alignCanvasWithOryxCanvas()
},_createCanvas:function _createCanvas(){var b=ORYX.EDITOR._pluginFacade.getCanvas();
var a={canvasId:"freehand-paint",width:b.bounds.width(),height:b.bounds.height(),shapeDrawnCallback:this._onShapeExistenceCommand.bind(this,"Paint.DrawCommand"),shapeDeletedCallback:this._onShapeExistenceCommand.bind(this,"Paint.RemoveCommand")};
var c=new ORYX.Plugins.Paint.PaintCanvas(a);
var d=b.rootNode.parentNode;
d.appendChild(c.getDomElement());
return c
},_loadBrush:function _loadBrush(b){var a=new Image();
a.onload=b.setBrush.bind(b,a,2);
a.src=ORYX.BASE_FILE_PATH+"images/paint/brush.png"
},_createToolbar:function _createToolbar(){var b=this._getBasePath();
var a=new ORYX.Plugins.Paint.Toolbar();
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/line.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.LineTool));
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/arrow.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.ArrowTool));
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/box.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.BoxTool));
a.addButton(ORYX.BASE_FILE_PATH+"images/paint/ellipse.png",this._activateTool.bind(this,ORYX.Plugins.Paint.PaintCanvas.EllipseTool));
a.hide();
return a
},_getBasePath:function _getBasePath(){var a=window.location.href.lastIndexOf("/");
return window.location.href.substring(0,a)
},_togglePaint:function _togglePaint(){this.showCanvas=!this.showCanvas;
if(this.showCanvas){if(typeof this.toolbar!=="undefined"){this.toolbar.show()
}this.paintCanvas.show();
this.paintCanvas.activate();
this._alignCanvasWithOryxCanvas()
}else{if(typeof this.toolbar!=="undefined"){this.toolbar.hide()
}this.paintCanvas.hide();
this.paintCanvas.deactivate()
}},_onNewShape:function _onNewShape(a){this.paintCanvas.addShapeAndDraw(a.shape)
},_onRemoveShape:function _onRemoveShape(a){this.paintCanvas.removeShape(a.shapeId)
},_onShapeExistenceCommand:function _onShapeExistenceCommand(b,a){var c=new ORYX.Core.Commands[b](a,ORYX.EDITOR._pluginFacade);
c.execute()
},_onCanvasResized:function _onCanvasResized(a){this.paintCanvas.resize(a.bounds.width(),a.bounds.height());
this._alignCanvasWithOryxCanvas()
},_onCanvasResizedShapesMoved:function _onCanvasResizedShapesMoved(a){this.paintCanvas.moveShapes(a.offsetX,a.offsetY)
},_onRemoveKeyPressed:function _onRemoveKeyPressed(a){this.paintCanvas.deleteCurrentShape()
},_alignCanvasWithOryxCanvas:function _alignCanvasWithOryxCanvas(){var a=ORYX.EDITOR._pluginFacade.getCanvas().rootNode.parentNode;
var b=jQuery(a).offset();
this.paintCanvas.setOffset(b)
},_onRemoveKey:function _onRemoveKey(a){this.paintCanvas.removeShapesUnderCursor()
}});
ORYX.Plugins.Paint.Toolbar=Clazz.extend({construct:function construct(){var a=$$(".ORYX_Editor")[0].parentNode;
this.toolsList=document.createElement("div");
this.toolsList.id="paint-toolbar";
a.appendChild(this.toolsList);
this.buttonsAdded=false
},show:function show(){this.toolsList.show()
},hide:function hide(){this.toolsList.hide()
},addButton:function addButton(b,d){var a=this._createButton(b);
this.toolsList.appendChild(a);
var c=this._onButtonClicked.bind(this,a,d);
jQuery(a).click(c);
if(!this.buttonsAdded){c();
this.buttonsAdded=true
}},_createButton:function _createButton(b){var c=document.createElement("div");
c.className="paint-toolbar-button";
var a=document.createElement("div");
a.style.backgroundImage="url("+b+")";
c.appendChild(a);
return c
},_onButtonClicked:function _onButtonClicked(a,b){jQuery(this.toolsList).children().removeClass("paint-toolbar-button-pressed");
jQuery(a).addClass("paint-toolbar-button-pressed");
b()
}});
ORYX.Plugins.Paint.CanvasWrapper=Clazz.extend({construct:function construct(a){this.canvas=a;
this.context=a.getContext("2d");
this.scalingFactor=1;
this.color="#000000"
},clear:function clear(){this.canvas.width=this.canvas.width;
this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
this.scale(this.scalingFactor)
},resize:function resize(b,a){this.canvas.style.width=b+"px";
this.canvas.style.height=a+"px";
this.canvas.width=b;
this.canvas.height=a
},scale:function scale(a){this.context.scale(a,a);
this.scalingFactor=a
},setStyle:function setStyle(b,a){this.context.lineJoin="round";
this.context.lineWidth=b;
this.context.strokeStyle=a;
this._setColor(a)
},setBrush:function setBrush(a,b){this.origBrush=a;
this.brush=this._colorBrush(a,this.color);
this.brushDist=b
},drawLine:function drawLine(b,a,d,c){(this.brush?this._brushLine:this._simpleLine).apply(this,arguments)
},drawEllipse:function drawLine(b,a,d,c){(this.brush?this._brushEllipse:this._simpleEllipse).apply(this,arguments)
},drawArrow:function drawArrow(b,l,i,h){this.drawLine.apply(this,arguments);
var e=-Math.atan2(h-l,i-b)+Math.PI/2;
var f=20;
var d=e+3/4*Math.PI;
var k=Math.sin(d)*f;
var j=Math.cos(d)*f;
this.drawLine(i,h,i+k,h+j);
var g=e-3/4*Math.PI;
var c=Math.sin(g)*f;
var a=Math.cos(g)*f;
this.drawLine(i,h,i+c,h+a)
},strokeRect:function strokeRect(b,d,c,a){this.drawLine(b,d,b+c,d);
this.drawLine(b,d+a,b+c,d+a);
this.drawLine(b,d,b,d+a);
this.drawLine(b+c,d,b+c,d+a)
},_setColor:function _setColor(a){if(typeof this.origBrush!=="undefined"){this.brush=this._colorBrush(this.origBrush,a)
}this.color=a
},_simpleLine:function _simpleLine(b,a,d,c){this.context.beginPath();
this.context.moveTo(b,a);
this.context.lineTo(d,c);
this.context.stroke()
},_brushLine:function _brushLine(a,l,h,g){var b=function(i,m){return{x:i,y:m}
};
var e=ORYX.Core.Math.getDistancePointToPoint(b(a,l),b(h,g));
var j=e/this.brushDist;
var f=b(h-a,g-l);
var d=function(i,m){return{x:i.x/m,y:i.y/m}
};
var k=d(f,j);
for(var c=0;
c<j;
c++){this.context.drawImage(this.brush,a+c*k.x-this.brush.width/2,l+c*k.y-this.brush.height/2)
}},_simpleEllipse:function _simpleEllipse(c,e,b,d){var a=this._getEllipseInRectParams.apply(this,arguments);
var f=4*((Math.sqrt(2)-1)/3);
this.context.beginPath();
this.context.moveTo(a.cx,a.cy-a.ry);
this.context.bezierCurveTo(a.cx+(f*a.rx),a.cy-a.ry,a.cx+a.rx,a.cy-(f*a.ry),a.cx+a.rx,a.cy);
this.context.bezierCurveTo(a.cx+a.rx,a.cy+(f*a.ry),a.cx+(f*a.rx),a.cy+a.ry,a.cx,a.cy+a.ry);
this.context.bezierCurveTo(a.cx-(f*a.rx),a.cy+a.ry,a.cx-a.rx,a.cy+(f*a.ry),a.cx-a.rx,a.cy);
this.context.bezierCurveTo(a.cx-a.rx,a.cy-(f*a.ry),a.cx-(f*a.rx),a.cy-a.ry,a.cx,a.cy-a.ry);
this.context.stroke()
},_brushEllipse:function _brushEllipse(b,g,a,f){var e=this._getEllipseInRectParams.apply(this,arguments);
var j=2*Math.PI/Math.max(e.rx,e.ry);
var k=[];
for(var l=0;
l<2*Math.PI;
l+=j){k.push({x:e.cx+Math.cos(l)*e.rx,y:e.cy+Math.sin(l)*e.ry})
}var h,d;
for(var c=0;
c<k.length-1;
c++){h=k[c];
d=k[c+1];
this._brushLine(h.x,h.y,d.x,d.y)
}this._brushLine(k.last().x,k.last().y,k.first().x,k.first().y)
},_getEllipseInRectParams:function _getEllipseInRectParams(b,d,a,c){var f=(a-b)/2;
var e=(c-d)/2;
return{rx:f,ry:e,cx:b+f,cy:d+e}
},_colorBrush:function _colorBrush(b,a){var d=this._createTempCanvas(b.width,b.height);
var c=d.getContext("2d");
c.drawImage(b,0,0);
this._recolorCanvas(c,a,b.width,b.height);
return d
},_createTempCanvas:function _createTempCanvas(b,a){var c=document.createElement("canvas");
c.style.width=b+"px";
c.style.height=a+"px";
c.width=b;
c.height=a;
return c
},_recolorCanvas:function _recolorCanvas(e,b,f,a){var h=e.getImageData(0,0,f,a);
var c=this._getRGB(b);
var g=h.data;
for(var d=0;
d<g.length;
d+=4){g[d]=g[d]/255*c.r;
g[d+1]=g[d+1]/255*c.g;
g[d+2]=g[d+2]/255*c.b
}e.putImageData(h,0,0)
},_getRGB:function _getRGB(a){var b=a.substring(1,7);
return{r:parseInt(b.substring(0,2),16),g:parseInt(b.substring(2,4),16),b:parseInt(b.substring(4,6),16)}
}});
ORYX.Plugins.Paint.PaintCanvas=Clazz.extend({construct:function construct(a){this.container=this._createCanvasContainer(a.canvasId,a.width,a.height);
var b=this._createCanvas("view-canvas");
this.viewCanvas=new ORYX.Plugins.Paint.CanvasWrapper(b);
this.viewCanvas.resize(a.width,a.height);
this.container.appendChild(b);
var c=this._createCanvas("paint-canvas");
this.paintCanvas=new ORYX.Plugins.Paint.CanvasWrapper(c);
this.paintCanvas.resize(a.width,a.height);
this.container.appendChild(c);
this.shapes=[];
this.shapeDrawnCallback=a.shapeDrawnCallback;
this.shapeDeletedCallback=a.shapeDeletedCallback;
this.scalingFactor=1;
this.width=a.width;
this.height=a.height;
this.mouseState=new ORYX.Plugins.Paint.PaintCanvas.MouseState(c,{onMouseDown:this._onMouseDown.bind(this),onMouseUp:this._onMouseUp.bind(this),onMouseMove:this._onMouseMove.bind(this)})
},activate:function activate(){jQuery(this.container).addClass("paint-canvas-container-active")
},deactivate:function deactivate(){jQuery(this.container).removeClass("paint-canvas-container-active");
this.currentAction.mouseUp(this.mouseState.parameters.pos);
this.paintCanvas.clear()
},setTool:function setTool(a){var b=this._getColor();
this.currentAction=new a(b,this.paintCanvas,this._onShapeDone.bind(this))
},setBrush:function setBrush(a,b){this.viewCanvas.setBrush(a,b);
this.paintCanvas.setBrush(a,b);
this._redrawShapes()
},scale:function scale(a){this._setDimensions(this.width*a,this.height*a,a);
this._redrawShapes();
this.scalingFactor=a
},setPosition:function setPosition(b,a){this.container.style.top=b+"px";
this.container.style.left=a+"px"
},getDomElement:function getDomElement(){return this.container
},setOffset:function setOffset(a){jQuery(this.container).offset(a)
},addShapeAndDraw:function addShapeAndDraw(a){this.shapes.push(a);
this._drawShape(this.viewCanvas,a)
},removeShape:function removeShape(a){this.shapes=this.shapes.reject(function(b){return b.id===a
});
this.redraw()
},removeShapesUnderCursor:function removeShapesUnderCursor(){this._getShapesUnderCursor().each(function a(b){this.shapeDeletedCallback(b)
}.bind(this));
this.paintCanvas.clear()
},hide:function hide(){this.container.style.display="none"
},show:function show(){this.container.style.display="block"
},isVisible:function isVisible(){return this.container.style.display!=="none"
},redraw:function redraw(){this.viewCanvas.clear();
this._redrawShapes()
},moveShapes:function moveShapes(a,c){this.shapes.each(function b(d){d.move(a,c)
});
if(typeof this.currentAction!=="undefined"){this.currentAction.move(a,c)
}this.viewCanvas.clear();
this.paintCanvas.clear();
this._redrawShapes()
},resize:function resize(b,a){this.width=b;
this.height=a;
this._setDimensions(b*this.scalingFactor,a*this.scalingFactor,this.scalingFactor);
this._redrawShapes()
},updateColor:function updateColor(){var a=this._getColor();
this.currentAction.setColor(a)
},_onMouseDown:function _onMouseDown(a){if(a.inside){this.currentAction.mouseDown(this._translateMouse(a.pos))
}},_onMouseMove:function _onMouseMove(a){if(!a.inside){return
}if(a.mouseDown){this.currentAction.mouseMove(this._translateMouse(a.pos))
}else{this.paintCanvas.clear();
this._highlightShapesUnderCursor()
}},_onMouseUp:function _onMouseUp(a){this.currentAction.mouseUp(this._translateMouse(a.pos))
},_onShapeDone:function _onShapeDone(a){if(typeof this.shapeDrawnCallback==="function"){this.shapeDrawnCallback(a)
}this.paintCanvas.clear()
},_highlightShapesUnderCursor:function _highlightShapesUnderCursor(){this._getShapesUnderCursor().each(function a(b){this._drawShape(this.paintCanvas,b,3)
}.bind(this))
},_getShapesUnderCursor:function _getShapesUnderCursor(){if(!this.mouseState.parameters.inside){return[]
}return this.shapes.select(function a(b){return b.isUnderCursor(this._translateMouse(this.mouseState.parameters.pos))
}.bind(this))
},_redrawShapes:function _redrawShapes(){for(var a=0;
a<this.shapes.length;
a++){this._drawShape(this.viewCanvas,this.shapes[a])
}if(typeof this.currentAction!=="undefined"){this.currentAction.redraw()
}},_getColor:function _getColor(){return"#000000"
},_setDimensions:function _setDimensions(c,a,b){this._resizeDiv(this.container,c,a);
this.paintCanvas.resize(c,a);
this.paintCanvas.scale(b);
this.viewCanvas.resize(c,a);
this.viewCanvas.scale(b)
},_drawShape:function _drawShape(c,a,d){var b=this._getColor();
a.draw(c,b,d)
},_createCanvasContainer:function _createCanvasContainer(d,c,a){var b=document.createElement("div");
b.className="paint-canvas-container";
b.id=d;
b.style.width=c+"px";
b.style.height=a+"px";
return b
},_createCanvas:function _createCanvas(d,c,a){var b=document.createElement("canvas");
b.className="paint-canvas";
b.id=d;
return b
},_resizeDiv:function _resizeDiv(c,b,a){c.style.width=b+"px";
c.style.height=a+"px"
},_translateMouse:function _translateMouse(a){if(typeof a==="undefined"){return undefined
}return{left:a.left/this.scalingFactor,top:a.top/this.scalingFactor}
}});
ORYX.Plugins.Paint.PaintCanvas.MouseState=Clazz.extend({construct:function construct(a,b){this.element=a;
this.callbacks=b;
this.parameters={inside:undefined,mouseDown:false,pos:undefined};
document.documentElement.addEventListener("mousedown",this._onMouseDown.bind(this),false);
window.addEventListener("mousemove",this._onMouseMove.bind(this),true);
window.addEventListener("mouseup",this._onMouseUp.bind(this),true);
jQuery(a).mouseleave=this._onMouseLeave.bind(this)
},_onMouseDown:function _onMouseDown(a){if(this._isInside(a)){document.onselectstart=function(){return false
};
this.parameters.mouseDown=true
}else{this.parameters.mouseDown=false
}this._rememberPosition(a);
this._callback("onMouseDown")
},_onMouseMove:function _onMouseMove(a){this._rememberPosition(a);
this._callback("onMouseMove")
},_onMouseUp:function _onMouseUp(a){if(this.parameters.mouseDown){document.onselectstart=function(){return true
};
this.parameters.mouseDown=false
}this._rememberPosition(a);
this._callback("onMouseUp")
},_onMouseLeave:function _onMouseLeave(a){this.parameters.mouseDown=false
},_rememberPosition:function _rememberPosition(a){this.parameters.inside=this._isInside(a);
this.parameters.pos=this._isInside(a)?{left:a.layerX,top:a.layerY}:undefined
},_isInside:function _isInside(a){return(a.target===this.element)
},_callback:function _callback(a){if(typeof this.callbacks[a]==="function"){this.callbacks[a](this.parameters)
}}});
ORYX.Plugins.Paint.PaintCanvas.Tool=Clazz.extend({construct:function construct(b,c,a){this.done=a;
this.canvas=c;
this.color=b
},getColor:function getColor(){return this.color
},setColor:function setColor(a){this.color=a
}});
ORYX.Plugins.Paint.PaintCanvas.LineTool=ORYX.Plugins.Paint.PaintCanvas.Tool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.apply(this,arguments);
this._reset()
},mouseDown:function mouseDown(a){this._addPoint(a.left,a.top);
this.prevX=a.left;
this.prevY=a.top
},mouseUp:function mouseUp(b){if(typeof this.prevX!=="undefined"&&typeof this.prevY!=="undefined"){var a=new ORYX.Plugins.Paint.PaintCanvas.Line(this.points);
this.done(a)
}this._reset()
},mouseMove:function mouseMove(a){this._addPoint(a.left,a.top);
if(typeof this.prevX!=="undefined"&&typeof this.prevY!=="undefined"){this._drawLineSegment(this.prevX,this.prevY,a.left,a.top)
}this.prevX=a.left;
this.prevY=a.top
},redraw:function redraw(){var a;
var c,b;
for(a=0;
a<this.points.length-1;
a++){c=this.points[a];
b=this.points[a+1];
this._drawLineSegment(c.x,c.y,b.x,b.y)
}},move:function move(a,c){this.points.each(function b(d){d.x+=a;
d.y+=c
});
this.prevX+=a;
this.prevY+=c
},_drawLineSegment:function _drawLineSegment(b,d,a,c){this.canvas.setStyle(1,this.getColor());
this.canvas.drawLine(b,d,a,c)
},_addPoint:function _addPoint(a,b){this.points.push({x:a,y:b})
},_reset:function _reset(){this.points=[];
this.prevX=undefined;
this.prevY=undefined
}});
ORYX.Plugins.Paint.PaintCanvas.TwoPointTool=ORYX.Plugins.Paint.PaintCanvas.Tool.extend({construct:function construct(b,c,a,d){arguments.callee.$.construct.call(this,b,c,a);
this.shapeClass=d;
this._reset()
},mouseDown:function mouseDown(a){this.start=a
},mouseUp:function mouseUp(c){var a;
var b=c||this.curEnd;
if(typeof this.start!=="undefined"&&typeof b!=="undefined"){a=new this.shapeClass(this.start,b);
this.done(a)
}this._reset()
},mouseMove:function mouseMove(a){if(typeof this.start==="undefined"){return
}this.curEnd=a;
this.canvas.clear();
this.draw(this.canvas,this.start,a)
},redraw:function redraw(){if(typeof this.curEnd!=="undefined"){this.draw(this.canvas,this.start,this.curEnd)
}},move:function move(a,c){var b=function b(d){if(typeof d!=="undefined"){d.left+=a;
d.top+=c
}};
b(this.start);
b(this.curEnd)
},_reset:function _reset(){this.start=undefined;
this.curEnd=undefined
}});
ORYX.Plugins.Paint.PaintCanvas.ArrowTool=ORYX.Plugins.Paint.PaintCanvas.TwoPointTool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.call(this,b,c,a,ORYX.Plugins.Paint.PaintCanvas.Arrow)
},draw:function draw(b,c,a){b.setStyle(1,this.getColor());
b.drawArrow(c.left,c.top,a.left,a.top)
}});
ORYX.Plugins.Paint.PaintCanvas.BoxTool=ORYX.Plugins.Paint.PaintCanvas.TwoPointTool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.call(this,b,c,a,ORYX.Plugins.Paint.PaintCanvas.Box)
},draw:function draw(b,c,a){b.setStyle(1,this.getColor());
b.strokeRect(c.left,c.top,a.left-c.left,a.top-c.top)
}});
ORYX.Plugins.Paint.PaintCanvas.EllipseTool=ORYX.Plugins.Paint.PaintCanvas.TwoPointTool.extend({construct:function construct(b,c,a){arguments.callee.$.construct.call(this,b,c,a,ORYX.Plugins.Paint.PaintCanvas.Ellipse)
},draw:function draw(b,c,a){b.setStyle(1,this.getColor());
b.drawEllipse(c.left,c.top,a.left,a.top)
}});
ORYX.Plugins.Paint.PaintCanvas.Shape=Clazz.extend({construct:function construct(a){this.id=a||ORYX.Editor.provideId()
}});
ORYX.Plugins.Paint.PaintCanvas.Line=ORYX.Plugins.Paint.PaintCanvas.Shape.extend({construct:function construct(a,b){arguments.callee.$.construct.call(this,b);
this.points=a.map(Object.clone)
},draw:function draw(c,b,d){var a=this._getLines(this._smooth(this.points));
c.setStyle(d||1,b);
a.each(function e(f){c.drawLine(f.a.x,f.a.y,f.b.x,f.b.y)
})
},move:function move(a,c){this.points.each(function b(d){d.x+=a;
d.y+=c
})
},isUnderCursor:function isUnderCursor(c){var a=this._getLines(this.points);
return a.any(function b(d){return ORYX.Core.Math.isPointInLine(c.left,c.top,d.a.x,d.a.y,d.b.x,d.b.y,10)
})
},pack:function pack(){return{id:this.id,type:"Line",points:this.points}
},unpack:function unpack(a){return new ORYX.Plugins.Paint.PaintCanvas.Line(a.points,a.id)
},_getLines:function _getLines(c){var a=[];
for(var b=1;
b<c.length;
b++){a.push({a:c[b-1],b:c[b]})
}return a
},_smooth:function _smooth(a){return this._mcMaster(this._fillPoints(a,5))
},_fillPoints:function _fillPoints(n,f){var d=[n[0]];
for(var e=1;
e<n.length;
e++){var l=n[e];
var o=n[e-1];
var m=l.x-o.x;
var j=l.y-o.y;
var h=Math.sqrt(m*m+j*j);
if(h>f){var g=Math.floor(h/f);
var c=m/g;
var b=j/g;
for(var a=0;
a<g;
a++){d.push({x:o.x+a*c,y:o.y+a*b})
}}d.push(l)
}return d
},_mcMaster:function _mcMaster(h){var c=[];
var b=10;
var g=Math.floor(b/2);
if(h.length<b){return h
}for(var e=h.length-1;
e>=0;
e--){if(e>=h.length-g||e<=g){c=[h[e]].concat(c)
}else{var f=0,d=0;
for(var a=-g;
a<-g+b;
a++){f+=h[e+a].x;
d+=h[e+a].y
}c=[{x:f/b,y:d/b}].concat(c)
}}return c
}});
ORYX.Plugins.Paint.PaintCanvas.TwoPointShape=ORYX.Plugins.Paint.PaintCanvas.Shape.extend({construct:function construct(c,a,b){arguments.callee.$.construct.call(this,b);
this.start=c;
this.end=a
},move:function move(a,c){var b=function b(d){d.left+=a;
d.top+=c
};
b(this.start);
b(this.end)
},abstractPack:function abstractPack(a){return{id:this.id,type:a,start:this.start,end:this.end}
},abstractUnpack:function abstractUnpack(b,a){return new b(a.start,a.end,a.id)
}});
ORYX.Plugins.Paint.PaintCanvas.Arrow=ORYX.Plugins.Paint.PaintCanvas.TwoPointShape.extend({construct:function construct(c,a,b){arguments.callee.$.construct.apply(this,arguments)
},draw:function draw(b,a,c){b.setStyle(c||1,a);
b.drawArrow(this.start.left,this.start.top,this.end.left,this.end.top)
},isUnderCursor:function isUnderCursor(a){return ORYX.Core.Math.isPointInLine(a.left,a.top,this.start.left,this.start.top,this.end.left,this.end.top,10)
},pack:function pack(){return this.abstractPack("Arrow")
},unpack:function unpack(a){return this.abstractUnpack(ORYX.Plugins.Paint.PaintCanvas.Arrow,a)
}});
ORYX.Plugins.Paint.PaintCanvas.Box=ORYX.Plugins.Paint.PaintCanvas.TwoPointShape.extend({construct:function construct(c,a,b){arguments.callee.$.construct.apply(this,arguments)
},draw:function draw(b,a,c){b.setStyle(c||1,a);
b.strokeRect(this.start.left,this.start.top,this.end.left-this.start.left,this.end.top-this.start.top)
},isUnderCursor:function isUnderCursor(e){var b=ORYX.Core.Math.isPointInLine(e.left,e.top,this.start.left,this.start.top,this.end.left,this.start.top,10);
var a=ORYX.Core.Math.isPointInLine(e.left,e.top,this.start.left,this.end.top,this.end.left,this.end.top,10);
var d=ORYX.Core.Math.isPointInLine(e.left,e.top,this.start.left,this.start.top,this.start.left,this.end.top,10);
var c=ORYX.Core.Math.isPointInLine(e.left,e.top,this.end.left,this.start.top,this.end.left,this.end.top,10);
return b||a||d||c
},pack:function pack(){return this.abstractPack("Box")
},unpack:function unpack(a){return this.abstractUnpack(ORYX.Plugins.Paint.PaintCanvas.Box,a)
}});
ORYX.Plugins.Paint.PaintCanvas.Ellipse=ORYX.Plugins.Paint.PaintCanvas.TwoPointShape.extend({construct:function construct(c,h,d){var a={left:Math.min(c.left,h.left),top:Math.min(c.top,h.top)};
var j={left:Math.max(c.left,h.left),top:Math.max(c.top,h.top)};
arguments.callee.$.construct.call(this,a,j,d);
var e=(j.left-a.left)/2;
var b=(j.top-a.top)/2;
var i=a.left+e;
var g=a.top+b;
this.isUnderCursor=function f(l){var k=false;
if(e>5&&b>5){k=ORYX.Core.Math.isPointInEllipse(l.left,l.top,i,g,e-5,b-5)
}return !k&&ORYX.Core.Math.isPointInEllipse(l.left,l.top,i,g,e+10,b+10)
}
},draw:function draw(b,a,c){b.setStyle(c||1,a);
b.drawEllipse(this.start.left,this.start.top,this.end.left,this.end.top)
},pack:function pack(){return this.abstractPack("Ellipse")
},unpack:function unpack(a){return this.abstractUnpack(ORYX.Plugins.Paint.PaintCanvas.Ellipse,a)
}});
ORYX.Plugins.Paint.PaintCanvas.ShapeExistenceCommand=ORYX.Core.AbstractCommand.extend({construct:function construct(a,b){arguments.callee.$.construct.call(this,b);
this.metadata.putOnStack=false;
this.shape=a
},getCommandData:function getCommandData(){return{shape:this.shape.pack()}
},abstractCreateFromCommandData:function abstractCreateFromCommandData(c,d,b){var a=ORYX.Plugins.Paint.PaintCanvas[b.shape.type].prototype.unpack(b.shape);
return new ORYX.Core.Commands[c](a,d)
},getAffectedShapes:function getAffectedShapes(){return[]
},createShape:function createShape(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_PAINT_NEWSHAPE,shape:this.shape})
},deleteShape:function deleteShape(){ORYX.EDITOR._pluginFacade.raiseEvent({type:ORYX.CONFIG.EVENT_PAINT_REMOVESHAPE,shapeId:this.shape.id})
}});
ORYX.Core.Commands["Paint.DrawCommand"]=ORYX.Plugins.Paint.PaintCanvas.ShapeExistenceCommand.extend({construct:function construct(a,b){arguments.callee.$.construct.apply(this,arguments)
},createFromCommandData:function createFromCommandData(b,a){return this.abstractCreateFromCommandData("Paint.DrawCommand",b,a)
},getCommandName:function getCommandName(){return"Paint.DrawCommand"
},getDisplayName:function getDisplayName(){return"Drew on paint layer"
},execute:function execute(){this.createShape()
},rollback:function rollback(){this.deleteShape()
}});
ORYX.Core.Commands["Paint.RemoveCommand"]=ORYX.Plugins.Paint.PaintCanvas.ShapeExistenceCommand.extend({construct:function construct(a,b){arguments.callee.$.construct.apply(this,arguments)
},createFromCommandData:function createFromCommandData(b,a){return this.abstractCreateFromCommandData("Paint.RemoveCommand",b,a)
},getCommandName:function getCommandName(){return"Paint.RemoveCommand"
},getDisplayName:function getDisplayName(){return"Erased something from paint layer"
},execute:function execute(){this.deleteShape()
},rollback:function rollback(){this.createShape()
}});