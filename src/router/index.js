import { createRouter, createWebHistory } from 'vue-router'

// Importación de todas las vistas
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import StatsView from '../views/StatsView.vue'       
import BestScoreView from '../views/BestScoreView.vue' 
import CardsView from '../views/CardsView.vue'         
import AddCardView from '../views/AddCardView.vue'     
import LoginView from '../views/LoginView.vue'         
import NotFoundView from '../views/NotFoundView.vue'   

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/juego', name: 'game', component: GameView },
  { path: '/estadisticas', name: 'stats', component: StatsView },
  { path: '/mejor-puntaje', name: 'bestScore', component: BestScoreView },
  { path: '/cartas', name: 'cards', component: CardsView },
  { path: '/agregar-carta', name: 'addCard', component: AddCardView },
  { path: '/iniciar-sesion', name: 'login', component: LoginView },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
