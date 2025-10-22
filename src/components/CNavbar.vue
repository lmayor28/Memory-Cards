<template>
    <nav>
        <router-link to="/" exact>Inicio</router-link>
        <router-link to="/juego">Jugar</router-link>
        <router-link to="/cartas">Cartas</router-link>
        <router-link to="/estadisticas">Estadisticas</router-link>
        <router-link to="/mejor-puntaje">Mejor Puntaje</router-link>
        <router-link to="/agregar-carta">Agregar Cartas</router-link>
    </nav>
</template>

<script>
    export default{
        name: "CNavbar"
    }
</script>

<style scoped>
        :root {
            --celeste-primario: #B3E5FC; 
            --blanco: #FFFFFF;
            --celeste-contraste: #03A9F4;  
        }

        nav{
            display: flex;
            justify-content: center;
            gap: 0.5rem; 
            background-color: var(--celeste-primario, #B3E5FC); 
            padding: 1rem 1.5rem; 
            border-radius: 20px;
            box-shadow: 0 7px 10px rgba(0, 0, 0, 0.1); 
        }

        a {
            color: var(--celeste-contraste, #03A9F4);
            text-decoration: none;
            font-weight: 600; 
            padding: 0.5rem 1rem; 
            border-radius: 10px; 
            transition: background-color 0.3s ease, color 0.3s ease; 
        }

        a:hover {
            background-color: var(--celeste-contraste, #03A9F4); 
            color: var(--blanco, #FFFFFF); 
        }

        a.router-link-exact-active {
            background-color: var(--celeste-contraste, #03A9F4); 
            color: var(--blanco, #FFFFFF);
            box-shadow: inset 0 -3px 0 rgba(255, 255, 255, 0.8);
        }
</style>