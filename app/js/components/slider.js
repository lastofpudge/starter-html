import $ from "jquery";

import Swiper, { Navigation, Pagination, EffectFade } from "swiper";
Swiper.use([Navigation, Pagination, EffectFade]);

$(function () {
  new Swiper(".js-swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
});
