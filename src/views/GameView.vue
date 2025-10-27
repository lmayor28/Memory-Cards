<template>
  <div class="game">
    <h1>🧠 Juego de Memoria</h1>

    <!-- 🧩 PARTE Leonel — Mostrar usuario actual -->
    <p class="jugador">
      🧩 Jugador: <strong>{{ usuarioActual?.nombreUsuario || 'Invitado' }}</strong>
    </p>

    <!-- 🧩 PARTE Leonel — Información del progreso -->
    <div class="info">
      <p><strong>Movimientos:</strong> {{ movimientos }}</p>
      <p><strong>Aciertos:</strong> {{ aciertos }}</p>
      <p><strong>Tiempo:</strong> {{ tiempo }}s</p>
    </div>

    <!-- 🧩 PARTE Leonel — Botón para finalizar manualmente -->
    <div v-if="!juegoTerminado" class="finalizar">
      <button @click="finalizarPartidaManualmente">🏁 Finalizar partida</button>
    </div>

    <!-- 🃏 PARTE Rocio — Tablero de cartas (a completar) -->
    <div v-if="!juegoTerminado" class="tablero">
      <ObjectCard
        v-for="(carta, index) in cartasEnJuego"
        :key="index"
        :carta="carta"
        :modoJuego="true"
        @voltear="voltearCarta"
      />

    </div>




    <!-- 🧩 PARTE Leonel — Resultado final -->
    <div v-if="juegoTerminado" class="resultado">
      <h2>🎉 ¡Partida finalizada!</h2>
      <p>Puntuación final: <strong>{{ puntuacionFinal }}</strong></p>
      <button @click="reiniciarJuego">🔁 Jugar otra vez</button>
    </div>
  </div>
</template>

<script>
import ObjectCard from "../components/ObjectCard.vue"; 
export default {
  name: "GameView",
  components: { ObjectCard },

  // 🧩 Recibe usuario actual desde App.vue
  props: {
    usuarioActual: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      // 🧩 Variables de la parte (Leonel)
      movimientos: 0,
      aciertos: 0,
      tiempo: 0,
      temporizador: null,
      juegoTerminado: false,
      puntuacionFinal: 0,

      // 🃏 Variables base que usará (Rocio)
      cartasEnJuego: [],
      primeraCarta: null,
      bloqueo: false
    };
  },

  mounted() {
    // 🧩 Inicializa el juego al cargar
    this.iniciarJuego();
  },

  methods: {
    /* ===========================================================
      🧩 PARTE Leonel — lógica (ya funcional)
    ============================================================ */
    iniciarJuego() {
      // 🔹 Reinicia contadores y estado
      this.movimientos = 0;
      this.aciertos = 0;
      this.juegoTerminado = false;
      this.puntuacionFinal = 0;
      this.tiempo = 0;

      // 🔹 Limpia el temporizador previo
      clearInterval(this.temporizador);

      // 🔹 Inicia el cronómetro
      this.temporizador = setInterval(() => {
        this.tiempo++;
      }, 1000);

      // 🃏 Rocio genera el tablero aquí
      const base = this.usuarioActual?.cartas || [];

      // Si no tiene cartas, lloramos un poco por dentro
      if (base.length < 2) return;

      // Duplicar y mezclar
      this.cartasEnJuego = [...base, ...base]
        .map(c => ({ ...c, volteada: false, acertada: false }))
        .sort(() => Math.random() - 0.5);
    },

    voltearCarta(carta) {
      if (this.bloqueo || carta.volteada || carta.acertada) return;

      carta.volteada = true;

      if (!this.primeraCarta) {
        this.primeraCarta = carta;
        return;
      }

      this.movimientos++;
      if (carta.id === this.primeraCarta.id) {
        carta.acertada = true;
        this.primeraCarta.acertada = true;
        this.aciertos++;
        this.primeraCarta = null;

        if (this.aciertos === this.cartasEnJuego.length / 2) {
          this.terminarJuego();
        }
      } else {
        this.bloqueo = true;
        setTimeout(() => {
          carta.volteada = false;
          this.primeraCarta.volteada = false;
          this.primeraCarta = null;
          this.bloqueo = false;
        }, 800);
      }
    },

    terminarJuego() {
      clearInterval(this.temporizador);
      this.juegoTerminado = true;

      // 🔹 Calcula la puntuación final
      this.puntuacionFinal = Math.max(0, 1000 - (this.movimientos * 10 + this.tiempo));

      // 🔹 Crea el objeto de la partida para guardar en App.vue
      const nuevaPartida = {
        id: Date.now(),
        puntuacion: this.puntuacionFinal,
        aciertos: this.aciertos,
        tiempoFinal: this.tiempo,
        fechaInicio: new Date().toLocaleDateString()
      };

      // 🔹 Envía la partida al componente principal
      this.$emit("agregar-partida", nuevaPartida);
    },

    // 🧩 NUEVO — Botón “Finalizar partida”
    finalizarPartidaManualmente() {
      if (confirm("¿Seguro que deseas finalizar la partida actual?")) {
        this.terminarJuego();
      }
    },

    reiniciarJuego() {
      this.iniciarJuego();
    },

    },
};
</script>

<style scoped>
.game {
  text-align: center;
  margin-top: 40px;
}

/* 🧩 PARTE Leonel — Información del jugador */
.info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

/* 🧩 Botón para finalizar manualmente */
.finalizar {
  margin-bottom: 15px;
}
.finalizar button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.finalizar button:hover {
  background-color: #d32f2f;
}

/* 🃏 PARTE Rocio — Zona del tablero */
.tablero {
  display: grid;
  grid-template-columns: repeat(6, 220px);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 60px;
}

/* 🧩 PARTE Leonel — Resultado */
.resultado {
  margin-top: 25px;
}
button {
  background-color: #03a9f4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  background-color: #0277bd;
}
</style>