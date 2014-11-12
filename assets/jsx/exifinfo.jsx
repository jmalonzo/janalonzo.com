(function() {
  var ExifDataRow = React.createClass({
    render: function() {
      return (<li className="list-group-item">{this.props.value}</li>)
    }
  });

  var ExifGPSDataRow = React.createClass({
    getInitialState: function() {
      return {src: "https://www.google.com/maps/embed/v1/view?key=AIzaSyCzZ102BOPfbOzusMtNKtUqFAPl79VXYig&maptype=satellite&zoom=15&center="};
    },
    componentDidMount: function() {
      this.setState({src: this.state.src + this.props.value })
    },
    render: function() {
      return (
          <li className="list-group-item embed-responsive embed-responsive-4by3">
            <iframe className="embed-responsive-item" width="540" height="450" style={{border:0}} src={this.state.src}></iframe>
          </li>
      )
    }
  });

  var ExifDataTable = React.createClass({
    getInitialState: function() {
      return {rows: []};
    },
    componentDidMount: function() {
      var rows = []
          that = this, isGPS = false;
          img = document.querySelector("img.caption__media");  // FIXME

      EXIF.getData(img, function() {
        that.props.value.forEach(function(attr, i) {
          var attr = attr.toLowerCase(),
              val = null;

          if (attr == "description") {
            val = EXIF.getTag(img, "ImageDescription");
          } else if (attr == "camera") {
            var make = EXIF.getTag(img, "Make");
            val = "Camera: " + (make ? make + " " : "") + EXIF.getTag(img, "Model");
          } else if (attr == "fnumber") {
            var aperture = EXIF.getTag(img, "FNumber");
            val = aperture ? "Aperture: \u0192/" + aperture.numerator : "Aperture: \u0192/---";
          } else if (attr == "iso") {
            val = "ISO: " + EXIF.getTag(img, "ISOSpeedRatings");
          } else if (attr == "exposure") {
            var exposure = EXIF.getTag(img, "ExposureTime");
            if (exposure.denominator <= exposure.numerator) {
              val = "Exposure: " + exposure.numerator + " second";
            } else {
              val = "Exposure: " + exposure.numerator + "/" + exposure.denominator + " seconds"
            }
          } else if (attr == "focallength") {
            val = "Focal length: " + (EXIF.getTag(img, "FocalLength") ? EXIF.getTag(img, "FocalLength").numerator : "---") + "mm";
          } else if (attr == "gps") {
            isGPS = true;
            var lat = EXIF.getTag(img, "GPSLatitude"),
                lon = EXIF.getTag(img, "GPSLongitude"),
                latRef = EXIF.getTag(img, "GPSLatitudeRef") || "N",
                lonRef = EXIF.getTag(img, "GPSLongitudeRef") || "W";
            lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
            lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
            val = lat + "," + lon;
          }

          if (!isGPS) {
            rows.push(<ExifDataRow key={i} value={val}/>);
          } else {
            rows.push(<ExifGPSDataRow key={i} value={val}/>);
          }
        });
        that.setState({rows: rows});
      });
    },
    render: function() {
        return (
          <ul className="list-group">
            {this.state.rows}            
          </ul>
        )

    }
  });


  // Attributes we're interested in
  var EXIFAttributes = [
    "Description", "Camera", "FNumber", "ISO", "Exposure", "FocalLength", "GPS"
  ];

  $(".btn-exif-info").click(function() {
    React.render(<ExifDataTable value={EXIFAttributes}/>, document.querySelector(".exif-data-table"));
  });
})();
