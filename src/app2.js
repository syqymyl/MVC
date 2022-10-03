import $ from 'jquery'
import './app2.css'
import Model from './base/Model.js'
import View from './base/View.js'

// const eventBus = new EventBus()

const localKey = 'app2.index'

const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0,
  },
  update(data) {
    Object.assign(m.data, data)
    m.trigger('m:updated')
    // eventBus.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  },
})

const init = (el) => {
  new View({
    el: el,
    data: m.data,
    // eventBus: eventBus,
    html: (index) => {
      return `
        <div>
          <ol class="tab-bar">
          <li class="${index === 0 ? 'selected' : ''}" data-index = "0">1</li>
          <li class="${index === 1 ? 'selected' : ''}" data-index = "1">2</li>
        </ol>
        <ol class="tab-content">
        <li class="${index === 0 ? 'active' : ''}">内容1</li>
        <li class="${index === 1 ? 'active' : ''}">内容2</li>
          </ol>
        </div>
      `
    },
    render(data) {
      const index = data.index
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html(index)).appendTo($(this.el))
    },
    events: {
      'click .tab-bar li': 'x',
    },
    x(e) {
      const index = parseInt(e.currentTarget.dataset.index)
      m.update({ index: index })
    },
  })
}

// 把 init 暴露出去
export default init
