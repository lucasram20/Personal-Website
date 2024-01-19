function setupCoverflow(coverflowContainer) {
    var coverflowContainers;
  
    if (typeof coverflowContainer !== "undefined") {
      if (Array.isArray(coverflowContainer)) {
        coverflowContainers = coverflowContainer;
      } else {
        coverflowContainers = [coverflowContainer];
      }
    } else {
      coverflowContainers = Array.prototype.slice.apply(document.getElementsByClassName('coverflow'));
    }
  
    coverflowContainers.forEach(function(containerElement) {
      var coverflow = {};
      var nextArrows;
  
      // Capture coverflow elements
      coverflow.container = containerElement;
      coverflow.images = Array.prototype.slice.apply(containerElement.getElementsByClassName('coverflow__image'));
      coverflow.position = Math.floor(coverflow.images.length / 2) + 1;
  
      // Set indices on images
      coverflow.images.forEach(function(coverflowImage, i) {
        coverflowImage.dataset.coverflowIndex = i + 1;
      });
  
      // Set initial position
      coverflow.container.dataset.coverflowPosition = coverflow.position;
  
      // Get next arrows
      nextArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("next-arrow"));
  
      // Add event handlers
      function setNextImage() {
        coverflow.position = (coverflow.position % coverflow.images.length) + 1;
        coverflow.container.dataset.coverflowPosition = coverflow.position;
        // Call the function Chase added
        forScale(coverflow.position);
      }
  
      function jumpToImage(evt) {
        if (!evt.target.classList.contains('coverflow__image')) {
          return; // Skip if the clicked element is not an image
        }
  
        coverflow.position = Math.min(coverflow.images.length, Math.max(1, evt.target.dataset.coverflowIndex));
        coverflow.container.dataset.coverflowPosition = coverflow.position;
        // Start added by Chase
        setTimeout(function() {
          forScale(coverflow.position);
        }, 1);
        // End added by Chase
      }
  
      function onKeyPress(evt) {
        switch (evt.which) {
          case 39: // Right arrow
            setNextImage();
            break;
        }
      }
  
      // Remove click event listeners for all images except the next arrow button
      coverflow.images.forEach(function(image) {
        if (!image.classList.contains('next-arrow')) {
          image.removeEventListener('click', jumpToImage);
        }
      });
  
      // Add click event listener for the next arrow button
      nextArrows.forEach(function(nextArrow) {
        nextArrow.addEventListener('click', setNextImage);
      });
  
      // Automatically advance to the next image every 3 seconds
      setInterval(setNextImage, 2000);
  
      window.addEventListener('keyup', onKeyPress);
    });
  }
  
  setupCoverflow();
  