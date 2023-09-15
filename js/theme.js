/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

const /** {NodeElement} */ $HTML = document.documentElement;
let /** {Boolean} */ isDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = function () {
  console.log("click");
  isDark = sessionStorage.getItem("theme");
  sessionStorage.setItem("theme", isDark === "light" ? "dark" : "light");
  $HTML.dataset.theme = sessionStorage.getItem("theme");
};

window.addEventListener("load", () => {
  const /** {NodeElement} */ $themeBtn = document.querySelector(
      "[data-theme-toggler]"
    );

  $themeBtn.addEventListener("click", changeTheme);
});
