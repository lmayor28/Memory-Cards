<template>
  <div class="login">
    <h1>🔐 Iniciar Sesión</h1>

    <form @submit.prevent="login">
      <input
        v-model="nombre"
        type="text"
        placeholder="Nombre de usuario"
        required
      />
      <button type="submit">Ingresar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

    <router-link to="/">Volver</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      nombre: '',
      error: '',
      mensaje: ''
    }
  },
  methods: {
    login() {
      // Validación de nombre
      if (this.nombre.trim().length < 3) {
        this.error = 'El nombre debe tener al menos 3 caracteres.'
        this.mensaje = ''
        return
      }

      // Guardar el usuario en localStorage
      localStorage.setItem('usuario', this.nombre)

      // Mostrar mensaje temporal de bienvenida
      this.error = ''
      this.mensaje = `¡Bienvenido, ${this.nombre}! Redirigiendo al inicio...`

      // Redirigir al Home luego de 1.5 segundos
      setTimeout(() => {
        this.$router.push('/')
      }, 1500)
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
  margin-top: 60px;
}

input {
  padding: 10px;
  margin: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  background-color: #03a9f4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
  background-color: #0288d1;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.mensaje {
  color: #0288d1;
  font-weight: bold;
  margin-top: 10px;
}
</style>
