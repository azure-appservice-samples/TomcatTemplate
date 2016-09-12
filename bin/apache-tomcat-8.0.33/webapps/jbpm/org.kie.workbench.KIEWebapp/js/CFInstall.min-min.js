(function(u){if(!u.CFInstall){var t=function(e,d){return typeof e=="string"?(d||document).getElementById(e):e
},s=function(){if(u.CFInstall._force){return u.CFInstall._forceValue
}if(navigator.userAgent.toLowerCase().indexOf("chromeframe")>=0){return true
}if(typeof window.ActiveXObject!="undefined"){try{var e=new ActiveXObject("ChromeTab.ChromeFrame");
if(e){e.registerBhoIfNeeded();
return true
}}catch(d){}}return false
},r=function(e){try{var d=document.createElement("style");
d.setAttribute("type","text/css");
if(d.styleSheet){d.styleSheet.cssText=e
}else{d.appendChild(document.createTextNode(e))
}var h=document.getElementsByTagName("head")[0];
h.insertBefore(d,h.firstChild)
}catch(f){}},q=false,p=false,g=function(){if(!p){r(".chromeFrameOverlayContent { display: none; }.chromeFrameOverlayUnderlay { display: none; }");
document.cookie="disableGCFCheck=1;path=/;max-age=31536000000";
p=true
}},c=function(e){var d=document.createElement("iframe");
d.setAttribute("frameborder","0");
d.setAttribute("border","0");
var f=t(e.node);
d.id=e.id||(f?f.id||getUid(f):"");
d.style.cssText=" "+(e.cssText||"");
d.className=e.className||"";
d.src=e.src||"about:blank";
f&&f.parentNode.replaceChild(d,f);
return d
},b=function(d){d.className="chromeFrameInstallDefaultStyle "+(d.className||"");
d=c(d);
d.parentNode||document.body.insertBefore(d,document.body.firstChild)
},a=function(e){if(!t("chromeFrameOverlayContent")){var d=document.createElement("span");
d.innerHTML='<div class="chromeFrameOverlayUnderlay"></div><table class="chromeFrameOverlayContent"id="chromeFrameOverlayContent"cellpadding="0" cellspacing="0"><tr class="chromeFrameOverlayCloseBar"><td><button id="chromeFrameCloseButton">close</button></td></tr><tr><td id="chromeFrameIframeHolder"></td></tr></table>';
for(var f=document.body;
d.firstChild;
){f.insertBefore(d.lastChild,f.firstChild)
}e=c(e);
t("chromeFrameIframeHolder").appendChild(e);
t("chromeFrameCloseButton").onclick=g
}},v={};
v.check=function(e){e=e||{};
var d=navigator.userAgent,i=/MSIE (\S+); Windows NT/,f=false;
if(i.test(d)){if(parseFloat(i.exec(d)[1])<6&&d.indexOf("SV1")<0){f=true
}}else{f=true
}if(!f){if(!q){r('.chromeFrameInstallDefaultStyle {width: 800px;height: 600px;position: absolute;left: 50%;top: 50%;margin-left: -400px;margin-top: -300px;}.chromeFrameOverlayContent {position: absolute;margin-left: -400px;margin-top: -300px;left: 50%;top: 50%;border: 1px solid #93B4D9;background-color: white;z-index: 2001;}.chromeFrameOverlayContent iframe {width: 800px;height: 600px;border: none;}.chromeFrameOverlayCloseBar {height: 1em;text-align: right;background-color: #CADEF4;}.chromeFrameOverlayUnderlay {position: absolute;width: 100%;height: 100%;background-color: white;opacity: 0.5;-moz-opacity: 0.5;-webkit-opacity: 0.5;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter: alpha(opacity=50);z-index: 2000;}');
q=true
}document.cookie.indexOf("disableGCFCheck=1")>=0&&g();
d=(document.location.protocol=="https:"?"https:":"http:")+"//www.google.com/chromeframe";
if(!s()){e.onmissing&&e.onmissing();
e.src=e.url||d;
d=e.mode||"inline";
if(!(e.preventPrompt||0)){if(d=="inline"){b(e)
}else{d=="overlay"?a(e):window.open(e.src)
}}if(!e.preventInstallDetection){var h=setInterval(function(){if(s()){e.oninstall&&e.oninstall();
clearInterval(h);
window.location=e.destination||window.location
}},2000)
}}}};
v._force=false;
v._forceValue=false;
v.isAvailable=s;
u.CFInstall=v
}})(this.ChromeFrameInstallScope||this);