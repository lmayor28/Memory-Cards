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

    <!-- 🃏 PARTE Rocio — Tablero de cartas (a completar) -->
    <div class="tablero">
      <!-- 🃏 generar las cartas dinámicamente con v-for -->
      <!-- Ejemplo: v-for="(carta, index) in cartasEnJuego" -->
      <!-- y manejar los clics para voltear cartas -->
      <!-- De momento mostramos un placeholder -->
      <p>🃏 Aquí va el tablero de memoria (parte Rocio)</p>
    </div>

    <!-- 🧩 PARTE Leonel — Resultado final -->
    <div v-if="juegoTerminado" class="resultado">
      <h2>🎉 ¡Ganaste!</h2>
      <p>Puntuación final: <strong>{{ puntuacionFinal }}</strong></p>
      <button @click="reiniciarJuego">🔁 Jugar otra vez</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameView",

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
      cartasBase: [
        { icono: "🍎" },
        { icono: "🍌" },
        { icono: "🍒" },
        { icono: "🍇" },
        { icono: "🍓" },
        { icono: "🍉" }
      ],
      cartasEnJuego: [], // Rocio generará las cartas duplicadas y mezcladas
      cartaSeleccionada: null // Rocio controlará la carta en juego
    };
  },

  mounted() {
    // 🧩 Inicializa el juego al cargar
    this.iniciarJuego();
  },

  methods: {
    /* ===========================================================
      🧩 PARTE Leonel —  lógica (ya funcional)
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
      // usando `this.generarCartas()` (función que debes crear)
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

    reiniciarJuego() {
      this.iniciarJuego();
    },

    /* ===========================================================
      🃏 PARTE Rocio — completará la lógica del tablero
    ============================================================ */
    // 👉 Sugerencia: funciones que debes implementar:
    // generarCartas(): duplicar y mezclar las cartas
    // voltearCarta(carta): manejar la lógica de comparación y aciertos
    // verificarVictoria(): llamar a this.terminarJuego() cuando todas coincidan

    // Ejemplo de estructura esperada:
    /*
    generarCartas() {
      this.cartasEnJuego = [...this.cartasBase, ...this.cartasBase]
        .sort(() => Math.random() - 0.5)
        .map(c => ({ ...c, volteada: false, acertada: false }));
    },
    voltearCarta(carta) {
      // Manejar lógica de selección, comparación y aciertos
      // Actualizar this.movimientos y this.aciertos
      // Si gana, llamar a this.terminarJuego()
    }
    */
  }
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

/* 🃏 PARTE Rocio — Zona del tablero */
.tablero {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
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
