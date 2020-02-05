import { Component } from '../core/component'

export class FavoriteComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler)
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }
}

function linkClickHandler(event) {
    event.preventDefault()

    if (event.target.classList.contains('js-link')) {
        console.log(event.target.dataset.hash)
    }
}

function renderList(list = []) {
    if (list.length) {
        return `
            <ul>
                ${list.map(i => `<li><a href="#" class="js-link" data-hash="${i.id}">${i.title}</a></li>`).join(' ')}
            </ul>
        `
    } 

    return '<p class="center">Ви поки що нічого не додали</p>'
}