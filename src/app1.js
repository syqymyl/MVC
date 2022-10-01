import $ from "jquery";
import "./app1.css";

// 数据相关都放到 m
const m = {
  data: {
    n: parseInt(localStorage.getItem("n")),
  },
};

// 视图相关放到 v
const v = {
  el: null,
  html: `
    <div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button id="add1">+1</button>
        <button id="minus1">-1</button>
        <button id="multiply2">*2</button>
        <button id="divide2">÷2</button>
      </div>
    </div>
  `,
  init(container) {
    v.el = $(container); // 存下 container
  },
  render(n) {
    if (v.el.children.length !== 0) {
      v.el.empty();
    }
    $(v.html.replace("{{n}}", n)).appendTo($(v.el));
  },
};

// 其他放到 c
const c = {
  init(container) {
    v.init(container);
    v.render(m.data.n);
    // 不能直接放在 c 中，因为c定义的时候就已经会执行 $("#number") 去寻找元素，此时 html 还没被渲染到页面中（v.render()还没执行）
    // 绑定事件在 container 上后，button 都不需要找
    // c.ui = {
    //   number: $("#number"),
    //   button1: $("#add1"),
    //   button2: $("#minus1"),
    //   button3: $("#multiply2"),
    //   button4: $("#divide2"),
    // };
    c.bindEvents();
  },

  bindEvents() {
    // 因为每点击一次就会新生成一个 v.html 插入到 el 中，所有的button也是新生成的，此处点击事件应该绑定在不会重新渲染的 el 上
    v.el.on("click", "#add1", () => {
      m.data.n += 1;
      localStorage.setItem("n", m.data.n);
      v.render(m.data.n);
    });
    v.el.on("click", "#minus1", () => {
      m.data.n -= 1;
      localStorage.setItem("n", m.data.n);
      v.render(m.data.n);
    });
    v.el.on("click", "#multiply2", () => {
      m.data.n *= 2;
      localStorage.setItem("n", m.data.n);
      v.render(m.data.n);
    });
    v.el.on("click", "#divide2", () => {
      m.data.n /= 2;
      localStorage.setItem("n", m.data.n);
      v.render(m.data.n);
    });
  },
};

// 把 c 暴露出去
export default c;
