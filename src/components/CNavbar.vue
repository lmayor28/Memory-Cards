<template>
  <nav class="navbar">
    <!-- 🔹 Enlaces principales -->
      <button class="hamburger" @click="menuAbierto = !menuAbierto">
      ☰
    </button> 

    <div class="links" :class="{ abierto: menuAbierto }">
      <router-link to="/">Inicio</router-link>
      <router-link to="/juego">Jugar</router-link>
      <router-link to="/cartas">Cartas</router-link>
      <router-link to="/estadisticas">Estadísticas</router-link>
      <router-link to="/mejor-puntaje">Mejores Puntajes</router-link>
      <router-link to="/agregar-carta">Agregar Cartas</router-link>
    </div>

    <!-- 🔹 Estado del usuario -->
    <div class="user-section">
      <!-- Si hay usuario logueado -->
      <template v-if="usuario">
        <div class="usuario-info">
          <span class="admin">👤 {{ usuario.nombreUsuario }}</span>

          <!-- 🎮 Si se usa un hijo activo (futuro) -->
          <template v-if="usuarioHijoActivo">
            <span class="flecha">→</span>
            <span class="hijo">🎮 {{ usuarioHijoActivo.nombreUsuario }}</span>
          </template>
        </div>

        <button class="logout" @click="$emit('cerrar-sesion')">Cerrar sesión</button>
      </template>

      <!-- Si no hay sesión activa -->
      <template v-else>
        <router-link to="/iniciar-sesion" class="login-btn">Iniciar sesión</router-link>
      </template>
    </div>
  </nav>
</template>  

<script>
export default {
  name: 'CNavbar',
  data() {
    return { menuAbierto: false };
  },
  props: {
    // 🧑 Usuario actual (pasado desde App.vue)
    usuario: {
      type: Object,
      default: null
    },
    // 👶 (Opcional) Usuario hijo activo
    usuarioHijoActivo: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
:root {
  --celeste-primario: #b3e5fc;
  --blanco: #ffffff;
  --celeste-contraste: #03a9f4;
  --rojo: #ff6b6b;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--celeste-primario);
  padding: 1rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.1);
}

.links {
  display: flex;
  gap: 0.5rem;
}

a {
  color: var(--celeste-contraste);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

a:hover {
  background-color: var(--celeste-contraste);
  color: var(--blanco);
}

a.router-link-exact-active {
  background-color: var(--celeste-contraste);
  color: var(--blanco);
  box-shadow: inset 0 -3px 0 rgba(255, 255, 255, 0.8);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.usuario-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
}

.admin {
  color: #01579b;
}

.hijo {
  color: #0277bd;
}

.flecha {
  color: #555;
}

.logout {
  background-color: var(--rojo);
  color: var(--blanco);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
}

.logout:hover {
  background-color: #ff4040;
}

.login-btn {
  background-color: var(--celeste-contraste);
  color: var(--blanco);
  padding: 6px 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.login-btn:hover {
  background-color: #0277bd;
}



.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
}


@media (max-width: 768px) {
  .hamburger {
    display: block;
    
  }

  .links {
    flex-direction: column;
    gap: 0;
    max-height: 0; 
    overflow: hidden;
    width: 100%;
  }

  .links.abierto {
    max-height: 500px;
  }

  a {
    padding: 0.8rem 1rem;
    display: block;
  }

  .user-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
