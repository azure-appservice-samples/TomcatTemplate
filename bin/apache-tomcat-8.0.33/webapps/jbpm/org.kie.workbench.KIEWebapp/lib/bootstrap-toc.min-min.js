/*!
 * Bootstrap Table of Contents v0.3.0 (http://afeld.github.io/bootstrap-toc/)
 * Copyright 2015 Aidan Feldman
 * Licensed under MIT (https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md) */
!function(){window.Toc={helpers:{findOrFilter:function(c,a){var b=c.find(a);
return c.filter(a).add(b).filter(":not([data-toc-skip])")
},generateUniqueIdBase:function(c){var a=$(c).text(),b=a.trim().toLowerCase().replace(/[^A-Za-z0-9]+/g,"-");
return b||c.tagName.toLowerCase()
},generateUniqueId:function(c){for(var a=this.generateUniqueIdBase(c),b=0;
;
b++){var d=a;
if(b>0&&(d+="-"+b),!document.getElementById(d)){return d
}}},generateAnchor:function(b){if(b.id){return b.id
}var a=this.generateUniqueId(b);
return b.id=a,a
},createNavList:function(){return $('<ul class="nav"></ul>')
},createChildNavList:function(b){var a=this.createNavList();
return b.append(a),a
},generateNavItem:function(c){var a=this.generateAnchor(c),b=$(c),d=b.data("toc-text")||b.text();
return $('<li><a href="#'+a+'">'+d+"</a></li>")
},getTopLevel:function(c){for(var a,b=1;
4>b;
b++){var d=this.findOrFilter(c,"h"+b);
if(d.length>1){a=b;
break
}}return a||1
},getHeadings:function(f,c){var d="h"+c,g=c+1,b="h"+g;
return this.findOrFilter(f,d+","+b)
},getNavLevel:function(a){return parseInt(a.tagName.charAt(1),10)
},populateNav:function(g,d,f){var h,b=g,c=this;
f.each(function(e,i){var a=c.generateNavItem(i),j=c.getNavLevel(i);
j===d?b=g:h&&b===g&&(b=c.createChildNavList(h)),b.append(a),h=a
})
},parseOps:function(b){var a;
return a=b.jquery?{$nav:b}:b,a.$scope=a.$scope||$(document.body),a
}},init:function(c){c=this.helpers.parseOps(c),c.$nav.attr("data-toggle","toc");
var a=this.helpers.createChildNavList(c.$nav),b=this.helpers.getTopLevel(c.$scope),d=this.helpers.getHeadings(c.$scope,b);
this.helpers.populateNav(a,b,d)
}},$(function(){$('nav[data-toggle="toc"]').each(function(c,a){var b=$(a);
Toc.init(b)
})
})
}();