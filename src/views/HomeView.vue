<template>
  <div class="anuciado">
    <div class="a-1">
      <h1>Memory <br>Card Game</h1>
      <p>
        ¡A ver quién puede encontrar todas las parejas primero! <br />
        ¿Te atreves a recordar dónde está todo para ganar?
      </p>

      <!-- Botón con lógica de login antes de jugar -->
      <button @click="jugar">Jugar</button>
    </div>

    <div class="a-2">
      <img src="../../public/img/imgcartas.png" alt="foto de cartas de memoria" />
    </div>
  </div>

  <div class="explicacion">
    <h3>¿Cómo se Juega?</h3>
    <p>
      El objetivo es simple: encontrar la pareja de cada carta con la
      <strong>"mínima cantidad de movimientos"</strong> y en el
      <strong>"menor tiempo posible"</strong>.
    </p>
    <p>
      Una vez finalizada la partida, puedes revisar tus resultados en
      <router-link to="/estadisticas">Estadísticas</router-link> y verificar tu
      máxima puntuación en
      <router-link to="/mejor-puntaje">Mejor Puntuación</router-link>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    jugar() {
      const usuario = localStorage.getItem('usuario')
      if (usuario) {
        // Si hay usuario logueado, entra al juego
        this.$router.push('/juego')
      } else {
        // Si no hay usuario logueado, redirige al login
        this.$router.push('/iniciar-sesion')
      }
    }
  }
}
</script>

<style scoped>
:root {
  --celeste-primario: #b3e5fc;
  --blanco: #ffffff;
  --celeste-contraste: #03a9f4;
  --celeste-oscuro: #255569;
}

.anuciado {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 40px 0;
}
.anuciado h1 {
  font-size: 3.7em;
  margin-bottom: 10px;
  color: var(--celeste-oscuro, #255569);
}
.anuciado p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.anuciado button {
  display: inline-block;
  padding: 10px 40px;
  background-color: var(--celeste-contraste, #03a9f4);
  color: var(--blanco, #ffffff);
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.anuciado button:hover {
  transform: scale(1.05);
}

.a-1 {
  max-width: 500px;
}
.a-2 {
  max-width: 400px;
}
.a-2 img {
  width: 100%;
  height: auto;
}

.explicacion {
  max-width: 800px;
  margin: 30px auto 80px;
  text-align: center;
  padding: 25px 40px;
  background-color: var(--celeste-primario, #b3e5fc);
  border-radius: 30px;
  border: 4px solid var(--celeste-oscuro, #255569);
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}
.explicacion:hover {
  transform: scale(1.02);
}
.explicacion h3 {
  font-size: 2em;
  margin-bottom: 20px;
  color: var(--blanco, #ffffff);
  background-color: var(--celeste-contraste, #03a9f4);
  display: inline-block;
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.explicacion p {
  font-size: 1.2em;
  line-height: 1.6;
}
.explicacion a {
  color: var(--celeste-contraste, #03a9f4);
  font-weight: bold;
  text-decoration: none;
}
</style>
