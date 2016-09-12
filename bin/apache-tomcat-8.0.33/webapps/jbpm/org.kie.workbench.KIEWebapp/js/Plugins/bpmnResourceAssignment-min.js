if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ResourceAssignment=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.ResourceAssignment.name,functionality:this.assignResource.bind(this),group:ORYX.I18N.ResourceAssignment.group,icon:ORYX.BASE_FILE_PATH+"images/hr.png",description:ORYX.I18N.ResourceAssignment.desc,index:0,toggle:false,minShape:1,maxShape:0})
},assignResource:function(){var c=this.facade.getSelection();
var l=[];
var g=[];
var d=0;
var h=c.length;
for(var f=0;
f<h;
f++){var n=c[f];
if(n.properties["oryx-activitytype"]=="Task"){l[d]=n;
if(l[d].properties["oryx-id"]==""){l[d].setProperty("oryx-id",l[d].id)
}d++
}}var b=this.handleAllocationTypeData(l[0].properties["oryx-id"]);
if(b[0]!=null){var m=b[0];
var j=b[1];
if(m!="--automatic execution--"){var a=new Ext.Window({frame:true,title:ORYX.I18N.ResourceAssignment.chooseResource,width:600,modal:true,closable:false,plain:true,items:{xtype:"checkbox",boxLabel:m.resource[0].resource,name:"checkbox0"},buttons:[{text:ORYX.I18N.Dictionary.select,handler:function(){a.close();
g=this.getCheckedValues(a);
this.writeAssignments(g,l,j)
}.bind(this)},{text:ORYX.I18N.Save.close,handler:function(){a.close()
}.bind(this)}]});
var e;
var k;
for(var f=1;
f<m.resource.length;
f++){k="checkbox"+f;
e=new Ext.form.Checkbox({boxLabel:m.resource[f].resource,name:k});
a.add(e)
}a.show()
}else{g[0]=m;
this.writeAssignments(g,l,j)
}}},getResourceData:function(a){var b;
new Ajax.Request(ORYX.CONFIG.ROOT_PATH+"resourceList",{method:"POST",asynchronous:false,parameters:{allocation:a},onSuccess:function(c){b=c.responseText.evalJSON();
returnValue=b
}.bind(this)});
return b
},getCheckedValues:function(b){var a=[];
var d=0;
for(var c=0;
c<b.items.items.length;
c++){if(b.items.items[c].checked==true){a[d]=b.items.items[c].boxLabel;
d++
}}return a
},writeAssignments:function(b,l,h){for(var k=0;
k<l.length;
k++){var f;
var a=l[k];
if(a.properties["oryx-resourceassignments"]!=""){var i=a.properties["oryx-resourceassignments"].evalJSON();
var o=parseInt(i.totalCount)+b.length;
var g=i.items.toArray();
for(var e=0;
e<b.length;
e++){for(var d=0;
d<g.length;
d++){if(g[d].assignmentName==b[e]){if(g[d].assignmentType==h){b.splice(e,1);
o--;
e--;
break
}}}}f="{'totalCount':"+o+", 'items':[{assignmentType:\""+g[0].assignmentType+'", assignmentName:"'+g[0].assignmentName+'"}';
for(var j=1;
j<g.length;
j++){f=f+', {assignmentType:"'+g[j].assignmentType+'", assignmentName:"'+g[j].assignmentName+'"}'
}for(var j=0;
j<b.length;
j++){f=f+', {assignmentType:"'+h+'", assignmentName:"'+b[j]+'"}'
}f=f+"]}"
}else{f="{'totalCount':"+b.length+", 'items':[{assignmentType:\""+h+'", assignmentName:"'+b[0]+'"}';
for(var j=1;
j<b.length;
j++){f=f+', {assignmentType:"'+h+'", assignmentName:"'+b[j]+'"}'
}f=f+"]}"
}a.setProperty("oryx-resourceassignments",f)
}},handleAllocationTypeData:function(a){var b=[];
var d;
var c=prompt("for task "+a+"\n1: direct, \n2: role, \n3: org, \n4: auto");
if(c!="1"&&c!="2"&&c!="3"&&c!="4"&&c!=null){alert(ORYX.I18N.ResourceAssignment.wrongEntry);
b=this.handleAllocationTypeData(a)
}else{if(c=="1"){d=this.getResourceData("direct");
c="Single User"
}else{if(c=="2"){d=this.getResourceData("functional");
c="Functional Role"
}else{if(c=="3"){d=this.getResourceData("organisational");
c="Organisational Role"
}else{if(c=="4"){d="--automatic execution--";
c="Automatic Execution"
}else{if(c==null){d=null
}}}}}b[0]=d;
b[1]=c
}return b
},getSavedAssignmentsData:function(c){var b=[];
var f=[];
var k=0;
var h=1;
var e=0;
var d=0;
var a=c.properties["oryx-resourceassignments"];
a=a.toString();
var i=a.substring(0,a.indexOf("]"));
while(a.indexOf(",")>-1){if(e%2==1){f[d]=parseInt(a.substring((a.indexOf('"'))+1));
d++;
a=a.substring((a.indexOf(","))+1)
}else{if(e==0){k=parseInt(a.substring((a.indexOf(":"))+1));
a=a.substring((a.indexOf(","))+1)
}else{a=a.substring((a.indexOf(","))+1)
}}e++
}for(var g=0;
g<f.length;
g++){if(f[g]>h){h=f[g]
}}b[0]=i;
b[1]=k;
b[2]=h;
return b
}});