import $ from "jquery";
import "./app1.css";

// 初始化html
const html = `
  <section id="app1">
    <div class="output">
      <span id="number">100</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="multiply2">*2</button>
      <button id="divide2">÷2</button>
    </div>
  </section>
`;

const $element = $(html).prependTo($("body>.page"));

// 需要重要的数据
const $number = $("#number");
const $button1 = $("#add1");
const $button2 = $("#minus1");
const $button3 = $("#multiply2");
const $button4 = $("#divide2");

// 初始化数据
// 每次刷新后仍显示原先计算好的数据（刷新后数据不重置为100）
const n = localStorage.getItem("n");

// 将数据渲染到页面：从localStorage中取出的数据写入页面中
$number.text(n || 100);

// 绑定鼠标事件
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
