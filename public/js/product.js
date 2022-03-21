// handle image slide dynamically..
const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");
let activeImageSlide = 0;

productImages.forEach((item, i) => {
  item.addEventListener("click", () => {
    productImages[activeImageSlide].classList.remove("active");
    item.classList.add("active");
    productImageSlide.style.backgroundImage = `url('${item.src}')`;
    activeImageSlide = i;
  });
});

// handle selecting product size dynamically..
const sizesBtn = document.querySelectorAll(".size-radio-btn");
let selectedBtn = 0;

sizesBtn.forEach((item, i) => {
  item.addEventListener("click", () => {
    sizesBtn[selectedBtn].classList.remove("check");
    item.classList.add("check");
    selectedBtn = i;
  });
});
