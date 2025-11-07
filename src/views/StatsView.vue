<template>
  <section class="stats-view">
    <h1>📊 Mis Estadísticas</h1>

    <!-- ✅ Si el usuario tiene partidas registradas -->
    <div v-if="usuarioActual && usuarioActual.partidas.length">
      <h2>Jugador: {{ usuarioActual.nombreUsuario }}</h2>

      <p><strong>Total de partidas:</strong> {{ usuarioActual.partidas.length }}</p>
      <p><strong>Promedio de aciertos:</strong> {{ promedioAciertos.toFixed(1) }}</p>
      <p><strong>Promedio de tiempo:</strong> {{ promedioTiempo.toFixed(1) }}s</p>
      <p><strong>Mejor puntaje:</strong> {{ mejorPuntaje.toFixed(2) }}</p>
      <p><strong>Posición global:</strong> {{ posicionRanking }}</p>

      <!-- 🆕 NUEVO: Tabla con el historial de partidas -->
      <h3>📜 Historial de partidas</h3>
      <table class="tabla">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Aciertos</th>
            <th>Tiempo (s)</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(partida, index) in partidasOrdenadas"
            :key="partida.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ partida.fechaInicio }}</td>
            <td>{{ partida.aciertos }}</td>
            <td>{{ partida.tiempoFinal }}</td>
            <td>{{ calcularPuntajeIncremental(partida).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ❌ Si no hay partidas -->
    <p v-else class="mensaje">No tienes partidas registradas aún, inicia sesion para ver tus estadisticas</p>
  </section>
</template>

<script>
export default {
  name: "StatsView",
  props: {
    usuarioActual: Object,
    usuarios: Array
  },

  computed: {
    promedioAciertos() {
      const total = this.usuarioActual.partidas.reduce(
        (sum, p) => sum + p.aciertos,
        0
      );
      return total / this.usuarioActual.partidas.length;
    },

    promedioTiempo() {
      const total = this.usuarioActual.partidas.reduce(
        (sum, p) => sum + p.tiempoFinal,
        0
      );
      return total / this.usuarioActual.partidas.length;
    },

    mejorPuntaje() {
      if (!this.usuarioActual.partidas.length) return 0;
      const calculados = this.usuarioActual.partidas.map((p) =>
        this.calcularPuntajeIncremental(p)
      );
      return Math.max(...calculados);
    },

    posicionRanking() {
      if (!this.usuarios?.length) return "-";
      const ranking = this.usuarios
        .map((u) => {
          const mejores = u.partidas.map((p) =>
            this.calcularPuntajeIncremental(p)
          );
          return {
            id: u.id,
            nombreUsuario: u.nombreUsuario,
            mejorPuntaje: Math.max(...mejores, 0)
          };
        })
        .sort((a, b) => b.mejorPuntaje - a.mejorPuntaje);

      const index = ranking.findIndex(
        (r) => r.id === this.usuarioActual.id
      );
      return index !== -1 ? index + 1 : "-";
    },

    // 🆕 Ordena las partidas más recientes primero
    partidasOrdenadas() {
      return [...this.usuarioActual.partidas].sort(
        (a, b) => b.id - a.id
      );
    }
  },

  methods: {
    // 🧮 Nueva fórmula incremental
    calcularPuntajeIncremental(partida) {
      const aciertos = partida.aciertos || 0;
      const tiempo = partida.tiempoFinal || 1;
      return (aciertos * 100) + ((100 * aciertos) / (tiempo + 1));
    }
  }
};
</script>

<style scoped>
.stats-view {
  background-color: #f7faff;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #0277bd;
  margin-bottom: 20px;
}

h2 {
  color: #01579b;
  margin-bottom: 10px;
}

p {
  margin: 6px 0;
  font-size: 1.1rem;
  color: #333;
}

/* 🆕 Estilo para la tabla del historial */
.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

th {
  background-color: #03a9f4;
  color: white;
  padding: 8px;
}

td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2faff;
}

.mensaje {
  color: #777;
  font-style: italic;
  margin-top: 20px;
}
</style>
