/*
 Highcharts JS v5.0.10 (2017-03-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(a){function n(a,c){this.init(a,c)}var r=a.CenteredSeriesMixin,u=a.each,h=a.extend,e=a.merge,m=a.splat;h(n.prototype,{coll:"pane",init:function(a,c){this.chart=c;this.background=[];c.pane.push(this);this.setOptions(a)},setOptions:function(a){this.options=e(this.defaultOptions,this.chart.angular?{background:{}}:void 0,a)},render:function(){var a=this.options,c=this.options.background,d=this.chart.renderer;
this.group||(this.group=d.g("pane-group").attr({zIndex:a.zIndex||0}).add());this.updateCenter();if(c)for(c=m(c),a=Math.max(c.length,this.background.length||0),d=0;d<a;d++)c[d]?this.renderBackground(e(this.defaultBackgroundOptions,c[d]),d):this.background[d]&&(this.background[d]=this.background[d].destroy(),this.background.splice(d,1))},renderBackground:function(a,c){var d="animate";this.background[c]||(this.background[c]=this.chart.renderer.path().add(this.group),d="attr");this.background[c][d]({d:this.axis.getPlotBandPath(a.from,
a.to,a)}).attr({"class":"highcharts-pane "+(a.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(a){this.center=(a||this.axis||{}).center=r.getCenter.call(this)},update:function(a,c){e(!0,this.options,a);this.setOptions(this.options);this.render();u(this.chart.axes,function(d){d.pane===this&&(d.pane=null,d.update({},c))},this)}});
a.Pane=n})(w);(function(a){var n=a.each,r=a.extend,u=a.map,h=a.merge,e=a.noop,m=a.pick,q=a.pInt,c=a.wrap,d,g,k=a.Axis.prototype;a=a.Tick.prototype;d={getOffset:e,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:e,setCategories:e,setTitle:e};g={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},
zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(b){b=this.options=h(this.defaultOptions,this.defaultRadialOptions,b);b.plotBands||(b.plotBands=[])},getOffset:function(){k.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(b,
f){b=this.center;var c=this.chart,d=m(f,b[2]/2-this.offset);this.isCircular||void 0!==f?f=this.chart.renderer.symbols.arc(this.left+b[0],this.top+b[1],d,d,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}):(f=this.postTranslate(this.angleRad,d),f=["M",b[0]+c.plotLeft,b[1]+c.plotTop,"L",f.x,f.y]);return f},setAxisTranslation:function(){k.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/
2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===m(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){k.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=
this.height=this.center[2]*m(this.sector,1)/2)},getPosition:function(b,f){return this.postTranslate(this.isCircular?this.translate(b):this.angleRad,m(this.isCircular?f:this.translate(b),this.center[2]/2)-this.offset)},postTranslate:function(b,f){var c=this.chart,d=this.center;b=this.startAngleRad+b;return{x:c.plotLeft+d[0]+Math.cos(b)*f,y:c.plotTop+d[1]+Math.sin(b)*f}},getPlotBandPath:function(b,f,c){var d=this.center,p=this.startAngleRad,a=d[2]/2,g=[m(c.outerRadius,"100%"),c.innerRadius,m(c.thickness,
10)],k=Math.min(this.offset,0),e=/%$/,x,h=this.isCircular;"polygon"===this.options.gridLineInterpolation?d=this.getPlotLinePath(b).concat(this.getPlotLinePath(f,!0)):(b=Math.max(b,this.min),f=Math.min(f,this.max),h||(g[0]=this.translate(b),g[1]=this.translate(f)),g=u(g,function(b){e.test(b)&&(b=q(b,10)*a/100);return b}),"circle"!==c.shape&&h?(b=p+this.translate(b),f=p+this.translate(f)):(b=-Math.PI/2,f=1.5*Math.PI,x=!0),g[0]-=k,g[2]-=k,d=this.chart.renderer.symbols.arc(this.left+d[0],this.top+d[1],
g[0],g[0],{start:Math.min(b,f),end:Math.max(b,f),innerR:m(g[1],g[0]-g[2]),open:x}));return d},getPlotLinePath:function(b,f){var c=this,d=c.center,g=c.chart,a=c.getPosition(b),k,q,e;c.isCircular?e=["M",d[0]+g.plotLeft,d[1]+g.plotTop,"L",a.x,a.y]:"circle"===c.options.gridLineInterpolation?(b=c.translate(b))&&(e=c.getLinePath(0,b)):(n(g.xAxis,function(b){b.pane===c.pane&&(k=b)}),e=[],b=c.translate(b),d=k.tickPositions,k.autoConnect&&(d=d.concat([d[0]])),f&&(d=[].concat(d).reverse()),n(d,function(c,d){q=
k.getPosition(c,b);e.push(d?"L":"M",q.x,q.y)}));return e},getTitlePosition:function(){var b=this.center,c=this.chart,d=this.options.title;return{x:c.plotLeft+b[0]+(d.x||0),y:c.plotTop+b[1]-{high:.5,middle:.25,low:0}[d.align]*b[2]+(d.y||0)}}};c(k,"init",function(b,c,a){var f=c.angular,l=c.polar,p=a.isX,k=f&&p,e,q=c.options,x=this.pane=c.pane[a.pane||0],n=x.options;if(f){if(r(this,k?d:g),e=!p)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else l&&(r(this,g),this.defaultRadialOptions=(e=p)?
this.defaultRadialXOptions:h(this.defaultYAxisOptions,this.defaultRadialYOptions));f||l?(this.isRadial=!0,c.inverted=!1,q.chart.zoomType=null):this.isRadial=!1;e&&(x.axis=this);b.call(this,c,a);k||!f&&!l||(b=this.options,this.angleRad=(b.angle||0)*Math.PI/180,this.startAngleRad=(n.startAngle-90)*Math.PI/180,this.endAngleRad=(m(n.endAngle,n.startAngle+360)-90)*Math.PI/180,this.offset=b.offset||0,this.isCircular=e)});c(k,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,
1))});c(a,"getPosition",function(b,c,d,g,a){var f=this.axis;return f.getPosition?f.getPosition(d):b.call(this,c,d,g,a)});c(a,"getLabelPosition",function(b,c,d,g,a,k,e,q,h){var f=this.axis,p=k.y,l=20,v=k.align,t=(f.translate(this.pos)+f.startAngleRad+Math.PI/2)/Math.PI*180%360;f.isRadial?(b=f.getPosition(this.pos,f.center[2]/2+m(k.distance,-25)),"auto"===k.rotation?g.attr({rotation:t}):null===p&&(p=f.chart.renderer.fontMetrics(g.styles.fontSize).b-g.getBBox().height/2),null===v&&(f.isCircular?(this.label.getBBox().width>
f.len*f.tickInterval/(f.max-f.min)&&(l=0),v=t>l&&t<180-l?"left":t>180+l&&t<360-l?"right":"center"):v="center",g.attr({align:v})),b.x+=k.x,b.y+=p):b=b.call(this,c,d,g,a,k,e,q,h);return b});c(a,"getMarkPath",function(b,c,d,g,a,k,e){var f=this.axis;f.isRadial?(b=f.getPosition(this.pos,f.center[2]/2+g),c=["M",c,d,"L",b.x,b.y]):c=b.call(this,c,d,g,a,k,e);return c})})(w);(function(a){var n=a.each,r=a.noop,u=a.pick,h=a.Series,e=a.seriesType,m=a.seriesTypes;e("arearange","area",{marker:null,threshold:null,
tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{series.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(a){return[a.low,a.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(a){var c=
this.chart,d=this.xAxis.postTranslate(a.rectPlotX,this.yAxis.len-a.plotHigh);a.plotHighX=d.x-c.plotLeft;a.plotHigh=d.y-c.plotTop},translate:function(){var a=this,c=a.yAxis,d=!!a.modifyValue;m.area.prototype.translate.apply(a);n(a.points,function(g){var k=g.low,b=g.high,f=g.plotY;null===b||null===k?g.isNull=!0:(g.plotLow=f,g.plotHigh=c.translate(d?a.modifyValue(b,g):b,0,1,0,1),d&&(g.yBottom=g.plotHigh))});this.chart.polar&&n(this.points,function(c){a.highToXY(c)})},getGraphPath:function(a){var c=[],
d=[],g,k=m.area.prototype.getGraphPath,b,f,p;p=this.options;var v=this.chart.polar&&!1!==p.connectEnds,l=p.step;a=a||this.points;for(g=a.length;g--;)b=a[g],b.isNull||v||a[g+1]&&!a[g+1].isNull||d.push({plotX:b.plotX,plotY:b.plotY,doCurve:!1}),f={polarPlotY:b.polarPlotY,rectPlotX:b.rectPlotX,yBottom:b.yBottom,plotX:u(b.plotHighX,b.plotX),plotY:b.plotHigh,isNull:b.isNull},d.push(f),c.push(f),b.isNull||v||a[g-1]&&!a[g-1].isNull||d.push({plotX:b.plotX,plotY:b.plotY,doCurve:!1});a=k.call(this,a);l&&(!0===
l&&(l="left"),p.step={left:"right",center:"center",right:"left"}[l]);c=k.call(this,c);d=k.call(this,d);p.step=l;p=[].concat(a,c);this.chart.polar||"M"!==d[0]||(d[0]="L");this.graphPath=p;this.areaPath=this.areaPath.concat(a,d);p.isArea=!0;p.xMap=a.xMap;this.areaPath.xMap=a.xMap;return p},drawDataLabels:function(){var a=this.data,c=a.length,d,g=[],k=h.prototype,b=this.options.dataLabels,f=b.align,p=b.verticalAlign,v=b.inside,l,e,t=this.chart.inverted;if(b.enabled||this._hasPointLabels){for(d=c;d--;)if(l=
a[d])e=v?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.y=l.high,l._plotY=l.plotY,l.plotY=l.plotHigh,g[d]=l.dataLabel,l.dataLabel=l.dataLabelUpper,l.below=e,t?f||(b.align=e?"right":"left"):p||(b.verticalAlign=e?"top":"bottom"),b.x=b.xHigh,b.y=b.yHigh;k.drawDataLabels&&k.drawDataLabels.apply(this,arguments);for(d=c;d--;)if(l=a[d])e=v?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.dataLabelUpper=l.dataLabel,l.dataLabel=g[d],l.y=l.low,l.plotY=l._plotY,l.below=!e,t?f||(b.align=e?"left":"right"):p||(b.verticalAlign=
e?"bottom":"top"),b.x=b.xLow,b.y=b.yLow;k.drawDataLabels&&k.drawDataLabels.apply(this,arguments)}b.align=f;b.verticalAlign=p},alignDataLabel:function(){m.column.prototype.alignDataLabel.apply(this,arguments)},setStackedPoints:r,getSymbol:r,drawPoints:r})})(w);(function(a){var n=a.seriesType;n("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(w);(function(a){var n=a.defaultPlotOptions,r=a.each,u=a.merge,h=a.noop,e=a.pick,m=a.seriesType,q=a.seriesTypes.column.prototype;
m("columnrange","arearange",u(n.column,n.arearange,{lineWidth:1,pointRange:null}),{translate:function(){var c=this,d=c.yAxis,a=c.xAxis,k=a.startAngleRad,b,f=c.chart,p=c.xAxis.isRadial,v;q.translate.apply(c);r(c.points,function(g){var l=g.shapeArgs,t=c.options.minPointLength,h,m;g.plotHigh=v=d.translate(g.high,0,1,0,1);g.plotLow=g.plotY;m=v;h=e(g.rectPlotY,g.plotY)-v;Math.abs(h)<t?(t-=h,h+=t,m-=t/2):0>h&&(h*=-1,m-=h);p?(b=g.barX+k,g.shapeType="path",g.shapeArgs={d:c.polarArc(m+h,m,b,b+g.pointWidth)}):
(l.height=h,l.y=m,g.tooltipPos=f.inverted?[d.len+d.pos-f.plotLeft-m-h/2,a.len+a.pos-f.plotTop-l.x-l.width/2,h]:[a.left-f.plotLeft+l.x+l.width/2,d.pos-f.plotTop+m+h/2,h])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:h,crispCol:q.crispCol,drawPoints:q.drawPoints,drawTracker:q.drawTracker,getColumnMetrics:q.getColumnMetrics,animate:function(){return q.animate.apply(this,arguments)},polarArc:function(){return q.polarArc.apply(this,arguments)},pointAttribs:q.pointAttribs})})(w);
(function(a){var n=a.each,r=a.isNumber,u=a.merge,h=a.pick,e=a.pInt,m=a.Series,q=a.seriesType,c=a.TrackerMixin;q("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var c=this.yAxis,a=this.options,k=c.center;this.generatePoints();n(this.points,
function(b){var d=u(a.dial,b.dial),g=e(h(d.radius,80))*k[2]/200,v=e(h(d.baseLength,70))*g/100,l=e(h(d.rearLength,10))*g/100,m=d.baseWidth||3,t=d.topWidth||1,n=a.overshoot,q=c.startAngleRad+c.translate(b.y,null,null,null,!0);r(n)?(n=n/180*Math.PI,q=Math.max(c.startAngleRad-n,Math.min(c.endAngleRad+n,q))):!1===a.wrap&&(q=Math.max(c.startAngleRad,Math.min(c.endAngleRad,q)));q=180*q/Math.PI;b.shapeType="path";b.shapeArgs={d:d.path||["M",-l,-m/2,"L",v,-m/2,g,-t/2,g,t/2,v,m/2,-l,m/2,"z"],translateX:k[0],
translateY:k[1],rotation:q};b.plotX=k[0];b.plotY=k[1]})},drawPoints:function(){var c=this,a=c.yAxis.center,k=c.pivot,b=c.options,f=b.pivot,p=c.chart.renderer;n(c.points,function(d){var a=d.graphic,f=d.shapeArgs,g=f.d;u(b.dial,d.dial);a?(a.animate(f),f.d=g):d.graphic=p[d.shapeType](f).attr({rotation:f.rotation,zIndex:1}).addClass("highcharts-dial").add(c.group)});k?k.animate({translateX:a[0],translateY:a[1]}):c.pivot=p.circle(0,0,h(f.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],
a[1]).add(c.group)},animate:function(c){var d=this;c||(n(d.points,function(c){var b=c.graphic;b&&(b.attr({rotation:180*d.yAxis.startAngleRad/Math.PI}),b.animate({rotation:c.shapeArgs.rotation},d.options.animation))}),d.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);m.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(c,a){m.prototype.setData.call(this,c,!1);this.processData();
this.generatePoints();h(a,!0)&&this.chart.redraw()},drawTracker:c&&c.drawTrackerPoint},{setState:function(c){this.state=c}})})(w);(function(a){var n=a.each,r=a.noop,u=a.seriesType,h=a.seriesTypes;u("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},
whiskerLength:"50%"},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",drawDataLabels:r,translate:function(){var a=this.yAxis,m=this.pointArrayMap;h.column.prototype.translate.apply(this);n(this.points,function(e){n(m,function(c){null!==e[c]&&(e[c+"Plot"]=a.translate(e[c],0,1,0,1))})})},drawPoints:function(){var a=this,h=a.chart.renderer,q,c,d,g,k,b,f=0,p,v,l,C,t=!1!==a.doQuartiles,r,u=a.options.whiskerLength;n(a.points,
function(e){var m=e.graphic,n=m?"animate":"attr",E=e.shapeArgs;void 0!==e.plotY&&(p=E.width,v=Math.floor(E.x),l=v+p,C=Math.round(p/2),q=Math.floor(t?e.q1Plot:e.lowPlot),c=Math.floor(t?e.q3Plot:e.lowPlot),d=Math.floor(e.highPlot),g=Math.floor(e.lowPlot),m||(e.graphic=m=h.g("point").add(a.group),e.stem=h.path().addClass("highcharts-boxplot-stem").add(m),u&&(e.whiskers=h.path().addClass("highcharts-boxplot-whisker").add(m)),t&&(e.box=h.path(void 0).addClass("highcharts-boxplot-box").add(m)),e.medianShape=
h.path(void 0).addClass("highcharts-boxplot-median").add(m)),b=e.stem.strokeWidth()%2/2,f=v+C+b,e.stem[n]({d:["M",f,c,"L",f,d,"M",f,q,"L",f,g]}),t&&(b=e.box.strokeWidth()%2/2,q=Math.floor(q)+b,c=Math.floor(c)+b,v+=b,l+=b,e.box[n]({d:["M",v,c,"L",v,q,"L",l,q,"L",l,c,"L",v,c,"z"]})),u&&(b=e.whiskers.strokeWidth()%2/2,d+=b,g+=b,r=/%$/.test(u)?C*parseFloat(u)/100:u/2,e.whiskers[n]({d:["M",f-r,d,"L",f+r,d,"M",f-r,g,"L",f+r,g]})),k=Math.round(e.medianPlot),b=e.medianShape.strokeWidth()%2/2,k+=b,e.medianShape[n]({d:["M",
v,k,"L",l,k]}))})},setStackedPoints:r})})(w);(function(a){var n=a.each,r=a.noop,u=a.seriesType,h=a.seriesTypes;u("errorbar","boxplot",{grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:h.arearange?
function(){var a=this.pointValKey;h.arearange.prototype.drawDataLabels.call(this);n(this.data,function(e){e.y=e[a]})}:r,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||h.column.prototype.getColumnMetrics.call(this)}})})(w);(function(a){var n=a.correctFloat,r=a.isNumber,u=a.pick,h=a.Point,e=a.Series,m=a.seriesType,q=a.seriesTypes;m("waterfall","column",{dataLabels:{inside:!0}},{pointValKey:"y",translate:function(){var c=this.options,a=this.yAxis,g,k,b,f,p,e,l,
h,t,m,r=u(c.minPointLength,5),w=r/2,z=c.threshold,A=c.stacking,y;q.column.prototype.translate.apply(this);h=t=z;k=this.points;g=0;for(c=k.length;g<c;g++)b=k[g],l=this.processedYData[g],f=b.shapeArgs,p=A&&a.stacks[(this.negStacks&&l<z?"-":"")+this.stackKey],y=this.getStackIndicator(y,b.x,this.index),m=p?p[b.x].points[y.key]:[0,l],b.isSum?b.y=n(l):b.isIntermediateSum&&(b.y=n(l-t)),e=Math.max(h,h+b.y)+m[0],f.y=a.toPixels(e,!0),b.isSum?(f.y=a.toPixels(m[1],!0),f.height=Math.min(a.toPixels(m[0],!0),a.len)-
f.y):b.isIntermediateSum?(f.y=a.toPixels(m[1],!0),f.height=Math.min(a.toPixels(t,!0),a.len)-f.y,t=m[1]):(f.height=0<l?a.toPixels(h,!0)-f.y:a.toPixels(h,!0)-a.toPixels(h-l,!0),h+=p&&p[b.x]?p[b.x].total:l),0>f.height&&(f.y+=f.height,f.height*=-1),b.plotY=f.y=Math.round(f.y)-this.borderWidth%2/2,f.height=Math.max(Math.round(f.height),.001),b.yBottom=f.y+f.height,f.height<=r&&!b.isNull?(f.height=r,f.y-=w,b.plotY=f.y,b.minPointLengthOffset=0>b.y?-w:w):b.minPointLengthOffset=0,f=b.plotY+(b.negative?f.height:
0),this.chart.inverted?b.tooltipPos[0]=a.len-f:b.tooltipPos[1]=f},processData:function(c){var a=this.yData,g=this.options.data,k,b=a.length,f,p,h,l,m,t;p=f=h=l=this.options.threshold||0;for(t=0;t<b;t++)m=a[t],k=g&&g[t]?g[t]:{},"sum"===m||k.isSum?a[t]=n(p):"intermediateSum"===m||k.isIntermediateSum?a[t]=n(f):(p+=m,f+=m),h=Math.min(p,h),l=Math.max(p,l);e.prototype.processData.call(this,c);this.options.stacking||(this.dataMin=h,this.dataMax=l)},toYData:function(c){return c.isSum?0===c.x?null:"sum":c.isIntermediateSum?
0===c.x?null:"intermediateSum":c.y},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var c=this.data,a=c.length,g=this.graph.strokeWidth()+this.borderWidth,g=Math.round(g)%2/2,k=[],b,f,e;for(e=1;e<a;e++)f=c[e].shapeArgs,b=c[e-1].shapeArgs,f=["M",b.x+b.width,b.y+c[e-1].minPointLengthOffset+g,"L",f.x,b.y+c[e-1].minPointLengthOffset+g],0>c[e-1].y&&(f[2]+=b.height,f[5]+=b.height),k=k.concat(f);return k},drawGraph:function(){e.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},
setStackedPoints:function(){var c=this.options,a,g;e.prototype.setStackedPoints.apply(this,arguments);a=this.stackedYData?this.stackedYData.length:0;for(g=1;g<a;g++)c.data[g].isSum||c.data[g].isIntermediateSum||(this.stackedYData[g]+=this.stackedYData[g-1])},getExtremes:function(){if(this.options.stacking)return e.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var c=h.prototype.getClassName.call(this);this.isSum?c+=" highcharts-sum":this.isIntermediateSum&&(c+=" highcharts-intermediate-sum");
return c},isValid:function(){return r(this.y,!0)||this.isSum||this.isIntermediateSum}})})(w);(function(a){var n=a.Series,r=a.seriesType,u=a.seriesTypes;r("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=n.prototype.getGraphPath.call(this),e=a.length+1;e--;)(e===a.length||"M"===a[e])&&0<e&&a.splice(e,0,"z");return this.areaPath=a},drawGraph:function(){u.area.prototype.drawGraph.call(this)},
drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:n.prototype.drawTracker,setStackedPoints:a.noop})})(w);(function(a){var n=a.arrayMax,r=a.arrayMin,u=a.Axis,h=a.each,e=a.isNumber,m=a.noop,q=a.pick,c=a.pInt,d=a.Point,g=a.seriesType,k=a.seriesTypes;g("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},
tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["markerGroup","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",directTouch:!0,getRadii:function(b,c,a,d){var f,g,e,k=this.zData,p=[],h=this.options,m="width"!==h.sizeBy,v=h.zThreshold,n=c-b;g=0;for(f=k.length;g<f;g++)e=k[g],h.sizeByAbsoluteValue&&null!==e&&(e=Math.abs(e-v),c=Math.max(c-v,Math.abs(b-v)),b=0),null===e?e=null:
e<b?e=a/2-1:(e=0<n?(e-b)/n:.5,m&&0<=e&&(e=Math.sqrt(e)),e=Math.ceil(a+e*(d-a))/2),p.push(e);this.radii=p},animate:function(b){var c=this.options.animation;b||(h(this.points,function(b){var a=b.graphic,f;a&&a.width&&(f={x:a.x,y:a.y,width:a.width,height:a.height},a.attr({x:b.plotX,y:b.plotY,width:1,height:1}),a.animate(f,c))}),this.animate=null)},translate:function(){var b,c=this.data,d,g,l=this.radii;k.scatter.prototype.translate.call(this);for(b=c.length;b--;)d=c[b],g=l?l[b]:0,e(g)&&g>=this.minPxSize/
2?(d.marker=a.extend(d.marker,{radius:g,width:2*g,height:2*g}),d.dlBox={x:d.plotX-g,y:d.plotY-g,width:2*g,height:2*g}):d.shapeArgs=d.plotY=d.dlBox=void 0},alignDataLabel:k.column.prototype.alignDataLabel,buildKDTree:m,applyZones:m},{haloPath:function(b){return d.prototype.haloPath.call(this,0===b?0:(this.marker?this.marker.radius||0:0)+b)},ttBelow:!1});u.prototype.beforePadding=function(){var b=this,a=this.len,d=this.chart,g=0,k=a,m=this.isXAxis,t=m?"xData":"yData",u=this.min,w={},x=Math.min(d.plotWidth,
d.plotHeight),z=Number.MAX_VALUE,A=-Number.MAX_VALUE,y=this.max-u,B=a/y,D=[];h(this.series,function(a){var f=a.options;!a.bubblePadding||!a.visible&&d.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,D.push(a),m&&(h(["minSize","maxSize"],function(a){var b=f[a],d=/%$/.test(b),b=c(b);w[a]=d?x*b/100:b}),a.minPxSize=w.minSize,a.maxPxSize=Math.max(w.maxSize,w.minSize),a=a.zData,a.length&&(z=q(f.zMin,Math.min(z,Math.max(r(a),!1===f.displayNegative?f.zThreshold:-Number.MAX_VALUE))),A=q(f.zMax,Math.max(A,
n(a))))))});h(D,function(a){var c=a[t],d=c.length,f;m&&a.getRadii(z,A,a.minPxSize,a.maxPxSize);if(0<y)for(;d--;)e(c[d])&&b.dataMin<=c[d]&&c[d]<=b.dataMax&&(f=a.radii[d],g=Math.min((c[d]-u)*B-f,g),k=Math.max((c[d]-u)*B+f,k))});D.length&&0<y&&!this.isLog&&(k-=a,B*=(a+g-k)/a,h([["min","userMin",g],["max","userMax",k]],function(a){void 0===q(b.options[a[0]],b[a[1]])&&(b[a[0]]+=a[2]/B)}))}})(w);(function(a){function n(a,d){var c=this.chart,e=this.options.animation,b=this.group,f=this.markerGroup,h=this.xAxis.center,
m=c.plotLeft,l=c.plotTop;c.polar?c.renderer.isSVG&&(!0===e&&(e={}),d?(a={translateX:h[0]+m,translateY:h[1]+l,scaleX:.001,scaleY:.001},b.attr(a),f&&f.attr(a)):(a={translateX:m,translateY:l,scaleX:1,scaleY:1},b.animate(a,e),f&&f.animate(a,e),this.animate=null)):a.call(this,d)}var r=a.each,u=a.pick,h=a.seriesTypes,e=a.wrap,m=a.Series.prototype,q=a.Pointer.prototype;m.searchPointByAngle=function(a){var c=this.chart,g=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-
g[0]-c.plotLeft,a.chartY-g[1]-c.plotTop)})};m.getConnectors=function(a,d,g,e){var b,c,k,h,l,m,n,q;c=e?1:0;b=0<=d&&d<=a.length-1?d:0>d?a.length-1+d:0;d=0>b-1?a.length-(1+c):b-1;c=b+1>a.length-1?c:b+1;k=a[d];c=a[c];h=k.plotX;k=k.plotY;l=c.plotX;m=c.plotY;c=a[b].plotX;b=a[b].plotY;h=(1.5*c+h)/2.5;k=(1.5*b+k)/2.5;l=(1.5*c+l)/2.5;n=(1.5*b+m)/2.5;m=Math.sqrt(Math.pow(h-c,2)+Math.pow(k-b,2));q=Math.sqrt(Math.pow(l-c,2)+Math.pow(n-b,2));h=Math.atan2(k-b,h-c);n=Math.PI/2+(h+Math.atan2(n-b,l-c))/2;Math.abs(h-
n)>Math.PI/2&&(n-=Math.PI);h=c+Math.cos(n)*m;k=b+Math.sin(n)*m;l=c+Math.cos(Math.PI+n)*q;n=b+Math.sin(Math.PI+n)*q;c={rightContX:l,rightContY:n,leftContX:h,leftContY:k,plotX:c,plotY:b};g&&(c.prevPointCont=this.getConnectors(a,d,!1,e));return c};e(m,"buildKDTree",function(a){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy");a.apply(this)});m.toXY=function(a){var c,g=this.chart,e=a.plotX;c=a.plotY;a.rectPlotX=e;a.rectPlotY=c;c=this.xAxis.postTranslate(a.plotX,
this.yAxis.len-c);a.plotX=a.polarPlotX=c.x-g.plotLeft;a.plotY=a.polarPlotY=c.y-g.plotTop;this.kdByAngle?(g=(e/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>g&&(g+=360),a.clientX=g):a.clientX=a.plotX};h.spline&&(e(h.spline.prototype,"getPointSpline",function(a,d,g,e){this.chart.polar?e?(a=this.getConnectors(d,e,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",g.plotX,g.plotY]:a=a.call(this,d,g,e);return a}),h.areasplinerange&&
(h.areasplinerange.prototype.getPointSpline=h.spline.prototype.getPointSpline));e(m,"translate",function(a){var c=this.chart;a.call(this);if(c.polar&&(this.kdByAngle=c.tooltip&&c.tooltip.shared,!this.preventPostTranslate))for(a=this.points,c=a.length;c--;)this.toXY(a[c])});e(m,"getGraphPath",function(a,d){var c=this,e,b,f;if(this.chart.polar){d=d||this.points;for(e=0;e<d.length;e++)if(!d[e].isNull){b=e;break}!1!==this.options.connectEnds&&void 0!==b&&(this.connectEnds=!0,d.splice(d.length,0,d[b]),
f=!0);r(d,function(a){void 0===a.polarPlotY&&c.toXY(a)})}e=a.apply(this,[].slice.call(arguments,1));f&&d.pop();return e});e(m,"animate",n);h.column&&(h=h.column.prototype,h.polarArc=function(a,d,g,e){var b=this.xAxis.center,c=this.yAxis.len;return this.chart.renderer.symbols.arc(b[0],b[1],c-d,null,{start:g,end:e,innerR:c-u(a,c)})},e(h,"animate",n),e(h,"translate",function(a){var c=this.xAxis,g=c.startAngleRad,e,b,f;this.preventPostTranslate=!0;a.call(this);if(c.isRadial)for(e=this.points,f=e.length;f--;)b=
e[f],a=b.barX+g,b.shapeType="path",b.shapeArgs={d:this.polarArc(b.yBottom,b.plotY,a,a+b.pointWidth)},this.toXY(b),b.tooltipPos=[b.plotX,b.plotY],b.ttBelow=b.plotY>c.center[1]}),e(h,"alignDataLabel",function(a,d,e,k,b,f){this.chart.polar?(a=d.rectPlotX/Math.PI*180,null===k.align&&(k.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===k.verticalAlign&&(k.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),m.alignDataLabel.call(this,d,e,k,b,f)):a.call(this,d,e,k,b,f)}));e(q,"getCoordinates",
function(a,d){var c=this.chart,e={xAxis:[],yAxis:[]};c.polar?r(c.axes,function(a){var b=a.isXAxis,g=a.center,h=d.chartX-g[0]-c.plotLeft,g=d.chartY-g[1]-c.plotTop;e[b?"xAxis":"yAxis"].push({axis:a,value:a.translate(b?Math.PI-Math.atan2(h,g):Math.sqrt(Math.pow(h,2)+Math.pow(g,2)),!0)})}):e=a.call(this,d);return e});e(a.Chart.prototype,"getAxes",function(c){this.pane||(this.pane=[]);r(a.splat(this.options.pane),function(c){new a.Pane(c,this)},this);c.call(this)});e(a.Chart.prototype,"drawChartBox",function(a){a.call(this);
r(this.pane,function(a){a.render()})});e(a.Chart.prototype,"get",function(c,d){return a.find(this.pane,function(a){return a.options.id===d})||c.call(this,d)})})(w)});