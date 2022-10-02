import $, { get } from 'jquery'
import './app1.css'
import Model from './base/Model.js'

// eventBus 有 on 事件和 trigger 事件
const eventBus = $({})

// 数据相关都放到 m
const m = new Model({
  data: {
    n: parseInt(localStorage.getItem('n')),
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n)
  },
})

// 其他放到 view
const view = {
  // vue.js: View
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
    view.el = $(container)
    view.render(m.data.n)
    view.autoBindEvents()
    eventBus.on('m:updated', () => {
      view.render(m.data.n)
    })
  },
  render(n) {
    if (view.el.children.length !== 0) {
      view.el.empty()
    }
    $(view.html.replace('{{n}}', n)).appendTo($(view.el))
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

  autoBindEvents() {
    for (let key in view.events) {
      const value = view[view.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      view.el.on(part1, part2, value)
    }
  },
}

// 把 view 暴露出去
export default view
