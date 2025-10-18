import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import ScoreView from '../views/ScoreView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/juego', component: GameView },
  { path: '/puntajes', component: StatsView },
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
