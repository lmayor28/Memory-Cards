<template>
  <div class="login">
    <h1>🔐 Iniciar Sesión / Registrarse</h1>

    <form @submit.prevent="manejarUsuario">
      <!-- Campos de datos -->
      <input v-model="usuario.nombreUsuario" type="text" placeholder="Nombre de usuario" required />
      <input v-model="usuario.contraseña" type="password" placeholder="Contraseña" required />

      <!-- Campos extra solo al registrarse -->
      <div v-if="modoRegistro">
        <input v-model="usuario.nombre" type="text" placeholder="Nombre" />
        <input v-model="usuario.apellido" type="text" placeholder="Apellido" />
        <input v-model="usuario.email" type="email" placeholder="Correo electrónico" />
      </div>

      <!-- Botón principal -->
      <button type="submit">
        {{ modoRegistro ? "Registrar usuario" : "Iniciar sesión" }}
      </button>
    </form>

    <!-- Botón para cambiar modo -->
    <p>
      <button class="modo-btn" @click="modoRegistro = !modoRegistro">
        Cambiar a {{ modoRegistro ? "Iniciar Sesión" : "Registrarse" }}
      </button>
    </p>

    <!-- Mensajes -->
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <router-link to="/">Volver</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginView',

  data() {
    return {
      usuario: {
        id: Date.now(),
        nombre: '',
        apellido: '',
        nombreUsuario: '',
        email: '',
        contraseña: '',
        cartas: [],
        partidas: []
      },
      modoRegistro: false, // false = login / true = registro
      mensaje: '',
      error: ''
    }
  },

  methods: {
    manejarUsuario() {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

      // =========================================================
      // 🔹 MODO LOGIN
      // =========================================================
      if (!this.modoRegistro) {
        const user = usuarios.find(u => u.nombreUsuario === this.usuario.nombreUsuario)

        if (!user) {
          this.error = 'Usuario no encontrado. Cambia a "Registrarse".'
          this.mensaje = ''
          return
        }

        if (user.contraseña !== this.usuario.contraseña) {
          this.error = 'Contraseña incorrecta.'
          this.mensaje = ''
          return
        }

        // ✅ Iniciar sesión
        this.error = ''
        this.mensaje = `¡Bienvenido de nuevo, ${user.nombreUsuario}!`

        // 🟩 Nuevo: Emitimos el evento hacia App.vue
        this.$emit('login-exitoso', user)

        // Navegar al inicio
        this.$router.push('/')
        return
      }

      // =========================================================
      // 🔹 MODO REGISTRO
      // =========================================================
      if (
        !this.usuario.nombre ||
        !this.usuario.apellido ||
        !this.usuario.email ||
        !this.usuario.nombreUsuario ||
        !this.usuario.contraseña
      ) {
        this.error = 'Por favor completa todos los campos.'
        this.mensaje = ''
        return
      }

      // Verifica si el usuario o correo ya existen
      const existe = usuarios.find(
        (u) =>
          u.nombreUsuario === this.usuario.nombreUsuario ||
          u.email === this.usuario.email
      )

      if (existe) {
        this.error = 'El usuario o correo ya están registrados.'
        this.mensaje = ''
        return
      }

      // 🆕 Crear un nuevo usuario con estructura completa
      const nuevoUsuario = {
        ...this.usuario,
        id: Date.now(),
        cartas: [],
        partidas: []
      }

      // 🟩 Nuevo: Emitimos el evento hacia App.vue
      this.$emit('registrar-usuario', nuevoUsuario)

      this.error = ''
      this.mensaje = `¡Cuenta creada exitosamente! Bienvenido, ${nuevoUsuario.nombreUsuario}`

      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
  margin-top: 60px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 260px;
  font-size: 1em;
}

button {
  background-color: #03a9f4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0288d1;
}

.modo-btn {
  background-color: transparent;
  color: #0288d1;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
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
