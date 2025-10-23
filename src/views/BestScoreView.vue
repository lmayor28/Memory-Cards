<template>
  <div class="best-score">
    <h1>🏆 Mejor Puntuación</h1>

    <div v-if="!usuarioActual">
      <p>🔒 Debes iniciar sesión para ver tu mejor puntaje.</p>
      <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
    </div>

    <div v-else>
      <p>Jugador: <strong>{{ usuarioActual.nombreUsuario }}</strong></p>

      <div v-if="mejorPartida">
        <p><strong>Puntuación:</strong> {{ mejorPartida.puntuacion }}</p>
        <p><strong>Aciertos:</strong> {{ mejorPartida.aciertos }}</p>
        <p><strong>Tiempo:</strong> {{ mejorPartida.tiempoFinal }} segundos</p>
        <p><strong>Fecha:</strong> {{ mejorPartida.fechaInicio }}</p>
      </div>
      <div v-else>
        <p>No tienes partidas registradas aún. ¡Juega una partida para ver tu mejor puntaje!</p>
        <router-link to="/juego">🎮 Jugar ahora</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BestScoreView",
  props: {
    usuarioActual: {
      type: Object,
      default: null
    }
  },
  computed: {
    mejorPartida() {
      if (!this.usuarioActual || !this.usuarioActual.partidas?.length) return null
      return [...this.usuarioActual.partidas].sort((a, b) => b.puntuacion - a.puntuacion)[0]
    }
  }
}
</script>

<style scoped>
.best-score {
  text-align: center;
  margin: 40px auto;
  background-color: #b3e5fc;
  padding: 30px;
  border-radius: 20px;
  width: 80%;
}
a {
  color: #0288d1;
  text-decoration: none;
  font-weight: bold;
}
</style>
