<template>
  <div class="cards-view">
    <h1 class="title">Vista de las Cartas</h1>

  
    <p v-if="cartas.length === 0" class="empty-msg">
      No hay cartas aún. Agrega una desde <router-link to="/agregar-carta">Agregar Cartas</router-link>
    </p>

    
    <div class="cards-grid" v-else>
      <ObjectCard
        v-for="carta in cartas"
        :key="carta.id"
        :carta="carta"
        @eliminar="eliminarCarta"
      />
    </div>
  </div>
</template>

<script>
import ObjectCard from "@/components/ObjectCard.vue";

export default {
  name: "CardsView",
  components: { ObjectCard },

  data() {
    return {
      cartas: JSON.parse(localStorage.getItem("cartas")) || []
    };
  },

  methods: {
    eliminarCarta(idCarta) {
      this.cartas = this.cartas.filter(c => c.id !== idCarta);
      localStorage.setItem("cartas", JSON.stringify(this.cartas));
    }
  }
};
</script>

<style scoped>
.cards-view {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 2em;
  color: #1d3557;
  margin-bottom: 20px;
}

.empty-msg {
  font-style: italic;
  color: #777;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
}
a {
            color: var(--celeste-oscuro, #0288D1); 
            text-decoration: none;
            font-weight: 600; 
            padding: 0.5rem 1rem; 
            border-radius: 4px; 
            transition: background-color 0.3s ease, color 0.3s ease; 
        }

        a:hover {
            background-color: var(--celeste-contraste, #03A9F4); 
            color: var(--blanco, #FFFFFF); 
        }

        a.router-link-exact-active {
            background-color: var(--celeste-oscuro, #0288D1); 
            color: var(--blanco, #FFFFFF);
            box-shadow: inset 0 -3px 0 rgba(255, 255, 255, 0.8);
        }
</style>
