/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/**
 * Add Event On Multiple Element
 * @param {NodeList} $elements NodeList
 * @param {String} eventType Event Type eg. 'click'
 * @param {Function} callback Function
 */

/*** Export ***/
export const addEventOnElements = function ($elements, eventType, callback) {
  $elements.forEach(($element) =>
    $element.addEventListener(eventType, callback)
  );
};
