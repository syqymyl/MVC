import $ from "jquery";
import "./app3.css";

const $square = $("#app3 .square");

$square.on("click", () => {
  $square.toggleClass("active"); // 点击一下变化，再点击reset
});
