if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ExtendedDataAssignmentEditor=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
ORYX.FieldEditors.extendeddataassignment=new ORYX.Plugins.ExtendedDataAssignmentEditor.EditorFactory()
}});
ORYX.Plugins.ExtendedDataAssignmentEditor.EditorFactory=Clazz.extend({construct:function(){},init:function(){var c=arguments[0];
var e=arguments[1];
var b=arguments[3];
var a=e._jsonProp.lookupType;
var d=new Ext.form.ExtendedDataAssignmentEditor({allowBlank:e.optional(),dataSource:this.dataSource,grid:this.grid,row:b,facade:this.facade,shapes:this.shapeSelection.shapes});
d.on("dialogClosed",this.dialogClosed,{scope:this,row:b,col:1,field:d});
return new Ext.Editor(d)
}});
Ext.form.ExtendedDataAssignmentEditor=function(b){var a={onTriggerClick:function(){var d=Ext.form.ExtendedDataAssignmentEditor.superclass.onTriggerClick.call(this);
if(!d){return null
}var c=d.getColumnModel().getCellEditor;
d.getColumnModel().getCellEditor=function(g,h){if(g==5){var f=d.getStore().getAt(h);
var e=ORYX.AssociationEditors[f.get("dataType")];
if(e!==undefined){return e.init.bind(this,d,f)()
}}return c.call(d.getColumnModel(),g,h)
}
}};
if(b){Ext.applyIf(b,a)
}else{b=a
}Ext.form.ExtendedDataAssignmentEditor.superclass.constructor.call(this,b)
};
Ext.extend(Ext.form.ExtendedDataAssignmentEditor,Ext.form.ComplexDataAssignmenField,{});