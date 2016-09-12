nv.utils.windowSize=function(){var a={width:640,height:480};
if(document.body&&document.body.offsetWidth){a.width=document.body.offsetWidth;
a.height=document.body.offsetHeight
}if(document.compatMode=="CSS1Compat"&&document.documentElement&&document.documentElement.offsetWidth){a.width=document.documentElement.offsetWidth;
a.height=document.documentElement.offsetHeight
}if(window.innerWidth&&window.innerHeight){a.width=window.innerWidth;
a.height=window.innerHeight
}return(a)
};
nv.utils.windowResize=function(a){var b=window.onresize;
window.onresize=function(c){if(typeof b=="function"){b(c)
}a(c)
}
};
nv.utils.getColor=function(a){if(Object.prototype.toString.call(a)==="[object Array]"){return function(c,b){return c.color||a[b%a.length]
}
}else{return a
}};
nv.utils.defaultColor=function(){var a=d3.scale.category20().range();
return function(c,b){return c.color||a[b%a.length]
}
};
nv.utils.pjax=function(a,b){d3.selectAll(a).on("click",function(){history.pushState(this.href,this.textContent,this.href);
c(this.href);
d3.event.preventDefault()
});
function c(d){d3.html(d,function(e){var f=d3.select(b).node();
f.parentNode.replaceChild(d3.select(e).select(b).node(),f);
nv.utils.pjax(a,b)
})
}d3.select(window).on("popstate",function(){if(d3.event.state){c(d3.event.state)
}})
};