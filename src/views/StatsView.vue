<template>
  <div class="stats">
    <h1>📊 Estadísticas</h1>

    <div v-if="!usuarioActual">
      <p>🔒 Inicia sesión para ver tus estadísticas.</p>
      <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
    </div>

    <div v-else>
      <p>Jugador: <strong>{{ usuarioActual.nombreUsuario }}</strong></p>

      <table v-if="usuarioActual.partidas?.length">
        <thead>
          <tr>
            <th>#</th>
            <th>Puntuación</th>
            <th>Aciertos</th>
            <th>Tiempo (seg)</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(partida, index) in usuarioActual.partidas" :key="partida.id">
            <td>{{ index + 1 }}</td>
            <td>{{ partida.puntuacion }}</td>
            <td>{{ partida.aciertos }}</td>
            <td>{{ partida.tiempoFinal }}</td>
            <td>{{ partida.fechaInicio }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else>😅 No hay partidas registradas aún.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatsView",
  props: {
    usuarioActual: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.stats {
  width: 85%;
  margin: 40px auto;
  text-align: center;
  background-color: #e1f5fe;
  padding: 25px;
  border-radius: 20px;
}
table {
  margin: 20px auto;
  border-collapse: collapse;
  width: 90%;
}
th, td {
  border: 1px solid #0288d1;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #03a9f4;
  color: white;
}
</style>
