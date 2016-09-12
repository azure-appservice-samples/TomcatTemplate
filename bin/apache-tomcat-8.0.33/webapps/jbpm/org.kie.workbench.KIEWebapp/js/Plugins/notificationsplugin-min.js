if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Plugins.NotificationsPlugin=Clazz.extend({construct:function(a){this.facade=a;
this.facade.registerOnEvent(ORYX.CONFIG.EVENT_NOTIFICATION_SHOW,this.showNotification.bind(this))
},showNotification:function(a){notifications.options={positionClass:a.position||"notification-top-right",onclick:a.onclick||null,timeOut:a.timeOut||1000,extendedTimeOut:a.extendedTimeOut||4000};
var b=notifications[a.ntype](a.msg,a.title)
}});