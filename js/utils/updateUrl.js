/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Import ***/
import { urlEncode } from "./urlEncode.js";

/**
 * Convert Object To url
 * @param {Object} filterObj Filter Object
 * @param {String} searchType Search Type eg. Videos
 **/

/*** Export ***/
export const updateUrl = (filterObj, searchType) => {
  setTimeout(() => {
    const root = window.location.origin;
    const searchQuery = urlEncode(filterObj);

    window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
  }, 500);
};
