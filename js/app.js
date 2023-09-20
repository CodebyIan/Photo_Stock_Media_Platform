/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { client } from "./api_configure.js";
import { gridInit, updateGrid } from "./utils/masonry_grid.js";
import { photoCard } from "./photo_card.js";
import { videoCard } from "./video_card.js";

/**
 * Render Curated Photos On Home Page
 */

const $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({ page: 1, per_page: 20 }, (data) => {
  $photoGrid.innerHTML = "";
  const photoGrid = gridInit($photoGrid);

  data.photos.forEach((photo) => {
    const $photoCard = photoCard(photo);

    updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
  });
});

/**
 * Render Popular Videos On Home Page
 */

const $videoGrid = document.querySelector("[data-video-grid]");
$videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.videos.popular({ page: 1, per_page: 20 }, (data) => {
  $videoGrid.innerHTML = "";
  const videoGrid = gridInit($videoGrid);

  data.videos.forEach((video) => {
    const $videoCard = videoCard(video);

    updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
  });
});
