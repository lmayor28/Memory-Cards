<template>
  <section class="cards-view">
    <div class="txtybtn">
    <h2>Mis Cartas</h2>
    <button><router-link to="/agregar-carta">Agregar Cartas</router-link></button>
    </div>
    <div class="botones-juego">
      <button @click="deseleccionarTodo">X</button>
      <button @click="seleccionarAleatorio(6)">6</button>
      <button @click="seleccionarAleatorio(12)">12</button>
      <button @click="seleccionarAleatorio(18)">18</button>
      <button @click="seleccionarAleatorio(24)">24</button>
      <button @click="seleccionarAleatorio('todas')">Seleccionar todas</button>
    </div>


    <p v-if="!cartas || cartas.length === 0" class="vacio">
      No hay cartas aún. Ve a "Agregar Cartas" para crear una.
    </p>

    <!-- Lista de cartas -->
    <div v-else class="cards-grid">
      <ObjectCard
        v-for="carta in cartas"
        :key="carta.id"
        :carta="carta"
        @eliminar="eliminarCarta"
        @click="verCarta(carta)"
        @toggle-seleccion="toggleSeleccion"
      />
    </div>

    <!-- Carta ampliada -->
    <div v-if="cartaSeleccionada" class="modal" @click.self="cerrarModal">
      <div class="modal-content">
        <img
          v-if="cartaSeleccionada.imagen"
          :src="cartaSeleccionada.imagen"
          alt="Carta completa"
          class="modal-img"
        />
        <h3>{{ cartaSeleccionada.nombre }}</h3>
        <p>{{ cartaSeleccionada.descripcion }}</p>
        <button class="btn-close" @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </section>
</template>

<script>
import ObjectCard from "@/components/ObjectCard.vue";

export default {
  name: "CardsView",
  components: { ObjectCard },
  props: {
    cartas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      cartaSeleccionada: null
    };
  },
  methods: {
    eliminarCarta(id) {
      this.$emit("eliminar-carta", id);
      if (this.cartaSeleccionada && this.cartaSeleccionada.id === id) {
        this.cerrarModal();
      }
    },
    verCarta(carta) {
      this.cartaSeleccionada = carta;
    },
    cerrarModal() {
      this.cartaSeleccionada = null;
    },
    toggleSeleccion(id) {
      const carta = this.cartas.find(c => c.id === id);
      carta.seleccionada = !carta.seleccionada;

      this.$emit("actualizar-seleccion", this.cartas);
    },
    seleccionarAleatorio(cantidad) {
      // 1. Deseleccionamos todas
      this.cartas.forEach(c => (c.seleccionada = false));

      // 2. Si pidió todas
      if (cantidad === 'todas') {
        this.cartas.forEach(c => (c.seleccionada = true));
      } else {
        // 3. Clonamos y mezclamos aleatoriamente
        let mezcladas = [...this.cartas].sort(() => Math.random() - 0.5);

        // 4. Tomamos las primeras X
        let elegidas = mezcladas.slice(0, cantidad);

        // 5. Las marcamos
        elegidas.forEach(c => (c.seleccionada = true));
      }

      // 6. Avisamos a App.vue (para guardar en localStorage)
      this.$emit("actualizar-seleccion", this.cartas);
    },

    deseleccionarTodo() {
      // Establece todo en false
      this.cartas.forEach(c => c.seleccionada = false);

      // Actualizamos en App.vue (localStorage)
      this.$emit("actualizar-seleccion", this.cartas);
    }



  }
};
</script>

<style scoped>
.cards-view {
  padding: 20px;
  background-color: #f7faff;
  min-height: calc(100vh - 160px);
  margin-top: 20px;
}

h2 {
  text-align: center;
  color: var(--celeste-oscuro);
  font-size: 2.6rem;
  margin-bottom: 16px;
}


.txtybtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.txtybtn button:hover {
  background-color: var(--celeste-oscuro);
  transition: background-color 0.3s ease;
  
}

.txtybtn h2 {
  margin: 0 auto;
}
.txtybtn a {
  color: var(--blanco);
  text-decoration: none;
  font-weight: 600;
}
.txtybtn button {
  background-color: var(--celeste-contraste);
  color: var(--blanco);
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.vacio {
  text-align: center;
  color: #666;
  font-style: italic;
  margin-top: 20px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  justify-items: center;
  padding: 10px;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  
}

.modal-content {
  padding: 20px;
  border-radius: 14px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  background-color: var(--blanco);
  border: 10px solid var(--celeste-primario);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
}

.modal-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-bottom: 12px;
  border-bottom: 10px solid var(--celeste-primario);
}

.modal-content h3 {
  color: #0077b6;
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.modal-content p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 14px;
}

.btn-close {
  background-color: #0077b6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  position: absolute; 
  top: 6px; 
   right: 6px; 
}

.btn-close:hover {
  background-color: #023e8a;
}

.btn-select {
  margin-top: 5px;
  background-color: #b0bec5;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}


.btn-select.activa {
  background-color: #0077b6;
}

.botones-juego{
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.botones-juego button{
 background-color: var(--celeste-contraste);
  color: var(--blanco);
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.botones-juego button:hover {
  background-color: var(--celeste-oscuro);
  transition: background-color 0.3s ease;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
}
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
</style>
