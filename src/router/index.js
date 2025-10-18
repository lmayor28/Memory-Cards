import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import StatsView from '../views/StatsView.vue'
import BestScoreView from '../views/BestScoreView.vue'
import CardsView from '../views/CardsView.vue'
import AddCardView from '../views/AddCardView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/juego', component: GameView },
  { path: '/estadisticas', component: StatsView },
  { path: '/mejor-puntaje', component: BestScoreView },
  { path: '/cartas', component: CardsView },
  { path: '/agregar-carta', component: AddCardView },
  { path: '/iniciar-sesion', component: LoginView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
