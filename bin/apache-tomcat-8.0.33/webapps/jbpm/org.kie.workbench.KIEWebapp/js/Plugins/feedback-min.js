if(!ORYX.Plugins){ORYX.Plugins={}
}if(!ORYX.Config){ORYX.Config={}
}ORYX.Config.Feedback={VISIBLE_STATE:"visible",HIDDEN_STATE:"hidden",INFO:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, set eiusmod tempor incidunt et labore et dolore magna aliquam. Ut enim ad minim veniam, quis nostrud exerc. Irure dolor in reprehend incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse molestaie cillum. Tia non ob ea soluad incommod quae egen ium improb fugiend. Officia",CSS_FILE:ORYX.PATH+"/css/feedback.css"};
ORYX.Plugins.Feedback=ORYX.Plugins.AbstractPlugin.extend({construct:function(a,b){this.facade=a;
((b&&b.properties)||[]).each(function(d){if(d.cssfile){ORYX.Config.Feedback.CSS_FILE=d.css_file
}}.bind(this));
var c=document.createElement("link");
c.setAttribute("rel","stylesheet");
c.setAttribute("type","text/css");
c.setAttribute("href",ORYX.Config.Feedback.CSS_FILE);
document.getElementsByTagName("head")[0].appendChild(c);
this.elements={container:null,tab:null,dialog:null,form:null,info:null};
this.createFeedbackTab()
},createFeedbackTab:function(){this.elements.tab=document.createElement("div");
this.elements.tab.setAttribute("class","tab");
this.elements.tab.innerHTML=(ORYX.I18N.Feedback.name+" &#8226;");
this.elements.container=document.createElement("div");
this.elements.container.setAttribute("id","feedback");
this.elements.container.appendChild(this.elements.tab);
document.body.appendChild(this.elements.container);
Event.observe(this.elements.tab,"click",this.toggleDialog.bindAsEventListener(this))
},toggleDialog:function(b){if(b){Event.stop(b)
}var a=this.elements.dialog||this.createDialog();
if(ORYX.Config.Feedback.VISIBLE_STATE==a.state){this.elements.tab.innerHTML=(ORYX.I18N.Feedback.name+" &#8226;");
Element.hide(a);
a.state=ORYX.Config.Feedback.HIDDEN_STATE
}else{this.elements.tab.innerHTML=(ORYX.I18N.Feedback.name+" &#215;");
Element.show(a);
a.state=ORYX.Config.Feedback.VISIBLE_STATE
}console.info(a.state)
},createDialog:function(){if(this.elements.dialog){return this.elements.dialog
}var l=function(){[m,k,d].each(function(o){o.value=o._defaultText||"";
o.className="low"
})
};
var f=function(o){var p=Event.element(o);
if(p._defaultText&&p.value.strip()==p._defaultText.strip()){p.value="";
p.className="high"
}};
var b=function(o){var p=Event.element(o);
if(p._defaultText&&p.value.strip()==""){p.value=p._defaultText;
p.className="low"
}};
this.elements.form=document.createElement("form");
this.elements.form.action=ORYX.CONFIG.ROOT_PATH+"feedback";
this.elements.form.method="POST";
this.elements.form.onsubmit=function(){try{var o=function(){Ext.Msg.alert(ORYX.I18N.Feedback.failure,ORYX.I18N.Feedback.failureMsg);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_DISABLE});
this.toggleDialog()
};
var r=function(s){if(s.status<200||s.status>=400){return o(s)
}this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.Feedback.success});
l()
};
this.elements.form.model.value=this.facade.getSerializedJSON();
this.elements.form.environment.value=this.getEnv();
var q={};
$A(this.elements.form.elements).each(function(s){q[s.name]=s.value
});
q.name=ORYX.Editor.Cookie.getParams().identifier;
q.subject=("["+q.subject+"] "+q.title);
this.facade.raiseEvent({type:ORYX.CONFIG.EVENT_LOADING_STATUS,text:ORYX.I18N.Feedback.sending});
new Ajax.Request(ORYX.CONFIG.ROOT_PATH+"feedback",{method:"POST",parameters:q,onSuccess:r.bind(this),onFailure:o.bind(this)});
this.toggleDialog()
}catch(p){o();
console.warn(p)
}return false
}.bind(this);
var n=document.createElement("div");
n.className="fieldset";
var i=document.createElement("input");
i.type="hidden";
i.name="subject";
i.style.display="none";
var m=document.createElement("textarea");
m._defaultText=ORYX.I18N.Feedback.descriptionDesc;
m.name="description";
Event.observe(m,"focus",f.bindAsEventListener());
Event.observe(m,"blur",b.bindAsEventListener());
var k=document.createElement("input");
k._defaultText=ORYX.I18N.Feedback.titleDesc;
k.type="text";
k.name="title";
Event.observe(k,"focus",f.bindAsEventListener());
Event.observe(k,"blur",b.bindAsEventListener());
var d=document.createElement("input");
d._defaultText=ORYX.I18N.Feedback.emailDesc;
d.type="text";
d.name="email";
Event.observe(d,"focus",f.bindAsEventListener());
Event.observe(d,"blur",b.bindAsEventListener());
var h=document.createElement("input");
h.type="button";
h.className="submit";
h.onclick=this.elements.form.onsubmit;
if(ORYX.I18N.Feedback.submit){h.value=ORYX.I18N.Feedback.submit
}var c=document.createElement("input");
c.name="environment";
c.type="hidden";
c.style.display="none";
var e=document.createElement("input");
e.name="model";
e.type="hidden";
e.style.display="none";
n.appendChild(i);
n.appendChild(m);
n.appendChild(k);
n.appendChild(d);
n.appendChild(c);
n.appendChild(e);
n.appendChild(h);
l();
var g=document.createElement("ul");
g.setAttribute("class","subjects");
var a=[];
$A(ORYX.I18N.Feedback.subjects).each(function(p,o){try{var r=document.createElement("li");
r._subject=p.id;
r.className=p.id;
r.innerHTML=p.name;
r.style.width=parseInt(100/$A(ORYX.I18N.Feedback.subjects).length)+"%";
a.push(r);
g.appendChild(r);
var q=function(){a.each(function(t){if(t.className.match(p.id)){t.className=t._subject+" active";
i.value=p.name;
if(m.value==m._defaultText){m.value=p.description
}m._defaultText=p.description;
if(p.info&&(""+p.info).strip().length>0){this.elements.info.innerHTML=p.info
}else{this.elements.info.innerHTML=ORYX.I18N.Feedback.info||""
}}else{t.className=t._subject
}}.bind(this))
}.bind(this);
Event.observe(r,"click",q);
if(o==(ORYX.I18N.Feedback.subjects.length-1)){m.value="";
m._defaultText="";
q()
}}catch(s){ORYX.Log.warn("Incomplete I10N for ORYX.I18N.Feedback.subjects",p,ORYX.I18N.Feedback.subjects)
}}.bind(this));
this.elements.form.appendChild(g);
this.elements.form.appendChild(n);
this.elements.info=document.createElement("div");
this.elements.info.setAttribute("class","info");
this.elements.info.innerHTML=ORYX.I18N.Feedback.info||"";
var j=document.createElement("div");
j.setAttribute("class","head");
this.elements.dialog=document.createElement("div");
this.elements.dialog.setAttribute("class","dialog");
this.elements.dialog.appendChild(j);
this.elements.dialog.appendChild(this.elements.info);
this.elements.dialog.appendChild(this.elements.form);
this.elements.container.appendChild(this.elements.dialog);
return this.elements.dialog
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