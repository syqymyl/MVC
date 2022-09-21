import $ from "jquery";
import "./app1.css";

const $number = $("#number");
const $button1 = $("#add1");
const $button2 = $("#minus1");
const $button3 = $("#multiply2");
const $button4 = $("#divide2");

// 每次刷新后仍显示原先计算好的数据（刷新后数据不重置为100）
const n = localStorage.getItem("n");
$number.text(n || 100); // 将从localStorage中取出的数据写入页面中

$button1.on("click", () => {
  let n = parseInt($number.text());
  n += 1;
  localStorage.setItem("n", n); // 存储计算后的数字
  $number.text(n);
});
$button2.on("click", () => {
  let n = parseInt($number.text());
  n -= 1;
  localStorage.setItem("n", n);
  $number.text(n);
});
$button3.on("click", () => {
  let n = parseInt($number.text());
  n *= 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
$button4.on("click", () => {
  let n = parseInt($number.text());
  n /= 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
