if(!ORYX.Plugins){ORYX.Plugins=new Object()
}ORYX.Plugins.ResourcesBoDAdd=Clazz.extend({facade:undefined,construct:function(a){this.facade=a;
this.active=false;
this.raisedEventIds=[];
this.facade.offer({name:ORYX.I18N.ResourcesBoDAdd.name,functionality:this.defineBoD.bind(this),group:ORYX.I18N.ResourcesBoDAdd.group,dropDownGroupIcon:ORYX.BASE_FILE_PATH+"images/bod.png",icon:ORYX.BASE_FILE_PATH+"images/bod+.png",description:ORYX.I18N.ResourcesBoDAdd.desc,index:3,toggle:false,minShape:2,maxShape:0})
},defineBoD:function(){var d=this.facade.getSelection();
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
h++){var c=[];
var b=false;
if(j[h].properties["oryx-bindingsofduties"]!=""){c=this.bindingsCheck(j[h],a);
if(c[3]==true){break
}}else{c[1]=0;
c[2]=0
}if(j[h].properties["oryx-separationofduties"]!=("")){b=this.separationsCheck(j[h],a);
if(b==true){break
}}this.writeEntry(c,a,j[h])
}}else{alert("Please select at least two tasks to define constraints for.")
}},bindingsCheck:function(c,q){var C=[];
var a=[];
var b=[];
var A=0;
var f=1;
var v=0;
var u=0;
var t=0;
var D=c.properties["oryx-bindingsofduties"];
D=D.toString();
var r=D.substring(0,D.indexOf("]"));
while(D.indexOf(",")>-1){if(v%2==1){a[u]=parseInt(D.substring((D.indexOf('"'))+1));
u++;
D=D.substring((D.indexOf(","))+1)
}else{if(v==0){A=parseInt(D.substring((D.indexOf(":"))+1));
D=D.substring((D.indexOf(","))+1)
}else{D=D.substring((D.indexOf('"'))+1);
b[t]=D.substring(0,D.indexOf('"'));
t++;
D=D.substring((D.indexOf(","))+1)
}}v++
}if(D.indexOf('"')>-1){b[t]=D.substring((D.indexOf('"'))+1)
}else{b[t]=D
}b[t]=b[t].substring(0,b[t].indexOf('"'));
var B=q;
var e=[];
var l=[];
var h=0;
var s=false;
while(B.indexOf(";")>-1){e[h]=B.substring(0,B.indexOf(";"));
B=B.substring((B.indexOf(";"))+2);
h++
}e[h]=B;
for(var d=0;
d<b.length;
d++){var g=0;
var k=0;
while(b[d].indexOf(";")>-1){l[g]=b[d].substring(0,b[d].indexOf(";"));
b[d]=b[d].substring((b[d].indexOf(";"))+2);
g++
}l[g]=b[d];
g++;
if(e.length==l.length){for(var i=0;
i<l.length;
i++){for(var p=0;
p<e.length;
p++){if(e[p]==l[i]){s=true;
break
}s=false
}if(s==false){break
}}}else{if(e.length>l.length){for(var i=0;
i<l.length;
i++){for(var p=0;
p<e.length;
p++){if(e[p]==l[i]){k++;
break
}}if(k==l.length){var o=this.deleteBindingEntry(c,(d+1));
r=o[0];
A=o[1];
k=0;
break
}}s=false
}else{for(var i=0;
i<e.length;
i++){for(var p=0;
p<l.length;
p++){if(l[p]==e[i]){s=true;
break
}s=false
}if(s==false){break
}}}}l.splice(0,l.length);
if(s==true){break
}}for(var d=0;
d<a.length;
d++){if(a[d]>f){f=a[d]
}}C[0]=r;
C[1]=A;
C[2]=f;
C[3]=s;
return C
},separationsCheck:function(c,h){var v;
var n=[];
var p=0;
var m=0;
var r=c.properties["oryx-separationofduties"];
r=r.toString();
while(r.indexOf(",")>-1){if(p%2==1){r=r.substring((r.indexOf(","))+1)
}else{if(p==0){r=r.substring((r.indexOf(","))+1)
}else{r=r.substring((r.indexOf('"'))+1);
n[m]=r.substring(0,r.indexOf('"'));
m++;
r=r.substring((r.indexOf(","))+1)
}}p++
}if(r.indexOf('"')>-1){n[m]=r.substring((r.indexOf('"'))+1)
}else{n[m]=r
}n[m]=n[m].substring(0,n[m].indexOf('"'));
var o=h;
var b=[];
var k=[];
var j=0;
var i=0;
var a=false;
while(o.indexOf(";")>-1){b[j]=o.substring(0,o.indexOf(";"));
o=o.substring((o.indexOf(";"))+2);
j++
}b[j]=o;
for(var d=0;
d<n.length;
d++){while(n[d].indexOf(";")>-1){k[i]=n[d].substring(0,n[d].indexOf(";"));
n[d]=n[d].substring((n[d].indexOf(";"))+2);
i++
}k[i]=n[d];
var u=0;
if(b.length>=k.length){for(var f=0;
f<k.length;
f++){for(var g=0;
g<b.length;
g++){if(b[g]==k[f]){u++;
if(u==2){a=true
}break
}a=false
}if(a==true){break
}}}else{for(var f=0;
f<b.length;
f++){for(var g=0;
g<k.length;
g++){if(k[g]==b[f]){u++;
if(u==2){a=true
}break
}a=false
}if(a==true){break
}}}if(a==true){var e=confirm("Do you want to delete the existing contradicting separation for allowing this binding constraint to be entered? Otherwise, this binding constraint will be discarded.");
if(e==true){this.findSeparationEntry(h);
a=false
}break
}}v=a;
return v
},writeEntry:function(a,c,b){if(a[1]>0){a[1]++;
a[2]++;
a[0]=a[0].substring((a[0].indexOf(":"))+2);
a[0]="{'totalCount':"+a[1]+a[0]+', {bodId:"'+a[2]+'", BoundTasks:"'+c+'"}]}'
}else{a[1]=1;
a[2]++;
a[0]="{'totalCount':"+a[1]+", 'items':[{bodId:\""+a[2]+'", BoundTasks:"'+c+'"}]}'
}b.setProperty("oryx-bindingsofduties",a[0])
},deleteBindingEntry:function(f,c){var d=[];
var h=f.properties["oryx-bindingsofduties"];
var g;
var b;
var a=parseInt(h.substring((h.indexOf(":"))+1));
a=a-1;
if(a>0){h=h.substring(h.indexOf("["));
g=h.substring(0,h.indexOf("{"));
h=h.substring(h.indexOf("{"));
b=h.substring(0,(h.indexOf('"'))+1);
h=h.substring((h.indexOf('"'))+1);
while(parseInt(h)!=c){g=g+b+h.substring(0,(h.indexOf("{"))-2);
h=h.substring((h.indexOf("{"))-2);
b=h.substring(0,((h.indexOf('"'))+1));
h=h.substring((h.indexOf('"'))+1)
}h=h.substring((h.indexOf("}"))+3);
var e="{'totalCount':"+a+", 'items':"+g+h+"]}";
f.setProperty("oryx-bindingsofduties",e);
e=e.toString();
e=e.substring(0,e.indexOf("]"))
}else{var e="";
f.setProperty("oryx-bindingsofduties",e)
}d[0]=e;
d[1]=a;
return d
},findSeparationEntry:function(b){var a=b;
var v=[];
var k=0;
while(a.indexOf(";")>-1){v[k]=a.substring(0,a.indexOf(";"));
a=a.substring((a.indexOf(";"))+2);
k++
}v[k]=a;
a=b+";";
for(var o=0;
o<v.length;
o++){var c=this.getTaskById(v[o]);
var p=c.properties["oryx-separationofduties"];
var l=[];
var u=0;
var r=0;
var q=0;
while(p.indexOf(",")>-1){if(r%2==1){p=p.substring((p.indexOf(","))+1)
}else{if(r==0){u=parseInt(p.substring((p.indexOf(":"))+1));
p=p.substring((p.indexOf(","))+1)
}else{p=p.substring((p.indexOf('"'))+1);
l[q]=p.substring(0,p.indexOf('"'));
q++;
p=p.substring((p.indexOf(","))+1)
}}r++
}if(p.indexOf('"')>-1){l[q]=p.substring((p.indexOf('"'))+1)
}else{l[q]=p
}l[q]=l[q].substring(0,l[q].indexOf('"'));
var w=[];
for(var d=0;
d<l.length;
d++){var n=l[d];
var h=0;
while(n.indexOf(";")>-1){w[h]=n.substring(0,n.indexOf(";"));
n=n.substring((n.indexOf(";"))+2);
h++
}w[h]=n;
if(v.length>=w.length){var g=0;
for(var f=0;
f<w.length;
f++){for(var e=0;
e<v.length;
e++){if(w[f]==v[e]){g++;
break
}}if(g==w.length){this.deleteSeparationEntry(c,(d+1));
break
}}}w.splice(0,w.length)
}}},deleteSeparationEntry:function(g,c){var e=g.properties["oryx-separationofduties"];
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
var f="{'totalCount':"+a+", 'items':"+d+e+"]}";
g.setProperty("oryx-separationofduties",f);
f=f.toString();
f=f.substring(0,f.indexOf("]"))
}else{var f="";
g.setProperty("oryx-separationofduties",f)
}},getTaskById:function(d){var a=this.facade.getCanvas().getChildShapes(true);
var b;
for(var c=0;
c<a.length;
c++){if(a[c].properties["oryx-activitytype"]=="Task"){if(a[c].properties["oryx-id"]==d){b=a[c];
break
}}}return b
}});