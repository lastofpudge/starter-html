import $ from "jquery";
import "magnific-popup";

$(function () {
  if ($(".js-iframe").length) {
    $(".js-iframe").each((i, el) => {
      const $el = $(el);

      $el.magnificPopup({
        type: "iframe",
        removalDelay: 300,
        mainClass: $el.data("effect") ?? `mfp-with-anim ${el.data("effect")}`,
        closeBtnInside: true,
      });
    });
  }

  if ($(".js-inline").length) {
    $(".js-inline").each((i, el) => {
      const $el = $(el);

      $el.magnificPopup({
        type: "inline",
        removalDelay: 300,
        callbacks: {
          beforeOpen: function () {
            this.st.mainClass = this.st.el.attr("data-effect");
          },
        },
        closeBtnInside: true,
      });
    });
  }
});
