import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'

export class CreateComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.$el, {
            title: [Validators.require],
            fulltext: [Validators.require, Validators.minLength(10)]
        })
    }
}

function submitHandler(event) {
    event.preventDefault()

    if (this.form.isValid()) {
        const formData = {
            type: this.$el.type.value,
            ...this.form.value()
        }
    
        console.log('Submit!', formData);
    } else {
        console.log('Form invalid');
    }
}