import './css/index.css'
import { HeaderComponent } from './components/header.component'
import { NavigationComponent } from './components/navigation.component'

import { CreateComponent } from './components/create.component'
import { FavoriteComponent } from './components/favorite.component'
import { PostsComponent } from './components/posts.component'
import { LoaderComponent } from './components/loader.component'

new HeaderComponent('header')

const navigation = new NavigationComponent('navigation')
const loader = new LoaderComponent('loader')

const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite', {loader})
const posts = new PostsComponent('posts', {loader})


navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'favorite', component: favorite},
    {name: 'posts', component: posts},
])


