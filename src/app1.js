import $, { get } from 'jquery'
import './app1.css'
import Model from './base/Model.js'
import View from './base/View.js'

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

// 其他放到 c
const c = {
  v: null,
  initV() {
    // 视图相关放到 v，由于 v 与 c 有联系，必须先拿到 container 才能创建 v 对象，因此让 v 和 c 共用一个对象
    c.v = new View({
      el: c.container,
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
      render(n) {
        if (c.v.el.children.length !== 0) {
          c.v.el.empty()
        }
        $(c.v.html.replace('{{n}}', n)).appendTo($(c.v.el))
      },
    })
    c.v.render(m.data.n) // 渲染
  },
  init(container) {
    c.container = container
    c.initV()
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      c.v.render(m.data.n)
    })
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
    for (let key in c.events) {
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      c.v.el.on(part1, part2, value)
    }
  },
}

// 把 c 暴露出去
export default c
