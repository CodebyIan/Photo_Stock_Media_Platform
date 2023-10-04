/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { ripple } from "../../js/utils/ripple.js";
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";

/*** Add Ripple Effect ***/
const $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach(($rippleElem) => ripple($rippleElem));

/*** Page Transition ***/
window.addEventListener("loadstart", function () {
  document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "1";
});

/*** Menu Toggle ***/
const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers.forEach(($menuWrappers) => {
  menu($menuWrappers);
});

/*** Add To Favorites ***/
const favoritePhotos = JSON.parse(
  window.localStorage.getItem("favorite")
).photos;
const $favoriteBtn = document.querySelector("[data-add-favorite]");
const photoId = window.location.search.split("=")[1];

$favoriteBtn.classList[favoritePhotos[photoId] ? "add" : "remove"]("active");
favorite($favoriteBtn, "photos", photoId);

/*** Render Photo Details ***/
const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");
const $displayMessage = document.querySelector("[data-message-display]");
client.photos.detail(photoId, (data) => {
  console.log(data);

  const { avg_color, height, width, photographer, alt, src } = data;

  $downloadLink.href = src.original;

  Object.entries(src).forEach((item) => {
    const [key, value] = item;

    $downloadMenu.innerHTML += `
         <a href="${value}" class="menu__item" download data-ripple data-menu-item>
             <span class="label__large">${key}</span>

            <div class="state__layer"></div>
        </a>`;
  });

  $detailWrapper.innerHTML = `
         <figure class="detail__banner" style="aspect-ratio: ${width} / ${height};
                 background-color: ${avg_color}">
             <img src="${src.large2x}"
                 width="${width}" height="${height}" alt="${alt}" class="img__cover" />
         </figure>

         <p class="title__small author__name"> Photographed by 
             <span class="color__primary">${photographer}</span>
         </p>`;

  const $detailImg = $detailWrapper.querySelector("img");

  $detailImg.style.opacity = 0;

  $detailImg.addEventListener("load", function () {
    this.animate(
      {
        opacity: 1,
      },
      {
        duration: 400,
        fill: "forwards",
      }
    );

    if (alt) {
      client.photos.search({ query: alt, page: 1, per_page: 30 }, (data) => {
        loadSimilar(data);
      });
    } else {
      $loader.style.display = "none";
      $displayMessage.innerHTML = "<p>No Similar Photo Found!</p>";
    }
  });
});

/*** Load Similar Photos ***/

/**
 * @param {Object} data Photo Data
 */

const $photoGrid = document.querySelector("[data-photo-grid");

const photoGrid = gridInit($photoGrid);
const $loader = document.querySelector("[data-loader]");

const loadSimilar = function (data) {
  data.photos.forEach((photo) => {
    const $card = photoCard(photo);

    updateGrid($card, photoGrid.columnsHeight, photoGrid.$columns);
    $loader.style.display = "none";
  });
};
