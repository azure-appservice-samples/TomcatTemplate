if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ResourcesSoDAdd=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.ResourcesSoDAdd.name,functionality:this.defineSoD.bind(this),group:ORYX.I18N.ResourcesSoDAdd.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/sod.png",icon:ORYX.BASE_FILE_PATH+"images/sod+.png",description:ORYX.I18N.ResourcesSoDAdd.desc,index:1,toggle:false,minShape:2,maxShape:0})
},defineSoD:function(){var d=this.facade.getSelection();
var j=[];
var a;
var e=0;
var g=d.length;
for(var f=0;
f<g;
f++){var k=d[f];
if(k.properties["oryx-activitytype"]=="Task"){j[e]=k;
if(j[e].properties["oryx-id"]==""){j[e].setProperty("oryx-id",j[e].id)
}if(e==0){a=j[e].properties["oryx-id"]
}else{a=a+"; "+j[e].properties["oryx-id"]
}e++
}}if(j.length>1){for(var h=0;
h<j.length;
h++){var b=[];
var c=false;
if(j[h].properties["oryx-separationofduties"]!=""){b=this.separationsCheck(j[h],a);
if(b[3]==true){break
}}else{b[1]=0;
b[2]=0
}if(j[h].properties["oryx-bindingsofduties"]!=("")){c=this.bindingsCheck(j[h],a);
if(c==true){break
}}this.writeEntry(b,a,j[h])
}}else{alert("Please select at least two tasks to define constraints for.")
}},separationsCheck:function(d,p){var D=[];
var a=[];
var b=[];
var C=0;
var f=1;
var B=0;
var v=0;
var t=0;
var A=d.properties["oryx-separationofduties"];
A=A.toString();
var s=A.substring(0,A.indexOf("]"));
while(A.indexOf(",")>-1){if(B%2==1){a[v]=parseInt(A.substring((A.indexOf('"'))+1));
v++;
A=A.substring((A.indexOf(","))+1)
}else{if(B==0){C=parseInt(A.substring((A.indexOf(":"))+1));
A=A.substring((A.indexOf(","))+1)
}else{A=A.substring((A.indexOf('"'))+1);
b[t]=A.substring(0,A.indexOf('"'));
t++;
A=A.substring((A.indexOf(","))+1)
}}B++
}if(A.indexOf('"')>-1){b[t]=A.substring((A.indexOf('"'))+1)
}else{b[t]=A
}b[t]=b[t].substring(0,b[t].indexOf('"'));
var u=p;
var c=[];
var q=[];
var h=0;
var r=false;
while(u.indexOf(";")>-1){c[h]=u.substring(0,u.indexOf(";"));
u=u.substring((u.indexOf(";"))+2);
h++
}c[h]=u;
for(var e=0;
e<b.length;
e++){var g=0;
var k=0;
while(b[e].indexOf(";")>-1){q[g]=b[e].substring(0,b[e].indexOf(";"));
b[e]=b[e].substring((b[e].indexOf(";"))+2);
g++
}q[g]=b[e];
g++;
if(c.length==q.length){for(var i=0;
i<q.length;
i++){for(var o=0;
o<c.length;
o++){if(c[o]==q[i]){r=true;
break
}r=false
}if(r==false){break
}}}else{if(c.length>q.length){for(var i=0;
i<q.length;
i++){for(var o=0;
o<c.length;
o++){if(c[o]==q[i]){k++;
break
}}if(k==q.length){var l=this.deleteSeparationEntry(d,(e+1));
s=l[0];
C=l[1];
k=0;
break
}}r=false
}else{for(var i=0;
i<c.length;
i++){for(var o=0;
o<q.length;
o++){if(q[o]==c[i]){r=true;
break
}r=false
}if(r==false){break
}}}}q.splice(0,q.length);
if(r==true){break
}}for(var e=0;
e<a.length;
e++){if(a[e]>f){f=a[e]
}}D[0]=s;
D[1]=C;
D[2]=f;
D[3]=r;
return D
},bindingsCheck:function(c,i){var u;
var n=[];
var o=0;
var m=0;
var v=c.properties["oryx-bindingsofduties"];
v=v.toString();
while(v.indexOf(",")>-1){if(o%2==1){v=v.substring((v.indexOf(","))+1)
}else{if(o==0){v=v.substring((v.indexOf(","))+1)
}else{v=v.substring((v.indexOf('"'))+1);
n[m]=v.substring(0,v.indexOf('"'));
m++;
v=v.substring((v.indexOf(","))+1)
}}o++
}if(v.indexOf('"')>-1){n[m]=v.substring((v.indexOf('"'))+1)
}else{n[m]=v
}n[m]=n[m].substring(0,n[m].indexOf('"'));
var p=i;
var e=[];
var b=[];
var k=0;
var j=0;
var a=false;
while(p.indexOf(";")>-1){e[k]=p.substring(0,p.indexOf(";"));
p=p.substring((p.indexOf(";"))+2);
k++
}e[k]=p;
for(var d=0;
d<n.length;
d++){while(n[d].indexOf(";")>-1){b[j]=n[d].substring(0,n[d].indexOf(";"));
n[d]=n[d].substring((n[d].indexOf(";"))+2);
j++
}b[j]=n[d];
var r=0;
if(e.length>=b.length){for(var g=0;
g<b.length;
g++){for(var h=0;
h<e.length;
h++){if(e[h]==b[g]){r++;
if(r==2){a=true
}break
}a=false
}if(a==true){break
}}}else{for(var g=0;
g<e.length;
g++){for(var h=0;
h<b.length;
h++){if(b[h]==e[g]){r++;
if(r==2){a=true
}break
}a=false
}if(a==true){break
}}}if(a==true){var f=confirm("Do you want to delete the existing contradicting binding for allowing this separation constraint to be entered? Otherwise, this separation constraint will be discarded.");
if(f==true){this.findBindingEntry(i);
a=false
}break
}}u=a;
return u
},writeEntry:function(a,c,b){if(a[1]>0){a[1]++;
a[2]++;
a[0]=a[0].substring((a[0].indexOf(":"))+2);
a[0]="{'totalCount':"+a[1]+a[0]+', {sodId:"'+a[2]+'", SeparatedTasks:"'+c+'"}]}'
}else{a[1]=1;
a[2]++;
a[0]="{'totalCount':"+a[1]+", 'items':[{sodId:\""+a[2]+'", SeparatedTasks:"'+c+'"}]}'
}b.setProperty("oryx-separationofduties",a[0])
},deleteSeparationEntry:function(h,c){var f=[];
var e=h.properties["oryx-separationofduties"];
var d;
var b;
var a=parseInt(e.substring((e.indexOf(":"))+1));
a=a-1;
if(a>0){e=e.substring(e.indexOf("["));
d=e.substring(0,e.indexOf("{"));
e=e.substring(e.indexOf("{"));
b=e.substring(0,(e.indexOf('"'))+1);
e=e.substring((e.indexOf('"'))+1);
while(parseInt(e)!=c){d=d+b+e.substring(0,(e.indexOf("{"))-2);
e=e.substring((e.indexOf("{"))-2);
b=e.substring(0,((e.indexOf('"'))+1));
e=e.substring((e.indexOf('"'))+1)
}e=e.substring((e.indexOf("}"))+3);
var g="{'totalCount':"+a+", 'items':"+d+e+"]}";
h.setProperty("oryx-separationofduties",g);
g=g.toString();
g=g.substring(0,g.indexOf("]"))
}else{var g="";
h.setProperty("oryx-separationofduties",g)
}f[0]=g;
f[1]=a;
return f
},findBindingEntry:function(b){var a=b;
var u=[];
var l=0;
while(a.indexOf(";")>-1){u[l]=a.substring(0,a.indexOf(";"));
a=a.substring((a.indexOf(";"))+2);
l++
}u[l]=a;
a=b+";";
for(var o=0;
o<u.length;
o++){var c=this.getTaskById(u[o]);
var w=c.properties["oryx-bindingsofduties"];
var n=[];
var r=0;
var q=0;
var p=0;
while(w.indexOf(",")>-1){if(q%2==1){w=w.substring((w.indexOf(","))+1)
}else{if(q==0){r=parseInt(w.substring((w.indexOf(":"))+1));
w=w.substring((w.indexOf(","))+1)
}else{w=w.substring((w.indexOf('"'))+1);
n[p]=w.substring(0,w.indexOf('"'));
p++;
w=w.substring((w.indexOf(","))+1)
}}q++
}if(w.indexOf('"')>-1){n[p]=w.substring((w.indexOf('"'))+1)
}else{n[p]=w
}n[p]=n[p].substring(0,n[p].indexOf('"'));
var d=[];
for(var e=0;
e<n.length;
e++){var v=n[e];
var k=0;
while(v.indexOf(";")>-1){d[k]=v.substring(0,v.indexOf(";"));
v=v.substring((v.indexOf(";"))+2);
k++
}d[k]=v;
if(u.length>=d.length){var h=0;
for(var g=0;
g<d.length;
g++){for(var f=0;
f<u.length;
f++){if(d[g]==u[f]){h++;
break
}}if(h==d.length){this.deleteBindingEntry(c,(e+1));
break
}}}d.splice(0,d.length)
}}},deleteBindingEntry:function(e,c){var g=e.properties["oryx-bindingsofduties"];
var f;
var b;
var a=parseInt(g.substring((g.indexOf(":"))+1));
a=a-1;
if(a>0){g=g.substring(g.indexOf("["));
f=g.substring(0,g.indexOf("{"));
g=g.substring(g.indexOf("{"));
b=g.substring(0,(g.indexOf('"'))+1);
g=g.substring((g.indexOf('"'))+1);
while(parseInt(g)!=c){f=f+b+g.substring(0,(g.indexOf("{"))-2);
g=g.substring((g.indexOf("{"))-2);
b=g.substring(0,((g.indexOf('"'))+1));
g=g.substring((g.indexOf('"'))+1)
}g=g.substring((g.indexOf("}"))+3);
var d="{'totalCount':"+a+", 'items':"+f+g+"]}";
e.setProperty("oryx-bindingsofduties",d);
d=d.toString();
d=d.substring(0,d.indexOf("]"))
}else{var d="";
e.setProperty("oryx-bindingsofduties",d)
}},getTaskById:function(d){var a=this.facade.getCanvas().getChildShapes(true);
var b;
for(var c=0;
c<a.length;
c++){if(a[c].properties["oryx-activitytype"]=="Task"){if(a[c].properties["oryx-id"]==d){b=a[c];
break
}}}return b
}});