(function() {
  "use strict";
  const preview = document.querySelector("#preview");
  const previewArea = document.querySelector("#preview-area");

  let overlayList = [];

  /** Class for managing overlays on the preview area */
  class PreviewOverlay {
    /**
     * Constructs a new preview overlay
     * @param {*} name 
     * @param {*} settings 
     */
    constructor(name, method, settings = {}) {
      // The name of the overlay
      this.name = name;
  
      // Whether the overlay is currently visible
      this.visible = false;

      // The method to adjust the overlay (should take an SVG element as a single parameter and return an updated svg)
      this.method = method;

      // Default overlay settings
      this.settings = {
        color: "#d8d8d8",
        defaultHeight: 1,
        defaultWidth: 1,
        heightMin: 1,
        heightMax: 20,
        // opacity: 100,
        widthMin: 1,
        widthMax: 100
      };
      this.settings.currentHeight = this.settings.defaultHeight;
      this.settings.currentWidth = this.settings.defaultWidth;

      // Update any non-default settings
      var self = this;
      Object.keys(settings).forEach(function(key) {
        self.settings[key] = settings[key];
      });

      // Create the svg element
      // this.element = this.method(this.settings.width, this.settings.height, this.settings.color);

      // Add the object to the settings overlay
      PreviewOverlay.addToSettingsDialog(this);

      // Add to list of overlays
      overlayList.push(this);
    }

    /**
     * 
     * @param {*} newWidth 
     * @param {*} newHeight 
     * @param {*} newColor 
     */
    draw(newWidth, newHeight, newColor) {
      this.settings.color = newColor;
      this.settings.currentHeight = newHeight;
      this.settings.currentWidth = newWidth;

      // Remove from container if already present
      console.log(this.element);
      if (this.element !== undefined) {
        console.log(this.element.id);
        let child = document.querySelector(`#${this.element.id}`);
        console.log(child);
  
        let parent = child.parentElement;
        parent.removeChild(child); 
      }

      // Add to container
      previewArea.appendChild(this.method(newWidth, newHeight, newColor));
    }

    toggle() {
      let el = document.querySelector(`#${this.element.id}`);
      el.classList.toggle("visible-capture");
    }

    /**
     * Creates the built in grid overlays.
     */
    static initialise() {
      let grid = new PreviewOverlay("Grid overlay", PreviewOverlay.makeGridSVG, {
        defaultHeight: 3,
        defaultWidth: 3
      });
    }

    /**
     * Adds a preview overlay object to the overlay settings dialog
     * @param {*} previewOverlay 
     */
    static addToSettingsDialog(previewOverlay) {
      // Add an item to settings dialog
      

      // Add event listeners



    }

    /**
     * Returns a grid SVG of the specified width, height and color
     * @param {*} width 
     * @param {*} height 
     * @param {*} color 
     */
    static makeGridSVG(width, height, color) {
      let id = "gridOverlay";

      // Get the current aspect ratio of the preview
      let previewAspectWidth = (preview.videoWidth / preview.videoHeight)*100;
      let previewAspectHeight = 1*100;

      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", id);
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("viewBox", `0 0 ${previewAspectWidth} ${previewAspectHeight}`);
      svg.setAttribute("style", "width: 100%; height: 100%; position: absolute; z-index: 10;");

      // Create a rectangle for each width/height unit
      for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
          let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
          rect.setAttribute("x", (previewAspectWidth/width)*w);
          rect.setAttribute("y", (previewAspectHeight/height)*h);
          rect.setAttribute("height", previewAspectHeight/height);
          rect.setAttribute("width", previewAspectWidth/width);
          rect.setAttribute("stroke-width", 1);
          rect.setAttribute("stroke", color);
          rect.setAttribute("stroke-opacity", 1);
          rect.setAttribute("fill", "none");
          svg.appendChild(rect);
        }
      }

      return svg;
    }

    /**
     * Returns an aspect ratio mask SVG of the specified width, height and color
     * @param {*} width 
     * @param {*} height 
     * @param {*} color 
     */
    static makeAspectRatioSVG(id, width, height, color) {
      // make rectangle of required aspect ratio with massive borders
      /*
      <!DOCTYPE html>
<html>
<body>

<svg width="320" height="180" viewBox="0 0 16 9" style="border: 1px solid #000000;">
  <rect x="4" y="2.25" width="8" height="4.5"
  style="fill:blue;stroke-width:1;fill-opacity:0.1;stroke-opacity:0.9" />
</svg>
</body>
</html>
https://stackoverflow.com/questions/3742479/how-to-cut-a-hole-in-an-svg-rectangle
      */
    }
  }

  module.exports = PreviewOverlay;
})();