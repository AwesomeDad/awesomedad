/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
jQuery(document).ready(function($) {
  "use strict";

  if ($(".searchOverlay").length && $("#btn-searchOverlay").length) {
    var mainContainer = document.getElementById("pageContent"),
      openCtrl = document.getElementById("btn-searchOverlay"),
      closeCtrl = document.getElementById("btn-searchOverlay-close"),
      searchOverlayContainer = document.querySelector(".searchOverlay"),
      inputSearch = searchOverlayContainer.querySelector(
        ".searchOverlay__input"
      );
  }

  function initEvents() {
    openCtrl.addEventListener("click", openSearch);
    closeCtrl.addEventListener("click", closeSearch);
    document.addEventListener("keyup", function(ev) {
      // escape key.
      if (ev.keyCode == 27) {
        closeSearch();
      }
    });
  }

  function init() {
    initEvents();
  }

  function openSearch() {
    mainContainer.classList.add("main-wrap--hide");
    searchOverlayContainer.classList.add("searchOverlay--open");
    setTimeout(function() {
      inputSearch.focus();
    }, 500);
  }

  function closeSearch() {
    mainContainer.classList.remove("main-wrap--hide");
    searchOverlayContainer.classList.remove("searchOverlay--open");
    inputSearch.blur();
    inputSearch.value = "";
  }

  if ($(".searchOverlay").length && $("#btn-searchOverlay").length) {
    init();
  }
});
