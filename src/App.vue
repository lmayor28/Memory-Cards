<template>
  <!-- Barra de navegación -->
  <header class="header">
    <div class="left">
      <router-link to="/">🏠 Inicio</router-link>
      <router-link to="/juego">🎮 Jugar</router-link>
      <router-link to="/estadisticas">📊 Estadísticas</router-link>
      <router-link to="/mejor-puntaje">🏆 Puntajes</router-link>
    </div>

    <div class="right">
      <!-- Si hay usuario logueado -->
      <template v-if="usuarioActual">
        <span class="usuario">👤 {{ usuarioActual }}</span>
        <button class="logout" @click="cerrarSesion">Cerrar sesión</button>
      </template>

      <!-- Si no hay usuario -->
      <template v-else>
        <router-link to="/iniciar-sesion" class="login-btn">Iniciar sesión</router-link>
      </template>
    </div>
  </header>

  <!-- Contenido principal -->
  <main>
    <router-view />
  </main>

  <!-- Footer -->
  <CFooter />
</template>

<script>
import CFooter from './components/CFooter.vue'

export default {
  name: 'App',
  components: { CFooter },

  data() {
    return {
      usuario: { nombre: '', apellido: '' },

      cartas: JSON.parse(localStorage.getItem('cartas')) || [],

      cartaTemplate: {
        id: null,
        nombre: '',
        descripcion: '',
        imagen: '',
        bocaArriba: true
      },

      usuarioActual: localStorage.getItem('usuario') || ''
    }
  },

  methods: {
    // 🔹 Gestiona las cartas
    guardarCartas() {
      localStorage.setItem('cartas', JSON.stringify(this.cartas))
    },
    agregarCarta(nuevaCarta) {
      const id = nuevaCarta.id ?? Date.now()
      const cartaFinal = { ...this.cartaTemplate, ...nuevaCarta, id }
      this.cartas.push(cartaFinal)
      this.guardarCartas()
    },
    eliminarCarta(idCarta) {
      this.cartas = this.cartas.filter(c => c.id !== idCarta)
      this.guardarCartas()
    },
    voltearCarta(idCarta) {
      const carta = this.cartas.find(c => c.id === idCarta)
      if (carta) {
        carta.bocaArriba = !carta.bocaArriba
        this.guardarCartas()
      }
    },

    // 🔹 Sistema de usuario
    cerrarSesion() {
      localStorage.removeItem('usuario')
      this.usuarioActual = ''
      this.$router.push('/')
    }
  },

  // 🔹 Cuando la app carga, revisa si hay usuario logueado
  mounted() {
    this.usuarioActual = localStorage.getItem('usuario') || ''
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #03a9f4;
  color: white;
  padding: 10px 20px;
}

.header a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.header a:hover {
  text-decoration: underline;
}

.right {
  display: flex;
  align-items: center;
}

.usuario {
  margin-right: 15px;
  font-weight: bold;
}

.logout {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout:hover {
  background-color: #d32f2f;
}

.login-btn {
  background-color: #0288d1;
  padding: 6px 12px;
  border-radius: 6px;
}

.login-btn:hover {
  background-color: #0277bd;
}
</style>
