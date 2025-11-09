<template>
  <div class="game">
    <h1>🧠 Juego de Memoria</h1>

    <!-- 🧩 Mostrar usuario actual -->
    <p class="jugador">
      🧩 Jugador: <strong>{{ usuarioActual?.nombreUsuario || "Invitado" }}</strong>
    </p>

    <!-- 🧩 Información del progreso -->
    <div class="info">
      <p><strong>Movimientos:</strong> {{ movimientos }}</p>
      <p><strong>Aciertos:</strong> {{ aciertos }}</p>
      <p><strong>Tiempo:</strong> {{ tiempo }}s</p>
    </div>

    <!-- 🧩 Botón para finalizar manualmente -->
    <div v-if="!juegoTerminado" class="acciones">
      <button class="btn-finalizar" @click="finalizarPartidaManualmente">
        🏁 Finalizar partida
      </button>
    </div>

    <!-- 🃏 Tablero de cartas -->
    <div v-if="!juegoTerminado" class="tablero">
      <ObjectCard
        v-for="(carta, index) in cartasEnJuego"
        :key="index"
        :carta="carta"
        :modoJuego="true"
        @voltear="voltearCarta"
      />
    </div>

    <!-- 🧩 Resultado final -->
    <div v-if="juegoTerminado" class="resultado">
      <h2>🎉 ¡Partida finalizada!</h2>
      <p>Puntuación final: <strong>{{ puntuacionFinal.toFixed(2) }}</strong></p>
      <button class="btn-reiniciar" @click="reiniciarJuego">🔁 Jugar otra vez</button>
    </div>
  </div>
</template>

<script>
import ObjectCard from "../components/ObjectCard.vue";

export default {
  name: "GameView",
  components: { ObjectCard },

  props: {
    usuarioActual: Object,
    cartas: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      movimientos: 0,
      aciertos: 0,
      tiempo: 0,
      temporizador: null,
      juegoTerminado: false,
      puntuacionFinal: 0,

      cartasEnJuego: [],
      primeraCarta: null,
      bloqueo: false
    };
  },

  mounted() {
    this.iniciarJuego();
  },

  methods: {
    /* =======================================================
      🧩 Inicializa el juego
    ======================================================= */
    iniciarJuego() {
      this.movimientos = 0;
      this.aciertos = 0;
      this.tiempo = 0;
      this.juegoTerminado = false;
      this.puntuacionFinal = 0;

      clearInterval(this.temporizador);
      this.temporizador = setInterval(() => this.tiempo++, 1000);

      const base = (this.cartas || []).filter(c => c.seleccionada);
      if (base.length < 2){
        alert("Selecciona al menos 2 cartas para jugar.");
        this.$router.push("/cartas");
        return;
      }

      // Duplicar y mezclar cartas
      this.cartasEnJuego = [...base, ...base]
        .map(c => ({ ...c, volteada: false, acertada: false }))
        .sort(() => Math.random() - 0.5);
    },

    /* =======================================================
      🧩 Lógica de volteo de cartas
    ======================================================= */
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

    /* =======================================================
      🧩 Finaliza el juego (manual o automático)
    ======================================================= */
    terminarJuego() {
      clearInterval(this.temporizador);
      this.juegoTerminado = true;

      // 🧮 Nueva fórmula de puntuación incremental:
      // más aciertos → más puntos / menos tiempo → más puntos
      this.puntuacionFinal =
        (this.aciertos * 100) + ((100 * this.aciertos) / (this.tiempo + 1));

      const nuevaPartida = {
        id: Date.now(),
        puntuacion: this.puntuacionFinal,
        aciertos: this.aciertos,
        tiempoFinal: this.tiempo,
        fechaInicio: new Date().toLocaleDateString()
      };

      // 🧩 Si el jugador es "Invitado", no guardar la partida
      if (this.usuarioActual?.id === "guest" || !this.usuarioActual) {
        alert("⚠️ Eres un invitado. Tus puntajes no se guardarán.");
        return;
      }

      // 🧩 Enviar la partida al componente principal (App.vue)
      this.$emit("agregar-partida", nuevaPartida);
    },

    /* =======================================================
      🧩 Botón para finalizar manualmente
    ======================================================= */
    finalizarPartidaManualmente() {
      if (confirm("¿Seguro que deseas finalizar la partida actual?")) {
        this.terminarJuego();
      }
    },

    reiniciarJuego() {
      this.iniciarJuego();
    }
  }
};
</script>

<style scoped>
.game {
  text-align: center;
  margin-top: 40px;
  background-color: #f8fbff;
  border-radius: 12px;
  padding: 20px;
  max-width: 1200px;
  width: 95%;
  margin-inline: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.jugador {
  font-size: 1.2rem;
  color: #255569;
  margin-bottom: 15px;
}

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

.tablero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  justify-items: center;
  margin-top: 20px;
  margin-bottom: 60px;
}

.resultado {
  margin-top: 25px;
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

@media (max-width: 1024px) {
    .tablero {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      padding: 10px;
      gap: 10px;
    }
}
@media (max-width: 768px) {
  .tablero {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }
    
}
@media (max-width: 600px) {
  .tablero {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 6px; 
  }
}
</style>
