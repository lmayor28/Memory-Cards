<template>
  <div class="game">
    <h1>🧠 Juego de Memoria</h1>

    <!-- 🧩 PARTE Leonel — Mostrar usuario actual -->
    <p class="jugador">
      🧩 Jugador: <strong>{{ usuarioActual?.nombreUsuario || "Invitado" }}</strong>
    </p>

    <!-- 🧩 PARTE Leonel — Información del progreso -->
    <div class="info">
      <p><strong>Movimientos:</strong> {{ movimientos }}</p>
      <p><strong>Aciertos:</strong> {{ aciertos }}</p>
      <p><strong>Tiempo:</strong> {{ tiempo }}s</p>
    </div>

    <!-- 🧩 PARTE Leonel — Botón para finalizar manualmente -->
    <div v-if="!juegoTerminado" class="acciones">
      <button class="btn-finalizar" @click="finalizarPartidaManualmente">
        🏁 Finalizar partida
      </button>
    </div>

    <!-- 🃏 PARTE Rocio — Tablero del juego -->
    <div class="tablero">
      <p v-if="!cartasEnJuego.length" class="placeholder">
        🃏 Aquí irá el tablero de memoria (parte Rocío)
      </p>
      <!-- 🃏 EJEMPLO de cómo Rocío debe renderizar las cartas:
      <div
        v-for="(carta, index) in cartasEnJuego"
        :key="index"
        class="carta"
        @click="voltearCarta(carta)"
      >
        {{ carta.volteada || carta.acertada ? carta.icono : "❓" }}
      </div> -->
    </div>

    <!-- 🧩 PARTE Leonel — Resultado final -->
    <div v-if="juegoTerminado" class="resultado">
      <h2>🎉 ¡Partida finalizada!</h2>
      <p>Puntuación final: <strong>{{ puntuacionFinal }}</strong></p>
      <button class="btn-reiniciar" @click="reiniciarJuego">🔁 Jugar otra vez</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameView",

  // 🧩 Recibe el usuario actual desde App.vue
  props: {
    usuarioActual: {
      type: Object,
      default: null
    },
    cartas: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      // 🧩 PARTE Leonel — variables de control
      movimientos: 0,
      aciertos: 0,
      tiempo: 0,
      temporizador: null,
      juegoTerminado: false,
      puntuacionFinal: 0,

      // 🃏 PARTE Rocío — base de cartas
      cartasBase: [
        { icono: "🍎" },
        { icono: "🍌" },
        { icono: "🍒" },
        { icono: "🍇" },
        { icono: "🍓" },
        { icono: "🍉" }
      ],
      cartasEnJuego: [],
      cartaSeleccionada: null
    };
  },

  mounted() {
    this.iniciarJuego();
  },

  methods: {
    /* ==========================================================
      🧩 PARTE Leonel — lógica principal del juego
    ========================================================== */
    iniciarJuego() {
      // 🔹 Reinicia valores
      this.movimientos = 0;
      this.aciertos = 0;
      this.tiempo = 0;
      this.juegoTerminado = false;
      this.puntuacionFinal = 0;

      // 🔹 Reinicia temporizador
      clearInterval(this.temporizador);
      this.temporizador = setInterval(() => (this.tiempo++), 1000);

      // 🃏 Genera el tablero (si hay cartas del usuario)
      if (this.cartas && this.cartas.length > 0) {
        const duplicadas = [...this.cartas, ...this.cartas];
        this.cartasEnJuego = duplicadas.sort(() => Math.random() - 0.5);
      } else {
        // Si no hay cartas personalizadas, usar las base
        const duplicadas = [...this.cartasBase, ...this.cartasBase];
        this.cartasEnJuego = duplicadas.sort(() => Math.random() - 0.5);
      }
    },

    // 🔸 Terminar partida (automática o manual)
    terminarJuego() {
      clearInterval(this.temporizador);
      this.juegoTerminado = true;

      // Calcula puntuación
      this.puntuacionFinal = Math.max(0, 1000 - (this.movimientos * 10 + this.tiempo));

      // 🔹 Crea objeto partida
      const nuevaPartida = {
        id: Date.now(),
        puntuacion: this.puntuacionFinal,
        aciertos: this.aciertos,
        tiempoFinal: this.tiempo,
        fechaInicio: new Date().toLocaleDateString()
      };

      // 🔹 Envía la partida a App.vue
      this.$emit("agregar-partida", nuevaPartida);
    },

    // 🧩 Botón “Finalizar partida”
    finalizarPartidaManualmente() {
      if (confirm("¿Seguro que deseas finalizar la partida actual?")) {
        this.terminarJuego();
      }
    },

    reiniciarJuego() {
      this.iniciarJuego();
    },

    /* ==========================================================
      🃏 PARTE Rocío — lógica del tablero (a completar)
    ========================================================== */
    /*
    generarCartas() {
      // Duplica y mezcla las cartas (usará las personalizadas o base)
    },
    voltearCarta(carta) {
      // Manejar clicks, comparación y aciertos
      // Incrementar movimientos
      // Si gana: this.terminarJuego()
    }
    */
  }
};
</script>

<style scoped>
/* =======================
  🧩 PARTE Leonel — estilo base
   ======================= */
.game {
  text-align: center;
  margin-top: 40px;
  background-color: #f8fbff;
  border-radius: 12px;
  padding: 20px;
  max-width: 900px;
  margin-inline: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.jugador {
  font-size: 1.2rem;
  color: #255569;
  margin-bottom: 15px;
}

/* Info del juego */
.info {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 20px;
  background-color: #b3e5fc;
  border-radius: 10px;
  padding: 10px;
  color: #255569;
  font-weight: bold;
}

/* =======================
  🧩 Botones
   ======================= */
.acciones {
  margin-bottom: 15px;
}

.btn-finalizar {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s ease;
}
.btn-finalizar:hover {
  background-color: #d32f2f;
}

.btn-reiniciar {
  background-color: #03a9f4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s ease;
}
.btn-reiniciar:hover {
  background-color: #0277bd;
}

/* =======================
  🃏 PARTE Rocío — tablero
   ======================= */
.tablero {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 12px;
  justify-content: center;
  margin: 25px 0;
}

.placeholder {
  color: #666;
  font-style: italic;
}

.carta {
  background-color: #03a9f4;
  color: white;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 100px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;
}
.carta:hover {
  transform: scale(1.05);
}

/* =======================
  🧩 Resultado
   ======================= */
.resultado {
  margin-top: 30px;
  background-color: #b3e5fc;
  border-radius: 12px;
  padding: 20px;
  color: #255569;
  font-size: 1.2rem;
}
</style>
