import {Component} from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }
}

function tabClickHandler(event) {
    if (event.target.classList.contains('tab')) {
        Array.from(this.$el.querySelectorAll('.tab')).forEach(element => {
            element.classList.remove('active')
        })

        event.target.classList.add('active')
    }
}