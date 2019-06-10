(function() {
  "use strict";
  /** Class for managing overlays on the preview area */
  class PreviewOverlay {
    /**
     * Constructs a new preview overlay
     * @param {*} name 
     * @param {*} settings 
     */
    constructor(name, method, settings) {
      // The name of the overlay
      this.name = name;
  
      // Whether the overlay is currently visible
      this.visible = false;

      // The method to adjust the overlay (should take an SVG element as a single parameter and return an updated svg)
      this.method = method;

      // Default overlay settings
      this.settings = {
        color: "#d8d8d8",
        currentHeight: 1,
        currentWidth: 1,
        defaultHeight: 1,
        defaultWidth: 1,
        heightMin: 1,
        heightMax: 20,
        // opacity: 100,
        widthMin: 1,
        widthMax: 100
      };

      // Update any non-default settings
      Object.keys(settings).forEach(function(key) {
        this.settings[key] = settings[key];
      });

      // Add the object to the settings overlay
      PreviewOverlay.addToSettingsDialog(this);
    }

    setColor(newColor) {
      this.settings.color = newColor;
      this.method(this.settings.currentWidth, this.settings.currentHeight, newColor);
    }

    setHeight(newHeight) {
      this.settings.currentHeight = newHeight;
      this.method(this.settings.currentWidth, newHeight, this.settings.color);
    }

    setWidth(newWidth) {
      this.settings.currentWidth = newWidth;
      this.method(newWidth, this.settings.currentHeight, this.settings.color);
    }





    /**
     * Adds a preview overlay object to the overlay settings dialog
     * @param {*} previewOverlay 
     */
    static addToSettingsDialog(previewOverlay) {

    }

    /**
     * Returns a grid SVG of the specified width, height and color
     * @param {*} width 
     * @param {*} height 
     * @param {*} color 
     */
    static makeGridSVG(width, height, color) {
      // Get the current aspect ratio of the preview
      let svgHeader = `<svg viewBox="0 0 ${previewWidth} ${previewHeight}" style="border: 1px solid #000000;">`;
      let svgContents = "";
      let svgFooter = "</svg>";

      // Create a rectangle for each width/height unit
      for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
          svgContents += `
           <rect x="${(width/w)}" y="2.25" width="8" height="4.5"
          style="fill:blue;stroke-width:1;fill-opacity:0.1;stroke-opacity:0.9" />
          `
        }
      }

      return svgHeader + svgContents + svgFooter;
    }

    /**
     * Returns an aspect ratio mask SVG of the specified width, height and color
     * @param {*} width 
     * @param {*} height 
     * @param {*} color 
     */
    static makeAspectRatioSVG(width, height, color) {
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