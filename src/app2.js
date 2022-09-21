import $ from "jquery"; // 虽然多个文件都引入了jquery，但是jquery只加载一次
import "./app2.css";

const $tabBar = $("#app2 .tab-bar");
const $tabContent = $("#app2 .tab-content");
const localKey = "app2.index";
const index = localStorage.getItem(localKey) || 0;

// 监听tab-Bar的子元素li的点击事件
$tabBar.on("click", "li", (e) => {
  const $li = $(e.currentTarget); // 获取当前被点击的元素，其子元素被点击不会被获取到，但是e.target都会获取到
  $li.addClass("selected").siblings().removeClass("selected");

  const index = $li.index();
  localStorage.setItem(localKey, index);
  $tabContent
    .children()
    .eq(index)
    .addClass("active") // 为标签添加属性active，事件触发后内容的显示和隐藏均在css定义好，这是基于一种抽象的思想：样式与行为分离
    .siblings()
    .removeClass("active");

  // 永远不要用直接操作css的js api：css show hide
  //   $tabContent
  //     .children()
  //     .eq(index)
  //     .css({ display: "block" })
  //     .siblings()
  //     .css({ display: "none" });
});
$tabBar.children().eq(index).trigger("click"); // 默认触发显示内容1
