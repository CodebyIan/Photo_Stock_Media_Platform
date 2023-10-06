/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/**
 * Initial Columns
 * @param {Node} $gridContainer Grid Container
 * @returns {Object} Column & Columns height Array
 */

/*** Export ***/
export const gridInit = function ($gridContainer) {
  const $columns = [];
  const columnsHeight = [];
  const columnCount = Number(
    getComputedStyle($gridContainer).getPropertyValue("--column-count")
  );

  for (let i = 0; i < columnCount; i++) {
    const $column = document.createElement("div");
    $column.classList.add("column");
    $gridContainer.appendChild($column);
    $columns.push($column);
    columnsHeight.push(0);
  }

  return { $columns, columnsHeight };
};

/**
 * Update Mansory Grid
 * @param {Node} $card Grid Item
 * @param {Array} columnsHeight Height Of All Columns
 * @param {NodeList} $columns All Columns
 */

export const updateGrid = function ($card, columnsHeight, $columns) {
  const minColumnHeight = Math.min(...columnsHeight);
  const minColumnIndex = columnsHeight.indexOf(minColumnHeight);

  $columns[minColumnIndex].appendChild($card);
  columnsHeight[minColumnIndex] = $columns[minColumnIndex].offsetHeight;
};
