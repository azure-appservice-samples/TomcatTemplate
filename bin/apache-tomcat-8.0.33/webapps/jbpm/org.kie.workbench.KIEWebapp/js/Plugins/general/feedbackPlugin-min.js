if(!ORYX.Plugins){ORYX.Plugins={}
}ORYX.Plugins.FeedbackPlugin=ORYX.Plugins.AbstractPlugin.extend({construct:function(){arguments.callee.$.construct.apply(this,arguments);
this.facade.offer({name:ORYX.I18N.Feedback.name,functionality:this.showWindow.bind(this),group:"Help",description:ORYX.I18N.Feedback.desc,icon:ORYX.BASE_FILE_PATH+"images/feedback.png",index:0,minShape:0,maxShape:0})
},showWindow:function(){var a=new Ext.Window({title:ORYX.I18N.Feedback.pTitle,width:"50%",closable:true,items:[{xtype:"form",url:ORYX.CONFIG.ROOT_PATH+"feedback",frame:true,labelAlign:"top",items:[{layout:"column",items:[{columnWidth:0.5,layout:"form",items:{xtype:"textfield",name:"name",fieldLabel:ORYX.I18N.Feedback.pName,anchor:"98%"}},{columnWidth:0.5,layout:"form",items:{xtype:"textfield",name:"email",fieldLabel:ORYX.I18N.Feedback.pEmail,vtype:"email",anchor:"100%"}}]},{xtype:"combo",anchor:"100%",name:"subject",store:new Ext.data.SimpleStore({fields:["name","title"],data:[["[Feedback] ","["+ORYX.I18N.Feedback.typeFeedback+"]"],["[Bug Report] ","["+ORYX.I18N.Feedback.typeBug+"]"],["[Feature Request] ","["+ORYX.I18N.Feedback.typeFeatureReq+"]"]]}),allowBlank:false,displayField:"title",valueField:"name",mode:"local",typeAhead:true,triggerAction:"all",fieldLabel:ORYX.I18N.Feedback.pSubject+" *"},{xtype:"textarea",name:"description",allowBlank:false,fieldLabel:ORYX.I18N.Feedback.pMsg+" *",emptyText:ORYX.I18N.Feedback.pEmpty,height:200,anchor:"100%"},{xtype:"checkbox",boxLabel:ORYX.I18N.Feedback.pAttach+' <img src="'+ORYX.CONFIG.ROOT_PATH+'/images/information.png" ext:qtip="'+ORYX.I18N.Feedback.pAttachDesc+'"/>',hideLabel:true,checked:true,listeners:{check:function(d,b){var c=a.find("itemId","hiddenModel")[0];
if(b){c.setValue(this.facade.getSerializedJSON())
}else{c.setValue(undefined)
}}.bind(this)}},{xtype:"hidden",itemId:"hiddenModel",name:"model"},{xtype:"textarea",fieldLabel:ORYX.I18N.Feedback.pBrowser+' <img src="'+ORYX.CONFIG.ROOT_PATH+'/images/information.png" ext:qtip="'+ORYX.I18N.Feedback.pBrowserDesc+'"/>',anchor:"100%",name:"environment",value:this.getEnv()}],buttons:[{text:ORYX.I18N.Feedback.submit,handler:function(b){b.ownerCt.form.submit({waitMsg:ORYX.I18N.Feedback.sending,success:function(c,d){Ext.Msg.alert(ORYX.I18N.Feedback.success,ORYX.I18N.Feedback.successMsg);
a.close()
},failure:function(c,d){Ext.Msg.alert(ORYX.I18N.Feedback.failure,ORYX.I18N.Feedback.failureMsg)
}})
}}]}]});
a.show()
},getEnv:function(){var b="";
b+="Browser: "+navigator.userAgent;
b+="\n\nBrowser Plugins: ";
if(navigator.plugins){for(var a=0;
a<navigator.plugins.length;
a++){var c=navigator.plugins[a];
b+=c.name+", "
}}if((typeof(screen.width)!="undefined")&&(screen.width&&screen.height)){b+="\n\nScreen Resolution: "+screen.width+"x"+screen.height
}return b
}});