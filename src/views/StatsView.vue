<template>
  <section class="stats-view">
    <h1>📊 Mis Estadísticas</h1>

    <div v-if="usuarioActual && usuarioActual.partidas.length">
      <h2>Jugador: {{ usuarioActual.nombreUsuario }}</h2>

      <p><strong>Total de partidas:</strong> {{ usuarioActual.partidas.length }}</p>
      <p><strong>Promedio de aciertos:</strong> {{ promedioAciertos.toFixed(1) }}</p>
      <p><strong>Promedio de tiempo:</strong> {{ promedioTiempo.toFixed(1) }}s</p>
      <p><strong>Mejor puntaje:</strong> {{ mejorPuntaje.toFixed(2) }}</p>
      <p><strong>Posición global:</strong> {{ posicionRanking }}</p>
    </div>

    <p v-else class="mensaje">No tienes partidas registradas aún.</p>
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

    // ✅ Mejor puntaje según la nueva fórmula incremental
    mejorPuntaje() {
      if (!this.usuarioActual.partidas.length) return 0;
      const calculados = this.usuarioActual.partidas.map((p) =>
        this.calcularPuntajeIncremental(p)
      );
      return Math.max(...calculados);
    },

    // ✅ Posición global en ranking general
    posicionRanking() {
      if (!this.usuarios?.length) return "-";

      // 🔹 Calcula ranking global usando la misma fórmula incremental
      const ranking = this.usuarios
        .map((u) => {
          const mejores = (u.partidas || []).map((p) =>
            this.calcularPuntajeIncremental(p)
          );
          return {
            id: u.id,
            nombreUsuario: u.nombreUsuario,
            mejorPuntaje: Math.max(...mejores, 0)
          };
        })
        .sort((a, b) => b.mejorPuntaje - a.mejorPuntaje);

      const index = ranking.findIndex((r) => r.id === this.usuarioActual.id);
      return index !== -1 ? index + 1 : "-";
    }
  },

  methods: {
    /**
     * 🧮 CAMBIO CLAVE → Fórmula incremental:
     *  (aciertos * 100) + (1000 / (tiempo + 1))
     *  👉 Premia aciertos y rapidez
     *  👉 No puede dar valores negativos
     */
    calcularPuntajeIncremental(partida) {
      const aciertos = partida.aciertos || 0;
      const tiempo = partida.tiempoFinal || 1;
      return (aciertos * 100) + (1000 / (tiempo + 1));
    }
  }
};
</script>

<style scoped>
.stats-view {
  background-color: #f7faff;
  padding: 30px;
  max-width: 600px;
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

.mensaje {
  color: #777;
  font-style: italic;
  margin-top: 20px;
}
</style>
