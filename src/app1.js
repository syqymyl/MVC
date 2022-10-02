import $, { get } from 'jquery'
import './app1.css'

// eventBus 有 on 事件和 trigger 事件
const eventBus = $({})

// 数据相关都放到 m
const m = {
  data: {
    n: parseInt(localStorage.getItem('n')),
  },

  // 对数据操作的增删改查
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n)
  },
  get() {},
}

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
    v.el = $(container) // 存下 container
  },
  render(n) {
    //view = render(data)
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html.replace('{{n}}', n)).appendTo($(v.el))
  },
}

// 其他放到 c
const c = {
  init(container) {
    v.init(container)
    v.render(m.data.n)
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      v.render(m.data.n)
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
      // c.events[key]: "add" "minus" "mul" "div"
      // c["add"]: add(){...}
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      // console.log(part1, part2, value);
      v.el.on(part1, part2, value)
    }
  },
}

// 把 c 暴露出去
export default c
