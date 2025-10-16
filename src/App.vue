<template>
  <header>
    <router-link to="/">Inicio</router-link>
    <router-link to="/juego">Jugar</router-link>
    <router-link to="/estadisticas">Estadísticas</router-link>
    <router-link to="/mejores-puntajes">Puntajes</router-link>
  </header>

  <main>
    <router-view />
  </main>

  <footer>
    <small>Memory Game © 2025</small>
  </footer>
</template>
