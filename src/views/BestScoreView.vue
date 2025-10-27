<template>
  <section class="best-score">
    <h1>🏆 Mejores Puntajes</h1>

    <table v-if="topJugadores.length" class="tabla">
      <thead>
        <tr>
          <th>#</th>
          <th>Jugador</th>
          <th>Puntaje</th>
          <th>Aciertos</th>
          <th>Tiempo (s)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(jugador, index) in topJugadores" :key="jugador.id">
          <td>{{ index + 1 }}</td>
          <td>{{ jugador.nombreUsuario }}</td>
          <td>{{ jugador.mejorPuntaje.toFixed(2) }}</td>
          <td>{{ jugador.aciertos }}</td>
          <td>{{ jugador.tiempoFinal }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="mensaje">Aún no hay partidas registradas.</p>
  </section>
</template>

<script>
export default {
  name: "BestScoreView",

  props: {
    usuarios: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    topJugadores() {
      // 🔹 Extrae las partidas de todos los usuarios
      const partidas = this.usuarios.flatMap((u) =>
        (u.partidas || []).map((p) => ({
          id: u.id,
          nombreUsuario: u.nombreUsuario,
          ...p,
          mejorPuntaje: this.calcularPuntajePersonalizado(p)
        }))
      );

      // 🔹 Ordena los jugadores por puntaje descendente
      const ordenadas = partidas
        .sort((a, b) => b.mejorPuntaje - a.mejorPuntaje)
        .slice(0, 10); // solo top 10

      return ordenadas;
    }
  },

  methods: {
    /**
     * 🧮 Calcula el puntaje personalizado:
     *  (puntuacionInicial * aciertos) / tiempo
     *  - Aciertos altos => más puntos
     *  - Tiempo bajo => más puntos
     */
    calcularPuntajePersonalizado(partida) {
      const base = partida.puntuacion || 1000;
      const aciertos = partida.aciertos || 1;
      const tiempo = partida.tiempoFinal || 1;
      return (base * aciertos) / tiempo;
    }
  }
};
</script>

<style scoped>
.best-score {
  text-align: center;
  padding: 30px;
  background-color: #f7faff;
}

h1 {
  color: #0277bd;
  margin-bottom: 20px;
}

.tabla {
  margin: 0 auto;
  border-collapse: collapse;
  width: 90%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

th {
  background-color: #03a9f4;
  color: white;
  padding: 10px;
}

td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

tr:nth-child(even) {
  background-color: #f1faff;
}

.mensaje {
  color: #555;
  font-style: italic;
  margin-top: 20px;
}
</style>
