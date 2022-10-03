import $, { get } from 'jquery'
import './app1.css'
import Model from './base/Model.js'
import View from './base/View.js'

// eventBus 有 on 事件和 trigger 事件
const eventBus = $({})

// 数据相关都放到 m
const m = new Model({
  data: {
    n: parseFloat(localStorage.getItem('n')),
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n)
  },
})

const init = (el) => {
  // 其他放到 view
  new View({
    // vue.js: View
    el: el,
    data: m.data,
    eventBus: eventBus,
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
    render(data) {
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html.replace('{{n}}', data.n)).appendTo($(this.el))
    },
    // 表驱动编程
    events: {
      'click #add1': 'add',
      'click #minus1': 'minus',
      'click #multiply2': 'mul',
      'click #divide2': 'div',
    },
    add() {
      m.update({ n: m.data.n + 1 })
    },
    minus() {
      m.update({ n: m.data.n - 1 })
    },
    mul() {
      m.update({ n: m.data.n * 2 })
    },
    div() {
      m.update({ n: m.data.n / 2 })
    },
  })
}

// 把 view 暴露出去
export default init
