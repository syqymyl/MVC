import './app1.css'
import Vue from 'vue'

const init = (el) => {
  new Vue({
    el: el,
    data: {
      n: parseFloat(localStorage.getItem('n')),
    },
    methods: {
      add() {
        this.n += 1
      },
      minus() {
        this.n -= 1
      },
      mul() {
        this.n *= 2
      },
      div() {
        this.n /= 2
      },
    },
    // 监听当 n 变化就存入 localStorage
    watch: {
      n() {
        localStorage.setItem('n', this.n)
      },
    },
    // 在 Vue 里用 @click 绑定事件
    // 因为 template 中的 html 会替换外面的 #app1, 所以这里的 div 要改成 section
    template: `
    <section id="app1">
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button @click="add">+1</button>
        <button @click="minus">-1</button>
        <button @click="mul">*2</button>
        <button @click="div">÷2</button>
      </div>
    </section>
  `,
  })
}

export default init
