import Choices from "choices.js";

(function () {
  const element = document.querySelector(".js-select");
  new Choices(element, {
    placeholder: true,
    searchEnabled: false,
    itemSelectText: "",
  });
})();
