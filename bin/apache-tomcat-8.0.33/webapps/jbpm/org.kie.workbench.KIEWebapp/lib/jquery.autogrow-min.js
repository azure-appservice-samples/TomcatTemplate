(function(b){var a=null;
b.fn.autogrow=function(c){return this.each(function(){new b.autogrow(this,c)
})
};
b.autogrow=function(c,d){this.options=d||{};
this.dummy=null;
this.interval=null;
this.line_height=this.options.lineHeight||parseInt(b(c).css("line-height"));
this.min_height=this.options.minHeight||parseInt(b(c).css("min-height"));
this.max_height=this.options.maxHeight||parseInt(b(c).css("max-height"));
this.textarea=b(c);
if(this.line_height==NaN){this.line_height=0
}this.init()
};
b.autogrow.fn=b.autogrow.prototype={autogrow:"1.2.2"};
b.autogrow.fn.extend=b.autogrow.extend=b.extend;
b.autogrow.fn.extend({init:function(){var c=this;
this.textarea.css({overflow:"hidden",display:"block"});
this.textarea.bind("focus",function(){c.startExpand()
}).bind("blur",function(){c.stopExpand()
});
this.checkExpand()
},startExpand:function(){var c=this;
this.interval=window.setInterval(function(){c.checkExpand()
},400)
},stopExpand:function(){clearInterval(this.interval)
},checkExpand:function(){if(this.dummy==null){this.dummy=b("<div></div>");
this.dummy.css({"font-size":this.textarea.css("font-size"),"font-family":this.textarea.css("font-family"),width:this.textarea.css("width"),padding:this.textarea.css("padding"),"line-height":this.line_height+"px","overflow-x":"hidden",position:"absolute",top:0,left:-9999}).appendTo("body")
}var c=this.textarea.val().replace(/(<|>)/g,"");
if($.browser.msie){c=c.replace(/\n/g,"<BR>new")
}else{c=c.replace(/\n/g,"<br>new")
}if(this.dummy.html()!=c){this.dummy.html(c);
if(this.max_height>0&&(this.dummy.height()+this.line_height>this.max_height)){this.textarea.css("overflow-y","auto")
}else{this.textarea.css("overflow-y","hidden");
if(this.textarea.height()<this.dummy.height()+this.line_height||(this.dummy.height()<this.textarea.height())){this.textarea.animate({height:(this.dummy.height()+this.line_height)+"px"},100)
}}}}})
})(jQuery);