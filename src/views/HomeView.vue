<template>
  <div class="anuciado">
    <div class="a-1">
      <h1>Memory <br>Card Game</h1>
      <p>
        ¡A ver quién puede encontrar todas las parejas primero! <br />
        ¿Te atreves a recordar dónde está todo para ganar?
      </p>

      <!-- 🧩 Botón con detección de sesión e invitado -->
      <button @click="jugar">Jugar</button>
    </div>

    <div class="a-2">
      <img src="../../public/img/imgcartas.png" alt="foto de cartas de memoria" />
    </div>
  </div>

<div class="explicacion">
  <h3>¿Cómo se juega?</h3>
  <p>
    Antes de comenzar, debes seleccionar al menos <strong>dos cartas</strong>. 
    Una vez elegidas, podrás iniciar la partida. 
    Si quieres una carta única y personalizada, puedes crearla desde 
    <router-link to="/agregar-carta">Agregar Cartas</router-link>.
  </p>

  <p>
    El objetivo del juego es <strong>encontrar las parejas de cartas</strong> 
    usando la <strong>menor cantidad de movimientos</strong> posible 
    y en el <strong>menor tiempo</strong>. 
    Durante la partida, las cartas se irán volteando cada vez que las selecciones, 
    y deberás memorizar su posición para formar las parejas correctas.
  </p>

  <p>
    Al finalizar, podrás consultar tus resultados y desempeño en 
    <router-link to="/estadisticas">Estadísticas</router-link>, 
    donde verás tus partidas y progreso, 
    y también revisar tus mejores logros en 
    <router-link to="/mejor-puntaje">Mejores Puntajes</router-link>.
  </p>
</div>

</template>

<script>
export default {
  name: 'HomeView',
  props: ['usuarioActual', 'cartas', 'usuarios'],
  emits: [
    'login-exitoso',
    'registrar-usuario',
    'agregar-carta',
    'eliminar-carta',
    'agregar-partida'
  ],

  methods: {
    /**
     * 🧩 Nueva lógica del botón “Jugar”
     * - Si hay usuario logueado, entra directamente al juego
     * - Si no hay usuario logueado, pregunta si quiere jugar como invitado
     *   → crea un usuario temporal “Invitado” que no guarda partidas
     *   → o redirige al login si cancela
     */
    jugar() {
      const usuario = localStorage.getItem('usuario')

      if (usuario) {
        // ✅ Usuario logueado: entra al juego directamente
        this.$router.push('/juego')
      } else {
        // ⚠️ No hay usuario, preguntar si quiere jugar como invitado
        const continuar = confirm(
          'Estás jugando como invitado. Tus puntajes no se guardarán. ¿Deseas continuar?'
        )

        if (continuar) {
          // Crea un usuario temporal invitado
          const invitado = {
            id: 'guest',
            nombreUsuario: 'Invitado',
            partidas: [],
            cartas: []
          }
          // Guarda temporalmente en localStorage
          localStorage.setItem('usuario', JSON.stringify(invitado))
          this.$router.push('/juego')
        } else {
          // Si cancela, lo mandamos al login
          this.$router.push('/iniciar-sesion')
        }
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
  border: 1px solid var(--celeste-oscuro, #255569);
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

@media (max-width: 480px){
  .anuciado h1 {
    font-size: 2.2em;
    width: 200px;
    margin-bottom: 10px;
  }
  .anuciado p {
    font-size: 1.1em;
    margin-top: 5px;
    margin-bottom: 10px;
}
.anuciado button {
    font-size: 1em;
    padding: 8px 30px;
}
.explicacion{
    padding: 20px 15px;
    border: 2px solid var(--celeste-oscuro, #255569);
  }
  .explicacion h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
    margin-top: 10px;
  }
  .explicacion p {
    font-size: 1.1em;
    margin-bottom: 10px;
  }
}
</style>
