(function() {
  "use strict";
  const ToggleButton = require("../../ui/ToggleButton/ToggleButton");

  const preview = document.querySelector("#preview");
  const previewArea = document.querySelector("#preview-area");
  const overlayListEl = document.querySelector("#overlay-list");

  let overlayList = {};

  /** Class for managing overlays on the preview area */
  class PreviewOverlay {
    /**
     * Constructs a new preview overlay
     * @param {*} name 
     * @param {*} settings 
     */
    constructor(name, id, method, options, settings = {}) {
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
        color: "#ad0000",
        defaultHeight: 1,
        defaultWidth: 1,
        heightMin: 1,
        heightMax: 20,
        visibleModeClasses: ["visible-capture"],
        // opacity: 100,
        widthMin: 1,
        widthMax: 20
      };

      // Update any non-default settings
      var self = this;
      Object.keys(settings).forEach(function(key) {
        self.settings[key] = settings[key];
      });

      // Initial height and width is the default
      this.settings.currentHeight = this.settings.defaultHeight;
      this.settings.currentWidth = this.settings.defaultWidth;

      // List of options
      this.options = options;

      // Add the object to the settings overlay if new
      PreviewOverlay.addToSettingsDialog(this);

      // Add to list of overlays
      overlayList[this.id] = this;

      PreviewOverlay.drawAll();
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
      }

      // Make a new overlay SVG
      this.element = this.method(this.id, newWidth, newHeight, newColor);

      // Set visibility of the overlay from previous visibility status
      var self = this;
      this.settings.visibleModeClasses.forEach(function(modeClass) {
        self.element.classList.toggle(modeClass, self.visible);
      });

      // Add to container
      previewArea.appendChild(this.element);
    }

    /**
     * Toggles the visibility of the overlay.
     */
    toggle() {
      let el = document.querySelector(`#${this.id}`);
      if (el) {
        // Toggle each mode class for overlay
        this.settings.visibleModeClasses.forEach(function(modeClass) {
          el.classList.toggle(modeClass);
        });

        // Update overlay visibility status
        this.visible = el.classList.contains(this.settings.visibleModeClasses[0]);

        // Redraw all overlays on toggle
        PreviewOverlay.drawAll();
      }
    }

    /**
     * Creates the built in grid overlays.
     */
    static initialise() {
      // Grid
      new PreviewOverlay(
        "Grid",
        "gridOverlay",
        PreviewOverlay.makeGridSVG,
        [[3,3], [2,2], [3,2], [4,4], [4,3]],
        {
          defaultHeight: 3,
          defaultWidth: 3
        }
      );

      // Aspect ratio
      new PreviewOverlay(
        "Aspect ratio",
        "aspectRatioMask",
        PreviewOverlay.makeAspectRatioSVG,
        [[16,9], [4,3], [2.39,1], [2.35,1], [1,1]],
        {
          color: "#2B2B2B",
          defaultHeight: 9,
          defaultWidth: 16,
          visibleModeClasses: ["visible-capture", "visible-playback"]
        }
      );
    }

    /**
     * Redraws all of the created overlays
     */
    static drawAll() {
      Object.keys(overlayList).forEach(function(key) {
        overlayList[key].draw();
      });
    }

    /**
     * Adds a preview overlay object to the overlay settings dialog
     * @param {PreviewOverlay} previewOverlay The preview overlay object to be added.
     */
    static addToSettingsDialog(prev) {
      // Add an item to settings dialog
      let overlayListItem = document.createElement("li");
      overlayListEl.appendChild(overlayListItem);

      // Item title
      let itemTitle = document.createElement("h3");
      itemTitle.innerText = `${prev.name} `;
      overlayListItem.appendChild(itemTitle);

      // Item toggle button
      let itemToggleBtn = document.createElement("div");
      itemToggleBtn.id = `${prev.id}Btn`;
      itemToggleBtn.setAttribute("data-id", prev.id);
      itemToggleBtn.setAttribute("style", "float: right");
      itemToggleBtn.classList.add("grid-overlay-toggle-btn");
      new ToggleButton(itemToggleBtn, function() {
        prev.toggle();
      });
      itemTitle.appendChild(itemToggleBtn);

      // Item options list
      let optionsSelect = document.createElement("select");
      overlayListItem.appendChild(optionsSelect);
      prev.options.forEach(function(item, index) {
        let option = document.createElement("option");
        option.setAttribute("value", index);
        option.innerText = `${item[0]}:${item[1]}`;
        optionsSelect.appendChild(option);
      });

      // Listen to options being selected
      optionsSelect.addEventListener("change", function() {
        let val = optionsSelect.options[optionsSelect.selectedIndex].value;
        prev.draw(prev.options[val][0], prev.options[val][1]);
        PreviewOverlay.drawAll();
      });
    }

    /**
     * Returns a grid SVG of the specified width, height and color
     * for the current aspect ratio of the preview area.
     * @param {*} id 
     * @param {*} width 
     * @param {*} height 
     * @param {*} color 
     */
    static makeGridSVG(id, width, height, color) {
      // Get the current aspect ratio of the preview
      let previewAspectWidth = (preview.videoWidth / preview.videoHeight)*100;
      let previewAspectHeight = 1*100;

      // If aspect ratio mask is visible then use that aspect ratio on the grid
      let maskAspectWidth = previewAspectWidth;
      let maskAspectHeight = previewAspectHeight;
      if (overlayList["aspectRatioMask"] && overlayList["aspectRatioMask"].visible) {
        let aspectSettings = overlayList["aspectRatioMask"].settings;
        maskAspectWidth = aspectSettings.currentWidth;
        maskAspectHeight = aspectSettings.currentHeight;

        // Normalise the mask aspect ratio to fit the preview aspect ratio
        let scaleFactor = (maskAspectWidth > maskAspectHeight ? previewAspectWidth/maskAspectWidth : previewAspectHeight/maskAspectHeight);
        maskAspectWidth *= scaleFactor;
        maskAspectHeight *= scaleFactor;
      }

      // Create the SVG container
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", id);
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("style", "z-index: 10;");
      svg.classList.add("preview-area-item");

      // Only create the contents of the svg if a valid aspect ratio
      if (!isNaN(previewAspectHeight) && !isNaN(previewAspectWidth)) {
        svg.setAttribute("viewBox", `0 0 ${previewAspectWidth} ${previewAspectHeight}`);

        // Make a second svg container the size of the aspect ratio of the mask
        let innerSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        innerSVG.setAttribute("viewBox", `0 0 ${maskAspectWidth} ${maskAspectHeight}`);
        innerSVG.setAttribute("x", (previewAspectWidth-maskAspectWidth)/2);
        innerSVG.setAttribute("y", (previewAspectHeight-maskAspectHeight)/2);
        innerSVG.setAttribute("width", maskAspectWidth);
        innerSVG.setAttribute("height", maskAspectHeight);
        svg.appendChild(innerSVG);

        // Create a rectangle for each width/height unit
        for (let w = 0; w < width; w++) {
          for (let h = 0; h < height; h++) {
            let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
            rect.setAttribute("x", (maskAspectWidth/width)*w);
            rect.setAttribute("y", (maskAspectHeight/height)*h);
            rect.setAttribute("width", maskAspectWidth/width);
            rect.setAttribute("height", maskAspectHeight/height);
            rect.setAttribute("stroke-width", 0.5);
            rect.setAttribute("stroke", color);
            rect.setAttribute("stroke-opacity", 1);
            rect.setAttribute("fill", "none");
            innerSVG.appendChild(rect);
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
      // Get the current aspect ratio of the preview
      let previewAspectWidth = (preview.videoWidth / preview.videoHeight)*100;
      let previewAspectHeight = 1*100;

      // Create the SVG container
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", id);
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("style", "z-index: 10;");
      svg.classList.add("preview-area-item");

      // Only create the contents of the svg if a valid aspect ratio
      if (!isNaN(previewAspectHeight) && !isNaN(previewAspectWidth)) {
        svg.setAttribute("viewBox", `0 0 ${previewAspectWidth} ${previewAspectHeight}`);

        // Calculate size of the cropped area
        let croppedHeight = (height > width ? previewAspectHeight : (height/width)*previewAspectWidth);
        let croppedWidth = (width > height ? previewAspectWidth : (width/height)*previewAspectHeight);

        // If width > height make top and bottom letterboxes
        if (width > height) {
          let letterBoxHeight = (previewAspectHeight - croppedHeight)/2;

          let topRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
          topRect.setAttribute("x", 0);
          topRect.setAttribute("y", 0);
          topRect.setAttribute("height", letterBoxHeight);
          topRect.setAttribute("width", previewAspectWidth);
          topRect.setAttribute("fill", color);
          svg.appendChild(topRect);

          let bottomRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
          bottomRect.setAttribute("x", 0);
          bottomRect.setAttribute("y", previewAspectHeight - letterBoxHeight);
          bottomRect.setAttribute("height", letterBoxHeight);
          bottomRect.setAttribute("width", previewAspectWidth);
          bottomRect.setAttribute("fill", color);
          svg.appendChild(bottomRect);

        // Make left and right letterboxes if height > width
        } else {
          let letterBoxWidth = (previewAspectWidth - croppedWidth)/2;

          let leftRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
          leftRect.setAttribute("x", 0);
          leftRect.setAttribute("y", 0);
          leftRect.setAttribute("height", previewAspectHeight);
          leftRect.setAttribute("width", letterBoxWidth);
          leftRect.setAttribute("fill", color);
          svg.appendChild(leftRect);

          let rightRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
          rightRect.setAttribute("x", previewAspectWidth - letterBoxWidth);
          rightRect.setAttribute("y", 0);
          rightRect.setAttribute("height", previewAspectHeight);
          rightRect.setAttribute("width", letterBoxWidth);
          rightRect.setAttribute("fill", color);
          svg.appendChild(rightRect);
        }
      }

      return svg;
    }
  }

  module.exports = PreviewOverlay;
})();