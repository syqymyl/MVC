import './app2.css'
import Vue from 'vue'

const init = (el) => {
  new Vue({
    el: el,
    data: {
      index: parseInt(localStorage.getItem('app2.index')) || 0,
    },
    watch: {
      index() {
        localStorage.setItem('app2.index', this.index)
      },
    },
    // 在 Vue 里，:class="" 表示 "" 中的是 js 代码，用 @click 绑定事件
    template: `
      <section id="app2">
        <ol class="tab-bar">
          <li :class="index === 0 ? 'selected' : ''" @click="index = 0">1</li>
          <li :class="index === 1 ? 'selected' : ''" @click="index = 1">2</li>
      </ol>
      <ol class="tab-content">
        <li :class="index === 0 ? 'active' : ''">内容1</li>
        <li :class="index === 1 ? 'active' : ''">内容2</li>
        </ol>
      </section>
    `,
  })
}

export default init
