if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.VoiceCommand=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_VOICE_COMMAND,this.handleVoiceCommand.bind(this));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_ADD_START_EVENT,this.addNode.bind(this,"StartNoneEvent"));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_USER,this.updateTask.bind(this,"User"));
this.facade.registerOnEvent(ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_SCRIPT,this.updateTask.bind(this,"Script"));
this.commands=this._initCommands();
String.prototype.soundex=function(g){var e,d,c,f,g=isNaN(g)?4:g>10?10:g<4?4:g,b={BFPV:1,CGJKQSXZ:2,DT:3,L:4,MN:5,R:6},f=(s=this.toUpperCase().replace(/[^A-Z]/g,"").split("")).splice(0,1);
for(e=-1,c=s.length;
++e<c;
){for(d in b){if(d.indexOf(s[e])+1&&f[f.length-1]!=b[d]&&f.push(b[d])){break
}}}return f.length>g&&(f.length=g),f.join("")+(new Array(g-f.length+1)).join("0")
}
},handleVoiceCommand:function(a){if(a&&a.entry){if(a.entry.length>0){var d=false;
for(var g in this.commands){if(this.commands.hasOwnProperty(g)){var f=g.split(",");
for(var b=0;
b<f.length;
b++){var e=f[b];
if(a.entry.soundex()==e.soundex()){d=true;
this.facade.raiseEvent({type:this.commands[g]});
break
}}if(d){break
}}}if(!d){this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.voiceCommand.commandNotFound+": "+a.entry,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.voiceCommand.invalidcommand,title:""})
}}else{this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,ntype:"error",msg:ORYX.I18N.voiceCommand.invalidcommand,title:""})
}},_initCommands:function(){var a={};
a[ORYX.CONFIG.VOICE_ENTRY_GENERATE_FORMS]=ORYX.CONFIG.VOICE_COMMAND_GENERATE_FORMS;
a[ORYX.CONFIG.VOICE_ENTRY_GENERATE_IMAGE]=ORYX.CONFIG.VOICE_COMMAND_GENERATE_IMAGE;
a[ORYX.CONFIG.VOICE_ENTRY_VIEW_SOURCE]=ORYX.CONFIG.VOICE_COMMAND_VIEW_SOURCE;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_TASK]=ORYX.CONFIG.VOICE_COMMAND_ADD_TASK;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_GATEWAY]=ORYX.CONFIG.VOICE_COMMAND_ADD_GATEWAY;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_END_EVENT]=ORYX.CONFIG.VOICE_COMMAND_ADD_END_EVENT;
a[ORYX.CONFIG.VOICE_ENTRY_ADD_START_EVENT]=ORYX.CONFIG.VOICE_COMMAND_ADD_START_EVENT;
a[ORYX.CONFIG.VOICE_ENTRY_TASK_TYPE_USER]=ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_USER;
a[ORYX.CONFIG.VOICE_ENTRY_TASK_TYPE_SCRIPT]=ORYX.CONFIG.VOICE_COMMAND_TASK_TYPE_SCRIPT;
a[ORYX.CONFIG.VOICE_ENTRY_GATEWAY_TYPE_PARALLEL]=ORYX.CONFIG.VOICE_COMMAND_GATEWAY_TYPE_PARALLEL;
return a
},updateTask:function(b){var c=this.facade.getSelection();
if(c.length==1){var a=c.first();
a.setProperty("oryx-tasktype",b);
a.refresh()
}},addNode:function(e){var b=ORYX.Core.Command.extend({construct:function(i,g,j,f,h){this.option=i;
this.currentParent=g;
this.canAttach=j;
this.position=f;
this.facade=h;
this.selection=this.facade.getSelection();
this.shape;
this.parent
},execute:function(){if(!this.shape){this.shape=this.facade.createShape(c);
this.parent=this.shape.parent
}else{this.parent.add(this.shape)
}if(this.canAttach&&this.currentParent instanceof ORYX.Core.Node&&this.shape.dockers.length>0){var f=this.shape.dockers[0];
if(this.currentParent.parent instanceof ORYX.Core.Node){this.currentParent.parent.add(f.parent)
}f.bounds.centerMoveTo(this.position);
f.setDockedShape(this.currentParent)
}this.facade.setSelection([this.shape]);
this.facade.getCanvas().update();
this.facade.updateSelection()
},rollback:function(){this.facade.deleteShape(this.shape);
this.facade.setSelection(this.selection.without(this.shape));
this.facade.getCanvas().update();
this.facade.updateSelection()
}});
var a={x:178,y:209};
var c={type:"http://b3mn.org/stencilset/bpmn2.0#"+e,namespace:"http://b3mn.org/stencilset/bpmn2.0#",connectingType:true,isHandle:false,position:a,parent:ORYX.EDITOR._canvas};
var d=new b(c,ORYX.EDITOR._canvas,undefined,a,this.facade);
this.facade.executeCommands([d])
}});