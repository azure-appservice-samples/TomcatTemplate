if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.RegexTextEditor=Clazz.extend({construct:function(a){this.facade=a;
ORYX.FieldEditors.regex=new ORYX.Plugins.RegexTextEditor.EditorFactory()
}});
ORYX.Plugins.RegexTextEditor.EditorFactory=Clazz.extend({construct:function(){},init:function(){var b=arguments[0];
var c=arguments[1];
var a=new Ext.form.TextArea({alignment:"tl-tl",allowBlank:c.optional(),msgTarget:"title",maxLength:c.length(),regex:c._jsonProp.regex,regexText:c._jsonProp.invalidText});
a.on("keyup",function(e,d){if(a.validate()){this.editDirectly(b,e.getValue())
}}.bind(this));
return new Ext.Editor(a)
}});