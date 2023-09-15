/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Import ***/
import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";

/*** Search View Toggle In Small Devices */

const $searchTogglers = document.querySelectorAll("[data-search-toggler]");
const $searchView = document.querySelector("[data-search-view]");

addEventOnElements($searchTogglers, "click", () => {
  $searchView.classList.toggle("active");
});

/*** Search Clear ***/
const $searchField = document.querySelector("[data-Search-field]");
const $searchClearBtn = document.querySelector("[data-search-clear-btn]");

$searchClearBtn.addEventListener("click", () => {
  $searchField.value = "";
});

/*** Search Type ***/
const $searchSegment = document.querySelector("[data-segment='search']");
const $activeSegmentBtn = document.querySelector("[data-segment-btn].selected");

window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, (segmentValue) => {
  window.searchType = segmentValue;
});

/*** Search Submit ***/
const $searchBtn = document.querySelector("[data-search-btn]");
$searchBtn.addEventListener("click", function () {
  const $searchValue = $searchField.value.trim();
  console.log($searchValue);

  if ($searchValue) {
    updateSearchHistory($searchValue);

    // window.searchType = $searchValue;
    window.filterObj.query = $searchValue;
    updateUrl(window.filterObj, window.searchType);
  }
});

/*** Submit Search When Enter Key Is Pressed ***/
$searchField.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && $searchField.value.trim()) {
    $searchBtn.click();
  }
});

/*** Search History ***/
/** Initial Search History **/
let searchHistory = { items: [] };

if (window.localStorage.getItem("searchHistory")) {
  searchHistory = JSON.parse(window.localStorage.getItem("searchHistory"));
} else {
  window.localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

/** Update Search History */
const updateSearchHistory = (searchValue) => {
  /** If The Searched value Is Already Present In The Search List
   * Then Remove It And Add The Search Value At The Beginning Of The
   * Search List
   * This Ensures That The Most Resent Search Appears In The Top Of The Search List
   **/
  if (searchHistory.items.includes(searchValue)) {
    searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
  }
  searchHistory.items.unshift(searchValue);

  window.localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

/**
 * Render Search History Items In Search List
 **/

const $searchList = document.querySelector("[data-search-list]");
const historyLen = searchHistory.items.length;

for (let i = 0; i < historyLen && i <= 5; i++) {
  const $listItem = document.createElement("button");
  $listItem.classList.add("list__item");
  $listItem.innerHTML = `
      <span
      class="material-symbols-outlined leading-icon"
      aria-hidden="true">history</span>

      <span class="body__large text"> ${searchHistory.items[i]} </span>

      <div class="state__layer"></div>`;

  ripple($listItem);

  $listItem.addEventListener("click", function () {
    $searchField.value = this.children[1].textContent;
    $searchBtn.click();
  });

  $searchList.appendChild($listItem);
}
