<template>
  <div
    class="card"
    @click="handleClick"
    :modo-juego="modoJuego"
  >
    <!-- MODO JUEGO: muestra reverso o cara según carta.volteada/acertada -->
    <div v-if="modoJuego">

  <!-- FRENTE (cuando está volteada) -->
  <div v-if="carta.volteada || carta.acertada" class="card-front">
    <img :src="carta.imagen" alt="Carta" class="card-img" />
    <h3 class="card-title">{{ carta.nombre || 'Sin nombre' }}</h3>
    <p class="card-desc">{{ carta.descripcion || 'Sin descripción' }}</p>
  </div>

  <!-- REVERSO -->
  <div v-else class="card-back">
    <img :src="reversoSrc" alt="Reverso" class="reverso-img" />
  </div>

</div>


    <!-- MODO COLECCIÓN / CARDS VIEW: info y botón eliminar -->
    <div v-else>
      <img
        v-if="carta.imagen"
        :src="carta.imagen"
        alt="Imagen de carta"
        class="card-img"
      />
      <div class="card-body">
        <h3 class="card-title">{{ carta.nombre || 'Carta sin nombre' }}</h3>
        <p class="card-desc">{{ carta.descripcion || 'Sin descripción disponible.' }}</p>
        <button
          v-if="$route.name === 'cards'"
          class="btn-delete"
          @click.stop="$emit('eliminar', carta.id)"
        >X</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ObjectCard",
  props: {
    carta: { type: Object, required: true },
    modoJuego: { type: Boolean, default: false },
    reverso: { type: String, default: null } // opcional: ruta personalizada desde el padre
  },
  computed: {
    reversoSrc() {
      return this.reverso || "/img/reverso.jpg" ;
    }
  },
  methods: {
    handleClick() {
      if (this.modoJuego) {
        this.$emit('voltear', this.carta);
      }
    }
  }
}
</script>

<style scoped>


.card {
  background-color: var(--blanco);
  border: 3px solid var(--celeste-primario);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 220px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
}



.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}


.card-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 3px solid var(--celeste-primario);
}
.reverso-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.card-back, .reverso-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 10px 14px;
  text-align: center;
}

.card-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #0077b6;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 10px;
}

.btn-delete {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s ease;
  position: absolute;
  top: 6px;
  right: 6px;
}
.btn-delete:hover { background-color: #ff4040; }

/* Tamaño especial solo para modo juego */
.card[modo-juego="true"] {
  width: 170px;
  height: 270px;
}

.card[modo-juego="true"] .card-img {
  height: 140px;
}

.card[modo-juego="true"] .card-title {
  font-size: 1rem;
}

.card[modo-juego="true"] .card-desc {
  font-size: 0.9rem;
}
.card[modo-juego="true"] .card-title{
  margin-top: 2px;
  margin-bottom: 2px;
}



</style>
