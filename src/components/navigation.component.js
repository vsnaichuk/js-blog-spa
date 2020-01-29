import {Component} from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        console.log(this.$el);
        
    }
}