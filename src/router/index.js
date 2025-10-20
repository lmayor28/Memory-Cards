import { createRouter, createWebHistory } from 'vue-router'

// Importación de todas las vistas
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import StatsView from '../views/StatsView.vue'       // ← la tuya (L)
import BestScoreView from '../views/BestScoreView.vue' // ← la tuya (L)
import CardsView from '../views/CardsView.vue'         // ← compañero (R)
import AddCardView from '../views/AddCardView.vue'     // ← compañero (R)
import LoginView from '../views/LoginView.vue'         // ← la tuya (L)
import NotFoundView from '../views/NotFoundView.vue'   // ← compañero (R)

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
