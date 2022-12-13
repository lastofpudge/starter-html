import $ from "jquery";
import Swiper from "swiper";
import "select2";

$(function () {
  if ($(".js-select").length) {
    $(".js-select").select2({
      minimumResultsForSearch: -1,
    });
  }

  if ($(".js-swiper").length) {
    new Swiper(".js-swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  }
});
