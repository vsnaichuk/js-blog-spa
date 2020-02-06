import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'
import { renderPost } from '../templates/post.template'

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
        
        const html = posts.map(post => renderPost(post, {withBtn: true}))

        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

function buttonHandler(event) {
    const $el = event.target
    const id = $el.dataset.id
    const title = $el.dataset.title

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []

        if (favorites.some(fid => fid.id === id)) {  //favorites.find(fid => fid.id === id)
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