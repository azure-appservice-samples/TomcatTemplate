function stream_layers(d,a,c){if(arguments.length<3){c=0
}function b(g){var e=1/(0.1+Math.random()),k=2*Math.random()-0.5,j=10/(0.1+Math.random());
for(var h=0;
h<a;
h++){var f=(h/a-k)*j;
g[h]+=e*Math.exp(-f*f)
}}return d3.range(d).map(function(){var e=[],f;
for(f=0;
f<a;
f++){e[f]=c+c*Math.random()
}for(f=0;
f<5;
f++){b(e)
}return e.map(stream_index)
})
}function stream_waves(b,a){return d3.range(b).map(function(c){return d3.range(a).map(function(e){var d=20*e/a-c/3;
return 2*d*Math.exp(-0.5*d)
}).map(stream_index)
})
}function stream_index(b,a){return{x:a,y:Math.max(0,b)}
};