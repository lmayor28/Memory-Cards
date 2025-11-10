<template>
  <section class="stats-view">
    <h1>Mis Estadísticas</h1>

    <!-- ✅ Si el usuario tiene partidas registradas -->
    <div v-if="usuarioActual && usuarioActual.partidas.length">
      <div class="resumen-estadisticas">
      <h2>Jugador: {{ usuarioActual.nombreUsuario }}</h2>

      <p><strong>Total de partidas:</strong> {{ usuarioActual.partidas.length }}</p>
      <p><strong>Promedio de aciertos:</strong> {{ promedioAciertos.toFixed(1) }}</p>
      <p><strong>Promedio de tiempo:</strong> {{ promedioTiempo.toFixed(1) }}s</p>
      <p><strong>Mejor puntaje:</strong> {{ mejorPuntaje.toFixed(2) }}</p>
      <p><strong>Posición global:</strong> {{ posicionRanking }}</p>
        </div>
      <!-- 🆕 NUEVO: Tabla con el historial de partidas -->
       <div class="historial-partidas">
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
  background: linear-gradient(135deg, var(--celeste-primario), #e1f5fe);
  padding: 40px;
  max-width: 900px;
  margin: 40px auto 0;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: var(--celeste-oscuro);
  font-size: 2.2rem;
  margin-bottom: 25px;
}

h2 {
  color: #01579b;
  font-size: 1.6rem;
  margin-bottom: 15px;
}

h3 {
  color: #01579b;
  font-size: 1.3rem;
  margin-bottom: 12px;
  text-align: center;
}


.resumen-estadisticas {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.resumen-estadisticas p {
  margin: 6px 0;
  font-size: 1.05rem;
  color: #333;
}


.historial-partidas {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: left;
}


.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  border-radius: 10px;
  overflow: hidden;
}

th {
  background-color: var(--celeste-contraste);
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 1rem;
}

td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.95rem;
}

tr:nth-child(even) {
  background-color: #f7fbff;
}

tr:hover {
  background: #eaf7ff;
  transition: 0.15s ease;
}

.mensaje {
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: inline-block;
  margin-top: 25px;
  font-style: italic;
  color: #555;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


/* Responsive */

@media (max-width: 1024px) {
  .stats-view {
    padding: 30px;
    max-width: 95%;
  }

  h1 {
    font-size: 2rem;
  }

  .resumen-estadisticas,
  .historial-partidas {
    padding: 18px;
  }

  th, td {
    padding: 10px;
  }
}


@media (max-width: 768px) {
   .stats-view {
    padding: 30px;
    max-width: 95%;
  }

  h1 {
    font-size: 2rem;
  }

  .resumen-estadisticas,
  .historial-partidas {
    padding: 18px;
  }

  th, td {
    padding: 10px;
  }
}



@media (max-width: 500px) {
  .stats-view {
    padding: 20px;
    max-width: 98%;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  th, td {
    padding: 8px;
    font-size: 0.85rem;
  }

  .resumen-estadisticas p {
    font-size: 0.95rem;
  }

  .mensaje {
    font-size: 0.9rem;
  }
}


@media (max-width: 400px) {
  .stats-view {
    padding: 15px;
    max-width: 100%;
  }
  h1 {
    font-size: 1.4rem;
  }

  th, td {
    padding: 6px;
    font-size: 0.8rem;
  }
}

</style>
