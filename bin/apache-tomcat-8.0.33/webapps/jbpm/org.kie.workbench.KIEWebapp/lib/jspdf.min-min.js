!function(b,f){f["true"]=b;
var h=function(k){function l(i){var o={};
this.subscribe=function(n,v,u){if("function"!=typeof v){return !1
}o.hasOwnProperty(n)||(o[n]={});
var q=Math.random().toString(35);
return o[n][q]=[v,!!u],q
},this.unsubscribe=function(n){for(var q in o){if(o[q][n]){return delete o[q][n],!0
}}return !1
},this.publish=function(v){if(o.hasOwnProperty(v)){var t=Array.prototype.slice.call(arguments,1),q=[];
for(var w in o[v]){var e=o[v][w];
try{e[0].apply(i,t)
}catch(n){k.console&&console.error("jsPDF PubSub Error",n.message,n)
}e[1]&&q.push(w)
}q.length&&q.forEach(this.unsubscribe)
}}
}function p(a6,aS,a3,aW){var a1={};
"object"==typeof a6&&(a1=a6,a6=a1.orientation,aS=a1.unit||aS,a3=a1.format||a3,aW=a1.compress||a1.compressPdf||aW),aS=aS||"mm",a3=a3||"a4",a6=(""+(a6||"P")).toLowerCase();
var a2,aZ,aU,aV,aP,a0,aM,aR,a4,aT=((""+a3).toLowerCase(),!!aW&&"function"==typeof Uint8Array),aO=a1.textColor||"0 g",aX=a1.drawColor||"0 G",a8=a1.fontSize||16,az=a1.lineHeight||1.15,aw=a1.lineWidth||0.200025,ad=2,at=!1,aL=[],ac={},ao={},ay=0,ai=[],ah={},af=[],ar=0,av=0,ab=0,aj={title:"",subject:"",author:"",keywords:"",creator:""},al={},aY=new l(al),ak=function(q){return q.toFixed(2)
},ap=function(q){return q.toFixed(3)
},aq=function(q){return("0"+parseInt(q)).slice(-2)
},s=function(q){at?ai[aV].push(q):(ab+=q.length+1,af.push(q))
},t=function(){return ad++,aL[ad]=ab,s(ad+" 0 obj"),ad
},an=function(q){s("stream"),s(q),s("endstream")
},o=function(){var z,q,x,v,C,D,B,w,y;
for(B=k.adler32cs||p.adler32cs,aT&&"undefined"==typeof B&&(aT=!1),z=1;
ay>=z;
z++){if(t(),w=(aP=ah[z].width)*aZ,y=(a0=ah[z].height)*aZ,s("<</Type /Page"),s("/Parent 1 0 R"),s("/Resources 2 0 R"),s("/MediaBox [0 0 "+ak(w)+" "+ak(y)+"]"),s("/Contents "+(ad+1)+" 0 R>>"),s("endobj"),q=ai[z].join("\n"),t(),aT){for(x=[],v=q.length;
v--;
){x[v]=q.charCodeAt(v)
}D=B.from(q),C=new c(6),C.append(new Uint8Array(x)),q=C.flush(),x=new Uint8Array(q.length+6),x.set(new Uint8Array([120,156])),x.set(q,2),x.set(new Uint8Array([255&D,D>>8&255,D>>16&255,D>>24&255]),q.length+2),q=String.fromCharCode.apply(null,x),s("<</Length "+q.length+" /Filter [/FlateDecode]>>")
}else{s("<</Length "+q.length+">>")
}an(q),s("endobj")
}aL[1]=ab,s("1 0 obj"),s("<</Type /Pages");
var A="/Kids [";
for(v=0;
ay>v;
v++){A+=3+2*v+" 0 R "
}s(A+"]"),s("/Count "+ay),s(">>"),s("endobj")
},n=function(q){q.objectNumber=t(),s("<</BaseFont/"+q.PostScriptName+"/Type/Font"),"string"==typeof q.encoding&&s("/Encoding/"+q.encoding),s("/Subtype/Type1>>"),s("endobj")
},am=function(){for(var q in ac){ac.hasOwnProperty(q)&&n(ac[q])
}},ag=function(){aY.publish("putXobjectDict")
},aF=function(){s("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),s("/Font <<");
for(var q in ac){ac.hasOwnProperty(q)&&s("/"+q+" "+ac[q].objectNumber+" 0 R")
}s(">>"),s("/XObject <<"),ag(),s(">>")
},i=function(){am(),aY.publish("putResources"),aL[2]=ab,s("2 0 obj"),s("<<"),aF(),s(">>"),s("endobj"),aY.publish("postPutResources")
},r=function(q,u,v){ao.hasOwnProperty(u)||(ao[u]={}),ao[u][v]=q
},a5=function(u,x,y,w){var v="F"+(Object.keys(ac).length+1).toString(10),q=ac[v]={id:v,PostScriptName:u,fontName:x,fontStyle:y,encoding:w,metadata:{}};
return r(v,x,y),aY.publish("addFont",q),v
},e=function(){for(var F="helvetica",A="times",w="courier",q="normal",G="bold",y="italic",v="bolditalic",D="StandardEncoding",E=[["Helvetica",F,q],["Helvetica-Bold",F,G],["Helvetica-Oblique",F,y],["Helvetica-BoldOblique",F,v],["Courier",w,q],["Courier-Bold",w,G],["Courier-Oblique",w,y],["Courier-BoldOblique",w,v],["Times-Roman",A,q],["Times-Bold",A,G],["Times-Italic",A,y],["Times-BoldItalic",A,v]],C=0,x=E.length;
x>C;
C++){var z=a5(E[C][0],E[C][1],E[C][2],D),B=E[C][0].split("-");
r(z,B[0],B[1]||"")
}aY.publish("addFonts",{fonts:ac,dictionary:ao})
},aN=function(q){return q.foo=function(){try{return q.apply(this,arguments)
}catch(w){var v=w.stack||"";
~v.indexOf(" at ")&&(v=v.split(" at ")[1]);
var u="Error in function "+v.split("\n")[0].split("<")[0]+": "+w.message;
if(!k.console){throw new Error(u)
}k.console.error(u,w),k.alert&&alert(u)
}},q.foo.bar=q,q.foo
},aD=function(D,z){var w,q,E,y,v,B,C,A,x;
if(z=z||{},E=z.sourceEncoding||"Unicode",v=z.outputEncoding,(z.autoencode||v)&&ac[a2].metadata&&ac[a2].metadata[E]&&ac[a2].metadata[E].encoding&&(y=ac[a2].metadata[E].encoding,!v&&ac[a2].encoding&&(v=ac[a2].encoding),!v&&y.codePages&&(v=y.codePages[0]),"string"==typeof v&&(v=y[v]),v)){for(C=!1,B=[],w=0,q=D.length;
q>w;
w++){A=v[D.charCodeAt(w)],B.push(A?String.fromCharCode(A):D[w]),B[w].charCodeAt(0)>>8&&(C=!0)
}D=B.join("")
}for(w=D.length;
void 0===C&&0!==w;
){D.charCodeAt(w-1)>>8&&(C=!0),w--
}if(!C){return D
}for(B=z.noBOM?[]:[254,255],w=0,q=D.length;
q>w;
w++){if(A=D.charCodeAt(w),x=A>>8,x>>8){throw new Error("Character at position "+w+" of string '"+D+"' exceeds 16bits. Cannot be encoded into UCS-2 BE")
}B.push(x),B.push(A-(x<<8))
}return String.fromCharCode.apply(void 0,B)
},aI=function(q,u){return aD(q,u).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")
},aK=function(){s("/Producer (jsPDF "+p.version+")");
for(var v in aj){aj.hasOwnProperty(v)&&aj[v]&&s("/"+v.substr(0,1).toUpperCase()+v.substr(1)+" ("+aI(aj[v])+")")
}var y=new Date,x=y.getTimezoneOffset(),w=0>x?"+":"-",u=Math.floor(Math.abs(x/60)),z=Math.abs(x%60),q=[w,aq(u),"'",aq(z),"'"].join("");
s(["/CreationDate (D:",y.getFullYear(),aq(y.getMonth()+1),aq(y.getDate()),aq(y.getHours()),aq(y.getMinutes()),aq(y.getSeconds()),q,")"].join(""))
},au=function(){switch(s("/Type /Catalog"),s("/Pages 1 0 R"),aR||(aR="fullwidth"),aR){case"fullwidth":s("/OpenAction [3 0 R /FitH null]");
break;
case"fullheight":s("/OpenAction [3 0 R /FitV null]");
break;
case"fullpage":s("/OpenAction [3 0 R /Fit]");
break;
case"original":s("/OpenAction [3 0 R /XYZ null null 1]");
break;
default:var q=""+aR;
"%"===q.substr(q.length-1)&&(aR=parseInt(aR)/100),"number"==typeof aR&&s("/OpenAction [3 0 R /XYZ null null "+ak(aR)+"]")
}switch(a4||(a4="continuous"),a4){case"continuous":s("/PageLayout /OneColumn");
break;
case"single":s("/PageLayout /SinglePage");
break;
case"two":case"twoleft":s("/PageLayout /TwoColumnLeft");
break;
case"tworight":s("/PageLayout /TwoColumnRight")
}aM&&s("/PageMode /"+aM),aY.publish("putCatalog")
},aQ=function(){s("/Size "+(ad+1)),s("/Root "+ad+" 0 R"),s("/Info "+(ad-1)+" 0 R")
},aG=function(q,v){var w="string"==typeof v&&v.toLowerCase();
if("string"==typeof q){var u=q.toLowerCase();
m.hasOwnProperty(u)&&(q=m[u][0]/aZ,v=m[u][1]/aZ)
}if(Array.isArray(q)&&(v=q[1],q=q[0]),w){switch(w.substr(0,1)){case"l":v>q&&(w="s");
break;
case"p":q>v&&(w="s")
}"s"===w&&(aU=q,q=v,v=aU)
}at=!0,ai[++ay]=[],ah[ay]={width:Number(q)||aP,height:Number(v)||a0},aH(ay)
},aJ=function(){aG.apply(this,arguments),s(ak(aw*aZ)+" w"),s(aX),0!==ar&&s(ar+" J"),0!==av&&s(av+" j"),aY.publish("addPage",{pageNumber:ay})
},aH=function(q){q>0&&ay>=q&&(aV=q,aP=ah[q].width,a0=ah[q].height)
},ax=function(q,v){var w;
q=void 0!==q?q:ac[a2].fontName,v=void 0!==v?v:ac[a2].fontStyle;
try{w=ao[q][v]
}catch(u){}if(!w){throw new Error("Unable to look up font label for font '"+q+"', '"+v+"'. Refer to getFontList() for available fonts.")
}return w
},a7=function(){at=!1,ad=2,af=[],aL=[],s("%PDF-"+j),o(),i(),t(),s("<<"),aK(),s(">>"),s("endobj"),t(),s("<<"),au(),s(">>"),s("endobj");
var q,u=ab,v="0000000000";
for(s("xref"),s("0 "+(ad+1)),s(v+" 65535 f "),q=1;
ad>=q;
q++){s((v+aL[q]).slice(-10)+" 00000 n ")
}return s("trailer"),s("<<"),aQ(),s(">>"),s("startxref"),s(u),s("%%EOF"),at=!0,af.join("\n")
},aC=function(q){var u="S";
return"F"===q?u="f":"FD"===q||"DF"===q?u="B":("f"===q||"f*"===q||"B"===q||"B*"===q)&&(u=q),u
},aB=function(){for(var q=a7(),v=q.length,w=new ArrayBuffer(v),u=new Uint8Array(w);
v--;
){u[v]=q.charCodeAt(v)
}return w
},aa=function(){return new Blob([aB()],{type:"application/pdf"})
},aA=aN(function(v,w){var u="dataur"===(""+v).substr(0,6)?"data:application/pdf;base64,"+btoa(a7()):0;
switch(v){case void 0:return a7();
case"save":if(navigator.getUserMedia&&(void 0===k.URL||void 0===k.URL.createObjectURL)){return al.output("dataurlnewwindow")
}d(aa(),w),"function"==typeof d.unload&&k.setTimeout&&setTimeout(d.unload,911);
break;
case"arraybuffer":return aB();
case"blob":return aa();
case"bloburi":case"bloburl":return k.URL&&k.URL.createObjectURL(aa())||void 0;
case"datauristring":case"dataurlstring":return u;
case"dataurlnewwindow":var q=k.open(u);
if(q||"undefined"==typeof safari){return q
}case"datauri":case"dataurl":return k.document.location.href=u;
default:throw new Error('Output type "'+v+'" is not supported.')
}});
switch(aS){case"pt":aZ=1;
break;
case"mm":aZ=72/25.4;
break;
case"cm":aZ=72/2.54;
break;
case"in":aZ=72;
break;
case"px":aZ=96/72;
break;
case"pc":aZ=12;
break;
case"em":aZ=12;
break;
case"ex":aZ=6;
break;
default:throw"Invalid unit: "+aS
}al.internal={pdfEscape:aI,getStyle:aC,getFont:function(){return ac[ax.apply(al,arguments)]
},getFontSize:function(){return a8
},getLineHeight:function(){return a8*az
},write:function(q){s(1===arguments.length?q:Array.prototype.join.call(arguments," "))
},getCoordinateString:function(q){return ak(q*aZ)
},getVerticalCoordinateString:function(q){return ak((a0-q)*aZ)
},collections:{},newObject:t,putStream:an,events:aY,scaleFactor:aZ,pageSize:{get widthfunction(){return aP
},get heightfunction(){return a0
}},output:function(q,u){return aA(q,u)
},getNumberOfPages:function(){return ai.length-1
},pages:ai},al.addPage=function(){return aJ.apply(this,arguments),this
},al.setPage=function(){return aH.apply(this,arguments),this
},al.setDisplayMode=function(q,u,v){return aR=q,a4=u,aM=v,this
},al.text=function(K,D,z,q,L){function C(u){return u=u.split("	").join(Array(a1.TabLen||9).join(" ")),aI(u,q)
}"number"==typeof K&&(aU=z,z=D,D=K,K=aU),"string"==typeof K&&K.match(/[\n\r]/)&&(K=K.split(/\r\n|\r|\n/g)),"number"==typeof q&&(L=q,q=null);
var x,G="",J="Td";
if(L){L*=Math.PI/180;
var E=Math.cos(L),B=Math.sin(L);
G=[ak(E),ak(B),ak(-1*B),ak(E),""].join(" "),J="Tm"
}if(q=q||{},"noBOM" in q||(q.noBOM=!0),"autoencode" in q||(q.autoencode=!0),"string"==typeof K){K=C(K)
}else{if(!(K instanceof Array)){throw new Error('Type of text must be string or Array. "'+K+'" is not recognized.')
}for(var A=K.concat(),H=[],F=A.length;
F--;
){H.push(C(A.shift()))
}var I=Math.ceil((a0-z)*aZ/(a8*az));
I>=0&&I<H.length+1&&(x=H.splice(I-1)),K=H.join(") Tj\nT* (")
}return s("BT\n/"+a2+" "+a8+" Tf\n"+a8*az+" TL\n"+aO+"\n"+G+ak(D*aZ)+" "+ak((a0-z)*aZ)+" "+J+"\n("+K+") Tj\nET"),x&&(this.addPage(),this.text(x,D,1.7*a8/aZ)),this
},al.lstext=function(u,x,y,w){for(var v=0,q=u.length;
q>v;
v++,x+=w){this.text(u[v],x,y)
}},al.line=function(q,v,w,u){return this.lines([[w-q,u-v]],q,v)
},al.clip=function(){s("W"),s("S")
},al.lines=function(M,E,z,q,N,C){var x,I,L,G,B,D,F,A,J,H,K;
for("number"==typeof M&&(aU=z,z=E,E=M,M=aU),q=q||[1,1],s(ap(E*aZ)+" "+ap((a0-z)*aZ)+" m "),x=q[0],I=q[1],G=M.length,H=E,K=z,L=0;
G>L;
L++){B=M[L],2===B.length?(H=B[0]*x+H,K=B[1]*I+K,s(ap(H*aZ)+" "+ap((a0-K)*aZ)+" l")):(D=B[0]*x+H,F=B[1]*I+K,A=B[2]*x+H,J=B[3]*I+K,H=B[4]*x+H,K=B[5]*I+K,s(ap(D*aZ)+" "+ap((a0-F)*aZ)+" "+ap(A*aZ)+" "+ap((a0-J)*aZ)+" "+ap(H*aZ)+" "+ap((a0-K)*aZ)+" c"))
}return C&&s(" h"),null!==N&&s(aC(N)),this
},al.rect=function(q,w,x,v,u){aC(u);
return s([ak(q*aZ),ak((a0-w)*aZ),ak(x*aZ),ak(-v*aZ),"re"].join(" ")),null!==u&&s(aC(u)),this
},al.triangle=function(u,x,z,w,v,q,y){return this.lines([[z-u,w-x],[v-z,q-w],[u-v,x-q]],u,x,[1,1],y,!0),this
},al.roundedRect=function(v,y,A,x,w,u,z){var q=4/3*(Math.SQRT2-1);
return this.lines([[A-2*w,0],[w*q,0,w,u-u*q,w,u],[0,x-2*u],[0,u*q,-(w*q),u,-w,u],[-A+2*w,0],[-(w*q),0,-w,-(u*q),-w,-u],[0,-x+2*u],[0,-(u*q),w*q,-u,w,-u]],v+w,y,[1,1],z),this
},al.ellipse=function(u,x,z,w,v){var q=4/3*(Math.SQRT2-1)*z,y=4/3*(Math.SQRT2-1)*w;
return s([ak((u+z)*aZ),ak((a0-x)*aZ),"m",ak((u+z)*aZ),ak((a0-(x-y))*aZ),ak((u+q)*aZ),ak((a0-(x-w))*aZ),ak(u*aZ),ak((a0-(x-w))*aZ),"c"].join(" ")),s([ak((u-q)*aZ),ak((a0-(x-w))*aZ),ak((u-z)*aZ),ak((a0-(x-y))*aZ),ak((u-z)*aZ),ak((a0-x)*aZ),"c"].join(" ")),s([ak((u-z)*aZ),ak((a0-(x+y))*aZ),ak((u-q)*aZ),ak((a0-(x+w))*aZ),ak(u*aZ),ak((a0-(x+w))*aZ),"c"].join(" ")),s([ak((u+q)*aZ),ak((a0-(x+w))*aZ),ak((u+z)*aZ),ak((a0-(x+y))*aZ),ak((u+z)*aZ),ak((a0-x)*aZ),"c"].join(" ")),null!==v&&s(aC(v)),this
},al.circle=function(q,v,w,u){return this.ellipse(q,v,w,w,u)
},al.setProperties=function(q){for(var u in aj){aj.hasOwnProperty(u)&&q[u]&&(aj[u]=q[u])
}return this
},al.setFontSize=function(q){return a8=q,this
},al.setFont=function(q,u){return a2=ax(q,u),this
},al.setFontStyle=al.setFontType=function(q){return a2=ax(void 0,q),this
},al.getFontList=function(){var q,v,w,u={};
for(q in ao){if(ao.hasOwnProperty(q)){u[q]=w=[];
for(v in ao[q]){ao[q].hasOwnProperty(v)&&w.push(v)
}}}return u
},al.setLineWidth=function(q){return s((q*aZ).toFixed(2)+" w"),this
},al.setDrawColor=function(q,w,x,v){var u;
return u=void 0===w||void 0===v&&q===w===x?"string"==typeof q?q+" G":ak(q/255)+" G":void 0===v?"string"==typeof q?[q,w,x,"RG"].join(" "):[ak(q/255),ak(w/255),ak(x/255),"RG"].join(" "):"string"==typeof q?[q,w,x,v,"K"].join(" "):[ak(q),ak(w),ak(x),ak(v),"K"].join(" "),s(u),this
},al.setFillColor=function(q,w,x,v){var u;
return u=void 0===w||void 0===v&&q===w===x?"string"==typeof q?q+" g":ak(q/255)+" g":void 0===v?"string"==typeof q?[q,w,x,"rg"].join(" "):[ak(q/255),ak(w/255),ak(x/255),"rg"].join(" "):"string"==typeof q?[q,w,x,v,"k"].join(" "):[ak(q),ak(w),ak(x),ak(v),"k"].join(" "),s(u),this
},al.setTextColor=function(q,v,w){if("string"==typeof q&&/^#[0-9A-Fa-f]{6}$/.test(q)){var u=parseInt(q.substr(1),16);
q=u>>16&255,v=u>>8&255,w=255&u
}return aO=0===q&&0===v&&0===w||"undefined"==typeof v?ap(q/255)+" g":[ap(q/255),ap(v/255),ap(w/255),"rg"].join(" "),this
},al.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2},al.setLineCap=function(q){var u=this.CapJoinStyles[q];
if(void 0===u){throw new Error("Line cap style of '"+q+"' is not recognized. See or extend .CapJoinStyles property for valid styles")
}return ar=u,s(u+" J"),this
},al.setLineJoin=function(q){var u=this.CapJoinStyles[q];
if(void 0===u){throw new Error("Line join style of '"+q+"' is not recognized. See or extend .CapJoinStyles property for valid styles")
}return av=u,s(u+" j"),this
},al.output=aA,al.save=function(q){al.output("save",q)
};
for(var aE in p.API){p.API.hasOwnProperty(aE)&&("events"===aE&&p.API.events.length?!function(q,w){var x,v,u;
for(u=w.length-1;
-1!==u;
u--){x=w[u][0],v=w[u][1],q.subscribe.apply(q,[x].concat("function"==typeof v?[v]:v))
}}(aY,p.API.events):al[aE]=p.API[aE])
}return e(),a2="F1",aJ(a3,a6),aY.publish("initialized"),al
}var j="1.3",m={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};
return p.API={events:[]},p.version="1.0.272-git 2014-09-29T15:09:diegocr","function"==typeof define&&define.amd?define("jsPDF",function(){return p
}):k.jsPDF=p,p
}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this);
!function(e){e.addHTML=function(x,p,l,j,y){if("undefined"==typeof html2canvas&&"undefined"==typeof rasterizeHTML){throw new Error("You need either https://github.com/niklasvh/html2canvas or https://github.com/cburgmer/rasterizeHTML.js")
}"number"!=typeof p&&(j=p,y=l),"function"==typeof j&&(y=j,j=null);
var m=this.internal,k=m.scaleFactor,v=m.pageSize.width,w=m.pageSize.height;
if(j=j||{},j.onrendered=function(C){p=parseInt(p)||0,l=parseInt(l)||0;
var s=j.dim||{},B=s.h||0,r=s.w||Math.min(v,C.width/k)-p,z="JPEG";
if(j.format&&(z=j.format),C.height>w&&j.pagesplit){var A=function(){for(var D=0;
;
){var t=document.createElement("canvas");
t.width=Math.min(v*k,C.width),t.height=Math.min(w*k,C.height-D);
var F=t.getContext("2d");
F.drawImage(C,0,D,C.width,t.height,0,0,t.width,t.height);
var E=[t,p,D?0:l,t.width/k,t.height/k,z,null,"SLOW"];
if(this.addImage.apply(this,E),D+=t.height,D>=C.height){break
}this.addPage()
}y(r,D,null,E)
}.bind(this);
if("CANVAS"===C.nodeName){var u=new Image;
u.onload=A,u.src=C.toDataURL("image/png"),C=u
}else{A()
}}else{var n=Math.random().toString(35),o=[C,p,l,r,B,z,n,"SLOW"];
this.addImage.apply(this,o),y(r,B,n,o)
}}.bind(this),"undefined"!=typeof html2canvas&&!j.rstz){return html2canvas(x,j)
}if("undefined"!=typeof rasterizeHTML){var q="drawDocument";
return"string"==typeof x&&(q=/^http/.test(x)?"drawURL":"drawHTML"),j.width=j.width||v*k,rasterizeHTML[q](x,void 0,j).then(function(i){j.onrendered(i.image)
},function(i){y(null,i)
})
}return null
}
}(h.API),function(z){var L="addImage_",E=["jpeg","jpg","png"],B=function(Q){var r=this.internal.newObject(),m=this.internal.write,R=this.internal.putStream;
if(Q.n=r,m("<</Type /XObject"),m("/Subtype /Image"),m("/Width "+Q.w),m("/Height "+Q.h),Q.cs===this.color_spaces.INDEXED?m("/ColorSpace [/Indexed /DeviceRGB "+(Q.pal.length/3-1)+" "+("smask" in Q?r+2:r+1)+" 0 R]"):(m("/ColorSpace /"+Q.cs),Q.cs===this.color_spaces.DEVICE_CMYK&&m("/Decode [1 0 1 0 1 0 1 0]")),m("/BitsPerComponent "+Q.bpc),"f" in Q&&m("/Filter /"+Q.f),"dp" in Q&&m("/DecodeParms <<"+Q.dp+">>"),"trns" in Q&&Q.trns.constructor==Array){for(var p="",l=0,w=Q.trns.length;
w>l;
l++){p+=Q.trns[l]+" "+Q.trns[l]+" "
}m("/Mask ["+p+"]")
}if("smask" in Q&&m("/SMask "+(r+1)+" 0 R"),m("/Length "+Q.data.length+">>"),R(Q.data),m("endobj"),"smask" in Q){var y="/Predictor 15 /Colors 1 /BitsPerComponent "+Q.bpc+" /Columns "+Q.w,v={w:Q.w,h:Q.h,cs:"DeviceGray",bpc:Q.bpc,dp:y,data:Q.smask};
"f" in Q&&(v.f=Q.f),B.call(this,v)
}Q.cs===this.color_spaces.INDEXED&&(this.internal.newObject(),m("<< /Length "+Q.pal.length+">>"),R(this.arrayBufferToBinaryString(new Uint8Array(Q.pal))),m("endobj"))
},A=function(){var e=this.internal.collections[L+"images"];
for(var i in e){B.call(this,e[i])
}},H=function(){var e,m=this.internal.collections[L+"images"],l=this.internal.write;
for(var i in m){e=m[i],l("/I"+e.i,e.n,"0","R")
}},D=function(i){return i&&"string"==typeof i&&(i=i.toUpperCase()),i in z.image_compression?i:z.image_compression.NONE
},P=function(){var e=this.internal.collections[L+"images"];
return e||(this.internal.collections[L+"images"]=e={},this.internal.events.subscribe("putResources",A),this.internal.events.subscribe("putXobjectDict",H)),e
},x=function(i){var l=0;
return i&&(l=Object.keys?Object.keys(i).length:function(m){var o=0;
for(var p in m){m.hasOwnProperty(p)&&o++
}return o
}(i)),l
},N=function(e){return"undefined"==typeof e||null===e
},G=function(i){return"string"==typeof i&&z.sHashCode(i)
},K=function(e){return -1===E.indexOf(e)
},M=function(i){return"function"!=typeof z["process"+i.toUpperCase()]
},I=function(e){return"object"==typeof e&&1===e.nodeType
},C=function(Z,U,y){if("IMG"===Z.nodeName&&Z.hasAttribute("src")){var m=""+Z.getAttribute("src");
if(!y&&0===m.indexOf("data:image/")){return m
}!U&&/\.png(?:[?#].*)?$/i.test(m)&&(U="png")
}if("CANVAS"===Z.nodeName){var aa=Z
}else{var aa=document.createElement("canvas");
aa.width=Z.clientWidth||Z.width,aa.height=Z.clientHeight||Z.height;
var R=aa.getContext("2d");
if(!R){throw"addImage requires canvas to be supported by browser."
}if(y){var w,X,Y,W,Q,T,V,S,v=Math.PI/180;
"object"==typeof y&&(w=y.x,X=y.y,Y=y.bg,y=y.angle),S=y*v,W=Math.abs(Math.cos(S)),Q=Math.abs(Math.sin(S)),T=aa.width,V=aa.height,aa.width=V*Q+T*W,aa.height=V*W+T*Q,isNaN(w)&&(w=aa.width/2),isNaN(X)&&(X=aa.height/2),R.clearRect(0,0,aa.width,aa.height),R.fillStyle=Y||"white",R.fillRect(0,0,aa.width,aa.height),R.save(),R.translate(w,X),R.rotate(S),R.drawImage(Z,-(T/2),-(V/2)),R.rotate(-S),R.translate(-w,-X),R.restore()
}else{R.drawImage(Z,0,0,aa.width,aa.height)
}}return aa.toDataURL("png"==(""+U).toLowerCase()?"image/png":"image/jpeg")
},F=function(i,m){var o;
if(m){for(var l in m){if(i===m[l].alias){o=m[l];
break
}}}return o
},k=function(i,l,m){return i||l||(i=-96,l=-96),0>i&&(i=-1*m.w*72/i/this.internal.scaleFactor),0>l&&(l=-1*m.h*72/l/this.internal.scaleFactor),0===i&&(i=l*m.w/m.h),0===l&&(l=i*m.h/m.w),[i,l]
},J=function(S,w,p,l,T,v,m){var Q=k.call(this,p,l,T),R=this.internal.getCoordinateString,y=this.internal.getVerticalCoordinateString;
p=Q[0],l=Q[1],m[v]=T,this.internal.write("q",R(p),"0 0",R(l),R(S),y(w+l),"cm /I"+T.i,"Do Q")
};
z.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPERATION:"Seperation",DEVICE_N:"DeviceN"},z.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"},z.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"},z.sHashCode=function(e){return Array.prototype.reduce&&e.split("").reduce(function(i,l){return i=(i<<5)-i+l.charCodeAt(0),i&i
},0)
},z.isString=function(e){return"string"==typeof e
},z.extractInfoFromBase64DataURI=function(e){return/^data:([\w]+?\/([\w]+?));base64,(.+?)$/g.exec(e)
},z.supportsArrayBuffer=function(){return"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array
},z.isArrayBuffer=function(e){return this.supportsArrayBuffer()?e instanceof ArrayBuffer:!1
},z.isArrayBufferView=function(e){return this.supportsArrayBuffer()?"undefined"==typeof Uint32Array?!1:e instanceof Int8Array||e instanceof Uint8Array||"undefined"!=typeof Uint8ClampedArray&&e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array:!1
},z.binaryStringToUint8Array=function(i){for(var m=i.length,o=new Uint8Array(m),l=0;
m>l;
l++){o[l]=i.charCodeAt(l)
}return o
},z.arrayBufferToBinaryString=function(i){this.isArrayBuffer(i)&&(i=new Uint8Array(i));
for(var m="",o=i.byteLength,l=0;
o>l;
l++){m+=String.fromCharCode(i[l])
}return m
},z.arrayBufferToBase64=function(W){for(var R,v,m,X,y,p="",U="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",V=new Uint8Array(W),T=V.byteLength,w=T%3,Q=T-w,S=0;
Q>S;
S+=3){y=V[S]<<16|V[S+1]<<8|V[S+2],R=(16515072&y)>>18,v=(258048&y)>>12,m=(4032&y)>>6,X=63&y,p+=U[R]+U[v]+U[m]+U[X]
}return 1==w?(y=V[Q],R=(252&y)>>2,v=(3&y)<<4,p+=U[R]+U[v]+"=="):2==w&&(y=V[Q]<<8|V[Q+1],R=(64512&y)>>10,v=(1008&y)>>4,m=(15&y)<<2,p+=U[R]+U[v]+U[m]+"="),p
},z.createImageInfo=function(W,R,v,m,X,y,p,U,V,T,w,Q){var S={alias:U,w:R,h:v,cs:m,bpc:X,i:p,data:W};
return y&&(S.f=y),V&&(S.dp=V),T&&(S.trns=T),w&&(S.pal=w),Q&&(S.smask=Q),S
},z.addImage=function(X,Q,l,Y,u,U,S,W,R){if("string"!=typeof Q){var n=U;
U=u,u=Y,Y=l,l=Q,Q=n
}if("object"==typeof X&&!I(X)&&"imageData" in X){var T=X;
X=T.imageData,Q=T.format||Q,l=T.x||l||0,Y=T.y||Y||0,u=T.w||u,U=T.h||U,S=T.alias||S,W=T.compression||W,R=T.rotation||T.angle||R
}if(isNaN(l)||isNaN(Y)){throw console.error("jsPDF.addImage: Invalid coordinates",arguments),new Error("Invalid coordinates passed to jsPDF.addImage")
}var p,V=P.call(this);
if(!(p=F(X,V))){var o;
if(I(X)&&(X=C(X,Q,R)),N(S)&&(S=G(X)),!(p=F(S,V))){if(this.isString(X)){var m=this.extractInfoFromBase64DataURI(X);
m?(Q=m[2],X=atob(m[3])):137===X.charCodeAt(0)&&80===X.charCodeAt(1)&&78===X.charCodeAt(2)&&71===X.charCodeAt(3)&&(Q="png")
}if(Q=(Q||"JPEG").toLowerCase(),K(Q)){throw new Error("addImage currently only supports formats "+E+", not '"+Q+"'")
}if(M(Q)){throw new Error("please ensure that the plugin for '"+Q+"' support is added")
}if(this.supportsArrayBuffer()&&(o=X,X=this.binaryStringToUint8Array(X)),p=this["process"+Q.toUpperCase()](X,x(V),S,D(W),o),!p){throw new Error("An unkwown error occurred whilst processing the image")
}}}return J.call(this,l,Y,u,U,p,p.i,V),this
};
var j=function(m){var v,y,u;
if(255===!m.charCodeAt(0)||216===!m.charCodeAt(1)||255===!m.charCodeAt(2)||224===!m.charCodeAt(3)||!m.charCodeAt(6)==="J".charCodeAt(0)||!m.charCodeAt(7)==="F".charCodeAt(0)||!m.charCodeAt(8)==="I".charCodeAt(0)||!m.charCodeAt(9)==="F".charCodeAt(0)||0===!m.charCodeAt(10)){throw new Error("getJpegSize requires a binary string jpeg file")
}for(var p=256*m.charCodeAt(4)+m.charCodeAt(5),l=4,w=m.length;
w>l;
){if(l+=p,255!==m.charCodeAt(l)){throw new Error("getJpegSize could not find the size of the image")
}if(192===m.charCodeAt(l+1)||193===m.charCodeAt(l+1)||194===m.charCodeAt(l+1)||195===m.charCodeAt(l+1)||196===m.charCodeAt(l+1)||197===m.charCodeAt(l+1)||198===m.charCodeAt(l+1)||199===m.charCodeAt(l+1)){return y=256*m.charCodeAt(l+5)+m.charCodeAt(l+6),v=256*m.charCodeAt(l+7)+m.charCodeAt(l+8),u=m.charCodeAt(l+9),[v,y,u]
}l+=2,p=256*m.charCodeAt(l)+m.charCodeAt(l+1)
}},q=function(R){var w=R[0]<<8|R[1];
if(65496!==w){throw new Error("Supplied data is not a JPEG")
}for(var p,l,S,v,m=R.length,y=(R[4]<<8)+R[5],Q=4;
m>Q;
){if(Q+=y,p=O(R,Q),y=(p[2]<<8)+p[3],(192===p[1]||194===p[1])&&255===p[0]&&y>7){return p=O(R,Q+5),l=(p[2]<<8)+p[3],S=(p[0]<<8)+p[1],v=p[4],{width:l,height:S,numcomponents:v}
}Q+=2
}throw new Error("getJpegSizeFromBytes could not find the size of the image")
},O=function(i,l){return i.subarray(l,l+5)
};
z.processJPEG=function(R,w,p,l,S){var v,m=this.color_spaces.DEVICE_RGB,y=this.decode.DCT_DECODE,Q=8;
return this.isString(R)?(v=j(R),this.createImageInfo(R,v[0],v[1],1==v[3]?this.color_spaces.DEVICE_GRAY:m,Q,y,w,p)):(this.isArrayBuffer(R)&&(R=new Uint8Array(R)),this.isArrayBufferView(R)?(v=q(R),R=S||this.arrayBufferToBinaryString(R),this.createImageInfo(R,v.width,v.height,1==v.numcomponents?this.color_spaces.DEVICE_GRAY:m,Q,y,w,p)):null)
},z.processJPG=function(){return this.processJPEG.apply(this,arguments)
}
}(h.API),function(e){e.autoPrint=function(){var i;
return this.internal.events.subscribe("postPutResources",function(){i=this.internal.newObject(),this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj")
}),this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+i+" 0 R")
}),this
}
}(h.API),function(A){var w,m,j,B,q=3,k=13,y={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},z=1,x=function(i,u,C,o,l){y={x:i,y:u,w:C,h:o,ln:l}
},p=function(){return y
},v={left:0,top:0,bottom:0};
A.setHeaderFunction=function(e){B=e
},A.getTextDimensions=function(l){w=this.internal.getFont().fontName,m=this.table_font_size||this.internal.getFontSize(),j=this.internal.getFont().fontStyle;
var n,e,r=19.049976/25.4;
return e=document.createElement("font"),e.id="jsPDFCell",e.style.fontStyle=j,e.style.fontName=w,e.style.fontSize=m+"pt",e.textContent=l,document.body.appendChild(e),n={w:(e.offsetWidth+1)*r,h:(e.offsetHeight+1)*r},document.body.removeChild(e),n
},A.cellAddPage=function(){var e=this.margins||v;
this.addPage(),x(e.left,e.top,void 0,void 0),z+=1
},A.cellInitialize=function(){y={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},z=1
},A.cell=function(J,E,o,i,K,G,I){var F=p();
if(void 0!==F.ln){if(F.ln===G){J=F.x+F.w,E=F.y
}else{var D=this.margins||v;
F.y+F.h+i+k>=this.internal.pageSize.height-D.bottom&&(this.cellAddPage(),this.printHeaders&&this.tableHeaderRow&&this.printHeaderRow(G,!0)),E=p().y+p().h
}}if(void 0!==K[0]){if(this.printingHeaderRow?this.rect(J,E,o,i,"FD"):this.rect(J,E,o,i),"right"===I){if(K instanceof Array){for(var l=0;
l<K.length;
l++){var C=K[l],H=this.getStringUnitWidth(C)*this.internal.getFontSize();
this.text(C,J+o-H-q,E+this.internal.getLineHeight()*(l+1))
}}}else{this.text(K,J+q,E+this.internal.getLineHeight())
}}return x(J,E,o,i,G),this
},A.arrayMax=function(o,D){var E,C,u,l=o[0];
for(E=0,C=o.length;
C>E;
E+=1){u=o[E],D?-1===D(l,u)&&(l=u):u>l&&(l=u)
}return l
},A.table=function(aa,R,M,K,X){if(!M){throw"No data for PDF table"
}var Q,ac,V,ab,Y,P,U,H,Z,F,I=[],ad=[],N={},G={},W=[],ae=[],O=!1,L=!0,u=12,J=v;
if(J.width=this.internal.pageSize.width,X&&(X.autoSize===!0&&(O=!0),X.printHeaders===!1&&(L=!1),X.fontSize&&(u=X.fontSize),X.margins&&(J=X.margins)),this.lnMod=0,y={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},z=1,this.printHeaders=L,this.margins=J,this.setFontSize(u),this.table_font_size=u,void 0===K||null===K){I=Object.keys(M[0])
}else{if(K[0]&&"string"!=typeof K[0]){var D=19.049976/25.4;
for(ac=0,V=K.length;
V>ac;
ac+=1){Q=K[ac],I.push(Q.name),ad.push(Q.prompt),G[Q.name]=Q.width*D
}}else{I=K
}}if(O){for(F=function(e){return e[Q]
},ac=0,V=I.length;
V>ac;
ac+=1){for(Q=I[ac],N[Q]=M.map(F),W.push(this.getTextDimensions(ad[ac]||Q).w),P=N[Q],U=0,ab=P.length;
ab>U;
U+=1){Y=P[U],W.push(this.getTextDimensions(Y).w)
}G[Q]=A.arrayMax(W)
}}if(L){var t=this.calculateLineHeight(I,G,ad.length?ad:I);
for(ac=0,V=I.length;
V>ac;
ac+=1){Q=I[ac],ae.push([aa,R,G[Q],t,String(ad.length?ad[ac]:Q)])
}this.setTableHeaderRow(ae),this.printHeaderRow(1,!1)
}for(ac=0,V=M.length;
V>ac;
ac+=1){var t;
for(H=M[ac],t=this.calculateLineHeight(I,G,H),U=0,Z=I.length;
Z>U;
U+=1){Q=I[U],this.cell(aa,R,G[Q],t,H[Q],ac+2,Q.align)
}}return this.lastCellPos=y,this.table_x=aa,this.table_y=R,this
},A.calculateLineHeight=function(l,D,F){for(var C,u=0,E=0;
E<l.length;
E++){C=l[E],F[C]=this.splitTextToSize(String(F[C]),D[C]-q);
var i=this.internal.getLineHeight()*F[C].length+q;
i>u&&(u=i)
}return u
},A.setTableHeaderRow=function(e){this.tableHeaderRow=e
},A.printHeaderRow=function(D,F){if(!this.tableHeaderRow){throw"Property tableHeaderRow does not exist."
}var H,E,C,G;
if(this.printingHeaderRow=!0,void 0!==B){var u=B(this,z);
x(u[0],u[1],u[2],u[3],-1)
}this.setFontStyle("bold");
var s=[];
for(C=0,G=this.tableHeaderRow.length;
G>C;
C+=1){this.setFillColor(200,200,200),H=this.tableHeaderRow[C],F&&(H[1]=this.margins&&this.margins.top||0,s.push(H)),E=[].concat(H),this.cell.apply(this,E.concat(D))
}s.length>0&&this.setTableHeaderRow(s),this.setFontStyle("normal"),this.printingHeaderRow=!1
}
}(h.API),function(A){var N,G,C,B,J,F,R,z,P,I,M,O,K,E,H,k,L,j,x;
N=function(){function e(){}return function(i){return e.prototype=i,new e
}
}(),P=function(p){var v,y,u,q,m,w,l;
for(y=0,u=p.length,v=void 0,q=!1,w=!1;
!q&&y!==u;
){v=p[y]=p[y].trimLeft(),v&&(q=!0),y++
}for(y=u-1;
u&&!w&&-1!==y;
){v=p[y]=p[y].trimRight(),v&&(w=!0),y--
}for(m=/\s+$/g,l=!0,y=0;
y!==u;
){v=p[y].replace(/\s+/g," "),l&&(v=v.trimLeft()),v&&(l=m.test(v)),p[y]=v,y++
}return p
},I=function(i,m,o,l){return this.pdf=i,this.x=m,this.y=o,this.settings=l,this.watchFunctions=[],this.init(),this
},M=function(i){var m,o,l;
for(m=void 0,l=i.split(","),o=l.shift();
!m&&o;
){m=C[o.trim().toLowerCase()],o=l.shift()
}return m
},O=function(i){i="auto"===i?"0px":i,i.indexOf("em")>-1&&!isNaN(Number(i.replace("em","")))&&(i=18.719*Number(i.replace("em",""))+"px"),i.indexOf("pt")>-1&&!isNaN(Number(i.replace("pt","")))&&(i=1.333*Number(i.replace("pt",""))+"px");
var m,o,l;
return o=void 0,m=16,(l=K[i])?l:(l={"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0}[{css_line_height_string:i}],l!==o?K[i]=l/m:(l=parseFloat(i))?K[i]=l/m:(l=i.match(/([\d\.]+)(px)/),K[i]=3===l.length?parseFloat(l[1])/m:1))
},z=function(i){var m,o,l;
return l=function(n){var p;
return p=function(e){return document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(e,null):e.currentStyle?e.currentStyle:e.style
}(n),function(e){return e=e.replace(/-\D/g,function(q){return q.charAt(1).toUpperCase()
}),p[e]
}
}(i),m={},o=void 0,m["font-family"]=M(l("font-family"))||"times",m["font-style"]=B[l("font-style")]||"normal",m["text-align"]=TextAlignMap[l("text-align")]||"left",o=J[l("font-weight")]||"normal","bold"===o&&(m["font-style"]="normal"===m["font-style"]?o:o+m["font-style"]),m["font-size"]=O(l("font-size"))||1,m["line-height"]=O(l("line-height"))||1,m.display="inline"===l("display")?"inline":"block",o="block"===m.display,m["margin-top"]=o&&O(l("margin-top"))||0,m["margin-bottom"]=o&&O(l("margin-bottom"))||0,m["padding-top"]=o&&O(l("padding-top"))||0,m["padding-bottom"]=o&&O(l("padding-bottom"))||0,m["margin-left"]=o&&O(l("margin-left"))||0,m["margin-right"]=o&&O(l("margin-right"))||0,m["padding-left"]=o&&O(l("padding-left"))||0,m["padding-right"]=o&&O(l("padding-right"))||0,m["float"]=F[l("cssFloat")]||"none",m.clear=R[l("clear")]||"none",m
},E=function(p,v,y){var u,q,m,w,l;
if(m=!1,q=void 0,w=void 0,l=void 0,u=y["#"+p.id]){if("function"==typeof u){m=u(p,v)
}else{for(q=0,w=u.length;
!m&&q!==w;
){m=u[q](p,v),q++
}}}if(u=y[p.nodeName],!m&&u){if("function"==typeof u){m=u(p,v)
}else{for(q=0,w=u.length;
!m&&q!==w;
){m=u[q](p,v),q++
}}}return m
},x=function(W,S){var q,m,X,w,p,U,V,T,v,y;
for(q=[],m=[],X=0,y=W.rows[0].cells.length,T=W.clientWidth;
y>X;
){v=W.rows[0].cells[X],m[X]={name:v.textContent.toLowerCase().replace(/\s+/g,""),prompt:v.textContent.replace(/\r?\n/g,""),width:v.clientWidth/T*S.pdf.internal.pageSize.width},X++
}for(X=1;
X<W.rows.length;
){for(U=W.rows[X],p={},w=0;
w<U.cells.length;
){p[m[w].name]=U.cells[w].textContent.replace(/\r?\n/g,""),w++
}q.push(p),X++
}return V={rows:q,headers:m}
};
var Q={SCRIPT:1,STYLE:1,NOSCRIPT:1,OBJECT:1,EMBED:1,SELECT:1},D=1;
G=function(X,ak,aa){var Y,ag,ad,an,am,ae,aj,al,ah;
for(ag=X.childNodes,Y=void 0,ad=z(X),am="block"===ad.display,am&&(ak.setBlockBoundary(),ak.setBlockStyle(ad)),aj=19.049976/25.4,an=0,ae=ag.length;
ae>an;
){if(Y=ag[an],"object"==typeof Y){if(ak.executeWatchFunctions(Y),1===Y.nodeType&&"HEADER"===Y.nodeName){var V=Y,ai=ak.pdf.margins_doc.top;
ak.pdf.internal.events.subscribe("addPage",function(){ak.y=ai,G(V,ak,aa),ak.pdf.margins_doc.top=ak.y+10,ak.y+=10
},!1)
}if(8===Y.nodeType&&"#comment"===Y.nodeName){~Y.textContent.indexOf("ADD_PAGE")&&(ak.pdf.addPage(),ak.y=ak.pdf.margins_doc.top)
}else{if(1!==Y.nodeType||Q[Y.nodeName]){if(3===Y.nodeType){var u=Y.nodeValue;
if(Y.nodeValue&&"LI"===Y.parentNode.nodeName){if("OL"===Y.parentNode.parentNode.nodeName){u=D+++". "+u
}else{var U=16*ad["font-size"],af=2;
U>20&&(af=3),ah=function(i,l){this.pdf.circle(i,l,af,"FD")
}
}}ak.addText(u,ad)
}else{"string"==typeof Y&&ak.addText(Y,ad)
}}else{var ao;
if("IMG"===Y.nodeName){var ac=Y.getAttribute("src");
ao=H[ak.pdf.sHashCode(ac)||ac]
}if(ao){ak.pdf.internal.pageSize.height-ak.pdf.margins_doc.bottom<ak.y+Y.height&&ak.y>ak.pdf.margins_doc.top&&(ak.pdf.addPage(),ak.y=ak.pdf.margins_doc.top,ak.executeWatchFunctions(Y));
var Z=z(Y),n=ak.x,W=12/ak.pdf.internal.scaleFactor,q=(Z["margin-left"]+Z["padding-left"])*W,m=(Z["margin-right"]+Z["padding-right"])*W,v=(Z["margin-top"]+Z["padding-top"])*W,ab=(Z["margin-bottom"]+Z["padding-bottom"])*W;
n+=void 0!==Z["float"]&&"right"===Z["float"]?ak.settings.width-Y.width-m:q,ak.pdf.addImage(ao,n,ak.y+v,Y.width,Y.height),ao=void 0,"right"===Z["float"]||"left"===Z["float"]?(ak.watchFunctions.push(function(e,o,l,i){return ak.y>=o?(ak.x+=e,ak.settings.width+=l,!0):i&&1===i.nodeType&&!Q[i.nodeName]&&ak.x+i.width>ak.pdf.margins_doc.left+ak.pdf.margins_doc.width?(ak.x+=e,ak.y=o,ak.settings.width+=l,!0):!1
}.bind(this,"left"===Z["float"]?-Y.width-q-m:0,ak.y+Y.height+v+ab,Y.width)),ak.watchFunctions.push(function(e,l,i){return ak.y<e&&l===ak.pdf.internal.getNumberOfPages()?1===i.nodeType&&"both"===z(i).clear?(ak.y=e,!0):!1:!0
}.bind(this,ak.y+Y.height,ak.pdf.internal.getNumberOfPages())),ak.settings.width-=Y.width+q+m,"left"===Z["float"]&&(ak.x+=Y.width+q+m)):ak.y+=Y.height+ab
}else{if("TABLE"===Y.nodeName){al=x(Y,ak),ak.y+=10,ak.pdf.table(ak.x,ak.y,al.rows,al.headers,{autoSize:!1,printHeaders:!0,margins:ak.pdf.margins_doc}),ak.y=ak.pdf.lastCellPos.y+ak.pdf.lastCellPos.h+20
}else{if("OL"===Y.nodeName||"UL"===Y.nodeName){D=1,E(Y,ak,aa)||G(Y,ak,aa),ak.y+=10
}else{if("LI"===Y.nodeName){var p=ak.x;
ak.x+="UL"===Y.parentNode.nodeName?22:10,ak.y+=3,E(Y,ak,aa)||G(Y,ak,aa),ak.x=p
}else{"BR"===Y.nodeName?ak.y+=ad["font-size"]*ak.pdf.internal.scaleFactor:E(Y,ak,aa)||G(Y,ak,aa)
}}}}}}}an++
}return am?ak.setBlockBoundary(ah):void 0
},H={},k=function(T,v,p,l){function U(){v.pdf.internal.events.publish("imagesLoaded"),l(m)
}function q(o,u,s){if(o){var e=new Image;
m=++w,e.crossOrigin="",e.onerror=e.onload=function(){if(e.complete&&(0===e.src.indexOf("data:image/")&&(e.width=u||e.width||0,e.height=s||e.height||0),e.width+e.height)){var i=v.pdf.sHashCode(o)||o;
H[i]=H[i]||e
}--w||U()
},e.src=o
}}for(var m,y=T.getElementsByTagName("img"),S=y.length,w=0;
S--;
){q(y[S].getAttribute("src"),y[S].width,y[S].height)
}return w||U()
},L=function(T,v,m){var U=T.getElementsByTagName("footer");
if(U.length>0){U=U[0];
var q=v.pdf.internal.write,n=v.y;
v.pdf.internal.write=function(){},G(U,v,m);
var y=Math.ceil(v.y-n)+5;
v.y=n,v.pdf.internal.write=q,v.pdf.margins_doc.bottom+=y;
for(var S=function(r){var l=void 0!==r?r.pageNumber:1,s=v.y;
v.y=v.pdf.internal.pageSize.height-v.pdf.margins_doc.bottom,v.pdf.margins_doc.bottom-=y;
for(var e=U.getElementsByTagName("span"),V=0;
V<e.length;
++V){(" "+e[V].className+" ").replace(/[\n\t]/g," ").indexOf(" pageCounter ")>-1&&(e[V].innerHTML=l),(" "+e[V].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&(e[V].innerHTML="###jsPDFVarTotalPages###")
}G(U,v,m),v.pdf.margins_doc.bottom+=y,v.y=s
},w=U.getElementsByTagName("span"),p=0;
p<w.length;
++p){(" "+w[p].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&v.pdf.internal.events.subscribe("htmlRenderingFinished",v.pdf.putTotalPages.bind(v.pdf,"###jsPDFVarTotalPages###"),!0)
}v.pdf.internal.events.subscribe("addPage",S,!1),S(),Q.FOOTER=1
}},j=function(p,w,v,q,n,y){if(!w){return !1
}"string"==typeof w||w.parentNode||(w=""+w.innerHTML),"string"==typeof w&&(w=function(i){var S,T,u,o;
return u="jsPDFhtmlText"+Date.now().toString()+(1000*Math.random()).toFixed(0),o="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;",T=document.createElement("div"),T.style.cssText=o,T.innerHTML='<iframe style="height:1px;width:1px" name="'+u+'" />',document.body.appendChild(T),S=window.frames[u],S.document.body.innerHTML=i,S.document.body
}(w.replace(/<\/?script[^>]*?>/gi,"")));
var l,m=new I(p,v,q,n);
return k.call(this,w,m,n.elementHandlers,function(e){L(w,m,n.elementHandlers),G(w,m,n.elementHandlers),m.pdf.internal.events.publish("htmlRenderingFinished"),l=m.dispose(),"function"==typeof y?y(l):e&&console.error("jsPDF Warning: rendering issues? provide a callback to fromHTML!")
}),l||{x:m.x,y:m.y}
},I.prototype.init=function(){return this.paragraph={text:[],style:[]},this.pdf.internal.write("q")
},I.prototype.dispose=function(){return this.pdf.internal.write("Q"),{x:this.x,y:this.y,ready:!0}
},I.prototype.executeWatchFunctions=function(i){var m=!1,o=[];
if(this.watchFunctions.length>0){for(var l=0;
l<this.watchFunctions.length;
++l){this.watchFunctions[l](i)===!0?m=!0:o.push(this.watchFunctions[l])
}this.watchFunctions=o
}return m
},I.prototype.splitFragmentsIntoLines=function(V,ab){var X,W,ae,aa,al,U,aj,ad,ah,ai,af,Z,ac,S,ag;
for(W=12,af=this.pdf.internal.scaleFactor,al={},ae=void 0,ai=void 0,aa=void 0,U=void 0,ag=void 0,ah=void 0,ad=void 0,aj=void 0,Z=[],ac=[Z],X=0,S=this.settings.width;
V.length;
){if(U=V.shift(),ag=ab.shift(),U){if(ae=ag["font-family"],ai=ag["font-style"],aa=al[ae+ai],aa||(aa=this.pdf.internal.getFont(ae,ai).metadata.Unicode,al[ae+ai]=aa),ah={widths:aa.widths,kerning:aa.kerning,fontSize:ag["font-size"]*W,textIndent:X},ad=this.pdf.getStringUnitWidth(U,ah)*ah.fontSize/af,X+ad>S){for(aj=this.pdf.splitTextToSize(U,S,ah),Z.push([aj.shift(),ag]);
aj.length;
){Z=[[aj.shift(),ag]],ac.push(Z)
}X=this.pdf.getStringUnitWidth(Z[0][0],ah)*ah.fontSize/af
}else{Z.push([U,ag]),X+=ad
}}}if(void 0!==ag["text-align"]&&("center"===ag["text-align"]||"right"===ag["text-align"]||"justify"===ag["text-align"])){for(var e=0;
e<ac.length;
++e){var T=this.pdf.getStringUnitWidth(ac[e][0][0],ah)*ah.fontSize/af;
e>0&&(ac[e][0][1]=N(ac[e][0][1]));
var ak=S-T;
if("right"===ag["text-align"]){ac[e][0][1]["margin-left"]=ak
}else{if("center"===ag["text-align"]){ac[e][0][1]["margin-left"]=ak/2
}else{if("justify"===ag["text-align"]){var Y=ac[e][0][0].split(" ").length-1;
ac[e][0][1]["word-spacing"]=ak/Y,e===ac.length-1&&(ac[e][0][1]["word-spacing"]=0)
}}}}}return ac
},I.prototype.RenderTextFragment=function(i,o){var p,m,l;
l=0,p=12,this.pdf.internal.pageSize.height-this.pdf.margins_doc.bottom<this.y+this.pdf.internal.getFontSize()&&(this.pdf.internal.write("ET","Q"),this.pdf.addPage(),this.y=this.pdf.margins_doc.top,this.pdf.internal.write("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td"),l=Math.max(l,o["line-height"],o["font-size"]),this.pdf.internal.write(0,(-1*p*l).toFixed(2),"Td")),m=this.pdf.internal.getFont(o["font-family"],o["font-style"]),void 0!==o["word-spacing"]&&o["word-spacing"]>0&&this.pdf.internal.write(o["word-spacing"].toFixed(2),"Tw"),this.pdf.internal.write("/"+m.id,(p*o["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(i)+") Tj"),void 0!==o["word-spacing"]&&this.pdf.internal.write(0,"Tw")
},I.prototype.renderParagraph=function(V){var ah,aa,X,W,ad,Z,ak,U,ac,ag,ai,ae,Y,ab,S;
if(W=P(this.paragraph.text),ab=this.paragraph.style,ah=this.paragraph.blockstyle,Y=this.paragraph.blockstyle||{},this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:ah},W.join("").trim()){U=this.splitFragmentsIntoLines(W,ab),ak=void 0,ac=void 0,aa=12,X=aa/this.pdf.internal.scaleFactor,ae=(Math.max((ah["margin-top"]||0)-(Y["margin-bottom"]||0),0)+(ah["padding-top"]||0))*X,ai=((ah["margin-bottom"]||0)+(ah["padding-bottom"]||0))*X,ag=this.pdf.internal.write,ad=void 0,Z=void 0,this.y+=ae,ag("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");
for(var af=0;
U.length;
){for(ak=U.shift(),ac=0,ad=0,Z=ak.length;
ad!==Z;
){ak[ad][0].trim()&&(ac=Math.max(ac,ak[ad][1]["line-height"],ak[ad][1]["font-size"]),S=7*ak[ad][1]["font-size"]),ad++
}var q=0;
for(void 0!==ak[0][1]["margin-left"]&&ak[0][1]["margin-left"]>0&&(wantedIndent=this.pdf.internal.getCoordinateString(ak[0][1]["margin-left"]),q=wantedIndent-af,af=wantedIndent),ag(q,(-1*aa*ac).toFixed(2),"Td"),ad=0,Z=ak.length;
ad!==Z;
){ak[ad][0]&&this.RenderTextFragment(ak[ad][0],ak[ad][1]),ad++
}if(this.y+=ac*X,this.executeWatchFunctions(ak[0][1])&&U.length>0){var T=[],aj=[];
U.forEach(function(i){for(var l=0,m=i.length;
l!==m;
){i[l][0]&&(T.push(i[l][0]+" "),aj.push(i[l][1])),++l
}}),U=this.splitFragmentsIntoLines(P(T),aj),ag("ET","Q"),ag("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td")
}}return V&&"function"==typeof V&&V.call(this,this.x-9,this.y-S/2),ag("ET","Q"),this.y+=ai
}},I.prototype.setBlockBoundary=function(e){return this.renderParagraph(e)
},I.prototype.setBlockStyle=function(e){return this.paragraph.blockstyle=e
},I.prototype.addText=function(i,l){return this.paragraph.text.push(i),this.paragraph.style.push(l)
},C={helvetica:"helvetica","sans-serif":"helvetica","times new roman":"times",serif:"times",times:"times",monospace:"courier",courier:"courier"},J={100:"normal",200:"normal",300:"normal",400:"normal",500:"bold",600:"bold",700:"bold",800:"bold",900:"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"},B={normal:"normal",italic:"italic",oblique:"italic"},TextAlignMap={left:"left",right:"right",center:"center",justify:"justify"},F={none:"none",right:"right",left:"left"},R={none:"none",both:"both"},K={normal:1},A.fromHTML=function(m,q,u,p,o,l){return this.margins_doc=l||{top:0,bottom:0},p||(p={}),p.elementHandlers||(p.elementHandlers={}),j(this,m,isNaN(q)?4:q,isNaN(u)?4:u,p,o)
}
}(h.API),function(i){var k,l,j;
i.addJS=function(e){return j=e,this.internal.events.subscribe("postPutResources",function(){k=this.internal.newObject(),this.internal.write("<< /Names [(EmbeddedJS) "+(k+1)+" 0 R] >>","endobj"),l=this.internal.newObject(),this.internal.write("<< /S /JavaScript /JS (",j,") >>","endobj")
}),this.internal.events.subscribe("putCatalog",function(){void 0!==k&&void 0!==l&&this.internal.write("/Names <</JavaScript "+k+" 0 R>>")
}),this
}
}(h.API),function(I){var B=function(){return"function"!=typeof PNG||"function"!=typeof g
},o=function(i){return i!==I.image_compression.NONE&&j()
},j=function(){var e="function"==typeof c;
if(!e){throw new Error("requires deflate.js for compression")
}return e
},v=function(O,J,p,M){var u=5,L=C;
switch(M){case I.image_compression.FAST:u=3,L=A;
break;
case I.image_compression.MEDIUM:u=6,L=x;
break;
case I.image_compression.SLOW:u=9,L=k
}O=D(O,J,p,L);
var K=new Uint8Array(F(u)),R=H(O),N=new c(u),Q=N.append(O),S=N.flush(),P=K.length+Q.length+S.length,t=new Uint8Array(P+4);
return t.set(K),t.set(Q,K.length),t.set(S,K.length+Q.length),t[P++]=R>>>24&255,t[P++]=R>>>16&255,t[P++]=R>>>8&255,t[P++]=255&R,I.arrayBufferToBinaryString(t)
},F=function(m,w){var J=8,u=Math.LOG2E*Math.log(32768)-8,p=u<<4|J,l=p<<8,y=Math.min(3,(w-1&255)>>1);
return l|=y<<6,l|=0,l+=31-l%31,[p,255&l&255]
},H=function(p,y){for(var K,w=1,u=65535&w,m=w>>>16&65535,J=p.length,l=0;
J>0;
){K=J>y?y:J,J-=K;
do{u+=p[l++],m+=u
}while(--K);
u%=65521,m%=65521
}return(m<<16|u)>>>0
},D=function(T,O,J,m){for(var U,L,y,R=T.length/O,S=new Uint8Array(T.length+R),Q=G(),K=0;
R>K;
K++){if(y=K*O,U=T.subarray(y,y+O),m){S.set(m(U,J,L),y+K)
}else{for(var N=0,P=Q.length,M=[];
P>N;
N++){M[N]=Q[N](U,J,L)
}var w=z(M.concat());
S.set(M[w],y+K)
}L=U
}return S
},s=function(i){var l=Array.apply([],i);
return l.unshift(0),l
},A=function(m,w){var y,u=[],p=0,l=m.length;
for(u[0]=1;
l>p;
p++){y=m[p-w]||0,u[p+1]=m[p]-y+256&255
}return u
},C=function(m,w,J){var u,p=[],l=0,y=m.length;
for(p[0]=2;
y>l;
l++){u=J&&J[l]||0,p[l+1]=m[l]-u+256&255
}return p
},x=function(p,y,K){var w,u,m=[],J=0,l=p.length;
for(m[0]=3;
l>J;
J++){w=p[J-y]||0,u=K&&K[J]||0,m[J+1]=p[J]+256-(w+u>>>1)&255
}return m
},k=function(M,y,p){var l,N,w,m,K=[],L=0,J=M.length;
for(K[0]=4;
J>L;
L++){l=M[L-y]||0,N=p&&p[L]||0,w=p&&p[L-y]||0,m=q(l,N,w),K[L+1]=M[L]-m+256&255
}return K
},q=function(m,w,J){var u=m+w-J,p=Math.abs(u-m),l=Math.abs(u-w),y=Math.abs(u-J);
return l>=p&&y>=p?m:y>=l?w:J
},G=function(){return[s,A,C,x,k]
},z=function(m){for(var w,y,u,p=0,l=m.length;
l>p;
){w=E(m[p].slice(1)),(y>w||!y)&&(y=w,u=p),p++
}return u
},E=function(i){for(var m=0,p=i.length,l=0;
p>m;
){l+=Math.abs(i[m++])
}return l
};
I.processPNG=function(O,R,P,W){var ag,M,ae,Y,ac,ad,aa=this.color_spaces.DEVICE_RGB,V=this.decode.FLATE_DECODE,X=8;
if(this.isArrayBuffer(O)&&(O=new Uint8Array(O)),this.isArrayBufferView(O)){if(B()){throw new Error("PNG support requires png.js and zlib.js")
}if(ag=new PNG(O),O=ag.imgData,X=ag.bits,aa=ag.colorSpace,Y=ag.colors,-1!==[4,6].indexOf(ag.colorType)){if(8===ag.bits){for(var K,ab,n=window["Uint"+ag.pixelBitlength+"Array"],L=new n(ag.decodePixels().buffer),af=L.length,T=new Uint8Array(af*ag.colors),J=new Uint8Array(af),Z=ag.pixelBitlength-ag.bits,ah=0,U=0;
af>ah;
ah++){for(K=L[ah],ab=0;
Z>ab;
){T[U++]=K>>>ab&255,ab+=ag.bits
}J[ah]=K>>>ab&255
}}if(16===ag.bits){for(var K,L=new Uint32Array(ag.decodePixels().buffer),af=L.length,T=new Uint8Array(af*(32/ag.pixelBitlength)*ag.colors),J=new Uint8Array(af*(32/ag.pixelBitlength)),Q=ag.colors>1,ah=0,U=0,e=0;
af>ah;
){K=L[ah++],T[U++]=K>>>0&255,Q&&(T[U++]=K>>>16&255,K=L[ah++],T[U++]=K>>>0&255),J[e++]=K>>>16&255
}X=8
}o(W)?(O=v(T,ag.width*ag.colors,ag.colors,W),ad=v(J,ag.width,1,W)):(O=T,ad=J,V=null)
}if(3===ag.colorType&&(aa=this.color_spaces.INDEXED,ac=ag.palette,ag.transparency.indexed)){for(var N=ag.transparency.indexed,i=0,ah=0,af=N.length;
af>ah;
++ah){i+=N[ah]
}if(i/=255,i===af-1&&-1!==N.indexOf(0)){ae=[N.indexOf(0)]
}else{if(i!==af){for(var L=ag.decodePixels(),J=new Uint8Array(L.length),ah=0,af=L.length;
af>ah;
ah++){J[ah]=N[L[ah]]
}ad=v(J,ag.width,1)
}}}return M=V===this.decode.FLATE_DECODE?"/Predictor 15 /Colors "+Y+" /BitsPerComponent "+X+" /Columns "+ag.width:"/Colors "+Y+" /BitsPerComponent "+X+" /Columns "+ag.width,(this.isArrayBuffer(O)||this.isArrayBufferView(O))&&(O=this.arrayBufferToBinaryString(O)),(ad&&this.isArrayBuffer(ad)||this.isArrayBufferView(ad))&&(ad=this.arrayBufferToBinaryString(ad)),this.createImageInfo(O,ag.width,ag.height,aa,X,V,R,P,M,ae,ac,ad)
}throw new Error("Unsupported PNG image data, try using JPEG instead.")
}
}(h.API),function(e){e.addSVG=function(z,L,E,B,A){function H(i,l){var m=l.createElement("style");
m.type="text/css",m.styleSheet?m.styleSheet.cssText=i:m.appendChild(l.createTextNode(i)),l.getElementsByTagName("head")[0].appendChild(m)
}function D(i){var l="childframe",m=i.createElement("iframe");
return H(".jsPDF_sillysvg_iframe {display:none;position:absolute;}",i),m.name=l,m.setAttribute("width",0),m.setAttribute("height",0),m.setAttribute("frameborder","0"),m.setAttribute("scrolling","no"),m.setAttribute("seamless","seamless"),m.setAttribute("class","jsPDF_sillysvg_iframe"),i.body.appendChild(m),m
}function O(i,l){var m=(l.contentWindow||l.contentDocument).document;
return m.write(i),m.close(),m.getElementsByTagName("svg")[0]
}function x(m){for(var u=parseFloat(m[1]),v=parseFloat(m[2]),p=[],o=3,l=m.length;
l>o;
){"c"===m[o]?(p.push([parseFloat(m[o+1]),parseFloat(m[o+2]),parseFloat(m[o+3]),parseFloat(m[o+4]),parseFloat(m[o+5]),parseFloat(m[o+6])]),o+=7):"l"===m[o]?(p.push([parseFloat(m[o+1]),parseFloat(m[o+2])]),o+=3):o+=1
}return[u,v,p]
}var N;
if(L===N||E===N){throw new Error("addSVG needs values for 'x' and 'y'")
}var G=D(document),K=O(z,G),M=[1,1],I=parseFloat(K.getAttribute("width")),C=parseFloat(K.getAttribute("height"));
I&&C&&(B&&A?M=[B/I,A/C]:B?M=[B/I,B/I]:A&&(M=[A/C,A/C]));
var F,k,J,j,q=K.childNodes;
for(F=0,k=q.length;
k>F;
F++){J=q[F],J.tagName&&"PATH"===J.tagName.toUpperCase()&&(j=x(J.getAttribute("d").split(" ")),j[0]=j[0]*M[0]+L,j[1]=j[1]*M[1]+E,this.lines.call(this,j[2],j[0],j[1],M))
}return this
}
}(h.API),function(k){var o=k.getCharWidthsArray=function(E,A){A||(A={});
var w,q,F,y=A.widths?A.widths:this.internal.getFont().metadata.Unicode.widths,v=y.fof?y.fof:1,C=A.kerning?A.kerning:this.internal.getFont().metadata.Unicode.kerning,D=C.fof?C.fof:1,B=0,x=y[0]||v,z=[];
for(w=0,q=E.length;
q>w;
w++){F=E.charCodeAt(w),z.push((y[F]||x)/v+(C[F]&&C[F][B]||0)/D),B=F
}return z
},p=function(i){for(var q=i.length,r=0;
q;
){q--,r+=i[q]
}return r
},m=k.getStringUnitWidth=function(e,i){return p(o.call(this,e,i))
},l=function(B,y,w,q){for(var C=[],x=0,v=B.length,z=0;
x!==v&&z+y[x]<w;
){z+=y[x],x++
}C.push(B.slice(0,x));
var A=x;
for(z=0;
x!==v;
){z+y[x]>q&&(C.push(B.slice(A,x)),z=0,A=x),z+=y[x],x++
}return A!==x&&C.push(B.slice(A,x)),C
},j=function(A,H,D){D||(D={});
var O,z,M,F,K,L,I=[],C=[I],E=D.textIndent||0,r=0,J=0,e=A.split(" "),s=o(" ",D)[0];
if(L=-1===D.lineIndent?e[0].length+2:D.lineIndent||0){var N=Array(L).join(" "),B=[];
e.map(function(i){i=i.split(/\s*\n/),i.length>1?B=B.concat(i.map(function(q,u){return(u&&q.length?"\n":"")+q
})):B.push(i[0])
}),e=B,L=m(N,D)
}for(M=0,F=e.length;
F>M;
M++){var n=0;
if(O=e[M],L&&"\n"==O[0]&&(O=O.substr(1),n=1),z=o(O,D),J=p(z),E+r+J>H||n){if(J>H){for(K=l(O,z,H-(E+r),H),I.push(K.shift()),I=[K.pop()];
K.length;
){C.push([K.shift()])
}J=p(z.slice(O.length-I[0].length))
}else{I=[O]
}C.push(I),E=J+L,r=s
}else{I.push(O),E+=r+J,r=s
}}if(L){var G=function(i,q){return(q?N:"")+i.join(" ")
}
}else{var G=function(i){return i.join(" ")
}
}return C.map(G)
};
k.splitTextToSize=function(B,x,v){v||(v={});
var i,C=v.fontSize||this.internal.getFontSize(),q=function(u){var F={0:1},G={};
if(u.widths&&u.kerning){return{widths:u.widths,kerning:u.kerning}
}var E=this.internal.getFont(u.fontName,u.fontStyle),D="Unicode";
return E.metadata[D]?{widths:E.metadata[D].widths||F,kerning:E.metadata[D].kerning||G}:{widths:F,kerning:G}
}.call(this,v);
i=Array.isArray(B)?B:B.split(/\r?\n/);
var z=1*this.internal.scaleFactor*x/C;
q.textIndent=v.textIndent?1*v.textIndent*this.internal.scaleFactor/C:0,q.lineIndent=v.lineIndent;
var A,y,w=[];
for(A=0,y=i.length;
y>A;
A++){w=w.concat(j(i[A],z,q))
}return w
}
}(h.API),function(i){var l=function(K){for(var E="0123456789abcdef",y="klmnopqrstuvwxyz",q={},L=0;
L<y.length;
L++){q[y[L]]=E[L]
}var B,x,H,J,G,A={},D=1,F=A,C=[],v="",z="",I=K.length-1;
for(L=1;
L!=I;
){G=K[L],L+=1,"'"==G?x?(J=x.join(""),x=B):x=[]:x?x.push(G):"{"==G?(C.push([F,J]),F={},J=B):"}"==G?(H=C.pop(),H[0][H[1]]=F,J=B,F=H[0]):"-"==G?D=-1:J===B?q.hasOwnProperty(G)?(v+=q[G],J=parseInt(v,16)*D,D=1,v=""):v+=G:q.hasOwnProperty(G)?(z+=q[G],F[J]=parseInt(z,16)*D,D=1,J=B,z=""):z+=G
}return A
},m={codePages:["WinAnsiEncoding"],WinAnsiEncoding:l("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},k={Unicode:{Courier:m,"Courier-Bold":m,"Courier-BoldOblique":m,"Courier-Oblique":m,Helvetica:m,"Helvetica-Bold":m,"Helvetica-BoldOblique":m,"Helvetica-Oblique":m,"Times-Roman":m,"Times-Bold":m,"Times-BoldItalic":m,"Times-Italic":m}},j={Unicode:{"Courier-Oblique":l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":l("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":l("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":l("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Helvetica:l("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":l("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),"Courier-Bold":l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":l("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":l("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":l("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};
i.events.push(["addFonts",function(s){var v,x,r,w,p,q="Unicode";
for(x in s.fonts){s.fonts.hasOwnProperty(x)&&(v=s.fonts[x],r=j[q][v.PostScriptName],r&&(w=v.metadata[q]?v.metadata[q]:v.metadata[q]={},w.widths=r.widths,w.kerning=r.kerning),p=k[q][v.PostScriptName],p&&(w=v.metadata[q]?v.metadata[q]:v.metadata[q]={},w.encoding=p,p.codePages&&p.codePages.length&&(v.encoding=p.codePages[0])))
}}])
}(h.API),function(e){e.putTotalPages=function(i){for(var k=new RegExp(i,"g"),l=1;
l<=this.internal.getNumberOfPages();
l++){for(var j=0;
j<this.internal.pages[l].length;
j++){this.internal.pages[l][j]=this.internal.pages[l][j].replace(k,this.internal.getNumberOfPages())
}}return this
}
}(h.API),function(i){if(i.URL=i.URL||i.webkitURL,i.Blob&&i.URL){try{return void new Blob
}catch(j){}}var k=i.BlobBuilder||i.WebKitBlobBuilder||i.MozBlobBuilder||function(z){var L=function(e){return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]
},E=function(){this.data=[]
},B=function(l,m,o){this.data=l,this.size=l.length,this.type=m,this.encoding=o
},A=E.prototype,H=B.prototype,D=z.FileReaderSync,O=function(e){this.code=this[this.name=e]
},x="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),N=x.length,G=z.URL||z.webkitURL||z,K=G.createObjectURL,M=G.revokeObjectURL,I=G,C=z.btoa,F=z.atob,v=z.ArrayBuffer,J=z.Uint8Array,q=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
for(B.fake=H.fake=!0;
N--;
){O.prototype[x[N]]=N+1
}return G.createObjectURL||(I=z.URL=function(l){var m,o=document.createElementNS("http://www.w3.org/1999/xhtml","a");
return o.href=l,"origin" in o||("data:"===o.protocol.toLowerCase()?o.origin=null:(m=l.match(q),o.origin=m&&m[1])),o
}),I.createObjectURL=function(l){var m,o=l.type;
return null===o&&(o="application/octet-stream"),l instanceof B?(m="data:"+o,"base64"===l.encoding?m+";base64,"+l.data:"URI"===l.encoding?m+","+decodeURIComponent(l.data):C?m+";base64,"+C(l.data):m+","+encodeURIComponent(l.data)):K?K.call(G,l):void 0
},I.revokeObjectURL=function(e){"data:"!==e.substring(0,5)&&M&&M.call(G,e)
},A.append=function(p){var y=this.data;
if(J&&(p instanceof v||p instanceof J)){for(var r="",o=new J(p),m=0,w=o.length;
w>m;
m++){r+=String.fromCharCode(o[m])
}y.push(r)
}else{if("Blob"===L(p)||"File"===L(p)){if(!D){throw new O("NOT_READABLE_ERR")
}var e=new D;
y.push(e.readAsBinaryString(p))
}else{p instanceof B?"base64"===p.encoding&&F?y.push(F(p.data)):"URI"===p.encoding?y.push(decodeURIComponent(p.data)):"raw"===p.encoding&&y.push(p.data):("string"!=typeof p&&(p+=""),y.push(unescape(encodeURIComponent(p))))
}}},A.getBlob=function(e){return arguments.length||(e=null),new B(this.data.join(""),e,"raw")
},A.toString=function(){return"[object BlobBuilder]"
},H.slice=function(l,o,p){var m=arguments.length;
return 3>m&&(p=null),new B(this.data.slice(l,m>1?o:this.data.length),p,this.encoding)
},H.toString=function(){return"[object Blob]"
},H.close=function(){this.size=0,delete this.data
},E
}(i);
i.Blob=function(m,q){var p=q?q.type||"":"",n=new k;
if(m){for(var l=0,u=m.length;
u>l;
l++){n.append(m[l])
}}return n.getBlob(p)
}
}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this);
var d=d||"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(I){if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var C=I.document,v=function(){return I.URL||I.webkitURL||I
},j=C.createElementNS("http://www.w3.org/1999/xhtml","a"),J="download" in j,z=function(i){var e=C.createEvent("MouseEvents");
e.initMouseEvent("click",!0,!1,I,0,0,0,0,0,!1,!1,!1,!1,0,null),i.dispatchEvent(e)
},q=I.webkitRequestFileSystem,F=I.requestFileSystem||q||I.mozRequestFileSystem,H=function(i){(I.setImmediate||I.setTimeout)(function(){throw i
},0)
},E="application/octet-stream",y=0,B=10,D=function(l){var i=function(){"string"==typeof l?v().revokeObjectURL(l):l.remove()
};
I.chrome?i():setTimeout(i,B)
},A=function(m,u,w){u=[].concat(u);
for(var p=u.length;
p--;
){var o=m["on"+u[p]];
if("function"==typeof o){try{o.call(m,w||m)
}catch(l){H(l)
}}}},k=function(s,O){var r,l,n,M=this,o=s.type,K=!1,N=function(){A(M,"writestart progress write writeend".split(" "))
},t=function(){if((K||!r)&&(r=v().createObjectURL(s)),l){l.location.href=r
}else{var e=I.open(r,"_blank");
void 0==e&&"undefined"!=typeof safari&&(I.location.href=r)
}M.readyState=M.DONE,N(),D(r)
},i=function(e){return function(){return M.readyState!==M.DONE?e.apply(this,arguments):void 0
}
},L={create:!0,exclusive:!1};
return M.readyState=M.INIT,O||(O="download"),J?(r=v().createObjectURL(s),j.href=r,j.download=O,z(j),M.readyState=M.DONE,N(),void D(r)):(I.chrome&&o&&o!==E&&(n=s.slice||s.webkitSlice,s=n.call(s,0,s.size,E),K=!0),q&&"download"!==O&&(O+=".download"),(o===E||q)&&(l=I),F?(y+=s.size,void F(I.TEMPORARY,y,i(function(e){e.root.getDirectory("saved",L,i(function(m){var p=function(){m.getFile(O,L,i(function(u){u.createWriter(i(function(w){w.onwriteend=function(P){l.location.href=u.toURL(),M.readyState=M.DONE,A(M,"writeend",P),D(u)
},w.onerror=function(){var P=w.error;
P.code!==P.ABORT_ERR&&t()
},"writestart progress write abort".split(" ").forEach(function(P){w["on"+P]=M["on"+P]
}),w.write(s),M.abort=function(){w.abort(),M.readyState=M.DONE
},M.readyState=M.WRITING
}),t)
}),t)
};
m.getFile(O,{create:!1},i(function(u){u.remove(),p()
}),i(function(u){u.code===u.NOT_FOUND_ERR?p():t()
}))
}),t)
}),t)):void t())
},x=k.prototype,G=function(i,l){return new k(i,l)
};
return x.abort=function(){var e=this;
e.readyState=e.DONE,A(e,"abort")
},x.readyState=x.INIT=0,x.WRITING=1,x.DONE=2,x.error=x.onwritestart=x.onprogress=x.onwrite=x.onabort=x.onerror=x.onwriteend=null,G
}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);
"undefined"!=typeof module&&null!==module&&(module.exports=d),void function(i,j){"object"==typeof module?module.exports=j():i.adler32cs=j()
}(h,function(){var w="function"==typeof ArrayBuffer&&"function"==typeof Uint8Array,p=null,l=function(){if(!w){return function(){return !1
}
}try{var i=require("buffer");
"function"==typeof i.Buffer&&(p=i.Buffer)
}catch(e){}return function(n){return n instanceof ArrayBuffer||null!==p&&n instanceof p
}
}(),j=function(){return null!==p?function(e){return new p(e,"utf8").toString("binary")
}:function(e){return unescape(encodeURIComponent(e))
}
}(),x=65521,m=function(u,z){for(var B=65535&u,y=u>>>16,s=0,A=z.length;
A>s;
s++){B=(B+(255&z.charCodeAt(s)))%x,y=(y+B)%x
}return(y<<16|B)>>>0
},k=function(u,z){for(var B=65535&u,y=u>>>16,s=0,A=z.length;
A>s;
s++){B=(B+z[s])%x,y=(y+B)%x
}return(y<<16|B)>>>0
},q={},v=q.Adler32=function(){var n=function(e){if(!(this instanceof n)){throw new TypeError("Constructor cannot called be as a function.")
}if(!isFinite(e=null==e?1:+e)){throw new Error("First arguments needs to be a finite number.")
}this.checksum=e>>>0
},i=n.prototype={};
return i.constructor=n,n.from=function(e){return e.prototype=i,e
}(function(e){if(!(this instanceof n)){throw new TypeError("Constructor cannot called be as a function.")
}if(null==e){throw new Error("First argument needs to be a string.")
}this.checksum=m(1,e.toString())
}),n.fromUtf8=function(e){return e.prototype=i,e
}(function(e){if(!(this instanceof n)){throw new TypeError("Constructor cannot called be as a function.")
}if(null==e){throw new Error("First argument needs to be a string.")
}var o=j(e.toString());
this.checksum=m(1,o)
}),w&&(n.fromBuffer=function(e){return e.prototype=i,e
}(function(e){if(!(this instanceof n)){throw new TypeError("Constructor cannot called be as a function.")
}if(!l(e)){throw new Error("First argument needs to be ArrayBuffer.")
}var o=new Uint8Array(e);
return this.checksum=k(1,o)
})),i.update=function(e){if(null==e){throw new Error("First argument needs to be a string.")
}return e=e.toString(),this.checksum=m(this.checksum,e)
},i.updateUtf8=function(o){if(null==o){throw new Error("First argument needs to be a string.")
}var r=j(o.toString());
return this.checksum=m(this.checksum,r)
},w&&(i.updateBuffer=function(o){if(!l(o)){throw new Error("First argument needs to be ArrayBuffer.")
}var r=new Uint8Array(o);
return this.checksum=k(this.checksum,r)
}),i.clone=function(){return new v(this.checksum)
},n
}();
return q.from=function(e){if(null==e){throw new Error("First argument needs to be a string.")
}return m(1,e.toString())
},q.fromUtf8=function(i){if(null==i){throw new Error("First argument needs to be a string.")
}var n=j(i.toString());
return m(1,n)
},w&&(q.fromBuffer=function(i){if(!l(i)){throw new Error("First argument need to be ArrayBuffer.")
}var n=new Uint8Array(i);
return k(1,n)
}),q
});
var c=function(){function aJ(){function i(D){var z,q,E,w,B,C,A=j.dyn_tree,v=j.stat_desc.static_tree,y=j.stat_desc.extra_bits,x=j.stat_desc.extra_base,o=j.stat_desc.max_length,r=0;
for(w=0;
aO>=w;
w++){D.bl_count[w]=0
}for(A[2*D.heap[D.heap_max]+1]=0,z=D.heap_max+1;
aZ>z;
z++){q=D.heap[z],w=A[2*A[2*q+1]+1]+1,w>o&&(w=o,r++),A[2*q+1]=w,q>j.max_code||(D.bl_count[w]++,B=0,q>=x&&(B=y[q-x]),C=A[2*q],D.opt_len+=C*(w+B),v&&(D.static_len+=C*(v[2*q+1]+B)))
}if(0!==r){do{for(w=o-1;
0===D.bl_count[w];
){w--
}D.bl_count[w]--,D.bl_count[w+1]+=2,D.bl_count[o]--,r-=2
}while(r>0);
for(w=o;
0!==w;
w--){for(q=D.bl_count[w];
0!==q;
){E=D.heap[--z],E>j.max_code||(A[2*E+1]!=w&&(D.opt_len+=(w-A[2*E+1])*A[2*E],A[2*E+1]=w),q--)
}}}}function k(m,o){var p=0;
do{p|=1&m,m>>>=1,p<<=1
}while(--o>0);
return p>>>1
}function l(p,x,v){var q,o,e,m=[],w=0;
for(q=1;
aO>=q;
q++){m[q]=w=w+v[q-1]<<1
}for(o=0;
x>=o;
o++){e=p[2*o+1],0!==e&&(p[2*o]=k(m[e]++,e))
}}var j=this;
j.build_tree=function(t){var r,q,v,n=j.dyn_tree,p=j.stat_desc.static_tree,w=j.stat_desc.elems,m=-1;
for(t.heap_len=0,t.heap_max=aZ,r=0;
w>r;
r++){0!==n[2*r]?(t.heap[++t.heap_len]=m=r,t.depth[r]=0):n[2*r+1]=0
}for(;
t.heap_len<2;
){v=t.heap[++t.heap_len]=2>m?++m:0,n[2*v]=1,t.depth[v]=0,t.opt_len--,p&&(t.static_len-=p[2*v+1])
}for(j.max_code=m,r=Math.floor(t.heap_len/2);
r>=1;
r--){t.pqdownheap(n,r)
}v=w;
do{r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],t.pqdownheap(n,1),q=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=q,n[2*v]=n[2*r]+n[2*q],t.depth[v]=Math.max(t.depth[r],t.depth[q])+1,n[2*r+1]=n[2*q+1]=v,t.heap[1]=v++,t.pqdownheap(n,1)
}while(t.heap_len>=2);
t.heap[--t.heap_max]=t.heap[1],i(t),l(n,j.max_code,t.bl_count)
}
}function aY(k,o,p,m,l){var j=this;
j.static_tree=k,j.extra_bits=o,j.extra_base=p,j.elems=m,j.max_length=l
}function aP(k,o,p,m,l){var j=this;
j.good_length=k,j.max_lazy=o,j.nice_length=p,j.max_chain=m,j.func=l
}function aL(k,o,p,m){var l=k[2*o],j=k[2*p];
return j>l||l==j&&m[o]<=m[p]
}function aK(){function L(){var i;
for(bq=2*a9,bj[W-1]=0,i=0;
W-1>i;
i++){bj[i]=0
}S=an[v].max_lazy,B=an[v].good_length,D=an[v].nice_length,X=an[v].max_chain,bA=0,bf=0,by=0,bo=E=aa-1,y=0,bd=0
}function G(){var i;
for(i=0;
aX>i;
i++){bc[2*i]=0
}for(i=0;
a3>i;
i++){br[2*i]=0
}for(i=0;
aI>i;
i++){a8[2*i]=0
}bc[2*aV]=1,j.opt_len=j.static_len=0,P=bt=0
}function Q(){a5.dyn_tree=bc,a5.stat_desc=aY.static_l_desc,bw.dyn_tree=br,bw.stat_desc=aY.static_d_desc,bk.dyn_tree=a8,bk.stat_desc=aY.static_bl_desc,w=0,Y=0,bs=8,G()
}function K(bI,bF){var bD,p,bJ=-1,bE=bI[1],O=0,bG=7,bH=4;
for(0===bE&&(bG=138,bH=3),bI[2*(bF+1)+1]=65535,bD=0;
bF>=bD;
bD++){p=bE,bE=bI[2*(bD+1)+1],++O<bG&&p==bE||(bH>O?a8[2*p]+=O:0!==p?(p!=bJ&&a8[2*p]++,a8[2*aQ]++):10>=O?a8[2*aG]++:a8[2*aW]++,O=0,bJ=p,0===bE?(bG=138,bH=3):p==bE?(bG=6,bH=3):(bG=7,bH=4))
}}function U(){var i;
for(K(bc,a5.max_code),K(br,bw.max_code),bk.build_tree(j),i=aI-1;
i>=3&&0===a8[2*aJ.bl_order[i]+1];
i--){}return j.opt_len+=3*(i+1)+5+5+4,i
}function T(i){j.pending_buf[j.pending++]=i
}function J(i){T(255&i),T(i>>>8&255)
}function a6(i){T(i>>8&255),T(255&i&255)
}function ba(i,p){var s,o=p;
Y>aE-o?(s=i,w|=s<<Y&65535,J(w),w=s>>>aE-Y,Y+=o-aE):(w|=i<<Y&65535,Y+=o)
}function bz(i,o){var p=2*i;
ba(65535&o[p],65535&o[p+1])
}function bn(bI,bF){var bD,p,bJ=-1,bE=bI[1],O=0,bG=7,bH=4;
for(0===bE&&(bG=138,bH=3),bD=0;
bF>=bD;
bD++){if(p=bE,bE=bI[2*(bD+1)+1],!(++O<bG&&p==bE)){if(bH>O){do{bz(p,a8)
}while(0!==--O)
}else{0!==p?(p!=bJ&&(bz(p,a8),O--),bz(aQ,a8),ba(O-3,2)):10>=O?(bz(aG,a8),ba(O-3,3)):(bz(aW,a8),ba(O-11,7))
}O=0,bJ=p,0===bE?(bG=138,bH=3):p==bE?(bG=6,bH=3):(bG=7,bH=4)
}}}function M(p,O,o){var i;
for(ba(p-257,5),ba(O-1,5),ba(o-4,4),i=0;
o>i;
i++){ba(a8[2*aJ.bl_order[i]+1],3)
}bn(bc,p-1),bn(br,O-1)
}function R(){16==Y?(J(w),w=0,Y=0):Y>=8&&(T(255&w),w>>>=8,Y-=8)
}function bh(){ba(ak<<1,3),bz(aV,aY.static_ltree),R(),9>1+bs+10-Y&&(ba(ak<<1,3),bz(aV,aY.static_ltree),R()),bs=7
}function V(bD,bE){var O,p,o;
if(j.pending_buf[F+2*P]=bD>>>8&255,j.pending_buf[F+2*P+1]=255&bD,j.pending_buf[I+P]=255&bE,P++,0===bD?bc[2*bE]++:(bt++,bD--,bc[2*(aJ._length_code[bE]+aR+1)]++,br[2*aJ.d_code(bD)]++),0===(8191&P)&&v>2){for(O=8*P,p=bA-bf,o=0;
a3>o;
o++){O+=br[2*o]*(5+aJ.extra_dbits[o])
}if(O>>>=3,bt<Math.floor(P/2)&&O<Math.floor(p/2)){return !0
}}return P==bg-1
}function H(bF,bH){var bE,bD,O,bG,p=0;
if(0!==P){do{bE=j.pending_buf[F+2*p]<<8&65280|255&j.pending_buf[F+2*p+1],bD=255&j.pending_buf[I+p],p++,0===bE?bz(bD,bF):(O=aJ._length_code[bD],bz(O+aR+1,bF),bG=aJ.extra_lbits[O],0!==bG&&(bD-=aJ.base_length[O],ba(bD,bG)),bE--,O=aJ.d_code(bE),bz(O,bH),bG=aJ.extra_dbits[O],0!==bG&&(bE-=aJ.base_dist[O],ba(bE,bG)))
}while(P>p)
}bz(aV,bF),bs=bF[2*aV+1]
}function bx(){Y>8?J(w):Y>0&&T(255&w),w=0,Y=0
}function bu(i,o,p){bx(),bs=8,p&&(J(o),J(~o)),j.pending_buf.set(be.subarray(i,i+o),j.pending),j.pending+=o
}function x(i,o,p){ba((aq<<1)+(p?1:0),3),bu(i,o,!0)
}function a7(O,bF,bD){var s,bE,p=0;
v>0?(a5.build_tree(j),bw.build_tree(j),p=U(),s=j.opt_len+3+7>>>3,bE=j.static_len+3+7>>>3,s>=bE&&(s=bE)):s=bE=bF+5,s>=bF+4&&-1!=O?x(O,bF,bD):bE==s?(ba((ak<<1)+(bD?1:0),3),H(aY.static_ltree,aY.static_dtree)):(ba((aC<<1)+(bD?1:0),3),M(a5.max_code+1,bw.max_code+1,p+1),H(bc,br)),G(),bD&&bx()
}function A(i){a7(bf>=0?bf:-1,bA-bf,i),bf=bA,q.flush_pending()
}function bl(){var i,p,s,o;
do{if(o=bq-by-bA,0===o&&0===bA&&0===by){o=a9
}else{if(-1==o){o--
}else{if(bA>=a9+a9-a2){be.set(be.subarray(a9,a9+a9),0),bm-=a9,bA-=a9,bf-=a9,i=W,s=i;
do{p=65535&bj[--s],bj[s]=p>=a9?p-a9:0
}while(0!==--i);
i=a9,s=i;
do{p=65535&bb[--s],bb[s]=p>=a9?p-a9:0
}while(0!==--i);
o+=a9
}}}if(0===q.avail_in){return
}i=q.read_buf(be,bA+by,o),by+=i,by>=aa&&(bd=255&be[bA],bd=(bd<<N^255&be[bA+1])&m)
}while(a2>by&&0!==q.avail_in)
}function t(i){var o,p=65535;
for(p>l-5&&(p=l-5);
;
){if(1>=by){if(bl(),0===by&&i==aS){return aT
}if(0===by){break
}}if(bA+=by,by=0,o=bf+p,(0===bA||bA>=o)&&(by=bA-o,bA=o,A(!1),0===q.avail_out)){return aT
}if(bA-bf>=a9-a2&&(A(!1),0===q.avail_out)){return aT
}}return A(i==az),0===q.avail_out?i==az?au:aT:i==az?av:ao
}function bi(bL){var bH,bD,p=X,bM=bA,bF=E,O=bA>a9-a2?bA-(a9-a2):0,bJ=D,bK=z,bI=bA+ad,bE=be[bM+bF-1],bG=be[bM+bF];
E>=B&&(p>>=2),bJ>by&&(bJ=by);
do{if(bH=bL,be[bH+bF]==bG&&be[bH+bF-1]==bE&&be[bH]==be[bM]&&be[++bH]==be[bM+1]){bM+=2,bH++;
do{}while(be[++bM]==be[++bH]&&be[++bM]==be[++bH]&&be[++bM]==be[++bH]&&be[++bM]==be[++bH]&&be[++bM]==be[++bH]&&be[++bM]==be[++bH]&&be[++bM]==be[++bH]&&be[++bM]==be[++bH]&&bI>bM);
if(bD=ad-(bI-bM),bM=bI-ad,bD>bF){if(bm=bL,bF=bD,bD>=bJ){break
}bE=be[bM+bF-1],bG=be[bM+bF]
}}}while((bL=65535&bb[bL&bK])>O&&0!==--p);
return by>=bF?bF:by
}function bp(i){for(var o,p=0;
;
){if(a2>by){if(bl(),a2>by&&i==aS){return aT
}if(0===by){break
}}if(by>=aa&&(bd=(bd<<N^255&be[bA+(aa-1)])&m,p=65535&bj[bd],bb[bA&z]=bj[bd],bj[bd]=bA),0!==p&&a9-a2>=(bA-p&65535)&&e!=aM&&(bo=bi(p)),bo>=aa){if(o=V(bA-bm,bo-aa),by-=bo,S>=bo&&by>=aa){bo--;
do{bA++,bd=(bd<<N^255&be[bA+(aa-1)])&m,p=65535&bj[bd],bb[bA&z]=bj[bd],bj[bd]=bA
}while(0!==--bo);
bA++
}else{bA+=bo,bo=0,bd=255&be[bA],bd=(bd<<N^255&be[bA+1])&m
}}else{o=V(0,255&be[bA]),by--,bA++
}if(o&&(A(!1),0===q.avail_out)){return aT
}}return A(i==az),0===q.avail_out?i==az?au:aT:i==az?av:ao
}function C(i){for(var p,s,o=0;
;
){if(a2>by){if(bl(),a2>by&&i==aS){return aT
}if(0===by){break
}}if(by>=aa&&(bd=(bd<<N^255&be[bA+(aa-1)])&m,o=65535&bj[bd],bb[bA&z]=bj[bd],bj[bd]=bA),E=bo,r=bm,bo=aa-1,0!==o&&S>E&&a9-a2>=(bA-o&65535)&&(e!=aM&&(bo=bi(o)),5>=bo&&(e==a1||bo==aa&&bA-bm>4096)&&(bo=aa-1)),E>=aa&&E>=bo){s=bA+by-aa,p=V(bA-1-r,E-aa),by-=E-1,E-=2;
do{++bA<=s&&(bd=(bd<<N^255&be[bA+(aa-1)])&m,o=65535&bj[bd],bb[bA&z]=bj[bd],bj[bd]=bA)
}while(0!==--E);
if(y=0,bo=aa-1,bA++,p&&(A(!1),0===q.avail_out)){return aT
}}else{if(0!==y){if(p=V(0,255&be[bA-1]),p&&A(!1),bA++,by--,0===q.avail_out){return aT
}}else{y=1,bA++,by--
}}}return 0!==y&&(p=V(0,255&be[bA-1]),y=0),A(i==az),0===q.avail_out?i==az?au:aT:i==az?av:ao
}function Z(i){return i.total_in=i.total_out=0,i.msg=null,j.pending=0,j.pending_out=0,bB=ar,bv=aS,Q(),L(),ai
}var q,bB,l,k,bv,a9,bC,z,be,bq,bb,bj,bd,W,u,m,N,bf,bo,r,y,bA,bm,by,E,X,S,v,e,B,D,bc,br,a8,j=this,a5=new aJ,bw=new aJ,bk=new aJ;
j.depth=[];
var I,bg,P,F,bt,bs,w,Y;
j.bl_count=[],j.heap=[],bc=[],br=[],a8=[],j.pqdownheap=function(p,bD){for(var bE=j.heap,O=bE[bD],o=bD<<1;
o<=j.heap_len&&(o<j.heap_len&&aL(p,bE[o+1],bE[o],j.depth)&&o++,!aL(p,O,bE[o],j.depth));
){bE[bD]=bE[o],bD=o,o<<=1
}bE[bD]=O
},j.deflateInit=function(p,bE,bF,bD,O,o){return bD||(bD=ab),O||(O=aj),o||(o=aF),p.msg=null,bE==aH&&(bE=6),1>O||O>al||bD!=ab||9>bF||bF>15||0>bE||bE>9||0>o||o>aM?ah:(p.dstate=j,bC=bF,a9=1<<bC,z=a9-1,u=O+7,W=1<<u,m=W-1,N=Math.floor((u+aa-1)/aa),be=new Uint8Array(2*a9),bb=[],bj=[],bg=1<<O+6,j.pending_buf=new Uint8Array(4*bg),l=4*bg,F=Math.floor(bg/2),I=3*bg,v=bE,e=o,k=255&bD,Z(p))
},j.deflateEnd=function(){return bB!=af&&bB!=ar&&bB!=ac?ah:(j.pending_buf=null,bj=null,bb=null,be=null,j.dstate=null,bB==ar?at:ai)
},j.deflateParams=function(i,p,s){var o=ai;
return p==aH&&(p=6),0>p||p>9||0>s||s>aM?ah:(an[v].func!=an[p].func&&0!==i.total_in&&(o=i.deflate(a4)),v!=p&&(v=p,S=an[v].max_lazy,B=an[v].good_length,D=an[v].nice_length,X=an[v].max_chain),e=s,o)
},j.deflateSetDictionary=function(p,bE,bF){var bD,O=bF,o=0;
if(!bE||bB!=af){return ah
}if(aa>O){return ai
}for(O>a9-a2&&(O=a9-a2,o=bF-O),be.set(bE.subarray(o,o+O),0),bA=O,bf=O,bd=255&be[0],bd=(bd<<N^255&be[1])&m,bD=0;
O-aa>=bD;
bD++){bd=(bd<<N^255&be[bD+(aa-1)])&m,bb[bD&z]=bj[bd],bj[bd]=bD
}return ai
},j.deflate=function(O,bF){var bH,bE,bD,p,bG;
if(bF>az||0>bF){return ah
}if(!O.next_out||!O.next_in&&0!==O.avail_in||bB==ac&&bF!=az){return O.msg=ap[aD-ah],ah
}if(0===O.avail_out){return O.msg=ap[aD-aA],aA
}if(q=O,p=bv,bv=bF,bB==af&&(bE=ab+(bC-8<<4)<<8,bD=(v-1&255)>>1,bD>3&&(bD=3),bE|=bD<<6,0!==bA&&(bE|=ae),bE+=31-bE%31,bB=ar,a6(bE)),0!==j.pending){if(q.flush_pending(),0===q.avail_out){return bv=-1,ai
}}else{if(0===q.avail_in&&p>=bF&&bF!=az){return q.msg=ap[aD-aA],aA
}}if(bB==ac&&0!==q.avail_in){return O.msg=ap[aD-aA],aA
}if(0!==q.avail_in||0!==by||bF!=aS&&bB!=ac){switch(bG=-1,an[v].func){case aw:bG=t(bF);
break;
case ay:bG=bp(bF);
break;
case ag:bG=C(bF)
}if((bG==au||bG==av)&&(bB=ac),bG==aT||bG==au){return 0===q.avail_out&&(bv=-1),ai
}if(bG==ao){if(bF==a4){bh()
}else{if(x(0,0,!1),bF==aB){for(bH=0;
W>bH;
bH++){bj[bH]=0
}}}if(q.flush_pending(),0===q.avail_out){return bv=-1,ai
}}}return bF!=az?ai:ax
}
}function aU(){var e=this;
e.next_in_index=0,e.next_out_index=0,e.avail_in=0,e.total_in=0,e.avail_out=0,e.total_out=0
}var aO=15,a3=30,aI=19,a0=29,aR=256,aX=aR+1+a0,aZ=2*aX+1,aV=256,aN=7,aQ=16,aG=17,aW=18,aE=16,aH=-1,a1=1,aM=2,aF=0,aS=0,a4=1,aB=3,az=4,ai=0,ax=1,aD=2,ah=-2,at=-3,aA=-5,am=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];
aJ._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28],aJ.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],aJ.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],aJ.d_code=function(e){return 256>e?am[e]:am[256+(e>>>7)]
},aJ.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],aJ.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],aJ.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],aJ.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],aY.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8],aY.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5],aY.static_l_desc=new aY(aY.static_ltree,aJ.extra_lbits,aR+1,aX,aO),aY.static_d_desc=new aY(aY.static_dtree,aJ.extra_dbits,0,a3,aO),aY.static_bl_desc=new aY(null,aJ.extra_blbits,0,aI,aN);
var al=9,aj=8,aw=0,ay=1,ag=2,an=[new aP(0,0,0,0,aw),new aP(4,4,8,4,ay),new aP(4,5,16,8,ay),new aP(4,6,32,32,ay),new aP(4,4,16,16,ag),new aP(8,16,32,32,ag),new aP(8,16,128,128,ag),new aP(8,32,128,256,ag),new aP(32,128,258,1024,ag),new aP(32,258,258,4096,ag)],ap=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],aT=0,ao=1,au=2,av=3,ae=32,af=42,ar=113,ac=666,ab=8,aq=0,ak=1,aC=2,aa=3,ad=258,a2=ad+aa+1;
return aU.prototype={deflateInit:function(i,j){var k=this;
return k.dstate=new aK,j||(j=aO),k.dstate.deflateInit(k,i,j)
},deflate:function(i){var j=this;
return j.dstate?j.dstate.deflate(j,i):ah
},deflateEnd:function(){var i=this;
if(!i.dstate){return ah
}var j=i.dstate.deflateEnd();
return i.dstate=null,j
},deflateParams:function(i,j){var k=this;
return k.dstate?k.dstate.deflateParams(k,i,j):ah
},deflateSetDictionary:function(i,j){var k=this;
return k.dstate?k.dstate.deflateSetDictionary(k,i,j):ah
},read_buf:function(i,l,m){var k=this,j=k.avail_in;
return j>m&&(j=m),0===j?0:(k.avail_in-=j,i.set(k.next_in.subarray(k.next_in_index,k.next_in_index+j),l),k.next_in_index+=j,k.total_in+=j,j)
},flush_pending:function(){var i=this,j=i.dstate.pending;
j>i.avail_out&&(j=i.avail_out),0!==j&&(i.next_out.set(i.dstate.pending_buf.subarray(i.dstate.pending_out,i.dstate.pending_out+j),i.next_out_index),i.next_out_index+=j,i.dstate.pending_out+=j,i.total_out+=j,i.avail_out-=j,i.dstate.pending-=j,0===i.dstate.pending&&(i.dstate.pending_out=0))
}},function(i){var l=this,p=new aU,k=512,j=aS,m=new Uint8Array(k);
"undefined"==typeof i&&(i=aH),p.deflateInit(i),p.next_out=m,l.append=function(s,w){var r,o,q=[],x=0,n=0,v=0;
if(s.length){p.next_in_index=0,p.next_in=s,p.avail_in=s.length;
do{if(p.next_out_index=0,p.avail_out=k,r=p.deflate(j),r!=ai){throw"deflating: "+p.msg
}p.next_out_index&&q.push(p.next_out_index==k?new Uint8Array(m):new Uint8Array(m.subarray(0,p.next_out_index))),v+=p.next_out_index,w&&p.next_in_index>0&&p.next_in_index!=x&&(w(p.next_in_index),x=p.next_in_index)
}while(p.avail_in>0||0===p.avail_out);
return o=new Uint8Array(v),q.forEach(function(e){o.set(e,n),n+=e.length
}),o
}},l.flush=function(){var q,u,r=[],o=0,n=0;
do{if(p.next_out_index=0,p.avail_out=k,q=p.deflate(az),q!=ax&&q!=ai){throw"deflating: "+p.msg
}k-p.avail_out>0&&r.push(new Uint8Array(m.subarray(0,p.next_out_index))),n+=p.next_out_index
}while(p.avail_in>0||0===p.avail_out);
return p.deflateEnd(),u=new Uint8Array(n),r.forEach(function(e){u.set(e,o),o+=e.length
}),u
}
}
}(this);
!function(i){var j;
j=function(){function t(N){var I,C,z,O,F,B,L,M,K,E,H,J,G,A,D;
for(this.data=N,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.animation=null,this.text={},B=null;
;
){switch(I=this.readUInt32(),E=function(){var l,n;
for(n=[],L=l=0;
4>l;
L=++l){n.push(String.fromCharCode(this.data[this.pos++]))
}return n
}.call(this).join("")){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++];
break;
case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};
break;
case"PLTE":this.palette=this.read(I);
break;
case"fcTL":B&&this.animation.frames.push(B),this.pos+=4,B={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()},F=this.readUInt16(),O=this.readUInt16()||100,B.delay=1000*F/O,B.disposeOp=this.data[this.pos++],B.blendOp=this.data[this.pos++],B.data=[];
break;
case"IDAT":case"fdAT":for("fdAT"===E&&(this.pos+=4,I-=4),N=(null!=B?B.data:void 0)||this.imgData,L=G=0;
I>=0?I>G:G>I;
L=I>=0?++G:--G){N.push(this.data[this.pos++])
}break;
case"tRNS":switch(this.transparency={},this.colorType){case 3:if(z=this.palette.length/3,this.transparency.indexed=this.read(I),this.transparency.indexed.length>z){throw new Error("More transparent colors than palette size")
}if(H=z-this.transparency.indexed.length,H>0){for(L=A=0;
H>=0?H>A:A>H;
L=H>=0?++A:--A){this.transparency.indexed.push(255)
}}break;
case 0:this.transparency.grayscale=this.read(I)[0];
break;
case 2:this.transparency.rgb=this.read(I)
}break;
case"tEXt":J=this.read(I),M=J.indexOf(0),K=String.fromCharCode.apply(String,J.slice(0,M)),this.text[K]=String.fromCharCode.apply(String,J.slice(M+1));
break;
case"IEND":return B&&this.animation.frames.push(B),this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1;
case 2:case 6:return 3
}}.call(this),this.hasAlphaChannel=4===(D=this.colorType)||6===D,C=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*C,this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray";
case 3:return"DeviceRGB"
}}.call(this),void (this.imgData=new Uint8Array(this.imgData));
default:this.pos+=I
}if(this.pos+=4,this.pos>this.data.length){throw new Error("Incomplete or corrupt PNG file")
}}}var m,k,y,p,w,x,v,o;
t.load=function(e,z,u){var l;
return"function"==typeof z&&(u=z),l=new XMLHttpRequest,l.open("GET",e,!0),l.responseType="arraybuffer",l.onload=function(){var r,n;
return r=new Uint8Array(l.response||l.mozResponseArrayBuffer),n=new t(r),"function"==typeof(null!=z?z.getContext:void 0)&&n.render(z),"function"==typeof u?u(n):void 0
},l.send(null)
},p=0,y=1,w=2,k=0,m=1,t.prototype.read=function(l){var u,z,s;
for(s=[],u=z=0;
l>=0?l>z:z>l;
u=l>=0?++z:--z){s.push(this.data[this.pos++])
}return s
},t.prototype.readUInt32=function(){var l,u,z,s;
return l=this.data[this.pos++]<<24,u=this.data[this.pos++]<<16,z=this.data[this.pos++]<<8,s=this.data[this.pos++],l|u|z|s
},t.prototype.readUInt16=function(){var l,n;
return l=this.data[this.pos++]<<8,n=this.data[this.pos++],l|n
},t.prototype.decodePixels=function(E){var R,J,G,F,N,V,D,T,L,Q,S,O,I,K,B,P,z,C,U,H,A,M,W;
if(null==E&&(E=this.imgData),0===E.length){return new Uint8Array(0)
}for(E=new g(E),E=E.getBytes(),O=this.pixelBitlength/8,P=O*this.width,I=new Uint8Array(P*this.height),V=E.length,B=0,K=0,J=0;
V>K;
){switch(E[K++]){case 0:for(F=U=0;
P>U;
F=U+=1){I[J++]=E[K++]
}break;
case 1:for(F=H=0;
P>H;
F=H+=1){R=E[K++],N=O>F?0:I[J-O],I[J++]=(R+N)%256
}break;
case 2:for(F=A=0;
P>A;
F=A+=1){R=E[K++],G=(F-F%O)/O,z=B&&I[(B-1)*P+G*O+F%O],I[J++]=(z+R)%256
}break;
case 3:for(F=M=0;
P>M;
F=M+=1){R=E[K++],G=(F-F%O)/O,N=O>F?0:I[J-O],z=B&&I[(B-1)*P+G*O+F%O],I[J++]=(R+Math.floor((N+z)/2))%256
}break;
case 4:for(F=W=0;
P>W;
F=W+=1){R=E[K++],G=(F-F%O)/O,N=O>F?0:I[J-O],0===B?z=C=0:(z=I[(B-1)*P+G*O+F%O],C=G&&I[(B-1)*P+(G-1)*O+F%O]),D=N+z-C,T=Math.abs(D-N),Q=Math.abs(D-z),S=Math.abs(D-C),L=Q>=T&&S>=T?N:S>=Q?z:C,I[J++]=(R+L)%256
}break;
default:throw new Error("Invalid filter algorithm: "+E[K-1])
}B++
}return I
},t.prototype.decodePalette=function(){var G,C,A,l,H,B,z,E,F,D;
for(l=this.palette,z=this.transparency.indexed||[],B=new Uint8Array((z.length||0)+l.length),H=0,A=l.length,G=0,C=E=0,F=l.length;
F>E;
C=E+=3){B[H++]=l[C],B[H++]=l[C+1],B[H++]=l[C+2],B[H++]=null!=(D=z[G++])?D:255
}return B
},t.prototype.copyToImageData=function(K,F){var B,z,L,D,A,I,J,H,C,E,G;
if(z=this.colors,C=null,B=this.hasAlphaChannel,this.palette.length&&(C=null!=(G=this._decodedPalette)?G:this._decodedPalette=this.decodePalette(),z=4,B=!0),L=K.data||K,H=L.length,A=C||F,D=I=0,1===z){for(;
H>D;
){J=C?4*F[D/4]:I,E=A[J++],L[D++]=E,L[D++]=E,L[D++]=E,L[D++]=B?A[J++]:255,I=J
}}else{for(;
H>D;
){J=C?4*F[D/4]:I,L[D++]=A[J++],L[D++]=A[J++],L[D++]=A[J++],L[D++]=B?A[J++]:255,I=J
}}},t.prototype.decode=function(){var e;
return e=new Uint8Array(this.width*this.height*4),this.copyToImageData(e,this.decodePixels()),e
};
try{v=i.document.createElement("canvas"),o=v.getContext("2d")
}catch(q){return -1
}return x=function(l){var n;
return o.width=l.width,o.height=l.height,o.clearRect(0,0,l.width,l.height),o.putImageData(l,0,0),n=new Image,n.src=v.toDataURL(),n
},t.prototype.decodeFrames=function(E){var B,z,l,F,A,u,D,C;
if(this.animation){for(D=this.animation.frames,C=[],z=A=0,u=D.length;
u>A;
z=++A){B=D[z],l=E.createImageData(B.width,B.height),F=this.decodePixels(new Uint8Array(B.data)),this.copyToImageData(l,F),B.imageData=l,C.push(B.image=x(l))
}return C
}},t.prototype.renderFrame=function(r,s){var z,l,u;
return l=this.animation.frames,z=l[s],u=l[s-1],0===s&&r.clearRect(0,0,this.width,this.height),(null!=u?u.disposeOp:void 0)===y?r.clearRect(u.xOffset,u.yOffset,u.width,u.height):(null!=u?u.disposeOp:void 0)===w&&r.putImageData(u.imageData,u.xOffset,u.yOffset),z.blendOp===k&&r.clearRect(z.xOffset,z.yOffset,z.width,z.height),r.drawImage(z.image,z.xOffset,z.yOffset)
},t.prototype.animate=function(z){var C,E,B,A,u,D,l=this;
return E=0,D=this.animation,A=D.numFrames,B=D.frames,u=D.numPlays,(C=function(){var n,e;
return n=E++%A,e=B[n],l.renderFrame(z,n),A>1&&u>E/A?l.animation._timeout=setTimeout(C,e.delay):void 0
})()
},t.prototype.stopAnimation=function(){var e;
return clearTimeout(null!=(e=this.animation)?e._timeout:void 0)
},t.prototype.render=function(l){var r,s;
return l._png&&l._png.stopAnimation(),l._png=this,l.width=this.width,l.height=this.height,r=l.getContext("2d"),this.animation?(this.decodeFrames(r),this.animate(r)):(s=r.createImageData(this.width,this.height),this.copyToImageData(s,this.decodePixels()),r.putImageData(s,0,0))
},t
}(),i.PNG=j
}("undefined"!=typeof window&&window||this);
var a=function(){function e(){this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=null
}return e.prototype={ensureBuffer:function(k){var o=this.buffer,p=o?o.byteLength:0;
if(p>k){return o
}for(var m=512;
k>m;
){m<<=1
}for(var l=new Uint8Array(m),j=0;
p>j;
++j){l[j]=o[j]
}return this.buffer=l
},getByte:function(){for(var i=this.pos;
this.bufferLength<=i;
){if(this.eof){return null
}this.readBlock()
}return this.buffer[this.pos++]
},getBytes:function(i){var k=this.pos;
if(i){this.ensureBuffer(k+i);
for(var l=k+i;
!this.eof&&this.bufferLength<l;
){this.readBlock()
}var j=this.bufferLength;
l>j&&(l=j)
}else{for(;
!this.eof;
){this.readBlock()
}var l=this.bufferLength
}return this.pos=l,this.buffer.subarray(k,l)
},lookChar:function(){for(var i=this.pos;
this.bufferLength<=i;
){if(this.eof){return null
}this.readBlock()
}return String.fromCharCode(this.buffer[this.pos])
},getChar:function(){for(var i=this.pos;
this.bufferLength<=i;
){if(this.eof){return null
}this.readBlock()
}return String.fromCharCode(this.buffer[this.pos++])
},makeSubStream:function(i,k,l){for(var j=i+k;
this.bufferLength<=j&&!this.eof;
){this.readBlock()
}return new Stream(this.buffer,i,k,l)
},skip:function(i){i||(i=1),this.pos+=i
},reset:function(){this.pos=0
}},e
}(),g=function(){function j(e){throw new Error(e)
}function m(u){var v=0,t=u[v++],o=u[v++];
(-1==t||-1==o)&&j("Invalid header in flate stream"),8!=(15&t)&&j("Unknown compression method in flate stream"),((t<<8)+o)%31!=0&&j("Bad FCHECK in flate stream"),32&o&&j("FDICT bit set in flate stream"),this.bytes=u,this.bytesPos=v,this.codeSize=0,this.codeBuf=0,a.call(this)
}if("undefined"==typeof Uint32Array){return void 0
}var q=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),l=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),k=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),p=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,590000,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],i=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];
return m.prototype=Object.create(a.prototype),m.prototype.getBits=function(w){for(var y,v=this.codeSize,u=this.codeBuf,t=this.bytes,x=this.bytesPos;
w>v;
){"undefined"==typeof(y=t[x++])&&j("Bad encoding in flate stream"),u|=y<<v,v+=8
}return y=u&(1<<w)-1,this.codeBuf=u>>w,this.codeSize=v-=w,this.bytesPos=x,y
},m.prototype.getCode=function(A){for(var w=A[0],t=A[1],E=this.codeSize,y=this.codeBuf,v=this.bytes,C=this.bytesPos;
t>E;
){var D;
"undefined"==typeof(D=v[C++])&&j("Bad encoding in flate stream"),y|=D<<E,E+=8
}var B=w[y&(1<<t)-1],x=B>>16,z=65535&B;
return(0==E||x>E||0==x)&&j("Bad encoding in flate stream"),this.codeBuf=y>>x,this.codeSize=E-x,this.bytesPos=C,z
},m.prototype.generateHuffmanTable=function(F){for(var B=F.length,x=0,v=0;
B>v;
++v){F[v]>x&&(x=F[v])
}for(var G=1<<x,z=new Uint32Array(G),w=1,D=0,E=2;
x>=w;
++w,D<<=1,E<<=1){for(var C=0;
B>C;
++C){if(F[C]==w){for(var y=0,A=D,v=0;
w>v;
++v){y=y<<1|1&A,A>>=1
}for(var v=y;
G>v;
v+=E){z[v]=w<<16|C
}++D
}}}return[z,x]
},m.prototype.readBlock=function(){function ac(v,y,z,x,w){for(var u=v.getBits(z)+x;
u-->0;
){y[X++]=w
}}var Y=this.getBits(3);
if(1&Y&&(this.eof=!0),Y>>=1,0==Y){var K,ae=this.bytes,W=this.bytesPos;
"undefined"==typeof(K=ae[W++])&&j("Bad block header in flate stream");
var ab=K;
"undefined"==typeof(K=ae[W++])&&j("Bad block header in flate stream"),ab|=K<<8,"undefined"==typeof(K=ae[W++])&&j("Bad block header in flate stream");
var ad=K;
"undefined"==typeof(K=ae[W++])&&j("Bad block header in flate stream"),ad|=K<<8,ad!=(65535&~ab)&&j("Bad uncompressed block length in flate stream"),this.codeBuf=0,this.codeSize=0;
var Z=this.bufferLength,U=this.ensureBuffer(Z+ab),V=Z+ab;
this.bufferLength=V;
for(var H=Z;
V>H;
++H){if("undefined"==typeof(K=ae[W++])){this.eof=!0;
break
}U[H]=K
}return void (this.bytesPos=W)
}var aa,D;
if(1==Y){aa=p,D=i
}else{if(2==Y){for(var J=this.getBits(5)+257,af=this.getBits(5)+1,Q=this.getBits(4)+4,G=Array(q.length),X=0;
Q>X;
){G[q[X++]]=this.getBits(3)
}for(var ag=this.generateHuffmanTable(G),R=0,X=0,M=J+af,o=new Array(M);
M>X;
){var L=this.getCode(ag);
16==L?ac(this,o,2,3,R):17==L?ac(this,o,3,3,R=0):18==L?ac(this,o,7,11,R=0):o[X++]=R=L
}aa=this.generateHuffmanTable(o.slice(0,J)),D=this.generateHuffmanTable(o.slice(J,M))
}else{j("Unknown block type in flate stream")
}}for(var U=this.buffer,t=U?U.length:0,n=this.bufferLength;
;
){var F=this.getCode(aa);
if(256>F){n+1>=t&&(U=this.ensureBuffer(n+1),t=U.length),U[n++]=F
}else{if(256==F){return void (this.bufferLength=n)
}F-=257,F=l[F];
var N=F>>16;
N>0&&(N=this.getBits(N));
var R=(65535&F)+N;
F=this.getCode(D),F=k[F],N=F>>16,N>0&&(N=this.getBits(N));
var s=(65535&F)+N;
n+R>=t&&(U=this.ensureBuffer(n+R),t=U.length);
for(var r=0;
R>r;
++r,++n){U[n]=U[n-s]
}}}},m
}();
!function(i){var j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
"undefined"==typeof i.btoa&&(i.btoa=function(D){var q,e,E,w,m,B,C,A,v=0,y=0,z="",x=[];
if(!D){return D
}do{q=D.charCodeAt(v++),e=D.charCodeAt(v++),E=D.charCodeAt(v++),A=q<<16|e<<8|E,w=A>>18&63,m=A>>12&63,B=A>>6&63,C=63&A,x[y++]=j.charAt(w)+j.charAt(m)+j.charAt(B)+j.charAt(C)
}while(v<D.length);
z=x.join("");
var k=D.length%3;
return(k?z.slice(0,k-3):z)+"===".slice(k||3)
}),"undefined"==typeof i.atob&&(i.atob=function(B){var m,e,C,q,k,z,A,y,p=0,w=0,x="",v=[];
if(!B){return B
}B+="";
do{q=j.indexOf(B.charAt(p++)),k=j.indexOf(B.charAt(p++)),z=j.indexOf(B.charAt(p++)),A=j.indexOf(B.charAt(p++)),y=q<<18|k<<12|z<<6|A,m=y>>16&255,e=y>>8&255,C=255&y,v[w++]=64==z?String.fromCharCode(m):64==A?String.fromCharCode(m,e):String.fromCharCode(m,e,C)
}while(p<B.length);
return x=v.join("")
}),Array.prototype.map||(Array.prototype.map=function(l){if(void 0===this||null===this||"function"!=typeof l){throw new TypeError
}for(var p=Object(this),q=p.length>>>0,o=new Array(q),m=arguments.length>1?arguments[1]:void 0,k=0;
q>k;
k++){k in p&&(o[k]=l.call(m,p[k],k,p))
}return o
}),Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)
}),Array.prototype.forEach||(Array.prototype.forEach=function(k,o){if(void 0===this||null===this||"function"!=typeof k){throw new TypeError
}for(var p=Object(this),m=p.length>>>0,l=0;
m>l;
l++){l in p&&k.call(o,p[l],l,p)
}}),Object.keys||(Object.keys=function(){var k=Object.prototype.hasOwnProperty,m=!{toString:null}.propertyIsEnumerable("toString"),o=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],l=o.length;
return function(p){if("object"!=typeof p&&("function"!=typeof p||null===p)){throw new TypeError
}var n,q,e=[];
for(n in p){k.call(p,n)&&e.push(n)
}if(m){for(q=0;
l>q;
q++){k.call(p,o[q])&&e.push(o[q])
}}return e
}
}()),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
}),String.prototype.trimLeft||(String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")
}),String.prototype.trimRight||(String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")
})
}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this)
}({},function(){return this
}());