/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";
/**
 * Convert To Object
 * @param {String} urlString Url String
 * @returns {Object} Url Object
 */

/*** Export ***/
export const urlDecode = (urlString) => {
  return Object.fromEntries(
    urlString
      .replace(/%23/g, "#")
      .replace(/%20/g, " ")
      .split("&")
      .map((i) => i.split("="))
  );
};
