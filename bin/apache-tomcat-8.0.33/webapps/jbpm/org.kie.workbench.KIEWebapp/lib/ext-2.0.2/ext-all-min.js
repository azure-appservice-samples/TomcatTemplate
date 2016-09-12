Ext.DomHelper=function(){var g=null;
var n=/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i;
var c=/^table|tbody|tr|td$/i;
var d=function(q){if(typeof q=="string"){return q
}var v="";
if(Ext.isArray(q)){for(var s=0,u=q.length;
s<u;
s++){v+=d(q[s])
}return v
}if(!q.tag){q.tag="div"
}v+="<"+q.tag;
for(var w in q){if(w=="tag"||w=="children"||w=="cn"||w=="html"||typeof q[w]=="function"){continue
}if(w=="style"){var r=q.style;
if(typeof r=="function"){r=r.call()
}if(typeof r=="string"){v+=' style="'+r+'"'
}else{if(typeof r=="object"){v+=' style="';
for(var t in r){if(typeof r[t]!="function"){v+=t+":"+r[t]+";"
}}v+='"'
}}}else{if(w=="cls"){v+=' class="'+q.cls+'"'
}else{if(w=="htmlFor"){v+=' for="'+q.htmlFor+'"'
}else{v+=" "+w+'="'+q[w]+'"'
}}}}if(n.test(q.tag)){v+="/>"
}else{v+=">";
var p=q.children||q.cn;
if(p){v+=d(p)
}else{if(q.html){v+=q.html
}}v+="</"+q.tag+">"
}return v
};
var e=function(q,v){var r;
if(Ext.isArray(q)){r=document.createDocumentFragment();
for(var s=0,u=q.length;
s<u;
s++){e(q[s],r)
}}else{if(typeof q=="string)"){r=document.createTextNode(q)
}else{r=document.createElement(q.tag||"div");
var t=!!r.setAttribute;
for(var w in q){if(w=="tag"||w=="children"||w=="cn"||w=="html"||w=="style"||typeof q[w]=="function"){continue
}if(w=="cls"){r.className=q.cls
}else{if(t){r.setAttribute(w,q[w])
}else{r[w]=q[w]
}}}Ext.DomHelper.applyStyles(r,q.style);
var p=q.children||q.cn;
if(p){e(p,r)
}else{if(q.html){r.innerHTML=q.html
}}}}if(v){v.appendChild(r)
}return r
};
var k=function(p,r,s,q){g.innerHTML=[r,s,q].join("");
var u=-1,t=g;
while(++u<p){t=t.firstChild
}return t
};
var i="<table>",o="</table>",b=i+"<tbody>",h="</tbody>"+o,l=b+"<tr>",a="</tr>"+h;
var m=function(u,t,r,s){if(!g){g=document.createElement("div")
}var q;
var p=null;
if(u=="td"){if(t=="afterbegin"||t=="beforeend"){return
}if(t=="beforebegin"){p=r;
r=r.parentNode
}else{p=r.nextSibling;
r=r.parentNode
}q=k(4,l,s,a)
}else{if(u=="tr"){if(t=="beforebegin"){p=r;
r=r.parentNode;
q=k(3,b,s,h)
}else{if(t=="afterend"){p=r.nextSibling;
r=r.parentNode;
q=k(3,b,s,h)
}else{if(t=="afterbegin"){p=r.firstChild
}q=k(4,l,s,a)
}}}else{if(u=="tbody"){if(t=="beforebegin"){p=r;
r=r.parentNode;
q=k(2,i,s,o)
}else{if(t=="afterend"){p=r.nextSibling;
r=r.parentNode;
q=k(2,i,s,o)
}else{if(t=="afterbegin"){p=r.firstChild
}q=k(3,b,s,h)
}}}else{if(t=="beforebegin"||t=="afterend"){return
}if(t=="afterbegin"){p=r.firstChild
}q=k(2,i,s,o)
}}}r.insertBefore(q,p);
return q
};
return{useDom:false,markup:function(p){return d(p)
},applyStyles:function(r,q){if(q){r=Ext.fly(r);
if(typeof q=="string"){var s=/\s?([a-z\-]*)\:\s?([^;]*);?/gi;
var p;
while((p=s.exec(q))!=null){r.setStyle(p[1],p[2])
}}else{if(typeof q=="object"){for(var t in q){r.setStyle(t,q[t])
}}else{if(typeof q=="function"){Ext.DomHelper.applyStyles(r,q.call())
}}}}},insertHtml:function(s,q,r){s=s.toLowerCase();
if(q.insertAdjacentHTML){if(c.test(q.tagName)){var t;
if(t=m(q.tagName.toLowerCase(),s,q,r)){return t
}}switch(s){case"beforebegin":q.insertAdjacentHTML("BeforeBegin",r);
return q.previousSibling;
case"afterbegin":q.insertAdjacentHTML("AfterBegin",r);
return q.firstChild;
case"beforeend":q.insertAdjacentHTML("BeforeEnd",r);
return q.lastChild;
case"afterend":q.insertAdjacentHTML("AfterEnd",r);
return q.nextSibling
}throw'Illegal insertion point -> "'+s+'"'
}var u=q.ownerDocument.createRange();
var p;
switch(s){case"beforebegin":u.setStartBefore(q);
p=u.createContextualFragment(r);
q.parentNode.insertBefore(p,q);
return q.previousSibling;
case"afterbegin":if(q.firstChild){u.setStartBefore(q.firstChild);
p=u.createContextualFragment(r);
q.insertBefore(p,q.firstChild);
return q.firstChild
}else{q.innerHTML=r;
return q.firstChild
}case"beforeend":if(q.lastChild){u.setStartAfter(q.lastChild);
p=u.createContextualFragment(r);
q.appendChild(p);
return q.lastChild
}else{q.innerHTML=r;
return q.lastChild
}case"afterend":u.setStartAfter(q);
p=u.createContextualFragment(r);
q.parentNode.insertBefore(p,q.nextSibling);
return q.nextSibling
}throw'Illegal insertion point -> "'+s+'"'
},insertBefore:function(r,p,q){return this.doInsert(r,p,q,"beforeBegin")
},insertAfter:function(r,p,q){return this.doInsert(r,p,q,"afterEnd","nextSibling")
},insertFirst:function(r,p,q){return this.doInsert(r,p,q,"afterBegin","firstChild")
},doInsert:function(s,q,r,p,t){s=Ext.getDom(s);
var u;
if(this.useDom){u=e(q,null);
(t==="firstChild"?s:s.parentNode).insertBefore(u,t?s[t]:s)
}else{var v=d(q);
u=this.insertHtml(p,s,v)
}return r?Ext.get(u,true):u
},append:function(r,p,q){r=Ext.getDom(r);
var s;
if(this.useDom){s=e(p,null);
r.appendChild(s)
}else{var t=d(p);
s=this.insertHtml("beforeEnd",r,t)
}return q?Ext.get(s,true):s
},overwrite:function(r,p,q){r=Ext.getDom(r);
r.innerHTML=d(p);
return q?Ext.get(r.firstChild,true):r.firstChild
},createTemplate:function(p){var q=d(p);
return new Ext.Template(q)
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
var c=function(m,k,g,l){if(g&&a){if(g.substr(0,5)=="this."){return d.call(g.substr(5),e[k],e)
}else{if(l){var h=/^\s*['"](.*)["']\s*$/;
l=l.split(",");
for(var i=0,n=l.length;
i<n;
i++){l[i]=l[i].replace(h,"$1")
}l=[e[k]].concat(l)
}else{l=[e[k]]
}return b[g].apply(b,l)
}}else{return e[k]!==undefined?e[k]:""
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
var a=function(i,k,l){if((h=i.apply(k||d,l))!==undefined){if(typeof h==="object"){if(h.returnValue!==undefined){g=h.returnValue
}else{g=h
}if(h.cancel===true){e=true
}}else{if(h===false){e=true
}else{g=h
}}}};
this[b]=function(){g=h=undefined;
e=false;
var k=Array.prototype.slice.call(arguments,0);
for(var i=0,l=c.before.length;
i<l;
i++){a(c.before[i].fn,c.before[i].scope,k);
if(e){return g
}}if((h=c.originalFn.apply(d,k))!==undefined){g=h
}for(var i=0,l=c.after.length;
i<l;
i++){a(c.after[i].fn,c.after[i].scope,k);
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
for(var g=0,k=h.length;
g<k;
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
},fire:function(){var h=this.listeners,d,k=h.length;
if(k>0){this.firing=true;
var g=Array.prototype.slice.call(arguments,0);
for(var e=0;
e<k;
e++){var i=h[e];
if(i.fireFn.apply(i.scope||this.obj||window,arguments)===false){this.firing=false;
return false
}}this.firing=false
}return true
}}
})();
Ext.EventManager=function(){var a,i,n=false;
var l,b,r,g;
var k=Ext.lib.Event;
var h=Ext.lib.Dom;
var s=function(){if(!n){n=true;
Ext.isReady=true;
if(i){clearInterval(i)
}if(Ext.isGecko||Ext.isOpera){document.removeEventListener("DOMContentLoaded",s,false)
}if(Ext.isIE){var u=document.getElementById("ie-deferred-loader");
if(u){u.onreadystatechange=null;
u.parentNode.removeChild(u)
}}if(a){a.fire();
a.clearListeners()
}}};
var t=function(){a=new Ext.util.Event();
if(Ext.isGecko||Ext.isOpera){document.addEventListener("DOMContentLoaded",s,false)
}else{if(Ext.isIE){document.write('<script id="ie-deferred-loader" defer="defer" src="//:"><\/script>');
var u=document.getElementById("ie-deferred-loader");
u.onreadystatechange=function(){if(this.readyState=="complete"){s()
}}
}else{if(Ext.isSafari){i=setInterval(function(){var v=document.readyState;
if(v=="complete"){s()
}},10)
}}}k.on(window,"load",s)
};
var c=function(v,u){var w=new Ext.util.DelayedTask(v);
return function(x){x=new Ext.EventObjectImpl(x);
w.delay(u.buffer,v,null,[x])
}
};
var e=function(u,v,x,w){return function(y){Ext.EventManager.removeListener(v,x,w);
u(y)
}
};
var q=function(v,u){return function(w){w=new Ext.EventObjectImpl(w);
setTimeout(function(){v(w)
},u.delay||10)
}
};
var m=function(w,x,z,A,B){var y=(!z||typeof z=="boolean")?{}:z;
A=A||y.fn;
B=B||y.scope;
var u=Ext.getDom(w);
if(!u){throw'Error listening for "'+x+'". Element "'+w+"\" doesn't exist."
}var v=function(C){C=Ext.EventObject.setEvent(C);
var D;
if(y.delegate){D=C.getTarget(y.delegate,u);
if(!D){return
}}else{D=C.target
}if(y.stopEvent===true){C.stopEvent()
}if(y.preventDefault===true){C.preventDefault()
}if(y.stopPropagation===true){C.stopPropagation()
}if(y.normalized===false){C=C.browserEvent
}A.call(B||u,C,D,y)
};
if(y.delay){v=q(v,y)
}if(y.single){v=e(v,u,x,A)
}if(y.buffer){v=c(v,y)
}A._handlers=A._handlers||[];
A._handlers.push([Ext.id(u),x,v]);
k.on(u,x,v);
if(x=="mousewheel"&&u.addEventListener){u.addEventListener("DOMMouseScroll",v,false);
k.on(window,"unload",function(){u.removeEventListener("DOMMouseScroll",v,false)
})
}if(x=="mousedown"&&u==document){Ext.EventManager.stoppedMouseDownEvent.addListener(v)
}return v
};
var p=function(C,A,v){var u=Ext.id(C),B=v._handlers,x=v;
if(B){for(var z=0,w=B.length;
z<w;
z++){var y=B[z];
if(y[0]==u&&y[1]==A){x=y[2];
B.splice(z,1);
break
}}}k.un(C,A,x);
C=Ext.getDom(C);
if(A=="mousewheel"&&C.addEventListener){C.removeEventListener("DOMMouseScroll",x,false)
}if(A=="mousedown"&&C==document){Ext.EventManager.stoppedMouseDownEvent.removeListener(x)
}};
var o=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
var d={addListener:function(w,y,u,v,x){if(typeof y=="object"){var z=y;
for(var A in z){if(o.test(A)){continue
}if(typeof z[A]=="function"){m(w,A,z,z[A],z.scope)
}else{m(w,A,z[A])
}}return
}return m(w,y,x,u,v)
},removeListener:function(v,w,u){return p(v,w,u)
},onDocumentReady:function(u,v,w){if(n){a.addListener(u,v,w);
a.fire();
a.clearListeners();
return
}if(!a){t()
}a.addListener(u,v,w)
},onWindowResize:function(u,v,w){if(!l){l=new Ext.util.Event();
b=new Ext.util.DelayedTask(function(){l.fire(h.getViewWidth(),h.getViewHeight())
});
k.on(window,"resize",this.fireWindowResize,this)
}l.addListener(u,v,w)
},fireWindowResize:function(){if(l){if((Ext.isIE||Ext.isAir)&&b){b.delay(50)
}else{l.fire(h.getViewWidth(),h.getViewHeight())
}}},onTextResize:function(u,v,x){if(!r){r=new Ext.util.Event();
var w=new Ext.Element(document.createElement("div"));
w.dom.className="x-text-resize";
w.dom.innerHTML="X";
w.appendTo(document.body);
g=w.dom.offsetHeight;
setInterval(function(){if(w.dom.offsetHeight!=g){r.fire(g,g=w.dom.offsetHeight)
}},this.textResizeInterval)
}r.addListener(u,v,x)
},removeResizeListener:function(u,v){if(l){l.removeListener(u,v)
}},fireResize:function(){if(l){l.fire(h.getViewWidth(),h.getViewHeight())
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
var m=this.fxWrap(d.pos,b,"hidden");
var g=this.dom.style;
g.visibility="visible";
g.position="absolute";
var n=function(){c.fxUnwrap(m,d.pos,b);
g.width=d.width;
g.height=d.height;
c.afterFx(b)
};
var h,e={to:[i.x,i.y]},k={to:i.width},l={to:i.height};
switch(a.toLowerCase()){case"t":m.setSize(i.width,0);
g.left=g.bottom="0";
h={height:l};
break;
case"l":m.setSize(0,i.height);
g.right=g.top="0";
h={width:k};
break;
case"r":m.setSize(0,i.height);
m.setX(i.right);
g.left=g.top="0";
h={width:k,points:e};
break;
case"b":m.setSize(i.width,0);
m.setY(i.bottom);
g.left=g.top="0";
h={height:l,points:e};
break;
case"tl":m.setSize(0,0);
g.right=g.bottom="0";
h={width:k,height:l};
break;
case"bl":m.setSize(0,0);
m.setY(i.y+i.height);
g.right=g.top="0";
h={width:k,height:l,points:e};
break;
case"br":m.setSize(0,0);
m.setXY([i.right,i.bottom]);
g.left=g.top="0";
h={width:k,height:l,points:e};
break;
case"tr":m.setSize(0,0);
m.setX(i.x+i.width);
g.left=g.bottom="0";
h={width:k,height:l,points:e};
break
}this.dom.style.visibility="visible";
m.show();
arguments.callee.anim=m.fxanim(h,b,"motion",0.5,"easeOut",n)
});
return this
},slideOut:function(a,b){var c=this.getFxEl();
b=b||{};
c.queueFx(b,function(){a=a||"t";
var e=this.getFxRestore();
var l=this.getBox();
this.setSize(l);
var h=this.fxWrap(e.pos,b,"visible");
var i=this.dom.style;
i.visibility="visible";
i.position="absolute";
h.setSize(l);
var d=function(){if(b.useDisplay){c.setDisplayed(false)
}else{c.hide()
}c.fxUnwrap(h,e.pos,b);
i.width=e.width;
i.height=e.height;
c.afterFx(b)
};
var k,g={to:0};
switch(a.toLowerCase()){case"t":i.left=i.bottom="0";
k={height:g};
break;
case"l":i.right=i.top="0";
k={width:g};
break;
case"r":i.left=i.top="0";
k={width:g,points:{to:[l.right,l.y]}};
break;
case"b":i.left=i.top="0";
k={height:g,points:{to:[l.x,l.bottom]}};
break;
case"tl":i.right=i.bottom="0";
k={width:g,height:g};
break;
case"bl":i.right=i.top="0";
k={width:g,height:g,points:{to:[l.x,l.bottom]}};
break;
case"br":i.left=i.top="0";
k={width:g,height:g,points:{to:[l.x+l.width,l.bottom]}};
break;
case"tr":i.left=i.bottom="0";
k={width:g,height:g,points:{to:[l.right,l.y]}};
break
}arguments.callee.anim=h.fxanim(k,b,"motion",0.5,"easeOut",d)
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
var k=b.attr||"backgroundColor";
this.clearOpacity();
this.show();
var g=this.getColor(k);
var e=this.dom.style[k];
var h=(b.endColor||g)||"ffffff";
var d=function(){c.dom.style[k]=e;
c.afterFx(b)
};
var i={};
i[k]={from:a,to:h};
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
var g=function(){var k=Ext.getBody().createChild({style:{visbility:"hidden",position:"absolute","z-index":"35000",border:"0px solid "+a}});
var i=Ext.isBorderBox?2:1;
k.animate({top:{from:h.y,to:h.y-20},left:{from:h.x,to:h.x-20},borderWidth:{from:0,to:10},opacity:{from:1,to:0},height:{from:h.height,to:(h.height+(20*i))},width:{from:h.width,to:(h.width+(20*i))}},e,function(){k.remove();
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
var k=this.getWidth(),h=this.getHeight();
var i=this.dom.style;
var d=function(){if(b.useDisplay){c.setDisplayed(false)
}else{c.hide()
}c.clearOpacity();
c.setPositioning(g.pos);
i.width=g.width;
i.height=g.height;
c.afterFx(b)
};
var l={opacity:{to:0},points:{}},e=l.points;
switch(a.toLowerCase()){case"t":e.by=[0,-h];
break;
case"l":e.by=[-k,0];
break;
case"r":e.by=[k,0];
break;
case"b":e.by=[0,h];
break;
case"tl":e.by=[-k,-h];
break;
case"bl":e.by=[-k,h];
break;
case"br":e.by=[k,h];
break;
case"tr":e.by=[k,-h];
break
}arguments.callee.anim=this.fxanim(l,b,"motion",0.5,"easeOut",d)
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
Ext.extend(Ext.data.Connection,Ext.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,request:function(l){if(this.fireEvent("beforerequest",this,l)!==false){var b=l.params;
if(typeof b=="function"){b=b.call(l.scope||window,l)
}if(typeof b=="object"){b=Ext.urlEncode(b)
}if(this.extraParams){var i=Ext.urlEncode(this.extraParams);
b=b?(b+"&"+i):i
}var c=l.url||this.url;
if(typeof c=="function"){c=c.call(l.scope||window,l)
}if(l.form){var a=Ext.getDom(l.form);
c=c||a.action;
var g=a.getAttribute("enctype");
if(l.isUpload||(g&&g.toLowerCase()=="multipart/form-data")){return this.doFormUpload(l,b,c)
}var h=Ext.lib.Ajax.serializeForm(a);
b=b?(b+"&"+h):h
}var e=l.headers;
if(this.defaultHeaders){e=Ext.apply(e||{},this.defaultHeaders);
if(!l.headers){l.headers=e
}}var k={success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{options:l},timeout:l.timeout||this.timeout};
var d=l.method||this.method||(b?"POST":"GET");
if(d=="GET"&&(this.disableCaching&&l.disableCaching!==false)||l.disableCaching===true){c+=(c.indexOf("?")!=-1?"&":"?")+"_dc="+(new Date().getTime())
}if(typeof l.autoAbort=="boolean"){if(l.autoAbort){this.abort()
}}else{if(this.autoAbort!==false){this.abort()
}}if((d=="GET"&&b)||l.xmlData||l.jsonData){c+=(c.indexOf("?")!=-1?"&":"?")+b;
b=""
}this.transId=Ext.lib.Ajax.request(d,c,k,b,l);
return this.transId
}else{Ext.callback(l.callback,l.scope,[l,null,null]);
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
},doFormUpload:function(n,d,c){var b=Ext.id();
var m=document.createElement("iframe");
m.id=b;
m.name=b;
m.className="x-hidden";
if(Ext.isIE){m.src=Ext.SSL_SECURE_URL
}document.body.appendChild(m);
if(Ext.isIE){document.frames[b].name=b
}var a=Ext.getDom(n.form);
a.target=b;
a.method="POST";
a.enctype=a.encoding="multipart/form-data";
if(c){a.action=c
}var e,h;
if(d){e=[];
d=Ext.urlDecode(d,false);
for(var k in d){if(d.hasOwnProperty(k)){h=document.createElement("input");
h.type="hidden";
h.name=k;
h.value=d[k];
a.appendChild(h);
e.push(h)
}}}function l(){var q={responseText:"",responseXML:null};
q.argument=n?n.argument:null;
try{var o;
if(Ext.isIE){o=m.contentWindow.document
}else{o=(m.contentDocument||window.frames[b].document)
}if(o&&o.body){q.responseText=o.body.innerHTML
}if(o&&o.XMLDocument){q.responseXML=o.XMLDocument
}else{q.responseXML=o
}}catch(p){}Ext.EventManager.removeListener(m,"load",l,this);
this.fireEvent("requestcomplete",this,q,n);
Ext.callback(n.success,n.scope,[q,n]);
Ext.callback(n.callback,n.scope,[n,true,q]);
setTimeout(function(){Ext.removeNode(m)
},100)
}Ext.EventManager.on(m,"load",l,this);
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
Date.parseFunctions={count:0};
Date.parseRegexes=[];
Date.formatFunctions={count:0};
Date.prototype.dateFormat=function(b){if(Date.formatFunctions[b]==null){Date.createNewFormat(b)
}var a=Date.formatFunctions[b];
return this[a]()
};
Date.prototype.format=Date.prototype.dateFormat;
Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;
Date.formatFunctions[format]=funcName;
var code="Date.prototype."+funcName+" = function(){return ";
var special=false;
var ch="";
for(var i=0;
i<format.length;
++i){ch=format.charAt(i);
if(!special&&ch=="\\"){special=true
}else{if(special){special=false;
code+="'"+String.escape(ch)+"' + "
}else{code+=Date.getFormatCode(ch)
}}}eval(code.substring(0,code.length-3)+";}")
};
Date.getFormatCode=function(e){switch(e){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";
case"D":return"Date.getShortDayName(this.getDay()) + ";
case"j":return"this.getDate() + ";
case"l":return"Date.dayNames[this.getDay()] + ";
case"N":return"(this.getDay() ? this.getDay() : 7) + ";
case"S":return"this.getSuffix() + ";
case"w":return"this.getDay() + ";
case"z":return"this.getDayOfYear() + ";
case"W":return"String.leftPad(this.getWeekOfYear(), 2, '0') + ";
case"F":return"Date.monthNames[this.getMonth()] + ";
case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";
case"M":return"Date.getShortMonthName(this.getMonth()) + ";
case"n":return"(this.getMonth() + 1) + ";
case"t":return"this.getDaysInMonth() + ";
case"L":return"(this.isLeapYear() ? 1 : 0) + ";
case"o":return"(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0))) + ";
case"Y":return"this.getFullYear() + ";
case"y":return"('' + this.getFullYear()).substring(2, 4) + ";
case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";
case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";
case"g":return"((this.getHours() % 12) ? this.getHours() % 12 : 12) + ";
case"G":return"this.getHours() + ";
case"h":return"String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0') + ";
case"H":return"String.leftPad(this.getHours(), 2, '0') + ";
case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";
case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";
case"u":return"String.leftPad(this.getMilliseconds(), 3, '0') + ";
case"O":return"this.getGMTOffset() + ";
case"P":return"this.getGMTOffset(true) + ";
case"T":return"this.getTimezone() + ";
case"Z":return"(this.getTimezoneOffset() * -60) + ";
case"c":for(var c=Date.getFormatCode,b="Y-m-dTH:i:sP",g="",h=0,a=b.length;
h<a;
++h){var d=b.charAt(h);
g+=d=="T"?"'T' + ":c(d)
}return g;
case"U":return"Math.round(this.getTime() / 1000) + ";
default:return"'"+String.escape(e)+"' + "
}};
Date.parseDate=function(a,b){if(Date.parseFunctions[b]==null){Date.createParser(b)
}var c=Date.parseFunctions[b];
return Date[c](a)
};
Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++;
var regexNum=Date.parseRegexes.length;
var currentGroup=1;
Date.parseFunctions[format]=funcName;
var code="Date."+funcName+" = function(input){\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, ms = -1, o, z, u, v;\ninput = String(input);var d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {";
var regex="";
var special=false;
var ch="";
for(var i=0;
i<format.length;
++i){ch=format.charAt(i);
if(!special&&ch=="\\"){special=true
}else{if(special){special=false;
regex+=String.escape(ch)
}else{var obj=Date.formatCodeToRegex(ch,currentGroup);
currentGroup+=obj.g;
regex+=obj.s;
if(obj.g&&obj.c){code+=obj.c
}}}}code+="if (u)\n{v = new Date(u * 1000);}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0 && ms >= 0)\n{v = new Date(y, m, d, h, i, s, ms);}\nelse if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{v = new Date(y, m, d, h, i, s);}\nelse if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{v = new Date(y, m, d, h, i);}\nelse if (y >= 0 && m >= 0 && d > 0 && h >= 0)\n{v = new Date(y, m, d, h);}\nelse if (y >= 0 && m >= 0 && d > 0)\n{v = new Date(y, m, d);}\nelse if (y >= 0 && m >= 0)\n{v = new Date(y, m);}\nelse if (y >= 0)\n{v = new Date(y);}\n}return (v && (z || o))?\n    (z ? v.add(Date.SECOND, (v.getTimezoneOffset() * 60) + (z*1)) :\n        v.add(Date.HOUR, (v.getGMTOffset() / 100) + (o / -100))) : v\n;}";
Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$","i");
eval(code)
};
Date.formatCodeToRegex=function(c,d){switch(c){case"d":return{g:1,c:"d = parseInt(results["+d+"], 10);\n",s:"(\\d{2})"};
case"D":for(var h=[],e=0;
e<7;
h.push(Date.getShortDayName(e)),++e){}return{g:0,c:null,s:"(?:"+h.join("|")+")"};
case"j":return{g:1,c:"d = parseInt(results["+d+"], 10);\n",s:"(\\d{1,2})"};
case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};
case"N":return{g:0,c:null,s:"[1-7]"};
case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};
case"w":return{g:0,c:null,s:"[0-6]"};
case"z":return{g:0,c:null,s:"(?:\\d{1,3}"};
case"W":return{g:0,c:null,s:"(?:\\d{2})"};
case"F":return{g:1,c:"m = parseInt(Date.getMonthNumber(results["+d+"]), 10);\n",s:"("+Date.monthNames.join("|")+")"};
case"m":return{g:1,c:"m = parseInt(results["+d+"], 10) - 1;\n",s:"(\\d{2})"};
case"M":for(var h=[],e=0;
e<12;
h.push(Date.getShortMonthName(e)),++e){}return{g:1,c:"m = parseInt(Date.getMonthNumber(results["+d+"]), 10);\n",s:"("+h.join("|")+")"};
case"n":return{g:1,c:"m = parseInt(results["+d+"], 10) - 1;\n",s:"(\\d{1,2})"};
case"t":return{g:0,c:null,s:"(?:\\d{2})"};
case"L":return{g:0,c:null,s:"(?:1|0)"};
case"o":case"Y":return{g:1,c:"y = parseInt(results["+d+"], 10);\n",s:"(\\d{4})"};
case"y":return{g:1,c:"var ty = parseInt(results["+d+"], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};
case"a":return{g:1,c:"if (results["+d+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};
case"A":return{g:1,c:"if (results["+d+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};
case"g":case"G":return{g:1,c:"h = parseInt(results["+d+"], 10);\n",s:"(\\d{1,2})"};
case"h":case"H":return{g:1,c:"h = parseInt(results["+d+"], 10);\n",s:"(\\d{2})"};
case"i":return{g:1,c:"i = parseInt(results["+d+"], 10);\n",s:"(\\d{2})"};
case"s":return{g:1,c:"s = parseInt(results["+d+"], 10);\n",s:"(\\d{2})"};
case"u":return{g:1,c:"ms = parseInt(results["+d+"], 10);\n",s:"(\\d{3})"};
case"O":return{g:1,c:["o = results[",d,"];\n","var sn = o.substring(0,1);\n","var hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60);\n","var mn = o.substring(3,5) % 60;\n","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))?\n","    (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join(""),s:"([+-]\\d{4})"};
case"P":return{g:1,c:["o = results[",d,"];\n","var sn = o.substring(0,1);\n","var hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60);\n","var mn = o.substring(4,6) % 60;\n","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))?\n","    (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join(""),s:"([+-]\\d{2}:\\d{2})"};
case"T":return{g:0,c:null,s:"[A-Z]{1,4}"};
case"Z":return{g:1,c:"z = results["+d+"] * 1;\nz = (-43200 <= z && z <= 50400)? z : null;\n",s:"([+-]?\\d{1,5})"};
case"c":var b=Date.formatCodeToRegex,g=[];
var a=[b("Y",1),b("m",2),b("d",3),b("h",4),b("i",5),b("s",6),b("P",7)];
for(var e=0,i=a.length;
e<i;
++e){g.push(a[e].c)
}return{g:1,c:g.join(""),s:a[0].s+"-"+a[1].s+"-"+a[2].s+"T"+a[3].s+":"+a[4].s+":"+a[5].s+a[6].s};
case"U":return{g:1,c:"u = parseInt(results["+d+"], 10);\n",s:"(-?\\d+)"};
default:return{g:0,c:null,s:Ext.escapeRe(c)}
}};
Date.prototype.getTimezone=function(){return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,"$1$2").replace(/[^A-Z]/g,"")
};
Date.prototype.getGMTOffset=function(a){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.abs(Math.floor(this.getTimezoneOffset()/60)),2,"0")+(a?":":"")+String.leftPad(this.getTimezoneOffset()%60,2,"0")
};
Date.prototype.getDayOfYear=function(){var a=0;
Date.daysInMonth[1]=this.isLeapYear()?29:28;
for(var b=0;
b<this.getMonth();
++b){a+=Date.daysInMonth[b]
}return a+this.getDate()-1
};
Date.prototype.getWeekOfYear=function(){var e=86400000;
var d=7*e;
var c=Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()+3)/e;
var a=Math.floor(c/7);
var b=new Date(a*d).getUTCFullYear();
return a-Math.floor(Date.UTC(b,0,7)/d)+1
};
Date.prototype.isLeapYear=function(){var a=this.getFullYear();
return !!((a&3)==0&&(a%100||(a%400==0&&a)))
};
Date.prototype.getFirstDayOfMonth=function(){var a=(this.getDay()-(this.getDate()-1))%7;
return(a<0)?(a+7):a
};
Date.prototype.getLastDayOfMonth=function(){var a=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;
return(a<0)?(a+7):a
};
Date.prototype.getFirstDateOfMonth=function(){return new Date(this.getFullYear(),this.getMonth(),1)
};
Date.prototype.getLastDateOfMonth=function(){return new Date(this.getFullYear(),this.getMonth(),this.getDaysInMonth())
};
Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;
return Date.daysInMonth[this.getMonth()]
};
Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";
case 2:case 22:return"nd";
case 3:case 23:return"rd";
default:return"th"
}};
Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
Date.getShortMonthName=function(a){return Date.monthNames[a].substring(0,3)
};
Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
Date.getShortDayName=function(a){return Date.dayNames[a].substring(0,3)
};
Date.y2kYear=50;
Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
Date.getMonthNumber=function(a){return Date.monthNumbers[a.substring(0,1).toUpperCase()+a.substring(1,3).toLowerCase()]
};
Date.prototype.clone=function(){return new Date(this.getTime())
};
Date.prototype.clearTime=function(a){if(a){return this.clone().clearTime()
}this.setHours(0);
this.setMinutes(0);
this.setSeconds(0);
this.setMilliseconds(0);
return this
};
if(Ext.isSafari){Date.brokenSetMonth=Date.prototype.setMonth;
Date.prototype.setMonth=function(a){if(a<=-1){var b=Math.ceil(-a);
var c=Math.ceil(b/12);
var d=(b%12)?12-b%12:0;
this.setFullYear(this.getFullYear()-c);
return Date.brokenSetMonth.call(this,d)
}else{return Date.brokenSetMonth.apply(this,arguments)
}}
}Date.MILLI="ms";
Date.SECOND="s";
Date.MINUTE="mi";
Date.HOUR="h";
Date.DAY="d";
Date.MONTH="mo";
Date.YEAR="y";
Date.prototype.add=function(d,c){var b=this.clone();
if(!d||c===0){return b
}switch(d.toLowerCase()){case Date.MILLI:b.setMilliseconds(this.getMilliseconds()+c);
break;
case Date.SECOND:b.setSeconds(this.getSeconds()+c);
break;
case Date.MINUTE:b.setMinutes(this.getMinutes()+c);
break;
case Date.HOUR:b.setHours(this.getHours()+c);
break;
case Date.DAY:b.setDate(this.getDate()+c);
break;
case Date.MONTH:var a=this.getDate();
if(a>28){a=Math.min(a,this.getFirstDateOfMonth().add("mo",c).getLastDateOfMonth().getDate())
}b.setDate(a);
b.setMonth(this.getMonth()+c);
break;
case Date.YEAR:b.setFullYear(this.getFullYear()+c);
break
}return b
};
Date.prototype.between=function(b,a){var c=this.getTime();
return b.getTime()<=c&&c<=a.getTime()
};
Ext.util.DelayedTask=function(d,e,a){var b=null,c,h;
var g=function(){var i=new Date().getTime();
if(i-h>=c){clearInterval(b);
b=null;
d.apply(e,a||[])
}};
this.delay=function(l,i,k,m){if(b&&l!=c){this.cancel()
}c=l;
h=new Date().getTime();
d=i||d;
e=k||e;
a=m||a;
if(!b){b=setInterval(g,c)
}};
this.cancel=function(){if(b){clearInterval(b);
b=null
}}
};
Ext.util.TaskRunner=function(k){k=k||10;
var i=[],d=[];
var c=0;
var h=false;
var a=function(){h=false;
clearInterval(c);
c=0
};
var g=function(){if(!h){h=true;
c=setInterval(e,k)
}};
var b=function(l){d.push(l);
if(l.onStop){l.onStop.apply(l.scope||l)
}};
var e=function(){if(d.length>0){for(var o=0,m=d.length;
o<m;
o++){i.remove(d[o])
}d=[];
if(i.length<1){a();
return
}}var q=new Date().getTime();
for(var o=0,m=i.length;
o<m;
++o){var p=i[o];
var n=q-p.taskRunTime;
if(p.interval<=n){var l=p.run.apply(p.scope||p,p.args||[++p.taskRunCount]);
p.taskRunTime=q;
if(l===false||p.taskRunCount===p.repeat){b(p);
return
}}if(p.duration&&p.duration<=(q-p.taskStartTime)){b(p)
}}};
this.start=function(l){i.push(l);
l.taskStartTime=new Date().getTime();
l.taskRunTime=0;
l.taskRunCount=0;
g();
return l
};
this.stop=function(l){b(l);
return l
};
this.stopAll=function(){a();
for(var l=0,m=i.length;
l<m;
l++){if(i[l].onStop){i[l].onStop()
}}i=[];
d=[]
}
};
Ext.TaskMgr=new Ext.util.TaskRunner();
Ext.util.MixedCollection=function(b,a){this.items=[];
this.map={};
this.keys=[];
this.length=0;
this.addEvents("clear","add","replace","remove","sort");
this.allowFunctions=b===true;
if(a){this.getKey=a
}Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection,Ext.util.Observable,{allowFunctions:false,add:function(c,b){if(arguments.length==1){b=arguments[0];
c=this.getKey(b)
}if(typeof c=="undefined"||c===null){this.length++;
this.items.push(b);
this.keys.push(null)
}else{var a=this.map[c];
if(a){return this.replace(c,b)
}this.length++;
this.items.push(b);
this.map[c]=b;
this.keys.push(c)
}this.fireEvent("add",this.length-1,b,c);
return b
},getKey:function(a){return a.id
},replace:function(c,b){if(arguments.length==1){b=arguments[0];
c=this.getKey(b)
}var a=this.item(c);
if(typeof c=="undefined"||c===null||typeof a=="undefined"){return this.add(c,b)
}var d=this.indexOfKey(c);
this.items[d]=b;
this.map[c]=b;
this.fireEvent("replace",c,a,b);
return b
},addAll:function(b){if(arguments.length>1||Ext.isArray(b)){var e=arguments.length>1?arguments:b;
for(var c=0,a=e.length;
c<a;
c++){this.add(e[c])
}}else{for(var d in b){if(this.allowFunctions||typeof b[d]!="function"){this.add(d,b[d])
}}}},each:function(b,c){var e=[].concat(this.items);
for(var d=0,a=e.length;
d<a;
d++){if(b.call(c||e[d],e[d],d,a)===false){break
}}},eachKey:function(b,c){for(var d=0,a=this.keys.length;
d<a;
d++){b.call(c||window,this.keys[d],this.items[d],d,a)
}},find:function(b,c){for(var d=0,a=this.items.length;
d<a;
d++){if(b.call(c||window,this.items[d],this.keys[d])){return this.items[d]
}}return null
},insert:function(a,c,b){if(arguments.length==2){b=arguments[1];
c=this.getKey(b)
}if(a>=this.length){return this.add(c,b)
}this.length++;
this.items.splice(a,0,b);
if(typeof c!="undefined"&&c!=null){this.map[c]=b
}this.keys.splice(a,0,c);
this.fireEvent("add",a,b,c);
return b
},remove:function(a){return this.removeAt(this.indexOf(a))
},removeAt:function(a){if(a<this.length&&a>=0){this.length--;
var b=this.items[a];
this.items.splice(a,1);
var c=this.keys[a];
if(typeof c!="undefined"){delete this.map[c]
}this.keys.splice(a,1);
this.fireEvent("remove",b,c);
return b
}return false
},removeKey:function(a){return this.removeAt(this.indexOfKey(a))
},getCount:function(){return this.length
},indexOf:function(a){return this.items.indexOf(a)
},indexOfKey:function(a){return this.keys.indexOf(a)
},item:function(a){var b=typeof this.map[a]!="undefined"?this.map[a]:this.items[a];
return typeof b!="function"||this.allowFunctions?b:null
},itemAt:function(a){return this.items[a]
},key:function(a){return this.map[a]
},contains:function(a){return this.indexOf(a)!=-1
},containsKey:function(a){return typeof this.map[a]!="undefined"
},clear:function(){this.length=0;
this.items=[];
this.keys=[];
this.map={};
this.fireEvent("clear")
},first:function(){return this.items[0]
},last:function(){return this.items[this.length-1]
},_sort:function(e,d,g){var b=String(d).toUpperCase()=="DESC"?-1:1;
g=g||function(l,m){return l-m
};
var h=[],c=this.keys,i=this.items;
for(var a=0,k=i.length;
a<k;
a++){h[h.length]={key:c[a],value:i[a],index:a}
}h.sort(function(m,n){var l=g(m[e],n[e])*b;
if(l==0){l=(m.index<n.index?-1:1)
}return l
});
for(var a=0,k=h.length;
a<k;
a++){i[a]=h[a].value;
c[a]=h[a].key
}this.fireEvent("sort",this)
},sort:function(a,b){this._sort("value",a,b)
},keySort:function(a,b){this._sort("key",a,b||function(c,d){return String(c).toUpperCase()-String(d).toUpperCase()
})
},getRange:function(b,a){var e=this.items;
if(e.length<1){return[]
}b=b||0;
a=Math.min(typeof a=="undefined"?this.length-1:a,this.length-1);
var c=[];
if(b<=a){for(var d=b;
d<=a;
d++){c[c.length]=e[d]
}}else{for(var d=b;
d>=a;
d--){c[c.length]=e[d]
}}return c
},filter:function(c,d,b,a){if(Ext.isEmpty(d,false)){return this.clone()
}d=this.createValueMatcher(d,b,a);
return this.filterBy(function(e){return e&&d.test(e[c])
})
},filterBy:function(c,d){var b=new Ext.util.MixedCollection();
b.getKey=this.getKey;
var h=this.keys,e=this.items;
for(var g=0,a=e.length;
g<a;
g++){if(c.call(d||this,e[g],h[g])){b.add(h[g],e[g])
}}return b
},findIndex:function(d,e,b,c,a){if(Ext.isEmpty(e,false)){return -1
}e=this.createValueMatcher(e,c,a);
return this.findIndexBy(function(g){return g&&e.test(g[d])
},null,b)
},findIndexBy:function(c,d,b){var h=this.keys,e=this.items;
for(var g=(b||0),a=e.length;
g<a;
g++){if(c.call(d||this,e[g],h[g])){return g
}}if(typeof b=="number"&&b>0){for(var g=0;
g<b;
g++){if(c.call(d||this,e[g],h[g])){return g
}}}return -1
},createValueMatcher:function(c,b,a){if(!c.exec){c=String(c);
c=new RegExp((b===true?"":"^")+Ext.escapeRe(c),a?"":"i")
}return c
},clone:function(){var b=new Ext.util.MixedCollection();
var e=this.keys,c=this.items;
for(var d=0,a=c.length;
d<a;
d++){b.add(e[d],c[d])
}b.getKey=this.getKey;
return b
}});
Ext.util.MixedCollection.prototype.get=Ext.util.MixedCollection.prototype.item;
Ext.util.JSON=new (function(){var useHasOwn={}.hasOwnProperty?true:false;
var pad=function(n){return n<10?"0"+n:n
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
var encodeString=function(s){if(/["\\\x00-\x1f]/.test(s)){return'"'+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];
if(c){return c
}c=b.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"'
}return'"'+s+'"'
};
var encodeArray=function(o){var a=["["],b,i,l=o.length,v;
for(i=0;
i<l;
i+=1){v=o[i];
switch(typeof v){case"undefined":case"function":case"unknown":break;
default:if(b){a.push(",")
}a.push(v===null?"null":Ext.util.JSON.encode(v));
b=true
}}a.push("]");
return a.join("")
};
var encodeDate=function(o){return'"'+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+'"'
};
this.encode=function(o){if(typeof o=="undefined"||o===null){return"null"
}else{if(Ext.isArray(o)){return encodeArray(o)
}else{if(Ext.isDate(o)){return encodeDate(o)
}else{if(typeof o=="string"){return encodeString(o)
}else{if(typeof o=="number"){return isFinite(o)?String(o):"null"
}else{if(typeof o=="boolean"){return String(o)
}else{var a=["{"],b,i,v;
for(i in o){if(!useHasOwn||o.hasOwnProperty(i)){v=o[i];
switch(typeof v){case"undefined":case"function":case"unknown":break;
default:if(b){a.push(",")
}a.push(this.encode(i),":",v===null?"null":this.encode(v));
b=true
}}}a.push("}");
return a.join("")
}}}}}}};
this.decode=function(json){return eval("("+json+")")
}
})();
Ext.encode=Ext.util.JSON.encode;
Ext.decode=Ext.util.JSON.decode;
Ext.util.Format=function(){var trimRe=/^\s+|\s+$/g;
return{ellipsis:function(value,len){if(value&&value.length>len){return value.substr(0,len-3)+"..."
}return value
},undef:function(value){return value!==undefined?value:""
},defaultValue:function(value,defaultValue){return value!==undefined&&value!==""?value:defaultValue
},htmlEncode:function(value){return !value?value:String(value).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
},htmlDecode:function(value){return !value?value:String(value).replace(/&amp;/g,"&").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"')
},trim:function(value){return String(value).replace(trimRe,"")
},substr:function(value,start,length){return String(value).substr(start,length)
},lowercase:function(value){return String(value).toLowerCase()
},uppercase:function(value){return String(value).toUpperCase()
},capitalize:function(value){return !value?value:value.charAt(0).toUpperCase()+value.substr(1).toLowerCase()
},call:function(value,fn){if(arguments.length>2){var args=Array.prototype.slice.call(arguments,2);
args.unshift(value);
return eval(fn).apply(window,args)
}else{return eval(fn).call(window,value)
}},usMoney:function(v){v=(Math.round((v-0)*100))/100;
v=(v==Math.floor(v))?v+".00":((v*10==Math.floor(v*10))?v+"0":v);
v=String(v);
var ps=v.split(".");
var whole=ps[0];
var sub=ps[1]?"."+ps[1]:".00";
var r=/(\d+)(\d{3})/;
while(r.test(whole)){whole=whole.replace(r,"$1,$2")
}v=whole+sub;
if(v.charAt(0)=="-"){return"-$"+v.substr(1)
}return"$"+v
},date:function(v,format){if(!v){return""
}if(!Ext.isDate(v)){v=new Date(Date.parse(v))
}return v.dateFormat(format||"m/d/Y")
},dateRenderer:function(format){return function(v){return Ext.util.Format.date(v,format)
}
},stripTagsRE:/<\/?[^>]+>/gi,stripTags:function(v){return !v?v:String(v).replace(this.stripTagsRE,"")
},stripScriptsRe:/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,stripScripts:function(v){return !v?v:String(v).replace(this.stripScriptsRe,"")
},fileSize:function(size){if(size<1024){return size+" bytes"
}else{if(size<1048576){return(Math.round(((size*10)/1024))/10)+" KB"
}else{return(Math.round(((size*10)/1048576))/10)+" MB"
}}},math:function(){var fns={};
return function(v,a){if(!fns[a]){fns[a]=new Function("v","return v "+a+";")
}return fns[a](v)
}
}()}
}();
Ext.XTemplate=function(){Ext.XTemplate.superclass.constructor.apply(this,arguments);
var e=this.html;
e=["<tpl>",e,"</tpl>"].join("");
var g=/<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/;
var h=/^<tpl\b[^>]*?for="(.*?)"/;
var k=/^<tpl\b[^>]*?if="(.*?)"/;
var m=/^<tpl\b[^>]*?exec="(.*?)"/;
var b,c=0;
var p=[];
while(b=e.match(g)){var i=b[0].match(h);
var l=b[0].match(k);
var n=b[0].match(m);
var r=null,o=null,a=null;
var d=i&&i[1]?i[1]:"";
if(l){r=l&&l[1]?l[1]:null;
if(r){o=new Function("values","parent","xindex","xcount","with(values){ return "+(Ext.util.Format.htmlDecode(r))+"; }")
}}if(n){r=n&&n[1]?n[1]:null;
if(r){a=new Function("values","parent","xindex","xcount","with(values){ "+(Ext.util.Format.htmlDecode(r))+"; }")
}}if(d){switch(d){case".":d=new Function("values","parent","with(values){ return values; }");
break;
case"..":d=new Function("values","parent","with(values){ return parent; }");
break;
default:d=new Function("values","parent","with(values){ return "+d+"; }")
}}p.push({id:c,target:d,exec:a,test:o,body:b[1]||""});
e=e.replace(b[0],"{xtpl"+c+"}");
++c
}for(var q=p.length-1;
q>=0;
--q){this.compileTpl(p[q])
}this.master=p[p.length-1];
this.tpls=p
};
Ext.extend(Ext.XTemplate,Ext.Template,{re:/\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,codeRe:/\{\[((?:\\\]|.|\n)*?)\]\}/g,applySubTemplate:function(d,h,i,a,b){var e=this.tpls[d];
if(e.test&&!e.test.call(this,h,i,a,b)){return""
}if(e.exec&&e.exec.call(this,h,i,a,b)){return""
}var g=e.target?e.target.call(this,h,i):h;
i=e.target?h:i;
if(e.target&&Ext.isArray(g)){var c=[];
for(var l=0,k=g.length;
l<k;
l++){c[c.length]=e.compiled.call(this,g[l],i,l+1,k)
}return c.join("")
}return e.compiled.call(this,g,i,a,b)
},compileTpl:function(tpl){var fm=Ext.util.Format;
var useF=this.disableFormats!==true;
var sep=Ext.isGecko?"+":",";
var fn=function(m,name,format,args,math){if(name.substr(0,4)=="xtpl"){return"'"+sep+"this.applySubTemplate("+name.substr(4)+", values, parent, xindex, xcount)"+sep+"'"
}var v;
if(name==="."){v="values"
}else{if(name==="#"){v="xindex"
}else{if(name.indexOf(".")!=-1){v=name
}else{v="values['"+name+"']"
}}}if(math){v="("+v+math+")"
}if(format&&useF){args=args?","+args:"";
if(format.substr(0,5)!="this."){format="fm."+format+"("
}else{format='this.call("'+format.substr(5)+'", ';
args=", values"
}}else{args="";
format="("+v+" === undefined ? '' : "
}return"'"+sep+format+v+args+")"+sep+"'"
};
var codeFn=function(m,code){return"'"+sep+"("+code+")"+sep+"'"
};
var body;
if(Ext.isGecko){body="tpl.compiled = function(values, parent, xindex, xcount){ return '"+tpl.body.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn)+"';};"
}else{body=["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
body.push(tpl.body.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn));
body.push("'].join('');};");
body=body.join("")
}eval(body);
return this
},apply:function(a){return this.master.compiled.call(this,a,{},1,1)
},applyTemplate:function(a){return this.master.compiled.call(this,a,{},1,1)
},compile:function(){return this
}});
Ext.XTemplate.from=function(a){a=Ext.getDom(a);
return new Ext.XTemplate(a.value||a.innerHTML)
};
Ext.util.CSS=function(){var b=null;
var c=document;
var d=/(-[a-z])/gi;
var a=function(g,e){return e.charAt(1).toUpperCase()
};
return{createStyleSheet:function(i,e){var k;
var l=c.getElementsByTagName("head")[0];
var g=c.createElement("style");
g.setAttribute("type","text/css");
if(e){g.setAttribute("id",e)
}if(Ext.isIE){l.appendChild(g);
k=g.styleSheet;
k.cssText=i
}else{try{g.appendChild(c.createTextNode(i))
}catch(h){g.cssText=i
}l.appendChild(g);
k=g.styleSheet?g.styleSheet:(g.sheet||c.styleSheets[c.styleSheets.length-1])
}this.cacheStyleSheet(k);
return k
},removeStyleSheet:function(e){var g=c.getElementById(e);
if(g){g.parentNode.removeChild(g)
}},swapStyleSheet:function(e,h){this.removeStyleSheet(e);
var g=c.createElement("link");
g.setAttribute("rel","stylesheet");
g.setAttribute("type","text/css");
g.setAttribute("id",e);
g.setAttribute("href",h);
c.getElementsByTagName("head")[0].appendChild(g)
},refreshCache:function(){return this.getRules(true)
},cacheStyleSheet:function(h){if(!b){b={}
}try{var e=h.cssRules||h.rules;
for(var i=e.length-1;
i>=0;
--i){b[e[i].selectorText]=e[i]
}}catch(g){}},getRules:function(i){if(b==null||i){b={};
var g=c.styleSheets;
for(var h=0,k=g.length;
h<k;
h++){try{this.cacheStyleSheet(g[h])
}catch(e){}}}return b
},getRule:function(i,g){var h=this.getRules(g);
if(!Ext.isArray(i)){return h[i]
}for(var e=0;
e<i.length;
e++){if(h[i[e]]){return h[i[e]]
}}return null
},updateRule:function(k,g,h){if(!Ext.isArray(k)){var e=this.getRule(k);
if(e){e.style[g.replace(d,a)]=h;
return true
}}else{for(var i=0;
i<k.length;
i++){if(this.updateRule(k[i],g,h)){return true
}}}return false
}}
}();
Ext.util.ClickRepeater=function(b,a){this.el=Ext.get(b);
this.el.unselectable();
Ext.apply(this,a);
this.addEvents("mousedown","click","mouseup");
this.el.on("mousedown",this.handleMouseDown,this);
if(this.preventDefault||this.stopDefault){this.el.on("click",function(c){if(this.preventDefault){c.preventDefault()
}if(this.stopDefault){c.stopEvent()
}},this)
}if(this.handler){this.on("click",this.handler,this.scope||this)
}Ext.util.ClickRepeater.superclass.constructor.call(this)
};
Ext.extend(Ext.util.ClickRepeater,Ext.util.Observable,{interval:20,delay:250,preventDefault:true,stopDefault:false,timer:0,handleMouseDown:function(){clearTimeout(this.timer);
this.el.blur();
if(this.pressClass){this.el.addClass(this.pressClass)
}this.mousedownTime=new Date();
Ext.getDoc().on("mouseup",this.handleMouseUp,this);
this.el.on("mouseout",this.handleMouseOut,this);
this.fireEvent("mousedown",this);
this.fireEvent("click",this);
if(this.accelerate){this.delay=400
}this.timer=this.click.defer(this.delay||this.interval,this)
},click:function(){this.fireEvent("click",this);
this.timer=this.click.defer(this.accelerate?this.easeOutExpo(this.mousedownTime.getElapsed(),400,-390,12000):this.interval,this)
},easeOutExpo:function(d,a,b,c){return(d==c)?a+b:b*(-Math.pow(2,-10*d/c)+1)+a
},handleMouseOut:function(){clearTimeout(this.timer);
if(this.pressClass){this.el.removeClass(this.pressClass)
}this.el.on("mouseover",this.handleMouseReturn,this)
},handleMouseReturn:function(){this.el.un("mouseover",this.handleMouseReturn);
if(this.pressClass){this.el.addClass(this.pressClass)
}this.click()
},handleMouseUp:function(){clearTimeout(this.timer);
this.el.un("mouseover",this.handleMouseReturn);
this.el.un("mouseout",this.handleMouseOut);
Ext.getDoc().un("mouseup",this.handleMouseUp);
this.el.removeClass(this.pressClass);
this.fireEvent("mouseup",this)
}});
Ext.KeyNav=function(b,a){this.el=Ext.get(b);
Ext.apply(this,a);
if(!this.disabled){this.disabled=true;
this.enable()
}};
Ext.KeyNav.prototype={disabled:false,defaultEventAction:"stopEvent",forceKeyDown:false,prepareEvent:function(b){var a=b.getKey();
var c=this.keyToHandler[a];
if(Ext.isSafari&&c&&a>=37&&a<=40){b.stopEvent()
}},relay:function(b){var a=b.getKey();
var c=this.keyToHandler[a];
if(c&&this[c]){if(this.doRelay(b,this[c],c)!==true){b[this.defaultEventAction]()
}}},doRelay:function(b,c,a){return c.call(this.scope||this,b)
},enter:false,left:false,right:false,up:false,down:false,tab:false,esc:false,pageUp:false,pageDown:false,del:false,home:false,end:false,keyToHandler:{37:"left",39:"right",38:"up",40:"down",33:"pageUp",34:"pageDown",46:"del",36:"home",35:"end",13:"enter",27:"esc",9:"tab"},enable:function(){if(this.disabled){if(this.forceKeyDown||Ext.isIE||Ext.isAir){this.el.on("keydown",this.relay,this)
}else{this.el.on("keydown",this.prepareEvent,this);
this.el.on("keypress",this.relay,this)
}this.disabled=false
}},disable:function(){if(!this.disabled){if(this.forceKeyDown||Ext.isIE||Ext.isAir){this.el.un("keydown",this.relay)
}else{this.el.un("keydown",this.prepareEvent);
this.el.un("keypress",this.relay)
}this.disabled=true
}}};
Ext.KeyMap=function(b,c,a){this.el=Ext.get(b);
this.eventName=a||"keydown";
this.bindings=[];
if(c){this.addBinding(c)
}this.enable()
};
Ext.KeyMap.prototype={stopEvent:false,addBinding:function(a){if(Ext.isArray(a)){for(var o=0,m=a.length;
o<m;
o++){this.addBinding(a[o])
}return
}var e=a.key,b=a.shift,d=a.ctrl,n=a.alt,k=a.fn||a.handler,g=a.scope;
if(typeof e=="string"){var i=[];
var l=e.toUpperCase();
for(var p=0,m=l.length;
p<m;
p++){i.push(l.charCodeAt(p))
}e=i
}var c=Ext.isArray(e);
var h=function(q){if((!b||q.shiftKey)&&(!d||q.ctrlKey)&&(!n||q.altKey)){var s=q.getKey();
if(c){for(var r=0,t=e.length;
r<t;
r++){if(e[r]==s){if(this.stopEvent){q.stopEvent()
}k.call(g||window,s,q);
return
}}}else{if(s==e){if(this.stopEvent){q.stopEvent()
}k.call(g||window,s,q)
}}}};
this.bindings.push(h)
},on:function(h,e,g){var b,a,d,c;
if(typeof h=="object"&&!Ext.isArray(h)){b=h.key;
a=h.shift;
d=h.ctrl;
c=h.alt
}else{b=h
}this.addBinding({key:b,shift:a,ctrl:d,alt:c,fn:e,scope:g})
},handleKeyDown:function(b){if(this.enabled){var d=this.bindings;
for(var c=0,a=d.length;
c<a;
c++){d[c].call(this,b)
}}},isEnabled:function(){return this.enabled
},enable:function(){if(!this.enabled){this.el.on(this.eventName,this.handleKeyDown,this);
this.enabled=true
}},disable:function(){if(this.enabled){this.el.removeListener(this.eventName,this.handleKeyDown,this);
this.enabled=false
}}};
Ext.util.TextMetrics=function(){var a;
return{measure:function(d,c,b){if(!a){a=Ext.util.TextMetrics.Instance(d,b)
}a.bind(d);
a.setFixedWidth(b||"auto");
return a.getSize(c)
},createInstance:function(c,b){return Ext.util.TextMetrics.Instance(c,b)
}}
}();
Ext.util.TextMetrics.Instance=function(d,b){var c=new Ext.Element(document.createElement("div"));
document.body.appendChild(c.dom);
c.position("absolute");
c.setLeftTop(-1000,-1000);
c.hide();
if(b){c.setWidth(b)
}var a={getSize:function(e){c.update(e);
var g=c.getSize();
c.update("");
return g
},bind:function(e){c.setStyle(Ext.fly(e).getStyles("font-size","font-style","font-weight","font-family","line-height"))
},setFixedWidth:function(e){c.setWidth(e)
},getWidth:function(e){c.dom.style.width="auto";
return this.getSize(e).width
},getHeight:function(e){return this.getSize(e).height
}};
a.bind(d);
return a
};
Ext.Element.measureText=Ext.util.TextMetrics.measure;
(function(){var a=Ext.EventManager;
var b=Ext.lib.Dom;
Ext.dd.DragDrop=function(c,e,d){if(c){this.init(c,e,d)
}};
Ext.dd.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true
},unlock:function(){this.locked=false
},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(d,c){},startDrag:function(d,c){},b4Drag:function(c){},onDrag:function(c){},onDragEnter:function(d,c){},b4DragOver:function(c){},onDragOver:function(d,c){},b4DragOut:function(c){},onDragOut:function(d,c){},b4DragDrop:function(c){},onDragDrop:function(d,c){},onInvalidDrop:function(c){},b4EndDrag:function(c){},endDrag:function(c){},b4MouseDown:function(c){},onMouseDown:function(c){},onMouseUp:function(c){},onAvailable:function(){},defaultPadding:{left:0,right:0,top:0,bottom:0},constrainTo:function(l,n,e){if(typeof n=="number"){n={left:n,right:n,top:n,bottom:n}
}n=n||this.defaultPadding;
var i=Ext.get(this.getEl()).getBox();
var d=Ext.get(l);
var g=d.getScroll();
var k,c=d.dom;
if(c==document.body){k={x:g.left,y:g.top,width:Ext.lib.Dom.getViewWidth(),height:Ext.lib.Dom.getViewHeight()}
}else{var h=d.getXY();
k={x:h[0]+g.left,y:h[1]+g.top,width:c.clientWidth,height:c.clientHeight}
}var m=i.y-k.y;
var o=i.x-k.x;
this.resetConstraints();
this.setXConstraint(o-(n.left||0),k.width-o-i.width-(n.right||0),this.xTickSize);
this.setYConstraint(m-(n.top||0),k.height-m-i.height-(n.bottom||0),this.yTickSize)
},getEl:function(){if(!this._domRef){this._domRef=Ext.getDom(this.id)
}return this._domRef
},getDragEl:function(){return Ext.getDom(this.dragElId)
},init:function(c,e,d){this.initTarget(c,e,d);
a.on(this.id,"mousedown",this.handleMouseDown,this)
},initTarget:function(c,e,d){this.config=d||{};
this.DDM=Ext.dd.DDM;
this.groups={};
if(typeof c!=="string"){c=Ext.id(c)
}this.id=c;
this.addToGroup((e)?e:"default");
this.handleElId=c;
this.setDragElId(c);
this.invalidHandleTypes={A:"A"};
this.invalidHandleIds={};
this.invalidHandleClasses=[];
this.applyConfig();
this.handleOnAvailable()
},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];
this.isTarget=(this.config.isTarget!==false);
this.maintainOffset=(this.config.maintainOffset);
this.primaryButtonOnly=(this.config.primaryButtonOnly!==false)
},handleOnAvailable:function(){this.available=true;
this.resetConstraints();
this.onAvailable()
},setPadding:function(d,g,c,e){if(!g&&0!==g){this.padding=[d,d,d,d]
}else{if(!c&&0!==c){this.padding=[d,g,d,g]
}else{this.padding=[d,g,c,e]
}}},setInitPosition:function(e,g){var d=this.getEl();
if(!this.DDM.verifyEl(d)){return
}var h=e||0;
var i=g||0;
var c=b.getXY(d);
this.initPageX=c[0]-h;
this.initPageY=c[1]-i;
this.lastPageX=c[0];
this.lastPageY=c[1];
this.setStartPosition(c)
},setStartPosition:function(c){var d=c||b.getXY(this.getEl());
this.deltaSetXY=null;
this.startPageX=d[0];
this.startPageY=d[1]
},addToGroup:function(c){this.groups[c]=true;
this.DDM.regDragDrop(this,c)
},removeFromGroup:function(c){if(this.groups[c]){delete this.groups[c]
}this.DDM.removeDDFromGroup(this,c)
},setDragElId:function(c){this.dragElId=c
},setHandleElId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}this.handleElId=c;
this.DDM.regHandle(this.id,c)
},setOuterHandleElId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}a.on(c,"mousedown",this.handleMouseDown,this);
this.setHandleElId(c);
this.hasOuterHandles=true
},unreg:function(){a.un(this.id,"mousedown",this.handleMouseDown);
this._domRef=null;
this.DDM._remove(this)
},destroy:function(){this.unreg()
},isLocked:function(){return(this.DDM.isLocked()||this.locked)
},handleMouseDown:function(c,d){if(this.primaryButtonOnly&&c.button!=0){return
}if(this.isLocked()){return
}this.DDM.refreshCache(this.groups);
var e=new Ext.lib.Point(Ext.lib.Event.getPageX(c),Ext.lib.Event.getPageY(c));
if(!this.hasOuterHandles&&!this.DDM.isOverTarget(e,this)){}else{if(this.clickValidator(c)){this.setStartPosition();
this.b4MouseDown(c);
this.onMouseDown(c);
this.DDM.handleMouseDown(c,this);
this.DDM.stopEvent(c)
}else{}}},clickValidator:function(c){var d=c.getTarget();
return(this.isValidHandleChild(d)&&(this.id==this.handleElId||this.DDM.handleWasClicked(d,this.id)))
},addInvalidHandleType:function(d){var c=d.toUpperCase();
this.invalidHandleTypes[c]=c
},addInvalidHandleId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}this.invalidHandleIds[c]=c
},addInvalidHandleClass:function(c){this.invalidHandleClasses.push(c)
},removeInvalidHandleType:function(d){var c=d.toUpperCase();
delete this.invalidHandleTypes[c]
},removeInvalidHandleId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}delete this.invalidHandleIds[c]
},removeInvalidHandleClass:function(d){for(var c=0,e=this.invalidHandleClasses.length;
c<e;
++c){if(this.invalidHandleClasses[c]==d){delete this.invalidHandleClasses[c]
}}},isValidHandleChild:function(e){var g=true;
var c;
try{c=e.nodeName.toUpperCase()
}catch(d){c=e.nodeName
}g=g&&!this.invalidHandleTypes[c];
g=g&&!this.invalidHandleIds[e.id];
for(var h=0,i=this.invalidHandleClasses.length;
g&&h<i;
++h){g=!b.hasClass(e,this.invalidHandleClasses[h])
}return g
},setXTicks:function(c,g){this.xTicks=[];
this.xTickSize=g;
var d={};
for(var e=this.initPageX;
e>=this.minX;
e=e-g){if(!d[e]){this.xTicks[this.xTicks.length]=e;
d[e]=true
}}for(e=this.initPageX;
e<=this.maxX;
e=e+g){if(!d[e]){this.xTicks[this.xTicks.length]=e;
d[e]=true
}}this.xTicks.sort(this.DDM.numericSort)
},setYTicks:function(c,g){this.yTicks=[];
this.yTickSize=g;
var d={};
for(var e=this.initPageY;
e>=this.minY;
e=e-g){if(!d[e]){this.yTicks[this.yTicks.length]=e;
d[e]=true
}}for(e=this.initPageY;
e<=this.maxY;
e=e+g){if(!d[e]){this.yTicks[this.yTicks.length]=e;
d[e]=true
}}this.yTicks.sort(this.DDM.numericSort)
},setXConstraint:function(c,d,e){this.leftConstraint=c;
this.rightConstraint=d;
this.minX=this.initPageX-c;
this.maxX=this.initPageX+d;
if(e){this.setXTicks(this.initPageX,e)
}this.constrainX=true
},clearConstraints:function(){this.constrainX=false;
this.constrainY=false;
this.clearTicks()
},clearTicks:function(){this.xTicks=null;
this.yTicks=null;
this.xTickSize=0;
this.yTickSize=0
},setYConstraint:function(e,c,d){this.topConstraint=e;
this.bottomConstraint=c;
this.minY=this.initPageY-e;
this.maxY=this.initPageY+c;
if(d){this.setYTicks(this.initPageY,d)
}this.constrainY=true
},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var c=(this.maintainOffset)?this.lastPageX-this.initPageX:0;
var d=(this.maintainOffset)?this.lastPageY-this.initPageY:0;
this.setInitPosition(c,d)
}else{this.setInitPosition()
}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize)
}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize)
}},getTick:function(c,g){if(!g){return c
}else{if(g[0]>=c){return g[0]
}else{for(var i=0,k=g.length;
i<k;
++i){var h=i+1;
if(g[h]&&g[h]>=c){var d=c-g[i];
var e=g[h]-c;
return(e>d)?g[i]:g[h]
}}return g[g.length-1]
}}},toString:function(){return("DragDrop "+this.id)
}}
})();
if(!Ext.dd.DragDropMgr){Ext.dd.DragDropMgr=function(){var a=Ext.EventManager;
return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initalized:false,locked:false,init:function(){this.initialized=true
},POINT:0,INTERSECT:1,mode:0,_execOnAll:function(d,e){for(var c in this.ids){for(var g in this.ids[c]){var b=this.ids[c][g];
if(!this.isTypeOfDD(b)){continue
}b[d].apply(b,e)
}}},_onLoad:function(){this.init();
a.on(document,"mouseup",this.handleMouseUp,this,true);
a.on(document,"mousemove",this.handleMouseMove,this,true);
a.on(window,"unload",this._onUnload,this,true);
a.on(window,"resize",this._onResize,this,true)
},_onResize:function(b){this._execOnAll("resetConstraints",[])
},lock:function(){this.locked=true
},unlock:function(){this.locked=false
},isLocked:function(){return this.locked
},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:350,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(b,c){if(!this.initialized){this.init()
}if(!this.ids[c]){this.ids[c]={}
}this.ids[c][b.id]=b
},removeDDFromGroup:function(b,d){if(!this.ids[d]){this.ids[d]={}
}var c=this.ids[d];
if(c&&c[b.id]){delete c[b.id]
}},_remove:function(b){for(var c in b.groups){if(c&&this.ids[c][b.id]){delete this.ids[c][b.id]
}}delete this.handleIds[b.id]
},regHandle:function(b,c){if(!this.handleIds[b]){this.handleIds[b]={}
}this.handleIds[b][c]=c
},isDragDrop:function(b){return(this.getDDById(b))?true:false
},getRelated:function(b,e){var c=[];
for(var d in b.groups){for(j in this.ids[d]){var g=this.ids[d][j];
if(!this.isTypeOfDD(g)){continue
}if(!e||g.isTarget){c[c.length]=g
}}}return c
},isLegalTarget:function(b,c){var e=this.getRelated(b,true);
for(var d=0,g=e.length;
d<g;
++d){if(e[d].id==c.id){return true
}}return false
},isTypeOfDD:function(b){return(b&&b.__ygDragDrop)
},isHandle:function(b,c){return(this.handleIds[b]&&this.handleIds[b][c])
},getDDById:function(b){for(var c in this.ids){if(this.ids[c][b]){return this.ids[c][b]
}}return null
},handleMouseDown:function(b,c){if(Ext.QuickTips){Ext.QuickTips.disable()
}this.currentTarget=b.getTarget();
this.dragCurrent=c;
var d=c.getEl();
this.startX=b.getPageX();
this.startY=b.getPageY();
this.deltaX=this.startX-d.offsetLeft;
this.deltaY=this.startY-d.offsetTop;
this.dragThreshMet=false;
this.clickTimeout=setTimeout(function(){var e=Ext.dd.DDM;
e.startDrag(e.startX,e.startY)
},this.clickTimeThresh)
},startDrag:function(c,b){clearTimeout(this.clickTimeout);
if(this.dragCurrent){this.dragCurrent.b4StartDrag(c,b);
this.dragCurrent.startDrag(c,b)
}this.dragThreshMet=true
},handleMouseUp:function(b){if(Ext.QuickTips){Ext.QuickTips.enable()
}if(!this.dragCurrent){return
}clearTimeout(this.clickTimeout);
if(this.dragThreshMet){this.fireEvents(b,true)
}else{}this.stopDrag(b);
this.stopEvent(b)
},stopEvent:function(b){if(this.stopPropagation){b.stopPropagation()
}if(this.preventDefault){b.preventDefault()
}},stopDrag:function(b){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(b);
this.dragCurrent.endDrag(b)
}this.dragCurrent.onMouseUp(b)
}this.dragCurrent=null;
this.dragOvers={}
},handleMouseMove:function(b){if(!this.dragCurrent){return true
}if(Ext.isIE&&(b.button!==0&&b.button!==1&&b.button!==2)){this.stopEvent(b);
return this.handleMouseUp(b)
}if(!this.dragThreshMet){var c=Math.abs(this.startX-b.getPageX());
var d=Math.abs(this.startY-b.getPageY());
if(c>this.clickPixelThresh||d>this.clickPixelThresh){this.startDrag(this.startX,this.startY)
}}if(this.dragThreshMet){this.dragCurrent.b4Drag(b);
this.dragCurrent.onDrag(b);
if(!this.dragCurrent.moveOnly){this.fireEvents(b,false)
}}this.stopEvent(b);
return true
},fireEvents:function(k,i){var g=this.dragCurrent;
if(!g||g.isLocked()){return
}var e=k.getPoint();
var d=[];
var q=[];
var m=[];
var o=[];
var b=[];
for(var p in this.dragOvers){var c=this.dragOvers[p];
if(!this.isTypeOfDD(c)){continue
}if(!this.isOverTarget(e,c,this.mode)){q.push(c)
}d[p]=true;
delete this.dragOvers[p]
}for(var h in g.groups){if("string"!=typeof h){continue
}for(p in this.ids[h]){var n=this.ids[h][p];
if(!this.isTypeOfDD(n)){continue
}if(n.isTarget&&!n.isLocked()&&n!=g){if(this.isOverTarget(e,n,this.mode)){if(i){o.push(n)
}else{if(!d[n.id]){b.push(n)
}else{m.push(n)
}this.dragOvers[n.id]=n
}}}}}if(this.mode){if(q.length){g.b4DragOut(k,q);
g.onDragOut(k,q)
}if(b.length){g.onDragEnter(k,b)
}if(m.length){g.b4DragOver(k,m);
g.onDragOver(k,m)
}if(o.length){g.b4DragDrop(k,o);
g.onDragDrop(k,o)
}}else{var l=0;
for(p=0,l=q.length;
p<l;
++p){g.b4DragOut(k,q[p].id);
g.onDragOut(k,q[p].id)
}for(p=0,l=b.length;
p<l;
++p){g.onDragEnter(k,b[p].id)
}for(p=0,l=m.length;
p<l;
++p){g.b4DragOver(k,m[p].id);
g.onDragOver(k,m[p].id)
}for(p=0,l=o.length;
p<l;
++p){g.b4DragDrop(k,o[p].id);
g.onDragDrop(k,o[p].id)
}}if(i&&!o.length){g.onInvalidDrop(k)
}},getBestMatch:function(d){var b=null;
var e=d.length;
if(e==1){b=d[0]
}else{for(var c=0;
c<e;
++c){var g=d[c];
if(g.cursorIsOver){b=g;
break
}else{if(!b||b.overlap.getArea()<g.overlap.getArea()){b=g
}}}}return b
},refreshCache:function(e){for(var g in e){if("string"!=typeof g){continue
}for(var d in this.ids[g]){var c=this.ids[g][d];
if(this.isTypeOfDD(c)){var b=this.getLocation(c);
if(b){this.locationCache[c.id]=b
}else{delete this.locationCache[c.id]
}}}}},verifyEl:function(c){if(c){var d;
if(Ext.isIE){try{d=c.offsetParent
}catch(b){}}else{d=c.offsetParent
}if(d){return true
}}return false
},getLocation:function(m){if(!this.isTypeOfDD(m)){return null
}var o=m.getEl(),i,b,c,g,h,e,d,k,n;
try{i=Ext.lib.Dom.getXY(o)
}catch(l){}if(!i){return null
}b=i[0];
c=b+o.offsetWidth;
g=i[1];
h=g+o.offsetHeight;
e=g-m.padding[0];
d=c+m.padding[1];
k=h+m.padding[2];
n=b-m.padding[3];
return new Ext.lib.Region(e,d,k,n)
},isOverTarget:function(e,d,b){var k=this.locationCache[d.id];
if(!k||!this.useCache){k=this.getLocation(d);
this.locationCache[d.id]=k
}if(!k){return false
}d.cursorIsOver=k.contains(e);
var g=this.dragCurrent;
if(!g||!g.getTargetCoord||(!b&&!g.constrainX&&!g.constrainY)){return d.cursorIsOver
}d.overlap=null;
var i=g.getTargetCoord(e.x,e.y);
var c=g.getDragEl();
var l=new Ext.lib.Region(i.y,i.x+c.offsetWidth,i.y+c.offsetHeight,i.x);
var h=l.intersect(k);
if(h){d.overlap=h;
return(b)?true:d.cursorIsOver
}else{return false
}},_onUnload:function(b,c){Ext.dd.DragDropMgr.unregAll()
},unregAll:function(){if(this.dragCurrent){this.stopDrag();
this.dragCurrent=null
}this._execOnAll("unreg",[]);
for(var b in this.elementCache){delete this.elementCache[b]
}this.elementCache={};
this.ids={}
},elementCache:{},getElWrapper:function(b){var c=this.elementCache[b];
if(!c||!c.el){c=this.elementCache[b]=new this.ElementWrapper(Ext.getDom(b))
}return c
},getElement:function(b){return Ext.getDom(b)
},getCss:function(b){var c=Ext.getDom(b);
return(c)?c.style:null
},ElementWrapper:function(b){this.el=b||null;
this.id=this.el&&b.id;
this.css=this.el&&b.style
},getPosX:function(b){return Ext.lib.Dom.getX(b)
},getPosY:function(b){return Ext.lib.Dom.getY(b)
},swapNode:function(c,e){if(c.swapNode){c.swapNode(e)
}else{var b=e.parentNode;
var d=e.nextSibling;
if(d==c){b.insertBefore(c,e)
}else{if(e==c.nextSibling){b.insertBefore(e,c)
}else{c.parentNode.replaceChild(e,c);
b.insertBefore(c,d)
}}}},getScroll:function(){var c,e,b=document.documentElement,d=document.body;
if(b&&(b.scrollTop||b.scrollLeft)){c=b.scrollTop;
e=b.scrollLeft
}else{if(d){c=d.scrollTop;
e=d.scrollLeft
}else{}}return{top:c,left:e}
},getStyle:function(b,c){return Ext.fly(b).getStyle(c)
},getScrollTop:function(){return this.getScroll().top
},getScrollLeft:function(){return this.getScroll().left
},moveToEl:function(d,b){var c=Ext.lib.Dom.getXY(b);
Ext.lib.Dom.setXY(d,c)
},numericSort:function(b,c){return(b-c)
},_timeoutCount:0,_addListeners:function(){var b=Ext.dd.DDM;
if(Ext.lib.Event&&document){b._onLoad()
}else{if(b._timeoutCount>2000){}else{setTimeout(b._addListeners,10);
if(document&&document.body){b._timeoutCount+=1
}}}},handleWasClicked:function(d,b){if(this.isHandle(b,d.id)){return true
}else{var c=d.parentNode;
while(c){if(this.isHandle(b,c.id)){return true
}else{c=c.parentNode
}}}return false
}}
}();
Ext.dd.DDM=Ext.dd.DragDropMgr;
Ext.dd.DDM._addListeners()
}Ext.dd.DD=function(b,a,c){if(b){this.init(b,a,c)
}};
Ext.extend(Ext.dd.DD,Ext.dd.DragDrop,{scroll:true,autoOffset:function(c,d){var a=c-this.startPageX;
var b=d-this.startPageY;
this.setDelta(a,b)
},setDelta:function(b,a){this.deltaX=b;
this.deltaY=a
},setDragElPos:function(b,c){var a=this.getDragEl();
this.alignElWithMouse(a,b,c)
},alignElWithMouse:function(h,c,d){var e=this.getTargetCoord(c,d);
var i=h.dom?h:Ext.fly(h,"_dd");
if(!this.deltaSetXY){var b=[e.x,e.y];
i.setXY(b);
var g=i.getLeft(true);
var a=i.getTop(true);
this.deltaSetXY=[g-e.x,a-e.y]
}else{i.setLeftTop(e.x+this.deltaSetXY[0],e.y+this.deltaSetXY[1])
}this.cachePosition(e.x,e.y);
this.autoScroll(e.x,e.y,h.offsetHeight,h.offsetWidth);
return e
},cachePosition:function(c,a){if(c){this.lastPageX=c;
this.lastPageY=a
}else{var b=Ext.lib.Dom.getXY(this.getEl());
this.lastPageX=b[0];
this.lastPageY=b[1]
}},autoScroll:function(k,l,p,i){if(this.scroll){var h=Ext.lib.Dom.getViewHeight();
var c=Ext.lib.Dom.getViewWidth();
var e=this.DDM.getScrollTop();
var a=this.DDM.getScrollLeft();
var m=p+l;
var g=i+k;
var n=(h+e-l-this.deltaY);
var o=(c+a-k-this.deltaX);
var b=40;
var d=(document.all)?80:30;
if(m>h&&n<b){window.scrollTo(a,e+d)
}if(l<e&&e>0&&l-e<b){window.scrollTo(a,e-d)
}if(g>c&&o<b){window.scrollTo(a+d,e)
}if(k<a&&a>0&&k-a<b){window.scrollTo(a-d,e)
}}},getTargetCoord:function(c,d){var a=c-this.deltaX;
var b=d-this.deltaY;
if(this.constrainX){if(a<this.minX){a=this.minX
}if(a>this.maxX){a=this.maxX
}}if(this.constrainY){if(b<this.minY){b=this.minY
}if(b>this.maxY){b=this.maxY
}}a=this.getTick(a,this.xTicks);
b=this.getTick(b,this.yTicks);
return{x:a,y:b}
},applyConfig:function(){Ext.dd.DD.superclass.applyConfig.call(this);
this.scroll=(this.config.scroll!==false)
},b4MouseDown:function(a){this.autoOffset(a.getPageX(),a.getPageY())
},b4Drag:function(a){this.setDragElPos(a.getPageX(),a.getPageY())
},toString:function(){return("DD "+this.id)
}});
Ext.dd.DDProxy=function(b,a,c){if(b){this.init(b,a,c);
this.initFrame()
}};
Ext.dd.DDProxy.dragElId="ygddfdiv";
Ext.extend(Ext.dd.DDProxy,Ext.dd.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var d=this;
var a=document.body;
if(!a||!a.firstChild){setTimeout(function(){d.createFrame()
},50);
return
}var b=this.getDragEl();
if(!b){b=document.createElement("div");
b.id=this.dragElId;
var c=b.style;
c.position="absolute";
c.visibility="hidden";
c.cursor="move";
c.border="2px solid #aaa";
c.zIndex=999;
a.insertBefore(b,a.firstChild)
}},initFrame:function(){this.createFrame()
},applyConfig:function(){Ext.dd.DDProxy.superclass.applyConfig.call(this);
this.resizeFrame=(this.config.resizeFrame!==false);
this.centerFrame=(this.config.centerFrame);
this.setDragElId(this.config.dragElId||Ext.dd.DDProxy.dragElId)
},showFrame:function(b,c){var d=this.getEl();
var a=this.getDragEl();
var e=a.style;
this._resizeProxy();
if(this.centerFrame){this.setDelta(Math.round(parseInt(e.width,10)/2),Math.round(parseInt(e.height,10)/2))
}this.setDragElPos(b,c);
Ext.fly(a).show()
},_resizeProxy:function(){if(this.resizeFrame){var a=this.getEl();
Ext.fly(this.getDragEl()).setSize(a.offsetWidth,a.offsetHeight)
}},b4MouseDown:function(c){var a=c.getPageX();
var b=c.getPageY();
this.autoOffset(a,b);
this.setDragElPos(a,b)
},b4StartDrag:function(a,b){this.showFrame(a,b)
},b4EndDrag:function(a){Ext.fly(this.getDragEl()).hide()
},endDrag:function(b){var c=this.getEl();
var a=this.getDragEl();
a.style.visibility="";
this.beforeMove();
c.style.visibility="hidden";
Ext.dd.DDM.moveToEl(c,a);
a.style.visibility="hidden";
c.style.visibility="";
this.afterDrag()
},beforeMove:function(){},afterDrag:function(){},toString:function(){return("DDProxy "+this.id)
}});
Ext.dd.DDTarget=function(b,a,c){if(b){this.initTarget(b,a,c)
}};
Ext.extend(Ext.dd.DDTarget,Ext.dd.DragDrop,{toString:function(){return("DDTarget "+this.id)
}});
Ext.dd.DragTracker=function(a){Ext.apply(this,a);
this.addEvents("mousedown","mouseup","mousemove","dragstart","dragend","drag");
this.dragRegion=new Ext.lib.Region(0,0,0,0);
if(this.el){this.initEl(this.el)
}};
Ext.extend(Ext.dd.DragTracker,Ext.util.Observable,{active:false,tolerance:5,autoStart:false,initEl:function(a){this.el=Ext.get(a);
a.on("mousedown",this.onMouseDown,this,this.delegate?{delegate:this.delegate}:undefined)
},destroy:function(){this.el.un("mousedown",this.onMouseDown,this)
},onMouseDown:function(b,c){if(this.fireEvent("mousedown",this,b)!==false&&this.onBeforeStart(b)!==false){this.startXY=this.lastXY=b.getXY();
this.dragTarget=this.delegate?c:this.el.dom;
b.preventDefault();
var a=Ext.getDoc();
a.on("mouseup",this.onMouseUp,this);
a.on("mousemove",this.onMouseMove,this);
a.on("selectstart",this.stopSelect,this);
if(this.autoStart){this.timer=this.triggerStart.defer(this.autoStart===true?1000:this.autoStart,this)
}}},onMouseMove:function(b,c){b.preventDefault();
var d=b.getXY(),a=this.startXY;
this.lastXY=d;
if(!this.active){if(Math.abs(a[0]-d[0])>this.tolerance||Math.abs(a[1]-d[1])>this.tolerance){this.triggerStart()
}else{return
}}this.fireEvent("mousemove",this,b);
this.onDrag(b);
this.fireEvent("drag",this,b)
},onMouseUp:function(b){var a=Ext.getDoc();
a.un("mousemove",this.onMouseMove,this);
a.un("mouseup",this.onMouseUp,this);
a.un("selectstart",this.stopSelect,this);
b.preventDefault();
this.clearStart();
this.active=false;
delete this.elRegion;
this.fireEvent("mouseup",this,b);
this.onEnd(b);
this.fireEvent("dragend",this,b)
},triggerStart:function(a){this.clearStart();
this.active=true;
this.onStart(this.startXY);
this.fireEvent("dragstart",this,this.startXY)
},clearStart:function(){if(this.timer){clearTimeout(this.timer);
delete this.timer
}},stopSelect:function(a){a.stopEvent();
return false
},onBeforeStart:function(a){},onStart:function(a){},onDrag:function(a){},onEnd:function(a){},getDragTarget:function(){return this.dragTarget
},getDragCt:function(){return this.el
},getXY:function(a){return a?this.constrainModes[a].call(this,this.lastXY):this.lastXY
},getOffset:function(b){var c=this.getXY(b);
var a=this.startXY;
return[a[0]-c[0],a[1]-c[1]]
},constrainModes:{point:function(b){if(!this.elRegion){this.elRegion=this.getDragCt().getRegion()
}var a=this.dragRegion;
a.left=b[0];
a.top=b[1];
a.right=b[0];
a.bottom=b[1];
a.constrainTo(this.elRegion);
return[a.left,a.top]
}}});
Ext.dd.ScrollManager=function(){var b=Ext.dd.DragDropMgr;
var l={};
var c=null;
var h={};
var i=function(m){c=null;
d()
};
var g=function(){if(b.dragCurrent){b.refreshCache(b.dragCurrent.groups)
}};
var a=function(){if(b.dragCurrent){var n=Ext.dd.ScrollManager;
var m=h.el.ddScrollConfig?h.el.ddScrollConfig.increment:n.increment;
if(!n.animate){if(h.el.scroll(h.dir,m)){g()
}}else{h.el.scroll(h.dir,m,true,n.animDuration,g)
}}};
var d=function(){if(h.id){clearInterval(h.id)
}h.id=0;
h.el=null;
h.dir=""
};
var k=function(m,n){d();
h.el=m;
h.dir=n;
h.id=setInterval(a,Ext.dd.ScrollManager.frequency)
};
var e=function(r,p){if(p||!b.dragCurrent){return
}var o=Ext.dd.ScrollManager;
if(!c||c!=b.dragCurrent){c=b.dragCurrent;
o.refreshCache()
}var n=Ext.lib.Event.getXY(r);
var m=new Ext.lib.Point(n[0],n[1]);
for(var t in l){var s=l[t],u=s._region;
var q=s.ddScrollConfig?s.ddScrollConfig:o;
if(u&&u.contains(m)&&s.isScrollable()){if(u.bottom-m.y<=q.vthresh){if(h.el!=s){k(s,"down")
}return
}else{if(u.right-m.x<=q.hthresh){if(h.el!=s){k(s,"left")
}return
}else{if(m.y-u.top<=q.vthresh){if(h.el!=s){k(s,"up")
}return
}else{if(m.x-u.left<=q.hthresh){if(h.el!=s){k(s,"right")
}return
}}}}}}d()
};
b.fireEvents=b.fireEvents.createSequence(e,b);
b.stopDrag=b.stopDrag.createSequence(i,b);
return{register:function(o){if(Ext.isArray(o)){for(var m=0,n=o.length;
m<n;
m++){this.register(o[m])
}}else{o=Ext.get(o);
l[o.id]=o
}},unregister:function(o){if(Ext.isArray(o)){for(var m=0,n=o.length;
m<n;
m++){this.unregister(o[m])
}}else{o=Ext.get(o);
delete l[o.id]
}},vthresh:25,hthresh:25,increment:100,frequency:500,animate:true,animDuration:0.4,refreshCache:function(){for(var m in l){if(typeof l[m]=="object"){l[m]._region=l[m].getRegion()
}}}}
}();
Ext.dd.Registry=function(){var b={};
var d={};
var a=0;
var c=function(g,h){if(typeof g=="string"){return g
}var e=g.id;
if(!e&&h!==false){e="extdd-"+(++a);
g.id=e
}return e
};
return{register:function(g,e){e=e||{};
if(typeof g=="string"){g=document.getElementById(g)
}e.ddel=g;
b[c(g)]=e;
if(e.isHandle!==false){d[e.ddel.id]=e
}if(e.handles){var h=e.handles;
for(var i=0,k=h.length;
i<k;
i++){d[c(h[i])]=e
}}},unregister:function(h){var e=c(h,false);
var g=b[e];
if(g){delete b[e];
if(g.handles){var i=g.handles;
for(var k=0,l=i.length;
k<l;
k++){delete d[c(i[k],false)]
}}}},getHandle:function(e){if(typeof e!="string"){e=e.id
}return d[e]
},getHandleFromEvent:function(e){var g=Ext.lib.Event.getTarget(e);
return g?d[g.id]:null
},getTarget:function(e){if(typeof e!="string"){e=e.id
}return b[e]
},getTargetFromEvent:function(e){var g=Ext.lib.Event.getTarget(e);
return g?b[g.id]||d[g.id]:null
}}
}();
Ext.dd.StatusProxy=function(a){Ext.apply(this,a);
this.id=this.id||Ext.id();
this.el=new Ext.Layer({dh:{id:this.id,tag:"div",cls:"x-dd-drag-proxy "+this.dropNotAllowed,children:[{tag:"div",cls:"x-dd-drop-icon"},{tag:"div",cls:"x-dd-drag-ghost"}]},shadow:!a||a.shadow!==false});
this.ghost=Ext.get(this.el.dom.childNodes[1]);
this.dropStatus=this.dropNotAllowed
};
Ext.dd.StatusProxy.prototype={dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",setStatus:function(a){a=a||this.dropNotAllowed;
if(this.dropStatus!=a){this.el.replaceClass(this.dropStatus,a);
this.dropStatus=a
}},reset:function(a){this.el.dom.className="x-dd-drag-proxy "+this.dropNotAllowed;
this.dropStatus=this.dropNotAllowed;
if(a){this.ghost.update("")
}},update:function(a){if(typeof a=="string"){this.ghost.update(a)
}else{this.ghost.update("");
a.style.margin="0";
this.ghost.dom.appendChild(a)
}},getEl:function(){return this.el
},getGhost:function(){return this.ghost
},hide:function(a){this.el.hide();
if(a){this.reset(true)
}},stop:function(){if(this.anim&&this.anim.isAnimated&&this.anim.isAnimated()){this.anim.stop()
}},show:function(){this.el.show()
},sync:function(){this.el.sync()
},repair:function(c,b,a){this.callback=b;
this.scope=a;
if(c&&this.animRepair!==false){this.el.addClass("x-dd-drag-repair");
this.el.hideUnders(true);
this.anim=this.el.shift({duration:this.repairDuration||0.5,easing:"easeOut",xy:c,stopFx:true,callback:this.afterRepair,scope:this})
}else{this.afterRepair()
}},afterRepair:function(){this.hide(true);
if(typeof this.callback=="function"){this.callback.call(this.scope||this)
}this.callback=null;
this.scope=null
}};
Ext.dd.DragSource=function(b,a){this.el=Ext.get(b);
if(!this.dragData){this.dragData={}
}Ext.apply(this,a);
if(!this.proxy){this.proxy=new Ext.dd.StatusProxy()
}Ext.dd.DragSource.superclass.constructor.call(this,this.el.dom,this.ddGroup||this.group,{dragElId:this.proxy.id,resizeFrame:false,isTarget:false,scroll:this.scroll===true});
this.dragging=false
};
Ext.extend(Ext.dd.DragSource,Ext.dd.DDProxy,{dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",getDragData:function(a){return this.dragData
},onDragEnter:function(c,b){var d=Ext.dd.DragDropMgr.getDDById(b);
this.cachedTarget=d;
if(this.beforeDragEnter(d,c,b)!==false){if(d.isNotifyTarget){var a=d.notifyEnter(this,c,this.dragData);
this.proxy.setStatus(a)
}else{this.proxy.setStatus(this.dropAllowed)
}if(this.afterDragEnter){this.afterDragEnter(d,c,b)
}}},beforeDragEnter:function(c,a,b){return true
},alignElWithMouse:function(){Ext.dd.DragSource.superclass.alignElWithMouse.apply(this,arguments);
this.proxy.sync()
},onDragOver:function(c,b){var d=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(b);
if(this.beforeDragOver(d,c,b)!==false){if(d.isNotifyTarget){var a=d.notifyOver(this,c,this.dragData);
this.proxy.setStatus(a)
}if(this.afterDragOver){this.afterDragOver(d,c,b)
}}},beforeDragOver:function(c,a,b){return true
},onDragOut:function(c,b){var a=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(b);
if(this.beforeDragOut(a,c,b)!==false){if(a.isNotifyTarget){a.notifyOut(this,c,this.dragData)
}this.proxy.reset();
if(this.afterDragOut){this.afterDragOut(a,c,b)
}}this.cachedTarget=null
},beforeDragOut:function(c,a,b){return true
},onDragDrop:function(c,b){var a=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(b);
if(this.beforeDragDrop(a,c,b)!==false){if(a.isNotifyTarget){if(a.notifyDrop(this,c,this.dragData)){this.onValidDrop(a,c,b)
}else{this.onInvalidDrop(a,c,b)
}}else{this.onValidDrop(a,c,b)
}if(this.afterDragDrop){this.afterDragDrop(a,c,b)
}}delete this.cachedTarget
},beforeDragDrop:function(c,a,b){return true
},onValidDrop:function(c,a,b){this.hideProxy();
if(this.afterValidDrop){this.afterValidDrop(c,a,b)
}},getRepairXY:function(b,a){return this.el.getXY()
},onInvalidDrop:function(c,a,b){this.beforeInvalidDrop(c,a,b);
if(this.cachedTarget){if(this.cachedTarget.isNotifyTarget){this.cachedTarget.notifyOut(this,a,this.dragData)
}this.cacheTarget=null
}this.proxy.repair(this.getRepairXY(a,this.dragData),this.afterRepair,this);
if(this.afterInvalidDrop){this.afterInvalidDrop(a,b)
}},afterRepair:function(){if(Ext.enableFx){this.el.highlight(this.hlColor||"c3daf9")
}this.dragging=false
},beforeInvalidDrop:function(c,a,b){return true
},handleMouseDown:function(b){if(this.dragging){return
}var a=this.getDragData(b);
if(a&&this.onBeforeDrag(a,b)!==false){this.dragData=a;
this.proxy.stop();
Ext.dd.DragSource.superclass.handleMouseDown.apply(this,arguments)
}},onBeforeDrag:function(a,b){return true
},onStartDrag:Ext.emptyFn,startDrag:function(a,b){this.proxy.reset();
this.dragging=true;
this.proxy.update("");
this.onInitDrag(a,b);
this.proxy.show()
},onInitDrag:function(a,b){var c=this.el.dom.cloneNode(true);
c.id=Ext.id();
this.proxy.update(c);
this.onStartDrag(a,b);
return true
},getProxy:function(){return this.proxy
},hideProxy:function(){this.proxy.hide();
this.proxy.reset(true);
this.dragging=false
},triggerCacheRefresh:function(){Ext.dd.DDM.refreshCache(this.groups)
},b4EndDrag:function(a){},endDrag:function(a){this.onEndDrag(this.dragData,a)
},onEndDrag:function(a,b){},autoOffset:function(a,b){this.setDelta(-12,-20)
}});
Ext.dd.DropTarget=function(b,a){this.el=Ext.get(b);
Ext.apply(this,a);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.el)
}Ext.dd.DropTarget.superclass.constructor.call(this,this.el.dom,this.ddGroup||this.group,{isTarget:true})
};
Ext.extend(Ext.dd.DropTarget,Ext.dd.DDTarget,{dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",isTarget:true,isNotifyTarget:true,notifyEnter:function(a,b,c){if(this.overClass){this.el.addClass(this.overClass)
}return this.dropAllowed
},notifyOver:function(a,b,c){return this.dropAllowed
},notifyOut:function(a,b,c){if(this.overClass){this.el.removeClass(this.overClass)
}},notifyDrop:function(a,b,c){return false
}});
Ext.dd.DragZone=function(b,a){Ext.dd.DragZone.superclass.constructor.call(this,b,a);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.el)
}};
Ext.extend(Ext.dd.DragZone,Ext.dd.DragSource,{getDragData:function(a){return Ext.dd.Registry.getHandleFromEvent(a)
},onInitDrag:function(a,b){this.proxy.update(this.dragData.ddel.cloneNode(true));
this.onStartDrag(a,b);
return true
},afterRepair:function(){if(Ext.enableFx){Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor||"c3daf9")
}this.dragging=false
},getRepairXY:function(a){return Ext.Element.fly(this.dragData.ddel).getXY()
}});
Ext.dd.DropZone=function(b,a){Ext.dd.DropZone.superclass.constructor.call(this,b,a)
};
Ext.extend(Ext.dd.DropZone,Ext.dd.DropTarget,{getTargetFromEvent:function(a){return Ext.dd.Registry.getTargetFromEvent(a)
},onNodeEnter:function(b,a,c,d){},onNodeOver:function(b,a,c,d){return this.dropAllowed
},onNodeOut:function(b,a,c,d){},onNodeDrop:function(b,a,c,d){return false
},onContainerOver:function(a,b,c){return this.dropNotAllowed
},onContainerDrop:function(a,b,c){return false
},notifyEnter:function(a,b,c){return this.dropNotAllowed
},notifyOver:function(a,c,d){var b=this.getTargetFromEvent(c);
if(!b){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,c,d);
this.lastOverNode=null
}return this.onContainerOver(a,c,d)
}if(this.lastOverNode!=b){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,c,d)
}this.onNodeEnter(b,a,c,d);
this.lastOverNode=b
}return this.onNodeOver(b,a,c,d)
},notifyOut:function(a,b,c){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,b,c);
this.lastOverNode=null
}},notifyDrop:function(a,c,d){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,c,d);
this.lastOverNode=null
}var b=this.getTargetFromEvent(c);
return b?this.onNodeDrop(b,a,c,d):this.onContainerDrop(a,c,d)
},triggerCacheRefresh:function(){Ext.dd.DDM.refreshCache(this.groups)
}});
Ext.data.SortTypes={none:function(a){return a
},stripTagsRE:/<\/?[^>]+>/gi,asText:function(a){return String(a).replace(this.stripTagsRE,"")
},asUCText:function(a){return String(a).toUpperCase().replace(this.stripTagsRE,"")
},asUCString:function(a){return String(a).toUpperCase()
},asDate:function(a){if(!a){return 0
}if(Ext.isDate(a)){return a.getTime()
}return Date.parse(String(a))
},asFloat:function(a){var b=parseFloat(String(a).replace(/,/g,""));
if(isNaN(b)){b=0
}return b
},asInt:function(a){var b=parseInt(String(a).replace(/,/g,""));
if(isNaN(b)){b=0
}return b
}};
Ext.data.Record=function(a,b){this.id=(b||b===0)?b:++Ext.data.Record.AUTO_ID;
this.data=a
};
Ext.data.Record.create=function(b){var d=Ext.extend(Ext.data.Record,{});
var c=d.prototype;
c.fields=new Ext.util.MixedCollection(false,function(g){return g.name
});
for(var e=0,a=b.length;
e<a;
e++){c.fields.add(new Ext.data.Field(b[e]))
}d.getField=function(g){return c.fields.get(g)
};
return d
};
Ext.data.Record.AUTO_ID=1000;
Ext.data.Record.EDIT="edit";
Ext.data.Record.REJECT="reject";
Ext.data.Record.COMMIT="commit";
Ext.data.Record.prototype={dirty:false,editing:false,error:null,modified:null,join:function(a){this.store=a
},set:function(a,b){if(String(this.data[a])==String(b)){return
}this.dirty=true;
if(!this.modified){this.modified={}
}if(typeof this.modified[a]=="undefined"){this.modified[a]=this.data[a]
}this.data[a]=b;
if(!this.editing&&this.store){this.store.afterEdit(this)
}},get:function(a){return this.data[a]
},beginEdit:function(){this.editing=true;
this.modified={}
},cancelEdit:function(){this.editing=false;
delete this.modified
},endEdit:function(){this.editing=false;
if(this.dirty&&this.store){this.store.afterEdit(this)
}},reject:function(c){var a=this.modified;
for(var b in a){if(typeof a[b]!="function"){this.data[b]=a[b]
}}this.dirty=false;
delete this.modified;
this.editing=false;
if(this.store&&c!==true){this.store.afterReject(this)
}},commit:function(a){this.dirty=false;
delete this.modified;
this.editing=false;
if(this.store&&a!==true){this.store.afterCommit(this)
}},getChanges:function(){var a=this.modified,c={};
for(var b in a){if(a.hasOwnProperty(b)){c[b]=this.data[b]
}}return c
},hasError:function(){return this.error!=null
},clearError:function(){this.error=null
},copy:function(a){return new this.constructor(Ext.apply({},this.data),a||this.id)
},isModified:function(a){return this.modified&&this.modified.hasOwnProperty(a)
}};
Ext.StoreMgr=Ext.apply(new Ext.util.MixedCollection(),{register:function(){for(var a=0,b;
b=arguments[a];
a++){this.add(b)
}},unregister:function(){for(var a=0,b;
b=arguments[a];
a++){this.remove(this.lookup(b))
}},lookup:function(a){return typeof a=="object"?a:this.get(a)
},getKey:function(a){return a.storeId||a.id
}});
Ext.data.Store=function(a){this.data=new Ext.util.MixedCollection(false);
this.data.getKey=function(b){return b.id
};
this.baseParams={};
this.paramNames={start:"start",limit:"limit",sort:"sort",dir:"dir"};
if(a&&a.data){this.inlineData=a.data;
delete a.data
}Ext.apply(this,a);
if(this.url&&!this.proxy){this.proxy=new Ext.data.HttpProxy({url:this.url})
}if(this.reader){if(!this.recordType){this.recordType=this.reader.recordType
}if(this.reader.onMetaChange){this.reader.onMetaChange=this.onMetaChange.createDelegate(this)
}}if(this.recordType){this.fields=this.recordType.prototype.fields
}this.modified=[];
this.addEvents("datachanged","metachange","add","remove","update","clear","beforeload","load","loadexception");
if(this.proxy){this.relayEvents(this.proxy,["loadexception"])
}this.sortToggle={};
if(this.sortInfo){this.setDefaultSort(this.sortInfo.field,this.sortInfo.direction)
}Ext.data.Store.superclass.constructor.call(this);
if(this.storeId||this.id){Ext.StoreMgr.register(this)
}if(this.inlineData){this.loadData(this.inlineData);
delete this.inlineData
}else{if(this.autoLoad){this.load.defer(10,this,[typeof this.autoLoad=="object"?this.autoLoad:undefined])
}}};
Ext.extend(Ext.data.Store,Ext.util.Observable,{remoteSort:false,pruneModifiedRecords:false,lastOptions:null,destroy:function(){if(this.id){Ext.StoreMgr.unregister(this)
}this.data=null;
this.purgeListeners()
},add:function(d){d=[].concat(d);
if(d.length<1){return
}for(var b=0,a=d.length;
b<a;
b++){d[b].join(this)
}var c=this.data.length;
this.data.addAll(d);
if(this.snapshot){this.snapshot.addAll(d)
}this.fireEvent("add",this,d,c)
},addSorted:function(a){var b=this.findInsertIndex(a);
this.insert(b,a)
},remove:function(a){var b=this.data.indexOf(a);
this.data.removeAt(b);
if(this.pruneModifiedRecords){this.modified.remove(a)
}if(this.snapshot){this.snapshot.remove(a)
}this.fireEvent("remove",this,a,b)
},removeAll:function(){this.data.clear();
if(this.snapshot){this.snapshot.clear()
}if(this.pruneModifiedRecords){this.modified=[]
}this.fireEvent("clear",this)
},insert:function(c,d){d=[].concat(d);
for(var b=0,a=d.length;
b<a;
b++){this.data.insert(c,d[b]);
d[b].join(this)
}this.fireEvent("add",this,d,c)
},indexOf:function(a){return this.data.indexOf(a)
},indexOfId:function(a){return this.data.indexOfKey(a)
},getById:function(a){return this.data.key(a)
},getAt:function(a){return this.data.itemAt(a)
},getRange:function(b,a){return this.data.getRange(b,a)
},storeOptions:function(a){a=Ext.apply({},a);
delete a.callback;
delete a.scope;
this.lastOptions=a
},load:function(c){c=c||{};
if(this.fireEvent("beforeload",this,c)!==false){this.storeOptions(c);
var b=Ext.apply(c.params||{},this.baseParams);
if(this.sortInfo&&this.remoteSort){var a=this.paramNames;
b[a.sort]=this.sortInfo.field;
b[a.dir]=this.sortInfo.direction
}this.proxy.load(b,this.reader,this.loadRecords,this,c);
return true
}else{return false
}},reload:function(a){this.load(Ext.applyIf(a||{},this.lastOptions))
},loadRecords:function(b,h,c){if(!b||c===false){if(c!==false){this.fireEvent("load",this,[],h)
}if(h.callback){h.callback.call(h.scope||this,[],h,false)
}return
}var d=b.records,e=b.totalRecords||d.length;
if(!h||h.add!==true){if(this.pruneModifiedRecords){this.modified=[]
}for(var g=0,a=d.length;
g<a;
g++){d[g].join(this)
}if(this.snapshot){this.data=this.snapshot;
delete this.snapshot
}this.data.clear();
this.data.addAll(d);
this.totalLength=e;
this.applySort();
this.fireEvent("datachanged",this)
}else{this.totalLength=Math.max(e,this.data.length+d.length);
this.add(d)
}this.fireEvent("load",this,d,h);
if(h.callback){h.callback.call(h.scope||this,d,h,true)
}},loadData:function(b,a){var c=this.reader.readRecords(b);
this.loadRecords(c,{add:a},true)
},getCount:function(){return this.data.length||0
},getTotalCount:function(){return this.totalLength||0
},getSortState:function(){return this.sortInfo
},applySort:function(){if(this.sortInfo&&!this.remoteSort){var a=this.sortInfo,b=a.field;
this.sortData(b,a.direction)
}},sortData:function(c,b){b=b||"ASC";
var a=this.fields.get(c).sortType;
var d=function(h,i){var e=a(h.data[c]),g=a(i.data[c]);
return e>g?1:(e<g?-1:0)
};
this.data.sort(b,d);
if(this.snapshot&&this.snapshot!=this.data){this.snapshot.sort(b,d)
}},setDefaultSort:function(b,a){a=a?a.toUpperCase():"ASC";
this.sortInfo={field:b,direction:a};
this.sortToggle[b]=a
},sort:function(b,d){var c=this.fields.get(b);
if(!c){return false
}if(!d){if(this.sortInfo&&this.sortInfo.field==c.name){d=(this.sortToggle[c.name]||"ASC").toggle("ASC","DESC")
}else{d=c.sortDir
}}var e=(this.sortToggle)?this.sortToggle[c.name]:null;
var a=(this.sortInfo)?this.sortInfo:null;
this.sortToggle[c.name]=d;
this.sortInfo={field:c.name,direction:d};
if(!this.remoteSort){this.applySort();
this.fireEvent("datachanged",this)
}else{if(!this.load(this.lastOptions)){if(e){this.sortToggle[c.name]=e
}if(a){this.sortInfo=a
}}}},each:function(b,a){this.data.each(b,a)
},getModifiedRecords:function(){return this.modified
},createFilterFn:function(c,d,b,a){if(Ext.isEmpty(d,false)){return false
}d=this.data.createValueMatcher(d,b,a);
return function(e){return d.test(e.data[c])
}
},sum:function(c,b,a){var e=this.data.items,g=0;
b=b||0;
a=(a||a===0)?a:e.length-1;
for(var d=b;
d<=a;
d++){g+=(e[d].data[c]||0)
}return g
},filter:function(c,d,b,a){var e=this.createFilterFn(c,d,b,a);
return e?this.filterBy(e):this.clearFilter()
},filterBy:function(b,a){this.snapshot=this.snapshot||this.data;
this.data=this.queryBy(b,a||this);
this.fireEvent("datachanged",this)
},query:function(c,d,b,a){var e=this.createFilterFn(c,d,b,a);
return e?this.queryBy(e):this.data.clone()
},queryBy:function(c,a){var b=this.snapshot||this.data;
return b.filterBy(c,a||this)
},find:function(d,e,b,c,a){var g=this.createFilterFn(d,e,c,a);
return g?this.data.findIndexBy(g,null,b):-1
},findBy:function(c,a,b){return this.data.findIndexBy(c,a,b)
},collect:function(i,h,c){var k=(c===true&&this.snapshot)?this.snapshot.items:this.data.items;
var g,e,d=[],b={};
for(var a=0,l=k.length;
a<l;
a++){g=k[a].data[i];
e=String(g);
if((h||!Ext.isEmpty(g))&&!b[e]){b[e]=true;
d[d.length]=g
}}return d
},clearFilter:function(a){if(this.isFiltered()){this.data=this.snapshot;
delete this.snapshot;
if(a!==true){this.fireEvent("datachanged",this)
}}},isFiltered:function(){return this.snapshot&&this.snapshot!=this.data
},afterEdit:function(a){if(this.modified.indexOf(a)==-1){this.modified.push(a)
}this.fireEvent("update",this,a,Ext.data.Record.EDIT)
},afterReject:function(a){this.modified.remove(a);
this.fireEvent("update",this,a,Ext.data.Record.REJECT)
},afterCommit:function(a){this.modified.remove(a);
this.fireEvent("update",this,a,Ext.data.Record.COMMIT)
},commitChanges:function(){var c=this.modified.slice(0);
this.modified=[];
for(var b=0,a=c.length;
b<a;
b++){c[b].commit()
}},rejectChanges:function(){var c=this.modified.slice(0);
this.modified=[];
for(var b=0,a=c.length;
b<a;
b++){c[b].reject()
}},onMetaChange:function(c,a,b){this.recordType=a;
this.fields=a.prototype.fields;
delete this.snapshot;
this.sortInfo=c.sortInfo;
this.modified=[];
this.fireEvent("metachange",this,this.reader.meta)
},findInsertIndex:function(a){this.suspendEvents();
var b=this.data.clone();
this.data.add(a);
this.applySort();
var c=this.data.indexOf(a);
this.data=b;
this.resumeEvents();
return c
}});
Ext.data.SimpleStore=function(a){Ext.data.SimpleStore.superclass.constructor.call(this,Ext.apply(a,{reader:new Ext.data.ArrayReader({id:a.id},Ext.data.Record.create(a.fields))}))
};
Ext.extend(Ext.data.SimpleStore,Ext.data.Store,{loadData:function(b,e){if(this.expandData===true){var c=[];
for(var d=0,a=b.length;
d<a;
d++){c[c.length]=[b[d]]
}b=c
}Ext.data.SimpleStore.superclass.loadData.call(this,b,e)
}});
Ext.data.JsonStore=function(a){Ext.data.JsonStore.superclass.constructor.call(this,Ext.apply(a,{proxy:!a.data?new Ext.data.HttpProxy({url:a.url}):undefined,reader:new Ext.data.JsonReader(a,a.fields)}))
};
Ext.extend(Ext.data.JsonStore,Ext.data.Store);
Ext.data.Field=function(c){if(typeof c=="string"){c={name:c}
}Ext.apply(this,c);
if(!this.type){this.type="auto"
}var d=Ext.data.SortTypes;
if(typeof this.sortType=="string"){this.sortType=d[this.sortType]
}if(!this.sortType){switch(this.type){case"string":this.sortType=d.asUCString;
break;
case"date":this.sortType=d.asDate;
break;
default:this.sortType=d.none
}}var b=/[\$,%]/g;
if(!this.convert){var e,a=this.dateFormat;
switch(this.type){case"":case"auto":case undefined:e=function(g){return g
};
break;
case"string":e=function(g){return(g===undefined||g===null)?"":String(g)
};
break;
case"int":e=function(g){return g!==undefined&&g!==null&&g!==""?parseInt(String(g).replace(b,""),10):""
};
break;
case"float":e=function(g){return g!==undefined&&g!==null&&g!==""?parseFloat(String(g).replace(b,""),10):""
};
break;
case"bool":case"boolean":e=function(g){return g===true||g==="true"||g==1
};
break;
case"date":e=function(g){if(!g){return""
}if(Ext.isDate(g)){return g
}if(a){if(a=="timestamp"){return new Date(g*1000)
}if(a=="time"){return new Date(parseInt(g,10))
}return Date.parseDate(g,a)
}var h=Date.parse(g);
return h?new Date(h):null
};
break
}this.convert=e
}};
Ext.data.Field.prototype={dateFormat:null,defaultValue:"",mapping:null,sortType:null,sortDir:"ASC"};
Ext.data.DataReader=function(a,b){this.meta=a;
this.recordType=Ext.isArray(b)?Ext.data.Record.create(b):b
};
Ext.data.DataReader.prototype={};
Ext.data.DataProxy=function(){this.addEvents("beforeload","load","loadexception");
Ext.data.DataProxy.superclass.constructor.call(this)
};
Ext.extend(Ext.data.DataProxy,Ext.util.Observable);
Ext.data.MemoryProxy=function(a){Ext.data.MemoryProxy.superclass.constructor.call(this);
this.data=a
};
Ext.extend(Ext.data.MemoryProxy,Ext.data.DataProxy,{load:function(c,g,b,e,h){c=c||{};
var a;
try{a=g.readRecords(this.data)
}catch(d){this.fireEvent("loadexception",this,h,null,d);
b.call(e,null,h,false);
return
}b.call(e,a,h,true)
},update:function(b,a){}});
Ext.data.HttpProxy=function(a){Ext.data.HttpProxy.superclass.constructor.call(this);
this.conn=a;
this.useAjax=!a||!a.events
};
Ext.extend(Ext.data.HttpProxy,Ext.data.DataProxy,{getConnection:function(){return this.useAjax?Ext.Ajax:this.conn
},load:function(c,g,b,e,a){if(this.fireEvent("beforeload",this,c)!==false){var d={params:c||{},request:{callback:b,scope:e,arg:a},reader:g,callback:this.loadResponse,scope:this};
if(this.useAjax){Ext.applyIf(d,this.conn);
if(this.activeRequest){Ext.Ajax.abort(this.activeRequest)
}this.activeRequest=Ext.Ajax.request(d)
}else{this.conn.request(d)
}}else{b.call(e||this,null,a,false)
}},loadResponse:function(b,c,e){delete this.activeRequest;
if(!c){this.fireEvent("loadexception",this,b,e);
b.request.callback.call(b.request.scope,null,b.request.arg,false);
return
}var a;
try{a=b.reader.read(e)
}catch(d){this.fireEvent("loadexception",this,b,e,d);
b.request.callback.call(b.request.scope,null,b.request.arg,false);
return
}this.fireEvent("load",this,b,b.request.arg);
b.request.callback.call(b.request.scope,a,b.request.arg,true)
},update:function(a){},updateResponse:function(a){}});
Ext.data.ScriptTagProxy=function(a){Ext.data.ScriptTagProxy.superclass.constructor.call(this);
Ext.apply(this,a);
this.head=document.getElementsByTagName("head")[0]
};
Ext.data.ScriptTagProxy.TRANS_ID=1000;
Ext.extend(Ext.data.ScriptTagProxy,Ext.data.DataProxy,{timeout:30000,callbackParam:"callback",nocache:true,load:function(m,l,i,h,g){if(this.fireEvent("beforeload",this,m)!==false){var b=Ext.urlEncode(Ext.apply(m,this.extraParams));
var c=this.url;
c+=(c.indexOf("?")!=-1?"&":"?")+b;
if(this.nocache){c+="&_dc="+(new Date().getTime())
}var d=++Ext.data.ScriptTagProxy.TRANS_ID;
var e={id:d,cb:"stcCallback"+d,scriptId:"stcScript"+d,params:m,arg:g,url:c,callback:i,scope:h,reader:l};
var a=this;
window[e.cb]=function(n){a.handleResponse(n,e)
};
c+=String.format("&{0}={1}",this.callbackParam,e.cb);
if(this.autoAbort!==false){this.abort()
}e.timeoutId=this.handleFailure.defer(this.timeout,this,[e]);
var k=document.createElement("script");
k.setAttribute("src",c);
k.setAttribute("type","text/javascript");
k.setAttribute("id",e.scriptId);
this.head.appendChild(k);
this.trans=e
}else{i.call(h||this,null,g,false)
}},isLoading:function(){return this.trans?true:false
},abort:function(){if(this.isLoading()){this.destroyTrans(this.trans)
}},destroyTrans:function(c,a){this.head.removeChild(document.getElementById(c.scriptId));
clearTimeout(c.timeoutId);
if(a){window[c.cb]=undefined;
try{delete window[c.cb]
}catch(b){}}else{window[c.cb]=function(){window[c.cb]=undefined;
try{delete window[c.cb]
}catch(d){}}
}},handleResponse:function(b,d){this.trans=false;
this.destroyTrans(d,true);
var a;
try{a=d.reader.readRecords(b)
}catch(c){this.fireEvent("loadexception",this,b,d.arg,c);
d.callback.call(d.scope||window,null,d.arg,false);
return
}this.fireEvent("load",this,b,d.arg);
d.callback.call(d.scope||window,a,d.arg,true)
},handleFailure:function(a){this.trans=false;
this.destroyTrans(a,false);
this.fireEvent("loadexception",this,null,a.arg);
a.callback.call(a.scope||window,null,a.arg,false)
}});
Ext.data.JsonReader=function(a,b){a=a||{};
Ext.data.JsonReader.superclass.constructor.call(this,a,b||a.fields)
};
Ext.extend(Ext.data.JsonReader,Ext.data.DataReader,{read:function(response){var json=response.responseText;
var o=eval("("+json+")");
if(!o){throw {message:"JsonReader.read: Json object not found"}
}if(o.metaData){delete this.ef;
this.meta=o.metaData;
this.recordType=Ext.data.Record.create(o.metaData.fields);
this.onMetaChange(this.meta,this.recordType,o)
}return this.readRecords(o)
},onMetaChange:function(a,b,c){},simpleAccess:function(b,a){return b[a]
},getJsonAccessor:function(){var a=/[\[\.]/;
return function(b){try{return(a.test(b))?new Function("obj","return obj."+b):function(d){return d[b]
}
}catch(c){}return Ext.emptyFn
}
}(),readRecords:function(l){this.jsonData=l;
var o=this.meta,v=this.recordType,c=v.prototype.fields,q=c.items,r=c.length;
if(!this.ef){if(o.totalProperty){this.getTotal=this.getJsonAccessor(o.totalProperty)
}if(o.successProperty){this.getSuccess=this.getJsonAccessor(o.successProperty)
}this.getRoot=o.root?this.getJsonAccessor(o.root):function(w){return w
};
if(o.id){var d=this.getJsonAccessor(o.id);
this.getId=function(w){var x=d(w);
return(x===undefined||x==="")?null:x
}
}else{this.getId=function(){return null
}
}this.ef=[];
for(var g=0;
g<r;
g++){c=q[g];
var a=(c.mapping!==undefined&&c.mapping!==null)?c.mapping:c.name;
this.ef[g]=this.getJsonAccessor(a)
}}var i=this.getRoot(l),b=i.length,n=b,s=true;
if(o.totalProperty){var p=parseInt(this.getTotal(l),10);
if(!isNaN(p)){n=p
}}if(o.successProperty){var p=this.getSuccess(l);
if(p===false||p==="false"){s=false
}}var e=[];
for(var g=0;
g<b;
g++){var k=i[g];
var u={};
var m=this.getId(k);
for(var h=0;
h<r;
h++){c=q[h];
var p=this.ef[h](k);
u[c.name]=c.convert((p!==undefined)?p:c.defaultValue,k)
}var t=new v(u,m);
t.json=k;
e[g]=t
}return{success:s,records:e,totalRecords:n}
}});
Ext.data.XmlReader=function(a,b){a=a||{};
Ext.data.XmlReader.superclass.constructor.call(this,a,b||a.fields)
};
Ext.extend(Ext.data.XmlReader,Ext.data.DataReader,{read:function(a){var b=a.responseXML;
if(!b){throw {message:"XmlReader.read: XML Document not available"}
}return this.readRecords(b)
},readRecords:function(b){this.xmlData=b;
var i=b.documentElement||b;
var o=Ext.DomQuery;
var v=this.recordType,l=v.prototype.fields;
var t=this.meta.id;
var q=0,s=true;
if(this.meta.totalRecords){q=o.selectNumber(this.meta.totalRecords,i,0)
}if(this.meta.success){var m=o.selectValue(this.meta.success,i,true);
s=m!==false&&m!=="false"
}var e=[];
var a=o.select(this.meta.record,i);
for(var g=0,d=a.length;
g<d;
g++){var k=a[g];
var w={};
var n=t?o.selectValue(t,k):undefined;
for(var h=0,p=l.length;
h<p;
h++){var c=l.items[h];
var r=o.selectValue(c.mapping||c.name,k,c.defaultValue);
r=c.convert(r,k);
w[c.name]=r
}var u=new v(w,n);
u.node=k;
e[e.length]=u
}return{success:s,records:e,totalRecords:q||e.length}
}});
Ext.data.ArrayReader=Ext.extend(Ext.data.JsonReader,{readRecords:function(b){var c=this.meta?this.meta.id:null;
var p=this.recordType,l=p.prototype.fields;
var r=[];
var i=b;
for(var n=0;
n<i.length;
n++){var a=i[n];
var g={};
var d=((c||c===0)&&a[c]!==undefined&&a[c]!==""?a[c]:null);
for(var o=0,e=l.length;
o<e;
o++){var k=l.items[o];
var q=k.mapping!==undefined&&k.mapping!==null?k.mapping:o;
var h=a[q]!==undefined?a[q]:k.defaultValue;
h=k.convert(h,a);
g[k.name]=h
}var m=new p(g,d);
m.json=a;
r[r.length]=m
}return{records:r,totalRecords:r.length}
}});
Ext.data.Tree=function(a){this.nodeHash={};
this.root=null;
if(a){this.setRootNode(a)
}this.addEvents("append","remove","move","insert","beforeappend","beforeremove","beforemove","beforeinsert");
Ext.data.Tree.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Tree,Ext.util.Observable,{pathSeparator:"/",proxyNodeEvent:function(){return this.fireEvent.apply(this,arguments)
},getRootNode:function(){return this.root
},setRootNode:function(a){this.root=a;
a.ownerTree=this;
a.isRoot=true;
this.registerNode(a);
return a
},getNodeById:function(a){return this.nodeHash[a]
},registerNode:function(a){this.nodeHash[a.id]=a
},unregisterNode:function(a){delete this.nodeHash[a.id]
},toString:function(){return"[Tree"+(this.id?" "+this.id:"")+"]"
}});
Ext.data.Node=function(a){this.attributes=a||{};
this.leaf=this.attributes.leaf;
this.id=this.attributes.id;
if(!this.id){this.id=Ext.id(null,"ynode-");
this.attributes.id=this.id
}this.childNodes=[];
if(!this.childNodes.indexOf){this.childNodes.indexOf=function(b){for(var c=0,d=this.length;
c<d;
c++){if(this[c]==b){return c
}}return -1
}
}this.parentNode=null;
this.firstChild=null;
this.lastChild=null;
this.previousSibling=null;
this.nextSibling=null;
this.addEvents({append:true,remove:true,move:true,insert:true,beforeappend:true,beforeremove:true,beforemove:true,beforeinsert:true});
this.listeners=this.attributes.listeners;
Ext.data.Node.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Node,Ext.util.Observable,{fireEvent:function(b){if(Ext.data.Node.superclass.fireEvent.apply(this,arguments)===false){return false
}var a=this.getOwnerTree();
if(a){if(a.proxyNodeEvent.apply(a,arguments)===false){return false
}}return true
},isLeaf:function(){return this.leaf===true
},setFirstChild:function(a){this.firstChild=a
},setLastChild:function(a){this.lastChild=a
},isLast:function(){return(!this.parentNode?true:this.parentNode.lastChild==this)
},isFirst:function(){return(!this.parentNode?true:this.parentNode.firstChild==this)
},hasChildNodes:function(){return !this.isLeaf()&&this.childNodes.length>0
},appendChild:function(d){var c=false;
if(Ext.isArray(d)){c=d
}else{if(arguments.length>1){c=arguments
}}if(c){for(var e=0,a=c.length;
e<a;
e++){this.appendChild(c[e])
}}else{if(this.fireEvent("beforeappend",this.ownerTree,this,d)===false){return false
}var h=this.childNodes.length;
var g=d.parentNode;
if(g){if(d.fireEvent("beforemove",d.getOwnerTree(),d,g,this,h)===false){return false
}g.removeChild(d)
}h=this.childNodes.length;
if(h==0){this.setFirstChild(d)
}this.childNodes.push(d);
d.parentNode=this;
var b=this.childNodes[h-1];
if(b){d.previousSibling=b;
b.nextSibling=d
}else{d.previousSibling=null
}d.nextSibling=null;
this.setLastChild(d);
d.setOwnerTree(this.getOwnerTree());
this.fireEvent("append",this.ownerTree,this,d,h);
if(g){d.fireEvent("move",this.ownerTree,d,g,this,h)
}return d
}},removeChild:function(b){var a=this.childNodes.indexOf(b);
if(a==-1){return false
}if(this.fireEvent("beforeremove",this.ownerTree,this,b)===false){return false
}this.childNodes.splice(a,1);
if(b.previousSibling){b.previousSibling.nextSibling=b.nextSibling
}if(b.nextSibling){b.nextSibling.previousSibling=b.previousSibling
}if(this.firstChild==b){this.setFirstChild(b.nextSibling)
}if(this.lastChild==b){this.setLastChild(b.previousSibling)
}b.setOwnerTree(null);
b.parentNode=null;
b.previousSibling=null;
b.nextSibling=null;
this.fireEvent("remove",this.ownerTree,this,b);
return b
},insertBefore:function(d,a){if(!a){return this.appendChild(d)
}if(d==a){return false
}if(this.fireEvent("beforeinsert",this.ownerTree,this,d,a)===false){return false
}var g=this.childNodes.indexOf(a);
var e=d.parentNode;
var c=g;
if(e==this&&this.childNodes.indexOf(d)<g){c--
}if(e){if(d.fireEvent("beforemove",d.getOwnerTree(),d,e,this,g,a)===false){return false
}e.removeChild(d)
}if(c==0){this.setFirstChild(d)
}this.childNodes.splice(c,0,d);
d.parentNode=this;
var b=this.childNodes[c-1];
if(b){d.previousSibling=b;
b.nextSibling=d
}else{d.previousSibling=null
}d.nextSibling=a;
a.previousSibling=d;
d.setOwnerTree(this.getOwnerTree());
this.fireEvent("insert",this.ownerTree,this,d,a);
if(e){d.fireEvent("move",this.ownerTree,d,e,this,c,a)
}return d
},remove:function(){this.parentNode.removeChild(this);
return this
},item:function(a){return this.childNodes[a]
},replaceChild:function(a,b){this.insertBefore(a,b);
this.removeChild(b);
return b
},indexOf:function(a){return this.childNodes.indexOf(a)
},getOwnerTree:function(){if(!this.ownerTree){var a=this;
while(a){if(a.ownerTree){this.ownerTree=a.ownerTree;
break
}a=a.parentNode
}}return this.ownerTree
},getDepth:function(){var b=0;
var a=this;
while(a.parentNode){++b;
a=a.parentNode
}return b
},setOwnerTree:function(d){if(d!=this.ownerTree){if(this.ownerTree){this.ownerTree.unregisterNode(this)
}this.ownerTree=d;
var b=this.childNodes;
for(var c=0,a=b.length;
c<a;
c++){b[c].setOwnerTree(d)
}if(d){d.registerNode(this)
}}},getPath:function(d){d=d||"id";
var b=this.parentNode;
var a=[this.attributes[d]];
while(b){a.unshift(b.attributes[d]);
b=b.parentNode
}var c=this.getOwnerTree().pathSeparator;
return c+a.join(c)
},bubble:function(c,d,a){var b=this;
while(b){if(c.apply(d||b,a||[b])===false){break
}b=b.parentNode
}},cascade:function(b,c,g){if(b.apply(c||this,g||[this])!==false){var d=this.childNodes;
for(var e=0,a=d.length;
e<a;
e++){d[e].cascade(b,c,g)
}}},eachChild:function(b,c,g){var d=this.childNodes;
for(var e=0,a=d.length;
e<a;
e++){if(b.apply(c||this,g||[d[e]])===false){break
}}},findChild:function(c,b){var d=this.childNodes;
for(var e=0,a=d.length;
e<a;
e++){if(d[e].attributes[c]==b){return d[e]
}}return null
},findChildBy:function(b,c){var d=this.childNodes;
for(var e=0,a=d.length;
e<a;
e++){if(b.call(c||d[e],d[e])===true){return d[e]
}}return null
},sort:function(d,e){var g=this.childNodes;
var a=g.length;
if(a>0){var c=e?function(){d.apply(e,arguments)
}:d;
g.sort(c);
for(var h=0;
h<a;
h++){var b=g[h];
b.previousSibling=g[h-1];
b.nextSibling=g[h+1];
if(h==0){this.setFirstChild(b)
}if(h==a-1){this.setLastChild(b)
}}}},contains:function(a){return a.isAncestor(this)
},isAncestor:function(a){var b=this.parentNode;
while(b){if(b==a){return true
}b=b.parentNode
}return false
},toString:function(){return"[Node"+(this.id?" "+this.id:"")+"]"
}});
Ext.data.GroupingStore=Ext.extend(Ext.data.Store,{remoteGroup:false,groupOnSort:false,clearGrouping:function(){this.groupField=false;
if(this.remoteGroup){if(this.baseParams){delete this.baseParams.groupBy
}this.reload()
}else{this.applySort();
this.fireEvent("datachanged",this)
}},groupBy:function(b,c){if(this.groupField==b&&!c){return
}this.groupField=b;
if(this.remoteGroup){if(!this.baseParams){this.baseParams={}
}this.baseParams.groupBy=b
}if(this.groupOnSort){this.sort(b);
return
}if(this.remoteGroup){this.reload()
}else{var a=this.sortInfo||{};
if(a.field!=b){this.applySort()
}else{this.sortData(b)
}this.fireEvent("datachanged",this)
}},applySort:function(){Ext.data.GroupingStore.superclass.applySort.call(this);
if(!this.groupOnSort&&!this.remoteGroup){var a=this.getGroupState();
if(a&&a!=this.sortInfo.field){this.sortData(this.groupField)
}}},applyGrouping:function(a){if(this.groupField!==false){this.groupBy(this.groupField,true);
return true
}else{if(a===true){this.fireEvent("datachanged",this)
}return false
}},getGroupState:function(){return this.groupOnSort&&this.groupField!==false?(this.sortInfo?this.sortInfo.field:undefined):this.groupField
}});
Ext.ComponentMgr=function(){var b=new Ext.util.MixedCollection();
var a={};
return{register:function(c){b.add(c)
},unregister:function(c){b.remove(c)
},get:function(c){return b.get(c)
},onAvailable:function(c,d,e){b.on("add",function(h,g){if(g.id==c){d.call(e||g,g);
b.un("add",d,e)
}})
},all:b,registerType:function(c,d){a[c]=d;
d.xtype=c
},create:function(d,c){return new a[d.xtype||c](d)
}}
}();
Ext.reg=Ext.ComponentMgr.registerType;
Ext.Component=function(c){c=c||{};
if(c.initialConfig){if(c.isAction){this.baseAction=c
}c=c.initialConfig
}else{if(c.tagName||c.dom||typeof c=="string"){c={applyTo:c,id:c.id||c}
}}this.initialConfig=c;
Ext.apply(this,c);
this.addEvents("disable","enable","beforeshow","show","beforehide","hide","beforerender","render","beforedestroy","destroy","beforestaterestore","staterestore","beforestatesave","statesave");
this.getId();
Ext.ComponentMgr.register(this);
Ext.Component.superclass.constructor.call(this);
if(this.baseAction){this.baseAction.addComponent(this)
}this.initComponent();
if(this.plugins){if(Ext.isArray(this.plugins)){for(var b=0,a=this.plugins.length;
b<a;
b++){this.plugins[b].init(this)
}}else{this.plugins.init(this)
}}if(this.stateful!==false){this.initState(c)
}if(this.applyTo){this.applyToMarkup(this.applyTo);
delete this.applyTo
}else{if(this.renderTo){this.render(this.renderTo);
delete this.renderTo
}}};
Ext.Component.AUTO_ID=1000;
Ext.extend(Ext.Component,Ext.util.Observable,{disabledClass:"x-item-disabled",allowDomMove:true,autoShow:false,hideMode:"display",hideParent:false,hidden:false,disabled:false,rendered:false,ctype:"Ext.Component",actionMode:"el",getActionEl:function(){return this[this.actionMode]
},initComponent:Ext.emptyFn,render:function(b,a){if(!this.rendered&&this.fireEvent("beforerender",this)!==false){if(!b&&this.el){this.el=Ext.get(this.el);
b=this.el.dom.parentNode;
this.allowDomMove=false
}this.container=Ext.get(b);
if(this.ctCls){this.container.addClass(this.ctCls)
}this.rendered=true;
if(a!==undefined){if(typeof a=="number"){a=this.container.dom.childNodes[a]
}else{a=Ext.getDom(a)
}}this.onRender(this.container,a||null);
if(this.autoShow){this.el.removeClass(["x-hidden","x-hide-"+this.hideMode])
}if(this.cls){this.el.addClass(this.cls);
delete this.cls
}if(this.style){this.el.applyStyles(this.style);
delete this.style
}this.fireEvent("render",this);
this.afterRender(this.container);
if(this.hidden){this.hide()
}if(this.disabled){this.disable()
}this.initStateEvents()
}return this
},initState:function(a){if(Ext.state.Manager){var b=Ext.state.Manager.get(this.stateId||this.id);
if(b){if(this.fireEvent("beforestaterestore",this,b)!==false){this.applyState(b);
this.fireEvent("staterestore",this,b)
}}}},initStateEvents:function(){if(this.stateEvents){for(var a=0,b;
b=this.stateEvents[a];
a++){this.on(b,this.saveState,this,{delay:100})
}}},applyState:function(b,a){if(b){Ext.apply(this,b)
}},getState:function(){return null
},saveState:function(){if(Ext.state.Manager){var a=this.getState();
if(this.fireEvent("beforestatesave",this,a)!==false){Ext.state.Manager.set(this.stateId||this.id,a);
this.fireEvent("statesave",this,a)
}}},applyToMarkup:function(a){this.allowDomMove=false;
this.el=Ext.get(a);
this.render(this.el.dom.parentNode)
},addClass:function(a){if(this.el){this.el.addClass(a)
}else{this.cls=this.cls?this.cls+" "+a:a
}},removeClass:function(a){if(this.el){this.el.removeClass(a)
}else{if(this.cls){this.cls=this.cls.split(" ").remove(a).join(" ")
}}},onRender:function(c,a){if(this.autoEl){if(typeof this.autoEl=="string"){this.el=document.createElement(this.autoEl)
}else{var b=document.createElement("div");
Ext.DomHelper.overwrite(b,this.autoEl);
this.el=b.firstChild
}if(!this.el.id){this.el.id=this.getId()
}}if(this.el){this.el=Ext.get(this.el);
if(this.allowDomMove!==false){c.dom.insertBefore(this.el.dom,a)
}}},getAutoCreate:function(){var a=typeof this.autoCreate=="object"?this.autoCreate:Ext.apply({},this.defaultAutoCreate);
if(this.id&&!a.id){a.id=this.id
}return a
},afterRender:Ext.emptyFn,destroy:function(){if(this.fireEvent("beforedestroy",this)!==false){this.beforeDestroy();
if(this.rendered){this.el.removeAllListeners();
this.el.remove();
if(this.actionMode=="container"){this.container.remove()
}}this.onDestroy();
Ext.ComponentMgr.unregister(this);
this.fireEvent("destroy",this);
this.purgeListeners()
}},beforeDestroy:Ext.emptyFn,onDestroy:Ext.emptyFn,getEl:function(){return this.el
},getId:function(){return this.id||(this.id="ext-comp-"+(++Ext.Component.AUTO_ID))
},getItemId:function(){return this.itemId||this.getId()
},focus:function(b,a){if(a){this.focus.defer(typeof a=="number"?a:10,this,[b,false]);
return
}if(this.rendered){this.el.focus();
if(b===true){this.el.dom.select()
}}return this
},blur:function(){if(this.rendered){this.el.blur()
}return this
},disable:function(){if(this.rendered){this.onDisable()
}this.disabled=true;
this.fireEvent("disable",this);
return this
},onDisable:function(){this.getActionEl().addClass(this.disabledClass);
this.el.dom.disabled=true
},enable:function(){if(this.rendered){this.onEnable()
}this.disabled=false;
this.fireEvent("enable",this);
return this
},onEnable:function(){this.getActionEl().removeClass(this.disabledClass);
this.el.dom.disabled=false
},setDisabled:function(a){this[a?"disable":"enable"]()
},show:function(){if(this.fireEvent("beforeshow",this)!==false){this.hidden=false;
if(this.autoRender){this.render(typeof this.autoRender=="boolean"?Ext.getBody():this.autoRender)
}if(this.rendered){this.onShow()
}this.fireEvent("show",this)
}return this
},onShow:function(){if(this.hideParent){this.container.removeClass("x-hide-"+this.hideMode)
}else{this.getActionEl().removeClass("x-hide-"+this.hideMode)
}},hide:function(){if(this.fireEvent("beforehide",this)!==false){this.hidden=true;
if(this.rendered){this.onHide()
}this.fireEvent("hide",this)
}return this
},onHide:function(){if(this.hideParent){this.container.addClass("x-hide-"+this.hideMode)
}else{this.getActionEl().addClass("x-hide-"+this.hideMode)
}},setVisible:function(a){if(a){this.show()
}else{this.hide()
}return this
},isVisible:function(){return this.rendered&&this.getActionEl().isVisible()
},cloneConfig:function(c){c=c||{};
var b=c.id||Ext.id();
var a=Ext.applyIf(c,this.initialConfig);
a.id=b;
return new this.constructor(a)
},getXType:function(){return this.constructor.xtype
},isXType:function(b,a){return !a?("/"+this.getXTypes()+"/").indexOf("/"+b+"/")!=-1:this.constructor.xtype==b
},getXTypes:function(){var a=this.constructor;
if(!a.xtypes){var b=[],c=this;
while(c&&c.constructor.xtype){b.unshift(c.constructor.xtype);
c=c.constructor.superclass
}a.xtypeChain=b;
a.xtypes=b.join("/")
}return a.xtypes
},findParentBy:function(a){for(var b=this.ownerCt;
(b!=null)&&!a(b,this);
b=b.ownerCt){}return b||null
},findParentByType:function(a){return typeof a=="function"?this.findParentBy(function(b){return b.constructor===a
}):this.findParentBy(function(b){return b.constructor.xtype===a
})
}});
Ext.reg("component",Ext.Component);
Ext.Action=function(a){this.initialConfig=a;
this.items=[]
};
Ext.Action.prototype={isAction:true,setText:function(a){this.initialConfig.text=a;
this.callEach("setText",[a])
},getText:function(){return this.initialConfig.text
},setIconClass:function(a){this.initialConfig.iconCls=a;
this.callEach("setIconClass",[a])
},getIconClass:function(){return this.initialConfig.iconCls
},setDisabled:function(a){this.initialConfig.disabled=a;
this.callEach("setDisabled",[a])
},enable:function(){this.setDisabled(false)
},disable:function(){this.setDisabled(true)
},isDisabled:function(){return this.initialConfig.disabled
},setHidden:function(a){this.initialConfig.hidden=a;
this.callEach("setVisible",[!a])
},show:function(){this.setHidden(false)
},hide:function(){this.setHidden(true)
},isHidden:function(){return this.initialConfig.hidden
},setHandler:function(b,a){this.initialConfig.handler=b;
this.initialConfig.scope=a;
this.callEach("setHandler",[b,a])
},each:function(b,a){Ext.each(this.items,b,a)
},callEach:function(b,e){var c=this.items;
for(var d=0,a=c.length;
d<a;
d++){c[d][b].apply(c[d],e)
}},addComponent:function(a){this.items.push(a);
a.on("destroy",this.removeComponent,this)
},removeComponent:function(a){this.items.remove(a)
},execute:function(){this.initialConfig.handler.apply(this.initialConfig.scope||window,arguments)
}};
(function(){Ext.Layer=function(h,i){h=h||{};
var g=Ext.DomHelper;
var d=h.parentEl,e=d?Ext.getDom(d):document.body;
if(i){this.dom=Ext.getDom(i)
}if(!this.dom){var c=h.dh||{tag:"div",cls:"x-layer"};
this.dom=g.append(e,c)
}if(h.cls){this.addClass(h.cls)
}this.constrain=h.constrain!==false;
this.visibilityMode=Ext.Element.VISIBILITY;
if(h.id){this.id=this.dom.id=h.id
}else{this.id=Ext.id(this.dom)
}this.zindex=h.zindex||this.getZIndex();
this.position("absolute",this.zindex);
if(h.shadow){this.shadowOffset=h.shadowOffset||4;
this.shadow=new Ext.Shadow({offset:this.shadowOffset,mode:h.shadow})
}else{this.shadowOffset=0
}this.useShim=h.shim!==false&&Ext.useShims;
this.useDisplay=h.useDisplay;
this.hide()
};
var a=Ext.Element.prototype;
var b=[];
Ext.extend(Ext.Layer,Ext.Element,{getZIndex:function(){return this.zindex||parseInt(this.getStyle("z-index"),10)||11000
},getShim:function(){if(!this.useShim){return null
}if(this.shim){return this.shim
}var c=b.shift();
if(!c){c=this.createShim();
c.enableDisplayMode("block");
c.dom.style.display="none";
c.dom.style.visibility="visible"
}var d=this.dom.parentNode;
if(c.dom.parentNode!=d){d.insertBefore(c.dom,this.dom)
}c.setStyle("z-index",this.getZIndex()-2);
this.shim=c;
return c
},hideShim:function(){if(this.shim){this.shim.setDisplayed(false);
b.push(this.shim);
delete this.shim
}},disableShadow:function(){if(this.shadow){this.shadowDisabled=true;
this.shadow.hide();
this.lastShadowOffset=this.shadowOffset;
this.shadowOffset=0
}},enableShadow:function(c){if(this.shadow){this.shadowDisabled=false;
this.shadowOffset=this.lastShadowOffset;
delete this.lastShadowOffset;
if(c){this.sync(true)
}}},sync:function(d){var h=this.shadow;
if(!this.updating&&this.isVisible()&&(h||this.useShim)){var l=this.getShim();
var i=this.getWidth(),m=this.getHeight();
var c=this.getLeft(true),g=this.getTop(true);
if(h&&!this.shadowDisabled){if(d&&!h.isVisible()){h.show(this)
}else{h.realign(c,g,i,m)
}if(l){if(d){l.show()
}var k=h.adjusts,e=l.dom.style;
e.left=(Math.min(c,c+k.l))+"px";
e.top=(Math.min(g,g+k.t))+"px";
e.width=(i+k.w)+"px";
e.height=(m+k.h)+"px"
}}else{if(l){if(d){l.show()
}l.setSize(i,m);
l.setLeftTop(c,g)
}}}},destroy:function(){this.hideShim();
if(this.shadow){this.shadow.hide()
}this.removeAllListeners();
Ext.removeNode(this.dom);
Ext.Element.uncache(this.id)
},remove:function(){this.destroy()
},beginUpdate:function(){this.updating=true
},endUpdate:function(){this.updating=false;
this.sync(true)
},hideUnders:function(c){if(this.shadow){this.shadow.hide()
}this.hideShim()
},constrainXY:function(){if(this.constrain){var l=Ext.lib.Dom.getViewWidth(),d=Ext.lib.Dom.getViewHeight();
var e=Ext.getDoc().getScroll();
var g=this.getXY();
var k=g[0],m=g[1];
var i=this.dom.offsetWidth+this.shadowOffset,c=this.dom.offsetHeight+this.shadowOffset;
var n=false;
if((k+i)>l+e.left){k=l-i-this.shadowOffset;
n=true
}if((m+c)>d+e.top){m=d-c-this.shadowOffset;
n=true
}if(k<e.left){k=e.left;
n=true
}if(m<e.top){m=e.top;
n=true
}if(n){if(this.avoidY){var h=this.avoidY;
if(m<=h&&(m+c)>=h){m=h-c-5
}}g=[k,m];
this.storeXY(g);
a.setXY.call(this,g);
this.sync()
}}},isVisible:function(){return this.visible
},showAction:function(){this.visible=true;
if(this.useDisplay===true){this.setDisplayed("")
}else{if(this.lastXY){a.setXY.call(this,this.lastXY)
}else{if(this.lastLT){a.setLeftTop.call(this,this.lastLT[0],this.lastLT[1])
}}}},hideAction:function(){this.visible=false;
if(this.useDisplay===true){this.setDisplayed(false)
}else{this.setLeftTop(-10000,-10000)
}},setVisible:function(g,h,d,c,e){if(g){this.showAction()
}if(h&&g){var i=function(){this.sync(true);
if(c){c()
}}.createDelegate(this);
a.setVisible.call(this,true,true,d,i,e)
}else{if(!g){this.hideUnders(true)
}var i=c;
if(h){i=function(){this.hideAction();
if(c){c()
}}.createDelegate(this)
}a.setVisible.call(this,g,h,d,i,e);
if(g){this.sync(true)
}else{if(!h){this.hideAction()
}}}},storeXY:function(c){delete this.lastLT;
this.lastXY=c
},storeLeftTop:function(c,d){delete this.lastXY;
this.lastLT=[c,d]
},beforeFx:function(){this.beforeAction();
return Ext.Layer.superclass.beforeFx.apply(this,arguments)
},afterFx:function(){Ext.Layer.superclass.afterFx.apply(this,arguments);
this.sync(this.isVisible())
},beforeAction:function(){if(!this.updating&&this.shadow){this.shadow.hide()
}},setLeft:function(c){this.storeLeftTop(c,this.getTop(true));
a.setLeft.apply(this,arguments);
this.sync()
},setTop:function(c){this.storeLeftTop(this.getLeft(true),c);
a.setTop.apply(this,arguments);
this.sync()
},setLeftTop:function(c,d){this.storeLeftTop(c,d);
a.setLeftTop.apply(this,arguments);
this.sync()
},setXY:function(e,h,d,c,g){this.fixDisplay();
this.beforeAction();
this.storeXY(e);
var i=this.createCB(c);
a.setXY.call(this,e,h,d,i,g);
if(!h){i()
}},createCB:function(c){var d=this;
return function(){d.constrainXY();
d.sync(true);
if(c){c()
}}
},setX:function(h,g,d,c,e){this.setXY([h,this.getY()],g,d,c,e)
},setY:function(c,h,e,d,g){this.setXY([this.getX(),c],h,e,d,g)
},setSize:function(h,g,i,d,c,e){this.beforeAction();
var k=this.createCB(c);
a.setSize.call(this,h,g,i,d,k,e);
if(!i){k()
}},setWidth:function(g,h,d,c,e){this.beforeAction();
var i=this.createCB(c);
a.setWidth.call(this,g,h,d,i,e);
if(!h){i()
}},setHeight:function(g,h,d,c,e){this.beforeAction();
var i=this.createCB(c);
a.setHeight.call(this,g,h,d,i,e);
if(!h){i()
}},setBounds:function(g,i,e,c,h,l,k,m){this.beforeAction();
var d=this.createCB(k);
if(!h){this.storeXY([g,i]);
a.setXY.call(this,[g,i]);
a.setSize.call(this,e,c,h,l,d,m);
d()
}else{a.setBounds.call(this,g,i,e,c,h,l,d,m)
}return this
},setZIndex:function(c){this.zindex=c;
this.setStyle("z-index",c+2);
if(this.shadow){this.shadow.setZIndex(c+1)
}if(this.shim){this.shim.setStyle("z-index",c)
}}})
})();
Ext.Shadow=function(c){Ext.apply(this,c);
if(typeof this.mode!="string"){this.mode=this.defaultMode
}var b=this.offset,d={h:0};
var a=Math.floor(this.offset/2);
switch(this.mode.toLowerCase()){case"drop":d.w=0;
d.l=d.t=b;
d.t-=1;
if(Ext.isIE){d.l-=this.offset+a;
d.t-=this.offset+a;
d.w-=a;
d.h-=a;
d.t+=1
}break;
case"sides":d.w=(b*2);
d.l=-b;
d.t=b-1;
if(Ext.isIE){d.l-=(this.offset-a);
d.t-=this.offset+a;
d.l+=1;
d.w-=(this.offset-a)*2;
d.w-=a+1;
d.h-=1
}break;
case"frame":d.w=d.h=(b*2);
d.l=d.t=-b;
d.t+=1;
d.h-=2;
if(Ext.isIE){d.l-=(this.offset-a);
d.t-=(this.offset-a);
d.l+=1;
d.w-=(this.offset+a+1);
d.h-=(this.offset+a);
d.h+=1
}break
}this.adjusts=d
};
Ext.Shadow.prototype={offset:4,defaultMode:"drop",show:function(a){a=Ext.get(a);
if(!this.el){this.el=Ext.Shadow.Pool.pull();
if(this.el.dom.nextSibling!=a.dom){this.el.insertBefore(a)
}}this.el.setStyle("z-index",this.zIndex||parseInt(a.getStyle("z-index"),10)-1);
if(Ext.isIE){this.el.dom.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="+(this.offset)+")"
}this.realign(a.getLeft(true),a.getTop(true),a.getWidth(),a.getHeight());
this.el.dom.style.display="block"
},isVisible:function(){return this.el?true:false
},realign:function(d,g,h,a){if(!this.el){return
}var l=this.adjusts,n=this.el.dom,e=n.style;
var p=0;
e.left=(d+l.l)+"px";
e.top=(g+l.t)+"px";
var i=(h+l.w),b=(a+l.h),o=i+"px",k=b+"px";
if(e.width!=o||e.height!=k){e.width=o;
e.height=k;
if(!Ext.isIE){var m=n.childNodes;
var c=Math.max(0,(i-12))+"px";
m[0].childNodes[1].style.width=c;
m[1].childNodes[1].style.width=c;
m[2].childNodes[1].style.width=c;
m[1].style.height=Math.max(0,(b-12))+"px"
}}},hide:function(){if(this.el){this.el.dom.style.display="none";
Ext.Shadow.Pool.push(this.el);
delete this.el
}},setZIndex:function(a){this.zIndex=a;
if(this.el){this.el.setStyle("z-index",a)
}}};
Ext.Shadow.Pool=function(){var b=[];
var a=Ext.isIE?'<div class="x-ie-shadow"></div>':'<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
return{pull:function(){var c=b.shift();
if(!c){c=Ext.get(Ext.DomHelper.insertHtml("beforeBegin",document.body.firstChild,a));
c.autoBoxAdjust=false
}return c
},push:function(c){b.push(c)
}}
}();
Ext.BoxComponent=Ext.extend(Ext.Component,{initComponent:function(){Ext.BoxComponent.superclass.initComponent.call(this);
this.addEvents("resize","move")
},boxReady:false,deferHeight:false,setSize:function(g,d){if(typeof g=="object"){d=g.height;
g=g.width
}if(!this.boxReady){this.width=g;
this.height=d;
return this
}if(this.lastSize&&this.lastSize.width==g&&this.lastSize.height==d){return this
}this.lastSize={width:g,height:d};
var e=this.adjustSize(g,d);
var b=e.width,a=e.height;
if(b!==undefined||a!==undefined){var c=this.getResizeEl();
if(!this.deferHeight&&b!==undefined&&a!==undefined){c.setSize(b,a)
}else{if(!this.deferHeight&&a!==undefined){c.setHeight(a)
}else{if(b!==undefined){c.setWidth(b)
}}}this.onResize(b,a,g,d);
this.fireEvent("resize",this,b,a,g,d)
}return this
},setWidth:function(a){return this.setSize(a)
},setHeight:function(a){return this.setSize(undefined,a)
},getSize:function(){return this.el.getSize()
},getPosition:function(a){if(a===true){return[this.el.getLeft(true),this.el.getTop(true)]
}return this.xy||this.el.getXY()
},getBox:function(a){var c=this.el.getSize();
if(a===true){c.x=this.el.getLeft(true);
c.y=this.el.getTop(true)
}else{var b=this.xy||this.el.getXY();
c.x=b[0];
c.y=b[1]
}return c
},updateBox:function(a){this.setSize(a.width,a.height);
this.setPagePosition(a.x,a.y);
return this
},getResizeEl:function(){return this.resizeEl||this.el
},getPositionEl:function(){return this.positionEl||this.el
},setPosition:function(a,b){if(a&&typeof a[1]=="number"){b=a[1];
a=a[0]
}this.x=a;
this.y=b;
if(!this.boxReady){return this
}var g=this.adjustPosition(a,b);
var c=g.x,d=g.y;
var e=this.getPositionEl();
if(c!==undefined||d!==undefined){if(c!==undefined&&d!==undefined){e.setLeftTop(c,d)
}else{if(c!==undefined){e.setLeft(c)
}else{if(d!==undefined){e.setTop(d)
}}}this.onPosition(c,d);
this.fireEvent("move",this,c,d)
}return this
},setPagePosition:function(a,b){if(a&&typeof a[1]=="number"){b=a[1];
a=a[0]
}this.pageX=a;
this.pageY=b;
if(!this.boxReady){return
}if(a===undefined||b===undefined){return
}var c=this.el.translatePoints(a,b);
this.setPosition(c.left,c.top);
return this
},onRender:function(b,a){Ext.BoxComponent.superclass.onRender.call(this,b,a);
if(this.resizeEl){this.resizeEl=Ext.get(this.resizeEl)
}if(this.positionEl){this.positionEl=Ext.get(this.positionEl)
}},afterRender:function(){Ext.BoxComponent.superclass.afterRender.call(this);
this.boxReady=true;
this.setSize(this.width,this.height);
if(this.x||this.y){this.setPosition(this.x,this.y)
}else{if(this.pageX||this.pageY){this.setPagePosition(this.pageX,this.pageY)
}}},syncSize:function(){delete this.lastSize;
this.setSize(this.autoWidth?undefined:this.el.getWidth(),this.autoHeight?undefined:this.el.getHeight());
return this
},onResize:function(b,d,a,c){},onPosition:function(a,b){},adjustSize:function(a,b){if(this.autoWidth){a="auto"
}if(this.autoHeight){b="auto"
}return{width:a,height:b}
},adjustPosition:function(a,b){return{x:a,y:b}
}});
Ext.reg("box",Ext.BoxComponent);
Ext.SplitBar=function(d,b,e,c,a){this.el=Ext.get(d,true);
this.el.dom.unselectable="on";
this.resizingEl=Ext.get(b,true);
this.orientation=e||Ext.SplitBar.HORIZONTAL;
this.minSize=0;
this.maxSize=2000;
this.animate=false;
this.useShim=false;
this.shim=null;
if(!a){this.proxy=Ext.SplitBar.createProxy(this.orientation)
}else{this.proxy=Ext.get(a).dom
}this.dd=new Ext.dd.DDProxy(this.el.dom.id,"XSplitBars",{dragElId:this.proxy.id});
this.dd.b4StartDrag=this.onStartProxyDrag.createDelegate(this);
this.dd.endDrag=this.onEndProxyDrag.createDelegate(this);
this.dragSpecs={};
this.adapter=new Ext.SplitBar.BasicLayoutAdapter();
this.adapter.init(this);
if(this.orientation==Ext.SplitBar.HORIZONTAL){this.placement=c||(this.el.getX()>this.resizingEl.getX()?Ext.SplitBar.LEFT:Ext.SplitBar.RIGHT);
this.el.addClass("x-splitbar-h")
}else{this.placement=c||(this.el.getY()>this.resizingEl.getY()?Ext.SplitBar.TOP:Ext.SplitBar.BOTTOM);
this.el.addClass("x-splitbar-v")
}this.addEvents("resize","moved","beforeresize","beforeapply");
Ext.SplitBar.superclass.constructor.call(this)
};
Ext.extend(Ext.SplitBar,Ext.util.Observable,{onStartProxyDrag:function(a,b){this.fireEvent("beforeresize",this);
this.overlay=Ext.DomHelper.append(document.body,{cls:"x-drag-overlay",html:"&#160;"},true);
this.overlay.unselectable();
this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.overlay.show();
Ext.get(this.proxy).setDisplayed("block");
var d=this.adapter.getElementSize(this);
this.activeMinSize=this.getMinimumSize();
this.activeMaxSize=this.getMaximumSize();
var c=d-this.activeMinSize;
var e=Math.max(this.activeMaxSize-d,0);
if(this.orientation==Ext.SplitBar.HORIZONTAL){this.dd.resetConstraints();
this.dd.setXConstraint(this.placement==Ext.SplitBar.LEFT?c:e,this.placement==Ext.SplitBar.LEFT?e:c);
this.dd.setYConstraint(0,0)
}else{this.dd.resetConstraints();
this.dd.setXConstraint(0,0);
this.dd.setYConstraint(this.placement==Ext.SplitBar.TOP?c:e,this.placement==Ext.SplitBar.TOP?e:c)
}this.dragSpecs.startSize=d;
this.dragSpecs.startPoint=[a,b];
Ext.dd.DDProxy.prototype.b4StartDrag.call(this.dd,a,b)
},onEndProxyDrag:function(b){Ext.get(this.proxy).setDisplayed(false);
var c=Ext.lib.Event.getXY(b);
if(this.overlay){this.overlay.remove();
delete this.overlay
}var a;
if(this.orientation==Ext.SplitBar.HORIZONTAL){a=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.LEFT?c[0]-this.dragSpecs.startPoint[0]:this.dragSpecs.startPoint[0]-c[0])
}else{a=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.TOP?c[1]-this.dragSpecs.startPoint[1]:this.dragSpecs.startPoint[1]-c[1])
}a=Math.min(Math.max(a,this.activeMinSize),this.activeMaxSize);
if(a!=this.dragSpecs.startSize){if(this.fireEvent("beforeapply",this,a)!==false){this.adapter.setElementSize(this,a);
this.fireEvent("moved",this,a);
this.fireEvent("resize",this,a)
}}},getAdapter:function(){return this.adapter
},setAdapter:function(a){this.adapter=a;
this.adapter.init(this)
},getMinimumSize:function(){return this.minSize
},setMinimumSize:function(a){this.minSize=a
},getMaximumSize:function(){return this.maxSize
},setMaximumSize:function(a){this.maxSize=a
},setCurrentSize:function(b){var a=this.animate;
this.animate=false;
this.adapter.setElementSize(this,b);
this.animate=a
},destroy:function(a){if(this.shim){this.shim.remove()
}this.dd.unreg();
Ext.removeNode(this.proxy);
if(a){this.el.remove()
}}});
Ext.SplitBar.createProxy=function(c){var b=new Ext.Element(document.createElement("div"));
b.unselectable();
var a="x-splitbar-proxy";
b.addClass(a+" "+(c==Ext.SplitBar.HORIZONTAL?a+"-h":a+"-v"));
document.body.appendChild(b.dom);
return b.dom
};
Ext.SplitBar.BasicLayoutAdapter=function(){};
Ext.SplitBar.BasicLayoutAdapter.prototype={init:function(a){},getElementSize:function(a){if(a.orientation==Ext.SplitBar.HORIZONTAL){return a.resizingEl.getWidth()
}else{return a.resizingEl.getHeight()
}},setElementSize:function(c,a,b){if(c.orientation==Ext.SplitBar.HORIZONTAL){if(!c.animate){c.resizingEl.setWidth(a);
if(b){b(c,a)
}}else{c.resizingEl.setWidth(a,true,0.1,b,"easeOut")
}}else{if(!c.animate){c.resizingEl.setHeight(a);
if(b){b(c,a)
}}else{c.resizingEl.setHeight(a,true,0.1,b,"easeOut")
}}}};
Ext.SplitBar.AbsoluteLayoutAdapter=function(a){this.basic=new Ext.SplitBar.BasicLayoutAdapter();
this.container=Ext.get(a)
};
Ext.SplitBar.AbsoluteLayoutAdapter.prototype={init:function(a){this.basic.init(a)
},getElementSize:function(a){return this.basic.getElementSize(a)
},setElementSize:function(c,a,b){this.basic.setElementSize(c,a,this.moveSplitter.createDelegate(this,[c]))
},moveSplitter:function(a){var b=Ext.SplitBar;
switch(a.placement){case b.LEFT:a.el.setX(a.resizingEl.getRight());
break;
case b.RIGHT:a.el.setStyle("right",(this.container.getWidth()-a.resizingEl.getLeft())+"px");
break;
case b.TOP:a.el.setY(a.resizingEl.getBottom());
break;
case b.BOTTOM:a.el.setY(a.resizingEl.getTop()-a.el.getHeight());
break
}}};
Ext.SplitBar.VERTICAL=1;
Ext.SplitBar.HORIZONTAL=2;
Ext.SplitBar.LEFT=1;
Ext.SplitBar.RIGHT=2;
Ext.SplitBar.TOP=3;
Ext.SplitBar.BOTTOM=4;
Ext.Container=Ext.extend(Ext.BoxComponent,{autoDestroy:true,defaultType:"panel",initComponent:function(){Ext.Container.superclass.initComponent.call(this);
this.addEvents("afterlayout","beforeadd","beforeremove","add","remove");
var a=this.items;
if(a){delete this.items;
if(Ext.isArray(a)){this.add.apply(this,a)
}else{this.add(a)
}}},initItems:function(){if(!this.items){this.items=new Ext.util.MixedCollection(false,this.getComponentId);
this.getLayout()
}},setLayout:function(a){if(this.layout&&this.layout!=a){this.layout.setContainer(null)
}this.initItems();
this.layout=a;
a.setContainer(this)
},render:function(){Ext.Container.superclass.render.apply(this,arguments);
if(this.layout){if(typeof this.layout=="string"){this.layout=new Ext.Container.LAYOUTS[this.layout.toLowerCase()](this.layoutConfig)
}this.setLayout(this.layout);
if(this.activeItem!==undefined){var a=this.activeItem;
delete this.activeItem;
this.layout.setActiveItem(a);
return
}}if(!this.ownerCt){this.doLayout()
}if(this.monitorResize===true){Ext.EventManager.onWindowResize(this.doLayout,this,[false])
}},getLayoutTarget:function(){return this.el
},getComponentId:function(a){return a.itemId||a.id
},add:function(e){if(!this.items){this.initItems()
}var g=arguments,a=g.length;
if(a>1){for(var d=0;
d<a;
d++){this.add(g[d])
}return
}var b=this.lookupComponent(this.applyDefaults(e));
var c=this.items.length;
if(this.fireEvent("beforeadd",this,b,c)!==false&&this.onBeforeAdd(b)!==false){this.items.add(b);
b.ownerCt=this;
this.fireEvent("add",this,b,c)
}return b
},insert:function(d,e){if(!this.items){this.initItems()
}var g=arguments,a=g.length;
if(a>2){for(var c=a-1;
c>=1;
--c){this.insert(d,g[c])
}return
}var b=this.lookupComponent(this.applyDefaults(e));
if(b.ownerCt==this&&this.items.indexOf(b)<d){--d
}if(this.fireEvent("beforeadd",this,b,d)!==false&&this.onBeforeAdd(b)!==false){this.items.insert(d,b);
b.ownerCt=this;
this.fireEvent("add",this,b,d)
}return b
},applyDefaults:function(a){if(this.defaults){if(typeof a=="string"){a=Ext.ComponentMgr.get(a);
Ext.apply(a,this.defaults)
}else{if(!a.events){Ext.applyIf(a,this.defaults)
}else{Ext.apply(a,this.defaults)
}}}return a
},onBeforeAdd:function(a){if(a.ownerCt){a.ownerCt.remove(a,false)
}if(this.hideBorders===true){a.border=(a.border===true)
}},remove:function(a,c){var b=this.getComponent(a);
if(b&&this.fireEvent("beforeremove",this,b)!==false){this.items.remove(b);
delete b.ownerCt;
if(c===true||(c!==false&&this.autoDestroy)){b.destroy()
}if(this.layout&&this.layout.activeItem==b){delete this.layout.activeItem
}this.fireEvent("remove",this,b)
}return b
},getComponent:function(a){if(typeof a=="object"){return a
}return this.items.get(a)
},lookupComponent:function(a){if(typeof a=="string"){return Ext.ComponentMgr.get(a)
}else{if(!a.events){return this.createComponent(a)
}}return a
},createComponent:function(a){return Ext.ComponentMgr.create(a,this.defaultType)
},doLayout:function(c){if(this.rendered&&this.layout){this.layout.layout()
}if(c!==false&&this.items){var d=this.items.items;
for(var e=0,a=d.length;
e<a;
e++){var b=d[e];
if(b.doLayout){b.doLayout()
}}}},getLayout:function(){if(!this.layout){var a=new Ext.layout.ContainerLayout(this.layoutConfig);
this.setLayout(a)
}return this.layout
},onDestroy:function(){if(this.items){var b=this.items.items;
for(var c=0,a=b.length;
c<a;
c++){Ext.destroy(b[c])
}}if(this.monitorResize){Ext.EventManager.removeResizeListener(this.doLayout,this)
}Ext.Container.superclass.onDestroy.call(this)
},bubble:function(c,d,a){var b=this;
while(b){if(c.apply(d||b,a||[b])===false){break
}b=b.ownerCt
}},cascade:function(b,c,g){if(b.apply(c||this,g||[this])!==false){if(this.items){var d=this.items.items;
for(var e=0,a=d.length;
e<a;
e++){if(d[e].cascade){d[e].cascade(b,c,g)
}else{b.apply(c||this,g||[d[e]])
}}}}},findById:function(b){var a,c=this;
this.cascade(function(d){if(c!=d&&d.id===b){a=d;
return false
}});
return a||null
},findByType:function(a){return typeof a=="function"?this.findBy(function(b){return b.constructor===a
}):this.findBy(function(b){return b.constructor.xtype===a
})
},find:function(b,a){return this.findBy(function(c){return c[b]===a
})
},findBy:function(b,c){var a=[],d=this;
this.cascade(function(e){if(d!=e&&b.call(c||e,e,d)===true){a.push(e)
}});
return a
}});
Ext.Container.LAYOUTS={};
Ext.reg("container",Ext.Container);
Ext.layout.ContainerLayout=function(a){Ext.apply(this,a)
};
Ext.layout.ContainerLayout.prototype={monitorResize:false,activeItem:null,layout:function(){var a=this.container.getLayoutTarget();
this.onLayout(this.container,a);
this.container.fireEvent("afterlayout",this.container,this)
},onLayout:function(a,b){this.renderAll(a,b)
},isValidParent:function(b,c){var a=b.getPositionEl?b.getPositionEl():b.getEl();
return a.dom.parentNode==c.dom
},renderAll:function(d,c){var g=d.items.items;
for(var e=0,a=g.length;
e<a;
e++){var b=g[e];
if(b&&(!b.rendered||!this.isValidParent(b,c))){this.renderItem(b,e,c)
}}},renderItem:function(b,a,c){if(b&&!b.rendered){b.render(c,a);
if(this.extraCls){var d=b.getPositionEl?b.getPositionEl():b;
d.addClass(this.extraCls)
}if(this.renderHidden&&b!=this.activeItem){b.hide()
}}else{if(b&&!this.isValidParent(b,c)){if(this.extraCls){b.addClass(this.extraCls)
}if(typeof a=="number"){a=c.dom.childNodes[a]
}c.dom.insertBefore(b.getEl().dom,a||null);
if(this.renderHidden&&b!=this.activeItem){b.hide()
}}}},onResize:function(){if(this.container.collapsed){return
}var a=this.container.bufferResize;
if(a){if(!this.resizeTask){this.resizeTask=new Ext.util.DelayedTask(this.layout,this);
this.resizeBuffer=typeof a=="number"?a:100
}this.resizeTask.delay(this.resizeBuffer)
}else{this.layout()
}},setContainer:function(a){if(this.monitorResize&&a!=this.container){if(this.container){this.container.un("resize",this.onResize,this)
}if(a){a.on("resize",this.onResize,this)
}}this.container=a
},parseMargins:function(c){var b=c.split(" ");
var a=b.length;
if(a==1){b[1]=b[0];
b[2]=b[0];
b[3]=b[0]
}if(a==2){b[2]=b[0];
b[3]=b[1]
}return{top:parseInt(b[0],10)||0,right:parseInt(b[1],10)||0,bottom:parseInt(b[2],10)||0,left:parseInt(b[3],10)||0}
}};
Ext.Container.LAYOUTS.auto=Ext.layout.ContainerLayout;
Ext.layout.FitLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,onLayout:function(a,b){Ext.layout.FitLayout.superclass.onLayout.call(this,a,b);
if(!this.container.collapsed){this.setItemSize(this.activeItem||a.items.itemAt(0),b.getStyleSize())
}},setItemSize:function(b,a){if(b&&a.height>0){b.setSize(a)
}}});
Ext.Container.LAYOUTS.fit=Ext.layout.FitLayout;
Ext.layout.CardLayout=Ext.extend(Ext.layout.FitLayout,{deferredRender:false,renderHidden:true,setActiveItem:function(a){a=this.container.getComponent(a);
if(this.activeItem!=a){if(this.activeItem){this.activeItem.hide()
}this.activeItem=a;
a.show();
this.layout()
}},renderAll:function(a,b){if(this.deferredRender){this.renderItem(this.activeItem,undefined,b)
}else{Ext.layout.CardLayout.superclass.renderAll.call(this,a,b)
}}});
Ext.Container.LAYOUTS.card=Ext.layout.CardLayout;
Ext.layout.AnchorLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,getAnchorViewSize:function(a,b){return b.dom==document.body?b.getViewSize():b.getStyleSize()
},onLayout:function(p,m){Ext.layout.AnchorLayout.superclass.onLayout.call(this,p,m);
var e=this.getAnchorViewSize(p,m);
var h=e.width,q=e.height;
if(h<20||q<20){return
}var c,k;
if(p.anchorSize){if(typeof p.anchorSize=="number"){c=p.anchorSize
}else{c=p.anchorSize.width;
k=p.anchorSize.height
}}else{c=p.initialConfig.width;
k=p.initialConfig.height
}var n=p.items.items,o=n.length,a,l,i,b,d;
for(a=0;
a<o;
a++){l=n[a];
if(l.anchor){i=l.anchorSpec;
if(!i){var g=l.anchor.split(" ");
l.anchorSpec=i={right:this.parseAnchor(g[0],l.initialConfig.width,c),bottom:this.parseAnchor(g[1],l.initialConfig.height,k)}
}b=i.right?this.adjustWidthAnchor(i.right(h),l):undefined;
d=i.bottom?this.adjustHeightAnchor(i.bottom(q),l):undefined;
if(b||d){l.setSize(b||undefined,d||undefined)
}}}},parseAnchor:function(g,b,a){if(g&&g!="none"){var d;
if(/^(r|right|b|bottom)$/i.test(g)){var c=a-b;
return function(h){if(h!==d){d=h;
return h-c
}}
}else{if(g.indexOf("%")!=-1){var e=parseFloat(g.replace("%",""))*0.01;
return function(h){if(h!==d){d=h;
return Math.floor(h*e)
}}
}else{g=parseInt(g,10);
if(!isNaN(g)){return function(h){if(h!==d){d=h;
return h+g
}}
}}}}return false
},adjustWidthAnchor:function(b,a){return b
},adjustHeightAnchor:function(b,a){return b
}});
Ext.Container.LAYOUTS.anchor=Ext.layout.AnchorLayout;
Ext.layout.ColumnLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,extraCls:"x-column",scrollOffset:0,isValidParent:function(b,a){return b.getEl().dom.parentNode==this.innerCt.dom
},onLayout:function(b,k){var a=b.items.items,l=a.length,i,d;
if(!this.innerCt){k.addClass("x-column-layout-ct");
this.innerCt=k.createChild({cls:"x-column-inner"});
this.innerCt.createChild({cls:"x-clear"})
}this.renderAll(b,this.innerCt);
var e=k.getViewSize();
if(e.width<1&&e.height<1){return
}var h=e.width-k.getPadding("lr")-this.scrollOffset,c=e.height-k.getPadding("tb"),g=h;
this.innerCt.setWidth(h);
for(d=0;
d<l;
d++){i=a[d];
if(!i.columnWidth){g-=(i.getSize().width+i.getEl().getMargins("lr"))
}}g=g<0?0:g;
for(d=0;
d<l;
d++){i=a[d];
if(i.columnWidth){i.setSize(Math.floor(i.columnWidth*g)-i.getEl().getMargins("lr"))
}}}});
Ext.Container.LAYOUTS.column=Ext.layout.ColumnLayout;
Ext.layout.BorderLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,rendered:false,onLayout:function(y,a){var x;
if(!this.rendered){a.position();
a.addClass("x-border-layout-ct");
var n=y.items.items;
x=[];
for(var i=0,h=n.length;
i<h;
i++){var d=n[i];
var u=d.region;
if(d.collapsed){x.push(d)
}d.collapsed=false;
if(!d.rendered){d.cls=d.cls?d.cls+" x-border-panel":"x-border-panel";
d.render(a,i)
}this[u]=u!="center"&&d.split?new Ext.layout.BorderLayout.SplitRegion(this,d.initialConfig,u):new Ext.layout.BorderLayout.Region(this,d.initialConfig,u);
this[u].render(a,d)
}this.rendered=true
}var o=a.getViewSize();
if(o.width<20||o.height<20){if(x){this.restoreCollapsed=x
}return
}else{if(this.restoreCollapsed){x=this.restoreCollapsed;
delete this.restoreCollapsed
}}var q=o.width,g=o.height;
var r=q,k=g,t=0,s=0;
var m=this.north,p=this.south,v=this.west,e=this.east,d=this.center;
if(!d){throw"No center region defined in BorderLayout "+y.id
}if(m&&m.isVisible()){var b=m.getSize();
var l=m.getMargins();
b.width=q-(l.left+l.right);
b.x=l.left;
b.y=l.top;
t=b.height+b.y+l.bottom;
k-=t;
m.applyLayout(b)
}if(p&&p.isVisible()){var b=p.getSize();
var l=p.getMargins();
b.width=q-(l.left+l.right);
b.x=l.left;
var c=(b.height+l.top+l.bottom);
b.y=g-c+l.top;
k-=c;
p.applyLayout(b)
}if(v&&v.isVisible()){var b=v.getSize();
var l=v.getMargins();
b.height=k-(l.top+l.bottom);
b.x=l.left;
b.y=t+l.top;
var z=(b.width+l.left+l.right);
s+=z;
r-=z;
v.applyLayout(b)
}if(e&&e.isVisible()){var b=e.getSize();
var l=e.getMargins();
b.height=k-(l.top+l.bottom);
var z=(b.width+l.left+l.right);
b.x=q-z+l.left;
b.y=t+l.top;
r-=z;
e.applyLayout(b)
}var l=d.getMargins();
var w={x:s+l.left,y:t+l.top,width:r-(l.left+l.right),height:k-(l.top+l.bottom)};
d.applyLayout(w);
if(x){for(var i=0,h=x.length;
i<h;
i++){x[i].collapse(false)
}}if(Ext.isIE&&Ext.isStrict){a.repaint()
}}});
Ext.layout.BorderLayout.Region=function(c,a,b){Ext.apply(this,a);
this.layout=c;
this.position=b;
this.state={};
if(typeof this.margins=="string"){this.margins=this.layout.parseMargins(this.margins)
}this.margins=Ext.applyIf(this.margins||{},this.defaultMargins);
if(this.collapsible){if(typeof this.cmargins=="string"){this.cmargins=this.layout.parseMargins(this.cmargins)
}if(this.collapseMode=="mini"&&!this.cmargins){this.cmargins={left:0,top:0,right:0,bottom:0}
}else{this.cmargins=Ext.applyIf(this.cmargins||{},b=="north"||b=="south"?this.defaultNSCMargins:this.defaultEWCMargins)
}}};
Ext.layout.BorderLayout.Region.prototype={collapsible:false,split:false,floatable:true,minWidth:50,minHeight:50,defaultMargins:{left:0,top:0,right:0,bottom:0},defaultNSCMargins:{left:5,top:5,right:5,bottom:5},defaultEWCMargins:{left:5,top:0,right:5,bottom:0},isCollapsed:false,render:function(d,c){this.panel=c;
c.el.enableDisplayMode();
this.targetEl=d;
this.el=c.el;
var a=c.getState,b=this.position;
c.getState=function(){return Ext.apply(a.call(c)||{},this.state)
}.createDelegate(this);
if(b!="center"){c.allowQueuedExpand=false;
c.on({beforecollapse:this.beforeCollapse,collapse:this.onCollapse,beforeexpand:this.beforeExpand,expand:this.onExpand,hide:this.onHide,show:this.onShow,scope:this});
if(this.collapsible){c.collapseEl="el";
c.slideAnchor=this.getSlideAnchor()
}if(c.tools&&c.tools.toggle){c.tools.toggle.addClass("x-tool-collapse-"+b);
c.tools.toggle.addClassOnOver("x-tool-collapse-"+b+"-over")
}}},getCollapsedEl:function(){if(!this.collapsedEl){if(!this.toolTemplate){var b=new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
b.disableFormats=true;
b.compile();
Ext.layout.BorderLayout.Region.prototype.toolTemplate=b
}this.collapsedEl=this.targetEl.createChild({cls:"x-layout-collapsed x-layout-collapsed-"+this.position,id:this.panel.id+"-xcollapsed"});
this.collapsedEl.enableDisplayMode("block");
if(this.collapseMode=="mini"){this.collapsedEl.addClass("x-layout-cmini-"+this.position);
this.miniCollapsedEl=this.collapsedEl.createChild({cls:"x-layout-mini x-layout-mini-"+this.position,html:"&#160;"});
this.miniCollapsedEl.addClassOnOver("x-layout-mini-over");
this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
this.collapsedEl.on("click",this.onExpandClick,this,{stopEvent:true})
}else{var a=this.toolTemplate.append(this.collapsedEl.dom,{id:"expand-"+this.position},true);
a.addClassOnOver("x-tool-expand-"+this.position+"-over");
a.on("click",this.onExpandClick,this,{stopEvent:true});
if(this.floatable!==false){this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
this.collapsedEl.on("click",this.collapseClick,this)
}}}return this.collapsedEl
},onExpandClick:function(a){if(this.isSlid){this.afterSlideIn();
this.panel.expand(false)
}else{this.panel.expand()
}},onCollapseClick:function(a){this.panel.collapse()
},beforeCollapse:function(b,a){this.lastAnim=a;
if(this.splitEl){this.splitEl.hide()
}this.getCollapsedEl().show();
this.panel.el.setStyle("z-index",100);
this.isCollapsed=true;
this.layout.layout()
},onCollapse:function(a){this.panel.el.setStyle("z-index",1);
if(this.lastAnim===false||this.panel.animCollapse===false){this.getCollapsedEl().dom.style.visibility="visible"
}else{this.getCollapsedEl().slideIn(this.panel.slideAnchor,{duration:0.2})
}this.state.collapsed=true;
this.panel.saveState()
},beforeExpand:function(a){var b=this.getCollapsedEl();
this.el.show();
if(this.position=="east"||this.position=="west"){this.panel.setSize(undefined,b.getHeight())
}else{this.panel.setSize(b.getWidth(),undefined)
}b.hide();
b.dom.style.visibility="hidden";
this.panel.el.setStyle("z-index",100)
},onExpand:function(){this.isCollapsed=false;
if(this.splitEl){this.splitEl.show()
}this.layout.layout();
this.panel.el.setStyle("z-index",1);
this.state.collapsed=false;
this.panel.saveState()
},collapseClick:function(a){if(this.isSlid){a.stopPropagation();
this.slideIn()
}else{a.stopPropagation();
this.slideOut()
}},onHide:function(){if(this.isCollapsed){this.getCollapsedEl().hide()
}else{if(this.splitEl){this.splitEl.hide()
}}},onShow:function(){if(this.isCollapsed){this.getCollapsedEl().show()
}else{if(this.splitEl){this.splitEl.show()
}}},isVisible:function(){return !this.panel.hidden
},getMargins:function(){return this.isCollapsed&&this.cmargins?this.cmargins:this.margins
},getSize:function(){return this.isCollapsed?this.getCollapsedEl().getSize():this.panel.getSize()
},setPanel:function(a){this.panel=a
},getMinWidth:function(){return this.minWidth
},getMinHeight:function(){return this.minHeight
},applyLayoutCollapsed:function(a){var b=this.getCollapsedEl();
b.setLeftTop(a.x,a.y);
b.setSize(a.width,a.height)
},applyLayout:function(a){if(this.isCollapsed){this.applyLayoutCollapsed(a)
}else{this.panel.setPosition(a.x,a.y);
this.panel.setSize(a.width,a.height)
}},beforeSlide:function(){this.panel.beforeEffect()
},afterSlide:function(){this.panel.afterEffect()
},initAutoHide:function(){if(this.autoHide!==false){if(!this.autoHideHd){var a=new Ext.util.DelayedTask(this.slideIn,this);
this.autoHideHd={mouseout:function(b){if(!b.within(this.el,true)){a.delay(500)
}},mouseover:function(b){a.cancel()
},scope:this}
}this.el.on(this.autoHideHd)
}},clearAutoHide:function(){if(this.autoHide!==false){this.el.un("mouseout",this.autoHideHd.mouseout);
this.el.un("mouseover",this.autoHideHd.mouseover)
}},clearMonitor:function(){Ext.getDoc().un("click",this.slideInIf,this)
},slideOut:function(){if(this.isSlid||this.el.hasActiveFx()){return
}this.isSlid=true;
var a=this.panel.tools;
if(a&&a.toggle){a.toggle.hide()
}this.el.show();
if(this.position=="east"||this.position=="west"){this.panel.setSize(undefined,this.collapsedEl.getHeight())
}else{this.panel.setSize(this.collapsedEl.getWidth(),undefined)
}this.restoreLT=[this.el.dom.style.left,this.el.dom.style.top];
this.el.alignTo(this.collapsedEl,this.getCollapseAnchor());
this.el.setStyle("z-index",102);
if(this.animFloat!==false){this.beforeSlide();
this.el.slideIn(this.getSlideAnchor(),{callback:function(){this.afterSlide();
this.initAutoHide();
Ext.getDoc().on("click",this.slideInIf,this)
},scope:this,block:true})
}else{this.initAutoHide();
Ext.getDoc().on("click",this.slideInIf,this)
}},afterSlideIn:function(){this.clearAutoHide();
this.isSlid=false;
this.clearMonitor();
this.el.setStyle("z-index","");
this.el.dom.style.left=this.restoreLT[0];
this.el.dom.style.top=this.restoreLT[1];
var a=this.panel.tools;
if(a&&a.toggle){a.toggle.show()
}},slideIn:function(a){if(!this.isSlid||this.el.hasActiveFx()){Ext.callback(a);
return
}this.isSlid=false;
if(this.animFloat!==false){this.beforeSlide();
this.el.slideOut(this.getSlideAnchor(),{callback:function(){this.el.hide();
this.afterSlide();
this.afterSlideIn();
Ext.callback(a)
},scope:this,block:true})
}else{this.el.hide();
this.afterSlideIn()
}},slideInIf:function(a){if(!a.within(this.el)){this.slideIn()
}},anchors:{west:"left",east:"right",north:"top",south:"bottom"},sanchors:{west:"l",east:"r",north:"t",south:"b"},canchors:{west:"tl-tr",east:"tr-tl",north:"tl-bl",south:"bl-tl"},getAnchor:function(){return this.anchors[this.position]
},getCollapseAnchor:function(){return this.canchors[this.position]
},getSlideAnchor:function(){return this.sanchors[this.position]
},getAlignAdj:function(){var a=this.cmargins;
switch(this.position){case"west":return[0,0];
break;
case"east":return[0,0];
break;
case"north":return[0,0];
break;
case"south":return[0,0];
break
}},getExpandAdj:function(){var b=this.collapsedEl,a=this.cmargins;
switch(this.position){case"west":return[-(a.right+b.getWidth()+a.left),0];
break;
case"east":return[a.right+b.getWidth()+a.left,0];
break;
case"north":return[0,-(a.top+a.bottom+b.getHeight())];
break;
case"south":return[0,a.top+a.bottom+b.getHeight()];
break
}}};
Ext.layout.BorderLayout.SplitRegion=function(c,a,b){Ext.layout.BorderLayout.SplitRegion.superclass.constructor.call(this,c,a,b);
this.applyLayout=this.applyFns[b]
};
Ext.extend(Ext.layout.BorderLayout.SplitRegion,Ext.layout.BorderLayout.Region,{splitTip:"Drag to resize.",collapsibleSplitTip:"Drag to resize. Double click to hide.",useSplitTips:false,splitSettings:{north:{orientation:Ext.SplitBar.VERTICAL,placement:Ext.SplitBar.TOP,maxFn:"getVMaxSize",minProp:"minHeight",maxProp:"maxHeight"},south:{orientation:Ext.SplitBar.VERTICAL,placement:Ext.SplitBar.BOTTOM,maxFn:"getVMaxSize",minProp:"minHeight",maxProp:"maxHeight"},east:{orientation:Ext.SplitBar.HORIZONTAL,placement:Ext.SplitBar.RIGHT,maxFn:"getHMaxSize",minProp:"minWidth",maxProp:"maxWidth"},west:{orientation:Ext.SplitBar.HORIZONTAL,placement:Ext.SplitBar.LEFT,maxFn:"getHMaxSize",minProp:"minWidth",maxProp:"maxWidth"}},applyFns:{west:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var b=this.splitEl.dom,d=b.style;
this.panel.setPosition(c.x,c.y);
var a=b.offsetWidth;
d.left=(c.x+c.width-a)+"px";
d.top=(c.y)+"px";
d.height=Math.max(0,c.height)+"px";
this.panel.setSize(c.width-a,c.height)
},east:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var b=this.splitEl.dom,d=b.style;
var a=b.offsetWidth;
this.panel.setPosition(c.x+a,c.y);
d.left=(c.x)+"px";
d.top=(c.y)+"px";
d.height=Math.max(0,c.height)+"px";
this.panel.setSize(c.width-a,c.height)
},north:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var b=this.splitEl.dom,d=b.style;
var a=b.offsetHeight;
this.panel.setPosition(c.x,c.y);
d.left=(c.x)+"px";
d.top=(c.y+c.height-a)+"px";
d.width=Math.max(0,c.width)+"px";
this.panel.setSize(c.width,c.height-a)
},south:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var b=this.splitEl.dom,d=b.style;
var a=b.offsetHeight;
this.panel.setPosition(c.x,c.y+a);
d.left=(c.x)+"px";
d.top=(c.y)+"px";
d.width=Math.max(0,c.width)+"px";
this.panel.setSize(c.width,c.height-a)
}},render:function(a,c){Ext.layout.BorderLayout.SplitRegion.superclass.render.call(this,a,c);
var b=this.position;
this.splitEl=a.createChild({cls:"x-layout-split x-layout-split-"+b,html:"&#160;",id:this.panel.id+"-xsplit"});
if(this.collapseMode=="mini"){this.miniSplitEl=this.splitEl.createChild({cls:"x-layout-mini x-layout-mini-"+b,html:"&#160;"});
this.miniSplitEl.addClassOnOver("x-layout-mini-over");
this.miniSplitEl.on("click",this.onCollapseClick,this,{stopEvent:true})
}var d=this.splitSettings[b];
this.split=new Ext.SplitBar(this.splitEl.dom,c.el,d.orientation);
this.split.placement=d.placement;
this.split.getMaximumSize=this[d.maxFn].createDelegate(this);
this.split.minSize=this.minSize||this[d.minProp];
this.split.on("beforeapply",this.onSplitMove,this);
this.split.useShim=this.useShim===true;
this.maxSize=this.maxSize||this[d.maxProp];
if(c.hidden){this.splitEl.hide()
}if(this.useSplitTips){this.splitEl.dom.title=this.collapsible?this.collapsibleSplitTip:this.splitTip
}if(this.collapsible){this.splitEl.on("dblclick",this.onCollapseClick,this)
}},getSize:function(){if(this.isCollapsed){return this.collapsedEl.getSize()
}var a=this.panel.getSize();
if(this.position=="north"||this.position=="south"){a.height+=this.splitEl.dom.offsetHeight
}else{a.width+=this.splitEl.dom.offsetWidth
}return a
},getHMaxSize:function(){var b=this.maxSize||10000;
var a=this.layout.center;
return Math.min(b,(this.el.getWidth()+a.el.getWidth())-a.getMinWidth())
},getVMaxSize:function(){var b=this.maxSize||10000;
var a=this.layout.center;
return Math.min(b,(this.el.getHeight()+a.el.getHeight())-a.getMinHeight())
},onSplitMove:function(c,a){var b=this.panel.getSize();
this.lastSplitSize=a;
if(this.position=="north"||this.position=="south"){this.panel.setSize(b.width,a);
this.state.height=a
}else{this.panel.setSize(a,b.height);
this.state.width=a
}this.layout.layout();
this.panel.saveState();
return false
},getSplitBar:function(){return this.split
}});
Ext.Container.LAYOUTS.border=Ext.layout.BorderLayout;
Ext.layout.FormLayout=Ext.extend(Ext.layout.AnchorLayout,{labelSeparator:":",getAnchorViewSize:function(a,b){return a.body.getStyleSize()
},setContainer:function(c){Ext.layout.FormLayout.superclass.setContainer.call(this,c);
if(c.labelAlign){c.addClass("x-form-label-"+c.labelAlign)
}if(c.hideLabels){this.labelStyle="display:none";
this.elementStyle="padding-left:0;";
this.labelAdjust=0
}else{this.labelSeparator=c.labelSeparator||this.labelSeparator;
c.labelWidth=c.labelWidth||100;
if(typeof c.labelWidth=="number"){var b=(typeof c.labelPad=="number"?c.labelPad:5);
this.labelAdjust=c.labelWidth+b;
this.labelStyle="width:"+c.labelWidth+"px;";
this.elementStyle="padding-left:"+(c.labelWidth+b)+"px"
}if(c.labelAlign=="top"){this.labelStyle="width:auto;";
this.labelAdjust=0;
this.elementStyle="padding-left:0;"
}}if(!this.fieldTpl){var a=new Ext.Template('<div class="x-form-item {5}" tabIndex="-1">','<label for="{0}" style="{2}" class="x-form-item-label">{1}{4}</label>','<div class="x-form-element" id="x-form-el-{0}" style="{3}">','</div><div class="{6}"></div>',"</div>");
a.disableFormats=true;
a.compile();
Ext.layout.FormLayout.prototype.fieldTpl=a
}},renderItem:function(b,a,c){if(b&&!b.rendered&&b.isFormField&&b.inputType!="hidden"){var d=[b.id,b.fieldLabel,b.labelStyle||this.labelStyle||"",this.elementStyle||"",typeof b.labelSeparator=="undefined"?this.labelSeparator:b.labelSeparator,(b.itemCls||this.container.itemCls||"")+(b.hideLabel?" x-hide-label":""),b.clearCls||"x-form-clear-left"];
if(typeof a=="number"){a=c.dom.childNodes[a]||null
}if(a){this.fieldTpl.insertBefore(a,d)
}else{this.fieldTpl.append(c,d)
}b.render("x-form-el-"+b.id)
}else{Ext.layout.FormLayout.superclass.renderItem.apply(this,arguments)
}},adjustWidthAnchor:function(b,a){return b-(a.isFormField?(a.hideLabel?0:this.labelAdjust):0)
},isValidParent:function(b,a){return true
}});
Ext.Container.LAYOUTS.form=Ext.layout.FormLayout;
Ext.layout.Accordion=Ext.extend(Ext.layout.FitLayout,{fill:true,autoWidth:true,titleCollapse:true,hideCollapseTool:false,collapseFirst:false,animate:false,sequence:false,activeOnTop:false,renderItem:function(a){if(this.animate===false){a.animCollapse=false
}a.collapsible=true;
if(this.autoWidth){a.autoWidth=true
}if(this.titleCollapse){a.titleCollapse=true
}if(this.hideCollapseTool){a.hideCollapseTool=true
}if(this.collapseFirst!==undefined){a.collapseFirst=this.collapseFirst
}if(!this.activeItem&&!a.collapsed){this.activeItem=a
}else{if(this.activeItem){a.collapsed=true
}}Ext.layout.Accordion.superclass.renderItem.apply(this,arguments);
a.header.addClass("x-accordion-hd");
a.on("beforeexpand",this.beforeExpand,this)
},beforeExpand:function(b,c){var a=this.activeItem;
if(a){if(this.sequence){delete this.activeItem;
a.collapse({callback:function(){b.expand(c||true)
},scope:this});
return false
}else{a.collapse(this.animate)
}}this.activeItem=b;
if(this.activeOnTop){b.el.dom.parentNode.insertBefore(b.el.dom,b.el.dom.parentNode.firstChild)
}this.layout()
},setItemSize:function(c,d){if(this.fill&&c){var h=this.container.items.items;
var e=0;
for(var g=0,a=h.length;
g<a;
g++){var b=h[g];
if(b!=c){e+=(b.getSize().height-b.bwrap.getHeight())
}}d.height-=e;
c.setSize(d)
}}});
Ext.Container.LAYOUTS.accordion=Ext.layout.Accordion;
Ext.layout.TableLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:false,setContainer:function(a){Ext.layout.TableLayout.superclass.setContainer.call(this,a);
this.currentRow=0;
this.currentColumn=0;
this.cells=[]
},onLayout:function(e,c){var d=e.items.items,a=d.length,b,g;
if(!this.table){c.addClass("x-table-layout-ct");
this.table=c.createChild({tag:"table",cls:"x-table-layout",cellspacing:0,cn:{tag:"tbody"}},null,true);
this.renderAll(e,c)
}},getRow:function(a){var b=this.table.tBodies[0].childNodes[a];
if(!b){b=document.createElement("tr");
this.table.tBodies[0].appendChild(b)
}return b
},getNextCell:function(b){var a=this.getNextNonSpan(this.currentColumn,this.currentRow);
var e=this.currentColumn=a[0],g=this.currentRow=a[1];
for(var c=g;
c<g+(b.rowspan||1);
c++){if(!this.cells[c]){this.cells[c]=[]
}for(var h=e;
h<e+(b.colspan||1);
h++){this.cells[c][h]=true
}}var d=document.createElement("td");
if(b.cellId){d.id=b.cellId
}var i="x-table-layout-cell";
if(b.cellCls){i+=" "+b.cellCls
}d.className=i;
if(b.colspan){d.colSpan=b.colspan
}if(b.rowspan){d.rowSpan=b.rowspan
}this.getRow(g).appendChild(d);
return d
},getNextNonSpan:function(a,b){var c=this.columns;
while((c&&a>=c)||(this.cells[b]&&this.cells[b][a])){if(c&&a>=c){b++;
a=0
}else{a++
}}return[a,b]
},renderItem:function(b,a,c){if(b&&!b.rendered){b.render(this.getNextCell(b))
}},isValidParent:function(b,a){return true
}});
Ext.Container.LAYOUTS.table=Ext.layout.TableLayout;
Ext.layout.AbsoluteLayout=Ext.extend(Ext.layout.AnchorLayout,{extraCls:"x-abs-layout-item",isForm:false,setContainer:function(a){Ext.layout.AbsoluteLayout.superclass.setContainer.call(this,a);
if(a.isXType("form")){this.isForm=true
}},onLayout:function(a,b){if(this.isForm){a.body.position()
}else{b.position()
}Ext.layout.AbsoluteLayout.superclass.onLayout.call(this,a,b)
},getAnchorViewSize:function(a,b){return this.isForm?a.body.getStyleSize():Ext.layout.AbsoluteLayout.superclass.getAnchorViewSize.call(this,a,b)
},isValidParent:function(b,a){return this.isForm?true:Ext.layout.AbsoluteLayout.superclass.isValidParent.call(this,b,a)
},adjustWidthAnchor:function(b,a){return b?b-a.getPosition(true)[0]:b
},adjustHeightAnchor:function(b,a){return b?b-a.getPosition(true)[1]:b
}});
Ext.Container.LAYOUTS.absolute=Ext.layout.AbsoluteLayout;
Ext.Viewport=Ext.extend(Ext.Container,{initComponent:function(){Ext.Viewport.superclass.initComponent.call(this);
document.getElementsByTagName("html")[0].className+=" x-viewport";
this.el=Ext.getBody();
this.el.setHeight=Ext.emptyFn;
this.el.setWidth=Ext.emptyFn;
this.el.setSize=Ext.emptyFn;
this.el.dom.scroll="no";
this.allowDomMove=false;
this.autoWidth=true;
this.autoHeight=true;
Ext.EventManager.onWindowResize(this.fireResize,this);
this.renderTo=this.el
},fireResize:function(a,b){this.fireEvent("resize",this,a,b,a,b)
}});
Ext.reg("viewport",Ext.Viewport);
Ext.Panel=Ext.extend(Ext.Container,{baseCls:"x-panel",collapsedCls:"x-panel-collapsed",maskDisabled:true,animCollapse:Ext.enableFx,headerAsText:true,buttonAlign:"right",collapsed:false,collapseFirst:true,minButtonWidth:75,elements:"body",toolTarget:"header",collapseEl:"bwrap",slideAnchor:"t",deferHeight:true,expandDefaults:{duration:0.25},collapseDefaults:{duration:0.25},initComponent:function(){Ext.Panel.superclass.initComponent.call(this);
this.addEvents("bodyresize","titlechange","collapse","expand","beforecollapse","beforeexpand","beforeclose","close","activate","deactivate");
if(this.tbar){this.elements+=",tbar";
if(typeof this.tbar=="object"){this.topToolbar=this.tbar
}delete this.tbar
}if(this.bbar){this.elements+=",bbar";
if(typeof this.bbar=="object"){this.bottomToolbar=this.bbar
}delete this.bbar
}if(this.header===true){this.elements+=",header";
delete this.header
}else{if(this.title&&this.header!==false){this.elements+=",header"
}}if(this.footer===true){this.elements+=",footer";
delete this.footer
}if(this.buttons){var b=this.buttons;
this.buttons=[];
for(var c=0,a=b.length;
c<a;
c++){if(b[c].render){this.buttons.push(b[c])
}else{this.addButton(b[c])
}}}if(this.autoLoad){this.on("render",this.doAutoLoad,this,{delay:10})
}},createElement:function(a,b){if(this[a]){b.appendChild(this[a].dom);
return
}if(a==="bwrap"||this.elements.indexOf(a)!=-1){if(this[a+"Cfg"]){this[a]=Ext.fly(b).createChild(this[a+"Cfg"])
}else{var c=document.createElement("div");
c.className=this[a+"Cls"];
this[a]=Ext.get(b.appendChild(c))
}}},onRender:function(o,p){Ext.Panel.superclass.onRender.call(this,o,p);
this.createClasses();
if(this.el){this.el.addClass(this.baseCls);
this.header=this.el.down("."+this.headerCls);
this.bwrap=this.el.down("."+this.bwrapCls);
var i=this.bwrap?this.bwrap:this.el;
this.tbar=i.down("."+this.tbarCls);
this.body=i.down("."+this.bodyCls);
this.bbar=i.down("."+this.bbarCls);
this.footer=i.down("."+this.footerCls);
this.fromMarkup=true
}else{this.el=o.createChild({id:this.id,cls:this.baseCls},p)
}var d=this.el,l=d.dom;
if(this.cls){this.el.addClass(this.cls)
}if(this.buttons){this.elements+=",footer"
}if(this.frame){d.insertHtml("afterBegin",String.format(Ext.Element.boxMarkup,this.baseCls));
this.createElement("header",l.firstChild.firstChild.firstChild);
this.createElement("bwrap",l);
var g=this.bwrap.dom;
var r=l.childNodes[1],c=l.childNodes[2];
g.appendChild(r);
g.appendChild(c);
var e=g.firstChild.firstChild.firstChild;
this.createElement("tbar",e);
this.createElement("body",e);
this.createElement("bbar",e);
this.createElement("footer",g.lastChild.firstChild.firstChild);
if(!this.footer){this.bwrap.dom.lastChild.className+=" x-panel-nofooter"
}}else{this.createElement("header",l);
this.createElement("bwrap",l);
var g=this.bwrap.dom;
this.createElement("tbar",g);
this.createElement("body",g);
this.createElement("bbar",g);
this.createElement("footer",g);
if(!this.header){this.body.addClass(this.bodyCls+"-noheader");
if(this.tbar){this.tbar.addClass(this.tbarCls+"-noheader")
}}}if(this.border===false){this.el.addClass(this.baseCls+"-noborder");
this.body.addClass(this.bodyCls+"-noborder");
if(this.header){this.header.addClass(this.headerCls+"-noborder")
}if(this.footer){this.footer.addClass(this.footerCls+"-noborder")
}if(this.tbar){this.tbar.addClass(this.tbarCls+"-noborder")
}if(this.bbar){this.bbar.addClass(this.bbarCls+"-noborder")
}}if(this.bodyBorder===false){this.body.addClass(this.bodyCls+"-noborder")
}if(this.bodyStyle){this.body.applyStyles(this.bodyStyle)
}this.bwrap.enableDisplayMode("block");
if(this.header){this.header.unselectable();
if(this.headerAsText){this.header.dom.innerHTML='<span class="'+this.headerTextCls+'">'+this.header.dom.innerHTML+"</span>";
if(this.iconCls){this.setIconClass(this.iconCls)
}}}if(this.floating){this.makeFloating(this.floating)
}if(this.collapsible){this.tools=this.tools?this.tools.slice(0):[];
if(!this.hideCollapseTool){this.tools[this.collapseFirst?"unshift":"push"]({id:"toggle",handler:this.toggleCollapse,scope:this})
}if(this.titleCollapse&&this.header){this.header.on("click",this.toggleCollapse,this);
this.header.setStyle("cursor","pointer")
}}if(this.tools){var m=this.tools;
this.tools={};
this.addTool.apply(this,m)
}else{this.tools={}
}if(this.buttons&&this.buttons.length>0){var a=this.footer.createChild({cls:"x-panel-btns-ct",cn:{cls:"x-panel-btns x-panel-btns-"+this.buttonAlign,html:'<table cellspacing="0"><tbody><tr></tr></tbody></table><div class="x-clear"></div>'}},null,true);
var k=a.getElementsByTagName("tr")[0];
for(var q=0,n=this.buttons.length;
q<n;
q++){var h=this.buttons[q];
var b=document.createElement("td");
b.className="x-panel-btn-td";
h.render(k.appendChild(b))
}}if(this.tbar&&this.topToolbar){if(Ext.isArray(this.topToolbar)){this.topToolbar=new Ext.Toolbar(this.topToolbar)
}this.topToolbar.render(this.tbar)
}if(this.bbar&&this.bottomToolbar){if(Ext.isArray(this.bottomToolbar)){this.bottomToolbar=new Ext.Toolbar(this.bottomToolbar)
}this.bottomToolbar.render(this.bbar)
}},setIconClass:function(d){var a=this.iconCls;
this.iconCls=d;
if(this.rendered&&this.header){if(this.frame){this.header.addClass("x-panel-icon");
this.header.replaceClass(a,this.iconCls)
}else{var b=this.header.dom;
var c=b.firstChild&&String(b.firstChild.tagName).toLowerCase()=="img"?b.firstChild:null;
if(c){Ext.fly(c).replaceClass(a,this.iconCls)
}else{Ext.DomHelper.insertBefore(b.firstChild,{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-panel-inline-icon "+this.iconCls})
}}}},makeFloating:function(a){this.floating=true;
this.el=new Ext.Layer(typeof a=="object"?a:{shadow:this.shadow!==undefined?this.shadow:"sides",shadowOffset:this.shadowOffset,constrain:false,shim:this.shim===false?false:undefined},this.el)
},getTopToolbar:function(){return this.topToolbar
},getBottomToolbar:function(){return this.bottomToolbar
},addButton:function(a,c,d){var b={handler:c,scope:d,minWidth:this.minButtonWidth,hideParent:true};
if(typeof a=="string"){b.text=a
}else{Ext.apply(b,a)
}var e=new Ext.Button(b);
e.ownerCt=this;
if(!this.buttons){this.buttons=[]
}this.buttons.push(e);
return e
},addTool:function(){if(!this[this.toolTarget]){return
}if(!this.toolTemplate){var c=new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
c.disableFormats=true;
c.compile();
Ext.Panel.prototype.toolTemplate=c
}for(var d=0,g=arguments,h=g.length;
d<h;
d++){var a=g[d],b="x-tool-"+a.id+"-over";
var e=this.toolTemplate.insertFirst(this[this.toolTarget],a,true);
this.tools[a.id]=e;
e.enableDisplayMode("block");
e.on("click",this.createToolHandler(e,a,b,this));
if(a.on){e.on(a.on)
}if(a.hidden){e.hide()
}if(a.qtip){if(typeof a.qtip=="object"){Ext.QuickTips.register(Ext.apply({target:e.id},a.qtip))
}else{e.dom.qtip=a.qtip
}}e.addClassOnOver(b)
}},onShow:function(){if(this.floating){return this.el.show()
}Ext.Panel.superclass.onShow.call(this)
},onHide:function(){if(this.floating){return this.el.hide()
}Ext.Panel.superclass.onHide.call(this)
},createToolHandler:function(c,a,b,d){return function(e){c.removeClass(b);
e.stopEvent();
if(a.handler){a.handler.call(a.scope||c,e,c,d)
}}
},afterRender:function(){if(this.fromMarkup&&this.height===undefined&&!this.autoHeight){this.height=this.el.getHeight()
}if(this.floating&&!this.hidden&&!this.initHidden){this.el.show()
}if(this.title){this.setTitle(this.title)
}this.setAutoScroll();
if(this.html){this.body.update(typeof this.html=="object"?Ext.DomHelper.markup(this.html):this.html);
delete this.html
}if(this.contentEl){var a=Ext.getDom(this.contentEl);
Ext.fly(a).removeClass(["x-hidden","x-hide-display"]);
this.body.dom.appendChild(a)
}if(this.collapsed){this.collapsed=false;
this.collapse(false)
}Ext.Panel.superclass.afterRender.call(this);
this.initEvents()
},setAutoScroll:function(){if(this.rendered&&this.autoScroll){this.body.setOverflow("auto")
}},getKeyMap:function(){if(!this.keyMap){this.keyMap=new Ext.KeyMap(this.el,this.keys)
}return this.keyMap
},initEvents:function(){if(this.keys){this.getKeyMap()
}if(this.draggable){this.initDraggable()
}},initDraggable:function(){this.dd=new Ext.Panel.DD(this,typeof this.draggable=="boolean"?null:this.draggable)
},beforeEffect:function(){if(this.floating){this.el.beforeAction()
}this.el.addClass("x-panel-animated")
},afterEffect:function(){this.syncShadow();
this.el.removeClass("x-panel-animated")
},createEffect:function(d,a,c){var b={scope:c,block:true};
if(d===true){b.callback=a;
return b
}else{if(!d.callback){b.callback=a
}else{b.callback=function(){a.call(c);
Ext.callback(d.callback,d.scope)
}
}}return Ext.applyIf(b,d)
},collapse:function(b){if(this.collapsed||this.el.hasFxBlock()||this.fireEvent("beforecollapse",this,b)===false){return
}var a=b===true||(b!==false&&this.animCollapse);
this.beforeEffect();
this.onCollapse(a,b);
return this
},onCollapse:function(a,b){if(a){this[this.collapseEl].slideOut(this.slideAnchor,Ext.apply(this.createEffect(b||true,this.afterCollapse,this),this.collapseDefaults))
}else{this[this.collapseEl].hide();
this.afterCollapse()
}},afterCollapse:function(){this.collapsed=true;
this.el.addClass(this.collapsedCls);
this.afterEffect();
this.fireEvent("collapse",this)
},expand:function(b){if(!this.collapsed||this.el.hasFxBlock()||this.fireEvent("beforeexpand",this,b)===false){return
}var a=b===true||(b!==false&&this.animCollapse);
this.el.removeClass(this.collapsedCls);
this.beforeEffect();
this.onExpand(a,b);
return this
},onExpand:function(a,b){if(a){this[this.collapseEl].slideIn(this.slideAnchor,Ext.apply(this.createEffect(b||true,this.afterExpand,this),this.expandDefaults))
}else{this[this.collapseEl].show();
this.afterExpand()
}},afterExpand:function(){this.collapsed=false;
this.afterEffect();
this.fireEvent("expand",this)
},toggleCollapse:function(a){this[this.collapsed?"expand":"collapse"](a);
return this
},onDisable:function(){if(this.rendered&&this.maskDisabled){this.el.mask()
}Ext.Panel.superclass.onDisable.call(this)
},onEnable:function(){if(this.rendered&&this.maskDisabled){this.el.unmask()
}Ext.Panel.superclass.onEnable.call(this)
},onResize:function(a,b){if(a!==undefined||b!==undefined){if(!this.collapsed){if(typeof a=="number"){this.body.setWidth(this.adjustBodyWidth(a-this.getFrameWidth()))
}else{if(a=="auto"){this.body.setWidth(a)
}}if(typeof b=="number"){this.body.setHeight(this.adjustBodyHeight(b-this.getFrameHeight()))
}else{if(b=="auto"){this.body.setHeight(b)
}}}else{this.queuedBodySize={width:a,height:b};
if(!this.queuedExpand&&this.allowQueuedExpand!==false){this.queuedExpand=true;
this.on("expand",function(){delete this.queuedExpand;
this.onResize(this.queuedBodySize.width,this.queuedBodySize.height);
this.doLayout()
},this,{single:true})
}}this.fireEvent("bodyresize",this,a,b)
}this.syncShadow()
},adjustBodyHeight:function(a){return a
},adjustBodyWidth:function(a){return a
},onPosition:function(){this.syncShadow()
},onDestroy:function(){if(this.tools){for(var b in this.tools){Ext.destroy(this.tools[b])
}}if(this.buttons){for(var a in this.buttons){Ext.destroy(this.buttons[a])
}}Ext.destroy(this.topToolbar,this.bottomToolbar);
Ext.Panel.superclass.onDestroy.call(this)
},getFrameWidth:function(){var c=this.el.getFrameWidth("lr");
if(this.frame){var a=this.bwrap.dom.firstChild;
c+=(Ext.fly(a).getFrameWidth("l")+Ext.fly(a.firstChild).getFrameWidth("r"));
var b=this.bwrap.dom.firstChild.firstChild.firstChild;
c+=Ext.fly(b).getFrameWidth("lr")
}return c
},getFrameHeight:function(){var a=this.el.getFrameWidth("tb");
a+=(this.tbar?this.tbar.getHeight():0)+(this.bbar?this.bbar.getHeight():0);
if(this.frame){var c=this.el.dom.firstChild;
var b=this.bwrap.dom.lastChild;
a+=(c.offsetHeight+b.offsetHeight);
var d=this.bwrap.dom.firstChild.firstChild.firstChild;
a+=Ext.fly(d).getFrameWidth("tb")
}else{a+=(this.header?this.header.getHeight():0)+(this.footer?this.footer.getHeight():0)
}return a
},getInnerWidth:function(){return this.getSize().width-this.getFrameWidth()
},getInnerHeight:function(){return this.getSize().height-this.getFrameHeight()
},syncShadow:function(){if(this.floating){this.el.sync(true)
}},getLayoutTarget:function(){return this.body
},setTitle:function(b,a){this.title=b;
if(this.header&&this.headerAsText){this.header.child("span").update(b)
}if(a){this.setIconClass(a)
}this.fireEvent("titlechange",this,b);
return this
},getUpdater:function(){return this.body.getUpdater()
},load:function(){var a=this.body.getUpdater();
a.update.apply(a,arguments);
return this
},beforeDestroy:function(){Ext.Element.uncache(this.header,this.tbar,this.bbar,this.footer,this.body)
},createClasses:function(){this.headerCls=this.baseCls+"-header";
this.headerTextCls=this.baseCls+"-header-text";
this.bwrapCls=this.baseCls+"-bwrap";
this.tbarCls=this.baseCls+"-tbar";
this.bodyCls=this.baseCls+"-body";
this.bbarCls=this.baseCls+"-bbar";
this.footerCls=this.baseCls+"-footer"
},createGhost:function(a,b,e){var c=document.createElement("div");
c.className="x-panel-ghost "+(a?a:"");
if(this.header){c.appendChild(this.el.dom.firstChild.cloneNode(true))
}Ext.fly(c.appendChild(document.createElement("ul"))).setHeight(this.bwrap.getHeight());
c.style.width=this.el.dom.offsetWidth+"px";
if(!e){this.container.dom.appendChild(c)
}else{Ext.getDom(e).appendChild(c)
}if(b!==false&&this.el.useShim!==false){var d=new Ext.Layer({shadow:false,useDisplay:true,constrain:false},c);
d.show();
return d
}else{return new Ext.Element(c)
}},doAutoLoad:function(){this.body.load(typeof this.autoLoad=="object"?this.autoLoad:{url:this.autoLoad})
}});
Ext.reg("panel",Ext.Panel);
Ext.Window=Ext.extend(Ext.Panel,{baseCls:"x-window",resizable:true,draggable:true,closable:true,constrain:false,constrainHeader:false,plain:false,minimizable:false,maximizable:false,minHeight:100,minWidth:200,expandOnShow:true,closeAction:"close",collapsible:false,initHidden:true,monitorResize:true,elements:"header,body",frame:true,floating:true,initComponent:function(){Ext.Window.superclass.initComponent.call(this);
this.addEvents("resize","maximize","minimize","restore")
},getState:function(){return Ext.apply(Ext.Window.superclass.getState.call(this)||{},this.getBox())
},onRender:function(b,a){Ext.Window.superclass.onRender.call(this,b,a);
if(this.plain){this.el.addClass("x-window-plain")
}this.focusEl=this.el.createChild({tag:"a",href:"#",cls:"x-dlg-focus",tabIndex:"-1",html:"&#160;"});
this.focusEl.swallowEvent("click",true);
this.proxy=this.el.createProxy("x-window-proxy");
this.proxy.enableDisplayMode("block");
if(this.modal){this.mask=this.container.createChild({cls:"ext-el-mask"},this.el.dom);
this.mask.enableDisplayMode("block");
this.mask.hide()
}},initEvents:function(){Ext.Window.superclass.initEvents.call(this);
if(this.animateTarget){this.setAnimateTarget(this.animateTarget)
}if(this.resizable){this.resizer=new Ext.Resizable(this.el,{minWidth:this.minWidth,minHeight:this.minHeight,handles:this.resizeHandles||"all",pinned:true,resizeElement:this.resizerAction});
this.resizer.window=this;
this.resizer.on("beforeresize",this.beforeResize,this)
}if(this.draggable){this.header.addClass("x-window-draggable")
}this.initTools();
this.el.on("mousedown",this.toFront,this);
this.manager=this.manager||Ext.WindowMgr;
this.manager.register(this);
this.hidden=true;
if(this.maximized){this.maximized=false;
this.maximize()
}if(this.closable){var a=this.getKeyMap();
a.on(27,this.onEsc,this);
a.disable()
}},initDraggable:function(){this.dd=new Ext.Window.DD(this)
},onEsc:function(){this[this.closeAction]()
},beforeDestroy:function(){Ext.destroy(this.resizer,this.dd,this.proxy,this.mask);
Ext.Window.superclass.beforeDestroy.call(this)
},onDestroy:function(){if(this.manager){this.manager.unregister(this)
}Ext.Window.superclass.onDestroy.call(this)
},initTools:function(){if(this.minimizable){this.addTool({id:"minimize",handler:this.minimize.createDelegate(this,[])})
}if(this.maximizable){this.addTool({id:"maximize",handler:this.maximize.createDelegate(this,[])});
this.addTool({id:"restore",handler:this.restore.createDelegate(this,[]),hidden:true});
this.header.on("dblclick",this.toggleMaximize,this)
}if(this.closable){this.addTool({id:"close",handler:this[this.closeAction].createDelegate(this,[])})
}},resizerAction:function(){var a=this.proxy.getBox();
this.proxy.hide();
this.window.handleResize(a);
return a
},beforeResize:function(){this.resizer.minHeight=Math.max(this.minHeight,this.getFrameHeight()+40);
this.resizer.minWidth=Math.max(this.minWidth,this.getFrameWidth()+40);
this.resizeBox=this.el.getBox()
},updateHandles:function(){if(Ext.isIE&&this.resizer){this.resizer.syncHandleHeight();
this.el.repaint()
}},handleResize:function(b){var a=this.resizeBox;
if(a.x!=b.x||a.y!=b.y){this.updateBox(b)
}else{this.setSize(b)
}this.focus();
this.updateHandles();
this.saveState();
this.fireEvent("resize",this,b.width,b.height)
},focus:function(){var b=this.focusEl,a=this.defaultButton,c=typeof a;
if(c!="undefined"){if(c=="number"){b=this.buttons[a]
}else{if(c=="string"){b=Ext.getCmp(a)
}else{b=a
}}}b.focus.defer(10,b)
},setAnimateTarget:function(a){a=Ext.get(a);
this.animateTarget=a
},beforeShow:function(){delete this.el.lastXY;
delete this.el.lastLT;
if(this.x===undefined||this.y===undefined){var a=this.el.getAlignToXY(this.container,"c-c");
var b=this.el.translatePoints(a[0],a[1]);
this.x=this.x===undefined?b.left:this.x;
this.y=this.y===undefined?b.top:this.y
}this.el.setLeftTop(this.x,this.y);
if(this.expandOnShow){this.expand(false)
}if(this.modal){Ext.getBody().addClass("x-body-masked");
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.mask.show()
}},show:function(b,a,c){if(!this.rendered){this.render(Ext.getBody())
}if(this.hidden===false){this.toFront();
return
}if(this.fireEvent("beforeshow",this)===false){return
}if(a){this.on("show",a,c,{single:true})
}this.hidden=false;
if(b!==undefined){this.setAnimateTarget(b)
}this.beforeShow();
if(this.animateTarget){this.animShow()
}else{this.afterShow()
}},afterShow:function(){this.proxy.hide();
this.el.setStyle("display","block");
this.el.show();
if(this.maximized){this.fitContainer()
}if(Ext.isMac&&Ext.isGecko){this.cascade(this.setAutoScroll)
}if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.onWindowResize(this.onWindowResize,this)
}this.doConstrain();
if(this.layout){this.doLayout()
}if(this.keyMap){this.keyMap.enable()
}this.toFront();
this.updateHandles();
this.fireEvent("show",this)
},animShow:function(){this.proxy.show();
this.proxy.setBox(this.animateTarget.getBox());
this.proxy.setOpacity(0);
var a=this.getBox(false);
a.callback=this.afterShow;
a.scope=this;
a.duration=0.25;
a.easing="easeNone";
a.opacity=0.5;
a.block=true;
this.el.setStyle("display","none");
this.proxy.shift(a)
},hide:function(b,a,c){if(this.hidden||this.fireEvent("beforehide",this)===false){return
}if(a){this.on("hide",a,c,{single:true})
}this.hidden=true;
if(b!==undefined){this.setAnimateTarget(b)
}if(this.animateTarget){this.animHide()
}else{this.el.hide();
this.afterHide()
}},afterHide:function(){this.proxy.hide();
if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.removeResizeListener(this.onWindowResize,this)
}if(this.modal){this.mask.hide();
Ext.getBody().removeClass("x-body-masked")
}if(this.keyMap){this.keyMap.disable()
}this.fireEvent("hide",this)
},animHide:function(){this.proxy.setOpacity(0.5);
this.proxy.show();
var b=this.getBox(false);
this.proxy.setBox(b);
this.el.hide();
var a=this.animateTarget.getBox();
a.callback=this.afterHide;
a.scope=this;
a.duration=0.25;
a.easing="easeNone";
a.block=true;
a.opacity=0;
this.proxy.shift(a)
},onWindowResize:function(){if(this.maximized){this.fitContainer()
}if(this.modal){this.mask.setSize("100%","100%");
var a=this.mask.dom.offsetHeight;
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true))
}this.doConstrain()
},doConstrain:function(){if(this.constrain||this.constrainHeader){var c;
if(this.constrain){c={right:this.el.shadowOffset,left:this.el.shadowOffset,bottom:this.el.shadowOffset}
}else{var a=this.getSize();
c={right:-(a.width-100),bottom:-(a.height-25)}
}var b=this.el.getConstrainToXY(this.container,true,c);
if(b){this.setPosition(b[0],b[1])
}}},ghost:function(a){var b=this.createGhost(a);
var c=this.getBox(true);
b.setLeftTop(c.x,c.y);
b.setWidth(c.width);
this.el.hide();
this.activeGhost=b;
return b
},unghost:function(b,a){if(b!==false){this.el.show();
this.focus();
if(Ext.isMac&&Ext.isGecko){this.cascade(this.setAutoScroll)
}}if(a!==false){this.setPosition(this.activeGhost.getLeft(true),this.activeGhost.getTop(true))
}this.activeGhost.hide();
this.activeGhost.remove();
delete this.activeGhost
},minimize:function(){this.fireEvent("minimize",this)
},close:function(){if(this.fireEvent("beforeclose",this)!==false){this.hide(null,function(){this.fireEvent("close",this);
this.destroy()
},this)
}},maximize:function(){if(!this.maximized){this.expand(false);
this.restoreSize=this.getSize();
this.restorePos=this.getPosition(true);
this.tools.maximize.hide();
this.tools.restore.show();
this.maximized=true;
this.el.disableShadow();
if(this.dd){this.dd.lock()
}if(this.collapsible){this.tools.toggle.hide()
}this.el.addClass("x-window-maximized");
this.container.addClass("x-window-maximized-ct");
this.setPosition(0,0);
this.fitContainer();
this.fireEvent("maximize",this)
}},restore:function(){if(this.maximized){this.el.removeClass("x-window-maximized");
this.tools.restore.hide();
this.tools.maximize.show();
this.setPosition(this.restorePos[0],this.restorePos[1]);
this.setSize(this.restoreSize.width,this.restoreSize.height);
delete this.restorePos;
delete this.restoreSize;
this.maximized=false;
this.el.enableShadow(true);
if(this.dd){this.dd.unlock()
}if(this.collapsible){this.tools.toggle.show()
}this.container.removeClass("x-window-maximized-ct");
this.doConstrain();
this.fireEvent("restore",this)
}},toggleMaximize:function(){this[this.maximized?"restore":"maximize"]()
},fitContainer:function(){var a=this.container.getViewSize();
this.setSize(a.width,a.height)
},setZIndex:function(a){if(this.modal){this.mask.setStyle("z-index",a)
}this.el.setZIndex(++a);
a+=5;
if(this.resizer){this.resizer.proxy.setStyle("z-index",++a)
}this.lastZIndex=a
},alignTo:function(d,a,c){var b=this.el.getAlignToXY(d,a,c);
this.setPagePosition(b[0],b[1]);
return this
},anchorTo:function(g,b,e,h,c){var d=function(){this.alignTo(g,b,e)
};
Ext.EventManager.onWindowResize(d,this);
var a=typeof h;
if(a!="undefined"){Ext.EventManager.on(window,"scroll",d,this,{buffer:a=="number"?h:50})
}d.call(this);
this[c]=d;
return this
},toFront:function(){if(this.manager.bringToFront(this)){this.focus()
}return this
},setActive:function(a){if(a){if(!this.maximized){this.el.enableShadow(true)
}this.fireEvent("activate",this)
}else{this.el.disableShadow();
this.fireEvent("deactivate",this)
}},toBack:function(){this.manager.sendToBack(this);
return this
},center:function(){var a=this.el.getAlignToXY(this.container,"c-c");
this.setPagePosition(a[0],a[1]);
return this
}});
Ext.reg("window",Ext.Window);
Ext.Window.DD=function(a){this.win=a;
Ext.Window.DD.superclass.constructor.call(this,a.el.id,"WindowDD-"+a.id);
this.setHandleElId(a.header.id);
this.scroll=false
};
Ext.extend(Ext.Window.DD,Ext.dd.DD,{moveOnly:true,headerOffsets:[100,25],startDrag:function(){var a=this.win;
this.proxy=a.ghost();
if(a.constrain!==false){var b=a.el.shadowOffset;
this.constrainTo(a.container,{right:b,left:b,bottom:b})
}else{if(a.constrainHeader!==false){var c=this.proxy.getSize();
this.constrainTo(a.container,{right:-(c.width-this.headerOffsets[0]),bottom:-(c.height-this.headerOffsets[1])})
}}},b4Drag:Ext.emptyFn,onDrag:function(a){this.alignElWithMouse(this.proxy,a.getPageX(),a.getPageY())
},endDrag:function(a){this.win.unghost();
this.win.saveState()
}});
Ext.WindowGroup=function(){var c={};
var e=[];
var d=null;
var g=function(i,k){return(!i._lastAccess||i._lastAccess<k._lastAccess)?-1:1
};
var b=function(){var l=e,n=l.length;
if(n>0){l.sort(g);
var m=l[0].manager.zseed;
for(var k=0;
k<n;
k++){var i=l[k];
if(i&&!i.hidden){i.setZIndex(m+(k*10))
}}}a()
};
var h=function(i){if(i!=d){if(d){d.setActive(false)
}d=i;
if(i){i.setActive(true)
}}};
var a=function(){for(var i=e.length-1;
i>=0;
--i){if(!e[i].hidden){h(e[i]);
return
}}h(null)
};
return{zseed:9000,register:function(i){c[i.id]=i;
e.push(i);
i.on("hide",a)
},unregister:function(i){delete c[i.id];
i.un("hide",a);
e.remove(i)
},get:function(i){return typeof i=="object"?i:c[i]
},bringToFront:function(i){i=this.get(i);
if(i!=d){i._lastAccess=new Date().getTime();
b();
return true
}return false
},sendToBack:function(i){i=this.get(i);
i._lastAccess=-(new Date().getTime());
b();
return i
},hideAll:function(){for(var i in c){if(c[i]&&typeof c[i]!="function"&&c[i].isVisible()){c[i].hide()
}}},getActive:function(){return d
},getBy:function(l,m){var k=[];
for(var n=e.length-1;
n>=0;
--n){var i=e[n];
if(l.call(m||i,i)!==false){k.push(i)
}}return k
},each:function(k,l){for(var i in c){if(c[i]&&typeof c[i]!="function"){if(k.call(l||c[i],c[i])===false){return
}}}}}
};
Ext.WindowMgr=new Ext.WindowGroup();
Ext.dd.PanelProxy=function(a,b){this.panel=a;
this.id=this.panel.id+"-ddproxy";
Ext.apply(this,b)
};
Ext.dd.PanelProxy.prototype={insertProxy:true,setStatus:Ext.emptyFn,reset:Ext.emptyFn,update:Ext.emptyFn,stop:Ext.emptyFn,sync:Ext.emptyFn,getEl:function(){return this.ghost
},getGhost:function(){return this.ghost
},getProxy:function(){return this.proxy
},hide:function(){if(this.ghost){if(this.proxy){this.proxy.remove();
delete this.proxy
}this.panel.el.dom.style.display="";
this.ghost.remove();
delete this.ghost
}},show:function(){if(!this.ghost){this.ghost=this.panel.createGhost(undefined,undefined,Ext.getBody());
this.ghost.setXY(this.panel.el.getXY());
if(this.insertProxy){this.proxy=this.panel.el.insertSibling({cls:"x-panel-dd-spacer"});
this.proxy.setSize(this.panel.getSize())
}this.panel.el.dom.style.display="none"
}},repair:function(c,b,a){this.hide();
if(typeof b=="function"){b.call(a||this)
}},moveProxy:function(a,b){if(this.proxy){a.insertBefore(this.proxy.dom,b)
}}};
Ext.Panel.DD=function(b,a){this.panel=b;
this.dragData={panel:b};
this.proxy=new Ext.dd.PanelProxy(b,a);
Ext.Panel.DD.superclass.constructor.call(this,b.el,a);
this.setHandleElId(b.header.id);
b.header.setStyle("cursor","move");
this.scroll=false
};
Ext.extend(Ext.Panel.DD,Ext.dd.DragSource,{showFrame:Ext.emptyFn,startDrag:Ext.emptyFn,b4StartDrag:function(a,b){this.proxy.show()
},b4MouseDown:function(c){var a=c.getPageX();
var b=c.getPageY();
this.autoOffset(a,b)
},onInitDrag:function(a,b){this.onStartDrag(a,b);
return true
},createFrame:Ext.emptyFn,getDragEl:function(a){return this.proxy.ghost.dom
},endDrag:function(a){this.proxy.hide();
this.panel.saveState()
},autoOffset:function(a,b){a-=this.startPageX;
b-=this.startPageY;
this.setDelta(a,b)
}});
Ext.state.Provider=function(){this.addEvents("statechange");
this.state={};
Ext.state.Provider.superclass.constructor.call(this)
};
Ext.extend(Ext.state.Provider,Ext.util.Observable,{get:function(b,a){return typeof this.state[b]=="undefined"?a:this.state[b]
},clear:function(a){delete this.state[a];
this.fireEvent("statechange",this,a,null)
},set:function(a,b){this.state[a]=b;
this.fireEvent("statechange",this,a,b)
},decodeValue:function(d){var e=/^(a|n|d|b|s|o)\:(.*)$/;
var b=e.exec(unescape(d));
if(!b||!b[1]){return
}var k=b[1];
var h=b[2];
switch(k){case"n":return parseFloat(h);
case"d":return new Date(Date.parse(h));
case"b":return(h=="1");
case"a":var i=[];
var g=h.split("^");
for(var c=0,a=g.length;
c<a;
c++){i.push(this.decodeValue(g[c]))
}return i;
case"o":var i={};
var g=h.split("^");
for(var c=0,a=g.length;
c<a;
c++){var l=g[c].split("=");
i[l[0]]=this.decodeValue(l[1])
}return i;
default:return h
}},encodeValue:function(e){var g;
if(typeof e=="number"){g="n:"+e
}else{if(typeof e=="boolean"){g="b:"+(e?"1":"0")
}else{if(Ext.isDate(e)){g="d:"+e.toGMTString()
}else{if(Ext.isArray(e)){var b="";
for(var c=0,a=e.length;
c<a;
c++){b+=this.encodeValue(e[c]);
if(c!=a-1){b+="^"
}}g="a:"+b
}else{if(typeof e=="object"){var b="";
for(var d in e){if(typeof e[d]!="function"&&e[d]!==undefined){b+=d+"="+this.encodeValue(e[d])+"^"
}}g="o:"+b.substring(0,b.length-1)
}else{g="s:"+e
}}}}}return escape(g)
}});
Ext.state.Manager=function(){var a=new Ext.state.Provider();
return{setProvider:function(b){a=b
},get:function(b,c){return a.get(b,c)
},set:function(c,b){a.set(c,b)
},clear:function(b){a.clear(b)
},getProvider:function(){return a
}}
}();
Ext.state.CookieProvider=function(a){Ext.state.CookieProvider.superclass.constructor.call(this);
this.path="/";
this.expires=new Date(new Date().getTime()+(1000*60*60*24*7));
this.domain=null;
this.secure=false;
Ext.apply(this,a);
this.state=this.readCookies()
};
Ext.extend(Ext.state.CookieProvider,Ext.state.Provider,{set:function(a,b){if(typeof b=="undefined"||b===null){this.clear(a);
return
}this.setCookie(a,b);
Ext.state.CookieProvider.superclass.set.call(this,a,b)
},clear:function(a){this.clearCookie(a);
Ext.state.CookieProvider.superclass.clear.call(this,a)
},readCookies:function(){var e={};
var b=document.cookie+";";
var g=/\s?(.*?)=(.*?);/g;
var c;
while((c=g.exec(b))!=null){var a=c[1];
var d=c[2];
if(a&&a.substring(0,3)=="ys-"){e[a.substr(3)]=this.decodeValue(d)
}}return e
},setCookie:function(a,b){document.cookie="ys-"+a+"="+this.encodeValue(b)+((this.expires==null)?"":("; expires="+this.expires.toGMTString()))+((this.path==null)?"":("; path="+this.path))+((this.domain==null)?"":("; domain="+this.domain))+((this.secure==true)?"; secure":"")
},clearCookie:function(a){document.cookie="ys-"+a+"=null; expires=Thu, 01-Jan-70 00:00:01 GMT"+((this.path==null)?"":("; path="+this.path))+((this.domain==null)?"":("; domain="+this.domain))+((this.secure==true)?"; secure":"")
}});
Ext.DataView=Ext.extend(Ext.BoxComponent,{selectedClass:"x-view-selected",emptyText:"",last:false,initComponent:function(){Ext.DataView.superclass.initComponent.call(this);
if(typeof this.tpl=="string"){this.tpl=new Ext.XTemplate(this.tpl)
}this.addEvents("beforeclick","click","containerclick","dblclick","contextmenu","selectionchange","beforeselect");
this.all=new Ext.CompositeElementLite();
this.selected=new Ext.CompositeElementLite()
},onRender:function(){if(!this.el){this.el=document.createElement("div")
}Ext.DataView.superclass.onRender.apply(this,arguments)
},afterRender:function(){Ext.DataView.superclass.afterRender.call(this);
this.el.on({click:this.onClick,dblclick:this.onDblClick,contextmenu:this.onContextMenu,scope:this});
if(this.overClass){this.el.on({mouseover:this.onMouseOver,mouseout:this.onMouseOut,scope:this})
}if(this.store){this.setStore(this.store,true)
}},refresh:function(){this.clearSelections(false,true);
this.el.update("");
var b=[];
var a=this.store.getRange();
if(a.length<1){this.el.update(this.emptyText);
this.all.clear();
return
}this.tpl.overwrite(this.el,this.collectData(a,0));
this.all.fill(Ext.query(this.itemSelector,this.el.dom));
this.updateIndexes(0)
},prepareData:function(a){return a
},collectData:function(e,b){var c=[];
for(var d=0,a=e.length;
d<a;
d++){c[c.length]=this.prepareData(e[d].data,b+d,e[d])
}return c
},bufferRender:function(a){var b=document.createElement("div");
this.tpl.overwrite(b,this.collectData(a));
return Ext.query(this.itemSelector,b)
},onUpdate:function(b,a){var g=this.store.indexOf(a);
var c=this.isSelected(g);
var e=this.all.elements[g];
var d=this.bufferRender([a],g)[0];
this.all.replaceElement(g,d,true);
if(c){this.selected.replaceElement(e,d);
this.all.item(g).addClass(this.selectedClass)
}this.updateIndexes(g,g)
},onAdd:function(c,e,d){if(this.all.getCount()==0){this.refresh();
return
}var a=this.bufferRender(e,d),b;
if(d<this.all.getCount()){b=this.all.item(d).insertSibling(a,"before",true);
this.all.elements.splice(d,0,b)
}else{b=this.all.last().insertSibling(a,"after",true);
this.all.elements.push(b)
}this.updateIndexes(d)
},onRemove:function(b,a,c){this.deselect(c);
this.all.removeElement(c,true);
this.updateIndexes(c)
},refreshNode:function(a){this.onUpdate(this.store,this.store.getAt(a))
},updateIndexes:function(b,c){var d=this.all.elements;
b=b||0;
c=c||((c===0)?0:(d.length-1));
for(var a=b;
a<=c;
a++){d[a].viewIndex=a
}},setStore:function(a,b){if(!b&&this.store){this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("datachanged",this.refresh,this);
this.store.un("add",this.onAdd,this);
this.store.un("remove",this.onRemove,this);
this.store.un("update",this.onUpdate,this);
this.store.un("clear",this.refresh,this)
}if(a){a=Ext.StoreMgr.lookup(a);
a.on("beforeload",this.onBeforeLoad,this);
a.on("datachanged",this.refresh,this);
a.on("add",this.onAdd,this);
a.on("remove",this.onRemove,this);
a.on("update",this.onUpdate,this);
a.on("clear",this.refresh,this)
}this.store=a;
if(a){this.refresh()
}},findItemFromChild:function(a){return Ext.fly(a).findParent(this.itemSelector,this.el)
},onClick:function(b){var c=b.getTarget(this.itemSelector,this.el);
if(c){var a=this.indexOf(c);
if(this.onItemClick(c,a,b)!==false){this.fireEvent("click",this,a,c,b)
}}else{if(this.fireEvent("containerclick",this,b)!==false){this.clearSelections()
}}},onContextMenu:function(b){var a=b.getTarget(this.itemSelector,this.el);
if(a){this.fireEvent("contextmenu",this,this.indexOf(a),a,b)
}},onDblClick:function(b){var a=b.getTarget(this.itemSelector,this.el);
if(a){this.fireEvent("dblclick",this,this.indexOf(a),a,b)
}},onMouseOver:function(b){var a=b.getTarget(this.itemSelector,this.el);
if(a&&a!==this.lastItem){this.lastItem=a;
Ext.fly(a).addClass(this.overClass)
}},onMouseOut:function(a){if(this.lastItem){if(!a.within(this.lastItem,true)){Ext.fly(this.lastItem).removeClass(this.overClass);
delete this.lastItem
}}},onItemClick:function(c,a,b){if(this.fireEvent("beforeclick",this,a,c,b)===false){return false
}if(this.multiSelect){this.doMultiSelection(c,a,b);
b.preventDefault()
}else{if(this.singleSelect){this.doSingleSelection(c,a,b);
b.preventDefault()
}}return true
},doSingleSelection:function(c,a,b){if(b.ctrlKey&&this.isSelected(a)){this.deselect(a)
}else{this.select(a,false)
}},doMultiSelection:function(c,a,b){if(b.shiftKey&&this.last!==false){var d=this.last;
this.selectRange(d,a,b.ctrlKey);
this.last=d
}else{if((b.ctrlKey||this.simpleSelect)&&this.isSelected(a)){this.deselect(a)
}else{this.select(a,b.ctrlKey||b.shiftKey||this.simpleSelect)
}}},getSelectionCount:function(){return this.selected.getCount()
},getSelectedNodes:function(){return this.selected.elements
},getSelectedIndexes:function(){var d=[],b=this.selected.elements;
for(var c=0,a=b.length;
c<a;
c++){d.push(b[c].viewIndex)
}return d
},getSelectedRecords:function(){var b=[],c=this.selected.elements;
for(var d=0,a=c.length;
d<a;
d++){b[b.length]=this.store.getAt(c[d].viewIndex)
}return b
},getRecords:function(e){var b=[],c=e;
for(var d=0,a=c.length;
d<a;
d++){b[b.length]=this.store.getAt(c[d].viewIndex)
}return b
},getRecord:function(a){return this.store.getAt(a.viewIndex)
},clearSelections:function(a,b){if(this.multiSelect||this.singleSelect){if(!b){this.selected.removeClass(this.selectedClass)
}this.selected.clear();
this.last=false;
if(!a){this.fireEvent("selectionchange",this,this.selected.elements)
}}},isSelected:function(a){return this.selected.contains(this.getNode(a))
},deselect:function(a){if(this.isSelected(a)){var a=this.getNode(a);
this.selected.removeElement(a);
if(this.last==a.viewIndex){this.last=false
}Ext.fly(a).removeClass(this.selectedClass);
this.fireEvent("selectionchange",this,this.selected.elements)
}},select:function(d,b,g){if(Ext.isArray(d)){if(!b){this.clearSelections(true)
}for(var e=0,a=d.length;
e<a;
e++){this.select(d[e],true,true)
}}else{var c=this.getNode(d);
if(!b){this.clearSelections(true)
}if(c&&!this.isSelected(c)){if(this.fireEvent("beforeselect",this,c,this.selected.elements)!==false){Ext.fly(c).addClass(this.selectedClass);
this.selected.add(c);
this.last=c.viewIndex;
if(!g){this.fireEvent("selectionchange",this,this.selected.elements)
}}}}},selectRange:function(b,a,c){if(!c){this.clearSelections(true)
}this.select(this.getNodes(b,a),true)
},getNode:function(a){if(typeof a=="string"){return document.getElementById(a)
}else{if(typeof a=="number"){return this.all.elements[a]
}}return a
},getNodes:function(b,a){var c=this.all.elements;
b=b||0;
a=typeof a=="undefined"?c.length-1:a;
var e=[],d;
if(b<=a){for(d=b;
d<=a;
d++){e.push(c[d])
}}else{for(d=b;
d>=a;
d--){e.push(c[d])
}}return e
},indexOf:function(a){a=this.getNode(a);
if(typeof a.viewIndex=="number"){return a.viewIndex
}return this.all.indexOf(a)
},onBeforeLoad:function(){if(this.loadingText){this.clearSelections(false,true);
this.el.update('<div class="loading-indicator">'+this.loadingText+"</div>");
this.all.clear()
}}});
Ext.reg("dataview",Ext.DataView);
Ext.ColorPalette=function(a){Ext.ColorPalette.superclass.constructor.call(this,a);
this.addEvents("select");
if(this.handler){this.on("select",this.handler,this.scope,true)
}};
Ext.extend(Ext.ColorPalette,Ext.Component,{itemCls:"x-color-palette",value:null,clickEvent:"click",ctype:"Ext.ColorPalette",allowReselect:false,colors:["000000","993300","333300","003300","003366","000080","333399","333333","800000","FF6600","808000","008000","008080","0000FF","666699","808080","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","969696","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","C0C0C0","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","FFFFFF"],onRender:function(d,a){var c=this.tpl||new Ext.XTemplate('<tpl for="."><a href="#" class="color-{.}" hidefocus="on"><em><span style="background:#{.}" unselectable="on">&#160;</span></em></a></tpl>');
var b=document.createElement("div");
b.className=this.itemCls;
c.overwrite(b,this.colors);
d.dom.insertBefore(b,a);
this.el=Ext.get(b);
this.el.on(this.clickEvent,this.handleClick,this,{delegate:"a"});
if(this.clickEvent!="click"){this.el.on("click",Ext.emptyFn,this,{delegate:"a",preventDefault:true})
}},afterRender:function(){Ext.ColorPalette.superclass.afterRender.call(this);
if(this.value){var a=this.value;
this.value=null;
this.select(a)
}},handleClick:function(c,a){c.preventDefault();
if(!this.disabled){var b=a.className.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];
this.select(b.toUpperCase())
}},select:function(a){a=a.replace("#","");
if(a!=this.value||this.allowReselect){var b=this.el;
if(this.value){b.child("a.color-"+this.value).removeClass("x-color-palette-sel")
}b.child("a.color-"+a).addClass("x-color-palette-sel");
this.value=a;
this.fireEvent("select",this,a)
}}});
Ext.reg("colorpalette",Ext.ColorPalette);
Ext.DatePicker=Ext.extend(Ext.Component,{todayText:"Today",okText:"&#160;OK&#160;",cancelText:"Cancel",todayTip:"{0} (Spacebar)",minDate:null,maxDate:null,minText:"This date is before the minimum date",maxText:"This date is after the maximum date",format:"m/d/y",disabledDays:null,disabledDaysText:"",disabledDatesRE:null,disabledDatesText:"",constrainToViewport:true,monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"Next Month (Control+Right)",prevText:"Previous Month (Control+Left)",monthYearText:"Choose a month (Control+Up/Down to move years)",startDay:0,initComponent:function(){Ext.DatePicker.superclass.initComponent.call(this);
this.value=this.value?this.value.clearTime():new Date().clearTime();
this.addEvents("select");
if(this.handler){this.on("select",this.handler,this.scope||this)
}this.initDisabledDays()
},initDisabledDays:function(){if(!this.disabledDatesRE&&this.disabledDates){var a=this.disabledDates;
var b="(?:";
for(var c=0;
c<a.length;
c++){b+=a[c];
if(c!=a.length-1){b+="|"
}}this.disabledDatesRE=new RegExp(b+")")
}},setValue:function(b){var a=this.value;
this.value=b.clearTime(true);
if(this.el){this.update(this.value)
}},getValue:function(){return this.value
},focus:function(){if(this.el){this.update(this.activeDate)
}},onRender:function(d,i){var b=['<table cellspacing="0">','<tr><td class="x-date-left"><a href="#" title="',this.prevText,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',this.nextText,'">&#160;</a></td></tr>','<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
var k=this.dayNames;
for(var a=0;
a<7;
a++){var h=this.startDay+a;
if(h>6){h=h-7
}b.push("<th><span>",k[h].substr(0,1),"</span></th>")
}b[b.length]="</tr></thead><tbody><tr>";
for(var a=0;
a<42;
a++){if(a%7==0&&a!=0){b[b.length]="</tr><tr>"
}b[b.length]='<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'
}b[b.length]='</tr></tbody></table></td></tr><tr><td colspan="3" class="x-date-bottom" align="center"></td></tr></table><div class="x-date-mp"></div>';
var c=document.createElement("div");
c.className="x-date-picker";
c.innerHTML=b.join("");
d.dom.insertBefore(c,i);
this.el=Ext.get(c);
this.eventEl=Ext.get(c.firstChild);
new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"),{handler:this.showPrevMonth,scope:this,preventDefault:true,stopDefault:true});
new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"),{handler:this.showNextMonth,scope:this,preventDefault:true,stopDefault:true});
this.eventEl.on("mousewheel",this.handleMouseWheel,this);
this.monthPicker=this.el.down("div.x-date-mp");
this.monthPicker.enableDisplayMode("block");
var e=new Ext.KeyNav(this.eventEl,{left:function(l){l.ctrlKey?this.showPrevMonth():this.update(this.activeDate.add("d",-1))
},right:function(l){l.ctrlKey?this.showNextMonth():this.update(this.activeDate.add("d",1))
},up:function(l){l.ctrlKey?this.showNextYear():this.update(this.activeDate.add("d",-7))
},down:function(l){l.ctrlKey?this.showPrevYear():this.update(this.activeDate.add("d",7))
},pageUp:function(l){this.showNextMonth()
},pageDown:function(l){this.showPrevMonth()
},enter:function(l){l.stopPropagation();
return true
},scope:this});
this.eventEl.on("click",this.handleDateClick,this,{delegate:"a.x-date-date"});
this.eventEl.addKeyListener(Ext.EventObject.SPACE,this.selectToday,this);
this.el.unselectable();
this.cells=this.el.select("table.x-date-inner tbody td");
this.textNodes=this.el.query("table.x-date-inner tbody span");
this.mbtn=new Ext.Button({text:"&#160;",tooltip:this.monthYearText,renderTo:this.el.child("td.x-date-middle",true)});
this.mbtn.on("click",this.showMonthPicker,this);
this.mbtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");
var g=(new Date()).dateFormat(this.format);
this.todayBtn=new Ext.Button({renderTo:this.el.child("td.x-date-bottom",true),text:String.format(this.todayText,g),tooltip:String.format(this.todayTip,g),handler:this.selectToday,scope:this});
if(Ext.isIE){this.el.repaint()
}this.update(this.value)
},createMonthPicker:function(){if(!this.monthPicker.dom.firstChild){var a=['<table border="0" cellspacing="0">'];
for(var b=0;
b<6;
b++){a.push('<tr><td class="x-date-mp-month"><a href="#">',this.monthNames[b].substr(0,3),"</a></td>",'<td class="x-date-mp-month x-date-mp-sep"><a href="#">',this.monthNames[b+6].substr(0,3),"</a></td>",b==0?'<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>':'<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>')
}a.push('<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">',this.okText,'</button><button type="button" class="x-date-mp-cancel">',this.cancelText,"</button></td></tr>","</table>");
this.monthPicker.update(a.join(""));
this.monthPicker.on("click",this.onMonthClick,this);
this.monthPicker.on("dblclick",this.onMonthDblClick,this);
this.mpMonths=this.monthPicker.select("td.x-date-mp-month");
this.mpYears=this.monthPicker.select("td.x-date-mp-year");
this.mpMonths.each(function(e,d,c){c+=1;
if((c%2)==0){e.dom.xmonth=5+Math.round(c*0.5)
}else{e.dom.xmonth=Math.round((c-1)*0.5)
}})
}},showMonthPicker:function(){this.createMonthPicker();
var a=this.el.getSize();
this.monthPicker.setSize(a);
this.monthPicker.child("table").setSize(a);
this.mpSelMonth=(this.activeDate||this.value).getMonth();
this.updateMPMonth(this.mpSelMonth);
this.mpSelYear=(this.activeDate||this.value).getFullYear();
this.updateMPYear(this.mpSelYear);
this.monthPicker.slideIn("t",{duration:0.2})
},updateMPYear:function(b){this.mpyear=b;
var d=this.mpYears.elements;
for(var e=1;
e<=10;
e++){var c=d[e-1],a;
if((e%2)==0){a=b+Math.round(e*0.5);
c.firstChild.innerHTML=a;
c.xyear=a
}else{a=b-(5-Math.round(e*0.5));
c.firstChild.innerHTML=a;
c.xyear=a
}this.mpYears.item(e-1)[a==this.mpSelYear?"addClass":"removeClass"]("x-date-mp-sel")
}},updateMPMonth:function(a){this.mpMonths.each(function(d,c,b){d[d.dom.xmonth==a?"addClass":"removeClass"]("x-date-mp-sel")
})
},selectMPMonth:function(a){},onMonthClick:function(b,d){b.stopEvent();
var c=new Ext.Element(d),a;
if(c.is("button.x-date-mp-cancel")){this.hideMonthPicker()
}else{if(c.is("button.x-date-mp-ok")){this.update(new Date(this.mpSelYear,this.mpSelMonth,(this.activeDate||this.value).getDate()));
this.hideMonthPicker()
}else{if(a=c.up("td.x-date-mp-month",2)){this.mpMonths.removeClass("x-date-mp-sel");
a.addClass("x-date-mp-sel");
this.mpSelMonth=a.dom.xmonth
}else{if(a=c.up("td.x-date-mp-year",2)){this.mpYears.removeClass("x-date-mp-sel");
a.addClass("x-date-mp-sel");
this.mpSelYear=a.dom.xyear
}else{if(c.is("a.x-date-mp-prev")){this.updateMPYear(this.mpyear-10)
}else{if(c.is("a.x-date-mp-next")){this.updateMPYear(this.mpyear+10)
}}}}}}},onMonthDblClick:function(b,d){b.stopEvent();
var c=new Ext.Element(d),a;
if(a=c.up("td.x-date-mp-month",2)){this.update(new Date(this.mpSelYear,a.dom.xmonth,(this.activeDate||this.value).getDate()));
this.hideMonthPicker()
}else{if(a=c.up("td.x-date-mp-year",2)){this.update(new Date(a.dom.xyear,this.mpSelMonth,(this.activeDate||this.value).getDate()));
this.hideMonthPicker()
}}},hideMonthPicker:function(a){if(this.monthPicker){if(a===true){this.monthPicker.hide()
}else{this.monthPicker.slideOut("t",{duration:0.2})
}}},showPrevMonth:function(a){this.update(this.activeDate.add("mo",-1))
},showNextMonth:function(a){this.update(this.activeDate.add("mo",1))
},showPrevYear:function(){this.update(this.activeDate.add("y",-1))
},showNextYear:function(){this.update(this.activeDate.add("y",1))
},handleMouseWheel:function(a){var b=a.getWheelDelta();
if(b>0){this.showPrevMonth();
a.stopEvent()
}else{if(b<0){this.showNextMonth();
a.stopEvent()
}}},handleDateClick:function(b,a){b.stopEvent();
if(a.dateValue&&!Ext.fly(a.parentNode).hasClass("x-date-disabled")){this.setValue(new Date(a.dateValue));
this.fireEvent("select",this,this.value)
}},selectToday:function(){this.setValue(new Date().clearTime());
this.fireEvent("select",this,this.value)
},update:function(d){var ab=this.activeDate;
this.activeDate=d;
if(ab&&this.el){var t=d.getTime();
if(ab.getMonth()==d.getMonth()&&ab.getFullYear()==d.getFullYear()){this.cells.removeClass("x-date-selected");
this.cells.each(function(A){if(A.dom.firstChild.dateValue==t){A.addClass("x-date-selected");
setTimeout(function(){try{A.dom.firstChild.focus()
}catch(B){}},50);
return false
}});
return
}}var w=d.getDaysInMonth();
var s=d.getFirstDateOfMonth();
var z=s.getDay()-this.startDay;
if(z<=this.startDay){z+=7
}var i=d.add("mo",-1);
var y=i.getDaysInMonth()-z;
var aa=this.cells.elements;
var r=this.textNodes;
w+=z;
var m=86400000;
var g=(new Date(i.getFullYear(),i.getMonth(),y)).clearTime();
var h=new Date().clearTime().getTime();
var o=d.clearTime().getTime();
var p=this.minDate?this.minDate.clearTime():Number.NEGATIVE_INFINITY;
var l=this.maxDate?this.maxDate.clearTime():Number.POSITIVE_INFINITY;
var c=this.disabledDatesRE;
var q=this.disabledDatesText;
var a=this.disabledDays?this.disabledDays.join(""):false;
var e=this.disabledDaysText;
var k=this.format;
var v=function(C,B){B.title="";
var A=g.getTime();
B.firstChild.dateValue=A;
if(A==h){B.className+=" x-date-today";
B.title=C.todayText
}if(A==o){B.className+=" x-date-selected";
setTimeout(function(){try{B.firstChild.focus()
}catch(E){}},50)
}if(A<p){B.className=" x-date-disabled";
B.title=C.minText;
return
}if(A>l){B.className=" x-date-disabled";
B.title=C.maxText;
return
}if(a){if(a.indexOf(g.getDay())!=-1){B.title=e;
B.className=" x-date-disabled"
}}if(c&&k){var D=g.dateFormat(k);
if(c.test(D)){B.title=q.replace("%0",D);
B.className=" x-date-disabled"
}}};
var n=0;
for(;
n<z;
n++){r[n].innerHTML=(++y);
g.setDate(g.getDate()+1);
aa[n].className="x-date-prevday";
v(this,aa[n])
}for(;
n<w;
n++){intDay=n-z+1;
r[n].innerHTML=(intDay);
g.setDate(g.getDate()+1);
aa[n].className="x-date-active";
v(this,aa[n])
}var b=0;
for(;
n<42;
n++){r[n].innerHTML=(++b);
g.setDate(g.getDate()+1);
aa[n].className="x-date-nextday";
v(this,aa[n])
}this.mbtn.setText(this.monthNames[d.getMonth()]+" "+d.getFullYear());
if(!this.internalRender){var x=this.el.dom.firstChild;
var u=x.offsetWidth;
this.el.setWidth(u+this.el.getBorderWidth("lr"));
Ext.fly(x).setWidth(u);
this.internalRender=true;
if(Ext.isOpera&&!this.secondPass){x.rows[0].cells[1].style.width=(u-(x.rows[0].cells[0].offsetWidth+x.rows[0].cells[2].offsetWidth))+"px";
this.secondPass=true;
this.update.defer(10,this,[d])
}}},beforeDestroy:function(){this.mbtn.destroy();
this.todayBtn.destroy()
}});
Ext.reg("datepicker",Ext.DatePicker);
Ext.TabPanel=Ext.extend(Ext.Panel,{monitorResize:true,deferredRender:true,tabWidth:120,minTabWidth:30,resizeTabs:false,enableTabScroll:false,scrollIncrement:0,scrollRepeatInterval:400,scrollDuration:0.35,animScroll:true,tabPosition:"top",baseCls:"x-tab-panel",autoTabs:false,autoTabSelector:"div.x-tab",activeTab:null,tabMargin:2,plain:false,wheelIncrement:20,idDelimiter:"__",itemCls:"x-tab-item",elements:"body",headerAsText:false,frame:false,hideBorders:true,initComponent:function(){this.frame=false;
Ext.TabPanel.superclass.initComponent.call(this);
this.addEvents("beforetabchange","tabchange","contextmenu");
this.setLayout(new Ext.layout.CardLayout({deferredRender:this.deferredRender}));
if(this.tabPosition=="top"){this.elements+=",header";
this.stripTarget="header"
}else{this.elements+=",footer";
this.stripTarget="footer"
}if(!this.stack){this.stack=Ext.TabPanel.AccessStack()
}this.initItems()
},render:function(){Ext.TabPanel.superclass.render.apply(this,arguments);
if(this.activeTab!==undefined){var a=this.activeTab;
delete this.activeTab;
this.setActiveTab(a)
}},onRender:function(d,a){Ext.TabPanel.superclass.onRender.call(this,d,a);
if(this.plain){var b=this.tabPosition=="top"?"header":"footer";
this[b].addClass("x-tab-panel-"+b+"-plain")
}var e=this[this.stripTarget];
this.stripWrap=e.createChild({cls:"x-tab-strip-wrap",cn:{tag:"ul",cls:"x-tab-strip x-tab-strip-"+this.tabPosition}});
this.stripSpacer=e.createChild({cls:"x-tab-strip-spacer"});
this.strip=new Ext.Element(this.stripWrap.dom.firstChild);
this.edge=this.strip.createChild({tag:"li",cls:"x-tab-edge"});
this.strip.createChild({cls:"x-clear"});
this.body.addClass("x-tab-panel-body-"+this.tabPosition);
if(!this.itemTpl){var c=new Ext.Template('<li class="{cls}" id="{id}"><a class="x-tab-strip-close" onclick="return false;"></a>','<a class="x-tab-right" href="#" onclick="return false;"><em class="x-tab-left">','<span class="x-tab-strip-inner"><span class="x-tab-strip-text {iconCls}">{text}</span></span>',"</em></a></li>");
c.disableFormats=true;
c.compile();
Ext.TabPanel.prototype.itemTpl=c
}this.items.each(this.initTab,this)
},afterRender:function(){Ext.TabPanel.superclass.afterRender.call(this);
if(this.autoTabs){this.readTabs(false)
}},initEvents:function(){Ext.TabPanel.superclass.initEvents.call(this);
this.on("add",this.onAdd,this);
this.on("remove",this.onRemove,this);
this.strip.on("mousedown",this.onStripMouseDown,this);
this.strip.on("click",this.onStripClick,this);
this.strip.on("contextmenu",this.onStripContextMenu,this);
if(this.enableTabScroll){this.strip.on("mousewheel",this.onWheel,this)
}},findTargets:function(b){var c=null;
var a=b.getTarget("li",this.strip);
if(a){c=this.getComponent(a.id.split(this.idDelimiter)[1]);
if(c.disabled){return{close:null,item:null,el:null}
}}return{close:b.getTarget(".x-tab-strip-close",this.strip),item:c,el:a}
},onStripMouseDown:function(b){b.preventDefault();
if(b.button!=0){return
}var a=this.findTargets(b);
if(a.close){this.remove(a.item);
return
}if(a.item&&a.item!=this.activeTab){this.setActiveTab(a.item)
}},onStripClick:function(b){var a=this.findTargets(b);
if(!a.close&&a.item&&a.item!=this.activeTab){this.setActiveTab(a.item)
}},onStripContextMenu:function(b){b.preventDefault();
var a=this.findTargets(b);
if(a.item){this.fireEvent("contextmenu",this,a.item,b)
}},readTabs:function(d){if(d===true){this.items.each(function(h){this.remove(h)
},this)
}var e=this.el.query(this.autoTabSelector);
for(var g=0,a=e.length;
g<a;
g++){var c=e[g];
var b=c.getAttribute("title");
c.removeAttribute("title");
this.add({title:b,el:c})
}},initTab:function(d,g){var c=this.strip.dom.childNodes[g];
var a=d.closable?"x-tab-strip-closable":"";
if(d.disabled){a+=" x-item-disabled"
}if(d.iconCls){a+=" x-tab-with-icon"
}if(d.tabCls){a+=" "+d.tabCls
}var b={id:this.id+this.idDelimiter+d.getItemId(),text:d.title,cls:a,iconCls:d.iconCls||""};
var e=c?this.itemTpl.insertBefore(c,b):this.itemTpl.append(this.strip,b);
Ext.fly(e).addClassOnOver("x-tab-strip-over");
if(d.tabTip){Ext.fly(e).child("span.x-tab-strip-text",true).qtip=d.tabTip
}d.on("disable",this.onItemDisabled,this);
d.on("enable",this.onItemEnabled,this);
d.on("titlechange",this.onItemTitleChanged,this);
d.on("beforeshow",this.onBeforeShowItem,this)
},onAdd:function(b,c,a){this.initTab(c,a);
if(this.items.getCount()==1){this.syncSize()
}this.delegateUpdates()
},onBeforeAdd:function(c){var a=c.events?(this.items.containsKey(c.getItemId())?c:null):this.items.get(c);
if(a){this.setActiveTab(c);
return false
}Ext.TabPanel.superclass.onBeforeAdd.apply(this,arguments);
var b=c.elements;
c.elements=b?b.replace(",header",""):b;
c.border=(c.border===true)
},onRemove:function(b,c){Ext.removeNode(this.getTabEl(c));
this.stack.remove(c);
if(c==this.activeTab){var a=this.stack.next();
if(a){this.setActiveTab(a)
}else{this.setActiveTab(0)
}}this.delegateUpdates()
},onBeforeShowItem:function(a){if(a!=this.activeTab){this.setActiveTab(a);
return false
}},onItemDisabled:function(b){var a=this.getTabEl(b);
if(a){Ext.fly(a).addClass("x-item-disabled")
}this.stack.remove(b)
},onItemEnabled:function(b){var a=this.getTabEl(b);
if(a){Ext.fly(a).removeClass("x-item-disabled")
}},onItemTitleChanged:function(b){var a=this.getTabEl(b);
if(a){Ext.fly(a).child("span.x-tab-strip-text",true).innerHTML=b.title
}},getTabEl:function(a){var b=(typeof a==="number")?this.items.items[a].getItemId():a.getItemId();
return document.getElementById(this.id+this.idDelimiter+b)
},onResize:function(){Ext.TabPanel.superclass.onResize.apply(this,arguments);
this.delegateUpdates()
},beginUpdate:function(){this.suspendUpdates=true
},endUpdate:function(){this.suspendUpdates=false;
this.delegateUpdates()
},hideTabStripItem:function(b){b=this.getComponent(b);
var a=this.getTabEl(b);
if(a){a.style.display="none";
this.delegateUpdates()
}},unhideTabStripItem:function(b){b=this.getComponent(b);
var a=this.getTabEl(b);
if(a){a.style.display="";
this.delegateUpdates()
}},delegateUpdates:function(){if(this.suspendUpdates){return
}if(this.resizeTabs&&this.rendered){this.autoSizeTabs()
}if(this.enableTabScroll&&this.rendered){this.autoScrollTabs()
}},autoSizeTabs:function(){var l=this.items.length;
var c=this.tabPosition!="bottom"?"header":"footer";
var b=this[c].dom.offsetWidth;
var d=this[c].dom.clientWidth;
if(!this.resizeTabs||l<1||!d){return
}var i=Math.max(Math.min(Math.floor((d-4)/l)-this.tabMargin,this.tabWidth),this.minTabWidth);
this.lastTabWidth=i;
var g=this.stripWrap.dom.getElementsByTagName("li");
for(var n=0,k=g.length-1;
n<k;
n++){var h=g[n];
var e=h.childNodes[1].firstChild.firstChild;
var m=h.offsetWidth;
var a=e.offsetWidth;
e.style.width=(i-(m-a))+"px"
}},adjustBodyWidth:function(a){if(this.header){this.header.setWidth(a)
}if(this.footer){this.footer.setWidth(a)
}return a
},setActiveTab:function(b){b=this.getComponent(b);
if(!b||this.fireEvent("beforetabchange",this,b,this.activeTab)===false){return
}if(!this.rendered){this.activeTab=b;
return
}if(this.activeTab!=b){if(this.activeTab){var a=this.getTabEl(this.activeTab);
if(a){Ext.fly(a).removeClass("x-tab-strip-active")
}this.activeTab.fireEvent("deactivate",this.activeTab)
}var c=this.getTabEl(b);
Ext.fly(c).addClass("x-tab-strip-active");
this.activeTab=b;
this.stack.add(b);
this.layout.setActiveItem(b);
if(this.layoutOnTabChange&&b.doLayout){b.doLayout()
}if(this.scrolling){this.scrollToTab(b,this.animScroll)
}b.fireEvent("activate",b);
this.fireEvent("tabchange",this,b)
}},getActiveTab:function(){return this.activeTab||null
},getItem:function(a){return this.getComponent(a)
},autoScrollTabs:function(){var c=this.items.length;
var g=this.header.dom.offsetWidth;
var h=this.header.dom.clientWidth;
var d=this.stripWrap;
var e=d.dom;
var i=e.offsetWidth;
var b=this.getScrollPos();
var a=this.edge.getOffsetsTo(this.stripWrap)[0]+b;
if(!this.enableTabScroll||c<1||i<20){return
}if(a<=h){e.scrollLeft=0;
d.setWidth(h);
if(this.scrolling){this.scrolling=false;
this.header.removeClass("x-tab-scrolling");
this.scrollLeft.hide();
this.scrollRight.hide();
if(Ext.isAir){e.style.marginLeft="";
e.style.marginRight=""
}}}else{if(!this.scrolling){this.header.addClass("x-tab-scrolling");
if(Ext.isAir){e.style.marginLeft="18px";
e.style.marginRight="18px"
}}h-=d.getMargins("lr");
d.setWidth(h>20?h:20);
if(!this.scrolling){if(!this.scrollLeft){this.createScrollers()
}else{this.scrollLeft.show();
this.scrollRight.show()
}}this.scrolling=true;
if(b>(a-h)){e.scrollLeft=a-h
}else{this.scrollToTab(this.activeTab,false)
}this.updateScrollButtons()
}},createScrollers:function(){var b=this.stripWrap.dom.offsetHeight;
var a=this.header.insertFirst({cls:"x-tab-scroller-left"});
a.setHeight(b);
a.addClassOnOver("x-tab-scroller-left-over");
this.leftRepeater=new Ext.util.ClickRepeater(a,{interval:this.scrollRepeatInterval,handler:this.onScrollLeft,scope:this});
this.scrollLeft=a;
var c=this.header.insertFirst({cls:"x-tab-scroller-right"});
c.setHeight(b);
c.addClassOnOver("x-tab-scroller-right-over");
this.rightRepeater=new Ext.util.ClickRepeater(c,{interval:this.scrollRepeatInterval,handler:this.onScrollRight,scope:this});
this.scrollRight=c
},getScrollWidth:function(){return this.edge.getOffsetsTo(this.stripWrap)[0]+this.getScrollPos()
},getScrollPos:function(){return parseInt(this.stripWrap.dom.scrollLeft,10)||0
},getScrollArea:function(){return parseInt(this.stripWrap.dom.clientWidth,10)||0
},getScrollAnim:function(){return{duration:this.scrollDuration,callback:this.updateScrollButtons,scope:this}
},getScrollIncrement:function(){return this.scrollIncrement||(this.resizeTabs?this.lastTabWidth+2:100)
},scrollToTab:function(d,a){if(!d){return
}var g=this.getTabEl(d);
var b=this.getScrollPos(),e=this.getScrollArea();
var c=Ext.fly(g).getOffsetsTo(this.stripWrap)[0]+b;
var h=c+g.offsetWidth;
if(c<b){this.scrollTo(c,a)
}else{if(h>(b+e)){this.scrollTo(h-e,a)
}}},scrollTo:function(b,a){this.stripWrap.scrollTo("left",b,a?this.getScrollAnim():false);
if(!a){this.updateScrollButtons()
}},onWheel:function(d){var c=d.getWheelDelta()*this.wheelIncrement*-1;
d.stopEvent();
var b=this.getScrollPos();
var e=b+c;
var a=this.getScrollWidth()-this.getScrollArea();
var g=Math.max(0,Math.min(a,e));
if(g!=b){this.scrollTo(g,false)
}},onScrollRight:function(){var a=this.getScrollWidth()-this.getScrollArea();
var b=this.getScrollPos();
var c=Math.min(a,b+this.getScrollIncrement());
if(c!=b){this.scrollTo(c,this.animScroll)
}},onScrollLeft:function(){var b=this.getScrollPos();
var a=Math.max(0,b-this.getScrollIncrement());
if(a!=b){this.scrollTo(a,this.animScroll)
}},updateScrollButtons:function(){var a=this.getScrollPos();
this.scrollLeft[a==0?"addClass":"removeClass"]("x-tab-scroller-left-disabled");
this.scrollRight[a>=(this.getScrollWidth()-this.getScrollArea())?"addClass":"removeClass"]("x-tab-scroller-right-disabled")
}});
Ext.reg("tabpanel",Ext.TabPanel);
Ext.TabPanel.prototype.activate=Ext.TabPanel.prototype.setActiveTab;
Ext.TabPanel.AccessStack=function(){var a=[];
return{add:function(b){a.push(b);
if(a.length>10){a.shift()
}},remove:function(b){var c=[];
for(var d=0,e=a.length;
d<e;
d++){if(a[d]!=b){c.push(a[d])
}}a=c
},next:function(){return a.pop()
}}
};
Ext.Button=Ext.extend(Ext.Component,{hidden:false,disabled:false,pressed:false,enableToggle:false,menuAlign:"tl-bl?",type:"button",menuClassTarget:"tr",clickEvent:"click",handleMouseEvents:true,tooltipType:"qtip",buttonSelector:"button:first",initComponent:function(){Ext.Button.superclass.initComponent.call(this);
this.addEvents("click","toggle","mouseover","mouseout","menushow","menuhide","menutriggerover","menutriggerout");
if(this.menu){this.menu=Ext.menu.MenuMgr.get(this.menu)
}if(typeof this.toggleGroup==="string"){this.enableToggle=true
}},onRender:function(d,a){if(!this.template){if(!Ext.Button.buttonTemplate){Ext.Button.buttonTemplate=new Ext.Template('<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>','<td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><em unselectable="on"><button class="x-btn-text" type="{1}">{0}</button></em></td><td class="x-btn-right"><i>&#160;</i></td>',"</tr></tbody></table>")
}this.template=Ext.Button.buttonTemplate
}var e,b=[this.text||"&#160;",this.type];
if(a){e=this.template.insertBefore(a,b,true)
}else{e=this.template.append(d,b,true)
}var c=e.child(this.buttonSelector);
c.on("focus",this.onFocus,this);
c.on("blur",this.onBlur,this);
this.initButtonEl(e,c);
if(this.menu){this.el.child(this.menuClassTarget).addClass("x-btn-with-menu")
}Ext.ButtonToggleMgr.register(this)
},initButtonEl:function(c,b){this.el=c;
c.addClass("x-btn");
if(this.icon){b.setStyle("background-image","url("+this.icon+")")
}if(this.iconCls){b.addClass(this.iconCls);
if(!this.cls){c.addClass(this.text?"x-btn-text-icon":"x-btn-icon")
}}if(this.tabIndex!==undefined){b.dom.tabIndex=this.tabIndex
}if(this.tooltip){if(typeof this.tooltip=="object"){Ext.QuickTips.register(Ext.apply({target:b.id},this.tooltip))
}else{b.dom[this.tooltipType]=this.tooltip
}}if(this.pressed){this.el.addClass("x-btn-pressed")
}if(this.handleMouseEvents){c.on("mouseover",this.onMouseOver,this);
c.on("mousedown",this.onMouseDown,this)
}if(this.menu){this.menu.on("show",this.onMenuShow,this);
this.menu.on("hide",this.onMenuHide,this)
}if(this.id){this.el.dom.id=this.el.id=this.id
}if(this.repeat){var a=new Ext.util.ClickRepeater(c,typeof this.repeat=="object"?this.repeat:{});
a.on("click",this.onClick,this)
}c.on(this.clickEvent,this.onClick,this)
},afterRender:function(){Ext.Button.superclass.afterRender.call(this);
if(Ext.isIE6){this.autoWidth.defer(1,this)
}else{this.autoWidth()
}},setIconClass:function(a){if(this.el){this.el.child(this.buttonSelector).replaceClass(this.iconCls,a)
}this.iconCls=a
},beforeDestroy:function(){if(this.rendered){var a=this.el.child(this.buttonSelector);
if(a){a.removeAllListeners()
}}if(this.menu){Ext.destroy(this.menu)
}},onDestroy:function(){if(this.rendered){Ext.ButtonToggleMgr.unregister(this)
}},autoWidth:function(){if(this.el){this.el.setWidth("auto");
if(Ext.isIE7&&Ext.isStrict){var a=this.el.child(this.buttonSelector);
if(a&&a.getWidth()>20){a.clip();
a.setWidth(Ext.util.TextMetrics.measure(a,this.text).width+a.getFrameWidth("lr"))
}}if(this.minWidth){if(this.el.getWidth()<this.minWidth){this.el.setWidth(this.minWidth)
}}}},setHandler:function(b,a){this.handler=b;
this.scope=a
},setText:function(a){this.text=a;
if(this.el){this.el.child("td.x-btn-center "+this.buttonSelector).update(a)
}this.autoWidth()
},getText:function(){return this.text
},toggle:function(a){a=a===undefined?!this.pressed:a;
if(a!=this.pressed){if(a){this.el.addClass("x-btn-pressed");
this.pressed=true;
this.fireEvent("toggle",this,true)
}else{this.el.removeClass("x-btn-pressed");
this.pressed=false;
this.fireEvent("toggle",this,false)
}if(this.toggleHandler){this.toggleHandler.call(this.scope||this,this,a)
}}},focus:function(){this.el.child(this.buttonSelector).focus()
},onDisable:function(){if(this.el){if(!Ext.isIE6||!this.text){this.el.addClass(this.disabledClass)
}this.el.dom.disabled=true
}this.disabled=true
},onEnable:function(){if(this.el){if(!Ext.isIE6||!this.text){this.el.removeClass(this.disabledClass)
}this.el.dom.disabled=false
}this.disabled=false
},showMenu:function(){if(this.menu){this.menu.show(this.el,this.menuAlign)
}return this
},hideMenu:function(){if(this.menu){this.menu.hide()
}return this
},hasVisibleMenu:function(){return this.menu&&this.menu.isVisible()
},onClick:function(a){if(a){a.preventDefault()
}if(a.button!=0){return
}if(!this.disabled){if(this.enableToggle&&(this.allowDepress!==false||!this.pressed)){this.toggle()
}if(this.menu&&!this.menu.isVisible()&&!this.ignoreNextClick){this.showMenu()
}this.fireEvent("click",this,a);
if(this.handler){this.handler.call(this.scope||this,this,a)
}}},isMenuTriggerOver:function(b,a){return this.menu&&!a
},isMenuTriggerOut:function(b,a){return this.menu&&!a
},onMouseOver:function(b){if(!this.disabled){var a=b.within(this.el,true);
if(!a){this.el.addClass("x-btn-over");
Ext.getDoc().on("mouseover",this.monitorMouseOver,this);
this.fireEvent("mouseover",this,b)
}if(this.isMenuTriggerOver(b,a)){this.fireEvent("menutriggerover",this,this.menu,b)
}}},monitorMouseOver:function(a){if(a.target!=this.el.dom&&!a.within(this.el)){Ext.getDoc().un("mouseover",this.monitorMouseOver,this);
this.onMouseOut(a)
}},onMouseOut:function(b){var a=b.within(this.el)&&b.target!=this.el.dom;
this.el.removeClass("x-btn-over");
this.fireEvent("mouseout",this,b);
if(this.isMenuTriggerOut(b,a)){this.fireEvent("menutriggerout",this,this.menu,b)
}},onFocus:function(a){if(!this.disabled){this.el.addClass("x-btn-focus")
}},onBlur:function(a){this.el.removeClass("x-btn-focus")
},getClickEl:function(b,a){return this.el
},onMouseDown:function(a){if(!this.disabled&&a.button==0){this.getClickEl(a).addClass("x-btn-click");
Ext.getDoc().on("mouseup",this.onMouseUp,this)
}},onMouseUp:function(a){if(a.button==0){this.getClickEl(a,true).removeClass("x-btn-click");
Ext.getDoc().un("mouseup",this.onMouseUp,this)
}},onMenuShow:function(a){this.ignoreNextClick=0;
this.el.addClass("x-btn-menu-active");
this.fireEvent("menushow",this,this.menu)
},onMenuHide:function(a){this.el.removeClass("x-btn-menu-active");
this.ignoreNextClick=this.restoreClick.defer(250,this);
this.fireEvent("menuhide",this,this.menu)
},restoreClick:function(){this.ignoreNextClick=0
}});
Ext.reg("button",Ext.Button);
Ext.ButtonToggleMgr=function(){var a={};
function b(e,c){if(c){var d=a[e.toggleGroup];
for(var g=0,h=d.length;
g<h;
g++){if(d[g]!=e){d[g].toggle(false)
}}}}return{register:function(d){if(!d.toggleGroup){return
}var c=a[d.toggleGroup];
if(!c){c=a[d.toggleGroup]=[]
}c.push(d);
d.on("toggle",b)
},unregister:function(d){if(!d.toggleGroup){return
}var c=a[d.toggleGroup];
if(c){c.remove(d);
d.un("toggle",b)
}}}
}();
Ext.SplitButton=Ext.extend(Ext.Button,{arrowSelector:"button:last",initComponent:function(){Ext.SplitButton.superclass.initComponent.call(this);
this.addEvents("arrowclick")
},onRender:function(d,a){var g=new Ext.Template('<table cellspacing="0" class="x-btn-menu-wrap x-btn"><tr><td>','<table cellspacing="0" class="x-btn-wrap x-btn-menu-text-wrap"><tbody>','<tr><td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><button class="x-btn-text" type="{1}">{0}</button></td></tr>',"</tbody></table></td><td>",'<table cellspacing="0" class="x-btn-wrap x-btn-menu-arrow-wrap"><tbody>','<tr><td class="x-btn-center"><button class="x-btn-menu-arrow-el" type="button">&#160;</button></td><td class="x-btn-right"><i>&#160;</i></td></tr>',"</tbody></table></td></tr></table>");
var e,b=[this.text||"&#160;",this.type];
if(a){e=g.insertBefore(a,b,true)
}else{e=g.append(d,b,true)
}var c=e.child(this.buttonSelector);
this.initButtonEl(e,c);
this.arrowBtnTable=e.child("table:last");
if(this.arrowTooltip){e.child(this.arrowSelector).dom[this.tooltipType]=this.arrowTooltip
}},autoWidth:function(){if(this.el){var b=this.el.child("table:first");
var c=this.el.child("table:last");
this.el.setWidth("auto");
b.setWidth("auto");
if(Ext.isIE7&&Ext.isStrict){var a=this.el.child(this.buttonSelector);
if(a&&a.getWidth()>20){a.clip();
a.setWidth(Ext.util.TextMetrics.measure(a,this.text).width+a.getFrameWidth("lr"))
}}if(this.minWidth){if((b.getWidth()+c.getWidth())<this.minWidth){b.setWidth(this.minWidth-c.getWidth())
}}this.el.setWidth(b.getWidth()+c.getWidth())
}},setArrowHandler:function(b,a){this.arrowHandler=b;
this.scope=a
},onClick:function(a){a.preventDefault();
if(!this.disabled){if(a.getTarget(".x-btn-menu-arrow-wrap")){if(this.menu&&!this.menu.isVisible()&&!this.ignoreNextClick){this.showMenu()
}this.fireEvent("arrowclick",this,a);
if(this.arrowHandler){this.arrowHandler.call(this.scope||this,this,a)
}}else{if(this.enableToggle){this.toggle()
}this.fireEvent("click",this,a);
if(this.handler){this.handler.call(this.scope||this,this,a)
}}}},getClickEl:function(b,a){if(!a){return(this.lastClickEl=b.getTarget("table",10,true))
}return this.lastClickEl
},onDisable:function(){if(this.el){if(!Ext.isIE6){this.el.addClass("x-item-disabled")
}this.el.child(this.buttonSelector).dom.disabled=true;
this.el.child(this.arrowSelector).dom.disabled=true
}this.disabled=true
},onEnable:function(){if(this.el){if(!Ext.isIE6){this.el.removeClass("x-item-disabled")
}this.el.child(this.buttonSelector).dom.disabled=false;
this.el.child(this.arrowSelector).dom.disabled=false
}this.disabled=false
},isMenuTriggerOver:function(a){return this.menu&&a.within(this.arrowBtnTable)&&!a.within(this.arrowBtnTable,true)
},isMenuTriggerOut:function(b,a){return this.menu&&!b.within(this.arrowBtnTable)
},onDestroy:function(){Ext.destroy(this.arrowBtnTable);
Ext.SplitButton.superclass.onDestroy.call(this)
}});
Ext.MenuButton=Ext.SplitButton;
Ext.reg("splitbutton",Ext.SplitButton);
Ext.CycleButton=Ext.extend(Ext.SplitButton,{getItemText:function(a){if(a&&this.showText===true){var b="";
if(this.prependText){b+=this.prependText
}b+=a.text;
return b
}return undefined
},setActiveItem:function(b,a){if(typeof b!="object"){b=this.menu.items.get(b)
}if(b){if(!this.rendered){this.text=this.getItemText(b);
this.iconCls=b.iconCls
}else{var c=this.getItemText(b);
if(c){this.setText(c)
}this.setIconClass(b.iconCls)
}this.activeItem=b;
if(!b.checked){b.setChecked(true,true)
}if(this.forceIcon){this.setIconClass(this.forceIcon)
}if(!a){this.fireEvent("change",this,b)
}}},getActiveItem:function(){return this.activeItem
},initComponent:function(){this.addEvents("change");
if(this.changeHandler){this.on("change",this.changeHandler,this.scope||this);
delete this.changeHandler
}this.itemCount=this.items.length;
this.menu={cls:"x-cycle-menu",items:[]};
var b;
for(var d=0,a=this.itemCount;
d<a;
d++){var c=this.items[d];
c.group=c.group||this.id;
c.itemIndex=d;
c.checkHandler=this.checkHandler;
c.scope=this;
c.checked=c.checked||false;
this.menu.items.push(c);
if(c.checked){b=c
}}this.setActiveItem(b,true);
Ext.CycleButton.superclass.initComponent.call(this);
this.on("click",this.toggleSelected,this)
},checkHandler:function(a,b){if(b){this.setActiveItem(a)
}},toggleSelected:function(){this.menu.render();
var b,a;
for(var c=1;
c<this.itemCount;
c++){b=(this.activeItem.itemIndex+c)%this.itemCount;
a=this.menu.items.itemAt(b);
if(!a.disabled){a.setChecked(true);
break
}}}});
Ext.reg("cycle",Ext.CycleButton);
Ext.Toolbar=function(a){if(Ext.isArray(a)){a={buttons:a}
}Ext.Toolbar.superclass.constructor.call(this,a)
};
(function(){var a=Ext.Toolbar;
Ext.extend(a,Ext.BoxComponent,{trackMenus:true,initComponent:function(){a.superclass.initComponent.call(this);
if(this.items){this.buttons=this.items
}this.items=new Ext.util.MixedCollection(false,function(b){return b.itemId||b.id||Ext.id()
})
},autoCreate:{cls:"x-toolbar x-small-editor",html:'<table cellspacing="0"><tr></tr></table>'},onRender:function(b,c){this.el=b.createChild(Ext.apply({id:this.id},this.autoCreate),c);
this.tr=this.el.child("tr",true)
},afterRender:function(){a.superclass.afterRender.call(this);
if(this.buttons){this.add.apply(this,this.buttons);
delete this.buttons
}},add:function(){var d=arguments,e=d.length;
for(var c=0;
c<e;
c++){var b=d[c];
if(b.isFormField){this.addField(b)
}else{if(b.render){this.addItem(b)
}else{if(typeof b=="string"){if(b=="separator"||b=="-"){this.addSeparator()
}else{if(b==" "){this.addSpacer()
}else{if(b=="->"){this.addFill()
}else{this.addText(b)
}}}}else{if(b.tagName){this.addElement(b)
}else{if(typeof b=="object"){if(b.xtype){this.addField(Ext.ComponentMgr.create(b,"button"))
}else{this.addButton(b)
}}}}}}}},addSeparator:function(){return this.addItem(new a.Separator())
},addSpacer:function(){return this.addItem(new a.Spacer())
},addFill:function(){return this.addItem(new a.Fill())
},addElement:function(b){return this.addItem(new a.Item(b))
},addItem:function(c){var b=this.nextBlock();
this.initMenuTracking(c);
c.render(b);
this.items.add(c);
return c
},addButton:function(e){if(Ext.isArray(e)){var c=[];
for(var d=0,g=e.length;
d<g;
d++){c.push(this.addButton(e[d]))
}return c
}var h=e;
if(!(e instanceof a.Button)){h=e.split?new a.SplitButton(e):new a.Button(e)
}var b=this.nextBlock();
this.initMenuTracking(h);
h.render(b);
this.items.add(h);
return h
},initMenuTracking:function(b){if(this.trackMenus&&b.menu){b.on({menutriggerover:this.onButtonTriggerOver,menushow:this.onButtonMenuShow,menuhide:this.onButtonMenuHide,scope:this})
}},addText:function(b){return this.addItem(new a.TextItem(b))
},insertButton:function(g,c){if(Ext.isArray(c)){var d=[];
for(var e=0,h=c.length;
e<h;
e++){d.push(this.insertButton(g+e,c[e]))
}return d
}if(!(c instanceof a.Button)){c=new a.Button(c)
}var b=document.createElement("td");
this.tr.insertBefore(b,this.tr.childNodes[g]);
this.initMenuTracking(c);
c.render(b);
this.items.insert(g,c);
return c
},addDom:function(d,e){var b=this.nextBlock();
Ext.DomHelper.overwrite(b,d);
var c=new a.Item(b.firstChild);
c.render(b);
this.items.add(c);
return c
},addField:function(c){var b=this.nextBlock();
c.render(b);
var d=new a.Item(b.firstChild);
d.render(b);
this.items.add(d);
return d
},nextBlock:function(){var b=document.createElement("td");
this.tr.appendChild(b);
return b
},onDestroy:function(){Ext.Toolbar.superclass.onDestroy.call(this);
if(this.rendered){if(this.items){Ext.destroy.apply(Ext,this.items.items)
}Ext.Element.uncache(this.tr)
}},onDisable:function(){this.items.each(function(b){if(b.disable){b.disable()
}})
},onEnable:function(){this.items.each(function(b){if(b.enable){b.enable()
}})
},onButtonTriggerOver:function(b){if(this.activeMenuBtn&&this.activeMenuBtn!=b){this.activeMenuBtn.hideMenu();
b.showMenu();
this.activeMenuBtn=b
}},onButtonMenuShow:function(b){this.activeMenuBtn=b
},onButtonMenuHide:function(b){delete this.activeMenuBtn
}});
Ext.reg("toolbar",Ext.Toolbar);
a.Item=function(b){this.el=Ext.getDom(b);
this.id=Ext.id(this.el);
this.hidden=false
};
a.Item.prototype={getEl:function(){return this.el
},render:function(b){this.td=b;
b.appendChild(this.el)
},destroy:function(){if(this.td&&this.td.parentNode){this.td.parentNode.removeChild(this.td)
}},show:function(){this.hidden=false;
this.td.style.display=""
},hide:function(){this.hidden=true;
this.td.style.display="none"
},setVisible:function(b){if(b){this.show()
}else{this.hide()
}},focus:function(){Ext.fly(this.el).focus()
},disable:function(){Ext.fly(this.td).addClass("x-item-disabled");
this.disabled=true;
this.el.disabled=true
},enable:function(){Ext.fly(this.td).removeClass("x-item-disabled");
this.disabled=false;
this.el.disabled=false
}};
Ext.reg("tbitem",a.Item);
a.Separator=function(){var b=document.createElement("span");
b.className="ytb-sep";
a.Separator.superclass.constructor.call(this,b)
};
Ext.extend(a.Separator,a.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});
Ext.reg("tbseparator",a.Separator);
a.Spacer=function(){var b=document.createElement("div");
b.className="ytb-spacer";
a.Spacer.superclass.constructor.call(this,b)
};
Ext.extend(a.Spacer,a.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});
Ext.reg("tbspacer",a.Spacer);
a.Fill=Ext.extend(a.Spacer,{render:function(b){b.style.width="100%";
a.Fill.superclass.render.call(this,b)
}});
Ext.reg("tbfill",a.Fill);
a.TextItem=function(c){var b=document.createElement("span");
b.className="ytb-text";
b.innerHTML=c.text?c.text:c;
a.TextItem.superclass.constructor.call(this,b)
};
Ext.extend(a.TextItem,a.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});
Ext.reg("tbtext",a.TextItem);
a.Button=Ext.extend(Ext.Button,{hideParent:true,onDestroy:function(){a.Button.superclass.onDestroy.call(this);
if(this.container){this.container.remove()
}}});
Ext.reg("tbbutton",a.Button);
a.SplitButton=Ext.extend(Ext.SplitButton,{hideParent:true,onDestroy:function(){a.SplitButton.superclass.onDestroy.call(this);
if(this.container){this.container.remove()
}}});
Ext.reg("tbsplit",a.SplitButton);
a.MenuButton=a.SplitButton
})();
Ext.PagingToolbar=Ext.extend(Ext.Toolbar,{pageSize:20,displayMsg:"Displaying {0} - {1} of {2}",emptyMsg:"No data to display",beforePageText:"Page",afterPageText:"of {0}",firstText:"First Page",prevText:"Previous Page",nextText:"Next Page",lastText:"Last Page",refreshText:"Refresh",paramNames:{start:"start",limit:"limit"},initComponent:function(){Ext.PagingToolbar.superclass.initComponent.call(this);
this.cursor=0;
this.bind(this.store)
},onRender:function(b,a){Ext.PagingToolbar.superclass.onRender.call(this,b,a);
this.first=this.addButton({tooltip:this.firstText,iconCls:"x-tbar-page-first",disabled:true,handler:this.onClick.createDelegate(this,["first"])});
this.prev=this.addButton({tooltip:this.prevText,iconCls:"x-tbar-page-prev",disabled:true,handler:this.onClick.createDelegate(this,["prev"])});
this.addSeparator();
this.add(this.beforePageText);
this.field=Ext.get(this.addDom({tag:"input",type:"text",size:"3",value:"1",cls:"x-tbar-page-number"}).el);
this.field.on("keydown",this.onPagingKeydown,this);
this.field.on("focus",function(){this.dom.select()
});
this.afterTextEl=this.addText(String.format(this.afterPageText,1));
this.field.setHeight(18);
this.addSeparator();
this.next=this.addButton({tooltip:this.nextText,iconCls:"x-tbar-page-next",disabled:true,handler:this.onClick.createDelegate(this,["next"])});
this.last=this.addButton({tooltip:this.lastText,iconCls:"x-tbar-page-last",disabled:true,handler:this.onClick.createDelegate(this,["last"])});
this.addSeparator();
this.loading=this.addButton({tooltip:this.refreshText,iconCls:"x-tbar-loading",handler:this.onClick.createDelegate(this,["refresh"])});
if(this.displayInfo){this.displayEl=Ext.fly(this.el.dom).createChild({cls:"x-paging-info"})
}if(this.dsLoaded){this.onLoad.apply(this,this.dsLoaded)
}},updateInfo:function(){if(this.displayEl){var a=this.store.getCount();
var b=a==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+a,this.store.getTotalCount());
this.displayEl.update(b)
}},onLoad:function(a,e,b){if(!this.rendered){this.dsLoaded=[a,e,b];
return
}this.cursor=b.params?b.params[this.paramNames.start]:0;
var c=this.getPageData(),g=c.activePage,d=c.pages;
this.afterTextEl.el.innerHTML=String.format(this.afterPageText,c.pages);
this.field.dom.value=g;
this.first.setDisabled(g==1);
this.prev.setDisabled(g==1);
this.next.setDisabled(g==d);
this.last.setDisabled(g==d);
this.loading.enable();
this.updateInfo()
},getPageData:function(){var a=this.store.getTotalCount();
return{total:a,activePage:Math.ceil((this.cursor+this.pageSize)/this.pageSize),pages:a<this.pageSize?1:Math.ceil(a/this.pageSize)}
},onLoadError:function(){if(!this.rendered){return
}this.loading.enable()
},readPage:function(b){var a=this.field.dom.value,c;
if(!a||isNaN(c=parseInt(a,10))){this.field.dom.value=b.activePage;
return false
}return c
},onPagingKeydown:function(c){var e=c.getKey(),b=this.getPageData(),d;
if(e==c.RETURN){c.stopEvent();
if(d=this.readPage(b)){d=Math.min(Math.max(1,d),b.pages)-1;
this.doLoad(d*this.pageSize)
}}else{if(e==c.HOME||e==c.END){c.stopEvent();
d=e==c.HOME?1:b.pages;
this.field.dom.value=d
}else{if(e==c.UP||e==c.PAGEUP||e==c.DOWN||e==c.PAGEDOWN){c.stopEvent();
if(d=this.readPage(b)){var a=c.shiftKey?10:1;
if(e==c.DOWN||e==c.PAGEDOWN){a*=-1
}d+=a;
if(d>=1&d<=b.pages){this.field.dom.value=d
}}}}}},beforeLoad:function(){if(this.rendered&&this.loading){this.loading.disable()
}},doLoad:function(b){var c={},a=this.paramNames;
c[a.start]=b;
c[a.limit]=this.pageSize;
this.store.load({params:c})
},onClick:function(b){var e=this.store;
switch(b){case"first":this.doLoad(0);
break;
case"prev":this.doLoad(Math.max(0,this.cursor-this.pageSize));
break;
case"next":this.doLoad(this.cursor+this.pageSize);
break;
case"last":var c=e.getTotalCount();
var a=c%this.pageSize;
var d=a?(c-a):c-this.pageSize;
this.doLoad(d);
break;
case"refresh":this.doLoad(this.cursor);
break
}},unbind:function(a){a=Ext.StoreMgr.lookup(a);
a.un("beforeload",this.beforeLoad,this);
a.un("load",this.onLoad,this);
a.un("loadexception",this.onLoadError,this);
this.store=undefined
},bind:function(a){a=Ext.StoreMgr.lookup(a);
a.on("beforeload",this.beforeLoad,this);
a.on("load",this.onLoad,this);
a.on("loadexception",this.onLoadError,this);
this.store=a
}});
Ext.reg("paging",Ext.PagingToolbar);
Ext.Resizable=function(a,o){this.el=Ext.get(a);
if(o&&o.wrap){o.resizeChild=this.el;
this.el=this.el.wrap(typeof o.wrap=="object"?o.wrap:{cls:"xresizable-wrap"});
this.el.id=this.el.dom.id=o.resizeChild.id+"-rzwrap";
this.el.setStyle("overflow","hidden");
this.el.setPositioning(o.resizeChild.getPositioning());
o.resizeChild.clearPositioning();
if(!o.width||!o.height){var n=o.resizeChild.getSize();
this.el.setSize(n.width,n.height)
}if(o.pinned&&!o.adjustments){o.adjustments="auto"
}}this.proxy=this.el.createProxy({tag:"div",cls:"x-resizable-proxy",id:this.el.id+"-rzproxy"});
this.proxy.unselectable();
this.proxy.enableDisplayMode("block");
Ext.apply(this,o);
if(this.pinned){this.disableTrackOver=true;
this.el.addClass("x-resizable-pinned")
}var k=this.el.getStyle("position");
if(k!="absolute"&&k!="fixed"){this.el.setStyle("position","relative")
}if(!this.handles){this.handles="s,e,se";
if(this.multiDirectional){this.handles+=",n,w"
}}if(this.handles=="all"){this.handles="n s e w ne nw se sw"
}var e=this.handles.split(/\s*?[,;]\s*?| /);
var b=Ext.Resizable.positions;
for(var l=0,i=e.length;
l<i;
l++){if(e[l]&&b[e[l]]){var g=b[e[l]];
this[g]=new Ext.Resizable.Handle(this,g,this.disableTrackOver,this.transparent)
}}this.corner=this.southeast;
if(this.handles.indexOf("n")!=-1||this.handles.indexOf("w")!=-1){this.updateBox=true
}this.activeHandle=null;
if(this.resizeChild){if(typeof this.resizeChild=="boolean"){this.resizeChild=Ext.get(this.el.dom.firstChild,true)
}else{this.resizeChild=Ext.get(this.resizeChild,true)
}}if(this.adjustments=="auto"){var c=this.resizeChild;
var h=this.west,m=this.east,d=this.north,e=this.south;
if(c&&(h||d)){c.position("relative");
c.setLeft(h?h.el.getWidth():0);
c.setTop(d?d.el.getHeight():0)
}this.adjustments=[(m?-m.el.getWidth():0)+(h?-h.el.getWidth():0),(d?-d.el.getHeight():0)+(e?-e.el.getHeight():0)-1]
}if(this.draggable){this.dd=this.dynamic?this.el.initDD(null):this.el.initDDProxy(null,{dragElId:this.proxy.id});
this.dd.setHandleElId(this.resizeChild?this.resizeChild.id:this.el.id)
}this.addEvents("beforeresize","resize");
if(this.width!==null&&this.height!==null){this.resizeTo(this.width,this.height)
}else{this.updateChildSize()
}if(Ext.isIE){this.el.dom.style.zoom=1
}Ext.Resizable.superclass.constructor.call(this)
};
Ext.extend(Ext.Resizable,Ext.util.Observable,{resizeChild:false,adjustments:[0,0],minWidth:5,minHeight:5,maxWidth:10000,maxHeight:10000,enabled:true,animate:false,duration:0.35,dynamic:false,handles:false,multiDirectional:false,disableTrackOver:false,easing:"easeOutStrong",widthIncrement:0,heightIncrement:0,pinned:false,width:null,height:null,preserveRatio:false,transparent:false,minX:0,minY:0,draggable:false,resizeTo:function(b,a){this.el.setSize(b,a);
this.updateChildSize();
this.fireEvent("resize",this,b,a,null)
},startSizing:function(b,c){this.fireEvent("beforeresize",this,b);
if(this.enabled){if(!this.overlay){this.overlay=this.el.createProxy({tag:"div",cls:"x-resizable-overlay",html:"&#160;"},Ext.getBody());
this.overlay.unselectable();
this.overlay.enableDisplayMode("block");
this.overlay.on("mousemove",this.onMouseMove,this);
this.overlay.on("mouseup",this.onMouseUp,this)
}this.overlay.setStyle("cursor",c.el.getStyle("cursor"));
this.resizing=true;
this.startBox=this.el.getBox();
this.startPoint=b.getXY();
this.offsets=[(this.startBox.x+this.startBox.width)-this.startPoint[0],(this.startBox.y+this.startBox.height)-this.startPoint[1]];
this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.overlay.show();
if(this.constrainTo){var a=Ext.get(this.constrainTo);
this.resizeRegion=a.getRegion().adjust(a.getFrameWidth("t"),a.getFrameWidth("l"),-a.getFrameWidth("b"),-a.getFrameWidth("r"))
}this.proxy.setStyle("visibility","hidden");
this.proxy.show();
this.proxy.setBox(this.startBox);
if(!this.dynamic){this.proxy.setStyle("visibility","visible")
}}},onMouseDown:function(a,b){if(this.enabled){b.stopEvent();
this.activeHandle=a;
this.startSizing(b,a)
}},onMouseUp:function(b){var a=this.resizeElement();
this.resizing=false;
this.handleOut();
this.overlay.hide();
this.proxy.hide();
this.fireEvent("resize",this,a.width,a.height,b)
},updateChildSize:function(){if(this.resizeChild){var c=this.el;
var b=this.resizeChild;
var d=this.adjustments;
if(c.dom.offsetWidth){var a=c.getSize(true);
b.setSize(a.width+d[0],a.height+d[1])
}if(Ext.isIE){setTimeout(function(){if(c.dom.offsetWidth){var e=c.getSize(true);
b.setSize(e.width+d[0],e.height+d[1])
}},10)
}}},snap:function(d,b,e){if(!b||!d){return d
}var c=d;
var a=d%b;
if(a>0){if(a>(b/2)){c=d+(b-a)
}else{c=d-a
}}return Math.max(e,c)
},resizeElement:function(){var a=this.proxy.getBox();
if(this.updateBox){this.el.setBox(a,false,this.animate,this.duration,null,this.easing)
}else{this.el.setSize(a.width,a.height,this.animate,this.duration,null,this.easing)
}this.updateChildSize();
if(!this.dynamic){this.proxy.hide()
}return a
},constrain:function(d,c,a,b){if(d-c<a){c=d-a
}else{if(d-c>b){c=b-d
}}return c
},onMouseMove:function(g){if(this.enabled){try{if(this.resizeRegion&&!this.resizeRegion.contains(g.getPoint())){return
}var i=this.curSize||this.startBox;
var r=this.startBox.x,s=this.startBox.y;
var x=r,y=s;
var q=i.width,h=i.height;
var w=q,o=h;
var p=this.minWidth,e=this.minHeight;
var k=this.maxWidth,b=this.maxHeight;
var u=this.widthIncrement;
var z=this.heightIncrement;
var d=g.getXY();
var l=-(this.startPoint[0]-Math.max(this.minX,d[0]));
var n=-(this.startPoint[1]-Math.max(this.minY,d[1]));
var t=this.activeHandle.position;
switch(t){case"east":q+=l;
q=Math.min(Math.max(p,q),k);
break;
case"south":h+=n;
h=Math.min(Math.max(e,h),b);
break;
case"southeast":q+=l;
h+=n;
q=Math.min(Math.max(p,q),k);
h=Math.min(Math.max(e,h),b);
break;
case"north":n=this.constrain(h,n,e,b);
s+=n;
h-=n;
break;
case"west":l=this.constrain(q,l,p,k);
r+=l;
q-=l;
break;
case"northeast":q+=l;
q=Math.min(Math.max(p,q),k);
n=this.constrain(h,n,e,b);
s+=n;
h-=n;
break;
case"northwest":l=this.constrain(q,l,p,k);
n=this.constrain(h,n,e,b);
s+=n;
h-=n;
r+=l;
q-=l;
break;
case"southwest":l=this.constrain(q,l,p,k);
h+=n;
h=Math.min(Math.max(e,h),b);
r+=l;
q-=l;
break
}var m=this.snap(q,u,p);
var c=this.snap(h,z,e);
if(m!=q||c!=h){switch(t){case"northeast":s-=c-h;
break;
case"north":s-=c-h;
break;
case"southwest":r-=m-q;
break;
case"west":r-=m-q;
break;
case"northwest":r-=m-q;
s-=c-h;
break
}q=m;
h=c
}if(this.preserveRatio){switch(t){case"southeast":case"east":h=o*(q/w);
h=Math.min(Math.max(e,h),b);
q=w*(h/o);
break;
case"south":q=w*(h/o);
q=Math.min(Math.max(p,q),k);
h=o*(q/w);
break;
case"northeast":q=w*(h/o);
q=Math.min(Math.max(p,q),k);
h=o*(q/w);
break;
case"north":var a=q;
q=w*(h/o);
q=Math.min(Math.max(p,q),k);
h=o*(q/w);
r+=(a-q)/2;
break;
case"southwest":h=o*(q/w);
h=Math.min(Math.max(e,h),b);
var a=q;
q=w*(h/o);
r+=a-q;
break;
case"west":var v=h;
h=o*(q/w);
h=Math.min(Math.max(e,h),b);
s+=(v-h)/2;
var a=q;
q=w*(h/o);
r+=a-q;
break;
case"northwest":var a=q;
var v=h;
h=o*(q/w);
h=Math.min(Math.max(e,h),b);
q=w*(h/o);
s+=v-h;
r+=a-q;
break
}}this.proxy.setBounds(r,s,q,h);
if(this.dynamic){this.resizeElement()
}}catch(g){}}},handleOver:function(){if(this.enabled){this.el.addClass("x-resizable-over")
}},handleOut:function(){if(!this.resizing){this.el.removeClass("x-resizable-over")
}},getEl:function(){return this.el
},getResizeChild:function(){return this.resizeChild
},destroy:function(c){this.proxy.remove();
if(this.overlay){this.overlay.removeAllListeners();
this.overlay.remove()
}var b=Ext.Resizable.positions;
for(var a in b){if(typeof b[a]!="function"&&this[b[a]]){var d=this[b[a]];
d.el.removeAllListeners();
d.el.remove()
}}if(c){this.el.update("");
this.el.remove()
}},syncHandleHeight:function(){var a=this.el.getHeight(true);
if(this.west){this.west.el.setHeight(a)
}if(this.east){this.east.el.setHeight(a)
}}});
Ext.Resizable.positions={n:"north",s:"south",e:"east",w:"west",se:"southeast",sw:"southwest",nw:"northwest",ne:"northeast"};
Ext.Resizable.Handle=function(d,b,e,c){if(!this.tpl){var a=Ext.DomHelper.createTemplate({tag:"div",cls:"x-resizable-handle x-resizable-handle-{0}"});
a.compile();
Ext.Resizable.Handle.prototype.tpl=a
}this.position=b;
this.rz=d;
this.el=this.tpl.append(d.el.dom,[this.position],true);
this.el.unselectable();
if(c){this.el.setOpacity(0)
}this.el.on("mousedown",this.onMouseDown,this);
if(!e){this.el.on("mouseover",this.onMouseOver,this);
this.el.on("mouseout",this.onMouseOut,this)
}};
Ext.Resizable.Handle.prototype={afterResize:function(a){},onMouseDown:function(a){this.rz.onMouseDown(this,a)
},onMouseOver:function(a){this.rz.handleOver(this,a)
},onMouseOut:function(a){this.rz.handleOut(this,a)
}};
Ext.Editor=function(b,a){this.field=b;
Ext.Editor.superclass.constructor.call(this,a)
};
Ext.extend(Ext.Editor,Ext.Component,{value:"",alignment:"c-c?",shadow:"frame",constrain:false,swallowKeys:true,completeOnEnter:false,cancelOnEsc:false,updateEl:false,initComponent:function(){Ext.Editor.superclass.initComponent.call(this);
this.addEvents("beforestartedit","startedit","beforecomplete","complete","specialkey")
},onRender:function(b,a){this.el=new Ext.Layer({shadow:this.shadow,cls:"x-editor",parentEl:b,shim:this.shim,shadowOffset:4,id:this.id,constrain:this.constrain});
this.el.setStyle("overflow",Ext.isGecko?"auto":"hidden");
if(this.field.msgTarget!="title"){this.field.msgTarget="qtip"
}this.field.inEditor=true;
this.field.render(this.el);
if(Ext.isGecko){this.field.el.dom.setAttribute("autocomplete","off")
}this.field.on("specialkey",this.onSpecialKey,this);
if(this.swallowKeys){this.field.el.swallowEvent(["keydown","keypress"])
}this.field.show();
this.field.on("blur",this.onBlur,this);
if(this.field.grow){this.field.on("autosize",this.el.sync,this.el,{delay:1})
}},onSpecialKey:function(b,a){if(this.completeOnEnter&&a.getKey()==a.ENTER){a.stopEvent();
this.completeEdit()
}else{if(this.cancelOnEsc&&a.getKey()==a.ESC){this.cancelEdit()
}else{this.fireEvent("specialkey",b,a)
}}},startEdit:function(c,b){if(this.editing){this.completeEdit()
}this.boundEl=Ext.get(c);
var a=b!==undefined?b:this.boundEl.dom.innerHTML;
if(!this.rendered){this.render(this.parentEl||document.body)
}if(this.fireEvent("beforestartedit",this,this.boundEl,a)===false){return
}this.startValue=a;
this.field.setValue(a);
this.doAutoSize();
this.el.alignTo(this.boundEl,this.alignment);
this.editing=true;
this.show()
},doAutoSize:function(){if(this.autoSize){var a=this.boundEl.getSize();
switch(this.autoSize){case"width":this.setSize(a.width,"");
break;
case"height":this.setSize("",a.height);
break;
default:this.setSize(a.width,a.height)
}}},setSize:function(a,b){delete this.field.lastSize;
this.field.setSize(a,b);
if(this.el){this.el.sync()
}},realign:function(){this.el.alignTo(this.boundEl,this.alignment)
},completeEdit:function(a){if(!this.editing){return
}var b=this.getValue();
if(this.revertInvalid!==false&&!this.field.isValid()){b=this.startValue;
this.cancelEdit(true)
}if(String(b)===String(this.startValue)&&this.ignoreNoChange){this.editing=false;
this.hide();
return
}if(this.fireEvent("beforecomplete",this,b,this.startValue)!==false){this.editing=false;
if(this.updateEl&&this.boundEl){this.boundEl.update(b)
}if(a!==true){this.hide()
}this.fireEvent("complete",this,b,this.startValue)
}},onShow:function(){this.el.show();
if(this.hideEl!==false){this.boundEl.hide()
}this.field.show();
if(Ext.isIE&&!this.fixIEFocus){this.fixIEFocus=true;
this.deferredFocus.defer(50,this)
}else{this.field.focus()
}this.fireEvent("startedit",this.boundEl,this.startValue)
},deferredFocus:function(){if(this.editing){this.field.focus()
}},cancelEdit:function(a){if(this.editing){this.setValue(this.startValue);
if(a!==true){this.hide()
}}},onBlur:function(){if(this.allowBlur!==true&&this.editing){this.completeEdit()
}},onHide:function(){if(this.editing){this.completeEdit();
return
}this.field.blur();
if(this.field.collapse){this.field.collapse()
}this.el.hide();
if(this.hideEl!==false){this.boundEl.show()
}},setValue:function(a){this.field.setValue(a)
},getValue:function(){return this.field.getValue()
},beforeDestroy:function(){this.field.destroy();
this.field=null
}});
Ext.reg("editor",Ext.Editor);
Ext.MessageBox=function(){var c,u,h,d;
var p,m,e,v,l,i,o,q;
var g,b,k,t="";
var s=function(w){c.hide();
Ext.callback(u.fn,u.scope||window,[w,b.dom.value],1)
};
var a=function(){if(u&&u.cls){c.el.removeClass(u.cls)
}l.reset()
};
var r=function(w,y,x){if(u&&u.closable!==false){c.hide()
}if(x){x.stopEvent()
}};
var n=function(y){var w=0;
if(!y){g.ok.hide();
g.cancel.hide();
g.yes.hide();
g.no.hide();
return w
}c.footer.dom.style.display="";
for(var x in g){if(typeof g[x]!="function"){if(y[x]){g[x].show();
g[x].setText(typeof y[x]=="string"?y[x]:Ext.MessageBox.buttonText[x]);
w+=g[x].el.getWidth()+15
}else{g[x].hide()
}}}return w
};
return{getDialog:function(y){if(!c){c=new Ext.Window({autoCreate:true,title:y,resizable:false,constrain:true,constrainHeader:true,minimizable:false,maximizable:false,stateful:false,modal:true,shim:true,buttonAlign:"center",width:400,height:100,minHeight:80,plain:true,footer:true,closable:true,close:function(){if(u&&u.buttons&&u.buttons.no&&!u.buttons.cancel){s("no")
}else{s("cancel")
}}});
g={};
var x=this.buttonText;
g.ok=c.addButton(x.ok,s.createCallback("ok"));
g.yes=c.addButton(x.yes,s.createCallback("yes"));
g.no=c.addButton(x.no,s.createCallback("no"));
g.cancel=c.addButton(x.cancel,s.createCallback("cancel"));
g.ok.hideMode=g.yes.hideMode=g.no.hideMode=g.cancel.hideMode="offsets";
c.render(document.body);
c.getEl().addClass("x-window-dlg");
h=c.mask;
p=c.body.createChild({html:'<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div>'});
o=Ext.get(p.dom.firstChild);
var w=p.dom.childNodes[1];
m=Ext.get(w.firstChild);
e=Ext.get(w.childNodes[2]);
e.enableDisplayMode();
e.addKeyListener([10,13],function(){if(c.isVisible()&&u&&u.buttons){if(u.buttons.ok){s("ok")
}else{if(u.buttons.yes){s("yes")
}}}});
v=Ext.get(w.childNodes[3]);
v.enableDisplayMode();
l=new Ext.ProgressBar({renderTo:p});
p.createChild({cls:"x-clear"})
}return c
},updateText:function(B){if(!c.isVisible()&&!u.width){c.setSize(this.maxWidth,100)
}m.update(B||"&#160;");
var x=t!=""?(o.getWidth()+o.getMargins("lr")):0;
var z=m.getWidth()+m.getMargins("lr");
var w=c.getFrameWidth("lr");
var A=c.body.getFrameWidth("lr");
if(Ext.isIE&&x>0){x+=3
}var y=Math.max(Math.min(u.width||x+z+w+A,this.maxWidth),Math.max(u.minWidth||this.minWidth,k||0));
if(u.prompt===true){b.setWidth(y-x-w-A)
}if(u.progress===true||u.wait===true){l.setSize(y-x-w-A)
}c.setSize(y,"auto").center();
return this
},updateProgress:function(x,y,w){l.updateProgress(x,y);
if(w){this.updateText(w)
}return this
},isVisible:function(){return c&&c.isVisible()
},hide:function(){if(this.isVisible()){c.hide();
a()
}return this
},show:function(A){if(this.isVisible()){this.hide()
}u=A;
var z=this.getDialog(u.title||"&#160;");
z.setTitle(u.title||"&#160;");
var y=(u.closable!==false&&u.progress!==true&&u.wait!==true);
z.tools.close.setDisplayed(y);
b=e;
u.prompt=u.prompt||(u.multiline?true:false);
if(u.prompt){if(u.multiline){e.hide();
v.show();
v.setHeight(typeof u.multiline=="number"?u.multiline:this.defaultTextHeight);
b=v
}else{e.show();
v.hide()
}}else{e.hide();
v.hide()
}b.dom.value=u.value||"";
if(u.prompt){z.focusEl=b
}else{var w=u.buttons;
var x=null;
if(w&&w.ok){x=g.ok
}else{if(w&&w.yes){x=g.yes
}}if(x){z.focusEl=x
}}this.setIcon(u.icon);
k=n(u.buttons);
l.setVisible(u.progress===true||u.wait===true);
this.updateProgress(0,u.progressText);
this.updateText(u.msg);
if(u.cls){z.el.addClass(u.cls)
}z.proxyDrag=u.proxyDrag===true;
z.modal=u.modal!==false;
z.mask=u.modal!==false?h:false;
if(!z.isVisible()){document.body.appendChild(c.el.dom);
z.setAnimateTarget(u.animEl);
z.show(u.animEl)
}z.on("show",function(){if(y===true){z.keyMap.enable()
}else{z.keyMap.disable()
}},this,{single:true});
if(u.wait===true){l.wait(u.waitConfig)
}return this
},setIcon:function(w){if(w&&w!=""){o.removeClass("x-hidden");
o.replaceClass(t,w);
t=w
}else{o.replaceClass(t,"x-hidden");
t=""
}return this
},progress:function(w,x,y){this.show({title:w,msg:x,buttons:false,progress:true,closable:false,minWidth:this.minProgressWidth,progressText:y});
return this
},wait:function(w,x,y){this.show({title:x,msg:w,buttons:false,closable:false,wait:true,modal:true,minWidth:this.minProgressWidth,waitConfig:y});
return this
},alert:function(z,w,x,y){this.show({title:z,msg:w,buttons:this.OK,fn:x,scope:y});
return this
},confirm:function(z,w,x,y){this.show({title:z,msg:w,buttons:this.YESNO,fn:x,scope:y,icon:this.QUESTION});
return this
},prompt:function(z,A,w,x,y){this.show({title:z,msg:A,buttons:this.OKCANCEL,fn:w,minWidth:250,scope:x,prompt:true,multiline:y});
return this
},OK:{ok:true},CANCEL:{cancel:true},OKCANCEL:{ok:true,cancel:true},YESNO:{yes:true,no:true},YESNOCANCEL:{yes:true,no:true,cancel:true},INFO:"ext-mb-info",WARNING:"ext-mb-warning",QUESTION:"ext-mb-question",ERROR:"ext-mb-error",defaultTextHeight:75,maxWidth:600,minWidth:100,minProgressWidth:250,buttonText:{ok:"OK",cancel:"Cancel",yes:"Yes",no:"No"}}
}();
Ext.Msg=Ext.MessageBox;
Ext.Tip=Ext.extend(Ext.Panel,{minWidth:40,maxWidth:300,shadow:"sides",defaultAlign:"tl-bl?",autoRender:true,quickShowInterval:250,frame:true,hidden:true,baseCls:"x-tip",floating:{shadow:true,shim:true,useDisplay:true,constrain:false},autoHeight:true,initComponent:function(){Ext.Tip.superclass.initComponent.call(this);
if(this.closable&&!this.title){this.elements+=",header"
}},afterRender:function(){Ext.Tip.superclass.afterRender.call(this);
if(this.closable){this.addTool({id:"close",handler:this.hide,scope:this})
}},showAt:function(a){Ext.Tip.superclass.show.call(this);
if(this.measureWidth!==false&&(!this.initialConfig||typeof this.initialConfig.width!="number")){var b=this.body.getTextWidth();
if(this.title){b=Math.max(b,this.header.child("span").getTextWidth(this.title))
}b+=this.getFrameWidth()+(this.closable?20:0)+this.body.getPadding("lr");
this.setWidth(b.constrain(this.minWidth,this.maxWidth))
}if(this.constrainPosition){a=this.el.adjustForConstraints(a)
}this.setPagePosition(a[0],a[1])
},showBy:function(a,b){if(!this.rendered){this.render(Ext.getBody())
}this.showAt(this.el.getAlignToXY(a,b||this.defaultAlign))
},initDraggable:function(){this.dd=new Ext.Tip.DD(this,typeof this.draggable=="boolean"?null:this.draggable);
this.header.addClass("x-tip-draggable")
}});
Ext.Tip.DD=function(b,a){Ext.apply(this,a);
this.tip=b;
Ext.Tip.DD.superclass.constructor.call(this,b.el.id,"WindowDD-"+b.id);
this.setHandleElId(b.header.id);
this.scroll=false
};
Ext.extend(Ext.Tip.DD,Ext.dd.DD,{moveOnly:true,scroll:false,headerOffsets:[100,25],startDrag:function(){this.tip.el.disableShadow()
},endDrag:function(a){this.tip.el.enableShadow(true)
}});
Ext.ToolTip=Ext.extend(Ext.Tip,{showDelay:500,hideDelay:200,dismissDelay:5000,mouseOffset:[15,18],trackMouse:false,constrainPosition:true,initComponent:function(){Ext.ToolTip.superclass.initComponent.call(this);
this.lastActive=new Date();
this.initTarget()
},initTarget:function(){if(this.target){this.target=Ext.get(this.target);
this.target.on("mouseover",this.onTargetOver,this);
this.target.on("mouseout",this.onTargetOut,this);
this.target.on("mousemove",this.onMouseMove,this)
}},onMouseMove:function(a){this.targetXY=a.getXY();
if(!this.hidden&&this.trackMouse){this.setPagePosition(this.getTargetXY())
}},getTargetXY:function(){return[this.targetXY[0]+this.mouseOffset[0],this.targetXY[1]+this.mouseOffset[1]]
},onTargetOver:function(a){if(this.disabled||a.within(this.target.dom,true)){return
}this.clearTimer("hide");
this.targetXY=a.getXY();
this.delayShow()
},delayShow:function(){if(this.hidden&&!this.showTimer){if(this.lastActive.getElapsed()<this.quickShowInterval){this.show()
}else{this.showTimer=this.show.defer(this.showDelay,this)
}}else{if(!this.hidden&&this.autoHide!==false){this.show()
}}},onTargetOut:function(a){if(this.disabled||a.within(this.target.dom,true)){return
}this.clearTimer("show");
if(this.autoHide!==false){this.delayHide()
}},delayHide:function(){if(!this.hidden&&!this.hideTimer){this.hideTimer=this.hide.defer(this.hideDelay,this)
}},hide:function(){this.clearTimer("dismiss");
this.lastActive=new Date();
Ext.ToolTip.superclass.hide.call(this)
},show:function(){this.showAt(this.getTargetXY())
},showAt:function(a){this.lastActive=new Date();
this.clearTimers();
Ext.ToolTip.superclass.showAt.call(this,a);
if(this.dismissDelay&&this.autoHide!==false){this.dismissTimer=this.hide.defer(this.dismissDelay,this)
}},clearTimer:function(a){a=a+"Timer";
clearTimeout(this[a]);
delete this[a]
},clearTimers:function(){this.clearTimer("show");
this.clearTimer("dismiss");
this.clearTimer("hide")
},onShow:function(){Ext.ToolTip.superclass.onShow.call(this);
Ext.getDoc().on("mousedown",this.onDocMouseDown,this)
},onHide:function(){Ext.ToolTip.superclass.onHide.call(this);
Ext.getDoc().un("mousedown",this.onDocMouseDown,this)
},onDocMouseDown:function(a){if(this.autoHide!==false&&!a.within(this.el.dom)){this.disable();
this.enable.defer(100,this)
}},onDisable:function(){this.clearTimers();
this.hide()
},adjustPosition:function(a,b){var c=this.targetXY[1],d=this.getSize().height;
if(this.constrainPosition&&b<=c&&(b+d)>=c){b=c-d-5
}return{x:a,y:b}
},onDestroy:function(){Ext.ToolTip.superclass.onDestroy.call(this);
if(this.target){this.target.un("mouseover",this.onTargetOver,this);
this.target.un("mouseout",this.onTargetOut,this);
this.target.un("mousemove",this.onMouseMove,this)
}}});
Ext.QuickTip=Ext.extend(Ext.ToolTip,{interceptTitles:false,tagConfig:{namespace:"ext",attribute:"qtip",width:"qwidth",target:"target",title:"qtitle",hide:"hide",cls:"qclass",align:"qalign"},initComponent:function(){this.target=this.target||Ext.getDoc();
this.targets=this.targets||{};
Ext.QuickTip.superclass.initComponent.call(this)
},register:function(g){var d=Ext.isArray(g)?g:arguments;
for(var e=0,a=d.length;
e<a;
e++){var b=d[e];
var c=b.target;
if(c){if(Ext.isArray(c)){for(var h=0,i=c.length;
h<i;
h++){this.targets[Ext.id(c[h])]=b
}}else{this.targets[Ext.id(c)]=b
}}}},unregister:function(a){delete this.targets[Ext.id(a)]
},onTargetOver:function(b){if(this.disabled){return
}this.targetXY=b.getXY();
var g=b.getTarget();
if(!g||g.nodeType!==1||g==document||g==document.body){return
}if(this.activeTarget&&g==this.activeTarget.el){this.clearTimer("hide");
this.show();
return
}if(g&&this.targets[g.id]){this.activeTarget=this.targets[g.id];
this.activeTarget.el=g;
this.delayShow();
return
}var d,c=Ext.fly(g),h=this.tagConfig;
var e=h.namespace;
if(this.interceptTitles&&g.title){d=g.title;
g.qtip=d;
g.removeAttribute("title");
b.preventDefault()
}else{d=g.qtip||c.getAttributeNS(e,h.attribute)
}if(d){var a=c.getAttributeNS(e,h.hide);
this.activeTarget={el:g,text:d,width:c.getAttributeNS(e,h.width),autoHide:a!="user"&&a!=="false",title:c.getAttributeNS(e,h.title),cls:c.getAttributeNS(e,h.cls),align:c.getAttributeNS(e,h.align)};
this.delayShow()
}},onTargetOut:function(a){this.clearTimer("show");
if(this.autoHide!==false){this.delayHide()
}},showAt:function(b){var a=this.activeTarget;
if(a){if(!this.rendered){this.render(Ext.getBody());
this.activeTarget=a
}if(a.width){this.setWidth(a.width);
this.body.setWidth(this.adjustBodyWidth(a.width-this.getFrameWidth()));
this.measureWidth=false
}else{this.measureWidth=true
}this.setTitle(a.title||"");
this.body.update(a.text);
this.autoHide=a.autoHide;
this.dismissDelay=a.dismissDelay||this.dismissDelay;
if(this.lastCls){this.el.removeClass(this.lastCls);
delete this.lastCls
}if(a.cls){this.el.addClass(a.cls);
this.lastCls=a.cls
}if(a.align){b=this.el.getAlignToXY(a.el,a.align);
this.constrainPosition=false
}else{this.constrainPosition=true
}}Ext.QuickTip.superclass.showAt.call(this,b)
},hide:function(){delete this.activeTarget;
Ext.QuickTip.superclass.hide.call(this)
}});
Ext.QuickTips=function(){var b,a=[];
return{init:function(){if(!b){b=new Ext.QuickTip({elements:"header,body"})
}},enable:function(){if(b){a.pop();
if(a.length<1){b.enable()
}}},disable:function(){if(b){b.disable()
}a.push(1)
},isEnabled:function(){return b&&!b.disabled
},getQuickTip:function(){return b
},register:function(){b.register.apply(b,arguments)
},unregister:function(){b.unregister.apply(b,arguments)
},tips:function(){b.register.apply(b,arguments)
}}
}();
Ext.tree.TreePanel=Ext.extend(Ext.Panel,{rootVisible:true,animate:Ext.enableFx,lines:true,enableDD:false,hlDrop:Ext.enableFx,pathSeparator:"/",initComponent:function(){Ext.tree.TreePanel.superclass.initComponent.call(this);
if(!this.eventModel){this.eventModel=new Ext.tree.TreeEventModel(this)
}this.nodeHash={};
if(this.root){this.setRootNode(this.root)
}this.addEvents("append","remove","movenode","insert","beforeappend","beforeremove","beforemovenode","beforeinsert","beforeload","load","textchange","beforeexpandnode","beforecollapsenode","expandnode","disabledchange","collapsenode","beforeclick","click","checkchange","dblclick","contextmenu","beforechildrenrendered","startdrag","enddrag","dragdrop","beforenodedrop","nodedrop","nodedragover");
if(this.singleExpand){this.on("beforeexpandnode",this.restrictExpand,this)
}},proxyNodeEvent:function(g,h,a,b,c,d,e){if(g=="collapse"||g=="expand"||g=="beforecollapse"||g=="beforeexpand"||g=="move"||g=="beforemove"){g=g+"node"
}return this.fireEvent(g,h,a,b,c,d,e)
},getRootNode:function(){return this.root
},setRootNode:function(b){this.root=b;
b.ownerTree=this;
b.isRoot=true;
this.registerNode(b);
if(!this.rootVisible){var a=b.attributes.uiProvider;
b.ui=a?new a(b):new Ext.tree.RootTreeNodeUI(b)
}return b
},getNodeById:function(a){return this.nodeHash[a]
},registerNode:function(a){this.nodeHash[a.id]=a
},unregisterNode:function(a){delete this.nodeHash[a.id]
},toString:function(){return"[Tree"+(this.id?" "+this.id:"")+"]"
},restrictExpand:function(a){var b=a.parentNode;
if(b){if(b.expandedChild&&b.expandedChild.parentNode==b){b.expandedChild.collapse()
}b.expandedChild=a
}},getChecked:function(a,d){d=d||this.root;
var c=[];
var b=function(){if(this.attributes.checked){c.push(!a?this:(a=="id"?this.id:this.attributes[a]))
}};
d.cascade(b);
return c
},getEl:function(){return this.el
},getLoader:function(){return this.loader
},expandAll:function(){this.root.expand(true)
},collapseAll:function(){this.root.collapse(true)
},getSelectionModel:function(){if(!this.selModel){this.selModel=new Ext.tree.DefaultSelectionModel()
}return this.selModel
},expandPath:function(c,a,b){a=a||"id";
var e=c.split(this.pathSeparator);
var g=this.root;
if(g.attributes[a]!=e[1]){if(b){b(false,null)
}return
}var h=1;
var d=function(){if(++h==e.length){if(b){b(true,g)
}return
}var i=g.findChild(a,e[h]);
if(!i){if(b){b(false,g)
}return
}g=i;
i.expand(false,false,d)
};
g.expand(false,false,d)
},selectPath:function(c,a,b){a=a||"id";
var e=c.split(this.pathSeparator);
var g=e.pop();
if(e.length>0){var d=function(i,k){if(i&&k){var h=k.findChild(a,g);
if(h){h.select();
if(b){b(true,h)
}}else{if(b){b(false,h)
}}}else{if(b){b(false,h)
}}};
this.expandPath(e.join(this.pathSeparator),a,d)
}else{this.root.select();
if(b){b(true,this.root)
}}},getTreeEl:function(){return this.body
},onRender:function(b,a){Ext.tree.TreePanel.superclass.onRender.call(this,b,a);
this.el.addClass("x-tree");
this.innerCt=this.body.createChild({tag:"ul",cls:"x-tree-root-ct "+(this.useArrows?"x-tree-arrows":this.lines?"x-tree-lines":"x-tree-no-lines")})
},initEvents:function(){Ext.tree.TreePanel.superclass.initEvents.call(this);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.body)
}if((this.enableDD||this.enableDrop)&&!this.dropZone){this.dropZone=new Ext.tree.TreeDropZone(this,this.dropConfig||{ddGroup:this.ddGroup||"TreeDD",appendOnly:this.ddAppendOnly===true})
}if((this.enableDD||this.enableDrag)&&!this.dragZone){this.dragZone=new Ext.tree.TreeDragZone(this,this.dragConfig||{ddGroup:this.ddGroup||"TreeDD",scroll:this.ddScroll})
}this.getSelectionModel().init(this)
},afterRender:function(){Ext.tree.TreePanel.superclass.afterRender.call(this);
this.root.render();
if(!this.rootVisible){this.root.renderChildren()
}},onDestroy:function(){if(this.rendered){this.body.removeAllListeners();
Ext.dd.ScrollManager.unregister(this.body);
if(this.dropZone){this.dropZone.unreg()
}if(this.dragZone){this.dragZone.unreg()
}}this.root.destroy();
this.nodeHash=null;
Ext.tree.TreePanel.superclass.onDestroy.call(this)
}});
Ext.reg("treepanel",Ext.tree.TreePanel);
Ext.tree.TreeEventModel=function(a){this.tree=a;
this.tree.on("render",this.initEvents,this)
};
Ext.tree.TreeEventModel.prototype={initEvents:function(){var a=this.tree.getTreeEl();
a.on("click",this.delegateClick,this);
if(this.tree.trackMouseOver!==false){a.on("mouseover",this.delegateOver,this);
a.on("mouseout",this.delegateOut,this)
}a.on("dblclick",this.delegateDblClick,this);
a.on("contextmenu",this.delegateContextMenu,this)
},getNode:function(c){var a;
if(a=c.getTarget(".x-tree-node-el",10)){var b=Ext.fly(a,"_treeEvents").getAttributeNS("ext","tree-node-id");
if(b){return this.tree.getNodeById(b)
}}return null
},getNodeTarget:function(b){var a=b.getTarget(".x-tree-node-icon",1);
if(!a){a=b.getTarget(".x-tree-node-el",6)
}return a
},delegateOut:function(c,a){if(!this.beforeEvent(c)){return
}if(c.getTarget(".x-tree-ec-icon",1)){var b=this.getNode(c);
this.onIconOut(c,b);
if(b==this.lastEcOver){delete this.lastEcOver
}}if((a=this.getNodeTarget(c))&&!c.within(a,true)){this.onNodeOut(c,this.getNode(c))
}},delegateOver:function(b,a){if(!this.beforeEvent(b)){return
}if(this.lastEcOver){this.onIconOut(b,this.lastEcOver);
delete this.lastEcOver
}if(b.getTarget(".x-tree-ec-icon",1)){this.lastEcOver=this.getNode(b);
this.onIconOver(b,this.lastEcOver)
}if(a=this.getNodeTarget(b)){this.onNodeOver(b,this.getNode(b))
}},delegateClick:function(b,a){if(!this.beforeEvent(b)){return
}if(b.getTarget("input[type=checkbox]",1)){this.onCheckboxClick(b,this.getNode(b))
}else{if(b.getTarget(".x-tree-ec-icon",1)){this.onIconClick(b,this.getNode(b))
}else{if(this.getNodeTarget(b)){this.onNodeClick(b,this.getNode(b))
}}}},delegateDblClick:function(b,a){if(this.beforeEvent(b)&&this.getNodeTarget(b)){this.onNodeDblClick(b,this.getNode(b))
}},delegateContextMenu:function(b,a){if(this.beforeEvent(b)&&this.getNodeTarget(b)){this.onNodeContextMenu(b,this.getNode(b))
}},onNodeClick:function(b,a){a.ui.onClick(b)
},onNodeOver:function(b,a){a.ui.onOver(b)
},onNodeOut:function(b,a){a.ui.onOut(b)
},onIconOver:function(b,a){a.ui.addClass("x-tree-ec-over")
},onIconOut:function(b,a){a.ui.removeClass("x-tree-ec-over")
},onIconClick:function(b,a){a.ui.ecClick(b)
},onCheckboxClick:function(b,a){a.ui.onCheckChange(b)
},onNodeDblClick:function(b,a){a.ui.onDblClick(b)
},onNodeContextMenu:function(b,a){a.ui.onContextMenu(b)
},beforeEvent:function(a){if(this.disabled){a.stopEvent();
return false
}return true
},disable:function(){this.disabled=true
},enable:function(){this.disabled=false
}};
Ext.tree.DefaultSelectionModel=function(a){this.selNode=null;
this.addEvents("selectionchange","beforeselect");
Ext.apply(this,a);
Ext.tree.DefaultSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.DefaultSelectionModel,Ext.util.Observable,{init:function(a){this.tree=a;
a.getTreeEl().on("keydown",this.onKeyDown,this);
a.on("click",this.onNodeClick,this)
},onNodeClick:function(a,b){this.select(a)
},select:function(b){var a=this.selNode;
if(a!=b&&this.fireEvent("beforeselect",this,b,a)!==false){if(a){a.ui.onSelectedChange(false)
}this.selNode=b;
b.ui.onSelectedChange(true);
this.fireEvent("selectionchange",this,b,a)
}return b
},unselect:function(a){if(this.selNode==a){this.clearSelections()
}},clearSelections:function(){var a=this.selNode;
if(a){a.ui.onSelectedChange(false);
this.selNode=null;
this.fireEvent("selectionchange",this,null)
}return a
},getSelectedNode:function(){return this.selNode
},isSelected:function(a){return this.selNode==a
},selectPrevious:function(){var a=this.selNode||this.lastSelNode;
if(!a){return null
}var b=a.previousSibling;
if(b){if(!b.isExpanded()||b.childNodes.length<1){return this.select(b)
}else{var c=b.lastChild;
while(c&&c.isExpanded()&&c.childNodes.length>0){c=c.lastChild
}return this.select(c)
}}else{if(a.parentNode&&(this.tree.rootVisible||!a.parentNode.isRoot)){return this.select(a.parentNode)
}}return null
},selectNext:function(){var b=this.selNode||this.lastSelNode;
if(!b){return null
}if(b.firstChild&&b.isExpanded()){return this.select(b.firstChild)
}else{if(b.nextSibling){return this.select(b.nextSibling)
}else{if(b.parentNode){var a=null;
b.parentNode.bubble(function(){if(this.nextSibling){a=this.getOwnerTree().selModel.select(this.nextSibling);
return false
}});
return a
}}}return null
},onKeyDown:function(c){var d=this.selNode||this.lastSelNode;
var b=this;
if(!d){return
}var a=c.getKey();
switch(a){case c.DOWN:c.stopEvent();
this.selectNext();
break;
case c.UP:c.stopEvent();
this.selectPrevious();
break;
case c.RIGHT:c.preventDefault();
if(d.hasChildNodes()){if(!d.isExpanded()){d.expand()
}else{if(d.firstChild){this.select(d.firstChild,c)
}}}break;
case c.LEFT:c.preventDefault();
if(d.hasChildNodes()&&d.isExpanded()){d.collapse()
}else{if(d.parentNode&&(this.tree.rootVisible||d.parentNode!=this.tree.getRootNode())){this.select(d.parentNode,c)
}}break
}}});
Ext.tree.MultiSelectionModel=function(a){this.selNodes=[];
this.selMap={};
this.addEvents("selectionchange");
Ext.apply(this,a);
Ext.tree.MultiSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.MultiSelectionModel,Ext.util.Observable,{init:function(a){this.tree=a;
a.getTreeEl().on("keydown",this.onKeyDown,this);
a.on("click",this.onNodeClick,this)
},onNodeClick:function(a,b){this.select(a,b,b.ctrlKey)
},select:function(a,b,c){if(c!==true){this.clearSelections(true)
}if(this.isSelected(a)){this.lastSelNode=a;
return a
}this.selNodes.push(a);
this.selMap[a.id]=a;
this.lastSelNode=a;
a.ui.onSelectedChange(true);
this.fireEvent("selectionchange",this,this.selNodes);
return a
},unselect:function(c){if(this.selMap[c.id]){c.ui.onSelectedChange(false);
var b=this.selNodes;
var a=b.indexOf(c);
if(a!=-1){this.selNodes.splice(a,1)
}delete this.selMap[c.id];
this.fireEvent("selectionchange",this,this.selNodes)
}},clearSelections:function(d){var b=this.selNodes;
if(b.length>0){for(var c=0,a=b.length;
c<a;
c++){b[c].ui.onSelectedChange(false)
}this.selNodes=[];
this.selMap={};
if(d!==true){this.fireEvent("selectionchange",this,this.selNodes)
}}},isSelected:function(a){return this.selMap[a.id]?true:false
},getSelectedNodes:function(){return this.selNodes
},onKeyDown:Ext.tree.DefaultSelectionModel.prototype.onKeyDown,selectNext:Ext.tree.DefaultSelectionModel.prototype.selectNext,selectPrevious:Ext.tree.DefaultSelectionModel.prototype.selectPrevious});
Ext.tree.TreeNode=function(a){a=a||{};
if(typeof a=="string"){a={text:a}
}this.childrenRendered=false;
this.rendered=false;
Ext.tree.TreeNode.superclass.constructor.call(this,a);
this.expanded=a.expanded===true;
this.isTarget=a.isTarget!==false;
this.draggable=a.draggable!==false&&a.allowDrag!==false;
this.allowChildren=a.allowChildren!==false&&a.allowDrop!==false;
this.text=a.text;
this.disabled=a.disabled===true;
this.addEvents("textchange","beforeexpand","beforecollapse","expand","disabledchange","collapse","beforeclick","click","checkchange","dblclick","contextmenu","beforechildrenrendered");
var b=this.attributes.uiProvider||this.defaultUI||Ext.tree.TreeNodeUI;
this.ui=new b(this)
};
Ext.extend(Ext.tree.TreeNode,Ext.data.Node,{preventHScroll:true,isExpanded:function(){return this.expanded
},getUI:function(){return this.ui
},setFirstChild:function(a){var b=this.firstChild;
Ext.tree.TreeNode.superclass.setFirstChild.call(this,a);
if(this.childrenRendered&&b&&a!=b){b.renderIndent(true,true)
}if(this.rendered){this.renderIndent(true,true)
}},setLastChild:function(b){var a=this.lastChild;
Ext.tree.TreeNode.superclass.setLastChild.call(this,b);
if(this.childrenRendered&&a&&b!=a){a.renderIndent(true,true)
}if(this.rendered){this.renderIndent(true,true)
}},appendChild:function(){var a=Ext.tree.TreeNode.superclass.appendChild.apply(this,arguments);
if(a&&this.childrenRendered){a.render()
}this.ui.updateExpandIcon();
return a
},removeChild:function(a){this.ownerTree.getSelectionModel().unselect(a);
Ext.tree.TreeNode.superclass.removeChild.apply(this,arguments);
if(this.childrenRendered){a.ui.remove()
}if(this.childNodes.length<1){this.collapse(false,false)
}else{this.ui.updateExpandIcon()
}if(!this.firstChild&&!this.isHiddenRoot()){this.childrenRendered=false
}return a
},insertBefore:function(b,a){var c=Ext.tree.TreeNode.superclass.insertBefore.apply(this,arguments);
if(c&&a&&this.childrenRendered){b.render()
}this.ui.updateExpandIcon();
return c
},setText:function(b){var a=this.text;
this.text=b;
this.attributes.text=b;
if(this.rendered){this.ui.onTextChange(this,b,a)
}this.fireEvent("textchange",this,b,a)
},select:function(){this.getOwnerTree().getSelectionModel().select(this)
},unselect:function(){this.getOwnerTree().getSelectionModel().unselect(this)
},isSelected:function(){return this.getOwnerTree().getSelectionModel().isSelected(this)
},expand:function(a,c,b){if(!this.expanded){if(this.fireEvent("beforeexpand",this,a,c)===false){return
}if(!this.childrenRendered){this.renderChildren()
}this.expanded=true;
if(!this.isHiddenRoot()&&(this.getOwnerTree().animate&&c!==false)||c){this.ui.animExpand(function(){this.fireEvent("expand",this);
if(typeof b=="function"){b(this)
}if(a===true){this.expandChildNodes(true)
}}.createDelegate(this));
return
}else{this.ui.expand();
this.fireEvent("expand",this);
if(typeof b=="function"){b(this)
}}}else{if(typeof b=="function"){b(this)
}}if(a===true){this.expandChildNodes(true)
}},isHiddenRoot:function(){return this.isRoot&&!this.getOwnerTree().rootVisible
},collapse:function(e,b){if(this.expanded&&!this.isHiddenRoot()){if(this.fireEvent("beforecollapse",this,e,b)===false){return
}this.expanded=false;
if((this.getOwnerTree().animate&&b!==false)||b){this.ui.animCollapse(function(){this.fireEvent("collapse",this);
if(e===true){this.collapseChildNodes(true)
}}.createDelegate(this));
return
}else{this.ui.collapse();
this.fireEvent("collapse",this)
}}if(e===true){var c=this.childNodes;
for(var d=0,a=c.length;
d<a;
d++){c[d].collapse(true,false)
}}},delayedExpand:function(a){if(!this.expandProcId){this.expandProcId=this.expand.defer(a,this)
}},cancelExpand:function(){if(this.expandProcId){clearTimeout(this.expandProcId)
}this.expandProcId=false
},toggle:function(){if(this.expanded){this.collapse()
}else{this.expand()
}},ensureVisible:function(b){var a=this.getOwnerTree();
a.expandPath(this.parentNode.getPath(),false,function(){var c=a.getNodeById(this.id);
a.getTreeEl().scrollChildIntoView(c.ui.anchor);
Ext.callback(b)
}.createDelegate(this))
},expandChildNodes:function(d){var b=this.childNodes;
for(var c=0,a=b.length;
c<a;
c++){b[c].expand(d)
}},collapseChildNodes:function(d){var b=this.childNodes;
for(var c=0,a=b.length;
c<a;
c++){b[c].collapse(d)
}},disable:function(){this.disabled=true;
this.unselect();
if(this.rendered&&this.ui.onDisableChange){this.ui.onDisableChange(this,true)
}this.fireEvent("disabledchange",this,true)
},enable:function(){this.disabled=false;
if(this.rendered&&this.ui.onDisableChange){this.ui.onDisableChange(this,false)
}this.fireEvent("disabledchange",this,false)
},renderChildren:function(d){if(d!==false){this.fireEvent("beforechildrenrendered",this)
}var b=this.childNodes;
for(var c=0,a=b.length;
c<a;
c++){b[c].render(true)
}this.childrenRendered=true
},sort:function(b,c){Ext.tree.TreeNode.superclass.sort.apply(this,arguments);
if(this.childrenRendered){var d=this.childNodes;
for(var e=0,a=d.length;
e<a;
e++){d[e].render(true)
}}},render:function(a){this.ui.render(a);
if(!this.rendered){this.getOwnerTree().registerNode(this);
this.rendered=true;
if(this.expanded){this.expanded=false;
this.expand(false,false)
}}},renderIndent:function(e,b){if(b){this.ui.childIndent=null
}this.ui.renderIndent();
if(e===true&&this.childrenRendered){var c=this.childNodes;
for(var d=0,a=c.length;
d<a;
d++){c[d].renderIndent(true,b)
}}},beginUpdate:function(){this.childrenRendered=false
},endUpdate:function(){if(this.expanded){this.renderChildren()
}},destroy:function(){for(var b=0,a=this.childNodes.length;
b<a;
b++){this.childNodes[b].destroy()
}this.childNodes=null;
if(this.ui.destroy){this.ui.destroy()
}}});
Ext.tree.AsyncTreeNode=function(a){this.loaded=false;
this.loading=false;
Ext.tree.AsyncTreeNode.superclass.constructor.apply(this,arguments);
this.addEvents("beforeload","load")
};
Ext.extend(Ext.tree.AsyncTreeNode,Ext.tree.TreeNode,{expand:function(g,d,b){if(this.loading){var c;
var e=function(){if(!this.loading){clearInterval(c);
this.expand(g,d,b)
}}.createDelegate(this);
c=setInterval(e,200);
return
}if(!this.loaded){if(this.fireEvent("beforeload",this)===false){return
}this.loading=true;
this.ui.beforeLoad(this);
var a=this.loader||this.attributes.loader||this.getOwnerTree().getLoader();
if(a){a.load(this,this.loadComplete.createDelegate(this,[g,d,b]));
return
}}Ext.tree.AsyncTreeNode.superclass.expand.call(this,g,d,b)
},isLoading:function(){return this.loading
},loadComplete:function(a,c,b){this.loading=false;
this.loaded=true;
this.ui.afterLoad(this);
this.fireEvent("load",this);
this.expand(a,c,b)
},isLoaded:function(){return this.loaded
},hasChildNodes:function(){if(!this.isLeaf()&&!this.loaded){return true
}else{return Ext.tree.AsyncTreeNode.superclass.hasChildNodes.call(this)
}},reload:function(a){this.collapse(false,false);
while(this.firstChild){this.removeChild(this.firstChild)
}this.childrenRendered=false;
this.loaded=false;
if(this.isHiddenRoot()){this.expanded=false
}this.expand(false,false,a)
}});
Ext.tree.TreeNodeUI=function(a){this.node=a;
this.rendered=false;
this.animating=false;
this.wasLeaf=true;
this.ecc="x-tree-ec-icon x-tree-elbow";
this.emptyIcon=Ext.BLANK_IMAGE_URL
};
Ext.tree.TreeNodeUI.prototype={removeChild:function(a){if(this.rendered){this.ctNode.removeChild(a.ui.getEl())
}},beforeLoad:function(){this.addClass("x-tree-node-loading")
},afterLoad:function(){this.removeClass("x-tree-node-loading")
},onTextChange:function(c,b,a){if(this.rendered){this.textNode.innerHTML=b
}},onDisableChange:function(a,b){this.disabled=b;
if(this.checkbox){this.checkbox.disabled=b
}if(b){this.addClass("x-tree-node-disabled")
}else{this.removeClass("x-tree-node-disabled")
}},onSelectedChange:function(a){if(a){this.focus();
this.addClass("x-tree-selected")
}else{this.removeClass("x-tree-selected")
}},onMove:function(a,c,e,d,g,i){this.childIndent=null;
if(this.rendered){var b=d.ui.getContainer();
if(!b){this.holder=document.createElement("div");
this.holder.appendChild(this.wrap);
return
}var h=i?i.ui.getEl():null;
if(h){b.insertBefore(this.wrap,h)
}else{b.appendChild(this.wrap)
}this.node.renderIndent(true)
}},addClass:function(a){if(this.elNode){Ext.fly(this.elNode).addClass(a)
}},removeClass:function(a){if(this.elNode){Ext.fly(this.elNode).removeClass(a)
}},remove:function(){if(this.rendered){this.holder=document.createElement("div");
this.holder.appendChild(this.wrap)
}},fireEvent:function(){return this.node.fireEvent.apply(this.node,arguments)
},initEvents:function(){this.node.on("move",this.onMove,this);
if(this.node.disabled){this.addClass("x-tree-node-disabled");
if(this.checkbox){this.checkbox.disabled=true
}}if(this.node.hidden){this.hide()
}var b=this.node.getOwnerTree();
var a=b.enableDD||b.enableDrag||b.enableDrop;
if(a&&(!this.node.isRoot||b.rootVisible)){Ext.dd.Registry.register(this.elNode,{node:this.node,handles:this.getDDHandles(),isHandle:false})
}},getDDHandles:function(){return[this.iconNode,this.textNode,this.elNode]
},hide:function(){this.node.hidden=true;
if(this.wrap){this.wrap.style.display="none"
}},show:function(){this.node.hidden=false;
if(this.wrap){this.wrap.style.display=""
}},onContextMenu:function(a){if(this.node.hasListener("contextmenu")||this.node.getOwnerTree().hasListener("contextmenu")){a.preventDefault();
this.focus();
this.fireEvent("contextmenu",this.node,a)
}},onClick:function(b){if(this.dropping){b.stopEvent();
return
}if(this.fireEvent("beforeclick",this.node,b)!==false){var a=b.getTarget("a");
if(!this.disabled&&this.node.attributes.href&&a){this.fireEvent("click",this.node,b);
return
}else{if(a&&b.ctrlKey){b.stopEvent()
}}b.preventDefault();
if(this.disabled){return
}if(this.node.attributes.singleClickExpand&&!this.animating&&this.node.hasChildNodes()){this.node.toggle()
}this.fireEvent("click",this.node,b)
}else{b.stopEvent()
}},onDblClick:function(a){a.preventDefault();
if(this.disabled){return
}if(this.checkbox){this.toggleCheck()
}if(!this.animating&&this.node.hasChildNodes()){this.node.toggle()
}this.fireEvent("dblclick",this.node,a)
},onOver:function(a){this.addClass("x-tree-node-over")
},onOut:function(a){this.removeClass("x-tree-node-over")
},onCheckChange:function(){var a=this.checkbox.checked;
this.node.attributes.checked=a;
this.fireEvent("checkchange",this.node,a)
},ecClick:function(a){if(!this.animating&&(this.node.hasChildNodes()||this.node.attributes.expandable)){this.node.toggle()
}},startDrop:function(){this.dropping=true
},endDrop:function(){setTimeout(function(){this.dropping=false
}.createDelegate(this),50)
},expand:function(){this.updateExpandIcon();
this.ctNode.style.display=""
},focus:function(){if(!this.node.preventHScroll){try{this.anchor.focus()
}catch(b){}}else{if(!Ext.isIE){try{var c=this.node.getOwnerTree().getTreeEl().dom;
var a=c.scrollLeft;
this.anchor.focus();
c.scrollLeft=a
}catch(b){}}}},toggleCheck:function(b){var a=this.checkbox;
if(a){a.checked=(b===undefined?!a.checked:b)
}},blur:function(){try{this.anchor.blur()
}catch(a){}},animExpand:function(b){var a=Ext.get(this.ctNode);
a.stopFx();
if(!this.node.hasChildNodes()){this.updateExpandIcon();
this.ctNode.style.display="";
Ext.callback(b);
return
}this.animating=true;
this.updateExpandIcon();
a.slideIn("t",{callback:function(){this.animating=false;
Ext.callback(b)
},scope:this,duration:this.node.ownerTree.duration||0.25})
},highlight:function(){var a=this.node.getOwnerTree();
Ext.fly(this.wrap).highlight(a.hlColor||"C3DAF9",{endColor:a.hlBaseColor})
},collapse:function(){this.updateExpandIcon();
this.ctNode.style.display="none"
},animCollapse:function(b){var a=Ext.get(this.ctNode);
a.enableDisplayMode("block");
a.stopFx();
this.animating=true;
this.updateExpandIcon();
a.slideOut("t",{callback:function(){this.animating=false;
Ext.callback(b)
},scope:this,duration:this.node.ownerTree.duration||0.25})
},getContainer:function(){return this.ctNode
},getEl:function(){return this.wrap
},appendDDGhost:function(a){a.appendChild(this.elNode.cloneNode(true))
},getDDRepairXY:function(){return Ext.lib.Dom.getXY(this.iconNode)
},onRender:function(){this.render()
},render:function(d){var b=this.node,a=b.attributes;
var c=b.parentNode?b.parentNode.ui.getContainer():b.ownerTree.innerCt.dom;
if(!this.rendered){this.rendered=true;
this.renderElements(b,a,c,d);
if(a.qtip){if(this.textNode.setAttributeNS){this.textNode.setAttributeNS("ext","qtip",a.qtip);
if(a.qtipTitle){this.textNode.setAttributeNS("ext","qtitle",a.qtipTitle)
}}else{this.textNode.setAttribute("ext:qtip",a.qtip);
if(a.qtipTitle){this.textNode.setAttribute("ext:qtitle",a.qtipTitle)
}}}else{if(a.qtipCfg){a.qtipCfg.target=Ext.id(this.textNode);
Ext.QuickTips.register(a.qtipCfg)
}}this.initEvents();
if(!this.node.expanded){this.updateExpandIcon(true)
}}else{if(d===true){c.appendChild(this.wrap)
}}},renderElements:function(a,g,h,e){this.indentMarkup=a.parentNode?a.parentNode.ui.getChildIndent():"";
var l=typeof g.checked=="boolean";
var c=g.href?g.href:Ext.isGecko?"":"#";
var b=['<li class="x-tree-node"><div tree-node-id="',a.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',g.cls,'" unselectable="on">','<span class="x-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="x-tree-ec-icon x-tree-elbow" />','<img src="',g.icon||this.emptyIcon,'" class="x-tree-node-icon',(g.icon?" x-tree-node-inline-icon":""),(g.iconCls?" "+g.iconCls:""),'" unselectable="on" />',l?('<input class="x-tree-node-cb" type="checkbox" '+(g.checked?'checked="checked" />':"/>")):"",'<a hidefocus="on" class="x-tree-node-anchor" href="',c,'" tabIndex="1" ',g.hrefTarget?' target="'+g.hrefTarget+'"':"",'><span unselectable="on">',a.text,"</span></a></div>",'<ul class="x-tree-node-ct" style="display:none;"></ul>',"</li>"].join("");
var d;
if(e!==true&&a.nextSibling&&(d=a.nextSibling.ui.getEl())){this.wrap=Ext.DomHelper.insertHtml("beforeBegin",d,b)
}else{this.wrap=Ext.DomHelper.insertHtml("beforeEnd",h,b)
}this.elNode=this.wrap.childNodes[0];
this.ctNode=this.wrap.childNodes[1];
var i=this.elNode.childNodes;
this.indentNode=i[0];
this.ecNode=i[1];
this.iconNode=i[2];
var k=3;
if(l){this.checkbox=i[3];
k++
}this.anchor=i[k];
this.textNode=i[k].firstChild
},getAnchor:function(){return this.anchor
},getTextEl:function(){return this.textNode
},getIconEl:function(){return this.iconNode
},isChecked:function(){return this.checkbox?this.checkbox.checked:false
},updateExpandIcon:function(){if(this.rendered){var b=this.node,d,e;
var a=b.isLast()?"x-tree-elbow-end":"x-tree-elbow";
var c=b.hasChildNodes();
if(c||b.attributes.expandable){if(b.expanded){a+="-minus";
d="x-tree-node-collapsed";
e="x-tree-node-expanded"
}else{a+="-plus";
d="x-tree-node-expanded";
e="x-tree-node-collapsed"
}if(this.wasLeaf){this.removeClass("x-tree-node-leaf");
this.wasLeaf=false
}if(this.c1!=d||this.c2!=e){Ext.fly(this.elNode).replaceClass(d,e);
this.c1=d;
this.c2=e
}}else{if(!this.wasLeaf){Ext.fly(this.elNode).replaceClass("x-tree-node-expanded","x-tree-node-leaf");
delete this.c1;
delete this.c2;
this.wasLeaf=true
}}var g="x-tree-ec-icon "+a;
if(this.ecc!=g){this.ecNode.className=g;
this.ecc=g
}}},getChildIndent:function(){if(!this.childIndent){var a=[];
var b=this.node;
while(b){if(!b.isRoot||(b.isRoot&&b.ownerTree.rootVisible)){if(!b.isLast()){a.unshift('<img src="'+this.emptyIcon+'" class="x-tree-elbow-line" />')
}else{a.unshift('<img src="'+this.emptyIcon+'" class="x-tree-icon" />')
}}b=b.parentNode
}this.childIndent=a.join("")
}return this.childIndent
},renderIndent:function(){if(this.rendered){var a="";
var b=this.node.parentNode;
if(b){a=b.ui.getChildIndent()
}if(this.indentMarkup!=a){this.indentNode.innerHTML=a;
this.indentMarkup=a
}this.updateExpandIcon()
}},destroy:function(){if(this.elNode){Ext.dd.Registry.unregister(this.elNode.id)
}delete this.elNode;
delete this.ctNode;
delete this.indentNode;
delete this.ecNode;
delete this.iconNode;
delete this.checkbox;
delete this.anchor;
delete this.textNode;
Ext.removeNode(this.ctNode)
}};
Ext.tree.RootTreeNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{render:function(){if(!this.rendered){var a=this.node.ownerTree.innerCt.dom;
this.node.expanded=true;
a.innerHTML='<div class="x-tree-root-node"></div>';
this.wrap=this.ctNode=a.firstChild
}},collapse:Ext.emptyFn,expand:Ext.emptyFn});
Ext.tree.TreeLoader=function(a){this.baseParams={};
this.requestMethod="POST";
Ext.apply(this,a);
this.addEvents("beforeload","load","loadexception");
Ext.tree.TreeLoader.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.TreeLoader,Ext.util.Observable,{uiProviders:{},clearOnLoad:true,load:function(a,b){if(this.clearOnLoad){while(a.firstChild){a.removeChild(a.firstChild)
}}if(this.doPreload(a)){if(typeof b=="function"){b()
}}else{if(this.dataUrl||this.url){this.requestData(a,b)
}}},doPreload:function(c){if(c.attributes.children){if(c.childNodes.length<1){var d=c.attributes.children;
c.beginUpdate();
for(var e=0,a=d.length;
e<a;
e++){var b=c.appendChild(this.createNode(d[e]));
if(this.preloadChildren){this.doPreload(b)
}}c.endUpdate()
}return true
}else{return false
}},getParams:function(b){var a=[],c=this.baseParams;
for(var d in c){if(typeof c[d]!="function"){a.push(encodeURIComponent(d),"=",encodeURIComponent(c[d]),"&")
}}a.push("node=",encodeURIComponent(b.id));
return a.join("")
},requestData:function(a,b){if(this.fireEvent("beforeload",this,a,b)!==false){this.transId=Ext.Ajax.request({method:this.requestMethod,url:this.dataUrl||this.url,success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{callback:b,node:a},params:this.getParams(a)})
}else{if(typeof b=="function"){b()
}}},isLoading:function(){return this.transId?true:false
},abort:function(){if(this.isLoading()){Ext.Ajax.abort(this.transId)
}},createNode:function(attr){if(this.baseAttrs){Ext.applyIf(attr,this.baseAttrs)
}if(this.applyLoader!==false){attr.loader=this
}if(typeof attr.uiProvider=="string"){attr.uiProvider=this.uiProviders[attr.uiProvider]||eval(attr.uiProvider)
}return(attr.leaf?new Ext.tree.TreeNode(attr):new Ext.tree.AsyncTreeNode(attr))
},processResponse:function(response,node,callback){var json=response.responseText;
try{var o=eval("("+json+")");
node.beginUpdate();
for(var i=0,len=o.length;
i<len;
i++){var n=this.createNode(o[i]);
if(n){node.appendChild(n)
}}node.endUpdate();
if(typeof callback=="function"){callback(this,node)
}}catch(e){this.handleFailure(response)
}},handleResponse:function(b){this.transId=false;
var a=b.argument;
this.processResponse(b,a.node,a.callback);
this.fireEvent("load",this,a.node,b)
},handleFailure:function(b){this.transId=false;
var a=b.argument;
this.fireEvent("loadexception",this,a.node,b);
if(typeof a.callback=="function"){a.callback(this,a.node)
}}});
Ext.tree.TreeFilter=function(a,b){this.tree=a;
this.filtered={};
Ext.apply(this,b)
};
Ext.tree.TreeFilter.prototype={clearBlank:false,reverse:false,autoClear:false,remove:false,filter:function(c,a,e){a=a||"text";
var d;
if(typeof c=="string"){var b=c.length;
if(b==0&&this.clearBlank){this.clear();
return
}c=c.toLowerCase();
d=function(g){return g.attributes[a].substr(0,b).toLowerCase()==c
}
}else{if(c.exec){d=function(g){return c.test(g.attributes[a])
}
}else{throw"Illegal filter type, must be string or regex"
}}this.filterBy(d,null,e)
},filterBy:function(g,h,i){i=i||this.tree.root;
if(this.autoClear){this.clear()
}var a=this.filtered,b=this.reverse;
var e=function(k){if(k==i){return true
}if(a[k.id]){return false
}var l=g.call(h||k,k);
if(!l||b){a[k.id]=k;
k.ui.hide();
return false
}return true
};
i.cascade(e);
if(this.remove){for(var c in a){if(typeof c!="function"){var d=a[c];
if(d&&d.parentNode){d.parentNode.removeChild(d)
}}}}},clear:function(){var d=this.tree;
var a=this.filtered;
for(var b in a){if(typeof b!="function"){var c=a[b];
if(c){c.ui.show()
}}}this.filtered={}
}};
Ext.tree.TreeSorter=function(i,h){Ext.apply(this,h);
i.on("beforechildrenrendered",this.doSort,this);
i.on("append",this.updateSort,this);
i.on("insert",this.updateSort,this);
i.on("textchange",this.updateSortParent,this);
var e=this.dir&&this.dir.toLowerCase()=="desc";
var d=this.property||"text";
var c=this.sortType;
var a=this.folderSort;
var g=this.caseSensitive===true;
var b=this.leafAttr||"leaf";
this.sortFn=function(m,n){if(a){if(m.attributes[b]&&!n.attributes[b]){return 1
}if(!m.attributes[b]&&n.attributes[b]){return -1
}}var k=c?c(m):(g?m.attributes[d]:m.attributes[d].toUpperCase());
var l=c?c(n):(g?n.attributes[d]:n.attributes[d].toUpperCase());
if(k<l){return e?+1:-1
}else{if(k>l){return e?-1:+1
}else{return 0
}}}
};
Ext.tree.TreeSorter.prototype={doSort:function(a){a.sort(this.sortFn)
},compareNodes:function(b,a){return(b.text.toUpperCase()>a.text.toUpperCase()?1:-1)
},updateSort:function(a,b){if(b.childrenRendered){this.doSort.defer(1,this,[b])
}},updateSortParent:function(a){var b=a.parentNode;
if(b&&b.childrenRendered){this.doSort.defer(1,this,[b])
}}};
if(Ext.dd.DropZone){Ext.tree.TreeDropZone=function(a,b){this.allowParentInsert=false;
this.allowContainerDrop=false;
this.appendOnly=false;
Ext.tree.TreeDropZone.superclass.constructor.call(this,a.innerCt,b);
this.tree=a;
this.dragOverData={};
this.lastInsertClass="x-tree-no-status"
};
Ext.extend(Ext.tree.TreeDropZone,Ext.dd.DropZone,{ddGroup:"TreeDD",expandDelay:1000,expandNode:function(a){if(a.hasChildNodes()&&!a.isExpanded()){a.expand(false,null,this.triggerCacheRefresh.createDelegate(this))
}},queueExpand:function(a){this.expandProcId=this.expandNode.defer(this.expandDelay,this,[a])
},cancelExpand:function(){if(this.expandProcId){clearTimeout(this.expandProcId);
this.expandProcId=false
}},isValidDropPoint:function(d,e,h,a,b){if(!d||!b){return false
}var k=d.node;
var i=b.node;
if(!(k&&k.isTarget&&e)){return false
}if(e=="append"&&k.allowChildren===false){return false
}if((e=="above"||e=="below")&&(k.parentNode&&k.parentNode.allowChildren===false)){return false
}if(i&&(k==i||i.contains(k))){return false
}var c=this.dragOverData;
c.tree=this.tree;
c.target=k;
c.data=b;
c.point=e;
c.source=h;
c.rawEvent=a;
c.dropNode=i;
c.cancel=false;
var g=this.tree.fireEvent("nodedragover",c);
return c.cancel===false&&g!==false
},getDropPoint:function(m,a,h){var g=a.node;
if(g.isRoot){return g.allowChildren!==false?"append":false
}var c=a.ddel;
var e=Ext.lib.Dom.getY(c),k=e+c.offsetHeight;
var l=Ext.lib.Event.getPageY(m);
var i=g.allowChildren===false||g.isLeaf();
if(this.appendOnly||g.parentNode.allowChildren===false){return i?false:"append"
}var b=false;
if(!this.allowParentInsert){b=g.hasChildNodes()&&g.isExpanded()
}var d=(k-e)/(i?2:3);
if(l>=e&&l<(e+d)){return"above"
}else{if(!b&&(i||l>=k-d&&l<=k)){return"below"
}else{return"append"
}}},onNodeEnter:function(b,a,c,d){this.cancelExpand()
},onNodeOver:function(c,h,i,k){var e=this.getDropPoint(i,c,h);
var b=c.node;
if(!this.expandProcId&&e=="append"&&b.hasChildNodes()&&!c.node.isExpanded()){this.queueExpand(b)
}else{if(e!="append"){this.cancelExpand()
}}var a=this.dropNotAllowed;
if(this.isValidDropPoint(c,e,h,i,k)){if(e){var d=c.ddel;
var g;
if(e=="above"){a=c.node.isFirst()?"x-tree-drop-ok-above":"x-tree-drop-ok-between";
g="x-tree-drag-insert-above"
}else{if(e=="below"){a=c.node.isLast()?"x-tree-drop-ok-below":"x-tree-drop-ok-between";
g="x-tree-drag-insert-below"
}else{a="x-tree-drop-ok-append";
g="x-tree-drag-append"
}}if(this.lastInsertClass!=g){Ext.fly(d).replaceClass(this.lastInsertClass,g);
this.lastInsertClass=g
}}}return a
},onNodeOut:function(b,a,c,d){this.cancelExpand();
this.removeDropIndicators(b)
},onNodeDrop:function(b,e,k,a){var g=this.getDropPoint(k,b,e);
var i=b.node;
i.ui.startDrop();
if(!this.isValidDropPoint(b,g,e,k,a)){i.ui.endDrop();
return false
}var h=a.node||(e.getTreeNode?e.getTreeNode(a,i,g,k):null);
var c={tree:this.tree,target:i,data:a,point:g,source:e,rawEvent:k,dropNode:h,cancel:!h,dropStatus:false};
var d=this.tree.fireEvent("beforenodedrop",c);
if(d===false||c.cancel===true||!c.dropNode){i.ui.endDrop();
return c.dropStatus
}i=c.target;
if(g=="append"&&!i.isExpanded()){i.expand(false,null,function(){this.completeDrop(c)
}.createDelegate(this))
}else{this.completeDrop(c)
}return true
},completeDrop:function(b){var e=b.dropNode,d=b.point,g=b.target;
if(!Ext.isArray(e)){e=[e]
}var c;
for(var h=0,a=e.length;
h<a;
h++){c=e[h];
if(d=="above"){g.parentNode.insertBefore(c,g)
}else{if(d=="below"){g.parentNode.insertBefore(c,g.nextSibling)
}else{g.appendChild(c)
}}}c.ui.focus();
if(this.tree.hlDrop){c.ui.highlight()
}g.ui.endDrop();
this.tree.fireEvent("nodedrop",b)
},afterNodeMoved:function(a,d,b,c,e){if(this.tree.hlDrop){e.ui.focus();
e.ui.highlight()
}this.tree.fireEvent("nodedrop",this.tree,c,d,a,b)
},getTree:function(){return this.tree
},removeDropIndicators:function(b){if(b&&b.ddel){var a=b.ddel;
Ext.fly(a).removeClass(["x-tree-drag-insert-above","x-tree-drag-insert-below","x-tree-drag-append"]);
this.lastInsertClass="_noclass"
}},beforeDragDrop:function(c,a,b){this.cancelExpand();
return true
},afterRepair:function(a){if(a&&Ext.enableFx){a.node.ui.highlight()
}this.hideProxy()
}})
}if(Ext.dd.DragZone){Ext.tree.TreeDragZone=function(a,b){Ext.tree.TreeDragZone.superclass.constructor.call(this,a.getTreeEl(),b);
this.tree=a
};
Ext.extend(Ext.tree.TreeDragZone,Ext.dd.DragZone,{ddGroup:"TreeDD",onBeforeDrag:function(a,c){var b=a.node;
return b&&b.draggable&&!b.disabled
},onInitDrag:function(b){var a=this.dragData;
this.tree.getSelectionModel().select(a.node);
this.tree.eventModel.disable();
this.proxy.update("");
a.node.ui.appendDDGhost(this.proxy.ghost.dom);
this.tree.fireEvent("startdrag",this.tree,a.node,b)
},getRepairXY:function(b,a){return a.node.ui.getDDRepairXY()
},onEndDrag:function(a,b){this.tree.eventModel.enable.defer(100,this.tree.eventModel);
this.tree.fireEvent("enddrag",this.tree,a.node,b)
},onValidDrop:function(a,c,b){this.tree.fireEvent("dragdrop",this.tree,this.dragData.node,a,c);
this.hideProxy()
},beforeInvalidDrop:function(a,b){var c=this.tree.getSelectionModel();
c.clearSelections();
c.select(this.dragData.node)
}})
}Ext.tree.TreeEditor=function(a,c){c=c||{};
var b=c.events?c:new Ext.form.TextField(c);
Ext.tree.TreeEditor.superclass.constructor.call(this,b);
this.tree=a;
if(!a.rendered){a.on("render",this.initEditor,this)
}else{this.initEditor(a)
}};
Ext.extend(Ext.tree.TreeEditor,Ext.Editor,{alignment:"l-l",autoSize:false,hideEl:false,cls:"x-small-editor x-tree-editor",shim:false,shadow:"frame",maxWidth:250,editDelay:350,initEditor:function(a){a.on("beforeclick",this.beforeNodeClick,this);
a.on("dblclick",this.onNodeDblClick,this);
this.on("complete",this.updateNode,this);
this.on("beforestartedit",this.fitToTree,this);
this.on("startedit",this.bindScroll,this,{delay:10});
this.on("specialkey",this.onSpecialKey,this)
},fitToTree:function(e,d){var b=this.tree.getTreeEl().dom,c=d.dom;
if(b.scrollLeft>c.offsetLeft){b.scrollLeft=c.offsetLeft
}var a=Math.min(this.maxWidth,(b.clientWidth>20?b.clientWidth:b.offsetWidth)-Math.max(0,c.offsetLeft-b.scrollLeft)-5);
this.setSize(a,"")
},triggerEdit:function(a,b){this.completeEdit();
if(a.attributes.editable!==false){this.editNode=a;
this.autoEditTimer=this.startEdit.defer(this.editDelay,this,[a.ui.textNode,a.text]);
return false
}},bindScroll:function(){this.tree.getTreeEl().on("scroll",this.cancelEdit,this)
},beforeNodeClick:function(a,b){clearTimeout(this.autoEditTimer);
if(this.tree.getSelectionModel().isSelected(a)){b.stopEvent();
return this.triggerEdit(a)
}},onNodeDblClick:function(a,b){clearTimeout(this.autoEditTimer)
},updateNode:function(a,b){this.tree.getTreeEl().un("scroll",this.cancelEdit,this);
this.editNode.setText(b)
},onHide:function(){Ext.tree.TreeEditor.superclass.onHide.call(this);
if(this.editNode){this.editNode.ui.focus.defer(50,this.editNode.ui)
}},onSpecialKey:function(b,c){var a=c.getKey();
if(a==c.ESC){c.stopEvent();
this.cancelEdit()
}else{if(a==c.ENTER&&!c.hasModifier()){c.stopEvent();
this.completeEdit()
}}}});
Ext.menu.Menu=function(a){if(Ext.isArray(a)){a={items:a}
}Ext.apply(this,a);
this.id=this.id||Ext.id();
this.addEvents("beforeshow","beforehide","show","hide","click","mouseover","mouseout","itemclick");
Ext.menu.MenuMgr.register(this);
Ext.menu.Menu.superclass.constructor.call(this);
var b=this.items;
this.items=new Ext.util.MixedCollection();
if(b){this.add.apply(this,b)
}};
Ext.extend(Ext.menu.Menu,Ext.util.Observable,{minWidth:120,shadow:"sides",subMenuAlign:"tl-tr?",defaultAlign:"tl-bl?",allowOtherMenus:false,hidden:true,createEl:function(){return new Ext.Layer({cls:"x-menu",shadow:this.shadow,constrain:false,parentEl:this.parentEl||document.body,zindex:15000})
},render:function(){if(this.el){return
}var b=this.el=this.createEl();
if(!this.keyNav){this.keyNav=new Ext.menu.MenuNav(this)
}if(this.plain){b.addClass("x-menu-plain")
}if(this.cls){b.addClass(this.cls)
}this.focusEl=b.createChild({tag:"a",cls:"x-menu-focus",href:"#",onclick:"return false;",tabIndex:"-1"});
var a=b.createChild({tag:"ul",cls:"x-menu-list"});
a.on("click",this.onClick,this);
a.on("mouseover",this.onMouseOver,this);
a.on("mouseout",this.onMouseOut,this);
this.items.each(function(c){var d=document.createElement("li");
d.className="x-menu-list-item";
a.dom.appendChild(d);
c.render(d,this)
},this);
this.ul=a;
this.autoWidth()
},autoWidth:function(){var b=this.el,c=this.ul;
if(!b){return
}var a=this.width;
if(a){b.setWidth(a)
}else{if(Ext.isIE){b.setWidth(this.minWidth);
var d=b.dom.offsetWidth;
b.setWidth(c.getWidth()+b.getFrameWidth("lr"))
}}},delayAutoWidth:function(){if(this.el){if(!this.awTask){this.awTask=new Ext.util.DelayedTask(this.autoWidth,this)
}this.awTask.delay(20)
}},findTargetItem:function(b){var a=b.getTarget(".x-menu-list-item",this.ul,true);
if(a&&a.menuItemId){return this.items.get(a.menuItemId)
}},onClick:function(b){var a;
if(a=this.findTargetItem(b)){a.onClick(b);
this.fireEvent("click",this,a,b)
}},setActiveItem:function(a,b){if(a!=this.activeItem){if(this.activeItem){this.activeItem.deactivate()
}this.activeItem=a;
a.activate(b)
}else{if(b){a.expandMenu()
}}},tryActivate:function(b,c){var g=this.items;
for(var e=b,a=g.length;
e>=0&&e<a;
e+=c){var d=g.get(e);
if(!d.disabled&&d.canActivate){this.setActiveItem(d,false);
return d
}}return false
},onMouseOver:function(b){var a;
if(a=this.findTargetItem(b)){if(a.canActivate&&!a.disabled){this.setActiveItem(a,true)
}}this.fireEvent("mouseover",this,b,a)
},onMouseOut:function(b){var a;
if(a=this.findTargetItem(b)){if(a==this.activeItem&&a.shouldDeactivate(b)){this.activeItem.deactivate();
delete this.activeItem
}}this.fireEvent("mouseout",this,b,a)
},isVisible:function(){return this.el&&!this.hidden
},show:function(c,b,a){this.parentMenu=a;
if(!this.el){this.render()
}this.fireEvent("beforeshow",this);
this.showAt(this.el.getAlignToXY(c,b||this.defaultAlign),a,false)
},showAt:function(b,c,a){this.parentMenu=c;
if(!this.el){this.render()
}if(a!==false){this.fireEvent("beforeshow",this);
b=this.el.adjustForConstraints(b)
}this.el.setXY(b);
this.el.show();
this.hidden=false;
this.focus();
this.fireEvent("show",this)
},focus:function(){if(!this.hidden){this.doFocus.defer(50,this)
}},doFocus:function(){if(!this.hidden){this.focusEl.focus()
}},hide:function(a){if(this.el&&this.isVisible()){this.fireEvent("beforehide",this);
if(this.activeItem){this.activeItem.deactivate();
this.activeItem=null
}this.el.hide();
this.hidden=true;
this.fireEvent("hide",this)
}if(a===true&&this.parentMenu){this.parentMenu.hide(true)
}},add:function(){var e=arguments,a=e.length,b;
for(var d=0;
d<a;
d++){var c=e[d];
if(c.render){b=this.addItem(c)
}else{if(typeof c=="string"){if(c=="separator"||c=="-"){b=this.addSeparator()
}else{b=this.addText(c)
}}else{if(c.tagName||c.el){b=this.addElement(c)
}else{if(typeof c=="object"){Ext.applyIf(c,this.defaults);
b=this.addMenuItem(c)
}}}}}return b
},getEl:function(){if(!this.el){this.render()
}return this.el
},addSeparator:function(){return this.addItem(new Ext.menu.Separator())
},addElement:function(a){return this.addItem(new Ext.menu.BaseItem(a))
},addItem:function(b){this.items.add(b);
if(this.ul){var a=document.createElement("li");
a.className="x-menu-list-item";
this.ul.dom.appendChild(a);
b.render(a,this);
this.delayAutoWidth()
}return b
},addMenuItem:function(a){if(!(a instanceof Ext.menu.Item)){if(typeof a.checked=="boolean"){a=new Ext.menu.CheckItem(a)
}else{a=new Ext.menu.Item(a)
}}return this.addItem(a)
},addText:function(a){return this.addItem(new Ext.menu.TextItem(a))
},insert:function(c,b){this.items.insert(c,b);
if(this.ul){var a=document.createElement("li");
a.className="x-menu-list-item";
this.ul.dom.insertBefore(a,this.ul.dom.childNodes[c]);
b.render(a,this);
this.delayAutoWidth()
}return b
},remove:function(a){this.items.removeKey(a.id);
a.destroy()
},removeAll:function(){var a;
while(a=this.items.first()){this.remove(a)
}},destroy:function(){this.beforeDestroy();
Ext.menu.MenuMgr.unregister(this);
if(this.keyNav){this.keyNav.disable()
}this.removeAll();
if(this.ul){this.ul.removeAllListeners()
}if(this.el){this.el.destroy()
}},beforeDestroy:Ext.emptyFn});
Ext.menu.MenuNav=function(a){Ext.menu.MenuNav.superclass.constructor.call(this,a.el);
this.scope=this.menu=a
};
Ext.extend(Ext.menu.MenuNav,Ext.KeyNav,{doRelay:function(b,c){var a=b.getKey();
if(!this.menu.activeItem&&b.isNavKeyPress()&&a!=b.SPACE&&a!=b.RETURN){this.menu.tryActivate(0,1);
return false
}return c.call(this.scope||this,b,this.menu)
},up:function(b,a){if(!a.tryActivate(a.items.indexOf(a.activeItem)-1,-1)){a.tryActivate(a.items.length-1,-1)
}},down:function(b,a){if(!a.tryActivate(a.items.indexOf(a.activeItem)+1,1)){a.tryActivate(0,1)
}},right:function(b,a){if(a.activeItem){a.activeItem.expandMenu(true)
}},left:function(b,a){a.hide();
if(a.parentMenu&&a.parentMenu.activeItem){a.parentMenu.activeItem.activate()
}},enter:function(b,a){if(a.activeItem){b.stopPropagation();
a.activeItem.onClick(b);
a.fireEvent("click",this,a.activeItem);
return true
}}});
Ext.menu.MenuMgr=function(){var n,a,b={},d=false,h=new Date();
function e(){n={};
a=new Ext.util.MixedCollection();
Ext.getDoc().addKeyListener(27,function(){if(a.length>0){l()
}})
}function l(){if(a&&a.length>0){var p=a.clone();
p.each(function(q){q.hide()
})
}}function o(p){a.remove(p);
if(a.length<1){Ext.getDoc().un("mousedown",g);
d=false
}}function i(q){var p=a.last();
h=new Date();
a.add(q);
if(!d){Ext.getDoc().on("mousedown",g);
d=true
}if(q.parentMenu){q.getEl().setZIndex(parseInt(q.parentMenu.getEl().getStyle("z-index"),10)+3);
q.parentMenu.activeChild=q
}else{if(p&&p.isVisible()){q.getEl().setZIndex(parseInt(p.getEl().getStyle("z-index"),10)+3)
}}}function c(p){if(p.activeChild){p.activeChild.hide()
}if(p.autoHideTimer){clearTimeout(p.autoHideTimer);
delete p.autoHideTimer
}}function m(q){var p=q.parentMenu;
if(!p&&!q.allowOtherMenus){l()
}else{if(p&&p.activeChild){p.activeChild.hide()
}}}function g(p){if(h.getElapsed()>50&&a.length>0&&!p.getTarget(".x-menu")){l()
}}function k(s,p){if(p){var q=b[s.group];
for(var r=0,t=q.length;
r<t;
r++){if(q[r]!=s){q[r].setChecked(false)
}}}}return{hideAll:function(){l()
},register:function(p){if(!n){e()
}n[p.id]=p;
p.on("beforehide",c);
p.on("hide",o);
p.on("beforeshow",m);
p.on("show",i);
var q=p.group;
if(q&&p.events.checkchange){if(!b[q]){b[q]=[]
}b[q].push(p);
p.on("checkchange",onCheck)
}},get:function(p){if(typeof p=="string"){if(!n){return null
}return n[p]
}else{if(p.events){return p
}else{if(typeof p.length=="number"){return new Ext.menu.Menu({items:p})
}else{return new Ext.menu.Menu(p)
}}}},unregister:function(p){delete n[p.id];
p.un("beforehide",c);
p.un("hide",o);
p.un("beforeshow",m);
p.un("show",i);
var q=p.group;
if(q&&p.events.checkchange){b[q].remove(p);
p.un("checkchange",onCheck)
}},registerCheckable:function(q){var p=q.group;
if(p){if(!b[p]){b[p]=[]
}b[p].push(q);
q.on("beforecheckchange",k)
}},unregisterCheckable:function(q){var p=q.group;
if(p){b[p].remove(q);
q.un("beforecheckchange",k)
}},getCheckedItem:function(q){var p=b[q];
if(p){for(var r=0,s=p.length;
r<s;
r++){if(p[r].checked){return p[r]
}}}return null
},setCheckedItem:function(r,p){var q=b[r];
if(q){for(var s=0,t=q.length;
s<t;
s++){if(q[s].id==p){q[s].setChecked(true)
}}}return null
}}
}();
Ext.menu.BaseItem=function(a){Ext.menu.BaseItem.superclass.constructor.call(this,a);
this.addEvents("click","activate","deactivate");
if(this.handler){this.on("click",this.handler,this.scope)
}};
Ext.extend(Ext.menu.BaseItem,Ext.Component,{canActivate:false,activeClass:"x-menu-item-active",hideOnClick:true,hideDelay:100,ctype:"Ext.menu.BaseItem",actionMode:"container",render:function(a,b){this.parentMenu=b;
Ext.menu.BaseItem.superclass.render.call(this,a);
this.container.menuItemId=this.id
},onRender:function(b,a){this.el=Ext.get(this.el);
b.dom.appendChild(this.el.dom)
},setHandler:function(b,a){if(this.handler){this.un("click",this.handler,this.scope)
}this.on("click",this.handler=b,this.scope=a)
},onClick:function(a){if(!this.disabled&&this.fireEvent("click",this,a)!==false&&this.parentMenu.fireEvent("itemclick",this,a)!==false){this.handleClick(a)
}else{a.stopEvent()
}},activate:function(){if(this.disabled){return false
}var a=this.container;
a.addClass(this.activeClass);
this.region=a.getRegion().adjust(2,2,-2,-2);
this.fireEvent("activate",this);
return true
},deactivate:function(){this.container.removeClass(this.activeClass);
this.fireEvent("deactivate",this)
},shouldDeactivate:function(a){return !this.region||!this.region.contains(a.getPoint())
},handleClick:function(a){if(this.hideOnClick){this.parentMenu.hide.defer(this.hideDelay,this.parentMenu,[true])
}},expandMenu:function(a){},hideMenu:function(){}});
Ext.menu.TextItem=function(a){this.text=a;
Ext.menu.TextItem.superclass.constructor.call(this)
};
Ext.extend(Ext.menu.TextItem,Ext.menu.BaseItem,{hideOnClick:false,itemCls:"x-menu-text",onRender:function(){var a=document.createElement("span");
a.className=this.itemCls;
a.innerHTML=this.text;
this.el=a;
Ext.menu.TextItem.superclass.onRender.apply(this,arguments)
}});
Ext.menu.Separator=function(a){Ext.menu.Separator.superclass.constructor.call(this,a)
};
Ext.extend(Ext.menu.Separator,Ext.menu.BaseItem,{itemCls:"x-menu-sep",hideOnClick:false,onRender:function(a){var b=document.createElement("span");
b.className=this.itemCls;
b.innerHTML="&#160;";
this.el=b;
a.addClass("x-menu-sep-li");
Ext.menu.Separator.superclass.onRender.apply(this,arguments)
}});
Ext.menu.Item=function(a){Ext.menu.Item.superclass.constructor.call(this,a);
if(this.menu){this.menu=Ext.menu.MenuMgr.get(this.menu)
}};
Ext.extend(Ext.menu.Item,Ext.menu.BaseItem,{itemCls:"x-menu-item",canActivate:true,showDelay:200,hideDelay:200,ctype:"Ext.menu.Item",onRender:function(c,a){var b=document.createElement("a");
b.hideFocus=true;
b.unselectable="on";
b.href=this.href||"#";
if(this.hrefTarget){b.target=this.hrefTarget
}b.className=this.itemCls+(this.menu?" x-menu-item-arrow":"")+(this.cls?" "+this.cls:"");
b.innerHTML=String.format('<img src="{0}" class="x-menu-item-icon {2}" />{1}',this.icon||Ext.BLANK_IMAGE_URL,this.itemText||this.text,this.iconCls||"");
this.el=b;
Ext.menu.Item.superclass.onRender.call(this,c,a)
},setText:function(a){this.text=a;
if(this.rendered){this.el.update(String.format('<img src="{0}" class="x-menu-item-icon {2}">{1}',this.icon||Ext.BLANK_IMAGE_URL,this.text,this.iconCls||""));
this.parentMenu.autoWidth()
}},setIconClass:function(a){var b=this.iconCls;
this.iconCls=a;
if(this.rendered){this.el.child("img.x-menu-item-icon").replaceClass(b,this.iconCls)
}},handleClick:function(a){if(!this.href){a.stopEvent()
}Ext.menu.Item.superclass.handleClick.apply(this,arguments)
},activate:function(a){if(Ext.menu.Item.superclass.activate.apply(this,arguments)){this.focus();
if(a){this.expandMenu()
}}return true
},shouldDeactivate:function(a){if(Ext.menu.Item.superclass.shouldDeactivate.call(this,a)){if(this.menu&&this.menu.isVisible()){return !this.menu.getEl().getRegion().contains(a.getPoint())
}return true
}return false
},deactivate:function(){Ext.menu.Item.superclass.deactivate.apply(this,arguments);
this.hideMenu()
},expandMenu:function(a){if(!this.disabled&&this.menu){clearTimeout(this.hideTimer);
delete this.hideTimer;
if(!this.menu.isVisible()&&!this.showTimer){this.showTimer=this.deferExpand.defer(this.showDelay,this,[a])
}else{if(this.menu.isVisible()&&a){this.menu.tryActivate(0,1)
}}}},deferExpand:function(a){delete this.showTimer;
this.menu.show(this.container,this.parentMenu.subMenuAlign||"tl-tr?",this.parentMenu);
if(a){this.menu.tryActivate(0,1)
}},hideMenu:function(){clearTimeout(this.showTimer);
delete this.showTimer;
if(!this.hideTimer&&this.menu&&this.menu.isVisible()){this.hideTimer=this.deferHide.defer(this.hideDelay,this)
}},deferHide:function(){delete this.hideTimer;
this.menu.hide()
}});
Ext.menu.CheckItem=function(a){Ext.menu.CheckItem.superclass.constructor.call(this,a);
this.addEvents("beforecheckchange","checkchange");
if(this.checkHandler){this.on("checkchange",this.checkHandler,this.scope)
}Ext.menu.MenuMgr.registerCheckable(this)
};
Ext.extend(Ext.menu.CheckItem,Ext.menu.Item,{itemCls:"x-menu-item x-menu-check-item",groupClass:"x-menu-group-item",checked:false,ctype:"Ext.menu.CheckItem",onRender:function(a){Ext.menu.CheckItem.superclass.onRender.apply(this,arguments);
if(this.group){this.el.addClass(this.groupClass)
}if(this.checked){this.checked=false;
this.setChecked(true,true)
}},destroy:function(){Ext.menu.MenuMgr.unregisterCheckable(this);
Ext.menu.CheckItem.superclass.destroy.apply(this,arguments)
},setChecked:function(b,a){if(this.checked!=b&&this.fireEvent("beforecheckchange",this,b)!==false){if(this.container){this.container[b?"addClass":"removeClass"]("x-menu-item-checked")
}this.checked=b;
if(a!==true){this.fireEvent("checkchange",this,b)
}}},handleClick:function(a){if(!this.disabled&&!(this.checked&&this.group)){this.setChecked(!this.checked)
}Ext.menu.CheckItem.superclass.handleClick.apply(this,arguments)
}});
Ext.menu.Adapter=function(b,a){Ext.menu.Adapter.superclass.constructor.call(this,a);
this.component=b
};
Ext.extend(Ext.menu.Adapter,Ext.menu.BaseItem,{canActivate:true,onRender:function(b,a){this.component.render(b);
this.el=this.component.getEl()
},activate:function(){if(this.disabled){return false
}this.component.focus();
this.fireEvent("activate",this);
return true
},deactivate:function(){this.fireEvent("deactivate",this)
},disable:function(){this.component.disable();
Ext.menu.Adapter.superclass.disable.call(this)
},enable:function(){this.component.enable();
Ext.menu.Adapter.superclass.enable.call(this)
}});
Ext.menu.DateItem=function(a){Ext.menu.DateItem.superclass.constructor.call(this,new Ext.DatePicker(a),a);
this.picker=this.component;
this.addEvents("select");
this.picker.on("render",function(b){b.getEl().swallowEvent("click");
b.container.addClass("x-menu-date-item")
});
this.picker.on("select",this.onSelect,this)
};
Ext.extend(Ext.menu.DateItem,Ext.menu.Adapter,{onSelect:function(b,a){this.fireEvent("select",this,a,b);
Ext.menu.DateItem.superclass.handleClick.call(this)
}});
Ext.menu.ColorItem=function(a){Ext.menu.ColorItem.superclass.constructor.call(this,new Ext.ColorPalette(a),a);
this.palette=this.component;
this.relayEvents(this.palette,["select"]);
if(this.selectHandler){this.on("select",this.selectHandler,this.scope)
}};
Ext.extend(Ext.menu.ColorItem,Ext.menu.Adapter);
Ext.menu.DateMenu=function(a){Ext.menu.DateMenu.superclass.constructor.call(this,a);
this.plain=true;
var b=new Ext.menu.DateItem(a);
this.add(b);
this.picker=b.picker;
this.relayEvents(b,["select"]);
this.on("beforeshow",function(){if(this.picker){this.picker.hideMonthPicker(true)
}},this)
};
Ext.extend(Ext.menu.DateMenu,Ext.menu.Menu,{cls:"x-date-menu",beforeDestroy:function(){this.picker.destroy()
}});
Ext.menu.ColorMenu=function(a){Ext.menu.ColorMenu.superclass.constructor.call(this,a);
this.plain=true;
var b=new Ext.menu.ColorItem(a);
this.add(b);
this.palette=b.palette;
this.relayEvents(b,["select"])
};
Ext.extend(Ext.menu.ColorMenu,Ext.menu.Menu);
Ext.form.Field=Ext.extend(Ext.BoxComponent,{invalidClass:"x-form-invalid",invalidText:"The value in this field is invalid",focusClass:"x-form-focus",validationEvent:"keyup",validateOnBlur:true,validationDelay:250,defaultAutoCreate:{tag:"input",type:"text",size:"20",autocomplete:"off"},fieldClass:"x-form-field",msgTarget:"qtip",msgFx:"normal",readOnly:false,disabled:false,isFormField:true,hasFocus:false,initComponent:function(){Ext.form.Field.superclass.initComponent.call(this);
this.addEvents("focus","blur","specialkey","change","invalid","valid")
},getName:function(){return this.rendered&&this.el.dom.name?this.el.dom.name:(this.hiddenName||"")
},onRender:function(c,a){Ext.form.Field.superclass.onRender.call(this,c,a);
if(!this.el){var d=this.getAutoCreate();
if(!d.name){d.name=this.name||this.id
}if(this.inputType){d.type=this.inputType
}this.el=c.createChild(d,a)
}var b=this.el.dom.type;
if(b){if(b=="password"){b="text"
}this.el.addClass("x-form-"+b)
}if(this.readOnly){this.el.dom.readOnly=true
}if(this.tabIndex!==undefined){this.el.dom.setAttribute("tabIndex",this.tabIndex)
}this.el.addClass([this.fieldClass,this.cls]);
this.initValue()
},initValue:function(){if(this.value!==undefined){this.setValue(this.value)
}else{if(this.el.dom.value.length>0){this.setValue(this.el.dom.value)
}}},isDirty:function(){if(this.disabled){return false
}return String(this.getValue())!==String(this.originalValue)
},afterRender:function(){Ext.form.Field.superclass.afterRender.call(this);
this.initEvents()
},fireKey:function(a){if(a.isSpecialKey()){this.fireEvent("specialkey",this,a)
}},reset:function(){this.setValue(this.originalValue);
this.clearInvalid()
},initEvents:function(){this.el.on(Ext.isIE?"keydown":"keypress",this.fireKey,this);
this.el.on("focus",this.onFocus,this);
this.el.on("blur",this.onBlur,this);
this.originalValue=this.getValue()
},onFocus:function(){if(!Ext.isOpera&&this.focusClass){this.el.addClass(this.focusClass)
}if(!this.hasFocus){this.hasFocus=true;
this.startValue=this.getValue();
this.fireEvent("focus",this)
}},beforeBlur:Ext.emptyFn,onBlur:function(){this.beforeBlur();
if(!Ext.isOpera&&this.focusClass){this.el.removeClass(this.focusClass)
}this.hasFocus=false;
if(this.validationEvent!==false&&this.validateOnBlur&&this.validationEvent!="blur"){this.validate()
}var a=this.getValue();
if(String(a)!==String(this.startValue)){this.fireEvent("change",this,a,this.startValue)
}this.fireEvent("blur",this)
},isValid:function(a){if(this.disabled){return true
}var b=this.preventMark;
this.preventMark=a===true;
var c=this.validateValue(this.processValue(this.getRawValue()));
this.preventMark=b;
return c
},validate:function(){if(this.disabled||this.validateValue(this.processValue(this.getRawValue()))){this.clearInvalid();
return true
}return false
},processValue:function(a){return a
},validateValue:function(a){return true
},markInvalid:function(b){if(!this.rendered||this.preventMark){return
}this.el.addClass(this.invalidClass);
b=b||this.invalidText;
switch(this.msgTarget){case"qtip":this.el.dom.qtip=b;
this.el.dom.qclass="x-form-invalid-tip";
if(Ext.QuickTips){Ext.QuickTips.enable()
}break;
case"title":this.el.dom.title=b;
break;
case"under":if(!this.errorEl){var c=this.el.findParent(".x-form-element",5,true);
this.errorEl=c.createChild({cls:"x-form-invalid-msg"});
this.errorEl.setWidth(c.getWidth(true)-20)
}this.errorEl.update(b);
Ext.form.Field.msgFx[this.msgFx].show(this.errorEl,this);
break;
case"side":if(!this.errorIcon){var c=this.el.findParent(".x-form-element",5,true);
this.errorIcon=c.createChild({cls:"x-form-invalid-icon"})
}this.alignErrorIcon();
this.errorIcon.dom.qtip=b;
this.errorIcon.dom.qclass="x-form-invalid-tip";
this.errorIcon.show();
this.on("resize",this.alignErrorIcon,this);
break;
default:var a=Ext.getDom(this.msgTarget);
a.innerHTML=b;
a.style.display=this.msgDisplay;
break
}this.fireEvent("invalid",this,b)
},alignErrorIcon:function(){this.errorIcon.alignTo(this.el,"tl-tr",[2,0])
},clearInvalid:function(){if(!this.rendered||this.preventMark){return
}this.el.removeClass(this.invalidClass);
switch(this.msgTarget){case"qtip":this.el.dom.qtip="";
break;
case"title":this.el.dom.title="";
break;
case"under":if(this.errorEl){Ext.form.Field.msgFx[this.msgFx].hide(this.errorEl,this)
}break;
case"side":if(this.errorIcon){this.errorIcon.dom.qtip="";
this.errorIcon.hide();
this.un("resize",this.alignErrorIcon,this)
}break;
default:var a=Ext.getDom(this.msgTarget);
a.innerHTML="";
a.style.display="none";
break
}this.fireEvent("valid",this)
},getRawValue:function(){var a=this.rendered?this.el.getValue():Ext.value(this.value,"");
if(a===this.emptyText){a=""
}return a
},getValue:function(){if(!this.rendered){return this.value
}var a=this.el.getValue();
if(a===this.emptyText||a===undefined){a=""
}return a
},setRawValue:function(a){return this.el.dom.value=(a===null||a===undefined?"":a)
},setValue:function(a){this.value=a;
if(this.rendered){this.el.dom.value=(a===null||a===undefined?"":a);
this.validate()
}},adjustSize:function(a,b){var c=Ext.form.Field.superclass.adjustSize.call(this,a,b);
c.width=this.adjustWidth(this.el.dom.tagName,c.width);
return c
},adjustWidth:function(a,b){a=a.toLowerCase();
if(typeof b=="number"&&!Ext.isSafari){if(Ext.isIE&&(a=="input"||a=="textarea")){if(a=="input"&&!Ext.isStrict){return this.inEditor?b:b-3
}if(a=="input"&&Ext.isStrict){return b-(Ext.isIE6?4:1)
}if(a="textarea"&&Ext.isStrict){return b-2
}}else{if(Ext.isOpera&&Ext.isStrict){if(a=="input"){return b+2
}if(a="textarea"){return b-2
}}}}return b
}});
Ext.form.Field.msgFx={normal:{show:function(a,b){a.setDisplayed("block")
},hide:function(a,b){a.setDisplayed(false).update("")
}},slide:{show:function(a,b){a.slideIn("t",{stopFx:true})
},hide:function(a,b){a.slideOut("t",{stopFx:true,useDisplay:true})
}},slideRight:{show:function(a,b){a.fixDisplay();
a.alignTo(b.el,"tl-tr");
a.slideIn("l",{stopFx:true})
},hide:function(a,b){a.slideOut("l",{stopFx:true,useDisplay:true})
}}};
Ext.reg("field",Ext.form.Field);
Ext.form.TextField=Ext.extend(Ext.form.Field,{grow:false,growMin:30,growMax:800,vtype:null,maskRe:null,disableKeyFilter:false,allowBlank:true,minLength:0,maxLength:Number.MAX_VALUE,minLengthText:"The minimum length for this field is {0}",maxLengthText:"The maximum length for this field is {0}",selectOnFocus:false,blankText:"This field is required",validator:null,regex:null,regexText:"",emptyText:null,emptyClass:"x-form-empty-field",initComponent:function(){Ext.form.TextField.superclass.initComponent.call(this);
this.addEvents("autosize")
},initEvents:function(){Ext.form.TextField.superclass.initEvents.call(this);
if(this.validationEvent=="keyup"){this.validationTask=new Ext.util.DelayedTask(this.validate,this);
this.el.on("keyup",this.filterValidation,this)
}else{if(this.validationEvent!==false){this.el.on(this.validationEvent,this.validate,this,{buffer:this.validationDelay})
}}if(this.selectOnFocus||this.emptyText){this.on("focus",this.preFocus,this);
if(this.emptyText){this.on("blur",this.postBlur,this);
this.applyEmptyText()
}}if(this.maskRe||(this.vtype&&this.disableKeyFilter!==true&&(this.maskRe=Ext.form.VTypes[this.vtype+"Mask"]))){this.el.on("keypress",this.filterKeys,this)
}if(this.grow){this.el.on("keyup",this.onKeyUp,this,{buffer:50});
this.el.on("click",this.autoSize,this)
}},processValue:function(a){if(this.stripCharsRe){var b=a.replace(this.stripCharsRe,"");
if(b!==a){this.setRawValue(b);
return b
}}return a
},filterValidation:function(a){if(!a.isNavKeyPress()){this.validationTask.delay(this.validationDelay)
}},onKeyUp:function(a){if(!a.isNavKeyPress()){this.autoSize()
}},reset:function(){Ext.form.TextField.superclass.reset.call(this);
this.applyEmptyText()
},applyEmptyText:function(){if(this.rendered&&this.emptyText&&this.getRawValue().length<1){this.setRawValue(this.emptyText);
this.el.addClass(this.emptyClass)
}},preFocus:function(){if(this.emptyText){if(this.el.dom.value==this.emptyText){this.setRawValue("")
}this.el.removeClass(this.emptyClass)
}if(this.selectOnFocus){this.el.dom.select()
}},postBlur:function(){this.applyEmptyText()
},filterKeys:function(d){var a=d.getKey();
if(!Ext.isIE&&(d.isNavKeyPress()||a==d.BACKSPACE||(a==d.DELETE&&d.button==-1))){return
}var b=d.getCharCode(),c=String.fromCharCode(b);
if(Ext.isIE&&(d.isSpecialKey()||!c)){return
}if(!this.maskRe.test(c)){d.stopEvent()
}},setValue:function(a){if(this.emptyText&&this.el&&a!==undefined&&a!==null&&a!==""){this.el.removeClass(this.emptyClass)
}Ext.form.TextField.superclass.setValue.apply(this,arguments);
this.applyEmptyText();
this.autoSize()
},validateValue:function(a){if(a.length<1||a===this.emptyText){if(this.allowBlank){this.clearInvalid();
return true
}else{this.markInvalid(this.blankText);
return false
}}if(a.length<this.minLength){this.markInvalid(String.format(this.minLengthText,this.minLength));
return false
}if(a.length>this.maxLength){this.markInvalid(String.format(this.maxLengthText,this.maxLength));
return false
}if(this.vtype){var b=Ext.form.VTypes;
if(!b[this.vtype](a,this)){this.markInvalid(this.vtypeText||b[this.vtype+"Text"]);
return false
}}if(typeof this.validator=="function"){var c=this.validator(a);
if(c!==true){this.markInvalid(c);
return false
}}if(this.regex&&!this.regex.test(a)){this.markInvalid(this.regexText);
return false
}return true
},selectText:function(b,a){var d=this.getRawValue();
if(d.length>0){b=b===undefined?0:b;
a=a===undefined?d.length:a;
var c=this.el.dom;
if(c.setSelectionRange){c.setSelectionRange(b,a)
}else{if(c.createTextRange){var e=c.createTextRange();
e.moveStart("character",b);
e.moveEnd("character",a-d.length);
e.select()
}}}},autoSize:function(){if(!this.grow||!this.rendered){return
}if(!this.metrics){this.metrics=Ext.util.TextMetrics.createInstance(this.el)
}var c=this.el;
var d=c.dom.value;
var b=document.createElement("div");
b.appendChild(document.createTextNode(d));
d=b.innerHTML;
b=null;
d+="&#160;";
var a=Math.min(this.growMax,Math.max(this.metrics.getWidth(d)+10,this.growMin));
this.el.setWidth(a);
this.fireEvent("autosize",this,a)
}});
Ext.reg("textfield",Ext.form.TextField);
Ext.form.TriggerField=Ext.extend(Ext.form.TextField,{defaultAutoCreate:{tag:"input",type:"text",size:"16",autocomplete:"off"},hideTrigger:false,autoSize:Ext.emptyFn,monitorTab:true,deferHeight:true,mimicing:false,onResize:function(a,b){Ext.form.TriggerField.superclass.onResize.call(this,a,b);
if(typeof a=="number"){this.el.setWidth(this.adjustWidth("input",a-this.trigger.getWidth()))
}this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth())
},adjustSize:Ext.BoxComponent.prototype.adjustSize,getResizeEl:function(){return this.wrap
},getPositionEl:function(){return this.wrap
},alignErrorIcon:function(){this.errorIcon.alignTo(this.wrap,"tl-tr",[2,0])
},onRender:function(b,a){Ext.form.TriggerField.superclass.onRender.call(this,b,a);
this.wrap=this.el.wrap({cls:"x-form-field-wrap"});
this.trigger=this.wrap.createChild(this.triggerConfig||{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.triggerClass});
if(this.hideTrigger){this.trigger.setDisplayed(false)
}this.initTrigger();
if(!this.width){this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth())
}},initTrigger:function(){this.trigger.on("click",this.onTriggerClick,this,{preventDefault:true});
this.trigger.addClassOnOver("x-form-trigger-over");
this.trigger.addClassOnClick("x-form-trigger-click")
},onDestroy:function(){if(this.trigger){this.trigger.removeAllListeners();
this.trigger.remove()
}if(this.wrap){this.wrap.remove()
}Ext.form.TriggerField.superclass.onDestroy.call(this)
},onFocus:function(){Ext.form.TriggerField.superclass.onFocus.call(this);
if(!this.mimicing){this.wrap.addClass("x-trigger-wrap-focus");
this.mimicing=true;
Ext.get(Ext.isIE?document.body:document).on("mousedown",this.mimicBlur,this,{delay:10});
if(this.monitorTab){this.el.on("keydown",this.checkTab,this)
}}},checkTab:function(a){if(a.getKey()==a.TAB){this.triggerBlur()
}},onBlur:function(){},mimicBlur:function(a){if(!this.wrap.contains(a.target)&&this.validateBlur(a)){this.triggerBlur()
}},triggerBlur:function(){this.mimicing=false;
Ext.get(Ext.isIE?document.body:document).un("mousedown",this.mimicBlur);
if(this.monitorTab){this.el.un("keydown",this.checkTab,this)
}this.beforeBlur();
this.wrap.removeClass("x-trigger-wrap-focus");
Ext.form.TriggerField.superclass.onBlur.call(this)
},beforeBlur:Ext.emptyFn,validateBlur:function(a){return true
},onDisable:function(){Ext.form.TriggerField.superclass.onDisable.call(this);
if(this.wrap){this.wrap.addClass("x-item-disabled")
}},onEnable:function(){Ext.form.TriggerField.superclass.onEnable.call(this);
if(this.wrap){this.wrap.removeClass("x-item-disabled")
}},onShow:function(){if(this.wrap){this.wrap.dom.style.display="";
this.wrap.dom.style.visibility="visible"
}},onHide:function(){this.wrap.dom.style.display="none"
},onTriggerClick:Ext.emptyFn});
Ext.form.TwinTriggerField=Ext.extend(Ext.form.TriggerField,{initComponent:function(){Ext.form.TwinTriggerField.superclass.initComponent.call(this);
this.triggerConfig={tag:"span",cls:"x-form-twin-triggers",cn:[{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger1Class},{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger2Class}]}
},getTrigger:function(a){return this.triggers[a]
},initTrigger:function(){var a=this.trigger.select(".x-form-trigger",true);
this.wrap.setStyle("overflow","hidden");
var b=this;
a.each(function(e,c,g){e.hide=function(){var h=b.wrap.getWidth();
this.dom.style.display="none";
b.el.setWidth(h-b.trigger.getWidth())
};
e.show=function(){var h=b.wrap.getWidth();
this.dom.style.display="";
b.el.setWidth(h-b.trigger.getWidth())
};
var d="Trigger"+(g+1);
if(this["hide"+d]){e.dom.style.display="none"
}e.on("click",this["on"+d+"Click"],this,{preventDefault:true});
e.addClassOnOver("x-form-trigger-over");
e.addClassOnClick("x-form-trigger-click")
},this);
this.triggers=a.elements
},onTrigger1Click:Ext.emptyFn,onTrigger2Click:Ext.emptyFn});
Ext.reg("trigger",Ext.form.TriggerField);
Ext.form.TextArea=Ext.extend(Ext.form.TextField,{growMin:60,growMax:1000,growAppend:"&#160;\n&#160;",growPad:0,enterIsSpecial:false,preventScrollbars:false,onRender:function(b,a){if(!this.el){this.defaultAutoCreate={tag:"textarea",style:"width:100px;height:60px;",autocomplete:"off"}
}Ext.form.TextArea.superclass.onRender.call(this,b,a);
if(this.grow){this.textSizeEl=Ext.DomHelper.append(document.body,{tag:"pre",cls:"x-form-grow-sizer"});
if(this.preventScrollbars){this.el.setStyle("overflow","hidden")
}this.el.setHeight(this.growMin)
}},onDestroy:function(){if(this.textSizeEl){Ext.removeNode(this.textSizeEl)
}Ext.form.TextArea.superclass.onDestroy.call(this)
},fireKey:function(a){if(a.isSpecialKey()&&(this.enterIsSpecial||(a.getKey()!=a.ENTER||a.hasModifier()))){this.fireEvent("specialkey",this,a)
}},onKeyUp:function(a){if(!a.isNavKeyPress()||a.getKey()==a.ENTER){this.autoSize()
}},autoSize:function(){if(!this.grow||!this.textSizeEl){return
}var c=this.el;
var a=c.dom.value;
var b=this.textSizeEl;
b.innerHTML="";
b.appendChild(document.createTextNode(a));
a=b.innerHTML;
Ext.fly(b).setWidth(this.el.getWidth());
if(a.length<1){a="&#160;&#160;"
}else{if(Ext.isIE){a=a.replace(/\n/g,"<p>&#160;</p>")
}a+=this.growAppend
}b.innerHTML=a;
var d=Math.min(this.growMax,Math.max(b.offsetHeight,this.growMin)+this.growPad);
if(d!=this.lastHeight){this.lastHeight=d;
this.el.setHeight(d);
this.fireEvent("autosize",this,d)
}}});
Ext.reg("textarea",Ext.form.TextArea);
Ext.form.NumberField=Ext.extend(Ext.form.TextField,{fieldClass:"x-form-field x-form-num-field",allowDecimals:true,decimalSeparator:".",decimalPrecision:2,allowNegative:true,minValue:Number.NEGATIVE_INFINITY,maxValue:Number.MAX_VALUE,minText:"The minimum value for this field is {0}",maxText:"The maximum value for this field is {0}",nanText:"{0} is not a valid number",baseChars:"0123456789",initEvents:function(){Ext.form.NumberField.superclass.initEvents.call(this);
var b=this.baseChars+"";
if(this.allowDecimals){b+=this.decimalSeparator
}if(this.allowNegative){b+="-"
}this.stripCharsRe=new RegExp("[^"+b+"]","gi");
var a=function(d){var e=d.getKey();
if(!Ext.isIE&&(d.isSpecialKey()||e==d.BACKSPACE||e==d.DELETE)){return
}var c=d.getCharCode();
if(b.indexOf(String.fromCharCode(c))===-1){d.stopEvent()
}};
this.el.on("keypress",a,this)
},validateValue:function(b){if(!Ext.form.NumberField.superclass.validateValue.call(this,b)){return false
}if(b.length<1){return true
}b=String(b).replace(this.decimalSeparator,".");
if(isNaN(b)){this.markInvalid(String.format(this.nanText,b));
return false
}var a=this.parseValue(b);
if(a<this.minValue){this.markInvalid(String.format(this.minText,this.minValue));
return false
}if(a>this.maxValue){this.markInvalid(String.format(this.maxText,this.maxValue));
return false
}return true
},getValue:function(){return this.fixPrecision(this.parseValue(Ext.form.NumberField.superclass.getValue.call(this)))
},setValue:function(a){a=parseFloat(a);
a=isNaN(a)?"":String(a).replace(".",this.decimalSeparator);
Ext.form.NumberField.superclass.setValue.call(this,a)
},parseValue:function(a){a=parseFloat(String(a).replace(this.decimalSeparator,"."));
return isNaN(a)?"":a
},fixPrecision:function(b){var a=isNaN(b);
if(!this.allowDecimals||this.decimalPrecision==-1||a||!b){return a?"":b
}return parseFloat(parseFloat(b).toFixed(this.decimalPrecision))
},beforeBlur:function(){var a=this.parseValue(this.getRawValue());
if(a){this.setValue(this.fixPrecision(a))
}}});
Ext.reg("numberfield",Ext.form.NumberField);
Ext.form.DateField=Ext.extend(Ext.form.TriggerField,{format:"m/d/y",altFormats:"m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d",disabledDays:null,disabledDaysText:"Disabled",disabledDates:null,disabledDatesText:"Disabled",minValue:null,maxValue:null,minText:"The date in this field must be equal to or after {0}",maxText:"The date in this field must be equal to or before {0}",invalidText:"{0} is not a valid date - it must be in the format {1}",triggerClass:"x-form-date-trigger",defaultAutoCreate:{tag:"input",type:"text",size:"10",autocomplete:"off"},initComponent:function(){Ext.form.DateField.superclass.initComponent.call(this);
if(typeof this.minValue=="string"){this.minValue=this.parseDate(this.minValue)
}if(typeof this.maxValue=="string"){this.maxValue=this.parseDate(this.maxValue)
}this.ddMatch=null;
if(this.disabledDates){var a=this.disabledDates;
var b="(?:";
for(var c=0;
c<a.length;
c++){b+=a[c];
if(c!=a.length-1){b+="|"
}}this.ddMatch=new RegExp(b+")")
}},validateValue:function(c){c=this.formatDate(c);
if(!Ext.form.DateField.superclass.validateValue.call(this,c)){return false
}if(c.length<1){return true
}var e=c;
c=this.parseDate(c);
if(!c){this.markInvalid(String.format(this.invalidText,e,this.format));
return false
}var b=c.getTime();
if(this.minValue&&b<this.minValue.getTime()){this.markInvalid(String.format(this.minText,this.formatDate(this.minValue)));
return false
}if(this.maxValue&&b>this.maxValue.getTime()){this.markInvalid(String.format(this.maxText,this.formatDate(this.maxValue)));
return false
}if(this.disabledDays){var a=c.getDay();
for(var g=0;
g<this.disabledDays.length;
g++){if(a===this.disabledDays[g]){this.markInvalid(this.disabledDaysText);
return false
}}}var d=this.formatDate(c);
if(this.ddMatch&&this.ddMatch.test(d)){this.markInvalid(String.format(this.disabledDatesText,d));
return false
}return true
},validateBlur:function(){return !this.menu||!this.menu.isVisible()
},getValue:function(){return this.parseDate(Ext.form.DateField.superclass.getValue.call(this))||""
},setValue:function(a){Ext.form.DateField.superclass.setValue.call(this,this.formatDate(this.parseDate(a)))
},parseDate:function(b){if(!b||Ext.isDate(b)){return b
}var d=Date.parseDate(b,this.format);
if(!d&&this.altFormats){if(!this.altFormatsArray){this.altFormatsArray=this.altFormats.split("|")
}for(var c=0,a=this.altFormatsArray.length;
c<a&&!d;
c++){d=Date.parseDate(b,this.altFormatsArray[c])
}}return d
},onDestroy:function(){if(this.menu){this.menu.destroy()
}if(this.wrap){this.wrap.remove()
}Ext.form.DateField.superclass.onDestroy.call(this)
},formatDate:function(a){return Ext.isDate(a)?a.dateFormat(this.format):a
},menuListeners:{select:function(a,b){this.setValue(b)
},show:function(){this.onFocus()
},hide:function(){this.focus.defer(10,this);
var a=this.menuListeners;
this.menu.un("select",a.select,this);
this.menu.un("show",a.show,this);
this.menu.un("hide",a.hide,this)
}},onTriggerClick:function(){if(this.disabled){return
}if(this.menu==null){this.menu=new Ext.menu.DateMenu()
}Ext.apply(this.menu.picker,{minDate:this.minValue,maxDate:this.maxValue,disabledDatesRE:this.ddMatch,disabledDatesText:this.disabledDatesText,disabledDays:this.disabledDays,disabledDaysText:this.disabledDaysText,format:this.format,minText:String.format(this.minText,this.formatDate(this.minValue)),maxText:String.format(this.maxText,this.formatDate(this.maxValue))});
this.menu.on(Ext.apply({},this.menuListeners,{scope:this}));
this.menu.picker.setValue(this.getValue()||new Date());
this.menu.show(this.el,"tl-bl?")
},beforeBlur:function(){var a=this.parseDate(this.getRawValue());
if(a){this.setValue(a)
}}});
Ext.reg("datefield",Ext.form.DateField);
Ext.form.ComboBox=Ext.extend(Ext.form.TriggerField,{defaultAutoCreate:{tag:"input",type:"text",size:"24",autocomplete:"off"},listClass:"",selectedClass:"x-combo-selected",triggerClass:"x-form-arrow-trigger",shadow:"sides",listAlign:"tl-bl?",maxHeight:300,minHeight:90,triggerAction:"query",minChars:4,typeAhead:false,queryDelay:500,pageSize:0,selectOnFocus:false,queryParam:"query",loadingText:"Loading...",resizable:false,handleHeight:8,editable:true,allQuery:"",mode:"remote",minListWidth:70,forceSelection:false,typeAheadDelay:250,lazyInit:true,initComponent:function(){Ext.form.ComboBox.superclass.initComponent.call(this);
this.addEvents("expand","collapse","beforeselect","select","beforequery");
if(this.transform){this.allowDomMove=false;
var g=Ext.getDom(this.transform);
if(!this.hiddenName){this.hiddenName=g.name
}if(!this.store){this.mode="local";
var b=[],e=g.options;
for(var h=0,a=e.length;
h<a;
h++){var c=e[h];
var d=(Ext.isIE?c.getAttributeNode("value").specified:c.hasAttribute("value"))?c.value:c.text;
if(c.selected){this.value=d
}b.push([d,c.text])
}this.store=new Ext.data.SimpleStore({id:0,fields:["value","text"],data:b});
this.valueField="value";
this.displayField="text"
}g.name=Ext.id();
if(!this.lazyRender){this.target=true;
this.el=Ext.DomHelper.insertBefore(g,this.autoCreate||this.defaultAutoCreate);
Ext.removeNode(g);
this.render(this.el.parentNode)
}else{Ext.removeNode(g)
}}this.selectedIndex=-1;
if(this.mode=="local"){if(this.initialConfig.queryDelay===undefined){this.queryDelay=10
}if(this.initialConfig.minChars===undefined){this.minChars=0
}}},onRender:function(b,a){Ext.form.ComboBox.superclass.onRender.call(this,b,a);
if(this.hiddenName){this.hiddenField=this.el.insertSibling({tag:"input",type:"hidden",name:this.hiddenName,id:(this.hiddenId||this.hiddenName)},"before",true);
this.hiddenField.value=this.hiddenValue!==undefined?this.hiddenValue:this.value!==undefined?this.value:"";
this.el.dom.removeAttribute("name")
}if(Ext.isGecko){this.el.dom.setAttribute("autocomplete","off")
}if(!this.lazyInit){this.initList()
}else{this.on("focus",this.initList,this,{single:true})
}if(!this.editable){this.editable=true;
this.setEditable(false)
}},initList:function(){if(!this.list){var a="x-combo-list";
this.list=new Ext.Layer({shadow:this.shadow,cls:[a,this.listClass].join(" "),constrain:false});
var b=this.listWidth||Math.max(this.wrap.getWidth(),this.minListWidth);
this.list.setWidth(b);
this.list.swallowEvent("mousewheel");
this.assetHeight=0;
if(this.title){this.header=this.list.createChild({cls:a+"-hd",html:this.title});
this.assetHeight+=this.header.getHeight()
}this.innerList=this.list.createChild({cls:a+"-inner"});
this.innerList.on("mouseover",this.onViewOver,this);
this.innerList.on("mousemove",this.onViewMove,this);
this.innerList.setWidth(b-this.list.getFrameWidth("lr"));
if(this.pageSize){this.footer=this.list.createChild({cls:a+"-ft"});
this.pageTb=new Ext.PagingToolbar({store:this.store,pageSize:this.pageSize,renderTo:this.footer});
this.assetHeight+=this.footer.getHeight()
}if(!this.tpl){this.tpl='<tpl for="."><div class="'+a+'-item">{'+this.displayField+"}</div></tpl>"
}this.view=new Ext.DataView({applyTo:this.innerList,tpl:this.tpl,singleSelect:true,selectedClass:this.selectedClass,itemSelector:this.itemSelector||"."+a+"-item"});
this.view.on("click",this.onViewClick,this);
this.bindStore(this.store,true);
if(this.resizable){this.resizer=new Ext.Resizable(this.list,{pinned:true,handles:"se"});
this.resizer.on("resize",function(c,e,d){this.maxHeight=d-this.handleHeight-this.list.getFrameWidth("tb")-this.assetHeight;
this.listWidth=e;
this.innerList.setWidth(e-this.list.getFrameWidth("lr"));
this.restrictHeight()
},this);
this[this.pageSize?"footer":"innerList"].setStyle("margin-bottom",this.handleHeight+"px")
}}},bindStore:function(a,b){if(this.store&&!b){this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("loadexception",this.collapse,this);
if(!a){this.store=null;
if(this.view){this.view.setStore(null)
}}}if(a){this.store=Ext.StoreMgr.lookup(a);
this.store.on("beforeload",this.onBeforeLoad,this);
this.store.on("load",this.onLoad,this);
this.store.on("loadexception",this.collapse,this);
if(this.view){this.view.setStore(a)
}}},initEvents:function(){Ext.form.ComboBox.superclass.initEvents.call(this);
this.keyNav=new Ext.KeyNav(this.el,{up:function(a){this.inKeyMode=true;
this.selectPrev()
},down:function(a){if(!this.isExpanded()){this.onTriggerClick()
}else{this.inKeyMode=true;
this.selectNext()
}},enter:function(a){this.onViewClick();
this.delayedCheck=true;
this.unsetDelayCheck.defer(10,this)
},esc:function(a){this.collapse()
},tab:function(a){this.onViewClick(false);
return true
},scope:this,doRelay:function(b,c,a){if(a=="down"||this.scope.isExpanded()){return Ext.KeyNav.prototype.doRelay.apply(this,arguments)
}return true
},forceKeyDown:true});
this.queryDelay=Math.max(this.queryDelay||10,this.mode=="local"?10:250);
this.dqTask=new Ext.util.DelayedTask(this.initQuery,this);
if(this.typeAhead){this.taTask=new Ext.util.DelayedTask(this.onTypeAhead,this)
}if(this.editable!==false){this.el.on("keyup",this.onKeyUp,this)
}if(this.forceSelection){this.on("blur",this.doForce,this)
}},onDestroy:function(){if(this.view){this.view.el.removeAllListeners();
this.view.el.remove();
this.view.purgeListeners()
}if(this.list){this.list.destroy()
}this.bindStore(null);
Ext.form.ComboBox.superclass.onDestroy.call(this)
},unsetDelayCheck:function(){delete this.delayedCheck
},fireKey:function(a){if(a.isNavKeyPress()&&!this.isExpanded()&&!this.delayedCheck){this.fireEvent("specialkey",this,a)
}},onResize:function(a,c){Ext.form.ComboBox.superclass.onResize.apply(this,arguments);
if(this.list&&this.listWidth===undefined){var b=Math.max(a,this.minListWidth);
this.list.setWidth(b);
this.innerList.setWidth(b-this.list.getFrameWidth("lr"))
}},onEnable:function(){Ext.form.ComboBox.superclass.onEnable.apply(this,arguments);
if(this.hiddenField){this.hiddenField.disabled=false
}},onDisable:function(){Ext.form.ComboBox.superclass.onDisable.apply(this,arguments);
if(this.hiddenField){this.hiddenField.disabled=true
}},setEditable:function(a){if(a==this.editable){return
}this.editable=a;
if(!a){this.el.dom.setAttribute("readOnly",true);
this.el.on("mousedown",this.onTriggerClick,this);
this.el.addClass("x-combo-noedit")
}else{this.el.dom.setAttribute("readOnly",false);
this.el.un("mousedown",this.onTriggerClick,this);
this.el.removeClass("x-combo-noedit")
}},onBeforeLoad:function(){if(!this.hasFocus){return
}this.innerList.update(this.loadingText?'<div class="loading-indicator">'+this.loadingText+"</div>":"");
this.restrictHeight();
this.selectedIndex=-1
},onLoad:function(){if(!this.hasFocus){return
}if(this.store.getCount()>0){this.expand();
this.restrictHeight();
if(this.lastQuery==this.allQuery){if(this.editable){this.el.dom.select()
}if(!this.selectByValue(this.value,true)){this.select(0,true)
}}else{this.selectNext();
if(this.typeAhead&&this.lastKey!=Ext.EventObject.BACKSPACE&&this.lastKey!=Ext.EventObject.DELETE){this.taTask.delay(this.typeAheadDelay)
}}}else{this.onEmptyResults()
}},onTypeAhead:function(){if(this.store.getCount()>0){var d=this.store.getAt(0);
var c=d.data[this.displayField];
var a=c.length;
var b=this.getRawValue().length;
if(b!=a){this.setRawValue(c);
this.selectText(b,c.length)
}}},onSelect:function(a,b){if(this.fireEvent("beforeselect",this,a,b)!==false){this.setValue(a.data[this.valueField||this.displayField]);
this.collapse();
this.fireEvent("select",this,a,b)
}},getValue:function(){if(this.valueField){return typeof this.value!="undefined"?this.value:""
}else{return Ext.form.ComboBox.superclass.getValue.call(this)
}},clearValue:function(){if(this.hiddenField){this.hiddenField.value=""
}this.setRawValue("");
this.lastSelectionText="";
this.applyEmptyText();
this.value=""
},setValue:function(a){var b=a;
if(this.valueField){var c=this.findRecord(this.valueField,a);
if(c){b=c.data[this.displayField]
}else{if(this.valueNotFoundText!==undefined){b=this.valueNotFoundText
}}}this.lastSelectionText=b;
if(this.hiddenField){this.hiddenField.value=a
}Ext.form.ComboBox.superclass.setValue.call(this,b);
this.value=a
},findRecord:function(b,c){var a;
if(this.store.getCount()>0){this.store.each(function(d){if(d.data[b]==c){a=d;
return false
}})
}return a
},onViewMove:function(b,a){this.inKeyMode=false
},onViewOver:function(b,d){if(this.inKeyMode){return
}var c=this.view.findItemFromChild(d);
if(c){var a=this.view.indexOf(c);
this.select(a,false)
}},onViewClick:function(c){var a=this.view.getSelectedIndexes()[0];
var b=this.store.getAt(a);
if(b){this.onSelect(b,a)
}if(c!==false){this.el.focus()
}},restrictHeight:function(){this.innerList.dom.style.height="";
var g=this.innerList.dom;
var c=this.list.getFrameWidth("tb")+(this.resizable?this.handleHeight:0)+this.assetHeight;
var e=Math.max(g.clientHeight,g.offsetHeight,g.scrollHeight);
var a=this.getPosition()[1]-Ext.getBody().getScroll().top;
var b=Ext.lib.Dom.getViewHeight()-a-this.getSize().height;
var d=Math.max(a,b,this.minHeight||0)-this.list.shadow.offset-c-2;
e=Math.min(e,d,this.maxHeight);
this.innerList.setHeight(e);
this.list.beginUpdate();
this.list.setHeight(e+c);
this.list.alignTo(this.el,this.listAlign);
this.list.endUpdate()
},onEmptyResults:function(){this.collapse()
},isExpanded:function(){return this.list&&this.list.isVisible()
},selectByValue:function(a,b){if(a!==undefined&&a!==null){var c=this.findRecord(this.valueField||this.displayField,a);
if(c){this.select(this.store.indexOf(c),b);
return true
}}return false
},select:function(a,b){this.selectedIndex=a;
this.view.select(a);
if(b!==false){var c=this.view.getNode(a);
if(c){this.innerList.scrollChildIntoView(c,false)
}}},selectNext:function(){var a=this.store.getCount();
if(a>0){if(this.selectedIndex==-1){this.select(0)
}else{if(this.selectedIndex<a-1){this.select(this.selectedIndex+1)
}}}},selectPrev:function(){var a=this.store.getCount();
if(a>0){if(this.selectedIndex==-1){this.select(0)
}else{if(this.selectedIndex!=0){this.select(this.selectedIndex-1)
}}}},onKeyUp:function(a){if(this.editable!==false&&!a.isSpecialKey()){this.lastKey=a.getKey();
this.dqTask.delay(this.queryDelay)
}},validateBlur:function(){return !this.list||!this.list.isVisible()
},initQuery:function(){this.doQuery(this.getRawValue())
},doForce:function(){if(this.el.dom.value.length>0){this.el.dom.value=this.lastSelectionText===undefined?"":this.lastSelectionText;
this.applyEmptyText()
}},doQuery:function(b,c){if(b===undefined||b===null){b=""
}var a={query:b,forceAll:c,combo:this,cancel:false};
if(this.fireEvent("beforequery",a)===false||a.cancel){return false
}b=a.query;
c=a.forceAll;
if(c===true||(b.length>=this.minChars)){if(this.lastQuery!==b){this.lastQuery=b;
if(this.mode=="local"){this.selectedIndex=-1;
if(c){this.store.clearFilter()
}else{this.store.filter(this.displayField,b)
}this.onLoad()
}else{this.store.baseParams[this.queryParam]=b;
this.store.load({params:this.getParams(b)});
this.expand()
}}else{this.selectedIndex=-1;
this.onLoad()
}}},getParams:function(a){var b={};
if(this.pageSize){b.start=0;
b.limit=this.pageSize
}return b
},collapse:function(){if(!this.isExpanded()){return
}this.list.hide();
Ext.getDoc().un("mousewheel",this.collapseIf,this);
Ext.getDoc().un("mousedown",this.collapseIf,this);
this.fireEvent("collapse",this)
},collapseIf:function(a){if(!a.within(this.wrap)&&!a.within(this.list)){this.collapse()
}},expand:function(){if(this.isExpanded()||!this.hasFocus){return
}this.list.alignTo(this.wrap,this.listAlign);
this.list.show();
this.innerList.setOverflow("auto");
Ext.getDoc().on("mousewheel",this.collapseIf,this);
Ext.getDoc().on("mousedown",this.collapseIf,this);
this.fireEvent("expand",this)
},onTriggerClick:function(){if(this.disabled){return
}if(this.isExpanded()){this.collapse();
this.el.focus()
}else{this.onFocus({});
if(this.triggerAction=="all"){this.doQuery(this.allQuery,true)
}else{this.doQuery(this.getRawValue())
}this.el.focus()
}}});
Ext.reg("combo",Ext.form.ComboBox);
Ext.form.Checkbox=Ext.extend(Ext.form.Field,{focusClass:undefined,fieldClass:"x-form-field",checked:false,defaultAutoCreate:{tag:"input",type:"checkbox",autocomplete:"off"},initComponent:function(){Ext.form.Checkbox.superclass.initComponent.call(this);
this.addEvents("check")
},onResize:function(){Ext.form.Checkbox.superclass.onResize.apply(this,arguments);
if(!this.boxLabel){this.el.alignTo(this.wrap,"c-c")
}},initEvents:function(){Ext.form.Checkbox.superclass.initEvents.call(this);
this.el.on("click",this.onClick,this);
this.el.on("change",this.onClick,this)
},getResizeEl:function(){return this.wrap
},getPositionEl:function(){return this.wrap
},markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,onRender:function(b,a){Ext.form.Checkbox.superclass.onRender.call(this,b,a);
if(this.inputValue!==undefined){this.el.dom.value=this.inputValue
}this.wrap=this.el.wrap({cls:"x-form-check-wrap"});
if(this.boxLabel){this.wrap.createChild({tag:"label",htmlFor:this.el.id,cls:"x-form-cb-label",html:this.boxLabel})
}if(this.checked){this.setValue(true)
}else{this.checked=this.el.dom.checked
}},onDestroy:function(){if(this.wrap){this.wrap.remove()
}Ext.form.Checkbox.superclass.onDestroy.call(this)
},initValue:Ext.emptyFn,getValue:function(){if(this.rendered){return this.el.dom.checked
}return false
},onClick:function(){if(this.el.dom.checked!=this.checked){this.setValue(this.el.dom.checked)
}},setValue:function(a){this.checked=(a===true||a==="true"||a=="1"||String(a).toLowerCase()=="on");
if(this.el&&this.el.dom){this.el.dom.checked=this.checked;
this.el.dom.defaultChecked=this.checked
}this.fireEvent("check",this,this.checked)
}});
Ext.reg("checkbox",Ext.form.Checkbox);
Ext.form.Radio=Ext.extend(Ext.form.Checkbox,{inputType:"radio",markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,getGroupValue:function(){var a=this.el.up("form")||Ext.getBody();
var b=a.child("input[name="+this.el.dom.name+"]:checked",true);
return b?b.value:null
},onClick:function(){if(this.el.dom.checked!=this.checked){var b=this.el.up("form")||Ext.getBody();
var a=b.select("input[name="+this.el.dom.name+"]");
a.each(function(c){if(c.dom.id==this.id){this.setValue(true)
}else{Ext.getCmp(c.dom.id).setValue(false)
}},this)
}},setValue:function(a){if(typeof a=="boolean"){Ext.form.Radio.superclass.setValue.call(this,a)
}else{var b=this.el.up("form").child("input[name="+this.el.dom.name+"][value="+a+"]",true);
if(b){b.checked=true
}}}});
Ext.reg("radio",Ext.form.Radio);
Ext.form.Hidden=Ext.extend(Ext.form.Field,{inputType:"hidden",onRender:function(){Ext.form.Hidden.superclass.onRender.apply(this,arguments)
},initEvents:function(){this.originalValue=this.getValue()
},setSize:Ext.emptyFn,setWidth:Ext.emptyFn,setHeight:Ext.emptyFn,setPosition:Ext.emptyFn,setPagePosition:Ext.emptyFn,markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn});
Ext.reg("hidden",Ext.form.Hidden);
Ext.form.BasicForm=function(b,a){Ext.apply(this,a);
this.items=new Ext.util.MixedCollection(false,function(c){return c.id||(c.id=Ext.id())
});
this.addEvents("beforeaction","actionfailed","actioncomplete");
if(b){this.initEl(b)
}Ext.form.BasicForm.superclass.constructor.call(this)
};
Ext.extend(Ext.form.BasicForm,Ext.util.Observable,{timeout:30,activeAction:null,trackResetOnLoad:false,initEl:function(a){this.el=Ext.get(a);
this.id=this.el.id||Ext.id();
if(!this.standardSubmit){this.el.on("submit",this.onSubmit,this)
}this.el.addClass("x-form")
},getEl:function(){return this.el
},onSubmit:function(a){a.stopEvent()
},destroy:function(){this.items.each(function(a){Ext.destroy(a)
});
if(this.el){this.el.removeAllListeners();
this.el.remove()
}this.purgeListeners()
},isValid:function(){var a=true;
this.items.each(function(b){if(!b.validate()){a=false
}});
return a
},isDirty:function(){var a=false;
this.items.each(function(b){if(b.isDirty()){a=true;
return false
}});
return a
},doAction:function(b,a){if(typeof b=="string"){b=new Ext.form.Action.ACTION_TYPES[b](this,a)
}if(this.fireEvent("beforeaction",this,b)!==false){this.beforeAction(b);
b.run.defer(100,b)
}return this
},submit:function(b){if(this.standardSubmit){var a=this.isValid();
if(a){this.el.dom.submit()
}return a
}this.doAction("submit",b);
return this
},load:function(a){this.doAction("load",a);
return this
},updateRecord:function(b){b.beginEdit();
var a=b.fields;
a.each(function(d){var c=this.findField(d.name);
if(c){b.set(d.name,c.getValue())
}},this);
b.endEdit();
return this
},loadRecord:function(a){this.setValues(a.data);
return this
},beforeAction:function(a){var b=a.options;
if(b.waitMsg){if(this.waitMsgTarget===true){this.el.mask(b.waitMsg,"x-mask-loading")
}else{if(this.waitMsgTarget){this.waitMsgTarget=Ext.get(this.waitMsgTarget);
this.waitMsgTarget.mask(b.waitMsg,"x-mask-loading")
}else{Ext.MessageBox.wait(b.waitMsg,b.waitTitle||this.waitTitle||"Please Wait...")
}}}},afterAction:function(a,b){this.activeAction=null;
var c=a.options;
if(c.waitMsg){if(this.waitMsgTarget===true){this.el.unmask()
}else{if(this.waitMsgTarget){this.waitMsgTarget.unmask()
}else{Ext.MessageBox.updateProgress(1);
Ext.MessageBox.hide()
}}}if(b){if(c.reset){this.reset()
}Ext.callback(c.success,c.scope,[this,a]);
this.fireEvent("actioncomplete",this,a)
}else{Ext.callback(c.failure,c.scope,[this,a]);
this.fireEvent("actionfailed",this,a)
}},findField:function(b){var a=this.items.get(b);
if(!a){this.items.each(function(c){if(c.isFormField&&(c.dataIndex==b||c.id==b||c.getName()==b)){a=c;
return false
}})
}return a||null
},markInvalid:function(b){if(Ext.isArray(b)){for(var g=0,a=b.length;
g<a;
g++){var h=b[g];
var e=this.findField(h.id);
if(e){e.markInvalid(h.msg)
}}}else{var d,c;
for(c in b){if(typeof b[c]!="function"&&(d=this.findField(c))){d.markInvalid(b[c])
}}}return this
},setValues:function(g){if(Ext.isArray(g)){for(var e=0,a=g.length;
e<a;
e++){var h=g[e];
var d=this.findField(h.id);
if(d){d.setValue(h.value);
if(this.trackResetOnLoad){d.originalValue=d.getValue()
}}}}else{var c,b;
for(b in g){if(typeof g[b]!="function"&&(c=this.findField(b))){c.setValue(g[b]);
if(this.trackResetOnLoad){c.originalValue=c.getValue()
}}}}return this
},getValues:function(b){var a=Ext.lib.Ajax.serializeForm(this.el.dom);
if(b===true){return a
}return Ext.urlDecode(a)
},clearInvalid:function(){this.items.each(function(a){a.clearInvalid()
});
return this
},reset:function(){this.items.each(function(a){a.reset()
});
return this
},add:function(){this.items.addAll(Array.prototype.slice.call(arguments,0));
return this
},remove:function(a){this.items.remove(a);
return this
},render:function(){this.items.each(function(a){if(a.isFormField&&!a.rendered&&document.getElementById(a.id)){a.applyToMarkup(a.id)
}});
return this
},applyToFields:function(a){this.items.each(function(b){Ext.apply(b,a)
});
return this
},applyIfToFields:function(a){this.items.each(function(b){Ext.applyIf(b,a)
});
return this
}});
Ext.BasicForm=Ext.form.BasicForm;
Ext.FormPanel=Ext.extend(Ext.Panel,{buttonAlign:"center",minButtonWidth:75,labelAlign:"left",monitorValid:false,monitorPoll:200,layout:"form",initComponent:function(){this.form=this.createForm();
Ext.FormPanel.superclass.initComponent.call(this);
this.addEvents("clientvalidation");
this.relayEvents(this.form,["beforeaction","actionfailed","actioncomplete"])
},createForm:function(){delete this.initialConfig.listeners;
return new Ext.form.BasicForm(null,this.initialConfig)
},initFields:function(){var b=this.form;
var a=this;
var c=function(d){if(d.doLayout&&d!=a){Ext.applyIf(d,{labelAlign:d.ownerCt.labelAlign,labelWidth:d.ownerCt.labelWidth,itemCls:d.ownerCt.itemCls});
if(d.items){d.items.each(c)
}}else{if(d.isFormField){b.add(d)
}}};
this.items.each(c)
},getLayoutTarget:function(){return this.form.el
},getForm:function(){return this.form
},onRender:function(c,a){this.initFields();
Ext.FormPanel.superclass.onRender.call(this,c,a);
var b={tag:"form",method:this.method||"POST",id:this.formId||Ext.id()};
if(this.fileUpload){b.enctype="multipart/form-data"
}this.form.initEl(this.body.createChild(b))
},beforeDestroy:function(){Ext.FormPanel.superclass.beforeDestroy.call(this);
Ext.destroy(this.form)
},initEvents:function(){Ext.FormPanel.superclass.initEvents.call(this);
this.items.on("remove",this.onRemove,this);
this.items.on("add",this.onAdd,this);
if(this.monitorValid){this.startMonitoring()
}},onAdd:function(a,b){if(b.isFormField){this.form.add(b)
}},onRemove:function(a){if(a.isFormField){Ext.destroy(a.container.up(".x-form-item"));
this.form.remove(a)
}},startMonitoring:function(){if(!this.bound){this.bound=true;
Ext.TaskMgr.start({run:this.bindHandler,interval:this.monitorPoll||200,scope:this})
}},stopMonitoring:function(){this.bound=false
},load:function(){this.form.load.apply(this.form,arguments)
},onDisable:function(){Ext.FormPanel.superclass.onDisable.call(this);
if(this.form){this.form.items.each(function(){this.disable()
})
}},onEnable:function(){Ext.FormPanel.superclass.onEnable.call(this);
if(this.form){this.form.items.each(function(){this.enable()
})
}},bindHandler:function(){if(!this.bound){return false
}var b=true;
this.form.items.each(function(e){if(!e.isValid(true)){b=false;
return false
}});
if(this.buttons){for(var c=0,a=this.buttons.length;
c<a;
c++){var d=this.buttons[c];
if(d.formBind===true&&d.disabled===b){d.setDisabled(!b)
}}}this.fireEvent("clientvalidation",this,b)
}});
Ext.reg("form",Ext.FormPanel);
Ext.form.FormPanel=Ext.FormPanel;
Ext.form.FieldSet=Ext.extend(Ext.Panel,{baseCls:"x-fieldset",layout:"form",onRender:function(c,a){if(!this.el){this.el=document.createElement("fieldset");
this.el.id=this.id;
if(this.title||this.header||this.checkboxToggle){this.el.appendChild(document.createElement("legend")).className="x-fieldset-header"
}}Ext.form.FieldSet.superclass.onRender.call(this,c,a);
if(this.checkboxToggle){var b=typeof this.checkboxToggle=="object"?this.checkboxToggle:{tag:"input",type:"checkbox",name:this.checkboxName||this.id+"-checkbox"};
this.checkbox=this.header.insertFirst(b);
this.checkbox.dom.checked=!this.collapsed;
this.checkbox.on("click",this.onCheckClick,this)
}},onCollapse:function(a,b){if(this.checkbox){this.checkbox.dom.checked=false
}this.afterCollapse()
},onExpand:function(a,b){if(this.checkbox){this.checkbox.dom.checked=true
}this.afterExpand()
},onCheckClick:function(){this[this.checkbox.dom.checked?"expand":"collapse"]()
}});
Ext.reg("fieldset",Ext.form.FieldSet);
Ext.form.HtmlEditor=Ext.extend(Ext.form.Field,{enableFormat:true,enableFontSize:true,enableColors:true,enableAlignments:true,enableLists:true,enableSourceEdit:true,enableLinks:true,enableFont:true,createLinkText:"Please enter the URL for the link:",defaultLinkValue:"http://",fontFamilies:["Arial","Courier New","Tahoma","Times New Roman","Verdana"],defaultFont:"tahoma",validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Ext.emptyFn,iframePad:3,hideMode:"offsets",defaultAutoCreate:{tag:"textarea",style:"width:500px;height:300px;",autocomplete:"off"},initComponent:function(){this.addEvents("initialize","activate","beforesync","beforepush","sync","push","editmodechange")
},createFontOptions:function(){var d=[],g=this.fontFamilies,e,b;
for(var c=0,a=g.length;
c<a;
c++){e=g[c];
b=e.toLowerCase();
d.push('<option value="',b,'" style="font-family:',e,';"',(this.defaultFont==b?' selected="true">':">"),e,"</option>")
}return d.join("")
},createToolbar:function(b){function c(d,g,e){return{itemId:d,cls:"x-btn-icon x-edit-"+d,enableToggle:g!==false,scope:b,handler:e||b.relayBtnCmd,clickEvent:"mousedown",tooltip:b.buttonTips[d]||undefined,tabIndex:-1}
}var a=new Ext.Toolbar({renderTo:this.wrap.dom.firstChild});
a.el.on("click",function(d){d.preventDefault()
});
if(this.enableFont&&!Ext.isSafari){this.fontSelect=a.el.createChild({tag:"select",cls:"x-font-select",html:this.createFontOptions()});
this.fontSelect.on("change",function(){var d=this.fontSelect.dom.value;
this.relayCmd("fontname",d);
this.deferFocus()
},this);
a.add(this.fontSelect.dom,"-")
}if(this.enableFormat){a.add(c("bold"),c("italic"),c("underline"))
}if(this.enableFontSize){a.add("-",c("increasefontsize",false,this.adjustFont),c("decreasefontsize",false,this.adjustFont))
}if(this.enableColors){a.add("-",{itemId:"forecolor",cls:"x-btn-icon x-edit-forecolor",clickEvent:"mousedown",tooltip:b.buttonTips.forecolor||undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({allowReselect:true,focus:Ext.emptyFn,value:"000000",plain:true,selectHandler:function(d,e){this.execCmd("forecolor",Ext.isSafari||Ext.isIE?"#"+e:e);
this.deferFocus()
},scope:this,clickEvent:"mousedown"})},{itemId:"backcolor",cls:"x-btn-icon x-edit-backcolor",clickEvent:"mousedown",tooltip:b.buttonTips.backcolor||undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({focus:Ext.emptyFn,value:"FFFFFF",plain:true,allowReselect:true,selectHandler:function(d,e){if(Ext.isGecko){this.execCmd("useCSS",false);
this.execCmd("hilitecolor",e);
this.execCmd("useCSS",true);
this.deferFocus()
}else{this.execCmd(Ext.isOpera?"hilitecolor":"backcolor",Ext.isSafari||Ext.isIE?"#"+e:e);
this.deferFocus()
}},scope:this,clickEvent:"mousedown"})})
}if(this.enableAlignments){a.add("-",c("justifyleft"),c("justifycenter"),c("justifyright"))
}if(!Ext.isSafari){if(this.enableLinks){a.add("-",c("createlink",false,this.createLink))
}if(this.enableLists){a.add("-",c("insertorderedlist"),c("insertunorderedlist"))
}if(this.enableSourceEdit){a.add("-",c("sourceedit",true,function(d){this.toggleSourceEdit(d.pressed)
}))
}}this.tb=a
},getDocMarkup:function(){return'<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;}</style></head><body></body></html>'
},getEditorBody:function(){return this.doc.body||this.doc.documentElement
},onRender:function(c,a){Ext.form.HtmlEditor.superclass.onRender.call(this,c,a);
this.el.dom.style.border="0 none";
this.el.dom.setAttribute("tabIndex",-1);
this.el.addClass("x-hidden");
if(Ext.isIE){this.el.applyStyles("margin-top:-1px;margin-bottom:-1px;")
}this.wrap=this.el.wrap({cls:"x-html-editor-wrap",cn:{cls:"x-html-editor-tb"}});
this.createToolbar(this);
this.tb.items.each(function(e){if(e.itemId!="sourceedit"){e.disable()
}});
var b=document.createElement("iframe");
b.name=Ext.id();
b.frameBorder="no";
b.src=(Ext.SSL_SECURE_URL||"javascript:false");
this.wrap.dom.appendChild(b);
this.iframe=b;
if(Ext.isIE){b.contentWindow.document.designMode="on";
this.doc=b.contentWindow.document;
this.win=b.contentWindow
}else{this.doc=(b.contentDocument||window.frames[b.name].document);
this.win=window.frames[b.name];
this.doc.designMode="on"
}this.doc.open();
this.doc.write(this.getDocMarkup());
this.doc.close();
var d={run:function(){if(this.doc.body||this.doc.readyState=="complete"){Ext.TaskMgr.stop(d);
this.doc.designMode="on";
this.initEditor.defer(10,this)
}},interval:10,duration:10000,scope:this};
Ext.TaskMgr.start(d);
if(!this.width){this.setSize(this.el.getSize())
}},onResize:function(d,c){Ext.form.HtmlEditor.superclass.onResize.apply(this,arguments);
if(this.el&&this.iframe){if(typeof d=="number"){var b=d-this.wrap.getFrameWidth("lr");
this.el.setWidth(this.adjustWidth("textarea",b));
this.iframe.style.width=b+"px"
}if(typeof c=="number"){var a=c-this.wrap.getFrameWidth("tb")-this.tb.el.getHeight();
this.el.setHeight(this.adjustWidth("textarea",a));
this.iframe.style.height=a+"px";
if(this.doc){this.getEditorBody().style.height=(a-(this.iframePad*2))+"px"
}}}},toggleSourceEdit:function(a){if(a===undefined){a=!this.sourceEditMode
}this.sourceEditMode=a===true;
var b=this.tb.items.get("sourceedit");
if(b.pressed!==this.sourceEditMode){b.toggle(this.sourceEditMode);
return
}if(this.sourceEditMode){this.tb.items.each(function(d){if(d.itemId!="sourceedit"){d.disable()
}});
this.syncValue();
this.iframe.className="x-hidden";
this.el.removeClass("x-hidden");
this.el.dom.removeAttribute("tabIndex");
this.el.focus()
}else{if(this.initialized){this.tb.items.each(function(d){d.enable()
})
}this.pushValue();
this.iframe.className="";
this.el.addClass("x-hidden");
this.el.dom.setAttribute("tabIndex",-1);
this.deferFocus()
}var c=this.lastSize;
if(c){delete this.lastSize;
this.setSize(c)
}this.fireEvent("editmodechange",this,this.sourceEditMode)
},createLink:function(){var a=prompt(this.createLinkText,this.defaultLinkValue);
if(a&&a!="http://"){this.relayCmd("createlink",a)
}},adjustSize:Ext.BoxComponent.prototype.adjustSize,getResizeEl:function(){return this.wrap
},getPositionEl:function(){return this.wrap
},initEvents:function(){this.originalValue=this.getValue()
},markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,setValue:function(a){Ext.form.HtmlEditor.superclass.setValue.call(this,a);
this.pushValue()
},cleanHtml:function(a){a=String(a);
if(a.length>5){if(Ext.isSafari){a=a.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi,"")
}}if(a=="&nbsp;"){a=""
}return a
},syncValue:function(){if(this.initialized){var b=this.getEditorBody();
var c=b.innerHTML;
if(Ext.isSafari){var d=b.getAttribute("style");
var a=d.match(/text-align:(.*?);/i);
if(a&&a[1]){c='<div style="'+a[0]+'">'+c+"</div>"
}}c=this.cleanHtml(c);
if(this.fireEvent("beforesync",this,c)!==false){this.el.dom.value=c;
this.fireEvent("sync",this,c)
}}},pushValue:function(){if(this.initialized){var a=this.el.dom.value;
if(!this.activated&&a.length<1){a="&nbsp;"
}if(this.fireEvent("beforepush",this,a)!==false){this.getEditorBody().innerHTML=a;
this.fireEvent("push",this,a)
}}},deferFocus:function(){this.focus.defer(10,this)
},focus:function(){if(this.win&&!this.sourceEditMode){this.win.focus()
}else{this.el.focus()
}},initEditor:function(){var b=this.getEditorBody();
var a=this.el.getStyles("font-size","font-family","background-image","background-repeat");
a["background-attachment"]="fixed";
b.bgProperties="fixed";
Ext.DomHelper.applyStyles(b,a);
Ext.EventManager.on(this.doc,{mousedown:this.onEditorEvent,dblclick:this.onEditorEvent,click:this.onEditorEvent,keyup:this.onEditorEvent,buffer:100,scope:this});
if(Ext.isGecko){Ext.EventManager.on(this.doc,"keypress",this.applyCommand,this)
}if(Ext.isIE||Ext.isSafari||Ext.isOpera){Ext.EventManager.on(this.doc,"keydown",this.fixKeys,this)
}this.initialized=true;
this.fireEvent("initialize",this);
this.pushValue()
},onDestroy:function(){if(this.rendered){this.tb.items.each(function(a){if(a.menu){a.menu.removeAll();
if(a.menu.el){a.menu.el.destroy()
}}a.destroy()
});
this.wrap.dom.innerHTML="";
this.wrap.remove()
}},onFirstFocus:function(){this.activated=true;
this.tb.items.each(function(d){d.enable()
});
if(Ext.isGecko){this.win.focus();
var a=this.win.getSelection();
if(!a.focusNode||a.focusNode.nodeType!=3){var c=a.getRangeAt(0);
c.selectNodeContents(this.getEditorBody());
c.collapse(true);
this.deferFocus()
}try{this.execCmd("useCSS",true);
this.execCmd("styleWithCSS",false)
}catch(b){}}this.fireEvent("activate",this)
},adjustFont:function(c){var b=c.itemId=="increasefontsize"?1:-1;
var a=parseInt(this.doc.queryCommandValue("FontSize")||2,10);
if(Ext.isSafari3||Ext.isAir){if(a<=10){a=1+b
}else{if(a<=13){a=2+b
}else{if(a<=16){a=3+b
}else{if(a<=18){a=4+b
}else{if(a<=24){a=5+b
}else{a=6+b
}}}}}a=a.constrain(1,6)
}else{if(Ext.isSafari){b*=2
}a=Math.max(1,a+b)+(Ext.isSafari?"px":0)
}this.execCmd("FontSize",a)
},onEditorEvent:function(a){this.updateToolbar()
},updateToolbar:function(){if(!this.activated){this.onFirstFocus();
return
}var c=this.tb.items.map,b=this.doc;
if(this.enableFont&&!Ext.isSafari){var a=(this.doc.queryCommandValue("FontName")||this.defaultFont).toLowerCase();
if(a!=this.fontSelect.dom.value){this.fontSelect.dom.value=a
}}if(this.enableFormat){c.bold.toggle(b.queryCommandState("bold"));
c.italic.toggle(b.queryCommandState("italic"));
c.underline.toggle(b.queryCommandState("underline"))
}if(this.enableAlignments){c.justifyleft.toggle(b.queryCommandState("justifyleft"));
c.justifycenter.toggle(b.queryCommandState("justifycenter"));
c.justifyright.toggle(b.queryCommandState("justifyright"))
}if(!Ext.isSafari&&this.enableLists){c.insertorderedlist.toggle(b.queryCommandState("insertorderedlist"));
c.insertunorderedlist.toggle(b.queryCommandState("insertunorderedlist"))
}Ext.menu.MenuMgr.hideAll();
this.syncValue()
},relayBtnCmd:function(a){this.relayCmd(a.itemId)
},relayCmd:function(b,a){this.win.focus();
this.execCmd(b,a);
this.updateToolbar();
this.deferFocus()
},execCmd:function(b,a){this.doc.execCommand(b,false,a===undefined?null:a);
this.syncValue()
},applyCommand:function(c){if(c.ctrlKey){var b=c.getCharCode(),a;
if(b>0){b=String.fromCharCode(b);
switch(b){case"b":a="bold";
break;
case"i":a="italic";
break;
case"u":a="underline";
break
}if(a){this.win.focus();
this.execCmd(a);
this.deferFocus();
c.preventDefault()
}}}},insertAtCursor:function(b){if(!this.activated){return
}if(Ext.isIE){this.win.focus();
var a=this.doc.selection.createRange();
if(a){a.collapse(true);
a.pasteHTML(b);
this.syncValue();
this.deferFocus()
}}else{if(Ext.isGecko||Ext.isOpera){this.win.focus();
this.execCmd("InsertHTML",b);
this.deferFocus()
}else{if(Ext.isSafari){this.execCmd("InsertText",b);
this.deferFocus()
}}}},fixKeys:function(){if(Ext.isIE){return function(b){var a=b.getKey(),d;
if(a==b.TAB){b.stopEvent();
d=this.doc.selection.createRange();
if(d){d.collapse(true);
d.pasteHTML("&nbsp;&nbsp;&nbsp;&nbsp;");
this.deferFocus()
}}else{if(a==b.ENTER){d=this.doc.selection.createRange();
if(d){var c=d.parentElement();
if(!c||c.tagName.toLowerCase()!="li"){b.stopEvent();
d.pasteHTML("<br />");
d.collapse(false);
d.select()
}}}}}
}else{if(Ext.isOpera){return function(b){var a=b.getKey();
if(a==b.TAB){b.stopEvent();
this.win.focus();
this.execCmd("InsertHTML","&nbsp;&nbsp;&nbsp;&nbsp;");
this.deferFocus()
}}
}else{if(Ext.isSafari){return function(b){var a=b.getKey();
if(a==b.TAB){b.stopEvent();
this.execCmd("InsertText","\t");
this.deferFocus()
}}
}}}}(),getToolbar:function(){return this.tb
},buttonTips:{bold:{title:"Bold (Ctrl+B)",text:"Make the selected text bold.",cls:"x-html-editor-tip"},italic:{title:"Italic (Ctrl+I)",text:"Make the selected text italic.",cls:"x-html-editor-tip"},underline:{title:"Underline (Ctrl+U)",text:"Underline the selected text.",cls:"x-html-editor-tip"},increasefontsize:{title:"Grow Text",text:"Increase the font size.",cls:"x-html-editor-tip"},decreasefontsize:{title:"Shrink Text",text:"Decrease the font size.",cls:"x-html-editor-tip"},backcolor:{title:"Text Highlight Color",text:"Change the background color of the selected text.",cls:"x-html-editor-tip"},forecolor:{title:"Font Color",text:"Change the color of the selected text.",cls:"x-html-editor-tip"},justifyleft:{title:"Align Text Left",text:"Align text to the left.",cls:"x-html-editor-tip"},justifycenter:{title:"Center Text",text:"Center text in the editor.",cls:"x-html-editor-tip"},justifyright:{title:"Align Text Right",text:"Align text to the right.",cls:"x-html-editor-tip"},insertunorderedlist:{title:"Bullet List",text:"Start a bulleted list.",cls:"x-html-editor-tip"},insertorderedlist:{title:"Numbered List",text:"Start a numbered list.",cls:"x-html-editor-tip"},createlink:{title:"Hyperlink",text:"Make the selected text a hyperlink.",cls:"x-html-editor-tip"},sourceedit:{title:"Source Edit",text:"Switch to source editing mode.",cls:"x-html-editor-tip"}}});
Ext.reg("htmleditor",Ext.form.HtmlEditor);
Ext.form.TimeField=Ext.extend(Ext.form.ComboBox,{minValue:null,maxValue:null,minText:"The time in this field must be equal to or after {0}",maxText:"The time in this field must be equal to or before {0}",invalidText:"{0} is not a valid time",format:"g:i A",altFormats:"g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H",increment:15,mode:"local",triggerAction:"all",typeAhead:false,initComponent:function(){Ext.form.TimeField.superclass.initComponent.call(this);
if(typeof this.minValue=="string"){this.minValue=this.parseDate(this.minValue)
}if(typeof this.maxValue=="string"){this.maxValue=this.parseDate(this.maxValue)
}if(!this.store){var c=this.parseDate(this.minValue);
if(!c){c=new Date().clearTime()
}var a=this.parseDate(this.maxValue);
if(!a){a=new Date().clearTime().add("mi",(24*60)-1)
}var b=[];
while(c<=a){b.push([c.dateFormat(this.format)]);
c=c.add("mi",this.increment)
}this.store=new Ext.data.SimpleStore({fields:["text"],data:b});
this.displayField="text"
}},getValue:function(){var a=Ext.form.TimeField.superclass.getValue.call(this);
return this.formatDate(this.parseDate(a))||""
},setValue:function(a){Ext.form.TimeField.superclass.setValue.call(this,this.formatDate(this.parseDate(a)))
},validateValue:Ext.form.DateField.prototype.validateValue,parseDate:Ext.form.DateField.prototype.parseDate,formatDate:Ext.form.DateField.prototype.formatDate,beforeBlur:function(){var a=this.parseDate(this.getRawValue());
if(a){this.setValue(a.dateFormat(this.format))
}}});
Ext.reg("timefield",Ext.form.TimeField);
Ext.form.Label=Ext.extend(Ext.BoxComponent,{onRender:function(b,a){if(!this.el){this.el=document.createElement("label");
this.el.innerHTML=this.text?Ext.util.Format.htmlEncode(this.text):(this.html||"");
if(this.forId){this.el.setAttribute("htmlFor",this.forId)
}}Ext.form.Label.superclass.onRender.call(this,b,a)
}});
Ext.reg("label",Ext.form.Label);
Ext.form.Action=function(b,a){this.form=b;
this.options=a||{}
};
Ext.form.Action.CLIENT_INVALID="client";
Ext.form.Action.SERVER_INVALID="server";
Ext.form.Action.CONNECT_FAILURE="connect";
Ext.form.Action.LOAD_FAILURE="load";
Ext.form.Action.prototype={type:"default",run:function(a){},success:function(a){},handleResponse:function(a){},failure:function(a){this.response=a;
this.failureType=Ext.form.Action.CONNECT_FAILURE;
this.form.afterAction(this,false)
},processResponse:function(a){this.response=a;
if(!a.responseText){return true
}this.result=this.handleResponse(a);
return this.result
},getUrl:function(b){var a=this.options.url||this.form.url||this.form.el.dom.action;
if(b){var c=this.getParams();
if(c){a+=(a.indexOf("?")!=-1?"&":"?")+c
}}return a
},getMethod:function(){return(this.options.method||this.form.method||this.form.el.dom.method||"POST").toUpperCase()
},getParams:function(){var a=this.form.baseParams;
var b=this.options.params;
if(b){if(typeof b=="object"){b=Ext.urlEncode(Ext.applyIf(b,a))
}else{if(typeof b=="string"&&a){b+="&"+Ext.urlEncode(a)
}}}else{if(a){b=Ext.urlEncode(a)
}}return b
},createCallback:function(a){var a=a||{};
return{success:this.success,failure:this.failure,scope:this,timeout:(a.timeout*1000)||(this.form.timeout*1000),upload:this.form.fileUpload?this.success:undefined}
}};
Ext.form.Action.Submit=function(b,a){Ext.form.Action.Submit.superclass.constructor.call(this,b,a)
};
Ext.extend(Ext.form.Action.Submit,Ext.form.Action,{type:"submit",run:function(){var c=this.options;
var b=this.getMethod();
var a=b=="POST";
if(c.clientValidation===false||this.form.isValid()){Ext.Ajax.request(Ext.apply(this.createCallback(c),{form:this.form.el.dom,url:this.getUrl(!a),method:b,params:a?this.getParams():null,isUpload:this.form.fileUpload}))
}else{if(c.clientValidation!==false){this.failureType=Ext.form.Action.CLIENT_INVALID;
this.form.afterAction(this,false)
}}},success:function(b){var a=this.processResponse(b);
if(a===true||a.success){this.form.afterAction(this,true);
return
}if(a.errors){this.form.markInvalid(a.errors);
this.failureType=Ext.form.Action.SERVER_INVALID
}this.form.afterAction(this,false)
},handleResponse:function(e){if(this.form.errorReader){var g=this.form.errorReader.read(e);
var b=[];
if(g.records){for(var d=0,a=g.records.length;
d<a;
d++){var c=g.records[d];
b[d]=c.data
}}if(b.length<1){b=null
}return{success:g.success,errors:b}
}return Ext.decode(e.responseText)
}});
Ext.form.Action.Load=function(b,a){Ext.form.Action.Load.superclass.constructor.call(this,b,a);
this.reader=this.form.reader
};
Ext.extend(Ext.form.Action.Load,Ext.form.Action,{type:"load",run:function(){Ext.Ajax.request(Ext.apply(this.createCallback(this.options),{method:this.getMethod(),url:this.getUrl(false),params:this.getParams()}))
},success:function(b){var a=this.processResponse(b);
if(a===true||!a.success||!a.data){this.failureType=Ext.form.Action.LOAD_FAILURE;
this.form.afterAction(this,false);
return
}this.form.clearInvalid();
this.form.setValues(a.data);
this.form.afterAction(this,true)
},handleResponse:function(c){if(this.form.reader){var a=this.form.reader.read(c);
var b=a.records&&a.records[0]?a.records[0].data:null;
return{success:a.success,data:b}
}return Ext.decode(c.responseText)
}});
Ext.form.Action.ACTION_TYPES={load:Ext.form.Action.Load,submit:Ext.form.Action.Submit};
Ext.form.VTypes=function(){var c=/^[a-zA-Z_]+$/;
var b=/^[a-zA-Z0-9_]+$/;
var d=/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/;
var a=/(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
return{email:function(e){return d.test(e)
},emailText:'This field should be an e-mail address in the format "user@domain.com"',emailMask:/[a-z0-9_\.\-@]/i,url:function(e){return a.test(e)
},urlText:'This field should be a URL in the format "http://www.domain.com"',alpha:function(e){return c.test(e)
},alphaText:"This field should only contain letters and _",alphaMask:/[a-z_]/i,alphanum:function(e){return b.test(e)
},alphanumText:"This field should only contain letters, numbers and _",alphanumMask:/[a-z0-9_]/i}
}();
Ext.grid.GridPanel=Ext.extend(Ext.Panel,{ddText:"{0} selected row{1}",minColumnWidth:25,trackMouseOver:true,enableDragDrop:false,enableColumnMove:true,enableColumnHide:true,enableHdMenu:true,stripeRows:false,autoExpandColumn:false,autoExpandMin:50,autoExpandMax:1000,view:null,loadMask:false,rendered:false,viewReady:false,stateEvents:["columnmove","columnresize","sortchange"],initComponent:function(){Ext.grid.GridPanel.superclass.initComponent.call(this);
this.autoScroll=false;
this.autoWidth=false;
if(Ext.isArray(this.columns)){this.colModel=new Ext.grid.ColumnModel(this.columns);
delete this.columns
}if(this.ds){this.store=this.ds;
delete this.ds
}if(this.cm){this.colModel=this.cm;
delete this.cm
}if(this.sm){this.selModel=this.sm;
delete this.sm
}this.store=Ext.StoreMgr.lookup(this.store);
this.addEvents("click","dblclick","contextmenu","mousedown","mouseup","mouseover","mouseout","keypress","keydown","cellmousedown","rowmousedown","headermousedown","cellclick","celldblclick","rowclick","rowdblclick","headerclick","headerdblclick","rowcontextmenu","cellcontextmenu","headercontextmenu","bodyscroll","columnresize","columnmove","sortchange")
},onRender:function(c,a){Ext.grid.GridPanel.superclass.onRender.apply(this,arguments);
var b=this.body;
this.el.addClass("x-grid-panel");
var d=this.getView();
d.init(this);
b.on("mousedown",this.onMouseDown,this);
b.on("click",this.onClick,this);
b.on("dblclick",this.onDblClick,this);
b.on("contextmenu",this.onContextMenu,this);
b.on("keydown",this.onKeyDown,this);
this.relayEvents(b,["mousedown","mouseup","mouseover","mouseout","keypress"]);
this.getSelectionModel().init(this);
this.view.render()
},initEvents:function(){Ext.grid.GridPanel.superclass.initEvents.call(this);
if(this.loadMask){this.loadMask=new Ext.LoadMask(this.bwrap,Ext.apply({store:this.store},this.loadMask))
}},initStateEvents:function(){Ext.grid.GridPanel.superclass.initStateEvents.call(this);
this.colModel.on("hiddenchange",this.saveState,this,{delay:100})
},applyState:function(d){var i=this.colModel;
var e=d.columns;
if(e){for(var h=0,a=e.length;
h<a;
h++){var g=e[h];
var b=i.getColumnById(g.id);
if(b){b.hidden=g.hidden;
b.width=g.width;
var c=i.getIndexById(g.id);
if(c!=h){i.moveColumn(c,h)
}}}}if(d.sort){this.store[this.store.remoteSort?"setDefaultSort":"sort"](d.sort.field,d.sort.direction)
}},getState:function(){var c={columns:[]};
for(var d=0,b;
b=this.colModel.config[d];
d++){c.columns[d]={id:b.id,width:b.width};
if(b.hidden){c.columns[d].hidden=true
}}var a=this.store.getSortState();
if(a){c.sort=a
}return c
},afterRender:function(){Ext.grid.GridPanel.superclass.afterRender.call(this);
this.view.layout();
this.viewReady=true
},reconfigure:function(a,b){if(this.loadMask){this.loadMask.destroy();
this.loadMask=new Ext.LoadMask(this.bwrap,Ext.apply({store:a},this.initialConfig.loadMask))
}this.view.bind(a,b);
this.store=a;
this.colModel=b;
if(this.rendered){this.view.refresh(true)
}},onKeyDown:function(a){this.fireEvent("keydown",a)
},onDestroy:function(){if(this.rendered){if(this.loadMask){this.loadMask.destroy()
}var a=this.body;
a.removeAllListeners();
this.view.destroy();
a.update("")
}this.colModel.purgeListeners();
Ext.grid.GridPanel.superclass.onDestroy.call(this)
},processEvent:function(g,d){this.fireEvent(g,d);
var e=d.getTarget();
var h=this.view;
var b=h.findHeaderIndex(e);
if(b!==false){this.fireEvent("header"+g,this,b,d)
}else{var c=h.findRowIndex(e);
var a=h.findCellIndex(e);
if(c!==false){this.fireEvent("row"+g,this,c,d);
if(a!==false){this.fireEvent("cell"+g,this,c,a,d)
}}}},onClick:function(a){this.processEvent("click",a)
},onMouseDown:function(a){this.processEvent("mousedown",a)
},onContextMenu:function(b,a){this.processEvent("contextmenu",b)
},onDblClick:function(a){this.processEvent("dblclick",a)
},walkCells:function(e,b,c,l,g){var h=this.colModel,k=h.getColumnCount();
var d=this.store,i=d.getCount(),a=true;
if(c<0){if(b<0){e--;
a=false
}while(e>=0){if(!a){b=k-1
}a=false;
while(b>=0){if(l.call(g||this,e,b,h)===true){return[e,b]
}b--
}e--
}}else{if(b>=k){e++;
a=false
}while(e<i){if(!a){b=0
}a=false;
while(b<k){if(l.call(g||this,e,b,h)===true){return[e,b]
}b++
}e++
}}return null
},getSelections:function(){return this.selModel.getSelections()
},onResize:function(){Ext.grid.GridPanel.superclass.onResize.apply(this,arguments);
if(this.viewReady){this.view.layout()
}},getGridEl:function(){return this.body
},stopEditing:function(){},getSelectionModel:function(){if(!this.selModel){this.selModel=new Ext.grid.RowSelectionModel(this.disableSelection?{selectRow:Ext.emptyFn}:null)
}return this.selModel
},getStore:function(){return this.store
},getColumnModel:function(){return this.colModel
},getView:function(){if(!this.view){this.view=new Ext.grid.GridView(this.viewConfig)
}return this.view
},getDragDropText:function(){var a=this.selModel.getCount();
return String.format(this.ddText,a,a==1?"":"s")
}});
Ext.reg("grid",Ext.grid.GridPanel);
Ext.grid.GridView=function(a){Ext.apply(this,a);
this.addEvents("beforerowremoved","beforerowsinserted","beforerefresh","rowremoved","rowsinserted","rowupdated","refresh");
Ext.grid.GridView.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.GridView,Ext.util.Observable,{scrollOffset:19,autoFill:false,forceFit:false,sortClasses:["sort-asc","sort-desc"],sortAscText:"Sort Ascending",sortDescText:"Sort Descending",columnsText:"Columns",borderWidth:2,initTemplates:function(){var b=this.templates||{};
if(!b.master){b.master=new Ext.Template('<div class="x-grid3" hidefocus="true">','<div class="x-grid3-viewport">','<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset">{header}</div></div><div class="x-clear"></div></div>','<div class="x-grid3-scroller"><div class="x-grid3-body">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',"</div>",'<div class="x-grid3-resize-marker">&#160;</div>','<div class="x-grid3-resize-proxy">&#160;</div>',"</div>")
}if(!b.header){b.header=new Ext.Template('<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">','<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',"</table>")
}if(!b.hcell){b.hcell=new Ext.Template('<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id}" style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',this.grid.enableHdMenu?'<a class="x-grid3-hd-btn" href="#"></a>':"",'{value}<img class="x-grid3-sort-icon" src="',Ext.BLANK_IMAGE_URL,'" />',"</div></td>")
}if(!b.body){b.body=new Ext.Template("{rows}")
}if(!b.row){b.row=new Ext.Template('<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<tbody><tr>{cells}</tr>",(this.enableRowBody?'<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>':""),"</tbody></table></div>")
}if(!b.cell){b.cell=new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>','<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',"</td>")
}for(var a in b){var c=b[a];
if(c&&typeof c.compile=="function"&&!c.compiled){c.disableFormats=true;
c.compile()
}}this.templates=b;
this.tdClass="x-grid3-cell";
this.cellSelector="td.x-grid3-cell";
this.hdCls="x-grid3-hd";
this.rowSelector="div.x-grid3-row";
this.colRe=new RegExp("x-grid3-td-([^\\s]+)","")
},fly:function(a){if(!this._flyweight){this._flyweight=new Ext.Element.Flyweight(document.body)
}this._flyweight.dom=a;
return this._flyweight
},getEditorParent:function(a){return this.scroller.dom
},initElements:function(){var b=Ext.Element;
var c=this.grid.getGridEl().dom.firstChild;
var a=c.childNodes;
this.el=new b(c);
this.mainWrap=new b(a[0]);
this.mainHd=new b(this.mainWrap.dom.firstChild);
if(this.grid.hideHeaders){this.mainHd.setDisplayed(false)
}this.innerHd=this.mainHd.dom.firstChild;
this.scroller=new b(this.mainWrap.dom.childNodes[1]);
if(this.forceFit){this.scroller.setStyle("overflow-x","hidden")
}this.mainBody=new b(this.scroller.dom.firstChild);
this.focusEl=new b(this.scroller.dom.childNodes[1]);
this.focusEl.swallowEvent("click",true);
this.resizeMarker=new b(a[1]);
this.resizeProxy=new b(a[2])
},getRows:function(){return this.hasRows()?this.mainBody.dom.childNodes:[]
},findCell:function(a){if(!a){return false
}return this.fly(a).findParent(this.cellSelector,3)
},findCellIndex:function(b,c){var a=this.findCell(b);
if(a&&(!c||this.fly(a).hasClass(c))){return this.getCellIndex(a)
}return false
},getCellIndex:function(b){if(b){var a=b.className.match(this.colRe);
if(a&&a[1]){return this.cm.getIndexById(a[1])
}}return false
},findHeaderCell:function(b){var a=this.findCell(b);
return a&&this.fly(a).hasClass(this.hdCls)?a:null
},findHeaderIndex:function(a){return this.findCellIndex(a,this.hdCls)
},findRow:function(a){if(!a){return false
}return this.fly(a).findParent(this.rowSelector,10)
},findRowIndex:function(a){var b=this.findRow(a);
return b?b.rowIndex:false
},getRow:function(a){return this.getRows()[a]
},getCell:function(b,a){return this.getRow(b).getElementsByTagName("td")[a]
},getHeaderCell:function(a){return this.mainHd.dom.getElementsByTagName("td")[a]
},addRowClass:function(b,a){var c=this.getRow(b);
if(c){this.fly(c).addClass(a)
}},removeRowClass:function(b,a){var c=this.getRow(b);
if(c){this.fly(c).removeClass(a)
}},removeRow:function(a){Ext.removeNode(this.getRow(a))
},removeRows:function(c,a){var d=this.mainBody.dom;
for(var b=c;
b<=a;
b++){Ext.removeNode(d.childNodes[c])
}},getScrollState:function(){var a=this.scroller.dom;
return{left:a.scrollLeft,top:a.scrollTop}
},restoreScroll:function(a){var b=this.scroller.dom;
b.scrollLeft=a.left;
b.scrollTop=a.top
},scrollToTop:function(){this.scroller.dom.scrollTop=0;
this.scroller.dom.scrollLeft=0
},syncScroll:function(){this.syncHeaderScroll();
var a=this.scroller.dom;
this.grid.fireEvent("bodyscroll",a.scrollLeft,a.scrollTop)
},syncHeaderScroll:function(){var a=this.scroller.dom;
this.innerHd.scrollLeft=a.scrollLeft;
this.innerHd.scrollLeft=a.scrollLeft
},updateSortIcon:function(d,a){var b=this.sortClasses;
var c=this.mainHd.select("td").removeClass(b);
c.item(d).addClass(b[a=="DESC"?1:0])
},updateAllColumnWidths:function(){var a=this.getTotalWidth();
var g=this.cm.getColumnCount();
var i=[];
for(var c=0;
c<g;
c++){i[c]=this.getColumnWidth(c)
}this.innerHd.firstChild.firstChild.style.width=a;
for(var c=0;
c<g;
c++){var b=this.getHeaderCell(c);
b.style.width=i[c]
}var h=this.getRows();
for(var c=0,k=h.length;
c<k;
c++){h[c].style.width=a;
h[c].firstChild.style.width=a;
var e=h[c].firstChild.rows[0];
for(var d=0;
d<g;
d++){e.childNodes[d].style.width=i[d]
}}this.onAllColumnWidthsUpdated(i,a)
},updateColumnWidth:function(g,c){var i=this.getColumnWidth(g);
var h=this.getTotalWidth();
this.innerHd.firstChild.firstChild.style.width=h;
var b=this.getHeaderCell(g);
b.style.width=i;
var d=this.getRows();
for(var e=0,a=d.length;
e<a;
e++){d[e].style.width=h;
d[e].firstChild.style.width=h;
d[e].firstChild.rows[0].childNodes[g].style.width=i
}this.onColumnWidthUpdated(g,i,h)
},updateColumnHidden:function(h,d){var i=this.getTotalWidth();
this.innerHd.firstChild.firstChild.style.width=i;
var b=d?"none":"";
var c=this.getHeaderCell(h);
c.style.display=b;
var e=this.getRows();
for(var g=0,a=e.length;
g<a;
g++){e[g].style.width=i;
e[g].firstChild.style.width=i;
e[g].firstChild.rows[0].childNodes[h].style.display=b
}this.onColumnHiddenUpdated(h,d,i);
delete this.lastViewWidth;
this.layout()
},doRender:function(t,r,l,x,m,g){var w=this.templates,u=w.cell,s=w.row,q=m-1;
var v="width:"+this.getTotalWidth()+";";
var c=[],k,b,i={},p={tstyle:v},n;
for(var h=0,d=r.length;
h<d;
h++){n=r[h];
k=[];
var o=(h+x);
for(var e=0;
e<m;
e++){b=t[e];
i.id=b.id;
i.css=e==0?"x-grid3-cell-first ":(e==q?"x-grid3-cell-last ":"");
i.attr=i.cellAttr="";
i.value=b.renderer(n.data[b.name],i,n,o,e,l);
i.style=b.style;
if(i.value==undefined||i.value===""){i.value="&#160;"
}if(n.dirty&&typeof n.modified[b.name]!=="undefined"){i.css+=" x-grid3-dirty-cell"
}k[k.length]=u.apply(i)
}var a=[];
if(g&&((o+1)%2==0)){a[0]="x-grid3-row-alt"
}if(n.dirty){a[1]=" x-grid3-dirty-row"
}p.cols=m;
if(this.getRowClass){a[2]=this.getRowClass(n,o,p,l)
}p.alt=a.join(" ");
p.cells=k.join("");
c[c.length]=s.apply(p)
}return c.join("")
},processRows:function(k,a){if(this.ds.getCount()<1){return
}a=a||!this.grid.stripeRows;
k=k||0;
var e=this.getRows();
var i=" x-grid3-row-alt ";
for(var c=k,b=e.length;
c<b;
c++){var g=e[c];
g.rowIndex=c;
if(!a){var d=((c+1)%2==0);
var h=(" "+g.className+" ").indexOf(i)!=-1;
if(d==h){continue
}if(d){g.className+=" x-grid3-row-alt"
}else{g.className=g.className.replace("x-grid3-row-alt","")
}}}},renderUI:function(){var b=this.renderHeaders();
var e=this.templates.body.apply({rows:""});
var d=this.templates.master.apply({body:e,header:b});
var c=this.grid;
c.getGridEl().dom.innerHTML=d;
this.initElements();
this.mainBody.dom.innerHTML=this.renderRows();
this.processRows(0,true);
Ext.fly(this.innerHd).on("click",this.handleHdDown,this);
this.mainHd.on("mouseover",this.handleHdOver,this);
this.mainHd.on("mouseout",this.handleHdOut,this);
this.mainHd.on("mousemove",this.handleHdMove,this);
this.scroller.on("scroll",this.syncScroll,this);
if(c.enableColumnResize!==false){this.splitone=new Ext.grid.GridView.SplitDragZone(c,this.mainHd.dom)
}if(c.enableColumnMove){this.columnDrag=new Ext.grid.GridView.ColumnDragZone(c,this.innerHd);
this.columnDrop=new Ext.grid.HeaderDropZone(c,this.mainHd.dom)
}if(c.enableHdMenu!==false){if(c.enableColumnHide!==false){this.colMenu=new Ext.menu.Menu({id:c.id+"-hcols-menu"});
this.colMenu.on("beforeshow",this.beforeColMenuShow,this);
this.colMenu.on("itemclick",this.handleHdMenuClick,this)
}this.hmenu=new Ext.menu.Menu({id:c.id+"-hctx"});
this.hmenu.add({id:"asc",text:this.sortAscText,cls:"xg-hmenu-sort-asc"},{id:"desc",text:this.sortDescText,cls:"xg-hmenu-sort-desc"});
if(c.enableColumnHide!==false){this.hmenu.add("-",{id:"columns",text:this.columnsText,menu:this.colMenu,iconCls:"x-cols-icon"})
}this.hmenu.on("itemclick",this.handleHdMenuClick,this)
}if(c.enableDragDrop||c.enableDrag){var a=new Ext.grid.GridDragZone(c,{ddGroup:c.ddGroup||"GridDD"})
}this.updateHeaderSortState()
},layout:function(){if(!this.mainBody){return
}var k=this.grid;
var h=k.getGridEl(),e=this.cm,c=k.autoExpandColumn,d=this;
var b=h.getSize(true);
var g=b.width;
if(g<20||b.height<20){return
}if(k.autoHeight){this.scroller.dom.style.overflow="visible"
}else{this.el.setSize(b.width,b.height);
var i=this.mainHd.getHeight();
var a=b.height-(i);
this.scroller.setSize(g,a);
if(this.innerHd){this.innerHd.style.width=(g)+"px"
}}if(this.forceFit){if(this.lastViewWidth!=g){this.fitColumns(false,false);
this.lastViewWidth=g
}}else{this.autoExpand();
this.syncHeaderScroll()
}this.onLayout(g,a)
},onLayout:function(a,b){},onColumnWidthUpdated:function(b,a,c){},onAllColumnWidthsUpdated:function(a,b){},onColumnHiddenUpdated:function(c,b,a){},updateColumnText:function(a,b){},afterMove:function(a){},init:function(a){this.grid=a;
this.initTemplates();
this.initData(a.store,a.colModel);
this.initUI(a)
},getColumnId:function(a){return this.cm.getColumnId(a)
},renderHeaders:function(){var h=this.cm,d=this.templates;
var e=d.hcell;
var i=[],b=[],c={};
for(var g=0,a=h.getColumnCount();
g<a;
g++){c.id=h.getColumnId(g);
c.value=h.getColumnHeader(g)||"";
c.style=this.getColumnStyle(g,true);
c.tooltip=this.getColumnTooltip(g);
if(h.config[g].align=="right"){c.istyle="padding-right:16px"
}else{delete c.istyle
}i[i.length]=e.apply(c)
}return d.header.apply({cells:i.join(""),tstyle:"width:"+this.getTotalWidth()+";"})
},getColumnTooltip:function(a){var b=this.cm.getColumnTooltip(a);
if(b){if(Ext.QuickTips.isEnabled()){return'ext:qtip="'+b+'"'
}else{return'title="'+b+'"'
}}return""
},beforeUpdate:function(){this.grid.stopEditing(true)
},updateHeaders:function(){this.innerHd.firstChild.innerHTML=this.renderHeaders()
},focusRow:function(a){this.focusCell(a,0,false)
},focusCell:function(b,a,c){var d=this.ensureVisible(b,a,c);
this.focusEl.setXY(d);
if(Ext.isGecko){this.focusEl.focus()
}else{this.focusEl.focus.defer(1,this.focusEl)
}},ensureVisible:function(e,r,a){if(typeof e!="number"){e=e.rowIndex
}if(!this.ds){return
}if(e<0||e>=this.ds.getCount()){return
}r=(r!==undefined?r:0);
var n=this.getRow(e),q;
if(!(a===false&&r===0)){while(this.cm.isHidden(r)){r++
}q=this.getCell(e,r)
}if(!n){return
}var k=this.scroller.dom;
var g=0;
var b=n,i=this.el.dom;
while(b&&b!=i){g+=b.offsetTop;
b=b.offsetParent
}g-=this.mainHd.dom.offsetHeight;
var h=g+n.offsetHeight;
var d=k.clientHeight;
var i=parseInt(k.scrollTop,10);
var l=i+d;
if(g<i){k.scrollTop=g
}else{if(h>l){k.scrollTop=h-d
}}if(a!==false){var m=parseInt(q.offsetLeft,10);
var o=m+q.offsetWidth;
var p=parseInt(k.scrollLeft,10);
var c=p+k.clientWidth;
if(m<p){k.scrollLeft=m
}else{if(o>c){k.scrollLeft=o-k.clientWidth
}}}return q?Ext.fly(q).getXY():[k.scrollLeft,Ext.fly(n).getY()]
},insertRows:function(a,b,e,c){if(!c&&b===0&&e==a.getCount()-1){this.refresh()
}else{if(!c){this.fireEvent("beforerowsinserted",this,b,e)
}var g=this.renderRows(b,e);
var d=this.getRow(b);
if(d){Ext.DomHelper.insertHtml("beforeBegin",d,g)
}else{Ext.DomHelper.insertHtml("beforeEnd",this.mainBody.dom,g)
}if(!c){this.fireEvent("rowsinserted",this,b,e);
this.processRows(b)
}}},deleteRows:function(a,b,c){if(a.getRowCount()<1){this.refresh()
}else{this.fireEvent("beforerowsdeleted",this,b,c);
this.removeRows(b,c);
this.processRows(b);
this.fireEvent("rowsdeleted",this,b,c)
}},getColumnStyle:function(a,c){var d=!c?(this.cm.config[a].css||""):"";
d+="width:"+this.getColumnWidth(a)+";";
if(this.cm.isHidden(a)){d+="display:none;"
}var b=this.cm.config[a].align;
if(b){d+="text-align:"+b+";"
}return d
},getColumnWidth:function(b){var a=this.cm.getColumnWidth(b);
if(typeof a=="number"){return(Ext.isBorderBox?a:(a-this.borderWidth>0?a-this.borderWidth:0))+"px"
}return a
},getTotalWidth:function(){return this.cm.getTotalWidth()+"px"
},fitColumns:function(r,o,q){var p=this.cm,a,i,e;
var b=p.getTotalWidth(false);
var l=this.grid.getGridEl().getWidth(true)-this.scrollOffset;
if(l<20){return
}var t=l-b;
if(t===0){return false
}var u=p.getColumnCount(true);
var d=u-(typeof q=="number"?1:0);
if(d===0){d=1;
q=undefined
}var k=p.getColumnCount();
var m=[];
var g=0;
var h=0;
var n;
for(e=0;
e<k;
e++){if(!p.isHidden(e)&&!p.isFixed(e)&&e!==q){n=p.getColumnWidth(e);
m.push(e);
g=e;
m.push(n);
h+=n
}}var s=(l-p.getTotalWidth())/h;
while(m.length){n=m.pop();
e=m.pop();
p.setColumnWidth(e,Math.max(this.grid.minColumnWidth,Math.floor(n+n*s)),true)
}if((b=p.getTotalWidth(false))>l){var c=d!=u?q:g;
p.setColumnWidth(c,Math.max(1,p.getColumnWidth(c)-(b-l)),true)
}if(r!==true){this.updateAllColumnWidths()
}return true
},autoExpand:function(i){var c=this.grid,a=this.cm;
if(!this.userResized&&c.autoExpandColumn){var g=a.getTotalWidth(false);
var b=this.grid.getGridEl().getWidth(true)-this.scrollOffset;
if(g!=b){var d=a.getIndexById(c.autoExpandColumn);
var e=a.getColumnWidth(d);
var h=Math.min(Math.max(((b-g)+e),c.autoExpandMin),c.autoExpandMax);
if(h!=e){a.setColumnWidth(d,h,true);
if(i!==true){this.updateColumnWidth(d,h)
}}}}},getColumnData:function(){var c=[],a=this.cm,b=a.getColumnCount();
for(var d=0;
d<b;
d++){var e=a.getDataIndex(d);
c[d]={name:(typeof e=="undefined"?this.ds.fields.get(d).name:e),renderer:a.getRenderer(d),id:a.getColumnId(d),style:this.getColumnStyle(d)}
}return c
},renderRows:function(g,b){var a=this.grid,i=a.colModel,d=a.store,e=a.stripeRows;
var h=i.getColumnCount();
if(d.getCount()<1){return""
}var k=this.getColumnData();
g=g||0;
b=typeof b=="undefined"?d.getCount()-1:b;
var c=d.getRange(g,b);
return this.doRender(k,c,d,g,h,e)
},renderBody:function(){var a=this.renderRows();
return this.templates.body.apply({rows:a})
},refreshRow:function(d){var b=this.ds,c;
if(typeof d=="number"){c=d;
d=b.getAt(c)
}else{c=b.indexOf(d)
}var a=[];
this.insertRows(b,c,c,true);
this.getRow(c).rowIndex=c;
this.onRemove(b,d,c+1,true);
this.fireEvent("rowupdated",this,c,d)
},refresh:function(b){this.fireEvent("beforerefresh",this);
this.grid.stopEditing(true);
var a=this.renderBody();
this.mainBody.update(a);
if(b===true){this.updateHeaders();
this.updateHeaderSortState()
}this.processRows(0,true);
this.layout();
this.applyEmptyText();
this.fireEvent("refresh",this)
},applyEmptyText:function(){if(this.emptyText&&!this.hasRows()){this.mainBody.update('<div class="x-grid-empty">'+this.emptyText+"</div>")
}},updateHeaderSortState:function(){var c=this.ds.getSortState();
if(!c){return
}if(!this.sortState||(this.sortState.field!=c.field||this.sortState.direction!=c.direction)){this.grid.fireEvent("sortchange",this.grid,c)
}this.sortState=c;
var b=this.cm.findColumnIndex(c.field);
if(b!=-1){var a=c.direction;
this.updateSortIcon(b,a)
}},destroy:function(){if(this.colMenu){this.colMenu.removeAll();
Ext.menu.MenuMgr.unregister(this.colMenu);
this.colMenu.getEl().remove();
delete this.colMenu
}if(this.hmenu){this.hmenu.removeAll();
Ext.menu.MenuMgr.unregister(this.hmenu);
this.hmenu.getEl().remove();
delete this.hmenu
}if(this.grid.enableColumnMove){var b=Ext.dd.DDM.ids["gridHeader"+this.grid.getGridEl().id];
if(b){for(var a in b){if(!b[a].config.isTarget&&b[a].dragElId){var c=b[a].dragElId;
b[a].unreg();
Ext.get(c).remove()
}else{if(b[a].config.isTarget){b[a].proxyTop.remove();
b[a].proxyBottom.remove();
b[a].unreg()
}}if(Ext.dd.DDM.locationCache[a]){delete Ext.dd.DDM.locationCache[a]
}}delete Ext.dd.DDM.ids["gridHeader"+this.grid.getGridEl().id]
}}Ext.destroy(this.resizeMarker,this.resizeProxy);
this.initData(null,null);
Ext.EventManager.removeResizeListener(this.onWindowResize,this)
},onDenyColumnHide:function(){},render:function(){var a=this.cm;
var b=a.getColumnCount();
if(this.autoFill){this.fitColumns(true,true)
}else{if(this.forceFit){this.fitColumns(true,false)
}else{if(this.grid.autoExpandColumn){this.autoExpand(true)
}}}this.renderUI()
},initData:function(b,a){if(this.ds){this.ds.un("load",this.onLoad,this);
this.ds.un("datachanged",this.onDataChange,this);
this.ds.un("add",this.onAdd,this);
this.ds.un("remove",this.onRemove,this);
this.ds.un("update",this.onUpdate,this);
this.ds.un("clear",this.onClear,this)
}if(b){b.on("load",this.onLoad,this);
b.on("datachanged",this.onDataChange,this);
b.on("add",this.onAdd,this);
b.on("remove",this.onRemove,this);
b.on("update",this.onUpdate,this);
b.on("clear",this.onClear,this)
}this.ds=b;
if(this.cm){this.cm.un("configchange",this.onColConfigChange,this);
this.cm.un("widthchange",this.onColWidthChange,this);
this.cm.un("headerchange",this.onHeaderChange,this);
this.cm.un("hiddenchange",this.onHiddenChange,this);
this.cm.un("columnmoved",this.onColumnMove,this);
this.cm.un("columnlockchange",this.onColumnLock,this)
}if(a){a.on("configchange",this.onColConfigChange,this);
a.on("widthchange",this.onColWidthChange,this);
a.on("headerchange",this.onHeaderChange,this);
a.on("hiddenchange",this.onHiddenChange,this);
a.on("columnmoved",this.onColumnMove,this);
a.on("columnlockchange",this.onColumnLock,this)
}this.cm=a
},onDataChange:function(){this.refresh();
this.updateHeaderSortState()
},onClear:function(){this.refresh()
},onUpdate:function(b,a){this.refreshRow(a)
},onAdd:function(b,a,c){this.insertRows(b,c,c+(a.length-1))
},onRemove:function(b,a,d,c){if(c!==true){this.fireEvent("beforerowremoved",this,d,a)
}this.removeRow(d);
if(c!==true){this.processRows(d);
this.applyEmptyText();
this.fireEvent("rowremoved",this,d,a)
}},onLoad:function(){this.scrollToTop()
},onColWidthChange:function(a,c,b){this.updateColumnWidth(c,b)
},onHeaderChange:function(a,c,b){this.updateHeaders()
},onHiddenChange:function(a,c,b){this.updateColumnHidden(c,b)
},onColumnMove:function(a,b,d){this.indexMap=null;
var c=this.getScrollState();
this.refresh(true);
this.restoreScroll(c);
this.afterMove(d)
},onColConfigChange:function(){delete this.lastViewWidth;
this.indexMap=null;
this.refresh(true)
},initUI:function(a){a.on("headerclick",this.onHeaderClick,this);
if(a.trackMouseOver){a.on("mouseover",this.onRowOver,this);
a.on("mouseout",this.onRowOut,this)
}},initEvents:function(){},onHeaderClick:function(b,a){if(this.headersDisabled||!this.cm.isSortable(a)){return
}b.stopEditing(true);
b.store.sort(this.cm.getDataIndex(a))
},onRowOver:function(c,a){var b;
if((b=this.findRowIndex(a))!==false){this.addRowClass(b,"x-grid3-row-over")
}},onRowOut:function(c,a){var b;
if((b=this.findRowIndex(a))!==false&&b!==this.findRowIndex(c.getRelatedTarget())){this.removeRowClass(b,"x-grid3-row-over")
}},handleWheel:function(a){a.stopPropagation()
},onRowSelect:function(a){this.addRowClass(a,"x-grid3-row-selected")
},onRowDeselect:function(a){this.removeRowClass(a,"x-grid3-row-selected")
},onCellSelect:function(b,c){var a=this.getCell(b,c);
if(a){this.fly(a).addClass("x-grid3-cell-selected")
}},onCellDeselect:function(b,c){var a=this.getCell(b,c);
if(a){this.fly(a).removeClass("x-grid3-cell-selected")
}},onColumnSplitterMoved:function(b,c){this.userResized=true;
var a=this.grid.colModel;
a.setColumnWidth(b,c,true);
if(this.forceFit){this.fitColumns(true,false,b);
this.updateAllColumnWidths()
}else{this.updateColumnWidth(b,c)
}this.grid.fireEvent("columnresize",b,c)
},handleHdMenuClick:function(c){var d=this.hdCtxIndex;
var a=this.cm,b=this.ds;
switch(c.id){case"asc":b.sort(a.getDataIndex(d),"ASC");
break;
case"desc":b.sort(a.getDataIndex(d),"DESC");
break;
default:d=a.getIndexById(c.id.substr(4));
if(d!=-1){if(c.checked&&a.getColumnsBy(this.isHideableColumn,this).length<=1){this.onDenyColumnHide();
return false
}a.setHidden(d,c.checked)
}}return true
},isHideableColumn:function(a){return !a.hidden&&!a.fixed
},beforeColMenuShow:function(){var a=this.cm,b=a.getColumnCount();
this.colMenu.removeAll();
for(var c=0;
c<b;
c++){if(a.config[c].fixed!==true&&a.config[c].hideable!==false){this.colMenu.add(new Ext.menu.CheckItem({id:"col-"+a.getColumnId(c),text:a.getColumnHeader(c),checked:!a.isHidden(c),hideOnClick:false,disabled:a.config[c].hideable===false}))
}}},handleHdDown:function(b,d){if(Ext.fly(d).hasClass("x-grid3-hd-btn")){b.stopEvent();
var c=this.findHeaderCell(d);
Ext.fly(c).addClass("x-grid3-hd-menu-open");
var e=this.getCellIndex(c);
this.hdCtxIndex=e;
var g=this.hmenu.items,a=this.cm;
g.get("asc").setDisabled(!a.isSortable(e));
g.get("desc").setDisabled(!a.isSortable(e));
this.hmenu.on("hide",function(){Ext.fly(c).removeClass("x-grid3-hd-menu-open")
},this,{single:true});
this.hmenu.show(d,"tl-bl?")
}},handleHdOver:function(b,a){var c=this.findHeaderCell(a);
if(c&&!this.headersDisabled){this.activeHd=c;
this.activeHdIndex=this.getCellIndex(c);
var d=this.fly(c);
this.activeHdRegion=d.getRegion();
if(!this.cm.isMenuDisabled(this.activeHdIndex)){d.addClass("x-grid3-hd-over");
this.activeHdBtn=d.child(".x-grid3-hd-btn");
if(this.activeHdBtn){this.activeHdBtn.dom.style.height=(c.firstChild.offsetHeight-1)+"px"
}}}},handleHdMove:function(b,d){if(this.activeHd&&!this.headersDisabled){var g=this.splitHandleWidth||5;
var c=this.activeHdRegion;
var a=b.getPageX();
var e=this.activeHd.style;
if(a-c.left<=g&&this.cm.isResizable(this.activeHdIndex-1)){e.cursor=Ext.isAir?"move":Ext.isSafari?"e-resize":"col-resize"
}else{if(c.right-a<=(!this.activeHdBtn?g:2)&&this.cm.isResizable(this.activeHdIndex)){e.cursor=Ext.isAir?"move":Ext.isSafari?"w-resize":"col-resize"
}else{e.cursor=""
}}}},handleHdOut:function(b,a){var c=this.findHeaderCell(a);
if(c&&(!Ext.isIE||!b.within(c,true))){this.activeHd=null;
this.fly(c).removeClass("x-grid3-hd-over");
c.style.cursor=""
}},hasRows:function(){var a=this.mainBody.dom.firstChild;
return a&&a.className!="x-grid-empty"
},bind:function(a,b){this.initData(a,b)
}});
Ext.grid.GridView.SplitDragZone=function(a,b){this.grid=a;
this.view=a.getView();
this.marker=this.view.resizeMarker;
this.proxy=this.view.resizeProxy;
Ext.grid.GridView.SplitDragZone.superclass.constructor.call(this,b,"gridSplitters"+this.grid.getGridEl().id,{dragElId:Ext.id(this.proxy.dom),resizeFrame:false});
this.scroll=false;
this.hw=this.view.splitHandleWidth||5
};
Ext.extend(Ext.grid.GridView.SplitDragZone,Ext.dd.DDProxy,{b4StartDrag:function(a,b){this.view.headersDisabled=true;
var c=this.view.mainWrap.getHeight();
this.marker.setHeight(c);
this.marker.show();
this.marker.alignTo(this.view.getHeaderCell(this.cellIndex),"tl-tl",[-2,0]);
this.proxy.setHeight(c);
var e=this.cm.getColumnWidth(this.cellIndex);
var d=Math.max(e-this.grid.minColumnWidth,0);
this.resetConstraints();
this.setXConstraint(d,1000);
this.setYConstraint(0,0);
this.minX=a-d;
this.maxX=a+1000;
this.startPos=a;
Ext.dd.DDProxy.prototype.b4StartDrag.call(this,a,b)
},handleMouseDown:function(d){var i=this.view.findHeaderCell(d.getTarget());
if(i){var e=this.view.fly(i).getXY(),m=e[0],a=e[1];
var h=d.getXY(),b=h[0],c=h[1];
var k=i.offsetWidth,l=false;
if((b-m)<=this.hw){l=-1
}else{if((m+k)-b<=this.hw){l=0
}}if(l!==false){this.cm=this.grid.colModel;
var g=this.view.getCellIndex(i);
if(l==-1){if(g+l<0){return
}while(this.cm.isHidden(g+l)){--l;
if(g+l<0){return
}}}this.cellIndex=g+l;
this.split=i.dom;
if(this.cm.isResizable(this.cellIndex)&&!this.cm.isFixed(this.cellIndex)){Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown.apply(this,arguments)
}}else{if(this.view.columnDrag){this.view.columnDrag.callHandleMouseDown(d)
}}}},endDrag:function(b){this.marker.hide();
var a=this.view;
var d=Math.max(this.minX,b.getPageX());
var c=d-this.startPos;
a.onColumnSplitterMoved(this.cellIndex,this.cm.getColumnWidth(this.cellIndex)+c);
setTimeout(function(){a.headersDisabled=false
},50)
},autoOffset:function(){this.setDelta(0,0)
}});
Ext.grid.GroupingView=Ext.extend(Ext.grid.GridView,{hideGroupedColumn:false,showGroupName:true,startCollapsed:false,enableGrouping:true,enableGroupingMenu:true,enableNoGroups:true,emptyGroupText:"(None)",ignoreAdd:false,groupTextTpl:"{text}",gidSeed:1000,initTemplates:function(){Ext.grid.GroupingView.superclass.initTemplates.call(this);
this.state={};
var a=this.grid.getSelectionModel();
a.on(a.selectRow?"beforerowselect":"beforecellselect",this.onBeforeRowSelect,this);
if(!this.startGroup){this.startGroup=new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}">','<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>',this.groupTextTpl,"</div></div>",'<div id="{groupId}-bd" class="x-grid-group-body">')
}this.startGroup.compile();
this.endGroup="</div></div>"
},findGroup:function(a){return Ext.fly(a).up(".x-grid-group",this.mainBody.dom)
},getGroups:function(){return this.hasRows()?this.mainBody.dom.childNodes:[]
},onAdd:function(){if(this.enableGrouping&&!this.ignoreAdd){var a=this.getScrollState();
this.refresh();
this.restoreScroll(a)
}else{if(!this.enableGrouping){Ext.grid.GroupingView.superclass.onAdd.apply(this,arguments)
}}},onRemove:function(b,a,e,c){Ext.grid.GroupingView.superclass.onRemove.apply(this,arguments);
var d=document.getElementById(a._groupId);
if(d&&d.childNodes[1].childNodes.length<1){Ext.removeNode(d)
}this.applyEmptyText()
},refreshRow:function(a){if(this.ds.getCount()==1){this.refresh()
}else{this.isUpdating=true;
Ext.grid.GroupingView.superclass.refreshRow.apply(this,arguments);
this.isUpdating=false
}},beforeMenuShow:function(){var b=this.getGroupField();
var c=this.hmenu.items.get("groupBy");
if(c){c.setDisabled(this.cm.config[this.hdCtxIndex].groupable===false)
}var a=this.hmenu.items.get("showGroups");
if(a){if(!!b){a.setDisabled(this.cm.config[this.hdCtxIndex].groupable===false)
}a.setChecked(!!b)
}},renderUI:function(){Ext.grid.GroupingView.superclass.renderUI.call(this);
this.mainBody.on("mousedown",this.interceptMouse,this);
if(this.enableGroupingMenu&&this.hmenu){this.hmenu.add("-",{id:"groupBy",text:this.groupByText,handler:this.onGroupByClick,scope:this,iconCls:"x-group-by-icon"});
if(this.enableNoGroups){this.hmenu.add({id:"showGroups",text:this.showGroupsText,checked:true,checkHandler:this.onShowGroupsClick,scope:this})
}this.hmenu.on("beforeshow",this.beforeMenuShow,this)
}},onGroupByClick:function(){this.grid.store.groupBy(this.cm.getDataIndex(this.hdCtxIndex));
this.beforeMenuShow()
},onShowGroupsClick:function(a,b){if(b){this.onGroupByClick()
}else{this.grid.store.clearGrouping()
}},toggleGroup:function(b,c){this.grid.stopEditing(true);
b=Ext.getDom(b);
var a=Ext.fly(b);
c=c!==undefined?c:a.hasClass("x-grid-group-collapsed");
this.state[a.dom.id]=c;
a[c?"removeClass":"addClass"]("x-grid-group-collapsed")
},toggleAllGroups:function(c){var d=this.getGroups();
for(var b=0,a=d.length;
b<a;
b++){this.toggleGroup(d[b],c)
}},expandAllGroups:function(){this.toggleAllGroups(true)
},collapseAllGroups:function(){this.toggleAllGroups(false)
},interceptMouse:function(b){var a=b.getTarget(".x-grid-group-hd",this.mainBody);
if(a){b.stopEvent();
this.toggleGroup(a.parentNode)
}},getGroup:function(a,e,c,b,h,d){var g=c?c(a,{},e,b,h,d):String(a);
if(g===""){g=this.cm.config[h].emptyGroupText||this.emptyGroupText
}return g
},getGroupField:function(){return this.grid.store.getGroupState()
},renderRows:function(){var a=this.getGroupField();
var b=!!a;
if(this.hideGroupedColumn){var d=this.cm.findColumnIndex(a);
if(!b&&this.lastGroupField!==undefined){this.mainBody.update("");
this.cm.setHidden(this.cm.findColumnIndex(this.lastGroupField),false);
delete this.lastGroupField
}else{if(b&&this.lastGroupField===undefined){this.lastGroupField=a;
this.cm.setHidden(d,true)
}else{if(b&&this.lastGroupField!==undefined&&a!==this.lastGroupField){this.mainBody.update("");
var c=this.cm.findColumnIndex(this.lastGroupField);
this.cm.setHidden(c,false);
this.lastGroupField=a;
this.cm.setHidden(d,true)
}}}}return Ext.grid.GroupingView.superclass.renderRows.apply(this,arguments)
},doRender:function(x,u,l,Z,m,i){if(u.length<1){return""
}var a=this.getGroupField();
var n=this.cm.findColumnIndex(a);
this.enableGrouping=!!a;
if(!this.enableGrouping||this.isUpdating){return Ext.grid.GroupingView.superclass.doRender.apply(this,arguments)
}var t="width:"+this.getTotalWidth()+";";
var k=this.grid.getGridEl().id;
var v=this.cm.config[n];
var z=v.groupRenderer||v.renderer;
var h=this.showGroupName?(v.groupName||v.header)+": ":"";
var b=[],q,g,e,o;
for(g=0,e=u.length;
g<e;
g++){var r=Z+g;
var p=u[g],w=p.data[a],d=this.getGroup(w,p,z,r,n,l);
if(!q||q.group!=d){o=k+"-gp-"+a+"-"+Ext.util.Format.htmlEncode(d);
var y=typeof this.state[o]!=="undefined"?!this.state[o]:this.startCollapsed;
var s=y?"x-grid-group-collapsed":"";
q={group:d,gvalue:w,text:h+d,groupId:o,startRow:r,rs:[p],cls:s,style:t};
b.push(q)
}else{q.rs.push(p)
}p._groupId=o
}var c=[];
for(g=0,e=b.length;
g<e;
g++){var d=b[g];
this.doGroupStart(c,d,x,l,m);
c[c.length]=Ext.grid.GroupingView.superclass.doRender.call(this,x,d.rs,l,d.startRow,m,i);
this.doGroupEnd(c,d,x,l,m)
}return c.join("")
},getGroupId:function(c){var e=this.grid.getGridEl().id;
var g=this.getGroupField();
var d=this.cm.findColumnIndex(g);
var h=this.cm.config[d];
var b=h.groupRenderer||h.renderer;
var a=this.getGroup(c,{data:{}},b,0,d,this.ds);
return e+"-gp-"+g+"-"+Ext.util.Format.htmlEncode(c)
},doGroupStart:function(a,c,e,b,d){a[a.length]=this.startGroup.apply(c)
},doGroupEnd:function(a,c,e,b,d){a[a.length]=this.endGroup
},getRows:function(){if(!this.enableGrouping){return Ext.grid.GroupingView.superclass.getRows.call(this)
}var b=[];
var c,g=this.getGroups();
for(var d=0,a=g.length;
d<a;
d++){c=g[d].childNodes[1].childNodes;
for(var e=0,h=c.length;
e<h;
e++){b[b.length]=c[e]
}}return b
},updateGroupWidths:function(){if(!this.enableGrouping||!this.hasRows()){return
}var c=Math.max(this.cm.getTotalWidth(),this.el.dom.offsetWidth-this.scrollOffset)+"px";
var d=this.getGroups();
for(var b=0,a=d.length;
b<a;
b++){d[b].firstChild.style.width=c
}},onColumnWidthUpdated:function(b,a,c){this.updateGroupWidths()
},onAllColumnWidthsUpdated:function(a,b){this.updateGroupWidths()
},onColumnHiddenUpdated:function(c,b,a){this.updateGroupWidths()
},onLayout:function(){this.updateGroupWidths()
},onBeforeRowSelect:function(b,c){if(!this.enableGrouping){return
}var d=this.getRow(c);
if(d&&!d.offsetParent){var a=this.findGroup(d);
this.toggleGroup(a,true)
}},groupByText:"Group By This Field",showGroupsText:"Show in Groups"});
Ext.grid.GroupingView.GROUP_ID=1000;
Ext.grid.HeaderDragZone=function(a,b,c){this.grid=a;
this.view=a.getView();
this.ddGroup="gridHeader"+this.grid.getGridEl().id;
Ext.grid.HeaderDragZone.superclass.constructor.call(this,b);
if(c){this.setHandleElId(Ext.id(b));
this.setOuterHandleElId(Ext.id(c))
}this.scroll=false
};
Ext.extend(Ext.grid.HeaderDragZone,Ext.dd.DragZone,{maxDragWidth:120,getDragData:function(b){var a=Ext.lib.Event.getTarget(b);
var c=this.view.findHeaderCell(a);
if(c){return{ddel:c.firstChild,header:c}
}return false
},onInitDrag:function(a){this.view.headersDisabled=true;
var b=this.dragData.ddel.cloneNode(true);
b.id=Ext.id();
b.style.width=Math.min(this.dragData.header.offsetWidth,this.maxDragWidth)+"px";
this.proxy.update(b);
return true
},afterValidDrop:function(){var a=this.view;
setTimeout(function(){a.headersDisabled=false
},50)
},afterInvalidDrop:function(){var a=this.view;
setTimeout(function(){a.headersDisabled=false
},50)
}});
Ext.grid.HeaderDropZone=function(a,b,c){this.grid=a;
this.view=a.getView();
this.proxyTop=Ext.DomHelper.append(document.body,{cls:"col-move-top",html:"&#160;"},true);
this.proxyBottom=Ext.DomHelper.append(document.body,{cls:"col-move-bottom",html:"&#160;"},true);
this.proxyTop.hide=this.proxyBottom.hide=function(){this.setLeftTop(-100,-100);
this.setStyle("visibility","hidden")
};
this.ddGroup="gridHeader"+this.grid.getGridEl().id;
Ext.grid.HeaderDropZone.superclass.constructor.call(this,a.getGridEl().dom)
};
Ext.extend(Ext.grid.HeaderDropZone,Ext.dd.DropZone,{proxyOffsets:[-4,-9],fly:Ext.Element.fly,getTargetFromEvent:function(b){var a=Ext.lib.Event.getTarget(b);
var c=this.view.findCellIndex(a);
if(c!==false){return this.view.getHeaderCell(c)
}},nextVisible:function(b){var c=this.view,a=this.grid.colModel;
b=b.nextSibling;
while(b){if(!a.isHidden(c.getCellIndex(b))){return b
}b=b.nextSibling
}return null
},prevVisible:function(b){var c=this.view,a=this.grid.colModel;
b=b.prevSibling;
while(b){if(!a.isHidden(c.getCellIndex(b))){return b
}b=b.prevSibling
}return null
},positionIndicator:function(a,c,m){var i=Ext.lib.Event.getPageX(m);
var d=Ext.lib.Dom.getRegion(c.firstChild);
var h,e,k=d.top+this.proxyOffsets[1];
if((d.right-i)<=(d.right-d.left)/2){h=d.right+this.view.borderWidth;
e="after"
}else{h=d.left;
e="before"
}var l=this.view.getCellIndex(a);
var g=this.view.getCellIndex(c);
if(this.grid.colModel.isFixed(g)){return false
}var b=this.grid.colModel.isLocked(g);
if(e=="after"){g++
}if(l<g){g--
}if(l==g&&(b==this.grid.colModel.isLocked(l))){return false
}h+=this.proxyOffsets[0];
this.proxyTop.setLeftTop(h,k);
this.proxyTop.show();
if(!this.bottomOffset){this.bottomOffset=this.view.mainHd.getHeight()
}this.proxyBottom.setLeftTop(h,k+this.proxyTop.dom.offsetHeight+this.bottomOffset);
this.proxyBottom.show();
return e
},onNodeEnter:function(b,a,c,d){if(d.header!=b){this.positionIndicator(d.header,b,c)
}},onNodeOver:function(b,e,c,d){var a=false;
if(d.header!=b){a=this.positionIndicator(d.header,b,c)
}if(!a){this.proxyTop.hide();
this.proxyBottom.hide()
}return a?this.dropAllowed:this.dropNotAllowed
},onNodeOut:function(b,a,c,d){this.proxyTop.hide();
this.proxyBottom.hide()
},onNodeDrop:function(c,g,m,a){var n=a.header;
if(n!=c){var i=this.grid.colModel;
var k=Ext.lib.Event.getPageX(m);
var d=Ext.lib.Dom.getRegion(c.firstChild);
var e=(d.right-k)<=((d.right-d.left)/2)?"after":"before";
var l=this.view.getCellIndex(n);
var h=this.view.getCellIndex(c);
var b=i.isLocked(h);
if(e=="after"){h++
}if(l<h){h--
}if(l==h&&(b==i.isLocked(l))){return false
}i.setLocked(l,b,true);
i.moveColumn(l,h);
this.grid.fireEvent("columnmove",l,h);
return true
}return false
}});
Ext.grid.GridView.ColumnDragZone=function(a,b){Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(this,a,b,null);
this.proxy.el.addClass("x-grid3-col-dd")
};
Ext.extend(Ext.grid.GridView.ColumnDragZone,Ext.grid.HeaderDragZone,{handleMouseDown:function(a){},callHandleMouseDown:function(a){Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this,a)
}});
Ext.grid.SplitDragZone=function(a,b,c){this.grid=a;
this.view=a.getView();
this.proxy=this.view.resizeProxy;
Ext.grid.SplitDragZone.superclass.constructor.call(this,b,"gridSplitters"+this.grid.getGridEl().id,{dragElId:Ext.id(this.proxy.dom),resizeFrame:false});
this.setHandleElId(Ext.id(b));
this.setOuterHandleElId(Ext.id(c));
this.scroll=false
};
Ext.extend(Ext.grid.SplitDragZone,Ext.dd.DDProxy,{fly:Ext.Element.fly,b4StartDrag:function(a,b){this.view.headersDisabled=true;
this.proxy.setHeight(this.view.mainWrap.getHeight());
var d=this.cm.getColumnWidth(this.cellIndex);
var c=Math.max(d-this.grid.minColumnWidth,0);
this.resetConstraints();
this.setXConstraint(c,1000);
this.setYConstraint(0,0);
this.minX=a-c;
this.maxX=a+1000;
this.startPos=a;
Ext.dd.DDProxy.prototype.b4StartDrag.call(this,a,b)
},handleMouseDown:function(b){ev=Ext.EventObject.setEvent(b);
var a=this.fly(ev.getTarget());
if(a.hasClass("x-grid-split")){this.cellIndex=this.view.getCellIndex(a.dom);
this.split=a.dom;
this.cm=this.grid.colModel;
if(this.cm.isResizable(this.cellIndex)&&!this.cm.isFixed(this.cellIndex)){Ext.grid.SplitDragZone.superclass.handleMouseDown.apply(this,arguments)
}}},endDrag:function(b){this.view.headersDisabled=false;
var a=Math.max(this.minX,Ext.lib.Event.getPageX(b));
var c=a-this.startPos;
this.view.onColumnSplitterMoved(this.cellIndex,this.cm.getColumnWidth(this.cellIndex)+c)
},autoOffset:function(){this.setDelta(0,0)
}});
Ext.grid.GridDragZone=function(b,a){this.view=b.getView();
Ext.grid.GridDragZone.superclass.constructor.call(this,this.view.mainBody.dom,a);
if(this.view.lockedBody){this.setHandleElId(Ext.id(this.view.mainBody.dom));
this.setOuterHandleElId(Ext.id(this.view.lockedBody.dom))
}this.scroll=false;
this.grid=b;
this.ddel=document.createElement("div");
this.ddel.className="x-grid-dd-wrap"
};
Ext.extend(Ext.grid.GridDragZone,Ext.dd.DragZone,{ddGroup:"GridDD",getDragData:function(d){var a=Ext.lib.Event.getTarget(d);
var b=this.view.findRowIndex(a);
if(b!==false){var c=this.grid.selModel;
if(!c.isSelected(b)||d.hasModifier()){c.handleMouseDown(this.grid,b,d)
}return{grid:this.grid,ddel:this.ddel,rowIndex:b,selections:c.getSelections()}
}return false
},onInitDrag:function(b){var a=this.dragData;
this.ddel.innerHTML=this.grid.getDragDropText();
this.proxy.update(this.ddel)
},afterRepair:function(){this.dragging=false
},getRepairXY:function(b,a){return false
},onEndDrag:function(a,b){},onValidDrop:function(a,c,b){this.hideProxy()
},beforeInvalidDrop:function(a,b){}});
Ext.grid.ColumnModel=function(a){this.defaultWidth=100;
this.defaultSortable=false;
if(a.columns){Ext.apply(this,a);
this.setConfig(a.columns,true)
}else{this.setConfig(a,true)
}this.addEvents("widthchange","headerchange","hiddenchange","columnmoved","columnlockchange","configchange");
Ext.grid.ColumnModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.ColumnModel,Ext.util.Observable,{getColumnId:function(a){return this.config[a].id
},setConfig:function(d,e){if(!e){delete this.totalWidth;
for(var c=0,a=this.config.length;
c<a;
c++){var b=this.config[c];
if(b.editor){b.editor.destroy()
}}}this.config=d;
this.lookup={};
for(var c=0,a=d.length;
c<a;
c++){var b=d[c];
if(typeof b.renderer=="string"){b.renderer=Ext.util.Format[b.renderer]
}if(typeof b.id=="undefined"){b.id=c
}if(b.editor&&b.editor.isFormField){b.editor=new Ext.grid.GridEditor(b.editor)
}this.lookup[b.id]=b
}if(!e){this.fireEvent("configchange",this)
}},getColumnById:function(a){return this.lookup[a]
},getIndexById:function(b){for(var c=0,a=this.config.length;
c<a;
c++){if(this.config[c].id==b){return c
}}return -1
},moveColumn:function(b,a){var c=this.config[b];
this.config.splice(b,1);
this.config.splice(a,0,c);
this.dataMap=null;
this.fireEvent("columnmoved",this,b,a)
},isLocked:function(a){return this.config[a].locked===true
},setLocked:function(c,b,a){if(this.isLocked(c)==b){return
}this.config[c].locked=b;
if(!a){this.fireEvent("columnlockchange",this,c,b)
}},getTotalLockedWidth:function(){var a=0;
for(var b=0;
b<this.config.length;
b++){if(this.isLocked(b)&&!this.isHidden(b)){this.totalWidth+=this.getColumnWidth(b)
}}return a
},getLockedCount:function(){for(var b=0,a=this.config.length;
b<a;
b++){if(!this.isLocked(b)){return b
}}},getColumnCount:function(c){if(c===true){var b=0;
for(var d=0,a=this.config.length;
d<a;
d++){if(!this.isHidden(d)){b++
}}return b
}return this.config.length
},getColumnsBy:function(d,e){var c=[];
for(var g=0,a=this.config.length;
g<a;
g++){var b=this.config[g];
if(d.call(e||this,b,g)===true){c[c.length]=b
}}return c
},isSortable:function(a){if(typeof this.config[a].sortable=="undefined"){return this.defaultSortable
}return this.config[a].sortable
},isMenuDisabled:function(a){return !!this.config[a].menuDisabled
},getRenderer:function(a){if(!this.config[a].renderer){return Ext.grid.ColumnModel.defaultRenderer
}return this.config[a].renderer
},setRenderer:function(a,b){this.config[a].renderer=b
},getColumnWidth:function(a){return this.config[a].width||this.defaultWidth
},setColumnWidth:function(c,b,a){this.config[c].width=b;
this.totalWidth=null;
if(!a){this.fireEvent("widthchange",this,c,b)
}},getTotalWidth:function(c){if(!this.totalWidth){this.totalWidth=0;
for(var b=0,a=this.config.length;
b<a;
b++){if(c||!this.isHidden(b)){this.totalWidth+=this.getColumnWidth(b)
}}}return this.totalWidth
},getColumnHeader:function(a){return this.config[a].header
},setColumnHeader:function(a,b){this.config[a].header=b;
this.fireEvent("headerchange",this,a,b)
},getColumnTooltip:function(a){return this.config[a].tooltip
},setColumnTooltip:function(a,b){this.config[a].tooltip=b
},getDataIndex:function(a){return this.config[a].dataIndex
},setDataIndex:function(a,b){this.config[a].dataIndex=b
},findColumnIndex:function(c){var b=this.config;
for(var d=0,a=b.length;
d<a;
d++){if(b[d].dataIndex==c){return d
}}return -1
},isCellEditable:function(a,b){return(this.config[a].editable||(typeof this.config[a].editable=="undefined"&&this.config[a].editor))?true:false
},getCellEditor:function(a,b){return this.config[a].editor
},setEditable:function(a,b){this.config[a].editable=b
},isHidden:function(a){return this.config[a].hidden
},isFixed:function(a){return this.config[a].fixed
},isResizable:function(a){return a>=0&&this.config[a].resizable!==false&&this.config[a].fixed!==true
},setHidden:function(a,c){var b=this.config[a];
if(b.hidden!==c){b.hidden=c;
this.totalWidth=null;
this.fireEvent("hiddenchange",this,a,c)
}},setEditor:function(a,b){this.config[a].editor=b
}});
Ext.grid.ColumnModel.defaultRenderer=function(a){if(typeof a=="string"&&a.length<1){return"&#160;"
}return a
};
Ext.grid.DefaultColumnModel=Ext.grid.ColumnModel;
Ext.grid.AbstractSelectionModel=function(){this.locked=false;
Ext.grid.AbstractSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.AbstractSelectionModel,Ext.util.Observable,{init:function(a){this.grid=a;
this.initEvents()
},lock:function(){this.locked=true
},unlock:function(){this.locked=false
},isLocked:function(){return this.locked
}});
Ext.grid.RowSelectionModel=function(a){Ext.apply(this,a);
this.selections=new Ext.util.MixedCollection(false,function(b){return b.id
});
this.last=false;
this.lastActive=false;
this.addEvents("selectionchange","beforerowselect","rowselect","rowdeselect");
Ext.grid.RowSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.RowSelectionModel,Ext.grid.AbstractSelectionModel,{singleSelect:false,initEvents:function(){if(!this.grid.enableDragDrop&&!this.grid.enableDrag){this.grid.on("rowmousedown",this.handleMouseDown,this)
}else{this.grid.on("rowclick",function(d,b,c){if(c.button===0&&!c.shiftKey&&!c.ctrlKey){this.selectRow(b,false);
d.view.focusRow(b)
}},this)
}this.rowNav=new Ext.KeyNav(this.grid.getGridEl(),{up:function(b){if(!b.shiftKey){this.selectPrevious(b.shiftKey)
}else{if(this.last!==false&&this.lastActive!==false){var c=this.last;
this.selectRange(this.last,this.lastActive-1);
this.grid.getView().focusRow(this.lastActive);
if(c!==false){this.last=c
}}else{this.selectFirstRow()
}}},down:function(b){if(!b.shiftKey){this.selectNext(b.shiftKey)
}else{if(this.last!==false&&this.lastActive!==false){var c=this.last;
this.selectRange(this.last,this.lastActive+1);
this.grid.getView().focusRow(this.lastActive);
if(c!==false){this.last=c
}}else{this.selectFirstRow()
}}},scope:this});
var a=this.grid.view;
a.on("refresh",this.onRefresh,this);
a.on("rowupdated",this.onRowUpdated,this);
a.on("rowremoved",this.onRemove,this)
},onRefresh:function(){var b=this.grid.store,g;
var d=this.getSelections();
this.clearSelections(true);
for(var e=0,a=d.length;
e<a;
e++){var c=d[e];
if((g=b.indexOfId(c.id))!=-1){this.selectRow(g,true)
}}if(d.length!=this.selections.getCount()){this.fireEvent("selectionchange",this)
}},onRemove:function(a,c,b){if(this.selections.remove(b)!==false){this.fireEvent("selectionchange",this)
}},onRowUpdated:function(a,c,b){if(this.isSelected(b)){a.onRowSelect(c)
}},selectRecords:function(e,b){if(!b){this.clearSelections()
}var c=this.grid.store;
for(var d=0,a=e.length;
d<a;
d++){this.selectRow(c.indexOf(e[d]),true)
}},getCount:function(){return this.selections.length
},selectFirstRow:function(){this.selectRow(0)
},selectLastRow:function(a){this.selectRow(this.grid.store.getCount()-1,a)
},selectNext:function(a){if(this.hasNext()){this.selectRow(this.last+1,a);
this.grid.getView().focusRow(this.last);
return true
}return false
},selectPrevious:function(a){if(this.hasPrevious()){this.selectRow(this.last-1,a);
this.grid.getView().focusRow(this.last);
return true
}return false
},hasNext:function(){return this.last!==false&&(this.last+1)<this.grid.store.getCount()
},hasPrevious:function(){return !!this.last
},getSelections:function(){return[].concat(this.selections.items)
},getSelected:function(){return this.selections.itemAt(0)
},each:function(b,c){var d=this.getSelections();
for(var e=0,a=d.length;
e<a;
e++){if(b.call(c||this,d[e],e)===false){return false
}}return true
},clearSelections:function(a){if(this.locked){return
}if(a!==true){var b=this.grid.store;
var c=this.selections;
c.each(function(d){this.deselectRow(b.indexOfId(d.id))
},this);
c.clear()
}else{this.selections.clear()
}this.last=false
},selectAll:function(){if(this.locked){return
}this.selections.clear();
for(var b=0,a=this.grid.store.getCount();
b<a;
b++){this.selectRow(b,true)
}},hasSelection:function(){return this.selections.length>0
},isSelected:function(a){var b=typeof a=="number"?this.grid.store.getAt(a):a;
return(b&&this.selections.key(b.id)?true:false)
},isIdSelected:function(a){return(this.selections.key(a)?true:false)
},handleMouseDown:function(d,b,c){if(c.button!==0||this.isLocked()){return
}var a=this.grid.getView();
if(c.shiftKey&&this.last!==false){var e=this.last;
this.selectRange(e,b,c.ctrlKey);
this.last=e;
a.focusRow(b)
}else{var g=this.isSelected(b);
if(c.ctrlKey&&g){this.deselectRow(b)
}else{if(!g||this.getCount()>1){this.selectRow(b,c.ctrlKey||c.shiftKey);
a.focusRow(b)
}}}},selectRows:function(c,b){if(!b){this.clearSelections()
}for(var d=0,a=c.length;
d<a;
d++){this.selectRow(c[d],true)
}},selectRange:function(d,a,b){if(this.locked){return
}if(!b){this.clearSelections()
}if(d<=a){for(var c=d;
c<=a;
c++){this.selectRow(c,true)
}}else{for(var c=d;
c>=a;
c--){this.selectRow(c,true)
}}},deselectRange:function(c,d,a){if(this.locked){return
}for(var b=c;
b<=d;
b++){this.deselectRow(b,a)
}},selectRow:function(d,b,a){if(this.locked||(d<0||d>=this.grid.store.getCount())){return
}var c=this.grid.store.getAt(d);
if(c&&this.fireEvent("beforerowselect",this,d,b,c)!==false){if(!b||this.singleSelect){this.clearSelections()
}this.selections.add(c);
this.last=this.lastActive=d;
if(!a){this.grid.getView().onRowSelect(d)
}this.fireEvent("rowselect",this,d,c);
this.fireEvent("selectionchange",this)
}},deselectRow:function(c,a){if(this.locked){return
}if(this.last==c){this.last=false
}if(this.lastActive==c){this.lastActive=false
}var b=this.grid.store.getAt(c);
if(b){this.selections.remove(b);
if(!a){this.grid.getView().onRowDeselect(c)
}this.fireEvent("rowdeselect",this,c,b);
this.fireEvent("selectionchange",this)
}},restoreLast:function(){if(this._last){this.last=this._last
}},acceptsNav:function(b,c,a){return !a.isHidden(c)&&a.isCellEditable(c,b)
},onEditorKey:function(c,d){var g=d.getKey(),b,e=this.grid,h=e.activeEditor;
var a=d.shiftKey;
if(g==d.TAB){d.stopEvent();
h.completeEdit();
if(a){b=e.walkCells(h.row,h.col-1,-1,this.acceptsNav,this)
}else{b=e.walkCells(h.row,h.col+1,1,this.acceptsNav,this)
}}else{if(g==d.ENTER){d.stopEvent();
h.completeEdit();
if(this.moveEditorOnEnter!==false){if(a){b=e.walkCells(h.row-1,h.col,-1,this.acceptsNav,this)
}else{b=e.walkCells(h.row+1,h.col,1,this.acceptsNav,this)
}}}else{if(g==d.ESC){h.cancelEdit()
}}}if(b){e.startEditing(b[0],b[1])
}}});
Ext.grid.CellSelectionModel=function(a){Ext.apply(this,a);
this.selection=null;
this.addEvents("beforecellselect","cellselect","selectionchange");
Ext.grid.CellSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.CellSelectionModel,Ext.grid.AbstractSelectionModel,{initEvents:function(){this.grid.on("cellmousedown",this.handleMouseDown,this);
this.grid.getGridEl().on(Ext.isIE?"keydown":"keypress",this.handleKeyDown,this);
var a=this.grid.view;
a.on("refresh",this.onViewChange,this);
a.on("rowupdated",this.onRowUpdated,this);
a.on("beforerowremoved",this.clearSelections,this);
a.on("beforerowsinserted",this.clearSelections,this);
if(this.grid.isEditor){this.grid.on("beforeedit",this.beforeEdit,this)
}},beforeEdit:function(a){this.select(a.row,a.column,false,true,a.record)
},onRowUpdated:function(a,c,b){if(this.selection&&this.selection.record==b){a.onCellSelect(c,this.selection.cell[1])
}},onViewChange:function(){this.clearSelections(true)
},getSelectedCell:function(){return this.selection?this.selection.cell:null
},clearSelections:function(b){var a=this.selection;
if(a){if(b!==true){this.grid.view.onCellDeselect(a.cell[0],a.cell[1])
}this.selection=null;
this.fireEvent("selectionchange",this,null)
}},hasSelection:function(){return this.selection?true:false
},handleMouseDown:function(d,b,a,c){if(c.button!==0||this.isLocked()){return
}this.select(b,a)
},select:function(b,e,g,c,d){if(this.fireEvent("beforecellselect",this,b,e)!==false){this.clearSelections();
d=d||this.grid.store.getAt(b);
this.selection={record:d,cell:[b,e]};
if(!g){var a=this.grid.getView();
a.onCellSelect(b,e);
if(c!==true){a.focusCell(b,e)
}}this.fireEvent("cellselect",this,b,e);
this.fireEvent("selectionchange",this,this.selection)
}},isSelectable:function(b,c,a){return !a.isHidden(c)
},handleKeyDown:function(k){if(!k.isNavKeyPress()){return
}var l=this.grid,e=this.selection;
if(!e){k.stopEvent();
var g=l.walkCells(0,0,1,this.isSelectable,this);
if(g){this.select(g[0],g[1])
}return
}var c=this;
var h=function(o,n,m){return l.walkCells(o,n,m,c.isSelectable,c)
};
var b=k.getKey(),d=e.cell[0],i=e.cell[1];
var a;
switch(b){case k.TAB:if(k.shiftKey){a=h(d,i-1,-1)
}else{a=h(d,i+1,1)
}break;
case k.DOWN:a=h(d+1,i,1);
break;
case k.UP:a=h(d-1,i,-1);
break;
case k.RIGHT:a=h(d,i+1,1);
break;
case k.LEFT:a=h(d,i-1,-1);
break;
case k.ENTER:if(l.isEditor&&!l.editing){l.startEditing(d,i);
k.stopEvent();
return
}break
}if(a){this.select(a[0],a[1]);
k.stopEvent()
}},acceptsNav:function(b,c,a){return !a.isHidden(c)&&a.isCellEditable(c,b)
},onEditorKey:function(c,d){var g=d.getKey(),b,e=this.grid,a=e.activeEditor;
if(g==d.TAB){if(d.shiftKey){b=e.walkCells(a.row,a.col-1,-1,this.acceptsNav,this)
}else{b=e.walkCells(a.row,a.col+1,1,this.acceptsNav,this)
}d.stopEvent()
}else{if(g==d.ENTER){a.completeEdit();
d.stopEvent()
}else{if(g==d.ESC){d.stopEvent();
a.cancelEdit()
}}}if(b){e.startEditing(b[0],b[1])
}}});
Ext.grid.EditorGridPanel=Ext.extend(Ext.grid.GridPanel,{clicksToEdit:2,isEditor:true,detectEdit:false,autoEncode:false,trackMouseOver:false,initComponent:function(){Ext.grid.EditorGridPanel.superclass.initComponent.call(this);
if(!this.selModel){this.selModel=new Ext.grid.CellSelectionModel()
}this.activeEditor=null;
this.addEvents("beforeedit","afteredit","validateedit")
},initEvents:function(){Ext.grid.EditorGridPanel.superclass.initEvents.call(this);
this.on("bodyscroll",this.stopEditing,this,[true]);
if(this.clicksToEdit==1){this.on("cellclick",this.onCellDblClick,this)
}else{if(this.clicksToEdit=="auto"&&this.view.mainBody){this.view.mainBody.on("mousedown",this.onAutoEditClick,this)
}this.on("celldblclick",this.onCellDblClick,this)
}this.getGridEl().addClass("xedit-grid")
},onCellDblClick:function(c,b,a){this.startEditing(b,a)
},onAutoEditClick:function(d,e){if(d.button!==0){return
}var b=this.view.findRowIndex(e);
var a=this.view.findCellIndex(e);
if(b!==false&&a!==false){this.stopEditing();
if(this.selModel.getSelectedCell){var c=this.selModel.getSelectedCell();
if(c&&c.cell[0]===b&&c.cell[1]===a){this.startEditing(b,a)
}}else{if(this.selModel.isSelected(b)){this.startEditing(b,a)
}}}},onEditComplete:function(g,d,a){this.editing=false;
this.activeEditor=null;
g.un("specialkey",this.selModel.onEditorKey,this.selModel);
var e=g.record;
var b=this.colModel.getDataIndex(g.col);
d=this.postEditValue(d,a,e,b);
if(String(d)!==String(a)){var c={grid:this,record:e,field:b,originalValue:a,value:d,row:g.row,column:g.col,cancel:false};
if(this.fireEvent("validateedit",c)!==false&&!c.cancel){e.set(b,c.value);
delete c.cancel;
this.fireEvent("afteredit",c)
}}this.view.focusCell(g.row,g.col)
},startEditing:function(b,g){this.stopEditing();
if(this.colModel.isCellEditable(g,b)){this.view.ensureVisible(b,g,true);
var e=this.store.getAt(b);
var c=this.colModel.getDataIndex(g);
var d={grid:this,record:e,field:c,value:e.data[c],row:b,column:g,cancel:false};
if(this.fireEvent("beforeedit",d)!==false&&!d.cancel){this.editing=true;
var a=this.colModel.getCellEditor(g,b);
if(!a.rendered){a.render(this.view.getEditorParent(a))
}(function(){a.row=b;
a.col=g;
a.record=e;
a.on("complete",this.onEditComplete,this,{single:true});
a.on("specialkey",this.selModel.onEditorKey,this.selModel);
this.activeEditor=a;
var h=this.preEditValue(e,c);
a.startEdit(this.view.getCell(b,g),h)
}).defer(50,this)
}}},preEditValue:function(a,b){return this.autoEncode&&typeof value=="string"?Ext.util.Format.htmlDecode(a.data[b]):a.data[b]
},postEditValue:function(c,a,d,b){return this.autoEncode&&typeof c=="string"?Ext.util.Format.htmlEncode(c):c
},stopEditing:function(a){if(this.activeEditor){this.activeEditor[a===true?"cancelEdit":"completeEdit"]()
}this.activeEditor=null
}});
Ext.reg("editorgrid",Ext.grid.EditorGridPanel);
Ext.grid.GridEditor=function(b,a){Ext.grid.GridEditor.superclass.constructor.call(this,b,a);
b.monitorTab=false
};
Ext.extend(Ext.grid.GridEditor,Ext.Editor,{alignment:"tl-tl",autoSize:"width",hideEl:false,cls:"x-small-editor x-grid-editor",shim:false,shadow:false});
Ext.grid.PropertyRecord=Ext.data.Record.create([{name:"name",type:"string"},"value"]);
Ext.grid.PropertyStore=function(a,b){this.grid=a;
this.store=new Ext.data.Store({recordType:Ext.grid.PropertyRecord});
this.store.on("update",this.onUpdate,this);
if(b){this.setSource(b)
}Ext.grid.PropertyStore.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.PropertyStore,Ext.util.Observable,{setSource:function(b){this.source=b;
this.store.removeAll();
var c=[];
for(var a in b){if(this.isEditableValue(b[a])){c.push(new Ext.grid.PropertyRecord({name:a,value:b[a]},a))
}}this.store.loadRecords({records:c},{},true)
},onUpdate:function(b,a,c){if(c==Ext.data.Record.EDIT){var e=a.data.value;
var d=a.modified.value;
if(this.grid.fireEvent("beforepropertychange",this.source,a.id,e,d)!==false){this.source[a.id]=e;
a.commit();
this.grid.fireEvent("propertychange",this.source,a.id,e,d)
}else{a.reject()
}}},getProperty:function(a){return this.store.getAt(a)
},isEditableValue:function(a){if(Ext.isDate(a)){return true
}else{if(typeof a=="object"||typeof a=="function"){return false
}}return true
},setValue:function(b,a){this.source[b]=a;
this.store.getById(b).set("value",a)
},getSource:function(){return this.source
}});
Ext.grid.PropertyColumnModel=function(d,e){this.grid=d;
var c=Ext.grid;
c.PropertyColumnModel.superclass.constructor.call(this,[{header:this.nameText,width:50,sortable:true,dataIndex:"name",id:"name",menuDisabled:true},{header:this.valueText,width:50,resizable:false,dataIndex:"value",id:"value",menuDisabled:true}]);
this.store=e;
this.bselect=Ext.DomHelper.append(document.body,{tag:"select",cls:"x-grid-editor x-hide-display",children:[{tag:"option",value:"true",html:"true"},{tag:"option",value:"false",html:"false"}]});
var b=Ext.form;
var a=new b.Field({el:this.bselect,bselect:this.bselect,autoShow:true,getValue:function(){return this.bselect.value=="true"
}});
this.editors={date:new c.GridEditor(new b.DateField({selectOnFocus:true})),string:new c.GridEditor(new b.TextField({selectOnFocus:true})),number:new c.GridEditor(new b.NumberField({selectOnFocus:true,style:"text-align:left;"})),"boolean":new c.GridEditor(a)};
this.renderCellDelegate=this.renderCell.createDelegate(this);
this.renderPropDelegate=this.renderProp.createDelegate(this)
};
Ext.extend(Ext.grid.PropertyColumnModel,Ext.grid.ColumnModel,{nameText:"Name",valueText:"Value",dateFormat:"m/j/Y",renderDate:function(a){return a.dateFormat(this.dateFormat)
},renderBool:function(a){return a?"true":"false"
},isCellEditable:function(a,b){return a==1
},getRenderer:function(a){return a==1?this.renderCellDelegate:this.renderPropDelegate
},renderProp:function(a){return this.getPropertyName(a)
},renderCell:function(a){var b=a;
if(Ext.isDate(a)){b=this.renderDate(a)
}else{if(typeof a=="boolean"){b=this.renderBool(a)
}}return Ext.util.Format.htmlEncode(b)
},getPropertyName:function(b){var a=this.grid.propertyNames;
return a&&a[b]?a[b]:b
},getCellEditor:function(a,b){var e=this.store.getProperty(b);
var c=e.data.name,d=e.data.value;
if(this.grid.customEditors[c]){return this.grid.customEditors[c]
}if(Ext.isDate(d)){return this.editors.date
}else{if(typeof d=="number"){return this.editors.number
}else{if(typeof d=="boolean"){return this.editors["boolean"]
}else{return this.editors.string
}}}}});
Ext.grid.PropertyGrid=Ext.extend(Ext.grid.EditorGridPanel,{enableColumnMove:false,stripeRows:false,trackMouseOver:false,clicksToEdit:1,enableHdMenu:false,viewConfig:{forceFit:true},initComponent:function(){this.customEditors=this.customEditors||{};
this.lastEditRow=null;
var b=new Ext.grid.PropertyStore(this);
this.propStore=b;
var a=new Ext.grid.PropertyColumnModel(this,b);
b.store.sort("name","ASC");
this.addEvents("beforepropertychange","propertychange");
this.cm=a;
this.ds=b.store;
Ext.grid.PropertyGrid.superclass.initComponent.call(this);
this.selModel.on("beforecellselect",function(c,d,e){if(e===0){this.startEditing.defer(200,this,[d,1]);
return false
}},this)
},onRender:function(){Ext.grid.PropertyGrid.superclass.onRender.apply(this,arguments);
this.getGridEl().addClass("x-props-grid")
},afterRender:function(){Ext.grid.PropertyGrid.superclass.afterRender.apply(this,arguments);
if(this.source){this.setSource(this.source)
}},setSource:function(a){this.propStore.setSource(a)
},getSource:function(){return this.propStore.getSource()
}});
Ext.grid.RowNumberer=function(a){Ext.apply(this,a);
if(this.rowspan){this.renderer=this.renderer.createDelegate(this)
}};
Ext.grid.RowNumberer.prototype={header:"",width:23,sortable:false,fixed:true,menuDisabled:true,dataIndex:"",id:"numberer",rowspan:undefined,renderer:function(d,c,a,b){if(this.rowspan){c.cellAttr='rowspan="'+this.rowspan+'"'
}return b+1
}};
Ext.grid.CheckboxSelectionModel=Ext.extend(Ext.grid.RowSelectionModel,{header:'<div class="x-grid3-hd-checker">&#160;</div>',width:20,sortable:false,menuDisabled:true,fixed:true,dataIndex:"",id:"checker",initEvents:function(){Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this);
this.grid.on("render",function(){var a=this.grid.getView();
a.mainBody.on("mousedown",this.onMouseDown,this);
Ext.fly(a.innerHd).on("mousedown",this.onHdMouseDown,this)
},this)
},onMouseDown:function(c,d){if(c.button===0&&d.className=="x-grid3-row-checker"){c.stopEvent();
var b=c.getTarget(".x-grid3-row");
if(b){var a=b.rowIndex;
if(this.isSelected(a)){this.deselectRow(a)
}else{this.selectRow(a,true)
}}}},onHdMouseDown:function(c,a){if(a.className=="x-grid3-hd-checker"){c.stopEvent();
var d=Ext.fly(a.parentNode);
var b=d.hasClass("x-grid3-hd-checker-on");
if(b){d.removeClass("x-grid3-hd-checker-on");
this.clearSelections()
}else{d.addClass("x-grid3-hd-checker-on");
this.selectAll()
}}},renderer:function(c,b,a){return'<div class="x-grid3-row-checker">&#160;</div>'
}});
Ext.LoadMask=function(b,c){this.el=Ext.get(b);
Ext.apply(this,c);
if(this.store){this.store.on("beforeload",this.onBeforeLoad,this);
this.store.on("load",this.onLoad,this);
this.store.on("loadexception",this.onLoad,this);
this.removeMask=Ext.value(this.removeMask,false)
}else{var a=this.el.getUpdater();
a.showLoadIndicator=false;
a.on("beforeupdate",this.onBeforeLoad,this);
a.on("update",this.onLoad,this);
a.on("failure",this.onLoad,this);
this.removeMask=Ext.value(this.removeMask,true)
}};
Ext.LoadMask.prototype={msg:"Loading...",msgCls:"x-mask-loading",disabled:false,disable:function(){this.disabled=true
},enable:function(){this.disabled=false
},onLoad:function(){this.el.unmask(this.removeMask)
},onBeforeLoad:function(){if(!this.disabled){this.el.mask(this.msg,this.msgCls)
}},show:function(){this.onBeforeLoad()
},hide:function(){this.onLoad()
},destroy:function(){if(this.store){this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("loadexception",this.onLoad,this)
}else{var a=this.el.getUpdater();
a.un("beforeupdate",this.onBeforeLoad,this);
a.un("update",this.onLoad,this);
a.un("failure",this.onLoad,this)
}}};
Ext.ProgressBar=Ext.extend(Ext.BoxComponent,{baseCls:"x-progress",waitTimer:null,initComponent:function(){Ext.ProgressBar.superclass.initComponent.call(this);
this.addEvents("update")
},onRender:function(c,a){Ext.ProgressBar.superclass.onRender.call(this,c,a);
var d=new Ext.Template('<div class="{cls}-wrap">','<div class="{cls}-inner">','<div class="{cls}-bar">','<div class="{cls}-text">',"<div>&#160;</div>","</div>","</div>",'<div class="{cls}-text {cls}-text-back">',"<div>&#160;</div>","</div>","</div>","</div>");
if(a){this.el=d.insertBefore(a,{cls:this.baseCls},true)
}else{this.el=d.append(c,{cls:this.baseCls},true)
}if(this.id){this.el.dom.id=this.id
}var e=this.el.dom.firstChild;
this.progressBar=Ext.get(e.firstChild);
if(this.textEl){this.textEl=Ext.get(this.textEl);
delete this.textTopEl
}else{this.textTopEl=Ext.get(this.progressBar.dom.firstChild);
var b=Ext.get(e.childNodes[1]);
this.textTopEl.setStyle("z-index",99).addClass("x-hidden");
this.textEl=new Ext.CompositeElement([this.textTopEl.dom.firstChild,b.dom.firstChild]);
this.textEl.setWidth(e.offsetWidth)
}if(this.value){this.updateProgress(this.value,this.text)
}else{this.updateText(this.text)
}this.setSize(this.width||"auto","auto");
this.progressBar.setHeight(e.offsetHeight)
},updateProgress:function(c,b){this.value=c||0;
if(b){this.updateText(b)
}var a=Math.floor(c*this.el.dom.firstChild.offsetWidth);
this.progressBar.setWidth(a);
if(this.textTopEl){this.textTopEl.removeClass("x-hidden").setWidth(a)
}this.fireEvent("update",this,c,b);
return this
},wait:function(b){if(!this.waitTimer){var a=this;
b=b||{};
this.waitTimer=Ext.TaskMgr.start({run:function(d){var c=b.increment||10;
this.updateProgress(((((d+c)%c)+1)*(100/c))*0.01)
},interval:b.interval||1000,duration:b.duration,onStop:function(){if(b.fn){b.fn.apply(b.scope||this)
}this.reset()
},scope:a})
}return this
},isWaiting:function(){return this.waitTimer!=null
},updateText:function(a){this.text=a||"&#160;";
this.textEl.update(this.text);
return this
},setSize:function(a,b){Ext.ProgressBar.superclass.setSize.call(this,a,b);
if(this.textTopEl){var c=this.el.dom.firstChild;
this.textEl.setSize(c.offsetWidth,c.offsetHeight)
}return this
},reset:function(a){this.updateProgress(0);
if(this.textTopEl){this.textTopEl.addClass("x-hidden")
}if(this.waitTimer){this.waitTimer.onStop=null;
Ext.TaskMgr.stop(this.waitTimer);
this.waitTimer=null
}if(a===true){this.hide()
}return this
}});
Ext.reg("progress",Ext.ProgressBar);