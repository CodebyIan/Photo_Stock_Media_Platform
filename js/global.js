/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Imports ***/
import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";

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

/*** Initial Favorite Object In Local Storage ***/
if (!window.localStorage.getItem("favorite")) {
  const favoriteObj = {
    photos: {},
    videos: {},
  };

  window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}
