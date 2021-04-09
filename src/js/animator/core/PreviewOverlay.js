(function() {
  "use strict";
  // HTML elements
  const preview = document.querySelector("#preview");
  const previewArea = document.querySelector("#preview-area");
  const overlayListEl = document.querySelector("#overlay-list");

  // List of generated overlays
  let overlayList = {};

  /** Class for managing overlays on the preview area */
  class PreviewOverlay {
    /**
     * Constructs a new preview overlay.
     * @param {String} name The name of the overlay to display next to the sidebar toggle.
     * @param {String} id The id to give the generated SVG.
     * @param {Function} method The function to run in order to draw the overlay.
     * @param {Array} options An array of [width, height] pairs that can be chosen between.
     * @param {Object} settings The settings object for the preview overlay.
     */
    constructor(name, id, method, options, settings = {}) {
      this.name = name;
      this.id = id;
      this.method = method;
      this.options = options;

      // Whether the overlay is currently visible
      this.visible = false;

      // Default overlay settings
      this.settings = {
        color: "var(--ba-dark-mid)",
        defaultHeight: 1,
        defaultWidth: 1,
        heightMin: 1,
        heightMax: 20,
        visibleModeClasses: ["visible-capture"],
        opacity: 0.75,
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

      // Add the overlay's options to the sidebar
      this.addToSettingsDialog();

      // Add to list of overlays
      overlayList[this.id] = this;

      // Redraw all of the existing overlays
      PreviewOverlay.drawAll();
    }

    /**
     * Draws an overlay for the current resolution of the preview area.
     * @param {String} newWidth The width of the overlay.
     * @param {String} newHeight The height of the overlay.
     * @param {String} newColor The color of the overlay (should be a valid html color).
     */
    draw(newWidth = this.settings.currentWidth,
      newHeight =  this.settings.currentHeight,
      newColor = this.settings.color) {
      // Update the settings
      this.settings.color = newColor;
      this.settings.currentHeight = newHeight;
      this.settings.currentWidth = newWidth;

      // Remove overlay SVG from container if already present
      if (document.querySelector(`#${this.id}`)) {
        let child = document.querySelector(`#${this.id}`);
        previewArea.removeChild(child);
      }

      // Make a new overlay SVG
      this.element = this.method(this.id, newWidth, newHeight, newColor, this.settings.opacity);

      // Set visibility of the overlay from previous visibility status
      var self = this;
      this.settings.visibleModeClasses.forEach(function(modeClass) {
        self.element.classList.toggle(modeClass, self.visible);
      });

      // Add to container
      previewArea.appendChild(this.element);

      // Hide element if not streaming
      this.element.classList.toggle("hidden", !global.projectInst.streaming);
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
     * Adds a preview overlay object to the overlay settings dialog.
     */
    addToSettingsDialog() {
      var self = this;
      // Add a list item to settings dialog
      let overlayListItem = document.createElement("li");
      overlayListEl.appendChild(overlayListItem);

      // Item settings container
      let itemSettingsContainer = document.createElement("div");
      let optionsSelect = document.createElement("select"); // Options list
      let opacitySliderContainer = document.createElement("div");
      let opacitySlider = document.createElement("input"); // Opacity slider

      // General overlay switch:
      // <div class="switch-container">
      //   <label for="example">Example</label>
      //   <input type="checkbox" id="example" class="switch-btn">
      // </div>

      let switchContainer = document.createElement("div");
      switchContainer.classList.add("switch-container");
      overlayListItem.appendChild(switchContainer);

      let switchLabel = document.createElement("label");
      switchLabel.setAttribute("for", `${self.id}-switch`);
      switchLabel.innerText = self.name;
      switchContainer.appendChild(switchLabel);

      let switchCheckbox = document.createElement("input");
      switchCheckbox.classList.add("switch-btn");
      switchCheckbox.setAttribute("type", "checkbox");
      switchCheckbox.setAttribute("id", `${self.id}-switch`);
      switchContainer.appendChild(switchCheckbox);

      switchCheckbox.addEventListener("change", function (e) {
        // Toggle display of the overlay
        let status = self.toggle();
        // Toggle display of the options
        itemSettingsContainer.classList.toggle("hidden", status);
      });

      // Item settings container (default hidden on load)
      overlayListItem.appendChild(itemSettingsContainer);
      itemSettingsContainer.classList.add("flex", "hidden");

      // Create item options list
      itemSettingsContainer.appendChild(optionsSelect);
      self.options.forEach(function(item, index) {
        let option = document.createElement("option");
        option.setAttribute("value", index);
        option.innerText = `${item[0]}:${item[1]}`;
        optionsSelect.appendChild(option);
      });

      // Listen to options being selected
      optionsSelect.addEventListener("change", function() {
        let val = optionsSelect.options[optionsSelect.selectedIndex].value;
        // Redraw the overlay with the new value
        self.draw(self.options[val][0], self.options[val][1]);
        PreviewOverlay.drawAll();
      });

      // Create opacity slider
      opacitySliderContainer.classList.add("range-container");
      opacitySlider.style.margin = "0 0 0 0.5em";
      opacitySlider.setAttribute("type", "range");
      opacitySlider.setAttribute("min", "0");
      opacitySlider.setAttribute("max", "1");
      opacitySlider.setAttribute("step", "0.02");
      opacitySlider.setAttribute("value", self.settings.opacity);

      itemSettingsContainer.appendChild(opacitySliderContainer);
      opacitySliderContainer.appendChild(opacitySlider);

      // Listen to the slider being updated
      opacitySlider.addEventListener("input", function(e) {
        self.settings.opacity = e.target.value;
        self.draw();
      });
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
          color: "var(--ba-white)",
          defaultWidth: 3,
          defaultHeight: 3
        }
      );

      // Aspect ratio
      new PreviewOverlay(
        "Aspect Ratio",
        "aspectRatioMask",
        PreviewOverlay.makeAspectRatioSVG,
        [[2.39,1], [2.35,1], [16,9], [4,3], [3,2], [1,1], [9, 16]],
        {
          defaultWidth: 2.39,
          defaultHeight: 1,
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
     * Returns a grid SVG of the specified width, height and color
     * for the current aspect ratio of the preview area.
     * @param {String} id The id to give the generated SVG.
     * @param {Number} width The number of horizontal units of the grid.
     * @param {Number} height The number of vertical units of the grid.
     * @param {String} color The html color string to make the grid lines.
     * @param {Number} opacity The opacity of the grid lines.
     * @returns {SVGAElement} The generated SVG element.
     */
    static makeGridSVG(id, width, height, color, opacity) {
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

        // Handle cropped width being larger than preview area
        if (maskAspectHeight > previewAspectHeight) {
          maskAspectWidth = previewAspectHeight/maskAspectHeight * maskAspectWidth;
          maskAspectHeight = previewAspectHeight/maskAspectHeight * maskAspectHeight;
        }
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

        /** Vertical lines */
        for (let w = 1; w < width; w++) {
          let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", (maskAspectWidth/width)*w);
          line.setAttribute("y1", 0);
          line.setAttribute("x2", (maskAspectWidth/width)*w);
          line.setAttribute("y2", maskAspectHeight);
          line.setAttribute("stroke-width", 0.25);
          line.setAttribute("stroke", color);
          line.setAttribute("stroke-opacity", opacity);
          innerSVG.appendChild(line);
        }

        /** Horizontal lines */
        for (let h = 1; h < height; h++) {
          let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", 0);
          line.setAttribute("y1", (maskAspectHeight/height)*h);
          line.setAttribute("x2", maskAspectWidth);
          line.setAttribute("y2", (maskAspectHeight/height)*h);
          line.setAttribute("stroke-width", 0.25);
          line.setAttribute("stroke", color);
          line.setAttribute("stroke-opacity", opacity);
          innerSVG.appendChild(line);
        }
      }

      return svg;
    }

    /**
     * Returns an aspect ratio mask SVG of the specified width, height and color.
     * @param {String} id The id to give the generated SVG.
     * @param {Number} width The horizontal length of the aspect ratio.
     * @param {Number} height The vertical length of the aspect ratio.
     * @param {String} color The html color string to make the letterboxes.
     * @param {Number} opacity The opacity of the letterboxes.
     * @returns {SVGAElement} The generated SVG element.
     */
    static makeAspectRatioSVG(id, width, height, color, opacity) {
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
        let croppedWidth = (width >= height ? previewAspectWidth : (width/height)*previewAspectHeight);

        // Handle cropped width being larger than preview area
        if (croppedHeight > previewAspectHeight) {
          croppedWidth = previewAspectHeight/croppedHeight * croppedWidth;
          croppedHeight = previewAspectHeight/croppedHeight * croppedHeight;
        }

        // Calculate the size of the letterboxes
        let letterBoxWidth = (previewAspectWidth - croppedWidth)/2;
        let letterBoxHeight = (previewAspectHeight - croppedHeight)/2;

        let topRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        topRect.setAttribute("x", 0);
        topRect.setAttribute("y", 0);
        topRect.setAttribute("height", letterBoxHeight);
        topRect.setAttribute("width", previewAspectWidth);
        topRect.setAttribute("fill", color);
        topRect.setAttribute("fill-opacity", opacity);
        svg.appendChild(topRect);

        let bottomRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bottomRect.setAttribute("x", 0);
        bottomRect.setAttribute("y", previewAspectHeight - letterBoxHeight);
        bottomRect.setAttribute("height", letterBoxHeight);
        bottomRect.setAttribute("width", previewAspectWidth);
        bottomRect.setAttribute("fill", color);
        bottomRect.setAttribute("fill-opacity", opacity);
        svg.appendChild(bottomRect);

        let leftRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        leftRect.setAttribute("x", 0);
        leftRect.setAttribute("y", 0);
        leftRect.setAttribute("height", previewAspectHeight);
        leftRect.setAttribute("width", letterBoxWidth);
        leftRect.setAttribute("fill", color);
        leftRect.setAttribute("fill-opacity", opacity);
        svg.appendChild(leftRect);

        let rightRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rightRect.setAttribute("x", previewAspectWidth - letterBoxWidth);
        rightRect.setAttribute("y", 0);
        rightRect.setAttribute("height", previewAspectHeight);
        rightRect.setAttribute("width", letterBoxWidth);
        rightRect.setAttribute("fill", color);
        rightRect.setAttribute("fill-opacity", opacity);
        svg.appendChild(rightRect);
      }

      return svg;
    }
  }

  module.exports = PreviewOverlay;
})();