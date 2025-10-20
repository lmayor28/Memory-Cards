<template>
  <div class="login">
    <h1>🔐 Iniciar Sesión</h1>

    <form @submit.prevent="login">
      <input v-model="nombre" type="text" placeholder="Nombre de usuario" required />
      <button type="submit">Ingresar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <router-link to="/">Volver</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      nombre: '',
      error: ''
    }
  },
  methods: {
    login() {
      if (this.nombre.trim().length < 3) {
        this.error = 'El nombre debe tener al menos 3 caracteres.'
        return
      }

      localStorage.setItem('usuario', this.nombre)
      this.$router.push('/juego')
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
}
input {
  padding: 10px;
  margin: 10px;
}
.error {
  color: red;
}
</style>
