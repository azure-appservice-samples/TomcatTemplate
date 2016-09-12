if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Config.CanvasTitle={};
ORYX.Config.FACADE={};
ORYX.Plugins.CanvasTitle={facade:undefined,titleNode:undefined,facade:undefined,titleID:undefined,textID:undefined,formID:undefined,construct:function(a){this.facade=a;
ORYX.Config.FACADE=a;
this.titleID="canvasTitleId";
this.titleFormID=" canvasTitleFormId";
this.textID=ORYX.Editor.provideId();
this.formID=ORYX.Editor.provideId();
this.titleNode=ORYX.Editor.graft("http://www.w3.org/2000/svg",null,["text",{id:this.textID,style:"stroke-width:1;fill:rgb(177,194,214);font-family:arial;font-weight:bold","font-size":12,onclick:"ORYX.Plugins.CanvasTitle.openTextualAnalysis()",onmouseover:"ORYX.Plugins.CanvasTitle.addToolTip('"+this.textID+"')"}]);
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_LOADED,this.showTitle.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,this.updateTitle.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_START,this.hideTitle.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_RESIZE_END,this.showTitle.bind(this))
},hideTitle:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:this.titleID})
},showTitle:function(){this.titleNode.textContent=this._getTitleFromJSON();
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:this.titleID,shapes:[this.facade.getCanvas()],node:this.titleNode,nodePosition:"CANVAS_TITLE"})
},updateTitle:function(){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_OVERLAY_HIDE,id:this.titleID});
this.showTitle()
},_getTitleFromJSON:function(){var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.processn");
var d=jsonPath(a.evalJSON(),"$.properties.package");
var f=jsonPath(a.evalJSON(),"$.properties.id");
var c=jsonPath(a.evalJSON(),"$.properties.version");
var e="";
if(ORYX.VIEWLOCKED&&ORYX.VIEWLOCKED==true){e+="READ ONLY "
}if(b&&b!=""){e+=b[0];
if(c&&c!=""){e+=" v."+c[0]
}if(f&&f!=""&&d&&d!=""){e+=" ("+f[0]+")"
}}return e
}};
ORYX.Plugins.CanvasTitle=Clazz.extend(ORYX.Plugins.CanvasTitle);
ORYX.Plugins.CanvasTitle.openTextualAnalysis=function(){};
ORYX.Plugins.CanvasTitle.editProcessForm=function(){var a=ORYX.EDITOR.getSerializedJSON();
var b=jsonPath(a.evalJSON(),"$.properties.id");
if(b&&b!=""){ORYX.Config.FACADE.raiseEvent({type:ORYX.CONFIG.EVENT_TASKFORM_EDIT,tn:b})
}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:"Process Id not specified.",title:""})
}};
ORYX.Plugins.CanvasTitle.addToolTip=function(a){};
ORYX.Plugins.CanvasTitle.addFormToolTip=function(b){var a=new Ext.ToolTip({target:b,title:"Click to edit Process Form",plain:true,showDelay:50,width:200})
};