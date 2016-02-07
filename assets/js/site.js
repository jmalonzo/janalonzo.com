(function(window) {

    [].map.call(document.querySelectorAll(".thumbnail > img"), function(elem) {
        elem.addEventListener("click", function(event) {
            new window.Viewer(event.target, {
                title: false,
                rotatable: false,
                zoomable: true,
                zoomRatio: 1,
                minZoomRatio: 0.5,
                maxZoomRatio: 2,
                toolbar: 4,
                viewed: function () {
                    // All methods are available here except "show".
                    this.viewer.zoomTo(1); //.rotateTo(180);
                }
            });
        }, false);
    });

})(window);