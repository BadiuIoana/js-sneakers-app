// Menu varibles
const menuitems = document.querySelector(".menu-items");
const togglemenu = document.querySelector(".toggle-menu");

//Sneakers container varibles
const activeImage = document.getElementById("active-image");
const overlayGallery = document.querySelector(".overlay-gallery");

//Gallery overlay varibles
const galleyMainImage = document.getElementById("galley-main-image");
const galleryImagesContainer = document.getElementById("gallery-images");
const imagesList = document.querySelectorAll(".item");

//Gallery controls and close buttons

const galleryClose = document.getElementById("close-btn");
const galleryNext = document.querySelector(".gallery .next");
const galleryPrevious = document.querySelector(".gallery .previous");

let nrImages = 0;

// Cart variables
const lessBtn = document.querySelector(".less");
const moreBtn = document.querySelector(".more");
const cartNr = document.querySelectorAll(".number");
const localStorageCartNr =
    localStorage.getItem("cartItems") === undefined
        ? 0
        : localStorage.getItem("cartItems");

cartNr.forEach((number) => {
    number.innerHTML = localStorageCartNr;
});

nrCartItems = localStorageCartNr;
const addMoreBtn = document.querySelector(".add");

const deleteItemFromCart = document.querySelector(".delete");
const avatarPicture = document.querySelector(".avatar");
const cartPicture = document.querySelector(".cart");
const cartCard = document.querySelector(".cart-card");

//Functions
function toggleMenuForMobile() {
    let visibility = menuitems.getAttribute("data-visible");

    if (visibility === "false") {
        menuitems.setAttribute("data-visible", true);
        togglemenu.setAttribute("area-expanded", true);
    } else {
        menuitems.setAttribute("data-visible", false);
        togglemenu.setAttribute("area-expanded", false);
    }
}

function showGallery() {
    overlayGallery.classList.toggle("show-gallery");
    galleyMainImage.setAttribute("src", activeImage.getAttribute("src"));
    Array.from(imagesList).map((item, index) => {
        galleryImagesContainer.innerHTML +=
            "<img src=" + item.getAttribute("src") + ' class="gallery-item" />';
    });
}

function putActiveClass(allImages, activeEl) {
    document
        .querySelectorAll("." + allImages)
        .forEach((image) => image.classList.remove("active"));
    activeEl.classList.add("active");
}

function setActiveImage(sourceEl, destinationEl, referenceClass) {
    if (sourceEl.classList.contains(referenceClass)) {
        destinationEl.setAttribute("src", sourceEl.src);
        putActiveClass(referenceClass, sourceEl);
        // sourceEl.classList.add('active');
    }
}

//Event literners

togglemenu.addEventListener("click", toggleMenuForMobile);

activeImage.addEventListener("click", showGallery);

window.addEventListener("click", (e) => {
    //Change active image for 'image-section' from 'sneakers-container'
    setActiveImage(e.target, activeImage, "item");

    //Change active image for gallery
    setActiveImage(e.target, galleyMainImage, "gallery-item");
});

//Event listener for close button or outside the gallery
window.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("overlay-gallery") ||
        e.target == galleryClose
    ) {
        overlayGallery.classList.toggle("show-gallery");
        galleryImagesContainer.innerHTML = null;
    }
});

galleryNext.addEventListener("click", () => {
    const galleryImages = document.querySelectorAll(".gallery-item");
    let nrImages = Array.from(galleryImages).findIndex(
        (element) => element.src === galleyMainImage.src
    );

    if (galleryImages.length > nrImages + 1) {
        nrImages++;
        setActiveImage(
            document.querySelectorAll(".gallery-item")[nrImages],
            galleyMainImage,
            "gallery-item"
        );
    }
});

galleryPrevious.addEventListener("click", () => {
    const galleryImages = document.querySelectorAll(".gallery-item");
    let nrImages = Array.from(galleryImages).findIndex(
        (element) => element.src === galleyMainImage.src
    );

    if (0 <= nrImages - 1) {
        nrImages--;
        setActiveImage(
            document.querySelectorAll(".gallery-item")[nrImages],
            galleyMainImage,
            "gallery-item"
        );
    }
});

lessBtn.addEventListener("click", () => {
    if (nrCartItems > 0) {
        nrCartItems--;
        document.querySelector(".items-number .number").innerHTML = nrCartItems;
    }
});

moreBtn.addEventListener("click", () => {
    if (nrCartItems < 10) {
        nrCartItems++;
        document.querySelector(".items-number .number").innerHTML = nrCartItems;
    }
});

addMoreBtn.addEventListener("click", () => {
    if (nrCartItems > 0) {
        localStorage.setItem("cartItems", nrCartItems);
        cartNr.forEach((item) => (item.innerHTML = nrCartItems));
    }
});

deleteItemFromCart.addEventListener("click", () => {
    localStorage.setItem("cartItems", 0);
    cartNr.forEach((item) => (item.innerHTML = 0));
});

avatarPicture.addEventListener("click", () => {
    cartCard.classList.toggle("show");
});

cartPicture.addEventListener("click", () => {
    cartCard.classList.toggle("show");
});
