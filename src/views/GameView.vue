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
      <button class="btn-reiniciar" @click="reiniciarJuego">🔁 Jugar otra vez</button>
    </div>
  </div>
</template>

<script>
import ObjectCard from "../components/ObjectCard.vue"; 
export default {
  name: "GameView",
  components: { ObjectCard },

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

      // 🃏 Variables base que usará (Rocio)
      cartasEnJuego: [],
      primeraCarta: null,
      bloqueo: false
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

    },
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
  transition: 0.3s ease;
}
.btn-reiniciar:hover {
  background-color: #0277bd;
}
</style>
