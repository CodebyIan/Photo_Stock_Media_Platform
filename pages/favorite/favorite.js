/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { segment } from "../../js/segment_btn.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";

/*** Favorite Segment Button ***/
const $favoriteSegment = document.querySelector("[data-segment='favorite']");
const $favGrid = document.querySelector("[data-fav-grid]");
let favGrid = gridInit($favGrid);
let favType = "photos";

segment($favoriteSegment, (segmentValue) => {
  favType = segmentValue;
  $favGrid.innerHTML = "";
  favGrid = gridInit($favGrid);
  loadFav(favType, favGrid);
});

/*** Load Favorite Items ***/
const favData = JSON.parse(window.localStorage.getItem("favorite"));

const loadFav = function (type, favGridItem) {
  Object.values(favData[type]).forEach((item) => {
    if (type === "photos") {
      const $photoCard = photoCard(item);

      $favGrid.appendChild($photoCard);
    } else {
      const $videoCard = videoCard(item);

      $favGrid.appendChild($videoCard);
    }
  });
};

loadFav(favType, favGrid);
