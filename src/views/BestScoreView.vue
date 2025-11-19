<template>
  <section class="best-score">
    <h1>Mejores Puntajes</h1>

    <table v-if="topJugadores.length" class="tabla">
      <thead>
        <tr>
          <th>#</th>
          <th>Jugador</th>
          <th>Puntaje</th>
          <th>Cartas Jugadas</th>
          <th>Tiempo (s)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(jugador, index) in topJugadores" :key="jugador.id">
          <td>{{ index + 1 }}</td>
          <td>{{ jugador.nombreUsuario }}</td>
          <td>{{ (Number(jugador.mejorPuntaje) || 0).toFixed(2) }}</td>
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
      const partidas = this.usuarios.flatMap((u) =>
        (u.partidas || []).map((p) => ({
          id: u.id,
          nombreUsuario: u.nombreUsuario,
          ...p,
          mejorPuntaje: p.puntuacion
        }))
      );

      return partidas
        .sort((a, b) => b.mejorPuntaje - a.mejorPuntaje)
        .slice(0, 10);
    }
  },

};
</script>

<style scoped>
.best-score {
  text-align: center;
  padding: 30px;
  background-color: #f7faff;
}

h1 {
  text-align: center;
  color: var(--celeste-oscuro);
  font-size: 2.6rem;
  margin-bottom: 20px;
}
@media (max-width: 600px) {
  .best-score {
    padding: 15px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 15px;
  }
}

@media (max-width: 375px) {
  h1 {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }
  .tabla th,
  .tabla td {
    padding: 6px;
    font-size: 0.9rem;
  }
}
@media (max-width: 320px) {
  h1 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
  .tabla th,
  .tabla td {
    padding: 4px;
    font-size: 0.8rem;
  }
}


.tabla {
  margin: 0 auto;
  border-collapse: collapse;
  width: 98%;
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
