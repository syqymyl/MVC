import $ from 'jquery'
import './app3.css'

const html = `
  <section id="app3">
    <div class="square"></div>
  </section>
`

const $element = $(html).appendTo($('body>.page'))

const $square = $('#app3 .square')
const localKey = 'app3.index'
// // yes / no / undefined（默认是undefined）
const active = localStorage.getItem(localKey) === 'yes'

// if (active) {
//   $square.addClass("active");
// } else {
//   $square.removeClass("active");
// }
// 以上代码可简写为一行代码
$square.toggleClass('active', active)

$square.on('click', () => {
  // $square.toggleClass("active"); // 点击一下变化，再点击reset
  // 使用toggleClass我们不清楚什么时候加了active，什么时候没有加。要想刷新后保持其状态使用hasClass判断
  if ($square.hasClass('active')) {
    $square.removeClass('active')
    localStorage.setItem(localKey, 'no')
  } else {
    $square.addClass('active')
    localStorage.setItem(localKey, 'yes')
  }
})
