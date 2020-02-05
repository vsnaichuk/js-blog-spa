import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        
        const fbData = await apiService.fetchPost()
        const posts = TransformService.fbObjectToArray(fbData)
        
        const html = posts.map(post => renderPost(post))

        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

function renderPost(post) {
    const tag = post.type === 'news'
        ? '<li class="tag tag-blue tag-rounded">Новина</li>'
        : '<li class="tag tag-rounded">Замітка</li>'

    const button = (JSON.parse(localStorage.getItem('favorites')) || []).some(fid => fid.id === post.id)
        ? `<button class="button-danger button-round button-small button-shadow" data-id="${post.id}" data-title="${post.title}">Видалити</button>`
        : `<button class="button-primary button-round button-small button-shadow" data-id="${post.id}" data-title="${post.title}">Зберегти</button>`

    return `
        <div class="panel">
            <div class="panel-head">
                <p class="panel-title">${post.title}</p>
                <ul class="tags">
                    ${tag}
                </ul>
            </div>
            
            <div class="panel-body">
                <p class="multi-line">${post.fulltext}</p>
            </div>
            
            <div class="panel-footer w-panel-footer">
                <small>${post.date}</small>
                ${button}
            </div>
        </div>
    `
}

function buttonHandler(event) {
    const $el = event.target
    const id = $el.dataset.id
    const title = $el.dataset.title

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []

        if (favorites.some(fid => fid.id === id)) {
            //delete element from Local Storage
            $el.textContent = 'Зберегти'

            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')

            favorites = favorites.filter(fid => {
                return fid.id !== id
            })
        } else {
            //add element to Local Storage
            $el.textContent = 'Видалити'

            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')

            favorites.push({id, title})
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}