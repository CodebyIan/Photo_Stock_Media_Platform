/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";
/*** Imports ***/
import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";
import { urlDecode } from "../../js/utils/urlDecode.js";

/*** Render Collection Media ***/
const $collectionGrid = document.querySelector("[data-collection-grid]");
const $title = document.querySelector("[data-title]");
const collectionGrid = gridInit($collectionGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 1;
const collectionObj = urlDecode(window.location.search.slice(1));

$title.textContent = `${collectionObj.title} Collection`;
document.title = `${collectionObj.title} Collection`;

/**
 * @param {Number} page Current Page
 */

const loadCollection = function (page) {
  client.collections.detail(
    collectionObj.collectionId,
    {
      per_page: perPage,
      page: page,
    },
    (data) => {
      totalPage = Math.ceil(data.total_results / perPage);

      data.media.forEach((item) => {
        let $card;

        switch (item.type.toLowerCase()) {
          case "photo":
            $card = photoCard(item);
            break;
          case "video":
            $card = videoCard(item);
            break;
        }

        updateGrid(
          $card,
          collectionGrid.columnsHeight,
          collectionGrid.$columns
        );
      });

      // When No More Media If  Available
      isLoaded = true;

      if (currentPage >= totalPage) {
        $loader.style.display = "none";
      }
    }
  );
};

loadCollection(currentPage);

/*** Load More Collections */
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
    loadCollection(currentPage);
    isLoaded = false;
  }
});
