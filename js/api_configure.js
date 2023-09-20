/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Import ***/
import { urlEncode } from "./utils/urlEncode.js";

// Do Not Share API Key
const API_KEY = "d2cAgENwe9CLXXkSk0gPhOSNeYLPStgEJwM0cRZuHEt8GOMqeywB0eEN";
const headers = new Headers();

headers.append("Authorization", API_KEY);

const requestOptions = { headers };

/**
 * Fetch Data From Pexel
 * @param {String} url Fetch URL
 * @param {Function} successCallback Success Callback Function
 */

const fetchData = async function (url, successCallback) {
  const response = await fetch(url, requestOptions);

  if (response.ok) {
    const data = await response.json();

    successCallback(data);
  }
};

let requestUrl = "";

const root = {
  default: "https://api.pexels.com/v1/",
  videos: "https://api.pexels.com/videos/",
};

export const client = {
  photos: {
    /**
     * Search Photos
     * @param {Object} parameters URL Object
     * @param {Function} callback Callback Function
     */

    search(parameters, callback) {
      requestUrl = `${root.default}search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    /**
     * Curated Photos
     * @param {Object} parameters URL Object
     * @param {Function} callback Callback Function
     */

    curated(parameters, callback) {
      fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
    },

    /**
     * Get Single Photo Details
     * @param {String} id Photo ID
     * @param {Function} callback Callback Function
     */

    detail(id, callback) {
      fetchData(`${root.default}photos/${id}`, callback);
    },
  },

  videos: {
    /**
     * Search videos
     * @param {Object} parameters URL Object
     * @param {Function} callback Callback Function
     */

    search(parameters, callback) {
      requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },

    /**
     * Get Popular videos
     * @param {Object} parameters URL Object
     * @param {Function} callback Callback Function
     */

    popular(parameters, callback) {
      fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
    },

    /**
     * Get Single Video Details
     * @param {String} id Video ID
     * @param {Function} callback Callback Function
     */

    detail(id, callback) {
      fetchData(`${root.videos}videos/${id}`, callback);
    },
  },

  collections: {
    /**
     * Get Featured Collections
     * @param {Object} parameters URL Object
     * @param {Function} callback Callback Function
     */

    featured(parameters, callback) {
      requestUrl = `${root.default}/collections/featured?${urlEncode(
        parameters
      )}`;
      fetchData(requestUrl, callback);
    },

    /**
     * Get A Collection Media
     * @param {String} id Collections ID
     * @param {Object} parameters URL Object
     * @param {Function} callback Callback Function
     */

    detail(id, parameters, callback) {
      requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
      fetchData(requestUrl, callback);
    },
  },
};
