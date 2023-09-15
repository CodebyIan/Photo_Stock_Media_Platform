/**
 * @copyright Ian Mucheru 2023
 * @author Ian <imucheru.im@gmail.com>
 */

"use strict";

/*** Add Ripple Effect On Elements ***/
/** @param {Node} $rippleElem Element For Ripple Effect **/

/*** Export ***/
export const ripple = function ($rippleElem) {
  $rippleElem.addEventListener("pointerdown", function (e) {
    e.stopImmediatePropagation();

    const $ripple = document.createElement("div");
    $ripple.classList.add("ripple");

    this.appendChild($ripple);

    const removeRipple = (e) => {
      $ripple.animate(
        {
          opacity: 0,
        },
        { Fill: "forwards", duration: 200 }
      );

      setTimeout(() => {
        $ripple.remove();
      }, 1000);
    };

    this.addEventListener("pointerup", removeRipple);
    this.addEventListener("pointerleave", removeRipple);

    const isNotIconButton = !this.classList.contains("icon__btn");

    if (isNotIconButton) {
      const rippleSize = Math.max(this.clientWidth, this.clientHeight);

      $ripple.style.top = `${e.layerY}px`;
      $ripple.style.left = `${e.layerX}px`;
      $ripple.style.width = `${rippleSize}px`;
      $ripple.style.height = `${rippleSize}px`;
    }
  });
};
