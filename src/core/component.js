export class Component {
    constructor(id) {
        this.$el = document.getElementById(id)
        this.init() //Run when creating '$el'
    }

    init() {} //Lifecycle method(hook)

    hide() {
        this.$el.classList.add('hide')
    }

    show() {
        this.$el.classList.remove('hide')
    }
}