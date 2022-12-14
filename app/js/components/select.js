import $ from "jquery";

import "select2";

$(function () {
  $(".js-select").select2({
    minimumResultsForSearch: -1,
  });
});
