(function() {

  // FIXME separate CSS then remove this hack
  var ivs = document.querySelector(".image-view-single img");
  if (!ivs) return;
  ivs.classList.remove("caption__media");

})();
