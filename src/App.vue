<template>
     <CNavbar />
  <main>
    <router-view />
  </main>
    <CFooter />
</template>

<script>
import CNavbar from './components/CNavbar.vue';
import CFooter from './components/CFooter.vue';

export default {
  name: "App",
  components: { CNavbar, CFooter },

  data() {
    return {
      usuario: { nombre: "", apellido: "" },

      // Recupera cartas guardadas o crea una lista vacía
      cartas: JSON.parse(localStorage.getItem("cartas")) || [],

      // Plantilla base para nuevas cartas
      cartaTemplate: {
        id: null,
        nombre: "",
        descripcion: "",
        imagen: "",
        bocaArriba: true
      }
    }
  },

  methods: {
    guardarCartas() {
      localStorage.setItem("cartas", JSON.stringify(this.cartas));
    },

    agregarCarta(nuevaCarta) {
      const id = nuevaCarta.id ?? Date.now(); 
      const cartaFinal = { ...this.cartaTemplate, ...nuevaCarta, id };
      this.cartas.push(cartaFinal);
      this.guardarCartas(); 
    },

  
    eliminarCarta(idCarta) {
      this.cartas = this.cartas.filter(c => c.id !== idCarta);
      this.guardarCartas();
    },

    
    voltearCarta(idCarta) {
      const carta = this.cartas.find(c => c.id === idCarta);
      if (carta) {
        carta.bocaArriba = !carta.bocaArriba;
        this.guardarCartas(); 
      }
    }
  }
}
</script>



