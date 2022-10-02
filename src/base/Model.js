class Model {
  constructor(options) {
    ;['data', 'create', 'delete', 'update', 'get'].forEach((key) => {
      if (key in options) {
        this[key] = options[key]
      }
    })
    // 以下代码与上面等效
    // this.data = options.data
    // this.create = options.create
    // this.delete = options.delete
    // this.update = options.update
    // this.get = options.get
  }
  create() {
    // if (console && console.error) {
    //   console.error('你还没有实现 create')
    // }

    // 此句使用了可选链运算符?.
    // console?.error?.('你还没有实现 create')

    // 以上两种代码与此句等效
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
