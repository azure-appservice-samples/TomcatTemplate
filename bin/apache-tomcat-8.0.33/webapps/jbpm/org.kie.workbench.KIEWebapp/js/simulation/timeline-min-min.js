(function(){var a=false,b=/xyz/.test(function(){xyz
})?/\b_super\b/:/.*/;
this.Class=function(){};
Class.extend=function(g){var f=this.prototype;
a=true;
var e=new this();
a=false;
for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;
this._super=f[h];
var j=i.apply(this,arguments);
this._super=k;
return j
}
})(d,g[d]):g[d]
}function c(){if(!a&&this.init){this.init.apply(this,arguments)
}}c.prototype=e;
c.prototype.constructor=c;
c.extend=arguments.callee;
return c
}
})();
var global=(function(){return this||(1,eval)("this")
}());
if(typeof VMM=="undefined"){var VMM=Class.extend({});
VMM.debug=true;
VMM.master_config=({init:function(){return this
},sizes:{api:{width:0,height:0}},vp:"Pellentesque nibh felis, eleifend id, commodo in, interdum vitae, leo",api_keys_master:{flickr:"",google:"",twitter:""},timers:{api:7000},api:{pushques:[]},twitter:{active:false,array:[],api_loaded:false,que:[]},flickr:{active:false,array:[],api_loaded:false,que:[]},youtube:{active:false,array:[],api_loaded:false,que:[]},vimeo:{active:false,array:[],api_loaded:false,que:[]},googlemaps:{active:false,map_active:false,places_active:false,array:[],api_loaded:false,que:[]},googledocs:{active:false,array:[],api_loaded:false,que:[]},googleplus:{active:false,array:[],api_loaded:false,que:[]},wikipedia:{active:false,array:[],api_loaded:false,que:[],tries:0},soundcloud:{active:false,array:[],api_loaded:false,que:[]}}).init();
VMM.createElement=function(b,e,a,c,d){var f="";
if(b!=null&&b!=""){f+="<"+b;
if(a!=null&&a!=""){f+=" class='"+a+"'"
}if(c!=null&&c!=""){f+=" "+c
}if(d!=null&&d!=""){f+=" style='"+d+"'"
}f+=">";
if(e!=null&&e!=""){f+=e
}f=f+"</"+b+">"
}return f
};
VMM.createMediaElement=function(d,b,e){var c="";
var a=false;
c+="<div class='media'>";
if(d!=null&&d!=""){valid=true;
c+="<img src='"+d+"'>";
if(e!=null&&e!=""){c+=VMM.createElement("div",e,"credit")
}if(b!=null&&b!=""){c+=VMM.createElement("div",b,"caption")
}}c+="</div>";
return c
};
VMM.hideUrlBar=function(){var d=window,c=d.document;
if(!location.hash||!d.addEventListener){window.scrollTo(0,1);
var b=1,a=setInterval(function(){if(c.body){clearInterval(a);
b="scrollTop" in c.body?c.body.scrollTop:1;
d.scrollTo(0,b===1?0:1)
}},15);
d.addEventListener("load",function(){setTimeout(function(){d.scrollTo(0,b===1?0:1)
},0)
},false)
}}
}function trace(a){if(VMM.debug){if(window.console){console.log(a)
}else{if(typeof(jsTrace)!="undefined"){jsTrace.send(a)
}else{}}}}Array.prototype.remove=function(c,b){var a=this.slice((b||c)+1||this.length);
this.length=c<0?this.length+c:c;
return this.push.apply(this,a)
};
Date.prototype.getWeek=function(){var a=new Date(this.getFullYear(),0,1);
return Math.ceil((((this-a)/86400000)+a.getDay()+1)/7)
};
Date.prototype.getDayOfYear=function(){var a=new Date(this.getFullYear(),0,1);
return Math.ceil((this-a)/86400000)
};
var is={Null:function(b){return b===null
},Undefined:function(b){return b===undefined
},nt:function(b){return(b===null||b===undefined)
},Function:function(b){return(typeof(b)==="function")?b.constructor.toString().match(/Function/)!==null:false
},String:function(b){return(typeof(b)==="string")?true:(typeof(b)==="object")?b.constructor.toString().match(/string/i)!==null:false
},Array:function(b){return(typeof(b)==="object")?b.constructor.toString().match(/array/i)!==null||b.length!==undefined:false
},Boolean:function(b){return(typeof(b)==="boolean")?true:(typeof(b)==="object")?b.constructor.toString().match(/boolean/i)!==null:false
},Date:function(b){return(typeof(b)==="date")?true:(typeof(b)==="object")?b.constructor.toString().match(/date/i)!==null:false
},HTML:function(b){return(typeof(b)==="object")?b.constructor.toString().match(/html/i)!==null:false
},Number:function(b){return(typeof(b)==="number")?true:(typeof(b)==="object")?b.constructor.toString().match(/Number/)!==null:false
},Object:function(b){return(typeof(b)==="object")?b.constructor.toString().match(/object/i)!==null:false
},RegExp:function(b){return(typeof(b)==="function")?b.constructor.toString().match(/regexp/i)!==null:false
}};
var type={of:function(b){for(var c in is){if(is[c](b)){return c.toLowerCase()
}}}};
if(typeof VMM!="undefined"){VMM.smoothScrollTo=function(a,c,e){if(typeof(jQuery)!="undefined"){var b="easein",d=1000;
if(c!=null){if(c<1){d=1
}else{d=Math.round(c)
}}if(e!=null&&e!=""){b=e
}if(jQuery(window).scrollTop()!=VMM.Lib.offset(a).top){VMM.Lib.animate("html,body",d,b,{scrollTop:VMM.Lib.offset(a).top})
}}};
VMM.attachElement=function(a,b){if(typeof(jQuery)!="undefined"){jQuery(a).html(b)
}};
VMM.appendElement=function(a,b){if(typeof(jQuery)!="undefined"){jQuery(a).append(b)
}};
VMM.getHTML=function(a){var b;
if(typeof(jQuery)!="undefined"){b=jQuery(a).html();
return b
}};
VMM.getElement=function(a,c){var b;
if(typeof(jQuery)!="undefined"){if(c){b=jQuery(a).parent().get(0)
}else{b=jQuery(a).get(0)
}return b
}};
VMM.bindEvent=function(c,f,b,a){var h;
var d="click";
var g={};
if(b!=null&&b!=""){d=b
}if(g!=null&&g!=""){g=a
}if(typeof(jQuery)!="undefined"){jQuery(c).bind(d,g,f)
}};
VMM.unbindEvent=function(b,d,a){var g;
var c="click";
var f={};
if(a!=null&&a!=""){c=a
}if(typeof(jQuery)!="undefined"){jQuery(b).unbind(c,d)
}};
VMM.fireEvent=function(c,a,b){var g;
var f="click";
var d=[];
if(a!=null&&a!=""){f=a
}if(b!=null&&b!=""){d=b
}if(typeof(jQuery)!="undefined"){jQuery(c).trigger(f,d)
}};
VMM.getJSON=function(b,c,d){if(typeof(jQuery)!="undefined"){jQuery.ajaxSetup({timeout:3000});
if(VMM.Browser.browser=="Explorer"&&parseInt(VMM.Browser.version,10)>=7&&window.XDomainRequest){trace("IE JSON");
var a=b;
if(a.match("^http://")){return jQuery.getJSON(a,c,d)
}else{if(a.match("^https://")){a=a.replace("https://","http://");
return jQuery.getJSON(a,c,d)
}else{return jQuery.getJSON(b,c,d)
}}}else{return jQuery.getJSON(b,c,d)
}}};
VMM.parseJSON=function(a){if(typeof(jQuery)!="undefined"){return jQuery.parseJSON(a)
}};
VMM.appendAndGetElement=function(g,j,i,f){var d,a="<div>",b="",c="",h="";
if(j!=null&&j!=""){a=j
}if(i!=null&&i!=""){b=i
}if(f!=null&&f!=""){c=f
}if(typeof(jQuery)!="undefined"){d=jQuery(j);
d.addClass(b);
d.html(c);
jQuery(g).append(d)
}return d
};
VMM.Lib={init:function(){return this
},hide:function(a,b){if(b!=null&&b!=""){if(typeof(jQuery)!="undefined"){jQuery(a).hide(b)
}}else{if(typeof(jQuery)!="undefined"){jQuery(a).hide()
}}},remove:function(a){if(typeof(jQuery)!="undefined"){jQuery(a).remove()
}},detach:function(a){if(typeof(jQuery)!="undefined"){jQuery(a).detach()
}},append:function(a,b){if(typeof(jQuery)!="undefined"){jQuery(a).append(b)
}},prepend:function(a,b){if(typeof(jQuery)!="undefined"){jQuery(a).prepend(b)
}},show:function(a,b){if(b!=null&&b!=""){if(typeof(jQuery)!="undefined"){jQuery(a).show(b)
}}else{if(typeof(jQuery)!="undefined"){jQuery(a).show()
}}},load:function(b,d,a){var c={elem:b};
if(c!=null&&c!=""){c=a
}if(typeof(jQuery)!="undefined"){jQuery(b).load(c,d)
}},addClass:function(b,a){if(typeof(jQuery)!="undefined"){jQuery(b).addClass(a)
}},removeClass:function(b,a){if(typeof(jQuery)!="undefined"){jQuery(b).removeClass(a)
}},attr:function(a,c,b){if(b!=null&&b!=""){if(typeof(jQuery)!="undefined"){jQuery(a).attr(c,b)
}}else{if(typeof(jQuery)!="undefined"){return jQuery(a).attr(c)
}}},prop:function(a,c,b){if(typeof jQuery=="undefined"||!/[1-9]\.[3-9].[1-9]/.test(jQuery.fn.jquery)){VMM.Lib.attribute(a,c,b)
}else{jQuery(a).prop(c,b)
}},attribute:function(a,c,b){if(b!=null&&b!=""){if(typeof(jQuery)!="undefined"){jQuery(a).attr(c,b)
}}else{if(typeof(jQuery)!="undefined"){return jQuery(a).attr(c)
}}},visible:function(b,a){if(a!=null){if(typeof(jQuery)!="undefined"){if(a){jQuery(b).show(0)
}else{jQuery(b).hide(0)
}}}else{if(typeof(jQuery)!="undefined"){if(jQuery(b).is(":visible")){return true
}else{return false
}}}},css:function(a,c,b){if(b!=null&&b!=""){if(typeof(jQuery)!="undefined"){jQuery(a).css(c,b)
}}else{if(typeof(jQuery)!="undefined"){return jQuery(a).css(c)
}}},cssmultiple:function(b,a){if(typeof(jQuery)!="undefined"){return jQuery(b).css(a)
}},offset:function(a){var b;
if(typeof(jQuery)!="undefined"){b=jQuery(a).offset()
}return b
},position:function(a){var b;
if(typeof(jQuery)!="undefined"){b=jQuery(a).position()
}return b
},width:function(a,b){if(b!=null&&b!=""){if(typeof(jQuery)!="undefined"){jQuery(a).width(b)
}}else{if(typeof(jQuery)!="undefined"){return jQuery(a).width()
}}},height:function(a,b){if(b!=null&&b!=""){if(typeof(jQuery)!="undefined"){jQuery(a).height(b)
}}else{if(typeof(jQuery)!="undefined"){return jQuery(a).height()
}}},toggleClass:function(b,a){if(typeof(jQuery)!="undefined"){jQuery(b).toggleClass(a)
}},each:function(a,b){if(typeof(jQuery)!="undefined"){jQuery(a).each(b)
}},html:function(a,c){var b;
if(typeof(jQuery)!="undefined"){b=jQuery(a).html();
return b
}if(c!=null&&c!=""){if(typeof(jQuery)!="undefined"){jQuery(a).html(c)
}}else{var b;
if(typeof(jQuery)!="undefined"){b=jQuery(a).html();
return b
}}},find:function(b,a){if(typeof(jQuery)!="undefined"){return jQuery(b).find(a)
}},stop:function(a){if(typeof(jQuery)!="undefined"){jQuery(a).stop()
}},delay_animate:function(b,c,e,g,a,d){if(VMM.Browser.device=="mobile"||VMM.Browser.device=="tablet"){var h=Math.round((e/1500)*10)/10,f=h+"s";
VMM.Lib.css(c,"-webkit-transition","all "+f+" ease");
VMM.Lib.css(c,"-moz-transition","all "+f+" ease");
VMM.Lib.css(c,"-o-transition","all "+f+" ease");
VMM.Lib.css(c,"-ms-transition","all "+f+" ease");
VMM.Lib.css(c,"transition","all "+f+" ease");
VMM.Lib.cssmultiple(c,_att)
}else{if(typeof(jQuery)!="undefined"){jQuery(c).delay(b).animate(a,{duration:e,easing:g})
}}},animate:function(g,d,c,i,h,l){var a="easein",j=false,f=1000,k={};
if(d!=null){if(d<1){f=1
}else{f=Math.round(d)
}}if(c!=null&&c!=""){a=c
}if(h!=null&&h!=""){j=h
}if(i!=null){k=i
}else{k={opacity:0}
}if(VMM.Browser.device=="mobile"||VMM.Browser.device=="tablet"){var b=Math.round((f/1500)*10)/10,e=b+"s";
a=" cubic-bezier(0.33, 0.66, 0.66, 1)";
for(x in k){if(Object.prototype.hasOwnProperty.call(k,x)){trace(x+" to "+k[x]);
VMM.Lib.css(g,"-webkit-transition",x+" "+e+a);
VMM.Lib.css(g,"-moz-transition",x+" "+e+a);
VMM.Lib.css(g,"-o-transition",x+" "+e+a);
VMM.Lib.css(g,"-ms-transition",x+" "+e+a);
VMM.Lib.css(g,"transition",x+" "+e+a)
}}VMM.Lib.cssmultiple(g,k)
}else{if(typeof(jQuery)!="undefined"){if(l!=null&&l!=""){jQuery(g).animate(k,{queue:j,duration:f,easing:a,complete:l})
}else{jQuery(g).animate(k,{queue:j,duration:f,easing:a})
}}}}}
}if(typeof(jQuery)!="undefined"){(function(a){if(window.XDomainRequest){a.ajaxTransport(function(c){if(c.crossDomain&&c.async){if(c.timeout){c.xdrTimeout=c.timeout;
delete c.timeout
}var b;
return{send:function(e,d){function f(g,j,i,h){b.onload=b.onerror=b.ontimeout=a.noop;
b=undefined;
d(g,j,i,h)
}b=new XDomainRequest();
b.open(c.type,c.url);
b.onload=function(){f(200,"OK",{text:b.responseText},"Content-Type: "+b.contentType)
};
b.onerror=function(){f(404,"Not Found")
};
if(c.xdrTimeout){b.ontimeout=function(){f(0,"timeout")
};
b.timeout=c.xdrTimeout
}b.send((c.hasContent&&c.data)||null)
},abort:function(){if(b){b.onerror=a.noop();
b.abort()
}}}
}})
}})(jQuery);
jQuery.easing.jswing=jQuery.easing.swing;
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)
},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a
},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a
},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a
}if(f==g){return a+h
}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a
}return h/2*(-Math.pow(2,-10*--f)+2)+a
},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a
},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a
},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a
}return -h/2*((--f)*(f-2)-1)+a
}})
}if(typeof VMM!="undefined"&&typeof VMM.Browser=="undefined"){VMM.Browser={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS";
this.device=this.searchDevice(navigator.userAgent);
this.orientation=this.searchOrientation(window.orientation)
},searchOrientation:function(a){var b="";
if(a==0||a==180){b="portrait"
}else{if(a==90||a==-90){b="landscape"
}else{b="normal"
}}return b
},searchDevice:function(b){var a="";
if(b.match(/Android/i)||b.match(/iPhone|iPod/i)){a="mobile"
}else{if(b.match(/iPad/i)){a="tablet"
}else{if(b.match(/BlackBerry/i)||b.match(/IEMobile/i)){a="other mobile"
}else{a="desktop"
}}}return a
},searchString:function(d){for(var a=0;
a<d.length;
a++){var b=d[a].string,c=d[a].prop;
this.versionSearchString=d[a].versionSearch||d[a].identity;
if(b){if(b.indexOf(d[a].subString)!=-1){return d[a].identity
}}else{if(c){return d[a].identity
}}}},searchVersion:function(b){var a=b.indexOf(this.versionSearchString);
if(a==-1){return
}return parseFloat(b.substring(a+this.versionSearchString.length+1))
},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.userAgent,subString:"iPad",identity:"iPad"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
VMM.Browser.init()
}if(typeof VMM!="undefined"&&typeof VMM.FileExtention=="undefined"){VMM.FileExtention={googleDocType:function(c){var f=c,e="",b=["DOC","DOCX","XLS","XLSX","PPT","PPTX","PDF","PAGES","AI","PSD","TIFF","DXF","SVG","EPS","PS","TTF","XPS","ZIP","RAR"],a=false;
e=f.substr(f.length-5,5);
for(var d=0;
d<b.length;
d++){if(e.toLowerCase().match(b[d].toString().toLowerCase())||f.match("docs.google.com")){a=true
}}return a
}}
}if(typeof VMM!="undefined"&&typeof VMM.Date=="undefined"){VMM.Date=({init:function(){return this
},dateformats:{year:"yyyy",month_short:"mmm",month:"mmmm yyyy",full_short:"mmm d",full:"mmmm d',' yyyy",time_no_seconds_short:"h:MM TT",time_no_seconds_small_date:"h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",full_long:"mmm d',' yyyy 'at' hh:MM TT",full_long_small_date:"hh:MM TT'<br/><small>mmm d',' yyyy'</small>'",time_only:"hh:MM:ss:L TT"},month:["January","February","March","April","May","June","July","August","September","October","November","December"],month_abbr:["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],day:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],day_abbr:["Sun.","Mon.","Tues.","Wed.","Thurs.","Fri.","Sat."],hour:[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12],hour_suffix:["am"],bc_format:{year:"yyyy",month_short:"mmm",month:"mmmm yyyy",full_short:"mmm d",full:"mmmm d',' yyyy",time_no_seconds_short:"h:MM TT",time_no_seconds_small_date:"dddd', 'h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",full_long:"dddd',' mmm d',' yyyy 'at' hh:MM TT",full_long_small_date:"hh:MM TT'<br/><small>'dddd',' mmm d',' yyyy'</small>'",time_only:"hh:MM:ss:L TT"},setLanguage:function(a){trace("SET DATE LANGUAGE");
VMM.Date.dateformats=a.dateformats;
VMM.Date.month=a.date.month;
VMM.Date.month_abbr=a.date.month_abbr;
VMM.Date.day=a.date.day;
VMM.Date.day_abbr=a.date.day_abbr;
dateFormat.i18n.dayNames=a.date.day_abbr.concat(a.date.day);
dateFormat.i18n.monthNames=a.date.month_abbr.concat(a.date.month)
},parse:function(g){var a,f,e,c;
if(type.of(g)=="date"){a=g
}else{a=new Date(0,0,1,0,0,0,0);
if(g.match(/,/gi)){f=g.split(",");
for(var b=0;
b<f.length;
b++){f[b]=parseInt(f[b],10)
}if(f[0]){a.setFullYear(f[0])
}if(f[1]>1){a.setMonth(f[1]-1)
}if(f[2]>1){a.setDate(f[2])
}if(f[3]>1){a.setHours(f[3])
}if(f[4]>1){a.setMinutes(f[4])
}if(f[5]>1){a.setSeconds(f[5])
}if(f[6]>1){a.setMilliseconds(f[6])
}}else{if(g.match("/")){if(g.match(" ")){c=g.split(" ");
if(g.match(":")){e=c[1].split(":");
if(e[0]>=1){a.setHours(e[0])
}if(e[1]>=1){a.setMinutes(e[1])
}if(e[2]>=1){a.setSeconds(e[2])
}if(e[3]>=1){a.setMilliseconds(e[3])
}}f=c[0].split("/")
}else{f=g.split("/")
}if(f[2]){a.setFullYear(f[2])
}if(f[0]>1){a.setMonth(f[0]-1)
}if(f[1]>1){a.setDate(f[1])
}}else{if(g.length<=5){a.setFullYear(parseInt(g,10));
a.setMonth(0);
a.setDate(1);
a.setHours(0);
a.setMinutes(0);
a.setSeconds(0);
a.setMilliseconds(0)
}else{if(g.match("T")){if(navigator.userAgent.match(/MSIE\s(?!9.0)/)){c=g.split("T");
if(g.match(":")){e=_time_parse[1].split(":");
if(e[0]>=1){a.setHours(e[0])
}if(e[1]>=1){a.setMinutes(e[1])
}if(e[2]>=1){a.setSeconds(e[2])
}if(e[3]>=1){a.setMilliseconds(e[3])
}}_d_array=c[0].split("-");
if(f[0]){a.setFullYear(f[0])
}if(f[1]>1){a.setMonth(f[1]-1)
}if(f[2]>1){a.setDate(f[2])
}}else{a=new Date(Date.parse(g))
}}else{a=new Date(parseInt(g.slice(0,4),10),parseInt(g.slice(4,6),10)-1,parseInt(g.slice(6,8),10),parseInt(g.slice(8,10),10),parseInt(g.slice(10,12),10))
}}}}}return a
},prettyDate:function(m,n,a){var p,b,o,e,c=false,f,k,l;
if(a!=null){c=true
}if(type.of(m)=="date"){if(m.getMonth()===0&&m.getDate()==1&&m.getHours()===0&&m.getMinutes()===0){o=VMM.Date.dateformats.year
}else{if(m.getDate()<=1&&m.getHours()===0&&m.getMinutes()===0){if(n){o=VMM.Date.dateformats.month_short
}else{o=VMM.Date.dateformats.month
}}else{if(m.getHours()===0&&m.getMinutes()===0){if(n){o=VMM.Date.dateformats.full_short
}else{o=VMM.Date.dateformats.full
}}else{if(m.getMinutes()===0){if(n){o=VMM.Date.dateformats.time_no_seconds_short
}else{o=VMM.Date.dateformats.time_no_seconds_small_date
}}else{if(n){o=VMM.Date.dateformats.time_only
}else{o=VMM.Date.dateformats.time_only
}}}}}p=dateFormat(m,o,false);
e=p.split(" ");
for(var h=0;
h<e.length;
h++){if(parseInt(e[h],10)<0){trace("YEAR IS BC");
f=e[h];
k=Math.abs(parseInt(e[h],10));
l=k.toString()+" B.C.";
p=p.replace(f,l)
}}if(c){b=dateFormat(a,o);
e=b.split(" ");
for(var g=0;
g<e.length;
g++){if(parseInt(e[g],10)<0){trace("YEAR IS BC");
f=e[g];
k=Math.abs(parseInt(e[g],10));
l=k.toString()+" B.C.";
b=b.replace(f,l)
}}}}else{trace("NOT A VALID DATE?");
trace(m)
}if(c){return p+" &mdash; "+b
}else{return p
}}}).init();
var dateFormat=function(){var a=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,b=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,d=/[^-+\dA-Z]/g,c=function(f,e){f=String(f);
e=e||2;
while(f.length<e){f="0"+f
}return f
};
return function(i,v,q){var g=dateFormat;
if(arguments.length==1&&Object.prototype.toString.call(i)=="[object String]"&&!/\d/.test(i)){v=i;
i=undefined
}if(isNaN(i)){trace("invalid date "+i)
}v=String(g.masks[v]||v||g.masks["default"]);
if(v.slice(0,4)=="UTC:"){v=v.slice(4);
q=true
}var t=q?"getUTC":"get",l=i[t+"Date"](),e=i[t+"Day"](),j=i[t+"Month"](),p=i[t+"FullYear"](),r=i[t+"Hours"](),k=i[t+"Minutes"](),u=i[t+"Seconds"](),n=i[t+"Milliseconds"](),f=q?0:i.getTimezoneOffset(),h={d:l,dd:c(l),ddd:g.i18n.dayNames[e],dddd:g.i18n.dayNames[e+7],m:j+1,mm:c(j+1),mmm:g.i18n.monthNames[j],mmmm:g.i18n.monthNames[j+12],yy:String(p).slice(2),yyyy:p,h:r%12||12,hh:c(r%12||12),H:r,HH:c(r),M:k,MM:c(k),s:u,ss:c(u),l:c(n,3),L:c(n>99?Math.round(n/10):n),t:r<12?"a":"p",tt:r<12?"am":"pm",T:r<12?"A":"P",TT:r<12?"AM":"PM",Z:q?"UTC":(String(i).match(b)||[""]).pop().replace(d,""),o:(f>0?"-":"+")+c(Math.floor(Math.abs(f)/60)*100+Math.abs(f)%60,4),S:["th","st","nd","rd"][l%10>3?0:(l%100-l%10!=10)*l%10]};
return v.replace(a,function(m){return m in h?h[m]:m.slice(1,m.length-1)
})
}
}();
dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};
dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};
Date.prototype.format=function(a,b){return dateFormat(this,a,b)
}
}if(typeof VMM!="undefined"&&typeof VMM.Util=="undefined"){VMM.Util=({init:function(){return this
},correctProtocol:function(b){var d=(window.parent.location.protocol).toString(),c="",a=b.split("://",2);
if(d.match("http")){c=d
}else{c="https"
}return c+"://"+a[1]
},mergeConfig:function(b,c){var a;
for(a in c){if(Object.prototype.hasOwnProperty.call(c,a)){b[a]=c[a]
}}return b
},getObjectAttributeByIndex:function(d,b){if(typeof d!="undefined"){var c=0;
for(var a in d){if(b===c){return d[a]
}c++
}return""
}else{return""
}},ordinal:function(a){return["th","st","nd","rd"][(!(((a%10)>3)||(Math.floor(a%100/10)==1)))*(a%10)]
},randomBetween:function(b,a){return Math.floor(Math.random()*(a-b+1)+b)
},average:function(d){var g={mean:0,variance:0,deviation:0},e=d.length;
for(var b,f=0,c=e;
c--;
f+=d[c]){}for(b=g.mean=f/e,c=e,f=0;
c--;
f+=Math.pow(d[c]-b,2)){}return g.deviation=Math.sqrt(g.variance=f/e),g
},customSort:function(e,c){var d=e,f=c;
if(d==f){return 0
}return d>f?1:-1
},deDupeArray:function(b){var d,a=b.length,c=[],e={};
for(d=0;
d<a;
d++){e[b[d]]=0
}for(d in e){c.push(d)
}return c
},number2money:function(e,c,d){var c=(c!==null)?c:true;
var d=(d!==null)?d:false;
var a=VMM.Math2.floatPrecision(e,2);
var b=this.niceNumber(a);
if(!b.split(/\./g)[1]&&d){b=b+".00"
}if(c){b="$"+b
}return b
},wordCount:function(c){var f=c+" ";
var h=/^[^A-Za-z0-9\'\-]+/gi;
var b=f.replace(h,"");
var a=/[^A-Za-z0-9\'\-]+/gi;
var d=b.replace(a," ");
var e=d.split(" ");
var g=e.length-1;
if(f.length<2){g=0
}return g
},ratio:{fit:function(a,d,b,e){var c={width:0,height:0};
c.width=a;
c.height=Math.round((a/b)*e);
if(c.height>d){c.height=d;
c.width=Math.round((d/e)*b);
if(c.width>a){trace("FIT: DIDN'T FIT!!! ")
}}return c
},r16_9:function(a,b){if(a!==null&&a!==""){return Math.round((b/16)*9)
}else{if(b!==null&&b!==""){return Math.round((a/9)*16)
}}},r4_3:function(a,b){if(a!==null&&a!==""){return Math.round((b/4)*3)
}else{if(b!==null&&b!==""){return Math.round((a/3)*4)
}}}},doubledigit:function(a){return(a<10?"0":"")+a
},truncateWords:function(k,c,g){if(!c){c=30
}if(!g){g=c
}var d=/^[^A-Za-z0-9\'\-]+/gi;
var h=k.replace(d,"");
var f=h.split(" ");
var l=[];
c=Math.min(f.length,c);
g=Math.min(f.length,g);
for(var e=0;
e<c;
e++){l.push(f[e])
}for(var b=c;
e<g;
e++){var a=f[e];
l.push(a);
if(a.charAt(a.length-1)=="."){break
}}return(l.join(" "))
},linkify:function(f,b,d){var c=/\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
var e=/(^|[^\/])(www\.[\S]+(\b|$))/gim;
var a=/(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
return f.replace(c,"<a target='_blank' href='$&' onclick='void(0)'>$&</a>").replace(e,"$1<a target='_blank' onclick='void(0)' href='http://$2'>$2</a>").replace(a,"<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>")
},linkify_with_twitter:function(j,i,c){var e=/\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
var h=/(\()((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\))|(\[)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\])|(\{)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\})|(<|&(?:lt|#60|#x3c);)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(>|&(?:gt|#62|#x3e);)|((?:^|[^=\s'"\]])\s*['"]?|[^=\s]\s+)(\b(?:ht|f)tps?:\/\/[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]+(?:(?!&(?:gt|#0*62|#x0*3e);|&(?:amp|apos|quot|#0*3[49]|#x0*2[27]);[.!&',:?;]?(?:[^a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]|$))&[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]*)*[a-z0-9\-_~$()*+=\/#[\]@%])/img;
var a='$1$4$7$10$13<a href="$2$5$8$11$14" class="hyphenate">$2$5$8$11$14</a>$3$6$9$12';
var k=/(^|[^\/])(www\.[\S]+(\b|$))/gim;
function b(m){var l=/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
return m.replace(l,"<a href='$1' target='_blank'>$3</a>")
}var d=/(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
var f=/\B@([\w-]+)/gm;
var g=/(#([\w]+))/g;
return j.replace(h,a).replace(k,"$1<a target='_blank' class='hyphenate' onclick='void(0)' href='http://$2'>$2</a>").replace(d,"<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>").replace(f,"<a href='http://twitter.com/$1' target='_blank' onclick='void(0)'>@$1</a>").replace(g,"<a href='http://twitter.com/#search?q=%23$2' target='_blank' 'void(0)'>$1</a>")
},linkify_wikipedia:function(b){var a=/<i[^>]*>(.*?)<\/i>/gim;
return b.replace(a,"<a target='_blank' href='http://en.wikipedia.org/wiki/$&' onclick='void(0)'>$&</a>").replace(/<i\b[^>]*>/gim,"").replace(/<\/i>/gim,"").replace(/<b\b[^>]*>/gim,"").replace(/<\/b>/gim,"")
},unlinkify:function(a){if(!a){return a
}a=a.replace(/<a\b[^>]*>/i,"");
a=a.replace(/<\/a>/i,"");
return a
},untagify:function(a){if(!a){return a
}a=a.replace(/<\s*\w.*?>/g,"");
return a
},nl2br:function(a){return a.replace(/(\r\n|[\r\n]|\\n|\\r)/g,"<br/>")
},unique_ID:function(a){var c=function(e){return Math.floor(Math.random()*e)
};
var b=function(){var e="abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
return e.substr(c(62),1)
};
var d=function(f){var g="";
for(var e=0;
e<f;
e++){g+=b()
}return g
};
return d(a)
},isEven:function(a){return(a%2===0)?true:false
},getUrlVars:function(b){var f=b.toString();
if(f.match("&#038;")){f=f.replace("&#038;","&")
}else{if(f.match("&#38;")){f=f.replace("&#38;","&")
}else{if(f.match("&amp;")){f=f.replace("&amp;","&")
}}}var e=[],d;
var a=f.slice(f.indexOf("?")+1).split("&");
for(var c=0;
c<a.length;
c++){d=a[c].split("=");
e.push(d[0]);
e[d[0]]=d[1]
}return e
},toHTML:function(a){a=this.nl2br(a);
a=this.linkify(a);
return a.replace(/\s\s/g,"&nbsp;&nbsp;")
},toCamelCase:function(d,b){if(b!==false){b=true
}var a=((b)?d.toLowerCase():d).split(" ");
for(var c=0;
c<a.length;
c++){a[c]=a[c].substr(0,1).toUpperCase()+a[c].substr(1)
}return a.join(" ")
},properQuotes:function(a){return a.replace(/\"([^\"]*)\"/gi,"&#8220;$1&#8221;")
},niceNumber:function(b){b+="";
x=b.split(".");
x1=x[0];
x2=x.length>1?"."+x[1]:"";
var a=/(\d+)(\d{3})/;
while(a.test(x1)){x1=x1.replace(a,"$1,$2")
}return x1+x2
},toTitleCase:function(b){if(VMM.Browser.browser=="Explorer"&&parseInt(VMM.Browser.version,10)>=7){return b.replace("_","%20")
}else{var a={__smallWords:["a","an","and","as","at","but","by","en","for","if","in","of","on","or","the","to","v[.]?","via","vs[.]?"],init:function(){this.__smallRE=this.__smallWords.join("|");
this.__lowerCaseWordsRE=new RegExp("\\b("+this.__smallRE+")\\b","gi");
this.__firstWordRE=new RegExp("^([^a-zA-Z0-9 \\r\\n\\t]*)("+this.__smallRE+")\\b","gi");
this.__lastWordRE=new RegExp("\\b("+this.__smallRE+")([^a-zA-Z0-9 \\r\\n\\t]*)$","gi")
},toTitleCase:function(d){var c="";
var f=d.split(/([:.;?!][ ]|(?:[ ]|^)["“])/);
for(var e=0;
e<f.length;
++e){var g=f[e];
g=g.replace(/\b([a-zA-Z][a-z.'’]*)\b/g,this.__titleCaseDottedWordReplacer);
g=g.replace(this.__lowerCaseWordsRE,this.__lowerReplacer);
g=g.replace(this.__firstWordRE,this.__firstToUpperCase);
g=g.replace(this.__lastWordRE,this.__firstToUpperCase);
c+=g
}c=c.replace(/ V(s?)\. /g," v$1. ");
c=c.replace(/(['’])S\b/g,"$1s");
c=c.replace(/\b(AT&T|Q&A)\b/ig,this.__upperReplacer);
return c
},__titleCaseDottedWordReplacer:function(c){return(c.match(/[a-zA-Z][.][a-zA-Z]/))?c:a.__firstToUpperCase(c)
},__lowerReplacer:function(c){return c.toLowerCase()
},__upperReplacer:function(c){return c.toUpperCase()
},__firstToUpperCase:function(c){var d=c.split(/(^[^a-zA-Z0-9]*[a-zA-Z0-9])(.*)$/);
if(d[1]){d[1]=d[1].toUpperCase()
}return d.join("")
}};
a.init();
b=b.replace(/_/g," ");
b=a.toTitleCase(b);
return b
}}}).init()
}window.loadedJS=[];
if(typeof VMM!="undefined"&&typeof VMM.LoadLib=="undefined"){VMM.LoadLib=(function(l){var i,j,c={},g=0,h={css:[],js:[]},o=l.styleSheets;
var f=[];
function a(p){var r=false;
for(var q=0;
q<f.length;
q++){if(f[q]==p){r=true
}}if(!r){f.push(p)
}return r
}function n(r,q){var s=l.createElement(r),p;
for(p in q){if(q.hasOwnProperty(p)){s.setAttribute(p,q[p])
}}return s
}function k(q){var s=c[q],t,r;
if(s){t=s.callback;
r=s.urls;
r.shift();
g=0;
if(!r.length){t&&t.call(s.context,s.obj);
c[q]=null;
h[q].length&&m(q)
}}}function d(){var p=navigator.userAgent;
i={async:l.createElement("script").async===true};
(i.webkit=/AppleWebKit\//.test(p))||(i.ie=/MSIE/.test(p))||(i.opera=/Opera/.test(p))||(i.gecko=/Gecko\//.test(p))||(i.unknown=true)
}function m(C,B,D,y,t){var v=function(){k(C)
},E=C==="css",r=[],w,z,u,s,A,q;
i||d();
if(B){B=typeof B==="string"?[B]:B.concat();
if(E||i.async||i.gecko||i.opera){h[C].push({urls:B,callback:D,obj:y,context:t})
}else{for(w=0,z=B.length;
w<z;
++w){h[C].push({urls:[B[w]],callback:w===z-1?D:null,obj:y,context:t})
}}}if(c[C]||!(s=c[C]=h[C].shift())){return
}j||(j=l.head||l.getElementsByTagName("head")[0]);
A=s.urls;
for(w=0,z=A.length;
w<z;
++w){q=A[w];
if(E){u=i.gecko?n("style"):n("link",{href:q,rel:"stylesheet"})
}else{u=n("script",{src:q});
u.async=false
}u.className="lazyload";
u.setAttribute("charset","utf-8");
if(i.ie&&!E){u.onreadystatechange=function(){if(/loaded|complete/.test(u.readyState)){u.onreadystatechange=null;
v()
}}
}else{if(E&&(i.gecko||i.webkit)){if(i.webkit){s.urls[w]=u.href;
e()
}else{u.innerHTML='@import "'+q+'";';
b(u)
}}else{u.onload=u.onerror=v
}}r.push(u)
}for(w=0,z=r.length;
w<z;
++w){j.appendChild(r[w])
}}function b(r){var q;
try{q=!!r.sheet.cssRules
}catch(p){g+=1;
if(g<200){setTimeout(function(){b(r)
},50)
}else{q&&k("css")
}return
}k("css")
}function e(){var q=c.css,p;
if(q){p=o.length;
while(--p>=0){if(o[p].href===q.urls[0]){k("css");
break
}}g+=1;
if(q){if(g<200){setTimeout(e,50)
}else{k("css")
}}}}return{css:function(r,s,q,p){if(a(r)){return s
}else{m("css",r,s,q,p)
}},js:function(r,s,q,p){if(a(r)){return s
}else{m("js",r,s,q,p)
}}}
})(this.document)
}if(typeof VMM!="undefined"&&typeof VMM.ExternalAPI=="undefined"){VMM.ExternalAPI={pushQues:function(){if(VMM.master_config.googlemaps.active){VMM.ExternalAPI.googlemaps.pushQue()
}if(VMM.master_config.youtube.active){VMM.ExternalAPI.youtube.pushQue()
}if(VMM.master_config.soundcloud.active){VMM.ExternalAPI.soundcloud.pushQue()
}if(VMM.master_config.googledocs.active){VMM.ExternalAPI.googledocs.pushQue()
}if(VMM.master_config.googleplus.active){VMM.ExternalAPI.googleplus.pushQue()
}if(VMM.master_config.wikipedia.active){VMM.ExternalAPI.wikipedia.pushQue()
}if(VMM.master_config.vimeo.active){VMM.ExternalAPI.vimeo.pushQue()
}if(VMM.master_config.twitter.active){VMM.ExternalAPI.twitter.pushQue()
}if(VMM.master_config.flickr.active){VMM.ExternalAPI.flickr.pushQue()
}},twitter:{tweetArray:[],get:function(a,c){var b={mid:a,id:c};
VMM.master_config.twitter.que.push(b);
VMM.master_config.twitter.active=true
},create:function(e,g){var f=e.mid.toString(),b={twitterid:e.mid},a="http://api.twitter.com/1/statuses/show.json?id="+e.mid+"&include_entities=true&callback=?",d=setTimeout(VMM.ExternalAPI.twitter.errorTimeOut,VMM.master_config.timers.api,e),c=setTimeout(g,VMM.master_config.timers.api,e);
VMM.getJSON(a,function(i){var k=i.id_str,h="<blockquote><p>",j=VMM.Util.linkify_with_twitter(i.text,"_blank");
h+=j;
h+="</p></blockquote>";
if(typeof i.entities.media!="undefined"){if(i.entities.media[0].type=="photo"){}}h+="<div class='vcard author'>";
h+="<a class='screen-name url' href='https://twitter.com/"+i.user.screen_name+"' data-screen-name='"+i.user.screen_name+"' target='_blank'>";
h+="<span class='avatar'><img src=' "+i.user.profile_image_url+"'  alt=''></span>";
h+="<span class='fn'>"+i.user.name+"</span>";
h+="<span class='nickname'>@"+i.user.screen_name+"<span class='thumbnail-inline'></span></span>";
h+="</a>";
h+="</div>";
VMM.attachElement("#"+e.id.toString(),h);
VMM.attachElement("#text_thumb_"+e.id.toString(),i.text)
}).error(function(h,j,i){trace("TWITTER error");
trace("TWITTER ERROR: "+j+" "+h.responseText);
VMM.attachElement("#"+e.id,VMM.MediaElement.loadingmessage("ERROR LOADING TWEET "+e.mid))
}).success(function(h){clearTimeout(d);
clearTimeout(c);
g()
})
},errorTimeOut:function(a){trace("TWITTER JSON ERROR TIMEOUT "+a.mid);
VMM.attachElement("#"+a.id.toString(),VMM.MediaElement.loadingmessage("Still waiting on Twitter: "+a.mid));
VMM.getJSON("http://api.twitter.com/1/account/rate_limit_status.json",function(c){trace("REMAINING TWITTER API CALLS "+c.remaining_hits);
trace("TWITTER RATE LIMIT WILL RESET AT "+c.reset_time);
var b="";
if(c.remaining_hits==0){b="<p>You've reached the maximum number of tweets you can load in an hour.</p>";
b+="<p>You can view tweets again starting at: <br/>"+c.reset_time+"</p>"
}else{b="<p>Still waiting on Twitter. "+a.mid+"</p>"
}VMM.attachElement("#"+a.id.toString(),VMM.MediaElement.loadingmessage(b))
})
},pushQue:function(){if(VMM.master_config.twitter.que.length>0){VMM.ExternalAPI.twitter.create(VMM.master_config.twitter.que[0],VMM.ExternalAPI.twitter.pushQue);
VMM.master_config.twitter.que.remove(0)
}},getHTML:function(b){var a="http://api.twitter.com/1/statuses/oembed.json?id="+b+"&callback=?";
VMM.getJSON(a,VMM.ExternalAPI.twitter.onJSONLoaded)
},onJSONLoaded:function(a){trace("TWITTER JSON LOADED");
var b=a.id;
VMM.attachElement("#"+b,VMM.Util.linkify_with_twitter(a.html))
},parseTwitterDate:function(b){var a=new Date(Date.parse(b));
return a
},prettyParseTwitterDate:function(b){var a=new Date(Date.parse(b));
return VMM.Date.prettyDate(a,true)
},getTweets:function(f){var e=[];
var d=f.length;
for(var c=0;
c<f.length;
c++){var b="";
if(f[c].tweet.match("status/")){b=f[c].tweet.split("status/")[1]
}else{if(f[c].tweet.match("statuses/")){b=f[c].tweet.split("statuses/")[1]
}else{b=""
}}var a="http://api.twitter.com/1/statuses/show.json?id="+b+"&include_entities=true&callback=?";
VMM.getJSON(a,function(i){var h={};
var g="<div class='twitter'><blockquote><p>";
var k=VMM.Util.linkify_with_twitter(i.text,"_blank");
g+=k;
g+="</p>";
g+="— "+i.user.name+" (<a href='https://twitter.com/"+i.user.screen_name+"'>@"+i.user.screen_name+"</a>) <a href='https://twitter.com/"+i.user.screen_name+"/status/"+i.id+"'>"+VMM.ExternalAPI.twitter.prettyParseTwitterDate(i.created_at)+" </a></blockquote></div>";
h.content=g;
h.raw=i;
e.push(h);
if(e.length==d){var j={tweetdata:e};
VMM.fireEvent(global,"TWEETSLOADED",j)
}}).success(function(){trace("second success")
}).error(function(){trace("error")
}).complete(function(){trace("complete")
})
}},getTweetSearch:function(e,c){var b=40;
if(c!=null&&c!=""){b=c
}var a="http://search.twitter.com/search.json?q="+e+"&rpp="+b+"&include_entities=true&result_type=mixed";
var d=[];
VMM.getJSON(a,function(j){for(var f=0;
f<j.results.length;
f++){var h={};
var g="<div class='twitter'><blockquote><p>";
var l=VMM.Util.linkify_with_twitter(j.results[f].text,"_blank");
g+=l;
g+="</p>";
g+="— "+j.results[f].from_user_name+" (<a href='https://twitter.com/"+j.results[f].from_user+"'>@"+j.results[f].from_user+"</a>) <a href='https://twitter.com/"+j.results[f].from_user+"/status/"+j.id+"'>"+VMM.ExternalAPI.twitter.prettyParseTwitterDate(j.results[f].created_at)+" </a></blockquote></div>";
h.content=g;
h.raw=j.results[f];
d.push(h)
}var k={tweetdata:d};
VMM.fireEvent(global,"TWEETSLOADED",k)
})
},prettyHTML:function(e,b){var e=e.toString();
var c={twitterid:e};
var a="http://api.twitter.com/1/statuses/show.json?id="+e+"&include_entities=true&callback=?";
var d=setTimeout(VMM.ExternalAPI.twitter.errorTimeOut,VMM.master_config.timers.api,e);
VMM.getJSON(a,VMM.ExternalAPI.twitter.formatJSON).error(function(f,h,g){trace("TWITTER error");
trace("TWITTER ERROR: "+h+" "+f.responseText);
VMM.attachElement("#twitter_"+e,"<p>ERROR LOADING TWEET "+e+"</p>")
}).success(function(f){clearTimeout(d);
if(b){VMM.ExternalAPI.twitter.secondaryMedia(f)
}})
},formatJSON:function(b){var e=b.id_str;
var a="<blockquote><p>";
var c=VMM.Util.linkify_with_twitter(b.text,"_blank");
a+=c;
a+="</p></blockquote>";
a+="<div class='vcard author'>";
a+="<a class='screen-name url' href='https://twitter.com/"+b.user.screen_name+"' data-screen-name='"+b.user.screen_name+"' target='_blank'>";
a+="<span class='avatar'><img src=' "+b.user.profile_image_url+"'  alt=''></span>";
a+="<span class='fn'>"+b.user.name+"</span>";
a+="<span class='nickname'>@"+b.user.screen_name+"<span class='thumbnail-inline'></span></span>";
a+="</a>";
a+="</div>";
if(typeof b.entities.media!="undefined"){if(b.entities.media[0].type=="photo"){a+="<img src=' "+b.entities.media[0].media_url+"'  alt=''>"
}}VMM.attachElement("#twitter_"+e.toString(),a);
VMM.attachElement("#text_thumb_"+e.toString(),b.text)
}},googlemaps:{get:function(a,g){var f,b,e;
e=VMM.Util.getUrlVars(a);
if(VMM.master_config.Timeline.api_keys.google!=""){b=VMM.master_config.Timeline.api_keys.google
}else{b=Aes.Ctr.decrypt(VMM.master_config.api_keys_master.google,VMM.master_config.vp,256)
}var d="http://maps.googleapis.com/maps/api/js?key="+b+"&libraries=places&sensor=false&callback=VMM.ExternalAPI.googlemaps.onMapAPIReady";
var c={url:a,vars:e,id:g};
if(VMM.master_config.googlemaps.active){VMM.master_config.googlemaps.que.push(c)
}else{VMM.master_config.googlemaps.que.push(c);
if(VMM.master_config.googlemaps.api_loaded){}else{VMM.LoadLib.js(d,function(){trace("Google Maps API Library Loaded")
})
}}},create:function(d){var h="";
var i;
var c;
function f(m){if(m in VMM.ExternalAPI.googlemaps.map_providers){h=VMM.ExternalAPI.googlemaps.map_attribution[VMM.ExternalAPI.googlemaps.map_providers[m].attribution];
return VMM.ExternalAPI.googlemaps.map_providers[m]
}else{if(VMM.ExternalAPI.googlemaps.defaultType(m)){trace("GOOGLE MAP DEFAULT TYPE");
return google.maps.MapTypeId[m.toUpperCase()]
}else{trace("Not a maptype: "+m)
}}}google.maps.VeriteMapType=function(m){if(VMM.ExternalAPI.googlemaps.defaultType(m)){return google.maps.MapTypeId[m.toUpperCase()]
}else{var q=f(m);
return google.maps.ImageMapType.call(this,{getTileUrl:function(t,s){var r=(s+t.x+t.y)%VMM.ExternalAPI.googlemaps.map_subdomains.length;
return[q.url.replace("{S}",VMM.ExternalAPI.googlemaps.map_subdomains[r]).replace("{Z}",s).replace("{X}",t.x).replace("{Y}",t.y).replace("{z}",s).replace("{x}",t.x).replace("{y}",t.y)]
},tileSize:new google.maps.Size(256,256),name:m,minZoom:q.minZoom,maxZoom:q.maxZoom})
}};
google.maps.VeriteMapType.prototype=new google.maps.ImageMapType("_");
if(type.of(VMM.master_config.Timeline.maptype)=="string"){if(VMM.ExternalAPI.googlemaps.defaultType(VMM.master_config.Timeline.maptype)){i=google.maps.MapTypeId[VMM.master_config.Timeline.maptype.toUpperCase()]
}else{i=VMM.master_config.Timeline.maptype
}}else{i="toner"
}var n=new google.maps.LatLng(41.875696,-87.624207);
var e;
var p=11;
var o=false;
var a=false;
var b;
if(type.of(VMM.Util.getUrlVars(d.url)["ll"])=="string"){o=true;
e=VMM.Util.getUrlVars(d.url)["ll"].split(",");
n=new google.maps.LatLng(parseFloat(e[0]),parseFloat(e[1]))
}else{if(type.of(VMM.Util.getUrlVars(d.url)["sll"])=="string"){e=VMM.Util.getUrlVars(d.url)["sll"].split(",");
n=new google.maps.LatLng(parseFloat(e[0]),parseFloat(e[1]))
}}if(type.of(VMM.Util.getUrlVars(d.url)["z"])=="string"){a=true;
p=parseFloat(VMM.Util.getUrlVars(d.url)["z"])
}var k={zoom:p,disableDefaultUI:true,mapTypeControl:false,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL,position:google.maps.ControlPosition.TOP_RIGHT},center:n,mapTypeId:i,mapTypeControlOptions:{mapTypeIds:[i]}};
var j=d.id.toString()+"_gmap";
VMM.attachElement("#"+d.id,"<div class='google-map' id='"+j+"' style='width=100%;height=100%;'></div>");
var c=new google.maps.Map(document.getElementById(j),k);
if(VMM.ExternalAPI.googlemaps.defaultType(VMM.master_config.Timeline.maptype)){}else{c.mapTypes.set(i,new google.maps.VeriteMapType(i));
var l="<div class='map-attribution'><div class='attribution-text'>"+h+"</div></div>";
VMM.appendElement("#"+j,l)
}g();
function g(){var m=d.url+"&output=kml";
m=m.replace("&output=embed","");
var q=new google.maps.KmlLayer(m,{preserveViewport:true});
var r=new google.maps.InfoWindow();
q.setMap(c);
google.maps.event.addListenerOnce(q,"defaultviewport_changed",function(){c.fitBounds(q.getDefaultViewport());
if(o){c.panTo(n)
}if(a){c.setZoom(p)
}});
google.maps.event.addListener(q,"click",function(u){var t=u.featureData.description;
s(t);
function s(v){r.setContent(v);
r.open(c)
}})
}},pushQue:function(){for(var a=0;
a<VMM.master_config.googlemaps.que.length;
a++){VMM.ExternalAPI.googlemaps.create(VMM.master_config.googlemaps.que[a])
}VMM.master_config.googlemaps.que=[]
},onMapAPIReady:function(){VMM.master_config.googlemaps.map_active=true;
VMM.master_config.googlemaps.places_active=true;
VMM.ExternalAPI.googlemaps.onAPIReady()
},onPlacesAPIReady:function(){VMM.master_config.googlemaps.places_active=true;
VMM.ExternalAPI.googlemaps.onAPIReady()
},onAPIReady:function(){if(!VMM.master_config.googlemaps.active){if(VMM.master_config.googlemaps.map_active&&VMM.master_config.googlemaps.places_active){VMM.master_config.googlemaps.active=true;
VMM.ExternalAPI.googlemaps.pushQue()
}}},defaultType:function(a){if(a.toLowerCase()=="satellite"||a.toLowerCase()=="hybrid"||a.toLowerCase()=="terrain"||a.toLowerCase()=="roadmap"){return true
}else{return false
}},map_subdomains:["","a.","b.","c.","d."],map_attribution:{stamen:"Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.",apple:"Map data &copy; 2012  Apple, Imagery &copy; 2012 Apple"},map_providers:{toner:{url:"http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png",minZoom:0,maxZoom:20,attribution:"stamen"},"toner-lines":{url:"http://{S}tile.stamen.com/toner-lines/{Z}/{X}/{Y}.png",minZoom:0,maxZoom:20,attribution:"stamen"},"toner-labels":{url:"http://{S}tile.stamen.com/toner-labels/{Z}/{X}/{Y}.png",minZoom:0,maxZoom:20,attribution:"stamen"},sterrain:{url:"http://{S}tile.stamen.com/terrain/{Z}/{X}/{Y}.jpg",minZoom:4,maxZoom:20,attribution:"stamen"},apple:{url:"http://gsp2.apple.com/tile?api=1&style=slideshow&layers=default&lang=en_US&z={z}&x={x}&y={y}&v=9",minZoom:4,maxZoom:14,attribution:"apple"},watercolor:{url:"http://{S}tile.stamen.com/watercolor/{Z}/{X}/{Y}.jpg",minZoom:3,maxZoom:16,attribution:"stamen"}}},googleplus:{get:function(b,d){var c;
var a={user:b,activity:d};
VMM.master_config.googleplus.que.push(a);
VMM.master_config.googleplus.active=true
},create:function(e,g){var d="",h="",c="",i="",a="",b,f;
googleplus_timeout=setTimeout(VMM.ExternalAPI.googleplus.errorTimeOut,VMM.master_config.timers.api,e),callback_timeout=setTimeout(g,VMM.master_config.timers.api,e);
if(VMM.master_config.Timeline.api_keys.google!=""){h=VMM.master_config.Timeline.api_keys.google
}else{h=Aes.Ctr.decrypt(VMM.master_config.api_keys_master.google,VMM.master_config.vp,256)
}b="https://www.googleapis.com/plus/v1/people/"+e.user+"/activities/public?alt=json&maxResults=100&fields=items(id,url)&key="+h;
d="GOOGLE PLUS API CALL";
VMM.getJSON(b,function(k){for(var j=0;
j<k.items.length;
j++){trace("loop");
if(k.items[j].url.split("posts/")[1]==e.activity){trace("FOUND IT!!");
c=k.items[j].id;
f="https://www.googleapis.com/plus/v1/activities/"+c+"?alt=json&key="+h;
VMM.getJSON(f,function(m){trace(m);
if(typeof m.annotation!="undefined"){i+="<div class='googleplus-annotation'>'"+m.annotation+"</div>";
i+=m.object.content
}else{i+=m.object.content
}if(typeof m.object.attachments!="undefined"){for(var l=0;
l<m.object.attachments.length;
l++){if(m.object.attachments[l].objectType=="photo"){a="<a href='"+m.object.url+"' target='_blank'><img src='"+m.object.attachments[l].image.url+"' class='article-thumb'></a>"+a
}else{if(m.object.attachments[l].objectType=="video"){a="<img src='"+m.object.attachments[l].image.url+"' class='article-thumb'>"+a;
a+="<div>";
a+="<a href='"+m.object.attachments[l].url+"' target='_blank'>";
a+="<h5>"+m.object.attachments[l].displayName+"</h5>";
a+="</a>";
a+="</div>"
}else{if(m.object.attachments[l].objectType=="article"){a+="<div>";
a+="<a href='"+m.object.attachments[l].url+"' target='_blank'>";
a+="<h5>"+m.object.attachments[l].displayName+"</h5>";
a+="<p>"+m.object.attachments[l].content+"</p>";
a+="</a>";
a+="</div>"
}}}trace(m.object.attachments[l])
}a="<div class='googleplus-attachments'>"+a+"</div>"
}d="<div class='googleplus-content'>"+i+a+"</div>";
d+="<div class='vcard author'><a class='screen-name url' href='"+m.url+"' target='_blank'>";
d+="<span class='avatar'><img src='"+m.actor.image.url+"' style='max-width: 32px; max-height: 32px;'></span>";
d+="<span class='fn'>"+m.actor.displayName+"</span>";
d+="<span class='nickname'><span class='thumbnail-inline'></span></span>";
d+="</a></div>";
VMM.attachElement("#googleplus_"+e.activity,d)
});
break
}}}).error(function(k,m,l){var j=VMM.parseJSON(k.responseText);
trace(j.error.message);
VMM.attachElement("#googleplus_"+e.activity,VMM.MediaElement.loadingmessage("<p>ERROR LOADING GOOGLE+ </p><p>"+j.error.message+"</p>"))
}).success(function(j){clearTimeout(googleplus_timeout);
clearTimeout(callback_timeout);
g()
})
},pushQue:function(){if(VMM.master_config.googleplus.que.length>0){VMM.ExternalAPI.googleplus.create(VMM.master_config.googleplus.que[0],VMM.ExternalAPI.googleplus.pushQue);
VMM.master_config.googleplus.que.remove(0)
}},errorTimeOut:function(a){trace("GOOGLE+ JSON ERROR TIMEOUT "+a.activity);
VMM.attachElement("#googleplus_"+a.activity,VMM.MediaElement.loadingmessage("<p>Still waiting on GOOGLE+ </p><p>"+a.activity+"</p>"))
}},googledocs:{get:function(a,c){var b={url:a,id:c};
VMM.master_config.googledocs.que.push(b);
VMM.master_config.googledocs.active=true
},create:function(b){var a="";
if(b.url.match(/docs.google.com/i)){a="<iframe class='doc' frameborder='0' width='100%' height='100%' src='"+b.url+"&amp;embedded=true'></iframe>"
}else{a="<iframe class='doc' frameborder='0' width='100%' height='100%' src='http://docs.google.com/viewer?url="+b.url+"&amp;embedded=true'></iframe>"
}VMM.attachElement("#"+b.id,a)
},pushQue:function(){for(var a=0;
a<VMM.master_config.googledocs.que.length;
a++){VMM.ExternalAPI.googledocs.create(VMM.master_config.googledocs.que[a])
}VMM.master_config.googledocs.que=[]
}},flickr:{get:function(b,d,c){var a={mid:b,id:d,link:c};
VMM.master_config.flickr.que.push(a);
VMM.master_config.flickr.active=true
},create:function(b,e){var d,c=setTimeout(e,VMM.master_config.timers.api,b);
if(VMM.master_config.Timeline.api_keys.flickr!=""){d=VMM.master_config.Timeline.api_keys.flickr
}else{d=Aes.Ctr.decrypt(VMM.master_config.api_keys_master.flickr,VMM.master_config.vp,256)
}var a="http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+d+"&photo_id="+b.mid+"&format=json&jsoncallback=?";
VMM.getJSON(a,function(l){var m=l.sizes.size[0].url.split("photos/")[1].split("/")[1];
var g="#"+b.id,j="#"+b.id+"_thumb";
var o,n,k=false,f="Large";
f=VMM.ExternalAPI.flickr.sizes(VMM.master_config.sizes.api.height);
for(var h=0;
h<l.sizes.size.length;
h++){if(l.sizes.size[h].label==f){k=true;
o=l.sizes.size[h].source
}}if(!k){o=l.sizes.size[l.sizes.size.length-1].source
}n=l.sizes.size[0].source;
VMM.Lib.attr(g,"src",o);
VMM.attachElement(j,"<img src='"+n+"'>")
}).error(function(f,h,g){trace("FLICKR error");
trace("FLICKR ERROR: "+h+" "+f.responseText)
}).success(function(f){clearTimeout(c);
e()
})
},pushQue:function(){if(VMM.master_config.flickr.que.length>0){VMM.ExternalAPI.flickr.create(VMM.master_config.flickr.que[0],VMM.ExternalAPI.flickr.pushQue);
VMM.master_config.flickr.que.remove(0)
}},sizes:function(b){var a="";
if(b<=75){a="Thumbnail"
}else{if(b<=180){a="Small"
}else{if(b<=240){a="Small 320"
}else{if(b<=375){a="Medium"
}else{if(b<=480){a="Medium 640"
}else{if(b<=600){a="Medium 800"
}else{a="Large"
}}}}}}return a
}},instagram:{get:function(b,a){if(a){return"http://instagr.am/p/"+b+"/media/?size=t"
}else{return"http://instagr.am/p/"+b+"/media/?size="+VMM.ExternalAPI.instagram.sizes(VMM.master_config.sizes.api.height)
}},sizes:function(b){var a="";
if(b<=150){a="t"
}else{if(b<=306){a="m"
}else{a="l"
}}return a
}},soundcloud:{get:function(a,c){var b={mid:a,id:c};
VMM.master_config.soundcloud.que.push(b);
VMM.master_config.soundcloud.active=true
},create:function(b,c){var a="http://soundcloud.com/oembed?url="+b.mid+"&format=js&callback=?";
VMM.getJSON(a,function(e){VMM.attachElement("#"+b.id,e.html);
c()
})
},pushQue:function(){if(VMM.master_config.soundcloud.que.length>0){VMM.ExternalAPI.soundcloud.create(VMM.master_config.soundcloud.que[0],VMM.ExternalAPI.soundcloud.pushQue);
VMM.master_config.soundcloud.que.remove(0)
}}},wikipedia:{get:function(b,d,c){var a={url:b,id:d,lang:c};
VMM.master_config.wikipedia.que.push(a);
VMM.master_config.wikipedia.active=true
},create:function(b,d){var a="http://"+b.lang+".wikipedia.org/w/api.php?action=query&prop=extracts&redirects=&titles="+b.url+"&exintro=1&format=json&callback=?";
callback_timeout=setTimeout(d,VMM.master_config.timers.api,b);
if(VMM.Browser.browser=="Explorer"&&parseInt(VMM.Browser.version,10)>=7&&window.XDomainRequest){var c="<h4><a href='http://"+VMM.master_config.language.api.wikipedia+".wikipedia.org/wiki/"+b.url+"' target='_blank'>"+b.url+"</a></h4>";
c+="<span class='wiki-source'>"+VMM.master_config.language.messages.wikipedia+"</span>";
c+="<p>Wikipedia entry unable to load using Internet Explorer 8 or below.</p>";
VMM.attachElement("#"+b.id,c)
}VMM.getJSON(a,function(m){if(m.query){var g,f,e="",l="",j=1,k=[];
g=VMM.Util.getObjectAttributeByIndex(m.query.pages,0).extract;
f=VMM.Util.getObjectAttributeByIndex(m.query.pages,0).title;
if(g.match("<p>")){k=g.split("<p>")
}else{k.push(g)
}for(var h=0;
h<k.length;
h++){if(h+1<=j&&h+1<k.length){l+="<p>"+k[h+1]
}}e="<h4><a href='http://"+VMM.master_config.language.api.wikipedia+".wikipedia.org/wiki/"+f+"' target='_blank'>"+f+"</a></h4>";
e+="<span class='wiki-source'>"+VMM.master_config.language.messages.wikipedia+"</span>";
e+=VMM.Util.linkify_wikipedia(l);
if(g.match("REDIRECT")){}else{VMM.attachElement("#"+b.id,e)
}}}).error(function(e,g,f){trace("WIKIPEDIA error");
trace("WIKIPEDIA ERROR: "+g+" "+e.responseText);
trace(f);
VMM.attachElement("#"+b.id,VMM.MediaElement.loadingmessage("<p>Wikipedia is not responding</p>"));
clearTimeout(callback_timeout);
if(VMM.master_config.wikipedia.tries<4){trace("WIKIPEDIA ATTEMPT "+VMM.master_config.wikipedia.tries);
trace(b);
VMM.master_config.wikipedia.tries++;
VMM.ExternalAPI.wikipedia.create(b,d)
}else{d()
}}).success(function(e){VMM.master_config.wikipedia.tries=0;
clearTimeout(callback_timeout);
d()
})
},pushQue:function(){if(VMM.master_config.wikipedia.que.length>0){trace("WIKIPEDIA PUSH QUE "+VMM.master_config.wikipedia.que.length);
VMM.ExternalAPI.wikipedia.create(VMM.master_config.wikipedia.que[0],VMM.ExternalAPI.wikipedia.pushQue);
VMM.master_config.wikipedia.que.remove(0)
}}},youtube:{get:function(c,e,d){var b="http://gdata.youtube.com/feeds/api/videos/"+c+"?v=2&alt=jsonc&callback=?",a={mid:c,id:e,start:d};
VMM.master_config.youtube.que.push(a);
if(!VMM.master_config.youtube.active){if(!VMM.master_config.youtube.api_loaded){VMM.LoadLib.js("http://www.youtube.com/player_api",function(){trace("YouTube API Library Loaded")
})
}}VMM.getJSON(b,function(f){VMM.ExternalAPI.youtube.createThumb(f,a)
})
},create:function(a){if(typeof(a.start)!="undefined"){var e=a.start.toString(),d=0,b=0;
if(e.match("m")){e=e.split("=")[1];
d=parseInt(e.split("m")[0],10);
b=parseInt(e.split("m")[1].split("s")[0],10);
a.start=(d*60)+b
}else{a.start=0
}}else{a.start=0
}var c={active:false,player:{},name:a.id,playing:false};
c.player[a.id]=new YT.Player(a.id,{height:"390",width:"640",playerVars:{enablejsapi:1,color:"white",showinfo:0,theme:"light",start:a.start,rel:0},videoId:a.mid,events:{onReady:VMM.ExternalAPI.youtube.onPlayerReady,onStateChange:VMM.ExternalAPI.youtube.onStateChange}});
VMM.master_config.youtube.array.push(c)
},createThumb:function(c,a){trace("CREATE THUMB");
trace(c);
trace(a);
var b="#"+a.id+"_thumb";
VMM.attachElement(b,"<img src='"+c.data.thumbnail.sqDefault+"'>")
},pushQue:function(){for(var a=0;
a<VMM.master_config.youtube.que.length;
a++){VMM.ExternalAPI.youtube.create(VMM.master_config.youtube.que[a])
}VMM.master_config.youtube.que=[]
},onAPIReady:function(){VMM.master_config.youtube.active=true;
VMM.ExternalAPI.youtube.pushQue()
},stopPlayers:function(){for(var a=0;
a<VMM.master_config.youtube.array.length;
a++){if(VMM.master_config.youtube.array[a].playing){var b=VMM.master_config.youtube.array[a].name;
VMM.master_config.youtube.array[a].player[b].stopVideo()
}}},onStateChange:function(b){for(var a=0;
a<VMM.master_config.youtube.array.length;
a++){var c=VMM.master_config.youtube.array[a].name;
if(VMM.master_config.youtube.array[a].player[c]==b.target){if(b.data==YT.PlayerState.PLAYING){VMM.master_config.youtube.array[a].playing=true
}}}},onPlayerReady:function(a){}},vimeo:{get:function(b,c){var a={mid:b,id:c};
VMM.master_config.vimeo.que.push(a);
VMM.master_config.vimeo.active=true
},create:function(b,c){trace("VIMEO CREATE");
var a="http://vimeo.com/api/v2/video/"+b.mid+".json";
VMM.getJSON(a,function(e){VMM.ExternalAPI.vimeo.createThumb(e,b);
c()
})
},createThumb:function(c,a){trace("VIMEO CREATE THUMB");
var b="#"+a.id+"_thumb";
VMM.attachElement(b,"<img src='"+c[0].thumbnail_small+"'>")
},pushQue:function(){if(VMM.master_config.vimeo.que.length>0){VMM.ExternalAPI.vimeo.create(VMM.master_config.vimeo.que[0],VMM.ExternalAPI.vimeo.pushQue);
VMM.master_config.vimeo.que.remove(0)
}}}}
}function onYouTubePlayerAPIReady(){trace("GLOBAL YOUTUBE API CALLED");
VMM.ExternalAPI.youtube.onAPIReady()
}if(typeof VMM!="undefined"&&typeof VMM.MediaElement=="undefined"){VMM.MediaElement=({init:function(){return this
},loadingmessage:function(a){return"<div class='loading'><div class='loading-container'><div class='loading-icon'></div><div class='message'><p>"+a+"</p></div></div></div>"
},thumbnail:function(f,a,e,c){var b=16,g=24,d="";
if(a!=null&&a!=""){b=a
}if(e!=null&&e!=""){g=e
}if(c!=null&&c!=""){d=c
}if(f.thumbnail!=null&&f.thumbnail!=""){return"<div class='thumbnail thumb-custom' id='"+c+"_custom_thumb'><img src='"+f.thumbnail+"'></div>"
}},create:function(d,f){var b=false,a=VMM.MediaElement.loadingmessage(VMM.master_config.language.messages.loading+"...");
if(d.media!=null&&d.media!=""){var e="",h="",i="",j="",g=false,c;
c=VMM.MediaType(d.media);
b=true;
if(d.credit!=null&&d.credit!=""){i="<div class='credit'>"+VMM.Util.linkify_with_twitter(d.credit,"_blank")+"</div>"
}if(d.caption!=null&&d.caption!=""){h="<div class='caption'>"+VMM.Util.linkify_with_twitter(d.caption,"_blank")+"</div>"
}if(c.type=="image"){e="<div class='media-image media-shadow'><img src='"+c.id+"' class='media-image'></div>"
}else{if(c.type=="flickr"){e="<div class='media-image media-shadow'><a href='"+c.link+"' target='_blank'><img id='"+f+"'></a></div>";
VMM.ExternalAPI.flickr.get(c.id,f,c.link)
}else{if(c.type=="instagram"){e="<div class='media-image media-shadow'><a href='"+c.link+"' target='_blank'><img src='"+VMM.ExternalAPI.instagram.get(c.id)+"'></a></div>"
}else{if(c.type=="googledoc"){e="<div class='media-frame media-shadow doc' id='"+f+"'>"+a+"</div>";
VMM.ExternalAPI.googledocs.get(c.id,f)
}else{if(c.type=="youtube"){e="<div class='media-shadow'><div class='media-frame video youtube' id='"+f+"'>"+a+"</div></div>";
VMM.ExternalAPI.youtube.get(c.id,f,c.start)
}else{if(c.type=="vimeo"){e="<div class='media-shadow'><iframe class='media-frame video vimeo' autostart='false' frameborder='0' width='100%' height='100%' src='http://player.vimeo.com/video/"+c.id+"?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff'></iframe></div>";
VMM.ExternalAPI.vimeo.get(c.id,f)
}else{if(c.type=="dailymotion"){e="<div class='media-shadow'><iframe class='media-frame video dailymotion' autostart='false' frameborder='0' width='100%' height='100%' src='http://www.dailymotion.com/embed/video/"+c.id+"'></iframe></div>"
}else{if(c.type=="twitter"){e="<div class='twitter' id='"+f+"'>"+a+"</div>";
g=true;
VMM.ExternalAPI.twitter.get(c.id,f)
}else{if(c.type=="twitter-ready"){g=true;
e=c.id
}else{if(c.type=="soundcloud"){e="<div class='media-frame media-shadow soundcloud' id='"+f+"'>"+a+"</div>";
VMM.ExternalAPI.soundcloud.get(c.id,f)
}else{if(c.type=="google-map"){e="<div class='media-frame media-shadow map' id='"+f+"'>"+a+"</div>";
VMM.ExternalAPI.googlemaps.get(c.id,f)
}else{if(c.type=="googleplus"){j="googleplus_"+c.id;
e="<div class='googleplus' id='"+j+"'>"+a+"</div>";
g=true;
VMM.ExternalAPI.googleplus.get(c.user,c.id,f)
}else{if(c.type=="wikipedia"){e="<div class='wikipedia' id='"+f+"'>"+a+"</div>";
g=true;
VMM.ExternalAPI.wikipedia.get(c.id,f,c.lang)
}else{if(c.type=="storify"){g=true;
e="<div class='plain-text-quote'>"+c.id+"</div>"
}else{if(c.type=="quote"){g=true;
e="<div class='plain-text-quote'>"+c.id+"</div>"
}else{if(c.type=="unknown"){trace("NO KNOWN MEDIA TYPE FOUND TRYING TO JUST PLACE THE HTML");
g=true;
e="<div class='plain-text'><div class='container'>"+VMM.Util.properQuotes(c.id)+"</div></div>"
}else{if(c.type=="website"){e="<div class='media-shadow website'><a href='"+c.id+"' target='_blank'><img src='http://api1.thumbalizr.com/?url="+c.id.replace(/[\./]$/g,"")+"&width=300' class='media-image'></a></div>"
}else{trace("NO KNOWN MEDIA TYPE FOUND");
trace(c.type)
}}}}}}}}}}}}}}}}}e="<div class='media-container' >"+e+i+h+"</div>";
if(g){return"<div class='text-media'><div class='media-wrapper'>"+e+"</div></div>"
}else{return"<div class='media-wrapper'>"+e+"</div>"
}}}}).init()
}if(typeof VMM!="undefined"&&typeof VMM.MediaType=="undefined"){VMM.MediaType=function(e){var c=false,b={type:"unknown",id:"",start:0,link:"",lang:"",uniqueid:VMM.Util.unique_ID(6)};
if(e.match("div class='twitter'")){b.type="twitter-ready";
b.id=e;
c=true
}else{if(e.match("(www.)?youtube|youtu.be")){if(e.match("v=")){b.id=VMM.Util.getUrlVars(e)["v"];
b.start=VMM.Util.getUrlVars(e)["t"]
}else{if(e.match("/embed/")){b.id=e.split("embed/")[1].split(/[?&]/)[0];
b.start=e.split("embed/")[1].split(/[?&]/)[1]
}else{b.id=e.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
b.start=e.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[1]
}}b.type="youtube";
c=true
}else{if(e.match("(player.)?vimeo.com")){b.type="vimeo";
b.id=e.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
c=true
}else{if(e.match("(www.)?dailymotion.com")){b.id=e.split(/video\/|\/\/dailymotion\.com\//)[1];
b.type="dailymotion";
c=true
}else{if(e.match("(player.)?soundcloud.com")){b.type="soundcloud";
b.id=e;
c=true
}else{if(e.match("(www.)?twitter.com")&&e.match("status")){if(e.match("status/")){b.id=e.split("status/")[1]
}else{if(e.match("statuses/")){b.id=e.split("statuses/")[1]
}else{b.id=""
}}b.type="twitter";
c=true
}else{if(e.match("maps.google")&&!e.match("staticmap")){b.type="google-map";
b.id=e.split(/src=['|"][^'|"]*?['|"]/gi);
c=true
}else{if(e.match("plus.google")){b.type="googleplus";
b.id=e.split("/posts/")[1];
if(e.split("/posts/")[0].match("u/0/")){b.user=e.split("u/0/")[1].split("/posts")[0]
}else{b.user=e.split("google.com/")[1].split("/posts/")[0]
}c=true
}else{if(e.match("flickr.com/photos")){b.type="flickr";
b.id=e.split("photos/")[1].split("/")[1];
b.link=e;
c=true
}else{if(e.match("instagr.am/p/")){b.type="instagram";
b.link=e;
b.id=e.split("/p/")[1].split("/")[0];
c=true
}else{if(e.match(/jpg|jpeg|png|gif/i)||e.match("staticmap")||e.match("yfrog.com")||e.match("twitpic.com")){b.type="image";
b.id=e;
c=true
}else{if(VMM.FileExtention.googleDocType(e)){b.type="googledoc";
b.id=e;
c=true
}else{if(e.match("(www.)?wikipedia.org")){b.type="wikipedia";
var a=e.split("wiki/")[1].split("#")[0].replace("_"," ");
b.id=a.replace(" ","%20");
b.lang=e.split("//")[1].split(".wikipedia")[0];
c=true
}else{if(e.indexOf("http://")==0){b.type="website";
b.id=e;
c=true
}else{if(e.match("storify")){b.type="storify";
b.id=e;
c=true
}else{if(e.match("blockquote")){b.type="quote";
b.id=e;
c=true
}else{trace("unknown media");
b.type="unknown";
b.id=e;
c=true
}}}}}}}}}}}}}}}}if(c){return b
}else{trace("No valid media id detected");
trace(e)
}return false
}
}if(typeof VMM!="undefined"&&typeof VMM.Media=="undefined"){VMM.Media=function(l,m,g,k){var f={};
var d=false;
var c={width:720,height:400,content_width:720,content_height:400,ease:"easeInOutExpo",duration:1000,spacing:15};
var b="";
var o="";
var a="";
var e="";
var j=l;
if(m!=null&&m!=""){c.width=m
}if(g!=null&&g!=""){c.height=g
}this.init=function(h){if(typeof h!="undefined"){this.setData(h)
}else{trace("WAITING ON DATA")
}};
var n=function(q,p,r){b=VMM.appendAndGetElement(j,"<div>","media");
o=VMM.appendAndGetElement(b,"<div>","container");
a=VMM.appendAndGetElement(o,"<div>","media-container");
if(f.media!=null&&f.media!=""){d=true;
var h={};
h=VMM.MediaType(f.media);
if(h.type=="image"){VMM.appendElement(a,"<img src='"+h.id+"'>")
}else{if(h.type=="youtube"){VMM.appendElement(a,"<iframe frameborder='0' src='http://www.youtube.com/embed/"+h.id+"?&rel=0&theme=light&showinfo=0&hd=1&autohide=0&color=white' allowfullscreen>")
}else{if(h.type=="vimeo"){VMM.appendElement(a,"<iframe frameborder='0' src='http://player.vimeo.com/video/"+h.id+"?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff'>")
}else{}}}if(f.credit!=null&&f.credit!=""){VMM.appendElement(o,VMM.createElement("div",f.credit,"credit"))
}if(f.caption!=null&&f.caption!=""){VMM.appendElement(o,VMM.createElement("div",f.caption,"caption"))
}}};
this.setData=function(h){if(typeof h!="undefined"){f=h;
n()
}else{trace("NO DATA")
}};
function i(){}};
VMM.Media.prototype.height=function(a){if(a!=null&&a!=""){config.height=a;
reSize()
}else{return config.height
}};
VMM.Media.prototype.width=function(a){if(a!=null&&a!=""){config.width=a;
reSize()
}else{return config.width
}};
VMM.Media.prototype.getData=function(){return data
};
VMM.Media.prototype.setConfig=function(a){if(typeof a!="undefined"){config=a
}else{trace("NO CONFIG DATA")
}};
VMM.Media.prototype.getConfig=function(){return config
};
VMM.Media.prototype.setSize=function(a,b){if(a!=null){config.width=a
}if(b!=null){config.height=b
}if(_active){reSize()
}};
VMM.Media.prototype.active=function(){return _active
}
}if(typeof VMM!="undefined"&&typeof VMM.TextElement=="undefined"){VMM.TextElement=({init:function(){return this
},create:function(a){return a
}}).init()
}if(typeof VMM!="undefined"&&typeof VMM.DragSlider=="undefined"){VMM.DragSlider=function(){var h={element:"",element_move:"",constraint:"",sliding:false,pagex:{start:0,end:0},left:{start:0,end:0},time:{start:0,end:0},touch:false,ease:"easeOutExpo"},n={down:"mousedown",up:"mouseup",leave:"mouseleave",move:"mousemove"},j={down:"mousedown",up:"mouseup",leave:"mouseleave",move:"mousemove"},i={down:"touchstart",up:"touchend",leave:"mouseleave",move:"touchmove"};
this.createPanel=function(q,o,p,r){h.element=q;
h.element_move=o;
if(p!=null&&p!=""){h.constraint=p
}else{h.constraint=false
}if(r){h.touch=r
}else{h.touch=false
}trace("TOUCH"+h.touch);
if(h.touch){n=i
}else{n=j
}k(h.element,h.element_move)
};
this.updateConstraint=function(o){trace("updateConstraint");
h.constraint=o
};
var k=function(p,o){VMM.bindEvent(p,c,n.down,{element:o,delement:p});
VMM.bindEvent(p,e,n.up,{element:o,delement:p});
VMM.bindEvent(p,m,n.leave,{element:o,delement:p})
};
this.cancelSlide=function(o){VMM.unbindEvent(h.element,b,n.move);
return true
};
var m=function(o){VMM.unbindEvent(o.data.delement,b,n.move);
if(!h.touch){o.preventDefault()
}o.stopPropagation();
if(h.sliding){h.sliding=false;
d(o.data.element,o.data.delement,o);
return false
}else{return true
}};
var c=function(o){l(o.data.element,o.data.delement,o);
if(!h.touch){o.preventDefault()
}o.stopPropagation();
return true
};
var e=function(o){if(!h.touch){o.preventDefault()
}o.stopPropagation();
if(h.sliding){h.sliding=false;
d(o.data.element,o.data.delement,o);
return false
}else{return true
}};
var b=function(o){g(o.data.element,o);
o.preventDefault();
o.stopPropagation();
return false
};
var l=function(p,o,q){if(h.touch){trace("IS TOUCH");
VMM.Lib.css(p,"-webkit-transition-duration","0");
h.pagex.start=q.originalEvent.touches[0].screenX
}else{h.pagex.start=q.pageX
}h.left.start=f(p);
h.time.start=new Date().getTime();
VMM.Lib.stop(p);
VMM.bindEvent(o,b,n.move,{element:p})
};
var d=function(p,o,q){VMM.unbindEvent(o,b,n.move);
a(p,q)
};
var g=function(o,p){h.sliding=true;
if(h.touch){h.pagex.end=p.originalEvent.touches[0].screenX
}else{h.pagex.end=p.pageX
}h.left.end=f(o);
VMM.Lib.css(o,"left",-(h.pagex.start-h.pagex.end-h.left.start))
};
var a=function(p,q){var o={left:h.left.end,left_adjust:0,change:{x:0},time:(new Date().getTime()-h.time.start)*10,time_adjust:(new Date().getTime()-h.time.start)*10},r=3000;
if(h.touch){r=6000
}o.change.x=r*(Math.abs(h.pagex.end)-Math.abs(h.pagex.start));
o.left_adjust=Math.round(o.change.x/o.time);
o.left=Math.min(o.left+o.left_adjust);
if(h.constraint){if(o.left>h.constraint.left){o.left=h.constraint.left;
if(o.time>5000){o.time=5000
}}else{if(o.left<h.constraint.right){o.left=h.constraint.right;
if(o.time>5000){o.time=5000
}}}}VMM.fireEvent(p,"DRAGUPDATE",[o]);
if(o.time>0){if(h.touch){VMM.Lib.animate(p,o.time,"easeOutCirc",{left:o.left})
}else{VMM.Lib.animate(p,o.time,h.ease,{left:o.left})
}}};
var f=function(o){return parseInt(VMM.Lib.css(o,"left").substring(0,VMM.Lib.css(o,"left").length-2),10)
}
}
}if(typeof VMM!="undefined"&&typeof VMM.Slider=="undefined"){VMM.Slider=function(k,s){var w={},D;
var l,y,h,o;
var N=[],d=[],C=[];
var u="";
var J=1;
var K=960;
var L={move:false,x:10,y:0,off:0,dampen:48};
var j="";
var c=false;
var A=k;
var n={nextBtn:"",prevBtn:"",nextDate:"",prevDate:"",nextTitle:"",prevTitle:""};
var z;
var B="Process Execution Times";
if(typeof VMM.Timeline!="undefined"){D=VMM.Timeline.Config
}else{D={preload:4,current_slide:1,interval:10,something:0,width:720,height:400,ease:"easeInOutExpo",duration:1000,timeline:false,spacing:15,slider:{width:720,height:400,content:{width:720,height:400,padding:130},nav:{width:100,height:200}}}
}this.ver="0.6";
D.slider.width=D.width;
D.slider.height=D.height;
this.init=function(O){d=[];
C=[];
if(typeof O!="undefined"){this.setData(O)
}else{trace("WAITING ON DATA")
}};
this.width=function(O){if(O!=null&&O!=""){D.slider.width=O;
i()
}else{return D.slider.width
}};
this.height=function(O){if(O!=null&&O!=""){D.slider.height=O;
i()
}else{return D.slider.height
}};
this.setData=function(O){if(typeof O!="undefined"){N=O;
F()
}else{trace("NO DATA")
}};
this.getData=function(){return N
};
this.setConfig=function(O){if(typeof O!="undefined"){D=O
}else{trace("NO CONFIG DATA")
}};
this.getConfig=function(){return D
};
this.setSize=function(O,P){if(O!=null){D.slider.width=O
}if(P!=null){D.slider.height=P
}if(c){i()
}};
this.active=function(){return c
};
this.getCurrentNumber=function(){return J
};
this.setSlide=function(O){I(O);
displayDataForEvent(O,N[J].activityid)
};
this.setTitle=function(O){if(O!==undefined){B=O
}};
function g(){trace("onConfigSet")
}function i(R,Q){var P=true;
var S=false;
if(R!=null){P=R
}if(Q!=null){S=Q
}K=D.slider.width;
D.slider.nav.height=VMM.Lib.height(n.prevBtnContainer);
D.slider.content.width=K-(D.slider.content.padding*2);
VMM.Lib.width(o,(d.length*D.slider.content.width));
if(S){var O=d[J].leftpos();
VMM.Lib.css(h,"left",O)
}b();
E();
VMM.Lib.css(n.nextBtn,"left",(K-D.slider.nav.width));
VMM.Lib.height(n.prevBtn,D.slider.height);
VMM.Lib.height(n.nextBtn,D.slider.height);
VMM.Lib.css(n.nextBtnContainer,"top",((D.slider.height/2)-(D.slider.nav.height/2))+10);
VMM.Lib.css(n.prevBtnContainer,"top",((D.slider.height/2)-(D.slider.nav.height/2))+10);
VMM.Lib.height(y,D.slider.height);
VMM.Lib.width(y,K);
if(P){I(J,"linear",1)
}if(J==1){VMM.Lib.visible(n.prevBtn,false)
}}function a(O){if(J==d.length-1){}else{I(J+1);
v();
displayDataForEvent(J,N[J].activityid)
}}function M(O){if(J==0){I(J)
}else{I(J-1);
v();
displayDataForEvent(J,N[J].activityid)
}}function m(O){switch(O.keyCode){case 39:a(O);
break;
case 37:M(O);
break
}}function G(S,P){if(C.length==0){for(var R=0;
R<d.length;
R++){C.push(d[R].leftpos())
}}if(typeof P.left=="number"){var O=P.left;
var Q=-(d[J].leftpos());
if(O<Q-(D.slider_width/3)){a()
}else{if(O>Q+(D.slider_width/3)){M()
}else{VMM.Lib.animate(h,D.duration,D.ease,{left:Q})
}}}else{VMM.Lib.animate(h,D.duration,D.ease,{left:Q})
}if(typeof P.top=="number"){VMM.Lib.animate(h,D.duration,D.ease,{top:-P.top})
}else{}}function v(){D.current_slide=J;
VMM.fireEvent(A,"UPDATE")
}var r=function(O){N=O
};
var e=function(Q){VMM.attachElement(o,"");
d=[];
for(var O=0;
O<Q.length;
O++){var P=new VMM.Slider.Slide(Q[O],o);
d.push(P)
}};
var f=function(P){if(P){p()
}else{for(var O=0;
O<d.length;
O++){d[O].clearTimers()
}z=setTimeout(p,D.duration)
}};
var p=function(){for(var O=0;
O<d.length;
O++){d[O].enqueue=true
}for(var P=0;
P<D.preload;
P++){if(!((J+P)>d.length-1)){d[J+P].show();
d[J+P].enqueue=false
}if(!((J-P)<0)){d[J-P].show();
d[J-P].enqueue=false
}}if(d.length>50){for(var Q=0;
Q<d.length;
Q++){if(d[Q].enqueue){d[Q].hide()
}}}b()
};
var q=function(O){};
var b=function(){var T=".slider-item .layout-text-media .media .media-container ",O=".slider-item .layout-media .media .media-container ",S=".slider-item .media .media-container",U=".slider-item .media .media-container .media-shadow .caption",Q={text_media:{width:(D.slider.content.width/100)*60,height:D.slider.height-60,video:{width:0,height:0},text:{width:((D.slider.content.width/100)*40)-30,height:D.slider.height}},media:{width:D.slider.content.width,height:D.slider.height-110,video:{width:0,height:0}}};
VMM.master_config.sizes.api.width=Q.media.width;
VMM.master_config.sizes.api.height=Q.media.height;
Q.text_media.video=VMM.Util.ratio.fit(Q.text_media.width,Q.text_media.height,16,9);
Q.media.video=VMM.Util.ratio.fit(Q.media.width,Q.media.height,16,9);
VMM.Lib.css(".slider-item","width",D.slider.content.width);
VMM.Lib.height(".slider-item",D.slider.height);
var P=false;
if(K<=640){P=true
}else{if(VMM.Browser.device=="mobile"&&VMM.Browser.orientation=="portrait"){P=true
}else{if(VMM.Browser.device=="tablet"&&VMM.Browser.orientation=="portrait"){}}}if(P){Q.text_media.width=D.slider.content.width;
Q.text_media.height=((D.slider.height/100)*50)-50;
Q.media.height=((D.slider.height/100)*70)-40;
Q.text_media.video=VMM.Util.ratio.fit(Q.text_media.width,Q.text_media.height,16,9);
Q.media.video=VMM.Util.ratio.fit(Q.media.width,Q.media.height,16,9);
VMM.Lib.css(".slider-item .layout-text-media .text","width","100%");
VMM.Lib.css(".slider-item .layout-text-media .text","display","block");
VMM.Lib.css(".slider-item .layout-text-media .text .container","display","block");
VMM.Lib.css(".slider-item .layout-text-media .text .container","width",D.slider.content.width);
VMM.Lib.css(".slider-item .layout-text-media .media","float","none");
VMM.Lib.addClass(".slider-item .content-container","pad-top");
VMM.Lib.css(".slider-item .media blockquote p","line-height","18px");
VMM.Lib.css(".slider-item .media blockquote p","font-size","16px");
VMM.Lib.css(".slider-item","overflow-y","auto")
}else{VMM.Lib.css(".slider-item .layout-text-media .text","width","40%");
VMM.Lib.css(".slider-item .layout-text-media .text","display","table-cell");
VMM.Lib.css(".slider-item .layout-text-media .text .container","display","table-cell");
VMM.Lib.css(".slider-item .layout-text-media .text .container","width","auto");
VMM.Lib.css(".slider-item .layout-text-media .text .container .start","width",Q.text_media.text.width);
VMM.Lib.removeClass(".slider-item .content-container","pad-top");
VMM.Lib.css(".slider-item .layout-text-media .media","float","left");
VMM.Lib.css(".slider-item .layout-text-media","display","table");
VMM.Lib.css(".slider-item .media blockquote p","line-height","36px");
VMM.Lib.css(".slider-item .media blockquote p","font-size","28px");
VMM.Lib.css(".slider-item","display","table");
VMM.Lib.css(".slider-item","overflow-y","auto")
}VMM.Lib.css(T+".media-frame","max-width",Q.text_media.width);
VMM.Lib.height(T+".media-frame",Q.text_media.height);
VMM.Lib.width(T+".media-frame",Q.text_media.width);
VMM.Lib.css(T+"img","max-height",Q.text_media.height);
VMM.Lib.css(O+"img","max-height",Q.media.height);
VMM.Lib.css(T+"img","max-width",Q.text_media.width);
VMM.Lib.css(T+".avatar img","max-width",32);
VMM.Lib.css(T+".avatar img","max-height",32);
VMM.Lib.css(O+".avatar img","max-width",32);
VMM.Lib.css(O+".avatar img","max-height",32);
VMM.Lib.css(T+".article-thumb","max-width","50%");
VMM.Lib.css(O+".article-thumb","max-width",200);
VMM.Lib.width(T+".media-frame",Q.text_media.video.width);
VMM.Lib.height(T+".media-frame",Q.text_media.video.height);
VMM.Lib.width(O+".media-frame",Q.media.video.width);
VMM.Lib.height(O+".media-frame",Q.media.video.height);
VMM.Lib.css(O+".media-frame","max-height",Q.media.video.height);
VMM.Lib.css(O+".media-frame","max-width",Q.media.video.width);
VMM.Lib.height(O+".soundcloud",168);
VMM.Lib.height(T+".soundcloud",168);
VMM.Lib.width(O+".soundcloud",Q.media.width);
VMM.Lib.width(T+".soundcloud",Q.text_media.width);
VMM.Lib.css(S+".soundcloud","max-height",168);
VMM.Lib.height(T+".map",Q.text_media.height);
VMM.Lib.css(O+".map","max-height",Q.media.height);
VMM.Lib.width(O+".map",Q.media.width);
VMM.Lib.height(T+".doc",Q.text_media.height);
VMM.Lib.height(O+".doc",Q.media.height);
VMM.Lib.width(O+".wikipedia",Q.media.width);
VMM.Lib.width(O+".twitter",Q.media.width);
VMM.Lib.width(O+".plain-text-quote",Q.media.width);
VMM.Lib.width(O+".plain-text",Q.media.width);
VMM.Lib.css(T+".caption","max-width",Q.text_media.video.width);
VMM.Lib.css(O+".caption","max-width",Q.media.video.width);
for(var R=0;
R<d.length;
R++){d[R].layout(P);
if(d[R].content_height()>D.slider.height+20){d[R].css("display","block")
}else{d[R].css("display","table")
}}};
var E=function(){var P=0;
for(var O=0;
O<d.length;
O++){P=O*(D.slider.width+D.spacing);
d[O].leftpos(P)
}};
var H=function(Q){var P="linear";
for(var O=0;
O<d.length;
O++){if(O==J){d[O].animate(D.duration,P,{opacity:1})
}else{if(O==J-1||O==J+1){d[O].animate(D.duration,P,{opacity:0.1})
}else{d[O].opacity(Q)
}}}};
var I=function(Q,T,U,W,X){VMM.ExternalAPI.youtube.stopPlayers();
J=Q;
var O=D.ease;
var V=D.duration;
var Y=false;
var R=false;
var aa=d[J].leftpos();
var Z="";
if(J==1){R=true
}if(J+1>=d.length){Y=true
}if(T!=null&&T!=""){O=T
}if(U!=null&&U!=""){V=U
}if(R){VMM.Lib.visible(n.prevBtn,false)
}else{VMM.Lib.visible(n.prevBtn,true);
Z=VMM.Util.unlinkify(N[J-1].title);
if(D.type=="timeline"){if(typeof N[J-1].date==="undefined"){VMM.attachElement(n.prevDate,Z);
VMM.attachElement(n.prevTitle,"")
}else{VMM.attachElement(n.prevDate,VMM.Date.prettyDate(N[J-1].startdate));
VMM.attachElement(n.prevTitle,Z)
}}else{VMM.attachElement(n.prevTitle,Z)
}}if(Y){VMM.Lib.visible(n.nextBtn,false)
}else{VMM.Lib.visible(n.nextBtn,true);
Z=VMM.Util.unlinkify(N[J+1].title);
if(D.type=="timeline"){if(typeof N[J+1].date==="undefined"){VMM.attachElement(n.nextDate,Z);
VMM.attachElement(n.nextTitle,"")
}else{VMM.attachElement(n.nextDate,VMM.Date.prettyDate(N[J+1].startdate));
VMM.attachElement(n.nextTitle,Z)
}}else{VMM.attachElement(n.nextTitle,Z)
}}if(X){VMM.fireEvent(A,"LOADED")
}if(d[J].height()>D.slider_height){VMM.Lib.css(".slider","overflow-y","scroll")
}else{VMM.Lib.css(A,"overflow-y","hidden");
var P=0;
try{P=VMM.Lib.prop(A,"scrollHeight");
VMM.Lib.animate(A,V,O,{scrollTop:P-VMM.Lib.height(A)})
}catch(S){P=VMM.Lib.height(A)
}}f()
};
var t=function(){var O="<div class='icon'>&nbsp;</div>";
n.nextBtn=VMM.appendAndGetElement(l,"<div id='nav-next'>","nav-next");
n.prevBtn=VMM.appendAndGetElement(l,"<div>","nav-previous");
n.nextBtnContainer=VMM.appendAndGetElement(n.nextBtn,"<div>","nav-container",O);
n.prevBtnContainer=VMM.appendAndGetElement(n.prevBtn,"<div>","nav-container",O);
if(D.type=="timeline"){n.nextDate=VMM.appendAndGetElement(n.nextBtnContainer,"<div>","date","");
n.prevDate=VMM.appendAndGetElement(n.prevBtnContainer,"<div>","date","")
}n.nextTitle=VMM.appendAndGetElement(n.nextBtnContainer,"<div>","title","Title Goes Here");
n.prevTitle=VMM.appendAndGetElement(n.prevBtnContainer,"<div>","title","Title Goes Here");
VMM.bindEvent(".nav-next",a);
VMM.bindEvent(".nav-previous",M);
VMM.bindEvent(window,m,"keydown");
$tmpnext=VMM.appendAndGetElement(l,"<div>","tmpnext");
VMM.bindEvent($tmpnext,a,"PLAY")
};
var F=function(){VMM.attachElement(A,"");
l=VMM.getElement("div.slider");
y=VMM.appendAndGetElement(l,"<div>","slider-container-mask");
var O="<center><div class='outterchart'> 						    <h6>"+B+"</h6> 							<p id='chartcontent'> 					        <svg id='chart' style='height:290px;width:400px'></svg> 							</p> 							</div></center>";
h=VMM.appendAndGetElement(y,"<div>","",O);
t();
e(N);
var P=3000;
if(VMM.Browser.device=="tablet"||VMM.Browser.device=="mobile"){D.duration=500;
P=1000
}else{if(VMM.Browser.device=="mobile"){}else{}}i(false,true);
VMM.Lib.visible(n.prevBtn,false);
I(D.current_slide,"easeOutExpo",P,true,true);
displayDataForEvent(D.current_slide,N[D.current_slide].activityid);
c=true
}
}
}if(typeof VMM.Slider!="undefined"){VMM.Slider.Slide=function(v,t){var y,r,p,q,f,w,A=v,a={},f="",k="",s=false,b=false,l=false,g=true,j=false,h="slide_",o={pushque:"",render:"",relayout:"",remove:"",skinny:false},n={pushque:500,render:100,relayout:100,remove:30000};
h=h+A.uniqueid;
this.enqueue=g;
this.id=h;
f=VMM.appendAndGetElement(t,"<div>","slider-item");
w={slide:"",text:"",media:"",media_element:"",layout:"content-container layout",has:{headline:false,text:false,media:false}};
this.show=function(c){g=false;
o.skinny=c;
j=false;
clearTimeout(o.remove);
if(!s){if(b){clearTimeout(o.relayout);
o.relayout=setTimeout(u,n.relayout)
}else{z(c)
}}};
this.hide=function(){if(s&&!j){j=true;
clearTimeout(o.remove);
o.remove=setTimeout(e,n.remove)
}};
this.clearTimers=function(){clearTimeout(o.relayout);
clearTimeout(o.pushque);
clearTimeout(o.render)
};
this.layout=function(c){if(s&&b){i(c)
}};
this.elem=function(){return f
};
this.position=function(){return VMM.Lib.position(f)
};
this.leftpos=function(c){if(typeof c!="undefined"){VMM.Lib.css(f,"left",c)
}else{return VMM.Lib.position(f).left
}};
this.animate=function(C,B,c){VMM.Lib.animate(f,C,B,c)
};
this.css=function(d,c){VMM.Lib.css(f,d,c)
};
this.opacity=function(c){VMM.Lib.css(f,"opacity",c)
};
this.width=function(){return VMM.Lib.width(f)
};
this.height=function(){return VMM.Lib.height(f)
};
this.content_height=function(){var c=VMM.Lib.find(f,".content")[0];
if(c!="undefined"&&c!=null){return VMM.Lib.height(c)
}else{return 0
}};
var z=function(c){trace("RENDER "+h);
s=true;
b=true;
o.skinny=c;
m();
clearTimeout(o.pushque);
clearTimeout(o.render);
o.pushque=setTimeout(VMM.ExternalAPI.pushQues,n.pushque)
};
var e=function(){trace("REMOVE SLIDE TIMER FINISHED");
s=false;
VMM.Lib.detach(r);
VMM.Lib.detach(y)
};
var u=function(){s=true;
i(o.skinny,true)
};
var i=function(c,d){if(w.has.text){if(c){if(!l||d){VMM.Lib.removeClass(p,"pad-left");
VMM.Lib.detach(r);
VMM.Lib.detach(y);
VMM.Lib.append(p,r);
VMM.Lib.append(p,y);
l=true
}}else{if(l||d){VMM.Lib.addClass(p,"pad-left");
VMM.Lib.detach(r);
VMM.Lib.detach(y);
VMM.Lib.append(p,y);
VMM.Lib.append(p,r);
l=false
}}}else{if(d){if(w.has.headline){VMM.Lib.detach(r);
VMM.Lib.append(p,r)
}VMM.Lib.detach(y);
VMM.Lib.append(p,y)
}}};
var m=function(){trace("BUILDSLIDE");
q=VMM.appendAndGetElement(f,"<div>","content");
p=VMM.appendAndGetElement(q,"<div>");
if(A.startdate!=null&&A.startdate!=""){if(type.of(A.startdate)=="date"){if(A.type!="start"){var B=VMM.Date.prettyDate(A.startdate);
var d=VMM.Date.prettyDate(A.enddate);
var c="";
if(A.tag!=null&&A.tag!=""){c=VMM.createElement("span",A.tag,"slide-tag")
}if(B!=d){w.text+=VMM.createElement("h2",B+" &mdash; "+d+c,"date")
}else{w.text+=VMM.createElement("h2",B+c,"date")
}}}}if(A.headline!=null&&A.headline!=""){w.has.headline=true;
if(A.type=="start"){w.text+=VMM.createElement("h2",VMM.Util.linkify_with_twitter(A.headline,"_blank"),"start")
}else{w.text+=VMM.createElement("h3",VMM.Util.linkify_with_twitter(A.headline,"_blank"))
}}if(A.text!=null&&A.text!=""){w.has.text=true;
w.text+=VMM.createElement("p",VMM.Util.linkify_with_twitter(A.text,"_blank"))
}if(w.has.text||w.has.headline){w.text=VMM.createElement("div",w.text,"container");
r=VMM.appendAndGetElement(p,"<div>","text",VMM.TextElement.create(w.text))
}if(A.needs_slug){}if(A.asset!=null&&A.asset!=""){if(A.asset.media!=null&&A.asset.media!=""){w.has.media=true;
y=VMM.appendAndGetElement(p,"<div>","media",VMM.MediaElement.create(A.asset,A.uniqueid))
}}if(w.has.text){w.layout+="-text"
}if(w.has.media){w.layout+="-media"
}if(w.has.text){if(o.skinny){VMM.Lib.addClass(p,w.layout);
l=true
}else{VMM.Lib.addClass(p,w.layout);
VMM.Lib.addClass(p,"pad-left");
VMM.Lib.detach(r);
VMM.Lib.append(p,r)
}}else{VMM.Lib.addClass(p,w.layout)
}}
}
}if(typeof VMM!="undefined"&&typeof VMM.Language=="undefined"){VMM.Language={lang:"en",api:{wikipedia:"en"},date:{month:["January","February","March","April","May","June","July","August","September","October","November","December"],month_abbr:["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."],day:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],day_abbr:["Sun.","Mon.","Tues.","Wed.","Thurs.","Fri.","Sat."]},dateformats:{year:"yyyy",month_short:"mmm",month:"mmmm yyyy",full_short:"mmm d",full:"mmmm d',' yyyy",time_no_seconds_short:"h:MM TT",time_no_seconds_small_date:"h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",full_long:"mmm d',' yyyy 'at' hh:MM TT",full_long_small_date:"hh:MM TT'<br/><small>mmm d',' yyyy'</small>'",time_only:"hh:MM:ss:L TT"},messages:{loading_timeline:"Loading Timeline... ",return_to_title:"Return to Title",expand_timeline:"Expand Timeline",contract_timeline:"Contract Timeline",wikipedia:"From Wikipedia, the free encyclopedia",loading_content:"Loading Content",loading:"Loading"}}
}var Aes={};
Aes.cipher=function(e,a){var d=4;
var h=a.length/d-1;
var g=[[],[],[],[]];
for(var f=0;
f<4*d;
f++){g[f%4][Math.floor(f/4)]=e[f]
}g=Aes.addRoundKey(g,a,0,d);
for(var c=1;
c<h;
c++){g=Aes.subBytes(g,d);
g=Aes.shiftRows(g,d);
g=Aes.mixColumns(g,d);
g=Aes.addRoundKey(g,a,c,d)
}g=Aes.subBytes(g,d);
g=Aes.shiftRows(g,d);
g=Aes.addRoundKey(g,a,h,d);
var b=new Array(4*d);
for(var f=0;
f<4*d;
f++){b[f]=g[f%4][Math.floor(f/4)]
}return b
};
Aes.keyExpansion=function(f){var d=4;
var b=f.length/4;
var g=b+6;
var e=new Array(d*(g+1));
var h=new Array(4);
for(var c=0;
c<b;
c++){var a=[f[4*c],f[4*c+1],f[4*c+2],f[4*c+3]];
e[c]=a
}for(var c=b;
c<(d*(g+1));
c++){e[c]=new Array(4);
for(var j=0;
j<4;
j++){h[j]=e[c-1][j]
}if(c%b==0){h=Aes.subWord(Aes.rotWord(h));
for(var j=0;
j<4;
j++){h[j]^=Aes.rCon[c/b][j]
}}else{if(b>6&&c%b==4){h=Aes.subWord(h)
}}for(var j=0;
j<4;
j++){e[c][j]=e[c-b][j]^h[j]
}}return e
};
Aes.subBytes=function(b,a){for(var d=0;
d<4;
d++){for(var e=0;
e<a;
e++){b[d][e]=Aes.sBox[b[d][e]]
}}return b
};
Aes.shiftRows=function(d,a){var b=new Array(4);
for(var e=1;
e<4;
e++){for(var f=0;
f<4;
f++){b[f]=d[e][(f+e)%a]
}for(var f=0;
f<4;
f++){d[e][f]=b[f]
}}return d
};
Aes.mixColumns=function(h,f){for(var j=0;
j<4;
j++){var e=new Array(4);
var d=new Array(4);
for(var g=0;
g<4;
g++){e[g]=h[g][j];
d[g]=h[g][j]&128?h[g][j]<<1^283:h[g][j]<<1
}h[0][j]=d[0]^e[1]^d[1]^e[2]^e[3];
h[1][j]=e[0]^d[1]^e[2]^d[2]^e[3];
h[2][j]=e[0]^e[1]^d[2]^e[3]^d[3];
h[3][j]=e[0]^d[0]^e[1]^e[2]^d[3]
}return h
};
Aes.addRoundKey=function(f,a,d,b){for(var e=0;
e<4;
e++){for(var g=0;
g<b;
g++){f[e][g]^=a[d*4+g][e]
}}return f
};
Aes.subWord=function(a){for(var b=0;
b<4;
b++){a[b]=Aes.sBox[a[b]]
}return a
};
Aes.rotWord=function(a){var c=a[0];
for(var b=0;
b<3;
b++){a[b]=a[b+1]
}a[3]=c;
return a
};
Aes.sBox=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
Aes.rCon=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];
Aes.Ctr={};
Aes.Ctr.encrypt=function(j,a,u){var k=16;
if(!(u==128||u==192||u==256)){return""
}j=Utf8.encode(j);
a=Utf8.encode(a);
var l=u/8;
var f=new Array(l);
for(var s=0;
s<l;
s++){f[s]=isNaN(a.charCodeAt(s))?0:a.charCodeAt(s)
}var A=Aes.cipher(f,Aes.keyExpansion(f));
A=A.concat(A.slice(0,l-16));
var e=new Array(k);
var t=(new Date()).getTime();
var g=t%1000;
var d=Math.floor(t/1000);
var p=Math.floor(Math.random()*65535);
for(var s=0;
s<2;
s++){e[s]=(g>>>s*8)&255
}for(var s=0;
s<2;
s++){e[s+2]=(p>>>s*8)&255
}for(var s=0;
s<4;
s++){e[s+4]=(d>>>s*8)&255
}var n="";
for(var s=0;
s<8;
s++){n+=String.fromCharCode(e[s])
}var w=Aes.keyExpansion(A);
var r=Math.ceil(j.length/k);
var m=new Array(r);
for(var y=0;
y<r;
y++){for(var v=0;
v<4;
v++){e[15-v]=(y>>>v*8)&255
}for(var v=0;
v<4;
v++){e[15-v-4]=(y/4294967296>>>v*8)
}var h=Aes.cipher(e,w);
var q=y<r-1?k:(j.length-1)%k+1;
var o=new Array(q);
for(var s=0;
s<q;
s++){o[s]=h[s]^j.charCodeAt(y*k+s);
o[s]=String.fromCharCode(o[s])
}m[y]=o.join("")
}var z=n+m.join("");
z=Base64.encode(z);
return z
};
Aes.Ctr.decrypt=function(t,e,p){var m=16;
if(!(p==128||p==192||p==256)){return""
}t=Base64.decode(t);
e=Utf8.encode(e);
var n=p/8;
var j=new Array(n);
for(var o=0;
o<n;
o++){j[o]=isNaN(e.charCodeAt(o))?0:e.charCodeAt(o)
}var u=Aes.cipher(j,Aes.keyExpansion(j));
u=u.concat(u.slice(0,n-16));
var f=new Array(8);
ctrTxt=t.slice(0,8);
for(var o=0;
o<8;
o++){f[o]=ctrTxt.charCodeAt(o)
}var r=Aes.keyExpansion(u);
var g=Math.ceil((t.length-8)/m);
var h=new Array(g);
for(var s=0;
s<g;
s++){h[s]=t.slice(8+s*m,8+s*m+m)
}t=h;
var a=new Array(t.length);
for(var s=0;
s<g;
s++){for(var q=0;
q<4;
q++){f[15-q]=((s)>>>q*8)&255
}for(var q=0;
q<4;
q++){f[15-q-4]=(((s+1)/4294967296-1)>>>q*8)&255
}var l=Aes.cipher(f,r);
var d=new Array(t[s].length);
for(var o=0;
o<t[s].length;
o++){d[o]=l[o]^t[s].charCodeAt(o);
d[o]=String.fromCharCode(d[o])
}a[s]=d.join("")
}var k=a.join("");
k=Utf8.decode(k);
return k
};
var Base64={};
Base64.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
Base64.encode=function(n,p){p=(typeof p=="undefined")?false:p;
var g,b,a,r,o,k,j,h,i=[],f="",m,q,l;
var d=Base64.code;
q=p?n.encodeUTF8():n;
m=q.length%3;
if(m>0){while(m++<3){f+="=";
q+="\0"
}}for(m=0;
m<q.length;
m+=3){g=q.charCodeAt(m);
b=q.charCodeAt(m+1);
a=q.charCodeAt(m+2);
r=g<<16|b<<8|a;
o=r>>18&63;
k=r>>12&63;
j=r>>6&63;
h=r&63;
i[m/3]=d.charAt(o)+d.charAt(k)+d.charAt(j)+d.charAt(h)
}l=i.join("");
l=l.slice(0,l.length-f.length)+f;
return l
};
Base64.decode=function(n,e){e=(typeof e=="undefined")?false:e;
var g,b,a,o,k,i,h,q,j=[],p,m;
var f=Base64.code;
m=e?n.decodeUTF8():n;
for(var l=0;
l<m.length;
l+=4){o=f.indexOf(m.charAt(l));
k=f.indexOf(m.charAt(l+1));
i=f.indexOf(m.charAt(l+2));
h=f.indexOf(m.charAt(l+3));
q=o<<18|k<<12|i<<6|h;
g=q>>>16&255;
b=q>>>8&255;
a=q&255;
j[l/4]=String.fromCharCode(g,b,a);
if(h==64){j[l/4]=String.fromCharCode(g,b)
}if(i==64){j[l/4]=String.fromCharCode(g)
}}p=j.join("");
return e?p.decodeUTF8():p
};
var Utf8={};
Utf8.encode=function(a){var b=a.replace(/[\u0080-\u07ff]/g,function(e){var d=e.charCodeAt(0);
return String.fromCharCode(192|d>>6,128|d&63)
});
b=b.replace(/[\u0800-\uffff]/g,function(e){var d=e.charCodeAt(0);
return String.fromCharCode(224|d>>12,128|d>>6&63,128|d&63)
});
return b
};
Utf8.decode=function(b){var a=b.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(e){var d=((e.charCodeAt(0)&15)<<12)|((e.charCodeAt(1)&63)<<6)|(e.charCodeAt(2)&63);
return String.fromCharCode(d)
});
a=a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(e){var d=(e.charCodeAt(0)&31)<<6|e.charCodeAt(1)&63;
return String.fromCharCode(d)
});
return a
};
!function(b){var a=function(d,c){this.init("tooltip",d,c)
};
a.prototype={constructor:a,init:function(f,e,d){var g,c;
this.type=f;
this.$element=b(e);
this.options=this.getOptions(d);
this.enabled=true;
if(this.options.trigger!="manual"){g=this.options.trigger=="hover"?"mouseenter":"focus";
c=this.options.trigger=="hover"?"mouseleave":"blur";
this.$element.on(g,this.options.selector,b.proxy(this.enter,this));
this.$element.on(c,this.options.selector,b.proxy(this.leave,this))
}this.options.selector?(this._options=b.extend({},this.options,{trigger:"manual",selector:""})):this.fixTitle()
},getOptions:function(c){c=b.extend({},b.fn[this.type].defaults,c,this.$element.data());
if(c.delay&&typeof c.delay=="number"){c.delay={show:c.delay,hide:c.delay}
}return c
},enter:function(d){var c=b(d.currentTarget)[this.type](this._options).data(this.type);
if(!c.options.delay||!c.options.delay.show){c.show()
}else{c.hoverState="in";
setTimeout(function(){if(c.hoverState=="in"){c.show()
}},c.options.delay.show)
}},leave:function(d){var c=b(d.currentTarget)[this.type](this._options).data(this.type);
if(!c.options.delay||!c.options.delay.hide){c.hide()
}else{c.hoverState="out";
setTimeout(function(){if(c.hoverState=="out"){c.hide()
}},c.options.delay.hide)
}},show:function(){var g,c,i,e,h,d,f;
if(this.hasContent()&&this.enabled){g=this.tip();
this.setContent();
if(this.options.animation){g.addClass("fade")
}d=typeof this.options.placement=="function"?this.options.placement.call(this,g[0],this.$element[0]):this.options.placement;
c=/in/.test(d);
g.remove().css({top:0,left:0,display:"block"}).appendTo(c?this.$element:document.body);
i=this.getPosition(c);
e=g[0].offsetWidth;
h=g[0].offsetHeight;
switch(c?d.split(" ")[1]:d){case"bottom":f={top:i.top+i.height,left:i.left+i.width/2-e/2};
break;
case"top":f={top:i.top-h,left:i.left+i.width/2-e/2};
break;
case"left":f={top:i.top+i.height/2-h/2,left:i.left-e};
break;
case"right":f={top:i.top+i.height/2-h/2,left:i.left+i.width};
break
}g.css(f).addClass(d).addClass("in")
}},setContent:function(){var c=this.tip();
c.find(".tooltip-inner").html(this.getTitle());
c.removeClass("fade in top bottom left right")
},hide:function(){var c=this,d=this.tip();
d.removeClass("in");
function e(){var f=setTimeout(function(){d.off(b.support.transition.end).remove()
},500);
d.one(b.support.transition.end,function(){clearTimeout(f);
d.remove()
})
}b.support.transition&&this.$tip.hasClass("fade")?e():d.remove()
},fixTitle:function(){var c=this.$element;
if(c.attr("title")||typeof(c.attr("data-original-title"))!="string"){c.attr("data-original-title",c.attr("title")||"").removeAttr("title")
}},hasContent:function(){return this.getTitle()
},getPosition:function(c){return b.extend({},(c?{top:0,left:0}:this.$element.offset()),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})
},getTitle:function(){var e,c=this.$element,d=this.options;
e=c.attr("data-original-title")||(typeof d.title=="function"?d.title.call(c[0]):d.title);
e=e.toString().replace(/(^\s*|\s*$)/,"");
return e
},tip:function(){return this.$tip=this.$tip||b(this.options.template)
},validate:function(){if(!this.$element[0].parentNode){this.hide();
this.$element=null;
this.options=null
}},enable:function(){this.enabled=true
},disable:function(){this.enabled=false
},toggleEnabled:function(){this.enabled=!this.enabled
},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()
}};
b.fn.tooltip=function(c){return this.each(function(){var f=b(this),e=f.data("tooltip"),d=typeof c=="object"&&c;
if(!e){f.data("tooltip",(e=new a(this,d)))
}if(typeof c=="string"){e[c]()
}})
};
b.fn.tooltip.Constructor=a;
b.fn.tooltip.defaults={animation:true,delay:0,selector:false,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}
}(window.jQuery);
if(typeof VMM!="undefined"&&typeof VMM.Timeline=="undefined"){VMM.Timeline=function(E,M,H,u){var z,L,d,t,N,k;
var y={},O={},J=[],D={};
var j=false,e=false,m=false,c=false;
if(type.of(u)=="string"){k=u
}else{k="#timelinejs"
}N="1.68";
trace("TIMELINE VERSION "+N);
D={embed:false,events:{data_ready:"DATAREADY",messege:"MESSEGE",headline:"HEADLINE",slide_change:"SLIDE_CHANGE",resize:"resize"},id:k,type:"timeline",touch:false,maptype:"toner",preload:4,current_slide:1,hash_bookmark:false,start_at_end:false,start_at_slide:0,start_zoom_adjust:0,start_page:false,api_keys:{google:"",flickr:"",twitter:""},interval:10,something:0,width:960,height:540,spacing:15,loaded:{slider:false,timenav:false,percentloaded:0},nav:{start_page:false,interval_width:200,density:4,minor_width:0,minor_left:0,constraint:{left:0,right:0,right_min:0,right_max:0},zoom:{adjust:0},multiplier:{current:6,min:0.1,max:50},rows:[1,1,1],width:960,height:200,marker:{width:150,height:50}},feature:{width:960,height:540},slider:{width:720,height:400,content:{width:720,height:400,padding:130},nav:{width:100,height:200}},ease:"easeInOutExpo",duration:1000,language:VMM.Language};
if(E!=null&&E!=""){D.width=E;
j=true
}if(M!=null&&M!=""){D.height=M;
e=true
}if(window.location.hash){var I=window.location.hash.substring(1);
if(!isNaN(I)){D.current_slide=parseInt(I)
}}window.onhashchange=function(){var h=window.location.hash.substring(1);
if(D.hash_bookmark){if(c){G(parseInt(h))
}else{c=false
}}else{G(parseInt(h))
}};
var P=function(h){if(typeof embed_config=="object"){timeline_config=embed_config
}if(typeof timeline_config=="object"){trace("HAS TIMELINE CONFIG");
D=VMM.Util.mergeConfig(D,timeline_config)
}else{if(typeof h=="object"){D=VMM.Util.mergeConfig(D,h)
}}if(VMM.Browser.device=="mobile"||VMM.Browser.device=="tablet"){D.touch=true
}D.nav.width=D.width;
D.nav.height=200;
D.feature.width=D.width;
D.feature.height=D.height-D.nav.height;
D.nav.zoom.adjust=parseInt(D.start_zoom_adjust,10);
VMM.Timeline.Config=D;
VMM.master_config.Timeline=VMM.Timeline.Config;
this.events=D.events
};
var g=function(Q,R){z=VMM.getElement(k);
VMM.Lib.addClass(k,"vmm-timeline");
if(D.touch){VMM.Lib.addClass(k,"vmm-touch")
}else{VMM.Lib.addClass(k,"vmm-notouch")
}L=VMM.appendAndGetElement(z,"<div>","feedback","");
d=new VMM.Slider(k+" div.slider",D);
t=new VMM.Timeline.TimeNav(k+" div.navigation");
if(!j){D.width=VMM.Lib.width(z)
}else{VMM.Lib.width(z,D.width)
}if(!e){D.height=VMM.Lib.height(z)
}else{VMM.Lib.height(z,D.height)
}};
function b(h,w){trace("onDataReady");
trace(w);
O=w.timeline;
if(type.of(O.era)=="array"){}else{O.era=[]
}K()
}function B(){F()
}function i(){n();
d.setSize(D.feature.width,D.feature.height);
t.setSize(D.width,D.height)
}function A(h){D.loaded.slider=true;
f()
}function f(h){D.loaded.percentloaded=D.loaded.percentloaded+25;
if(D.loaded.slider&&D.loaded.timenav){r()
}}function o(h){D.loaded.timenav=true;
f()
}function C(h){c=true;
D.current_slide=d.getCurrentNumber();
q(D.current_slide);
t.setMarker(D.current_slide,D.ease,D.duration)
}function v(h){c=true;
D.current_slide=t.getCurrentNumber();
q(D.current_slide);
d.setSlide(D.current_slide)
}var G=function(h){if(h<=J.length-1&&h>=0){D.current_slide=h;
d.setSlide(D.current_slide);
t.setMarker(D.current_slide,D.ease,D.duration)
}};
function q(h){if(D.hash_bookmark){window.location.hash="#"+h.toString()
}}this.init=function(Q,w,h){if(type.of(w)=="string"){if(w.match("#")){k=w
}else{k="#"+w
}}P(h);
g(E,M);
trace("TIMELINE INIT");
VMM.Date.setLanguage(VMM.Timeline.Config.language);
VMM.master_config.language=VMM.Timeline.Config.language;
L=VMM.appendAndGetElement(z,"<div>","feedback","");
VMM.bindEvent(global,b,D.events.data_ready);
VMM.bindEvent(global,a,D.events.messege);
VMM.fireEvent(global,D.events.messege,VMM.master_config.language.messages.loading_timeline);
if(VMM.Browser.browser=="Explorer"||VMM.Browser.browser=="MSIE"){if(parseInt(VMM.Browser.version,10)<=7){m=true
}}if(type.of(Q)=="string"||type.of(Q)=="object"){VMM.Timeline.DataObj.getData(Q)
}else{VMM.Timeline.DataObj.getData(VMM.getElement(k))
}};
this.iframeLoaded=function(){trace("iframeLoaded")
};
this.reload=function(h){trace("loadNewDates"+h);
VMM.fireEvent(global,D.events.messege,VMM.master_config.language.messages.loading_timeline);
O={};
VMM.Timeline.DataObj.getData(h)
};
var s=function(h){VMM.getJSON(h,function(w){O=VMM.Timeline.DataObj.getData(w);
VMM.fireEvent(global,D.events.data_ready)
})
};
var a=function(h,w){trace("showMessege "+w);
VMM.attachElement(L,VMM.MediaElement.loadingmessage(w))
};
var r=function(){VMM.Lib.animate(L,D.duration,D.ease*4,{opacity:0},l)
};
var l=function(){VMM.Lib.detach(L)
};
var F=function(){if(parseInt(D.start_at_slide)>0&&D.current_slide==1){D.current_slide=parseInt(D.start_at_slide)
}if(D.start_at_end&&D.current_slide==1){D.current_slide=J.length-1
}if(m){m=true;
VMM.fireEvent(global,D.events.messege,"Internet Explorer "+VMM.Browser.version+" is not supported by TimelineJS. Please update your browser to version 8 or higher.")
}else{VMM.attachElement(z,"");
VMM.appendElement(z,"<div class='container main'><div class='feature'><div class='slider'></div></div><div class='navigation'></div></div>");
i();
VMM.bindEvent("div.slider",A,"LOADED");
VMM.bindEvent("div.navigation",o,"LOADED");
VMM.bindEvent("div.slider",C,"UPDATE");
VMM.bindEvent("div.navigation",v,"UPDATE");
d.setTitle(O.sliderTitle);
d.init(J);
t.init(J,O.era);
VMM.bindEvent(global,i,D.events.resize)
}};
var p=function(){trace("IE7 or lower");
for(var h=0;
h<J.length;
h++){trace(J[h])
}};
var n=function(){trace("UPDATE SIZE");
D.width=VMM.Lib.width(z);
D.height=VMM.Lib.height(z);
D.nav.width=D.width;
D.feature.width=D.width;
if(VMM.Browser.device=="mobile"){}else{}D.feature.height=D.height-D.nav.height-3
};
var K=function(){J=[];
VMM.fireEvent(global,D.events.messege,"Building Dates");
n();
for(var w=0;
w<O.date.length;
w++){if(O.date[w].startDate!=null&&O.date[w].startDate!=""){var h={};
if(O.date[w].type=="tweets"){h.startdate=VMM.ExternalAPI.twitter.parseTwitterDate(O.date[w].startDate)
}else{h.startdate=VMM.Date.parse(O.date[w].startDate)
}if(!isNaN(h.startdate)){if(O.date[w].endDate!=null&&O.date[w].endDate!=""){if(O.date[w].type=="tweets"){h.enddate=VMM.ExternalAPI.twitter.parseTwitterDate(O.date[w].endDate)
}else{h.enddate=VMM.Date.parse(O.date[w].endDate)
}}else{h.enddate=h.startdate
}h.needs_slug=false;
if(O.date[w].headline==""){if(O.date[w].slug!=null&&O.date[w].slug!=""){h.needs_slug=true
}}h.id=O.date[w].id;
h.activityid=O.date[w].activityid;
h.title=O.date[w].headline;
h.headline=O.date[w].headline;
h.type=O.date[w].type;
h.date=VMM.Date.prettyDate(h.startdate);
h.asset=O.date[w].asset;
h.fulldate=h.startdate.getTime();
h.text=O.date[w].text;
h.content="";
h.tag=O.date[w].tag;
h.slug=O.date[w].slug;
h.uniqueid=VMM.Util.unique_ID(7);
J.push(h)
}}}if(O.type!="storify"){J.sort(function(T,S){return T.fulldate-S.fulldate
})
}if(O.headline!=null&&O.headline!=""&&O.text!=null&&O.text!=""){trace("HAS STARTPAGE");
var h={},Q=0,R;
R=J[0].startdate;
h.startdate=new Date(J[0].startdate);
if(R.getMonth()===0&&R.getDate()==1&&R.getHours()===0&&R.getMinutes()===0){h.startdate.setFullYear(R.getFullYear()-1)
}else{if(R.getDate()<=1&&R.getHours()===0&&R.getMinutes()===0){h.startdate.setMonth(R.getMonth()-1)
}else{if(R.getHours()===0&&R.getMinutes()===0){h.startdate.setDate(R.getDate()-1)
}else{if(R.getMinutes()===0){h.startdate.setHours(R.getHours()-1)
}else{h.startdate.setMinutes(R.getMinutes()-1)
}}}}h.uniqueid=VMM.Util.unique_ID(7);
h.enddate=h.startdate;
h.title=O.headline;
h.headline=O.headline;
h.text=O.text;
h.type="start";
h.date=VMM.Date.prettyDate(O.startDate);
h.asset=O.asset;
h.slug=false;
h.needs_slug=false;
h.fulldate=h.startdate.getTime();
if(D.embed){VMM.fireEvent(global,D.events.headline,h.headline)
}J.unshift(h)
}if(O.type!="storify"){J.sort(function(T,S){return T.fulldate-S.fulldate
})
}B()
}
};
VMM.Timeline.Config={}
}if(typeof VMM.Timeline!="undefined"&&typeof VMM.Timeline.TimeNav=="undefined"){VMM.Timeline.TimeNav=function(s,A,j){trace("VMM.Timeline.TimeNav");
var O={},G={},V=s,an=[],M=[],ao=[],t=[],U=[],S=[],Q=1,e=false,F,r,al={interval_position:""},K={left:"",visible:{left:"",right:""}},z,c,aq,ah,B,a,ad,W,L,i,aa,h,l,P,I;
var ab={day:24,month:12,year:10,hour:60,minute:60,second:1000,millisecond:10000,decade:10,century:100,millenium:1000,age:1000000,epoch:10000000,era:100000000,eon:500000000,week:4.34812141,days_in_month:30.4368499,days_in_week:7,weeks_in_month:4.34812141,weeks_in_year:52.177457,days_in_year:365.242199,hours_in_day:24};
var C={day:86400000,week:7,month:30.4166666667,year:12,hour:24,minute:1440,second:86400,millisecond:86400000,decade:10,century:100,millenium:1000,age:1000000,epoch:10000000,era:100000000,eon:500000000};
var d={type:"year",number:10,first:1970,last:2011,multiplier:100,classname:"_idd",interval_type:"interval"};
var J={type:"year",number:10,first:1970,last:2011,multiplier:100,classname:"major",interval_type:"interval major"};
var y={type:"year",number:10,first:1970,last:2011,multiplier:100,classname:"_dd_minor",interval_type:"interval minor"};
var H={day:{},month:{},year:{},hour:{},minute:{},second:{},millisecond:{},decade:{},century:{},millenium:{},week:{},age:{},epoch:{},era:{},eon:{}};
var X=VMM.Timeline.Config;
var R=X.nav.marker.height/2;
X.nav.rows={full:[1,R*2,R*4],half:[1,R,R*2,R*3,R*4,R*5],current:[]};
if(A!=null&&A!=""){X.nav.width=A
}if(j!=null&&j!=""){X.nav.height=j
}this.init=function(av,au){trace("VMM.Timeline.TimeNav init");
if(typeof av!="undefined"){this.setData(av,au)
}else{trace("WAITING ON DATA")
}};
this.setData=function(av,au){if(typeof av!="undefined"){an={};
an=av;
F=au;
Z()
}else{trace("NO DATA")
}};
this.setSize=function(au,av){if(au!=null){X.width=au
}if(av!=null){X.height=av
}if(e){q()
}};
this.setMarker=function(ax,aw,av,au){ap(ax,aw,av)
};
this.getCurrentNumber=function(){return Q
};
function n(){trace("onConfigSet")
}function q(au){X.nav.constraint.left=(X.width/2);
X.nav.constraint.right=X.nav.constraint.right_min-(X.width/2);
I.updateConstraint(X.nav.constraint);
VMM.Lib.css(L,"left",Math.round(X.width/2)+2);
VMM.Lib.css(i,"left",Math.round(X.width/2)-8);
ap(X.current_slide,X.ease,X.duration,true,au)
}function N(){VMM.fireEvent(V,"UPDATE")
}function T(){VMM.fireEvent(V,"PLAY")
}function ag(){VMM.fireEvent(V,"PAUSE")
}function at(){I.cancelSlide();
if(X.nav.multiplier.current>X.nav.multiplier.min){if(X.nav.multiplier.current<=1){X.nav.multiplier.current=X.nav.multiplier.current-0.25
}else{if(X.nav.multiplier.current>5){if(X.nav.multiplier.current>16){X.nav.multiplier.current=Math.round(X.nav.multiplier.current-10)
}else{X.nav.multiplier.current=Math.round(X.nav.multiplier.current-4)
}}else{X.nav.multiplier.current=Math.round(X.nav.multiplier.current-1)
}}if(X.nav.multiplier.current<=0){X.nav.multiplier.current=X.nav.multiplier.min
}v()
}}function p(){I.cancelSlide();
if(X.nav.multiplier.current<X.nav.multiplier.max){if(X.nav.multiplier.current>4){if(X.nav.multiplier.current>16){X.nav.multiplier.current=Math.round(X.nav.multiplier.current+10)
}else{X.nav.multiplier.current=Math.round(X.nav.multiplier.current+4)
}}else{X.nav.multiplier.current=Math.round(X.nav.multiplier.current+1)
}if(X.nav.multiplier.current>=X.nav.multiplier.max){X.nav.multiplier.current=X.nav.multiplier.max
}v()
}}function m(au){I.cancelSlide();
ap(0);
N()
}function g(av){var aw=0,au=0;
if(!av){av=window.event
}if(av.originalEvent){av=av.originalEvent
}if(av.wheelDelta){aw=av.wheelDelta/6
}else{if(av.detail){aw=-av.detail*12
}}if(aw){if(av.preventDefault){av.preventDefault()
}av.returnValue=false
}if(typeof av.wheelDeltaX!="undefined"){aw=av.wheelDeltaY/6;
if(Math.abs(av.wheelDeltaX)>Math.abs(av.wheelDeltaY)){aw=av.wheelDeltaX/6
}else{aw=av.wheelDeltaY/6
}}au=VMM.Lib.position(z).left+aw;
if(au>X.nav.constraint.left){au=X.width/2
}else{if(au<X.nav.constraint.right){au=X.nav.constraint.right
}}VMM.Lib.stop(z);
VMM.Lib.css(z,"left",au)
}var v=function(){trace("config.nav.multiplier "+X.nav.multiplier.current);
aj(true);
o(true);
af(B,t,true,true);
af(a,U,true);
X.nav.constraint.left=(X.width/2);
X.nav.constraint.right=X.nav.constraint.right_min-(X.width/2);
I.updateConstraint(X.nav.constraint)
};
function w(au){I.cancelSlide();
ap(au.data.number);
N()
}function ak(au){VMM.Lib.toggleClass(au.data.elem,"zFront")
}var ap=function(av,ax,ay,aB,aC){var au=X.ease,aA=X.duration,aD=false,aw=false;
Q=av;
K.left=(X.width/2)-VMM.Lib.position(ao[Q].marker).left;
K.visible.left=Math.abs(K.left)-100;
K.visible.right=Math.abs(K.left)+X.width+100;
if(Q==1){aw=true
}if(Q+1==ao.length){aD=true
}if(ax!=null&&ax!=""){au=ax
}if(ay!=null&&ay!=""){aA=ay
}for(var az=0;
az<ao.length;
az++){VMM.Lib.removeClass(ao[az].marker,"active")
}if(X.start_page&&ao[0].type=="start"){VMM.Lib.visible(ao[0].marker,false);
VMM.Lib.addClass(ao[0].marker,"start")
}VMM.Lib.addClass(ao[Q].marker,"active");
VMM.Lib.stop(z);
VMM.Lib.animate(z,aA,au,{left:K.left})
};
function ac(av,au){VMM.Lib.animate(z,au.time/2,X.ease,{left:au.left})
}var ar=function(){var aw=0,az=0,av=0,ay=[];
for(var ax=0;
ax<ao.length;
ax++){if(an[ax].type=="start"){}else{var au=u(d,ao[ax].relative_pos),aw=az;
az=au.begin;
av=az-aw;
ay.push(av)
}}return VMM.Util.average(ay).mean
};
var f=function(){var ay=0;
var au=0;
var az=0;
var aA=[];
var aw=true;
for(var av=0;
av<an.length;
av++){if(an[av].type=="start"){trace("DATA DATE IS START")
}else{var ax=an[av].startdate;
ay=au;
au=ax;
az=au-ay;
aA.push(az)
}}return VMM.Util.average(aA)
};
var am=function(){var au=X.nav.multiplier.current;
for(var av=0;
av<au;
av++){if(ar()<75){if(X.nav.multiplier.current>1){X.nav.multiplier.current=(X.nav.multiplier.current-1)
}}}};
var Y=function(){var av=E(an[0].startdate);
var au=E(an[an.length-1].enddate);
H.eon.type="eon";
H.eon.first=av.eons;
H.eon.base=Math.floor(av.eons);
H.eon.last=au.eons;
H.eon.number=G.eons;
H.eon.multiplier=ab.eons;
H.eon.minor=ab.eons;
H.era.type="era";
H.era.first=av.eras;
H.era.base=Math.floor(av.eras);
H.era.last=au.eras;
H.era.number=G.eras;
H.era.multiplier=ab.eras;
H.era.minor=ab.eras;
H.epoch.type="epoch";
H.epoch.first=av.epochs;
H.epoch.base=Math.floor(av.epochs);
H.epoch.last=au.epochs;
H.epoch.number=G.epochs;
H.epoch.multiplier=ab.epochs;
H.epoch.minor=ab.epochs;
H.age.type="age";
H.age.first=av.ages;
H.age.base=Math.floor(av.ages);
H.age.last=au.ages;
H.age.number=G.ages;
H.age.multiplier=ab.ages;
H.age.minor=ab.ages;
H.millenium.type="millenium";
H.millenium.first=av.milleniums;
H.millenium.base=Math.floor(av.milleniums);
H.millenium.last=au.milleniums;
H.millenium.number=G.milleniums;
H.millenium.multiplier=ab.millenium;
H.millenium.minor=ab.millenium;
H.century.type="century";
H.century.first=av.centuries;
H.century.base=Math.floor(av.centuries);
H.century.last=au.centuries;
H.century.number=G.centuries;
H.century.multiplier=ab.century;
H.century.minor=ab.century;
H.decade.type="decade";
H.decade.first=av.decades;
H.decade.base=Math.floor(av.decades);
H.decade.last=au.decades;
H.decade.number=G.decades;
H.decade.multiplier=ab.decade;
H.decade.minor=ab.decade;
H.year.type="year";
H.year.first=av.years;
H.year.base=Math.floor(av.years);
H.year.last=au.years;
H.year.number=G.years;
H.year.multiplier=1;
H.year.minor=ab.month;
H.month.type="month";
H.month.first=av.months;
H.month.base=Math.floor(av.months);
H.month.last=au.months;
H.month.number=G.months;
H.month.multiplier=1;
H.month.minor=Math.round(ab.week);
H.week.type="week";
H.week.first=av.weeks;
H.week.base=Math.floor(av.weeks);
H.week.last=au.weeks;
H.week.number=G.weeks;
H.week.multiplier=1;
H.week.minor=7;
H.day.type="day";
H.day.first=av.days;
H.day.base=Math.floor(av.days);
H.day.last=au.days;
H.day.number=G.days;
H.day.multiplier=1;
H.day.minor=24;
H.hour.type="hour";
H.hour.first=av.hours;
H.hour.base=Math.floor(av.hours);
H.hour.last=au.hours;
H.hour.number=G.hours;
H.hour.multiplier=1;
H.hour.minor=60;
H.minute.type="minute";
H.minute.first=av.minutes;
H.minute.base=Math.floor(av.minutes);
H.minute.last=au.minutes;
H.minute.number=G.minutes;
H.minute.multiplier=1;
H.minute.minor=60;
H.second.type="second";
H.second.first=av.seconds;
H.second.base=Math.floor(av.seconds);
H.second.last=au.seconds;
H.second.number=G.seconds;
H.second.multiplier=1;
H.second.minor=10;
H.millisecond.type="millisecond";
H.millisecond.first=av.milliseconds;
H.millisecond.base=Math.floor(av.milliseconds);
H.millisecond.last=au.milliseconds;
H.millisecond.number=G.milliseconds;
H.millisecond.multiplier=1;
H.millisecond.minor=10
};
var E=function(av,aw){var au={};
au.days=av/C.day;
au.weeks=au.days/C.week;
au.months=au.days/C.month;
au.years=au.months/C.year;
au.hours=au.days*C.hour;
au.minutes=au.days*C.minute;
au.seconds=au.days*C.second;
au.milliseconds=au.days*C.millisecond;
au.decades=au.years/C.decade;
au.centuries=au.years/C.century;
au.milleniums=au.years/C.millenium;
au.ages=au.years/C.age;
au.epochs=au.years/C.epoch;
au.eras=au.years/C.era;
au.eons=au.years/C.eon;
return au
};
var b=function(av,aA,ay){var ax,aw,au=av.type,az={start:"",end:"",type:au};
ax=E(aA);
az.start=aA.months;
if(au=="eon"){az.start=ax.eons
}else{if(au=="era"){az.start=ax.eras
}else{if(au=="epoch"){az.start=ax.epochs
}else{if(au=="age"){az.start=ax.ages
}else{if(au=="millenium"){az.start=aA.milleniums
}else{if(au=="century"){az.start=ax.centuries
}else{if(au=="decade"){az.start=ax.decades
}else{if(au=="year"){az.start=ax.years
}else{if(au=="month"){az.start=ax.months
}else{if(au=="week"){az.start=ax.weeks
}else{if(au=="day"){az.start=ax.days
}else{if(au=="hour"){az.start=ax.hours
}else{if(au=="minute"){az.start=ax.minutes
}else{if(au=="second"){az.start=ax.seconds
}else{if(au=="millisecond"){az.start=ax.milliseconds
}}}}}}}}}}}}}}}if(type.of(ay)=="date"){aw=E(ay);
az.end=ay.months;
if(au=="eon"){az.end=aw.eons
}else{if(au=="era"){az.end=aw.eras
}else{if(au=="epoch"){az.end=aw.epochs
}else{if(au=="age"){az.end=aw.ages
}else{if(au=="millenium"){az.end=ay.milleniums
}else{if(au=="century"){az.end=aw.centuries
}else{if(au=="decade"){az.end=aw.decades
}else{if(au=="year"){az.end=aw.years
}else{if(au=="month"){az.end=aw.months
}else{if(au=="week"){az.end=aw.weeks
}else{if(au=="day"){az.end=aw.days
}else{if(au=="hour"){az.end=aw.hours
}else{if(au=="minute"){az.end=aw.minutes
}else{if(au=="second"){az.end=aw.seconds
}else{if(au=="millisecond"){az.end=aw.milliseconds
}}}}}}}}}}}}}}}}else{az.end=az.start
}return az
};
var u=function(av,au){return{begin:(au.start-d.base)*(X.nav.interval_width/X.nav.multiplier.current),end:(au.end-d.base)*(X.nav.interval_width/X.nav.multiplier.current)}
};
var aj=function(aL){var aB=2,ay=0,az=-2,ax=0,aw=0,aJ=150,aF=6,aO=0,av=X.width,aN=[],aP=6,aD={left:K.visible.left-av,right:K.visible.right+av};
X.nav.minor_width=X.width;
VMM.Lib.removeClass(".flag","row1");
VMM.Lib.removeClass(".flag","row2");
VMM.Lib.removeClass(".flag","row3");
for(var aM=0;
aM<ao.length;
aM++){var aE,aC=ao[aM],aA=u(d,ao[aM].relative_pos),aH=0,aG=false,aI={id:aM,pos:0,row:0},au=0;
aA.begin=Math.round(aA.begin+az);
aA.end=Math.round(aA.end+az);
aE=Math.round(aA.end-aA.begin);
if(Q==aM){K.left=(X.width/2)-aA;
K.visible.left=Math.abs(K.left);
K.visible.right=Math.abs(K.left)+X.width;
aD.left=K.visible.left-av;
aD.right=K.visible.right+av
}if(Math.abs(aA.begin)>=aD.left&&Math.abs(aA.begin)<=aD.right){aG=true
}if(aL){VMM.Lib.stop(aC.marker);
VMM.Lib.animate(aC.marker,X.duration/2,X.ease,{left:aA.begin})
}else{VMM.Lib.stop(aC.marker);
VMM.Lib.css(aC.marker,"left",aA.begin)
}if(aM==Q){aO=aA.begin
}if(aE>5){VMM.Lib.css(aC.lineevent,"height",aF);
VMM.Lib.css(aC.lineevent,"top",aJ);
if(aL){VMM.Lib.animate(aC.lineevent,X.duration/2,X.ease,{width:aE})
}else{VMM.Lib.css(aC.lineevent,"width",aE)
}}if(S.length>0){for(var aK=0;
aK<S.length;
aK++){if(aK<X.nav.rows.current.length){if(aC.tag==S[aK]){aB=aK;
if(aK==X.nav.rows.current.length-1){trace("ON LAST ROW");
VMM.Lib.addClass(aC.flag,"flag-small-last")
}}}}aH=X.nav.rows.current[aB]
}else{if(aA.begin-ay.begin<(X.nav.marker.width+X.spacing)){if(aB<X.nav.rows.current.length-1){aB++
}else{aB=0;
ax++
}}else{ax=1;
aB=1
}aH=X.nav.rows.current[aB]
}ay=aA;
aI.pos=aA;
aI.row=aB;
aN.push(aI);
if(aN.length>aP){aN.remove(0)
}if(aL){VMM.Lib.stop(aC.flag);
VMM.Lib.animate(aC.flag,X.duration,X.ease,{top:aH})
}else{VMM.Lib.stop(aC.flag);
VMM.Lib.css(aC.flag,"top",aH)
}if(X.start_page&&ao[aM].type=="start"){VMM.Lib.visible(aC.marker,false)
}if(aA>X.nav.minor_width){X.nav.minor_width=aA
}if(aA<X.nav.minor_left){X.nav.minor_left=aA
}}VMM.Lib.stop(z);
VMM.Lib.animate(z,X.duration/2,X.ease,{left:(X.width/2)-(aO)})
};
var o=function(au){for(var ay=0;
ay<M.length;
ay++){var aw=M[ay],aB=u(d,aw.relative_pos),ax=0,az=X.nav.marker.height*X.nav.rows.full.length,av=aB.end-aB.begin;
if(aw.tag!=""){az=(X.nav.marker.height*X.nav.rows.full.length)/X.nav.rows.current.length;
for(var aA=0;
aA<S.length;
aA++){if(aA<X.nav.rows.current.length){if(aw.tag==S[aA]){row=aA
}}}ax=X.nav.rows.current[row]
}else{ax=-1
}if(au){VMM.Lib.stop(aw.content);
VMM.Lib.stop(aw.text_content);
VMM.Lib.animate(aw.content,X.duration/2,X.ease,{top:ax,left:aB.begin,width:av,height:az});
VMM.Lib.animate(aw.text_content,X.duration/2,X.ease,{left:aB.begin})
}else{VMM.Lib.stop(aw.content);
VMM.Lib.stop(aw.text_content);
VMM.Lib.css(aw.content,"left",aB.begin);
VMM.Lib.css(aw.content,"width",av);
VMM.Lib.css(aw.content,"height",az);
VMM.Lib.css(aw.content,"top",ax);
VMM.Lib.css(aw.text_content,"left",aB.begin)
}}};
var af=function(aC,aB,aG,aF){var aD=0,aJ=0,av=X.width,az={left:K.visible.left-av,right:K.visible.right+av};
not_too_many=true;
X.nav.minor_left=0;
if(aB.length>100){not_too_many=false;
trace("TOO MANY "+aB.length)
}for(var aH=0;
aH<aB.length;
aH++){var au=aB[aH].element,aK=aB[aH].date,aL=aB[aH].visible,aA=u(d,aB[aH].relative_pos),ay=aA.begin,aw=aB[aH].animation,aI=true,aE=false,ax=50;
aw.pos=ay;
aw.animate=false;
if(Math.abs(ay)>=az.left&&Math.abs(ay)<=az.right){aE=true
}if(true){if(X.nav.multiplier.current>16&&aF){aI=false
}else{if((ay-aD)<65){if((ay-aD)<35){if(aH%4==0){if(ay==0){aI=false
}}else{aI=false
}}else{if(!VMM.Util.isEven(aH)){aI=false
}}}}if(aI){if(aB[aH].is_detached){VMM.Lib.append(aC,au);
aB[aH].is_detached=false
}}else{aB[aH].is_detached=true;
VMM.Lib.detach(au)
}if(aL){if(!aI){aw.opacity="0";
if(aG&&not_too_many){aw.animate=true
}aB[aH].interval_visible=false
}else{aw.opacity="100";
if(aG&&aE){aw.animate=true
}}}else{aw.opacity="100";
if(aI){if(aG&&not_too_many){aw.animate=true
}else{if(aG&&aE){aw.animate=true
}}aB[aH].interval_visible=true
}else{if(aG&&not_too_many){aw.animate=true
}}}aD=ay;
if(ay>X.nav.minor_width){X.nav.minor_width=ay
}if(ay<X.nav.minor_left){X.nav.minor_left=ay
}}if(aw.animate){VMM.Lib.animate(au,X.duration/2,X.ease,{opacity:aw.opacity,left:aw.pos})
}else{VMM.Lib.css(au,"opacity",aw.opacity);
VMM.Lib.css(au,"left",ay)
}}X.nav.constraint.right_min=-(X.nav.minor_width)+(X.width);
X.nav.constraint.right=X.nav.constraint.right_min+(X.width/2);
VMM.Lib.css(aa,"left",X.nav.minor_left-(X.width)/2);
VMM.Lib.width(aa,(X.nav.minor_width)+(X.width)+Math.abs(X.nav.minor_left))
};
var ai=function(aw,aG,av){var ax=0,aH=true,aC=0,aB=0,aA,aI,ay,aF=Math.ceil(aw.number)+2,aD={flag:false,offset:0};
VMM.attachElement(av,"");
aw.date=new Date(an[0].startdate.getFullYear(),0,1,0,0,0);
aA=aw.date.getTimezoneOffset();
for(var az=0;
az<aF;
az++){trace(aw.type);
var aE=false,au={element:VMM.appendAndGetElement(av,"<div>",aw.classname),date:new Date(an[0].startdate.getFullYear(),0,1,0,0,0),visible:false,date_string:"",type:aw.interval_type,relative_pos:0,is_detached:false,animation:{animate:false,pos:"",opacity:"100"}};
if(aw.type=="eon"){if(aH){aI=Math.floor(an[0].startdate.getFullYear()/500000000)*500000000
}au.date.setFullYear(aI+(ax*500000000));
aE=true
}else{if(aw.type=="era"){if(aH){aI=Math.floor(an[0].startdate.getFullYear()/100000000)*100000000
}au.date.setFullYear(aI+(ax*100000000));
aE=true
}else{if(aw.type=="epoch"){if(aH){aI=Math.floor(an[0].startdate.getFullYear()/10000000)*10000000
}au.date.setFullYear(aI+(ax*10000000));
aE=true
}else{if(aw.type=="age"){if(aH){aI=Math.floor(an[0].startdate.getFullYear()/1000000)*1000000
}au.date.setFullYear(aI+(ax*1000000));
aE=true
}else{if(aw.type=="millenium"){if(aH){aI=Math.floor(an[0].startdate.getFullYear()/1000)*1000
}au.date.setFullYear(aI+(ax*1000));
aE=true
}else{if(aw.type=="century"){if(aH){aI=Math.floor(an[0].startdate.getFullYear()/100)*100
}au.date.setFullYear(aI+(ax*100));
aE=true
}else{if(aw.type=="decade"){if(aH){aI=Math.floor(an[0].startdate.getFullYear()/10)*10
}au.date.setFullYear(aI+(ax*10));
aE=true
}else{if(aw.type=="year"){if(aH){aI=an[0].startdate.getFullYear()
}au.date.setFullYear(aI+ax);
aE=true
}else{if(aw.type=="month"){if(aH){aI=an[0].startdate.getMonth()
}au.date.setMonth(aI+ax)
}else{if(aw.type=="week"){if(aH){aI=an[0].startdate.getMonth()
}au.date.setMonth(an[0].startdate.getMonth());
au.date.setDate(aI+(ax*7))
}else{if(aw.type=="day"){if(aH){aI=an[0].startdate.getDate()
}au.date.setMonth(an[0].startdate.getMonth());
au.date.setDate(aI+ax)
}else{if(aw.type=="hour"){if(aH){aI=an[0].startdate.getHours()
}au.date.setMonth(an[0].startdate.getMonth());
au.date.setDate(an[0].startdate.getDate());
au.date.setHours(aI+ax)
}else{if(aw.type=="minute"){if(aH){aI=an[0].startdate.getMinutes()
}au.date.setMonth(an[0].startdate.getMonth());
au.date.setDate(an[0].startdate.getDate());
au.date.setHours(an[0].startdate.getHours());
au.date.setMinutes(aI+ax)
}else{if(aw.type=="second"){if(aH){aI=an[0].startdate.getSeconds()
}au.date.setMonth(an[0].startdate.getMonth());
au.date.setDate(an[0].startdate.getDate());
au.date.setHours(an[0].startdate.getHours());
au.date.setMinutes(an[0].startdate.getMinutes());
au.date.setSeconds(aI+ax)
}else{if(aw.type=="millisecond"){if(aH){aI=an[0].startdate.getMilliseconds()
}au.date.setMonth(an[0].startdate.getMonth());
au.date.setDate(an[0].startdate.getDate());
au.date.setHours(an[0].startdate.getHours());
au.date.setMinutes(an[0].startdate.getMinutes());
au.date.setSeconds(an[0].startdate.getSeconds());
au.date.setMilliseconds(aI+ax)
}}}}}}}}}}}}}}}if(VMM.Browser.browser=="Firefox"){if(au.date.getFullYear()=="1970"&&au.date.getTimezoneOffset()!=aA){trace("FIREFOX 1970 TIMEZONE OFFSET "+au.date.getTimezoneOffset()+" SHOULD BE "+aA);
trace(aw.type+" "+aw.date);
aD.offset=(au.date.getTimezoneOffset()/60);
aD.flag=true;
au.date.setHours(au.date.getHours()+aD.offset)
}else{if(aD.flag){aD.flag=false;
au.date.setHours(au.date.getHours()+aD.offset);
if(aE){aD.flag=true
}}}}if(aE){if(au.date.getFullYear()<0){au.date_string=Math.abs(au.date.getFullYear()).toString()+" B.C."
}else{au.date_string=au.date.getFullYear()
}}else{au.date_string=VMM.Date.prettyDate(au.date,true)
}ax=ax+1;
aH=false;
au.relative_pos=b(d,au.date);
aC=au.relative_pos.begin;
if(au.relative_pos.begin>aB){aB=au.relative_pos.begin
}VMM.appendElement(au.element,au.date_string);
VMM.Lib.css(au.element,"text-indent",-(VMM.Lib.width(au.element)/2));
VMM.Lib.css(au.element,"opacity","0");
aG.push(au)
}VMM.Lib.width(aa,aB);
af(av,aG)
};
var Z=function(){VMM.attachElement(V,"");
z=VMM.appendAndGetElement(V,"<div>","timenav");
c=VMM.appendAndGetElement(z,"<div>","content");
aq=VMM.appendAndGetElement(z,"<div>","time");
ah=VMM.appendAndGetElement(aq,"<div>","time-interval-minor");
aa=VMM.appendAndGetElement(ah,"<div>","minor");
a=VMM.appendAndGetElement(aq,"<div>","time-interval-major");
B=VMM.appendAndGetElement(aq,"<div>","time-interval");
ad=VMM.appendAndGetElement(V,"<div>","timenav-background");
L=VMM.appendAndGetElement(ad,"<div>","timenav-line");
i=VMM.appendAndGetElement(ad,"<div>","timenav-indicator");
W=VMM.appendAndGetElement(ad,"<div>","timenav-interval-background","<div class='top-highlight'></div>");
h=VMM.appendAndGetElement(V,"<div>","toolbar");
k();
D();
ae();
am();
aj();
o();
af(B,t,false,true);
af(a,U);
l=VMM.appendAndGetElement(h,"<div>","zoom-in","<div class='icon'></div>");
P=VMM.appendAndGetElement(h,"<div>","zoom-out","<div class='icon'></div>");
I=new VMM.DragSlider;
I.createPanel(V,z,X.nav.constraint,X.touch);
VMM.bindEvent(l,at,"click");
VMM.bindEvent(P,p,"click");
if(!X.touch){VMM.bindEvent(V,g,"DOMMouseScroll");
VMM.bindEvent(V,g,"mousewheel")
}VMM.fireEvent(V,"LOADED");
e=true;
q(true);
if(X.nav.zoom.adjust!=0){if(X.nav.zoom.adjust<0){for(var av=0;
av<Math.abs(X.nav.zoom.adjust);
av++){p()
}}else{for(var au=0;
au<X.nav.zoom.adjust;
au++){at()
}}}};
var k=function(){G=E((an[an.length-1].enddate)-(an[0].startdate),true);
trace(G);
Y();
if(G.centuries>an.length/X.nav.density){d=H.century;
J=H.millenium;
y=H.decade
}else{if(G.decades>an.length/X.nav.density){d=H.decade;
J=H.century;
y=H.year
}else{if(G.years>an.length/X.nav.density){d=H.year;
J=H.decade;
y=H.month
}else{if(G.months>an.length/X.nav.density){d=H.month;
J=H.year;
y=H.day
}else{if(G.days>an.length/X.nav.density){d=H.day;
J=H.month;
y=H.hour
}else{if(G.hours>an.length/X.nav.density){d=H.hour;
J=H.day;
y=H.minute
}else{if(G.minutes>an.length/X.nav.density){d=H.minute;
J=H.hour;
y=H.second
}else{if(G.seconds>an.length/X.nav.density){d=H.second;
J=H.minute;
y=H.second
}else{if(G.milliseconds>an.length/X.nav.density){d=H.millisecond;
J=H.second;
y=H.millisecond
}else{trace("NO IDEA WHAT THE TYPE SHOULD BE");
d=H.day;
J=H.month;
y=H.hour
}}}}}}}}}trace("INTERVAL TYPE: "+d.type);
trace("INTERVAL MAJOR TYPE: "+J.type);
ai(d,t,B);
ai(J,U,a);
for(var av=0;
av<t.length;
av++){for(var au=0;
au<U.length;
au++){if(t[av].date_string==U[au].date_string){VMM.attachElement(t[av].element,"")
}}}};
var D=function(){var aK=2,aC=0,aB=0;
ao=[];
M=[];
for(var az=0;
az<an.length;
az++){var aF,aD,aE,aI,aH,aA,aG="",aJ=false;
aF=VMM.appendAndGetElement(c,"<div>","marker");
aD=VMM.appendAndGetElement(aF,"<div>","flag");
aE=VMM.appendAndGetElement(aD,"<div>","flag-content");
aI=VMM.appendAndGetElement(aF,"<div>","dot");
aH=VMM.appendAndGetElement(aF,"<div>","line");
aA=VMM.appendAndGetElement(aH,"<div>","event-line");
_marker_relative_pos=b(d,an[az].startdate,an[az].enddate);
_marker_thumb="";
if(an[az].asset!=null&&an[az].asset!=""){VMM.appendElement(aE,VMM.MediaElement.thumbnail(an[az].asset,24,24,an[az].uniqueid))
}else{VMM.appendElement(aE,"<div style='margin-right:7px;height:50px;width:2px;float:left;'></div>")
}if(an[az].title==""||an[az].title==" "){trace("TITLE NOTHING");
if(typeof an[az].slug!="undefined"&&an[az].slug!=""){trace("SLUG");
aG=VMM.Util.untagify(an[az].slug);
aJ=true
}else{var au=VMM.MediaType(an[az].asset.media);
if(au.type=="quote"||au.type=="unknown"){aG=VMM.Util.untagify(au.id);
aJ=true
}else{if(au.type=="twitter"){aJ=false;
VMM.appendElement(aE,"<h3 id='text_thumb_"+au.id+"'>"+aG+"</h3>")
}else{aJ=false
}}}}else{if(an[az].title!=""||an[az].title!=" "){trace(an[az].title);
aG=VMM.Util.untagify(an[az].title);
aJ=true
}else{trace("TITLE SLUG NOT FOUND "+an[az].slug)
}}if(aJ){VMM.appendElement(aE,"<h3>"+aG+"</h3>")
}VMM.Lib.attr(aF,"id",("marker_"+an[az].uniqueid).toString());
VMM.bindEvent(aD,w,"",{number:az});
VMM.bindEvent(aD,ak,"mouseenter mouseleave",{number:az,elem:aD});
var ax={marker:aF,flag:aD,lineevent:aA,type:"marker",full:true,relative_pos:_marker_relative_pos,tag:an[az].tag};
if(an[az].type=="start"){trace("BUILD MARKER HAS START PAGE");
X.start_page=true;
ax.type="start"
}if(an[az].type=="storify"){ax.type="storify"
}if(an[az].tag){S.push(an[az].tag)
}ao.push(ax)
}S=VMM.Util.deDupeArray(S);
if(S.length>2){X.nav.rows.current=X.nav.rows.half
}else{X.nav.rows.current=X.nav.rows.full
}for(var ay=0;
ay<S.length;
ay++){if(ay<X.nav.rows.current.length){var aw=VMM.appendAndGetElement(ad,"<div>","timenav-tag");
VMM.Lib.addClass(aw,"timenav-tag-row-"+(ay+1));
if(S.length>2){VMM.Lib.addClass(aw,"timenav-tag-size-half")
}else{VMM.Lib.addClass(aw,"timenav-tag-size-full")
}VMM.appendElement(aw,"<div><h3>"+S[ay]+"</h3></div>")
}}if(S.length>2){for(var av=0;
av<ao.length;
av++){VMM.Lib.addClass(ao[av].flag,"flag-small");
ao[av].full=false
}}};
var ae=function(){var ay=6,aA=0;
for(var ax=0;
ax<F.length;
ax++){var au={content:VMM.appendAndGetElement(c,"<div>","era"),text_content:VMM.appendAndGetElement(B,"<div>","era"),startdate:VMM.Date.parse(F[ax].startDate),enddate:VMM.Date.parse(F[ax].endDate),title:F[ax].headline,uniqueid:VMM.Util.unique_ID(6),tag:"",relative_pos:""},aw=VMM.Date.prettyDate(au.startdate),av=VMM.Date.prettyDate(au.enddate),az="";
if(typeof F[ax].tag!="undefined"){au.tag=F[ax].tag
}au.relative_pos=b(d,au.startdate,au.enddate);
VMM.Lib.attr(au.content,"id",au.uniqueid);
VMM.Lib.attr(au.text_content,"id",au.uniqueid+"_text");
az+="<div>&nbsp;";
if(aw!=av){}else{}az+="</div>";
VMM.Lib.addClass(au.content,"era"+(aA+1));
VMM.Lib.addClass(au.text_content,"era"+(aA+1));
if(aA<ay){aA++
}else{aA=0
}VMM.appendElement(au.content,az);
VMM.appendElement(au.text_content,VMM.Util.unlinkify(au.title));
M.push(au)
}}
}
}if(typeof VMM.Timeline!=="undefined"&&typeof VMM.Timeline.DataObj=="undefined"){VMM.Timeline.DataObj={data_obj:{},model_array:[],getData:function(a){VMM.Timeline.DataObj.data_obj={};
VMM.fireEvent(global,VMM.Timeline.Config.events.messege,VMM.Timeline.Config.language.messages.loading_timeline);
if(type.of(a)=="object"){trace("DATA SOURCE: JSON OBJECT");
VMM.Timeline.DataObj.parseJSON(a)
}else{if(type.of(a)=="string"){if(a.match("%23")){trace("DATA SOURCE: TWITTER SEARCH");
VMM.Timeline.DataObj.model.tweets.getData("%23medill")
}else{if(a.match("spreadsheet")){trace("DATA SOURCE: GOOGLE SPREADSHEET");
VMM.Timeline.DataObj.model.googlespreadsheet.getData(a)
}else{if(a.match("storify.com")){trace("DATA SOURCE: STORIFY");
VMM.Timeline.DataObj.model.storify.getData(a)
}else{trace("DATA SOURCE: JSON");
VMM.getJSON(a,VMM.Timeline.DataObj.parseJSON)
}}}}else{if(type.of(a)=="html"){trace("DATA SOURCE: HTML");
VMM.Timeline.DataObj.parseHTML(a)
}else{trace("DATA SOURCE: UNKNOWN")
}}}},parseHTML:function(b){trace("parseHTML");
trace("WARNING: THIS IS STILL ALPHA AND WILL NOT WORK WITH ID's other than #timeline");
var c=VMM.Timeline.DataObj.data_template_obj;
if(VMM.Lib.find("#timeline section","time")[0]){c.timeline.startDate=VMM.Lib.html(VMM.Lib.find("#timeline section","time")[0]);
c.timeline.headline=VMM.Lib.html(VMM.Lib.find("#timeline section","h2"));
c.timeline.text=VMM.Lib.html(VMM.Lib.find("#timeline section","article"));
var a=false;
if(VMM.Lib.find("#timeline section","figure img").length!=0){a=true;
c.timeline.asset.media=VMM.Lib.attr(VMM.Lib.find("#timeline section","figure img"),"src")
}else{if(VMM.Lib.find("#timeline section","figure a").length!=0){a=true;
c.timeline.asset.media=VMM.Lib.attr(VMM.Lib.find("#timeline section","figure a"),"href")
}else{}}if(a){if(VMM.Lib.find("#timeline section","cite").length!=0){c.timeline.asset.credit=VMM.Lib.html(VMM.Lib.find("#timeline section","cite"))
}if(VMM.Lib.find(this,"figcaption").length!=0){c.timeline.asset.caption=VMM.Lib.html(VMM.Lib.find("#timeline section","figcaption"))
}}}VMM.Lib.each("#timeline li",function(f,g){var e=false;
var d={type:"default",startDate:"",headline:"",text:"",asset:{media:"",credit:"",caption:""},tags:"Optional"};
if(VMM.Lib.find(this,"time")!=0){e=true;
d.startDate=VMM.Lib.html(VMM.Lib.find(this,"time")[0]);
if(VMM.Lib.find(this,"time")[1]){d.endDate=VMM.Lib.html(VMM.Lib.find(this,"time")[1])
}d.headline=VMM.Lib.html(VMM.Lib.find(this,"h3"));
d.text=VMM.Lib.html(VMM.Lib.find(this,"article"));
var h=false;
if(VMM.Lib.find(this,"figure img").length!=0){h=true;
d.asset.media=VMM.Lib.attr(VMM.Lib.find(this,"figure img"),"src")
}else{if(VMM.Lib.find(this,"figure a").length!=0){h=true;
d.asset.media=VMM.Lib.attr(VMM.Lib.find(this,"figure a"),"href")
}else{}}if(h){if(VMM.Lib.find(this,"cite").length!=0){d.asset.credit=VMM.Lib.html(VMM.Lib.find(this,"cite"))
}if(VMM.Lib.find(this,"figcaption").length!=0){d.asset.caption=VMM.Lib.html(VMM.Lib.find(this,"figcaption"))
}}trace(d);
c.timeline.date.push(d)
}});
VMM.fireEvent(global,VMM.Timeline.Config.events.data_ready,c)
},parseJSON:function(a){trace("parseJSON");
if(a.timeline.type=="default"){trace("DATA SOURCE: JSON STANDARD TIMELINE");
VMM.fireEvent(global,VMM.Timeline.Config.events.data_ready,a)
}else{if(a.timeline.type=="twitter"){trace("DATA SOURCE: JSON TWEETS");
VMM.Timeline.DataObj.model_Tweets.buildData(a)
}else{trace("DATA SOURCE: UNKNOWN JSON");
trace(type.of(a.timeline))
}}},model:{googlespreadsheet:{getData:function(a){var c=VMM.Util.getUrlVars(a)["key"];
var b="https://spreadsheets.google.com/feeds/list/"+c+"/od6/public/values?alt=json";
VMM.getJSON(b,VMM.Timeline.DataObj.model.googlespreadsheet.buildData)
},buildData:function(g){VMM.fireEvent(global,VMM.Timeline.Config.events.messege,"Parsing Data");
var h=VMM.Timeline.DataObj.data_template_obj;
for(var f=0;
f<g.feed.entry.length;
f++){var b=g.feed.entry[f],a="";
if(typeof b.gsx$type!="undefined"){a=b.gsx$type.$t
}else{if(typeof b.gsx$titleslide!="undefined"){a=b.gsx$titleslide.$t
}}if(a.match("start")||a.match("title")){h.timeline.startDate=b.gsx$startdate.$t;
h.timeline.headline=b.gsx$headline.$t;
h.timeline.asset.media=b.gsx$media.$t;
h.timeline.asset.caption=b.gsx$mediacaption.$t;
h.timeline.asset.credit=b.gsx$mediacredit.$t;
h.timeline.text=b.gsx$text.$t;
h.timeline.type="google spreadsheet"
}else{if(a.match("era")){var e={startDate:b.gsx$startdate.$t,endDate:b.gsx$enddate.$t,headline:b.gsx$headline.$t,text:b.gsx$text.$t,tag:""};
if(typeof b.gsx$tag!="undefined"){e.tag=b.gsx$tag.$t
}h.timeline.era.push(e)
}else{var c={type:"google spreadsheet",startDate:b.gsx$startdate.$t,endDate:b.gsx$enddate.$t,headline:b.gsx$headline.$t,text:b.gsx$text.$t,asset:{media:b.gsx$media.$t,credit:b.gsx$mediacredit.$t,caption:b.gsx$mediacaption.$t},tag:""};
if(typeof b.gsx$tag!="undefined"){c.tag=b.gsx$tag.$t
}if(typeof b.gsx$tag!="undefined"){c.asset.thumbnail=b.gsx$mediathumbnail.$t
}h.timeline.date.push(c)
}}}VMM.fireEvent(global,VMM.Timeline.Config.events.data_ready,h)
}},storify:{getData:function(b){VMM.fireEvent(global,VMM.Timeline.Config.events.messege,"Loading Storify...");
var d=b.split("storify.com/")[1];
var c="http://api.storify.com/v1/stories/"+d+"?per_page=300&callback=?";
var a=setTimeout(function(){trace("STORIFY timeout");
VMM.fireEvent(global,VMM.Timeline.Config.events.messege,"Storify is not responding")
},6000);
VMM.getJSON(c,VMM.Timeline.DataObj.model.storify.buildData).error(function(e,g,f){trace("STORIFY error");
trace("STORIFY ERROR: "+g+" "+e.responseText)
}).success(function(e){clearTimeout(a)
})
},buildData:function(j){VMM.fireEvent(global,VMM.Timeline.Config.events.messege,"Parsing Data");
var f=VMM.Timeline.DataObj.data_template_obj;
f.timeline.startDate=new Date(j.content.date.created);
f.timeline.headline=j.content.title;
trace(j);
var h="";
var b=j.content.author.username;
var a="";
if(typeof j.content.author.name!="undefined"){b=j.content.author.name;
a=j.content.author.username+"&nbsp;"
}if(typeof j.content.description!="undefined"&&j.content.description!=null){h+=j.content.description
}h+="<div class='storify'>";
h+="<div class='vcard author'><a class='screen-name url' href='"+j.content.author.permalink+"' target='_blank'>";
h+="<span class='avatar'><img src='"+j.content.author.avatar+"' style='max-width: 32px; max-height: 32px;'></span>";
h+="<span class='fn'>"+b+"</span>";
h+="<span class='nickname'>"+a+"<span class='thumbnail-inline'></span></span>";
h+="</a>";
h+="</div>";
h+="</div>";
f.timeline.text=h;
f.timeline.asset.media=j.content.thumbnail;
f.timeline.type="storify";
for(var e=0;
e<j.content.elements.length;
e++){var n=j.content.elements[e];
var l=false;
var k=new Date(n.posted_at);
trace(n.type);
var o={type:"storify",startDate:n.posted_at,endDate:n.posted_at,headline:" ",slug:"",text:"",asset:{media:"",credit:"",caption:""}};
if(n.type=="image"){if(typeof n.source.name!="undefined"){if(n.source.name=="flickr"){o.asset.media="http://flickr.com/photos/"+n.meta.pathalias+"/"+n.meta.id+"/";
o.asset.credit="<a href='"+o.asset.media+"'>"+n.attribution.name+"</a>";
o.asset.credit+=" on <a href='"+n.source.href+"'>"+n.source.name+"</a>"
}else{if(n.source.name=="instagram"){o.asset.media=n.permalink;
o.asset.credit="<a href='"+n.permalink+"'>"+n.attribution.name+"</a>";
o.asset.credit+=" on <a href='"+n.source.href+"'>"+n.source.name+"</a>"
}else{o.asset.credit="<a href='"+n.permalink+"'>"+n.attribution.name+"</a>";
if(typeof n.source.href!="undefined"){o.asset.credit+=" on <a href='"+n.source.href+"'>"+n.source.name+"</a>"
}o.asset.media=n.data.image.src
}}}else{o.asset.credit="<a href='"+n.permalink+"'>"+n.attribution.name+"</a>";
o.asset.media=n.data.image.src
}o.slug=n.attribution.name;
if(typeof n.data.image.caption!="undefined"){if(n.data.image.caption!="undefined"){o.asset.caption=n.data.image.caption;
o.slug=n.data.image.caption
}}}else{if(n.type=="quote"){if(n.permalink.match("twitter")){o.asset.media=n.permalink;
o.slug=VMM.Util.untagify(n.data.quote.text)
}else{if(n.permalink.match("storify")){l=true;
o.asset.media="<blockquote>"+n.data.quote.text.replace(/<\s*\/?\s*b\s*.*?>/g,"")+"</blockquote>"
}}}else{if(n.type=="link"){o.headline=n.data.link.title;
o.text=n.data.link.description;
if(n.data.link.thumbnail!="undefined"&&n.data.link.thumbnail!=""){o.asset.media=n.data.link.thumbnail
}else{o.asset.media=n.permalink
}o.asset.caption="<a href='"+n.permalink+"' target='_blank'>"+n.data.link.title+"</a>";
o.slug=n.data.link.title
}else{if(n.type=="text"){if(n.permalink.match("storify")){l=true;
var g=j.content.author.username;
var c="";
if(typeof n.attribution.name!="undefined"){b=n.attribution.name;
a=n.attribution.username+"&nbsp;"
}var m="<div class='storify'>";
m+="<blockquote><p>"+n.data.text.replace(/<\s*\/?\s*b\s*.*?>/g,"")+"</p></blockquote>";
m+="<div class='vcard author'><a class='screen-name url' href='"+n.attribution.href+"' target='_blank'>";
m+="<span class='avatar'><img src='"+n.attribution.thumbnail+"' style='max-width: 32px; max-height: 32px;'></span>";
m+="<span class='fn'>"+b+"</span>";
m+="<span class='nickname'>"+a+"<span class='thumbnail-inline'></span></span>";
m+="</a></div></div>";
o.text=m;
if((e+1)>=j.content.elements.length){o.startDate=j.content.elements[e-1].posted_at
}else{if(j.content.elements[e+1].type=="text"&&j.content.elements[e+1].permalink.match("storify")){if((e+2)>=j.content.elements.length){o.startDate=j.content.elements[e-1].posted_at
}else{if(j.content.elements[e+2].type=="text"&&j.content.elements[e+2].permalink.match("storify")){if((e+3)>=j.content.elements.length){o.startDate=j.content.elements[e-1].posted_at
}else{if(j.content.elements[e+3].type=="text"&&j.content.elements[e+3].permalink.match("storify")){o.startDate=j.content.elements[e-1].posted_at
}else{trace("LEVEL 3");
o.startDate=j.content.elements[e+3].posted_at
}}}else{trace("LEVEL 2");
o.startDate=j.content.elements[e+2].posted_at
}}}else{trace("LEVEL 1");
o.startDate=j.content.elements[e+1].posted_at
}}o.endDate=o.startDate
}}else{if(n.type=="video"){o.headline=n.data.video.title;
o.asset.caption=n.data.video.description;
o.asset.caption=n.source.username;
o.asset.media=n.data.video.src
}else{trace("NO MATCH ");
trace(n)
}}}}}if(l){o.slug=VMM.Util.untagify(n.data.text)
}f.timeline.date.push(o)
}VMM.fireEvent(global,VMM.Timeline.Config.events.data_ready,f)
}},tweets:{type:"twitter",buildData:function(a){VMM.bindEvent(global,VMM.Timeline.DataObj.model.tweets.onTwitterDataReady,"TWEETSLOADED");
VMM.ExternalAPI.twitter.getTweets(a.timeline.tweets)
},getData:function(a){VMM.bindEvent(global,VMM.Timeline.DataObj.model.tweets.onTwitterDataReady,"TWEETSLOADED");
VMM.ExternalAPI.twitter.getTweetSearch(a)
},onTwitterDataReady:function(c,f){var g=VMM.Timeline.DataObj.data_template_obj;
for(var b=0;
b<f.tweetdata.length;
b++){var a={type:"tweets",startDate:"",headline:"",text:"",asset:{media:"",credit:"",caption:""},tags:"Optional"};
a.startDate=f.tweetdata[b].raw.created_at;
if(type.of(f.tweetdata[b].raw.from_user_name)){a.headline=f.tweetdata[b].raw.from_user_name+" (<a href='https://twitter.com/"+f.tweetdata[b].raw.from_user+"'>@"+f.tweetdata[b].raw.from_user+"</a>)"
}else{a.headline=f.tweetdata[b].raw.user.name+" (<a href='https://twitter.com/"+f.tweetdata[b].raw.user.screen_name+"'>@"+f.tweetdata[b].raw.user.screen_name+"</a>)"
}a.asset.media=f.tweetdata[b].content;
g.timeline.date.push(a)
}VMM.fireEvent(global,VMM.Timeline.Config.events.data_ready,g)
}}},data_template_obj:{timeline:{headline:"",description:"",asset:{media:"",credit:"",caption:""},date:[],era:[]}},date_obj:{startDate:"2012,2,2,11,30",headline:"",text:"",asset:{media:"http://youtu.be/vjVfu8-Wp6s",credit:"",caption:""},tags:"Optional"}}
};