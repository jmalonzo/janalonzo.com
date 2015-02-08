(function() {
  // https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
  var cb = function() {
    var styles = [
      "//fonts.googleapis.com/css?family=Roboto+Slab",
      "//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,600,700,300,800&subset=latin,latin-ext",
      "//www.janalonzo.com/css/font-awesome.min.css"
    ]
    var h = document.getElementsByTagName('head')[0];
    for (var i=0;i<styles.length;i++) {
      var l = document.createElement('link'); l.rel = 'stylesheet';
      l.href = styles[i];
      h.appendChild(l);
    }
  };

  var raf = requestAnimationFrame || mozRequestAnimationFrame ||
      webkitRequestAnimationFrame || msRequestAnimationFrame;
  if (raf) raf(cb);
  else window.addEventListener('load', cb);
})();
