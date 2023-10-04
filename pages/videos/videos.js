/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { videoCard } from "../../js/video_card.js";
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
    updateUrl(newObj, "videos");
  });
});

/*** Render Popular Or Searched Videos ***/
const $videoGrid = document.querySelector("[data-video-grid]");
const $title = document.querySelector("[data-title");
const videoGrid = gridInit($videoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 1;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} Videos` : "Popular Videos";

$title.textContent = title;
document.title = title;

/**
 * Render All Photos
 * @param {Number} currentPage Current Page Number
 */

/*** Render All Videos ***/
const renderVideos = function (currentPage) {
  client.videos[searchObj ? "search" : "popular"](
    { ...searchObj, per_page: perPage, page: currentPage },
    (data) => {
      totalPage = Math.ceil(data.total_results / perPage);
      data.videos.forEach((video) => {
        const $videoCard = videoCard(video);
        updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
      });

      // When Videos Load
      isLoaded = true;

      // When No More Videos Are Available
      if (currentPage >= totalPage) {
        $loader.style.display = "none";
      }
    }
  );
};

renderVideos(currentPage);

/*** Load More Videos */
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
    renderVideos(currentPage);
    isLoaded = false;
  }
});
