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
        @actualizar-seleccion="actualizarSeleccionCartas"

      />
    </router-view>
  </main>
  <CFooter v-if="$route.name !== 'game'"/>
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


      usuarioActual: null,
      cartas: [],
    cartasBase:[
          { id: 1, nombre: 'Pikachu', descripcion: 'El ratón eléctrico más adorable y peligroso del planeta.', imagen: 'img/pikachu.webp', isHide: true, isCopied: false },
          { id: 2, nombre: 'Iron Man', descripcion: 'Genio, millonario, playboy y filántropo... con una armadura brillante.', imagen: '/img/IronMan.jpg', isHide: true, isCopied: false },
          { id: 3, nombre: 'Albus Dumbledore', descripcion: 'El director de Hogwarts y uno de los magos más poderosos de todos los tiempos.', imagen: '/img/Albus.jpg', isHide: true, isCopied: false },
          { id: 4, nombre: 'Legolas', descripcion: 'El elfo que nunca falla un disparo y siempre tiene el cabello perfecto.', imagen: '/img/Legolas.jpg', isHide: true, isCopied: false },
          { id: 5, nombre: 'Niffler', descripcion: 'Criatura adorable con una peligrosa obsesión por los objetos brillantes.', imagen: '/img/niffler.jpg', isHide: true, isCopied: false },
          { id: 6, nombre: 'Gandalf el Gris', descripcion: 'Hechicero milenario con una extraña afición a desaparecer cuando más se lo necesita.', imagen: '/img/gandalf.jpg', isHide: true, isCopied: false }
        ],
        kits: [
                      {
                        categoria: 'Personajes de Marvel',
                        cartas: [
                          { id: 7, nombre: 'Spider-Man', descripcion: 'El vecino amigable de Nueva York.', imagen: '/img/spiderman.jpg', isHide: true, isCopied: false },
                          { id: 8, nombre: 'Thor', descripcion: 'Dios del trueno con un martillo temperamental.', imagen: '/img/thor.jpg', isHide: true, isCopied: false },
                          { id: 9, nombre: 'Hulk', descripcion: 'Científico con problemas de manejo de ira.', imagen: '/img/hulk.jpg', isHide: true, isCopied: false },
                          { id: 10, nombre: 'Black Widow', descripcion: 'Espía letal con un pasado oscuro.', imagen: '/img/blackwidow.jpg', isHide: true, isCopied: false },
                          { id: 11, nombre: 'Doctor Strange', descripcion: 'Maestro de las artes místicas.', imagen: '/img/strange.jpg', isHide: true, isCopied: false },
                          { id: 12, nombre: 'Captain America', descripcion: 'El hombre fuera de su tiempo.', imagen: '/img/capitanamerica.jpg', isHide: true, isCopied: false },
                        ]
                      },
                      {
                        categoria: 'Plantas (PvZ)',
                        cartas: [
                          { id: 13, nombre: 'Lanzaguisantes', descripcion: 'Ataque verde por excelencia.', imagen: '/img/lanzaguisantes.jpg', isHide: true, isCopied: false },
                          { id: 14, nombre: 'Girasol', descripcion: 'Genera energía solar para tus defensas.', imagen: '/img/girasol.jpg', isHide: true, isCopied: false },
                          { id: 15, nombre: 'Nuez', descripcion: 'Resistente muro vegetal.', imagen: '/img/nuez.jpg', isHide: true, isCopied: false },
                          { id: 16, nombre: 'Petacereza', descripcion: 'Explota en una dulce catástrofe.', imagen: '/img/petacereza.jpg', isHide: true, isCopied: false },
                          { id: 17, nombre: 'Hielaguisante', descripcion: 'Congela y daña enemigos.', imagen: '/img/hielaguisantes.jpg', isHide: true, isCopied: false },
                          { id: 18, nombre: 'Repetidora', descripcion: 'Doble potencia, doble diversión.', imagen: '/img/repetidora.jpg', isHide: true, isCopied: false },
                        ]
                      },
                      {
                        categoria: 'Objetos Random',
                        cartas: [
                          { id: 19, nombre: 'Tostadora mágica', descripcion: 'Lanza tostadas al infinito.', imagen: '/img/tostadoramagica.png', isHide: true, isCopied: false },
                          { id: 20, nombre: 'Reloj derretido', descripcion: 'Claramente Dalí estuvo aquí.', imagen: '/img/relojderretido.jpg', isHide: true, isCopied: false },
                          { id: 21, nombre: 'Guitarra con alas', descripcion: 'Cuerdas de aire y sonido imposible.', imagen: '/img/guitarraalas.jpg', isHide: true, isCopied: false },
                          { id: 22, nombre: 'Llave del destino', descripcion: 'Abre puertas que deberían seguir cerradas.', imagen: '/img/llave-destino.avif', isHide: true, isCopied: false },
                          { id: 23, nombre: 'Botella con mensaje', descripcion: 'Una historia atrapada en vidrio.', imagen: '/img/botella-mensaje.jpg', isHide: true, isCopied: false },
                          { id: 24, nombre: 'Sombrero con ojos', descripcion: 'Un sombrero que todo lo ve.', imagen: '/img/sombrero.jpg', isHide: true, isCopied: false },
                        ]
                      },
                      {
                        categoria: 'Halloween',
                        cartas: [
                          { id: 25, nombre: 'Calabaza Tenebrosa', descripcion: 'Su sonrisa brilla en la oscuridad.', imagen: '/img/calabaza-tenebrosa.jpg', isHide: true, isCopied: false },
                          { id: 26, nombre: 'Murciélago', descripcion: 'Vuela entre gritos y sombras.', imagen: '/img/murcielago.png', isHide: true, isCopied: false },
                          { id: 27, nombre: 'Bruja del pantano', descripcion: 'Sus pociones siempre explotan.', imagen: '/img/bruja.png', isHide: true, isCopied: false },
                          { id: 28, nombre: 'Esqueleto Bailarín', descripcion: 'No tiene músculos, pero ritmo sí.', imagen: '/img/esqueleto.jpg', isHide: true, isCopied: false },
                          { id: 29, nombre: 'Fantasma Alegre', descripcion: 'Le encanta asustar con estilo.', imagen: '/img/fantasma.png', isHide: true, isCopied: false },
                          { id: 30, nombre: 'Gato Negro', descripcion: 'Te observa desde la penumbra.', imagen: '/img/gato-negro.png', isHide: true, isCopied: false },
                        ]
                      },
                      {
                        categoria: 'Personajes de DC',
                        cartas: [
                          { id: 31, nombre: 'Batman', descripcion: 'El vigilante de Gotham.', imagen: '/img/batman.jpg', isHide: true, isCopied: false },
                          { id: 32, nombre: 'Superman', descripcion: 'Hombre de acero y moral inquebrantable.', imagen: '/img/superman.jpg', isHide: true, isCopied: false },
                          { id: 33, nombre: 'Wonder Woman', descripcion: 'Guerrera amazona con lazo de la verdad.', imagen: '/img/wonder-woman.jpg', isHide: true, isCopied: false },
                          { id: 34, nombre: 'Flash', descripcion: 'Más rápido que tu conexión WiFi.', imagen: '/img/flash.jpg', isHide: true, isCopied: false },
                          { id: 35, nombre: 'Aquaman', descripcion: 'Rey de los mares y sarcasmo acuático.', imagen: '/img/aquaman.jpg', isHide: true, isCopied: false },
                          { id: 36, nombre: 'Harley Quinn', descripcion: 'La locura con sonrisa pintada.', imagen: '/img/harly.jpg', isHide: true, isCopied: false },
                        ]
                      },
                        {
                        categoria: 'Animales',
                        cartas: [
                          { id: 37, nombre: 'Tigre de Bengala', descripcion: 'Un depredador ágil y poderoso.', imagen: '/img/tigre.jpg', isHide: true, isCopied: false },
                          { id: 38, nombre: 'Lobo Ártico', descripcion: 'Cazador de hielo y soledad.', imagen: '/img/lobo.jpg', isHide: true, isCopied: false },
                          { id: 39, nombre: 'Águila Real', descripcion: 'Majestuosa y letal desde los cielos.', imagen: '/img/aguila.jpg', isHide: true, isCopied: false },
                          { id: 40, nombre: 'Panda Gigante', descripcion: 'Maestro del bambú y la calma.', imagen: '/img/panda.jpg', isHide: true, isCopied: false },
                          { id: 41, nombre: 'Camaleón', descripcion: 'Maestro del disfraz natural.', imagen: '/img/camaleon.jpg', isHide: true, isCopied: false },
                          { id: 42, nombre: 'Delfín', descripcion: 'Inteligente y juguetón habitante del océano.', imagen: '/img/delfin.jpg', isHide: true, isCopied: false },
                        ]
                      },
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

    this.cartas = this.cartas.map(c => ({ seleccionada: false, ...c }));


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
      this.guardarSesionUsuarioActual();

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


    agregarCarta(nuevaCarta) {
      if (!this.usuarioActual) return;
      const id = nuevaCarta.id ?? Date.now();
      const cartaFinal = { ...this.cartaTemplate, ...nuevaCarta, id,  seleccionada: false  };
      this.cartas.push(cartaFinal);
      this.actualizarYGuardarUsuarioActual();
    },


    eliminarCarta(idCarta) {
      if (!this.usuarioActual) return;
      this.cartas = this.cartas.filter(c => c.id !== idCarta);
      this.actualizarYGuardarUsuarioActual();
    },

    actualizarSeleccionCartas(cartasActualizadas) {
      this.cartas = cartasActualizadas;
      this.actualizarYGuardarUsuarioActual();
    },



    desbloquearKitsSegunProgreso() {
        const partidasTotales = this.usuarioActual.partidas.length;

        const niveles = [
          { partidas: 0, categoria: 'Halloween' },
          { partidas: 6, categoria: 'Animales' },
          { partidas: 12, categoria: 'Personajes de Marvel' },
          { partidas: 18, categoria: 'Plantas (PvZ)' },
          { partidas: 24, categoria: 'Objetos Random' },
          { partidas: 30, categoria: 'Personajes de DC' },
        ];




        const categoriasDesbloqueadas = niveles
          .filter(n => partidasTotales >= n.partidas)
          .map(n => n.categoria);



        const nuevosKits = this.kits.filter(k =>
          categoriasDesbloqueadas.includes(k.categoria)
        );

        const nuevasCartas = nuevosKits.flatMap(k => k.cartas);


        const cartasExistentes = this.usuarioActual.cartas || [];
        const cartasFinales = [
          ...cartasExistentes,
          ...nuevasCartas.filter(
            c => !cartasExistentes.some(ec => ec.id === c.id)
          ),
        ];

        this.usuarioActual.cartas = cartasFinales;
        this.cartas = cartasFinales;
      },


    agregarPartida(nuevaPartida) {
      if (!this.usuarioActual) return;
      const partidaConId = { ...this.partidaTemplate, ...nuevaPartida, id: Date.now() };

      if (!this.usuarioActual.partidas) {
        this.usuarioActual.partidas = [];
      }
      this.usuarioActual.partidas.push(partidaConId); // Modifica directo el objeto

      this.desbloquearKitsSegunProgreso();//

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
