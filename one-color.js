if(typeof window!=="undefined"){window.one=window.one||{}}else{var one={}}one.include=one.exclude=function(){};(function(){var a=String.prototype;a.capitalize=function(){return this.charAt(0).toUpperCase()+this.substring(1)}}());one.color=function(c){if(c.charCodeAt){var a=c.match(/^rgba?\(\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*,\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*,\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*(?:,\s*(\.\d+|\d+(?:\.\d+))\s*)?\)/i);if(a){return new one.color.RGB(parseFloat(a[1])/(a[2]?100:255),parseFloat(a[3])/(a[4]?100:255),parseFloat(a[5])/(a[6]?100:255),parseFloat(a[7]))}if(c.length<6){c=c.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3")}var b=c.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(b){return new one.color.RGB(parseInt(b[1],16)/255,parseInt(b[2],16)/255,parseInt(b[3],16)/255)}}else{if(typeof c==="object"&&c.isColor){return c}else{if(Object.prototype.toString.apply(c)==="[object Array]"){return new one.color[c[0]](c.slice(1,c.length))}else{if(!isNaN(c)){return new one.color.RGB((c&255)/255,((c&65280)>>8)/255,((c&16711680)>>16)/255)}}}}return false};one.color.installedColorSpaces=[];one.color.installColorSpace=function(g,d,f){one.color[g]=new Function(d.join(","),"if (Object.prototype.toString.apply("+d[0]+") === '[object Array]') {"+d.map(function(h,j){return h+"="+d[0]+"["+j+"];"}).reverse().join("")+"}if ("+d.filter(function(h){return h!=="alpha"}).map(function(h){return"isNaN("+h+")"}).join("||")+'){throw new Error("[one.color.'+g+']: Invalid color: ("+'+d.join('+","+')+'+")");}'+d.map(function(h){if(h==="hue"){return"this._hue=hue<0?hue-Math.floor(hue):hue%1"}else{if(h==="a"){return"this._alpha=(isNaN(alpha)||alpha>1)?1:(alpha<0?0:alpha);"}else{return"this._"+h+"="+h+"<0?0:("+h+">1?1:"+h+")"}}}).join(";")+";");one.color[g].propertyNames=d;var e=one.color[g].prototype;["valueOf","hex","css","cssa"].forEach(function(h){e[h]=e[h]||(g==="RGB"?e.hex:new Function("return this.rgb()."+h+"();"))});e.isColor=true;e.equals=function(k,j){if(typeof j==="undefined"){j=1e-10}k=k[g.toLowerCase()]();for(var h=0;h<d.length;h=h+1){if(Math.abs(this["_"+d[h]]-k[d[h]])>j){return false}}return true};e.toJSON=new Function("return ['"+g+"', "+d.map(function(h){return"this._"+h},this).join(", ")+"];");for(var c in f){if(f.hasOwnProperty(c)){var b=c.match(/^from(.*)$/);if(b){one.color[b[1].toUpperCase()].prototype[g.toLowerCase()]=f[c]}else{e[c]=f[c]}}}e[g.toLowerCase()]=function(){return this};e.toString=new Function('return "[one.color.'+g+':"+'+d.map(function(h,j){return'" '+d[j]+'="+this._'+h}).join("+")+'+"]";');d.forEach(function(h,j){e[h]=new Function("value","isDelta","if (typeof value === 'undefined') {return this._"+h+";}if (isDelta) {return new this.constructor("+d.map(function(l,k){return"this._"+l+(h===l?"+value":"")}).join(", ")+");}return new this.constructor("+d.map(function(l,k){return h===l?"value":"this._"+l}).join(", ")+");")});function a(i,h){var j={};j[h.toLowerCase()]=new Function("return this.rgb()."+h.toLowerCase()+"();");one.color[h].propertyNames.forEach(function(l,m){j[l]=new Function("value","isDelta","return this."+h.toLowerCase()+"()."+l+"(value, isDelta);")});for(var k in j){if(j.hasOwnProperty(k)&&one.color[i].prototype[k]===undefined){one.color[i].prototype[k]=j[k]}}}one.color.installedColorSpaces.forEach(function(h){a(g,h);a(h,g)});one.color.installedColorSpaces.push(g)};one.color.installColorSpace("RGB",["red","green","blue","alpha"],{hex:function(){var a=(Math.round(255*this._red)*65536+Math.round(255*this._green)*256+Math.round(255*this._blue)).toString(16);return"#"+("00000".substr(0,6-a.length))+a},css:function(){return"rgb("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+")"},cssa:function(){return"rgba("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+","+this._alpha+")"}});one.color.installColorSpace("HSV",["hue","saturation","value","alpha"],{rgb:function(){var h=this._hue,g=this._saturation,l=this._value,e=Math.min(5,Math.floor(h*6)),j=h*6-e,b=l*(1-g),a=l*(1-j*g),m=l*(1-(1-j)*g),c,d,k;switch(e){case 0:c=l;d=m;k=b;break;case 1:c=a;d=l;k=b;break;case 2:c=b;d=l;k=m;break;case 3:c=b;d=a;k=l;break;case 4:c=m;d=b;k=l;break;case 5:c=l;d=b;k=a;break}return new one.color.RGB(c,d,k,this._alpha)},hsl:function(){var c=this._saturation,d=this._value,b=c*d,a=(2-c)*d;return new one.color.HSL(this._hue,b/(a<=1?a:(2-a)),a/2,this._alpha)},fromRgb:function(){var a=this._red,b=this._green,h=this._blue,f=Math.max(a,b,h),c=Math.min(a,b,h),i=f-c,e,d=(f===0)?0:(i/f),g=f;if(i===0){e=0}else{switch(f){case a:e=(b-h)/i/6+(b<h?1:0);break;case b:e=(h-a)/i/6+1/3;break;case h:e=(a-b)/i/6+2/3;break}}return new one.color.HSV(e,d,g,this._alpha)}});one.color.installColorSpace("HSL",["hue","saturation","lightness","alpha"],{hsv:function(){var a=this._saturation,b=this._lightness*2;if(b<=1){a*=b}else{a*=(2-b)}return new one.color.HSV(this._hue,(2*a)/(b+a),(b+a)/2,this._alpha)},rgb:function(){return this.hsv().rgb()},fromRgb:function(){return this.hsv().hsl()}});one.color.installColorSpace("CMYK",["cyan","magenta","yellow","black","alpha"],{rgb:function(){return new one.color.RGB((1-this._cyan*(1-this._black)-this._black),(1-this._magenta*(1-this._black)-this._black),(1-this._yellow*(1-this._black)-this._black),this._alpha)},fromRgb:function(){var e=this._red,d=this._green,a=this._blue,c=1-e,b=1-d,f=1-a,g=1;if(e||d||a){g=Math.min(c,Math.min(b,f));c=(c-g)/(1-g);b=(b-g)/(1-g);f=(f-g)/(1-g)}else{g=1}return new one.color.CMYK(c,b,f,g,this._alpha)}});if(module){module.exports=one.color};