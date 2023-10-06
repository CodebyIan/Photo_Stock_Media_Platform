/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";
import { hoverOnPlay } from "./utils/hoverOnPlay.js";

/**
 * Create Video Card
 * @param {Object} video Video Object
 * @returns {Node} Video Card
 */

export const videoCard = (video) => {
  const root = window.location.origin;

  const { height, width, id, image, video_files } = video;

  const sdVideo = video_files.find(
    (item) => item.quality === "sd" && item.width < 1000
  );

  const { file_type, link } = sdVideo;

  const $card = document.createElement("div");
  $card.classList.add("card", "grid__item", "video");

  const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

  $card.innerHTML = `
     <div class="card__banner" style="--width: ${width}; --height: ${height}">
         <video poster="${image}" muted loop preload="none" class="img__cover" data-video>
             <source src="${link}" type="${file_type}"/>
         </video>
     </div>

     <div class="card__content">
         <button class="icon__btn small ${
           favoriteObj.videos[id] ? "active" : ""
         }"
             aria-label="Add to favorites"
             data-ripple
             data-favorite-btn>
                <span class="material-symbols-outlined
                   leading-icon"
                   aria-hidden="true">
                       favorite
                </span>

         <div class="state__layer"></div>
         </button>
     </div>

     <span class="card__badge" data-card-badge>
         <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
     </span>
     
     <a href="${root}/pages/videos/video_detail.html?id=${id}" class="state__layer"></a>`;

  const $rippleElems = [$card, $card.querySelector("[data-ripple")];

  $rippleElems.forEach(($rippleElem) => ripple($rippleElem));

  const $favoriteBtn = $card.querySelector("[data-favorite-btn]");
  favorite($favoriteBtn, "videos", id);

  hoverOnPlay($card);

  return $card;
};
