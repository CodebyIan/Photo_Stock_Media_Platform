/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Import ***/
import { menu } from "./menu.js";
import { addEventOnElements } from "./utils/event.js";

/**
 * Add Filter Functionality
 * @param {Node} $filterWrapper Filter Wrapper
 * @param {Object} filterObj Filter Object
 * @param {Function} callback Callback Function
 */

/*** Export ***/
export const filter = ($filterWrapper, filterObj, callback) => {
  const $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]");
  const $filterValue = $filterWrapper.querySelector("[data-filter-value]");
  const $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
  const $filterColorField = $filterWrapper.querySelector("[data-color-field]");
  const filterKey = $filterWrapper.dataset.filter;
  const newObj = filterObj;

  menu($filterWrapper, (filterValue) => {
    $filterValue.innerText = filterValue;
    $filterChip.classList.add("selected");

    newObj[filterKey] = filterValue;
    callback(newObj);
  });

  $filterClearBtn.addEventListener("click", () => {
    $filterChip.classList.remove("selected");
    $filterValue.innerText = $filterValue.dataset.filterValue;

    delete newObj[filterKey];
    callback(newObj);
  });

  $filterColorField?.addEventListener("change", function () {
    const filterValue = this.value.toLowerCase();
    $filterValue.innerText = filterValue;
    $filterChip.classList.add("selected");

    newObj[filterKey] = filterValue;
    callback(newObj);
  });
};
