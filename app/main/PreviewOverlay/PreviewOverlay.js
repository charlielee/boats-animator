(function() {
  "use strict";
  const preview = document.querySelector("#preview");
  const previewArea = document.querySelector("#preview-area");
  const overlayListEl = document.querySelector("#overlay-list");

  let overlayList = [];

  /** Class for managing overlays on the preview area */
  class PreviewOverlay {
    /**
     * Constructs a new preview overlay
     * @param {*} name 
     * @param {*} settings 
     */
    constructor(name, id, method, settings = {}) {
      // The name of the overlay
      this.name = name;
      // The id of the generated SVG
      this.id = id;
      // Whether the overlay is currently visible
      this.visible = false;
      // The method to adjust the overlay (should  return an svg element)
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

      // Update any non-default settings
      var self = this;
      Object.keys(settings).forEach(function(key) {
        self.settings[key] = settings[key];
      });

      // Initial height and width is the default
      this.settings.currentHeight = this.settings.defaultHeight;
      this.settings.currentWidth = this.settings.defaultWidth;

      // Add the object to the settings overlay if new
      PreviewOverlay.addToSettingsDialog(this);

      // Add to list of overlays
      overlayList.push(this);
    }

    /**
     * Draws an overlay for the current resolution of the preview area.
     * @param {*} newWidth The width of the overlay.
     * @param {*} newHeight The height of the overlay.
     * @param {*} newColor The color of the overlay.
     */
    draw(newWidth = this.settings.currentWidth,
      newHeight =  this.settings.currentHeight,
      newColor = this.settings.color) {
      this.settings.color = newColor;
      this.settings.currentHeight = newHeight;
      this.settings.currentWidth = newWidth;

      // Remove overlay SVG from container if already present
      if (document.querySelector(`#${this.id}`)) {
        let child = document.querySelector(`#${this.id}`);
        previewArea.removeChild(child);
        console.log(`Removed #${this.id}`);
      }

      // Make a new overlay SVG
      this.element = this.method(this.id, newWidth, newHeight, newColor);

      // Set visibility of the overlay from previous visibility status
      this.element.classList.toggle("visible-capture", this.visible);

      // Add to container
      previewArea.appendChild(this.element);
    }

    /**
     * Toggles the visibility of the overlay.
     */
    toggle() {
      let el = document.querySelector(`#${this.id}`);
      if (el) {
        el.classList.toggle("visible-capture");
        this.visible = el.classList.contains("visible-capture");
      }
    }

    /**
     * Creates the built in grid overlays.
     */
    static initialise() {
      // Grid
      new PreviewOverlay("Grid overlay", "gridOverlay", PreviewOverlay.makeGridSVG, {
        defaultHeight: 3,
        defaultWidth: 3
      });

      // // Aspect ratio
      // new PreviewOverlay("Grid overlay", "gridOverlay", PreviewOverlay.makeAspectRatioSVG, {
      //   defaultHeight: 1,
      //   defaultWidth: 2.39
      // });
    }

    /**
     * Redraws all of the created overlays
     */
    static drawAll() {
      console.log("Draw all activated");
      overlayList.forEach(function(overlay) {
        overlay.draw();
      });
    }

    /**
     * Adds a preview overlay object to the overlay settings dialog
     * @param {*} previewOverlay 
     */
    static addToSettingsDialog(previewOverlay) {
      console.log(previewOverlay);
      // Add an item to settings dialog
      let overlayListItem = document.createElement("li");

      overlayListItem.innerHTML = `
        <span>${previewOverlay.name}</span>
        <button class="grid-overlay-toggle-button" data-id="${previewOverlay.id}">Toggle</button>
      `;
      overlayListEl.appendChild(overlayListItem);

      // Add event listeners
      document.querySelector(`.grid-overlay-toggle-button[data-id='${previewOverlay.id}']`).addEventListener("click", function() {
        previewOverlay.toggle();
      });
    }

    /**
     * Returns a grid SVG of the specified width, height and color
     * @param {*} width The 
     * @param {*} height 
     * @param {*} color 
     */
    static makeGridSVG(id, width, height, color) {
      // Get the current aspect ratio of the preview
      let previewAspectWidth = (preview.videoWidth / preview.videoHeight)*100;
      let previewAspectHeight = 1*100;

      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", id);
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("style", "width: 100%; height: 100%; position: absolute; z-index: 10;");

      // Only create the contents of the svg if a valid aspect ratio
      if (!isNaN(previewAspectHeight) && !isNaN(previewAspectWidth)) {
        svg.setAttribute("viewBox", `0 0 ${previewAspectWidth} ${previewAspectHeight}`);

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