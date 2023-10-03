/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";

/*** Show Filter Bar If Anything Is Searched ***/
const $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";

/** Init Filter State **/
const $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach(($filterWrapper) => {
  filter($filterWrapper, window.filterObj, (newObj) => {
    window.filterObj = newObj;
    updateUrl(newObj, "photos");
  });
});

/*** Render Curated Or Search Photos ***/
const $photoGrid = document.querySelector("[data-photo-grid]");
const $title = document.querySelector("[data-title");
const photoGrid = gridInit($photoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 1;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} photos` : "Curated Photos";

$title.textContent = title;
document.title = title;

/**
 * Render All Photos
 * @param {Number} currentPage Current Page Number
 */

/*** Render All Photos ***/
const renderPhotos = function (currentPage) {
  client.photos[searchObj ? "search" : "curated"](
    { ...searchObj, per_page: perPage, page: currentPage },
    (data) => {
      totalPage = Math.ceil(data.total_results / perPage);
      data.photos.forEach((photo) => {
        const $photoCard = photoCard(photo);
        updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
      });

      // When Photos Load
      isLoaded = true;

      // When No More Photos Are Available
      if (currentPage >= totalPage) {
        $loader.style.display = "none";
      }
    }
  );
};

renderPhotos(currentPage);

/*** Load More Photos */
const $loader = document.querySelector("[data-loader]");
let isLoaded = true;

window.addEventListener("scroll", function () {
  console.log($loader.getBoundingClientRect().top);

  if (
    $loader.getBoundingClientRect().top < window.innerHeight * 2 &&
    currentPage <= totalPage &&
    isLoaded
  ) {
    currentPage++;
    renderPhotos(currentPage);
    isLoaded = false;
  }
});
