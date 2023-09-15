/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Import ***/
import { addEventOnElements } from "./utils/event.js";

/*** Export  ***/
export const segment = function ($segment, callback) {
  const $segmentBtns = $segment.querySelectorAll("[data-segment-btn]");
  let $lastSelectedSegmentBtn = $segment.querySelector(
    "[data-segment-btn].selected"
  );

  addEventOnElements($segmentBtns, "click", function () {
    $lastSelectedSegmentBtn.classList.remove("selected");
    this.classList.add("selected");
    $lastSelectedSegmentBtn = this;
    callback(this.dataset.segmentValue);
  });
};
