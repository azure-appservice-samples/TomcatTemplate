$.editable.addInputType("autogrow",{element:function(c,b){var a=$("<textarea />");
if(c.rows){a.attr("rows",c.rows)
}else{a.height(c.height)
}if(c.cols){a.attr("cols",c.cols)
}else{a.width(c.width)
}$(this).append(a);
return(a)
},plugin:function(b,a){$("textarea",this).autogrow(b.autogrow)
}});