/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { urlDecode } from "./utils/urlDecode.js";

/*** Header On-Scroll State ***/
const /** {NodeElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

/*** Add Ripple Effect ***/
const $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach(($rippleElem) => ripple($rippleElem));

/*** Navbar Toggle For Mobile Screens ***/
const $navTogglers = document.querySelectorAll("[data-nav-toggler]");
const $navbar = document.querySelector("[data-navbar]");
const $scrim = document.querySelector("[data-scrim]");

addEventOnElements($navTogglers, "click", function () {
  $navbar.classList.toggle("active");
  $scrim.classList.toggle("active");
});

/*** Filter Function ***/
window.filterObj = {};

/*** Show All Filtered Options After Reload ***/
if (window.location.search.slice(1)) {
  const search = urlDecode(window.location.search.slice(1));

  Object.entries(search).forEach((item) => {
    const filterKey = item[0];
    const filterValue = item[1];
    window.filterObj[filterKey] = filterValue;

    if (filterKey !== "query") {
      const $filterItem = document.querySelector(
        `[data-filter="${filterKey}"]`
      );
      $filterItem
        ?.querySelector("[data-filter-chip]")
        .classList.add("selected");

      if ($filterItem) {
        $filterItem.querySelector("[data-filter-value]").innerText =
          filterValue;
      }
    }
  });
}

/*** Initial Favorite Object In Local Storage ***/
if (!window.localStorage.getItem("favorite")) {
  const favoriteObj = {
    photos: {},
    videos: {},
  };

  window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}

/*** Page Transition ***/
window.addEventListener("loadstart", function () {
  document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "1";
});
