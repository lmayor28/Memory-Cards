<template>
  <div class="card">
    <img 
      :src="carta.imagen || 'https://via.placeholder.com/150'" 
      :alt="carta.nombre || 'Carta sin nombre'" 
      class="card-image"
    />
    <div class="card-info">
      <p class="card-name">{{ carta.nombre || 'Sin nombre' }}</p>

      <button 
        v-if="$route.name === 'CardsView'" 
        @click="$emit('eliminar', carta.id)"
        class="delete-btn"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ObjectCard",
  props: {
    carta: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 10px;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.25);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-info {
  padding: 10px;
  text-align: center;
}

.card-name {
  font-size: 1.1em;
  font-weight: 600;
  color: #333;
  margin: 5px 0 10px 0;
}

.delete-btn {
  background-color: #e63946;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.delete-btn:hover {
  background-color: #c51f2b;
  transform: scale(1.05);
}
</style>
