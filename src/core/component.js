export class Component {
    constructor(id) {
        this.$el = document.getElementById(id)
        this.init() //Run when creating '$el'
    }

    init() {} //Lifecycle method(hook)

    onShow() {
        
    }

    onHide() {

    }

    hide() {
        this.$el.classList.add('hide')
        this.onHide()
    }

    show() {
        this.$el.classList.remove('hide')
        this.onShow()
    }
}