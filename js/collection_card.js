/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

import { ripple } from "./utils/ripple.js";

/**
 * Create Collection Card
 * @param {Object} collection Collection Object
 * @return { Node} Collection Card
 */

export const collectionCard = (collection) => {
  const root = window.location.origin;

  const { id, title, media_count } = collection;

  const $card = document.createElement("div");
  $card.classList.add("grid__card", "list__item", "two-line");
  $card.setAttribute("title", title);

  $card.innerHTML = `
     <div class="grid__card list__item two__line" data-ripple>
         <div>
             <h3 class="body__large">
                 ${title}
             </h3>

             <p class="body__medium label">${media_count} Media</p>
         </div>
         <a href="${root}/pages/collections/collection_detail.html?collectionId=${id}&title=${title}"
         class="state__layer"></a>
     </div>
  `;

  ripple($card);

  return $card;
};
