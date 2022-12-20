import IMask from "imask";

(function () {
  const mask = document.querySelector(".js-mask");

  if (mask) {
    new IMask(mask, {
      mask: "+{380} 00 000 0000",
    });
  }
})();
