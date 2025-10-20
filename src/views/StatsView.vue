<template>
  <div class="stats">
    <h1>📊 Estadísticas de Partidas</h1>

    <div v-if="partidas.length > 0">
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Aciertos</th>
            <th>Tiempo (s)</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, index) in partidas" :key="index">
            <td>{{ p.usuario }}</td>
            <td>{{ p.aciertos }}</td>
            <td>{{ p.tiempo }}</td>
            <td>{{ p.fecha }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>No hay partidas registradas aún.</p>
    </div>

    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<script>
export default {
  name: 'StatsView',
  props: {
    partidas: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.stats {
  text-align: center;
}
table {
  margin: 1rem auto;
  border-collapse: collapse;
  width: 80%;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
