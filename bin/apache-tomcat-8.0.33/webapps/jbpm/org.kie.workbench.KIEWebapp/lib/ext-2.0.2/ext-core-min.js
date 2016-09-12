Ext.DomHelper=function(){var g=null;
var m=/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i;
var c=/^table|tbody|tr|td$/i;
var d=function(p){if(typeof p=="string"){return p
}var u="";
if(Ext.isArray(p)){for(var r=0,t=p.length;
r<t;
r++){u+=d(p[r])
}return u
}if(!p.tag){p.tag="div"
}u+="<"+p.tag;
for(var v in p){if(v=="tag"||v=="children"||v=="cn"||v=="html"||typeof p[v]=="function"){continue
}if(v=="style"){var q=p.style;
if(typeof q=="function"){q=q.call()
}if(typeof q=="string"){u+=' style="'+q+'"'
}else{if(typeof q=="object"){u+=' style="';
for(var s in q){if(typeof q[s]!="function"){u+=s+":"+q[s]+";"
}}u+='"'
}}}else{if(v=="cls"){u+=' class="'+p.cls+'"'
}else{if(v=="htmlFor"){u+=' for="'+p.htmlFor+'"'
}else{u+=" "+v+'="'+p[v]+'"'
}}}}if(m.test(p.tag)){u+="/>"
}else{u+=">";
var o=p.children||p.cn;
if(o){u+=d(o)
}else{if(p.html){u+=p.html
}}u+="</"+p.tag+">"
}return u
};
var e=function(p,u){var q;
if(Ext.isArray(p)){q=document.createDocumentFragment();
for(var r=0,t=p.length;
r<t;
r++){e(p[r],q)
}}else{if(typeof p=="string)"){q=document.createTextNode(p)
}else{q=document.createElement(p.tag||"div");
var s=!!q.setAttribute;
for(var v in p){if(v=="tag"||v=="children"||v=="cn"||v=="html"||v=="style"||typeof p[v]=="function"){continue
}if(v=="cls"){q.className=p.cls
}else{if(s){q.setAttribute(v,p[v])
}else{q[v]=p[v]
}}}Ext.DomHelper.applyStyles(q,p.style);
var o=p.children||p.cn;
if(o){e(o,q)
}else{if(p.html){q.innerHTML=p.html
}}}}if(u){u.appendChild(q)
}return q
};
var j=function(o,q,r,p){g.innerHTML=[q,r,p].join("");
var t=-1,s=g;
while(++t<o){s=s.firstChild
}return s
};
var i="<table>",n="</table>",b=i+"<tbody>",h="</tbody>"+n,k=b+"<tr>",a="</tr>"+h;
var l=function(t,s,q,r){if(!g){g=document.createElement("div")
}var p;
var o=null;
if(t=="td"){if(s=="afterbegin"||s=="beforeend"){return
}if(s=="beforebegin"){o=q;
q=q.parentNode
}else{o=q.nextSibling;
q=q.parentNode
}p=j(4,k,r,a)
}else{if(t=="tr"){if(s=="beforebegin"){o=q;
q=q.parentNode;
p=j(3,b,r,h)
}else{if(s=="afterend"){o=q.nextSibling;
q=q.parentNode;
p=j(3,b,r,h)
}else{if(s=="afterbegin"){o=q.firstChild
}p=j(4,k,r,a)
}}}else{if(t=="tbody"){if(s=="beforebegin"){o=q;
q=q.parentNode;
p=j(2,i,r,n)
}else{if(s=="afterend"){o=q.nextSibling;
q=q.parentNode;
p=j(2,i,r,n)
}else{if(s=="afterbegin"){o=q.firstChild
}p=j(3,b,r,h)
}}}else{if(s=="beforebegin"||s=="afterend"){return
}if(s=="afterbegin"){o=q.firstChild
}p=j(2,i,r,n)
}}}q.insertBefore(p,o);
return p
};
return{useDom:false,markup:function(o){return d(o)
},applyStyles:function(q,p){if(p){q=Ext.fly(q);
if(typeof p=="string"){var r=/\s?([a-z\-]*)\:\s?([^;]*);?/gi;
var o;
while((o=r.exec(p))!=null){q.setStyle(o[1],o[2])
}}else{if(typeof p=="object"){for(var s in p){q.setStyle(s,p[s])
}}else{if(typeof p=="function"){Ext.DomHelper.applyStyles(q,p.call())
}}}}},insertHtml:function(r,p,q){r=r.toLowerCase();
if(p.insertAdjacentHTML){if(c.test(p.tagName)){var s;
if(s=l(p.tagName.toLowerCase(),r,p,q)){return s
}}switch(r){case"beforebegin":p.insertAdjacentHTML("BeforeBegin",q);
return p.previousSibling;
case"afterbegin":p.insertAdjacentHTML("AfterBegin",q);
return p.firstChild;
case"beforeend":p.insertAdjacentHTML("BeforeEnd",q);
return p.lastChild;
case"afterend":p.insertAdjacentHTML("AfterEnd",q);
return p.nextSibling
}throw'Illegal insertion point -> "'+r+'"'
}var t=p.ownerDocument.createRange();
var o;
switch(r){case"beforebegin":t.setStartBefore(p);
o=t.createContextualFragment(q);
p.parentNode.insertBefore(o,p);
return p.previousSibling;
case"afterbegin":if(p.firstChild){t.setStartBefore(p.firstChild);
o=t.createContextualFragment(q);
p.insertBefore(o,p.firstChild);
return p.firstChild
}else{p.innerHTML=q;
return p.firstChild
}case"beforeend":if(p.lastChild){t.setStartAfter(p.lastChild);
o=t.createContextualFragment(q);
p.appendChild(o);
return p.lastChild
}else{p.innerHTML=q;
return p.lastChild
}case"afterend":t.setStartAfter(p);
o=t.createContextualFragment(q);
p.parentNode.insertBefore(o,p.nextSibling);
return p.nextSibling
}throw'Illegal insertion point -> "'+r+'"'
},insertBefore:function(q,o,p){return this.doInsert(q,o,p,"beforeBegin")
},insertAfter:function(q,o,p){return this.doInsert(q,o,p,"afterEnd","nextSibling")
},insertFirst:function(q,o,p){return this.doInsert(q,o,p,"afterBegin","firstChild")
},doInsert:function(r,p,q,o,s){r=Ext.getDom(r);
var t;
if(this.useDom){t=e(p,null);
(s==="firstChild"?r:r.parentNode).insertBefore(t,s?r[s]:r)
}else{var u=d(p);
t=this.insertHtml(o,r,u)
}return q?Ext.get(t,true):t
},append:function(q,o,p){q=Ext.getDom(q);
var r;
if(this.useDom){r=e(o,null);
q.appendChild(r)
}else{var s=d(o);
r=this.insertHtml("beforeEnd",q,s)
}return p?Ext.get(r,true):r
},overwrite:function(q,o,p){q=Ext.getDom(q);
q.innerHTML=d(o);
return p?Ext.get(q.firstChild,true):q.firstChild
},createTemplate:function(o){var p=d(o);
return new Ext.Template(p)
}}
}();
Ext.Template=function(b){var e=arguments;
if(Ext.isArray(b)){b=b.join("")
}else{if(e.length>1){var d=[];
for(var c=0,a=e.length;
c<a;
c++){if(typeof e[c]=="object"){Ext.apply(this,e[c])
}else{d[d.length]=e[c]
}}b=d.join("")
}}this.html=b;
if(this.compiled){this.compile()
}};
Ext.Template.prototype={applyTemplate:function(e){if(this.compiled){return this.compiled(e)
}var a=this.disableFormats!==true;
var b=Ext.util.Format,d=this;
var c=function(l,j,g,k){if(g&&a){if(g.substr(0,5)=="this."){return d.call(g.substr(5),e[j],e)
}else{if(k){var h=/^\s*['"](.*)["']\s*$/;
k=k.split(",");
for(var i=0,m=k.length;
i<m;
i++){k[i]=k[i].replace(h,"$1")
}k=[e[j]].concat(k)
}else{k=[e[j]]
}return b[g].apply(b,k)
}}else{return e[j]!==undefined?e[j]:""
}};
return this.html.replace(this.re,c)
},set:function(a,b){this.html=a;
this.compiled=null;
if(b){this.compile()
}return this
},disableFormats:false,re:/\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,compile:function(){var fm=Ext.util.Format;
var useF=this.disableFormats!==true;
var sep=Ext.isGecko?"+":",";
var fn=function(m,name,format,args){if(format&&useF){args=args?","+args:"";
if(format.substr(0,5)!="this."){format="fm."+format+"("
}else{format='this.call("'+format.substr(5)+'", ';
args=", values"
}}else{args="";
format="(values['"+name+"'] == undefined ? '' : "
}return"'"+sep+format+"values['"+name+"']"+args+")"+sep+"'"
};
var body;
if(Ext.isGecko){body="this.compiled = function(values){ return '"+this.html.replace(/\\/g,"\\\\").replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn)+"';};"
}else{body=["this.compiled = function(values){ return ['"];
body.push(this.html.replace(/\\/g,"\\\\").replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn));
body.push("'].join('');};");
body=body.join("")
}eval(body);
return this
},call:function(b,c,a){return this[b](c,a)
},insertFirst:function(c,a,b){return this.doInsert("afterBegin",c,a,b)
},insertBefore:function(c,a,b){return this.doInsert("beforeBegin",c,a,b)
},insertAfter:function(c,a,b){return this.doInsert("afterEnd",c,a,b)
},append:function(c,a,b){return this.doInsert("beforeEnd",c,a,b)
},doInsert:function(d,b,e,a){b=Ext.getDom(b);
var c=Ext.DomHelper.insertHtml(d,b,this.applyTemplate(e));
return a?Ext.get(c,true):c
},overwrite:function(c,a,b){c=Ext.getDom(c);
c.innerHTML=this.applyTemplate(a);
return b?Ext.get(c.firstChild,true):c.firstChild
}};
Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;
Ext.DomHelper.Template=Ext.Template;
Ext.Template.from=function(b,a){b=Ext.getDom(b);
return new Ext.Template(b.value||b.innerHTML,a||"")
};
Ext.DomQuery=function(){var cache={},simpleCache={},valueCache={};
var nonSpace=/\S/;
var trimRe=/^\s+|\s+$/g;
var tplRe=/\{(\d+)\}/g;
var modeRe=/^(\s?[\/>+~]\s?|\s|$)/;
var tagTokenRe=/^(#)?([\w-\*]+)/;
var nthRe=/(\d*)n\+?(\d*)/,nthRe2=/\D/;
function child(p,index){var i=0;
var n=p.firstChild;
while(n){if(n.nodeType==1){if(++i==index){return n
}}n=n.nextSibling
}return null
}function next(n){while((n=n.nextSibling)&&n.nodeType!=1){}return n
}function prev(n){while((n=n.previousSibling)&&n.nodeType!=1){}return n
}function children(d){var n=d.firstChild,ni=-1;
while(n){var nx=n.nextSibling;
if(n.nodeType==3&&!nonSpace.test(n.nodeValue)){d.removeChild(n)
}else{n.nodeIndex=++ni
}n=nx
}return this
}function byClassName(c,a,v){if(!v){return c
}var r=[],ri=-1,cn;
for(var i=0,ci;
ci=c[i];
i++){if((" "+ci.className+" ").indexOf(v)!=-1){r[++ri]=ci
}}return r
}function attrValue(n,attr){if(!n.tagName&&typeof n.length!="undefined"){n=n[0]
}if(!n){return null
}if(attr=="for"){return n.htmlFor
}if(attr=="class"||attr=="className"){return n.className
}return n.getAttribute(attr)||n[attr]
}function getNodes(ns,mode,tagName){var result=[],ri=-1,cs;
if(!ns){return result
}tagName=tagName||"*";
if(typeof ns.getElementsByTagName!="undefined"){ns=[ns]
}if(!mode){for(var i=0,ni;
ni=ns[i];
i++){cs=ni.getElementsByTagName(tagName);
for(var j=0,ci;
ci=cs[j];
j++){result[++ri]=ci
}}}else{if(mode=="/"||mode==">"){var utag=tagName.toUpperCase();
for(var i=0,ni,cn;
ni=ns[i];
i++){cn=ni.children||ni.childNodes;
for(var j=0,cj;
cj=cn[j];
j++){if(cj.nodeName==utag||cj.nodeName==tagName||tagName=="*"){result[++ri]=cj
}}}}else{if(mode=="+"){var utag=tagName.toUpperCase();
for(var i=0,n;
n=ns[i];
i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(n&&(n.nodeName==utag||n.nodeName==tagName||tagName=="*")){result[++ri]=n
}}}else{if(mode=="~"){for(var i=0,n;
n=ns[i];
i++){while((n=n.nextSibling)&&(n.nodeType!=1||(tagName=="*"||n.tagName.toLowerCase()!=tagName))){}if(n){result[++ri]=n
}}}}}}return result
}function concat(a,b){if(b.slice){return a.concat(b)
}for(var i=0,l=b.length;
i<l;
i++){a[a.length]=b[i]
}return a
}function byTag(cs,tagName){if(cs.tagName||cs==document){cs=[cs]
}if(!tagName){return cs
}var r=[],ri=-1;
tagName=tagName.toLowerCase();
for(var i=0,ci;
ci=cs[i];
i++){if(ci.nodeType==1&&ci.tagName.toLowerCase()==tagName){r[++ri]=ci
}}return r
}function byId(cs,attr,id){if(cs.tagName||cs==document){cs=[cs]
}if(!id){return cs
}var r=[],ri=-1;
for(var i=0,ci;
ci=cs[i];
i++){if(ci&&ci.id==id){r[++ri]=ci;
return r
}}return r
}function byAttribute(cs,attr,value,op,custom){var r=[],ri=-1,st=custom=="{";
var f=Ext.DomQuery.operators[op];
for(var i=0,ci;
ci=cs[i];
i++){var a;
if(st){a=Ext.DomQuery.getStyle(ci,attr)
}else{if(attr=="class"||attr=="className"){a=ci.className
}else{if(attr=="for"){a=ci.htmlFor
}else{if(attr=="href"){a=ci.getAttribute("href",2)
}else{a=ci.getAttribute(attr)
}}}}if((f&&f(a,value))||(!f&&a)){r[++ri]=ci
}}return r
}function byPseudo(cs,name,value){return Ext.DomQuery.pseudos[name](cs,value)
}var isIE=window.ActiveXObject?true:false;
eval("var batch = 30803;");
var key=30803;
function nodupIEXml(cs){var d=++key;
cs[0].setAttribute("_nodup",d);
var r=[cs[0]];
for(var i=1,len=cs.length;
i<len;
i++){var c=cs[i];
if(!c.getAttribute("_nodup")!=d){c.setAttribute("_nodup",d);
r[r.length]=c
}}for(var i=0,len=cs.length;
i<len;
i++){cs[i].removeAttribute("_nodup")
}return r
}function nodup(cs){if(!cs){return[]
}var len=cs.length,c,i,r=cs,cj,ri=-1;
if(!len||typeof cs.nodeType!="undefined"||len==1){return cs
}if(isIE&&typeof cs[0].selectSingleNode!="undefined"){return nodupIEXml(cs)
}var d=++key;
cs[0]._nodup=d;
for(i=1;
c=cs[i];
i++){if(c._nodup!=d){c._nodup=d
}else{r=[];
for(var j=0;
j<i;
j++){r[++ri]=cs[j]
}for(j=i+1;
cj=cs[j];
j++){if(cj._nodup!=d){cj._nodup=d;
r[++ri]=cj
}}return r
}}return r
}function quickDiffIEXml(c1,c2){var d=++key;
for(var i=0,len=c1.length;
i<len;
i++){c1[i].setAttribute("_qdiff",d)
}var r=[];
for(var i=0,len=c2.length;
i<len;
i++){if(c2[i].getAttribute("_qdiff")!=d){r[r.length]=c2[i]
}}for(var i=0,len=c1.length;
i<len;
i++){c1[i].removeAttribute("_qdiff")
}return r
}function quickDiff(c1,c2){var len1=c1.length;
if(!len1){return c2
}if(isIE&&c1[0].selectSingleNode){return quickDiffIEXml(c1,c2)
}var d=++key;
for(var i=0;
i<len1;
i++){c1[i]._qdiff=d
}var r=[];
for(var i=0,len=c2.length;
i<len;
i++){if(c2[i]._qdiff!=d){r[r.length]=c2[i]
}}return r
}function quickId(ns,mode,root,id){if(ns==root){var d=root.ownerDocument||root;
return d.getElementById(id)
}ns=getNodes(ns,mode,"*");
return byId(ns,null,id)
}return{getStyle:function(el,name){return Ext.fly(el).getStyle(name)
},compile:function(path,type){type=type||"select";
var fn=["var f = function(root){\n var mode; ++batch; var n = root || document;\n"];
var q=path,mode,lq;
var tk=Ext.DomQuery.matchers;
var tklen=tk.length;
var mm;
var lmode=q.match(modeRe);
if(lmode&&lmode[1]){fn[fn.length]='mode="'+lmode[1].replace(trimRe,"")+'";';
q=q.replace(lmode[1],"")
}while(path.substr(0,1)=="/"){path=path.substr(1)
}while(q&&lq!=q){lq=q;
var tm=q.match(tagTokenRe);
if(type=="select"){if(tm){if(tm[1]=="#"){fn[fn.length]='n = quickId(n, mode, root, "'+tm[2]+'");'
}else{fn[fn.length]='n = getNodes(n, mode, "'+tm[2]+'");'
}q=q.replace(tm[0],"")
}else{if(q.substr(0,1)!="@"){fn[fn.length]='n = getNodes(n, mode, "*");'
}}}else{if(tm){if(tm[1]=="#"){fn[fn.length]='n = byId(n, null, "'+tm[2]+'");'
}else{fn[fn.length]='n = byTag(n, "'+tm[2]+'");'
}q=q.replace(tm[0],"")
}}while(!(mm=q.match(modeRe))){var matched=false;
for(var j=0;
j<tklen;
j++){var t=tk[j];
var m=q.match(t.re);
if(m){fn[fn.length]=t.select.replace(tplRe,function(x,i){return m[i]
});
q=q.replace(m[0],"");
matched=true;
break
}}if(!matched){throw'Error parsing selector, parsing failed at "'+q+'"'
}}if(mm[1]){fn[fn.length]='mode="'+mm[1].replace(trimRe,"")+'";';
q=q.replace(mm[1],"")
}}fn[fn.length]="return nodup(n);\n}";
eval(fn.join(""));
return f
},select:function(path,root,type){if(!root||root==document){root=document
}if(typeof root=="string"){root=document.getElementById(root)
}var paths=path.split(",");
var results=[];
for(var i=0,len=paths.length;
i<len;
i++){var p=paths[i].replace(trimRe,"");
if(!cache[p]){cache[p]=Ext.DomQuery.compile(p);
if(!cache[p]){throw p+" is not a valid selector"
}}var result=cache[p](root);
if(result&&result!=document){results=results.concat(result)
}}if(paths.length>1){return nodup(results)
}return results
},selectNode:function(path,root){return Ext.DomQuery.select(path,root)[0]
},selectValue:function(path,root,defaultValue){path=path.replace(trimRe,"");
if(!valueCache[path]){valueCache[path]=Ext.DomQuery.compile(path,"select")
}var n=valueCache[path](root);
n=n[0]?n[0]:n;
var v=(n&&n.firstChild?n.firstChild.nodeValue:null);
return((v===null||v===undefined||v==="")?defaultValue:v)
},selectNumber:function(path,root,defaultValue){var v=Ext.DomQuery.selectValue(path,root,defaultValue||0);
return parseFloat(v)
},is:function(el,ss){if(typeof el=="string"){el=document.getElementById(el)
}var isArray=Ext.isArray(el);
var result=Ext.DomQuery.filter(isArray?el:[el],ss);
return isArray?(result.length==el.length):(result.length>0)
},filter:function(els,ss,nonMatches){ss=ss.replace(trimRe,"");
if(!simpleCache[ss]){simpleCache[ss]=Ext.DomQuery.compile(ss,"simple")
}var result=simpleCache[ss](els);
return nonMatches?quickDiff(result,els):result
},matchers:[{re:/^\.([\w-]+)/,select:'n = byClassName(n, null, " {1} ");'},{re:/^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,select:'n = byPseudo(n, "{1}", "{2}");'},{re:/^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,select:'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'},{re:/^#([\w-]+)/,select:'n = byId(n, null, "{1}");'},{re:/^@([\w-]+)/,select:'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'}],operators:{"=":function(a,v){return a==v
},"!=":function(a,v){return a!=v
},"^=":function(a,v){return a&&a.substr(0,v.length)==v
},"$=":function(a,v){return a&&a.substr(a.length-v.length)==v
},"*=":function(a,v){return a&&a.indexOf(v)!==-1
},"%=":function(a,v){return(a%v)==0
},"|=":function(a,v){return a&&(a==v||a.substr(0,v.length+1)==v+"-")
},"~=":function(a,v){return a&&(" "+a+" ").indexOf(" "+v+" ")!=-1
}},pseudos:{"first-child":function(c){var r=[],ri=-1,n;
for(var i=0,ci;
ci=n=c[i];
i++){while((n=n.previousSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci
}}return r
},"last-child":function(c){var r=[],ri=-1,n;
for(var i=0,ci;
ci=n=c[i];
i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci
}}return r
},"nth-child":function(c,a){var r=[],ri=-1;
var m=nthRe.exec(a=="even"&&"2n"||a=="odd"&&"2n+1"||!nthRe2.test(a)&&"n+"+a||a);
var f=(m[1]||1)-0,l=m[2]-0;
for(var i=0,n;
n=c[i];
i++){var pn=n.parentNode;
if(batch!=pn._batch){var j=0;
for(var cn=pn.firstChild;
cn;
cn=cn.nextSibling){if(cn.nodeType==1){cn.nodeIndex=++j
}}pn._batch=batch
}if(f==1){if(l==0||n.nodeIndex==l){r[++ri]=n
}}else{if((n.nodeIndex+l)%f==0){r[++ri]=n
}}}return r
},"only-child":function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(!prev(ci)&&!next(ci)){r[++ri]=ci
}}return r
},empty:function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var cns=ci.childNodes,j=0,cn,empty=true;
while(cn=cns[j]){++j;
if(cn.nodeType==1||cn.nodeType==3){empty=false;
break
}}if(empty){r[++ri]=ci
}}return r
},contains:function(c,v){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if((ci.textContent||ci.innerText||"").indexOf(v)!=-1){r[++ri]=ci
}}return r
},nodeValue:function(c,v){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(ci.firstChild&&ci.firstChild.nodeValue==v){r[++ri]=ci
}}return r
},checked:function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(ci.checked==true){r[++ri]=ci
}}return r
},not:function(c,ss){return Ext.DomQuery.filter(c,ss,true)
},any:function(c,selectors){var ss=selectors.split("|");
var r=[],ri=-1,s;
for(var i=0,ci;
ci=c[i];
i++){for(var j=0;
s=ss[j];
j++){if(Ext.DomQuery.is(ci,s)){r[++ri]=ci;
break
}}}return r
},odd:function(c){return this["nth-child"](c,"odd")
},even:function(c){return this["nth-child"](c,"even")
},nth:function(c,a){return c[a-1]||[]
},first:function(c){return c[0]||[]
},last:function(c){return c[c.length-1]||[]
},has:function(c,ss){var s=Ext.DomQuery.select;
var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(s(ss,ci).length>0){r[++ri]=ci
}}return r
},next:function(c,ss){var is=Ext.DomQuery.is;
var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var n=next(ci);
if(n&&is(n,ss)){r[++ri]=ci
}}return r
},prev:function(c,ss){var is=Ext.DomQuery.is;
var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var n=prev(ci);
if(n&&is(n,ss)){r[++ri]=ci
}}return r
}}}
}();
Ext.query=Ext.DomQuery.select;
Ext.util.Observable=function(){if(this.listeners){this.on(this.listeners);
delete this.listeners
}};
Ext.util.Observable.prototype={fireEvent:function(){if(this.eventsSuspended!==true){var a=this.events[arguments[0].toLowerCase()];
if(typeof a=="object"){return a.fire.apply(a,Array.prototype.slice.call(arguments,1))
}}return true
},filterOptRe:/^(?:scope|delay|buffer|single)$/,addListener:function(a,e,g,b){if(typeof a=="object"){b=a;
for(var c in b){if(this.filterOptRe.test(c)){continue
}if(typeof b[c]=="function"){this.addListener(c,b[c],b.scope,b)
}else{this.addListener(c,b[c].fn,b[c].scope,b[c])
}}return
}b=(!b||typeof b=="boolean")?{}:b;
a=a.toLowerCase();
var d=this.events[a]||true;
if(typeof d=="boolean"){d=new Ext.util.Event(this,a);
this.events[a]=d
}d.addListener(e,g,b)
},removeListener:function(a,c,d){var b=this.events[a.toLowerCase()];
if(typeof b=="object"){b.removeListener(c,d)
}},purgeListeners:function(){for(var a in this.events){if(typeof this.events[a]=="object"){this.events[a].clearListeners()
}}},relayEvents:function(b,d){var c=function(h){return function(){return this.fireEvent.apply(this,Ext.combine(h,Array.prototype.slice.call(arguments,0)))
}
};
for(var e=0,a=d.length;
e<a;
e++){var g=d[e];
if(!this.events[g]){this.events[g]=true
}b.on(g,c(g),this)
}},addEvents:function(b){if(!this.events){this.events={}
}if(typeof b=="string"){for(var c=0,a=arguments,d;
d=a[c];
c++){if(!this.events[a[c]]){b[a[c]]=true
}}}else{Ext.applyIf(this.events,b)
}},hasListener:function(a){var b=this.events[a];
return typeof b=="object"&&b.listeners.length>0
},suspendEvents:function(){this.eventsSuspended=true
},resumeEvents:function(){this.eventsSuspended=false
},getMethodEvent:function(b){if(!this.methodEvents){this.methodEvents={}
}var c=this.methodEvents[b];
if(!c){c={};
this.methodEvents[b]=c;
c.originalFn=this[b];
c.methodName=b;
c.before=[];
c.after=[];
var g,h,e;
var d=this;
var a=function(i,j,k){if((h=i.apply(j||d,k))!==undefined){if(typeof h==="object"){if(h.returnValue!==undefined){g=h.returnValue
}else{g=h
}if(h.cancel===true){e=true
}}else{if(h===false){e=true
}else{g=h
}}}};
this[b]=function(){g=h=undefined;
e=false;
var j=Array.prototype.slice.call(arguments,0);
for(var i=0,k=c.before.length;
i<k;
i++){a(c.before[i].fn,c.before[i].scope,j);
if(e){return g
}}if((h=c.originalFn.apply(d,j))!==undefined){g=h
}for(var i=0,k=c.after.length;
i<k;
i++){a(c.after[i].fn,c.after[i].scope,j);
if(e){return g
}}return g
}
}return c
},beforeMethod:function(b,d,a){var c=this.getMethodEvent(b);
c.before.push({fn:d,scope:a})
},afterMethod:function(b,d,a){var c=this.getMethodEvent(b);
c.after.push({fn:d,scope:a})
},removeMethodListener:function(b,d,e){var c=this.getMethodEvent(b);
for(var g=0,a=c.before.length;
g<a;
g++){if(c.before[g].fn==d&&c.before[g].scope==e){c.before.splice(g,1);
return
}}for(var g=0,a=c.after.length;
g<a;
g++){if(c.after[g].fn==d&&c.after[g].scope==e){c.after.splice(g,1);
return
}}}};
Ext.util.Observable.prototype.on=Ext.util.Observable.prototype.addListener;
Ext.util.Observable.prototype.un=Ext.util.Observable.prototype.removeListener;
Ext.util.Observable.capture=function(b,c,a){b.fireEvent=b.fireEvent.createInterceptor(c,a)
};
Ext.util.Observable.releaseCapture=function(a){a.fireEvent=Ext.util.Observable.prototype.fireEvent
};
(function(){var c=function(e,d,g){var h=new Ext.util.DelayedTask();
return function(){h.delay(d.buffer,e,g,Array.prototype.slice.call(arguments,0))
}
};
var b=function(e,d,g,h){return function(){d.removeListener(g,h);
return e.apply(h,arguments)
}
};
var a=function(e,d,g){return function(){var h=Array.prototype.slice.call(arguments,0);
setTimeout(function(){e.apply(g,h)
},d.delay||10)
}
};
Ext.util.Event=function(d,e){this.name=e;
this.obj=d;
this.listeners=[]
};
Ext.util.Event.prototype={addListener:function(d,e,g){e=e||this.obj;
if(!this.isListening(d,e)){var h=this.createListener(d,e,g);
if(!this.firing){this.listeners.push(h)
}else{this.listeners=this.listeners.slice(0);
this.listeners.push(h)
}}},createListener:function(e,g,d){d=d||{};
g=g||this.obj;
var i={fn:e,scope:g,options:d};
var h=e;
if(d.delay){h=a(h,d,g)
}if(d.single){h=b(h,this,e,g)
}if(d.buffer){h=c(h,d,g)
}i.fireFn=h;
return i
},findListener:function(d,e){e=e||this.obj;
var h=this.listeners;
for(var g=0,j=h.length;
g<j;
g++){var i=h[g];
if(i.fn==d&&i.scope==e){return g
}}return -1
},isListening:function(d,e){return this.findListener(d,e)!=-1
},removeListener:function(d,e){var g;
if((g=this.findListener(d,e))!=-1){if(!this.firing){this.listeners.splice(g,1)
}else{this.listeners=this.listeners.slice(0);
this.listeners.splice(g,1)
}return true
}return false
},clearListeners:function(){this.listeners=[]
},fire:function(){var h=this.listeners,d,j=h.length;
if(j>0){this.firing=true;
var g=Array.prototype.slice.call(arguments,0);
for(var e=0;
e<j;
e++){var i=h[e];
if(i.fireFn.apply(i.scope||this.obj||window,arguments)===false){this.firing=false;
return false
}}this.firing=false
}return true
}}
})();
Ext.EventManager=function(){var a,i,m=false;
var k,b,q,g;
var j=Ext.lib.Event;
var h=Ext.lib.Dom;
var r=function(){if(!m){m=true;
Ext.isReady=true;
if(i){clearInterval(i)
}if(Ext.isGecko||Ext.isOpera){document.removeEventListener("DOMContentLoaded",r,false)
}if(Ext.isIE){var t=document.getElementById("ie-deferred-loader");
if(t){t.onreadystatechange=null;
t.parentNode.removeChild(t)
}}if(a){a.fire();
a.clearListeners()
}}};
var s=function(){a=new Ext.util.Event();
if(Ext.isGecko||Ext.isOpera){document.addEventListener("DOMContentLoaded",r,false)
}else{if(Ext.isIE){document.write('<script id="ie-deferred-loader" defer="defer" src="//:"><\/script>');
var t=document.getElementById("ie-deferred-loader");
t.onreadystatechange=function(){if(this.readyState=="complete"){r()
}}
}else{if(Ext.isSafari){i=setInterval(function(){var u=document.readyState;
if(u=="complete"){r()
}},10)
}}}j.on(window,"load",r)
};
var c=function(u,t){var v=new Ext.util.DelayedTask(u);
return function(w){w=new Ext.EventObjectImpl(w);
v.delay(t.buffer,u,null,[w])
}
};
var e=function(t,u,w,v){return function(x){Ext.EventManager.removeListener(u,w,v);
t(x)
}
};
var p=function(u,t){return function(v){v=new Ext.EventObjectImpl(v);
setTimeout(function(){u(v)
},t.delay||10)
}
};
var l=function(v,w,y,z,A){var x=(!y||typeof y=="boolean")?{}:y;
z=z||x.fn;
A=A||x.scope;
var t=Ext.getDom(v);
if(!t){throw'Error listening for "'+w+'". Element "'+v+"\" doesn't exist."
}var u=function(B){B=Ext.EventObject.setEvent(B);
var C;
if(x.delegate){C=B.getTarget(x.delegate,t);
if(!C){return
}}else{C=B.target
}if(x.stopEvent===true){B.stopEvent()
}if(x.preventDefault===true){B.preventDefault()
}if(x.stopPropagation===true){B.stopPropagation()
}if(x.normalized===false){B=B.browserEvent
}z.call(A||t,B,C,x)
};
if(x.delay){u=p(u,x)
}if(x.single){u=e(u,t,w,z)
}if(x.buffer){u=c(u,x)
}z._handlers=z._handlers||[];
z._handlers.push([Ext.id(t),w,u]);
j.on(t,w,u);
if(w=="mousewheel"&&t.addEventListener){t.addEventListener("DOMMouseScroll",u,false);
j.on(window,"unload",function(){t.removeEventListener("DOMMouseScroll",u,false)
})
}if(w=="mousedown"&&t==document){Ext.EventManager.stoppedMouseDownEvent.addListener(u)
}return u
};
var o=function(B,z,u){var t=Ext.id(B),A=u._handlers,w=u;
if(A){for(var y=0,v=A.length;
y<v;
y++){var x=A[y];
if(x[0]==t&&x[1]==z){w=x[2];
A.splice(y,1);
break
}}}j.un(B,z,w);
B=Ext.getDom(B);
if(z=="mousewheel"&&B.addEventListener){B.removeEventListener("DOMMouseScroll",w,false)
}if(z=="mousedown"&&B==document){Ext.EventManager.stoppedMouseDownEvent.removeListener(w)
}};
var n=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
var d={addListener:function(v,x,t,u,w){if(typeof x=="object"){var y=x;
for(var z in y){if(n.test(z)){continue
}if(typeof y[z]=="function"){l(v,z,y,y[z],y.scope)
}else{l(v,z,y[z])
}}return
}return l(v,x,w,t,u)
},removeListener:function(u,v,t){return o(u,v,t)
},onDocumentReady:function(t,u,v){if(m){a.addListener(t,u,v);
a.fire();
a.clearListeners();
return
}if(!a){s()
}a.addListener(t,u,v)
},onWindowResize:function(t,u,v){if(!k){k=new Ext.util.Event();
b=new Ext.util.DelayedTask(function(){k.fire(h.getViewWidth(),h.getViewHeight())
});
j.on(window,"resize",this.fireWindowResize,this)
}k.addListener(t,u,v)
},fireWindowResize:function(){if(k){if((Ext.isIE||Ext.isAir)&&b){b.delay(50)
}else{k.fire(h.getViewWidth(),h.getViewHeight())
}}},onTextResize:function(t,u,w){if(!q){q=new Ext.util.Event();
var v=new Ext.Element(document.createElement("div"));
v.dom.className="x-text-resize";
v.dom.innerHTML="X";
v.appendTo(document.body);
g=v.dom.offsetHeight;
setInterval(function(){if(v.dom.offsetHeight!=g){q.fire(g,g=v.dom.offsetHeight)
}},this.textResizeInterval)
}q.addListener(t,u,w)
},removeResizeListener:function(t,u){if(k){k.removeListener(t,u)
}},fireResize:function(){if(k){k.fire(h.getViewWidth(),h.getViewHeight())
}},ieDeferSrc:false,textResizeInterval:50};
d.on=d.addListener;
d.un=d.removeListener;
d.stoppedMouseDownEvent=new Ext.util.Event();
return d
}();
Ext.onReady=Ext.EventManager.onDocumentReady;
Ext.onReady(function(){var c=Ext.getBody();
if(!c){return
}var a=[Ext.isIE?"ext-ie "+(Ext.isIE6?"ext-ie6":"ext-ie7"):Ext.isGecko?"ext-gecko":Ext.isOpera?"ext-opera":Ext.isSafari?"ext-safari":""];
if(Ext.isMac){a.push("ext-mac")
}if(Ext.isLinux){a.push("ext-linux")
}if(Ext.isBorderBox){a.push("ext-border-box")
}if(Ext.isStrict){var b=c.dom.parentNode;
if(b){b.className+=" ext-strict"
}}c.addClass(a.join(" "))
});
Ext.EventObject=function(){var c=Ext.lib.Event;
var a={63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35};
var b=Ext.isIE?{1:0,4:1,2:2}:(Ext.isSafari?{1:0,2:1,3:2}:{0:0,1:1,2:2});
Ext.EventObjectImpl=function(d){if(d){this.setEvent(d.browserEvent||d)
}};
Ext.EventObjectImpl.prototype={browserEvent:null,button:-1,shiftKey:false,ctrlKey:false,altKey:false,BACKSPACE:8,TAB:9,RETURN:13,ENTER:13,SHIFT:16,CONTROL:17,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,F5:116,setEvent:function(d){if(d==this||(d&&d.browserEvent)){return d
}this.browserEvent=d;
if(d){this.button=d.button?b[d.button]:(d.which?d.which-1:-1);
if(d.type=="click"&&this.button==-1){this.button=0
}this.type=d.type;
this.shiftKey=d.shiftKey;
this.ctrlKey=d.ctrlKey||d.metaKey;
this.altKey=d.altKey;
this.keyCode=d.keyCode;
this.charCode=d.charCode;
this.target=c.getTarget(d);
this.xy=c.getXY(d)
}else{this.button=-1;
this.shiftKey=false;
this.ctrlKey=false;
this.altKey=false;
this.keyCode=0;
this.charCode=0;
this.target=null;
this.xy=[0,0]
}return this
},stopEvent:function(){if(this.browserEvent){if(this.browserEvent.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(this)
}c.stopEvent(this.browserEvent)
}},preventDefault:function(){if(this.browserEvent){c.preventDefault(this.browserEvent)
}},isNavKeyPress:function(){var d=this.keyCode;
d=Ext.isSafari?(a[d]||d):d;
return(d>=33&&d<=40)||d==this.RETURN||d==this.TAB||d==this.ESC
},isSpecialKey:function(){var d=this.keyCode;
return(this.type=="keypress"&&this.ctrlKey)||d==9||d==13||d==40||d==27||(d==16)||(d==17)||(d>=18&&d<=20)||(d>=33&&d<=35)||(d>=36&&d<=39)||(d>=44&&d<=45)
},stopPropagation:function(){if(this.browserEvent){if(this.browserEvent.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(this)
}c.stopPropagation(this.browserEvent)
}},getCharCode:function(){return this.charCode||this.keyCode
},getKey:function(){var d=this.keyCode||this.charCode;
return Ext.isSafari?(a[d]||d):d
},getPageX:function(){return this.xy[0]
},getPageY:function(){return this.xy[1]
},getTime:function(){if(this.browserEvent){return c.getTime(this.browserEvent)
}return null
},getXY:function(){return this.xy
},getTarget:function(g,d,h){var e=Ext.get(this.target);
return g?e.findParent(g,d,h):(h?e:this.target)
},getRelatedTarget:function(){if(this.browserEvent){return c.getRelatedTarget(this.browserEvent)
}return null
},getWheelDelta:function(){var e=this.browserEvent;
var d=0;
if(e.wheelDelta){d=e.wheelDelta/120
}else{if(e.detail){d=-e.detail/3
}}return d
},hasModifier:function(){return((this.ctrlKey||this.altKey)||this.shiftKey)?true:false
},within:function(e,d){var g=this[d?"getRelatedTarget":"getTarget"]();
return g&&Ext.fly(e).contains(g)
},getPoint:function(){return new Ext.lib.Point(this.xy[0],this.xy[1])
}};
return new Ext.EventObjectImpl()
}();
(function(){var D=Ext.lib.Dom;
var E=Ext.lib.Event;
var A=Ext.lib.Anim;
var propCache={};
var camelRe=/(-[a-z])/gi;
var camelFn=function(m,a){return a.charAt(1).toUpperCase()
};
var view=document.defaultView;
Ext.Element=function(element,forceNew){var dom=typeof element=="string"?document.getElementById(element):element;
if(!dom){return null
}var id=dom.id;
if(forceNew!==true&&id&&Ext.Element.cache[id]){return Ext.Element.cache[id]
}this.dom=dom;
this.id=id||Ext.id(dom)
};
var El=Ext.Element;
El.prototype={originalDisplay:"",visibilityMode:1,defaultUnit:"px",setVisibilityMode:function(visMode){this.visibilityMode=visMode;
return this
},enableDisplayMode:function(display){this.setVisibilityMode(El.DISPLAY);
if(typeof display!="undefined"){this.originalDisplay=display
}return this
},findParent:function(simpleSelector,maxDepth,returnEl){var p=this.dom,b=document.body,depth=0,dq=Ext.DomQuery,stopEl;
maxDepth=maxDepth||50;
if(typeof maxDepth!="number"){stopEl=Ext.getDom(maxDepth);
maxDepth=10
}while(p&&p.nodeType==1&&depth<maxDepth&&p!=b&&p!=stopEl){if(dq.is(p,simpleSelector)){return returnEl?Ext.get(p):p
}depth++;
p=p.parentNode
}return null
},findParentNode:function(simpleSelector,maxDepth,returnEl){var p=Ext.fly(this.dom.parentNode,"_internal");
return p?p.findParent(simpleSelector,maxDepth,returnEl):null
},up:function(simpleSelector,maxDepth){return this.findParentNode(simpleSelector,maxDepth,true)
},is:function(simpleSelector){return Ext.DomQuery.is(this.dom,simpleSelector)
},animate:function(args,duration,onComplete,easing,animType){this.anim(args,{duration:duration,callback:onComplete,easing:easing},animType);
return this
},anim:function(args,opt,animType,defaultDur,defaultEase,cb){animType=animType||"run";
opt=opt||{};
var anim=Ext.lib.Anim[animType](this.dom,args,(opt.duration||defaultDur)||0.35,(opt.easing||defaultEase)||"easeOut",function(){Ext.callback(cb,this);
Ext.callback(opt.callback,opt.scope||this,[this,opt])
},this);
opt.anim=anim;
return anim
},preanim:function(a,i){return !a[i]?false:(typeof a[i]=="object"?a[i]:{duration:a[i+1],callback:a[i+2],easing:a[i+3]})
},clean:function(forceReclean){if(this.isCleaned&&forceReclean!==true){return this
}var ns=/\S/;
var d=this.dom,n=d.firstChild,ni=-1;
while(n){var nx=n.nextSibling;
if(n.nodeType==3&&!ns.test(n.nodeValue)){d.removeChild(n)
}else{n.nodeIndex=++ni
}n=nx
}this.isCleaned=true;
return this
},scrollIntoView:function(container,hscroll){var c=Ext.getDom(container)||Ext.getBody().dom;
var el=this.dom;
var o=this.getOffsetsTo(c),l=o[0]+c.scrollLeft,t=o[1]+c.scrollTop,b=t+el.offsetHeight,r=l+el.offsetWidth;
var ch=c.clientHeight;
var ct=parseInt(c.scrollTop,10);
var cl=parseInt(c.scrollLeft,10);
var cb=ct+ch;
var cr=cl+c.clientWidth;
if(el.offsetHeight>ch||t<ct){c.scrollTop=t
}else{if(b>cb){c.scrollTop=b-ch
}}c.scrollTop=c.scrollTop;
if(hscroll!==false){if(el.offsetWidth>c.clientWidth||l<cl){c.scrollLeft=l
}else{if(r>cr){c.scrollLeft=r-c.clientWidth
}}c.scrollLeft=c.scrollLeft
}return this
},scrollChildIntoView:function(child,hscroll){Ext.fly(child,"_scrollChildIntoView").scrollIntoView(this,hscroll)
},autoHeight:function(animate,duration,onComplete,easing){var oldHeight=this.getHeight();
this.clip();
this.setHeight(1);
setTimeout(function(){var height=parseInt(this.dom.scrollHeight,10);
if(!animate){this.setHeight(height);
this.unclip();
if(typeof onComplete=="function"){onComplete()
}}else{this.setHeight(oldHeight);
this.setHeight(height,animate,duration,function(){this.unclip();
if(typeof onComplete=="function"){onComplete()
}}.createDelegate(this),easing)
}}.createDelegate(this),0);
return this
},contains:function(el){if(!el){return false
}return D.isAncestor(this.dom,el.dom?el.dom:el)
},isVisible:function(deep){var vis=!(this.getStyle("visibility")=="hidden"||this.getStyle("display")=="none");
if(deep!==true||!vis){return vis
}var p=this.dom.parentNode;
while(p&&p.tagName.toLowerCase()!="body"){if(!Ext.fly(p,"_isVisible").isVisible()){return false
}p=p.parentNode
}return true
},select:function(selector,unique){return El.select(selector,unique,this.dom)
},query:function(selector,unique){return Ext.DomQuery.select(selector,this.dom)
},child:function(selector,returnDom){var n=Ext.DomQuery.selectNode(selector,this.dom);
return returnDom?n:Ext.get(n)
},down:function(selector,returnDom){var n=Ext.DomQuery.selectNode(" > "+selector,this.dom);
return returnDom?n:Ext.get(n)
},initDD:function(group,config,overrides){var dd=new Ext.dd.DD(Ext.id(this.dom),group,config);
return Ext.apply(dd,overrides)
},initDDProxy:function(group,config,overrides){var dd=new Ext.dd.DDProxy(Ext.id(this.dom),group,config);
return Ext.apply(dd,overrides)
},initDDTarget:function(group,config,overrides){var dd=new Ext.dd.DDTarget(Ext.id(this.dom),group,config);
return Ext.apply(dd,overrides)
},setVisible:function(visible,animate){if(!animate||!A){if(this.visibilityMode==El.DISPLAY){this.setDisplayed(visible)
}else{this.fixDisplay();
this.dom.style.visibility=visible?"visible":"hidden"
}}else{var dom=this.dom;
var visMode=this.visibilityMode;
if(visible){this.setOpacity(0.01);
this.setVisible(true)
}this.anim({opacity:{to:(visible?1:0)}},this.preanim(arguments,1),null,0.35,"easeIn",function(){if(!visible){if(visMode==El.DISPLAY){dom.style.display="none"
}else{dom.style.visibility="hidden"
}Ext.get(dom).setOpacity(1)
}})
}return this
},isDisplayed:function(){return this.getStyle("display")!="none"
},toggle:function(animate){this.setVisible(!this.isVisible(),this.preanim(arguments,0));
return this
},setDisplayed:function(value){if(typeof value=="boolean"){value=value?this.originalDisplay:"none"
}this.setStyle("display",value);
return this
},focus:function(){try{this.dom.focus()
}catch(e){}return this
},blur:function(){try{this.dom.blur()
}catch(e){}return this
},addClass:function(className){if(Ext.isArray(className)){for(var i=0,len=className.length;
i<len;
i++){this.addClass(className[i])
}}else{if(className&&!this.hasClass(className)){this.dom.className=this.dom.className+" "+className
}}return this
},radioClass:function(className){var siblings=this.dom.parentNode.childNodes;
for(var i=0;
i<siblings.length;
i++){var s=siblings[i];
if(s.nodeType==1){Ext.get(s).removeClass(className)
}}this.addClass(className);
return this
},removeClass:function(className){if(!className||!this.dom.className){return this
}if(Ext.isArray(className)){for(var i=0,len=className.length;
i<len;
i++){this.removeClass(className[i])
}}else{if(this.hasClass(className)){var re=this.classReCache[className];
if(!re){re=new RegExp("(?:^|\\s+)"+className+"(?:\\s+|$)","g");
this.classReCache[className]=re
}this.dom.className=this.dom.className.replace(re," ")
}}return this
},classReCache:{},toggleClass:function(className){if(this.hasClass(className)){this.removeClass(className)
}else{this.addClass(className)
}return this
},hasClass:function(className){return className&&(" "+this.dom.className+" ").indexOf(" "+className+" ")!=-1
},replaceClass:function(oldClassName,newClassName){this.removeClass(oldClassName);
this.addClass(newClassName);
return this
},getStyles:function(){var a=arguments,len=a.length,r={};
for(var i=0;
i<len;
i++){r[a[i]]=this.getStyle(a[i])
}return r
},getStyle:function(){return view&&view.getComputedStyle?function(prop){var el=this.dom,v,cs,camel;
if(prop=="float"){prop="cssFloat"
}if(v=el.style[prop]){return v
}if(cs=view.getComputedStyle(el,"")){if(!(camel=propCache[prop])){camel=propCache[prop]=prop.replace(camelRe,camelFn)
}return cs[camel]
}return null
}:function(prop){var el=this.dom,v,cs,camel;
if(prop=="opacity"){if(typeof el.style.filter=="string"){var m=el.style.filter.match(/alpha\(opacity=(.*)\)/i);
if(m){var fv=parseFloat(m[1]);
if(!isNaN(fv)){return fv?fv/100:0
}}}return 1
}else{if(prop=="float"){prop="styleFloat"
}}if(!(camel=propCache[prop])){camel=propCache[prop]=prop.replace(camelRe,camelFn)
}if(v=el.style[camel]){return v
}if(cs=el.currentStyle){return cs[camel]
}return null
}
}(),setStyle:function(prop,value){if(typeof prop=="string"){var camel;
if(!(camel=propCache[prop])){camel=propCache[prop]=prop.replace(camelRe,camelFn)
}if(camel=="opacity"){this.setOpacity(value)
}else{this.dom.style[camel]=value
}}else{for(var style in prop){if(typeof prop[style]!="function"){this.setStyle(style,prop[style])
}}}return this
},applyStyles:function(style){Ext.DomHelper.applyStyles(this.dom,style);
return this
},getX:function(){return D.getX(this.dom)
},getY:function(){return D.getY(this.dom)
},getXY:function(){return D.getXY(this.dom)
},getOffsetsTo:function(el){var o=this.getXY();
var e=Ext.fly(el,"_internal").getXY();
return[o[0]-e[0],o[1]-e[1]]
},setX:function(x,animate){if(!animate||!A){D.setX(this.dom,x)
}else{this.setXY([x,this.getY()],this.preanim(arguments,1))
}return this
},setY:function(y,animate){if(!animate||!A){D.setY(this.dom,y)
}else{this.setXY([this.getX(),y],this.preanim(arguments,1))
}return this
},setLeft:function(left){this.setStyle("left",this.addUnits(left));
return this
},setTop:function(top){this.setStyle("top",this.addUnits(top));
return this
},setRight:function(right){this.setStyle("right",this.addUnits(right));
return this
},setBottom:function(bottom){this.setStyle("bottom",this.addUnits(bottom));
return this
},setXY:function(pos,animate){if(!animate||!A){D.setXY(this.dom,pos)
}else{this.anim({points:{to:pos}},this.preanim(arguments,1),"motion")
}return this
},setLocation:function(x,y,animate){this.setXY([x,y],this.preanim(arguments,2));
return this
},moveTo:function(x,y,animate){this.setXY([x,y],this.preanim(arguments,2));
return this
},getRegion:function(){return D.getRegion(this.dom)
},getHeight:function(contentHeight){var h=this.dom.offsetHeight||0;
h=contentHeight!==true?h:h-this.getBorderWidth("tb")-this.getPadding("tb");
return h<0?0:h
},getWidth:function(contentWidth){var w=this.dom.offsetWidth||0;
w=contentWidth!==true?w:w-this.getBorderWidth("lr")-this.getPadding("lr");
return w<0?0:w
},getComputedHeight:function(){var h=Math.max(this.dom.offsetHeight,this.dom.clientHeight);
if(!h){h=parseInt(this.getStyle("height"),10)||0;
if(!this.isBorderBox()){h+=this.getFrameWidth("tb")
}}return h
},getComputedWidth:function(){var w=Math.max(this.dom.offsetWidth,this.dom.clientWidth);
if(!w){w=parseInt(this.getStyle("width"),10)||0;
if(!this.isBorderBox()){w+=this.getFrameWidth("lr")
}}return w
},getSize:function(contentSize){return{width:this.getWidth(contentSize),height:this.getHeight(contentSize)}
},getStyleSize:function(){var w,h,d=this.dom,s=d.style;
if(s.width&&s.width!="auto"){w=parseInt(s.width,10);
if(Ext.isBorderBox){w-=this.getFrameWidth("lr")
}}if(s.height&&s.height!="auto"){h=parseInt(s.height,10);
if(Ext.isBorderBox){h-=this.getFrameWidth("tb")
}}return{width:w||this.getWidth(true),height:h||this.getHeight(true)}
},getViewSize:function(){var d=this.dom,doc=document,aw=0,ah=0;
if(d==doc||d==doc.body){return{width:D.getViewWidth(),height:D.getViewHeight()}
}else{return{width:d.clientWidth,height:d.clientHeight}
}},getValue:function(asNumber){return asNumber?parseInt(this.dom.value,10):this.dom.value
},adjustWidth:function(width){if(typeof width=="number"){if(this.autoBoxAdjust&&!this.isBorderBox()){width-=(this.getBorderWidth("lr")+this.getPadding("lr"))
}if(width<0){width=0
}}return width
},adjustHeight:function(height){if(typeof height=="number"){if(this.autoBoxAdjust&&!this.isBorderBox()){height-=(this.getBorderWidth("tb")+this.getPadding("tb"))
}if(height<0){height=0
}}return height
},setWidth:function(width,animate){width=this.adjustWidth(width);
if(!animate||!A){this.dom.style.width=this.addUnits(width)
}else{this.anim({width:{to:width}},this.preanim(arguments,1))
}return this
},setHeight:function(height,animate){height=this.adjustHeight(height);
if(!animate||!A){this.dom.style.height=this.addUnits(height)
}else{this.anim({height:{to:height}},this.preanim(arguments,1))
}return this
},setSize:function(width,height,animate){if(typeof width=="object"){height=width.height;
width=width.width
}width=this.adjustWidth(width);
height=this.adjustHeight(height);
if(!animate||!A){this.dom.style.width=this.addUnits(width);
this.dom.style.height=this.addUnits(height)
}else{this.anim({width:{to:width},height:{to:height}},this.preanim(arguments,2))
}return this
},setBounds:function(x,y,width,height,animate){if(!animate||!A){this.setSize(width,height);
this.setLocation(x,y)
}else{width=this.adjustWidth(width);
height=this.adjustHeight(height);
this.anim({points:{to:[x,y]},width:{to:width},height:{to:height}},this.preanim(arguments,4),"motion")
}return this
},setRegion:function(region,animate){this.setBounds(region.left,region.top,region.right-region.left,region.bottom-region.top,this.preanim(arguments,1));
return this
},addListener:function(eventName,fn,scope,options){Ext.EventManager.on(this.dom,eventName,fn,scope||this,options)
},removeListener:function(eventName,fn){Ext.EventManager.removeListener(this.dom,eventName,fn);
return this
},removeAllListeners:function(){E.purgeElement(this.dom);
return this
},relayEvent:function(eventName,observable){this.on(eventName,function(e){observable.fireEvent(eventName,e)
})
},setOpacity:function(opacity,animate){if(!animate||!A){var s=this.dom.style;
if(Ext.isIE){s.zoom=1;
s.filter=(s.filter||"").replace(/alpha\([^\)]*\)/gi,"")+(opacity==1?"":" alpha(opacity="+opacity*100+")")
}else{s.opacity=opacity
}}else{this.anim({opacity:{to:opacity}},this.preanim(arguments,1),null,0.35,"easeIn")
}return this
},getLeft:function(local){if(!local){return this.getX()
}else{return parseInt(this.getStyle("left"),10)||0
}},getRight:function(local){if(!local){return this.getX()+this.getWidth()
}else{return(this.getLeft(true)+this.getWidth())||0
}},getTop:function(local){if(!local){return this.getY()
}else{return parseInt(this.getStyle("top"),10)||0
}},getBottom:function(local){if(!local){return this.getY()+this.getHeight()
}else{return(this.getTop(true)+this.getHeight())||0
}},position:function(pos,zIndex,x,y){if(!pos){if(this.getStyle("position")=="static"){this.setStyle("position","relative")
}}else{this.setStyle("position",pos)
}if(zIndex){this.setStyle("z-index",zIndex)
}if(x!==undefined&&y!==undefined){this.setXY([x,y])
}else{if(x!==undefined){this.setX(x)
}else{if(y!==undefined){this.setY(y)
}}}},clearPositioning:function(value){value=value||"";
this.setStyle({left:value,right:value,top:value,bottom:value,"z-index":"",position:"static"});
return this
},getPositioning:function(){var l=this.getStyle("left");
var t=this.getStyle("top");
return{position:this.getStyle("position"),left:l,right:l?"":this.getStyle("right"),top:t,bottom:t?"":this.getStyle("bottom"),"z-index":this.getStyle("z-index")}
},getBorderWidth:function(side){return this.addStyles(side,El.borders)
},getPadding:function(side){return this.addStyles(side,El.paddings)
},setPositioning:function(pc){this.applyStyles(pc);
if(pc.right=="auto"){this.dom.style.right=""
}if(pc.bottom=="auto"){this.dom.style.bottom=""
}return this
},fixDisplay:function(){if(this.getStyle("display")=="none"){this.setStyle("visibility","hidden");
this.setStyle("display",this.originalDisplay);
if(this.getStyle("display")=="none"){this.setStyle("display","block")
}}},setOverflow:function(v){if(v=="auto"&&Ext.isMac&&Ext.isGecko){this.dom.style.overflow="hidden";
(function(){this.dom.style.overflow="auto"
}).defer(1,this)
}else{this.dom.style.overflow=v
}},setLeftTop:function(left,top){this.dom.style.left=this.addUnits(left);
this.dom.style.top=this.addUnits(top);
return this
},move:function(direction,distance,animate){var xy=this.getXY();
direction=direction.toLowerCase();
switch(direction){case"l":case"left":this.moveTo(xy[0]-distance,xy[1],this.preanim(arguments,2));
break;
case"r":case"right":this.moveTo(xy[0]+distance,xy[1],this.preanim(arguments,2));
break;
case"t":case"top":case"up":this.moveTo(xy[0],xy[1]-distance,this.preanim(arguments,2));
break;
case"b":case"bottom":case"down":this.moveTo(xy[0],xy[1]+distance,this.preanim(arguments,2));
break
}return this
},clip:function(){if(!this.isClipped){this.isClipped=true;
this.originalClip={o:this.getStyle("overflow"),x:this.getStyle("overflow-x"),y:this.getStyle("overflow-y")};
this.setStyle("overflow","hidden");
this.setStyle("overflow-x","hidden");
this.setStyle("overflow-y","hidden")
}return this
},unclip:function(){if(this.isClipped){this.isClipped=false;
var o=this.originalClip;
if(o.o){this.setStyle("overflow",o.o)
}if(o.x){this.setStyle("overflow-x",o.x)
}if(o.y){this.setStyle("overflow-y",o.y)
}}return this
},getAnchorXY:function(anchor,local,s){var w,h,vp=false;
if(!s){var d=this.dom;
if(d==document.body||d==document){vp=true;
w=D.getViewWidth();
h=D.getViewHeight()
}else{w=this.getWidth();
h=this.getHeight()
}}else{w=s.width;
h=s.height
}var x=0,y=0,r=Math.round;
switch((anchor||"tl").toLowerCase()){case"c":x=r(w*0.5);
y=r(h*0.5);
break;
case"t":x=r(w*0.5);
y=0;
break;
case"l":x=0;
y=r(h*0.5);
break;
case"r":x=w;
y=r(h*0.5);
break;
case"b":x=r(w*0.5);
y=h;
break;
case"tl":x=0;
y=0;
break;
case"bl":x=0;
y=h;
break;
case"br":x=w;
y=h;
break;
case"tr":x=w;
y=0;
break
}if(local===true){return[x,y]
}if(vp){var sc=this.getScroll();
return[x+sc.left,y+sc.top]
}var o=this.getXY();
return[x+o[0],y+o[1]]
},getAlignToXY:function(el,p,o){el=Ext.get(el);
if(!el||!el.dom){throw"Element.alignToXY with an element that doesn't exist"
}var d=this.dom;
var c=false;
var p1="",p2="";
o=o||[0,0];
if(!p){p="tl-bl"
}else{if(p=="?"){p="tl-bl?"
}else{if(p.indexOf("-")==-1){p="tl-"+p
}}}p=p.toLowerCase();
var m=p.match(/^([a-z]+)-([a-z]+)(\?)?$/);
if(!m){throw"Element.alignTo with an invalid alignment "+p
}p1=m[1];
p2=m[2];
c=!!m[3];
var a1=this.getAnchorXY(p1,true);
var a2=el.getAnchorXY(p2,false);
var x=a2[0]-a1[0]+o[0];
var y=a2[1]-a1[1]+o[1];
if(c){var w=this.getWidth(),h=this.getHeight(),r=el.getRegion();
var dw=D.getViewWidth()-5,dh=D.getViewHeight()-5;
var p1y=p1.charAt(0),p1x=p1.charAt(p1.length-1);
var p2y=p2.charAt(0),p2x=p2.charAt(p2.length-1);
var swapY=((p1y=="t"&&p2y=="b")||(p1y=="b"&&p2y=="t"));
var swapX=((p1x=="r"&&p2x=="l")||(p1x=="l"&&p2x=="r"));
var doc=document;
var scrollX=(doc.documentElement.scrollLeft||doc.body.scrollLeft||0)+5;
var scrollY=(doc.documentElement.scrollTop||doc.body.scrollTop||0)+5;
if((x+w)>dw+scrollX){x=swapX?r.left-w:dw+scrollX-w
}if(x<scrollX){x=swapX?r.right:scrollX
}if((y+h)>dh+scrollY){y=swapY?r.top-h:dh+scrollY-h
}if(y<scrollY){y=swapY?r.bottom:scrollY
}}return[x,y]
},getConstrainToXY:function(){var os={top:0,left:0,bottom:0,right:0};
return function(el,local,offsets,proposedXY){el=Ext.get(el);
offsets=offsets?Ext.applyIf(offsets,os):os;
var vw,vh,vx=0,vy=0;
if(el.dom==document.body||el.dom==document){vw=Ext.lib.Dom.getViewWidth();
vh=Ext.lib.Dom.getViewHeight()
}else{vw=el.dom.clientWidth;
vh=el.dom.clientHeight;
if(!local){var vxy=el.getXY();
vx=vxy[0];
vy=vxy[1]
}}var s=el.getScroll();
vx+=offsets.left+s.left;
vy+=offsets.top+s.top;
vw-=offsets.right;
vh-=offsets.bottom;
var vr=vx+vw;
var vb=vy+vh;
var xy=proposedXY||(!local?this.getXY():[this.getLeft(true),this.getTop(true)]);
var x=xy[0],y=xy[1];
var w=this.dom.offsetWidth,h=this.dom.offsetHeight;
var moved=false;
if((x+w)>vr){x=vr-w;
moved=true
}if((y+h)>vb){y=vb-h;
moved=true
}if(x<vx){x=vx;
moved=true
}if(y<vy){y=vy;
moved=true
}return moved?[x,y]:false
}
}(),adjustForConstraints:function(xy,parent,offsets){return this.getConstrainToXY(parent||document,false,offsets,xy)||xy
},alignTo:function(element,position,offsets,animate){var xy=this.getAlignToXY(element,position,offsets);
this.setXY(xy,this.preanim(arguments,3));
return this
},anchorTo:function(el,alignment,offsets,animate,monitorScroll,callback){var action=function(){this.alignTo(el,alignment,offsets,animate);
Ext.callback(callback,this)
};
Ext.EventManager.onWindowResize(action,this);
var tm=typeof monitorScroll;
if(tm!="undefined"){Ext.EventManager.on(window,"scroll",action,this,{buffer:tm=="number"?monitorScroll:50})
}action.call(this);
return this
},clearOpacity:function(){if(window.ActiveXObject){if(typeof this.dom.style.filter=="string"&&(/alpha/i).test(this.dom.style.filter)){this.dom.style.filter=""
}}else{this.dom.style.opacity="";
this.dom.style["-moz-opacity"]="";
this.dom.style["-khtml-opacity"]=""
}return this
},hide:function(animate){this.setVisible(false,this.preanim(arguments,0));
return this
},show:function(animate){this.setVisible(true,this.preanim(arguments,0));
return this
},addUnits:function(size){return Ext.Element.addUnits(size,this.defaultUnit)
},update:function(html,loadScripts,callback){if(typeof html=="undefined"){html=""
}if(loadScripts!==true){this.dom.innerHTML=html;
if(typeof callback=="function"){callback()
}return this
}var id=Ext.id();
var dom=this.dom;
html+='<span id="'+id+'"></span>';
E.onAvailable(id,function(){var hd=document.getElementsByTagName("head")[0];
var re=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;
var srcRe=/\ssrc=([\'\"])(.*?)\1/i;
var typeRe=/\stype=([\'\"])(.*?)\1/i;
var match;
while(match=re.exec(html)){var attrs=match[1];
var srcMatch=attrs?attrs.match(srcRe):false;
if(srcMatch&&srcMatch[2]){var s=document.createElement("script");
s.src=srcMatch[2];
var typeMatch=attrs.match(typeRe);
if(typeMatch&&typeMatch[2]){s.type=typeMatch[2]
}hd.appendChild(s)
}else{if(match[2]&&match[2].length>0){if(window.execScript){window.execScript(match[2])
}else{window.eval(match[2])
}}}}var el=document.getElementById(id);
if(el){Ext.removeNode(el)
}if(typeof callback=="function"){callback()
}});
dom.innerHTML=html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,"");
return this
},load:function(){var um=this.getUpdater();
um.update.apply(um,arguments);
return this
},getUpdater:function(){if(!this.updateManager){this.updateManager=new Ext.Updater(this)
}return this.updateManager
},unselectable:function(){this.dom.unselectable="on";
this.swallowEvent("selectstart",true);
this.applyStyles("-moz-user-select:none;-khtml-user-select:none;");
this.addClass("x-unselectable");
return this
},getCenterXY:function(){return this.getAlignToXY(document,"c-c")
},center:function(centerIn){this.alignTo(centerIn||document,"c-c");
return this
},isBorderBox:function(){return noBoxAdjust[this.dom.tagName.toLowerCase()]||Ext.isBorderBox
},getBox:function(contentBox,local){var xy;
if(!local){xy=this.getXY()
}else{var left=parseInt(this.getStyle("left"),10)||0;
var top=parseInt(this.getStyle("top"),10)||0;
xy=[left,top]
}var el=this.dom,w=el.offsetWidth,h=el.offsetHeight,bx;
if(!contentBox){bx={x:xy[0],y:xy[1],0:xy[0],1:xy[1],width:w,height:h}
}else{var l=this.getBorderWidth("l")+this.getPadding("l");
var r=this.getBorderWidth("r")+this.getPadding("r");
var t=this.getBorderWidth("t")+this.getPadding("t");
var b=this.getBorderWidth("b")+this.getPadding("b");
bx={x:xy[0]+l,y:xy[1]+t,0:xy[0]+l,1:xy[1]+t,width:w-(l+r),height:h-(t+b)}
}bx.right=bx.x+bx.width;
bx.bottom=bx.y+bx.height;
return bx
},getFrameWidth:function(sides,onlyContentBox){return onlyContentBox&&Ext.isBorderBox?0:(this.getPadding(sides)+this.getBorderWidth(sides))
},setBox:function(box,adjust,animate){var w=box.width,h=box.height;
if((adjust&&!this.autoBoxAdjust)&&!this.isBorderBox()){w-=(this.getBorderWidth("lr")+this.getPadding("lr"));
h-=(this.getBorderWidth("tb")+this.getPadding("tb"))
}this.setBounds(box.x,box.y,w,h,this.preanim(arguments,2));
return this
},repaint:function(){var dom=this.dom;
this.addClass("x-repaint");
setTimeout(function(){Ext.get(dom).removeClass("x-repaint")
},1);
return this
},getMargins:function(side){if(!side){return{top:parseInt(this.getStyle("margin-top"),10)||0,left:parseInt(this.getStyle("margin-left"),10)||0,bottom:parseInt(this.getStyle("margin-bottom"),10)||0,right:parseInt(this.getStyle("margin-right"),10)||0}
}else{return this.addStyles(side,El.margins)
}},addStyles:function(sides,styles){var val=0,v,w;
for(var i=0,len=sides.length;
i<len;
i++){v=this.getStyle(styles[sides.charAt(i)]);
if(v){w=parseInt(v,10);
if(w){val+=(w>=0?w:-1*w)
}}}return val
},createProxy:function(config,renderTo,matchBox){config=typeof config=="object"?config:{tag:"div",cls:config};
var proxy;
if(renderTo){proxy=Ext.DomHelper.append(renderTo,config,true)
}else{proxy=Ext.DomHelper.insertBefore(this.dom,config,true)
}if(matchBox){proxy.setBox(this.getBox())
}return proxy
},mask:function(msg,msgCls){if(this.getStyle("position")=="static"){this.setStyle("position","relative")
}if(this._maskMsg){this._maskMsg.remove()
}if(this._mask){this._mask.remove()
}this._mask=Ext.DomHelper.append(this.dom,{cls:"ext-el-mask"},true);
this.addClass("x-masked");
this._mask.setDisplayed(true);
if(typeof msg=="string"){this._maskMsg=Ext.DomHelper.append(this.dom,{cls:"ext-el-mask-msg",cn:{tag:"div"}},true);
var mm=this._maskMsg;
mm.dom.className=msgCls?"ext-el-mask-msg "+msgCls:"ext-el-mask-msg";
mm.dom.firstChild.innerHTML=msg;
mm.setDisplayed(true);
mm.center(this)
}if(Ext.isIE&&!(Ext.isIE7&&Ext.isStrict)&&this.getStyle("height")=="auto"){this._mask.setSize(this.dom.clientWidth,this.getHeight())
}return this._mask
},unmask:function(){if(this._mask){if(this._maskMsg){this._maskMsg.remove();
delete this._maskMsg
}this._mask.remove();
delete this._mask
}this.removeClass("x-masked")
},isMasked:function(){return this._mask&&this._mask.isVisible()
},createShim:function(){var el=document.createElement("iframe");
el.frameBorder="no";
el.className="ext-shim";
if(Ext.isIE&&Ext.isSecure){el.src=Ext.SSL_SECURE_URL
}var shim=Ext.get(this.dom.parentNode.insertBefore(el,this.dom));
shim.autoBoxAdjust=false;
return shim
},remove:function(){Ext.removeNode(this.dom);
delete El.cache[this.dom.id]
},hover:function(overFn,outFn,scope){var preOverFn=function(e){if(!e.within(this,true)){overFn.apply(scope||this,arguments)
}};
var preOutFn=function(e){if(!e.within(this,true)){outFn.apply(scope||this,arguments)
}};
this.on("mouseover",preOverFn,this.dom);
this.on("mouseout",preOutFn,this.dom);
return this
},addClassOnOver:function(className,preventFlicker){this.hover(function(){Ext.fly(this,"_internal").addClass(className)
},function(){Ext.fly(this,"_internal").removeClass(className)
});
return this
},addClassOnFocus:function(className){this.on("focus",function(){Ext.fly(this,"_internal").addClass(className)
},this.dom);
this.on("blur",function(){Ext.fly(this,"_internal").removeClass(className)
},this.dom);
return this
},addClassOnClick:function(className){var dom=this.dom;
this.on("mousedown",function(){Ext.fly(dom,"_internal").addClass(className);
var d=Ext.getDoc();
var fn=function(){Ext.fly(dom,"_internal").removeClass(className);
d.removeListener("mouseup",fn)
};
d.on("mouseup",fn)
});
return this
},swallowEvent:function(eventName,preventDefault){var fn=function(e){e.stopPropagation();
if(preventDefault){e.preventDefault()
}};
if(Ext.isArray(eventName)){for(var i=0,len=eventName.length;
i<len;
i++){this.on(eventName[i],fn)
}return this
}this.on(eventName,fn);
return this
},parent:function(selector,returnDom){return this.matchNode("parentNode","parentNode",selector,returnDom)
},next:function(selector,returnDom){return this.matchNode("nextSibling","nextSibling",selector,returnDom)
},prev:function(selector,returnDom){return this.matchNode("previousSibling","previousSibling",selector,returnDom)
},first:function(selector,returnDom){return this.matchNode("nextSibling","firstChild",selector,returnDom)
},last:function(selector,returnDom){return this.matchNode("previousSibling","lastChild",selector,returnDom)
},matchNode:function(dir,start,selector,returnDom){var n=this.dom[start];
while(n){if(n.nodeType==1&&(!selector||Ext.DomQuery.is(n,selector))){return !returnDom?Ext.get(n):n
}n=n[dir]
}return null
},appendChild:function(el){el=Ext.get(el);
el.appendTo(this);
return this
},createChild:function(config,insertBefore,returnDom){config=config||{tag:"div"};
if(insertBefore){return Ext.DomHelper.insertBefore(insertBefore,config,returnDom!==true)
}return Ext.DomHelper[!this.dom.firstChild?"overwrite":"append"](this.dom,config,returnDom!==true)
},appendTo:function(el){el=Ext.getDom(el);
el.appendChild(this.dom);
return this
},insertBefore:function(el){el=Ext.getDom(el);
el.parentNode.insertBefore(this.dom,el);
return this
},insertAfter:function(el){el=Ext.getDom(el);
el.parentNode.insertBefore(this.dom,el.nextSibling);
return this
},insertFirst:function(el,returnDom){el=el||{};
if(typeof el=="object"&&!el.nodeType&&!el.dom){return this.createChild(el,this.dom.firstChild,returnDom)
}else{el=Ext.getDom(el);
this.dom.insertBefore(el,this.dom.firstChild);
return !returnDom?Ext.get(el):el
}},insertSibling:function(el,where,returnDom){var rt;
if(Ext.isArray(el)){for(var i=0,len=el.length;
i<len;
i++){rt=this.insertSibling(el[i],where,returnDom)
}return rt
}where=where?where.toLowerCase():"before";
el=el||{};
var refNode=where=="before"?this.dom:this.dom.nextSibling;
if(typeof el=="object"&&!el.nodeType&&!el.dom){if(where=="after"&&!this.dom.nextSibling){rt=Ext.DomHelper.append(this.dom.parentNode,el,!returnDom)
}else{rt=Ext.DomHelper[where=="after"?"insertAfter":"insertBefore"](this.dom,el,!returnDom)
}}else{rt=this.dom.parentNode.insertBefore(Ext.getDom(el),refNode);
if(!returnDom){rt=Ext.get(rt)
}}return rt
},wrap:function(config,returnDom){if(!config){config={tag:"div"}
}var newEl=Ext.DomHelper.insertBefore(this.dom,config,!returnDom);
newEl.dom?newEl.dom.appendChild(this.dom):newEl.appendChild(this.dom);
return newEl
},replace:function(el){el=Ext.get(el);
this.insertBefore(el);
el.remove();
return this
},replaceWith:function(el){if(typeof el=="object"&&!el.nodeType&&!el.dom){el=this.insertSibling(el,"before")
}else{el=Ext.getDom(el);
this.dom.parentNode.insertBefore(el,this.dom)
}El.uncache(this.id);
this.dom.parentNode.removeChild(this.dom);
this.dom=el;
this.id=Ext.id(el);
El.cache[this.id]=this;
return this
},insertHtml:function(where,html,returnEl){var el=Ext.DomHelper.insertHtml(where,this.dom,html);
return returnEl?Ext.get(el):el
},set:function(o,useSet){var el=this.dom;
useSet=typeof useSet=="undefined"?(el.setAttribute?true:false):useSet;
for(var attr in o){if(attr=="style"||typeof o[attr]=="function"){continue
}if(attr=="cls"){el.className=o.cls
}else{if(o.hasOwnProperty(attr)){if(useSet){el.setAttribute(attr,o[attr])
}else{el[attr]=o[attr]
}}}}if(o.style){Ext.DomHelper.applyStyles(el,o.style)
}return this
},addKeyListener:function(key,fn,scope){var config;
if(typeof key!="object"||Ext.isArray(key)){config={key:key,fn:fn,scope:scope}
}else{config={key:key.key,shift:key.shift,ctrl:key.ctrl,alt:key.alt,fn:fn,scope:scope}
}return new Ext.KeyMap(this,config)
},addKeyMap:function(config){return new Ext.KeyMap(this,config)
},isScrollable:function(){var dom=this.dom;
return dom.scrollHeight>dom.clientHeight||dom.scrollWidth>dom.clientWidth
},scrollTo:function(side,value,animate){var prop=side.toLowerCase()=="left"?"scrollLeft":"scrollTop";
if(!animate||!A){this.dom[prop]=value
}else{var to=prop=="scrollLeft"?[value,this.dom.scrollTop]:[this.dom.scrollLeft,value];
this.anim({scroll:{to:to}},this.preanim(arguments,2),"scroll")
}return this
},scroll:function(direction,distance,animate){if(!this.isScrollable()){return
}var el=this.dom;
var l=el.scrollLeft,t=el.scrollTop;
var w=el.scrollWidth,h=el.scrollHeight;
var cw=el.clientWidth,ch=el.clientHeight;
direction=direction.toLowerCase();
var scrolled=false;
var a=this.preanim(arguments,2);
switch(direction){case"l":case"left":if(w-l>cw){var v=Math.min(l+distance,w-cw);
this.scrollTo("left",v,a);
scrolled=true
}break;
case"r":case"right":if(l>0){var v=Math.max(l-distance,0);
this.scrollTo("left",v,a);
scrolled=true
}break;
case"t":case"top":case"up":if(t>0){var v=Math.max(t-distance,0);
this.scrollTo("top",v,a);
scrolled=true
}break;
case"b":case"bottom":case"down":if(h-t>ch){var v=Math.min(t+distance,h-ch);
this.scrollTo("top",v,a);
scrolled=true
}break
}return scrolled
},translatePoints:function(x,y){if(typeof x=="object"||Ext.isArray(x)){y=x[1];
x=x[0]
}var p=this.getStyle("position");
var o=this.getXY();
var l=parseInt(this.getStyle("left"),10);
var t=parseInt(this.getStyle("top"),10);
if(isNaN(l)){l=(p=="relative")?0:this.dom.offsetLeft
}if(isNaN(t)){t=(p=="relative")?0:this.dom.offsetTop
}return{left:(x-o[0]+l),top:(y-o[1]+t)}
},getScroll:function(){var d=this.dom,doc=document;
if(d==doc||d==doc.body){var l,t;
if(Ext.isIE&&Ext.isStrict){l=doc.documentElement.scrollLeft||(doc.body.scrollLeft||0);
t=doc.documentElement.scrollTop||(doc.body.scrollTop||0)
}else{l=window.pageXOffset||(doc.body.scrollLeft||0);
t=window.pageYOffset||(doc.body.scrollTop||0)
}return{left:l,top:t}
}else{return{left:d.scrollLeft,top:d.scrollTop}
}},getColor:function(attr,defaultValue,prefix){var v=this.getStyle(attr);
if(!v||v=="transparent"||v=="inherit"){return defaultValue
}var color=typeof prefix=="undefined"?"#":prefix;
if(v.substr(0,4)=="rgb("){var rvs=v.slice(4,v.length-1).split(",");
for(var i=0;
i<3;
i++){var h=parseInt(rvs[i]);
var s=h.toString(16);
if(h<16){s="0"+s
}color+=s
}}else{if(v.substr(0,1)=="#"){if(v.length==4){for(var i=1;
i<4;
i++){var c=v.charAt(i);
color+=c+c
}}else{if(v.length==7){color+=v.substr(1)
}}}}return(color.length>5?color.toLowerCase():defaultValue)
},boxWrap:function(cls){cls=cls||"x-box";
var el=Ext.get(this.insertHtml("beforeBegin",String.format('<div class="{0}">'+El.boxMarkup+"</div>",cls)));
el.child("."+cls+"-mc").dom.appendChild(this.dom);
return el
},getAttributeNS:Ext.isIE?function(ns,name){var d=this.dom;
var type=typeof d[ns+":"+name];
if(type!="undefined"&&type!="unknown"){return d[ns+":"+name]
}return d[name]
}:function(ns,name){var d=this.dom;
return d.getAttributeNS(ns,name)||d.getAttribute(ns+":"+name)||d.getAttribute(name)||d[name]
},getTextWidth:function(text,min,max){return(Ext.util.TextMetrics.measure(this.dom,Ext.value(text,this.dom.innerHTML,true)).width).constrain(min||0,max||1000000)
}};
var ep=El.prototype;
ep.on=ep.addListener;
ep.mon=ep.addListener;
ep.getUpdateManager=ep.getUpdater;
ep.un=ep.removeListener;
ep.autoBoxAdjust=true;
El.unitPattern=/\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i;
El.addUnits=function(v,defaultUnit){if(v===""||v=="auto"){return v
}if(v===undefined){return""
}if(typeof v=="number"||!El.unitPattern.test(v)){return v+(defaultUnit||"px")
}return v
};
El.boxMarkup='<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
El.VISIBILITY=1;
El.DISPLAY=2;
El.borders={l:"border-left-width",r:"border-right-width",t:"border-top-width",b:"border-bottom-width"};
El.paddings={l:"padding-left",r:"padding-right",t:"padding-top",b:"padding-bottom"};
El.margins={l:"margin-left",r:"margin-right",t:"margin-top",b:"margin-bottom"};
El.cache={};
var docEl;
El.get=function(el){var ex,elm,id;
if(!el){return null
}if(typeof el=="string"){if(!(elm=document.getElementById(el))){return null
}if(ex=El.cache[el]){ex.dom=elm
}else{ex=El.cache[el]=new El(elm)
}return ex
}else{if(el.tagName){if(!(id=el.id)){id=Ext.id(el)
}if(ex=El.cache[id]){ex.dom=el
}else{ex=El.cache[id]=new El(el)
}return ex
}else{if(el instanceof El){if(el!=docEl){el.dom=document.getElementById(el.id)||el.dom;
El.cache[el.id]=el
}return el
}else{if(el.isComposite){return el
}else{if(Ext.isArray(el)){return El.select(el)
}else{if(el==document){if(!docEl){var f=function(){};
f.prototype=El.prototype;
docEl=new f();
docEl.dom=document
}return docEl
}}}}}}return null
};
El.uncache=function(el){for(var i=0,a=arguments,len=a.length;
i<len;
i++){if(a[i]){delete El.cache[a[i].id||a[i]]
}}};
El.garbageCollect=function(){if(!Ext.enableGarbageCollector){clearInterval(El.collectorThread);
return
}for(var eid in El.cache){var el=El.cache[eid],d=el.dom;
if(!d||!d.parentNode||(!d.offsetParent&&!document.getElementById(eid))){delete El.cache[eid];
if(d&&Ext.enableListenerCollection){E.purgeElement(d)
}}}};
El.collectorThreadId=setInterval(El.garbageCollect,30000);
var flyFn=function(){};
flyFn.prototype=El.prototype;
var _cls=new flyFn();
El.Flyweight=function(dom){this.dom=dom
};
El.Flyweight.prototype=_cls;
El.Flyweight.prototype.isFlyweight=true;
El._flyweights={};
El.fly=function(el,named){named=named||"_global";
el=Ext.getDom(el);
if(!el){return null
}if(!El._flyweights[named]){El._flyweights[named]=new El.Flyweight()
}El._flyweights[named].dom=el;
return El._flyweights[named]
};
Ext.get=El.get;
Ext.fly=El.fly;
var noBoxAdjust=Ext.isStrict?{select:1}:{input:1,select:1,textarea:1};
if(Ext.isIE||Ext.isGecko){noBoxAdjust.button=1
}Ext.EventManager.on(window,"unload",function(){delete El.cache;
delete El._flyweights
})
})();
Ext.enableFx=true;
Ext.Fx={slideIn:function(a,b){var c=this.getFxEl();
b=b||{};
c.queueFx(b,function(){a=a||"t";
this.fixDisplay();
var d=this.getFxRestore();
var i=this.getBox();
this.setSize(i);
var l=this.fxWrap(d.pos,b,"hidden");
var g=this.dom.style;
g.visibility="visible";
g.position="absolute";
var m=function(){c.fxUnwrap(l,d.pos,b);
g.width=d.width;
g.height=d.height;
c.afterFx(b)
};
var h,e={to:[i.x,i.y]},j={to:i.width},k={to:i.height};
switch(a.toLowerCase()){case"t":l.setSize(i.width,0);
g.left=g.bottom="0";
h={height:k};
break;
case"l":l.setSize(0,i.height);
g.right=g.top="0";
h={width:j};
break;
case"r":l.setSize(0,i.height);
l.setX(i.right);
g.left=g.top="0";
h={width:j,points:e};
break;
case"b":l.setSize(i.width,0);
l.setY(i.bottom);
g.left=g.top="0";
h={height:k,points:e};
break;
case"tl":l.setSize(0,0);
g.right=g.bottom="0";
h={width:j,height:k};
break;
case"bl":l.setSize(0,0);
l.setY(i.y+i.height);
g.right=g.top="0";
h={width:j,height:k,points:e};
break;
case"br":l.setSize(0,0);
l.setXY([i.right,i.bottom]);
g.left=g.top="0";
h={width:j,height:k,points:e};
break;
case"tr":l.setSize(0,0);
l.setX(i.x+i.width);
g.left=g.bottom="0";
h={width:j,height:k,points:e};
break
}this.dom.style.visibility="visible";
l.show();
arguments.callee.anim=l.fxanim(h,b,"motion",0.5,"easeOut",m)
});
return this
},slideOut:function(a,b){var c=this.getFxEl();
b=b||{};
c.queueFx(b,function(){a=a||"t";
var e=this.getFxRestore();
var k=this.getBox();
this.setSize(k);
var h=this.fxWrap(e.pos,b,"visible");
var i=this.dom.style;
i.visibility="visible";
i.position="absolute";
h.setSize(k);
var d=function(){if(b.useDisplay){c.setDisplayed(false)
}else{c.hide()
}c.fxUnwrap(h,e.pos,b);
i.width=e.width;
i.height=e.height;
c.afterFx(b)
};
var j,g={to:0};
switch(a.toLowerCase()){case"t":i.left=i.bottom="0";
j={height:g};
break;
case"l":i.right=i.top="0";
j={width:g};
break;
case"r":i.left=i.top="0";
j={width:g,points:{to:[k.right,k.y]}};
break;
case"b":i.left=i.top="0";
j={height:g,points:{to:[k.x,k.bottom]}};
break;
case"tl":i.right=i.bottom="0";
j={width:g,height:g};
break;
case"bl":i.right=i.top="0";
j={width:g,height:g,points:{to:[k.x,k.bottom]}};
break;
case"br":i.left=i.top="0";
j={width:g,height:g,points:{to:[k.x+k.width,k.bottom]}};
break;
case"tr":i.left=i.bottom="0";
j={width:g,height:g,points:{to:[k.right,k.y]}};
break
}arguments.callee.anim=h.fxanim(j,b,"motion",0.5,"easeOut",d)
});
return this
},puff:function(b){var a=this.getFxEl();
b=b||{};
a.queueFx(b,function(){this.clearOpacity();
this.show();
var d=this.getFxRestore();
var g=this.dom.style;
var c=function(){if(b.useDisplay){a.setDisplayed(false)
}else{a.hide()
}a.clearOpacity();
a.setPositioning(d.pos);
g.width=d.width;
g.height=d.height;
g.fontSize="";
a.afterFx(b)
};
var e=this.getWidth();
var h=this.getHeight();
arguments.callee.anim=this.fxanim({width:{to:this.adjustWidth(e*2)},height:{to:this.adjustHeight(h*2)},points:{by:[-(e*0.5),-(h*0.5)]},opacity:{to:0},fontSize:{to:200,unit:"%"}},b,"motion",0.5,"easeOut",c)
});
return this
},switchOff:function(b){var a=this.getFxEl();
b=b||{};
a.queueFx(b,function(){this.clearOpacity();
this.clip();
var d=this.getFxRestore();
var e=this.dom.style;
var c=function(){if(b.useDisplay){a.setDisplayed(false)
}else{a.hide()
}a.clearOpacity();
a.setPositioning(d.pos);
e.width=d.width;
e.height=d.height;
a.afterFx(b)
};
this.fxanim({opacity:{to:0.3}},null,null,0.1,null,function(){this.clearOpacity();
(function(){this.fxanim({height:{to:1},points:{by:[0,this.getHeight()*0.5]}},b,"motion",0.3,"easeIn",c)
}).defer(100,this)
})
});
return this
},highlight:function(a,b){var c=this.getFxEl();
b=b||{};
c.queueFx(b,function(){a=a||"ffff9c";
var j=b.attr||"backgroundColor";
this.clearOpacity();
this.show();
var g=this.getColor(j);
var e=this.dom.style[j];
var h=(b.endColor||g)||"ffffff";
var d=function(){c.dom.style[j]=e;
c.afterFx(b)
};
var i={};
i[j]={from:a,to:h};
arguments.callee.anim=this.fxanim(i,b,"color",1,"easeIn",d)
});
return this
},frame:function(a,c,b){var d=this.getFxEl();
b=b||{};
d.queueFx(b,function(){a=a||"#C3DAF9";
if(a.length==6){a="#"+a
}c=c||1;
var e=b.duration||1;
this.show();
var h=this.getBox();
var g=function(){var j=Ext.getBody().createChild({style:{visbility:"hidden",position:"absolute","z-index":"35000",border:"0px solid "+a}});
var i=Ext.isBorderBox?2:1;
j.animate({top:{from:h.y,to:h.y-20},left:{from:h.x,to:h.x-20},borderWidth:{from:0,to:10},opacity:{from:1,to:0},height:{from:h.height,to:(h.height+(20*i))},width:{from:h.width,to:(h.width+(20*i))}},e,function(){j.remove();
if(--c>0){g()
}else{d.afterFx(b)
}})
};
g.call(this)
});
return this
},pause:function(b){var a=this.getFxEl();
var c={};
a.queueFx(c,function(){setTimeout(function(){a.afterFx(c)
},b*1000)
});
return this
},fadeIn:function(b){var a=this.getFxEl();
b=b||{};
a.queueFx(b,function(){this.setOpacity(0);
this.fixDisplay();
this.dom.style.visibility="visible";
var c=b.endOpacity||1;
arguments.callee.anim=this.fxanim({opacity:{to:c}},b,null,0.5,"easeOut",function(){if(c==1){this.clearOpacity()
}a.afterFx(b)
})
});
return this
},fadeOut:function(b){var a=this.getFxEl();
b=b||{};
a.queueFx(b,function(){arguments.callee.anim=this.fxanim({opacity:{to:b.endOpacity||0}},b,null,0.5,"easeOut",function(){if(this.visibilityMode==Ext.Element.DISPLAY||b.useDisplay){this.dom.style.display="none"
}else{this.dom.style.visibility="hidden"
}this.clearOpacity();
a.afterFx(b)
})
});
return this
},scale:function(a,c,b){this.shift(Ext.apply({},b,{width:a,height:c}));
return this
},shift:function(b){var a=this.getFxEl();
b=b||{};
a.queueFx(b,function(){var g={},h=b.width,e=b.height,i=b.x,c=b.y,d=b.opacity;
if(h!==undefined){g.width={to:this.adjustWidth(h)}
}if(e!==undefined){g.height={to:this.adjustHeight(e)}
}if(i!==undefined||c!==undefined){g.points={to:[i!==undefined?i:this.getX(),c!==undefined?c:this.getY()]}
}if(d!==undefined){g.opacity={to:d}
}if(b.xy!==undefined){g.points={to:b.xy}
}arguments.callee.anim=this.fxanim(g,b,"motion",0.35,"easeOut",function(){a.afterFx(b)
})
});
return this
},ghost:function(a,b){var c=this.getFxEl();
b=b||{};
c.queueFx(b,function(){a=a||"b";
var g=this.getFxRestore();
var j=this.getWidth(),h=this.getHeight();
var i=this.dom.style;
var d=function(){if(b.useDisplay){c.setDisplayed(false)
}else{c.hide()
}c.clearOpacity();
c.setPositioning(g.pos);
i.width=g.width;
i.height=g.height;
c.afterFx(b)
};
var k={opacity:{to:0},points:{}},e=k.points;
switch(a.toLowerCase()){case"t":e.by=[0,-h];
break;
case"l":e.by=[-j,0];
break;
case"r":e.by=[j,0];
break;
case"b":e.by=[0,h];
break;
case"tl":e.by=[-j,-h];
break;
case"bl":e.by=[-j,h];
break;
case"br":e.by=[j,h];
break;
case"tr":e.by=[j,-h];
break
}arguments.callee.anim=this.fxanim(k,b,"motion",0.5,"easeOut",d)
});
return this
},syncFx:function(){this.fxDefaults=Ext.apply(this.fxDefaults||{},{block:false,concurrent:true,stopFx:false});
return this
},sequenceFx:function(){this.fxDefaults=Ext.apply(this.fxDefaults||{},{block:false,concurrent:false,stopFx:false});
return this
},nextFx:function(){var a=this.fxQueue[0];
if(a){a.call(this)
}},hasActiveFx:function(){return this.fxQueue&&this.fxQueue[0]
},stopFx:function(){if(this.hasActiveFx()){var a=this.fxQueue[0];
if(a&&a.anim&&a.anim.isAnimated()){this.fxQueue=[a];
a.anim.stop(true)
}}return this
},beforeFx:function(a){if(this.hasActiveFx()&&!a.concurrent){if(a.stopFx){this.stopFx();
return true
}return false
}return true
},hasFxBlock:function(){var a=this.fxQueue;
return a&&a[0]&&a[0].block
},queueFx:function(b,a){if(!this.fxQueue){this.fxQueue=[]
}if(!this.hasFxBlock()){Ext.applyIf(b,this.fxDefaults);
if(!b.concurrent){var c=this.beforeFx(b);
a.block=b.block;
this.fxQueue.push(a);
if(c){this.nextFx()
}}else{a.call(this)
}}return this
},fxWrap:function(b,d,e){var g;
if(!d.wrap||!(g=Ext.get(d.wrap))){var a;
if(d.fixPosition){a=this.getXY()
}var c=document.createElement("div");
c.style.visibility=e;
g=Ext.get(this.dom.parentNode.insertBefore(c,this.dom));
g.setPositioning(b);
if(g.getStyle("position")=="static"){g.position("relative")
}this.clearPositioning("auto");
g.clip();
g.dom.appendChild(this.dom);
if(a){g.setXY(a)
}}return g
},fxUnwrap:function(a,b,c){this.clearPositioning();
this.setPositioning(b);
if(!c.wrap){a.dom.parentNode.insertBefore(this.dom,a.dom);
a.remove()
}},getFxRestore:function(){var a=this.dom.style;
return{pos:this.getPositioning(),width:a.width,height:a.height}
},afterFx:function(a){if(a.afterStyle){this.applyStyles(a.afterStyle)
}if(a.afterCls){this.addClass(a.afterCls)
}if(a.remove===true){this.remove()
}Ext.callback(a.callback,a.scope,[this]);
if(!a.concurrent){this.fxQueue.shift();
this.nextFx()
}},getFxEl:function(){return Ext.get(this.dom)
},fxanim:function(e,d,h,c,g,a){h=h||"run";
d=d||{};
var b=Ext.lib.Anim[h](this.dom,e,(d.duration||c)||0.35,(d.easing||g)||"easeOut",function(){Ext.callback(a,this)
},this);
d.anim=b;
return b
}};
Ext.Fx.resize=Ext.Fx.scale;
Ext.apply(Ext.Element.prototype,Ext.Fx);
Ext.CompositeElement=function(a){this.elements=[];
this.addElements(a)
};
Ext.CompositeElement.prototype={isComposite:true,addElements:function(b){if(!b){return this
}if(typeof b=="string"){b=Ext.Element.selectorFunction(b)
}var c=this.elements;
var e=c.length-1;
for(var d=0,a=b.length;
d<a;
d++){c[++e]=Ext.get(b[d])
}return this
},fill:function(a){this.elements=[];
this.add(a);
return this
},filter:function(a){var b=[];
this.each(function(c){if(c.is(a)){b[b.length]=c.dom
}});
this.fill(b);
return this
},invoke:function(b,e){var c=this.elements;
for(var d=0,a=c.length;
d<a;
d++){Ext.Element.prototype[b].apply(c[d],e)
}return this
},add:function(a){if(typeof a=="string"){this.addElements(Ext.Element.selectorFunction(a))
}else{if(a.length!==undefined){this.addElements(a)
}else{this.addElements([a])
}}return this
},each:function(b,c){var d=this.elements;
for(var e=0,a=d.length;
e<a;
e++){if(b.call(c||d[e],d[e],this,e)===false){break
}}return this
},item:function(a){return this.elements[a]||null
},first:function(){return this.item(0)
},last:function(){return this.item(this.elements.length-1)
},getCount:function(){return this.elements.length
},contains:function(a){return this.indexOf(a)!==-1
},indexOf:function(a){return this.elements.indexOf(Ext.get(a))
},removeElement:function(d,b){if(Ext.isArray(d)){for(var e=0,a=d.length;
e<a;
e++){this.removeElement(d[e])
}return this
}var g=typeof d=="number"?d:this.indexOf(d);
if(g!==-1&&this.elements[g]){if(b){var c=this.elements[g];
if(c.dom){c.remove()
}else{Ext.removeNode(c)
}}this.elements.splice(g,1)
}return this
},replaceElement:function(b,c,a){var d=typeof b=="number"?b:this.indexOf(b);
if(d!==-1){if(a){this.elements[d].replaceWith(c)
}else{this.elements.splice(d,1,Ext.get(c))
}}return this
},clear:function(){this.elements=[]
}};
(function(){Ext.CompositeElement.createCall=function(c,b){if(!c[b]){c[b]=function(){return this.invoke(b,arguments)
}
}};
for(var a in Ext.Element.prototype){if(typeof Ext.Element.prototype[a]=="function"){Ext.CompositeElement.createCall(Ext.CompositeElement.prototype,a)
}}})();
Ext.CompositeElementLite=function(a){Ext.CompositeElementLite.superclass.constructor.call(this,a);
this.el=new Ext.Element.Flyweight()
};
Ext.extend(Ext.CompositeElementLite,Ext.CompositeElement,{addElements:function(b){if(b){if(Ext.isArray(b)){this.elements=this.elements.concat(b)
}else{var c=this.elements;
var e=c.length-1;
for(var d=0,a=b.length;
d<a;
d++){c[++e]=b[d]
}}}return this
},invoke:function(b,g){var d=this.elements;
var c=this.el;
for(var e=0,a=d.length;
e<a;
e++){c.dom=d[e];
Ext.Element.prototype[b].apply(c,g)
}return this
},item:function(a){if(!this.elements[a]){return null
}this.el.dom=this.elements[a];
return this.el
},addListener:function(h,b,c,d){var e=this.elements;
for(var g=0,a=e.length;
g<a;
g++){Ext.EventManager.on(e[g],h,b,c||e[g],d)
}return this
},each:function(b,c){var e=this.elements;
var d=this.el;
for(var g=0,a=e.length;
g<a;
g++){d.dom=e[g];
if(b.call(c||d,d,this,g)===false){break
}}return this
},indexOf:function(a){return this.elements.indexOf(Ext.getDom(a))
},replaceElement:function(c,d,a){var e=typeof c=="number"?c:this.indexOf(c);
if(e!==-1){d=Ext.getDom(d);
if(a){var b=this.elements[e];
b.parentNode.insertBefore(d,b);
Ext.removeNode(b)
}this.elements.splice(e,1,d)
}return this
}});
Ext.CompositeElementLite.prototype.on=Ext.CompositeElementLite.prototype.addListener;
if(Ext.DomQuery){Ext.Element.selectorFunction=Ext.DomQuery.select
}Ext.Element.select=function(a,b,d){var c;
if(typeof a=="string"){c=Ext.Element.selectorFunction(a,d)
}else{if(a.length!==undefined){c=a
}else{throw"Invalid selector"
}}if(b===true){return new Ext.CompositeElement(c)
}else{return new Ext.CompositeElementLite(c)
}};
Ext.select=Ext.Element.select;
Ext.data.Connection=function(a){Ext.apply(this,a);
this.addEvents("beforerequest","requestcomplete","requestexception");
Ext.data.Connection.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Connection,Ext.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,request:function(k){if(this.fireEvent("beforerequest",this,k)!==false){var b=k.params;
if(typeof b=="function"){b=b.call(k.scope||window,k)
}if(typeof b=="object"){b=Ext.urlEncode(b)
}if(this.extraParams){var i=Ext.urlEncode(this.extraParams);
b=b?(b+"&"+i):i
}var c=k.url||this.url;
if(typeof c=="function"){c=c.call(k.scope||window,k)
}if(k.form){var a=Ext.getDom(k.form);
c=c||a.action;
var g=a.getAttribute("enctype");
if(k.isUpload||(g&&g.toLowerCase()=="multipart/form-data")){return this.doFormUpload(k,b,c)
}var h=Ext.lib.Ajax.serializeForm(a);
b=b?(b+"&"+h):h
}var e=k.headers;
if(this.defaultHeaders){e=Ext.apply(e||{},this.defaultHeaders);
if(!k.headers){k.headers=e
}}var j={success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{options:k},timeout:k.timeout||this.timeout};
var d=k.method||this.method||(b?"POST":"GET");
if(d=="GET"&&(this.disableCaching&&k.disableCaching!==false)||k.disableCaching===true){c+=(c.indexOf("?")!=-1?"&":"?")+"_dc="+(new Date().getTime())
}if(typeof k.autoAbort=="boolean"){if(k.autoAbort){this.abort()
}}else{if(this.autoAbort!==false){this.abort()
}}if((d=="GET"&&b)||k.xmlData||k.jsonData){c+=(c.indexOf("?")!=-1?"&":"?")+b;
b=""
}this.transId=Ext.lib.Ajax.request(d,c,j,b,k);
return this.transId
}else{Ext.callback(k.callback,k.scope,[k,null,null]);
return null
}},isLoading:function(a){if(a){return Ext.lib.Ajax.isCallInProgress(a)
}else{return this.transId?true:false
}},abort:function(a){if(a||this.isLoading()){Ext.lib.Ajax.abort(a||this.transId)
}},handleResponse:function(a){this.transId=false;
var b=a.argument.options;
a.argument=b?b.argument:null;
this.fireEvent("requestcomplete",this,a,b);
Ext.callback(b.success,b.scope,[a,b]);
Ext.callback(b.callback,b.scope,[b,true,a])
},handleFailure:function(a,b){this.transId=false;
var c=a.argument.options;
a.argument=c?c.argument:null;
this.fireEvent("requestexception",this,a,c,b);
Ext.callback(c.failure,c.scope,[a,c]);
Ext.callback(c.callback,c.scope,[c,false,a])
},doFormUpload:function(m,d,c){var b=Ext.id();
var l=document.createElement("iframe");
l.id=b;
l.name=b;
l.className="x-hidden";
if(Ext.isIE){l.src=Ext.SSL_SECURE_URL
}document.body.appendChild(l);
if(Ext.isIE){document.frames[b].name=b
}var a=Ext.getDom(m.form);
a.target=b;
a.method="POST";
a.enctype=a.encoding="multipart/form-data";
if(c){a.action=c
}var e,h;
if(d){e=[];
d=Ext.urlDecode(d,false);
for(var j in d){if(d.hasOwnProperty(j)){h=document.createElement("input");
h.type="hidden";
h.name=j;
h.value=d[j];
a.appendChild(h);
e.push(h)
}}}function k(){var p={responseText:"",responseXML:null};
p.argument=m?m.argument:null;
try{var n;
if(Ext.isIE){n=l.contentWindow.document
}else{n=(l.contentDocument||window.frames[b].document)
}if(n&&n.body){p.responseText=n.body.innerHTML
}if(n&&n.XMLDocument){p.responseXML=n.XMLDocument
}else{p.responseXML=n
}}catch(o){}Ext.EventManager.removeListener(l,"load",k,this);
this.fireEvent("requestcomplete",this,p,m);
Ext.callback(m.success,m.scope,[p,m]);
Ext.callback(m.callback,m.scope,[m,true,p]);
setTimeout(function(){Ext.removeNode(l)
},100)
}Ext.EventManager.on(l,"load",k,this);
a.submit();
if(e){for(var i=0,g=e.length;
i<g;
i++){Ext.removeNode(e[i])
}}}});
Ext.Ajax=new Ext.data.Connection({autoAbort:false,serializeForm:function(a){return Ext.lib.Ajax.serializeForm(a)
}});
Ext.Updater=function(c,a){c=Ext.get(c);
if(!a&&c.updateManager){return c.updateManager
}this.el=c;
this.defaultUrl=null;
this.addEvents("beforeupdate","update","failure");
var b=Ext.Updater.defaults;
this.sslBlankUrl=b.sslBlankUrl;
this.disableCaching=b.disableCaching;
this.indicatorText=b.indicatorText;
this.showLoadIndicator=b.showLoadIndicator;
this.timeout=b.timeout;
this.loadScripts=b.loadScripts;
this.transaction=null;
this.autoRefreshProcId=null;
this.refreshDelegate=this.refresh.createDelegate(this);
this.updateDelegate=this.update.createDelegate(this);
this.formUpdateDelegate=this.formUpdate.createDelegate(this);
if(!this.renderer){this.renderer=new Ext.Updater.BasicRenderer()
}Ext.Updater.superclass.constructor.call(this)
};
Ext.extend(Ext.Updater,Ext.util.Observable,{getEl:function(){return this.el
},update:function(i,d,b,g){if(this.fireEvent("beforeupdate",this.el,i,d)!==false){var c=this.method,a,h;
if(typeof i=="object"){a=i;
i=a.url;
d=d||a.params;
b=b||a.callback;
g=g||a.discardUrl;
h=a.scope;
if(typeof a.method!="undefined"){c=a.method
}if(typeof a.nocache!="undefined"){this.disableCaching=a.nocache
}if(typeof a.text!="undefined"){this.indicatorText='<div class="loading-indicator">'+a.text+"</div>"
}if(typeof a.scripts!="undefined"){this.loadScripts=a.scripts
}if(typeof a.timeout!="undefined"){this.timeout=a.timeout
}}this.showLoading();
if(!g){this.defaultUrl=i
}if(typeof i=="function"){i=i.call(this)
}c=c||(d?"POST":"GET");
if(c=="GET"){i=this.prepareUrl(i)
}var e=Ext.apply(a||{},{url:i,params:(typeof d=="function"&&h)?d.createDelegate(h):d,success:this.processSuccess,failure:this.processFailure,scope:this,callback:undefined,timeout:(this.timeout*1000),argument:{options:a,url:i,form:null,callback:b,scope:h||window,params:d}});
this.transaction=Ext.Ajax.request(e)
}},formUpdate:function(c,a,d,b){if(this.fireEvent("beforeupdate",this.el,c,a)!==false){if(typeof a=="function"){a=a.call(this)
}c=Ext.getDom(c);
this.transaction=Ext.Ajax.request({form:c,url:a,success:this.processSuccess,failure:this.processFailure,scope:this,timeout:(this.timeout*1000),argument:{url:a,form:c,callback:b,reset:d}});
this.showLoading.defer(1,this)
}},refresh:function(a){if(this.defaultUrl==null){return
}this.update(this.defaultUrl,null,a,true)
},startAutoRefresh:function(e,d,c,b,a){if(a){this.update(d||this.defaultUrl,c,b,true)
}if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId)
}this.autoRefreshProcId=setInterval(this.update.createDelegate(this,[d||this.defaultUrl,c,b,true]),e*1000)
},stopAutoRefresh:function(){if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId);
delete this.autoRefreshProcId
}},isAutoRefreshing:function(){return this.autoRefreshProcId?true:false
},showLoading:function(){if(this.showLoadIndicator){this.el.update(this.indicatorText)
}},prepareUrl:function(b){if(this.disableCaching){var a="_dc="+(new Date().getTime());
if(b.indexOf("?")!==-1){b+="&"+a
}else{b+="?"+a
}}return b
},processSuccess:function(a){this.transaction=null;
if(a.argument.form&&a.argument.reset){try{a.argument.form.reset()
}catch(b){}}if(this.loadScripts){this.renderer.render(this.el,a,this,this.updateComplete.createDelegate(this,[a]))
}else{this.renderer.render(this.el,a,this);
this.updateComplete(a)
}},updateComplete:function(a){this.fireEvent("update",this.el,a);
if(typeof a.argument.callback=="function"){a.argument.callback.call(a.argument.scope,this.el,true,a,a.argument.options)
}},processFailure:function(a){this.transaction=null;
this.fireEvent("failure",this.el,a);
if(typeof a.argument.callback=="function"){a.argument.callback.call(a.argument.scope,this.el,false,a,a.argument.options)
}},setRenderer:function(a){this.renderer=a
},getRenderer:function(){return this.renderer
},setDefaultUrl:function(a){this.defaultUrl=a
},abort:function(){if(this.transaction){Ext.Ajax.abort(this.transaction)
}},isUpdating:function(){if(this.transaction){return Ext.Ajax.isLoading(this.transaction)
}return false
}});
Ext.Updater.defaults={timeout:30,loadScripts:false,sslBlankUrl:(Ext.SSL_SECURE_URL||"javascript:false"),disableCaching:false,showLoadIndicator:true,indicatorText:'<div class="loading-indicator">Loading...</div>'};
Ext.Updater.updateElement=function(c,d,b,e){var a=Ext.get(c).getUpdater();
Ext.apply(a,e);
a.update(d,b,e?e.callback:null)
};
Ext.Updater.update=Ext.Updater.updateElement;
Ext.Updater.BasicRenderer=function(){};
Ext.Updater.BasicRenderer.prototype={render:function(c,a,d,b){c.update(a.responseText,d.loadScripts,b)
}};
Ext.UpdateManager=Ext.Updater;
Ext.util.DelayedTask=function(d,e,a){var b=null,c,h;
var g=function(){var i=new Date().getTime();
if(i-h>=c){clearInterval(b);
b=null;
d.apply(e,a||[])
}};
this.delay=function(k,i,j,l){if(b&&k!=c){this.cancel()
}c=k;
h=new Date().getTime();
d=i||d;
e=j||e;
a=l||a;
if(!b){b=setInterval(g,c)
}};
this.cancel=function(){if(b){clearInterval(b);
b=null
}}
};