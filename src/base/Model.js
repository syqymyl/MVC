import EventBus from './EventBus.js'

class Model extends EventBus {
  constructor(options) {
    super() // EventBus#constructor()
    const keys = ['data', 'create', 'delete', 'update', 'get']
    keys.forEach((key) => {
      if (key in options) {
        this[key] = options[key]
      }
    })
    // js代码不能以括号开头（不加分号的时候），[]会往前面的()靠，以下代码等价于：super()[].forEach()，super()[]返回的是undefined，undefined没有forEach
    // super() // EventBus#constructor()
    //   [('data', 'create', 'delete', 'update', 'get')].forEach((key) => {
    //     if (key in options) {
    //       this[key] = options[key]
    //     }
    //   })
  }
  create() {
    console && console.error && console.error('你还没有实现 create')
  }
  delete() {
    console && console.error && console.error('你还没有实现 delete')
  }
  update(data) {
    console && console.error && console.error('你还没有实现 update')
  }
  get() {
    console && console.error && console.error('你还没有实现 get')
  }
}

export default Model
