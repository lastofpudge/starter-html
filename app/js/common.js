import $ from "jquery";
require("select2");

$(function () {
  if ($(".js-select").length) {
    $(".js-select").select2({
      minimumResultsForSearch: -1,
    });
  }
});
