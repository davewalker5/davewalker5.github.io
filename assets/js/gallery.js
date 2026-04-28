document.addEventListener("DOMContentLoaded", function () {
  const galleries = document.querySelectorAll(".js-inline-gallery");

  galleries.forEach(function (gallery) {
    const imageEl = gallery.querySelector(".inline-gallery__image");
    const captionEl = gallery.querySelector(".inline-gallery__caption");
    const prevBtn = gallery.querySelector(".inline-gallery__nav--prev");
    const nextBtn = gallery.querySelector(".inline-gallery__nav--next");
    const thumbs = Array.from(gallery.querySelectorAll(".inline-gallery__thumb"));

    let currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + thumbs.length) % thumbs.length;

      const thumb = thumbs[currentIndex];
      const src = thumb.dataset.src;
      const alt = thumb.dataset.alt || "";
      const caption = thumb.dataset.caption || "";

      imageEl.src = src;
      imageEl.alt = alt;
      captionEl.textContent = caption;

      thumbs.forEach(function (item) {
        item.classList.remove("is-active");
      });
      thumb.classList.add("is-active");
    }

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener("click", function () {
        showImage(index);
      });
    });

    prevBtn.addEventListener("click", function () {
      showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", function () {
      showImage(currentIndex + 1);
    });

    gallery.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
      if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });

    showImage(0);
  });
});