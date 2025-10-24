<template>
  <section class="add-card-view">
    <h2>Crear nueva carta</h2>

    <form @submit.prevent="crearCarta">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          id="nombre"
          v-model.trim="nuevaCarta.nombre"
          type="text"
          placeholder="Ej: Carta del Sol"
          required
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          v-model.trim="nuevaCarta.descripcion"
          placeholder="Escribe una breve descripción..."
          rows="3"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="imagen">URL de imagen:</label>
        <input
          id="imagen"
          v-model.trim="nuevaCarta.imagen"
          type="url"
          placeholder="https://url-de-tu-imagen.png"
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">Crear carta</button>
        <button type="button" class="btn-delete" @click="eliminarTodo">Eliminar todas</button>
      </div>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </section>

  <button class="mis-C"><router-link to="/cartas">Ver mis cartas</router-link></button>
</template>

<script>
export default {
  name: "AddCardView",
  props: {
    cartas: Array
  },
  data() {
    return {
      nuevaCarta: {
        nombre: "",
        descripcion: "",
        imagen: ""
      },
      mensaje: ""
    };
  },
  methods: {
    crearCarta() {
      if (!this.nuevaCarta.nombre || !this.nuevaCarta.descripcion || !this.nuevaCarta.imagen) {
        this.mensaje = "Todos los campos son obligatorios.";
        return;
      }

      // Emitimos la carta hacia App.vue
      this.$emit("agregar-carta", { ...this.nuevaCarta });

      // Limpiamos el formulario
      this.nuevaCarta = { nombre: "", descripcion: "", imagen: "" };
      this.mensaje = "Carta creada exitosamente.";
      
      // Desaparece el mensaje luego de 3 segundos
      setTimeout(() => (this.mensaje = ""), 3000);
    },

    eliminarTodo() {
      if (this.cartas.length === 0) {
        this.mensaje = "No hay cartas para eliminar.";
        return;
      }

      // Elimina todas las cartas existentes
      this.cartas.forEach(c => this.$emit("eliminar-carta", c.id));
      this.mensaje = "Todas las cartas han sido eliminadas.";
      setTimeout(() => (this.mensaje = ""), 3000);
    }
  }
};
</script>

<style scoped>
.add-card-view {
  background-color: var(--celeste-primario);
  border: 1px solid var(--celeste-oscuro);
  padding: 20px;
  max-width: 700px;
  margin: 30px auto;
  border-radius: 15px;
  box-shadow: 0 8px 10px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  color: var(--celeste-oscuro);
  font-size: 2rem;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--celeste-oscuro);
}

input,
textarea {
  padding: 8px 10px;
  border: 1px solid #bde0fe;
  border-radius: 6px;
  font-size: 0.95rem;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #48cae4;
  box-shadow: 0 0 3px #48cae4;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}

.btn-primary {
  background-color: var(--celeste-contraste);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--celeste-oscuro);
}

.btn-delete {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-delete:hover {
  background-color: #ff4040;
}

.mensaje {
  text-align: center;
  margin-top: 18px;
  font-weight: 600;
  color: var(--celeste-oscuro);
}
.mis-C {
  margin: 20px auto;
  display: block;
  background-color: var(--celeste-contraste);
  padding: 10px 16px;
  margin-bottom: 60px;
  border: 1px solid var(--celeste-oscuro);
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.mis-C:hover {
  transition: background-color 0.3s ease;
  transform: scale(1.05);
}
.mis-C a {
  color: var(--blanco);
  text-decoration: none;
}
</style>
