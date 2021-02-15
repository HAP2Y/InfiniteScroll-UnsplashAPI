const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "1DIml1k7sWqucc8pR7zqxZn0FxPGaxByzNgTqGvz8jM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all new images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}

// Helper Function to setAttributes function on DOM
function helpSetAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display fetched photos using dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // We need a <a></a> tag, this will link onclick function to redirect to that photo's website
    const item = document.createElement("a");
    helpSetAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create Img per photo
    const img = document.createElement("img");
    helpSetAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      target: photo.alt_description,
    });

    // Event Listenerc Check if loading of new images is finished
    img.addEventListener("load", imageLoaded);

    // Put <img> in <a> and then put <a> under div.image-container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Scroll EventListeners
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
