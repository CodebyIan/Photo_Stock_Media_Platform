/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Import ***/
import { client } from "./api_configure.js";

/**
 * Add To Favorite Or Remove From Favorite
 * @param {Node} $element
 * @param {String} type
 * @param {Number} id Item ID
 */

/*** Export ***/
export const favorite = ($element, type, id) => {
  $element.addEventListener("click", () => {
    $element.setAttribute("disabled", "");
    const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

    if (favoriteObj[type][id]) {
      $element.classList.toggle("active");
      $element.removeAttribute("disabled");

      delete favoriteObj[type][id];

      window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
    } else {
      client[type].detail(id, (data) => {
        $element.classList.add("active");
        $element.removeAttribute("disabled");

        favoriteObj[type][id] = data;

        window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
      });
    }
  });
};
