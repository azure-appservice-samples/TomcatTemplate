!function(a){a.fn.sidebar=function(){var c=0,d=0,b=0;
a(".navbar-pf .navbar-toggle").is(":hidden")&&(c=a(document).height(),d=a(".navbar-pf").outerHeight(),b=c-d),a(".sidebar-pf").parent(".row").children('[class*="col-"]').css({"min-height":b})
},a(document).ready(function(){a(".sidebar-pf").length>0&&0===a(".datatable").length&&a.fn.sidebar()
}),a(window).resize(function(){a(".sidebar-pf").length>0&&a.fn.sidebar()
})
}(jQuery),function(a){a.fn.popovers=function(){return this.popover(),this.filter("[data-close=true]").each(function(b,c){var d=a(c),e=d.attr("data-original-title")+'<button type="button" class="close" aria-hidden="true"><span class="pficon pficon-close"></span></button>';
d.attr("data-original-title",e)
}),this.on("click",function(d){var c=a(this),b=c.next(".popover").find(".popover-title");
b.find(".close").parent(".popover-title").addClass("closable"),b.find(".close").on("click",function(){c.popover("hide")
}),d.preventDefault()
}),this
}
}(jQuery),function(a){a.fn.dataTableExt&&(a.extend(!0,a.fn.dataTable.defaults,{bDestroy:!0,bAutoWidth:!1,iDisplayLength:20,sDom:"<'dataTables_header' f i r ><'table-responsive'  t ><'dataTables_footer' p >",oLanguage:{sInfo:"Showing <b>_START_</b> to <b>_END_</b> of <b>_TOTAL_</b> Items",sInfoFiltered:"(of <b>_MAX_</b>)",sInfoEmpty:"Showing <b>0</b> Results",sZeroRecords:"<p>Suggestions</p><ul><li>Check the syntax of the search term.</li><li>Check that the correct menu option is chosen (token ID vs. user ID).</li><li>Use wildcards (* to match zero or more characters or ? to match a single character).</li><li>Clear the search field, then click Search to return to the 20 most recent records.</li></ul>",sSearch:""},sPaginationType:"bootstrap_input"}),a.extend(a.fn.dataTableExt.oStdClasses,{sWrapper:"dataTables_wrapper"}),a.fn.dataTableExt.oApi.fnPagingInfo=function(b){return{iStart:b._iDisplayStart,iEnd:b.fnDisplayEnd(),iLength:b._iDisplayLength,iTotal:b.fnRecordsTotal(),iFilteredTotal:b.fnRecordsDisplay(),iPage:-1===b._iDisplayLength?0:Math.ceil(b._iDisplayStart/b._iDisplayLength),iTotalPages:-1===b._iDisplayLength?0:Math.ceil(b.fnRecordsDisplay()/b._iDisplayLength)}
},a.extend(a.fn.dataTableExt.oPagination,{bootstrap_input:{fnInit:function(e,b,d){var c,g,f=function(h){h.preventDefault(),e.oApi._fnPageChange(e,h.data.action)&&d(e)
};
a(b).append('<ul class="pagination">  <li class="first disabled"><span class="i fa fa-angle-double-left"></span></li>  <li class="prev disabled"><span class="i fa fa-angle-left"></span></li></ul><div class="pagination-input">  <input type="text" class="paginate_input">  <span class="paginate_of">of <b>3</b></span></div><ul class="pagination">  <li class="next disabled"><span class="i fa fa-angle-right"></span></li>  <li class="last disabled"><span class="i fa fa-angle-double-right"></span></li></ul>'),c=a("li",b),a(c[0]).bind("click.DT",{action:"first"},f),a(c[1]).bind("click.DT",{action:"previous"},f),a(c[2]).bind("click.DT",{action:"next"},f),a(c[3]).bind("click.DT",{action:"last"},f),g=a("input",b),a(g).keyup(function(i){if(38===i.which||39===i.which?this.value+=1:(37===i.which||40===i.which)&&this.value>1&&(this.value-=1),""!==this.value&&this.value.match(/[0-9]/)){var h=e._iDisplayLength*(this.value-1);
if(h>e.fnRecordsDisplay()){return e._iDisplayStart=(Math.ceil((e.fnRecordsDisplay()-1)/e._iDisplayLength)-1)*e._iDisplayLength,void d(e)
}e._iDisplayStart=h,d(e)
}})
},fnUpdate:function(h){var e,f=h.oInstance.fnPagingInfo(),g=h.aanFeatures.p,c=g.length,d=Math.ceil(h.fnRecordsDisplay()/h._iDisplayLength),b=Math.ceil(h._iDisplayStart/h._iDisplayLength)+1;
for(e=0;
c>e;
e+=1){a(".paginate_input").val(b),a(".paginate_of b").html(d),0===f.iPage?(a("li.first",g[e]).addClass("disabled"),a("li.prev",g[e]).addClass("disabled")):(a("li.first",g[e]).removeClass("disabled"),a("li.prev",g[e]).removeClass("disabled")),f.iPage===f.iTotalPages-1||0===f.iTotalPages?(a("li.next",g[e]).addClass("disabled"),a("li.last",g[e]).addClass("disabled")):(a("li.next",g[e]).removeClass("disabled"),a("li.last",g[e]).removeClass("disabled"))
}}}}))
}(jQuery),function(a){a.fn.navigation=function(){var b=a(".layout-pf-alt-fixed .nav-pf-vertical-alt"),i=a(".container-pf-alt-nav-pf-vertical-alt"),f=a(".navbar-toggle"),g=!1,h={tablet:768,desktop:1024},c=function(){var n=a(window).width();
b.removeClass("hidden show-mobile-nav collapsed"),i.removeClass("collapsed-nav hidden-nav"),(n<h.desktop||g)&&(b.addClass("collapsed"),i.addClass("collapsed-nav")),n<h.tablet&&(b.addClass("hidden"),b.removeClass("collapsed"),i.removeClass("collapsed-nav"),i.addClass("hidden-nav"))
},l=function(){b.addClass("collapsed"),i.addClass("collapsed-nav"),g=!0
},d=function(){a("html").addClass("transitions")
},j=function(){b.removeClass("collapsed"),i.removeClass("collapsed-nav"),g=!1
},e=function(){f.on("click",function(){d();
var n=i.hasClass("hidden-nav");
n&&b.hasClass("show-mobile-nav")?b.removeClass("show-mobile-nav"):n?b.addClass("show-mobile-nav"):b.hasClass("collapsed")?j():l()
})
},m=function(){a('.nav-pf-vertical-alt [data-toggle="tooltip"]').tooltip({container:"body",delay:{show:"500",hide:"200"}}),a(".nav-pf-vertical-alt").on("show.bs.tooltip",function(){return a(this).hasClass("collapsed")?void 0:!1
})
},k=function(){c(),e(),m()
};
a(window).on("resize",function(){c(),d()
}),k()
},a(document).ready(function(){a(".nav-pf-vertical-alt").length>0&&a.fn.navigation()
})
}(jQuery),function(a){a.fn.countRemainingChars=function(c){var d=a.extend({charsMaxLimit:100,charsWarnRemaining:5,blockInputAtMaxLimit:!1},c),e=this,f=a("#"+d.countFld).text(d.charsMaxLimit),b=function(h){var g=d.charsMaxLimit-h;
f.text(g),f.toggleClass("chars-warn-remaining-pf",g<=d.charsWarnRemaining),0>g?e.trigger("overCharsMaxLimitEvent",e.attr("id")):e.trigger("underCharsMaxLimitEvent",e.attr("id"))
};
return this.on("paste",function(){setTimeout(function(){var g,h=e.val().length;
d.blockInputAtMaxLimit&&h>d.charsMaxLimit&&(g=e.val(),g=g.substring(0,d.charsMaxLimit),e.val(g),h=e.val().length),b(h)
},100)
}),this.keyup(function(){b(e.val().length)
}),this.keydown(function(g){var h=e.val().length;
d.blockInputAtMaxLimit&&h>=d.charsMaxLimit&&8!==g.keyCode&&g.preventDefault()
}),this
}
}(jQuery),function(a){a.fn.c3ChartDefaults=function(){var k,b,n,g,f,e,l,o,m,c,d,i,j,h;
return k=function(){return{pattern:["#0088ce","#00659c","#3f9c35","#ec7a08","#cc0000"]}
},b=function(p){return{title:p,label:{show:!1},width:11}
},n=function(){return{height:171}
},g=function(){return{pattern:["#0088CE","#D1D1D1"]}
},f=function(){return{show:!1}
},e=function(){return{show:!1}
},l=function(p){return{donut:this.getDefaultDonut(p),size:this.getDefaultDonutSize(),legend:this.getDefaultDonutLegend(),color:this.getDefaultDonutColors(),tooltip:this.getDefaultDonutTooltip()}
},o=function(){return{zerobased:!0}
},m=function(){return{height:60}
},c=function(){return{x:{show:!1},y:{show:!1}}
},d=function(){return{show:!1}
},i=function(){return{r:1,focus:{expand:{r:4}}}
},j=function(){return{contents:function(p){return'<span class="c3-tooltip-sparkline">'+p[0].value+" "+p[0].name+"</span>"
}}
},h=function(){return{area:o(),size:m(),axis:c(),color:k(),legend:d(),point:i(),tooltip:j()}
},{getDefaultColors:k,getDefaultDonut:b,getDefaultDonutSize:n,getDefaultDonutColors:g,getDefaultDonutTooltip:f,getDefaultDonutLegend:e,getDefaultDonutConfig:l,getDefaultSparklineArea:o,getDefaultSparklineSize:m,getDefaultSparklineAxis:c,getDefaultSparklineLegend:d,getDefaultSparklinePoint:i,getDefaultSparklineTooltip:j,getDefaultSparklineConfig:h}
}
}(jQuery),function(a){a.fn.initCollapseHeights=function(){var b,c=this;
b=function(){var e,d,g,h,f="hidden";
e=c.height(),d=c.find(".collapse.in"),d&&d.length>0&&d.removeClass("in"),g=0,c.children().each(a.proxy(function(l,k){var j=a(k);
g+=j.outerHeight(!0)
},c)).end(),h=e-g,25>h&&(h=25,f="auto"),c.find('[data-toggle="collapse"]').each(a.proxy(function(n,m){var l,k,j;
l=a(m),k=l.attr("data-target"),k||(k=l.attr("href")),j=a(k),j.css({"max-height":h+"px","overflow-y":"auto"})
},c)).end(),d&&d.length>0&&d.addClass("in"),c.css({"overflow-y":f})
},b(),a(window).resize(b)
}
}(jQuery);