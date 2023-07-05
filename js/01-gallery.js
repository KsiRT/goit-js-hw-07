import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const galleryHTML = galleryItems
  .map((el) => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${el.original}">
        <img
          class="gallery__image"
          src="${el.preview}"
          data-source="${el.original}"
          alt="${el.description}"
        />
      </a>
    </li>`;
  })
  .join("");
gallery.insertAdjacentHTML("afterbegin", galleryHTML);

const onImageClick = (event) => {
  event.preventDefault();
  const {
    target: { dataset },
  } = event;
  console.dir(event.target);
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(`
    <img src=${dataset.source} width="800" height="600">
`);
  instance.show();
  const onEscape = (event) => {
    console.dir("zakrili");
    if (event.key === "Escape") {
      instance.close(() => {
        document.removeEventListener("keydown", onEscape);
      });
    }
  };
  document.addEventListener("keydown", onEscape);
};

gallery.addEventListener("click", onImageClick);
