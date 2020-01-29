import './css/index.css'
import { HeaderComponent } from "./components/header.component"
import { NavigationComponent } from "./components/header.component"

new HeaderComponent('header')

const navigation = new NavigationComponent('navigation')

console.log(navigation);

