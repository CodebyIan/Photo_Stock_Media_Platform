/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Import ***/
import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";

/**
 * @param {Object} photo Photo Object
 * @returns Photo Object
 */

/*** Create Photo Card ***/
export const photoCard = (photo) => {
  const root = window.location.origin;

  const {
    alt,
    avg_color: backdropColor,
    width,
    height,
    id,
    src: { large },
  } = photo;

  const $card = document.createElement("div");
  $card.classList.add("card", "grid__item");
  $card.style.backgroundColor = backdropColor;

  const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

  $card.innerHTML = ` 
     <figure class="card__banner" style="--width: ${width}; --height: ${height}">
       <img
         src="${large}"
         alt="${alt}"
         width="${width}"
         height="${height}"
         loading="lazy"
         class="img__cover"/>
     </figure>

     <div class="card__content">
       <button class="icon__btn small ${favoriteObj.photos[id] ? "active" : ""}"
         aria-label="Add To Favorites"
         data-ripple
         data-favorite-btn>
         <span
           class="material-symbols-outlined leading-icon"
           aria-hidden="true">favorite</span>

         <div class="state__layer"></div>
       </button>
    </div>

     <a href="${root}/pages/photos/photo_detail.html?id=${id}" class="state__layer"></a>`;

  const $cardBanner = $card.querySelector("img");
  $cardBanner.style.opacity = 0;

  $cardBanner.addEventListener("load", function () {
    this.animate(
      {
        opacity: 1,
      },
      { duration: 400, fill: "forwards" }
    );
  });

  const $rippleElems = [$card, $card.querySelector("[data-ripple")];

  $rippleElems.forEach(($rippleElem) => ripple($rippleElem));

  const $favoriteBtn = $card.querySelector("[data-favorite-btn]");
  favorite($favoriteBtn, "photos", id);

  return $card;
};
