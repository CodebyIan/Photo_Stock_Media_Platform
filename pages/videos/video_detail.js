/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { ripple } from "../../js/utils/ripple.js";
import { client } from "../../js/api_configure.js";
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
const favoriteVideos = JSON.parse(
  window.localStorage.getItem("favorite")
).videos;
const $favoriteBtn = document.querySelector("[data-add-favorite]");
const videoId = window.location.search.split("=")[1];

$favoriteBtn.classList[favoriteVideos[videoId] ? "add" : "remove"]("active");
favorite($favoriteBtn, "videos", videoId);

/*** Render Video Details ***/
const $detailWrapper = document.querySelector("[data-detail-wrapper]");
const $downloadLink = document.querySelector("[data-download-link]");
const $downloadMenu = document.querySelector("[data-download-menu]");
const $displayMessage = document.querySelector("[data-message-display]");
client.videos.detail(videoId, (data) => {
  console.log(data);

  const {
    width,
    height,
    image,
    user: { name: author },
    video_files,
  } = data;

  const hdVideo = video_files.find((item) => item.quality === "hd");

  const { file_type, link } = hdVideo;

  $downloadLink.href = link;

  video_files.forEach((item) => {
    const { width, height, quality, link } = item;

    $downloadMenu.innerHTML += `
         <a href="${link}" class="menu__item" download>
             <span class="label__large">${quality.toUpperCase()}</span>

             <span class="label__large trailing__text">${width}x${height}</span>

            <div class="state__layer"></div>
        </a>`;
  });

  $detailWrapper.innerHTML = `
         <div class="detail__banner" style="aspect-ratio: ${width} / ${height}">
             <video poster="${image}" controls class="img__cover" data-video>
                 <source src="${link}" type="${file_type}" />
             </video>
         </div>

         <p class="title__small author__name"> Video by
             <span class="color__primary">${author}</span>
         </p>
         `;
});
