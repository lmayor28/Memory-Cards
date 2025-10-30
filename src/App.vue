<template>
  <CNavbar :usuario="usuarioActual" @cerrar-sesion="cerrarSesion" />
  <main>
    <router-view v-slot="{ Component }">
      <component
        :is="Component"


        :usuarioActual="usuarioActual"
        :cartas="cartas"
        :usuarios="allUsers"


        @login-exitoso="manejarLoginExitoso"
        @registrar-usuario="registrarNuevoUsuario"
        @agregar-carta="agregarCarta"
        @eliminar-carta="eliminarCarta"
        @agregar-partida="agregarPartida"
      />
    </router-view>
  </main>
  <CFooter />
</template>

<script>
import CFooter from './components/CFooter.vue'
import CNavbar from './components/CNavbar.vue';

export default {
  name: 'App',
  components: { CFooter, CNavbar },

  data() {
    return {
      // Plantillas
      cartaTemplate: { id: null, nombre: '', descripcion: '', imagen: '', isHide: true, isCopied: false },
      partidaTemplate: { id: null, puntuacion: 0, fechaInicio: '', tiempoFinal: '', aciertos: 0.0 },

      // Estado central
      usuarioActual: null,
      cartas: [],
    cartasBase:[
          { id: 1, nombre: 'Pikachu', descripcion: 'El ratón eléctrico más adorable y peligroso del planeta.', imagen: '../public/img/pikachu.webp', isHide: true, isCopied: false },
          { id: 2, nombre: 'Iron Man', descripcion: 'Genio, millonario, playboy y filántropo... con una armadura brillante.', imagen: '../public/img/IronMan.jpg', isHide: true, isCopied: false },
          { id: 3, nombre: 'Albus Dumbledore', descripcion: 'El director de Hogwarts y uno de los magos más poderosos de todos los tiempos.', imagen: '../public/img/Albus.jpg', isHide: true, isCopied: false },
          { id: 4, nombre: 'Legolas', descripcion: 'El elfo que nunca falla un disparo y siempre tiene el cabello perfecto.', imagen: '../public/img/Legolas.jpg', isHide: true, isCopied: false },
          { id: 5, nombre: 'Niffler', descripcion: 'Criatura adorable con una peligrosa obsesión por los objetos brillantes.', imagen: '../public/img/niffler.jpg', isHide: true, isCopied: false },
          { id: 6, nombre: 'Gandalf el Gris', descripcion: 'Hechicero milenario con una extraña afición a desaparecer cuando más se lo necesita.', imagen: '../public/img/gandalf.jpg', isHide: true, isCopied: false }
        ],
      allUsers: []
    }
  },

  methods: {
    // ===================================================
    // 🔹 Métodos de Persistencia
    // ===================================================
    guardarListaUsuarios() {
      localStorage.setItem('usuarios', JSON.stringify(this.allUsers));
    },
    cargarListaUsuarios() {
      this.allUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
    },
    guardarSesionUsuarioActual() {
      if (this.usuarioActual) {
        localStorage.setItem('usuario', JSON.stringify(this.usuarioActual));
      } else {
        localStorage.removeItem('usuario');
      }
    },
    cargarSesionUsuarioActual() {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
      if (usuarioGuardado) {
        this.usuarioActual = usuarioGuardado;

    const cartasExistentes = usuarioGuardado.cartas || [];
    const nuevasCartas = this.cartasBase.filter(
      c => !cartasExistentes.some(ec => ec.id === c.id)
    );
    this.cartas = [...cartasExistentes, ...nuevasCartas];

  } else {
    this.usuarioActual = null;
    if (this.cartas.length === 0) {
      this.cartas = [...this.cartasBase]; // array que definiste
    }
  }
},

    // ===================================================
    // 🔹 GESTIÓN DE ESTADO (Login/Registro/Logout)
    // ===================================================

    // Se llama cuando LoginView emite @login-exitoso
    manejarLoginExitoso(usuario) {
      // Lo busca en la lista interna por si acaso necesita actualizarse
      const userInList = this.allUsers.find(u => u.id === usuario.id);
      if (userInList) {
         // Asegura que usuarioActual es la versión más reciente de la lista
        this.usuarioActual = { ...userInList };
      } else {
         // Esto no debería pasar en login, pero por seguridad
        this.usuarioActual = usuario;
      }

      this.cartas = this.usuarioActual.cartas || [];
      this.guardarSesionUsuarioActual(); // Guarda solo la sesión activa

      // No es necesario guardar allUsers aquí, ya está actualizado

      this.$router.push('/');
    },

    // 🔸 NUEVO: Se llama cuando LoginView emite @registrar-usuario
    registrarNuevoUsuario(datosNuevoUsuario) {
       // Verificamos de nuevo por si acaso (aunque LoginView ya lo hizo)
      const existe = this.allUsers.find(
        (u) => u.nombreUsuario === datosNuevoUsuario.nombreUsuario || u.email === datosNuevoUsuario.email
      );
      if (existe) {
         // Podríamos manejar un error aquí si quisiéramos, pero LoginView ya lo hace
        console.error("Intento de registrar usuario duplicado manejado por App.vue");
        return; // No hacemos nada si ya existe
      }

       // Creamos el objeto completo del usuario
      const nuevoUsuario = {
        ...datosNuevoUsuario, // Datos del formulario
        id: Date.now(),
        cartas: [],
        partidas: []
      };

      this.allUsers.push(nuevoUsuario); // Lo añadimos a la lista interna
      this.guardarListaUsuarios();      // Guardamos la lista actualizada en localStorage

       // Iniciamos sesión automáticamente con el nuevo usuario
      this.manejarLoginExitoso(nuevoUsuario);
    },

    // Se llama desde CNavbar
    cerrarSesion() {
      this.usuarioActual = null;
      this.cartas = [];
      this.guardarSesionUsuarioActual(); // Limpia localStorage

      this.$router.push('/')
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        });
}
,

    // ===================================================
    // 🔹 GESTIÓN DE DATOS (Centralizada y Persistida)
    // ===================================================

    // Método interno para actualizar al usuario actual y persistir TODO
    actualizarYGuardarUsuarioActual() {
      if (!this.usuarioActual) return;

      // 1. Sincronizar 'cartas' locales con el objeto 'usuarioActual'
      this.usuarioActual.cartas = this.cartas;

      // 2. Actualizar la copia de este usuario en la lista 'allUsers'
      const userIndex = this.allUsers.findIndex(u => u.id === this.usuarioActual.id);
      if (userIndex !== -1) {
        // Usamos una copia para asegurar reactividad si fuera necesario
        this.allUsers[userIndex] = { ...this.usuarioActual };
      } else {
         // Esto sería raro, pero si no está en la lista, lo agregamos
        this.allUsers.push({ ...this.usuarioActual });
      }

      // 3. Persistir AMBOS: la sesión y la lista completa
      this.guardarSesionUsuarioActual();
      this.guardarListaUsuarios();
    },

    // Se llama cuando AddCardView emite @agregar-carta
    agregarCarta(nuevaCarta) {
      if (!this.usuarioActual) return;
      const id = nuevaCarta.id ?? Date.now();
      const cartaFinal = { ...this.cartaTemplate, ...nuevaCarta, id };
      this.cartas.push(cartaFinal); // Modifica estado local
      this.actualizarYGuardarUsuarioActual(); // Sincroniza y guarda todo
    },

    // Se llama cuando CardsView emite @eliminar-carta
    eliminarCarta(idCarta) {
      if (!this.usuarioActual) return;
      this.cartas = this.cartas.filter(c => c.id !== idCarta); // Modifica estado local
      this.actualizarYGuardarUsuarioActual(); // Sincroniza y guarda todo
    },

    // Se llama cuando GameView emite @agregar-partida
    agregarPartida(nuevaPartida) {
      if (!this.usuarioActual) return;
      const partidaConId = { ...this.partidaTemplate, ...nuevaPartida, id: Date.now() };

      if (!this.usuarioActual.partidas) {
        this.usuarioActual.partidas = [];
      }
      this.usuarioActual.partidas.push(partidaConId); // Modifica directo el objeto
      this.actualizarYGuardarUsuarioActual(); // Sincroniza y guarda todo
    },
  },

  mounted() {
    this.cargarListaUsuarios();         // Carga la lista completa de usuarios al iniciar
    this.cargarSesionUsuarioActual(); // Carga la sesión del usuario si existe
  }
}
</script>

