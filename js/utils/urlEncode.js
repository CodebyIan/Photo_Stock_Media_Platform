/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 **/

"use strict";

/**
 * Convert Object To url
 * @param {Object} urlObj url Object
 * @return url String
 **/

/*** Export ***/
export const urlEncode = (urlObj) => {
  return Object.entries(urlObj)
    .join("&")
    .replace(/,/g, "=")
    .replace(/,/g, "%23");
};
