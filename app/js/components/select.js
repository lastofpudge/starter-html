import Choices from "choices.js";

(function () {
  const select = document.querySelector(".js-select");

  if (select) {
    new Choices(select, {
      placeholder: true,
      searchEnabled: false,
      itemSelectText: "",
    });
  }
})();