<style scoped>
/* (Estilos se mantienen) */
</style>

<!-- Resumen de Eventos (@) y Payloads Esperados por App.vue

1. @login-exitosoEmitido por: LoginView.vue (cuando el login es correcto).Payload esperado: El objeto completo del usuario que ha iniciado sesión, tal como se encontró en la lista usuarios.Tipo: ObjectEjemplo:{
  "id": 1678886400000,
  "nombre": "Ana",
  "apellido": "Gomez",
  "nombreUsuario": "anag",
  "email": "ana@correo.com",
  "contraseña": "password456",
  "cartas": [ { "id": 1, "nombre": "Carta Sol", ... }, ... ],
  "partidas": [ { "id": 101, "puntuacion": 150, ... }, ... ]
}
2. @registrar-usuarioEmitido por: LoginView.vue (cuando se intenta registrar un nuevo usuario y no existe previamente).Payload esperado: Un objeto que contiene solo los datos del formulario necesarios para crear un nuevo usuario. App.vue se encargará de añadir el id, y los arrays vacíos cartas y partidas.Tipo: ObjectEjemplo:{
  "nombre": "Carlos",
  "apellido": "Ruiz",
  "nombreUsuario": "carlosr",
  "email": "carlos@correo.com",
  "contraseña": "password789"
}
3. @agregar-cartaEmitido por: AddCardView.vue (cuando se envía el formulario para añadir una nueva carta).Payload esperado: Un objeto con los datos de la nueva carta ingresados por el usuario. App.vue le asignará un id y completará la estructura si es necesario.Tipo: ObjectEjemplo:{
  "nombre": "Carta Luna",
  "descripcion": "Representa la noche.",
  "imagen": "[https://url-de-imagen.com/luna.png](https://url-de-imagen.com/luna.png)"
}
4. @eliminar-cartaEmitido por: CardsView.vue (generalmente, después de que ObjectCard.vue emita su propio evento de eliminar).Payload esperado: El ID de la carta que se desea eliminar.Tipo: Number o String (depende de cómo generes los IDs)Ejemplo: 1678886400123 o "carta-abc"5. @agregar-partidaEmitido por: GameView.vue (cuando una partida finaliza).Payload esperado: Un objeto con los detalles de la partida recién completada. App.vue le asignará un id.Tipo: ObjectEjemplo:{
  "usuario": "anag", // Informativo, App.vue lo asocia al usuarioActual
  "aciertos": 10,
  "tiempo": 95, // en segundos
  "fecha": "22/10/2025" // o el formato que uses
  // Podrías añadir "puntuacion" si la calculas en GameView
}
6. @cerrar-sesionEmitido por: CNavbar.vue (cuando el usuario hace clic en el botón de cerrar sesión).Payload esperado: Ninguno. El evento solo notifica la intención de cerrar sesión.Tipo: undefinedAl implementar las vistas, asegúrate de que $emit envíe exactamente estos datos para que App.vue pueda procesarlos correctamente. -->
