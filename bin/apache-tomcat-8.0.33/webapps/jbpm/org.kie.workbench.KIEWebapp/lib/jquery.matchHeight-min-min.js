(function(l){var k=-1,i=-1,e=function(b){return parseFloat(b)||0
},d=function(f){var c=null,g=[];
l(f).each(function(){var m=l(this),n=m.offset().top-e(m.css("margin-top")),b=0<g.length?g[g.length-1]:null;
null===b?g.push(m):1>=Math.floor(Math.abs(c-n))?g[g.length-1]=b.add(m):g.push(m);
c=n
});
return g
},j=function(f){var c={byRow:!0,property:"height",target:null,remove:!1};
if("object"===typeof f){return l.extend(c,f)
}"boolean"===typeof f?c.byRow=f:"remove"===f&&(c.remove=!0);
return c
},a=l.fn.matchHeight=function(b){b=j(b);
if(b.remove){var c=this;
this.css(b.property,"");
l.each(a._groups,function(g,f){f.elements=f.elements.not(c)
});
return this
}if(1>=this.length&&!b.target){return this
}a._groups.push({elements:this,options:b});
a._apply(this,b);
return this
};
a._groups=[];
a._throttle=80;
a._maintainScroll=!1;
a._beforeUpdate=null;
a._afterUpdate=null;
a._apply=function(g,q){var r=j(q),o=l(g),n=[o],c=l(window).scrollTop(),p=l("html").outerHeight(!0),b=o.parents().filter(":hidden");
b.each(function(){var f=l(this);
f.data("style-cache",f.attr("style"))
});
b.css("display","block");
r.byRow&&!r.target&&(o.each(function(){var m=l(this),f="inline-block"===m.css("display")?"inline-block":"block";
m.data("style-cache",m.attr("style"));
m.css({display:f,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"})
}),n=d(o),o.each(function(){var f=l(this);
f.attr("style",f.data("style-cache")||"")
}));
l.each(n,function(s,m){var u=l(m),t=0;
if(r.target){t=r.target.outerHeight(!1)
}else{if(r.byRow&&1>=u.length){u.css(r.property,"");
return
}u.each(function(){var v=l(this),f={display:"inline-block"===v.css("display")?"inline-block":"block"};
f[r.property]="";
v.css(f);
v.outerHeight(!1)>t&&(t=v.outerHeight(!1));
v.css("display","")
})
}u.each(function(){var v=l(this),f=0;
r.target&&v.is(r.target)||("border-box"!==v.css("box-sizing")&&(f+=e(v.css("border-top-width"))+e(v.css("border-bottom-width")),f+=e(v.css("padding-top"))+e(v.css("padding-bottom"))),v.css(r.property,t-f))
})
});
b.each(function(){var f=l(this);
f.attr("style",f.data("style-cache")||null)
});
a._maintainScroll&&l(window).scrollTop(c/p*l("html").outerHeight(!0));
return this
};
a._applyDataApi=function(){var b={};
l("[data-match-height], [data-mh]").each(function(){var c=l(this),f=c.attr("data-mh")||c.attr("data-match-height");
b[f]=f in b?b[f].add(c):c
});
l.each(b,function(){this.matchHeight(!0)
})
};
var h=function(b){a._beforeUpdate&&a._beforeUpdate(b,a._groups);
l.each(a._groups,function(){a._apply(this.elements,this.options)
});
a._afterUpdate&&a._afterUpdate(b,a._groups)
};
a._update=function(b,c){if(c&&"resize"===c.type){var f=l(window).width();
if(f===k){return
}k=f
}b?-1===i&&(i=setTimeout(function(){h(c);
i=-1
},a._throttle)):h(c)
};
l(a._applyDataApi);
l(window).bind("load",function(b){a._update(!1,b)
});
l(window).bind("resize orientationchange",function(b){a._update(!0,b)
})
})(jQuery);