<template>
  <div class="juego">
    <h1>🎮 Juego de Memoria</h1>
    <p>🧩 Jugador: <strong>{{ usuarioActual?.nombreUsuario || 'Invitado' }}</strong>
    </p>
    <p>Tiempo: {{ tiempo }}s | Aciertos: {{ aciertos }}</p>

    <!-- Tablero (rocio implementa las cartas) -->
    <div class="board">
      <slot></slot>
    </div>

    <button @click="terminarJuego">Finalizar Juego</button>
  </div>
</template>

<script>
export default {
  name: 'GameView',
  props: {
    aciertos: {
      type: Number,
      default: 0
    }
  },
  props: {
    usuarioActual: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      usuario: '',
      tiempo: 0,
      intervalo: null
    }
  },
  created() {
    this.usuario = localStorage.getItem('usuario') || 'Invitado'
    this.iniciarTiempo()
  },
  beforeUnmount() {
    clearInterval(this.intervalo)
  },
  methods: {
    iniciarTiempo() {
      this.intervalo = setInterval(() => {
        this.tiempo++
      }, 1000)
    },
    terminarJuego() {
      clearInterval(this.intervalo)
      const partida = {
        usuario: this.usuario,
        aciertos: this.aciertos,
        tiempo: this.tiempo,
        fecha: new Date().toLocaleDateString()
      }

      const partidas = JSON.parse(localStorage.getItem('partidas') || '[]')
      partidas.push(partida)
      localStorage.setItem('partidas', JSON.stringify(partidas))

      alert(`Juego terminado! Puntaje guardado.`)
      this.$router.push('/estadisticas')
    }
  }
}
</script>

<style scoped>
.game {
  text-align: center;
}
.board {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}
button {
  padding: 8px 16px;
  background: #4caf50;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
}
</style>
