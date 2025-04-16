$(() => {
  $(".results-slide-row").each((switcher_index, switcher) => {
    const $switcher = $(switcher);
    $switcher.children().each((switcher_child_index, child) => {
      const $child = $(child);
      const $input = $("<button>", {
        class: "thumbnail-btn",
        id: $child.data("id")
      });
      // const $img = $("<img>", {
      //   class: "thumbnails",
      //   alt: $child.data("label") || "thumbnail",
      //   src: $child.data("img-src")
      // });
      // $input.append($img);
      const $label = $("<label>", {
        text: $child.data("label"),
        class: "thumbnail_label"
      });
      $input.append($label);
      $switcher.append($input);
    });
  });
});

// Array of iframe IDs (must match the HTML)
const iframeIds = [
  'allen', 'esp', 'expo', 'flashlight_bad_geo',
  'flashlight_good', 'flashlight_good2', 'garden_stake', 'icecream',
  'l_bracket', 'logitech_good', 'logitech2', 'postcard', 'pressure_sensor',
  'realsense_good', 'realsense2', 'sperry', 'tube_strap', 'wine_opener',
  'remote_left', 'remote_right', 'remote_merge', 't_connector_bad_vis',
  't_connector_good', 't_connector_good2', 'wireplug_bad_geo',
  'wireplug_good', 'wireplug_good2'
];

let currentThumbnail = 0;
let thumbnailFromIndex = {};
let thumbnailCount = 0;

// Function to show the selected iframe and hide others
function showIframe(iframeId) {
  iframeIds.forEach(id => {
    const iframe = document.getElementById(id);
    if (iframe) {
      if (id === iframeId) {
        iframe.classList.add('show');
        // Set the iframe's src from the data-src if not already set
        if (!iframe.src) {
          iframe.src = $(iframe).data('src');
        }
      } else {
        iframe.classList.remove('show');
        // Optionally: clear the src if you want to pause hidden iframes
        // iframe.src = "";
      }
    }
  });
}

// Set up thumbnail click events
function setupThumbnailClickEvents() {
  $('.thumbnail-btn').each((index, thumbnail) => {
    thumbnailCount += 1;
    thumbnailFromIndex[index] = thumbnail;
    $(thumbnail).click(function() {
      const buttonId = $(this).attr('id');
      if (!buttonId) return;
      // Remove the trailing '-thumb' to get the iframe ID
      const iframeId = buttonId.replace('-thumb', '');
      currentThumbnail = index;
      $('.thumbnail-btn').css('opacity', '');
      $(this).css('opacity', '1.0');
      showIframe(iframeId);

      // Scroll the thumbnail into view within the carousel container
      const sliderWindow = document.getElementById('results-objs-scroll');
      sliderWindow.scrollLeft = this.offsetLeft - sliderWindow.offsetWidth / 2;
    });
  });

  // Activate the first thumbnail by default
  if (thumbnailCount > 0) {
    $(thumbnailFromIndex[0]).click();
  }
}

// Arrow click functions for carousel navigation
function results_slide_left() {
  const newIndex = ((currentThumbnail - 1 + thumbnailCount) % thumbnailCount);
  const newThumbnail = thumbnailFromIndex[newIndex];
  $(newThumbnail).click();
}
function results_slide_right() {
  const newIndex = (currentThumbnail + 1) % thumbnailCount;
  const newThumbnail = thumbnailFromIndex[newIndex];
  $(newThumbnail).click();
}

// Initialize the page when the DOM is fully loaded
function initializePage() {
  setupThumbnailClickEvents();
  // Optional: show the first iframe if no thumbnail click happens
  if (iframeIds.length > 0) {
    showIframe(iframeIds[0]);
  }
}
document.addEventListener('DOMContentLoaded', initializePage);
