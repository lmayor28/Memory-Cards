<template>
  <div class="best-score">
    <h1>🏆 Mejores Puntajes</h1>

    <div v-if="ranking.length > 0">
      <ol>
        <li v-for="(jugador, i) in ranking" :key="i">
          {{ jugador.usuario }} — {{ jugador.aciertos }} aciertos ({{ jugador.tiempo }}s)
        </li>
      </ol>
    </div>
    <div v-else>
      <p>No hay puntajes registrados todavía.</p>
    </div>

    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<script>
export default {
  name: 'BestScoreView',
  data() {
    return {
      ranking: [],
    }
  },
  created() {
    const partidas = JSON.parse(localStorage.getItem('partidas') || '[]')
    this.ranking = partidas.sort((a, b) => a.tiempo - b.tiempo).slice(0, 10)
  },
}
</script>

<style scoped>
.best-score {
  text-align: center;
}
ol {
  text-align: left;
  display: inline-block;
}
</style>
