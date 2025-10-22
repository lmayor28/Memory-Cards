<template>
  <!-- 🔹 Barra de navegación superior -->
  <header class="header">
    <div class="left">
      <!-- 🔸 Enlaces principales -->
      <router-link to="/">🏠 Inicio</router-link>
      <router-link to="/juego">🎮 Jugar</router-link>
      <router-link to="/estadisticas">📊 Estadísticas</router-link>
      <router-link to="/mejor-puntaje">🏆 Puntajes</router-link>
    </div>

    <div class="right">
      <!-- 🔸 Si hay usuario logueado -->
      <template v-if="usuarioActual">
        <span class="usuario">👤 {{ usuarioActual.nombreUsuario }}</span>
        <button class="logout" @click="cerrarSesion">Cerrar sesión</button>
      </template>

      <!-- 🔸 Si NO hay usuario logueado -->
      <template v-else>
        <router-link to="/iniciar-sesion" class="login-btn">Iniciar sesión</router-link>
      </template>
    </div>
  </header>

  <!-- 🔹 Contenido principal -->
  <main>
    <router-view />
  </main>

  <!-- 🔹 Footer global -->
  <CFooter />
</template>

<script>
import CFooter from './components/CFooter.vue'

export default {
  name: 'App',
  components: { CFooter },

  data() {
    return {
      // ==============================
      // 🧑‍💻 USUARIO (estructura del pizarrón)
      // ==============================
      usuario: {
        id: Date.now(),            // ID único generado al crear usuario
        nombre: '',                // Nombre real
        apellido: '',              // Apellido
        nombreUsuario: '',         // Nombre de usuario (único)
        email: '',                 // Correo
        contraseña: '',            // Contraseña
        cartas: [],                // Lista de cartas del usuario (si se quiere personalizar)
        partidas: []               // Historial de partidas del usuario
      },

      // ==============================
      // 🃏 CARTAS
      // ==============================
      cartas: JSON.parse(localStorage.getItem('cartas')) || [],

      // Plantilla base de carta (según el pizarrón)
      cartaTemplate: {
        id: null,                  // ID único
        nombre: '',                // Nombre de la carta
        descripcion: '',           // Descripción
        imagen: '',                // URL de imagen
        isHide: true,              // Si está boca abajo
        isCopied: false            // Si ya fue emparejada
      },

      // ==============================
      // 🎮 PARTIDAS
      // ==============================
      partidaTemplate: {
        id: null,                  // ID único
        puntuacion: 0,             // Puntaje
        fechaInicio: '',           // Fecha
        tiempoFinal: '',           // Tiempo de juego
        aciertos: 0.0              // Porcentaje o número de aciertos
      },

      // ==============================
      // 👤 USUARIO ACTUAL (logueado)
      // ==============================
      usuarioActual: JSON.parse(localStorage.getItem('usuario')) || null
    }
  },

  methods: {
    // ===================================================
    // 🔹 GESTIÓN DE CARTAS
    // ===================================================

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
        carta.isHide = !carta.isHide   // 🔸 Se usa isHide en lugar de bocaArriba
        this.guardarCartas()
      }
    },

    // ===================================================
    // 🔹 GESTIÓN DE USUARIOS
    // ===================================================

    // Cierra la sesión actual
    cerrarSesion() {
      localStorage.removeItem('usuario')
      this.usuarioActual = null
      this.$router.push('/')
    },

    // Guarda un usuario nuevo o actualizado
    guardarUsuario(usuario) {
      this.usuarioActual = usuario
      localStorage.setItem('usuario', JSON.stringify(usuario))
    },

    // Agrega una partida al usuario actual
    agregarPartida(nuevaPartida) {
      if (!this.usuarioActual) return
      const partidaConId = { ...this.partidaTemplate, ...nuevaPartida, id: Date.now() }

      this.usuarioActual.partidas.push(partidaConId)
      localStorage.setItem('usuario', JSON.stringify(this.usuarioActual))
    }
  },

  // ===================================================
  // 🔹 CICLO DE VIDA
  // ===================================================
  mounted() {
    // Revisa si hay usuario guardado en el localStorage al iniciar la app
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'))
    if (usuarioGuardado) {
      this.usuarioActual = usuarioGuardado
    }
  }
}
</script>

<style scoped>
/* 🔹 Estilos del header */
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
