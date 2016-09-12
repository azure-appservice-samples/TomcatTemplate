if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.FieldDataAssignmentEditors=Clazz.extend({facade:undefined,construct:function(e){this.facade=e;
var c=new ORYX.Plugins.FieldDataAssignmentEditors.DateFieldEditorFactory();
ORYX.AssociationEditors["java.util.Date"]=c;
ORYX.AssociationEditors.Date=c;
var b=new ORYX.Plugins.FieldDataAssignmentEditors.IntegerFieldEditorFactory();
ORYX.AssociationEditors["java.lang.Integer"]=b;
ORYX.AssociationEditors.Integer=b;
ORYX.AssociationEditors["int"]=b;
var d=new ORYX.Plugins.FieldDataAssignmentEditors.FloatFieldEditorFactory();
ORYX.AssociationEditors["java.lang.Double"]=d;
ORYX.AssociationEditors["java.lang.Float"]=d;
ORYX.AssociationEditors.Float=d;
ORYX.AssociationEditors.Double=d;
ORYX.AssociationEditors["float"]=d;
ORYX.AssociationEditors["double"]=d;
var a=new ORYX.Plugins.FieldDataAssignmentEditors.BooleanFieldEditorFactory();
ORYX.AssociationEditors["java.lang.Boolean"]=a;
ORYX.AssociationEditors.Boolean=a;
ORYX.AssociationEditors["boolean"]=a
}});
ORYX.Plugins.FieldDataAssignmentEditors.BooleanFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.Checkbox())
}});
ORYX.Plugins.FieldDataAssignmentEditors.FloatFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.NumberField({allowDecimals:true}))
}});
ORYX.Plugins.FieldDataAssignmentEditors.IntegerFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.NumberField({allowDecimals:false}))
}});
ORYX.Plugins.FieldDataAssignmentEditors.DateFieldEditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var a=arguments[1];
return new Ext.Editor(new Ext.form.DateField())
}});